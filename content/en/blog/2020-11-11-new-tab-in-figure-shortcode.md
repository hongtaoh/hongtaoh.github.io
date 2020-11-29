---
title: "How to Open Shortcode Links in a New Tab in Hugo"
date: 2020-11-11T22:23:33-05:00
author: Hongtao Hao
slug: new-tab-in-shortcode
draft: false
toc: false
---

I've talked about how to open links in new tab in Hugo [here](/en/2020/06/20/new-tab-in-hugo). But how can we open links in new tab in a Hugo shortcode, for example, Hugo's [built-in shortcode for figure](https://gohugo.io/content-management/shortcodes/#figure)?

I found the solution [here](https://discourse.gohugo.io/t/how-to-open-shortcode-links-in-a-new-tab/22727/2). Thanks to ju52's answer.  

First, copy the [original codes](https://gohugo.io/templates/shortcode-templates/#single-named-example-image) of the figure shortcode. Paste them in a new html file named `figure.html`. Place this file in `layouts/shortcodes`. Create a folder named `shortcodes` within the `layouts` folder if you don't have it yet. 

Then, change this line `{{ with .Get "link"}}<a href="{{.}}">{{ end }}` to `{{ with .Get "link"}}<a href="{{.}}" target="_blank">{{ end }}`.
