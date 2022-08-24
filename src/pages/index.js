import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
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
              >
                <source src="video/event2022.webm" type="video/webm"/>
                <source src="video/event2022.mp4" type="video/mp4"/>
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      description="Créateurs de Compagnie est une association de fait regroupant des passionnés autour du bien-être animal">
      <HomepageHeader />
    </Layout>
  );
}
