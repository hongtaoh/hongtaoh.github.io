---
title: How to Fix Blurry Images on Mac Chrome
date: 2020-05-14T16:35:13-04:00
author: Hongtao Hao
slug: chrome-mac-blurry-image-fix
draft: false
toc: false
---

I never used Chrome before but after upgrading my MacOS, I started trying Chrome. I created my personal blog using Hugo. The thing is, when I viewed my site using Chrome on my Mac, all images are so blurry. I tried again on Safari, things were fine; I tried it in Chrome on a Windowns PC, things were also fine. 

While I was scratching my head, I came across [this](https://stackoverflow.com/a/42216003) answer by pastullo on Stackexchange. 

The fix was really simple: I only added this following single line of CSS in my style sheet, as pastullo suggested:

```CSS
body {
	image-rendering: -webkit-optimize-contrast;
}
```

This fix literally saved my day. Thanks Stackexchange. 

From below you can see the change.

{{<figure src="/media/enblog/blurry.png" title="Before">}}

{{<figure src="/media/enblog/clear.png" title="After">}}
