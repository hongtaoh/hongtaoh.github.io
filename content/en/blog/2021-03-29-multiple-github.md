---
title: "How to Use Multiple GitHub Accounts on the Same Computer"
date: 2021-03-29T13:18:55-04:00
author: "Hongtao Hao"
slug: multiple-github
draft: false
toc: false
---

{{<block class="warning">}}

I am not sure whether the methods mentioned below will actually work. Ping me if you have a better solution. 

{{<end>}}

I saw [this question](https://stackoverflow.com/questions/3860112/multiple-github-accounts-on-the-same-computer) on Stack Overflow. I also saw the [highest rated answer](https://stackoverflow.com/a/3860139/13716814) and [Jeffrey Way's blog post](https://code.tutsplus.com/tutorials/quick-tip-how-to-work-with-github-and-multiple-accounts--net-22574) mentioned in this answer. However, I didn't manage to follow their steps. 

I later found [*A Practical Guide to Managing Multiple GitHub Accounts*](https://medium.com/the-andela-way/a-practical-guide-to-managing-multiple-github-accounts-8e7970c8fd46) by Fredrick. It successfully helped me set up the SSH keys. The post is already clear enough, but I would like to go over the steps in my own words, and clarify some points I found most confusing. 

Almost all the following codes come from Fredrick. I just added my explanation to them.

First, open your Terminal. 

```bash
cd ~/.ssh 
ssh-keygen -t rsa -b 4096 -C "secondary_account@example.com"
ssh-keygen -t rsa -b 4096 -C "primary_account@example.com"
```

After running `ssh-keygen -t ...`, a question will pop up (Suppose your Mac username is Julia):

```bash
Enter file in which to save the key (/Users/Julia/.ssh/id_rsa): 
```

After the `:`, you are supposed to enter something like: `/Users/Julia/.ssh/id_rsa_secondary` or `/Users/Julia/.ssh/id_rsa_primary`. This is a very important step, but none of the posts I read mentioned it, which has been very frustring for me. 

You'll also be asked to enter passphrases. In fact, you are asked to *create* passphrases, rather than to enter your GitHub or Computer passwords. 

Open the `.ssh/` folder with 

```bash
open -a Finder ~/.ssh
```

You should see four files in the folder:

```
id_rsa_primary
id_rsa_primary.pub
id_rsa_secondary
id_rsa_secondary.pub
```

## Copy

Then, copy the content of the keys for your secondary GitHub account:

```bash
pbcopy < ~/.ssh/id_rsa_secondary.pub
```

Now, log in your secondary GitHub account, Click your avatar on the upper-right corner -> Settings -> "SSH and GPG keys" on left panel -> New SSH key. Paste (`Cmd + v`) in the "key" input field, and add a title in the "Title" box. 

## Configuration

Go back to your Terminal:

```bash
touch config
```

Now you can see a file called `config` within the folder of `/Users/Julia/.ssh/`. Open it and add the following to it:

```
# Primary account - default config
Host github.com-primary
   HostName github.com
   User git
   IdentityFile ~/.ssh/id_rsa_primary

# Secondary account
Host github.com-secondary
   HostName github.com
   User git
   IdentityFile ~/.ssh/id_rsa_secondary
```

Save (`Ctrl + S`). 

I didn't create the two `git` configuration files mentioned by Fredrick and I didn't encounter any problems. 

## Save and Authenticate

Be aware that the following codes starting with `ssh-add ...` should run at the directory of `Users/Julia/.ssh/`, not `Users/Julia/` as Frederick implies. Check your present working directory with `pwd` if you are not sure. 

Remove previous SSH keys:

```bash
ssh-add -D
```

Add the new SSH keys just created:

```bash
ssh-add id_rsa_secondary
ssh-add id_rsa_primary
```

Check whether it works:

```bash
ssh-add -l
```

To authenticate:

```bash
  # Open your secondary GitHub account, and run:
ssh -T github.com-secondary
  # Open your primary GitHub account, and run:
ssh -T github.com-primary
```

If successful, you can see:

```bash
Hi USERNAME! You've successfully authenticated, but GitHub does not provide shell access.
```

## Use

When working on projects associated with your secondary GitHub account, it's better to use the SSH format when cloning or pushing. Also, you'd better specify which account you are using:

```bash
git clone git@github.com-secondary:USERNAME/REPONAME.git
```
