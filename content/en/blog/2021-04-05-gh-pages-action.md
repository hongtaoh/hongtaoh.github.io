---
title: "How to Deploy A Hugo Website Using GitHub Pages Action"
date: 2021-04-05T16:43:21-04:00
author: "Hongtao Hao"
slug: hugo-gh-pages-action
draft: false
toc: false
---

I didn't find a tutorial in details I deemed necessary, so I decided to craft one by myself. These two sources helped me a lot:

- [GitHub Pages Action](https://github.com/marketplace/actions/github-pages-action)

- [Automatically Deploying a Hugo Website via GitHub Actions](https://www.morling.dev/blog/automatically-deploying-hugo-website-via-github-actions/) by  Gunnar Morling

## Create .github/workflows/gh-pages.yml

First change directory to your Hugo project using `cd`.

Then

```bash
mkdir .github
mkdir .github/workflows
touch .github/workflows/gh-pages.yml
```

### Generating SSH Deploy Key

Open a new Terminal window (Cmd+N on Mac; alt+F2 for git-bash on Windows).

MAC:

```bash
cd ~/.ssh
ssh-keygen -t rsa -b 4096 -C "$(git config user.email)" -f gh-pages -N ""
open -a Finder ~/.ssh
```

Windows:

```bash
cd C:\Users\admin\.ssh
ssh-keygen -t rsa -b 4096 -C "$(git config user.email)" -f gh-pages -N ""
start C:\Users\admin\.ssh
```
Then you can see two files are generated in the `.ssh` folder: 

- gh-pages 

- gh-pages.pub

## Set deploy_key

MAC:

```bash
pbcopy < ~/.ssh/gh-pages.pub
```

Windows:

```bash
clip < ~/.ssh/gh-pages.pub
```

Go to your `username.github.io` repository on GitHub -> Settings -> Deploy keys -> Add deploy key. 

Press Cmd+V (Windows: Control+V) in the "Key" section. Check "Allow write access". Leave a note to yourself in the "Title" section. Press "Add key".

Go back to your Terminal.

MAC:

```bash
pbcopy < ~/.ssh/gh-pages
```

Windows:

```bash
clip < ~/.ssh/gh-pages
```

Go to your `username.github.io` repository on GitHub -> Settings -> Secrets -> New repository secret.

Press Cmd+V (Windows: Control+V) in the "Value" section. In the "Name" section, input `ACTIONS_DEPLOY_KEY`. Press "Add secret".

## Generate Personal Access Token

Click [here](https://github.com/settings/tokens) to generate a personal access token. 

Press "Generate new token". In "Select scopes", check "workflow". Then leave a note to yourself in the "Note" section. Scroll down and press "Generate token". Then copy the token you see.

Go back to your `username.github.io` repository on GitHub -> Settings -> Secrets -> New repository secret.

Press Cmd+V (Windows: Control+V) in the "Value" section. In the "Name" section, input `PERSONAL_TOKEN`. Press "Add secret".

## Add your workflow file

MAC:

```bash
open .github/workflows/gh-pages.yml -a TextEdit 
```

You can replace `TextEdit` with `"Sublime Text"` if you have Sublime Text installed.

Windows:

```bash
notepad .github\workflows\gh-pages.yml
```

```yaml
name: github pages

on:
  push:
    branches:
      - master  # Set a branch name to trigger deployment

jobs:
  deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2
        with:
          submodules: true  # Fetch Hugo themes (true OR recursive)
          fetch-depth: 0    # Fetch all history for .GitInfo and .Lastmod

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: '0.79.1'

      - name: Build
        run: hugo --minify

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.PERSONAL_TOKEN }}
          publish_branch: gh-pages
          publish_dir: ./public
```

## Push to Remote

If you haven't pushed anything to your `username.github.io` repository yet:

```bash
echo "# my hugo website" >> README.md
git init
rm -rf public
hugo
git add README.md
git add .
git commit -m "first commit"
# For below, please replace USERNAME with your GitHub username
git remote add origin https://github.com/USERNAME/USERNAME.github.io.git
git push -u origin master
```

If your `username.github.io` repository is already established, check whether the current branch's name is "master". If not, replace `master` with your branch's name in `.github/workflows/gh-pages.yml`. Then

```bash
git add .
git commit -m "deploying with github pages action"
git push
```

Go to your `username.github.io` repository to see whether the deployment is successful. If yes, go to "Settings'', scroll down to "GitHub Pages". Choose "gh-pages'' as the Source branch, then select "root" as the folder. Click "Save". Wait a minute or so and your website will be live at `https://USERNAME.github.io/`.

If the deployment fails, click the X mark to solve the issues by yourself. I cannot help there. 