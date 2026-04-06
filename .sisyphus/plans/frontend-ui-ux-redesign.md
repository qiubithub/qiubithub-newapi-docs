# Frontend UI/UX Redesign for Docs-First Product Portal

## TL;DR
> **Summary**: Rework the Docusaurus site into a unified, premium-feeling developer documentation portal by fixing the visual system first, then aligning the site shell, docs archetypes, homepage IA, and priority content.
> **Deliverables**:
> - Lightweight golden-page browser QA foundation with screenshot evidence
> - Unified design tokens and shell language across homepage, docs, navbar, and footer
> - Canonical docs landing + standardized priority doc archetype
> - Rewritten homepage IA that routes users into docs instead of acting like a separate product
> - Priority-doc normalization, scaffold cleanup, and canonical/deployment metadata alignment
> **Effort**: Large
> **Parallel**: YES - 3 waves
> **Critical Path**: 1 → 2 → 3/4 → 5 → 8/9 → 10

## Context
### Original Request
- Improve the current frontend because it feels "not very good-looking".
- Communication must stay in Chinese.
- The user wants ROI-based prioritization first, then a concrete redesign plan.

### Interview Summary
- Product positioning locked as **带产品气质的专业开发者文档站**.
- Preferred style is **70% professional documentation / 30% product polish**.
- Redesign scope is **large**, but the result must remain docs-first rather than marketing-first.
- Recommended priority order already accepted: **overall visual/system unification → docs experience → homepage polish**.
- User approved a **professional-docs-biased** outcome over a brand-marketing-biased one.

### Metis Review (gaps addressed)
- Convert subjective goals like “更高级 / 更统一” into executable contracts using golden pages, browser checks, and screenshot evidence.
- Lock scope so the redesign does not expand into search migration, blog work, localization, analytics changes, or a full repo-wide content rewrite.
- Standardize docs IA and page archetypes before rewriting homepage sections or polishing visuals.
- Treat scaffold cleanup and canonical host alignment as required work, not optional polish.

### Oracle Review (architectural guardrails addressed)
- Stay inside stable Docusaurus seams: `themeConfig`, CSS variables, page-level CSS Modules, MDX structure, and the existing `src/theme/Footer` override.
- Do **not** add new swizzles for `Navbar`, `DocPage`, `DocItem`, sidebar internals, or TOC unless a documented requirement is impossible without them.
- Split redesign work into **shell tokens** vs **content patterns** so expressive homepage styling does not leak into doc reading surfaces.
- Audit and reduce fragile selectors inside `src/css/custom.css` before deepening the shell redesign.

### Decision Lock (resolved defaults)
- **In scope**: `/`, `/docs/intro`, `/docs/claude-code`, `/docs/openclaw`, `/docs/opencode`, `/docs/codex`, `/docs/gemini-cli`, navbar/footer/docs shell, sidebar behavior, scaffold residue cleanup, canonical host + metadata alignment, and lightweight QA harness setup.
- **Out of scope**: blog redesign, search provider migration, localization, analytics overhaul, console/backend changes, pricing backend logic, and full rewrite of every doc in `docs/`.
- **Editorial scope**: light-to-medium rewrite of homepage, docs landing, and priority doc structure/copy; not a full content strategy rewrite for the whole repository.
- **Canonical docs archetype**: `Overview → Prerequisites → Install → Configure → Verify → Troubleshooting → Related Links`.
- **OS pattern default**: use Tabs only when OS-specific commands materially diverge; otherwise keep one shared flow with callouts for differences.
- **MD/MDX default**: migrate `docs/opencode.md` to MDX if needed to fit the canonical doc archetype and shared helper components.
- **Canonical host default**: use `https://docs.qiubithub.com` as the docs site canonical host, while keeping console/legal links on `https://www.qiubithub.com` unless implementation discovers a hard deployment constraint.
- **QA default**: add a lightweight permanent Playwright smoke suite for golden pages instead of relying only on ad hoc manual browser checks.
- **Asset default**: normalize only priority-doc screenshots/assets now; do not commit to a full screenshot reshoot across the repo.
- **Brand boundary**: decorative gradients and stronger product polish are allowed on homepage hero/CTA/footer accent zones, but doc reading surfaces must stay restrained, readable, and non-marketing.

### File Map / Change Ownership
- `package.json` — add QA scripts and any required browser-test dependency commands.
- `docusaurus.config.ts` — canonical host, navbar/footer source-of-truth, docs shell config, and metadata alignment.
- `sidebars.ts` — canonical docs landing and sidebar hierarchy alignment.
- `src/css/custom.css` — shared tokens, typography, shell surfaces, stable global rules, reduced fragile selectors.
- `src/pages/index.tsx` — homepage IA rewrite and shared shell alignment.
- `src/pages/index.module.css` — homepage-only expressive visuals after token unification.
- `src/theme/Footer/index.tsx` + `src/theme/Footer/styles.module.css` — keep as the only existing swizzled structural override, but align it with the shared brand and shell system.
- `docs/intro.md` or `docs/intro.mdx` — rewrite into the canonical docs landing page.
- `docs/claude-code.mdx`, `docs/codex.mdx`, `docs/gemini-cli.mdx`, `docs/openclaw.mdx`, `docs/opencode.md|mdx` — normalize to the chosen archetype.
- `src/components/HomepageFeatures/index.tsx`, `src/pages/markdown-page.md`, `docs/tutorial-basics/**`, `docs/tutorial-extras/**` — explicit cleanup/remove-or-exclude targets.
- New QA files (recommended): `playwright.redesign.config.ts`, `tests/golden-pages/*.spec.ts`, and minimal shared helpers only if repeated doc structure demands them.

## Work Objectives
### Core Objective
Make the site feel like one polished docs-first product by aligning homepage, docs shell, and priority documents around one restrained visual system and one consistent content model.

### Deliverables
- Golden-page QA contract with screenshots/evidence for homepage + docs routes
- Source-of-truth lock for canonical host, brand naming, support links, and footer data contract
- Unified design-token baseline for typography, color, spacing, radius, and surfaces
- Cohesive navbar/footer/docs chrome without introducing extra swizzled theme internals
- Canonical docs landing and standardized priority-doc template
- Homepage IA that routes users into the correct docs path faster
- Priority-doc normalization plus scaffold residue cleanup and metadata polish

### Definition of Done (verifiable conditions with commands)
- `npm run typecheck` exits 0.
- `npm run build` exits 0.
- `npm run qa:golden-pages` exits 0 against the local site.
- Golden-page evidence exists for `/`, `/docs/intro`, one tab-heavy doc, one long screenshot-heavy doc, and mobile sidebar states under `.sisyphus/evidence/`.
- Navbar, footer, homepage, and docs shell all use the locked canonical brand/copy/host rules.
- No scaffold/tutorial residue is reachable from primary navigation or priority docs flows.
- The docs landing route and sidebar first-class entry are aligned.

### Must Have
- Docs-first UX: homepage should guide users into docs, not overshadow them.
- Stable Docusaurus implementation seams with minimal swizzle surface.
- Shared token system before page-level redesign.
- Canonical doc archetype applied to all priority docs.
- Executable acceptance criteria and artifact capture for every major task.

### Must NOT Have (guardrails, AI slop patterns, scope boundaries)
- No new standalone design-system package.
- No new swizzles for `Navbar`, `DocPage`, `DocItem`, TOC, or sidebar internals.
- No “make it look premium” tasks without measurable checks.
- No repo-wide content rewrite outside the locked priority pages.
- No search/blog/localization/analytics/backend work hidden inside UI tasks.
- No homepage-only visual language that makes docs feel like a different product again.

## Verification Strategy
> ZERO HUMAN INTERVENTION - all verification is agent-executed.
- Test decision: **tests-after foundation, then acceptance-contract TDD** using Playwright smoke coverage + existing `typecheck`/`build`.
- QA policy: Every task includes agent-executed route checks or command checks plus saved evidence.
- Evidence: `.sisyphus/evidence/task-{N}-{slug}.{ext}`
- Golden-page matrix (minimum):
  - `/`
  - `/docs/intro`
  - `/docs/claude-code`
  - `/docs/opencode`
  - `/docs/gemini-cli` or `/docs/codex`
  - mobile docs sidebar state near `996px`
  - light and dark modes where applicable

## Execution Strategy
### Parallel Execution Waves
> Target: 5-8 tasks per wave. <3 per wave (except final) = under-splitting.
> Extract shared dependencies as Wave-1 tasks for max parallelism.

Wave 1: Tasks 1-4 — QA foundation, source-of-truth lock, token baseline, selector audit/stable shell classes

Wave 2: Tasks 5-7 — shell unification, docs IA alignment, canonical docs archetype + helper patterns

Wave 3: Tasks 8-10 — homepage IA rewrite, priority-doc normalization, cleanup + canonical/deployment polish

### Dependency Matrix (full, all tasks)
| Task | Depends On | Blocks |
|---|---|---|
| 1 | none | 2, 5, 8, 9, 10 |
| 2 | none | 5, 6, 8, 10 |
| 3 | 2 | 5, 8 |
| 4 | 2 | 5, 6, 7 |
| 5 | 1, 2, 3, 4 | 8, 9 |
| 6 | 1, 2, 4 | 7, 8, 9 |
| 7 | 1, 2, 4, 6 | 9 |
| 8 | 1, 2, 3, 5, 6 | 10 |
| 9 | 1, 2, 5, 6, 7 | 10 |
| 10 | 1, 2, 5, 8, 9 | Final Verification |

### Agent Dispatch Summary (wave → task count → categories)
- Wave 1 → 4 tasks → `unspecified-high`, `deep`, `visual-engineering`
- Wave 2 → 3 tasks → `visual-engineering`, `deep`, `writing`
- Wave 3 → 3 tasks → `visual-engineering`, `writing`, `unspecified-high`
- Final Verification → 4 tasks → `oracle`, `unspecified-high`, `deep`

## TODOs
> Implementation + Test = ONE task. Never separate.
> EVERY task MUST have: Agent Profile + Parallelization + QA Scenarios.

- [ ] 1. 建立 golden-page QA 基线与证据目录

  **What to do**: 为本次重构增加最小但长期可复用的浏览器验收基线。新增 golden-page 路由矩阵、Playwright 配置与脚本、证据输出目录约定，并先把当前站点的关键不一致点固化成失败或待改进的断言。至少覆盖 `/`、`/docs/intro`、`/docs/claude-code`、`/docs/opencode`、一个移动端 docs sidebar 状态，以及亮/暗主题切换。把现有仅有的 `build`/`typecheck` 校验升级成“脚本 + 浏览器 + 截图证据”的组合验证入口。
  **Must NOT do**: 不要引入完整视觉回归平台（Chromatic/Percy）；不要为整个 repo 写大而全的 E2E；不要把断言写成主观描述（例如“看起来更高级”）。

  **Recommended Agent Profile**:
  - Category: `unspecified-high` - Reason: 需要搭建测试/脚本基础设施并与现有 Docusaurus 启动方式整合。
  - Skills: [`playwright`] - 需要明确浏览器自动化和截图证据生成方式。
  - Omitted: [`ui-ux-pro-max`] - 此任务是验证基础设施，不是视觉设计决策。

  **Parallelization**: Can Parallel: YES | Wave 1 | Blocks: [5, 8, 9, 10] | Blocked By: []

  **References** (executor has NO interview context - be exhaustive):
  - Script baseline: `package.json:5-16` - 当前只有 `start/build/serve/typecheck`，需要扩展 QA 脚本。
  - Docs route config: `docusaurus.config.ts:56-69` - docs routeBasePath 为 `docs`，测试基线路径必须遵循此配置。
  - Mobile breakpoint: `src/css/custom.css:448-473` - 现有样式已围绕 `996px` 写响应式调整，移动端断言要覆盖这一阈值。
  - Homepage route: `src/pages/index.tsx:347-605` - `/` 为自定义首页，是 golden-page 样本之一。
  - Priority docs: `docs/intro.md:1-41`, `docs/claude-code.mdx:1-335`, `docs/opencode.md:1-183` - 代表 docs landing、tab-heavy 文档、非标准结构文档三种 archetype。

  **Acceptance Criteria** (agent-executable only):
  - [ ] `npm install` 后存在可运行的 golden-page QA 命令，例如 `npm run qa:golden-pages`。
  - [ ] `npm run qa:golden-pages -- --list` 或等效命令能列出约定的 golden-page 用例。
  - [ ] 本地启动站点后，QA 脚本可对 `/`、`/docs/intro`、`/docs/claude-code`、`/docs/opencode` 进行访问并输出截图到 `.sisyphus/evidence/`。
  - [ ] 至少一个移动端宽度（接近 `996px` 以下）和一个暗色模式场景被纳入脚本验证。

  **QA Scenarios** (MANDATORY - task incomplete without these):
  ```
  Scenario: Golden pages run against local site
    Tool: Bash
    Steps: 1) 安装依赖 2) 启动本地站点 3) 运行 golden-page QA 脚本 4) 检查输出截图与断言结果
    Expected: QA 命令退出 0，并在 .sisyphus/evidence/task-1-golden-pages/ 下生成首页、docs landing、priority doc 的截图/日志
    Evidence: .sisyphus/evidence/task-1-golden-pages/run.log

  Scenario: Mobile docs sidebar contract
    Tool: Playwright
    Steps: 1) 以 <=996px 视口打开 /docs/claude-code 2) 展开 docs 导航 3) 截图并断言导航可见、无横向溢出
    Expected: 侧边栏可操作，页面无明显布局断裂，截图成功保存
    Evidence: .sisyphus/evidence/task-1-golden-pages-mobile.png
  ```

  **Commit**: YES | Message: `test(ui): add golden-page redesign contracts` | Files: [`package.json`, `playwright.redesign.config.ts`, `tests/golden-pages/**`]

- [ ] 2. 锁定 canonical host、品牌词与站点配置单一真相源

  **What to do**: 在 `docusaurus.config.ts` 中统一 docs 站的 canonical host、navbar/footer 品牌文案、support/legal 链接、footer 数据契约，并明确 docs 与主站的域名分工。修复“部署文档写 docs.qiubithub.com，但 config 里是 www.qiubithub.com”的冲突；同时统一 QIUBIT / QiubiHub / 丘比特API 的品牌表达边界，至少保证 docs shell 内一致。若 footer 继续采用 `themeConfig.footer + customFields.footerData` 双源结构，需明确哪个字段负责什么，避免后续漂移。
  **Must NOT do**: 不要顺手修改控制台、后端 API、外部法律页面内容；不要在本任务中新增复杂的 SEO/analytics 逻辑。

  **Recommended Agent Profile**:
  - Category: `deep` - Reason: 需要处理站点级配置、canonical 与品牌 source-of-truth，属于架构性配置锁定。
  - Skills: [] - 以 repo 配置事实为主，无需额外领域 skill。
  - Omitted: [`playwright`] - 本任务主要是配置与契约梳理，不依赖浏览器自动化完成实现。

  **Parallelization**: Can Parallel: YES | Wave 1 | Blocks: [3, 4, 5, 6, 8, 10] | Blocked By: []

  **References** (executor has NO interview context - be exhaustive):
  - Site metadata + footer data: `docusaurus.config.ts:5-164` - 现有 title、tagline、url、navbar、footer、customFields.footerData 全在这里。
  - Deployment host evidence: `README.md` production deployment section - 提到 `docs.qiubithub.com`；需与 config 对齐。
  - Footer implementation contract: `src/theme/Footer/index.tsx:141-258` - 读取 `themeConfig.footer` 与 `customFields.footerData`，必须保证数据结构兼容。
  - Footer visuals: `src/theme/Footer/styles.module.css:1-353` - footer 是现有唯一明确 swizzled theme override。

  **Acceptance Criteria** (agent-executable only):
  - [ ] `docusaurus.config.ts` 中 docs canonical host 与部署说明保持一致，并在代码注释或结构中清楚区分 docs host 与主站外链。
  - [ ] navbar、footer、title/tagline 的品牌主名称在 config 层只保留一套主表达，避免 docs shell 混用多个叫法。
  - [ ] `npm run build` 成功，且生成后的首页/文档页 metadata 不再出现 canonical host 冲突。
  - [ ] Footer 读取的数据字段在构建后可正常渲染，无 `undefined` 文案或断链。

  **QA Scenarios** (MANDATORY - task incomplete without these):
  ```
  Scenario: Canonical and brand config consistency
    Tool: Bash
    Steps: 1) 运行构建 2) 检查 build 输出中的 canonical/meta/导航文案 3) 核对首页与 docs 页面都使用同一品牌主名称
    Expected: 构建成功，canonical host 一致，导航与 footer 文案不再混乱
    Evidence: .sisyphus/evidence/task-2-config-lock.txt

  Scenario: Footer contract remains valid
    Tool: Playwright
    Steps: 1) 打开首页和 /docs/intro 2) 滚动到底部 3) 检查 footer 链接、联系信息、品牌文案是否完整可见
    Expected: 两个页面 footer 均正常渲染，无空白字段/布局断裂
    Evidence: .sisyphus/evidence/task-2-footer-contract.png
  ```

  **Commit**: YES | Message: `chore(site): lock canonical host and brand config` | Files: [`docusaurus.config.ts`, `README.md` or deployment docs if needed for alignment`]

- [ ] 3. 建立全站共享视觉 token 与 typography/surface baseline

  **What to do**: 先在 `src/css/custom.css` 中收敛一套统一的设计基线：主色/辅色/强调色、背景层级、surface、文本层级、标题字号阶梯、正文宽度、圆角、阴影、按钮与交互节奏。把“专业文档站 + 少量产品感”转成 token 级规则：docs 内容区更克制，首页和 CTA 可以更有表现力。此任务还应把现有过于散落的配色与视觉节奏整理成更稳定的变量命名方式，并为亮/暗主题分别设定边界。
  **Must NOT do**: 不要在这个任务里重排首页区块或重写 docs 内容；不要引入 Tailwind 或第三方 design system。

  **Recommended Agent Profile**:
  - Category: `visual-engineering` - Reason: 以视觉系统和 CSS token 体系为核心。
  - Skills: [`ui-ux-pro-max`] - 用于约束高级感、层级、色彩与克制感，而不是拍脑袋调样式。
  - Omitted: [`playwright`] - 浏览器验证是结果检查，不是此任务的核心设计输入。

  **Parallelization**: Can Parallel: NO | Wave 1 | Blocks: [5, 8] | Blocked By: [2]

  **References** (executor has NO interview context - be exhaustive):
  - Global tokens baseline: `src/css/custom.css:1-57` - 当前已有 `--ifm-*` 与 `--qiubi-*`，但体系还不够稳定。
  - Navbar/docs tokens usage: `src/css/custom.css:58-257` - 现有 navbar、menu、sidebar、markdown 视觉依赖这些 token。
  - Docs code/tabs style baseline: `src/css/custom.css:261-473` - tabs、代码块、copy button、暗色模式等都依赖共享视觉参数。
  - Homepage expressive layer: `src/pages/index.module.css:1-320` - 首页已经有更强视觉表达，新的 token 需要能向下支撑而不是冲突。
  - Footer expressive layer: `src/theme/Footer/styles.module.css:1-353` - footer 的视觉需与新的 shared baseline 可兼容。

  **Acceptance Criteria** (agent-executable only):
  - [ ] `src/css/custom.css` 中存在可识别的共享 token 分层（颜色、文字、surface、radius、shadow、spacing 至少部分明确）。
  - [ ] 首页、docs 页面、footer 在亮/暗模式下均可继承同一套基础视觉语言，而不是各自为政。
  - [ ] `npm run build` 成功，且 golden-page 截图中首页和 docs 的基础字体、按钮、surface、间距明显趋于统一。

  **QA Scenarios** (MANDATORY - task incomplete without these):
  ```
  Scenario: Shared token baseline applies to homepage and docs
    Tool: Playwright
    Steps: 1) 打开 / 与 /docs/intro 2) 分别截图亮色/暗色模式 3) 对比标题层级、正文色、按钮/标签 surface 是否属于同一套系统
    Expected: 首页更有表现力但不脱离 docs shell 语言；docs 内容区保持克制可读
    Evidence: .sisyphus/evidence/task-3-token-baseline.png

  Scenario: Build and typecheck after token refactor
    Tool: Bash
    Steps: 1) 运行 `npm run typecheck` 2) 运行 `npm run build`
    Expected: 两个命令均退出 0
    Evidence: .sisyphus/evidence/task-3-build.log
  ```

  **Commit**: YES | Message: `feat(theme): establish shared visual tokens` | Files: [`src/css/custom.css`]

- [ ] 4. 审计并替换脆弱的 Docusaurus 深层选择器

  **What to do**: 审查 `src/css/custom.css` 里所有依赖 Docusaurus 内部类名或 `[class*='...']` 的样式，优先替换成稳定的公共 class、CSS variables、局部 wrapper class 或主题支持的扩展点。目标是在 `future.v4: true` 的前提下降低升级风险，尤其是 docs sidebar、tabs、code block button group、markdown shell 这些地方。必要时增加局部 wrapper，而不是继续加深全局嵌套。
  **Must NOT do**: 不要新增 swizzle `DocPage`/`Navbar`/sidebar internals 来解决问题；不要把视觉改动和结构改动混在一起。

  **Recommended Agent Profile**:
  - Category: `deep` - Reason: 需要理解 Docusaurus 扩展边界与升级风险。
  - Skills: [] - 以 repo 内已有实现与 Docusaurus 稳定 seam 为主。
  - Omitted: [`ui-ux-pro-max`] - 核心目标是稳定性与 seam 选择，不是审美探索。

  **Parallelization**: Can Parallel: YES | Wave 1 | Blocks: [5, 6, 7] | Blocked By: [2]

  **References** (executor has NO interview context - be exhaustive):
  - Risky selectors example: `src/css/custom.css:178-205` - 深层 sidebar selector。
  - Risky selectors example: `src/css/custom.css:380-418` - code block button group 使用 `[class*='buttonGroup']` 和 copy button 内部类。
  - Risky selectors example: `src/css/custom.css:208-257` - `.theme-doc-markdown .tabs` 等全局 markdown 范围规则，需要判断是否可转为更稳定的约束。
  - Docusaurus future mode: `docusaurus.config.ts:38-40` - `future.v4: true` 强化了减少脆弱 selector 的必要性。

  **Acceptance Criteria** (agent-executable only):
  - [ ] `src/css/custom.css` 中高风险 `[class*='...']` 或多层内部 selector 数量减少，并有清晰替代方式。
  - [ ] 首页与 docs shell 样式未因 selector 收敛而回退破坏。
  - [ ] `npm run build` 与 golden-page QA 通过。

  **QA Scenarios** (MANDATORY - task incomplete without these):
  ```
  Scenario: Selector audit does not break docs chrome
    Tool: Playwright
    Steps: 1) 打开 /docs/claude-code 与 /docs/opencode 2) 检查 tabs、代码块复制按钮、sidebar 样式 3) 截图保留证据
    Expected: 关键 docs 交互样式仍正常，且实现不再高度依赖内部 class 名
    Evidence: .sisyphus/evidence/task-4-selector-audit.png

  Scenario: Regression check after selector cleanup
    Tool: Bash
    Steps: 1) 运行 `npm run build` 2) 运行 `npm run qa:golden-pages`
    Expected: 所有命令退出 0
    Evidence: .sisyphus/evidence/task-4-regression.log
  ```

  **Commit**: YES | Message: `refactor(theme): replace fragile shell selectors` | Files: [`src/css/custom.css`, optional stable wrapper classes in affected components`]

- [ ] 5. 统一 navbar、footer 与 docs shell 的产品语言

  **What to do**: 在不新增高风险 swizzle 的前提下，让 homepage、docs、footer 使用同一套 shell 语言。统一 navbar 的层级、CTA、品牌标识节奏和 docs 入口角色；让 footer 从“另一个风格区块”收敛为全站统一收口；同时规范 docs 主体容器、sidebar surface、内容阅读区、页头/页脚间的节奏，使 `/` 与 `/docs/*` 不再像两个产品。保持 `src/theme/Footer` 作为唯一结构 override 即可，其他优先通过 config + CSS + page/container class 完成。
  **Must NOT do**: 不要把 docs 阅读区改成大面积 marketing hero；不要 swizzle `Navbar` 或 `DocPage`；不要在此任务重写首页内容或 docs 正文。

  **Recommended Agent Profile**:
  - Category: `visual-engineering` - Reason: 这是全站 shell 一致性重构的核心任务。
  - Skills: [`ui-ux-pro-max`] - 用于确保 shell 更高级但不花哨，符合 docs-first 气质。
  - Omitted: [`playwright`] - 浏览器自动化用于验证，不是主要设计输入。

  **Parallelization**: Can Parallel: NO | Wave 2 | Blocks: [8, 9, 10] | Blocked By: [1, 2, 3, 4]

  **References** (executor has NO interview context - be exhaustive):
  - Navbar config: `docusaurus.config.ts:80-120` - 当前 navbar 混合首页锚点、docs 路由和控制台 CTA。
  - Footer config/data: `docusaurus.config.ts:9-35`, `docusaurus.config.ts:121-156` - footer 文案与链接源头。
  - Footer structure: `src/theme/Footer/index.tsx:141-258` - 唯一现有 theme override，需保留为主要结构 seam。
  - Footer visuals: `src/theme/Footer/styles.module.css:1-353` - 当前风格与首页/docs 有明显割裂，需要统一。
  - Navbar/docs shell visuals: `src/css/custom.css:58-205`, `src/css/custom.css:208-257` - navbar/menu/sidebar/markdown shell 的共享基础。
  - Homepage shell usage: `src/pages/index.tsx:352-605` - 首页当前包在 `Layout` 中，是 shell 对齐后的主要受益方。

  **Acceptance Criteria** (agent-executable only):
  - [ ] `/` 与 `/docs/intro` 共享同一套 navbar/footer/surface 语言，截图对比时不再有“两个产品”的割裂感。
  - [ ] footer 不再与 navbar/logo/主站风格冲突，品牌主标识和 CTA 语气一致。
  - [ ] docs 内容区保持克制阅读体验，没有被首页风格污染成大面积营销化界面。
  - [ ] `npm run build` 与 golden-page QA 全部通过。

  **QA Scenarios** (MANDATORY - task incomplete without these):
  ```
  Scenario: Unified shell across homepage and docs landing
    Tool: Playwright
    Steps: 1) 打开 / 与 /docs/intro 2) 分别截取首屏与 footer 区域 3) 比较 navbar、footer、surface、间距体系
    Expected: 两页明显属于同一个产品系统，footer 不再像独立品牌区块
    Evidence: .sisyphus/evidence/task-5-shell-unification.png

  Scenario: Docs shell remains docs-first
    Tool: Playwright
    Steps: 1) 打开 /docs/claude-code 2) 检查页头、sidebar、正文区的阅读性 3) 切换暗色模式再截图
    Expected: 阅读区克制清晰，无营销式全屏装饰抢夺正文注意力
    Evidence: .sisyphus/evidence/task-5-docs-shell-dark.png
  ```

  **Commit**: YES | Message: `feat(shell): unify navbar footer and docs chrome` | Files: [`docusaurus.config.ts`, `src/css/custom.css`, `src/theme/Footer/index.tsx`, `src/theme/Footer/styles.module.css`]

- [ ] 6. 对齐 docs landing、sidebar 信息架构与入口路径

  **What to do**: 明确 `/docs/intro` 是否作为唯一 docs landing，并让 navbar、sidebar、docs landing 内容与结构完全一致。修复 `sidebars.ts` 未纳入 `intro` 的问题，确保用户从 navbar 进入 docs 后看到的第一层级、侧边栏顺序、工具命名、入口层次都清楚一致。必要时重组 sidebar 标签、分组名与文档顺序，让 docs 成为真正的一套产品入口，而不是散列教程列表。
  **Must NOT do**: 不要在这一任务里全面重写所有文档正文；不要引入多套 landing path 或并行 docs 入口。

  **Recommended Agent Profile**:
  - Category: `deep` - Reason: 这是信息架构与导航契约层任务，不只是样式调整。
  - Skills: [] - 以站点结构和用户路径一致性为主。
  - Omitted: [`ui-ux-pro-max`] - 重点是 IA 一致性，不是视觉风格探索。

  **Parallelization**: Can Parallel: YES | Wave 2 | Blocks: [7, 8, 9] | Blocked By: [1, 2, 4]

  **References** (executor has NO interview context - be exhaustive):
  - Navbar docs entry: `docusaurus.config.ts:108-112` - 当前直接指向 `/docs/intro`。
  - Sidebar mismatch: `sidebars.ts:3-40` - 当前只列 `claude-code/openclaw/opencode/codex/gemini-cli`，没有 `intro`。
  - Intro page content: `docs/intro.md:1-41` - 当前较像 scaffold，需要升级成真正的 docs landing。
  - Homepage doc-overview card: `src/pages/index.tsx:147-184` - 首页已经把 `/docs/intro` 当总览入口使用，IA 需与之对齐。

  **Acceptance Criteria** (agent-executable only):
  - [ ] docs landing 路径在 navbar、sidebar、首页 docs 入口中保持一致。
  - [ ] 打开 `/docs/intro` 时，sidebar 中能明确看见其所属位置，不再游离于 docs 主导航之外。
  - [ ] 工具文档顺序与标签命名统一，不存在“页面名、sidebar 名、首页名”三套不同表达。
  - [ ] `npm run build` 通过，且无 broken links。

  **QA Scenarios** (MANDATORY - task incomplete without these):
  ```
  Scenario: Docs landing path and sidebar stay aligned
    Tool: Playwright
    Steps: 1) 从首页 navbar 进入文档 2) 检查当前路由与 sidebar 高亮项 3) 截图保留状态
    Expected: 用户进入 docs landing 后，能在 sidebar 看见清晰归属和下一步路径
    Evidence: .sisyphus/evidence/task-6-landing-sidebar.png

  Scenario: Build-time link integrity
    Tool: Bash
    Steps: 1) 运行 `npm run build`
    Expected: 构建成功，无链接错误
    Evidence: .sisyphus/evidence/task-6-build.log
  ```

  **Commit**: YES | Message: `feat(docs): align landing path and sidebar IA` | Files: [`sidebars.ts`, `docs/intro.md|mdx`, optionally `docusaurus.config.ts` if labels move`]

- [ ] 7. 为 priority docs 建立统一页面 archetype 与复用模式

  **What to do**: 为 `docs/claude-code.mdx`、`docs/codex.mdx`、`docs/gemini-cli.mdx`、`docs/openclaw.mdx`、`docs/opencode.md|mdx` 建立统一模板规范：页面开头说明、前置要求、安装步骤、配置步骤、验证、FAQ/排障、相关链接，以及 OS 差异展示规范。若存在重复的提示块、截图框、命令说明块，可创建极小型 MDX 组件/局部 helper，但仅限为 priority docs 服务，不升级成完整 design system。对 `opencode` 这类非标准结构页面，明确是否迁移为 MDX 以复用 Tabs 或帮助块。
  **Must NOT do**: 不要把所有 docs 页面都纳入模板迁移；不要构建大型组件库；不要在未锁定 IA 前先大规模改文案。

  **Recommended Agent Profile**:
  - Category: `writing` - Reason: 涉及文档信息结构和内容模式统一。
  - Skills: [] - 以文档结构标准化为主。
  - Omitted: [`ui-ux-pro-max`] - 核心是内容 archetype，而非额外视觉风格探索。

  **Parallelization**: Can Parallel: YES | Wave 2 | Blocks: [9] | Blocked By: [1, 2, 4, 6]

  **References** (executor has NO interview context - be exhaustive):
  - Tab-heavy canonical example: `docs/claude-code.mdx:1-335` - 已包含 Tabs、前置要求、安装、配置、验证流程。
  - Non-standard long page: `docs/opencode.md:1-183` - 目前用手写 Windows/MacOS/Linux 分段，结构与其他文档不一致。
  - Sidebar ordering and names: `sidebars.ts:3-40` - archetype 统一后需与导航命名一致。
  - Docs shell styling baseline: `src/css/custom.css:208-473` - 模板变更要配合 markdown/tabs/code block 视觉语言。

  **Acceptance Criteria** (agent-executable only):
  - [ ] 所有 priority docs 都遵守一套可识别的章节顺序或明确的例外规则。
  - [ ] `docs/opencode` 若继续保留特例，需在计划实现中写明原因；否则迁移到统一 archetype。
  - [ ] 关键文档中的 OS 差异表达方式一致（Tabs 或统一 callout 规则）。
  - [ ] golden-page QA 至少覆盖一个 tab-heavy 文档和一个原本非标准长文档。

  **QA Scenarios** (MANDATORY - task incomplete without these):
  ```
  Scenario: Priority docs share one recognizable structure
    Tool: Playwright
    Steps: 1) 打开 /docs/claude-code、/docs/opencode、/docs/codex 2) 截取页首与目录结构 3) 对比章节顺序与 CTA/排障区位置
    Expected: 三者结构趋于一致，用户学习成本下降
    Evidence: .sisyphus/evidence/task-7-doc-archetype.png

  Scenario: Tabs and long-page layout remain usable
    Tool: Playwright
    Steps: 1) 在 tab-heavy 文档切换平台标签 2) 在长文档滚动检查截图、代码块、FAQ 段落 3) 保存证据
    Expected: Tabs 可用、长文档节奏清晰、无布局断裂
    Evidence: .sisyphus/evidence/task-7-tabs-longpage.png
  ```

  **Commit**: YES | Message: `feat(docs): add canonical page archetype helpers` | Files: [`docs/claude-code.mdx`, `docs/codex.mdx`, `docs/gemini-cli.mdx`, `docs/openclaw.mdx`, `docs/opencode.md|mdx`, optional tiny MDX helpers`]

- [ ] 8. 按 docs-first 门户逻辑重写首页信息架构

  **What to do**: 基于已经统一的 shell、token 与 docs IA，重写 `src/pages/index.tsx` 的信息架构与文案节奏，让首页承担“快速识别产品 → 找到对应工具路径 → 进入正确文档”的门户职责。精简和重排现有 pricing/tools/setup/优势/contact 模块，减少平级信息堆叠，提高首屏辨识度与两屏内完成分流的效率。保留适量产品感（hero、CTA、关键信息卡片），但让首页最终服务于 docs，而不是与 docs 竞争注意力。
  **Must NOT do**: 不要再加更多营销区块；不要把首页做成偏官网化的大型展示页；不要在本任务里重复 footer/contact 数据源逻辑。

  **Recommended Agent Profile**:
  - Category: `visual-engineering` - Reason: 涉及首页结构、视觉层级与文案节奏的综合重排。
  - Skills: [`ui-ux-pro-max`] - 用于提升高级感、信息层级和首页转 docs 的路径设计。
  - Omitted: [`playwright`] - 浏览器工具用于验收而不是设计主导。

  **Parallelization**: Can Parallel: YES | Wave 3 | Blocks: [10] | Blocked By: [1, 2, 3, 5, 6]

  **References** (executor has NO interview context - be exhaustive):
  - Existing homepage data/content model: `src/pages/index.tsx:8-207` - heroChips、workflowSteps、pricingGroups、toolProfiles、guideCards、capabilityCards 等现有内容来源。
  - Existing homepage structure: `src/pages/index.tsx:347-605` - 当前 section 顺序、CTA、contact 区块、首页锚点全在此。
  - Homepage visual layer: `src/pages/index.module.css:1-1087` - 现有 hero、glassPanel、pricing/tool/contact 样式需要重构以服务新 IA。
  - Docs landing role: `docs/intro.md:1-41` - 首页必须把用户引向 docs landing 或目标文档，而非自成封闭信息岛。
  - Navbar anchors: `docusaurus.config.ts:87-107` - 如首页 section 顺序/命名变化，navbar 锚点需同步。

  **Acceptance Criteria** (agent-executable only):
  - [ ] 首页首屏在不滚动或少量滚动的情况下，能明确说明产品是什么、适合谁、用户下一步去哪。
  - [ ] 首页二屏内能让用户找到对应工具路径或 docs 总览入口。
  - [ ] 旧的内容堆叠感显著下降，section 顺序围绕“识别 → 分流 → 进入 docs → 获取支持”展开。
  - [ ] golden-page 截图显示首页与 docs shell 语言统一，且首页不再压过 docs 主体定位。

  **QA Scenarios** (MANDATORY - task incomplete without these):
  ```
  Scenario: Homepage routes users into docs-first flow
    Tool: Playwright
    Steps: 1) 打开首页 2) 检查首屏标题、副标题、CTA、工具路径是否清楚 3) 点击文档入口进入目标页面 4) 截图前后状态
    Expected: 用户可快速识别产品并进入正确 docs 路径，首页不是纯营销展示
    Evidence: .sisyphus/evidence/task-8-home-ia.png

  Scenario: Homepage remains readable on mobile
    Tool: Playwright
    Steps: 1) 使用移动端视口打开首页 2) 检查 hero、工具卡片、CTA、联系区 3) 保存截图
    Expected: 无横向滚动，首屏 CTA 清晰，信息层级未在移动端坍塌
    Evidence: .sisyphus/evidence/task-8-home-mobile.png
  ```

  **Commit**: YES | Message: `feat(home): rewrite homepage as docs-first portal` | Files: [`src/pages/index.tsx`, `src/pages/index.module.css`, optional `docusaurus.config.ts` anchor updates`]

- [ ] 9. 统一 priority docs 内容结构、截图规则与支持信息位置

  **What to do**: 在已建立 archetype 的基础上，对 priority docs 做实际内容归一：统一标题区风格、系统要求写法、安装/配置/验证/FAQ 位置、截图使用规则、支持/相关链接位置，以及“遇到问题怎么办”的表达。修复 `docs/intro.md` 的 scaffold 感，提升其为真正 docs landing；对 `docs/opencode` 等长页面减少随意段落组织，提升扫描性。仅对 priority docs 做 light-to-medium copy cleanup，使其在结构上像一套产品文档。
  **Must NOT do**: 不要重写所有产品说明细节；不要替换大量技术事实为未经验证的新说法；不要顺手扩展到非 priority docs。

  **Recommended Agent Profile**:
  - Category: `writing` - Reason: 主要是文档结构、文案节奏和信息一致性工作。
  - Skills: [] - 以内容规范与现有 docs 实际差异为主。
  - Omitted: [`ui-ux-pro-max`] - 视觉规则已在前置任务确定，此处聚焦内容一致性。

  **Parallelization**: Can Parallel: YES | Wave 3 | Blocks: [10] | Blocked By: [1, 2, 5, 6, 7]

  **References** (executor has NO interview context - be exhaustive):
  - Docs landing current state: `docs/intro.md:1-41` - 当前内容太薄、过于模板化。
  - Representative canonical guide: `docs/claude-code.mdx:1-335` - 已有较完整的结构，可抽象成标准。
  - Divergent long guide: `docs/opencode.md:1-183` - 需要提升扫描性与一致性。
  - Sidebar order: `sidebars.ts:3-40` - priority docs 的命名与排序要与侧边栏保持一致。
  - Footer/contact source-of-truth: `docusaurus.config.ts:9-35` - 支持信息位置应与站点统一数据源一致。

  **Acceptance Criteria** (agent-executable only):
  - [ ] `docs/intro` 成为真正的 docs landing，而非默认模板式欢迎页。
  - [ ] 所有 priority docs 的支持信息、相关链接、FAQ/排障位置保持一致或有明确例外说明。
  - [ ] 至少一个 tab-heavy 页面和一个 screenshot-heavy 页面在扫描性上明显改善。
  - [ ] golden-page QA 通过，且截图证据中 priority docs 的页面节奏趋于统一。

  **QA Scenarios** (MANDATORY - task incomplete without these):
  ```
  Scenario: Priority docs normalized for scanning
    Tool: Playwright
    Steps: 1) 打开 /docs/intro、/docs/claude-code、/docs/opencode 2) 截取页首、安装区、验证区、FAQ/链接区 3) 对比结构位置
    Expected: 文档结构一致性明显提升，intro 不再像默认欢迎页
    Evidence: .sisyphus/evidence/task-9-doc-content-normalization.png

  Scenario: Build and golden-page regression after docs rewrite
    Tool: Bash
    Steps: 1) 运行 `npm run build` 2) 运行 `npm run qa:golden-pages`
    Expected: 所有命令退出 0
    Evidence: .sisyphus/evidence/task-9-regression.log
  ```

  **Commit**: YES | Message: `docs(site): normalize priority product guides` | Files: [`docs/intro.md|mdx`, `docs/claude-code.mdx`, `docs/codex.mdx`, `docs/gemini-cli.mdx`, `docs/openclaw.mdx`, `docs/opencode.md|mdx`]

- [ ] 10. 清理 scaffold residue、规范静态资源与完成最终 metadata/polish

  **What to do**: 清理或明确排除 Docusaurus scaffolding 残留（如 `src/components/HomepageFeatures`、`src/pages/markdown-page.md`、`docs/tutorial-basics/**`、`docs/tutorial-extras/**`），防止污染搜索、导航和维护心智。同步规范 priority docs 使用的截图/静态资源目录与命名策略，至少避免继续扩大时间戳散乱文件。最后完成 canonical/deployment metadata 的收口，并确保 golden-page 路径、构建输出、导航与清理后的文件系统状态一致。
  **Must NOT do**: 不要把整个 `static/img` 做成大型资产重构项目；不要删除仍被真实页面引用的资源；不要在没有验证的情况下清除可能仍在 sidebar 或链接中可达的文档。

  **Recommended Agent Profile**:
  - Category: `unspecified-high` - Reason: 需要跨文件清理、引用核对、metadata 收尾与回归验证。
  - Skills: [] - 以 repo hygiene 与最终一致性为主。
  - Omitted: [`ui-ux-pro-max`] - 此任务不是视觉探索，而是清理与收口。

  **Parallelization**: Can Parallel: NO | Wave 3 | Blocks: [Final Verification] | Blocked By: [1, 2, 5, 8, 9]

  **References** (executor has NO interview context - be exhaustive):
  - Scaffold component: `src/components/HomepageFeatures/index.tsx:1-71` - 明显是 Docusaurus starter residue。
  - Scaffold page: `src/pages/markdown-page.md:1-7` - 默认示例页，应移除或排除。
  - Tutorial residue paths: `docs/tutorial-basics/**`, `docs/tutorial-extras/**` - 来自默认模板，需要确认是否仍可达。
  - Canonical host config: `docusaurus.config.ts:42-43` - 最终需与部署说明对齐。
  - Footer/home/docs priority routes: `docusaurus.config.ts:80-156`, `sidebars.ts:3-40` - 清理后需确保导航完整。

  **Acceptance Criteria** (agent-executable only):
  - [ ] 不再有默认 scaffold 页面或教程残留从主导航、priority docs 流程或构建产物中可见。
  - [ ] priority docs 的新增/保留截图资源遵守统一目录/命名策略，至少不继续扩大无序状态。
  - [ ] `npm run build`、`npm run typecheck`、`npm run qa:golden-pages` 全部通过。
  - [ ] 最终首页、docs landing、priority docs、footer 均符合锁定的 canonical host 与品牌规则。

  **QA Scenarios** (MANDATORY - task incomplete without these):
  ```
  Scenario: Scaffold residue no longer leaks into site UX
    Tool: Playwright
    Steps: 1) 打开首页和 /docs/intro 2) 浏览 navbar、sidebar、footer 链接 3) 确认不存在默认教程/示例页入口
    Expected: 站点主流程中不再出现默认 Docusaurus 示例内容
    Evidence: .sisyphus/evidence/task-10-scaffold-cleanup.png

  Scenario: Final regression commands all pass
    Tool: Bash
    Steps: 1) 运行 `npm run typecheck` 2) 运行 `npm run build` 3) 运行 `npm run qa:golden-pages`
    Expected: 三个命令均退出 0
    Evidence: .sisyphus/evidence/task-10-final-regression.log
  ```

  **Commit**: YES | Message: `chore(site): remove scaffold residue and finalize metadata` | Files: [`src/components/HomepageFeatures/**`, `src/pages/markdown-page.md`, `docs/tutorial-basics/**`, `docs/tutorial-extras/**`, `static/img/** as needed`, metadata/config files`]
## Final Verification Wave (MANDATORY — after ALL implementation tasks)
> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.
> **Do NOT auto-proceed after verification. Wait for user's explicit approval before marking work complete.**
> **Never mark F1-F4 as checked before getting user's okay.** Rejection or user feedback -> fix -> re-run -> present again -> wait for okay.
- [ ] F1. Plan Compliance Audit — oracle
- [ ] F2. Code Quality Review — unspecified-high
- [ ] F3. Real Manual QA — unspecified-high (+ playwright if UI)
- [ ] F4. Scope Fidelity Check — deep

## Commit Strategy
- Commit after every task once its acceptance criteria pass.
- Use the following commit sequence unless execution uncovers a dependency that requires splitting a task more finely:
  1. `test(ui): add golden-page redesign contracts`
  2. `chore(site): lock canonical host and brand config`
  3. `feat(theme): establish shared visual tokens`
  4. `refactor(theme): replace fragile shell selectors`
  5. `feat(shell): unify navbar footer and docs chrome`
  6. `feat(docs): align landing path and sidebar IA`
  7. `feat(docs): add canonical page archetype helpers`
  8. `feat(home): rewrite homepage as docs-first portal`
  9. `docs(site): normalize priority product guides`
  10. `chore(site): remove scaffold residue and finalize metadata`

## Success Criteria
- A first-time visitor can tell within one screen what the product is, which tool path they need, and where the docs begin.
- A docs reader experiences the same brand/system language on homepage, docs landing, and priority tool guides.
- Priority docs share one predictable page structure and one consistent OS/platform pattern.
- The site remains easy to maintain inside normal Docusaurus seams without expanding swizzle debt.
- Verification is repeatable via scripts and saved evidence rather than subjective taste checks.
