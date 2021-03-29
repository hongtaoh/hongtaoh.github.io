---
title: How to Block CuteStat in a Hugo Website
date: 2020-06-20T10:15:27-04:00
author: Hongtao Hao
slug: blocking-cutestat
draft: false
toc: true
---

[CuteStat](https://www.cutestat.com/) can be really annoying. When I first built my website, and searched my name in Google, `mydomain.cutestat.com` appeared on top of the resarch restults and it was so ugly!

How can we block CuteStat from crawliing our websites?

A direct way to do this is to go to the bottom of [CuteStat](https://www.cutestat.com/), and open [Update or Remove](https://www.cutestat.com/remove).

CuteStat asked us to add a `robots.txt` file in our website with the following codes:

```txt
User-agent: CuteStat
Disallow: /
```

The problem is how and where to put this file in Hugo?

## Settting `config.toml` And Creating `robots.txt`

Hugo has [an answer](https://gohugo.io/templates/robots/):

In your [configuration file](https://gohugo.io/getting-started/configuration/), add this[^1]:

```toml
enableRobotsTXT = true
```

Then, open you text editor like Sublime Text and create a file named `robots.txt` with these codes:

```txt
User-agent: CuteStat
Disallow: /
```

When it's done, put it as `/layouts/robots.txt` or `/themes/<THEME>/layouts/robots.txt`, as Hugo's [official guideline](https://gohugo.io/templates/robots/#robotstxt-template-lookup-order) suggests. 

## Removing Data on CuteStat

Then, go back to CuteStat's [Update or Remove](https://www.cutestat.com/remove), input your domain name and chose "Remove Information". CuteStats now won't be able to crawl your website anymore. 

Hope it works for you. 

[^1]: I assumed that your config file is a `toml` file. 