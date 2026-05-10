import {defineConfig} from 'vitepress';

const consoleUrl = 'https://www.qiubithub.com/console';
const defaultBrandLogoUrl =
  'https://qiubithub-1396711629.cos.ap-guangzhou.myqcloud.com/qiubitHub-icon.png';
const brandLogoUrl =
  process.env.VITEPRESS_BRAND_LOGO_URL ??
  process.env.NEXT_PUBLIC_BRAND_LOGO_URL ??
  process.env.NEXT_PUBLIC_GATEWAY_LOGO_URL ??
  defaultBrandLogoUrl;

export default defineConfig({
  title: '丘比特 API 文档',
  description: 'Claude Code、Codex、Gemini CLI、OpenClaw、OpenCode 接入教程',
  lang: 'zh-CN',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['link', {rel: 'icon', href: brandLogoUrl}],
    ['link', {rel: 'apple-touch-icon', href: brandLogoUrl}],
    ['meta', {name: 'theme-color', content: '#2563eb'}],
  ],
  themeConfig: {
    logo: brandLogoUrl,
    siteTitle: '丘比特 API 文档',
    nav: [
      {text: '快速开始', link: '/'},
      {text: '支持工具', link: '/claude-code'},
      {text: '官网', link: 'https://www.qiubithub.com'},
      {text: '控制台', link: consoleUrl},
    ],
    sidebar: [
      {
        text: '开始',
        items: [{text: '快速开始', link: '/'}],
      },
      {
        text: 'AI 编程工具',
        items: [
          {text: 'Claude Code', link: '/claude-code'},
          {text: 'Codex', link: '/codex'},
          {text: 'Gemini CLI', link: '/gemini-cli'},
          {text: 'OpenClaw', link: '/openclaw'},
          {text: 'OpenCode', link: '/opencode'},
        ],
      },
    ],
    outline: {
      label: '本页目录',
      level: [2, 3],
    },
    search: {
      provider: 'local',
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    darkModeSwitchLabel: '深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short',
      },
    },
    footer: {
      message: '让 Claude Code、Codex、Gemini CLI 在国内稳定可用。',
      copyright: 'Copyright © 2026 丘比特 API',
    },
  },
});
