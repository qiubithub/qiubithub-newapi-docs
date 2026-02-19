import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'QIUBIT',
  tagline: '统一的大模型接口网关 - 更好的价格，更好的稳定性',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://www.qiubithub.com',
  baseUrl: '/',

  organizationName: 'qiubithub',
  projectName: 'qiubithub-docs',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/qiubithub/qiubithub-docs/tree/main/',
          routeBasePath: 'docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'QIUBIT',
      logo: {
        alt: 'QIUBIT Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '文档',
        },
        {
          to: '/',
          label: '首页',
          position: 'left',
        },
        {
          href: 'https://www.qiubithub.com/pricing',
          label: '价格',
          position: 'left',
        },
        {
          href: 'https://www.qiubithub.com/console',
          label: '控制台',
          position: 'left',
        },
        {
          type: 'search',
          position: 'right',
        },
        {
          href: 'https://github.com/QuantumNous/new-api',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {
              label: '快速开始',
              to: '/docs/intro',
            },
            {
              label: 'API 文档',
              href: 'https://www.qiubithub.com/docs',
            },
          ],
        },
        {
          title: '服务',
          items: [
            {
              label: '价格',
              href: 'https://www.qiubithub.com/pricing',
            },
            {
              label: '控制台',
              href: 'https://www.qiubithub.com/console',
            },
          ],
        },
        {
          title: '更多',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/QuantumNous/new-api',
            },
          ],
        },
      ],
      copyright: 'Copyright © 2026 QIUBIT. 保留所有权利',
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    algolia: {
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_SEARCH_API_KEY',
      indexName: 'qiubithub',
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
