import React, { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import Layout from '@theme/Layout';
import { getMembersFromPluginData, getDisplayNameForMember } from '@site/src/components/social-community';
import { Group } from '@site/src/plugins/social-community/data/types';

export default function DonationPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const creatorFromQuery = params.get('twitch')?.toLowerCase();
  const creatorFromHash = location.hash.slice(1).toLowerCase();
  const creatorName = creatorFromQuery || creatorFromHash;

  const members = getMembersFromPluginData();

  const member = members?.find(
    (m) => m.socials?.twitch?.user_data?.login?.toLowerCase() === creatorName
  );

  const donationUrl =
    member?.cdc2025 &&
    member.groups?.includes(Group.cdc2025) &&
    member.cdc2025.streamlabscharityId
      ? `https://streamlabscharity.com/teams/@createurs-de-compagnie-2025/cdc2025?member=${member.cdc2025.streamlabscharityId}`
      : null;

  useEffect(() => {
    if (donationUrl) {
      window.location.href = donationUrl;
    }
  }, [donationUrl]);

  const eligibleMembers =
    members?.filter(
      (m) =>
        m.cdc2025 &&
        m.groups?.includes(Group.cdc2025) &&
        typeof m.cdc2025.streamlabscharityId === 'string' &&
        m.cdc2025.streamlabscharityId.trim() !== ''
    ) || [];

  if (!creatorName || !donationUrl) {
    return (
      <Layout title="Page de don">
        <div style={{ padding: '2rem', textAlign: 'center', minHeight: '60vh' }}>
          <h1>💝 Donnez sur les cagnottes de nos créateur·ices</h1>
          <p>
            Utilisez le format : <code>/don#nom</code>
          </p>
          <div style={{ marginTop: '2rem' }}>
            <h3>Créateur·ices disponibles :</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {eligibleMembers.map((m) => {
                const displayName = getDisplayNameForMember(m);
                const twitchLogin = m.socials?.twitch?.user_data?.login;
                return (
                  <li key={m.id} style={{ margin: '0.5rem' }}>
                    <a href={`/don#${twitchLogin}`}>{displayName}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Layout>
    );
  }

  const displayName = getDisplayNameForMember(member);

  return (
    <Layout title={`Redirection vers ${displayName}`}>
      <div style={{ padding: '2rem', textAlign: 'center', minHeight: '60vh' }}>
        <h1>🔄 Redirection en cours...</h1>
        <p>
          Vous allez être redirigé vers la page de don de{' '}
          <strong>{displayName}</strong>
        </p>
        <p style={{ marginTop: '1rem' }}>
          <a href={donationUrl}>Cliquez ici si la redirection ne fonctionne pas</a>
        </p>
      </div>
    </Layout>
  );
}
