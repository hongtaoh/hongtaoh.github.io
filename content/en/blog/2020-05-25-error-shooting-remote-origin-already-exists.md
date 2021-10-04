---
title: How to Solve the Problem of "Remote Origin Already Exists"
date: 2020-05-25T10:10:19-04:00
author: Hongtao Hao
slug: remote-origin-already-exists-error-shooting
draft: false
toc: false
---
Here is my situation: I want to use another GitHub account. I need to transfer a repo from my old account to the new one. Maybe there is an easy way to transfer, but it is beyond my ability now (I guess it's complicated so I didn't even bother searching for an answer).

So I `git clone` the repo from my old account and tried to push it to my new account. Then, a error occurred: 

```bash
fatal: remote origin already exists.
```

There are two ways to solve this problem:

1. Change the URL 

[Here](https://stackoverflow.com/questions/16330404/how-to-remove-remote-origin-from-git-repo) is where I found the answer. Many thanks to [kahowell](https://stackoverflow.com/users/1881136/kahowell).

Simply use:

```bash
git remote set-url origin https://github.com/new.url.here
```

However, if you just want to remove the remote (and add a new one later), you can use the following line of code to remove remote:

```bash
git remote rm origin 
``` 

2. Creating a new folder

Just create a new folder, and then drag all the files from the old folder into the new folder. The original git remote will be automatically erased. 

Done. 

