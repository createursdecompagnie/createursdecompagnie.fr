import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import type { LoadContext, Plugin } from '@docusaurus/types';
import { Group } from './data/types'; 
import type { Twitch, TwitchUserData, Goal, Member, SocialCommunityPluginOptions, SocialCommunityPluginData } from './data/types';

interface TwitchAuthResponse {
  access_token: string;
}

interface TwitchUsersResponse {
  data: TwitchUserData[];
}

interface PlanningItem {
  start: Date;
  end: Date;
  maintrack: boolean;
  presenters: string[];
  attendees: string[];
  [key: string]: any;
}

const DATA_BASE_PATH = './static/data/';

async function authenticateWithTwitch(): Promise<string> {
  const { TWITCH_CLIENTID, TWITCH_CLIENTSECRET } = process.env;
  
  if (!TWITCH_CLIENTID || !TWITCH_CLIENTSECRET) {
    throw new Error('Missing Twitch credentials in environment variables');
  }

  const authParams = new URLSearchParams({
    client_id: TWITCH_CLIENTID,
    client_secret: TWITCH_CLIENTSECRET,
    grant_type: 'client_credentials',
  });

  const response = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: authParams,
  });

  if (!response.ok) {
    throw new Error(
      `Unable to authenticate with Twitch: ${response.status} ${response.statusText}`
    );
  }

  const authData: TwitchAuthResponse = await response.json();
  
  if (!authData.access_token) {
    throw new Error('Unable to get app access token');
  }

  return authData.access_token;
}

async function fetchTwitchUsers(
  members: Member[], 
  accessToken: string
): Promise<TwitchUsersResponse> {
  const userIds = members
    .filter(m => m.socials?.twitch?.id)
    .map(m => m.socials!.twitch!.id);

  if (userIds.length === 0) {
    return { data: [] };
  }

  const url = new URL('https://api.twitch.tv/helix/users');
  userIds.forEach(id => url.searchParams.append('id', id));

  const response = await fetch(url, {
    headers: {
      'Client-Id': process.env.TWITCH_CLIENTID!,
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Unable to collect Twitch users: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

function updateMembersWithTwitchData(
  members: Member[], 
  usersData: TwitchUsersResponse
): void {
  usersData.data.forEach(userData => {
    const member = members.find(m => m.socials?.twitch?.id === userData.id);
    
    if (member?.socials?.twitch) {
      member.socials.twitch.user_data = {
        id: userData.id,
        login: userData.login,
        display_name: userData.display_name,
        profile_image_url: userData.profile_image_url,
      };
    }
  });
}

async function downloadAndProcessAvatar(
  imageUrl: string, 
  login: string
): Promise<void> {
    
  const AVATAR_SIZES = [300, 100, 50] as const;
  const AVATAR_FORMATS = ['png', 'webp'] as const;
  const AVATARS_BASE_PATH = './static/img/avatars/';

  const response = await fetch(imageUrl);
  
  if (!response.ok) {
    throw new Error(
      `Failed to download avatar for ${login}: ${response.status}`
    );
  }

  const imageBuffer = Buffer.from(await response.arrayBuffer());
  const sharp = require('sharp');

  fs.mkdirSync(AVATARS_BASE_PATH, { recursive: true });

  const resizePromises = AVATAR_SIZES.flatMap(size =>
    AVATAR_FORMATS.map(format =>
      sharp(imageBuffer)
        .resize(size)
        .toFile(`${AVATARS_BASE_PATH}${login}-${size}x${size}.${format}`)
    )
  );

  await Promise.all(resizePromises);
}

async function processAllAvatars(members: Member[]): Promise<void> {
  const avatarPromises = members
    .filter(m => m.socials?.twitch?.user_data)
    .map(m => {
      const { profile_image_url, login } = m.socials!.twitch!.user_data!;
      return downloadAndProcessAvatar(profile_image_url, login);
    });

  await Promise.all(avatarPromises);
}

function assignAvatarsToMembers(members: Member[]): void {
  members.forEach(member => {
    const login = member.socials?.twitch?.user_data?.login;
    
    if (login) {
      const filePath = `/img/avatars/${login}-300x300.png`;
      if (fs.existsSync(`./static${filePath}`)) {
        member.avatar = filePath;
      }
    }
  });
}

async function fetchAndParseGoalsCSV(url: string): Promise<Record<string, Goal[]>> {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(
      `Unable to fetch donation goals CSV: ${response.status} ${response.statusText}`
    );
  }

  const csvText = await response.text();
  const parsed = Papa.parse(csvText, { 
    header: true, 
    skipEmptyLines: true, 
    delimiter: ',' 
  });

  const result: Record<string, Goal[]> = {};
  const data = parsed.data as any[];

  for (let rowIndex = 2; rowIndex < data.length; rowIndex++) {
    const row = data[rowIndex];
    const streamer = row['CREATEURS DE COMPAGNIE']?.trim()?.toLowerCase();
    
    if (!streamer) continue;

    const goals: Goal[] = [];
    
    for (let colIndex = 1; colIndex < 50; colIndex += 2) {
      const rawAmount = row[`_${colIndex}`]?.trim();
      const description = row[`_${colIndex + 1}`]?.trim();

      if (description && rawAmount) {
        const amount = parseFloat(rawAmount.replace(/[^\d,]/g, ''));
        if (!isNaN(amount)) {
          goals.push({ amount, description });
        }
      }
    }

    if (goals.length > 0) {
      result[streamer] = goals;
    }
  }

  return result;
}

function assignGoalsToMembers(
  members: Member[], 
  goalsByStreamer: Record<string, Goal[]>
): void {
  members.forEach(member => {
    const name = member.socials?.twitch?.user_data?.login?.trim().toLowerCase();
    
    if (name && goalsByStreamer[name] && member.cdc2025) {
      member.cdc2025.goals = goalsByStreamer[name];
    }
  });
}

async function fetchAndParsePlanningCSV(
  url: string, 
  memberGroups: Partial<Record<Group, Twitch[]>>
): Promise<PlanningItem[]> {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(
      `Unable to fetch planning CSV: ${response.status} ${response.statusText}`
    );
  }

  const csvText = await response.text();
  const parsed = Papa.parse(csvText, { 
    header: true, 
    skipEmptyLines: true 
  });
  
  const data = parsed.data as any[];

  const planning = data
    .map(item => parsePlanningItem(item, memberGroups))
    .filter(item => (item.presenters.length + item.attendees.length) > 0)
    .sort(sortPlanningItems);

  return planning;
}

function parsePlanningItem(
  item: any, 
  memberGroups: Partial<Record<Group, Twitch[]>>
): PlanningItem {
  const start = new Date(item.start);
  const end = new Date(item.end);
  
  const presenters = parseAndFilterMembers(item.presenters, memberGroups);
  const attendees = parseAndFilterMembers(item.attendees, memberGroups);

  return {
    ...item,
    start,
    end,
    maintrack: item.maintrack === '1',
    presenters,
    attendees,
  };
}

function parseAndFilterMembers(
  membersString: string, 
  memberGroups: Partial<Record<Group, Twitch[]>>
): string[] {
  if (!membersString) return [];

  return membersString
    .split(',')
    .map(e => e.trim())
    .filter(login => 
      memberGroups['cdc2022']?.find((e: Twitch) => e.user_data?.login === login)
    );
}

function sortPlanningItems(a: PlanningItem, b: PlanningItem): number {
  return (a.start.getTime() - b.start.getTime()) || 
         (a.end.getTime() - b.end.getTime());
}

function groupMembersByGroup(members: Member[]): Partial<Record<Group, Twitch[]>> {
  const memberGroups: Partial<Record<Group, Twitch[]>> = {};

  members.forEach(member => {
    if (member.socials?.twitch) {
      member.groups.forEach(group => {
        if (!memberGroups[group]) {
          memberGroups[group] = [];
        }
        memberGroups[group]!.push(member.socials!.twitch);
      });
    }
  });

  return memberGroups;
}

function saveGroupsToFiles(memberGroups: Partial<Record<Group, Twitch[]>>): void {
  Object.entries(memberGroups).forEach(([key, value]) => {
    const filePath = path.join(DATA_BASE_PATH, key, 'members.json');
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(value), 'utf-8');
  });
}

function loadPlanningData(group: Group): any[] {
  const planningPath = path.join(DATA_BASE_PATH, group, 'planning.json');
  
  if (!fs.existsSync(planningPath)) {
    return [];
  }

  return JSON.parse(fs.readFileSync(planningPath, 'utf8'));
}

function savePlanningData(group: Group, planning: any[]): void {
  const filePath = path.join(DATA_BASE_PATH, group, 'planning.json');
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(planning), 'utf-8');
}

module.exports = function SocialCommunityPlugin(
  context: LoadContext,
  options: SocialCommunityPluginOptions
): Plugin<void> {
  return {
    name: 'social-community-plugin',

    async contentLoaded({ actions }) {
      const members: Member[] = options.members;

      const accessToken = await authenticateWithTwitch();
      const usersData = await fetchTwitchUsers(members, accessToken);
      updateMembersWithTwitchData(members, usersData);

      await processAllAvatars(members);
      assignAvatarsToMembers(members);

      try {
        if (process.env.CDC2025_GOALS) {
          const goalsByStreamer = await fetchAndParseGoalsCSV(
            process.env.CDC2025_GOALS
          );
          assignGoalsToMembers(members, goalsByStreamer);
        }
      } catch (err) {
        console.error('Failed to fetch or parse donation goals CSV:', err);
      }

      const memberGroups = groupMembersByGroup(members);
      saveGroupsToFiles(memberGroups);

      const planning2022 = loadPlanningData(Group.cdc2022);
      const planning2024 = loadPlanningData(Group.playtogether2024);
      let planning2025: any[] = [];

      try {
        if (process.env.CDC2025_PLANNING) {
          planning2025 = await fetchAndParsePlanningCSV(
            process.env.CDC2025_PLANNING, 
            memberGroups
          );
          savePlanningData(Group.cdc2025, planning2025);
        }
      } catch (err) {
        console.error('Failed to fetch or parse planning CSV:', err);
      }

      const { setGlobalData } = actions;
      const socialCommunityPluginData: SocialCommunityPluginData = {
        planning2022,
        planning2024,
        planning2025,
        members,
      };

      setGlobalData(socialCommunityPluginData);
    },
  };
};
