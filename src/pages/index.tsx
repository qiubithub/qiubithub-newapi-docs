import type {ReactNode} from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import styles from "./index.module.css";

function FeatureCard({title, description, icon, color}: {title: string; description: ReactNode; icon: string; color: string}) {
  return (
    <div className={styles.featureCard} style={{borderColor: color, background: color + "10"}}>
      <div className={styles.featureIcon} style={{color}}>{icon}</div>
      <h3 style={{color}}>{title}</h3>
      <div className={styles.featureDesc}>{description}</div>
    </div>
  );
}

function DocCard({title, description, to, icon}: {title: string; description: string; to: string; icon: string}) {
  return (
    <Link to={to} className={styles.docCard}>
      <div className={styles.docCardIcon}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title + " - Claude Code · CodeX · Gemini CLI"}
      description="按量计费，专为 Claude Code、CodeX、Gemini CLI 用户提供的高质量 API 服务">
      <main className={styles.main}>
        {/* Hero Section */}
        <div className={styles.hero}>
          <div className="container">
            <Heading as="h1" className={styles.heroTitle}>
              Claude Code · CodeX · Gemini CLI
            </Heading>
            <p className={styles.heroSubtitle}>
              按量计费，专为 Claude Code、CodeX、Gemini CLI 用户提供的高质量 API 服务
            </p>
            <p className={styles.heroSlogan}>
              让 AI 编程更高效，让开发更简单
            </p>
            
            <div className={styles.ctaButtons}>
              <Link to="https://www.qiubithub.com/console" className={clsx("button", "button--primary", "button--lg", styles.primaryBtn)}>
                🚀 获取 API Key
              </Link>
              <Link to="/docs/intro" className={clsx("button", "button--outline", "button--lg", styles.secondaryBtn)}>
                📖 查看文档
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className={styles.featuresSection}>
          <div className="container">
            <div className={styles.featuresGrid}>
              <FeatureCard
                icon="💰"
                title="价格优势"
                color="#52c41a"
                description={
                  <ul>
                    <li>全站汇率 <strong>1 人民币 = 1 美元</strong></li>
                    <li>Claude Code 专用分组 <strong>1.5倍率</strong></li>
                    <li>CodeX 专用分组 <strong>0.8倍率</strong></li>
                    <li>Gemini CLI 专用分组 <strong>1.5倍率</strong></li>
                    <li>支持缓存计费</li>
                  </ul>
                }
              />
              <FeatureCard
                icon="🚀"
                title="稳定可靠"
                color="#1890ff"
                description={
                  <ul>
                    <li>国内直连，无需科学上网</li>
                    <li>稳定快速，7×24小时服务</li>
                    <li>用量更省，支持缓存计费</li>
                    <li>模型保真，不掺假</li>
                    <li>灵活调整，透明计费</li>
                  </ul>
                }
              />
            </div>
          </div>
        </div>

        {/* Quick Start Docs Section */}
        <div className={styles.docsSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>快速开始</h2>
            <p className={styles.sectionSubtitle}>选择适合你的 AI 编程工具</p>
            <div className={styles.docsGrid}>
              <DocCard
                icon="🤖"
                title="Claude Code"
                description="Anthropic 官方 CLI 工具配置指南"
                to="/docs/claude-code"
              />
              <DocCard
                icon="💻"
                title="CodeX"
                description="OpenAI GPT-5 代码助手配置指南"
                to="/docs/codex"
              />
              <DocCard
                icon="🔧"
                title="Gemini CLI"
                description="Google Gemini CLI 工具配置指南"
                to="/docs/gemini-cli"
              />
            </div>
          </div>
        </div>

        {/* More Tools Section */}
        <div className={styles.moreToolsSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>更多工具</h2>
            <div className={styles.docsGrid}>
              <DocCard
                icon="🐾"
                title="OpenClaw"
                description="AI 编程工具配置指南"
                to="/docs/openclaw"
              />
              <DocCard
                icon="📝"
                title="OpenCode"
                description="OpenCode 配置指南"
                to="/docs/opencode"
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
