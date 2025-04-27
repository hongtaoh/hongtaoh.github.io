---
title: "How to Delete Large Files on Shared Linux Clusters"
date: 2025-04-21T11:27:03-05:00
author: "Hongtao Hao"
slug: linux-large-delete
draft: false
toc: false
tags: Coding
---
First, find the top largest files

```sh
find ~ -type f -exec du -h {} + | sort -rh | head -n 20
```

- Clean conda: `conda clean -a -y`, this will remove Tarballs and extracted packages, Index caches, and Logs
- Conda envs: 
    - List all envs: `conda info --envs`
    - Remove one: `conda env remove --name YOURENVNAME`
- clean pip cache: `pip cache purge`