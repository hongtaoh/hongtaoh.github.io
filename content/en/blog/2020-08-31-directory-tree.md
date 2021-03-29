---
title: How to Print Directory Trees on Mac
date: 2020-08-31T10:55:40-04:00
author: Hongtao Hao
slug: mac-directory-tree
draft: false
toc: true
---
I tried to simply the process as the original solution is still a little bit cumbersom. 

You can view the source codes of the GitHub Repository [here](https://github.com/hongtaoh/tree-1.8.0).

What you need to do is to first open a new `Terminal`, and 

```bash
cd Desktop # Navigate to Desktop where we'll be downloading the repo
git clone https://github.com/hongtaoh/tree-1.8.0 # Clone the repo
mv ~/Desktop/tree-1.8.0/tree /usr/local/bin/ # Move tree to /usr/local/bin
```
Done. 

You can generate the directory tree under the current directory. For example, 

```bash
cd tree-1.8.0
tree
```

or generate the directory by specifying the exact path following `tree`

```bash
tree /anywhere/you/like/
```

To remove `tree-1.8.0` from Desktop:

```bash
rm -rf tree-1.8.0
```

I shared my answer [here](https://superuser.com/a/1582072/1214665).

---
>You can still read the following instructions espeically you want to use only the codes from official sources for security reasons. 

I found a much better solution than [what I previously wrote](/en/2020/08/31/mac-directory-tree/#my-previous-solution). Many thanks to [Michael Page's post](https://techion.com.au/blog/2018/5/24/printing-hierarchical-directory-structures), [Shaun Chapman's post](https://web.archive.org/web/20130527203022/http://shaunchapman.me/post/329270449/how-to-install-the-tree-command-on-mac-os-x), [slhck's answer](https://superuser.com/a/359727), and [apouche's answer](https://superuser.com/a/448969).

## Install tree

Open a new `Terminal`, copy and paste the following codes, wait for a few seconds for the first several lines to run, and press `Enter` (otherwise the last line won't run). When you copy and past multiple lines into your `Terminal`, you should always press `Enter` to run the last line of code. 

```bash
cd Desktop
curl -O ftp://mama.indstate.edu/linux/tree/tree-1.8.0.tgz
tar xzvf tree-1.8.0.tgz
cd tree-1.8.0
open Makefile -a TextEdit
```


Then do what [Shaun Chapman](https://web.archive.org/web/20130527203022/http://shaunchapman.me/post/329270449/how-to-install-the-tree-command-on-mac-os-x) suggested:

1. Comment out the following lines:

{{<figure src="/media/enblog/comment-linux.png" title="Comment out these lines" width="800">}}

The result will be like this

```
# Linux defaults:
# CFLAGS=-ggdb -pedantic -Wall -DLINUX -D_LARGEFILE64_SOURCE -D_FILE_OFFSET_BITS=64
#CFLAGS=-O4 -Wall  -DLINUX -D_LARGEFILE64_SOURCE -D_FILE_OFFSET_BITS=64
#LDFLAGS=-s
```

2. Uncomment these lines:

{{<figure src="/media/enblog/uncomment-osx.png" title="Uncomment these lines" width="700">}}

The result will be like this

```
# Uncomment for OS X:
# It is not allowed to install to /usr/bin on OS X any longer (SIP):
prefix = /usr/local
CC=cc
CFLAGS=-O2 -Wall -fomit-frame-pointer -no-cpp-precomp
LDFLAGS=
MANDIR=/usr/share/man/man1
OBJS+=strverscmp.o
```

Save the changes using `Command + S`. 

Go back to your `Terminal`, copy and paste the following codes, and press `Enter`. 

```bash
make
sudo make install
```

You'll be asked to input the passwords. Note that your input will be invisible. 

Installation is successful if you see

{{<figure src="/media/enblog/tree-installation.png" title="Successful installation" width="500">}}

Also note that although it says that "It is not allowed to install to /usr/bin on OS X any longer (SIP)", I can still install it. If it happens that you cannot install it, after `make`, you can try this

```bash
mv ~/Desktop/tree-1.8.0/tree /usr/local/bin/
```

The above line will move `/tree-1.8.0/tree` to `usr/local/bin/`. **Please not that you don't have to do this if `sudo make install` works for you!**

Now let's go back to `Terminal` to delete both `tree-1.8.0` and `tree-1.8.0.tgz` since we don't need them anymore. 

```bash
cd .. # Go back to Desktop
rm -rf tree-1.8.0
rm -rf tree-1.8.0.tgz
```

## Use tree

Under the directory you are in, simply use `tree`. For exmaple, if you followed every of my steps above, you are in the directory of `tree-1.8.0`, then input `tree` in your `Terminal`, you'll see the directory tree of `tree-1.8.0`. 

When you are not in the directory whose structure you want to show, for example, if you open a new `Terminal` using `Command + N`, you can use

```bash
tree ~/Desktop/tree-1.8.0/
``` 

to get the directory tree. 

I prefer the output of this method than that produced using the follwoing method, since it's much clearer and it has the same order as what you see in your original folder:

```bash
├── Folder_1
├── Folder_2
├── Static
│   └── Data
│       └── YourData.csv
└── YourBlogdownProject.RProj
```

## My Previous Solution

How can I print a directory tree like this on Mac:

```bash
|____Folder_2
|____YourBlogdownProj.RProj
|____Static
| |____Data
| | |____YourData.csv
|____Folder_1
```

Open a new `Terminal`. Type this

```bash
open ~/.bash_profile -a TextEdit
```

If you prefer `Sublime Text`, you can replace `TextEdit` with `"Sublime Text"`.

Then, simply add the following on a new line:

```bash
alias tree="find . -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g'"
```

Save the change. Open a new `Terminal` using `Command + N`, nagivate to the folder of which you want to print a directory tree using `cd`, and simply type `tree` in your `Terminal`. A directory tree should unfold itself. 

## Reference

1. [http://mama.indstate.edu/users/ice/tree/](http://mama.indstate.edu/users/ice/tree/)
2. [https://web.archive.org/web/20130527203022/http://shaunchapman.me/post/329270449/how-to-install-the-tree-command-on-mac-os-x](https://web.archive.org/web/20130527203022/http://shaunchapman.me/post/329270449/how-to-install-the-tree-command-on-mac-os-x)
3. [https://techion.com.au/blog/2018/5/24/printing-hierarchical-directory-structures](https://techion.com.au/blog/2018/5/24/printing-hierarchical-directory-structures)
4. [https://superuser.com/questions/359723/mac-os-x-equivalent-of-the-ubuntu-tree-command/#448969](https://superuser.com/questions/359723/mac-os-x-equivalent-of-the-ubuntu-tree-command/#448969)
5. [https://osxdaily.com/2016/09/09/view-folder-tree-terminal-mac-os-tree-equivalent/](https://osxdaily.com/2016/09/09/view-folder-tree-terminal-mac-os-tree-equivalent/)
6. [https://superuser.com/questions/359723/mac-os-x-equivalent-of-the-ubuntu-tree-command](https://superuser.com/questions/359723/mac-os-x-equivalent-of-the-ubuntu-tree-command)
7. [https://stackoverflow.com/questions/54228819/tree-command-not-found](https://stackoverflow.com/questions/54228819/tree-command-not-found)
8. [https://support.apple.com/guide/terminal/move-and-copy-files-apddfb31307-3e90-432f-8aa7-7cbc05db27f7/mac](https://support.apple.com/guide/terminal/move-and-copy-files-apddfb31307-3e90-432f-8aa7-7cbc05db27f7/mac)



