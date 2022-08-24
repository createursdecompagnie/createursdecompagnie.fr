import unirest from 'unirest'
import 'dotenv/config'

/**
 * @param {import('./data/types').Members} members
 * @param {string} login
 * @returns {import('./data/types').Member}
 */
function FindMemberByTwitchLogin(members, login) {
    return members.find(member => member.social && member.social.twitch && login == member.social.twitch.login);
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
                    if (member.social && member.social.twitch) {
                        req.query(`login=${member.social.twitch.login}`);
                    }
                });

                await req.then((response) => {
                    if (response.error) throw `Unable to collect Twitch users: ${response.error}`;
                    response.body.data.forEach(user_data => {
                        var member = FindMemberByTwitchLogin(members, user_data.login);
                        if (member) {
                            member.social.twitch.user_data = {
                                id: user_data.id,
                                display_name: user_data.display_name,
                                profile_image_url: user_data.profile_image_url,
                            };
                        }
                    });
                });
            }

            const { createData, addRoute } = actions;

            // Create members.json
            const membersDataJsonPath = await createData(
                'members.json',
                JSON.stringify(members),
            );

            if (options && options.routes && options.module_key) {
                options.routes.forEach(route => {

                    route.modules = route.modules || {};
                    route.modules[options.module_key] = membersDataJsonPath;

                    addRoute(route);
                });
            }
        },
    };
}