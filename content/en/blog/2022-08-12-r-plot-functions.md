---
title: "How to Plot Curves for Functions in R"
date: 2022-08-12T05:57:40-05:00
author: "Hongtao Hao"
slug: plot-r-funciton-curves
draft: false
toc: false
tags: tutorial
---

```
y <- function(x) {
  x^2
}

curve(y, from=1, to=50, xlab='x', ylab='y')
```

```
y <- function(x) {2^x}
curve(y, from=1, to=10, xlab="x", ylab="y")
```

The above codes are from https://stackoverflow.com/a/26091375.