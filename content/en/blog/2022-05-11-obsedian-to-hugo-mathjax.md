---
title: "Convert MathJax in Obsedian to MathJax in Hugo"
date: 2022-05-11T16:23:53-05:00
author: "Hongtao Hao"
slug: obsedian-mathjax-hugo-convert
draft: false
toc: true
---
In Obsedian, you just use:

{{<figure src="/media/enblog/mathjax-obsedian.png" width="240">}}

But in Hugo, you need to use:

{{<figure src="/media/enblog/mathjax-hugo.png" width="250">}}

Similary, 

```
$$Something here$$
``` 

needs to become 

```
`$$Something here$$`
```

Then Obsedian and Hugo are the same. 

## Mathjax

So, how to convert MathJax in Obsedian to that in Hugo?

We can use Python. 

```python
import re 

# reaf file
f = open('yourfile.md', 'r')
txt = f.read()

# this line is from 4castle: https://stackoverflow.com/a/38645273
txt = re.sub(r'\$([^$]*)\$', r'`$\1$`', txt)

txt = re.sub(r'`\$\$`([^$]*)`\$\$`', r'`$$\1$$`', txt)
with open('txt.md', 'w') as f:
    f.write(txt)
```

I'll explain line by line. 

```
re.sub(r'\$([^$]*)\$', r'`$\1$`', txt)
```

What this line does is to replace the pair of dollar sign with ``$$``. Try that on `txt = "$I want to do that$"` and you'll know that. 

The problem is that the above pattern does not work for string like this: 

```
$$I want to do that$$
```

will become

```
`$$`I want to do that`$$`
```

To solve the problem, we apply:

```
re.sub(r'`\$\$`([^$]*)`\$\$`', r'`$$\1$$`', txt)
```

## Images

Obsidian uses a different image importing method. Its format is like this:

```
![[hori-verti.png]]
```

But we want it to be like this in Markdown:

```
![](images/hori-verti.png)
```

This is a trivial task:

```python
txt = "![[hori-verti.png]]"

# replace ![[ with ![](/image/
txt = re.sub(r'!\[\[', '![](/image/', txt)
# replace ]] with )
txt = re.sub(r'\]\]', ')', txt)
```

<!-- ```
f = open('LA.md', 'r')
txt = f.read()
txt =  re.sub(r'\$([^$]*)\$', r'`$\1$`', txt)
txt = re.sub(r'`\$\$`([^$]*)`\$\$`', r'`$$\1$$`', txt)
txt = re.sub(r'!\[\[', '![](/media/enblog/la/', txt)
txt = re.sub(r'\]\]', ')', txt)
with open('txt.md', 'w') as f:
    f.write(txt)
``` -->

## Script

This is the script:

```py
import re 

# the input obsedian file name
input_fname = 'calc.md'

# output file name
output_fname = 'txt.md'

# image directory
image_dir = '/media/enblog/calc-pics/'

# reaf file
f = open(input_fname, 'r')
txt = f.read()

# this line is from 4castle: https://stackoverflow.com/a/38645273
txt = re.sub(r'\$([^$]*)\$', r'`$\1$`', txt)

txt = re.sub(r'`\$\$`([^$]*)`\$\$`', r'`$$\1$$`', txt)

# replace ![[ with ![](/image/
txt = re.sub(r'!\[\[', f'![]({image_dir}', txt)
# replace ]] with )
txt = re.sub(r'\]\]', ')', txt)

with open(output_fname, 'w') as f:
    f.write(txt)
```