import type { ReactNode } from 'react';
import clsx from 'clsx';
import { usePluginData } from '@docusaurus/useGlobalData';

import styles from './style.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

// import Popup from 'reactjs-popup';

const ListSize = {
  // ExtraSmall: "sx",
  Small: "sm",
  Medium: "md",
  // Large: "lg",
  // ExtraLarge: "xl"
} as const;

const ImageType = {
  webp: "webp",
  other: "other"
} as const;

type ListSizeType = typeof ListSize[keyof typeof ListSize];
type ImageTypeType = typeof ImageType[keyof typeof ImageType];

// Types basés sur les types.ts du plugin
type Social = 'twitch' | 'twitter' | 'instagram' | 'tiktok' | 'youtube' | 'discord';
type Group = 'member' | 'sct' | 'cdc2022' | 'playtogether2024';

interface TwitchUserData {
  id: string;
  display_name: string;
  profile_image_url: string;
}

interface Twitch {
  login: string;
  user_data?: TwitchUserData;
}

interface SocialMedia {
  id?: string;
  link?: string;
}

interface Socials {
  main_social: Social;
  twitch?: Twitch;
  twitter?: SocialMedia;
  instagram?: SocialMedia;
  tiktok?: SocialMedia;
  youtube?: SocialMedia;
  discord?: SocialMedia;
}

interface Member {
  name: string;
  avatar?: string;
  groups: Group[];
  socials?: Socials;
}

// Interface pour les données globales du plugin
interface SocialCommunityPluginData {
  members: Member[];
  planning2022?: any[];
  planning2024?: any[];
}

interface CommunityListProps {
  className?: string;
  group?: string;
  members?: string[];
  size?: ListSizeType;
  offsetX?: number;
}

interface MemberPictureProps {
  member: Member;
  size?: ListSizeType;
  offsetX?: number;
}

interface CommunityListHomeProps {
  group?: string;
}

interface CommunityListCalendarProps {
  group?: string;
  members?: string[];
}

interface CommunityListEventProps {
  group?: string;
  members?: string[];
}

function MemberAvatarUrl(member: Member, size: ListSizeType = ListSize.Medium, type: ImageTypeType = ImageType.other): string | null {
  let url: string | null = null;

  if (member) {
    if (member.avatar) {
      switch (size) {
        case ListSize.Medium:
          url = member.avatar.replace("300x300", "100x100");
          break;
        case ListSize.Small:
          url = member.avatar.replace("300x300", "50x50");
          break;
      }

      if (type === ImageType.webp) {
        url = url.replace(url.split('.').pop()!, "webp");
      }
    }

    if (!url) {
      if (member.socials && type === ImageType.other) {
        switch (member.socials.main_social) {
          case 'twitch':
            if (member.socials.twitch && member.socials.twitch.user_data) {
              switch (size) {
                case ListSize.Medium:
                  url = member.socials.twitch.user_data.profile_image_url.replace("300x300", "70x70");
                  break;
                case ListSize.Small:
                  url = member.socials.twitch.user_data.profile_image_url.replace("300x300", "50x50");
                  break;
              }
            }
        }
      }
    }
  }

  return url;
}

function MemberSocialLink(member: Member): string {
  if (member && member.socials) {
    switch (member.socials.main_social) {
      case 'twitch':
        if (member.socials.twitch && member.socials.twitch.user_data) {
          return 'https://www.twitch.tv/' + member.socials.twitch.login;
        }
        break;
      case 'twitter':
        if (member.socials.twitter && member.socials.twitter.id) {
          return 'https://twitter.com/' + member.socials.twitter.id;
        }
        break;
      case 'instagram':
        if (member.socials.instagram && member.socials.instagram.id) {
          return 'https://www.instagram.com/' + member.socials.instagram.id;
        }
        break;
      case 'tiktok':
        if (member.socials.tiktok && member.socials.tiktok.id) {
          return 'https://www.tiktok.com/@' + member.socials.tiktok.id;
        }
        break;
      case 'youtube':
      case 'discord':
        const socialMedia = member.socials[member.socials.main_social];
        if (socialMedia && socialMedia.link) {
          return socialMedia.link;
        }
        break;
    }
  }

  return "#";
}

function MemberPicture({ member, size = ListSize.Medium, offsetX = 0 }: MemberPictureProps): ReactNode {
  const avatarUrlWebp = MemberAvatarUrl(member, size, ImageType.webp);
  const avatarUrl = MemberAvatarUrl(member, size, ImageType.other);
  
  return (
    <>
      {/* {member && (avatarUrlWebp || avatarUrl) && (
        <Popup
          trigger={
            <a href={MemberSocialLink(member)} className={clsx(styles.communityMember, styles["communityMember-" + size])}>
              <div className="avatar">
                <picture>
                  {avatarUrlWebp && (
                    <source srcSet={avatarUrlWebp} type="image/webp" />
                  )}
                  {avatarUrl && (
                    <source srcSet={avatarUrl} />
                  )}
                  <img className="avatar__photo" alt={member.name} src={useBaseUrl('/img/avatars/default.png')} loading='lazy' />
                </picture>
              </div>
            </a>
          }
          position={['top center', 'bottom center']}
          on={['hover', 'focus']}
          keepTooltipInside={true}
          mouseEnterDelay={10}
          mouseLeaveDelay={10}
          offsetX={offsetX}
          disabled={size === ListSize.Medium}
        >
          <span>{member.name}</span>
        </Popup>
      )} */}
    </>
  );
}

function CommunityList(props: CommunityListProps): ReactNode {
  let pluginData: SocialCommunityPluginData | undefined;
  
  try {
    pluginData = usePluginData('social-community-plugin') as SocialCommunityPluginData;
  } catch (error) {
    console.warn('Plugin social-community-plugin not found:', error);
    pluginData = undefined;
  }
  
  const members = pluginData?.members || [];
  
  // Si aucune donnée n'est disponible, afficher un message ou retourner null
  if (members.length === 0) {
    return (
      <div className={props.className}>
        <p>Aucun membre trouvé</p>
      </div>
    );
  }
  
  return (
    <div className={props.className}>
      {members?.map((member) => (
        <div key={member.name}>
          {(props.group && member.groups.includes(props.group as Group)) && (
            <MemberPicture member={member} size={props.size} />
          )}
        </div>
      ))}
      {props.members?.map((m) => {
        const member = members.find(item => item.socials?.twitch?.login === m);
        if (member) {
          return (
            <div key={member.name}>
              {(props.members && props.members.includes(member.socials?.twitch?.login || '')) && (
                <MemberPicture member={member} size={props.size} offsetX={props.offsetX} />
              )}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export function CommunityListCalendar(props: CommunityListCalendarProps): ReactNode {
  return (
    <CommunityList 
      className={clsx(styles.communityList, styles.communityCalendar)} 
      group={props.group} 
      members={props.members} 
      size={ListSize.Small} 
      offsetX={8} 
    />
  );
}

export function CommunityListHome(props: CommunityListHomeProps): ReactNode {
  const group = props.group || 'member';
  return (
    <CommunityList 
      className={clsx(styles.communityList, styles.communityHome)} 
      group={group} 
      size={ListSize.Medium} 
    />
  );
}

export function CommunityListEvent(props: CommunityListEventProps): ReactNode {
  return (
    <CommunityList 
      className={clsx(styles.communityList)} 
      group={props.group} 
      members={props.members} 
      size={ListSize.Small} 
    />
  );
}