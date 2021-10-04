---
title: How to Update Pandoc for Rmarkdown And Bookdown
date: 2020-08-09T09:54:22-04:00
author: Hongtao Hao
slug: updating-pandoc
draft: false
toc: false
---

Rmarkdown and Bookdown are highly reliant on Pandoc. Sometimes, issues may happen when Rstudio is using an older version of Pandoc even if you have downloaded the newest version, as was discussed [here](https://community.rstudio.com/t/how-to-make-r-markdown-use-an-updated-version-of-pandoc-on-my-mac/19923).

## Yihui's Solution

Yihui provided [a solution](https://community.rstudio.com/t/how-to-make-r-markdown-use-an-updated-version-of-pandoc-on-my-mac/19923/4): to put the newest version of pandoc into `/usr/local/bin`. How to do it?

First of all, you need to install the updated version of Pandoc you want. Remember the path where it is installed. If you installed in the past and have forgot where it was installed, there are two ways:

1. Open a new `Terminal` (type `cmd+n` if you are currently using `Terminal`), first type `pandoc --version`. If the version is waht you want, then input `which pandoc`. The path of this version of Pandoc will be shown. How to open it?

It's easy. If the path is `A/B/C/pandoc`, then input `open -a Finder A/B/C` and find the `pandoc` and `pandoc-citeproc` from there. 

 2. Search "Pandoc" in Spotlight Search. 

 After knowing where the desired `Pandoc` is located, then you just need to copy `pandoc` and `pandoc-citeproc` and paste them into `/usr/local/bin`.

 But how to open `/usr/local/bin`?

 Go back to your `Terminal`, and type `open -a Finder /usr/local/bin`.

I have to say that I didn't verify whether the way suggested by Yihui will work. 

## My Solution

My solution was inspired by [the post above](https://community.rstudio.com/t/how-to-make-r-markdown-use-an-updated-version-of-pandoc-on-my-mac/19923).

First, you need to check the version of `Pandoc` that is used by Rstudio. Simply input `/Applications/RStudio.app/Contents/MacOS/pandoc/pandoc -v`[^1] in your terminal, as suggested by [Andrea](https://community.rstudio.com/t/how-to-make-r-markdown-use-an-updated-version-of-pandoc-on-my-mac/19923). If the output shows that Rstudio is using an older version of `Pandoc` rather than the new version you just downloaded, then you can do the following to manually upgrade it. 

Simply use `open -a Finder /Applications/RStudio.app/Contents/MacOS/pandoc/` to open the folder where `Pandoc` used by Rstudio is stored. Copy the new `Pandoc` (by `open -a Finder A/B/C`, the code in the first step of Yihui's solution, as shown above.) and paste it to `/Applications/RStudio.app/Contents/MacOS/pandoc/`.

It should work. 

However, as Yihui also noted [here](https://community.rstudio.com/t/updated-pandoc-now-getting-an-error-when-i-knit-dyld-lazy-symbol-binding-failed/47692/4). Pandoc 2.9. x or higher versions might not work for lower version of MacOS.

[^1]: Of course, you can also use `rmarkdown::pandoc_version()` in Rstudio to see the pandoc version used by Rstudio. 


