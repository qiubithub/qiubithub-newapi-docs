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
      ],
    },
  ],
};

export default sidebars;
