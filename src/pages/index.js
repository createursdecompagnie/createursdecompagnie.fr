import React from 'react';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';

import styles from './index.module.css';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { CommunityListHome } from '/src/components/social-community/'
import Countdown from 'react-countdown';

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

const renderCountdown = ({ formatted, completed }) => {
  if (completed) {
    return <div className="margin-bottom--xl">
      <iframe
        className={clsx('margin-top--sm', styles.liveIframe)}
        src="https://player.twitch.tv/?channel=createursdecompagnie&parent=createursdecompagnie.fr&muted=false"
        height="720"
        width="1280"
        allowfullscreen />
    </div>
  } else {
    return <div className="margin-bottom--none">
      <span style={{ display: 'block', fontSize: '1rem' }}>Commence dans :</span>
      <span style={{ display: 'block', fontSize: '6rem', marginTop: '-30px' }}>{formatted.days}<span style={{ color: 'var(--ifm-color-primary)' }}> : </span>{formatted.hours}<span style={{ color: 'var(--ifm-color-primary)' }}> : </span>{formatted.minutes}<span style={{ color: 'var(--ifm-color-primary)' }}> : </span>{formatted.seconds}</span>
    </div>;
  }
};

const HomepageCDC2022 = () => {
  return (
    <div className="container padding-top--lg  padding-bottom--lg text--center">
      <h2 className="margin-bottom--none"><a href="/evenement/cdc2022/a-propos">CDC 2022</a></h2>
      <p>du 21 au 23 octobre</p>
      <div className="row margin-top--lg">
        <div className="col margin-bottom--md">
          <ThemedImage
            className={styles.eventImage}
            alt="Docusaurus themed image" width={318} height={200}
            sources={{
              light: useBaseUrl('img/cdc2022/home_event_digital.svg'),
              dark: useBaseUrl('img/cdc2022/home_event_digital-dark.svg'),
            }}
            loading='lazy'
          />
          <h3 className={clsx('padding-vert--none margin-vert--none', styles.eventHeading)}>Un évènement caritatif</h3>
          <p className="padding-horiz--md">organisé par <a href="/le-collectif">Créateurs de Compagnie</a>.<br /></p>
        </div>
        <div className="col padding-bottom--md">
          <ThemedImage
            className={styles.eventImage}
            alt="Docusaurus themed image" width={318} height={200}
            sources={{
              light: useBaseUrl('img/cdc2022/home_event_petcare.svg'),
              dark: useBaseUrl('img/cdc2022/home_event_petcare-dark.svg'),
            }}
            loading='lazy'
          />
          <h3 className={clsx('padding-vert--none margin-vert--none', styles.eventHeading)}>Pour la protection animale</h3>
          <p className="padding-horiz--md">au profit de l'association <a href="https://hirondelle.ovh">l'Hirondelle</a>.</p>
        </div>
        <div className="col padding-bottom--md">
          <ThemedImage
            className={styles.eventImage}
            alt="Docusaurus themed image" width={318} height={200}
            sources={{
              light: useBaseUrl('img/cdc2022/home_event_calendar.svg'),
              dark: useBaseUrl('img/cdc2022/home_event_calendar-dark.svg'),
            }}
            loading='lazy'
          />
          <h3 className={clsx('padding-vert--none margin-vert--none', styles.eventHeading)}>Diffusé sur Twitch</h3>
          <p className="padding-horiz--md">pendant <a href="/evenement/cdc2022/planning">tout le week-end</a>.</p>
        </div>
      </div>
      <h3 className="margin-top--lg margin-bottom--md">Le Live</h3>
      <Countdown
        date="2022-10-21T16:00:00.000Z"
        renderer={renderCountdown}
      />
      <h3 className="margin-top--lg margin-bottom--md">Les participant-es</h3>
      <CommunityListHome group='cdc2022' />
    </div>
  );
};

export default function Home() {
  return (
    <Layout
      description="Créateurs de Compagnie est une association de fait regroupant des passionnés autour du bien-être animal">
      <HomepageHeader />
      <HomepageCDC2022 />
    </Layout>
  );
}
