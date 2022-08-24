import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Member, TwitchUserData } from '../../plugins/social-community/data/types';
import Layout from '@theme/Layout';

import styles from './index.module.css';

const HomepageHeader = () => {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header class="hero hero--primary">
      <div class="container">
        <div className="row">
          <div className="col col--6 margin-bottom--lg">
            <h1 className="hero__title">Une association de créateurs pour la protection animale</h1>
            <p className="hero__subtitle">Un texte descriptif un peu plus complet avec quelques informations sur l'association.</p>
            <div>
              <a class="button button--secondary button--lg" href="https://bit.ly/3PE0icI">Nous rejoindre</a>
              <button className="button button--secondary button--outline button--lg margin-left--md">
                En savoir plus...
              </button>
            </div>
          </div>
          <div className="col col--6">
            <div className="hero__video padding-top--xs">
              <video
                width="100%"
                controls
                id={"demo-video-player"}
                className={styles.player}
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

const MemberPicture = ({ member }) => {
  return (
    <>
      {member && member.social.twitch && member.social.twitch.user_data &&
        <a href={"https://www.twitch.tv/" + member.social.twitch.login} className={styles.teamlistmember}>
          <div class="avatar">
            <img class="avatar__photo avatar__photo--xl" alt={member.name} src={member.social.twitch.user_data.profile_image_url} />
          </div>
        </a>
      }
    </>
  );
};

const HomepageMembers = ({ Members }) => {
  return (
    <div class="container padding-top--lg padding-bottom--lg">
      <h2 class="margin-bottom--lg text--center">Les membres</h2>
      <div className={`${styles.teamlist} ${styles.teamlist_home}`}>
        {Members.map((m) => (
          <MemberPicture key={m.name} member={m} />
        ))}
      </div>
    </div>
  );
};

export default function Home({ Members }) {
  console.log(Members);
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      description="Créateurs de Compagnie est une association de fait regroupant des passionnés autour du bien-être animal">
      <HomepageHeader />
      <HomepageMembers Members={Members} />
    </Layout>
  );
}
