---
title: How to Use Legacy Jupyterbook
date: 2020-07-25T16:13:58-04:00
author: Hongtao Hao
slug: legacy-jupyterbook
draft: false
toc: true
---

## About Jupyterbook

Jupyterbook totally changed the way a book is built in April 2020. The final legacy version is [v0.6.5](https://github.com/executablebooks/jupyter-book/releases/tag/v0.6.5). You can compare the [legacy demo](https://legacy.jupyterbook.org/intro.html) with the [newest version demo](https://jupyterbook.org/intro.html).

You can install the legacy version [here](https://pypi.org/project/jupyter-book/0.6.5/).

## Using Jupyterbook

In this article, I'll briefly talk about how to use this legacy version of jupyterbook together with GitHub and Netlify. 

First off, you should install the legacy version using `pip install jupyter-book==0.6.5` as mentioned above. Then, I will show you how to start a book named "legacy-jupyterbook" on Desktop. I am assuming that you are using a Mac. All the following codes should run in Terminal. 

```bash
cd Desktop # or any other directory you want to place your project
jupyter-book create legacy-jupyterbook # You'll see the file created on Desktop
echo "2.6.2" > .ruby-version # To put a .ruby-version file in there
```

The `echo "2.6.2" > .ruby-version` solution come from [here](https://stackoverflow.com/a/38194231).

Then, go to GitHub, and create a repository **without** checking "Initialize this repository with a README". Take a look at this HTTPS address:

{{<figure src="/media/enblog/legacy-jupyterbook-github-repo-https.png" title="HTTPS of the GitHub Repo">}}

Then, go back to your Terminal:

```bash
cd legacy-jupyterbook
git init
cd .. # To go back to the Desktop directory because the following line only functions in a level higher than the current one
jupyter-book build legacy-jupyterbook
cd - # To go back to legacy-jupyterbook
git add .
git commit -m “uploading initial files.”
git remote add origin https://github.com/hhao1992/second-try.git # Replace it with yours
git push -u origin master
```

Then, you'll see some security alerts:

{{<figure src="/media/enblog/legacy-jupyterbook-alert01.png" title="Alert info-01">}}

{{<figure src="/media/enblog/legacy-jupyterbook-alert02.png" title="Alert info-02">}}

Solve them this way:

```bash
rm -rf Gemfile.lock
make install 
git add .
git commit -m "changing Gemfile.lock."
git push origin master 
```
The above solution come from [here](https://www.bookstack.cn/read/jupyterbook/8124f882effb2130.md#What%20is%20this%20Gemfile.lock%20file%20or%20why%20am%20I%20getting%20Jekyll%20dependency%20warnings?).

Then go to [Netlify](www.netlify.com/) and connect to the GitHub repo. When we deploy the Jupyterbook project with Nellify, it will automatically know that this is a Jekyll theme and you don't need to change anything. I am not detailing what you can do with Netlify here. Please look for information about it by yourself if you are not familiar with it already. 

If you want to make changes later, first please `cd path/to/YourProject` and then use the following script:

```bash
rm -rf _build #If you are familiar with Jekyll, you'll know what _build mean here.
cd ..
jupyter-book build YourProject
cd YourProject
git add .
msg="rebuilding site $(date)" 
git commit -m "$msg" 
git push origin master
```

You can store this file as `deploy.sh`, save it to the root directory of YourProject. Every time after you've make all the changes you want, at the root directory of YourProject, simply run `bash deploy.sh` and GitHub and Netlify will deploy by themselves. 

## Example

Finally, you can view the final product of the example I provided above [here](https://legacy-jupyterbook.netlify.app/). And [here](https://github.com/hongtaoh/legacy-jupyterbook) is its GitHub repository. 

## Changing content
I am not detailing how to customize the content here. You simply need to change it in the `content` folder at the root directory, and then make corresponding changes to `toc.yml` under the `_data` folder. You can find more information in the [official guide](https://legacy.jupyterbook.org/intro.html)







