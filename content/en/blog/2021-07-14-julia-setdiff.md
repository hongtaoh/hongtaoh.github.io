---
title: "Julia: How To Find Elements in One Array but Not in the Other"
date: 2021-07-14T11:39:54-04:00
author: "Hongtao Hao"
slug: julia-setdiff
draft: false
toc: false
---
{{<block class="tip">}}
This post is tested under Julia v1.6.1 and DataFrames v1.2.0.
{{<end>}}
    
[`Base.setdiff`](https://docs.julialang.org/en/v1/base/collections/#Base.setdiff) will do the trick. 

```julia
a = [1, 3, 5, 7, 9, 10, 'a', 'e']
b = [2, 4, 9, 11, 7, 'e', 'b']
# To find elements in a but not in b:
setdiff(a, b) # returns [1, 3, 5, 10, 'a']
```

This works for 2-dimensional arrays as well:

```bash
julia> c = [1 2 8; 4 5 6]
2×3 Matrix{Int64}:
 1  2  8
 4  5  6

julia> d = [2 3 4; 8 6 7]
2×3 Matrix{Int64}:
 2  3  4
 8  6  7

julia> setdiff(c, d)
2-element Vector{Int64}:
 1
 5
```

Note that [`Base.setdiff!(a,b)`](https://docs.julialang.org/en/v1/base/collections/#Base.setdiff!) will remove in-place from `a` all elements found in `b`:

```julia
setdiff!(a,b) # returns [1, 3, 5, 10, 'a']
a # returns returns [1, 3, 5, 10, 'a']
```

## References
- Gnimuc's comment under the question of [Julia: does an Array contain a specific sub-array](https://stackoverflow.com/q/36346005/13716814) on Stack Overflow