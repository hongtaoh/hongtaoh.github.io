---
title: Continous Local Preview in Blogdown
date: 2020-08-24T17:03:35-04:00
author: Hongtao Hao
slug: blogdown-continous-local-preview
draft: false
toc: false
---
Yihui talked about local preview in Blogdown [here](https://bookdown.org/yihui/blogdown/workflow.html) and [here](https://bookdown.org/yihui/blogdown/local-preview.html), but they were not very straightforward. 

How to do it then?

Basically, you only need to `Serve Site` once. In the drop list of `Addins`, choose `Serve Site`. Later, when you make changes in your `.Rmd` files, you just need to save the changes by `Command + S` (in Mac) or clicking the `Save` button in Rstudio. These changes will be updated automatically. You don't need to shut the Rstudio down and restart it at all. 

{{<figure src="/media/enblog/save-and-serve.png" title="Save and Serve Site in Blogdown" width="650">}}


It's not limited to changes in the body of the post. I tried changes in `title`, and `author`[^1] and changes in these two areas will also be shown. However, changes in `slug` didn't update. I didn't try changes in `date`. 

[^1]: It depends on your own YAML setting, of course. 