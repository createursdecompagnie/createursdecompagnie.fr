---
title: CDC 2025
description: L'évènement caritatif de Créateurs de Compagnie au profit de Potiron Family
---
import { Planning, Group } from '/src/components/planning'
import { CommunityListEvent } from '/src/components/social-community'

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
      <span className="breadcrumbs__link">Évènements passés</span>
    </li>
    <li className="breadcrumbs__item">
      <a className="breadcrumbs__link" href="/evenement/cdc2025">CDC 2025</a>
    </li>
  </ul>
</nav>

<h1 className="text--center">CDC 2025</h1>

## L'évènement {/* #l-évènement */}

***CDC 2025*** est un évènement caritatif qui s'est tenu sur [***Twitch***](https://www.twitch.tv/createursdecompagnie) du **7 au 9 novembre 2025** au profit de l'association <a href="https://www.potironfamily.fr">***Potiron Family***</a>. Celui-ci a permis de récolter plus de **16 300 €** et a impliqué plus d'une trentaine de créateur·ices.

## L'association {/* #l-association */}

<a href="https://www.potironfamily.fr"><p className="text--center"><img src="/img/cdc2025/logo-potiron-family.png" alt="Logo Potiron Family" width="400" height="400" loading="lazy" /></p></a>

<a href="https://www.potironfamily.fr">***Potiron Family***</a> est une association dédiée aux animaux en situation de handicap ou atteints de pathologies. Leur mission : changer le regard sur le handicap animal.

Iels accueillent des chat·tes ataxiques, aveugles, FIV+, tri-pattes ou avec d’autres particularités, les soignent, leur offrent de l’amour et les proposent à l’adoption quand iels sont prêts. Certains deviennent des pensionnaires permanents, comme :

- Potiron, la mascotte, ataxique et à l’origine de l’aventure,
- Yumi, la doyenne pirate,
- Maïdo, autre chat ataxique,
- Yuna, la cantatrice de la famille,
- et même Hiro, un chien rescapé de maltraitance.

<img src="/img/cdc2025/pensionnaires.jpg" className="padding-bottom--sm" alt="Photo des pensionnaires de Potiron Family" width="100%" loading="lazy" />

L’association est portée par Marion et Éric, deux passionné·es qui racontent avec humour et tendresse les histoires de leurs protégé·es.

## Trailer

<div className="center margin-bottom--lg" style={{ display: 'flex', justifyContent: 'center' }}>
  <video width="100%" controls>
    <source src="/video/cdc2025/teaser.webm" type="video/webm" />
    <source src="/video/cdc2025/teaser.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>

## Les participant·es

<CommunityListEvent group={Group.cdc2025} />
<br/>

## Le planning

<Planning group={Group.cdc2025} />