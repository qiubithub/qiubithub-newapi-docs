import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: '丘比特API',
  tagline: '统一的大模型接口网关 - 更好的价格，更好的稳定性',
  favicon: 'img/favicon.ico',
  customFields: {
    footerData: {
      description: '为 Claude Code & Codex & Gemini CLI 用户提供的高质量 API 服务',
      accentText: '让 AI 编程更高效，让开发更简单',
      badges: ['服务稳定运行', '24/7 技术支持'],
      contactTitle: '联系我们',
      contactDescription: '专业团队为您提供 7×24 小时技术支持',
      contactMethods: [
        {
          type: 'wechat',
          label: '微信',
          value: '15802061870',
        },
        {
          type: 'email',
          label: '邮箱',
          value: 'qiuchuanzeha@gmail.com',
          href: 'mailto:qiuchuanzeha@gmail.com',
        },
      ],
      metaItems: ['服务状态', '为开发者提供稳定可靠的 AI 编程服务'],
      credit: {
        label: '基于',
        name: 'New API',
        href: 'https://github.com/QuantumNous/new-api',
      },
    },
  },

  future: {
    v4: true,
  },

  url: 'https://www.qiubithub.com',
  baseUrl: '/',

  organizationName: 'qiubithub',
  projectName: 'qiubithub-docs',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'ignore',

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
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      hideOnScroll: false,
      title: '丘比特API',
      logo: {
        alt: '丘比特API Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/#pricing',
          position: 'left',
          label: '分组定价',
        },
        {
          to: '/#tools',
          label: '支持工具',
          position: 'left',
        },
        {
          to: '/#setup',
          label: '安装文档',
          position: 'left',
        },
        {
          to: '/#contact',
          label: '联系我们',
          position: 'left',
        },
        {
          to: '/docs/intro',
          label: '文档',
          position: 'right',
        },
        {
          href: 'https://www.qiubithub.com/console',
          label: '控制台',
          position: 'right',
          className: 'navbarConsoleLink',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '产品服务',
          items: [
            {
              label: 'Claude Code 安装',
              to: '/docs/claude-code',
            },
            {
              label: 'Codex 安装',
              to: '/docs/codex',
            },
            {
              label: 'Gemini CLI 安装',
              to: '/docs/gemini-cli',
            },
          ],
        },
        {
          title: '帮助支持',
          items: [
            {
              label: '服务条款',
              href: 'https://www.qiubithub.com/terms',
            },
            {
              label: '隐私政策',
              href: 'https://www.qiubithub.com/privacy-policy',
            },
          ],
        },
      ],
      copyright: 'Copyright © 2026 丘比特API. 保留所有权利',
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
