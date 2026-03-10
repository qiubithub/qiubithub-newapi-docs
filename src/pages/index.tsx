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
  points: string[];
};

type ToolProfile = {
  id: string;
  name: string;
  mark: string;
  headline: string;
  summary: string;
  tone: Tone;
  bullets: string[];
  to: string;
};

type GuideCard = {
  name: string;
  mark: string;
  description: string;
  to: string;
};

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

const heroChips = ['按量计费', '国内直连', '缓存计费', '专用分组'];

const workflowSteps = [
  '选择适合你的专用分组，避免通用配置混用。',
  '按文档完成 CLI 配置，直接接入到现有终端或 IDE 工作流。',
  '用同一套网关管理不同模型，再按使用量结算。',
];

const pricingGroups: PricingGroup[] = [
  {
    name: 'Claude Code',
    rate: '1.5×',
    summary: '面向 Anthropic CLI 工作流，适合重度代码审查和长链路修改。',
    to: '/docs/claude-code',
    tone: 'blue',
    points: ['长上下文更稳', '适合多文件改动', '支持缓存计费'],
  },
  {
    name: 'CodeX',
    rate: '0.8×',
    summary: '面向 OpenAI 代码助手场景，适合快节奏编码、补全和修复。',
    to: '/docs/codex',
    tone: 'violet',
    points: ['响应更轻快', '适合频繁迭代', '倍率更低'],
  },
  {
    name: 'Gemini CLI',
    rate: '1.5×',
    summary: '面向 Gemini CLI 场景，适合大上下文检索和仓库级分析。',
    to: '/docs/gemini-cli',
    tone: 'green',
    points: ['超大上下文', '适合检索分析', '支持统一接入'],
  },
];

const toolProfiles: ToolProfile[] = [
  {
    id: 'claude',
    name: 'Claude Code',
    mark: 'CC',
    headline: '适合稳妥推进复杂改动',
    summary: '更适合仓库级理解、重构、代码审查和需要长上下文的 Agent 流程。',
    tone: 'blue',
    bullets: ['多文件修改更自然', '适合高风险改动前的推演', '文档和配置路径清晰'],
    to: '/docs/claude-code',
  },
  {
    id: 'codex',
    name: 'CodeX',
    mark: 'CX',
    headline: '适合高频编码与快速试错',
    summary: '更适合频繁补全、局部修改、脚本编写和成本敏感的编码工作流。',
    tone: 'violet',
    bullets: ['倍率更低', '小步快跑更顺手', '适配现有 OpenAI 式习惯'],
    to: '/docs/codex',
  },
  {
    id: 'gemini',
    name: 'Gemini CLI',
    mark: 'GM',
    headline: '适合大上下文检索和分析',
    summary: '更适合超长文档理解、跨目录检索和需要大窗口上下文的场景。',
    tone: 'green',
    bullets: ['仓库级检索友好', '大上下文场景更合适', '文档按平台分步配置'],
    to: '/docs/gemini-cli',
  },
];

const guideCards: GuideCard[] = [
  {
    name: '文档总览',
    mark: 'IN',
    description: '先看总览，再决定走哪条安装路线。',
    to: '/docs/intro',
  },
  {
    name: 'Claude Code',
    mark: 'CC',
    description: '面向 Anthropic CLI 的接入说明。',
    to: '/docs/claude-code',
  },
  {
    name: 'CodeX',
    mark: 'CX',
    description: '面向 OpenAI 代码助手的接入说明。',
    to: '/docs/codex',
  },
  {
    name: 'Gemini CLI',
    mark: 'GM',
    description: '面向 Gemini CLI 的接入说明。',
    to: '/docs/gemini-cli',
  },
  {
    name: 'OpenClaw',
    mark: 'OC',
    description: 'OpenClaw 的配置方式和接入步骤。',
    to: '/docs/openclaw',
  },
  {
    name: 'OpenCode',
    mark: 'OP',
    description: 'OpenCode 的配置方式和接入步骤。',
    to: '/docs/opencode',
  },
];

const capabilityCards: CapabilityCard[] = [
  {
    index: '01',
    title: '原生 CLI 体验',
    description: '按工具原生方式接入，不额外堆一层奇怪抽象，迁移和排错都更直接。',
  },
  {
    index: '02',
    title: '按场景拆分分组',
    description: 'Claude、CodeX、Gemini 分开调优，倍率和适配策略更清晰，减少误配。',
  },
  {
    index: '03',
    title: '多平台安装文档',
    description: '保留文档体系，Windows、macOS、Linux 都能按步骤走通，不靠口头说明。',
  },
  {
    index: '04',
    title: '成本与稳定性平衡',
    description: '国内直连、缓存计费、统一网关，兼顾日常开发效率和持续使用成本。',
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

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const footerData = ((siteConfig.customFields ?? {}) as {footerData?: FooterData}).footerData ?? {};
  const contactMethods = footerData.contactMethods ?? [];

  return (
    <Layout
      title={`${siteConfig.title} - Claude Code · CodeX · Gemini CLI`}
      description="按量计费、专用分组、国内直连的 AI CLI 接入页。">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroGrid}>
              <div className={styles.heroContent}>
                <div className={styles.heroEyebrow}>丘比特API · AI CLI 接入页</div>
                <h1 className={styles.heroTitle}>
                  Claude Code、CodeX、Gemini CLI 的
                  <span className={styles.heroTitleAccent}>统一接入首页</span>
                </h1>
                <p className={styles.heroSubtitle}>
                  用一套更清晰的单页结构，把价格、专用分组、安装文档和联系方式全部收在首页。
                  不再让用户先猜入口，再找配置。
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
                  <div className={styles.panelEyebrow}>专用分组</div>
                  <div className={styles.panelTitle}>按工具拆分倍率，首页直接讲清楚。</div>
                  <div className={styles.rateList}>
                    {pricingGroups.map((group) => (
                      <div key={group.name} className={styles.rateItem} data-tone={group.tone}>
                        <div>
                          <div className={styles.rateLabel}>{group.name}</div>
                          <div className={styles.rateMeta}>{group.summary}</div>
                        </div>
                        <div className={styles.rateValue}>{group.rate}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.glassPanel}>
                  <div className={styles.panelEyebrow}>上手路径</div>
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
              title="不同工具，走不同分组，倍率直接摆在首页"
              description="保留 Duck 那种先讲清定价逻辑再引导安装的做法，但改成你自己的品牌和文案。"
            />

            <div className={styles.pricingGrid}>
              {pricingGroups.map((group) => (
                <article key={group.name} className={styles.pricingCard} data-tone={group.tone}>
                  <div className={styles.cardTopRow}>
                    <span className={styles.toneBadge}>{group.name}</span>
                    <span className={styles.pricingRate}>{group.rate}</span>
                  </div>
                  <p className={styles.pricingSummary}>{group.summary}</p>
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
                <span className={styles.infoLabel}>汇率</span>
                <strong>1 人民币 = 1 美元</strong>
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>计费方式</span>
                <strong>支持缓存计费</strong>
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>接入策略</span>
                <strong>统一网关，按场景分组</strong>
              </div>
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.sectionMuted)} id="tools">
          <div className="container">
            <SectionIntro
              eyebrow="支持工具"
              title="首页直接解释这三类工具分别适合什么"
              description="不只放安装入口，还提前说明各自更适合的工作流，让页面既像落地页，也像购买前的选择页。"
            />

            <div className={styles.toolGrid}>
              {toolProfiles.map((tool) => (
                <article key={tool.id} className={styles.toolCard} data-tone={tool.tone}>
                  <div className={styles.toolHeader}>
                    <span className={styles.toolMark}>{tool.mark}</span>
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
              title="把所有入口收成一页，但文档体系继续保留"
              description="首页负责转化和说明，文档负责落地安装。这样不会再像现在这样既不像官网，也不像真正的文档站。"
            />

            <div className={styles.guidesGrid}>
              {guideCards.map((guide) => (
                <Link key={guide.name} to={guide.to} className={styles.guideCard}>
                  <span className={styles.guideMark}>{guide.mark}</span>
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
              title="除了安装，更要把选择理由讲清楚"
              description="这一段借鉴 Duck 的信息结构，但改成更克制的表达，避免整页变成纯堆叠说明书。"
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
                <h2 className={styles.contactTitle}>让首页先把价值讲清楚，再把用户送进正确文档。</h2>
                <p className={styles.contactDescription}>
                  这是比现在更接近落地页的结构。下一步如果继续往 Duck 那边靠，
                  重点就该放在更完整的价格模块和更细的工具说明，而不是继续往侧边栏里塞页面。
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
