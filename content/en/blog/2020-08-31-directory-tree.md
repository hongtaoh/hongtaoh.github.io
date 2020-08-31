---
title: How to Print Directory Trees on Mac
date: 2020-08-31T10:55:40-04:00
author: Hongtao Hao
slug: mac-directory-tree
draft: false
toc: false
---
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

Save the change. Open a new `Terminal` using `Command + N`, `cd` to the folder of which you want to print a directory tree, and simply type `tree` in your `Terminal`. A directory tree should unfold itself. 

## Reference
1. [https://osxdaily.com/2016/09/09/view-folder-tree-terminal-mac-os-tree-equivalent/](https://osxdaily.com/2016/09/09/view-folder-tree-terminal-mac-os-tree-equivalent/)
2. [https://superuser.com/questions/359723/mac-os-x-equivalent-of-the-ubuntu-tree-command](https://superuser.com/questions/359723/mac-os-x-equivalent-of-the-ubuntu-tree-command)
3. [https://stackoverflow.com/questions/54228819/tree-command-not-found](https://stackoverflow.com/questions/54228819/tree-command-not-found)
