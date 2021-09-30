---
title: How to Install and Upgrade Hugo on Mac
date: 2020-01-29T11:05:22-05:00
author: Hongtao Hao
---
I am only talking about installing and upgrading Hugo on mac in this post. A very important guide is the Hugo's [official tutorial on installing Hugo](https://gohugo.io/getting-started/installing/#macos). Homebrew is the easiest way. I did not use this method simply because my MacOS version is so old that I could not install and upgrade Hugo through Homebrew. If you are like me, you can read on. 

I chose the second method, which is called "Tarball" in Hugo's [tutorial](https://gohugo.io/getting-started/installing/#macos). However, the instructions in this tutorial are **way more complicated than it should be**. That's why I am writing about it here. 

In fact, there are only two steps:

1. Go to the page of [official Hugo release](https://github.com/gohugoio/hugo/releases) where you can find the latest version of Hugo. And then download the file of [hugo_0.70.0_macOS-64bit.tar.gz](https://github.com/gohugoio/hugo/releases/download/v0.70.0/hugo_0.70.0_macOS-64bit.tar.gz)[^1].

2. Open Terminal, and type `open -a Finder /usr/local/bin`[^2]. This will open the folder of `/usr/local/bin`. Then drag the `hugo` file in `hugo_0.70.0_macOS-64bit` that you just downloaded and unzipped into the `/bin` folder. If you are upgrading, just replace the old one. 

If you don't have `/usr/local/bin`, you can first go to `/usr/local` and create the `bin` folder by yourself.  

To make it clearer, this is where you should place the `hugo` file:

```bash
└── local
    └── bin
        └── hugo
```


[^1]: This is just for an example. Hugo version number is changing as it gets upgraded. 
[^2]: Many thanks to the answer by "Westside guy" on [this](https://forums.macrumors.com/threads/how-do-you-find-folders-like-usr-local-bin-in-finder.99576/) post .