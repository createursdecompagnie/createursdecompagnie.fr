import React from 'react';
import clsx from 'clsx';
import { usePluginData } from '@docusaurus/useGlobalData';

import styles from './style.module.css';

const ListSize = {
  // ExtraSmall: "sx",
  Small: "sm",
  Medium: "md",
  Large: "lg",
  ExtraLarge: "xl"
}

function MemberAvatar(member, size = ListSize.Large) {
  let url = "#";

  if (member && member.socials) {
    switch (member.socials.main_social) {
      case 'twitch':
        if (member.socials.twitch && member.socials.twitch.user_data) {
          url = member.socials.twitch.user_data.profile_image_url;
        }

        switch (size) {
          case ListSize.Large:
            url = url.replace("300x300.png", "150x150.png");
            break;
          case ListSize.Medium:
            url = url.replace("300x300.png", "70x70.png");
            break;
          case ListSize.Small:
            url = url.replace("300x300.png", "50x50.png");
            break;
        }
        break;
    }

    if (!url && member.avatar) {
      url = useBaseUrl(member.avatar);
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
  return (
    <>
      {member &&
        <a href={MemberSocialLink(member)} className={clsx(styles.communityMember, styles["communityMember-" + size])}>
          <div className="avatar">
            <img className="avatar__photo" alt={member.name} src={MemberAvatar(member, size)} loading='lazy' />
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
        <>
          {(!props.group || member.groups.includes(props.group)) &&
            <MemberPicture key={member.name} member={member} size={props.size} />
          }
        </>
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