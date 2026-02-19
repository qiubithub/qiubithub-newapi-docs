---
sidebar_position: 5
---

# Gemini

通过环境变量的方式在电脑上安装和配置 Gemini CLI（命令行工具）

:::info
如果遇到问题，可以将本页全部内容和问题截图，复制给[豆包](https://www.doubao.com/chat/)或者[deepseek](https://chat.deepseek.com/)等AI，按照他的提示执行对应命令即可

如果 AI 也无法解决，可以联系我们的工程师，为您提供技术上的支持与帮助
:::

## Windows

### 1. 安装 Node.js

前往 [Node.js 官网](https://nodejs.org/en/download) 下载并安装 LTS 版本。（如果已经安装可以跳过）

验证安装：

```bash
node --version
```

如果出现下面的提示就说明 node 已经安装成功了

![Node.js安装成功](/img/gemini-cli/gemini-01-node-success.png)

:::warning
需要注意的是，Nodejs 的版本必须为 18+
如果低于这个版本，可以问一下 AI 如何升级 Nodejs 版本，让 AI 先给您命令收集系统信息，之后它就会提供最快最准确的指导
:::

### 2. 安装 Gemini CLI

打开 **PowerShell**（建议以管理员身份运行）并执行：

```bash
# 通过国内镜像源安装 claude code
npm install -g @google/gemini-cli --registry=https://registry.npmmirror.com/
```

![安装Gemini CLI](/img/gemini-cli/gemini-02-windows-install.png)

:::warning
如果遇到在此系统上禁止运行脚本，需要用管理员权限运行powershell，然后执行 `Set-ExecutionPolicy Unrestricted` 命令
:::

### 3. 创建配置文件

打开 **PowerShell**（建议以管理员身份运行）并执行：

![创建配置文件](/img/gemini-cli/gemini-03-windows-verify.png)

别忘了替换 API KEY

```bash
# 创建 ~/.gemini 目录（存在不报错）
mkdir "$env:USERPROFILE\.gemini" -Force | Out-Null

# 写入 .env（UTF-8 无 BOM，覆盖）
$envText = @'
GEMINI_API_KEY=在这里替换成你的_API_KEY
GOOGLE_GEMINI_BASE_URL=https://api.aicodewith.com/gemini_cli
GEMINI_MODEL=gemini-3-pro
'@
[System.IO.File]::WriteAllText("$env:USERPROFILE\.gemini\.env", $envText, (New-Object System.Text.UTF8Encoding($false)))

# 写入 settings.json（UTF-8 无 BOM，覆盖）
$json = @'
{
"ide": {
"enabled": true
},
"security": {
"auth": {
"selectedType": "gemini-api-key"
}
}
}
'@
[System.IO.File]::WriteAllText("$env:USERPROFILE\.gemini\settings.json", $json, (New-Object System.Text.UTF8Encoding($false)))
```

验证是否设置成功：

```bash
Get-Content "$env:USERPROFILE\.gemini\.env"
Get-Content "$env:USERPROFILE\.gemini\settings.json"
```

![验证配置](/img/gemini-cli/gemini-03-windows-verify.png)

### 4. 验证配置

终端中输入 gemini 启动，然后在对话框中，输入：您好！

跟他打个招呼，如果正常回复，并且在平台内看到调用记录，则说明配置成功

![启动Gemini](/img/gemini-cli/gemini-04-windows-gemini-start.png)

![Gemini成功](/img/gemini-cli/gemini-05-windows-gemini-success.png)

## MacOS

### 1. 安装 Node.js

首先需要确认您的电脑上有 [Homebrew](https://brew.sh/)，如果没有的话，可以点击进去，有一行命令，一键复制就可以安装

![Homebrew代理](/img/gemini-cli/gemini-06-macos-homebrew-proxy.png)

安装 Homebrew 的时候，有一部分资源在海外，需要设置 TUN 代理

安装好之后，使用 Homebrew 安装 Nodejs（如果已经安装可以跳过）

```bash
brew install node
```

![安装Node.js](/img/gemini-cli/gemini-07-macos-node-verify.png)

请使用下面的命令，验证安装，如果出现下面的提示就说明 node 已经安装成功了

```bash
node --version
```

![验证Node.js](/img/gemini-cli/gemini-08-macos-node-version-check.png)

:::warning
需要注意的是，Nodejs 的版本必须为 18+
如果低于这个版本，可以问一下 AI 如何升级 Nodejs 版本，让 AI 先给您命令收集系统信息，之后它就会提供最快最准确的指导
:::

### 2. 安装 Gemini CLI

使用 npm 安装：

```bash
npm install -g @google/gemini-cli --registry=https://registry.npmmirror.com/
```

![安装Gemini](/img/gemini-cli/gemini-09-macos-install.png)

### 3. 创建配置文件

打开终端并执行：

![创建配置文件](/img/gemini-cli/gemini-10-macos-verify.png)

别忘了替换 API KEY

```bash
mkdir -p "$HOME/.gemini"

cat > "$HOME/.gemini/.env" << 'EOF'
GEMINI_API_KEY=在这里替换成你的_API_KEY
GOOGLE_GEMINI_BASE_URL=https://api.aicodewith.com/gemini_cli
GEMINI_MODEL=gemini-3-pro
EOF

cat > "$HOME/.gemini/settings.json" << 'EOF'
{
"ide": {
"enabled": true
},
"security": {
"auth": {
"selectedType": "gemini-api-key"
}
}
}
EOF
```

验证是否设置成功：

```bash
cat "$HOME/.gemini/.env"
cat "$HOME/.gemini/settings.json"
```

### 4. 验证配置

终端中输入 gemini 启动，然后在对话框中，输入：您好！

跟他打个招呼，如果正常回复，并且在平台内看到调用记录，则说明配置成功

![启动Gemini](/img/gemini-cli/gemini-11-macos-gemini-start.png)

![Gemini成功](/img/gemini-cli/gemini-12-macos-gemini-success.png)

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

![Node.js版本](/img/gemini-cli/gemini-13-linux-node-version.png)

:::warning
需要注意的是，Nodejs 的版本必须为 18+
如果低于这个版本，可以问一下 AI 如何升级 Nodejs 版本，让 AI 先给您命令收集系统信息，之后它就会提供最快最准确的指导
:::

### 2. 安装 Gemini CLI

使用 npm 安装：

```bash
npm install -g @google/gemini-cli --registry=https://registry.npmmirror.com/
```

如下图所示，则说明安装成功

![安装Gemini](/img/gemini-cli/gemini-14-linux-install.png)

### 3. 创建配置文件

打开终端并执行：

![创建配置文件](/img/gemini-cli/gemini-15-linux-verify.png)

别忘了替换 API KEY

```bash
mkdir -p "$HOME/.gemini"

cat > "$HOME/.gemini/.env" << 'EOF'
GEMINI_API_KEY=在这里替换成你的_API_KEY
GOOGLE_GEMINI_BASE_URL=https://api.aicodewith.com/gemini_cli
GEMINI_MODEL=gemini-3-pro
EOF

cat > "$HOME/.gemini/settings.json" << 'EOF'
{
"ide": {
"enabled": true
},
"security": {
"auth": {
"selectedType": "gemini-api-key"
}
}
}
EOF
```

验证是否设置成功：

```bash
cat "$HOME/.gemini/.env"
cat "$HOME/.gemini/settings.json"
```

### 4. 验证配置

终端中输入 gemini 启动，然后在对话框中，输入：您好！

跟他打个招呼，如果正常回复，并且在平台内看到调用记录，则说明配置成功

![启动Gemini](/img/gemini-cli/gemini-16-linux-gemini-start.png)

![Gemini成功](/img/gemini-cli/gemini-17-linux-gemini-success.png)
