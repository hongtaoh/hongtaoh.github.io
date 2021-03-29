---
title: "How to Tell Hugo Not to Parse HTML"
date: 2020-11-02T16:09:25-05:00
author: Hongtao Hao
slug: avoid-parsing-html
draft: false
toc: false
---

I found the solution [here](https://stackoverflow.com/a/42528669) by [Hissatsu](https://stackoverflow.com/users/7592858/hissatsu). You can use [encode](http://coderstoolbox.net/string/#!encoding=xml&action=encode&charset=us_ascii) to convert `XML` to `US-ASCII`.

For example:

&lt;p&gt;I do not want to show this content.&lt;/p&gt;

However, if you encode multiple lines, you'll find that the output will be only one line. You can solve this problem by adding `</br>` at the end of each line except the last line.

For example, if I want the output to be this:

{{&lt;  block class=&quot;note&quot;  &gt;}} </br>
This is a note. </br>
{{&lt; end &gt;}}

I'll use this:

```
{{&lt;  block class=&quot;note&quot;  &gt;}} </br>
This is a note. </br>
{{&lt; end &gt;}}
```


