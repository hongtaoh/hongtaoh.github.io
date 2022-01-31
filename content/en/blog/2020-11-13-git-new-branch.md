---
title: How to Contribute to a GitHub Project by Creating a New Branch
date: 2020-11-13T10:34:27-05:00
author: Hongtao Hao
slug: git-new-branch
draft: false
toc: false
---
I was invited to an organization account on GitHub. To edit a repository, I thought I could just `git clone` it, make changes, and then simply `git push` it. No. I didn't have the access. 

Then, how to contribute? I first thoguht about **Fork**. But [Isabel Constantino](https://cns-nrt.indiana.edu/students/affiliates/2020/Isabel-Constantino.html) and [Professor YY](http://yongyeol.com/) recommended creating a new branch, making changes, and submitting a pull request. 

I then wondered: what's the difference between **forking** and **branch**? I found the same question on [this thread](https://stackoverflow.com/questions/5009600/difference-between-fork-and-branch-on-github). Basically, when you fork a repo, you are thinking of building on it for your own purpose and might not merge it with the original repo. However, when you create a new branch, your intention is to directly contribute to a project. That said, you can of course fork a project with the intention to contribute to it. I've talked about how to make a pull request on [this post](/en/2020/10/05/github-pull-request/). Now, I want to talk about how to create a new branch and make a pull request. 

I found the solution [here](https://learntocodetogether.com/create-your-first-pull-request/). I'll summarize the steps here myself:

1. First, copy the url of the project you want to contribute to. On your computer, change directory. For example, `cd Desktop`. Then, clone this repository in the current directory: `git clone yourRepoURL`

2. Change directory to this repository

3. Create a new branch by `git checkout -b NewBranchName`

4. Make changes to the repository, and then `git add .`[^1]

5. Commite your changes to your new branch: `git commit -m "your message here"`

6. Push it to the repository: `git push -u origin NewBranchName`[^2]

7. Go to the target repository, and you'll find the option to make a pull request

Done!

[^1]: Don't leave out the space between the dot and add 
[^2]: `-u` here is short for `--set-upstream`