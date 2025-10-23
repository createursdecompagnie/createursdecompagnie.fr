import clsx from 'clsx';
import styles from './style.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { Member } from '@site/src/plugins/social-community/data/types';
import { useTwitchLiveManager } from './useTwitchLiveManager';
import Avatar, { AvatarOrientation, AvatarSize } from '../avatar';

interface MemberAvatarProps {
  member: Member;
  name?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  size?: AvatarSize;
  orientation?: AvatarOrientation;
  className?: string;
  popup?: string | React.ReactNode;
  href?: string;
}

const MemberAvatar: React.FC<MemberAvatarProps> = ({
  member,
  name,
  subtitle,
  size = AvatarSize.Medium,
  orientation = AvatarOrientation.Horizontal,
  className,
  popup,
  href
}) => {

  const getAvatarUrls = (): { png: string | null; webp: string | null } => {

    const sizeMap: Record<AvatarSize, string> = {
      [AvatarSize.Small]: '50x50',
      [AvatarSize.Medium]: '50x50',
      [AvatarSize.Large]: '100x100',
      [AvatarSize.ExtraLarge]: '100x100',
    };

    let url = member.avatar?.replace('300x300', sizeMap[size]) || null;
    const png = url;
    const webp = url ? url.replace(/\.\w+$/, '.webp') : null;

    return { png, webp };
  };

  const getMemberProfileUrl = (member: Member): string | null => {
    const baseUrl = useBaseUrl('/les-createurices');
    const twitchLogin = member.socials?.twitch?.user_data?.login;
    if (!twitchLogin) return null;
    const params = new URLSearchParams(location.search);
    params.set('twitch', twitchLogin);
    return `${baseUrl}?${params.toString()}`;
  };

  if (!member) return;
  const { png: avatarUrl, webp: avatarUrlWebp } = getAvatarUrls();
  const profileUrl = getMemberProfileUrl(member);
  const liveInfo = useTwitchLiveManager();
  const twitchId = member.socials?.twitch?.id;
  const isLive = twitchId && liveInfo[twitchId]?.isLive;

  return (
    <Avatar
      name={name}
      subtitle={subtitle}
      size={size}
      orientation={orientation}
      href={href || profileUrl}
      imageUrl={avatarUrl}
      imageUrlWebp={avatarUrlWebp}
      imageAlt={`Avatar de ${member.name}`}
      className={clsx(className, isLive && styles.liveBorder)}
      popup={popup}
    />
  );
};

export default MemberAvatar;
export { AvatarOrientation as MemberAvatarOrientation, AvatarSize as MemberAvatarSize } from '../avatar';
