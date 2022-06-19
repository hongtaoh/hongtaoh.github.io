---
title: Hugo 如何使用思源宋体
author: 郝鸿涛
date: '2020-01-19'
slug: hugo-google-noto-serif-sc
categories:
tags: 编程
---

打开 [Google Fonts](https://fonts.google.com/)。在 "Language" 下拉菜单栏选择 "Chinese (Simplified)"。Noto Sans Serif" 是思远宋体。打开，选择你要的样式，一般最常见的是 "Regular 400"，点开其所对应的 "Select this style"，侧边会显示出 "Selected family"，如果你想选不止一个样式，可以选 "Add more styles"。

然后，把 Link 底下那一串复制，然后打开 Hugo 文件夹的 `layouts/partials`，不出意外的话，用文本编辑器打开 `header.html`，在 `<head></head>` 之间粘贴你刚才复制的内容。

然后回到刚才的 Selected Family 页面，复制 "CSS rules to specify families" 底下的内容，粘贴到你的 CSS 文件中。

我用了一段时间之后就放弃了谷歌字体。是好看，是方便，但是我非常不喜欢把我自己网站的控制权交给谷歌。



