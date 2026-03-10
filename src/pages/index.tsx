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

type IconName = 'docs' | 'anthropic' | 'openai' | 'gemini' | 'openclaw' | 'opencode';

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

const heroChips = ['Claude 系 1.5×', 'Codex 0.8×', 'Gemini 1.5×', 'OpenCode 按模型归组'];

const workflowSteps = [
  '先确认你在用的是 Claude Code、Codex、Gemini CLI、OpenClaw 还是 OpenCode。',
  '按首页给出的工具归属选择分组，倍率和适用场景在这里直接看清。',
  '进入对应文档完成配置，最后在控制台统一管理 API Key、用量和账单。',
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
    description: '先看总览，再决定走哪条安装路线。',
    to: '/docs/intro',
  },
  {
    name: 'Claude Code',
    icon: 'anthropic',
    description: '面向 Anthropic CLI 的接入说明。',
    to: '/docs/claude-code',
  },
  {
    name: 'Codex',
    icon: 'openai',
    description: '面向 OpenAI 代码助手的接入说明。',
    to: '/docs/codex',
  },
  {
    name: 'Gemini CLI',
    icon: 'gemini',
    description: '面向 Gemini CLI 的接入说明。',
    to: '/docs/gemini-cli',
  },
  {
    name: 'OpenClaw',
    icon: 'openclaw',
    description: 'OpenClaw 的配置方式和接入步骤。',
    to: '/docs/openclaw',
  },
  {
    name: 'OpenCode',
    icon: 'opencode',
    description: 'OpenCode 的配置方式和接入步骤。',
    to: '/docs/opencode',
  },
];

const capabilityCards: CapabilityCard[] = [
  {
    index: '01',
    title: '工具归属更清楚',
    description: '首页先告诉你哪个工具该走哪一组，不需要先翻半天文档再猜倍率和入口。',
  },
  {
    index: '02',
    title: '倍率直接摆在首页',
    description: 'Claude、Codex、Gemini 的倍率直接放在首页，减少咨询成本，也避免接错分组。',
  },
  {
    index: '03',
    title: '文档按平台拆开',
    description: 'Windows、macOS、Linux 都有独立步骤，首页只负责分流，文档负责真正安装。',
  },
  {
    index: '04',
    title: '兼顾成本和稳定性',
    description: '国内直连、缓存计费、统一网关，让长期使用的体验和成本都更可控。',
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
  const footerData = ((siteConfig.customFields ?? {}) as {footerData?: FooterData}).footerData ?? {};
  const contactMethods = footerData.contactMethods ?? [];

  return (
    <Layout
      title={`${siteConfig.title} - Claude Code · Codex · Gemini CLI`}
      description="按量计费、专用分组、国内直连的 AI CLI 接入页。">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroGrid}>
              <div className={styles.heroContent}>
                <div className={styles.heroEyebrow}>丘比特API · AI CLI 接入页</div>
                <h1 className={styles.heroTitle}>
                  不同 AI 编码工具，
                  <span className={styles.heroTitleAccent}>走不同专用分组</span>
                </h1>
                <p className={styles.heroSubtitle}>
                  Claude Code、Codex、Gemini CLI、OpenClaw、OpenCode 不再共用一套模糊说明。
                  我们把工具归属、倍率、安装入口和联系方式直接摆在首页，先看清，再接入。
                </p>

                <div className={styles.heroActions}>
                  <Link
                    className={clsx(styles.ctaButton, styles.primaryButton)}
                    href="https://www.qiubithub.com/console">
                    进入控制台
                  </Link>
                  <Link
                    className={clsx(styles.ctaButton, styles.secondaryButton)}
                    to="/docs/intro">
                    查看文档
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
                  <div className={styles.panelEyebrow}>倍率速览</div>
                  <div className={styles.panelTitle}>先看工具归属，再看它对应的倍率。</div>
                  <div className={styles.rateList}>
                    {pricingGroups.map((group) => (
                      <div key={group.name} className={styles.rateItem} data-tone={group.tone}>
                        <div>
                          <div className={styles.rateLabel}>{group.name}</div>
                          <div className={styles.rateMeta}>{group.summary}</div>
                          <div className={styles.rateTools}>
                            {group.tools.map((tool) => (
                              <span key={tool} className={styles.rateTool}>
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className={styles.rateValue}>{group.rate}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.glassPanel}>
                  <div className={styles.panelEyebrow}>接入步骤</div>
                  <div className={styles.panelTitle}>先选工具，再进对应文档。</div>
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

        <section className={styles.section} id="pricing">
          <div className="container">
            <SectionIntro
              eyebrow="分组定价"
              title="工具对应哪一组、倍率是多少，首页先讲清楚"
              description="不是把用户直接丢进文档，而是先把工具归属、倍率和适用场景说清楚，再引导到正确配置页。"
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

            <div className={styles.infoBand}>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>多模型工具</span>
                <strong>OpenCode 按实际所选模型归组结算</strong>
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>统一汇率</span>
                <strong>1 人民币 = 1 美元</strong>
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>计费能力</span>
                <strong>支持缓存计费与统一网关管理</strong>
              </div>
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.sectionMuted)} id="tools">
          <div className="container">
            <SectionIntro
              eyebrow="支持工具"
              title="五种常见工具，各自适合不同工作流"
              description="首页不只是放入口，而是先告诉你每个工具更适合什么，再带你去对应文档完成配置。"
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

        <section className={styles.section} id="setup">
          <div className="container">
            <SectionIntro
              eyebrow="安装文档"
              title="所有配置入口集中在这里，文档继续按平台拆开"
              description="首页负责判断方向，文档负责实际安装。Windows、macOS、Linux 都有对应步骤，不需要再来回猜。"
            />

            <div className={styles.guidesGrid}>
              {guideCards.map((guide) => (
                <Link key={guide.name} to={guide.to} className={styles.guideCard}>
                  <span className={styles.guideMark}>
                    <MarkIcon icon={guide.icon} />
                  </span>
                  <span className={styles.guideTitle}>{guide.name}</span>
                  <span className={styles.guideDescription}>{guide.description}</span>
                  <span className={styles.guideLink}>打开指南</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.sectionMuted)}>
          <div className="container">
            <SectionIntro
              eyebrow="产品优势"
              title="为什么要按工具拆分分组"
              description="不同工具的请求风格、上下文长度和调用习惯都不一样，分开管理才能让价格、稳定性和接入体验都更清晰。"
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
                <h2 className={styles.contactTitle}>不确定自己该走哪一组，直接联系我们。</h2>
                <p className={styles.contactDescription}>
                  告诉我们你在用哪个工具、准备接入什么模型，我们可以直接告诉你该走哪条文档、
                  该看哪组倍率，以及配置时最容易踩到的地方。
                </p>
              </div>

              <div className={styles.contactSide}>
                <div className={styles.contactMethods}>
                  {contactMethods.map((method, index) => (
                    <ContactMethod key={`${method.label}-${method.value}`} method={method} index={index} />
                  ))}
                </div>

                <div className={styles.contactActions}>
                  <Link className={clsx(styles.ctaButton, styles.primaryButton)} href="https://www.qiubithub.com/console">
                    立即开始
                  </Link>
                  <Link className={clsx(styles.ctaButton, styles.ghostButton)} to="/docs/intro">
                    先看文档
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
