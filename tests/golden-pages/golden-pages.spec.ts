import fs from 'node:fs';
import path from 'node:path';

import {expect, type Locator, type Page, test} from '@playwright/test';

const evidenceRootDir = path.join(process.cwd(), '.sisyphus', 'evidence');
const evidenceDir = path.join(process.cwd(), '.sisyphus', 'evidence', 'task-1-golden-pages');
const mobileEvidencePath = path.join(evidenceRootDir, 'task-1-golden-pages-mobile.png');
const footerContractEvidencePath = path.join(evidenceRootDir, 'task-2-footer-contract.png');
const task7DocArchetypeEvidencePath = path.join(evidenceRootDir, 'task-7-doc-archetype.png');
const task7TabsLongpageEvidencePath = path.join(evidenceRootDir, 'task-7-tabs-longpage.png');
const task8HomeIaEvidencePath = path.join(evidenceRootDir, 'task-8-home-ia.png');
const task8HomeMobileEvidencePath = path.join(evidenceRootDir, 'task-8-home-mobile.png');
const task9DocsLandingEvidencePath = path.join(evidenceRootDir, 'task-9-docs-landing.png');
const task9PriorityDocsEvidencePath = path.join(evidenceRootDir, 'task-9-priority-docs-content.png');
const task10ScaffoldCleanupEvidencePath = path.join(evidenceRootDir, 'task-10-scaffold-cleanup.png');

function ensureEvidenceDir() {
  fs.mkdirSync(evidenceRootDir, {recursive: true});
  fs.mkdirSync(evidenceDir, {recursive: true});
}

async function saveEvidenceAtPath(page: Page, outputPath: string, fullPage = true) {
  fs.mkdirSync(path.dirname(outputPath), {recursive: true});
  await page.screenshot({
    path: outputPath,
    fullPage,
  });
}

async function saveEvidence(page: Page, fileName: string, fullPage = true) {
  ensureEvidenceDir();
  await saveEvidenceAtPath(page, path.join(evidenceDir, fileName), fullPage);
}

async function firstVisible(candidates: Locator[]) {
  for (const candidate of candidates) {
    if (await candidate.isVisible().catch(() => false)) {
      return candidate;
    }
  }

  throw new Error('Expected one candidate locator to be visible.');
}

async function getColorModeToggle(page: Page) {
  return firstVisible([
    page.getByRole('button', {name: /(?:dark|light).*(?:mode|theme)|(?:模式|主题).*(?:深色|浅色)/i}),
    page.locator('button[title*="mode" i], button[aria-label*="mode" i], button[class*="toggleButton" i]').first(),
  ]);
}

async function getDocsSidebarToggle(page: Page) {
  return firstVisible([
    page.getByRole('button', {name: /sidebar|navigation|menu|目录|侧边栏|导航/i}),
    page.locator('button[aria-label*="sidebar" i], button[aria-label*="navigation" i], button[aria-label*="menu" i], button[class*="toggleSidebar" i], button[class*="menuButton" i]').first(),
  ]);
}

test.beforeEach(async ({page}) => {
  ensureEvidenceDir();
  await page.context().clearCookies();
});

test('homepage golden-page smoke baseline', async ({page}) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/丘比特API/);
  await expect(page.getByRole('heading', {name: /AI CLI 接入门户/})).toBeVisible();
  await expect(page.getByRole('link', {name: '文档总览', exact: true})).toBeVisible();

  await saveEvidence(page, 'home.png');
});

test('homepage routes users into a docs-first portal flow', async ({page}) => {
  await page.goto('/');

  const heroDocsCta = page.getByRole('link', {name: '文档总览', exact: true});

  await expect(page.getByRole('heading', {name: /AI CLI 接入门户/})).toBeVisible();
  await expect(heroDocsCta).toBeVisible();
  await expect(heroDocsCta).toHaveAttribute('href', '/docs/intro');
  await expect(page.getByText('文档总览是默认起点，工具文档是分流终点。')).toBeVisible();

  await heroDocsCta.click();
  await expect(page).toHaveURL(/\/docs\/intro$/);

  await saveEvidenceAtPath(page, task8HomeIaEvidencePath);
});

test('homepage remains readable on mobile after docs-first rewrite', async ({page}) => {
  await page.setViewportSize({width: 390, height: 844});
  await page.goto('/');

  const heroDocsCta = page.getByRole('link', {name: '文档总览', exact: true});

  await expect(page.getByRole('heading', {name: /AI CLI 接入门户/})).toBeVisible();
  await expect(heroDocsCta).toBeVisible();

  const hasHorizontalOverflow = await page.evaluate(() => {
    const root = document.documentElement;
    return root.scrollWidth > window.innerWidth + 1;
  });

  expect(hasHorizontalOverflow).toBeFalsy();

  await saveEvidenceAtPath(page, task8HomeMobileEvidencePath);
});

test('docs intro golden-page smoke baseline', async ({page}) => {
  await page.goto('/docs/intro');

  await expect(page.getByRole('heading', {name: '文档总览', level: 1})).toBeVisible();
  await expect(page.getByRole('heading', {name: '接入步骤', level: 2})).toBeVisible();

  await saveEvidence(page, 'docs-intro.png');
});

test('docs intro brand stays aligned with the docs shell', async ({page}) => {
  await page.goto('/docs/intro');

  const navbarBrand = page.locator('.navbar__title').first();
  const introHeading = page.getByRole('heading', {name: '文档总览', level: 1});

  await expect(navbarBrand).toHaveText('丘比特API');
  await expect(introHeading).toBeVisible();

  const navbarBrandText = (await navbarBrand.textContent())?.trim();
  const introHeadingText = (await introHeading.textContent())?.trim();

  expect(navbarBrandText).toBe('丘比特API');
  expect(introHeadingText).toBe('文档总览');

  await saveEvidence(page, 'docs-intro-brand-aligned.png');
});

test('docs intro stays discoverable in the docs sidebar and entry flow', async ({page}) => {
  await page.goto('/docs/intro');

  const sidebar = page.getByRole('complementary').first();

  await expect(page.getByRole('link', {name: '文档', exact: true})).toHaveAttribute('href', '/docs/intro');
  await expect(page.getByRole('link', {name: '文档总览'})).toHaveAttribute('href', '/docs/intro');
  await expect(sidebar.getByRole('link', {name: '文档总览'})).toBeVisible();
  await expect(sidebar.getByRole('link', {name: 'Claude Code'})).toBeVisible();

  await saveEvidence(page, 'docs-intro-sidebar-aligned.png');
});

test('docs intro reads like a real docs landing page', async ({page}) => {
  await page.goto('/docs/intro');

  await expect(page.getByRole('heading', {name: '文档总览', level: 1})).toBeVisible();
  await expect(page.getByRole('heading', {name: '支持工具', level: 2})).toBeVisible();
  await expect(page.getByRole('heading', {name: '接入步骤', level: 2})).toBeVisible();
  await expect(page.getByRole('heading', {name: '获取帮助', level: 2})).toBeVisible();

  await saveEvidenceAtPath(page, task9DocsLandingEvidencePath);
});

test('homepage and docs intro keep footer brand and support links complete', async ({page}) => {
  const routes = [
    {path: '/', fileName: 'footer-home.png'},
    {path: '/docs/intro', fileName: 'footer-docs-intro.png'},
  ];

  for (const route of routes) {
    await page.goto(route.path);

    const footer = page.getByRole('contentinfo').first();

    await expect(footer).toContainText('丘比特API');
    await expect(footer.getByText('为 Claude Code & Codex & Gemini CLI 用户提供的高质量 API 服务')).toBeVisible();
    await expect(footer.getByText('让 AI 编程更高效，让开发更简单')).toBeVisible();
    await expect(footer.getByRole('link', {name: '服务条款'})).toHaveAttribute('href', 'https://www.qiubithub.com/terms');
    await expect(footer.getByRole('link', {name: '隐私政策'})).toHaveAttribute('href', 'https://www.qiubithub.com/privacy-policy');

    await saveEvidence(page, route.fileName);
  }

  await saveEvidenceAtPath(page, footerContractEvidencePath);
});

test('priority docs share one recognizable structure', async ({page}) => {
  const docs = [
    {
      path: '/docs/claude-code',
      title: 'Claude Code',
      headings: ['系统要求', '常见问题', '获取帮助'],
    },
    {
      path: '/docs/codex',
      title: 'Codex',
      headings: ['系统要求', '常见问题', '获取帮助'],
    },
    {
      path: '/docs/opencode',
      title: 'OpenCode',
      headings: ['系统要求', '常见问题', '获取帮助'],
    },
  ] as const;

  for (const doc of docs) {
    await page.goto(doc.path);

    await expect(page.getByRole('heading', {name: doc.title, level: 1})).toBeVisible();

    for (const heading of doc.headings) {
      await expect(page.getByRole('heading', {name: heading, level: 2})).toBeVisible();
    }
  }

  await saveEvidenceAtPath(page, task7DocArchetypeEvidencePath);
});

test('priority docs keep help and related links in a consistent ending zone', async ({page}) => {
  const docs = [
    '/docs/claude-code',
    '/docs/codex',
    '/docs/gemini-cli',
    '/docs/openclaw',
    '/docs/opencode',
  ] as const;

  for (const docPath of docs) {
    await page.goto(docPath);

    await expect(page.getByRole('heading', {name: '获取帮助', level: 2})).toBeVisible();
    await expect(page.getByRole('heading', {name: '相关链接', level: 2})).toBeVisible();
  }

  await saveEvidenceAtPath(page, task9PriorityDocsEvidencePath);
});

test('tab-heavy and long-form docs remain usable after archetype normalization', async ({page}) => {
  await page.goto('/docs/opencode');

  await expect(page.getByRole('tab', {name: 'Windows'})).toBeVisible();
  await expect(page.getByRole('tab', {name: 'macOS'})).toBeVisible();
  await expect(page.getByRole('tab', {name: 'Linux'})).toBeVisible();

  await page.getByRole('tab', {name: 'macOS'}).click();

  await expect(page.getByRole('heading', {name: '常见问题', level: 2})).toBeVisible();
  await expect(page.getByRole('heading', {name: '获取帮助', level: 2})).toBeVisible();

  await saveEvidenceAtPath(page, task7TabsLongpageEvidencePath);
});

test('claude-code docs include dark-mode switch coverage', async ({page}) => {
  await page.goto('/docs/claude-code');

  await expect(page.getByRole('heading', {name: 'Claude Code', level: 1})).toBeVisible();
  await expect(page.getByText('Windows', {exact: true})).toBeVisible();

  const html = page.locator('html');
  const initialTheme = await html.getAttribute('data-theme');
  expect(initialTheme).toBeTruthy();

  const toggle = await getColorModeToggle(page);
  await toggle.click();

  await expect
    .poll(async () => html.getAttribute('data-theme'))
    .not.toBe(initialTheme);

  await saveEvidence(page, 'docs-claude-code-theme-toggle.png');
});

test('opencode docs golden-page smoke baseline', async ({page}) => {
  await page.goto('/docs/opencode');

  await expect(page.getByRole('heading', {name: 'OpenCode', level: 1})).toBeVisible();
  await expect(page.getByRole('heading', {name: '系统要求', level: 2})).toBeVisible();
  await expect(page.getByRole('tab', {name: 'Windows'})).toBeVisible();

  await saveEvidence(page, 'docs-opencode.png');
});

test('mobile docs sidebar remains operable near the 996px breakpoint', async ({page}) => {
  await page.setViewportSize({width: 995, height: 900});
  await page.goto('/docs/claude-code');

  const sidebarToggle = await getDocsSidebarToggle(page);
  await sidebarToggle.click();

  const sidebar = await firstVisible([
    page.locator('aside[class*="docSidebarContainer" i]').first(),
    page.locator('.theme-doc-sidebar-container').first(),
    page.locator('nav[aria-label*="sidebar" i], nav[aria-label*="导航" i], nav[aria-label*="docs" i]').first(),
  ]);

  await expect(sidebar).toBeVisible();

  const hasHorizontalOverflow = await page.evaluate(() => {
    const root = document.documentElement;
    return root.scrollWidth > window.innerWidth + 1;
  });

  expect(hasHorizontalOverflow).toBeFalsy();

  await saveEvidenceAtPath(page, mobileEvidencePath, false);
});

test('scaffold residue no longer leaks into the primary site flow', async ({page}) => {
  const routes = ['/', '/docs/intro'] as const;

  for (const route of routes) {
    await page.goto(route);

    await expect(page.locator('a[href*="/blog"]')).toHaveCount(0);
    await expect(page.locator('a[href*="/docs/tutorial-basics"], a[href*="/docs/tutorial-extras"]')).toHaveCount(0);
    await expect(page.getByText('Tutorial - Basics')).toHaveCount(0);
    await expect(page.getByText('Tutorial - Extras')).toHaveCount(0);
    await expect(page.getByText('First Blog Post')).toHaveCount(0);
  }

  await saveEvidenceAtPath(page, task10ScaffoldCleanupEvidencePath);
});
