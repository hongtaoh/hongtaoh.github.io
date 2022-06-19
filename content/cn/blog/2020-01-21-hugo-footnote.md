---
title: Hugo 如何实现脚注
date: 2020-01-21T12:22:37-05:00
author: 郝鸿涛
tags: 编程
---
[Hugo](https://gohugo.io/) 从 [v0.60.0](https://github.com/gohugoio/hugo/releases/tag/v0.60.0)开始，Markdown 解析器不再使用 [Blackfriday](https://github.com/russross/blackfriday), 改用由 [yuin](https://github.com/yuin)[^1] 编写的 [goldmark](https://github.com/yuin/goldmark) 。

这次变动我目前感觉比较明显的是：

blackfriday 支持 `自动计数` 形式的脚注。所谓`自动计数`，就是说，你可以在文本后直接跟脚注的具体内容，比如 

```markdown
比如[^看到了吗？]
```
这种形式在 blackfriday 是支持的，但是 goldmark 不支持，你必须这样：

```markdown
比如[^1]
```

然后在文末，加上以下内容才可以：

```markdown
[^1]: 看到了吗？
``` 

这一点，有人在 Github 上[提过](https://github.com/yuin/goldmark/issues/92)，想在 goldmark 中实现 `免计数` 脚注，但是目前貌似依然不支持。


[^1]: 应该是一个日本人，他的 Github 网页在[这里](https://github.com/yuin)