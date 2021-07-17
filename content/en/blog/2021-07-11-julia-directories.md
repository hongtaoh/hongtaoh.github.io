---
title: "Julia: How to Navigate Directories"
date: 2021-07-11T17:25:53-04:00
author: "Hongtao Hao"
slug: julia-directory
draft: false
toc: true
---
{{<block class="tip">}}
This post is tested under masOS High Sierra and Julia v1.6.1. 
{{<end>}}

Suppose you have folder named `A` with following directory tree:

```bash
├── B
│   ├── D
│   │   ├── F
│   │   └── YourScript.jl
│   └── E
└── C
```

## Current directory

```julia
pwd() # returns "/Users/USERNAME/Desktop/A/B/D"
```

Or,

```julia
@__DIR__ # returns /Users/USERNAME/Desktop/A/B/D"
```

## To go up by one level

You need to use [`dirname()`](https://docs.julialang.org/en/v1/base/file/#Base.Filesystem.dirname)

```julia
dirname(pwd()) # returns "/Users/USERNAME/Desktop/A/B"
```

Or, 

```julia
cd(pwd, "..") # returns "/Users/USERNAME/Desktop/A/B"
```

## To go up by one level and access another folder

In this case, to access `E`.

You can use the function of [`joinpath()`](https://docs.julialang.org/en/v1/base/file/#Base.Filesystem.joinpath)

```julia
joinpath(dirname(pwd()), "E") # returns "/Users/USERNAME/Desktop/A/B/E"
```

Or, use [`string()`](https://docs.julialang.org/en/v1/base/strings/#Base.string):

```julia
string(dirname(pwd()), "/E") # returns "/Users/USERNAME/Desktop/A/B/E"
```

## To go up by more than one level

```julia
cd(pwd, "../..") # returns "/Users/USERNAME/Desktop/A"
```

## Home directory

Use [`homedir()`](https://docs.julialang.org/en/v1/base/file/#Base.Filesystem.homedir)

```julia
homedir() ## returns "/Users/USERNAME"
```

## References

- [How to get the parent directory of the current working directory in Julia](https://stackoverflow.com/q/59472243/13716814) on Stack Overflow

- [waTeim's response](https://stackoverflow.com/a/24841669/13716814) to the question of [Setting working directory: Julia versus R](https://stackoverflow.com/q/24841448/13716814) on Stack Overflow.  
