---
sidebar_position: 4
---

# Codex

通过环境变量的方式在电脑上安装和配置 Codex CLI（命令行工具）。

:::info
如果遇到问题，可以将本页全部内容和问题截图，复制给[豆包](https://www.doubao.com/chat/)或者[deepseek](https://chat.deepseek.com/)等AI，按照他的提示执行对应命令即可

如果 AI 也无法解决，可以联系我们的工程师，为您提供技术上的支持与帮助
:::

## Windows

### 1. 安装 Node.js

前往 [Node.js 官网](https://nodejs.org/en/download) 下载并安装 LTS 版本（如果已经安装可以跳过）。

验证安装：

```bash
node --version
```

如果出现下面的提示就说明 node 已经安装成功了

![Node.js安装成功](/img/codex/codex-01-node-success.png)

:::warning
需要注意的是，Nodejs 的版本必须为 18+
如果低于这个版本，可以问一下 AI 如何升级 Nodejs 版本，让 AI 先给您命令收集系统信息，之后它就会提供最快最准确的指导
:::

### 2. 安装 Codex CLI

打开 **PowerShell** 并执行：

```bash
npm install -g @openai/codex
```

![安装Codex CLI](/img/codex/codex-02-npm-install.png)

### 3. 创建配置文件

先复制下面的命令到本地，将其中的 `在这里替换成你的_API_KEY` 改成你自己的 API Key，然后再执行即可

```json
# 目标目录
$dir = Join-Path $env:USERPROFILE ".codex"

# 创建目录（存在不报错）
New-Item -ItemType Directory -Path $dir -Force | Out-Null

# 写 auth.json（UTF-8 无 BOM，覆盖）
$auth = @'
{
"OPENAI_API_KEY": "在这里替换成你的_API_KEY"
}
'@
[System.IO.File]::WriteAllText(
  (Join-Path $dir "auth.json"),
  $auth,
  (New-Object System.Text.UTF8Encoding($false))
)

# 写 config.toml（UTF-8 无 BOM，覆盖）
$config = @'
model_provider = "aicodewith"
model = "gpt-5.2-codex"
model_reasoning_effort = "high"
disable_response_storage = true
preferred_auth_method = "apikey"
requires_openai_auth = true

enableRouteSelection = true

[model_providers.aicodewith]
name = "aicodewith"
base_url = "https://api.aicodewith.com/chatgpt/v1"
wire_api = "responses"
'@
[System.IO.File]::WriteAllText(
  (Join-Path $dir "config.toml"),
  $config,
  (New-Object System.Text.UTF8Encoding($false))
)
```

验证是否设置成功：

```bash
Get-Content "$env:USERPROFILE\.codex\auth.json"
Get-Content "$env:USERPROFILE\.codex\config.toml"
```

![验证配置](/img/codex/codex-03-verify-config.png)

### 4. 验证安装

powershell 中输入 codex 启动

![启动Codex](/img/codex/codex-04-codex-start-1.png)

然后在对话框中，输入：您好！，跟他打个招呼，如果正常回复，并且在平台内看到调用记录，则安装成功

![Codex对话](/img/codex/codex-05-codex-start-2.png)

![Codex成功](/img/codex/codex-06-codex-start-3.png)

## MacOS

### 1. 安装 Node.js

首先需要确认您的电脑上有 [Homebrew](https://brew.sh/)，如果没有的话，可以点击进去，有一行命令，一键复制就可以安装

![Homebrew代理](/img/codex/codex-07-macos-homebrew-proxy.png)

安装 Homebrew 的时候，有一部分资源在海外，需要设置 TUN 代理

安装好之后，使用 Homebrew 安装 Nodejs（如果已经安装可以跳过）

```bash
brew install node
```

![安装Node.js](/img/codex/codex-08-macos-node-verify.png)

请使用下面的命令，验证安装，如果出现下面的提示就说明 node 已经安装成功了

```bash
node --version
```

![验证Node.js](/img/codex/codex-09-macos-node-version-check.png)

:::warning
需要注意的是，Nodejs 的版本必须为 18+
如果低于这个版本，可以问一下 AI 如何升级 Nodejs 版本，让 AI 先给您命令收集系统信息，之后它就会提供最快最准确的指导
:::

### 2. 安装 Codex CLI

使用 npm 安装：

```bash
npm install -g @openai/codex --registry=https://registry.npmmirror.com/
```

![安装Codex](/img/codex/codex-10-macos-npm-install.png)

### 3. 创建配置文件

先复制下面的命令到本地，将其中的 `在这里替换成你的_API_KEY` 改成你自己的 API Key，然后再执行即可

```bash
# 目标目录
dir="$HOME/.codex"
mkdir -p "$dir"

# 写 auth.json（覆盖）
cat > "$dir/auth.json" << 'EOF'
{
"OPENAI_API_KEY": "在这里替换成你的_API_KEY"
}
EOF

# 写 config.toml（覆盖）
cat > "$dir/config.toml" << 'EOF'
model_provider = "aicodewith"
model = "gpt-5.2-codex"
model_reasoning_effort = "high"
disable_response_storage = true
preferred_auth_method = "apikey"
requires_openai_auth = true

enableRouteSelection = true

[model_providers.aicodewith]
name = "aicodewith"
base_url = "https://api.aicodewith.com/chatgpt/v1"
wire_api = "responses"
EOF
```

验证是否设置成功：

```bash
cat "$HOME/.codex/auth.json"
cat "$HOME/.codex/config.toml"
```

![验证配置](/img/codex/codex-11-macos-verify-config.png)

### 4. 验证安装

终端中输入 `codex` 启动，然后在对话框中，输入：您好！，跟他打个招呼，如果正常回复，并且在平台内看到调用记录，则说明配置成功

![Codex启动](/img/codex/codex-12-macos-codex-start.png)

## Linux

### 1. 安装 Node.js

安装 Nodejs 的命令（如果已经安装可以跳过）：

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
apt-get install -y nodejs
```

验证安装：

```bash
node --version
```

![Node.js版本](/img/codex/codex-13-linux-node-version.png)

:::warning
需要注意的是，Nodejs 的版本必须为 18+
如果低于这个版本，可以问一下 AI 如何升级 Nodejs 版本，让 AI 先给您命令收集系统信息，之后它就会提供最快最准确的指导
:::

### 2. 安装 Codex CLI

使用 npm 安装：

```bash
npm install -g @openai/codex --registry=https://registry.npmmirror.com/
```

如下图所示，则说明安装成功

![安装Codex](/img/codex/codex-14-linux-npm-install.png)

### 3. 创建配置文件

先复制下面的命令到本地，将其中的 `在这里替换成你的_API_KEY` 改成你自己的 API Key，然后再执行即可

```bash
# 目标目录
dir="$HOME/.codex"
mkdir -p "$dir"

# 写 auth.json（覆盖）
cat > "$dir/auth.json" << 'EOF'
{
"OPENAI_API_KEY": "在这里替换成你的_API_KEY"
}
EOF

# 写 config.toml（覆盖）
cat > "$dir/config.toml" << 'EOF'
model_provider = "aicodewith"
model = "gpt-5.2-codex"
model_reasoning_effort = "high"
disable_response_storage = true
preferred_auth_method = "apikey"
requires_openai_auth = true

enableRouteSelection = true

[model_providers.aicodewith]
name = "aicodewith"
base_url = "https://api.aicodewith.com/chatgpt/v1"
wire_api = "responses"
EOF
```

验证是否设置成功：

```bash
cat "$HOME/.codex/auth.json"
cat "$HOME/.codex/config.toml"
```

![验证配置](/img/codex/codex-15-linux-verify-config.png)

### 4. 验证安装

终端中输入 codex 启动，然后在对话框中，输入：您好！，跟他打个招呼，如果正常回复，并且在平台内看到调用记录，则说明配置成功

![Codex启动](/img/codex/codex-16-linux-codex-start.png)

## 常见问题

### 1. Since this folder is not version controlled, we recommend requiring approval of all edits and commands.

#### 错误截图

![FAQ错误](/img/codex/codex-17-faq-warning.png)

#### 解决办法

直接选择第一个就好了，这个是在确认是否允许codex在这个文件夹中工作而无需确认

一直确认挺烦的，直接选第一个让他干就好了
