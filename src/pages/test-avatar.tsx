import React from 'react';
import Layout from '@theme/Layout';
import { usePluginData } from '@docusaurus/useGlobalData';
import { SocialCommunityPluginData, Members } from '@site/src/plugins/social-community/data/types';
import { MemberAvatar, MemberAvatarSize, MemberAvatarOrientation } from '../components/social-community';

export default function MemberPage() {

  let pluginData: SocialCommunityPluginData | undefined;
  
  try {
    pluginData = usePluginData('social-community-plugin') as SocialCommunityPluginData;
  } catch (error) {
    console.warn('Plugin social-community-plugin not found:', error);
    pluginData = undefined;
  }

  const members: Members = pluginData?.members || [];

  return (
    <Layout title="Tous les membres" description="Liste complète des membres">
      <main className="container container--fluid margin-vert--lg">
        {members.map((member) => (
          <MemberAvatar
            key={member.id}
            member={member}
            name={member.name}
            subtitle={member.groups?.map(g => g).join(' • ')}
            size={MemberAvatarSize.ExtraLarge}
            orientation={MemberAvatarOrientation.Vertical}
            className="margin-bottom--lg"
          />
        ))}
      </main>
    </Layout>
  );
}
