---
title: Pagedown Error Shooting
date: 2020-03-26T11:15:17-04:00
author: Hongtao Hao
draft: false
slag: pagedown-error
toc: true
---

I am now trying to create my curriculum vitae using [Pagedown](https://github.com/rstudio/pagedown) by [Yihui Xie](https://yihui.org/). My Mac system is very old: I am still using OS XYosemite (10.10.5). Therefore, I face limitations on the version of R I can use. 

## Error when downloading Pagedown

When downloading pagedown, I tried the method recommended by the [Pagedown Homepage](https://github.com/rstudio/pagedown), i.e., `remotes::install_github('rstudio/pagedown')` but this does not work for me. There will always be errors.

It will tell me that:

```R
These packages have more recent versions available.
Which would you like to update?

...

Enter one or more numbers, or an empty line to skip updates:
```

I entered an empty line, then it said:

```R
Installing 1 packages: websocket
Error: Failed to install 'pagedown' from GitHub:
  (converted from warning) unable to access index for repository https://cran.rstudio.com/bin/macosx/mavericks/contrib/3.3:
  cannot download all files
```

So I gave up. 

Then I tried the traditinal way of downloading packages in Rstudio, `install.packages("pagedown")`. It worked well. 

```R
Package which is only available in source form, and may need compilation of
  C/C++/Fortran: 'websocket'
Do you want to attempt to install these from sources?
y/n:
```
I input `y`, and then it worked. 

Thanks. 

## Error when Knitting

I could not reproduce the problem now, but there seemed to be something wrong with my Pandoc version. I tried [this](https://pandoc.org/installing.html#macos) method (using homebrew), but it did not work for me, probabily because of my old Mac OS version. I also tried simply downloaded the latested installer for macOS, but still, it did not work: ever after installing the latest version, when I typed `pandoc --version` in my Terminal, it still showed the old version number. 

I then went to [Pandoc Releases](https://github.com/jgm/pandoc/releases), and downloaded [pandoc-2.9.2.1-macOS.zip](https://github.com/jgm/pandoc/releases/download/2.9.2.1/pandoc-2.9.2.1-macOS.zip) and dragged the `pandoc` and `pandoc-citeproc` into my `/user/local/bin`[^1], but still, the terminal showed that I am using the old version, and Pagedown did not work. 

Then I took a closer look at what the Terminal says. It says my pandoc document is located in a place rather than `/user/local/bin`. That is the problem. So I dragged the the two files to the right location, and this time, it works. Terminal shows that I have the latest version of pandoc, and pagedown also worked. 

## Error when rendering pagedown file

When I clicked `Knit`, it worked. However, when I clicked the output `.html` file, it did not show anything on Firefox. Thanks to [an answer](https://github.com/rstudio/pagedown/issues/103#issuecomment-583778685) in one of the Pagedown Github issues, I solved the problem. Simply changed `self_contained:false` to 'self_contained:true' solved the problem. 

Now, I can use Pagedown. Thanks for Yihui and other contributors. 

[^1]: By the way, if you still do not know how to open `/user/local/bin` on your Mac, just try `open -a Finder /usr/local/bin` in your terminal. 