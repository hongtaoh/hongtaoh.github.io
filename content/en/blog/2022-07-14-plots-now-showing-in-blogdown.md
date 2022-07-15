---
title: "Plots Now Showing in Blogdown"
date: 2022-07-14T20:12:10-05:00
author: "Hongtao Hao"
slug: blogdown-plots
draft: false
toc: false
tags: 
---

The plots were not showing in a hugo post by Blogdown. Following [Conor Neilson's suggestion](https://conorneilson.com/post/generated-plots-not-showing-in-blogdown/), I added this snippet at the start of my post and it solved the problem.

```{r setup, echo=FALSE}
knitr::opts_chunk$set(echo = TRUE, fig.path = "static")
```

Thank you so much Conor!
