#!/bin/bash
# 构建并部署到 GitHub Pages

# 配置 Git
git config --global user.name "qiu"
git config --global user.email "qiuchuanzeha@gmail.com"

# 安装 gh-pages
 npm install --save-dev gh-pages

# 更新 package.json 添加部署脚本
 npm pkg set scripts.deploy="docusaurus deploy"

# 配置 docusaurus.config.ts 使用 GitHub Pages
