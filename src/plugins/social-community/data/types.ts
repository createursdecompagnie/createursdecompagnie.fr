import { PluginOptions, RouteConfig } from '@docusaurus/types';

export type TwitchUserData = {
    id: string;
    display_name: string;
    profile_image_url: string;
};

export type Twitch = {
    login: string;
    user_data?: TwitchUserData;
};

export type Social = {
    twitch?: Twitch;
};

export type Member = {
    name: string;
    social?: Social;
};

export type Members = {
    [index: number]: Member;
};

export type SocialCommunityPluginOptions = PluginOptions & {
    members: Members;
    module_key: string;
    routes: RouteConfig[];
};