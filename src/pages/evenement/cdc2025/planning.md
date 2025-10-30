---
title: CDC 2025
description: L'évènement caritatif de Créateurs de Compagnie au profit de Potiron Family
---
import { Planning, Group } from '/src/components/planning'

<nav aria-label="breadcrumbs" className="page-breadcrumbs">
  <ul className="breadcrumbs">
    <li className="breadcrumbs__item">
      <a className="breadcrumbs__link" href="/">
        <svg viewBox="0 0 24 24" className="breadcrumbs-home">
          <path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" fill="currentColor">
          </path>
        </svg>
      </a>
    </li>
    <li className="breadcrumbs__item">
      <span className="breadcrumbs__link">CDC 2025</span>
    </li>
    <li className="breadcrumbs__item">
      <a className="breadcrumbs__link" href="/evenement/cdc2025/planning">Le planning</a>
    </li>
  </ul>
</nav>

<h1 className="text--center">CDC 2025</h1>
<h2>Le planning</h2>

<Planning group={Group.cdc2025} />