import React from 'react';
import clsx from 'clsx';
import { usePluginData } from '@docusaurus/useGlobalData';

import styles from './style.module.css';

function MemberAvatar(member) {
  if (member && member.socials) {
    switch (member.socials.main_social) {
      case 'twitch':
        if (member.socials.twitch && member.socials.twitch.user_data) return member.socials.twitch.user_data.profile_image_url;
        break;
      default:
        if (member.avatar) return useBaseUrl(member.avatar);
        break;
    }
  }

  return "#";
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

const MemberPicture = ({ member }) => {
  return (
    <>
      {member &&
        <a href={MemberSocialLink(member)}  className={clsx(styles.communityMember)}>
          <div className="avatar">
            <img className="avatar__photo" alt={member.name} src={MemberAvatar(member)} loading='lazy' />
          </div>
        </a>
      }
    </>
  );
};

export function CommunityList(props) {
  const { members } = usePluginData('social-community-plugin');
  const isHome = !props.home ? false : props.home;
  return (
    <div className={clsx(styles.communityList, isHome ? styles.communityHome : undefined)}>
      {members?.map((member) => {
        if (!props.group || member.groups.includes(props.group))
          return <MemberPicture key={member.name} member={member} />;
      })}
    </div>
  );
};


export function CommunityListHome(props) {
  const { members } = usePluginData('social-community-plugin');
  return (
    <div className={clsx(styles['communityList'])}>
      {members?.map((member) => (
        <>
          {(!props.group || member.groups.includes(props.group)) &&
            <MemberPicture key={member.name} member={member} />
          }
        </>
      ))}
    </div>
  );
};