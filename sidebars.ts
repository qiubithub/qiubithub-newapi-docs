import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: '安装教程',
      collapsed: false,
      items: [
        'claude-code',
        'openclaw',
        'opencode',
        'codex',
        'gemini-cli',
        'openai-sdk',
      ],
    },
    {
      type: 'category',
      label: '平台使用教程',
      collapsed: false,
      items: [
        'create-api-key',
        'subscription-package',
        'route-selection',
        'invoices',
        'channel-management',
      ],
    },
    {
      type: 'category',
      label: '常见问题',
      collapsed: false,
      items: [
        'why-no-format-conversion',
        'cli-vs-api-pricing',
        'faq',
      ],
    },
  ],
};

export default sidebars;
