import React from 'react';
import Layout from '@theme/Layout';

import styles from './index.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

const HomepageHeader = () => {
  return (
    <header className="hero hero--primary">
      <div className="container">
        <div className="row">
          <div className="col col--6 margin-bottom--lg">
            <h1 className="hero__title">Un collectif de créateurs pour la protection animale</h1>
            <div>
              <a className="button button--secondary button--lg" href="https://bit.ly/3PE0icI">Nous rejoindre</a>
            </div>
          </div>
          <div className="col col--6">
            <div className="hero__video padding-top--xs">
              <video
                width="100%"
                controls
                id={"home-video-player"}
                className={styles.videoplayer}
              >
                <source src="video/event2022.webm" type="video/webm" />
                <source src="video/event2022.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

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

const MemberPicture = ({ member }) => {
  return (
    <>
      {member &&
        <a href={MemberSocialLink(member)} className={styles.teamlistmember}>
          <div className="avatar">
            <img className="avatar__photo" alt={member.name} src={MemberAvatar(member)} />
          </div>
        </a>
      }
    </>
  );
};

const HomepageMembers = ({ members }) => {
  return (
    <div className="container padding-top--lg padding-bottom--lg">
      <h2 className="margin-bottom--lg text--center">Les membres</h2>
      <div className={styles.teamlist}>
        {members?.map((member) => (
          <>
            {member.groups.includes('member') &&
              <MemberPicture key={member.name} member={member} />
            }
          </>
        ))}
      </div>
    </div>
  );
};

export default function Home({ members }) {
  return (
    <Layout
      description="Créateurs de Compagnie est une association de fait regroupant des passionnés autour du bien-être animal">
      <HomepageHeader />
      <HomepageMembers members={members} />
    </Layout>
  );
}
