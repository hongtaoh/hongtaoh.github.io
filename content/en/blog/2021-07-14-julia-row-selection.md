---
title: "Julia: How to Conditionally Select Row(s) in A DataFrame"
date: 2021-07-14T12:01:23-04:00
author: "Hongtao Hao"
slug: julia-row-selection
draft: false
toc: false
---
{{<block class="tip">}}
This post is tested under Julia v1.6.1 and DataFrames v1.2.0.
{{<end>}}

[`Base.filter`](https://dataframes.juliadata.org/stable/lib/functions/#Base.filter) is suitable for this task. 

```
df = DataFrame(
    x = [3, 1, 2, 1, 5], 
    y = ["b", "c", "a", "b", "b"],
    z = [true, true, false, false, false]
)
```

```bash
julia> df
5×3 DataFrame
 Row │ x      y       z     
     │ Int64  String  Bool  
─────┼──────────────────────
   1 │     3  b        true
   2 │     1  c        true
   3 │     2  a       false
   4 │     1  b       false
   5 │     5  b       false
```

If it's just one condition, then selection is very simple:

```bash
julia> filter(r -> r.x > 1, df)
3×3 DataFrame
 Row │ x      y       z     
     │ Int64  String  Bool  
─────┼──────────────────────
   1 │     3  b        true
   2 │     2  a       false
   3 │     5  b       false
```

`r` here stands for `row`, but you can replace it with anything you like: `t`, `row`, `anything`, etc. 

If you have more than two conditions:

```bash
julia> filter([:x, :y] => (x, y) -> x > 1 && y == "b", df)
2×3 DataFrame
 Row │ x      y       z     
     │ Int64  String  Bool  
─────┼──────────────────────
   1 │     3  b        true
   2 │     5  b       false
```

```bash
julia> filter([:x, :y, :z] => (x, y, z) -> x > 1 && y == "b" && z == true, df)
1×3 DataFrame
 Row │ x      y       z    
     │ Int64  String  Bool 
─────┼─────────────────────
   1 │     3  b       true
```

You can do the same thing without using the `filter` function as well:

```bash
julia> df[df.x .> 1, :]
3×3 DataFrame
 Row │ x      y       z     
     │ Int64  String  Bool  
─────┼──────────────────────
   1 │     3  b        true
   2 │     2  a       false
   3 │     5  b       false
```

```bash
julia> df[(df.x .> 1) .& (df.y .== "b") .& (df.z .== true), :]
1×3 DataFrame
 Row │ x      y       z    
     │ Int64  String  Bool 
─────┼─────────────────────
   1 │     3  b       true
```

{{<block class="tip">}}
Note that when you use the `Base.filter` function, you need to use `&&`, a [Boolean operator](https://docs.julialang.org/en/v1/manual/mathematical-operations/#Boolean-Operators), whereas when you select rows using data frame indexing, you are supposed to use `&` (note the [Dot](/en/2021/07/10/julia-dot/) before it, though), a [bitwise operator](https://docs.julialang.org/en/v1/manual/mathematical-operations/#Bitwise-Operators).
{{<end>}}

## When there are missing values

One thing you need to keep in mind is that if there are missing values in the data frame, you might not be able to use the second option, and you might not use [equality and comparison operators](https://docs.julialang.org/en/v1/manual/missing/#Equality-and-Comparison-Operators) in `filter`.

For example,

```bash
julia> df = DataFrame(
    x = [3, 1, 2, 1, missing], 
    y = ["b", "c", "a", "b", "b"], 
    z = [true, true, false, false, false]
)
5×3 DataFrame
 Row │ x        y       z     
     │ Int64?   String  Bool  
─────┼────────────────────────
   1 │       3  b        true
   2 │       1  c        true
   3 │       2  a       false
   4 │       1  b       false
   5 │ missing  b       false

julia> filter(r -> r.x == 1, df)
ERROR: TypeError: non-boolean (Missing) used in boolean context

julia> df[df.x .> 1, :]
ERROR: ArgumentError: unable to check bounds for indices of type Missing
```

You need to use [`Base.isequal`](https://docs.julialang.org/en/v1/base/base/#Base.isequal) and [`Base.isless`](https://docs.julialang.org/en/v1/base/base/#Base.isless) instead:

```bash
julia> filter(r -> isequal(r.x, 1), df)
2×3 DataFrame
 Row │ x       y       z     
     │ Int64?  String  Bool  
─────┼───────────────────────
   1 │      1  c        true
   2 │      1  b       false

julia> df[isless.(1, df.x), :]
3×3 DataFrame
 Row │ x        y       z     
     │ Int64?   String  Bool  
─────┼────────────────────────
   1 │       3  b        true
   2 │       2  a       false
   3 │ missing  b       false
```

Note that [Julia Documentation mentions](https://docs.julialang.org/en/v1/manual/missing/#Equality-and-Comparison-Operators) that in `isless` operator,

>`missing` is considered as greater than any other value.

This is the reason why you see the row containing `missing` in the result of `df[isless.(1, df.x), :]`.

## References

- [DataFrame: how to change value of a cell without knowing the row number](https://discourse.julialang.org/t/dataframe-how-to-change-value-of-a-cell-without-knowing-the-row-number/22024)