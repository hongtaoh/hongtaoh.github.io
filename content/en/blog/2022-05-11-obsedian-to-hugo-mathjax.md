---
title: "Convert MathJax in Obsedian to MathJax in Hugo"
date: 2022-05-11T16:23:53-05:00
author: "Hongtao Hao"
slug: obsedian-mathjax-hugo-convert
draft: false
toc: false
---
In Obsedian, you just use:

{{<figure src="/media/enblog/mathjax-obsedian.png" width="240">}}

But in Hugo, you need to use:

{{<figure src="/media/enblog/mathjax-hugo.png" width="250">}}

Note that if it's this:

{{<figure src="/media/enblog/mathjax.png" width="300">}}

Then Obsedian and Hugo are the same. 

So, how to convert MathJax in Obsedian to that in Hugo?

Use python. 

```python
import re 

f = open('yourfile.md', 'r')
txt = f.read

txt = txt = re.sub(r' \$', ' `$', txt)
txt = re.sub(r'\$ ', '$` ', txt)
with open('txt.md', 'w') as f:
    f.write(txt)
```

The output file of `txt.md` won't be perfect. You still need to manually change something. But that's much better than manually change all of the signs, especially if you have a lot of math expressions. 