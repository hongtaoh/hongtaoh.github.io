---
title: "How to Make A Pull Request on GitHub"
date: 2020-10-05T16:56:56-04:00
author: Hongtao Hao
slug: github-pull-request
draft: false
toc: true
---

I learned how to contribute via making a pull request from the [contributing guidance](https://github.com/victoriadrake/hugo-theme-sam/blob/master/CONTRIBUTING.md) by [Victorial Drake](https://github.com/victoriadrake).

## Step1: Fork a repo
Reference: [Fork a repo](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo) from [GitHub Docs](https://docs.github.com/en)

### Forking the original repository
Simply fork the project you would like to work on. For example, I forked Professor YY's [covid19-data](https://github.com/covid19-data/covid19-data). [Here](https://github.com/hongtaoh/covid19-data) is what the fork looks like.

### Making a local clone of your fork

In Terminal, first navigate to the directory where you want to place this local clone. In my example, I'll put it on my Desktop. Then, `git clone` your fork. 

```bash
cd Desktop
git clone https://github.com/hongtaoh/covid19-data
```

### Syncing your fork with the original repository

The original repository is also called the **upstream** repository. 

First, change directories to the location of your fork. Continuing with the above code, I'll type:

```bash
cd covid19-data
```

Before adding the upstream URL, let's first check the current configured remote repository for our fork[^1]:

```bash
$ git remote -v
# It gives me the following results
> origin	https://github.com/hongtaoh/covid19-data (fetch)
> origin	https://github.com/hongtaoh/covid19-data (push)
```

Go to the upstream repository, copy its HTTPS location (in my case, it is https://github.com/covid19-data/covid19-data.git), and

```bash
git remote add upstream https://github.com/covid19-data/covid19-data.git
```

Now type `git remote -v` again, and you'll see the change:

```bash 
$ git remote -v 
> origin	https://github.com/hongtaoh/covid19-data (fetch)
> origin	https://github.com/hongtaoh/covid19-data (push)
> upstream	https://github.com/covid19-data/covid19-data.git (fetch)
> upstream	https://github.com/covid19-data/covid19-data.git (push)
```

## Step2: Make changes to your fork
After making changes to the local clone, you can push the changes to your fork. 

```
# First change directory to your local clone
git add .
git commit -m "Description of your changes here."
git push
```

Then, I can see changes in [my fork](https://github.com/hongtaoh/covid19-data).

## Step3: Creating a pull request from your fork

See details [here](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork).

## What to do before sending your pull request

[Victorial Drake](https://github.com/victoriadrake) suggests opening an issue telling people what changes you are going to make before sending the pull request. This is because if others don't think your changes are necessary, then you don't need to send it in the first place. 

[^1]: Please note that `$` and `>` are for demonstration only and you aren't supposed to type them in your Terminal. `$` is followed by what you want to type in Terminal, and `>` is followed by the results from Terminal.

## Updating:

When you are woking on your fork and find that it is several commits behind the original repo, please refer to [GitHub's offiical guide](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/syncing-a-fork) to sync your fork with the original. Please note that it uses `main` but more often than not, it probably should be `origin`. Check your upstream to make sure. 

When git asks you to explain how this merge is necessary, please follow [thise steps](https://stackoverflow.com/a/19085954). 

{{<block class="warning">}}
Don't click "Fetch upstream" on github, as this will complicate things. If you click it, your remote will be ahead of your local repo and you have to run `git pull` before `git push`. 

Follow the steps below instead. 
{{<end>}}

{{<block class="tip">}}
I tried [GitHub's offiical guide](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/syncing-a-fork) but it seemed to complicate things. From [this post](https://blog.scottlowe.org/2015/01/27/using-fork-branch-git-workflow/), I learned that only two steps suffice:
```
git pull upstream master
git push origin master
```
I tried and these two lines did do the job. 

`git pull upstream master` will automatically merge your **local** repo with the upstream. When git asks you to explain how this merge is necessary, please follow [these steps](https://stackoverflow.com/a/19085954). 

`git push origin master` will push the changes in your local repo to your remote repo. 
{{<end>}}
