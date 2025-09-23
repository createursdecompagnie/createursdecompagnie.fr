import {themes as prismThemes} from 'prism-react-renderer';
import type {Config, PluginOptions} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import * as utils from '@docusaurus/utils';
import path from 'path';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

import members from './src/data/members';

const baseUrl = '/';

const config: Config = {
  title: 'Créateurs de Compagnie',
  favicon: 'img/favicon.ico',
  trailingSlash: false,
  future: {
    v4: true,
  },
  url: 'https://createursdecompagnie.fr',
  baseUrl: baseUrl,
  baseUrlIssueBanner: false,
  organizationName: 'createursdecompagnie',
  projectName: 'createursdecompagnie.fr',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/cdc-social-card.jpg',
    navbar: {
      title: 'Créateurs de Compagnie',
      logo: {
        alt: 'Logo Créateurs de Compagnie',
        src: 'img/logo.png',
        srcDark: 'img/logo_dark.png',
      },
      items: [
        {
          label: 'Le collectif',
          to: '/le-collectif',
        },
        // {
        //   type: 'dropdown',
        //   label: 'CDC 2022',
        //   // to: '/evenement/cdc2022',
        //   position: 'left',
        //   items: [
        //     {
        //       label: 'À propos',
        //       to: '/evenement/cdc2022/a-propos',
        //     },
        //     {
        //       label: 'Le planning',
        //       to: '/evenement/cdc2022/planning',
        //     },
        //   ],
        // },
        {
          type: 'dropdown',
          label: 'Évènements passés',
          position: 'left',
          items: [
            {
              label: 'PlayTogether',
              to: '/evenement/playtogether2024',
            },
            {
              label: 'CDC 2022',
              to: '/evenement/cdc2022',
            },
            {
              label: 'Sans Croquettes Twitch',
              to: '/evenement/sans-croquettes-twitch',
            },
          ],
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'À propos',
          items: [
            {
              label: 'Le collectif',
              to: '/le-collectif',
            },
            {
              label: 'Informations légales',
              to: '/informations-legales',
            },
          ],
        },
        {
          title: 'Nos évènements',
          items: [
            {
              label: 'PlayTogether',
              to: '/evenement/playtogether2024',
            },
            {
              label: 'CDC 2022',
              href: '/evenement/cdc2022',
            },
            {
              label: 'Sans Croquettes Twitch',
              href: '/evenement/sans-croquettes-twitch',
            }
          ],
        },
        {
          title: 'Créateurs de compagnie',
          items: [
            {
              html: `
              <div class="social-links">
                <a href="https://discord.gg/PN5anHT6P8" target="_blank" rel="noreferrer noopener" aria-label="Discord">
                  <span class="icon-discord"></span>
                </a>
                <a href="https://twitter.com/createursdecomp" target="_blank" rel="noreferrer noopener" aria-label="Twitter">
                  <span class="icon-twitter"></span>
                </a>
                <a href="https://www.twitch.tv/createursdecompagnie" target="_blank" rel="noreferrer noopener" aria-label="Twitch">
                  <span class="icon-twitch"></span>
                </a>
                <a href="https://www.instagram.com/createursdecompagnie" target="_blank" rel="noreferrer noopener" aria-label="Instagram">
                  <span class="icon-instagram"></span>
                </a>
                <a href="https://www.youtube.com/channel/UC8uLofoMzQCFLPTf_YRZcpA" target="_blank" rel="noreferrer noopener" aria-label="Youtube">
                  <span class="icon-youtube"></span>
                </a>
              </div>
          `,
            },
            // {
            //   label: 'Nos Membres',
            //   href: 'https://linktr.ee/createursdecompagnie.membres',
            // },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} - Créateurs de Compagnie`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    }
  } satisfies Preset.ThemeConfig,  
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        indexDocs: false,
        indexBlog: false,
        indexPages: true,
        searchBarShortcut: false,
        searchBarShortcutHint: false,
        language: ["fr"],
      } satisfies import("@easyops-cn/docusaurus-search-local").PluginOptions
    ]
  ],
  plugins: [
    [
      require.resolve("./src/plugins/social-community"),
      {
        members: members,
        module_key: 'members',
        routes: [{
          path: utils.normalizeUrl([baseUrl, '/']),
          component: path.resolve('./src/pages/index/'),
        }]
      } satisfies import('./src/plugins/social-community/data/types').SocialCommunityPluginOptions
    ]
  ]
};

export default config;
