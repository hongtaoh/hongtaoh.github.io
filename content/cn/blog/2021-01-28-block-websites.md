---
title: "如何在苹果电脑上屏蔽特定网站"
date: 2021-01-28T14:28:24-05:00
author: 郝鸿涛
slug: block-websites-on-mac
draft: false
toc: false
tags: 编程
---

{{<block class="note">}}
以下内容参考 [Mac上的Safari怎么屏蔽特定网站](https://blog.csdn.net/libing_zeng/article/details/79955900) 这篇博文。来自 CSDN 的 [图形跟班](https://blog.csdn.net/libing_zeng)。
{{<end>}}

以下以屏蔽百度 (https://www.baidu.com/) 为例：

1. 打开终端 (Terminal)
2. 输入 `sudo pico /etc/hosts`， 然后回车。你可能会被要求输入密码。输入你的开机密码就好。需要注意的是，也许是为了安全，你输入的内容不会被显示出来。输入完密码后，点击回车。
3. 进入 nano 文本编辑器后, 光标移动到 localhost 部分的最后一行，输入 

```bash
127.0.0.1 www.baidu.com
```

   需要注意的是，不需要 `https://`。另外，如果你要屏蔽的网站，没有 `www`，比如我的网站：`https://hongtaoh.com`，那么就是：`127.0.0.1 hongtaoh.com`，不用 `www`。

4. 按 `Ctrl` + `O`，然后回车
5. 按 `Ctrl` + `X` 退出 nano 编辑器，回到终端
6. 在终端输入 `sudo dscacheutil -flushcache`，然后回车
7. 重启浏览器，百度应该就打不开了

如果无效，可以考虑 [SelfControl App](http://selfcontrolapp.com/)。
