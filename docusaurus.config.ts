import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const SHELL_BRAND_NAME = '丘比特API';
const MAIN_SITE_URL = 'https://www.qiubithub.com';
const DOCS_SITE_URL = 'https://docs.qiubithub.com';

const siteUrls = {
  docs: DOCS_SITE_URL,
  mainSite: MAIN_SITE_URL,
} as const;

const mainSiteLinks = {
  console: `${siteUrls.mainSite}/console`,
  terms: `${siteUrls.mainSite}/terms`,
  privacyPolicy: `${siteUrls.mainSite}/privacy-policy`,
} as const;

const siteOrigins = {
  canonicalDocs: siteUrls.docs,
  mainSite: siteUrls.mainSite,
} as const;

const siteBranding = {
  name: SHELL_BRAND_NAME,
  tagline: '统一的大模型接口网关 - 更好的价格，更好的稳定性',
  homepageEyebrow: 'AI CLI 接入页',
  footerDescription: '为 Claude Code & Codex & Gemini CLI 用户提供的高质量 API 服务',
  footerAccentText: '让 AI 编程更高效，让开发更简单',
} as const;

const footerData = {
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
} as const;

const config: Config = {
  title: siteBranding.name,
  tagline: siteBranding.tagline,
  favicon: 'img/favicon.ico',
  customFields: {
    siteUrls,
    siteBranding,
    footerData,
  },

  future: {
    v4: true,
  },

  url: siteOrigins.canonicalDocs,
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
    image: 'img/site-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      hideOnScroll: false,
      title: siteBranding.name,
      logo: {
        alt: `${siteBranding.name} Logo`,
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/#setup',
          position: 'left',
          label: '文档入口',
        },
        {
          to: '/#tools',
          label: '工具路径',
          position: 'left',
        },
        {
          to: '/#pricing',
          label: '分组定价',
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
          className: 'navbarDocsLink',
        },
        {
          href: mainSiteLinks.console,
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
              href: mainSiteLinks.terms,
            },
            {
              label: '隐私政策',
              href: mainSiteLinks.privacyPolicy,
            },
          ],
        },
      ],
      copyright: `Copyright © 2026 ${siteBranding.name}. 保留所有权利`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
