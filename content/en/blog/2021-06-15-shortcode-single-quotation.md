---
title: "Use Double Quotation Marks in Hugo Shortcodes"
date: 2021-06-15T06:44:20-04:00
author: "Hongtao Hao"
slug: double-quotation
draft: false
toc: false
---

If you use single quotation marks ('') in Hugo shortcodes, say:

```md
<figure src='media/home.jpg' caption='Home, sweet home'>
```

You'll see this error when building your site:

```bash
got positional parameter 'XXX'. Cannot mix named and positional parameters
```

To solve this problem, simply use double quotation marks ("").