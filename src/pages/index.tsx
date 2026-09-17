import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';

import styles from './index.module.css';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { CommunityListHome } from '@site/src/components/social-community'
import Countdown from 'react-countdown';
import { Group } from '../plugins/social-community/data/types';
import { MaintrackPlayer } from '../components/maintrackPlayer';

interface CountdownRendererProps {
  formatted: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
  completed: boolean;
}

function HomepageHeader(): ReactNode {
  return (
    <header className={clsx('hero hero--primary', styles.header)}>
      <div className="container">
        <div className="row">
          <div className="col col--6 margin-bottom--lg">
            <h1 className="hero__title margin-bottom--sm">Un collectif de créateurs pour la protection animale</h1>
            {/* <p className="hero__subtitle"></p> */}
            <div>
              <Link className={clsx('button button--secondary button--outline button--lg margin-top--md', styles.buttonSecondary, styles.buttonSizeFixed)} to="/le-collectif">En savoir plus...</Link>
            </div>
          </div>
          {/* <div className="col col--6">
            <div className="hero__video padding-top--xs">
              <video
                width="100%"
                controls
                id={"home-video-player"}
                className={styles.videoplayer}
              >
                <source src="video/cdc2026/teaser.webm" type="video/webm" />
                <source src="video/cdc2026/teaser.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div> */}
        </div>
      </div>
    </header>
  );
}

function HomepageMembers(): ReactNode {
  return (
    <div className={clsx('container padding-top--lg padding-bottom--lg', styles.members)}>
      <h2 className="margin-bottom--lg text--center">Les membres</h2>
      <CommunityListHome />
    </div>
  );
}

const renderCountdown = ({ formatted, completed }: CountdownRendererProps): ReactNode => {

  if (completed) {
    return <div className="margin-bottom--xl">
      <MaintrackPlayer group={Group.cdc2026} />
    </div>;
  } else {
    return <div style={{ marginBottom: '3.5rem' }}>
      <span className={styles.countdownStart}>commence dans :</span>
      <span className={styles.countdown}>{formatted.days}<span className={styles.countdownSpacer}> : </span>{formatted.hours}<span className={styles.countdownSpacer}> : </span>{formatted.minutes}<span className={styles.countdownSpacer}> : </span>{formatted.seconds}</span>
    </div>;
  }
};

function HomepageCDC2026(): ReactNode {
  return (
    <>
      <div className="container padding-top--xl  padding-bottom--lg text--center">
        <h2 className="margin-bottom--none"><a href="/evenement/cdc2026/l-evenement">CDC 2026</a></h2>
        <p>du 6 au 8 novembre</p>
        <div className="row margin-top--lg">
          <div className="col margin-bottom--md">
            <ThemedImage
              className={styles.eventImage}
              alt="Docusaurus themed image" width={318} height={200}
              sources={{
                light: useBaseUrl('img/home/event_digital.svg'),
                dark: useBaseUrl('img/home/event_digital-dark.svg'),
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
                light: useBaseUrl('img/home/event_petcare.svg'),
                dark: useBaseUrl('img/home/event_petcare-dark.svg'),
              }}
              loading='lazy'
            />
            <h3 className={clsx('padding-vert--none margin-vert--none', styles.eventHeading)}>Pour la protection animale</h3>
            <p className="padding-horiz--md">au profit du sanctuaire <a href="https://www.facebook.com/lerepereasso/">Le repère</a>.</p>
          </div>
          <div className="col padding-bottom--md">
            <ThemedImage
              className={styles.eventImage}
              alt="Docusaurus themed image" width={318} height={200}
              sources={{
                light: useBaseUrl('img/home/event_calendar.svg'),
                dark: useBaseUrl('img/home/event_calendar-dark.svg'),
              }}
              loading='lazy'
            />
            <h3 className={clsx('padding-vert--none margin-vert--none', styles.eventHeading)}>Diffusé sur internet</h3>
            <p className="padding-horiz--md">pendant <a href="/evenement/cdc2026/planning">tout le week-end</a>.</p>
          </div>
        </div>
      </div>


      <div className="container text--center margin-bottom--xl">
        <a className="button button--primary button--lg" href="https://t.co/ARHoK9amNh">👉 S'inscrire à l'évènement</a>
      </div>

    <div className={styles.separatorBlock}>
      <div className="container text--center">
        <h3 className="margin-top--lg margin-bottom--md">Le Live</h3>
        <Countdown
          date="2026-11-06T17:00:00.000Z"
          renderer={renderCountdown}
        />
      </div>
    </div>

      <div className="container text--center margin-bottom--xl">
        <h3 className="margin-top--lg margin-bottom--md">Les participant·es</h3>
        <div className="margin-bottom--lg">
          <CommunityListHome group={Group.cdc2026} />
        </div>
        <a className="button button--primary button--lg" href="/les-createurices?group=cdc2026">📺 Regarder en direct</a>
      </div>
    </>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      description="Créateurs de Compagnie est une association de fait regroupant des passionnés autour du bien-être animal">
      <HomepageHeader />
      <HomepageCDC2026 />
    </Layout>
  );
}