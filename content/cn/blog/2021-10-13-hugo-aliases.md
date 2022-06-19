---
title: "Hugo 的帖子如何改改 URL 地址"
date: 2021-10-13T17:21:21-05:00
author: "郝鸿涛"
slug: hugo aliases
draft: false
toc: false
tags: 编程
---
要用到 [Hugo Aliases](https://gohugo.io/content-management/urls/#aliases)。

比如，我有一篇帖子，之前的 slug 是 `if-senior-high-again` 我想改成 `senior-high`。那我那篇帖子的 YAML front matter 应该设置成：

```yaml
title: 如果我的高中能再来一遍
date: 2020-04-19T10:57:52-04:00
author: 郝鸿涛
slug: senior-high
draft: false
toc: true
aliases:
  - /cn/2020/04/19/if-senior-high-again/
```

Aliases 具体的地址是你之前帖子的原 URL 去除你的网站地址。比如，我那篇帖子的原地址是 [https://hongtaoh.com/cn/2020/04/19/if-senior-high-again/](https://hongtaoh.com/cn/2020/04/19/if-senior-high-again/)，去除我的网站地址 `https://hongtaoh.com` 后还剩下 `/cn/2020/04/19/if-senior-high-again/`，这就是我要在 aliases 中填的。更新后，当别人打开就地址，浏览器会自动跳转到新地址。你可以点开上面的链接自己看看效果。

另外，Aliases 可以是多个。