---
title: 快速开始
description: 选择正在使用的 AI 编程工具，获取 API Key，并进入对应安装配置教程。
---

# 快速开始

丘比特API 为 Claude Code、Codex、Gemini CLI、OpenClaw、OpenCode 提供 API 服务。你只需要先拿到 API Key，再按自己正在使用的工具打开对应教程配置。

## 支持工具

当前文档优先覆盖以下五种工具：

- **Claude Code**：适合长上下文、多文件改动和复杂 Agent 工作流
- **Codex**：适合高频编码、补全和偏 OpenAI 的快速试错场景
- **Gemini CLI**：适合大上下文检索、分析和长文档理解
- **OpenClaw**：偏 Agent / Gateway 形态，适合更完整的工具调用流程
- **OpenCode**：多模型客户端，按你最终所选模型归到对应分组

## 使用步骤

### 1. 在控制台创建 API Key

控制台负责注册登录、充值、创建 API Key、查看用量和账单。

控制台入口： [QiubitHub 控制台](https://www.qiubithub.com/console)

创建 Key 时注意选择对应工具的分组，例如 Claude Code、Codex、Gemini CLI 各有推荐分组。

### 2. 打开对应工具教程

如果你已经明确自己在用哪个工具，直接进入对应文档。每份工具文档都已经按平台拆分安装、配置和验证步骤：

- [Claude Code](/claude-code)
- [Codex](/codex)
- [Gemini CLI](/gemini-cli)
- [OpenClaw](/openclaw)
- [OpenCode](/opencode)

### 3. 替换配置里的 API Key 并启动

复制教程里的配置命令，把 `在这里替换成你的_API_KEY` 改成你自己的 Key，然后启动对应 CLI 测试一次。如果能正常回复，并且控制台出现调用记录，就说明配置成功。

## 支持模型

QiubitHub 当前支持多种主流模型供应商和兼容方式，包括：

- **OpenAI 系**：GPT 系列、Codex 等兼容模型
- **Anthropic 系**：Claude 系列模型
- **Google 系**：Gemini 系列模型
- **其他兼容模型**：会持续扩展

具体使用哪一类模型，最终以你所选工具、分组和配置方式为准。

## 获取帮助

如果你还没开始安装，但不确定该选哪个文档：

1. 先确认自己正在使用的工具名称，例如 Claude Code、Codex 或 Gemini CLI
2. 如果仍然拿不准，告诉我们工具名称和目标模型，我们可以直接帮你判断

## 相关链接

- [官网](https://www.qiubithub.com)
- [QiubitHub 控制台](https://www.qiubithub.com/console)
- [Claude Code 文档](/claude-code)
- [Codex 文档](/codex)
- [Gemini CLI 文档](/gemini-cli)
- [OpenClaw 文档](/openclaw)
- [OpenCode 文档](/opencode)
