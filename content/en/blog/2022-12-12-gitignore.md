---
title: "Gitignore: How to Ignore Everything in A Specific Folder"
date: 2022-12-12T22:42:27-06:00
author: "Hongtao Hao"
slug: gitignore
draft: false
toc: false
tags: tutorial
---

I was not able to fully master the directory specification in `.gitignore` but I do not have to. Sometimes, it's enough to have a `.gitignore` file that says: "please ignore everything expect this `.gitignore` file".

Change directory to the folder where you want to ignore, and then:

```bash
touch .gitignore
```

Press `Shift` + `Command` + `.`, then you'll be able to see `.gitignore` file. Open it, and write the following to it:

```bash
# ignore everything in the current dir
*

# except this file
!.gitignore
```