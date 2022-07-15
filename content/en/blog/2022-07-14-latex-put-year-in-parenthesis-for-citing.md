---
title: "Latex: Put Year in Parenthesis for Citing"
date: 2022-07-14T20:05:47-05:00
author: "Hongtao Hao"
slug: latex-year-in-parenthesis
draft: false
toc: false
tags: latex
---
To put year in parenthesis when citing in LaTex using APA format, for exmaple, `According to Goodguy (1990), blablabla...`, we can use this:

```
\newcommand{\citeauthorandyear}[2][]{
   \citeauthor{#2} (\citeyear[#1]{#2})
}
```

This solution is by [Felix K.](https://tex.stackexchange.com/a/199909). 