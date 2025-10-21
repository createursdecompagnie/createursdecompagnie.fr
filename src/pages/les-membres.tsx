import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import { useTwitchLiveManager } from '@site/src/components/social-community/useTwitchLiveManager';
import { useLocation, useHistory } from '@docusaurus/router';
import { usePluginData } from '@docusaurus/useGlobalData';
import { SocialCommunityPluginData, Members } from '@site/src/plugins/social-community/data/types';
import { MemberAvatar, MemberAvatarOrientation, MemberAvatarSize } from '@site/src/components/social-community';

function useElapsedTime(since) {
  const [elapsed, setElapsed] = useState('00:00');

  useEffect(() => {
    if (!since) return;
    const start = new Date(since);

    function update() {
      const diffMs = Date.now() - start.getTime();
      const totalSeconds = Math.floor(diffMs / 1000);

      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const pad = n => String(n).padStart(2, '0');

      if (hours > 0) setElapsed(`${hours}:${pad(minutes)}:${pad(seconds)}`);
      else setElapsed(`${minutes}:${pad(seconds)}`);
    }

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [since]);

  return elapsed;
}

function getMemberFromParams(members: Members, params: URLSearchParams) {
  const id = params.get('id');
  const twitch = params.get('twitch');

  return members.find(
    m =>
      (id && m.id === id) ||
      (twitch && m.socials?.twitch?.user_data?.login === twitch)
  );
}

export default function MemberPage() {
  let pluginData: SocialCommunityPluginData | undefined;

  try {
    pluginData = usePluginData('social-community-plugin') as SocialCommunityPluginData;
  } catch (error) {
    console.warn('Plugin social-community-plugin not found:', error);
    pluginData = undefined;
  }

  const members = pluginData?.members || [];

  const location = useLocation();
  const history = useHistory();
  const params = new URLSearchParams(location.search);
  const member = getMemberFromParams(members, params);
  const liveInfo = useTwitchLiveManager();
  const twitchId = member?.socials?.twitch?.id;
  const twitchLive = twitchId ? liveInfo[twitchId] : undefined;
  const parent = typeof window !== 'undefined' ? window.location.hostname : '';

  const elapsed = useElapsedTime(twitchLive?.stream?.createdAt);

  const liveMembers = members.filter((m) => {
    const twitchId = m.socials?.twitch?.id;
    const twitchLive = twitchId ? liveInfo[twitchId] : undefined;
    return twitchLive?.isLive;
  });

  useEffect(() => {
    if (!member) {
      history.replace('/404');
    }
  }, [member, history]);

  if (!member) return null;

  return (
    <Layout>
      <main className="container container--fluid margin-vert--lg">
        <h1 className="text--center">Les créateur·ices</h1>
        <div className="row margin-vert--lg">
          <div className="col">
            <MemberAvatar
              member={member}
              name={member.name}
              subtitle={
                <>
                  {twitchLive?.title}
                  {twitchLive?.stream && (
                    <div className="margin-top--sm">
                      <span className="badge badge--transparent">
                        🎮 {twitchLive?.stream?.game?.displayName}
                      </span>
                      &nbsp;
                      <span className="badge badge--transparent">
                        👁️ {twitchLive?.viewersCount}
                      </span>
                      &nbsp;
                      <span className="badge badge--transparent">
                        ⏱️ {elapsed}
                      </span>
                    </div>
                  )}
                </>
              }
              size={MemberAvatarSize.ExtraLarge}
            />
          </div>
        </div>
        <div className="row row--no-gutters margin--none padding--none"  style={{ border: '4px solid var(--ifm-color-primary)', borderRadius: '5px', overflow: 'hidden' }}>
          <div
            className="col col--8"
            style={{ minHeight: '30rem', aspectRatio: '16/9' }}>
            <iframe
              src={`https://player.twitch.tv/?channel=${member.socials.twitch.user_data.login}&muted=false&parent=${parent}`}
              height="100%"
              width="100%"
              allowFullScreen
              title="Twitch Live Player"
              style={{ display: 'block' }}
            />
          </div>
          <div className="col" style={{ minHeight: '25rem' }}>
            <iframe
              title="TwitchChat"
              height="100%"
              width="100%"
              src={`https://www.twitch.tv/embed/${member.socials.twitch.user_data.login}/chat?darkpopout&parent=${parent}`}
            />
          </div>
        </div>
        {/* <div className="row margin-vert--lg">
          <div className="col">
            <a className="button button--transparent button--lg margin-right--lg" href="#">Cagnotte : 1234 €</a>
            <a className="button button--primary button--lg" href="#">Donner pour CDC2025</a>
          </div>
          <div className="col text--right">
          </div>
        </div> */}
        <h2 className='margin-top--xl'>En live en ce moment :</h2>
        <div className="row">
        </div>
        {/* {liveMembers.map((member) => (
          <div key={member.id} className="col col--2">
              <div className="card margin-bottom--sm shadow--tl">
                <div className="card__header text--center">
                  <h3>{member.name}</h3>
                </div>
                <div className="card__body">
                  <MemberAvatar
                    member={member}
                    size={MemberAvatarSize.ExtraLarge}
                    orientation={MemberAvatarOrientation.Vertical}
                    className="margin-bottom--sm"
                  />
                </div>
            </div>
          </div>
        ))} */}
        <h2 className='margin-top--xl'>D'autres créateur·ices :</h2>
      </main>
    </Layout>
  );
}
