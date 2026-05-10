import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Gauge,
  KeyRound,
  Mail,
  MessageCircle,
  PlugZap,
  ReceiptText,
  X,
} from 'lucide-react';

const docsUrl = 'https://docs.qiubithub.com';
const consoleUrl = 'https://www.qiubithub.com/console';
const gatewayUrl = 'https://www.qiubithub.com/';
const defaultBrandLogoUrl =
  'https://qiubithub-1396711629.cos.ap-guangzhou.myqcloud.com/qiubitHub-icon.png';
const brandLogoUrl =
  process.env.NEXT_PUBLIC_BRAND_LOGO_URL ??
  process.env.NEXT_PUBLIC_GATEWAY_LOGO_URL ??
  defaultBrandLogoUrl;

const navItems = [
  {label: '首页', href: '#top'},
  {label: '文档', href: docsUrl},
  {label: '定价', href: '#pricing'},
  {label: '模型', href: '#models'},
  {label: '联系我们', href: '#contact'},
] as const;

const modelChips = ['Claude Code', 'Codex', 'Gemini CLI', 'OpenClaw', 'OpenCode', '+ 更多'];

const heroStats = [
  {value: '5+', label: '编程工具'},
  {value: '0.8x', label: 'Codex 低至'},
  {value: '按量', label: '统一计费'},
] as const;

const supportedTools = [
  {name: 'Claude Code', tag: '复杂改动 / 长上下文', rate: '1.5x', href: `${docsUrl}/claude-code`},
  {name: 'Codex', tag: '高频编码 / 日常任务', rate: '0.8x', href: `${docsUrl}/codex`},
  {name: 'Gemini CLI', tag: '大上下文 / 文档分析', rate: '1.5x', href: `${docsUrl}/gemini-cli`},
  {name: 'OpenClaw', tag: 'Claude 系插件认证', rate: '1.5x', href: `${docsUrl}/openclaw`},
  {name: 'OpenCode', tag: '多模型客户端', rate: '按模型', href: `${docsUrl}/opencode`},
] as const;

const problems = [
  {
    title: '工具配置分散',
    text: '每个 CLI 的入口、鉴权、模型名都不一样，新用户容易卡在第一步。',
  },
  {
    title: '国内链路不稳',
    text: '长任务生成到一半中断，体验被网络波动和超时反复打断。',
  },
  {
    title: 'Key 和余额难管理',
    text: '多处充值、多处查账，实际消耗和剩余额度不够直观。',
  },
  {
    title: '不知道先看哪篇',
    text: '文档太多时，很难判断自己该从 Claude、Codex 还是 Gemini 开始。',
  },
  {
    title: '成本口径不清楚',
    text: '工具、模型、倍率混在一起，看完还是不知道大概怎么扣费。',
  },
  {
    title: '出问题没人接',
    text: '配置失败、没有调用记录、模型不可用时，缺少明确排查路径。',
  },
] as const;

const solutions = [
  {
    title: '按工具分入口',
    text: 'Claude Code、Codex、Gemini CLI、OpenClaw、OpenCode 分别给教程，用户不用先理解底层差异。',
    icon: PlugZap,
  },
  {
    title: '一个控制台管理',
    text: 'Key、余额、充值、调用记录集中在控制台，团队和个人都能快速判断问题在哪。',
    icon: KeyRound,
  },
  {
    title: '稳定接入常用 CLI',
    text: '面向国内使用场景优化接入链路，先保障 AI 编程工具稳定跑起来。',
    icon: Gauge,
  },
  {
    title: '价格和用量看得清',
    text: '常用工具倍率放在首页，细节留给控制台和文档，决策路径更短。',
    icon: ReceiptText,
  },
] as const;

const pricing = [
  {
    name: 'Codex 工具组',
    rate: '0.8x',
    desc: '适合高频编码、日常提交、快速问答。',
    features: ['Codex 教程入口', 'OpenAI 兼容工具', '按量扣费'],
    href: `${docsUrl}/codex`,
    featured: false,
  },
  {
    name: 'Claude 工具组',
    rate: '1.5x',
    desc: '适合复杂改动、长上下文任务和 Claude 系客户端。',
    features: ['Claude Code', 'OpenClaw', '长任务更稳'],
    href: `${docsUrl}/claude-code`,
    featured: true,
  },
  {
    name: 'Gemini 工具组',
    rate: '1.5x',
    desc: '适合大上下文、文档分析和多文件理解。',
    features: ['Gemini CLI', '大上下文任务', '统一余额'],
    href: `${docsUrl}/gemini-cli`,
    featured: false,
  },
] as const;

const faqs = [
  {
    question: 'QiubitHub 是给哪些工具用的？',
    answer:
      '主要给 Claude Code、Codex、Gemini CLI、OpenClaw、OpenCode 这类 AI 编程工具使用。你用哪个工具，就打开对应教程。',
  },
  {
    question: '购买后怎么开始？',
    answer:
      '进入控制台创建 API Key，再打开对应工具教程复制配置。工具能正常回复，并且控制台出现调用记录，就说明已经接好。',
  },
  {
    question: '额度和价格怎么理解？',
    answer:
      '额度在控制台统一管理，常用工具按对应倍率扣费。首页只展示最常用分组，具体用量以控制台记录为准。',
  },
  {
    question: '配置失败怎么办？',
    answer:
      '先检查 Key、工具教程和控制台调用记录。如果还是卡住，可以通过微信或邮箱联系技术支持。',
  },
] as const;

const footerLinks = [
  {label: 'Claude Code', href: `${docsUrl}/claude-code`},
  {label: 'Codex', href: `${docsUrl}/codex`},
  {label: 'Gemini CLI', href: `${docsUrl}/gemini-cli`},
  {label: 'OpenClaw', href: `${docsUrl}/openclaw`},
  {label: 'OpenCode', href: `${docsUrl}/opencode`},
] as const;

function Header() {
  return (
    <header className="site-header">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="flex items-center gap-2.5 font-black text-slate-950" aria-label="QiubitHub 首页">
          <span className="brand-icon">
            <img
              src={brandLogoUrl}
              alt=""
              className="brand-logo"
              width={28}
              height={28}
              aria-hidden
            />
          </span>
          <span>QiubitHub</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-bold text-slate-700 md:flex">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="transition hover:text-blue-600">
              {item.label}
            </a>
          ))}
        </nav>

        <a href={consoleUrl} className="header-cta">
          立刻体验
        </a>
      </div>
    </header>
  );
}

function HeroTerminal() {
  return (
    <div className="terminal-window" aria-label="QiubitHub CLI 调用示例">
      <div className="terminal-bar">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="truncate">~/projects/api-stream — codex</span>
      </div>
      <div className="space-y-4 p-5 font-mono text-[0.86rem] leading-6 text-slate-300 md:p-7">
        <p className="text-slate-500">~/projects/api-stream on main</p>
        <p>
          <span className="text-blue-300">❯</span> qiubithub "把接口改成流式输出"
        </p>
        <p className="text-blue-300">● routing → Codex · 0.8x · streaming</p>
        <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4 text-slate-200">
          <p className="mb-3 text-white">我会保留现有鉴权逻辑，只改响应流：</p>
          <pre className="overflow-x-auto whitespace-pre-wrap text-[0.78rem] leading-6">
{`export async function POST(req: Request) {
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of llm.stream(prompt)) {
        controller.enqueue(chunk);
      }
    }
  });
  return new Response(stream);
}`}
          </pre>
        </div>
        <p className="text-slate-400">已生成改动建议，控制台可查看本次调用记录。</p>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-28 md:px-8 md:pb-20 md:pt-32 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
        <div>
          <div className="hero-badge">
            <BadgeCheck size={15} aria-hidden />
            已支持 Claude Code · Codex · Gemini CLI
          </div>
          <h1 className="mt-7 max-w-3xl text-[2.65rem] font-black leading-[1.04] text-slate-950 sm:text-6xl md:text-[4.45rem]">
            面向开发者的
            <span className="block text-blue-600">AI 编程</span>
            统一接入平台
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-600 md:text-xl">
            一个账号接入 Claude Code、Codex、Gemini CLI、OpenClaw、OpenCode。额度统一、按量计费，国内稳定可用。
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {modelChips.map((chip) => (
              <span key={chip} className="model-chip">
                {chip}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={consoleUrl} className="primary-button">
              开始使用
              <ArrowRight size={18} aria-hidden />
            </a>
            <a href={docsUrl} className="secondary-button">
              查看文档
              <BookOpen size={18} aria-hidden />
            </a>
          </div>

          <div className="mt-9 grid max-w-xl grid-cols-3 border-y border-slate-200">
            {heroStats.map((stat) => (
              <div key={stat.label} className="hero-stat">
                <div className="text-xl font-black text-slate-950">{stat.value}</div>
                <div className="mt-1 text-xs font-bold text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <HeroTerminal />
      </div>

      <div id="models" className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <p className="mb-5 text-center text-xs font-black uppercase text-slate-400">支持的工具</p>
        <div className="tool-marquee">
          {[...supportedTools, ...supportedTools].map((tool, index) => (
            <a key={`${tool.name}-${index}`} href={tool.href} className="tool-logo-pill">
              <span className="tool-logo-mark">{tool.name.slice(0, 1)}</span>
              {tool.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="bg-slate-50 px-5 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="您是否也遇到这些问题"
          subtitle="AI 编程工具接入时，真正劝退用户的通常不是模型能力，而是第一步能不能顺利跑起来。"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem) => (
            <article key={problem.title} className="problem-card">
              <span className="problem-icon">
                <X size={14} aria-hidden />
              </span>
              <h3 className="mt-7 text-lg font-black text-slate-950">{problem.title}</h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{problem.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionSection() {
  return (
    <section className="bg-white px-5 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading title="我们的解决方案" subtitle="统一入口、统一额度、统一记录。用户只需要选工具、拿 Key、跑起来。" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {solutions.map((solution) => {
            const Icon = solution.icon;
            return (
              <article key={solution.title} className="solution-card">
                <div className="solution-icon">
                  <Icon size={22} aria-hidden />
                </div>
                <h3 className="mt-5 text-xl font-black text-slate-950">{solution.title}</h3>
                <p className="mt-3 text-base font-semibold leading-7 text-slate-600">{solution.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="bg-white px-5 pb-20 md:px-8 md:pb-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="一份额度，接入常用 AI 编程工具"
          subtitle="首页只放最常用的价格判断。确认要用，再进控制台创建 Key。"
        />

        <div className="pricing-includes mx-auto mt-10 max-w-4xl">
          <div className="mb-4 text-center text-sm font-black text-slate-700">所有工具组均支持</div>
          <div className="grid gap-3 text-sm font-bold text-slate-600 sm:grid-cols-2">
            {['额度统一管理', '按量透明扣费', '控制台查看调用记录', '文档按工具拆分', '微信和邮箱支持', '持续接入更多工具'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-blue-600" aria-hidden />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {pricing.map((item) => (
            <article key={item.name} className={`price-card ${item.featured ? 'price-card-featured' : ''}`}>
              {item.featured ? <div className="price-badge">推荐</div> : null}
              <div className="text-sm font-bold text-slate-500">{item.name}</div>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-5xl font-black text-slate-950">{item.rate}</span>
                <span className="pb-2 text-sm font-bold text-slate-500">倍率</span>
              </div>
              <p className="mt-4 min-h-14 text-sm font-semibold leading-6 text-slate-600">{item.desc}</p>
              <a href={consoleUrl} className={item.featured ? 'primary-button mt-6 w-full' : 'outline-button mt-6 w-full'}>
                立即体验
              </a>
              <div className="mt-6 space-y-3">
                {item.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm font-bold text-slate-600">
                    <CheckCircle2 size={15} className="text-blue-600" aria-hidden />
                    {feature}
                  </div>
                ))}
              </div>
              <a href={item.href} className="mt-6 inline-flex items-center gap-1 text-sm font-black text-blue-600 hover:text-blue-700">
                查看教程
                <ChevronRight size={15} aria-hidden />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="bg-slate-50 px-5 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title="常见问题" subtitle="第一次使用 QiubitHub，先看这几个问题。" />
        <div className="mt-12 space-y-4">
          {faqs.map((faq) => (
            <article key={faq.question} className="faq-item">
              <h3 className="text-base font-black text-slate-950">{faq.question}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="cta-section px-5 py-20 text-center md:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-black uppercase text-blue-600">Ready to get started?</p>
        <h2 className="mt-3 text-3xl font-black leading-tight text-slate-950 md:text-5xl">
          注册即可开始使用 QiubitHub API 服务
        </h2>
        <div className="mt-8 flex justify-center">
          <a href={consoleUrl} className="primary-button">
            立刻体验
            <ArrowRight size={18} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" role="contentinfo" className="site-footer px-5 py-12 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.65fr_0.65fr_0.9fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="brand-icon footer-brand-icon">
                <img src={brandLogoUrl} alt="" className="brand-logo" width={28} height={28} aria-hidden />
              </span>
              <div>
                <div className="font-black">QiubitHub</div>
                <div className="mt-1 text-xs font-bold text-slate-500">AI Coding API Gateway</div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm font-semibold leading-7 text-slate-400">
              面向开发者的 AI 编程统一接入平台，让 Claude Code、Codex、Gemini CLI 等工具在国内稳定可用。
            </p>
          </div>

          <FooterColumn title="快速链接" links={[{label: '服务官网', href: gatewayUrl}, {label: '控制台', href: consoleUrl}, {label: '文档中心', href: docsUrl}]} />
          <FooterColumn title="工具文档" links={footerLinks} />

          <div>
            <div className="text-sm font-black">联系我们</div>
            <p className="mt-4 text-sm font-semibold leading-6 text-slate-400">配置卡住、调用异常、模型不确定，都可以直接联系。</p>
            <div className="mt-5 space-y-3">
              <a href="weixin://dl/chat?15802061870" className="footer-contact-link">
                <MessageCircle size={17} aria-hidden />
                微信：15802061870
              </a>
              <a href="mailto:qiuchuanzeha@gmail.com" className="footer-contact-link">
                <Mail size={17} aria-hidden />
                邮箱：qiuchuanzeha@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs font-semibold text-slate-500 md:flex-row md:items-center md:justify-between">
          <div>© 2026 QiubitHub. 保留所有权利。</div>
          <div>{gatewayUrl}</div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({title, links}: {title: string; links: readonly {label: string; href: string}[]}) {
  return (
    <div>
      <div className="text-sm font-black text-white">{title}</div>
      <div className="mt-5 space-y-3">
        {links.map((link) => (
          <a key={link.label} href={link.href} className="block text-sm font-semibold text-slate-400 transition hover:text-white">
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function SectionHeading({title, subtitle}: {title: string; subtitle: string}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-3xl font-black leading-tight text-slate-950 md:text-5xl">{title}</h2>
      <p className="mt-4 text-base font-semibold leading-7 text-slate-500 md:text-lg">{subtitle}</p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Header />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
