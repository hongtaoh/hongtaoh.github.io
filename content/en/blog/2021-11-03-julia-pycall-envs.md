---
title: "Julia: How to Use Conda Virtual Environments in PyCall"
date: 2021-11-03T08:59:43-05:00
author: "Hongtao Hao"
slug: julia-conda-envs
draft: false
toc: false
---

The following solution is based on [this discussion](https://discourse.julialang.org/t/pycall-issues-possible-to-choose-conda-environment-as-path/54481).

Suppose you are using a Mac. Open your Terminal and use the following codes:

```bash
julia 
ENV["PYTHON"] = "/opt/anaconda3/envs/ENVNAME/bin/python3.8"
import Pkg
Pkg.build("PyCall")
```

Replace `ENVNAME` with the name of your virtual environment. 

Then you can use `PyCall`. If you are using `IJulia`, you need to restart it before you can use `PyCall`. 

