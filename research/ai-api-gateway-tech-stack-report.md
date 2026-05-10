# AI API 中转站技术栈调研报告

调研日期：2026-05-07
决策更新：2026-05-09
用途：为 `https://www.qiubithub.com/` 首页、文档站、控制台分层改造提供参考。

## 结论摘要

好看的 AI API 中转站通常不是靠 New API 默认前台撑门面，而是把页面分成三层：

| 层级 | 常见技术 | 作用 |
| --- | --- | --- |
| 官网/落地页 | Next.js + React + Tailwind、Vite + React + Tailwind、Framer | 做品牌、转化、价格、卖点、视觉质感 |
| 文档站 | VitePress、Docusaurus、Mintlify、Nextra | 做接入教程、部署步骤、FAQ、SEO 长尾内容 |
| 控制台/API 后台 | New API、New API fork、自研 React 控制台、Ant Design/Semi UI | 做注册、充值、Key、渠道、用量、账单 |

核心判断：`New API` 适合做 API 聚合后台，不适合直接承担官网审美。要把 `qiubithub.com` 做大，前台应拆成独立官网和独立文档：官网采用 `Next.js + Tailwind`，文档采用 `VitePress`，后台继续使用 New API。

## 竞品技术栈表

| 网站 | 页面/模块 | 技术栈判断 | New API 使用情况 | 证据/指纹 | 对 qiubithub 的参考价值 |
| --- | --- | --- | --- | --- | --- |
| Qiubithub | `www.qiubithub.com` 目标官网 | Next.js + React + Tailwind | 后台继续使用 New API | 本仓库迁移为 `apps/www` 官网和 `apps/docs` 文档 | 官网负责品牌和转化，不再用 Docusaurus 扛门面 |
| DuckCoding | `duckcoding.com` 主站/控制台入口 | New API 前端，React/Vite + Semi UI | 明确使用 | 源码有 `meta name="generator" content="new-api"`，加载 `semi-ui` 资源 | 说明 New API 可以改得不那么丑，但门面能力有限 |
| IKunCode | `www.ikun.codes/#pricing` 官网 | Vite + React + Tailwind utility classes + lucide 图标 | 官网本身不是 New API | 源码有 `/assets/index-*.js/css`，大量 `bg-*`、`rounded-*`、`text-*` 类名 | 很适合参考：单独做官网门面，色彩、价格表、转化按钮都明确 |
| IKunCode | `api.ikuncode.cc` 控制台 | New API，React/Vite + Semi UI | 明确使用 | 源码有 `meta name="generator" content="new-api"`，加载 `semi-ui` | 正确分层：漂亮官网负责获客，New API 负责后台 |
| IKunCode | `docs.ikuncode.cc` 文档 | VitePress 1.6.4 | 未使用 New API | 源码有 `meta name="generator" content="VitePress v1.6.4"` | 文档导航轻，适合作为 Qiubithub 文档层参考 |
| OpenRouter | `openrouter.ai` 官网/产品站 | Next.js + React + Tailwind/shadcn 风格组件 | 未见 New API | 源码有 `/_next/static/`、`self.__next_f`、Tailwind 类名 | 国际成熟产品参考：密度高、产品数据强、不是花哨营销页 |
| Vercel AI Gateway | `vercel.com/ai-gateway` 营销页 | Next.js/Turbopack + Vercel 自家设计系统 | 未使用 New API | 源码有 `/vc-ap-vercel-marketing/_next/static/`、`turbopack` | 适合参考留白、网格、技术可信感，不适合照搬黑白极简 |
| Portkey | `portkey.ai` 官网 | Framer | 未使用 New API | 源码注释 `Made in Framer`，`meta name="generator" content="Framer ..."` | 适合参考高级营销页动效和结构，但工程可控性不如代码站 |
| LiteLLM | `litellm.ai` 官网 | Framer | 未使用 New API | 源码注释 `Made in Framer`，加载 `framerusercontent.com` | 说明开源基础设施也常用 Framer 做门面 |
| QuickRouter | `quickrouter.ai` 官网 | Next.js + React + Tailwind，Turbopack 构建 | 官网未使用 New API | 源码有 `/_next/static/`、`next-size-adjust`、大量 Tailwind 类名 | 国内中转站里比较典型：深色紫底 + 金色 CTA，转化导向强 |
| QuickRouter | `api.quickrouter.ai/console` 控制台 | Vite + React + Semi UI 迹象 | New API 未确认，可能是自研/深度改造/fork | 源码无 `new-api` generator，但 JS 中有 Semi UI 变量和控制台业务模块 | 可参考“官网和后台拆开”，但不能直接认定它是 New API |
| AIHubMix | `aihubmix.com` 官网/控制台 SPA | React SPA + Ant Design/Ant Design Pro | 未见 New API | 源码有 `react-*.js`、`antd-core`、`.ant-pro-layout` | 适合参考企业感后台，但官网视觉不如 IKunCode/QuickRouter 鲜明 |
| CodeProxy | `codeproxy.net` 当前页面 | 更像 OpenGist/代码片段站，非同类 AI API 中转官网 | 未见 New API | 源码资源含 `opengist` 图标和普通静态 assets | 不建议作为中转站审美或技术参考 |

## 主流技术栈归纳

| 用途 | 国内/中转站常见选择 | 国际产品常见选择 | 适合 qiubithub 吗 |
| --- | --- | --- | --- |
| 快速做漂亮官网 | Vite + React + Tailwind、Next.js + Tailwind | Next.js + Tailwind/shadcn、Framer | 采用 Next.js + Tailwind |
| 快速做文档 | VitePress、Docusaurus | Mintlify、Nextra、Docusaurus | 采用 VitePress |
| 控制台/API 管理 | New API、VoAPI、自研 React 后台 | 自研后台居多 | 如果业务后台是 New API，就让它做后台，不要让它做品牌首页 |
| 低成本高颜值营销页 | Framer | Framer/Webflow | 可参考视觉，不建议作为主工程栈 |

## 对 qiubithub 的建议

| 优先级 | 建议 | 原因 |
| --- | --- | --- |
| P0 | 官网改为 Next.js + Tailwind | 更适合品牌首页、价格区、CTA、SEO 和长期扩展 |
| P0 | 文档改为 VitePress | 更接近 `docs.ikuncode.cc` 的轻文档体验 |
| P0 | 色彩参考 IKunCode/QuickRouter，但避免一味深紫金色 | 深色+高亮 CTA 有转化感，但 Qiubithub 需要更稳、更开发者工具化 |
| P1 | 控制台和文档分开表达 | New API 后台负责注册、Key、充值；VitePress 负责接入教程 |
| P1 | 单仓库 apps 结构管理前台 | `apps/www` 和 `apps/docs` 分层清楚，部署产物也清楚 |
| P2 | 后续再考虑抽 shared 包 | 只有出现真实复用需求时再抽，不提前增加复杂度 |

## 推荐的 qiubithub 目标结构

| 域名/路径 | 建议定位 | 技术选择 |
| --- | --- | --- |
| `www.qiubithub.com` | 品牌官网 + 文档入口 + 核心接入路径 | Next.js + Tailwind |
| `docs.qiubithub.com` | CLI/API 接入教程、FAQ、故障处理 | VitePress |
| `api.qiubithub.com` 或现有控制台域名 | 注册、充值、Key、用量、模型列表 | New API 或现有后台 |
| `status.qiubithub.com` | 状态页 | 独立状态页服务或静态状态页 |

## 视觉方向记录

从竞品看，漂亮页面的共性不是“用了哪个框架”，而是：

| 维度 | 好看的竞品做法 | qiubithub 当前应避免 |
| --- | --- | --- |
| 颜色 | 背景干净，主色明确，CTA 颜色有记忆点 | 灰、黄、闷、脏、层次不清 |
| 首屏 | 大标题直接说产品价值，接入按钮明显 | “文档总览”“正确路线”这类抽象话术 |
| 信息层级 | 官网讲转化，文档讲步骤，控制台讲操作 | 把所有内容混在一个文档首页 |
| 可信感 | 状态、价格、模型、Base URL、代码片段直接露出 | 只讲概念，不给用户立刻行动的入口 |
| 技术气质 | 代码块、模型标签、价格表、状态 badge | 纯文字堆叠、过度卡片化 |

## 首页表达调整建议（2026-05-09）

用户不应该在首屏先理解 `/v1`。从 IKunCode、I Code Easy、QuickRouter、QCode、Router One、OpenRouter 这类页面看，主流表达顺序是：

| 顺序 | 首页应该讲什么 | 不应该怎么讲 |
| --- | --- | --- |
| 1 | 国内直连、常用 AI 编程工具可用 | 先解释协议路径、Base URL 细则 |
| 2 | Claude Code / Codex / Gemini CLI / OpenCode 支持情况 | 把用户引到“文档总览”再自己判断 |
| 3 | 价格倍率、余额、调用记录、按量计费 | 把 `/v1` 当成核心卖点反复强调 |
| 4 | 注册、创建 Key、按工具复制配置、启动验证 | 长篇解释为什么不同工具路径不同 |
| 5 | 状态、客服、FAQ、故障处理 | 把排障文案放进首屏打断转化 |

对 Qiubithub 首页的具体要求：

- 首屏主文案聚焦“AI 编程工具国内稳定可用”和“一个账号接入常用工具”。
- `/v1` 不放官网首页；只保留在 Codex / OpenAI 兼容工具的具体教程里。
- FAQ 可以说“不同工具地址差异已放在配置表和教程里”，不要在 FAQ 再重复一遍 `/v1`、`/gemini_cli`、插件认证。
- 视觉上继续保持黑白主色，价格、状态、工具支持才是转化重点；不要为了讲路径把首屏做成接口说明页。

### 最新抽样判断（2026-05-09）

| 来源 | 看到的主流表达 | 对 Qiubithub 的结论 |
| --- | --- | --- |
| DuckCoding 文档站 | 首屏先讲 Claude Code / CodeX / Gemini CLI、按量计费、价格倍率、缓存计费 | Qiubithub 首页也应该先讲工具和价格，不要先讲 `/v1` |
| Right Code 文档站 | 用“统一接入 Claude Code、Codex、Gemini CLI”等价值表达开场 | “统一接入常用 AI 编程工具”比“Base URL 规则”更适合首页 |
| ProxyCC 导航 | 按 Claude Code / Codex / Gemini CLI API 聚合来组织中转站 | 用户先按工具找服务，路径规则是二级信息 |
| OpenRouter Claude Code 文档 | Base URL 只出现在具体集成教程里 | `/v1` 这类路径细节应该放在配置表和工具文档，不占首屏主叙事 |

2026-05-09 页面执行结论：官网首页删除大面积 Base URL 表格，改为“开通额度 → 选择工具 → 复制配置”的新用户入口。具体地址、环境变量、插件登录命令全部回收到对应工具文档。

## 证据说明

本报告基于页面源码和公开资源指纹判断，主要证据包括：

| 站点 | 核心证据 |
| --- | --- |
| DuckCoding | `meta name="generator" content="new-api"`、`semi-ui` 静态资源 |
| IKunCode 官网 | Vite assets、Tailwind utility classes、lucide 图标 |
| IKunCode 控制台 | `meta name="generator" content="new-api"`、`semi-ui` 静态资源 |
| IKunCode 文档 | `meta name="generator" content="VitePress v1.6.4"` |
| OpenRouter | `/_next/static/`、`self.__next_f`、Tailwind/shadcn 风格类名 |
| Vercel AI Gateway | `/vc-ap-vercel-marketing/_next/static/`、`turbopack` |
| Portkey | `Made in Framer`、`meta name="generator" content="Framer ..."` |
| LiteLLM | `Made in Framer`、`framerusercontent.com` |
| QuickRouter 官网 | `/_next/static/`、`next-size-adjust`、Tailwind 类名 |
| AIHubMix | React SPA assets、`antd-core`、`.ant-pro-layout` |

## 后续补充模板

新增竞品时按这张表补，不要只写“好看/不好看”：

| 网站 | 页面/模块 | 技术栈判断 | New API 使用情况 | 证据/指纹 | 可借鉴点 | 不适合照搬的点 |
| --- | --- | --- | --- | --- | --- | --- |
| 待补充 | 官网/文档/控制台 | 待确认 | 待确认 | 源码关键字、资源路径、meta generator | 色彩、布局、转化路径 | 维护成本、品牌不匹配、技术风险 |
