---
sidebar_position: 6
---

# OpenAI SDK 配置

OpenAI SDK 是最通用的 AI 客户端，支持 Python、Node.js 等多种语言。本教程介绍如何使用 OpenAI SDK 连接 QiubiHub。

## Python SDK

### 安装

```bash
pip install openai
```

### 基础配置

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://api.qiubithub.com/v1",
    api_key="your-api-key-here"
)

# 发送请求
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "user", "content": "你好，请介绍一下自己"}
    ]
)

print(response.choices[0].message.content)
```

### 流式响应

```python
stream = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "讲一个故事"}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content is not None:
        print(chunk.choices[0].delta.content, end="")
```

### 使用其他模型

```python
# Claude
response = client.chat.completions.create(
    model="claude-3-5-sonnet",
    messages=[{"role": "user", "content": "Hello"}]
)

# Gemini
response = client.chat.completions.create(
    model="gemini-2.0-flash",
    messages=[{"role": "user", "content": "Hello"}]
)
```

### 高级功能

```python
# 函数调用
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "北京天气如何？"}],
    tools=[{
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "获取天气",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {"type": "string"}
                }
            }
        }
    }]
)
```

## Node.js SDK

### 安装

```bash
npm install openai
```

### 基础配置

```javascript
import OpenAI from openai;

const client = new OpenAI({
  baseURL: https://api.qiubithub.com/v1,
  apiKey: your-api-key-here
});

async function main() {
  const response = await client.chat.completions.create({
    model: gpt-4o,
    messages: [{ role: user, content: Hello! }]
  });
  
  console.log(response.choices[0].message.content);
}

main();
```

### 流式响应

```javascript
const stream = await client.chat.completions.create({
  model: gpt-4o,
  messages: [{ role: user, content: 讲个故事 }],
  stream: true
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || );
}
```

## 环境变量配置

推荐将配置放在环境变量中：

**.env 文件:**
```
OPENAI_BASE_URL=https://api.qiubithub.com/v1
OPENAI_API_KEY=your-api-key-here
```

**Python:**
```python
from openai import OpenAI
import os

client = OpenAI()  # 自动读取环境变量
```

**Node.js:**
```javascript
import OpenAI from openai;

const client = new OpenAI();  // 自动读取环境变量
```

## 错误处理

```python
from openai import OpenAI, APIError, RateLimitError

client = OpenAI(
    base_url="https://api.qiubithub.com/v1",
    api_key="your-api-key"
)

try:
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": "Hello"}]
    )
except RateLimitError:
    print("请求过于频繁，请稍后重试")
except APIError as e:
    print(f"API 错误: {e}")
except Exception as e:
    print(f"其他错误: {e}")
```

## 更多资源

- [OpenAI Python SDK 文档](https://github.com/openai/openai-python)
- [OpenAI Node.js SDK 文档](https://github.com/openai/openai-node)
- [API 参考](https://platform.openai.com/docs/api-reference)
