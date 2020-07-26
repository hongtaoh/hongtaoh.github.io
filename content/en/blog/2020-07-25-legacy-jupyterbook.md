---
title: How to Use Legacy Jupyterbook
date: 2020-07-25T16:13:58-04:00
author: Hongtao 
slug: legacy-jupyterbook
draft: false
toc: false
---

Jupyterbook totally changed the way a book is built in April 2020. The final legacy version is [v0.6.5](https://github.com/executablebooks/jupyter-book/releases/tag/v0.6.5). You can compare the [legacy demo](https://legacy.jupyterbook.org/intro.html) with the [newest version demo](https://jupyterbook.org/intro.html).

You can download the legacy version [here](https://pypi.org/project/jupyter-book/0.6.5/).

In this article, I'll briefly talk about how to use this legacy version of jupyterbook together with GitHub and Netlify. 

First off, you should install the legacy version using `pip install jupyter-book==0.6.5`. Then, I will show you how to start a book named "legacy-jupyterbook" on Desktop. I am asusming here that you are using a Mac. All the following codes should run in Terminal. 

```bash
cd Desktop
jupyter-book create legacy-jupyterbook # You'll see the file created on Desktop
echo "2.6.2" > .ruby-version # To put a .ruby-version file in there
```

The `echo "2.6.2" > .ruby-version` solution come from [here](https://stackoverflow.com/questions/38194032/how-to-update-ruby-version-2-0-0-to-the-latest-version-in-mac-osx-yosemite)

Then, go to GitHub, and create a repository *without* choosing "Initialize this repository with a README". Take a look at this HTTPS address:


Then, go back to your Terminal:

```bash
cd legacy-jupyterbook
git Init 
cd .. # To go back to the Desktop directory because the following line only functions in a level higher than the current one
jupyter-book build legacy-jupyterbook
cd - # To go back to legacy-jupyterbook
git add .
git commit -m “uploading initial files.”
git remote add origin https://github.com/hhao1992/second-try.git # Replace it with yours
git push -u origin master
```

Then, you'll see some security alerts. Solve them this way:

```bash
rm -rf Gemfile.lock
make install 
git add .
git commit -m "changing Gemfile.lock."
git push origin master 
```

