import React from 'react';
import clsx from 'clsx';
import { usePluginData } from '@docusaurus/useGlobalData';

import styles from './style.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

const ListSize = {
  // ExtraSmall: "sx",
  Small: "sm",
  Medium: "md",
  Large: "lg",
  ExtraLarge: "xl"
}

const ImageType = {
  webp: "webp",
  other: "other"
}

function ConvertUrl(url, size = ListSize.Large, type = ImageType.other) {
  if (url) {
    switch (size) {
      case ListSize.Large:
        url = url.replace("300x300", "150x150");
        break;
      case ListSize.Medium:
        url = url.replace("300x300", "70x70");
        break;
      case ListSize.Small:
        url = url.replace("300x300", "50x50");
        break;
    }

    if (type == ImageType.webp) {
      url = url.replace(url.split('.').pop(), "webp");
    }
  }

  return url;
}

function MemberAvatarUrl(member, size = ListSize.Large, type = ImageType.other) {
  let url = null;

  if (member) {
    if (member.avatar) {
      url = ConvertUrl(useBaseUrl(member.avatar), size, type);
    }

    if (!url) {
      if (member.socials && type == ImageType.other) {
        switch (member.socials.main_social) {
          case 'twitch':
            if (member.socials.twitch && member.socials.twitch.user_data) {
              url = ConvertUrl(useBaseUrl(member.socials.twitch.user_data.profile_image_url), size, type);
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

const MemberPicture = ({ member, size = ListSize.Medium }) => {
  const avatarUrlWebp = MemberAvatarUrl(member, size, ImageType.webp);
  const avatarUrl = MemberAvatarUrl(member, size, ImageType.other);
  return (
    <>
      {member && (avatarUrlWebp || avatarUrl) &&
        <a href={MemberSocialLink(member)} className={clsx(styles.communityMember, styles["communityMember-" + size])}>
          <div className="avatar">
            <picture>
              {avatarUrlWebp &&
                <source srcset={avatarUrlWebp} type="image/webp" />
              }
              {avatarUrl &&
                <source srcset={avatarUrl} />
              }
              <img className="avatar__photo" alt={member.name} src={useBaseUrl('/img/avatars/default.png')} loading='lazy' />
            </picture>
          </div>
        </a>
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
          {(!props.group || member.groups.includes(props.group)) &&
            <MemberPicture member={member} size={props.size} />
          }
        </React.Fragment>
      ))}
    </div>
  );
};

export function CommunityListHome() {
  return (
    <CommunityList className={clsx(styles.communityList, styles.communityHome)} group='member' size={ListSize.Large} />
  );
};

export function CommunityListEvent(props) {
  return (
    <CommunityList className={clsx(styles.communityList)} group={props.group} size={ListSize.Small} />
  );
};