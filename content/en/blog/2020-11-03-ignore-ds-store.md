---
title: "How to Delete and Ignore All .DS_Store Files in GitHub Repositories"
date: 2020-11-03T15:01:10-05:00
author: Hongtao Hao
slug: delete-ignore-ds-store
draft: false
toc: false
---
If you are using a Mac, chances are that you have a lot of `.DS_Store` files in all kinds of folders. While they don't cause any problems, it might be ugly if these files appear in your GitHub repositories. How to delete and ignore all of them? [This thread](https://stackoverflow.com/questions/18393498/gitignore-all-the-ds-store-files-in-every-folder-and-subfolder) on Stack Overflow helped me quite a bit. 

## First, delete all .DS_Store files

The following solution came from [here](https://stackoverflow.com/a/38797342).

At the root of your local repository[^1], run:

```bash
find . -name .DS_Store -print0 | xargs -0 git rm -f --ignore-unmatch
git add .
git commit -m "Remove .DS_Store from everywhere"
git push origin master
```
## Second, create a .gitignore file and ignore .DS_Store

The following solution came from [here](https://docs.github.com/en/free-pro-team@latest/github/using-git/ignoring-files#configuring-ignored-files-for-a-single-repository) and [here](https://stackoverflow.com/a/54715555).

If you don't have it in your repository yet, create one:

```bash
touch .gitignore
echo \.DS_Store >> .gitignore
git add .
git commit -m "Creating .gitignore and ignore .DS_Store"
git push origin master
```
## Third, exclude all .DS_Store files in all repositories in the future

The following answer came from [here](https://stackoverflow.com/a/19299889)

If you want to exlude all .DS_Store files from your future repositories:

```bash
echo .DS_Store >> ~/.gitignore_global
git config --global core.excludesfile ~/.gitignore_global
```

[^1]: All the codes in this post are supposed to be run at the root directory of your local repo. 