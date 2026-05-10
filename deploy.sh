#!/usr/bin/env bash
set -euo pipefail

npm ci
npm run build

echo "官网产物: apps/www/out"
echo "文档产物: apps/docs/docs/.vitepress/dist"
echo "按 DEPLOY_CF_SERVER.md 中的 rsync 命令同步到服务器。"
