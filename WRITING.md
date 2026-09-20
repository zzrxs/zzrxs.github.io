# 博客写作指南

## 常用命令

```bash
# 创建文章
npm run new -- "文章标题"

# 创建草稿
npm exec hexo new draft "文章标题"

# 本地预览（草稿也会显示）
npm run draft

# 将草稿发布为文章
npm exec hexo publish "文章标题"

# 生成静态网站
npm run build
```

## 文章信息

新文章位于 `source/_posts/`。建议补全开头的 Front Matter：

```yaml
---
title: 文章标题
date: 2026-09-20 12:00:00
updated:
categories:
  - 技术
tags:
  - Hexo
description: 一句话摘要，用于搜索和分享。
---
```

`<!-- more -->` 之前的内容会作为首页摘要。启用文章资源目录后，新建文章时会同时生成同名文件夹；图片可放进该文件夹，并用 `{% asset_img image.png 图片说明 %}` 引用。

## 正式发布前

在 `_config.yml` 中把 `title`、`subtitle`、`description`、`author` 和 `url` 替换成真实信息，并把 `source/about/index.md` 改成你的个人介绍。若暂时没有 `/favicon.png`，浏览器出现一次 404 不影响页面使用。
