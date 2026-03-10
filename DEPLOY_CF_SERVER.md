# QIUBIT Docs 部署指南

这份指南对应当前 `docs.qiubithub.com` 的实际部署方式，不是 GitHub Pages，也不是 Cloudflare Pages。

## 当前线上结构

- 本地源码目录：`/Users/qiuchuanze/Documents/PersonalProject/qiubithub-newapi-docs`
- 服务器源码目录：`/home/ubuntu/qiubithub-docs`
- 线上静态文件目录：`/home/ubuntu/qiubithub-docs/build`
- 服务器静态服务：`/opt/ai-platform/docker-compose.yml` 里的 `docs-redirect` 容器
- 容器对外监听：`8082`
- Cloudflare Tunnel 转发：`docs.qiubithub.com` -> `http://localhost:8082`

说明：

- `docs-redirect` 这个容器名是历史遗留；现在它实际承担的是 docs 静态站点服务。
- 当前线上并不是直接跑 Docusaurus dev server，而是用 `nginx:alpine` 直接托管 `build/` 目录。

## 一次性服务器准备

### 1. 服务器上准备 docs 仓库目录

```bash
mkdir -p /home/ubuntu/qiubithub-docs
```

如果你希望服务器上保留完整源码，推荐直接把整个仓库放到这个目录下。

### 2. 准备 docs 的 nginx 配置

文件：`/opt/ai-platform/docs-redirect/default.conf`

```nginx
server {
    listen 8082;
    server_name _;
    charset utf-8;
    root /usr/share/nginx/html;
    index index.html;
    absolute_redirect off;
    port_in_redirect off;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

这两个参数很重要：

- `absolute_redirect off;`
- `port_in_redirect off;`

少了它们，像 `/docs/intro` 这样的路径可能会被重定向成带 `:8082` 的错误地址。

### 3. Docker Compose 挂载静态产物

文件：`/opt/ai-platform/docker-compose.yml`

```yaml
  docs-redirect:
    image: nginx:alpine
    container_name: docs-redirect
    restart: always
    ports:
      - "8082:8082"
    volumes:
      - ./docs-redirect/default.conf:/etc/nginx/conf.d/default.conf:ro
      - /home/ubuntu/qiubithub-docs/build:/usr/share/nginx/html:ro
```

启动或重建：

```bash
cd /opt/ai-platform
sudo docker compose up -d --force-recreate docs-redirect
```

### 4. Cloudflare Tunnel 配置

在 Cloudflare Zero Trust 里给当前 tunnel 增加一个 Public Hostname：

- Hostname: `docs.qiubithub.com`
- Type: `HTTP`
- URL: `http://localhost:8082`

如果你现在已经在用 token 方式跑 `cloudflared`，这条规则通常会直接下发到现有容器，不需要改 token。

## 本地构建并发布到服务器

这是最稳的方式：本地构建，服务器只负责托管 `build/`。

### 1. 在本地构建

```bash
cd /Users/qiuchuanze/Documents/PersonalProject/qiubithub-newapi-docs
npm ci
npm run build
```

构建产物会输出到：

```bash
build/
```

### 2. 上传构建产物到服务器

```bash
rsync -avz --delete ./build/ ubuntu@<SERVER_IP>:/home/ubuntu/qiubithub-docs/build/
```

说明：

- `--delete` 表示远端 `build/` 会和本地完全同步，避免旧文件残留。
- 这里只同步 `build/`，所以不依赖服务器的 Node 环境。
- 如果只是更新文档内容，通常不需要重启容器，nginx 会直接读取新文件。

## 可选：把完整源码同步到服务器再构建

如果你希望服务器自己持有完整仓库，也可以这样做。

### 1. 同步源码

```bash
rsync -avz --delete \
  --exclude node_modules \
  --exclude build \
  --exclude .git \
  ./ ubuntu@<SERVER_IP>:/home/ubuntu/qiubithub-docs/
```

### 2. 在服务器上构建

```bash
ssh ubuntu@<SERVER_IP>
cd /home/ubuntu/qiubithub-docs
npm ci
npm run build
```

这种方式的优点是服务器目录完整；缺点是会依赖服务器的 Node 版本和 npm 环境。

## 建议的 Docusaurus 配置

如果这套文档长期独立部署在 `docs.qiubithub.com`，建议检查：

文件：`docusaurus.config.ts`

```ts
url: 'https://docs.qiubithub.com',
baseUrl: '/',
```

`url` 如果还是 `https://www.qiubithub.com`，虽然页面能打开，但 sitemap、canonical link 和某些绝对链接会偏向主站域名。

## 发布后的检查

### 服务器本地检查

```bash
curl -I http://127.0.0.1:8082/
curl -I http://127.0.0.1:8082/docs/intro/
```

### 外网检查

```bash
curl -I https://docs.qiubithub.com/
curl -I https://docs.qiubithub.com/docs/intro/
```

期望结果：

- 根路径返回 `200`
- 文档页面返回 `200`
- 不要出现 `http://docs.qiubithub.com:8082/...` 这样的跳转

## 常见问题

### 1. 外网是 `502`

优先检查：

- `docs-redirect` 容器是否在运行
- 宿主机 `8082` 是否在监听
- Cloudflare Tunnel 的 origin 是否还是 `http://localhost:8082`

命令：

```bash
sudo docker ps
sudo ss -ltnp '( sport = :8082 )'
```

### 2. 页面跳到带 `:8082` 的地址

说明 nginx 的重定向没有处理好，检查 `default.conf` 里是否有：

```nginx
absolute_redirect off;
port_in_redirect off;
```

### 3. 页面还是旧内容

优先检查：

- 你是不是把 `build/` 同步到了错误目录
- `rsync --delete` 有没有真正执行
- 浏览器/Cloudflare 缓存有没有命中

最简单的确认方式：

```bash
ls -la /home/ubuntu/qiubithub-docs/build
curl -I https://docs.qiubithub.com/
```

### 4. 某些路由 404

不要只上传单个 HTML 文件，必须上传完整的 `build/` 目录。

## 推荐发布流程

日常更新建议按这个顺序：

1. 本地修改 `qiubithub-newapi-docs`
2. 本地执行 `npm ci && npm run build`
3. `rsync` 同步 `build/` 到 `/home/ubuntu/qiubithub-docs/build/`
4. 用 `curl` 验证本地和外网

如果只是内容更新，到第 3 步通常就够了，不需要重启 `docs-redirect` 容器。
