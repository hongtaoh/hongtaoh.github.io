---
title: "Julia Plots: How to Do Without Legends"
date: 2021-11-06T09:46:04-05:00
author: "Hongtao Hao"
slug: julia-plots-no-legends
draft: false
toc: false
---

Just pass `label = nothing`:

```
x = 1:6; y = rand(6, 2)
plot(x, y, label = nothing)
```

I learned the trick from [here](https://stackoverflow.com/a/61651299).
