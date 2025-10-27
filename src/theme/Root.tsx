import React from 'react';
import { TwitchLiveManagerProvider } from '@site/src/components/social-community/useTwitchLiveManager';
import { StreamlabsCharityProvider } from '@site/src/components/social-community/useStreamlabsCharity';

export default function Root({ children }) {
  return (
    <>
      <StreamlabsCharityProvider>
        <TwitchLiveManagerProvider>{children}</TwitchLiveManagerProvider>
      </StreamlabsCharityProvider>
    </>
  );
}
