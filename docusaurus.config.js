// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const utils = require('@docusaurus/utils');
const path = require('path');

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const githubUrl = 'https://github.com/createursdecompagnie/createursdecompagnie.fr';
const githubEditUrl = githubUrl + '/edit/main/';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Créateurs de Compagnie',
  tagline: 'Plus d\'informations prochainement ...',
  url: 'https://createursdecompagnie.fr',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'createursdecompagnie', // Usually your GitHub org/user name.
  projectName: 'createursdecompagnie.fr', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        docs: false
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
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
          {
            label: 'PlayTogether',
            to: '/evenement/playtogether2024',
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
        copyright: `Copyright © ${new Date().getFullYear()} - Créateurs de Compagnie`,
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
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        respectPrefersColorScheme: true,
      },
    }),
  baseUrlIssueBanner: false,
  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        indexDocs: false,
        indexBlog: false,
        indexPages: true,
        searchBarShortcutHint: false,
        language: ["fr"],
      },
    ]
  ],
};

async function createConfig() {

  /** @type {import('@docusaurus/types').PluginModule} */
  const socialCommunityPlugin = (
    await import('./src/plugins/social-community/index.mjs')
  ).default;

  /** @type {import('./src/plugins/social-community/data/types').SocialCommunityPluginOptions} */
  const socialCommunityPluginOptions = {
    members: (await import('./src/data/members.js')).default,
    module_key: 'members',
    routes: [{
      path: utils.normalizeUrl([config.baseUrl, '/',]),
      component: path.resolve('./src/pages/index/'),
    }]
  };

  config.plugins?.push([socialCommunityPlugin, socialCommunityPluginOptions]);
  return config;
}

module.exports = createConfig;
