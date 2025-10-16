import React from 'react';
import { TwitchLiveManagerProvider } from '@site/src/components/social-community/useTwitchLiveManager';

export default function Root({ children }) {
  return (
    <TwitchLiveManagerProvider>
      {children}
    </TwitchLiveManagerProvider>
  );
}
