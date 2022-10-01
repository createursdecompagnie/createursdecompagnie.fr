import React from 'react';
import Layout from '@theme/Layout';

import styles from './index.module.css';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { CommunityListHome } from '/src/components/social-community/'

const HomepageHeader = () => {
  return (
    <header className={clsx('hero hero--primary', styles.header)}>
      <div className="container">
        <div className="row">
          <div className="col col--6 margin-bottom--lg">
            <h1 className="hero__title margin-bottom--sm">Un collectif de créateurs pour la protection animale</h1>
            {/* <p className="hero__subtitle"></p> */}
            <div>
              <Link className={clsx('button button--secondary button--lg margin-right--md margin-top--md', styles.buttonSizeFixed)} to="https://bit.ly/3PE0icI">Nous rejoindre</Link>
              <Link className={clsx('button button--secondary button--outline button--lg margin-top--md', styles.buttonSecondary, styles.buttonSizeFixed)} to="/le-collectif">En savoir plus...</Link>
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
                <source src="video/cdc2022/teaser.webm" type="video/webm" />
                <source src="video/cdc2022/teaser.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const HomepageMembers = () => {
  return (
    <div className={clsx('container padding-top--lg padding-bottom--lg', styles.members)}>
      <h2 className="margin-bottom--lg text--center">Les membres</h2>
      <CommunityListHome />
    </div>
  );
};

export default function Home() {
  return (
    <Layout
      description="Créateurs de Compagnie est une association de fait regroupant des passionnés autour du bien-être animal">
      <HomepageHeader />
      <HomepageMembers />
    </Layout>
  );
}
