import { Social, Member } from '@site/src/plugins/social-community/data/types';
import { usePluginData } from '@docusaurus/useGlobalData';
import type { SocialCommunityPluginData } from '@site/src/plugins/social-community/data/types';

export function getDisplayNameForMember(member: Member): string {
  if (member?.socials?.main_social === Social.twitch && member.socials.twitch?.user_data) {
    return member.socials.twitch.user_data.display_name;
  }
  return member.name;
}

export function getMembersFromPluginData(): Member[] {
  let pluginData: SocialCommunityPluginData | undefined;
  
  try {
    pluginData = usePluginData('social-community-plugin') as SocialCommunityPluginData;
  } catch (error) {
    console.warn('Plugin social-community-plugin not found:', error);
  }
  
  return pluginData?.members || [];
}