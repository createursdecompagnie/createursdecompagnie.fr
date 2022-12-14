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
            type: 'dropdown',
            label: 'CDC 2022',
            // to: '/evenement/cdc2022',
            position: 'left',
            items: [
              {
                label: 'À propos',
                to: '/evenement/cdc2022/a-propos',
              },
              {
                label: 'Le planning',
                to: '/evenement/cdc2022/planning',
              },
            ],
          },
          {
            type: 'dropdown',
            label: 'Évènements passés',
            position: 'left',
            items: [
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
            label: 'Discord',
            href: 'https://discord.gg/PN5anHT6P8',
          },
          {
            label: 'Twitter',
            href: 'https://twitter.com/createursdecomp',
          },
          {
            label: 'Youtube',
            href: 'https://www.youtube.com/channel/UC8uLofoMzQCFLPTf_YRZcpA',
          },
          {
            label: 'Twitch',
            href: 'https://www.twitch.tv/createursdecompagnie',
          },
          {
            label: 'Instagram',
            href: 'https://www.instagram.com/createursdecompagnie/',
          },
          {
            label: 'Nos Membres',
            href: 'https://linktr.ee/createursdecompagnie.membres',
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
    plugins: [],
    baseUrlIssueBanner: false,
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
      path: utils.normalizeUrl([config.baseUrl,'/',]),
      component: path.resolve('./src/pages/index/'),
    }]
  };

  config.plugins?.push([socialCommunityPlugin, socialCommunityPluginOptions]);
  return config;
}

module.exports = createConfig;
