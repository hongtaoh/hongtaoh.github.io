---
title: "Julia: How to Plot A Subset of A DataFrame"
date: 2021-11-06T09:30:38-05:00
author: "Hongtao Hao"
slug: julia-plots-df-subset
draft: false
toc: false
---
This post also answers the question of "How to plot timeseries in Julia Plots".

```
using DataFrames, Dates, Plots, StatsPlots
```

```
time = collect(Date(2016,1,1):Year(1):Date(2021,1,1))
```

```
6-element Vector{Date}:
 2016-01-01
 2017-01-01
 2018-01-01
 2019-01-01
 2020-01-01
 2021-01-01
```

```
df = DataFrame(A=time, B=rand(6), C=rand(6), D=10*rand(6))
```

```
6×4 DataFrame
 Row │ A           B          C         D       
     │ Date        Float64    Float64   Float64 
─────┼──────────────────────────────────────────
   1 │ 2016-01-01  0.0514108  0.621983  1.89575
   2 │ 2017-01-01  0.0424919  0.7281    4.25318
   3 │ 2018-01-01  0.435236   0.228105  7.55767
   4 │ 2019-01-01  0.489223   0.809564  8.02765
   5 │ 2020-01-01  0.223332   0.405445  7.78306
   6 │ 2021-01-01  0.426019   0.950642  1.43597
```

It's Okay if you just want to plot one column, say, Column B:

```
plot(df.A, df.B, label="B")
```

{{<figure src="/media/enblog/julia-tutorial/julia-plots-df-subset-B.png">}}

However, if you want to plot all other columns, you'll see an error:

```
plot(df.A, df[:, 2:4])
```

```
Cannot convert DataFrame to series data for plotting
...
...
```

We see this error because we need to [use matrices (rather than a DataFrame) if we want to plot multiple columns](https://docs.juliaplots.org/latest/input_data/#columns-are-series).

So what we need is:

```
df_matrix = Matrix(df[:, 2:4])
plot(df.A, df_matrix)
``` 

{{<figure src="/media/enblog/julia-tutorial/julia-plots-df-subset-2.png">}}

That's good. But, what about the legends?

We can do this:

```
plot(df.A, df_matrix, labels=["B" "C" "D"])
plot!(size = (750, 400))
```

{{<figure src="/media/enblog/julia-tutorial/julia-plots-df-subset-3.png">}}

But what if you have a lot of columns, say, 100? It's impractical for you to manually enter their labels. What should we do then?

When we check the labels, we can see that `["B" "C" "D"]` is a 1×3 Matrix:

```
julia> ["B" "C" "D"]
1×3 Matrix{String}:
 "B"  "C"  "D"
```

So we need a matrix of all the column names for the `label` parameter.

First, let's get the column names:

```
label_names = names(df[:, 2:4])
```

```
3-element Vector{String}:
 "B"
 "C"
 "D"
```

Then, let's transform this vector to a 1×3 Matrix:

```
label_matrix = reshape(label_names, 1, length(label_names))
```

```
1×3 Matrix{String}:
 "B"  "C"  "D"
```

Then, we just pass the `label_matrix` to `label`:

```
plot(df.A, df_matrix, labels=label_matrix)
```

<!-- 我不理解的是：

```
@df df plot(:A, [:B, :C, :D])
```

可以出图，但是

```
s = [:B, :C, :D]
@df df plot(:A, s)
```

不行 -->