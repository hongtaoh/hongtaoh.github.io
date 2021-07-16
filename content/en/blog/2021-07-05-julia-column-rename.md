---
title: "Julia: How to Rename Columns in A Data Frame"
date: 2021-07-05T16:27:26-04:00
author: "Hongtao Hao"
slug: julia-column-renaming
draft: false
toc: false
---
{{<block class="tip">}}
The following codes run under Julia v1.6.1 and DataFrames v1.2.0.
{{<end>}}
    
To rename a column or columns, you need to use [`rename`](https://dataframes.juliadata.org/stable/lib/functions/#DataFrames.rename), or [`rename!`](https://dataframes.juliadata.org/stable/lib/functions/#DataFrames.rename!). The difference is that `rename` creates a new data frame with the updated name(s) whereas `rename!` modifies the name(s) in-place. 

If you have a lot of columns to rename, it might be better to use a `Dict`. I got this idea from [a post](https://sashankexpresstech.blogspot.com/2017/09/julia-language-dataframes-renaming.html) by Sashank Bhogu.

```
julia> using DataFrames

julia> df = DataFrame(:A => [1, 2, 3], :B => ["a", "b", "c"])
3×2 DataFrame
 Row │ A      B      
     │ Int64  String 
─────┼───────────────
   1 │     1  a
   2 │     2  b
   3 │     3  c

julia> rename(df, :A => :C, :B => :D)
3×2 DataFrame
 Row │ C      D      
     │ Int64  String 
─────┼───────────────
   1 │     1  a
   2 │     2  b
   3 │     3  c

julia> df
3×2 DataFrame
 Row │ A      B      
     │ Int64  String 
─────┼───────────────
   1 │     1  a
   2 │     2  b
   3 │     3  c

julia> rename_dict = Dict(:A => :C, :B => :D)
Dict{Symbol, Symbol} with 2 entries:
  :A => :C
  :B => :D

julia> rename(df, rename_dict)
3×2 DataFrame
 Row │ C      D      
     │ Int64  String 
─────┼───────────────
   1 │     1  a
   2 │     2  b
   3 │     3  c

julia> rename!(df, :A => :C, :B => :D)
3×2 DataFrame
 Row │ C      D      
     │ Int64  String 
─────┼───────────────
   1 │     1  a
   2 │     2  b
   3 │     3  c

julia> df
3×2 DataFrame
 Row │ C      D      
     │ Int64  String 
─────┼───────────────
   1 │     1  a
   2 │     2  b
   3 │     3  c
```

