import React from 'react';
import { useLocation } from '@docusaurus/router';
import './index.css';

const EXCLUDED_PAGES = ['/les-createurices'];

export const FloatingDonateButton: React.FC = () => {
  const location = useLocation();

  if (EXCLUDED_PAGES.includes(location.pathname)) return null;

  return (
    <a
      href="https://streamlabscharity.com/teams/@cdc2026/cdc2026?member=452020463900692480"
      className="floating-donate-button"
      target="_blank"
      rel="noopener noreferrer"
    >
      💖 Faire un don pour Le Repère
    </a>
  );
};
