const unirest = require('unirest');
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

/**
 * Find a member by their Twitch login
 */
function FindMemberByTwitchId(members: Members, id: string): Member | undefined {
    return members.find(member => member.socials?.twitch?.id === id);
}

module.exports = function SocialCommunityPlugin(
    context: LoadContext, 
    options: SocialCommunityPluginOptions
): Plugin<void> {
    return {
        name: 'social-community-plugin',
        async contentLoaded({ content, actions }) {
            const members: Members = options.members;
            let TWITCH_APP_TOKEN: string | null = null;

            // Authenticate with Twitch API
            try {
                const authResponse = await unirest
                    .post("https://id.twitch.tv/oauth2/token")
                    .send(`client_id=${process.env.TWITCH_CLIENTID}`)
                    .send(`client_secret=${process.env.TWITCH_CLIENTSECRET}`)
                    .send(`grant_type=client_credentials`);

                if (authResponse.error) {
                    throw new Error(`Unable to authenticate with Twitch: ${authResponse.error}`);
                }

                const authBody = authResponse.body as TwitchAuthResponse;
                if (!authBody.access_token) {
                    throw new Error(`Unable to get app access token`);
                }

                TWITCH_APP_TOKEN = authBody.access_token;
            } catch (error) {
                console.error('Twitch authentication failed:', error);
                throw error;
            }

            // Get users list from Twitch
            try {
                const req = unirest
                    .get("https://api.twitch.tv/helix/users")
                    .headers({
                        'Client-Id': process.env.TWITCH_CLIENTID as string,
                        'Authorization': `Bearer ${TWITCH_APP_TOKEN}`
                    });

                // Add login queries for each member with Twitch social
                members.forEach(member => {
                    if (member.socials?.twitch) {
                        req.query(`id=${member.socials.twitch.id}`);
                    }
                });

                const usersResponse = await req;
                if (usersResponse.error) {
                    throw new Error(`Unable to collect Twitch users: ${usersResponse.error}`);
                }

                const usersBody = usersResponse.body as TwitchUsersResponse;
                usersBody.data.forEach(userData => {
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
            } catch (error) {
                console.error('Failed to fetch Twitch users:', error);
                throw error;
            }

            // Generate avatars (development only)
            // if (process.env.NODE_ENV === 'development')
            {
                const promises = members
                    .filter(member => member.socials?.twitch?.user_data)
                    .map(member => {
                        if (member.socials?.twitch?.user_data) {
                            return new Promise<any>((resolve) => {
                                unirest
                                    .get(member.socials.twitch.user_data!.profile_image_url)
                                    .encoding(null)
                                    .header({
                                        'x-login': member.socials.twitch.user_data.login
                                    })
                                    .then(resolve)
                                    .catch(resolve); // Resolve even on error to prevent Promise.all from failing
                            });
                        }
                        return Promise.resolve(null);
                    });

                try {
                    const results = await Promise.all(promises);
                    const sharp = require('sharp');

                    const imageProcessingPromises = results
                        .filter((response): response is NonNullable<typeof response> => 
                            response?.raw_body != null
                        )
                        .map(async (response) => {
                            const login = response.request.headers['x-login'] as string;
                            const basePath = './static/img/avatars/';
                            
                            try {
                                await Promise.all([
                                    sharp(response.raw_body).resize(100).toFile(`${basePath}${login}-100x100.png`),
                                    sharp(response.raw_body).resize(100).toFile(`${basePath}${login}-100x100.webp`),
                                    sharp(response.raw_body).resize(50).toFile(`${basePath}${login}-50x50.png`),
                                    sharp(response.raw_body).resize(50).toFile(`${basePath}${login}-50x50.webp`),
                                ]);
                            } catch (error) {
                                console.error(`Failed to process avatar for ${login}:`, error);
                            }
                        });

                    await Promise.all(imageProcessingPromises);
                } catch (error) {
                    console.error('Failed to process avatars:', error);
                }
            }

            // Create member groups
            const memberGroups: Record<string, any[]> = {};

            members.forEach(member => {
                const filePath = `/img/avatars/${member.socials?.twitch?.user_data.login}-100x100.png`;
                if (member.socials?.twitch?.user_data.login && fs.existsSync(`./static${filePath}`)) {
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
            });

            // Write member groups to files
            for (const [key, value] of Object.entries(memberGroups)) {
                const filePath = `./static/data/${key}/members.json`;
                try {
                    fs.mkdirSync(path.dirname(filePath), { recursive: true });
                    fs.writeFileSync(filePath, JSON.stringify(value), { flag: 'w' });
                } catch (error) {
                    console.error(`Failed to write members file for group ${key}:`, error);
                }
            }

            // Load planning data
            let globalPlanning2022: any[] = [];
            let globalPlanning2024: any[] = [];

            try {
                const planning2022Path = `./static/data/cdc2022/planning.json`;
                if (fs.existsSync(planning2022Path)) {
                    globalPlanning2022 = JSON.parse(fs.readFileSync(planning2022Path, 'utf8'));
                }
            } catch (error) {
                console.error('Failed to load 2022 planning data:', error);
            }

            try {
                const planning2024Path = `./static/data/playtogether2024/planning.json`;
                if (fs.existsSync(planning2024Path)) {
                    globalPlanning2024 = JSON.parse(fs.readFileSync(planning2024Path, 'utf8'));
                }
            } catch (error) {
                console.error('Failed to load 2024 planning data:', error);
            }

            // Set global data
            const { createData, setGlobalData, addRoute } = actions;
            const socialCommunityPluginData: SocialCommunityPluginData = {
                planning2022: globalPlanning2022,
                planning2024: globalPlanning2024,
                members: members
            };
            
            setGlobalData(socialCommunityPluginData);

            // // Handle routes if provided
            // if (options.routes && options.module_key) {
            //     options.routes.forEach(route => {
            //         if (!route.modules) {
            //             route.modules = {};
            //         }
            //         // Note: This would need the actual data path if using createData
            //         // route.modules[options.module_key] = membersDataJsonPath;
            //         addRoute(route);
            //     });
            // }
        },
    };
};