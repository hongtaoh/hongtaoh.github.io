---
title: "Why You Want to Use Log Scale When Visualizing Ratios?"
date: 2021-10-09T20:50:39-05:00
author: "Hongtao Hao"
slug: log-scale-for-ratio
draft: false
toc: false
---
When you visualize ratios, naturally, the reference point is 1. Let's say you want to visualize the ratios between *a* and *b*.

Let `$a = 10$` and `$b = \frac{1}{10}$`. 

Then, we have

`$$\frac{a}{b} = \frac{10}{\frac{1}{10}} = 100 \tag{1}\label{eq1}$$` 

and

`$$\frac{b}{a} = \frac{\frac{1}{10}}{10} = \frac{1}{100} \tag{2}\label{eq2}$$` 

If you do not use log scale, then the difference between 1 and `$\frac{a}{b}$` is much larger than the difference between 1 and `$\frac{b}{a}$`. However, intuitively, the two differences should be the same, right? Using log scale solves this issue. 