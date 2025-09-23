require('dotenv/config');

const fs = require('fs');
const path = require('path');
import type { LoadContext, Plugin } from '@docusaurus/types';
import type { Members, Member, SocialCommunityPluginOptions, SocialCommunityPluginData } from './data/types';

interface TwitchAuthResponse {
    access_token: string;
}

interface TwitchUserData {
    id: string;
    login: string;
    display_name: string;
    profile_image_url: string;
}

interface TwitchUsersResponse {
    data: TwitchUserData[];
}

function FindMemberByTwitchId(members: Members, id: string): Member | undefined {
    return members.find(member => member.socials?.twitch?.id === id);
}

async function authenticateWithTwitch(): Promise<string> {
    const authParams = new URLSearchParams({
        client_id: process.env.TWITCH_CLIENTID!,
        client_secret: process.env.TWITCH_CLIENTSECRET!,
        grant_type: 'client_credentials'
    });

    const response = await fetch('https://id.twitch.tv/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: authParams
    });

    if (!response.ok) {
        throw new Error(`Unable to authenticate with Twitch: ${response.status} ${response.statusText}`);
    }

    const authData: TwitchAuthResponse = await response.json();
    if (!authData.access_token) {
        throw new Error('Unable to get app access token');
    }

    return authData.access_token;
}

async function fetchTwitchUsers(members: Members, accessToken: string): Promise<TwitchUsersResponse> {
    const userIds = members
        .filter(member => member.socials?.twitch?.id)
        .map(member => member.socials!.twitch!.id);

    if (userIds.length === 0) {
        return { data: [] };
    }

    const url = new URL('https://api.twitch.tv/helix/users');
    userIds.forEach(id => url.searchParams.append('id', id));

    const response = await fetch(url, {
        headers: {
            'Client-Id': process.env.TWITCH_CLIENTID!,
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error(`Unable to collect Twitch users: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

async function downloadAndProcessAvatar(imageUrl: string, login: string): Promise<void> {
    const response = await fetch(imageUrl);
    if (!response.ok) {
        throw new Error(`Failed to download avatar for ${login}: ${response.status}`);
    }

    const imageBuffer = Buffer.from(await response.arrayBuffer());
    const sharp = require('sharp');
    const basePath = './static/img/avatars/';

    fs.mkdirSync(basePath, { recursive: true });

    await Promise.all([
        sharp(imageBuffer).resize(100).toFile(`${basePath}${login}-100x100.png`),
        sharp(imageBuffer).resize(100).toFile(`${basePath}${login}-100x100.webp`),
        sharp(imageBuffer).resize(50).toFile(`${basePath}${login}-50x50.png`),
        sharp(imageBuffer).resize(50).toFile(`${basePath}${login}-50x50.webp`),
    ]);
}

module.exports = function SocialCommunityPlugin(
    context: LoadContext, 
    options: SocialCommunityPluginOptions
): Plugin<void> {
    return {
        name: 'social-community-plugin',
        async contentLoaded({ content, actions }) {
            const members: Members = options.members;

            const accessToken = await authenticateWithTwitch();
            const usersData = await fetchTwitchUsers(members, accessToken);

            usersData.data.forEach(userData => {
                const member = FindMemberByTwitchId(members, userData.id);
                if (member?.socials?.twitch) {
                    member.socials.twitch.user_data = {
                        id: userData.id,
                        login: userData.login,
                        display_name: userData.display_name,
                        profile_image_url: userData.profile_image_url,
                    };
                }
            });

            if (process.env.NODE_ENV === 'development') {
                const avatarPromises = members
                    .filter(member => member.socials?.twitch?.user_data)
                    .map(member => {
                        const twitchData = member.socials!.twitch!.user_data!;
                        return downloadAndProcessAvatar(twitchData.profile_image_url, twitchData.login);
                    });

                await Promise.all(avatarPromises);
            }

            const memberGroups: Record<string, any[]> = {};
            members.forEach(member => {
                const login = member.socials?.twitch?.user_data?.login;
                if (login) {
                    const filePath = `/img/avatars/${login}-100x100.png`;
                    if (fs.existsSync(`./static${filePath}`)) {
                        member.avatar = filePath.replace("100x100", "300x300");
                    }

                    if (member.socials?.twitch?.user_data) {
                        member.groups.forEach(group => {
                            if (!memberGroups[group]) {
                                memberGroups[group] = [];
                            }
                            memberGroups[group].push(member.socials.twitch);
                        });
                    }
                }
            });

            for (const [key, value] of Object.entries(memberGroups)) {
                const filePath = `./static/data/${key}/members.json`;
                fs.mkdirSync(path.dirname(filePath), { recursive: true });
                fs.writeFileSync(filePath, JSON.stringify(value), { flag: 'w' });
            }

            const planning2022Path = `./static/data/cdc2022/planning.json`;
            const planning2024Path = `./static/data/playtogether2024/planning.json`;

            const globalPlanning2022 = fs.existsSync(planning2022Path)
                ? JSON.parse(fs.readFileSync(planning2022Path, 'utf8'))
                : [];

            const globalPlanning2024 = fs.existsSync(planning2024Path)
                ? JSON.parse(fs.readFileSync(planning2024Path, 'utf8'))
                : [];

            const { setGlobalData } = actions;
            const socialCommunityPluginData: SocialCommunityPluginData = {
                planning2022: globalPlanning2022,
                planning2024: globalPlanning2024,
                members: members
            };

            setGlobalData(socialCommunityPluginData);
        },
    };
};
