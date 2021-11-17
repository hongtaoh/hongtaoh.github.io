---
title: "Julia: Change the Maximum Number of Colomns and Rows of A Data Frame Shown in Jupyter Notebooks"
date: 2021-10-21T21:01:13-05:00
author: "Hongtao Hao"
slug: julia-df-col-row
draft: false
toc: false
---
This post is based on [https://github.com/bkamins/Julia-DataFrames-Tutorial](https://github.com/bkamins/Julia-DataFrames-Tutorial)

First, enter this in your command line if you are using a Mac:

```bash
open -a Finder ~/Library/Jupyter/kernels
```

You'll see `kernels -> julia-XX`. For example, `kernels -> julia-1.6`. Open the `julia-1.6`, you'll see `kernel.json`. Open it. As Bogumił recommended, add `"COLUMNS": "1000", "LINES": "100"` to the `env` variable. 

Then, restart your Jupyter Notebook.

Even after making the above changes, you can still change it in each individual Jupyter notebook. Just add these two lines to your notebook:

```
ENV["LINES"] = 20 # change the number as you prefer
ENV["COLUMNS"] = 1000 # change the number as you prefer
```

I saw this solution in [JuliaCon2021 DataFrames.jl Tutorial](https://github.com/bkamins/JuliaCon2021-DataFrames-Tutorial/blob/main/Tutorial.ipynb). 