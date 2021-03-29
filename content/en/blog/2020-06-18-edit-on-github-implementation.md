---
title: How to Implement Edit This Page on Github for a Hugo Website
date: 2020-06-18T11:10:20-04:00
author: Hongtao Hao
slug: implement-edit-on-github
draft: false
toc: false
---

I saw this quesiton on [this thread](https://discourse.gohugo.io/t/how-to-implement-edit-this-page-on-github/1166) but the answer by [bep](https://discourse.gohugo.io/t/how-to-implement-edit-this-page-on-github/1166/2) did not solve the problem. 

The solution can be found in Yihui Xie's book of [Blogdown](https://bookdown.org/yihui/blogdown/templates.html#how-to).

However, when I tried the block of codes recommended by Yihui, I still couldn't implement this function of editing on GitHub:

```
{{ with .File.Path }}
<a href="https://github.com/.../{{ . }}">Edit this page</a>
{{ end }}
```
I tried the second block of codes on Yihui's book, and it works. 

The key trick is that you need to add `{{ $.Scratch.Set "FilePath" .File.Path }}` to the codes above. 

I'll summarize the solution here.

First of all, go to the GitHub repo of your website and open a post. For example, for me, I will go to [this page](https://github.com/hongtaoh/hongtaoh.github.io/tree/sources/content/en/blog) and open a post (it does not matter which post you choose to open). For example, I'll open [this post](https://github.com/hongtaoh/hongtaoh.github.io/blob/sources/content/en/blog/2020-06-14-terminal-command-basics.md).

Then, on top of this post, you can see this:

{{<figure src="/media/enblog/github-edit.png">}}

Click the "pen" and now you are viewing the "editing" page. Look at the url in your browser and you can find it should be something like this: `https://github.com/USER/REPO/edit/BRANCH/PATH/TO/FILE`[^1]. In the example I was showing above, the url shold be: `https://github.com/hongtaoh/hongtaoh.github.io/edit/sources/content/en/blog/2020-06-14-terminal-command-basics.md`.

Okay, now we will be implementing the "edit on GitHub" feature. 

1. If your website only contains `.md` files:

First, in your `config.toml`, add this:

```toml
[params]
GithubEdit = "https://github.com/USER/REPO/edit/"
```
**The above is just an example. You should use your own USER and REPO name.**

Also, the code above might be dependent on your `permalinks` setting in your `config.toml`. 

Here, please note that there might be replication in urls. For example, in [this project](https://github.com/hongtaoh/guoxinban), I have this:

```toml
[permalinks]
post = "/:year/:month/:day/:filename/"
```

Then the url of a post should be like `https://mydomain/2017/08/30/amid-rising-hiv/`. It does not contain `post`. When I open the "pen" mentioned above in GitHub, the url is like this: `https://github.com/hongtaoh/guoxinban/edit/master/content/post/amid-rising-hiv.md`. It contains `post`.

Then, what should I put in the `GithubEdit`? I tried `https://github.com/hongtaoh/guoxinban/edit/master/content/post`, but then I cliked the "Edit this page on GitHub" button in my website, the url had two `post`s. So I changed the `GithubEdit` to this: `https://github.com/hongtaoh/guoxinban/edit/master/content/`, and then it worked. 

Then, depending on where you want to add "edit this page on GitHub", add the following codes:

```html
<span>
        	{{ if .IsPage}} 
            {{ if .File.Path}}
            {{ $.Scratch.Set "FilePath" .File.Path }}
            {{ end }}
            {{ with .Site.Params.GithubEdit}}
            <a href='{{ . }}{{ $.Scratch.Get "FilePath" }}'>Edit this page on GitHub</a>
            {{ end }}
            {{ end }}
</span>
```
If you are not sure where to add this block of these codes, study these three websites and their GitHub repos closely by yourself: [Blogdown-repo](https://github.com/rbind/blogdown-demo), [my personal website](https://github.com/hongtaoh/hongtaoh.github.io), and [RUC International Journalism](https://github.com/hongtaoh/guoxinban).

If you want to customize the style of the words of "Edit this page on Github", you can use this in the above codes:

```html
<a href='{{ . }}{{ $.Scratch.Get "FilePath" }}' class="btn">Edit this page on GitHub</a>
```
A good example is the style on [Blogdown-demo](https://blogdown-demo.rbind.io/). [Here](https://github.com/rbind/blogdown-demo/blob/master/static/css/custom.css) is the CSS of this style.

If you want to use a icon rather than the words of "Edit this page on Github", study [my setting](https://github.com/hongtaoh/hongtaoh.github.io/blob/sources/themes/hugo-xmin/layouts/_default/single.html), or that on [Daijiang Li's personal website](https://github.com/rbind/daijiang/blob/master/layouts/partials/article_meta.html).

2. If your website also contains `.Rmd` file:

The setting in `config.toml` is the same. However, codes that should be in your `layouts` are different:

```html
<span>
        	{{ if .IsPage}} 
            {{ if .File.Path}}
            {{ $Rmd := (print .File.BaseFileName ".Rmd") }}
            {{ if (where (readDir (print "content/" .File.Dir)) "Name" $Rmd) }}
            {{ $.Scratch.Set "FilePath" (print .File.Dir $Rmd) }}
            {{ else }}
            {{ $.Scratch.Set "FilePath" .File.Path }}
            {{ end }}
            {{ with .Site.Params.GithubEdit}}
            <a href='{{ . }}{{ $.Scratch.Get "FilePath" }}'>Edit this page on GitHub</a>
            {{ end }}
            {{ end }}
            {{ end }}
</span>
```

In fact, no matter whether your website contains `.Rmd` files or not, you can use the above codes anyway...

You can also refer to [this repo](https://github.com/hongtaoh/hugo-tutorial).



Many thanks to Yihui's contributions. 



[^1]: This comes from Yihui's [Blogdown book](https://bookdown.org/yihui/blogdown/templates.html#how-to)


