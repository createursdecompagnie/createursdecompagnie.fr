import unirest from 'unirest'
import 'dotenv/config'

import fs from 'fs';
import path from 'path';
import csv from 'csvtojson';

/**
 * @param {import('./data/types').Members} members
 * @param {string} login
 * @returns {import('./data/types').Member}
 */
function FindMemberByTwitchLogin(members, login) {
    return members.find(member => member.socials && member.socials.twitch && login == member.socials.twitch.login);
}

/**
 * @param {import('@docusaurus/types').LoadContext} context
 * @returns {import('@docusaurus/types').PluginModule}
 */
export default function SocialCommunityPlugin(context, options) {
    return {
        name: 'social-community-plugin',
        async contentLoaded({ content, actions }) {

            /** @type {import('./data/types').Members} */
            let members = options.members;

            let TWITCH_APP_TOKEN = null;

            // Authenticate with Twitch api
            {
                await unirest
                    .post("https://id.twitch.tv/oauth2/token")
                    .send(`client_id=${process.env.TWITCH_CLIENTID}`)
                    .send(`client_secret=${process.env.TWITCH_CLIENTSECRET}`)
                    .send(`grant_type=client_credentials`)
                    .then((response) => {
                        if (response.error) throw `Unable to authenticate with Twitch: ${response.error}`;
                        if (!response.body.access_token) throw `Unable to get app access token`;

                        TWITCH_APP_TOKEN = response.body.access_token;
                    });
            }

            // Get users list
            {
                let req = unirest
                    .get("https://api.twitch.tv/helix/users")
                    .headers({
                        'Client-Id': process.env.TWITCH_CLIENTID,
                        'Authorization': `Bearer ${TWITCH_APP_TOKEN}`
                    });

                members.forEach(member => {
                    if (member.socials && member.socials.twitch) {
                        req.query(`login=${member.socials.twitch.login}`);
                    }
                });

                await req.then((response) => {
                    if (response.error) throw `Unable to collect Twitch users: ${response.error}`;
                    response.body.data.forEach(user_data => {
                        var member = FindMemberByTwitchLogin(members, user_data.login);
                        if (member) {
                            member.socials.twitch.user_data = {
                                id: user_data.id,
                                display_name: user_data.display_name,
                                profile_image_url: user_data.profile_image_url,
                            };
                        }
                    });
                });
            }

            // Generate avatars
            if (process.env.NODE_ENV === 'development') {
                var promises = members.map(function (member) {
                    if (member.socials.twitch && member.socials.twitch.user_data) {
                        return new Promise(function (resolve) {
                            unirest
                                .get(member.socials.twitch.user_data.profile_image_url)
                                .encoding(null)
                                .header({
                                    'x-login': member.socials.twitch.login
                                })
                                .then(resolve);
                        });
                    }
                });

                await Promise.all(promises).then(async function (result) {
                    const sharpModule = await import('sharp');
                    const sharp = sharpModule.default;

                    await result.map(async function (response) {

                        if (response && response.raw_body) {
                            const filepath = './static/img/avatars/' + response.request.headers['x-login'] + '-300x300.';

                            await Promise.all([
                                sharp(response.raw_body).resize(100).toFile(filepath.replace("300x300", "100x100") + "png"),
                                sharp(response.raw_body).resize(100).toFile(filepath.replace("300x300", "100x100") + "webp"),

                                sharp(response.raw_body).resize(50).toFile(filepath.replace("300x300", "50x50") + "png"),
                                sharp(response.raw_body).resize(50).toFile(filepath.replace("300x300", "50x50") + "webp"),
                            ]);
                        }
                    });
                });
            }

            let memberGroups = {};

            members.map(function (member) {
                let filePath = '/img/avatars/' + member.socials.twitch.login + '-100x100.png';
                if (fs.existsSync('./static' + filePath)) {
                    member.avatar = filePath.replace("100x100", "300x300");
                }

                if (member.socials.twitch && member.socials.twitch.user_data) {
                    member.groups.forEach(group => {
                        if (!memberGroups[group]) {
                            memberGroups[group] = [];
                        }

                        memberGroups[group].push(member.socials.twitch);
                    });
                }
            });

            for (const [key, value] of Object.entries(memberGroups)) {
                let filePath = `./static/data/${key}/members.json`;
                fs.mkdirSync(path.dirname(filePath), { recursive: true });
                fs.writeFileSync(filePath, JSON.stringify(value), { flag: 'w' });
            }

            let globalPlanning2022 = {};
            let globalPlanning2024 = {};
            // {
            //     let req = unirest
            //         .get(process.env.CDC2022_PLANNING);

            //     await req.then(async function (response) {
            //         if (response.error) throw `Unable to get planning: ${response.error}`;

            //         await csv().fromString(response.raw_body).subscribe((planning, index) => {

            //             planning.maintrack = planning.maintrack == '1';

            //             planning.start = new Date(planning.start);
            //             planning.end = new Date(planning.end);

            //             planning.presenters = planning.presenters.split(',').map(e => e.trim()).filter(item => memberGroups['cdc2022'].find(e => e.login == item));
            //             planning.attendees = planning.attendees.split(',').map(e => e.trim()).filter(item => memberGroups['cdc2022'].find(e => e.login == item));

            //             planning = null;
            //         }).then((planning) => {

            //             planning = planning.filter(item => (item.presenters.length + item.attendees.length)> 0);
            //             planning = planning.sort(function (a, b) {
            //                 let p = a.start - b.start;
            //                 return (p != 0) ? p : a.end - b.end;
            //             });

            //             let filePath = `./static/data/cdc2022/planning.json`;
            //             fs.mkdirSync(path.dirname(filePath), { recursive: true });
            //             fs.writeFileSync(filePath, JSON.stringify(planning), { flag: 'w' });

            //             JSON.parse()

            //             globalPlanning = planning;
            //         });
            //     });
            // }

            {
                let filePath = `./static/data/cdc2022/planning.json`;
                globalPlanning2022 = JSON.parse(fs.readFileSync(filePath, `utf8`));
            }

            {
                let filePath = `./static/data/cdc2024/planning.json`;
                globalPlanning2024 = JSON.parse(fs.readFileSync(filePath, `utf8`));
            }

            // Create members global data
            const { createData, setGlobalData, addRoute } = actions;
            setGlobalData({ planning2022: globalPlanning2022, planning2024: globalPlanning2024, members: members });

            // TODO : Switch to local data

            // // Create members.json
            // const membersDataJsonPath = await createData(
            //     'members.json',
            //     JSON.stringify(members),
            // );

            // if (options && options.routes && options.module_key) {
            //     options.routes.forEach(route => {

            //         route.modules = route.modules || {};
            //         route.modules[options.module_key] = membersDataJsonPath;

            //         addRoute(route);
            //     });
            // }
        },
    };
}