import React, { useEffect, useState, useCallback, createContext, useContext } from 'react';
import members from '@site/src/data/members';
import { Group } from '@site/src/plugins/social-community/data/types';

interface TwitchUserLiveInfo {
  id: string;
  login: string;
  displayName: string;
  isLive: boolean;
  title?: string;
  viewersCount?: number;
  gameName?: string;
  logo?: string;
  banner?: string;
  chatColor?: string;
  isPartner?: boolean;
  chatterCount?: number;
  stream?: {
    title: string;
    id: string;
    createdAt: string;
    type: string;
    viewersCount: number;
    game: { displayName: string };
  } | null;
  [key: string]: any;
}

function extractTwitchIds(): string[] {
  return members
    .filter(m => m.groups && m.groups.includes(Group.cdc2025)) // Temporary: only consider CDC 2025 members
    .map(m => m.socials?.twitch?.id)
    .filter((id): id is string => !!id && id.length > 0);
}

async function fetchTwitchLiveInfo(ids: string[]): Promise<Record<string, TwitchUserLiveInfo>> {
  if (!ids.length) return {};
  const chunkSize = 50;
  const result: Record<string, TwitchUserLiveInfo> = {};
  for (let i = 0; i < ids.length; i += chunkSize) {
    const chunk = ids.slice(i, i + chunkSize);
    const url = `https://api.ivr.fi/v2/twitch/user?id=${chunk.join(',')}`;
    const resp = await fetch(url);
    if (!resp.ok) continue;
    const data = await resp.json();
    for (const user of data) {
      result[user.id] = {
        id: user.id,
        login: user.login,
        displayName: user.displayName,
        isLive: user.stream !== null,
        title: user.stream?.title ?? undefined,
        viewersCount: user.stream?.viewersCount ?? undefined,
        gameName: user.stream?.game?.displayName ?? undefined,
        logo: user.logo,
        banner: user.banner,
        chatColor: user.chatColor,
        isPartner: user.roles?.isPartner ?? false,
        chatterCount: user.chatterCount,
        stream: user.stream,
        ...user
      };
    }
  }
  return result;
}

const TwitchLiveManagerContext = createContext<Record<string, TwitchUserLiveInfo>>({});

type TwitchLiveManagerProviderProps = {
  children: React.ReactNode;
  refreshMs?: number;
};

export function TwitchLiveManagerProvider({ children, refreshMs = 180000 }: TwitchLiveManagerProviderProps) {
  const [liveInfo, setLiveInfo] = useState<Record<string, TwitchUserLiveInfo>>({});

  const refresh = useCallback(async () => {
    const ids = extractTwitchIds();
    const info = await fetchTwitchLiveInfo(ids);
    setLiveInfo(info);
  }, []);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, refreshMs);
    return () => clearInterval(interval);
  }, [refresh, refreshMs]);

  return (
    <TwitchLiveManagerContext.Provider value={liveInfo}>
      {children}
    </TwitchLiveManagerContext.Provider>
  );
}

export function useTwitchLiveManager() {
  return useContext(TwitchLiveManagerContext);
}
