#!/bin/bash
# 构建并部署到 GitHub Pages

# 配置 Git
 git config --global user.name "QIUBIT Bot"
git config --global user.email "bot@qiubithub.com"

# 初始化 git（如果没有）
if [ ! -d .git ]; then
  git init
  git add .
  git commit -m "Initial commit"
fi

# 安装 gh-pages
 npm install --save-dev gh-pages

# 更新 package.json 添加部署脚本
 npm pkg set scripts.deploy="docusaurus deploy"

# 配置 docusaurus.config.ts 使用 GitHub Pages
