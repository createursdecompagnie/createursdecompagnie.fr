import React from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Popup from 'reactjs-popup';

export enum AvatarSize {
  Small = "sm",
  Medium = "md",
  Large = "lg",
  ExtraLarge = "xl",
}

export enum AvatarOrientation {
  Horizontal = "horizontal",
  Vertical = "vertical",
}

interface AvatarProps {
  name?: string | React.ReactNode;
  imageUrl?: string;
  imageUrlWebp?: string;
  imageAlt?: string;
  subtitle?: string | React.ReactNode;
  size?: AvatarSize;
  orientation?: AvatarOrientation;
  href?: string;
  className?: string;
  popup?: string | React.ReactNode;
}

const Avatar: React.FC<AvatarProps> = ({
  name,
  imageUrl,
  imageUrlWebp,
  imageAlt,
  subtitle,
  size = AvatarSize.Medium,
  orientation = AvatarOrientation.Horizontal,
  href,
  className = '',
  popup,
}) => {
  const avatarClasses = clsx(
    'avatar',
    { 'avatar--vertical': orientation === AvatarOrientation.Vertical },
    className
  );

  const photoClasses = clsx(
    'avatar__photo',
    { [`avatar__photo--${size}`]: size !== AvatarSize.Medium }
  );

  const defaultAvatar = useBaseUrl('/img/avatars/default.png');

  const renderPicture = (className:string) => (
    <picture>
      {imageUrlWebp && <source srcSet={imageUrlWebp} type="image/webp" />}
      {imageUrl && <source srcSet={imageUrl} />}
      <img
        src={imageUrl || defaultAvatar}
        alt={imageAlt || ''}
        loading="lazy"
        className={className}
      />
    </picture>
  );

  const renderPhoto = () => {
    if (href) {
      return (
        <a
          className={clsx('avatar__photo-link', photoClasses)}
          href={href}
        >
          {renderPicture(null)}
        </a>
      );
    }

    return renderPicture(photoClasses);
  };

  const renderAvatar = () => {
    return(
    <div
      className={avatarClasses}
    >
      {renderPhoto()}
      {showIntro && (
        <div
          className={clsx('avatar__intro', {
            'avatar__intro--vertical': orientation === AvatarOrientation.Vertical,
          })}
        >
          {name && <div className="avatar__name">{name}</div>}
          {subtitle && <small className="avatar__subtitle">{subtitle}</small>}
        </div>
      )}
    </div>
    );
  };

  const showIntro = name || subtitle;
  console.log('popup', popup);

  return popup ? (
        <Popup
          trigger={renderAvatar()}
          position={['top center', 'bottom center']}
          on={['hover', 'focus']}
          keepTooltipInside={true}
          mouseEnterDelay={10}
          mouseLeaveDelay={10}
          offsetY={4}
        >
          {popup}
        </Popup>
  ) : (
    renderAvatar()
  );
};

export default Avatar;
