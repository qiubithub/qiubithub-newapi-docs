# QiubiHub Docs

QiubiHub Docs 是一个基于 Docusaurus 构建的开发者文档站，面向 Claude Code、Codex、Gemini CLI、OpenClaw、OpenCode 等 AI CLI 工具的接入与使用说明。

当前站点的目标不是通用官网，而是一个 **docs-first 的接入门户**：

- 首页先帮助用户判断应该走哪条文档路线
- `/docs/intro` 作为文档总览入口
- 核心工具文档分别覆盖不同工具的安装、配置、验证与排障

## 本地开发

安装依赖：

```bash
npm ci
```

启动开发环境：

```bash
npm start
```

## 构建与本地预览

生成静态产物：

```bash
npm run build
```

本地预览构建结果：

```bash
npm run serve
```

## 文档 QA

安装 Playwright 浏览器依赖：

```bash
npm run qa:golden-pages:install
```

查看当前 golden-page 用例：

```bash
npm run qa:golden-pages:list
```

执行完整 golden-page 回归：

```bash
npm run qa:golden-pages
```

## 部署说明

当前生产部署域名为：

- `https://docs.qiubithub.com`

详细部署流程见：

- [`DEPLOY_CF_SERVER.md`](./DEPLOY_CF_SERVER.md)

## 当前优先文档

- `docs/intro.md`
- `docs/claude-code.mdx`
- `docs/codex.mdx`
- `docs/gemini-cli.mdx`
- `docs/openclaw.mdx`
- `docs/opencode.mdx`

这些页面构成当前 docs-first 产品流的主要入口和核心内容。

## 静态资源约定

- 站点级资源放在 `static/img/` 根目录，例如 `logo.svg`、`favicon.ico`、社交分享图。
- priority docs 的截图按工具归档到 `static/img/<tool>/`，例如 `static/img/claude-code/`、`static/img/opencode/`。
- 新增截图请优先放到对应工具目录，避免继续把时间戳文件直接散落在 `static/img/` 根目录。
