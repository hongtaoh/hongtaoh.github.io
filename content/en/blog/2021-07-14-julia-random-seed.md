---
title: "Julia: How to set A Random Seed"
date: 2021-07-14T09:13:05-04:00
author: "Hongtao Hao"
slug: julia-random-seed
draft: false
toc: false
---
{{<block class="tip">}}
This post is tested under Julia v1.6.1.
{{<end>}}

In Julia, you can set a random seed using the [`Random.seed!`](https://docs.julialang.org/en/v1/stdlib/Random/#Random.seed!) function. However, keep in mind that you have to use it every time you are using the random number generator. 

```bash
julia> using Random
julia> Random.seed!(1234)
MersenneTwister(1234)

julia> rand(3)
3-element Vector{Float64}:
 0.5908446386657102
 0.7667970365022592
 0.5662374165061859

julia> rand(3) # Note how the result is different from above
3-element Vector{Float64}:
 0.4600853424625171
 0.7940257103317943
 0.8541465903790502

julia> Random.seed!(1234)
MersenneTwister(1234)

julia> rand(3) # Now the same result combs back
3-element Vector{Float64}:
 0.5908446386657102
 0.7667970365022592
 0.5662374165061859
```