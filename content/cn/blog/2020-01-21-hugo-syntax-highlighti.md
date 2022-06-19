---
title: Hugo 如何代码高亮
date: 2020-01-21T12:22:37-05:00
author: 郝鸿涛
draft: true
tags: 编程
---
[Hugo](https://gohugo.io/) 目前自带代码高亮功能，官网的[说明](https://gohugo.io/getting-started/configuration-markup/#highlight) 列出如下的设置选项 （以 `toml` 格式为例）：

```toml
[markup]
  [markup.highlight]
    codeFences = true
    guessSyntax = false
    hl_Lines = ""
    lineNoStart = 1
    lineNos = false
    lineNumbersInTable = true
    noClasses = true
    style = "monokai"
    tabWidth = 4
```
大家可以试一下具体每个设置的功能，我这里主要讲一下 `style` 的设置，因为这个不是一个布尔值，而是需要输入具体内容。

Hugo 的代码高亮功能是由 [chroma](https://github.com/alecthomas/chroma) 提供的。

上面的代码是设置的 "monokai"，你当然可以用别的样式，可以在[这里](http://help.farbox.com/pygments.html)选。

如果你需要高亮代码块的某一行或者某几行，可以参考[这里](https://gohugo.io/content-management/syntax-highlighting/#highlight-shortcode)或者[这里](https://kowalcj0.github.io/posts/2018/syntax-highlighting-in-hugo/)。