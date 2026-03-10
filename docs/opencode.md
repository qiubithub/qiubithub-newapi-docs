---
sidebar_position: 3
---

# OpenCode

通过 QiubiHub 插件，在 OpenCode 中使用 GPT、Claude 和 Gemini 模型。

---

## Windows 安装指南

### 1. 安装 OpenCode

在 **PowerShell** 中执行：

```powershell
npm i -g opencode-ai
```

![安装OpenCode](/img/1769478635944-5d6e01e4-b650-4ab7-9f2d-fd990eefbea9.png)

安装完成后，**关闭并重新打开 PowerShell**，然后验证安装：

```powershell
opencode --version
```

![验证安装](/img/1769478658868-abdc4013-a8ef-4aea-97cc-8d324d7ff9b4.png)

:::tip 脚本执行策略问题
如果遇到"在此系统上禁止运行脚本"的错误：
- 以**管理员身份**运行 PowerShell
- 执行：`Set-ExecutionPolicy Unrestricted`
- 输入 `"Y"` 确认后重试安装命令
:::

### 2. 创建配置文件

首先执行一次 `opencode` 命令，这样会创建配置文件夹：

![创建配置文件夹](/img/1769496293298-59fd1531-2a19-45f9-a161-5c6b76db9f96.png)

然后在 `~/.config/opencode` 下面创建 `opencode.json`，内容如下：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {},
  "plugin": [
    "oh-my-opencode",
    "opencode-aicodewith-auth"
  ]
}
```

### 3. 填入认证信息

在 PowerShell 中输入下面的命令，进入认证流程：

```powershell
opencode auth login
```

![认证登录](/img/1769498699929-2e590c1d-2d0d-45d4-9fdd-8747bbd1bae8.png)

### 4. 验证安装

重新打开 PowerShell 或 IDE，运行：

```powershell
opencode
```

然后输入 `/models`，正常显示供应商，则说明配置成功：

![验证模型](/img/1769498071669-5e32f86d-b506-4eab-ab46-ab7f1110adea.png)

在对话框中输入：`您好！`，如果能正常回复，并且在 QiubiHub 平台看到调用记录，则说明配置成功：

![测试对话](/img/1769498231328-62d06d66-1786-4c16-b4db-bce9c7c5e659.png)

---

## MacOS/Linux 安装指南

### 1. 安装 OpenCode

在**终端**中执行：

```bash
npm i -g opencode-ai
```

![安装OpenCode-macOS](/img/1769498899735-186a6b3d-59c9-4b77-a5d3-d5c549f116a9.png)

终端输入命令来验证安装：

```bash
opencode --version
```

![验证安装-macOS](/img/1769499206277-37f7d50b-f857-4524-af03-4a2b94aa7e1c.png)

### 2. 创建配置文件

首先执行一次 `opencode` 命令，这样会创建配置文件夹。

然后在 `~/.config/opencode` 下面创建 `opencode.json`，内容如下：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {},
  "plugin": [
    "oh-my-opencode",
    "opencode-aicodewith-auth"
  ]
}
```

如果你之前使用过，有自己的配置，只需要在 `plugin` 列表中，填入 `opencode-aicodewith-auth` 名称即可，推荐再填一个 `oh-my-opencode` 插件，这个也很好用。

![配置文件](/img/1769499610601-6c71956e-d805-47cf-8e64-7582ab2ada98.png)

### 3. 填入认证信息

在终端中输入下面的命令，进入认证流程：

```bash
opencode auth login
```

![认证登录-macOS](/img/1769519345703-83e3387e-5474-484f-9a01-82c9beed9a7f.png)

### 4. 验证安装

重新打开终端或 IDE，运行：

```bash
opencode
```

在对话框中输入：`您好！`，如果能正常回复，并且在 QiubiHub 平台看到调用记录，则说明配置成功。

![测试对话-macOS](/img/1770005224021-7537a4ba-d155-4e7e-8c21-267248ba582d.png)

---

## 如何使用

opencode 有三个主 agent，直接跟咱们聊天，对接的分别是：

### Sisyphus（西西弗斯）

![Sisyphus-1](/img/1770005229950-9f60e537-915f-415e-be0b-56dcbe8e7909.png)

![Sisyphus-2](/img/1770005234625-54ec5dc4-aa7e-4755-b570-865fb6291d68.png)

### 其他 Agent

![Agent-1](/img/1770005245661-aec3e187-539f-4869-9cc6-e8d23f5ee30e.png)

![Agent-2](/img/1770005299547-e238eb18-41e7-4593-81bb-82be3b5381da.png)

---

## 常见问题

### BunInstallFailedError

![BunInstallFailedError](/img/1769478635944-5d6e01e4-b650-4ab7-9f2d-fd990eefbea9.png)

因为 oh my opencode 插件需要从远端拉一个 models.dev 这个部分，拉不到的话就会报这个错。

**解决办法**：开 TUN 模式，如果已经开启 TUN 模式了，重新开关一下就好了。

---

## 相关链接

- OpenCode 官网: https://opencode.ai
- GitHub: https://github.com/opencode
