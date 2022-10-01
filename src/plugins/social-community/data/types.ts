import { PluginOptions, RouteConfig } from '@docusaurus/types';

export const enum Social {
    twitch = 'twitch', 
    twitter = 'twitter', 
    instagram = 'instagram', 
    tiktok = 'tiktok', 
    youTube = 'youTube', 
    discord = 'discord'
  }

export const enum Group {
    member = 'member', 
    sct = 'sct', 
    cdc2022 = 'cdc2022'
  }

export type TwitchUserData = {
    id: string;
    display_name: string;
    profile_image_url: string;
};

export type Twitch = {
    login: string;
    user_data?: TwitchUserData;
};

export type Twitter = {
    id: string;
};

export type Instagram = {
    id: string;
};

export type TikTok = {
    id: string;
};

export type YouTube = {
    link: string;
};

export type Discord = {
    link: string;
};

export type Socials = {
    main_social: Social;
    twitch?: Twitch;
    twitter?: Twitter;
    instagram?: Instagram;
    tiktok?: TikTok;
    youtube?: YouTube;
    discord?: Discord;
};

export type Member = {
    name: string;
    avatar?: string;
    groups: Group[];
    socials?: Socials;
};

export type Members = {
    [index: number]: Member;
};

export type SocialCommunityPluginOptions = PluginOptions & {
    members: Members;
    module_key: string;
    routes: RouteConfig[];
};