import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useTwitchLiveManager } from '@site/src/components/social-community/useTwitchLiveManager';
import { useLocation, useHistory } from '@docusaurus/router';
import { Member, Group } from '@site/src/plugins/social-community/data/types';
import { MemberAvatar, MemberAvatarOrientation, MemberAvatarSize, getMembersFromPluginData } from '@site/src/components/social-community';

const FILTRABLE_GROUPS: Partial<Record<Group, string>> = {
  [Group.cdc2025]: 'CDC 2025',
  [Group.cdc2022]: 'CDC 2022',
  [Group.sct]: 'Sans Croquettes Twitch',
};

function getMemberFromParams(members: Member[], params: URLSearchParams): Member | undefined {
  const twitch = params.get('twitch');
  return members.find(m => twitch && m.socials?.twitch?.user_data?.login === twitch);
}

function filterMembersByGroups(members: Member[], params: URLSearchParams): Member[] {
  const groupsFromUrl = params.getAll('group') as Group[];
  const validGroups = groupsFromUrl.filter(g => g in FILTRABLE_GROUPS);

  if (validGroups.length === 0) {
    return members;
  }

  return members.filter(m => m.groups?.some(g => validGroups.includes(g)));
}

function splitMembersByLiveStatus(
  members: Member[], 
  liveInfo: ReturnType<typeof useTwitchLiveManager>
) {
  const live: Member[] = [];
  const offline: Member[] = [];

  members.forEach(member => {
    const twitchId = member.socials?.twitch?.id;
    const isLive = twitchId && liveInfo[twitchId]?.isLive;
    
    if (isLive) {
      live.push(member);
    } else {
      offline.push(member);
    }
  });

  return { live, offline };
}

function useElapsedTime(since?: string) {
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
      const pad = (n: number) => String(n).padStart(2, '0');

      if (hours > 0) {
        setElapsed(`${hours}:${pad(minutes)}:${pad(seconds)}`);
      } else {
        setElapsed(`${minutes}:${pad(seconds)}`);
      }
    }

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [since]);

  return elapsed;
}

interface LiveBadgesProps {
  gameName?: string;
  viewersCount?: number;
  elapsed?: string;
  centered?: boolean;
}

function LiveBadges({ gameName, viewersCount, elapsed, centered = false }: LiveBadgesProps) {
  return (
    <div className={`margin-top--sm ${centered ? 'text--center' : ''}`}>
      {gameName && (
        <span className="badge badge--transparent">
          🎮 {gameName}
        </span>
      )}
      {viewersCount !== undefined && (
        <>
          &nbsp;
          <span className="badge badge--transparent">
            👁️ {viewersCount}
          </span>
        </>
      )}
      {elapsed && (
        <>
          &nbsp;
          <span className="badge badge--transparent">
            ⏱️ {elapsed}
          </span>
        </>
      )}
    </div>
  );
}

interface MemberCardProps {
  member: Member;
  liveInfo: ReturnType<typeof useTwitchLiveManager>;
}

function MemberCard({ member, liveInfo }: MemberCardProps) {
  const twitchId = member.socials?.twitch?.id;
  const twitchLive = twitchId ? liveInfo[twitchId] : undefined;
  const elapsed = useElapsedTime(twitchLive?.stream?.createdAt);

  return (
    <div className="card margin-bottom--lg shadow--tl">
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
        {twitchLive?.stream && (
          <LiveBadges
            gameName={twitchLive.stream.game?.displayName}
            viewersCount={twitchLive.viewersCount}
            elapsed={elapsed}
            centered
          />
        )}
      </div>
    </div>
  );
}

interface GroupFiltersProps {
  activeGroups: string[];
  onToggle: (group: Group) => void;
}

function GroupFilters({ activeGroups, onToggle }: GroupFiltersProps) {
  return (
    <div className="row margin-vert--lg">
      <div className="col">
        {Object.entries(FILTRABLE_GROUPS).map(([key, label]) => {
          const group = key as Group;
          const isActive = activeGroups.includes(group);
          
          return (
            <button
              key={group}
              className={`button button--secondary margin-right--sm ${
                isActive ? '' : 'button--outline'
              }`}
              onClick={() => onToggle(group)}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface MembersGridProps {
  title: string;
  members: Member[];
  liveInfo: ReturnType<typeof useTwitchLiveManager>;
  className?: string;
}

function MembersGrid({ title, members, liveInfo, className = '' }: MembersGridProps) {
  if (members.length === 0) return null;

  return (
    <>
      <h2 className={className}>{title}</h2>
      <div className="row">
        {members.map(member => (
          <div key={member.id} className="col col--3">
            <MemberCard member={member} liveInfo={liveInfo} />
          </div>
        ))}
      </div>
    </>
  );
}

interface TwitchPlayerProps {
  channelLogin: string;
  parent: string;
}

function TwitchPlayer({ channelLogin, parent }: TwitchPlayerProps) {
  return (
    <div className="row row--no-gutters margin--none padding--none" 
         style={{ 
           border: '4px solid var(--ifm-color-primary)', 
           borderRadius: '5px', 
           overflow: 'hidden' 
         }}>
      <div className="col col--8" style={{ minHeight: '30rem', aspectRatio: '16/9' }}>
        <iframe
          src={`https://player.twitch.tv/?channel=${channelLogin}&muted=false&parent=${parent}`}
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
          src={`https://www.twitch.tv/embed/${channelLogin}/chat?darkpopout&parent=${parent}`}
        />
      </div>
    </div>
  );
}

export default function MemberPage() {
  const members = getMembersFromPluginData();
  const location = useLocation();
  const history = useHistory();
  const baseUrl = useBaseUrl('/les-createurices');
  const liveInfo = useTwitchLiveManager();
  
  const params = new URLSearchParams(location.search);
  const activeGroups = params.getAll('group');
  const member = getMemberFromParams(members, params);
  const filteredMembers = filterMembersByGroups(members, params);
  const { live: liveMembers, offline: otherMembers } = splitMembersByLiveStatus(filteredMembers, liveInfo);
  
  const twitchId = member?.socials?.twitch?.id;
  const twitchLive = twitchId ? liveInfo[twitchId] : undefined;
  const elapsed = useElapsedTime(twitchLive?.stream?.createdAt);
  const parent = typeof window !== 'undefined' ? window.location.hostname : '';

  const toggleGroup = (group: Group) => {
    const newParams = new URLSearchParams(location.search);

    if (activeGroups.includes(group)) {
      newParams.delete('group');
      activeGroups
        .filter(g => g !== group)
        .forEach(g => newParams.append('group', g));
    } else {
      newParams.append('group', group);
    }

    history.push({
      pathname: baseUrl,
      search: newParams.toString(),
      hash: 'filtres',
    });
  };

  return (
    <Layout>
      <main className="container container--fluid margin-vert--lg">
        <h1 className="text--center">Les créateur·ices</h1>
        
        {member && (
          <>
            <div className="row margin-vert--lg">
              <div className="col">
                <MemberAvatar
                  member={member}
                  name={member.name}
                  subtitle={
                    <>
                      {twitchLive?.title}
                      {twitchLive?.stream && (
                        <LiveBadges
                          gameName={twitchLive.stream.game?.displayName}
                          viewersCount={twitchLive.viewersCount}
                          elapsed={elapsed}
                        />
                      )}
                    </>
                  }
                  size={MemberAvatarSize.ExtraLarge}
                />
              </div>
            </div>

            <TwitchPlayer 
              channelLogin={member.socials.twitch.user_data.login} 
              parent={parent} 
            />
          </>
        )}

        <div id="filtres"></div>
        <h2 className="margin-top--xl">
          Filtres <br/>
          <span className='text--light'><small>{filteredMembers.length}/{members.length} créateur·ices</small></span>
        </h2>
        <GroupFilters activeGroups={activeGroups} onToggle={toggleGroup} />

        <MembersGrid
          title="En direct en ce moment :"
          members={liveMembers}
          liveInfo={liveInfo}
          className="margin-top--xl"
        />
        <MembersGrid
          title="D'autres créateur·ices :"
          members={otherMembers}
          liveInfo={liveInfo}
          className="margin-top--lg"
        />
      </main>
    </Layout>
  );
}