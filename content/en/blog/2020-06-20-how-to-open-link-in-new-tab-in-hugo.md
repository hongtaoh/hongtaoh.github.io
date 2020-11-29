---
title: How to Open Links in New Tab in Hugo
date: 2020-06-20T09:12:03-04:00
author: Hongtao Hao
slug: new-tab-in-hugo
draft: false
toc: false
---

The default of Hugo is that when you open a link in a page rendered by markdown, you'll stay in the current tab. How can we enable openning a new tab then?

The answer was provided by [PrasdPen](https://discourse.gohugo.io/t/how-to-open-link-in-new-tab-with-hugos-new-goldmark-markdown-renderer-in-v0-62-0/22540). 

Go to `layouts/_default`, create a new folder and name it as `_markup`. Then add a `render-link.html` with the following code:

```html
<a href="{{ .Destination | safeURL }}"{{ with .Title}} title="{{ . }}"{{ end }}{{ if strings.HasPrefix .Destination "http" }} target="_blank" rel="noreferrer noopener"{{ end }}>{{ .Text | safeHTML }}</a>
```

This code was initiall provided by [Agrim Prasad](https://agrimprasad.com/post/hugo-goldmark-markdown/) and then improved by [h-enk](https://discourse.gohugo.io/t/how-to-open-link-in-new-tab-with-hugos-new-goldmark-markdown-renderer-in-v0-62-0/22540/7). The main difference is the addition of `rel="noreferrer noopener"`. 

In fact, the solution was also earlier provided by bep [here](https://discourse.gohugo.io/t/how-to-open-shortcode-links-in-a-new-tab/22727/6). 

The main difference between the [official solution](https://gohugo.io/getting-started/configuration-markup#link-with-title-markdown-example) provided by Hugo and the solution by [h-enk](https://discourse.gohugo.io/t/how-to-open-link-in-new-tab-with-hugos-new-goldmark-markdown-renderer-in-v0-62-0/22540/7) is that the former uses `rel="noopener"` whereas the latter uses `rel="noreferrer noopener"`. 

I used the latter one (because it looks longer and safer...), but I guess both will work. 

Wait, but how can I make sure that readers will open an internal link rather than opening in a new tab?

As [Agrim Prasad](https://agrimprasad.com/post/hugo-goldmark-markdown/) pointed out, you can use relative links: `[my amazing post](/posts/my-amazing-post/)`



