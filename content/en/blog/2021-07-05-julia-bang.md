---
title: "Julia: So What's the Difference Between ! and : In Dataframes Indexing"
date: 2021-07-05T15:28:44-04:00
author: "Hongtao Hao"
slug: julia-bang
draft: false
toc: true
---
{{<block class="warning">}}
Unless you are able to constantly moniter and update changes in this post, please DO NOT repost it anywere. Feel free to share the link, though. 
{{<end>}}

{{<block class="tip">}}
The following codes were tested under Julia v1.6.1 and DataFrames v1.2.0.
{{<end>}}
    
Similar discussions are found in [this thread on stackoverflow](https://stackoverflow.com/q/60900001/13716814) and Bogumił Kamiński's post of [*On the bang row selector in DataFrames.jl*](https://bkamins.github.io/julialang/2021/01/30/bang.html).

I'll talk about the differences between `df[!, col(s)]` and `df[:, col(s)]` from three aspects: accessing, updating, and adding column(s).

## Accessing column(s)

When `df[!, col(s)]` or `df[:, col(s)]` are on the right hand side of the equal sign `=`, you are **accessing** the column(s). For example, `col1 = df[:, 1]`, in which you are accessing the first column of `df`.

When "accessing" column(s), `df[:, col(s)]` will make a copy of the column(s) and assign it to the variable you are declaring; in this case, `col1`. By contrast, `df[!, col(s)]` [won't make a copy](https://dataframes.juliadata.org/latest/man/getting_started/#The-DataFrame-Type-1). As [fredrikekre rightly puts it](https://stackoverflow.com/a/60900196/13716814):

>(It is) a reference to the underlying vector storing the data, rather than a copy of it.

Since it's not a copy but a reference to the column(s) of `df` itself, if we modify `col1` (if declared with `[df[!, col]`), `df` will be mutated as well.  

For example:

```bash
julia> df1 = DataFrame(col1=1:3, col2='a':'c')
3×2 DataFrame
 Row │ col1   col2 
     │ Int64  Char 
─────┼─────────────
   1 │     1  a
   2 │     2  b
   3 │     3  c

julia> a = df1[!, :col1] # using ! here
3-element Vector{Int64}:
 1
 2
 3

julia> a[2] = 99
99

julia> b = df1[:, :col2] # using : here
3-element Vector{Char}:
 'a': ASCII/Unicode U+0061 (category Ll: Letter, lowercase)
 'b': ASCII/Unicode U+0062 (category Ll: Letter, lowercase)
 'c': ASCII/Unicode U+0063 (category Ll: Letter, lowercase)

julia> b[2] = 'd'
'd': ASCII/Unicode U+0064 (category Ll: Letter, lowercase)

julia> df1
3×2 DataFrame
 Row │ col1   col2 
     │ Int64  Char 
─────┼─────────────
   1 │     1  a
   2 │    99  b
   3 │     3  c
```

As you can see, `col1` is mutated but `col2` is not.

Think about it: if you run `a = [4, 5, 6]` instead of `a[2] = 99`, will `df1` be modified as well? Why or why not?

The answer is no. `df1` won't change. This is because with `a = [4, 5, 6]`, you are reassigning `a`. This re-assignment has no effect on `df1` itself. 

Also, if you run `a = df1[!, :col1][[2,2,3]]` and then `a[2]=99`, will `df1` be mutated? 

The answer is also no. This is because, with `df1[!, :col1][[2,2,3]`, you are creating a new array based on `df1[!, col1]`. Then, with `a[22]=99`, you are mutating the new array, not `df1[!, col1]`.

You can check out [abarnert's answer](https://stackoverflow.com/a/51336360/13716814). It is about Python, not Julia, but the logic is similar. 

## Updating column(s)

When `df[!, col(s)]` or `df[:, col(s)]` are on the left side of the equal sign `=`, you are updating columns. 

When you update column(s), whether you use `!` or `:`, `df` will be mutated. However, how `df` is mutated is different. `!` will create new column(s) to replace the old one(s). Only the updated column will be shown but the old one will be stored in memory. By contrast, `:` will update the values in-place. 

```julia
a = ["Tom", "Mike", "John", "Jason", "Bob"]
b = [missing, 2, 3, missing, 8]
c = [1, 3, missing, 6, missing]
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
   4 │ Jason   missing        6
   5 │ Bob           8  missing 
```

See how `!` will mutate the source:

```bash
julia>df = DataFrame(:Name => a, :Var1 => b, :Var2 => c)

julia> df[!, :Var1] = collect(1:5)
5-element Vector{Int64}:
 1
 2
 3
 4
 5

julia> df
5×3 DataFrame
 Row │ Name    Var1   Var2    
     │ String  Int64  Int64?  
─────┼────────────────────────
   1 │ Tom         1        1
   2 │ Mike        2        3
   3 │ John        3  missing 
   4 │ Jason       4        6
   5 │ Bob         5  missing 

julia> typeof(df.Var1)
Vector{Int64} (alias for Array{Int64, 1})
```

You'll see a slightly different result when using `:`.

```bash
julia>df = DataFrame(:Name => a, :Var1 => b, :Var2 => c)

julia> df[:, :Var1] = collect(1:5) 
5-element Vector{Int64}:
 1
 2
 3
 4
 5

julia> df
5×3 DataFrame
 Row │ Name    Var1    Var2    
     │ String  Int64?  Int64?  
─────┼─────────────────────────
   1 │ Tom          1        1
   2 │ Mike         2        3
   3 │ John         3  missing 
   4 │ Jason        4        6
   5 │ Bob          5  missing 

julia> typeof(df.Var1)
Vector{Union{Missing, Int64}} (alias for Array{Union{Missing, Int64}, 1})

```

Why do we have this difference in `typeof(df.Var1)`?

The explanation can be found in [Bogumił Kamiński's post](https://bkamins.github.io/julialang/2021/01/30/bang.html):

>[U]sing `!` puts a new column passed on the right hand side to the data frame without copying it (no matter if the column exists or not in the data frame), while `:` assigns to an existing column in-place.

Updating multiple columns is the same as updating a single column. The difference is that, to update multiple columns, you need a matrix or a data frame (I don't know how you can update multiple columns with a data frame, though). 

Using `!`:


```julia
df = DataFrame(:Name => a, :Var1 => b, :Var2 => c)
matrixA = [1 2; 3 4; 5 6; 7 8; 9 10 ] # This creates a 5×2 array
df[!, [:Var1, :Var2]] = matrixA
```

```bash
julia> df

5×3 DataFrame
 Row │ Name    Var1   Var2  
     │ String  Int64  Int64 
─────┼──────────────────────
   1 │ Tom         1      2
   2 │ Mike        3      4
   3 │ John        5      6
   4 │ Jason       7      8
   5 │ Bob         9     10
```

{{<block class="note">}}
Bogumił Kamiński wrote in [his summary](https://bkamins.github.io/julialang/2021/01/30/bang#summary-of-the-cases) that when updating a single column, `!` will replace the column without copying. By contrast, when updating multiple columns, `!` will replace the columns with copying. 

I don't know what the difference between "with copying" and "without copying" is. 
{{<end>}}

Using `:`:

```
df = DataFrame(:Name => a, :Var1 => b, :Var2 => c)
matrixA = [1 2; 3 4; 5 6; 7 8; 9 10 ] 
df[:, [:Var1, :Var2]] = matrixA
```

```bash
julia> df

5×3 DataFrame
 Row │ Name    Var1    Var2   
     │ String  Int64?  Int64? 
─────┼────────────────────────
   1 │ Tom          1       2
   2 │ Mike         3       4
   3 │ John         5       6
   4 │ Jason        7       8
   5 │ Bob          9      10
```

### So, how in-place changes are different from creating and replacing?

The following example is taken from [Bogumił Kamiński's post](https://bkamins.github.io/julialang/2021/01/30/bang.html).

```bash
julia> df1 = DataFrame(col1=1:3, col2='a':'c')
3×2 DataFrame
 Row │ col1   col2 
     │ Int64  Char 
─────┼─────────────
   1 │     1  a
   2 │     2  b
   3 │     3  c

julia> col1 = df1.col1
3-element Array{Int64,1}:
 1
 2
 3

julia> v = [11, 13, 13]
3-element Array{Int64,1}:
 11
 13
 13

julia> df1[!, :col1] = v # Using ! here
3-element Array{Int64,1}:
 11
 13
 13
```

Take a break here. Guess what the result of `col1` and  `df2.col1` will be.

```bash
julia> col1
3-element Array{Int64,1}:
 1
 2
 3

julia> df1.col1
3-element Array{Int64,1}:
 11
 13
 13
```

Okay. Let's see what the results will be if we use `:`.

```bash
julia> df1 = DataFrame(col1=1:3, col2='a':'c')
3×2 DataFrame
 Row │ col1   col2 
     │ Int64  Char 
─────┼─────────────
   1 │     1  a
   2 │     2  b
   3 │     3  c

julia> col1 = df1.col1
3-element Array{Int64,1}:
 1
 2
 3

julia> v = [11, 13, 13]
3-element Array{Int64,1}:
 11
 13
 13

julia> df1[:, :col1] = v # Using : here
3-element Array{Int64,1}:
 11
 13
 13
```

See the results:

```bash
julia> col1
3-element Array{Int64,1}:
 11
 12
 13

julia> df1.col1
3-element Array{Int64,1}:
 11
 13
 13
```

Why is it that when we use `df1[!, :col1] = v`, `col1 = [1,2,3]` but when use `df1[:, :col1] = v`, `col1 = [11,12,13]`?

This is because `df1[!, :col1] = v` will first generate a new column and then use that to replace the old one. By contrast, `df1[:, :col1] = v` directly modifies the existing column. Therefore, when using `!`, you will have two `col1`s: the old one and the updated one. Only the updated one will be shown but the old one is stored in memory. That is why `col1` will get the old column of `col1` in `df1` whereas the `df1.col1` will get the updated one. When you use `:`, there is only one `col1`, i.e., the updated one. The old one is erased from memory. Therefore, `col1` will give you only the updated data. 

{{<block class="tip">}}
Read [@Chris Rackauckas's answer](https://stackoverflow.com/a/38602012/13716814) to the question of [*What is the difference between “==” and “===” comparison operators in Julia?*](https://stackoverflow.com/q/38601141/13716814) on Stack Overflow to get a deeper understanding of this difference. 
{{<end>}}

#### Homework

Change `col1 = df1.col1` to `col1 = df1[:, col1]`, and see whether `!` and `:` still generate different results. 

The answer is that when `col1 = df1[:, col1]`, whether you run `df1[!, :col1] = v` or `df1[:, :col1] = v`, `col1` will always return `[1,2,3]`. 

This is because if you use `col1 = df1[:, col]`, `col1` will be a copy of `df1.col1`. Therefore, whatever changes you make to `df1`, `col1` stays unchanged. 

### Broadcasting

A special way to update column(s) is through [**broadcasting**](https://dataframes.juliadata.org/stable/lib/indexing/#Broadcasting).

You'll need [Dot Syntax](https://docs.julialang.org/en/v1/manual/functions/#man-vectorized) to get broadcasting to work. What Dot Syntax does is to apply a function to each element in an array and then to return a new array. 

```bash
julia> df = DataFrame(:Name => a, :Var1 => b, :Var2 => c)

julia> df[!, :Name] .= "Johnson"

julia> df[!, [:Var1, :Var2]] .= 99

julia> df

5×3 DataFrame
 Row │ Name     Var1   Var2  
     │ String   Int64  Int64 
─────┼───────────────────────
   1 │ Johnson     99     99
   2 │ Johnson     99     99
   3 │ Johnson     99     99
   4 │ Johnson     99     99
   5 │ Johnson     99     99
```

{{<block class="tip">}}
Note that in broadcasting, there cannot exist space between `.` and `=`; otherwise, you will see an error. 
{{<end>}}

Both `!` and `:` work in broadcasting. As with non-broadcasting methods to update column(s), `!` first creates new column(s) to replace the old one(s) whereas `:` updates the column(s) in-place.

Please note that there is a restriction when updating column(s) with `:` through broadcasting: the type of object has to be the same as the one you are updating. Otherwise, you will see an error:

```bash
julia> df = DataFrame(:Name => a, :Var1 => b, :Var2 => c)

julia> df[:, :Var1] .= "A"
ERROR: MethodError: Cannot `convert` an object of type String to an object of type Int64
``` 

The same error occurs if you use `df.Var1 .= "A"`. However, `df[!, :Var1] .= "A"` will work because it creates a new column to replace the old one.

{{<block class="note">}}
One thing I don't understand is that if I replace `"A"` with `'a'`, there won't be an error, and all the values are updated to be `65`. 
{{<end>}}

Another thing I don't understand is that `df[!, [:Var1, :Var2]] .= 99` will return the whole data frame whereas `df[:, [:Var1, :Var2]] .= 99` returns only the selected two columns:

```bash
julia> df = DataFrame(:Name => a, :Var1 => b, :Var2 => c)

julia> df[!, [:Var1, :Var2]] .= 99

5×3 DataFrame
 Row │ Name    Var1   Var2  
     │ String  Int64  Int64 
─────┼──────────────────────
   1 │ Tom        99     99
   2 │ Mike       99     99
   3 │ John       99     99
   4 │ Jason      99     99
   5 │ Bob        99     99

julia> df[:, [:Var1, :Var2]] .= 99

5×2 SubDataFrame
 Row │ Var1   Var2  
     │ Int64  Int64 
─────┼──────────────
   1 │    99     99
   2 │    99     99
   3 │    99     99
   4 │    99     99
   5 │    99     99
```

### Updating the value of a single cell

Updating a single cell is different from updating columns: When updating a single cell, `!` will change the source whereas `:` won't. 

This is essentially the same as [# accessing columns](/en/2021/07/05/julia-bang/#accessing-columns).

```bash
julia> df = DataFrame(:Name => a, :Var1 => b, :Var2 => c)

julia> df[!, :Var1][2] = 99
99

julia> df[:, :Var2][2] = 99
99

julia> df
5×3 DataFrame
 Row │ Name    Var1     Var2    
     │ String  Int64?   Int64?  
─────┼──────────────────────────
   1 │ Tom     missing        1
   2 │ Mike         99        3
   3 │ John          3  missing 
   4 │ Jason   missing        6
   5 │ Bob           8  missing 
```

Note that no matter whether you use `:` or `!`, you are [not allowed to change the cell's value to a different type](https://github.com/JuliaData/DataFrames.jl/issues/2816). For example, if you run `df[!, :Var1][2] = "Good"`, you'll see an error:

```bash
MethodError: Cannot `convert` an object of type String to an object of type Int64
```

To force this conversion, you have to convert column data type first:

```julia
typeof(df[!, :Var1]) 
# Returns Vector{Union{Missing, Int64}} (alias for Array{Union{Missing, Int64}, 1}
df[!, :Var1] = string.(df[!, :Var1])
typeof(df[!, :Var1]) # Returns Vector{String} (alias for Array{String, 1})
# Now you can change the value of the cell
df[:, :Var1][2] = "Good"
```

Reference: [DataFrames: convert column data type](https://discourse.julialang.org/t/dataframes-convert-column-data-type/35522)

Or, you can use [`Core.ifelse`](https://docs.julialang.org/en/v1/base/base/#Core.ifelse) as [@bkamins recommended](https://github.com/JuliaData/DataFrames.jl/issues/2816#issuecomment-880233095):

```bash
julia> df = DataFrame(:Name => a, :Var1 => b, :Var2 => c)
5×3 DataFrame
 Row │ Name    Var1     Var2    
     │ String  Int64?   Int64?  
─────┼──────────────────────────
   1 │ Tom     missing        1
   2 │ Mike          2        3
   3 │ John          3  missing 
   4 │ Jason   missing        6
   5 │ Bob           8  missing 

julia> df.Var1 = ifelse.(axes(df.Var1, 1) .== 2, "Good", df.Var1) # 2 is index, not value
5-element Vector{Any}:
  missing
  "Good"
 3
  missing
 8

julia> df
5×3 DataFrame
 Row │ Name    Var1     Var2    
     │ String  Any      Int64?  
─────┼──────────────────────────
   1 │ Tom     missing        1
   2 │ Mike    Good           3
   3 │ John    3        missing 
   4 │ Jason   missing        6
   5 │ Bob     8        missing 
```

## Adding a column

In `df[!, col] = ` or `df[:, col] = `, if `col` is not present in `df`, then a new column will be added. 

```bash
julia> df = DataFrame(:Name => a, :Var1 => b, :Var2 => c)

julia> df[!, :Var3] = collect(11:15)

julia> df[:, :Var4] = collect('e':'i')

julia> df[!, :Var5] .= 99 # Broadcasting

julia> df[:, :Var6] .= 't' # Broadcasting

julia> df

5×7 DataFrame
 Row │ Name    Var1     Var2     Var3   Var4  Var5   Var6 
     │ String  Int64?   Int64?   Int64  Char  Int64  Char 
─────┼────────────────────────────────────────────────────
   1 │ Tom     missing        1     11  e        99  t
   2 │ Mike          2        3     12  f        99  t
   3 │ John          3  missing     13  g        99  t
   4 │ Jason   missing        6     14  h        99  t
   5 │ Bob           8  missing     15  i        99  t
```

Note that it is **IMPOSSIBLE** to add multiple columns. For example, `df[!, [:Var7, :Var8]] .= 99` will throw an error.

## `getproperty`, or `df.col`

I haven't talked about how `df.col` works. It pretty much does the same thing as `df[!, col]`, except:

  - `df.col` is only able to access a single column whereas `df[!, cols]` can access multiple ones;

  - Currently (under Julia v1.6.1 and DataFrames v1.2.0), it is not allowed to create a new column with `df.newcol` through broadcasting. This feature [may be possible in future Julia releases](https://github.com/JuliaLang/julia/pull/39473);

  - When updating a column by broadcasting, `df.col`, like `df[:, col]`, modifies values in-place rather than creating a new column to replace the old one. 

## Conclusion

### A table summarizing the key points

|                                 | df[!, col(s)]                           | df[:, col(s)]          | df.col                    |
|---------------------------------|-----------------------------------------|------------------------|---------------------------|
| Access 1 col                    | direct reference to df                  | a copy of the col      | direct reference     |
| Access cols                     | direct reference                        | a copy of the cols     | ❌               |
| Update 1 col with a vector      | create a new column to replace the old one | modify values in-place | create and replace        |
| Update cols with a matrix or df | create and replace  | modify in-place        | ❌                         |
| Update 1 col with broadcasting  | create and replace | modify in-place        | *modify in-place*           |
| Update cols with broadcasting   | create and replace | modify in-place        | ❌                         |
| Add 1 col with a vector         | create a new col                        | create a new col       | create a new col |
| Add cols                        | ❌                                       | ❌                      | ❌                         |
| Add 1 col with broadcasting     | create a new col                        | create a new col       | ❌ ([available later](https://github.com/JuliaData/DataFrames.jl/issues/2804)) |
| Add cols with broadcasting      | ❌                                       | ❌                      | ❌                         |

### Best practices

- It seems to me that the only situation where you have to use `!` instead of `:` is if you have values of a different type when updating column(s).

- If you are accessing a column or columns **directly**, it's always better to use `:`, instead of `!`. For example, you are declaring a variable `a`: `a = df[!, col1]`. Later when you modify `a`, you might mutate `df` as well. 

  If you are accessing a column or columns **indirectly**, it's Okay, and desirable to use `df.col`, which is simpler. Examples of indirect access may be `a = first(df, 5).col1` or `a = filter(r -> r.col1 == "A", df).col2`. Both operations will get you a new data frame, so whatever you do with `a`, `df` won't be mutated. In these cases, `df.col` is much simpler. 

  When you are accessing a column or columns directly, there is one situation where you want to use `!` (or `df.col` if it's a single column). That is when you want to store the column(s) before you update that column(s). I have covered that point in the section of [So, how in-place changes are different from creating and replacing?](/en/2021/07/05/julia-bang/#so-how-in-place-changes-are-different-from-creating-and-replacing).