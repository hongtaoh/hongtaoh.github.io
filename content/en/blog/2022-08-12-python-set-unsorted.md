---
title: "Attention: Python Set is Changing From Time to Time"
date: 2022-08-12T05:57:27-05:00
author: "Hongtao Hao"
slug: python-set-unsorted
draft: false
toc: false
tags: tutorial
---
I just learned this several days ago: set in python is unsorted and changes from time to time. 

For example:

```python
a = ['a', 'b', 'b', 'c', 'd', 'd', 'e']
set(a)
```

If you run the codes twice (in two different notebooks or scripts), the results are different. To solve this problem:

```py
ls = list(set(a))
ls.sort()
ls
```