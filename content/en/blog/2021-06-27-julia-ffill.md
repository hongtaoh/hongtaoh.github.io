---
title: "Julia: How to Fill A Missing Value with the Previous Non-missing Value"
date: 2021-06-27T11:18:26-04:00
author: "Hongtao Hao"
slug: julia-ffill
draft: false
toc: false
---
{{<block class="tip">}}
The following codes were tested under Julia v1.6.1 and DataFrames v1.2.0.
{{<end>}}

I saw this question on Stack Overflow: [What's an efficient way to fill `missing` values with previous non-missing value?](https://stackoverflow.com/q/58722185/13716814).

I'll answer in the following.

The following answer is entirely based on the discussions in this thread: [Julia DataFrame Fill NA with LOCF](https://stackoverflow.com/q/41196748/13716814). More specifically, it is based on the answers by Danish Shrestha, [Dan Getz](https://stackoverflow.com/a/41198219/13716814), and [btsays](https://stackoverflow.com/a/67465356/13716814).

As [laborg](https://stackoverflow.com/a/58724665/13716814) implies, the [`accumulate`](https://docs.julialang.org/en/v1/base/arrays/#Base.accumulate) function in Base Julia will do the job. 

Suppose we have an array: `a = [1, missing, 2, missing, 9]`. We want to replace the 1st `missing` with `1` and the second with `2`: a = [1, 1, 2, 2, 9], which is `a = a[[1, 1, 3, 3, 5]]` ([1, 1, 3, 3, 5] here are indexes). 

This function will do the job:

```julia
ffill(v) = v[accumulate(max, [i*!ismissing(v[i]) for i in 1:length(v)], init=1)]
```
BTW, "ffill" means "forward filling", a name I adopted from Pandas. 

I'll explain in the following. 

What the `accumulate` function does is that it returns a new array based on the array we input. 

For those of you who are new to Julia like me: in Julia's mathematical operations, `i*true = i`, and `i*false=0`. Therefore, when an element in the array is NOT missing, then `i*!ismissing() = i`; otherwise,  `i*!ismissing() = 0`.

In the case of `a = [1, missing, 2, missing, 9]`, `[i*!ismissing(a[i]) for i in 1:length(a)]` will return `[1, 0, 3, 0, 5]`. Since this array is in the `accumulate` function where the operation is `max`, we'll get `[1, 1, 3, 3, 5]`.

Then `a[[1, 1, 3, 3, 5]]` will return `[1, 1, 2, 2, 9]`.

That's why 

```julia
a = ffill(a)
```
will get `[1, 1, 2, 2, 9]`.

Now, you may wonder why we have `init = 1` in `ffill(v)`. Say, `b = [missing, 1, missing, 3]`. Then, `[i*!ismissing(b[i]) for i in 1:length(b)]` will return `[0, 2, 0, 4]`. Then the `accumulate` function will return [0, 2, 2, 4]. The next step, b[[0, 2, 2, 4]] will throw an error because in Julia, index starts from `1` not `0`. Therefore, `b[0]` doesn't mean anything. 

With `init = 1` in the `accumulate` function, we'll get [1, 2, 2, 4] rather than [0, 2, 2, 4] since 1 (the `init` we set) is larger than 0 (the first number).

We can go further from here. The `ffill()` function above only works for a single array. But what if we have a large dataframe?

Say, we have:

```julia
using DataFrames

a = ["Tom", "Mike", "John", "Jason", "Bob"]
b = [missing, 2, 3, missing, 8]
c = [1, 3, missing, 99, missing]
df = DataFrame(:Name => a, :Var1 => b, :Var2 => c)
```

```bash
julia> df

5×3 DataFrame
 Row │ Name    Var1     Var2    
     │ String  Int64?   Int64?  
─────┼──────────────────────────
   1 │ Tom     missing        1
   2 │ Mike          2        3
   3 │ John          3  missing 
   4 │ Jason   missing       99
   5 │ Bob           8  missing 
```

Here, [Dan Getz's answer](https://stackoverflow.com/a/41198219/13716814) comes in handy:

```julia
nona_df = DataFrame([ffill(df[!, c]) for c in names(df)], names(df))
```

```bash
julia> nona_df 

5×3 DataFrame
 Row │ Name    Var1     Var2   
     │ String  Int64?   Int64? 
─────┼─────────────────────────
   1 │ Tom     missing       1
   2 │ Mike          2       3
   3 │ John          3       3
   4 │ Jason         3      99
   5 │ Bob           8      99
```

## Reflections

- Two questions to think about:

  1. In `nona_df = ...`, is there any difference between using `ffill(df[!, c])` and using `ffill(df[:, c])`?

  2. When we use `ffill(df[!, c])`, will values in the original `df` be changed as well?

- Answers to the above two questions:

  1. `!` and `:` are different when accessing a column. `!` references directly to `df` whereas `:` makes a copy of that column. In the case of `ffill`, the function basically creates a new array based on the array we input. Therefore, no matter how we modify the result of`ffill(df[!, c])` or `ffill(df[:, c])`, `df` remains unchanged. So practically speaking, there is no difference between using `ffill(df[!, c])` and using `ffill(df[:, c])`.

  2. No. `df` will remain the same. 