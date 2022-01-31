---
title: "Julia Tips"
date: 2022-01-12T19:39:39-06:00
author: "Hongtao Hao"
slug: julia-tips
draft: false
toc: false
---
## DataFrames

1. Select multiple columns:

[Reference](https://stackoverflow.com/questions/63155661/multiple-column-selection-on-a-julia-dataframe)

```
select(df, Between(1, 3), Between(4, 6))
```

2. Rename columns

[Reference](https://stackoverflow.com/questions/51902626/rename-dataframe-column-names-julia-v1-0)

```
colnames = ["why", "not"]
rename!(df, Symbol.(colnames))
```

3. Delete a row (1st row in the following example)

```
delete!(df, 1)
```

4. Delete a column (1st column in the following example)

```
select!(df, Not(1))
```

5. Drop missing values in some but not all colomns


[Reference](https://discourse.julialang.org/t/how-to-remove-rows-containing-missing-from-dataframe/12234/7)

```julia
dropmissing(df, [:A, :B])
```

6. Add a column by concatenating strings

[Reference](https://www.geeksforgeeks.org/string-concatenation-in-julia/)

```julia
df[:, :NewColname] = string.(df.first_col, " ", df.second_col)
```

## Vector, Array

1. Initialize an empty vector of strings

[Reference](https://discourse.julialang.org/t/how-do-i-initialize-an-empty-array-vector-of-strings-and-then-push-strings-into/56980/2)

```julia
t = String[];
push!(t, "Anything")
```

2. Export an array to CSV

[Reference](https://stackoverflow.com/a/52900669)

```julia
using DelimitedFilees
writedlm("FileName.csv", A, ',') 
# A is the array
```