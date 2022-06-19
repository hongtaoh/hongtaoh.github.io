---
title: Bookdown 和 ElegantBookdown 使用心得
date: 2020-05-26T16:00:21-04:00
author: 郝鸿涛
slug: bookdown-tips
draft: false
toc: true
tags: 编程
---

最近的一周一直在调试 [Bookdown](https://github.com/rstudio/bookdown)。其实，Bookdown 本身并不难，[益辉大神](https://yihui.org/) 在他的那本 [bookdown: Authoring Books and Technical Documents with R Markdown](https://bookdown.org/yihui/bookdown/) 已经介绍的非常清楚。我一直在调试的、也是我一直不会的主要集中在 PDF 的样式上，比如：

1. PDF 中的 "Chapter 1" 如何改成「第一章」？

HTML 上改的话比较容易。如果你也是用的 [bookdown-demo](https://github.com/rstudio/bookdown-demo) 来开始的话，那么在根目录下找到 `_bookdown.yml` 这个文档，然后把 `chapter_name: "Chapter "` 改成 `chapter_name: ["第 ", " 章"]`[^1] 就好了。

注意，这里标点是英文的。汉字和第二个英文引号之间有一个英文空格，是为了让版面更漂亮一些。不加空格的话，就是 「第N章」，加上空格就是「第 N 章」，所以还是加上吧。

但是，PDF 中还是显示 「Chapter N」。我知道肯定能改，但我感觉比较困难，所以就放弃了。虽然可能只是在 `preamble.tex` 里加一行代码的事，但我可能要花几天的时间才能知道那行代码是啥。果断放弃。

2. PDF 的空白页如何删除？

3. PDF 如何上每一页的文本对齐，而非 bookdown 预设的那样一左一右？

4. PDF 中如何更改中文引语的字体？

等等。

我知道是我要求太苛刻了。Bookdown 原本主要是为网页版书籍准备的，而非 PDF 版。因此，[Bookdown 官网](https://bookdown.org/) 上摆出的那些书籍中，有一些根本就没有把 PDF 版放上去。

不过，随后找到了 由黄湘云、叶飞两位在 [ElegantBook](https://github.com/ElegantLaTeX/ElegantBook) 基础上制作的 [ElegantBookdown](https://github.com/XiangyunHuang/ElegantBookdown)，实在是帮到我好多。

有了 ElegantBookdown 的模版，事情就轻松多了。不过我还是为一些小问题伤透了脑筋，下面主要是介绍一下我使用 ElegantBookdown 的心得。

## `index.Rmd` 哪些能改哪些不能改？

{{<block class="note">}}
[perlatex](https://github.com/perlatex) [通过 GitHub issue 提出了这个问题](https://github.com/XiangyunHuang/ElegantBookdown/issues/18)，叶飞老师给出了[解决方法](https://github.com/XiangyunHuang/ElegantBookdown/issues/18#issuecomment-804270165)。

此外，感谢[叶飞老师](https://github.com/fyemath)还专门到我的博客通知了一声: [删除 elegantbookdown 里的定理定义环境](https://github.com/hongtaoh/hongtaoh.github.io/issues/1)。
{{<end>}}

ElegantBookdown 中，`index.Rmd` 最不好修改。其他几个都只有内容，但 `index.Rmd` 中有很多参数设置。

我先说 `index.Rmd` 中的内容。

`\mainmatter` 要留下。如果没有这个，PDF 中就没有「第 1 章」、「第 2 章」 这样的标题了。

`\mainmatter` 往下所有的内容中，如果一下子全部删除，会出现如下错误：

```R
Error in start_row:end_row : argument of length 0
Calls: <Anonymous> ... render_new_session -> <Anonymous> -> <Anonymous> -> post
Execution halted

Exited with status 1.
```

那是说我们所有东西都不能删吗？肯定不是，不然 ElegantBookdown 谁也没法用了。

我一个个试过之后，发现，只有下面这几行代码不能删除[^2]：

```R
```{lemma, chf-pdf}
For any two random variables $X_1$, $X_2$, they both have the same probability distribution if and only if
$$\varphi _{X_1}(t)=\varphi _{X_2}(t)$$
```
那可咋办？

首先，代码中的内容是可以删除的，但是 `{lemma, chf-pdf}` 无法删除是事实。

然后怎么办？

有一个办法是，到 `_bookdown.yml` 这个文件，把 `lem: "引理 "` 中的「引理」改成你想改的名字。也就是说，肯定要有个内容，你可以改成你需要的标题，比如 「提示」、「注意」、「备注」等等，根据自己的需要改就好。

但有个问题：这个修改只能在 HTML 结果中显示出来，PDF 还是显示 「引理 0.1」。咋办？

我的解决办法是直接把上面 `lemma` 改成了 `remark`，这样结果中是「注」，而且也没有标数字，我很满意了。

如果你不满意这个解决方案，可能就要自己找一下如何在 PDF 版中修改诸如 `lemma`, `remark`  等预设好的中文对应词了。我暂时没有解决方案。

其次，我是直接把下面这几行删除了：

```R
bibliography: 
 - book.bib
 - packages.bib
```

没什么问题。

如果你没有表格、图，或者不想在 PDF 中放这些，可以直接把 `lot`, `lof` 后的 `yes` 去掉。

根据谢益辉的 [说明](https://bookdown.org/yihui/bookdown/publishers.html), 这里 lot 表示 List of Tables, lof 表示 List of Figures. 

其他内容根据自己的情况修改就好，至少在 HTML 和 PDF 版中没有太大影响。最末尾的 epub 内容，如果你要提供 epub 格式的文档，最好还是修改一下。

`index.Rmd` 修改这部分我就讲到这里。

## PDF 的中文字体怎么改？

在不修改 `ElegantBookdown` [原文档](https://github.com/XiangyunHuang/ElegantBookdown) 中的 `preamble.tex` 的情况下，我直接点 Rstudio 中的 `Build Book`，结果显示错误，大意是说找不到 Adobe Song Std 和其他 Adobe 字体。

我用的是 Macbook Air。如果你也是，那么解决方法很简单，只需要把 Adobe 字体替换成相应的苹果电脑自带字体就好，

| Adobe            | Apple 自带       | 
| -----------------|:---------------:| 
| Adobe Song Std   | STSong 或 Songti SC| 
| Adobe Heiti Std  | STHeiti 或 Heiti SC| 
| Adobe Fangsong Std| STFangsong        | 
| Adobe Kaiti Std| STKaiti 或 Kaiti SC  | 

也就是说，把下面 ElegantBookdown 原本的代码中的 Adobe 字体替换成相应的 Apple 自带字体：

```R
% 字体设置
\setCJKmainfont[BoldFont={Adobe Heiti Std},ItalicFont={Adobe Kaiti Std}]{Adobe Song Std} 
\setCJKsansfont[BoldFont={Adobe Heiti Std},ItalicFont={Adobe Heiti Std}]{Adobe Heiti Std} 
\setCJKmonofont[BoldFont={Adobe Heiti Std},ItalicFont={Adobe Heiti Std}]{Adobe Fangsong Std} 

\setCJKfamilyfont{zhsong}{Adobe Song Std}
\setCJKfamilyfont{zhhei}{Adobe Heiti Std} 
\setCJKfamilyfont{zhkai}{Adobe Kaiti Std} 
\setCJKfamilyfont{zhfs}{Adobe Fangsong Std}
```

你当然也可以去 [Adobe Fonts 的Github 官网](https://github.com/adobe-fonts) 下载[思源宋体](https://github.com/adobe-fonts/source-han-serif/tree/release) 和 [思源黑体](https://github.com/adobe-fonts/source-han-sans/tree/release)。然后按上面的方法替换。不过没有太大的区别。


## PDF 中，中文引语的字体怎么改成和正文不一样的字体？

很简单，如果上面关于字体的代码你都没有删除的话，只需要加两行代码：

```tex
\usepackage{csquotes}
\AtBeginEnvironment{quote}{\CJKfamily{zhkai}}
```

我是把引语改成了楷体，你当然可以改成别的你喜欢的字体。

真的是「一行代码千行泪」啊。为了这两行代码我苦苦找了很久。

这个解决方法是我在 Stackoverflow 的 [这个回答](https://tex.stackexchange.com/a/288556) 中看到的。谢谢回答者 [Torbjørn T](https://tex.stackexchange.com/users/586/torbj%c3%b8rn-t).

## PDF 中正文字体的字号怎么改？

也很简单：

```tex
\setCJKmainfont[Scale=1.5]{STSong}
```

这个解决方法是我在 Stackoverflow 的 [这个回答](https://tex.stackexchange.com/questions/258434/changing-chinese-font-size) 中看到的。谢谢回答者 [Zelphir Kaltstahl](https://tex.stackexchange.com/users/92107/zelphir-kaltstahl).

### 有个问题是，那引用部分的字号怎么改？

用上面的方法似乎不管用了。不过，可以用这个方法：

```tex
\AtBeginEnvironment{quote}{\CJKfamily{zhkai}\large}
```

Latex 的十种字体大小使用方法请看[这里](https://www.sascha-frank.com/latex-font-size.html)。

## PDF 中的行间距怎么调整？

一开始，试着用 [texblog](https://texblog.org/2011/09/30/quick-note-on-line-spacing/) 上一篇 [Quick note on line spacing](https://texblog.org/2011/09/30/quick-note-on-line-spacing/) 提到的方法，但是不行。

后来看到了名为[始终](https://liam.page/) 的博主专门介绍行距的 [这篇帖子](https://liam.page/2013/10/17/LaTeX-Linespace/)。他已经提到了正确的方法，但比较隐蔽，还是不会用。

后来终于在 [这篇帖子](http://blog.sina.com.cn/s/blog_5e16f1770100ns4r.html) 中找到了方法：

```tex
\renewcommand{\baselinestretch}{1.5} % 行间距
```

## PDF 中的字间距怎么调整？

上面 [那篇](http://blog.sina.com.cn/s/blog_5e16f1770100ns4r.html) 帖子提到的 `\renewcommand{\CJKglue}{\hskip 1pt plus 0.08\baselineskip}` 这个办法我试了不管用。

不过后来在 [潘建瑜](http://math.ecnu.edu.cn/~jypan/intro_c.html?language=1&id=95) 老师的 [一篇 CTeX 介绍 PPT](http://math.ecnu.edu.cn/~jypan/Latex/lect/lect05CTeX.pdf) 中找到了方法：

```tex
\ziju{1.0}
```
其实，这个答案在 [这里](http://m.newsmth.net/article/TeX/321611) 已经有了，但是那位答主并没有说清楚 `\ziju` 这个命令具体怎么用，所以我错过了。

## 如何修改 HTML Output 中正文的字号？

[这里](https://stackoverflow.com/questions/40215141/bookdown-how-can-i-change-the-size-of-the-chapter-titles) 提到了如何修改标题的字号，但是并没有提到如何修改正文的字号。

我后来在 [这个 GitHub Issue](https://github.com/rstudio/bookdown/issues/846) 的问题中找到了解决方法：在 Bookdown 文件夹的根目录下的 `style.css` 中，加入如下代码：

```css
p{
  font-size: 12pt; /* 或者其他字号，根据自己的情况来改
}
```

第一个答案虽然没成功，但我意外发现，在 `style.css` 中加入下面这行代码可以改变 HTML Output 中左侧 (side bar) 的字号：


```css
.book{
  font-size:16pt;
}
```

大家可以试下，下行代码会是什么结果：

```css
body{
  font-size:16pt;
}
```

揭晓答案：和 `.book{}` 一样的效果，改变的是左侧栏的字号。

## LateX 资料

有几个非常好的 Latex 资料。其实，处理中文，主要用到 `CTeX` 和 `xeCJK` 这两个包。

1. [CTeX 宏集手册 2020年版](http://mirrors.ibiblio.org/CTAN/language/chinese/ctex/ctex.pdf)；

2. [xeCJK 宏包文档 2020年版](http://mirrors.ibiblio.org/CTAN/macros/xetex/latex/xecjk/xeCJK.pdf)；

如果你是想快速学一下 LaTeX, 可以看看 [《简单粗暴 LaTeX》](http://static.latexstudio.net/wp-content/uploads/2017/08/Note-by-LaTeX-cn.pdf)。最新版请关注该项目的 [GigHub Repo](https://github.com/wklchris/Note-by-LaTeX)。

如果你需要用到很多 LaTeX, 可以考虑在线版的 [Overleaf](https://www.overleaf.com/)，可以省却很多自己下载超大的 TeX 的麻烦。如果你只是在 R 中偶尔用，那么谢益辉的 [TinyTex](https://yihui.org/tinytex/) 就够用了。

[^1]: 这行代码来自 [ElegantBookdown](https://github.com/XiangyunHuang/ElegantBookdown)。在此表示感谢黄湘云、叶飞两位作者。
[^2]: 也有可能是 「已有 Block {#theorem-block}」这个板块中必须要留一个，只是因为我的删除顺序，才出现只有第一段代码必须保留的情况。这个我就不去重新试验了，读者有空可以自己试试。


