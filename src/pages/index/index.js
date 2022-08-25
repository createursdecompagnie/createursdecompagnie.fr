import React from 'react';
import Layout from '@theme/Layout';

import styles from './index.module.css';

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

const MemberPicture = ({ member }) => {
  return (
    <>
      {member && member.social.twitch && member.social.twitch.user_data &&
        <a href={"https://www.twitch.tv/" + member.social.twitch.login} className={styles.teamlistmember}>
          <div className="avatar">
            <img className="avatar__photo" alt={member.name} src={member.social.twitch.user_data.profile_image_url} />
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
          <MemberPicture key={member.name} member={member} />
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
