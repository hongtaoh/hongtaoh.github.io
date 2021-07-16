---
title: "How to Deploy a Hugo Website via GitHub Pages"
date: 2020-11-29T13:21:16-05:00
author: Hongtao Hao
slug: deploy-hugo-ghpages
draft: false
toc: true
---
{{<block class="tip">}}
2021-04-06: As of April 06, 2021, Hugo only [recommends](https://gohugo.io/hosting-and-deployment/hosting-on-github/#deployment-of-project-pages-from-your-gh-pages-branch) deployment with [GitHub Action](https://github.com/marketplace/actions/github-pages-action). 

GitHub Action is superior to the method mentioned below because (1) You don't need to run `hugo` to build your site locally; (2) It is easier to leave a custom commit message. The method below necessitates a `deploy.sh` script, which makes a custom message difficult. 

Read [*How to Deploy A Hugo Website Using GitHub Pages Action*](/en/2021/04/05/hugo-gh-pages-action/) for instructions on deploying your site with GitHub Action. 
{{<end>}}

{{<block class="note">}}
**Background**

I had a nightmare yesterday: I messed up the automatic deployment process of my Hugo website. My initial deployment process was based on [this tutorial post](https://www.hjdskes.nl/blog/deploying-hugo-on-personal-gh-pages/index.html) by [Jente Hidskes](https://www.hjdskes.nl/). Although it was a little bit outdated and complicated, it served me well. That was until yesterday.

What happened was that I deleted some images from the `static` folder. What I should have done is simply to run `bash deploy.sh` to regenerate and update the site. However, I wanted to leave a commit message to myself, so I ran in Terminal `git add . & git commit -m "deleting images." & git push origin master`. The thing is, I probably should have used `git push origin sources` since the `sources` branch holds my original repository whereas the `master` branch is in fact the `public` folder. 

I messed it up. Since the [original codes](https://www.hjdskes.nl/blog/deploying-hugo-on-personal-gh-pages/index.html) for the deployment were very complicated, I wasn't able to fix it myself. I tried so many methods, but they all failed. 

So I had to give up and try to deploy it anew.
{{<end>}}

There are many ways to deploy a Hugo website. The simplest one perhaps is to host it on [Netlify](https://www.netlify.com/). However, my site deployed by Netlify looks a little bit different from what I see on my local server. So I had to give it up. 

I chose to use GitHub Pages. Hugo's [homepage](https://gohugo.io/hosting-and-deployment/hosting-on-github/#deployment-of-project-pages-from-your-gh-pages-branch) detailed three ways to host a Hugo website though GitHub Pages. [The first method](https://gohugo.io/hosting-and-deployment/hosting-on-github/#github-user-or-organization-pages) is to set up two repositories with one being the submodule. I don't like the idea of managing two repositories for my website, so I didn't choose it. [The second option](https://gohugo.io/hosting-and-deployment/hosting-on-github/#github-project-pages), perhaps the easiest one, is to change the publish directory from `public` to `docs`, so that GitHub Pages can automatically recognize that the site to deploy is located in the folder of `/docs`. However, I didn't like the idea of changing the default publish directory either (Yeah, call me picky if you want). 

I chose the [third option](https://gohugo.io/hosting-and-deployment/hosting-on-github/#deployment-of-project-pages-from-your-gh-pages-branch), which is to set up a new branch called `gh-pages` which is essentially the `public` folder. I will document the steps I took to restore my site's deployment, in case I need to redo it. It may also help others. 

## Restore the content
Since I messed it up, I decided to delete all the content. After having deleted everything manually in the root directory, I ran these:

```bash
git add .
git commit -m "Deleting everything."
git push origin <master-branch>
```

The name of my `<master-branch>` is `sources`, so I'll use sources in the following parts. 

Then, find out the `<commit ID>` I want to restore. That should be the one before I messed up everything. Run 

```bash
git checkout <commit ID> .
```

As [this tutorial](https://medium.com/swlh/using-git-how-to-go-back-to-a-previous-commit-8579ccc8180f) said, do not forget the dot after `<commit ID>`. Also, there is space before the dot. 

After that, delete `public` before pushing everything to `sources`: `rm -rf public`. This is because I don't need `public` now and if I include it, it will take more time when `pushing`. 

Then, push the restored content to `<master branch>` branch:

```bash
git add .
git commit -m "Restoring."
git push origin sources
```

## Set up gh-pages

First, delete all the `.DS_Store` files:

```bash
find . -name .DS_Store -print0 | xargs -0 git rm -f --ignore-unmatch
git add .
git commit -m "Remove .DS_Store from everywhere"
git push origin sources
```

The following steps are based on the [official tutorial](https://gohugo.io/hosting-and-deployment/hosting-on-github/#deployment-of-project-pages-from-your-gh-pages-branch). I modified it a little bit. 

Then, edit `.gitignore`:

```bash
echo "public" >> .gitignore
echo ".DS_Store" >> .gitignore
```

If you want to edit `.gitignore` manually, you can use `open .gitignore -a TextEdit` or `open .gitignore -a "Sublime Text"`.

Then, build and deploy:

```bash
rm -rf public
git worktree add -B gh-pages public origin/gh-pages
```

Regenerate the site and commit the `public` folder to `gh-pages`:

```bash
hugo
cd public && git add --all && git commit -m "Publishing to gh-pages" && cd ..
git push origin gh-pages
```

On GitHub, go to Settings → GitHub Pages, then choose "gh-pages". The site should be running. 

## Automatic deployment

<!--  My steps:
	
delete the copy of _index.markdown
delete codes, stats, and english within `cn`
update the tutorials of github and netlify deployment in chinese
update deploy.sh
delete privacy images
delete the `logo.png` to test the new `deploy.sh`: delete it, run `deploy.sh` and then `git status`
 -->

[The script file](https://gohugo.io/hosting-and-deployment/hosting-on-github/#put-it-into-a-script-1) provided is a little bit weird, especially the `if statement`. If it is there, and I added some content to the root directory, then I cannot deploy. 

Also, the guidance of [Use a Custom Domain](https://gohugo.io/hosting-and-deployment/hosting-on-github/#use-a-custom-domain) provided is a little bit confusing. If I add the CNAME file to the `static` folder, something will go wrong. 

The following script is what I came up with, based on the [original one](https://gohugo.io/hosting-and-deployment/hosting-on-github/#put-it-into-a-script-1):

```bash
#!/bin/sh
MESSAGE="Rebuilding site $(date)"
SOURCE=sources
git add .
git commit -m "$MESSAGE"
git push origin "$SOURCE"

if [ "`git status -s`" ]
then
    echo "The working directory is dirty. Please commit any pending changes."
    exit 1;
fi

echo "Deleting old publication"
rm -rf public
mkdir public
git worktree prune
rm -rf .git/worktrees/public/

echo "Checking out gh-pages branch into public"
git worktree add -B gh-pages public origin/gh-pages

echo "Removing existing files"
rm -rf public/*

echo "Generating site"
hugo

cd public
echo "hongtaoh.com" > CNAME

echo "Updating gh-pages branch"
git add . && git commit -m "Publishing to gh-pages (publish.sh)"

echo "Pushing to github"
git push --all origin
```
