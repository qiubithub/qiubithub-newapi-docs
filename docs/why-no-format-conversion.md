---
sidebar_position: 1
---

# 为什么不做 API 格式转换？

很多用户问：为什么 QiubiHub 不像某些平台那样提供 API 格式转换功能？比如把 OpenAI 格式转为 Claude 格式？

## 我们的理念

### 1. 保持原生体验

每个模型都有独特的能力和特性：
- **Claude** 擅长长文档分析和代码审查
- **GPT-4o** 多模态能力强，支持图像理解
- **Gemini** 支持超长上下文（100万 tokens）

格式转换会丢失这些特性，让用户无法享受模型的完整能力。

### 2. 避免兼容性问题

格式转换可能带来：
- 功能丢失（如工具调用、多模态）
- 响应不一致
- 难以调试的错误
- 版本更新不同步

### 3. 标准化更简单

与其维护复杂的转换层，不如：
- 推荐使用支持多模型的客户端
- 提供详细的配置文档
- 让用户直接使用原生 API

## 推荐的解决方案

### 使用多模型客户端

许多现代客户端原生支持多个模型提供商：

| 客户端 | 支持模型 |
|--------|---------|
| Claude Code | Claude, OpenAI, Gemini |
| Continue | 所有主流模型 |
| Cursor | 内置多模型支持 |
| OpenCode | 可配置任意端点 |

### 代码层面的适配

如果你需要在代码中切换模型：

```python
import openai

# OpenAI
client = openai.OpenAI(
    base_url="https://api.qiubithub.com/v1",
    api_key="your-key"
)

# Claude (使用 OpenAI SDK 兼容模式)
client = openai.OpenAI(
    base_url="https://api.qiubithub.com/v1",
    api_key="your-key"
)

# 只需修改 model 参数
response = client.chat.completions.create(
    model="claude-3-5-sonnet",  # 或 gpt-4o, gemini-pro
    messages=[{"role": "user", "content": "Hello"}]
)
```

## 我们会提供什么

虽然不做格式转换，但我们提供：

1. **统一的端点**: 一个 API 地址访问所有模型
2. **详细文档**: 每个客户端的配置指南
3. **技术支持**: 帮助你选择和使用合适的工具
4. **示例代码**: 各种语言和框架的集成示例

## 总结

与其隐藏复杂性，我们选择让复杂性可见。这样你能：
- 充分利用每个模型的优势
- 避免转换带来的问题
- 更容易调试和优化
- 跟上模型更新的步伐

我们相信，这是更好的长期方案。
