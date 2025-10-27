import React, { useEffect, useState, useCallback, createContext, useContext } from 'react';

interface RawDonation {
  id: string;
  donation: {
    id: string;
    display_name: string;
    amount_usd: number;
    converted_currency: string;
    converted_amount: number;
    created_at: string;
    team_member_id: string;
    comment?: {
      text: string;
    } | null;
  };
  member: {
    id: string;
    user: {
      id: string;
      display_name: string;
      slug: string;
    };
  } | null;
}

interface MemberTotal {
  memberId: string;
  memberName: string;
  memberSlug: string;
  totalAmount: number;
  donationCount: number;
}

interface DonatorTotal {
  donatorName: string;
  totalAmount: number;
  donationCount: number;
}

interface DonationHistoryEntry {
  id: string;
  donatorName: string;
  amount: number;
  currency: string;
  date: string;
  memberId: string;
  memberName: string;
  comment?: string;
}

interface CharityData {
  members: MemberTotal[];
  donators: DonatorTotal[];
  history: DonationHistoryEntry[];
  totalRaised: number;
  lastUpdate: number;
  lastDonationId: string | null;
  lastPageWithData: number;
}

const TEAM_ID = '851906625861196529';
const API_BASE_URL = 'https://streamlabscharity.com/api/v1';
const CACHE_KEY = 'streamlabs_charity_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000;
const REFRESH_RATE = 3 * 60 * 1000;

async function fetchNewDonations(
  startPage: number,
  lastDonationId: string | null
): Promise<{ donations: RawDonation[]; lastPage: number }> {
  const newDonations: RawDonation[] = [];
  let page = startPage;
  let isNewData = lastDonationId === null;

  do
  {
    try {
      const url = `${API_BASE_URL}/teams/${TEAM_ID}/donations?page=${page}`;
      const resp = await fetch(url);

      if (!resp.ok) {
        console.error(`Failed to fetch page ${page}: ${resp.status}`);
        break;
      }

      const data: RawDonation[] = await resp.json();
      if (data.length === 0) {
        return { donations: newDonations, lastPage: Math.max(0, page - 1) };
      }
            
      for (const donation of data) {
        if (isNewData)
        {
          newDonations.push(donation);
        }

        if (donation.id === lastDonationId) {
          isNewData = true;
        }
      }
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error);
      break;
    }

  } while (++page);
  
  return { donations: newDonations, lastPage: page };
}

function mergeDonations(
  existingData: CharityData,
  newDonations: RawDonation[]
): CharityData {
  const memberMap = new Map<string, MemberTotal>();
  const donatorMap = new Map<string, DonatorTotal>();
  
  existingData.members.forEach(m => memberMap.set(m.memberId, { ...m }));
  existingData.donators.forEach(d => donatorMap.set(d.donatorName, { ...d }));
  
  let totalRaised = existingData.totalRaised;
  const history = [...existingData.history];
  let lastDonationId = existingData.lastDonationId;

  for (const item of newDonations) {
    const { donation, member } = item;
    
    if (!member) continue;

    const amount = donation.converted_amount;
    const donatorName = donation.display_name;
    const memberId = member.id;
    const memberName = member.user.display_name;
    const memberSlug = member.user.slug;

    if (!memberMap.has(memberId)) {
      memberMap.set(memberId, {
        memberId,
        memberName,
        memberSlug,
        totalAmount: 0,
        donationCount: 0,
      });
    }
    const memberTotal = memberMap.get(memberId)!;
    memberTotal.totalAmount += amount;
    memberTotal.donationCount++;

    if (!donatorMap.has(donatorName)) {
      donatorMap.set(donatorName, {
        donatorName,
        totalAmount: 0,
        donationCount: 0,
      });
    }
    const donatorTotal = donatorMap.get(donatorName)!;
    donatorTotal.totalAmount += amount;
    donatorTotal.donationCount++;

    history.push({
      id: donation.id,
      donatorName,
      amount,
      currency: donation.converted_currency,
      date: donation.created_at,
      memberId,
      memberName,
      comment: donation.comment?.text,
    });

    totalRaised += amount;
    
    if (lastDonationId === null || lastDonationId === existingData.lastDonationId) {
      lastDonationId = donation.id;
    }
  }

  const members = Array.from(memberMap.values()).sort(
    (a, b) => b.totalAmount - a.totalAmount
  );

  const donators = Array.from(donatorMap.values()).sort(
    (a, b) => b.totalAmount - a.totalAmount
  );

  history.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return {
    members,
    donators,
    history,
    totalRaised,
    lastUpdate: Date.now(),
    lastDonationId: lastDonationId || existingData.lastDonationId,
    lastPageWithData: existingData.lastPageWithData,
  };
}

function loadCache(): CharityData | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const data: CharityData = JSON.parse(cached);
    const age = Date.now() - data.lastUpdate;

    if (age > CACHE_DURATION) {
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error loading cache:', error);
    return null;
  }
}

function saveCache(data: CharityData): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving cache:', error);
  }
}

const StreamlabsCharityContext = createContext<CharityData>({
  members: [],
  donators: [],
  history: [],
  totalRaised: 0,
  lastUpdate: 0,
  lastDonationId: null,
  lastPageWithData: 0,
});

type StreamlabsCharityProviderProps = {
  children: React.ReactNode;
  refreshMs?: number;
};

export function StreamlabsCharityProvider({
  children,
  refreshMs = REFRESH_RATE,
}: StreamlabsCharityProviderProps) {
  const [charityData, setCharityData] = useState<CharityData>(() => {
    return loadCache() || {
      members: [],
      donators: [],
      history: [],
      totalRaised: 0,
      lastUpdate: 0,
      lastDonationId: null,
      lastPageWithData: 0,
    };
  });

  const refresh = useCallback(async () => {
    const cached = loadCache();
    if (cached && Date.now() - cached.lastUpdate < REFRESH_RATE) {
      setCharityData(cached);
      return;
    }

    const baseData = cached || {
      members: [],
      donators: [],
      history: [],
      totalRaised: 0,
      lastUpdate: 0,
      lastDonationId: null,
      lastPageWithData: 0,
    };
    
    const { donations: newDonations, lastPage } = await fetchNewDonations(
      baseData.lastPageWithData,
      baseData.lastDonationId
    );

    if (newDonations.length === 0) {
      const updated = { ...baseData, lastUpdate: Date.now() };
      setCharityData(updated);
      saveCache(updated);
      return;
    }

    const processed = mergeDonations(baseData, newDonations);
    processed.lastPageWithData = lastPage;
    
    setCharityData(processed);
    saveCache(processed);
  }, []);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, refreshMs);
    return () => clearInterval(interval);
  }, [refresh, refreshMs]);

  return (
    <StreamlabsCharityContext.Provider value={charityData}>
      {children}
    </StreamlabsCharityContext.Provider>
  );
}

export function useStreamlabsCharity() {
  return useContext(StreamlabsCharityContext);
}