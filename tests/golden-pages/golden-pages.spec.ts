import fs from 'node:fs';
import path from 'node:path';

import {expect, type Page, test} from '@playwright/test';

const evidenceDir = path.join(process.cwd(), '.sisyphus', 'evidence', 'frontend-migration');
const docsBaseURL = process.env.DOCS_BASE_URL ?? 'http://127.0.0.1:4173';
const defaultBrandLogoUrl =
  'https://qiubithub-1396711629.cos.ap-guangzhou.myqcloud.com/qiubitHub-icon.png';
const expectedBrandLogoUrl =
  process.env.NEXT_PUBLIC_BRAND_LOGO_URL ??
  process.env.NEXT_PUBLIC_GATEWAY_LOGO_URL ??
  defaultBrandLogoUrl;

function ensureEvidenceDir() {
  fs.mkdirSync(evidenceDir, {recursive: true});
}

async function saveEvidence(page: Page, fileName: string, fullPage = true) {
  ensureEvidenceDir();
  await page.screenshot({
    path: path.join(evidenceDir, fileName),
    fullPage,
  });
}

async function expectNoHorizontalOverflow(page: Page) {
  const hasHorizontalOverflow = await page.evaluate(() => {
    const root = document.documentElement;
    return root.scrollWidth > window.innerWidth + 1;
  });

  expect(hasHorizontalOverflow).toBeFalsy();
}

test.beforeEach(() => {
  ensureEvidenceDir();
});

test('www homepage presents the new product landing page', async ({page}, testInfo) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/丘比特 API/);
  await expect(page.getByRole('heading', {name: /面向开发者的 AI 编程 统一接入平台/})).toBeVisible();
  await expect(page.getByText('QiubitHub').first()).toBeVisible();
  await expect(page.getByText('QiubiHub')).toHaveCount(0);
  await expect(page.getByRole('link', {name: /开始使用/})).toHaveAttribute('href', 'https://www.qiubithub.com/console');
  await expect(page.getByRole('link', {name: /查看文档/}).first()).toHaveAttribute('href', 'https://docs.qiubithub.com');
  await expect(page.getByRole('button', {name: '切换颜色模式'})).toBeVisible();
  await expect(page.getByText('Claude Code', {exact: true}).first()).toBeVisible();
  await expect(page.getByText('0.8x').first()).toBeVisible();
  await expect(page.getByText('https://www.qiubithub.com/v1')).toHaveCount(0);
  await expect(page.getByText('Base URL')).toHaveCount(0);
  await expect(page.getByText('配置表')).toHaveCount(0);
  await expect(page.getByText('接口规则')).toHaveCount(0);
  await expect(page.getByText('截图')).toHaveCount(0);
  await expect(page.getByText('常用工具配置，一行复制')).toHaveCount(0);
  await expect(page.getByRole('heading', {name: '您是否也遇到这些问题'})).toBeVisible();
  await expect(page.getByRole('heading', {name: '我们的解决方案'})).toBeVisible();
  await expect(page.getByRole('heading', {name: /一份额度，接入常用 AI 编程工具/})).toBeVisible();
  await expect(page.getByText('所有工具组均支持')).toBeVisible();
  await expect(page.getByText('https://www.qiubithub.com/gemini_cli')).toHaveCount(0);
  await expect(page.getByText('openclaw models auth login')).toHaveCount(0);
  await expect(page.getByText(/api\.qiubithub\.com\/v1/)).toHaveCount(0);
  await expect(page.locator('header .brand-logo')).toHaveAttribute('src', expectedBrandLogoUrl);
  await expect(page.locator('header .brand-logo')).toHaveCSS('object-fit', 'contain');
  await expect(page.getByRole('contentinfo')).toContainText('联系我们');
  await expect(page.getByRole('contentinfo')).toContainText('15802061870');
  await expect(page.getByRole('contentinfo')).toContainText('qiuchuanzeha@gmail.com');
  await expectNoHorizontalOverflow(page);

  await saveEvidence(page, `www-home-${testInfo.project.name}.png`);
});

test('www homepage supports a manual dark mode', async ({page}, testInfo) => {
  await page.goto('/');

  await page.getByRole('button', {name: '切换颜色模式'}).click();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByRole('heading', {name: /面向开发者的 AI 编程 统一接入平台/})).toBeVisible();
  await expect(page.getByRole('link', {name: /开始使用/})).toBeVisible();
  await expectNoHorizontalOverflow(page);

  await saveEvidence(page, `www-home-dark-${testInfo.project.name}.png`);
});

test('www homepage keeps key sections usable on every viewport', async ({page}, testInfo) => {
  await page.goto('/');

  await expect(page.locator('#models')).toContainText('支持的工具');
  await expect(page.getByRole('heading', {name: /您是否也遇到这些问题/})).toBeVisible();
  await expect(page.getByText('按工具分入口')).toBeVisible();
  await expect(page.getByText('官网负责转化')).toHaveCount(0);
  await expect(page.locator('#pricing')).toContainText('一份额度');
  await expect(page.locator('#pricing')).toContainText('Codex 工具组');
  await expect(page.locator('#pricing')).toContainText('Claude 工具组');
  await expect(page.locator('#faq')).toContainText('常见问题');
  await expect(page.locator('a[href="#pricing"]').first()).toContainText('定价');
  await expect(page.locator('a[href="#demo"]')).toHaveCount(0);
  await expect(page.getByAltText('Codex CLI 启动截图')).toHaveCount(0);
  await expectNoHorizontalOverflow(page);

  await saveEvidence(page, `www-sections-${testInfo.project.name}.png`);
});

test('docs homepage and tool page render in VitePress', async ({page}, testInfo) => {
  await page.goto(`${docsBaseURL}/`);

  await expect(page).toHaveTitle(/丘比特 API 文档/);
  await expect(page.getByRole('heading', {name: '快速开始', level: 1})).toBeVisible();
  await expect(page.getByRole('link', {name: 'Claude Code'}).first()).toHaveAttribute('href', '/claude-code');
  await expectNoHorizontalOverflow(page);

  await page.goto(`${docsBaseURL}/claude-code`);

  await expect(page.getByRole('heading', {name: 'Claude Code', level: 1})).toBeVisible();
  await expect(page.getByRole('tab', {name: 'Windows'})).toBeVisible();
  await expect(page.getByRole('tab', {name: 'macOS'})).toBeVisible();
  await expect(page.getByRole('tab', {name: 'Linux'})).toBeVisible();
  await expect(page.getByRole('heading', {name: '2. 安装 Claude Code CLI'}).first()).toBeVisible();
  await expect(page.getByText('https://www.qiubithub.com').first()).toBeVisible();
  await expect(page.getByText('Claude Code 用')).toBeVisible();

  await page.getByRole('tab', {name: 'macOS'}).click();
  await expect(page.getByRole('tab', {name: 'macOS'})).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByText('brew install node')).toBeVisible();

  await page.getByRole('tab', {name: 'Linux'}).click();
  await expect(page.getByRole('tab', {name: 'Linux'})).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByText('sudo apt-get install -y nodejs')).toBeVisible();

  await expectNoHorizontalOverflow(page);

  await saveEvidence(page, `docs-claude-${testInfo.project.name}.png`);

  await page.goto(`${docsBaseURL}/codex`);
  await expect(page.getByText('https://www.qiubithub.com/v1').first()).toBeVisible();
  await expect(page.getByText(/api\.aicodewith\.com/)).toHaveCount(0);

  await page.goto(`${docsBaseURL}/gemini-cli`);
  await expect(page.getByText('https://www.qiubithub.com/gemini_cli').first()).toBeVisible();

  await page.goto(`${docsBaseURL}/openclaw`);
  await expect(page.getByText('OpenClaw 走')).toBeVisible();
  await expect(page.getByText('openclaw models auth login').first()).toBeVisible();
});
