---
title: Some Mac Terminal Command Basics
date: 2020-06-14T10:04:34-04:00
author: Hongtao Hao
slug: terminal-command-basics-on-mac
draft: false
toc: true
---

## Changing Folder/File Name

If you are too lazy to change the folder or file name manually, you can do that in Terminal. What you need to do is first to go to a the direction the folder/file is located in. For example, if you are changing the name of a folder on your Desktop, then you need to `cd Destkop` first. Then:

```bash
mv oldfoldername newfoldername
```

The same is for when you are changing a file's name.

## Opening A New Termainl Windown

Simpply press `command+N`

## Opening A File

`open Path/to/file/file.docx`

If you want to open the file with a specific application:

`open Path/to/file/file.docx -a TextEdit`

If the application to open the file with has more than two words:

`open Path/to/file/file.docx -a "Sublime Text"`


## Checking Which Directory You Are Currently In

```bash
pwd
```

