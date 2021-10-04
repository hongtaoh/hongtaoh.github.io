---
title: "How to Use Shortcodes in Blogdown"
date: 2020-11-03T16:59:52-05:00
author: Hongtao Hao
slug: shortcode-blogdown
draft: false
toc: false
---
I found the way to use shortcodes in Blogdown [here](https://github.com/rstudio/blogdown/issues/40#issuecomment-478863914).

Take the shortcodes of [my custom block](/en/blog/custom-blocks-hugo/) as an example. If I want to use them in a post created by [Blogdown](https://bookdown.org/yihui/blogdown/), I'll do it this way:

```
`r blogdown:shortcode("block", class="note")`
Write my note information here.
`r blogdown:shortcode("end")`
```

The above codes will create this:

{{< block class="note" >}}
Write my note information here.
{{< end >}}

Thanks, [Yihui](https://github.com/rstudio/blogdown/issues/40#issuecomment-300997712)!