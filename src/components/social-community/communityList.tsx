import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './style.module.css';
import type { Group, Member } from '@site/src/plugins/social-community/data/types';
import { MemberAvatar, MemberAvatarSize, getDisplayNameForMember, getMembersFromPluginData, generateMemberProfileUrl } from './index';

interface CommunityListProps {
  group?: Group;
  memberIds?: string[];
  size?: MemberAvatarSize;
  className?: string;
}

function filterMembers(
  members: Member[],
  group?: Group,
  memberIds?: string[]
): Member[] {
  if (memberIds) {
    return members.filter(member => memberIds.includes(member.id));
  }
  
  if (group) {
    return members.filter(member => member.groups.includes(group));
  }
  
  return members;
}

function CommunityList({ 
  group, 
  memberIds, 
  size = MemberAvatarSize.Medium, 
  className 
}: CommunityListProps): ReactNode {
  const members = getMembersFromPluginData();
  const filteredMembers = filterMembers(members, group, memberIds);
  
  return (
    <div className={clsx(styles.communityList, className)}>
      {filteredMembers.map(member => (
        <MemberAvatar 
          href={generateMemberProfileUrl(member, group)}
          key={member.id} 
          member={member} 
          size={size} 
          popup={getDisplayNameForMember(member)} 
        />
      ))}
    </div>
  );
}

export function CommunityListCalendar({ 
  group, 
  memberIds 
}: Pick<CommunityListProps, 'group' | 'memberIds'>): ReactNode {
  return (
    <CommunityList 
      group={group}
      memberIds={memberIds}
      size={MemberAvatarSize.Medium}
      className={styles.communityCalendar}
    />
  );
}

export function CommunityListHome({ 
  group = 'member' as Group 
}: Pick<CommunityListProps, 'group'>): ReactNode {
  return (
    <CommunityList 
      group={group}
      size={MemberAvatarSize.ExtraLarge}
      className={styles.communityHome}
    />
  );
}

export function CommunityListEvent({ 
  group, 
  memberIds 
}: Pick<CommunityListProps, 'group' | 'memberIds'>): ReactNode {
  return (
    <CommunityList 
      group={group}
      memberIds={memberIds}
      size={MemberAvatarSize.Medium}
    />
  );
}