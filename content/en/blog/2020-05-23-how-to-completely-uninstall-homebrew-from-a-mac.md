---
title: How to Completely Uninstall Homebrew From a Mac
date: 2020-05-23T15:21:45-04:00
author: Hongtao Hao
slug: uninstall-homebrew-completely
draft: false
toc: false
---

My Macbook Air is pretty old[^1], so I cannot put up with any useless files that take up a lot of space. 

When installed, Homebrew takes up over 400MB. That's a lot of space, at least for me. 

I installed Homebrew and then I wanted to delete it. So I went to `/usr/local/bin/`. I was lost. I couldn't know which files to delete. Since `/usr/local/bin/` is a hidden folder on Mac, I don't want to mess up with it. However, my urge to delete files I don't need to use was so strong that I ended up deleting all files except for `bin` in this folder[^2]. 

Out of idol curiosity, and a desire to make sure I didn't delete any important files, I want to check what files will be created when I install Homebrew. 

Here is the result:

{{<figure src="/media/enblog/uninstall-homebrew-before.png" title="Before installation">}}

{{<figure src="/media/enblog/uninstall-homebrew-after.png" title="After installation">}}

So, installing Homebrew has created all the files except for the `/bin` folder. Also, it has created a `brew` within the `/bin` folder.

To uninstall Homebrew, the official method is to run [this](https://github.com/homebrew/install#uninstall-homebrew) following command in your Terminal:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall.sh)"
```

First, you need to confirm your wish to uninstall:

```bash
Warning: This script will remove:
/Users/Tal/Library/Caches/Homebrew/
/usr/local/Caskroom/
/usr/local/Cellar/
/usr/local/bin/brew -> /usr/local/bin/brew
Are you sure you want to uninstall Homebrew? This will remove your installed packages! [y/N] 
```

Input `y` if you are sure. Then the following messages will appear in Terminal:

```bash
==> Homebrew uninstalled!
The following possible Homebrew files were not deleted:
/usr/local/.com.apple.installer.keep
/usr/local/Homebrew/
/usr/local/bin/
/usr/local/etc/
/usr/local/share/
/usr/local/var/
You may wish to remove them yourself.
```

{{<figure src="/media/enblog/uninstall-home-brew-terminal.png" title="Messages in Terminal">}}

First of all, how can we access the hidden `usr/` folder? 

Type this following line in your Terminal:

```bash
open -a Finder /usr/local/
```
You can delete the following files as specified above:

```bash
usr/local/Homebrew/
/usr/local/etc/
/usr/local/share/
/usr/local/var/
```
However, you SHOULD NEVER delete `/usr/local/bin/`! 

I didn't check how much spece these files take up, but deleting files I know I don't need makes me happy. 


[^1]: I bought it back in 2015.
[^2]: This is too reckless. I don't recommend you to be like this. 