import React, { act, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useTwitchLiveManager } from '@site/src/components/social-community/useTwitchLiveManager';
import { useLocation, useHistory } from '@docusaurus/router';
import { Member, Group } from '@site/src/plugins/social-community/data/types';
import { MemberAvatar, MemberAvatarOrientation, MemberAvatarSize, generateMemberProfileUrl, getMembersFromPluginData, getDisplayNameForMember } from '@site/src/components/social-community';

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
  const firstValidGroup = groupsFromUrl.find(g => g in FILTRABLE_GROUPS);

  if (!firstValidGroup) {
    return members;
  }

  return members.filter(m => m.groups?.includes(firstValidGroup));
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

  live.sort((a, b) => {
    const aId = a.socials!.twitch!.id!;
    const bId = b.socials!.twitch!.id!;
    const aTime = new Date(liveInfo[aId]?.stream?.createdAt).getTime() || 0;
    const bTime = new Date(liveInfo[bId]?.stream?.createdAt).getTime() || 0;
    return bTime - aTime;
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
  activeGroup?: Group | null;
}

function MemberCard({ member, liveInfo, activeGroup }: MemberCardProps) {
  const twitchId = member.socials?.twitch?.id;
  const twitchLive = twitchId ? liveInfo[twitchId] : undefined;
  const elapsed = useElapsedTime(twitchLive?.stream?.createdAt);
  const href = generateMemberProfileUrl(member, activeGroup);

  return (
    <a href={href} className='text--no-decoration' style={{color: 'var(--ifm-color-content)'}}>
      <div className="card margin-bottom--lg shadow--tl">
        <div className="card__header text--center">
          <h3>{getDisplayNameForMember(member)}</h3>
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
    </a>
  );
}

interface GroupFiltersProps {
  activeGroup: string | null;
  onToggle: (group: Group) => void;
}

function GroupFilters({ activeGroup, onToggle }: GroupFiltersProps) {
  return (
    <div className="row margin-vert--lg">
      <div className="col">
        {Object.entries(FILTRABLE_GROUPS).map(([key, label]) => {
          const group = key as Group;
          const isActive = activeGroup === group;
          
          return (
            <button
              key={group}
              className={`button button--secondary margin-right--sm margin-bottom--sm ${
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
  activeGroup?: Group | null;
}

function MembersGrid({ title, members, liveInfo, className = '', activeGroup }: MembersGridProps) {
  if (members.length === 0) return null;

  return (
    <>
      <h2 className={className}>{title}</h2>
      <div className="row">
        {members.map(member => (
          <div key={member.id} className="col col--3">
            <MemberCard member={member} liveInfo={liveInfo} activeGroup={activeGroup} />
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
  const [activeGroup, setActiveGroup] = useState<Group | null>(() => {
    const groupsFromUrl = params.getAll('group') as Group[];
    return groupsFromUrl.find(g => g in FILTRABLE_GROUPS) || null;
  });
  
  const member = getMemberFromParams(members, params);
  const filteredMembers = filterMembersByGroups(members, params);
  const { live: liveMembers, offline: otherMembers } = splitMembersByLiveStatus(filteredMembers, liveInfo);
  
  const twitchId = member?.socials?.twitch?.id;
  const twitchLive = twitchId ? liveInfo[twitchId] : undefined;
  const elapsed = useElapsedTime(twitchLive?.stream?.createdAt);
  const parent = typeof window !== 'undefined' ? window.location.hostname : '';

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const groupsFromUrl = params.getAll('group') as Group[];
    const urlGroup = groupsFromUrl.find(g => g in FILTRABLE_GROUPS) || null;
    setActiveGroup(urlGroup);
  }, [location.search]);

  const toggleGroup = (group: Group) => {
    const newParams = new URLSearchParams(location.search);
    newParams.delete('group');

    if (activeGroup !== group) {
      newParams.append('group', group);
    }

    history.push({
      pathname: baseUrl,
      search: newParams.toString(),
      hash: 'filtres',
    });

    setActiveGroup(activeGroup !== group ? group : null);
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
                  name={getDisplayNameForMember(member)}
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
        <GroupFilters activeGroup={activeGroup} onToggle={toggleGroup} />

        <MembersGrid
          activeGroup={activeGroup}
          title="En direct en ce moment :"
          members={liveMembers}
          liveInfo={liveInfo}
          className="margin-top--xl"
        />
        <MembersGrid
          activeGroup={activeGroup}
          title="D'autres créateur·ices :"
          members={otherMembers}
          liveInfo={liveInfo}
          className="margin-top--lg"
        />
      </main>
    </Layout>
  );
}