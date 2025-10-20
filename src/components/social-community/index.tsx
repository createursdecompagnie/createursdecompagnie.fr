import type { ReactNode } from 'react';
import clsx from 'clsx';
import { usePluginData } from '@docusaurus/useGlobalData';

import styles from './style.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

import Popup from 'reactjs-popup';

import { Social, Group, Member, SocialCommunityPluginData } from '@site/src/plugins/social-community/data/types';
import { useTwitchLiveManager } from './useTwitchLiveManager';

const ListSize = {
  ExtraSmall: "sx",
  Small: "sm",
  Medium: "md",
  Large: "lg",
  ExtraLarge: "xl"
} as const;

const ImageType = {
  webp: "webp",
  other: "other"
} as const;

type ListSizeType = typeof ListSize[keyof typeof ListSize];
type ImageTypeType = typeof ImageType[keyof typeof ImageType];

interface CommunityListProps {
  className?: string;
  group?: string;
  memberIds?: string[];
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
  memberIds?: string[];
}

interface CommunityListEventProps {
  group?: string;
  memberIds?: string[];
}

interface MemberAvatarProfileProps {
  member: Member;
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
          case Social.twitch:
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
      case Social.twitch:
        if (member.socials.twitch && member.socials.twitch.user_data && member.socials.twitch.user_data.login) {
          return 'https://www.twitch.tv/' + member.socials.twitch.user_data.login;
        }
        break;
      case Social.twitter:
        if (member.socials.twitter && member.socials.twitter.id) {
          return 'https://twitter.com/' + member.socials.twitter.id;
        }
        break;
      case Social.instagram:
        if (member.socials.instagram && member.socials.instagram.id) {
          return 'https://www.instagram.com/' + member.socials.instagram.id;
        }
        break;
      case Social.tiktok:
        if (member.socials.tiktok && member.socials.tiktok.id) {
          return 'https://www.tiktok.com/@' + member.socials.tiktok.id;
        }
        break;
      case Social.youTube:
        if (member.socials.youtube && member.socials.youtube.link) {
          return member.socials.youtube.link;
        }
        break;
      case Social.discord:
        if (member.socials.discord && member.socials.discord.link) {
          return member.socials.discord.link;
        }
        break;
    }
  }

  return "#";
}


function MemberDisplayName(member:Member):string {

  if (member && member.socials) {
    switch (member.socials.main_social) {
      case Social.twitch:
        if (member.socials.twitch && member.socials.twitch.user_data) {
          return member.socials.twitch.user_data.display_name;
        }
        break;
    }
  }

  return member.name;
}

export function MemberAvatarProfile(props: MemberAvatarProfileProps): ReactNode {

  const member = props.member;
  const avatarUrlWebp = MemberAvatarUrl(member, ListSize.Medium, ImageType.webp);
  const avatarUrl = MemberAvatarUrl(member, ListSize.Medium, ImageType.other);

  return (
    <>
      <picture>
        {avatarUrlWebp && (
          <source srcSet={avatarUrlWebp} type="image/webp" />
        )}
        {avatarUrl && (
          <source srcSet={avatarUrl} />
        )}
        <img className={clsx(styles.liveBorder, "avatar__photo avatar__photo--xl")} alt={MemberDisplayName(member)} src={useBaseUrl('/img/avatars/default.png')} loading='lazy' />
      </picture>
    </>
  );
}

function MemberPicture({ member, size = ListSize.Medium, offsetX = 0 }: MemberPictureProps): ReactNode {
  const avatarUrlWebp = MemberAvatarUrl(member, size, ImageType.webp);
  const avatarUrl = MemberAvatarUrl(member, size, ImageType.other);
  const liveInfo = useTwitchLiveManager();
  const twitchId = member.socials?.twitch?.id;
  const isLive = twitchId && liveInfo[twitchId]?.isLive;

  return (
    <>
      {member && (avatarUrlWebp || avatarUrl) && (
        <Popup
          trigger={
            <a
              href={MemberSocialLink(member)}
              className={clsx(
                styles.communityMember,
                styles["communityMember-" + size],
                isLive && styles.liveBorder
              )}
            >
              <div className="avatar">
                <picture>
                  {avatarUrlWebp && (
                    <source srcSet={avatarUrlWebp} type="image/webp" />
                  )}
                  {avatarUrl && (
                    <source srcSet={avatarUrl} />
                  )}
                  <img className="avatar__photo" alt={MemberDisplayName(member)} src={useBaseUrl('/img/avatars/default.png')} loading='lazy' />
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
          <span>{MemberDisplayName(member)}</span>
        </Popup>
      )}
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
      {props.memberIds?.map((id) => {
        const member = members.find(item => (item.id === id));
        if (member) {
          return (
            <div key={member.name}>
              <MemberPicture member={member} size={props.size} offsetX={props.offsetX} />
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
      memberIds={props.memberIds} 
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
      memberIds={props.memberIds} 
      size={ListSize.Small} 
    />
  );
}