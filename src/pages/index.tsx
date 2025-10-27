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
          <div className="col col--6">
            <div className="hero__video padding-top--xs">
              <video
                width="100%"
                controls
                id={"home-video-player"}
                className={styles.videoplayer}
              >
                <source src="video/cdc2025/teaser.webm" type="video/webm" />
                <source src="video/cdc2025/teaser.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
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
      <iframe
        className={clsx('margin-top--sm', styles.liveIframe)}
        src="https://player.twitch.tv/?channel=misternooton&parent=createursdecompagnie.fr&muted=false"
        height="720"
        width="1280"
        allowFullScreen />
    </div>
  } else {
    return <div style={{ marginBottom: '3.5rem' }}>
      <span className={styles.countdownStart}>commence dans :</span>
      <span className={styles.countdown}>{formatted.days}<span className={styles.countdownSpacer}> : </span>{formatted.hours}<span className={styles.countdownSpacer}> : </span>{formatted.minutes}<span className={styles.countdownSpacer}> : </span>{formatted.seconds}</span>
    </div>;
  }
};

function HomepageCDC2025(): ReactNode {
  return (
    <>
      <div className="container padding-top--xl  padding-bottom--lg text--center">
        <h2 className="margin-bottom--none"><a href="/evenement/cdc2025">CDC 2025</a></h2>
        <p>du 7 au 9 novembre</p>
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
            <p className="padding-horiz--md">au profit de l'association <a href="https://www.potironfamily.fr/">Potiron Family</a>.</p>
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
            <p className="padding-horiz--md">pendant <a href="/evenement/cdc2025#le-planning">tout le week-end</a>.</p>
          </div>
        </div>
        <a className="button button--primary button--lg" href="https://chk.me/onvgyRM">S'inscrire à l'évènement</a>
        {/* <a className="button button--lg button--primary" href="https://streamlabscharity.com/teams/@createurs-de-compagnie-2025/cdc2025">Faire un don pour Potiron Family</a> */}
      </div>

    <div className={styles.separatorBlock}>
      <div className="container text--center">
        <h3 className="margin-top--lg margin-bottom--md">Le Live</h3>
        <Countdown
          date="2025-11-07T16:00:00.000Z"
          renderer={renderCountdown}
        />
      </div>
    </div>

      <div className="container text--center margin-bottom--xl">
        <h3 className="margin-top--lg margin-bottom--md">Les participant·es</h3>
        <div className="margin-bottom--lg">
          <CommunityListHome group={Group.cdc2025} />
        </div>
        <a className="button button--primary button--lg" href="/les-createurices?group=cdc2025">Regarder en direct</a>
      </div>
    </>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      description="Créateurs de Compagnie est une association de fait regroupant des passionnés autour du bien-être animal">
      <HomepageHeader />
      <HomepageCDC2025 />
    </Layout>
  );
}