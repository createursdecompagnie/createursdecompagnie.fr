import React, { useEffect, useState } from 'react';
import { useTwitchLiveManager } from '@site/src/components/social-community/useTwitchLiveManager';
import { usePluginData } from '@docusaurus/useGlobalData';
import { getMembersFromPluginData } from '@site/src/components/social-community';
import type { SocialCommunityPluginData, PlanningEvent, Member } from '@site/src/plugins/social-community/data/types';
import { Group } from '@site/src/plugins/social-community/data/types';

interface MaintrackPlayerProps {
  group: Group;
}

export function MaintrackPlayer({ group }: MaintrackPlayerProps) {
  const { plannings } = usePluginData('social-community-plugin') as SocialCommunityPluginData;
  const liveInfo = useTwitchLiveManager();
  const members = getMembersFromPluginData();
  const groupMembers = members.filter(m => m.groups?.includes(group));
  const parentDomain = typeof window !== 'undefined' ? window.location.hostname : '';

  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  useEffect(() => {
    if (!liveInfo || Object.keys(liveInfo).length === 0) return;

    const currentMember = groupMembers.find(
      m => m.socials?.twitch?.user_data?.login === selectedChannel
    );
    const currentId = currentMember?.socials?.twitch?.id;
    const stillLive = currentId && liveInfo[currentId]?.isLive;

    if (stillLive) {
      return;
    }

    const planningEvents = plannings[group] ?? [];
    const now = new Date();

    const mainEvent = planningEvents.find(
      (e: PlanningEvent) =>
        e.maintrack === true &&
        now >= new Date(e.start) &&
        now <= new Date(e.end)
    );

    const getTwitchLogin = (memberId: string) =>
      groupMembers.find(m => m.id === memberId)?.socials?.twitch?.user_data?.login ?? null;

    let chosenChannel: string | null = null;

    if (mainEvent) {
      const mainPresenters = mainEvent.presenters.map(getTwitchLogin).filter(Boolean) as string[];
      const mainLive = mainPresenters.find(login => {
        const twitchId = groupMembers.find(
          m => m.socials?.twitch?.user_data?.login === login
        )?.socials?.twitch?.id;
        return twitchId && liveInfo[twitchId]?.isLive;
      });

      if (mainLive) {
        chosenChannel = mainLive;
      }
    }

    if (!chosenChannel) {
      const liveMembers = groupMembers.filter(m => {
        const id = m.socials?.twitch?.id;
        return id && liveInfo[id]?.isLive;
      });

      if (liveMembers.length > 0) {
        const random = liveMembers[Math.floor(Math.random() * liveMembers.length)];
        chosenChannel = random.socials?.twitch?.user_data?.login ?? null;
      }
    }

    if (chosenChannel && chosenChannel !== selectedChannel) {
      setSelectedChannel(chosenChannel);
    }
  }, [group, plannings, liveInfo, members]);

  const channelToDisplay = selectedChannel ?? 'misternooton';

  return (
    <iframe
      src={`https://player.twitch.tv/?channel=${channelToDisplay}&parent=${parentDomain}&muted=false`}
      allowFullScreen
      title={`Twitch player - ${channelToDisplay}`}
      style={{ width: '100%', aspectRatio: '16 / 9' }}
    />
  );
}
