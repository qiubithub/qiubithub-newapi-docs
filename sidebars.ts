import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: '配置教程',
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'intro',
          label: '文档总览',
        },
        {
          type: 'doc',
          id: 'claude-code',
          label: 'Claude Code',
        },
        {
          type: 'doc',
          id: 'openclaw',
          label: 'OpenClaw',
        },
        {
          type: 'doc',
          id: 'opencode',
          label: 'OpenCode',
        },
        {
          type: 'doc',
          id: 'codex',
          label: 'Codex',
        },
        {
          type: 'doc',
          id: 'gemini-cli',
          label: 'Gemini CLI',
        },
      ],
    },
  ],
};

export default sidebars;
