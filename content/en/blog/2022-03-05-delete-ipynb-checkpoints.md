---
title: "How to Delete and Ignore All .ipynb_checkpoints in GitHub Repositories"
date: 2022-03-05T12:47:25-06:00
author: "Hongtao Hao"
slug: delete-ipynb-checkpoints
draft: false
toc: false
---

The procedure is very similar to [delete .DS_Store File](/en/2020/11/03/delete-ignore-ds-store/).

You can delete `.ipynb_checkpoints` folder this way:

```bash
find . -name .ipynb_checkpoints -print0 | xargs -0 git rm -rf --ignore-unmatch
git add .
git commit -m "Remove .ipynb_checkpoints from everywhere"
git push
```

Then you can ignore all future `.ipynb_checkpoints` this way:

```bash
touch .gitignore
echo \.ipynb_checkpoints >> .gitignore
git add .
git commit -m "Creating .gitignore and ignore .ipynb_checkpoints"
git push
```