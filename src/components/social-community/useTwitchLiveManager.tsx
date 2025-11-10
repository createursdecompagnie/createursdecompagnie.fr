import React, { useEffect, useState, useCallback, createContext, useContext, useRef } from 'react';
import members from '@site/src/data/members';

const API_BASE_URL = 'https://api.ivr.fi/v2/twitch';
const CACHE_KEY = 'twitch_live_cache_v1';
const CACHE_DURATION = 1 * 60 * 1000;
const REFRESH_RATE = CACHE_DURATION;

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
    .map((m) => m.socials?.twitch?.id)
    .filter((id): id is string => !!id && id.length > 0);
}

async function fetchTwitchLiveInfo(
  ids: string[]
): Promise<Record<string, TwitchUserLiveInfo>> {
  if (!ids.length) return {};
  const chunkSize = 50;
  const result: Record<string, TwitchUserLiveInfo> = {};

  for (let i = 0; i < ids.length; i += chunkSize) {
    const chunk = ids.slice(i, i + chunkSize);
    const url = `${API_BASE_URL}/user?id=${chunk.join(',')}`;

    try {
      const resp = await fetch(url);
      if (!resp.ok) {
        console.error(`Erreur API Twitch (status ${resp.status})`);
        continue;
      }

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
          ...user,
        };
      }
    } catch (error) {
      console.error(`Erreur lors de la récupération des infos Twitch :`, error);
    }
  }

  return result;
}

function safeLocalStorageGet(key: string): string | null {
  if (typeof window === 'undefined' || !('localStorage' in window)) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeLocalStorageSet(key: string, value: string): void {
  if (typeof window === 'undefined' || !('localStorage' in window)) return;
  try {
    window.localStorage.setItem(key, value);
  } catch (err) {
    console.error('Error writing localStorage:', err);
  }
}

function loadCache():
  | { data: Record<string, TwitchUserLiveInfo>; lastUpdate: number }
  | null {
  try {
    const cached = safeLocalStorageGet(CACHE_KEY);
    if (!cached) return null;
    const parsed = JSON.parse(cached);
    const age = Date.now() - parsed.lastUpdate;
    if (age > CACHE_DURATION) return null;
    return parsed;
  } catch (err) {
    console.error('Erreur lors du chargement du cache Twitch :', err);
    return null;
  }
}

function saveCache(data: Record<string, TwitchUserLiveInfo>): void {
  try {
    safeLocalStorageSet(
      CACHE_KEY,
      JSON.stringify({ data, lastUpdate: Date.now() })
    );
  } catch (err) {
    console.error('Erreur lors de la sauvegarde du cache Twitch :', err);
  }
}


const TwitchLiveManagerContext = createContext<Record<string, TwitchUserLiveInfo>>({});

type TwitchLiveManagerProviderProps = {
  children: React.ReactNode;
  refreshMs?: number;
};

export function TwitchLiveManagerProvider({
  children,
  refreshMs = REFRESH_RATE,
}: TwitchLiveManagerProviderProps) {
  if (typeof window === 'undefined') {
    return (
      <TwitchLiveManagerContext.Provider value={{}}>
        {children}
      </TwitchLiveManagerContext.Provider>
    );
  }

  const [liveInfo, setLiveInfo] = useState<Record<string, TwitchUserLiveInfo>>(
    () => loadCache()?.data || {}
  );

  const refreshTimerRef = useRef<number | null>(null);
  const refreshRef = useRef<(() => Promise<void>) | null>(null);

  const scheduleNextRefresh = useCallback((delay: number) => {
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    refreshTimerRef.current = window.setTimeout(() => {
      refreshRef.current?.();
    }, delay);
  }, []);

  const refresh = useCallback(async () => {
    const ids = extractTwitchIds();

    try {
      const info = await fetchTwitchLiveInfo(ids);
      if (Object.keys(info).length > 0) {
        setLiveInfo(info);
        saveCache(info);
      }
    } catch (error) {
      console.error('Erreur lors du refresh Twitch:', error);
    }

    scheduleNextRefresh(refreshMs);
  }, [refreshMs, scheduleNextRefresh]);

  useEffect(() => {
    refreshRef.current = refresh;
  }, [refresh]);

  useEffect(() => {
    const cached = loadCache();
    if (cached) {
      setLiveInfo(cached.data);
      const age = Date.now() - cached.lastUpdate;
      const remaining = Math.max(0, refreshMs - age);
      scheduleNextRefresh(remaining);
    } else {
      refresh();
    }

    return () => {
      if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    };
  }, [refresh, refreshMs, scheduleNextRefresh]);

  return (
    <TwitchLiveManagerContext.Provider value={liveInfo}>
      {children}
    </TwitchLiveManagerContext.Provider>
  );
}

export function useTwitchLiveManager() {
  return useContext(TwitchLiveManagerContext);
}
