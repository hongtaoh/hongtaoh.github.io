---
title: "Julia: How to Find the Position of An Element in An Array"
date: 2021-07-14T11:22:15-04:00
author: "Hongtao Hao"
slug: julia-element-position
draft: false
toc: false
---
{{<block class="tip">}}
This post is tested under Julia v1.6.1 and DataFrames v1.2.0. 
{{<end>}}

[`Base.findfirst()`](https://docs.julialang.org/en/v1/base/arrays/#Base.findfirst-Tuple{Function,%20Any}) will do the job. 


Let's look at a simple example. 

```julia
using DataFrames
a = repeat('a':'z')
b = repeat(14:26, outer = 2)
df = DataFrame(:A => a, :B => b)
```

```bash
julia> df

26×2 DataFrame
 Row │ A     B     
     │ Char  Int64 
─────┼─────────────
   1 │ a        14
   2 │ b        15
   3 │ c        16
   4 │ d        17
   5 │ e        18
   6 │ f        19
   7 │ g        20
   8 │ h        21
  ⋮  │  ⋮      ⋮
  20 │ t        20
  21 │ u        21
  22 │ v        22
  23 │ w        23
  24 │ x        24
  25 │ y        25
  26 │ z        26
    11 rows omitted
```

Let's say you want to know the index of the row where `A = 't'`:

```bash
julia> findfirst(isequal('t'), df.A)
20
```

Or, you want to know the index of the first element in `df.B` that is larger than 17:

```bash
julia> findfirst(x -> x>17, df.B)
5
```

Also useful are the functions of [`Base.findmax()`](https://docs.julialang.org/en/v1/base/collections/#Base.findmax) and [`Base.findmin()`](https://docs.julialang.org/en/v1/base/collections/#Base.findmin), which return both the value and the location. 

```bash
julia> using Random

julia> Random.seed!(1234)
MersenneTwister(1234)

julia> rand_num = rand(10)
10-element Vector{Float64}:
 0.5908446386657102
 0.7667970365022592
 0.5662374165061859
 0.4600853424625171
 0.7940257103317943
 0.8541465903790502
 0.20058603493384108
 0.2986142783434118
 0.24683718661000897
 0.5796722333690416

julia> findmax(rand_num)
(0.8541465903790502, 6)

julia> findmin(rand_num)
(0.20058603493384108, 7)
```