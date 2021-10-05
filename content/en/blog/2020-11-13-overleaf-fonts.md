---
title: How to Use Different Fonts on Overleaf
date: 2020-11-13T10:07:19-05:00
author: Hongtao Hao
slug: overleaf-latex-fonts
draft: false
toc: true
---
## Two steps

Using different fonts is much easier than I thought. It involves two steps:

1. Change the **Compiler** from `LaTex` or `pdfLatex` to either `XeLaTex` or `LuaLaTex`. To make this change, click the **Menu** button on the upper-left corner of your Overleaf project. In `Settings`, you'll see a drop list in `Compiler`. 

2. Add these two lines:

```latex
\usepackage{fontspec}
\setmainfont{Choose Your Own Font}
```

Where to find the fonts that were supported via `fontspec`? Read [this list](https://www.overleaf.com/learn/latex/Questions/Which%20OTF%20or%20TTF%20fonts%20are%20supported%20via%20fontspec%3F), which I think is quite comprehensive. It contains many modern fonts, including those you can find in Google fonts. 

## Several fonts in a document

According to [this post](https://www.overleaf.com/learn/latex/XeLaTeX), instead of using `\setmainfont{Choose Your Own Font}`, you can do this:

```latex
\setromanfont{first font choice}
\setsansfont{second font choice}
\setmonofont{third font choice}
```

The second choice can be activated by `\ssfamily`, and the third by 
```
\begin{verbatim}
...
\end{verbatim}
``` 
Read [this post](https://www.overleaf.com/learn/latex/XeLaTeX) for more info. 

## Your own fonts
If your favorate font is not found [the list](https://www.overleaf.com/learn/latex/Questions/Which%20OTF%20or%20TTF%20fonts%20are%20supported%20via%20fontspec%3F), you can refer to [this post](https://www.overleaf.com/learn/latex/XeLaTeX) to upload and your own fonts. 