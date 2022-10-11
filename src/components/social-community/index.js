import React from 'react';
import clsx from 'clsx';
import { usePluginData } from '@docusaurus/useGlobalData';

import styles from './style.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

import Popup from 'reactjs-popup';

const ListSize = {
  // ExtraSmall: "sx",
  Small: "sm",
  Medium: "md",
  // Large: "lg",
  // ExtraLarge: "xl"
}

const ImageType = {
  webp: "webp",
  other: "other"
}

function MemberAvatarUrl(member, size = ListSize.Medium, type = ImageType.other) {
  let url = null;

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

      if (type == ImageType.webp) {
        url = url.replace(url.split('.').pop(), "webp");
      }
    }

    if (!url) {
      if (member.socials && type == ImageType.other) {
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

function MemberSocialLink(member) {
  if (member && member.socials) {
    switch (member.socials.main_social) {
      case 'twitch':
        if (member.socials.twitch && member.socials.twitch.user_data) {
          return 'https://www.twitch.tv/' + member.socials.twitch.login;
        }
        break;
      case 'twitter':
        if (member.socials.twitch && member.socials.twitch.user_data) {
          return 'https://twitter.com/' + member.socials.twitch.login;
        }
        break;
      case 'instagram':
        if (member.socials.twitch && member.socials.twitch.user_data) {
          return 'https://www.instagram.com/' + member.socials.twitch.login;
        }
        break;
      case 'tiktok':
        if (member.socials.twitch && member.socials.twitch.user_data) {
          return 'https://www.tiktok.com/@' + member.socials.twitch.login;
        }
        break;
      case 'youtube':
      case 'discord':
        if (member.socials[member.socials.main_social] && member.socials[member.socials.main_social].link) {
          return member.socials[member.socials.main_social].link;
        }
        break;
    }
  }

  return "#";
}

const MemberPicture = ({ member, size = ListSize.Medium, offsetX = 0 }) => {
  const avatarUrlWebp = MemberAvatarUrl(member, size, ImageType.webp);
  const avatarUrl = MemberAvatarUrl(member, size, ImageType.other);
  return (
    <>
      {member && (avatarUrlWebp || avatarUrl) &&
        <Popup
          trigger={
            <a href={MemberSocialLink(member)} className={clsx(styles.communityMember, styles["communityMember-" + size])}>
              <div className="avatar">
                <picture>
                  {avatarUrlWebp &&
                    <source srcSet={avatarUrlWebp} type="image/webp" />
                  }
                  {avatarUrl &&
                    <source srcSet={avatarUrl} />
                  }
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
          disabled={size ==ListSize.Medium}
        >
          <span>{member.name}</span>
        </Popup>
      }
    </>
  );
};

function CommunityList(props) {
  const { members } = usePluginData('social-community-plugin');
  return (
    <div className={props.className}>
      {members?.map((member) => (
        <React.Fragment key={member.name}>
          {(props.group && member.groups.includes(props.group)) &&
            <MemberPicture member={member} size={props.size} />
          }
        </React.Fragment>
      ))}
      {props.members?.map((m) => {
        let member = members.find(item => item.socials?.twitch?.login == m);
        if (member)
          return (
            <React.Fragment key={member.name}>
              {(props.members && props.members.includes(member.socials?.twitch?.login)) &&
                <MemberPicture member={member} size={props.size} offsetX={props.offsetX} />
              }
            </React.Fragment>
          )
      })}
    </div>
  );
};

export function CommunityListCalendar(props) {
  return (
    <CommunityList className={clsx(styles.communityList, styles.communityCalendar)} group={props.group} members={props.members} size={ListSize.Small} offsetX={8} />
  );
};

export function CommunityListHome(props) {
  let group = props.group || 'member';
  return (
    <CommunityList className={clsx(styles.communityList, styles.communityHome)} group={group} size={ListSize.Medium} />
  );
};

export function CommunityListEvent(props) {
  return (
    <CommunityList className={clsx(styles.communityList)} group={props.group} members={props.members} size={ListSize.Small} />
  );
};