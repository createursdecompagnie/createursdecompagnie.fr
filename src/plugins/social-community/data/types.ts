import type { PluginOptions } from '@docusaurus/types';

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
    cdc2022 = 'cdc2022',
    playtogether2024 = 'playtogether2024',
    cdc2025 = 'cdc2025'
}

export interface TwitchUserData {
    id: string;
    login: string;
    display_name: string;
    profile_image_url: string;
}

export interface Twitch {
    id: string;
    user_data?: TwitchUserData;
}

export interface Twitter {
    id: string;
}

export interface Instagram {
    id: string;
}

export interface TikTok {
    id: string;
}

export interface YouTube {
    link: string;
}

export interface Discord {
    link: string;
}

export interface Socials {
    main_social: Social;
    twitch?: Twitch;
    twitter?: Twitter;
    instagram?: Instagram;
    tiktok?: TikTok;
    youtube?: YouTube;
    discord?: Discord;
}

export interface Member {
    name: string;
    avatar?: string;
    groups: Group[];
    socials?: Socials;
}

export type Members = Member[];

export interface SocialCommunityPluginOptions extends PluginOptions {
    members: Members;
    module_key: string;
}

export interface SocialCommunityPluginData {
    planning2022: any[];
    planning2024: any[];
    members: Members;
}
