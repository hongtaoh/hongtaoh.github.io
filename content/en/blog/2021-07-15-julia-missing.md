---
title: "Julia: How to Replace Missing Values in A Data Frame"
date: 2021-07-15T10:42:27-04:00
author: "Hongtao Hao"
slug: julia-replace-missing
draft: false
toc: true
---
{{<block class="warning">}}
Unless you are able to constantly moniter and update changes in this post, please DO NOT repost it anywere. Feel free to share the link, though. 
{{<end>}}

{{<block class="tip">}}
This post is tested under Julia v1.6.1 and DataFrames v1.2.0.
{{<end>}}
    
A simple example:

```julia
using DataFrames
name = ["Julia", "Mike", "Tom", "John"]
x = [2, missing, 4, missing]
y = [missing, 3, missing, 5]
df = DataFrame(:name => name, :var1 => x, :var2 => y)
```

```bash
julia> df
4×3 DataFrame
 Row │ name    var1     var2    
     │ String  Int64?   Int64?  
─────┼──────────────────────────
   1 │ Julia         2  missing 
   2 │ Mike    missing        3
   3 │ Tom           4  missing 
   4 │ John    missing        5
```

## Replace missing value with a specific value

[Cameron Bieganek](https://stackoverflow.com/a/56361434/13716814) has given a very detailed answer on Stack Overflow. You can either use `Base.replace!`, `Base.replace`, `Base.ismissing`, or `Base.coalesce`. 

### Base.replace!

Using `Base.replace!` is convenient but cannot change the type of the column:

```bash
julia> replace!(df.var1, missing => 0)

julia> df
4×3 DataFrame
 Row │ name    var1    var2    
     │ String  Int64?  Int64?  
─────┼─────────────────────────
   1 │ Julia        2  missing 
   2 │ Mike         0        3
   3 │ Tom          4  missing 
   4 │ John         0        5

julia> typeof(df.var1)
Vector{Union{Missing, Int64}} (alias for Array{Union{Missing, Int64}, 1})
```

You can still see the question mark following `Int64` under `var1`, and the data type of the column of `var1` indicates that it still contains missing. 

Also, `Base.replace!` won't allow you to replace missing values with something of a different data type:

```bash
julia> df = DataFrame(:name => name, :var1 => x, :var2 => y)
4×3 DataFrame
 Row │ name    var1     var2    
     │ String  Int64?   Int64?  
─────┼──────────────────────────
   1 │ Julia         2  missing 
   2 │ Mike    missing        3
   3 │ Tom           4  missing 
   4 │ John    missing        5

julia> replace!(df.var1, missing => "Good")
ERROR: MethodError: Cannot `convert` an object of type String to an object of type Int64
```

This is because [`replace!` updates values in the `df.var1` in-place](https://dataframes.juliadata.org/stable/man/working_with_dataframes/#Replacing-Data). Since "Good" is a string, neither `missing` or an integer, in-place operation is disallowed. 

In fact, here, `replace!(df.var1, missing => "Good")` is equivalent to `df[:, :var1] = replace(df.var1, missing => "Good")` which [also updates values in-place](/en/2021/07/05/julia-bang/#updating-columns) and therefore is alos disallowed:

```bash
julia> df = DataFrame(:name => name, :var1 => x, :var2 => y)
4×3 DataFrame
 Row │ name    var1     var2    
     │ String  Int64?   Int64?  
─────┼──────────────────────────
   1 │ Julia         2  missing 
   2 │ Mike    missing        3
   3 │ Tom           4  missing 
   4 │ John    missing        5

julia> df[:, :var1] = replace(df.var1, missing => "Good")
ERROR: MethodError: Cannot `convert` an object of type String to an object of type Int64
```

### Base.replace

Using `Base.replace` can solve both problems:

```bash
julia> df = DataFrame(:name => name, :var1 => x, :var2 => y)
4×3 DataFrame
 Row │ name    var1     var2    
     │ String  Int64?   Int64?  
─────┼──────────────────────────
   1 │ Julia         2  missing 
   2 │ Mike    missing        3
   3 │ Tom           4  missing 
   4 │ John    missing        5

julia> df.var1 = replace(df.var1, missing => 0)

# Note the the question mark following Int64 under var1 disappears
julia> df
4×3 DataFrame
 Row │ name    var1   var2    
     │ String  Int64  Int64?  
─────┼────────────────────────
   1 │ Julia       2  missing 
   2 │ Mike        0        3
   3 │ Tom         4  missing 
   4 │ John        0        5

julia> typeof(df.var1)
Vector{Int64} (alias for Array{Int64, 1})

julia> df.var2 = replace(df.var2, missing => "Good")
4-element Vector{Any}:
  "Good"
 3
  "Good"
 5

julia> df
4×3 DataFrame
 Row │ name    var1   var2 
     │ String  Int64  Any  
─────┼─────────────────────
   1 │ Julia       2  Good
   2 │ Mike        0  3
   3 │ Tom         4  Good
   4 │ John        0  5
```

You are allowed to replace missing values with strings here because `df.var2 =` [updates the column by allocating the new column vector](/en/2021/07/05/julia-bang/#updating-columns) you just created with  `Base.replace()`. Only the updated data is shown but the old column is stored in memory. 

Since it's not changes in-place, but rather a new column inserted, you can change `missing` to values of any data type. 

### Base.coalesce

[`Base.coalesce(x, y)`](https://docs.julialang.org/en/v1/base/base/#Base.coalesce) returns the first value in the argument which is not `missing`, if any. Otherwise, it returns `missing`.

```bash
julia> df = DataFrame(:name => name, :var1 => x, :var2 => y)

julia> df.var1 = coalesce.(df.var1, 0)

julia> df
4×3 DataFrame
 Row │ name    var1   var2    
     │ String  Int64  Int64?  
─────┼────────────────────────
   1 │ Julia       2  missing 
   2 │ Mike        0        3
   3 │ Tom         4  missing 
   4 │ John        0        5
```

Note that you cannot omit the [dot](https://docs.julialang.org/en/v1/manual/functions/#man-vectorized) in `coalesce.`, which indicates that the function applies to each element in `df.var1`, which is an array. 

Also note that you are allowed to replace missing values with things of a different type. With `df.var1 = coalesce.(df.var1, "Good")`, you are creating a new column which replaces the old one. 

```bash
julia> df = DataFrame(:name => name, :var1 => x, :var2 => y)
4×3 DataFrame
 Row │ name    var1     var2    
     │ String  Int64?   Int64?  
─────┼──────────────────────────
   1 │ Julia         2  missing 
   2 │ Mike    missing        3
   3 │ Tom           4  missing 
   4 │ John    missing        5

julia> df.var1 = coalesce.(df.var1, "Good")

julia> df
4×3 DataFrame
 Row │ name    var1  var2    
     │ String  Any   Int64?  
─────┼───────────────────────
   1 │ Julia   2     missing 
   2 │ Mike    Good        3
   3 │ Tom     4     missing 
   4 │ John    Good        5
```

To dig deeper, if you add a dot before `=`, that is, `df.var1 .= coalesce.(df.var1, "Good")`, you are applying the operation in-place, and therefore it is disallowed:

```bash
julia> df = DataFrame(:name => name, :var1 => x, :var2 => y)
4×3 DataFrame
 Row │ name    var1     var2    
     │ String  Int64?   Int64?  
─────┼──────────────────────────
   1 │ Julia         2  missing 
   2 │ Mike    missing        3
   3 │ Tom           4  missing 
   4 │ John    missing        5

julia> df.var1 .= coalesce.(df.var1, "Good")
ERROR: MethodError: Cannot `convert` an object of type String to an object of type Int64
```

To summarize, `Base.replace!` update values in-place; therefore, you cannot replace missing with values of a different data type. You are able to do so by using `df.var1 = foo`. The `foo` here might involve `replace` or `coalesce.`. It creates a new column which replaces the old column of `var1`.  

Note that if you use `df.var1 .= foo`, with a dot before `=`, you are applying the operation in-place; therefore, replacement with a different data type is disallowed. 

### Replacement operations on the whole data frame

To replace missing values in the whole data frame, you need a [for loop](https://docs.julialang.org/en/v1/base/base/#for) combined with the above mentioned solutions.

```julia
for col in eachcol(df)
    col = replace(col, missing => 0)
end
```

which comes from roelpi's post: [Replacing NaN/Missing in Julia DataFrames](https://www.roelpeters.be/replacing-nan-missing-in-julia-dataframes/).

Or,

```julia
for i in 1:size(df)[2] # size(df)[2] returns the number of columns in df
    df[!, i] = coalesce.(df[!, i], 0)
end
```

The simplest way is on [the official documentation of DataFrames.jl](https://dataframes.juliadata.org/stable/man/working_with_dataframes/#Replacing-Data):

```bash
julia> df = DataFrame(:name => name, :var1 => x, :var2 => y)
4×3 DataFrame
 Row │ name    var1     var2    
     │ String  Int64?   Int64?  
─────┼──────────────────────────
   1 │ Julia         2  missing 
   2 │ Mike    missing        3
   3 │ Tom           4  missing 
   4 │ John    missing        5

julia> df .= ifelse.(isequal.(df, missing), 0, df)
4×3 DataFrame
 Row │ name    var1    var2   
     │ String  Int64?  Int64? 
─────┼────────────────────────
   1 │ Julia        2       0
   2 │ Mike         0       3
   3 │ Tom          4       0
   4 │ John         0       5
```

You can replace `isequal.(df, missing)` with `ismissing.(df)`, which will get you the same result.

There is one restriction when you use dot syntax, i.e., having a dot in `df .=`: you cannot convert missing to values of other data types. Let's say we have a missing value in the `name` column as well:

```bash
julia> name = ["Julia", missing, "Tom", "John"]

julia> x = [2, missing, 4, missing]

julia> y = [missing, 3, missing, 5]

julia> df = DataFrame(:name => name, :var1 => x, :var2 => y)
4×3 DataFrame
 Row │ name     var1     var2    
     │ String?  Int64?   Int64?  
─────┼───────────────────────────
   1 │ Julia          2  missing 
   2 │ missing  missing        3
   3 │ Tom            4  missing 
   4 │ John     missing        5

julia> df .= ifelse.(ismissing.(df), 0, df)
ERROR: MethodError: Cannot `convert` an object of type Int64 to an object of type String
``` 

With the doc before `=`, you are applying the operation in-place, which disallows replacement with a different data type. That is why you see an error when replacing the missing value in the `name` column with 0.

You can curciumvent this restriction by simply omitting the `.`. This way, you are creating new column vectors that replace the one ones.

```bash
julia> df = ifelse.(ismissing.(df), 0, df)
# Note how each column's data type changes
4×3 DataFrame
 Row │ name   var1   var2  
     │ Any    Int64  Int64 
─────┼─────────────────────
   1 │ Julia      2      0
   2 │ 0          0      3
   3 │ Tom        4      0
   4 │ John       0      5
```

{{<block class="tip">}}
I can totally understand how the [dot syntax](https://docs.julialang.org/en/v1/manual/functions/#man-vectorized) works for a vector:

```bash
julia> a = [1, 2, 3]
3-element Vector{Int64}:
 1
 2
 3

julia> sin.(a)
3-element Vector{Float64}:
 0.8414709848078965
 0.9092974268256817
 0.1411200080598672
```

However, I don't understand how the doc syntax can work for a data frame: `ismissing.(df)`. 

I wanted to understand [what's going on](https://docs.julialang.org/en/v1/devdocs/reflection/#Reflection-and-introspection). I first tried `@code_warntype`:

```bash
julia> df = DataFrame(:name => name, :var1 => x, :var2 => y)
4×3 DataFrame
 Row │ name    var1     var2    
     │ String  Int64?   Int64?  
─────┼──────────────────────────
   1 │ Julia         2  missing 
   2 │ Mike    missing        3
   3 │ Tom           4  missing 
   4 │ John    missing        5

julia> @code_warntype ismissing.(df)
Variables
  #self#::Core.Const(var"##dotfunction#257#1"())
  x1::DataFrame

Body::DataFrame
1 ─ %1 = Base.broadcasted(Main.ismissing, x1)::Base.Broadcast.Broadcasted{DataFrames.DataFrameStyle, Nothing, typeof(ismissing), Tuple{DataFrame}}
│   %2 = Base.materialize(%1)::DataFrame
└──      return %2
```

`Meta@lower` and `@code_lowered` gave basically the same result. I didn't quite understand it. Then I tried `@code_typed`:

```bash
julia> @code_typed ismissing.(df)
CodeInfo(
1 ─ %1  = Core.tuple(x1)::Tuple{DataFrame}
│   %2  = invoke DataFrames.nrow(_2::DataFrame)::Int64
│   %3  = DataFrames.getfield(x1, :colindex)::DataFrames.Index
│   %4  = Base.getfield(%3, :names)::Vector{Symbol}
│   %5  = Base.arraylen(%4)::Int64
│   %6  = Base.slt_int(%2, 0)::Bool
│   %7  = Base.ifelse(%6, 0, %2)::Int64
│   %8  = %new(Base.OneTo{Int64}, %7)::Base.OneTo{Int64}
│   %9  = Base.slt_int(%5, 0)::Bool
│   %10 = Base.ifelse(%9, 0, %5)::Int64
│   %11 = %new(Base.OneTo{Int64}, %10)::Base.OneTo{Int64}
│   %12 = Core.tuple(%8, %11)::Tuple{Base.OneTo{Int64}, Base.OneTo{Int64}}
│   %13 = %new(Base.Broadcast.Broadcasted{DataFrames.DataFrameStyle, Tuple{Base.OneTo{Int64}, Base.OneTo{Int64}}, typeof(ismissing), Tuple{DataFrame}}, ismissing, %1, %12)::Base.Broadcast.Broadcasted{DataFrames.DataFrameStyle, Tuple{Base.OneTo{Int64}, Base.OneTo{Int64}}, typeof(ismissing), Tuple{DataFrame}}
│   %14 = invoke Base.Broadcast.copy(%13::Base.Broadcast.Broadcasted{DataFrames.DataFrameStyle, Tuple{Base.OneTo{Int64}, Base.OneTo{Int64}}, typeof(ismissing), Tuple{DataFrame}})::DataFrame
└──       return %14
) => DataFrame
```

It seems the process involves a lot with the [source codes of `Base.broadcast`](https://github.com/JuliaLang/julia/blob/master/base/broadcast.jl). My understanding is that `ismissing.(df)` will iterate each row (or column?) in `df`. Each iteration returns a BitVector. 

```bash
julia> ismissing.(df.var1)
4-element BitVector:
 0
 1
 0
 1
```

All these BitVectors are then "[materialized](https://github.com/JuliaLang/julia/blob/2893de764f86e3990e74a3cefdd46e13eb93a676/base/broadcast.jl#L900)" into a data frame.
{{<end>}}

## Replace missing values with the previous non-missing value

Read my other post: [Julia: How to Fill A Missing Value with the Previous Non-missing Value](/en/2021/06/27/julia-ffill/) for details. 

## Replace missing values with values from another column

With `coalesce.`, you can replace missing values in a column with values in another:

```bash
julia> df = DataFrame(:name => name, :var1 => x, :var2 => y)
4×3 DataFrame
 Row │ name    var1     var2    
     │ String  Int64?   Int64?  
─────┼──────────────────────────
   1 │ Julia         2  missing 
   2 │ Mike    missing        3
   3 │ Tom           4  missing 
   4 │ John    missing        5

julia> df.var1 = coalesce.(df.var1, df.var2)

julia> df
4×3 DataFrame
 Row │ name    var1   var2    
     │ String  Int64  Int64?  
─────┼────────────────────────
   1 │ Julia       2  missing 
   2 │ Mike        3        3
   3 │ Tom         4  missing 
   4 │ John        5        5
```

This is very useful if you have the missing data, and want to merge & update. 

For example, `var1` for Mike and John is `3` and `5` respectively. Then you can do this:

```bash
julia> df = DataFrame(:name => name, :var1 => x, :var2 => y)

julia> name1 = ["Mike", "John"]

julia> x1 = [3, 5]

julia> df1 = DataFrame(:name => name1, :var1 => x1)
2×2 DataFrame
 Row │ name    var1  
     │ String  Int64 
─────┼───────────────
   1 │ Mike        3
   2 │ John        5

julia> df_full = leftjoin(df, df1, on="name", makeunique=true)
4×4 DataFrame
 Row │ name    var1     var2     var1_1  
     │ String  Int64?   Int64?   Int64?  
─────┼───────────────────────────────────
   1 │ Mike    missing        3        3
   2 │ John    missing        5        5
   3 │ Julia         2  missing  missing 
   4 │ Tom           4  missing  missing 

julia> df_full.var1 = coalesce.(df_full.var1, df_full.var1_1)

julia> df_full
4×4 DataFrame
 Row │ name    var1   var2     var1_1  
     │ String  Int64  Int64?   Int64?  
─────┼─────────────────────────────────
   1 │ Mike        3        3        3
   2 │ John        5        5        5
   3 │ Julia       2  missing  missing 
   4 │ Tom         4  missing  missing 

julia> select!(df_full, Not(:var1_1))
4×3 DataFrame
 Row │ name    var1   var2    
     │ String  Int64  Int64?  
─────┼────────────────────────
   1 │ Mike        3        3
   2 │ John        5        5
   3 │ Julia       2  missing 
   4 │ Tom         4  missing 
```

The above solution comes from @chedieck's issue: [Merge two DataFrames only to missing values](https://github.com/JuliaData/DataFrames.jl/issues/2243).

## Replace missing values by using a dictionary

```bash
julia> df = DataFrame(:name => name, :var1 => x, :var2 => y)
4×3 DataFrame
 Row │ name    var1     var2    
     │ String  Int64?   Int64?  
─────┼──────────────────────────
   1 │ Julia         2  missing 
   2 │ Mike    missing        3
   3 │ Tom           4  missing 
   4 │ John    missing        5

julia> dict = Dict(
           "Mike" => 3,
           "John" => 5
       )
Dict{String, Int64} with 2 entries:
  "John" => 5
  "Mike" => 3

julia> for r in eachrow(df)
           if r.name in collect(keys(dict))
               r.var1 = coalesce(r.var1, dict[r.name])
           end
       end

julia> df
4×3 DataFrame
 Row │ name    var1    var2    
     │ String  Int64?  Int64?  
─────┼─────────────────────────
   1 │ Julia        2  missing 
   2 │ Mike         3        3
   3 │ Tom          4  missing 
   4 │ John         5        5
```

## References

- [Replacing NaN/Missing in Julia DataFrames](https://www.roelpeters.be/replacing-nan-missing-in-julia-dataframes/) by roelpi

- [Cameron Bieganek's response](https://stackoverflow.com/a/56361434/13716814) to [Julia | DataFrame | Replacing missing Values](https://stackoverflow.com/q/34611109/13716814) on Stack Overflow

- [*Replacing data*](https://dataframes.juliadata.org/stable/man/working_with_dataframes/#Replacing-Data) on the [official documentation of DataFrames.jl](https://dataframes.juliadata.org/stable/)


