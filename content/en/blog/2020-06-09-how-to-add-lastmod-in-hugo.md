---
title: How to Add Last Modification Date in Hugo
date: 2020-06-09T12:04:06-04:00
author: Hongtao Hao
slug: hugo-lastmod
draft: false
toc: false
---
Earlier, I thought this must be a difficult undertaking, but later I found this is relatively easy to accomplish. 

The solution was [here](https://discourse.gohugo.io/t/last-modified-date-for-posts/23363/2), posted by funkydan2.

According to Hugo's documentation on [Page Variables](https://gohugo.io/variables/page/), there are two ways to specify last modification date. One way is to specify the `.Lastmod` in a content's front matter. That is to say, while you are specifying the `title`, `date`, `author`, `slug`, etc., you also specify `lastmod`. The second way is through `.GitInfo`. 

I recommend using the [.GitInfo](https://gohugo.io/variables/git/#lastmod). This method is better because it is automatic. 

In your `single.html` within `layouts` -> `_default`, you simply add this line of code:

```html
<p>Last modified on {{ .Page.Lastmod.Format "2006-01-02" }}</p>
```

Then, in your `config.toml`, you simply add `enableGitInfo = true`. 

You can check my [single.html](https://github.com/hongtaoh/hongtaoh.github.io/blob/sources/themes/hugo-xmin/layouts/_default/single.html) and [config.toml](https://github.com/hongtaoh/hongtaoh.github.io/blob/sources/config.toml) setting for a reference. 

Please note that this is just an example. There are many ways to achieve the goal. You are encouraged to do it in your own way (if you have enough time...).
