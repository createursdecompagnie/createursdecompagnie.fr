import React, { useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface WidgetLinkProps {
  params: string;
}

export const WidgetLink: React.FC<WidgetLinkProps> = ({ params }) => {
  const { siteConfig } = useDocusaurusContext();
  const baseUrl = siteConfig.baseUrl;

  const [copyFeedback, setCopyFeedback] = useState(false);
  const fullLink = new URL(`${baseUrl}widgets${params ? '?' + params : ''}`, window.location.origin).toString();

  const copyLink = (): void => {
    navigator.clipboard.writeText(fullLink);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const openInNewTab = (): void => {
    window.open(fullLink, '_blank');
  };

  return (
    <>
      <h3>📋 Lien généré</h3>
      <div className="alert alert--secondary margin-bottom--md">
        {fullLink}
      </div>
      <div className="button-group button-group--block">
        <button onClick={copyLink} className="button button--primary">
          📋 Copier
        </button>
        <button onClick={openInNewTab} className="button button--secondary">
          🔗 Ouvrir
        </button>
      </div>
      {copyFeedback && (
        <div className="margin-top--sm text--center text--semibold">✓ Copié!</div>
      )}
    </>
  );
};
