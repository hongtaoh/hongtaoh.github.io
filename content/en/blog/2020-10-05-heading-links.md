---
title: "How to Add Links to Headings in A Hugo Post"
date: 2020-10-05T15:07:06-04:00
author: Hongtao Hao
slug: hugo-heading-link
draft: true
toc: false
---

I tried the [render hooks for headings](https://gohugo.io/getting-started/configuration-markup#heading-link-example), a [new feature released](https://gohugo.io/news/0.71.0-relnotes/) in Hugo 0.71. However, it didn't work for me. 

I then go back to the solution suggested by [frerich](https://github.com/gohugoio/hugo/issues/6713#issue-545589375). It worked. 

I changed the `&para;` to `#`. 

According to frerich, what you need to do is to add `add-header-anchors.html` whose content is shown below to `/layouts/partials`.

```html
{{ . | replaceRE "(<h[1-9] id=\"([^\"]+)\".+)(</h[1-9]+>)" `${1}<a href="#${2}" class="header-anchor" ariaLabel="Anchor">&para;</a>${3}` | safeHTML }}
``` 

Then, in `/layouts/_default/single.html`, replace  `{{ .Content }}` with `{{ .Content | partial "add-header-anchors" }}`.

