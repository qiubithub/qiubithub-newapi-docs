import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

type Tone = 'blue' | 'violet' | 'green' | 'sky';

type PricingGroup = {
  name: string;
  rate: string;
  summary: string;
  to: string;
  tone: Tone;
  tools: string[];
  points: string[];
};

type ToolProfile = {
  id: string;
  name: string;
  icon: IconName;
  headline: string;
  summary: string;
  tone: Tone;
  bullets: string[];
  to: string;
};

type GuideCard = {
  name: string;
  icon: IconName;
  description: string;
  to: string;
};

type PortalEntry = {
  name: string;
  icon: IconName;
  description: string;
  to: string;
  linkLabel: string;
};

type IconName = 'docs' | 'route' | 'anthropic' | 'openai' | 'gemini' | 'openclaw' | 'opencode';

type CapabilityCard = {
  index: string;
  title: string;
  description: string;
};

type FooterMethod = {
  label: string;
  value: string;
  href?: string;
};

type FooterData = {
  contactMethods?: FooterMethod[];
};

type SiteBranding = {
  homepageEyebrow?: string;
};

const heroChips = ['默认入口：文档总览', '按工具分流', '配置完成后再进控制台', '国内直连与统一网关'];

const workflowSteps = [
  '先打开文档总览，确认整体接入方式和文档结构。',
  '如果已经知道自己在用什么工具，就直接进入对应工具文档；不确定时再看下方工具路径。',
  '配置完成后，再进入控制台统一管理 API Key、用量和账单。',
];

const portalEntries: PortalEntry[] = [
  {
    name: '文档总览',
    icon: 'docs',
    description: '默认入口，先看整体接入方式，再进入具体工具文档。',
    to: '/docs/intro',
    linkLabel: '前往 /docs/intro',
  },
  {
    name: '按工具选择路线',
    icon: 'route',
    description: '如果你已经知道自己在用什么工具，下一屏就能直接进入对应文档。',
    to: '#setup',
    linkLabel: '查看工具路径',
  },
];

const pricingGroups: PricingGroup[] = [
  {
    name: 'Claude 系工具组',
    rate: '1.5×',
    summary: '适合 Anthropic 风格请求、长上下文理解和复杂 Agent 工具调用场景。',
    to: '/docs/claude-code',
    tone: 'blue',
    tools: ['Claude Code', 'OpenClaw'],
    points: ['更适合仓库级改动与复杂重构', '多文件修改和长链路任务更稳', '支持缓存计费，适合重度 CLI 用户'],
  },
  {
    name: 'OpenAI 系工具组',
    rate: '0.8×',
    summary: '适合偏 OpenAI 风格的编码工作流，强调响应速度、低倍率和高频迭代。',
    to: '/docs/codex',
    tone: 'violet',
    tools: ['Codex'],
    points: ['更适合补全、修复、脚本编写和快速试错', '倍率更低，适合成本敏感场景', '按 OpenAI 兼容方式接入，上手路径直接'],
  },
  {
    name: 'Gemini 工具组',
    rate: '1.5×',
    summary: '适合超长上下文、检索分析和大范围文档理解类工作流。',
    to: '/docs/gemini-cli',
    tone: 'green',
    tools: ['Gemini CLI'],
    points: ['更适合跨目录检索与长文档理解', '大上下文分析场景更合适', '按 Gemini CLI 专用方式配置即可'],
  },
];

const toolProfiles: ToolProfile[] = [
  {
    id: 'claude',
    name: 'Claude Code',
    icon: 'anthropic',
    headline: '复杂改动、重构与代码审查更顺手',
    summary: '适合需要长上下文、跨文件理解和多轮工具调用的主力开发流程。',
    tone: 'blue',
    bullets: ['推荐走 Claude 系工具组', '适合高风险改动前的推演', '仓库级修改和审查更稳定'],
    to: '/docs/claude-code',
  },
  {
    id: 'codex',
    name: 'Codex',
    icon: 'openai',
    headline: '高频编码、补全和小步快跑',
    summary: '适合偏 OpenAI 使用习惯的开发者，强调轻快响应与更低倍率。',
    tone: 'violet',
    bullets: ['推荐走 OpenAI 系工具组', '修复与脚本编写更高频', '适合成本敏感的日常编码'],
    to: '/docs/codex',
  },
  {
    id: 'gemini',
    name: 'Gemini CLI',
    icon: 'gemini',
    headline: '大上下文检索、分析和长文档理解',
    summary: '适合要读很多文件、做大范围分析或处理长上下文资料的开发工作流。',
    tone: 'green',
    bullets: ['推荐走 Gemini 工具组', '仓库级检索友好', '文档已按平台拆分步骤'],
    to: '/docs/gemini-cli',
  },
  {
    id: 'openclaw',
    name: 'OpenClaw',
    icon: 'openclaw',
    headline: '更偏 Agent 形态，适合强工具调用',
    summary: '适合希望把 Claude 风格能力接入到更完整 Agent 工作流里的用户。',
    tone: 'blue',
    bullets: ['默认归到 Claude 系工具组', '适合插件化和更复杂流程', '首次安装建议按文档一步一步走'],
    to: '/docs/openclaw',
  },
  {
    id: 'opencode',
    name: 'OpenCode',
    icon: 'opencode',
    headline: '多模型客户端，按所选模型归组',
    summary: '适合想在一个客户端里切换 GPT、Claude、Gemini 的开发者。',
    tone: 'sky',
    bullets: ['本身不单独定一档倍率', '你选哪个模型，就走对应分组', '适合想保留多模型切换的人'],
    to: '/docs/opencode',
  },
];

const guideCards: GuideCard[] = [
  {
    name: '文档总览',
    icon: 'docs',
    description: '默认入口，先确认整体接入方式，再进入具体工具文档。',
    to: '/docs/intro',
  },
  {
    name: 'Claude Code',
    icon: 'anthropic',
    description: 'Claude / Anthropic 路线，适合长上下文和复杂 Agent 工作流。',
    to: '/docs/claude-code',
  },
  {
    name: 'Codex',
    icon: 'openai',
    description: 'OpenAI 路线，适合高频编码、补全和低倍率场景。',
    to: '/docs/codex',
  },
  {
    name: 'Gemini CLI',
    icon: 'gemini',
    description: 'Gemini 路线，适合大上下文检索和长文档理解。',
    to: '/docs/gemini-cli',
  },
  {
    name: 'OpenClaw',
    icon: 'openclaw',
    description: '默认归入 Claude 系分组，适合偏 Agent 形态的调用流程。',
    to: '/docs/openclaw',
  },
  {
    name: 'OpenCode',
    icon: 'opencode',
    description: '多模型客户端，按你实际选择的模型归到对应分组。',
    to: '/docs/opencode',
  },
];

const capabilityCards: CapabilityCard[] = [
  {
    index: '01',
    title: '首页只负责分流',
    description: '首页先解释产品是什么、文档怎么走，再把你送到正确入口，不把安装细节塞满首屏。',
  },
  {
    index: '02',
    title: '文档继续负责安装',
    description: '文档总览先讲整体结构，每个工具页再继续展开 Windows、macOS、Linux 的具体步骤。',
  },
  {
    index: '03',
    title: '控制台不再抢第一入口',
    description: '控制台保留给 API Key、用量和账单管理，避免用户还没判断路线就先被带去后台。',
  },
  {
    index: '04',
    title: '兼顾成本和稳定性',
    description: '国内直连、缓存计费和统一网关仍然保留，但放在完成分流之后再补充说明。',
  },
];

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}): ReactNode {
  return (
    <div className={styles.sectionIntro}>
      <div className={styles.sectionEyebrow}>{eyebrow}</div>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <p className={styles.sectionDescription}>{description}</p>
    </div>
  );
}

function ContactMethod({
  method,
  index,
}: {
  method: FooterMethod;
  index: number;
}): ReactNode {
  const content = (
    <>
      <span className={styles.contactMethodLabel}>{method.label}</span>
      <span className={styles.contactMethodValue}>{method.value}</span>
    </>
  );

  if (method.href) {
    return (
      <Link className={styles.contactMethod} href={method.href}>
        <span className={styles.contactMethodIndex}>{`0${index + 1}`}</span>
        <span className={styles.contactMethodText}>{content}</span>
      </Link>
    );
  }

  return (
    <div className={styles.contactMethod}>
      <span className={styles.contactMethodIndex}>{`0${index + 1}`}</span>
      <span className={styles.contactMethodText}>{content}</span>
    </div>
  );
}

function MarkIcon({icon}: {icon: IconName}): ReactNode {
  switch (icon) {
    case 'docs':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M8 3.75h6.45L19 8.3V20a1.25 1.25 0 0 1-1.25 1.25H8A1.25 1.25 0 0 1 6.75 20V5A1.25 1.25 0 0 1 8 3.75Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
          <path d="M14.25 3.75V8.4H19" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
          <path d="M9.2 12h5.6M9.2 15.3h5.6M9.2 18.6h3.2" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        </svg>
      );
    case 'route':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M6 5.25A1.75 1.75 0 1 1 6 8.75a1.75 1.75 0 0 1 0-3.5Zm0 10.5A1.75 1.75 0 1 1 6 19.25a1.75 1.75 0 0 1 0-3.5ZM18 10.5A1.75 1.75 0 1 1 18 14a1.75 1.75 0 0 1 0-3.5Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
          <path
            d="M7.75 7h3.1a4.4 4.4 0 0 1 3.11 1.29l1.8 1.8M7.75 17h3.1a4.4 4.4 0 0 0 3.11-1.29l1.8-1.8"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </svg>
      );
    case 'anthropic':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M17.304 3.541h-3.672l6.696 16.918H24Zm-10.608 0L0 20.459h3.744l1.369-3.553h7.005l1.37 3.553h3.744L10.536 3.541Zm-.371 10.223 2.291-5.946 2.291 5.946Z"
            fill="currentColor"
          />
        </svg>
      );
    case 'openai':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M12 4.4c1.47 0 2.66 1.19 2.66 2.66 0 .52-.15 1-.4 1.42l1.8 1.03c.39-.27.86-.43 1.37-.43 1.47 0 2.66 1.2 2.66 2.67s-1.19 2.66-2.66 2.66c-.5 0-.97-.14-1.37-.4l-1.03 1.78c.27.4.43.88.43 1.39A2.66 2.66 0 0 1 12 20.84a2.67 2.67 0 0 1-2.67-2.67c0-.5.15-.98.42-1.38l-1.78-1.03c-.4.26-.89.4-1.4.4A2.66 2.66 0 0 1 3.91 12c0-1.47 1.19-2.67 2.66-2.67.51 0 .99.16 1.39.43l1.03-1.8a2.4 2.4 0 0 1-.41-1.38A2.66 2.66 0 0 1 12 4.4Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
          />
          <circle cx="12" cy="12" r="1.45" fill="currentColor" />
        </svg>
      );
    case 'gemini':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"
            fill="currentColor"
          />
        </svg>
      );
    case 'openclaw':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M7.1 19.2c.42-3.6 1.64-6.9 3.68-9.86M12.1 20c.16-4.13 1.05-7.96 2.64-11.4M17 19.05c-.06-3.52.62-6.93 2.06-10.16"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.9"
          />
          <path
            d="m9.22 7.32 1.56-2.18M14.24 6.6l.72-2.56M18.63 6.22l1.22-2.24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.9"
          />
        </svg>
      );
    case 'opencode':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <rect
            x="4"
            y="5"
            width="16"
            height="14"
            rx="2.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path d="m9 10.2 2.25 2.05L9 14.3" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
          <path d="M13.2 14.45h2.6" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        </svg>
      );
  }
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const siteBranding = ((siteConfig.customFields ?? {}) as {siteBranding?: SiteBranding}).siteBranding ?? {};
  const footerData = ((siteConfig.customFields ?? {}) as {footerData?: FooterData}).footerData ?? {};
  const contactMethods = footerData.contactMethods ?? [];
  const heroEyebrow = siteBranding.homepageEyebrow ?? 'AI CLI 接入页';

  return (
    <Layout
      title={`${siteConfig.title} - Claude Code · Codex · Gemini CLI`}
      description="按量计费、专用分组、国内直连的 AI CLI 接入页。">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroGrid}>
              <div className={styles.heroContent}>
                <div className={styles.heroEyebrow}>{`${siteConfig.title} · ${heroEyebrow}`}</div>
                <h1 className={styles.heroTitle}>
                  AI CLI 接入门户，
                  <span className={styles.heroTitleAccent}>先看文档总览，再走正确路线</span>
                </h1>
                <p className={styles.heroSubtitle}>
                  丘比特API 为 Claude Code、Codex、Gemini CLI、OpenClaw、OpenCode 提供统一网关和专用分组。
                  首页现在先回答三件事：这是什么、你该走哪条文档路径、什么时候再进入控制台。
                </p>

                <div className={styles.heroActions}>
                  <Link
                    className={clsx(styles.ctaButton, styles.secondaryButton)}
                    to="/docs/intro">
                    文档总览
                  </Link>
                  <Link
                    className={clsx(styles.ctaButton, styles.primaryButton)}
                    to="#setup">
                    按工具选路径
                  </Link>
                </div>

                <div className={styles.heroChips}>
                  {heroChips.map((chip) => (
                    <span key={chip} className={styles.heroChip}>
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.heroAside}>
                <div className={styles.glassPanel}>
                  <div className={styles.panelEyebrow}>文档入口</div>
                  <div className={styles.panelTitle}>文档总览是默认起点，工具文档是分流终点。</div>
                  <div className={styles.portalEntryList}>
                    {portalEntries.map((entry) => (
                      <Link key={entry.name} className={styles.portalEntryCard} to={entry.to}>
                        <span className={styles.portalEntryMark}>
                          <MarkIcon icon={entry.icon} />
                        </span>
                        <span className={styles.portalEntryBody}>
                          <span className={styles.portalEntryName}>{entry.name}</span>
                          <span className={styles.portalEntryDescription}>{entry.description}</span>
                          <span className={styles.portalEntryLink}>{entry.linkLabel}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className={styles.glassPanel}>
                  <div className={styles.panelEyebrow}>接入步骤</div>
                  <div className={styles.panelTitle}>先从文档入口判断路线，再继续配置。</div>
                  <div className={styles.workflowList}>
                    {workflowSteps.map((step, index) => (
                      <div key={step} className={styles.workflowItem}>
                        <span className={styles.workflowIndex}>{index + 1}</span>
                        <span className={styles.workflowText}>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="setup">
          <div className="container">
            <SectionIntro
              eyebrow="文档入口"
              title="先从文档总览进入，再按工具进入正确路线"
              description="如果你已经知道自己在用什么工具，直接点对应卡片即可；如果还不确定，就先从文档总览进入 /docs/intro，再继续分流。"
            />

            <div className={styles.guidesGrid}>
              {guideCards.map((guide) => (
                <Link
                  key={guide.name}
                  to={guide.to}
                  className={clsx(styles.guideCard, guide.name === '文档总览' && styles.guideCardPrimary)}>
                  <span className={styles.guideMark}>
                    <MarkIcon icon={guide.icon} />
                  </span>
                  <span className={styles.guideTitle}>{guide.name}</span>
                  <span className={styles.guideDescription}>{guide.description}</span>
                  <span className={styles.guideLink}>打开指南</span>
                </Link>
              ))}
            </div>

            <div className={styles.infoBand}>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>默认起点</span>
                <strong>文档总览负责解释整体入口和分流逻辑</strong>
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>已知工具</span>
                <strong>可直接进入对应工具文档，不必先翻完整首页</strong>
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>多模型工具</span>
                <strong>OpenCode 按实际所选模型归组，不单独设一档倍率</strong>
              </div>
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.sectionMuted)} id="tools">
          <div className="container">
            <SectionIntro
              eyebrow="工具路径"
              title="如果你只知道工具名，就先在这里判断自己该走哪条文档路线"
              description="这一段不重复安装步骤，只帮你快速判断哪个工具对应哪种工作流，再进入相应文档。"
            />

            <div className={styles.toolGrid}>
              {toolProfiles.map((tool) => (
                <article key={tool.id} className={styles.toolCard} data-tone={tool.tone}>
                  <div className={styles.toolHeader}>
                    <span className={styles.toolMark}>
                      <MarkIcon icon={tool.icon} />
                    </span>
                    <div>
                      <div className={styles.toolName}>{tool.name}</div>
                      <div className={styles.toolHeadline}>{tool.headline}</div>
                    </div>
                  </div>
                  <p className={styles.toolSummary}>{tool.summary}</p>
                  <ul className={styles.toolBullets}>
                    {tool.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <Link className={styles.inlineLink} to={tool.to}>
                    进入 {tool.name} 文档
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="pricing">
          <div className="container">
            <SectionIntro
              eyebrow="分组定价"
              title="路线确定以后，再看对应分组和倍率"
              description="定价信息保留在首页，但放到文档入口之后。先确定自己该走哪份文档，再确认分组、倍率和计费口径。"
            />

            <div className={styles.pricingGrid}>
              {pricingGroups.map((group) => (
                <article key={group.name} className={styles.pricingCard} data-tone={group.tone}>
                  <div className={styles.cardTopRow}>
                    <span className={styles.toneBadge}>{group.name}</span>
                    <span className={styles.pricingRate}>{group.rate}</span>
                  </div>
                  <p className={styles.pricingSummary}>{group.summary}</p>
                  <div className={styles.pricingTools}>
                    {group.tools.map((tool) => (
                      <span key={tool} className={styles.pricingTool}>
                        {tool}
                      </span>
                    ))}
                  </div>
                  <ul className={styles.pricingPoints}>
                    {group.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <Link className={styles.inlineLink} to={group.to}>
                    查看接入指南
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.sectionMuted)}>
          <div className="container">
            <SectionIntro
              eyebrow="产品优势"
              title="为什么首页现在先做文档分流，再补充价格与能力说明"
              description="不同工具的请求风格、上下文长度和调用习惯都不一样，先把路线判断清楚，后面的价格、平台和能力说明才真正有意义。"
            />

            <div className={styles.capabilityGrid}>
              {capabilityCards.map((item) => (
                <article key={item.index} className={styles.capabilityCard}>
                  <span className={styles.capabilityIndex}>{item.index}</span>
                  <h3 className={styles.capabilityTitle}>{item.title}</h3>
                  <p className={styles.capabilityDescription}>{item.description}</p>
                </article>
              ))}
            </div>

            <div className={styles.platformStrip}>
              <span className={styles.platformLabel}>支持平台</span>
              <span className={styles.platformChip}>Windows</span>
              <span className={styles.platformChip}>macOS</span>
              <span className={styles.platformChip}>Linux</span>
            </div>
          </div>
        </section>

        <section className={styles.contactSection} id="contact">
          <div className="container">
            <div className={styles.contactBand}>
              <div className={styles.contactCopy}>
                <div className={styles.sectionEyebrow}>联系我们</div>
                <h2 className={styles.contactTitle}>走到最后还是拿不准，再联系我们。</h2>
                <p className={styles.contactDescription}>
                  联系区现在只做最后兜底支持。告诉我们你在用哪个工具、准备接入什么模型，
                  我们会直接帮你判断该看哪份文档，以及配置时最容易踩到的地方。
                </p>
              </div>

              <div className={styles.contactSide}>
                <div className={styles.contactMethods}>
                  {contactMethods.map((method, index) => (
                    <ContactMethod key={`${method.label}-${method.value}`} method={method} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
