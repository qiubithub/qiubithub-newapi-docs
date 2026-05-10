# QiubitHub 前台部署指南

这份指南对应当前拆分后的前台结构：

- `www.qiubithub.com`：Next.js 静态官网，产物目录 `apps/www/out`
- `docs.qiubithub.com`：VitePress 文档，产物目录 `apps/docs/docs/.vitepress/dist`
- New API 控制台：继续使用现有后台部署，不由本仓库构建

> 重要：当前 `www.qiubithub.com` 已经承载 New API 控制台和兼容接口。发布新版官网时不要把整个 `www` 主机直接切到静态站，否则 `/console`、`/v1`、`/gemini_cli` 等路径会被误伤。建议只让 `/`、`/_next/*`、`/favicon.ico`、`/logo.svg` 走官网静态产物，其余路径继续代理到现有 New API。

## 本地构建

```bash
cd /Users/qiuchuanze/Documents/PersonalProject/qiubithub-newapi-docs
npm ci
npm run build
```

构建完成后会得到：

```bash
apps/www/out
apps/docs/docs/.vitepress/dist
```

## 服务器目录建议

```text
/home/ubuntu/qiubithub-frontend/www
/home/ubuntu/qiubithub-frontend/docs
```

## nginx 静态服务建议

官网容器示例：

```nginx
server {
    listen 8081;
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

文档容器示例：

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

Cloudflare Tunnel 建议：

- `www.qiubithub.com` 的官网静态路径 -> `http://localhost:8081`
- `www.qiubithub.com` 的后台/API 路径 -> 现有 New API 服务
- `docs.qiubithub.com` -> `http://localhost:8082`

如果使用 nginx 做 `www` 路由，可以按下面的方式保护 New API：

```nginx
server {
    listen 443 ssl http2;
    server_name www.qiubithub.com;

    location = / {
        root /home/ubuntu/qiubithub-frontend/www;
        try_files /index.html =404;
    }

    location /_next/ {
        root /home/ubuntu/qiubithub-frontend/www;
        try_files $uri =404;
    }

    location = /favicon.ico {
        root /home/ubuntu/qiubithub-frontend/www;
        try_files /favicon.ico =404;
    }

    location = /logo.svg {
        root /home/ubuntu/qiubithub-frontend/www;
        try_files /logo.svg =404;
    }

    location / {
        proxy_pass http://127.0.0.1:<NEW_API_PORT>;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 上传产物

```bash
rsync -avz --delete ./apps/www/out/ ubuntu@<SERVER_IP>:/home/ubuntu/qiubithub-frontend/www/
rsync -avz --delete ./apps/docs/docs/.vitepress/dist/ ubuntu@<SERVER_IP>:/home/ubuntu/qiubithub-frontend/docs/
```

如果 nginx 已经挂载上面的目录，通常不需要重启容器。

## 发布后检查

服务器本地：

```bash
curl -I http://127.0.0.1:8081/
curl -I http://127.0.0.1:8082/
curl -I http://127.0.0.1:8082/claude-code
```

外网：

```bash
curl -I https://www.qiubithub.com/
curl -I https://docs.qiubithub.com/
curl -I https://docs.qiubithub.com/claude-code
```

期望结果：

- 根路径返回 `200`
- 文档工具页返回 `200`
- 不出现带 `:8081` 或 `:8082` 的外部跳转
