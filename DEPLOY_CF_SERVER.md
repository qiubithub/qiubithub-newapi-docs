# QiubitHub 前台部署指南

这份指南对应当前拆分后的前台结构：

- `www.qiubithub.com`：Next.js 静态官网，产物目录 `apps/www/out`
- `docs.qiubithub.com`：VitePress 文档，产物目录 `apps/docs/docs/.vitepress/dist`
- New API 控制台：继续使用现有后台部署，不由本仓库构建

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

- `www.qiubithub.com` -> `http://localhost:8081`
- `docs.qiubithub.com` -> `http://localhost:8082`

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
