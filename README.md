# QiubitHub Frontend

QiubitHub 前台现在拆成三层：

- `apps/www`：官网落地页，Next.js + Tailwind，负责品牌首页、价格、支持工具、FAQ 和控制台入口；线上由 New API 通过 `https://www.qiubithub.com/__landing` 嵌入，`www.qiubithub.com/` 本身默认进入 New API。
- `apps/docs`：文档，VitePress，负责 Claude Code、Codex、Gemini CLI、OpenClaw、OpenCode 的接入教程。
- New API 后台：不在本仓库内，继续负责注册、充值、API Key、渠道、用量和账单。

## 本地开发

安装依赖：

```bash
npm ci
```

启动官网：

```bash
npm run dev:www
```

启动文档：

```bash
npm run dev:docs
```

默认地址：

- 官网：`http://127.0.0.1:3000`
- 文档：`http://127.0.0.1:5173`

## 构建

构建全部前台：

```bash
npm run build
```

单独构建：

```bash
npm run build:www
npm run build:docs
```

产物路径：

- 官网：`apps/www/out`
- 文档：`apps/docs/docs/.vitepress/dist`

## 验证

类型检查：

```bash
npm run typecheck
```

Playwright 基础视觉回归需要先启动两个预览服务：

```bash
npm run preview:www
npm run preview:docs
```

然后执行：

```bash
npm run qa:visual
```

## 内容维护

文档内容在 `apps/docs/docs`，图片资源在 `apps/docs/docs/public/img`。

官网首页在 `apps/www/app/page.tsx`，全局样式在 `apps/www/app/globals.css`。
