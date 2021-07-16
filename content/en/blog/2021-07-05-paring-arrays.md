---
title: "Julia: How to Combine Two Arrays But with Pairs"
date: 2021-07-05T16:59:18-04:00
author: "Hongtao Hao"
slug: julia-paring-arrays
draft: false
toc: false
---
{{<block class="tip">}}
The following codes were tested under Julia v1.6.1 and DataFrames v1.2.0.
{{<end>}}
    
I saw [a question of the same title](https://stackoverflow.com/q/51192207/13716814) for Python.

Let's say we have `a = [1, 2, 3, 4, 5]` and `b = ["a", "b", "c", "d", "e"]`. What we want is `c = [(1, "a"), (2, "b"), (3, "c"), (4, "d"), (5, "e")]`.

The first solution is [hamza sadiqi's own answer](https://stackoverflow.com/q/51192207/13716814) to his own question:

```
julia> using DataFrames

julia> a = 1:5
1:5

julia> b = 'a':'e'
'a':1:'e'

julia> c = [(a[i], b[i]) for i in range(1, length = length(a))]
5-element Vector{Tuple{Int64, Char}}:
 (1, 'a')
 (2, 'b')
 (3, 'c')
 (4, 'd')
 (5, 'e')
```

from [Cameron Bieganek's answer](https://stackoverflow.com/a/56620978/13716814) on Stack Overflow, I realized that I can use the [`zip` function](https://docs.julialang.org/en/v1/base/iterators/#Base.Iterators.zip). 

`zip` will return an iterator. We'll need the [`collect` function](https://docs.julialang.org/en/v1/base/collections/#Base.collect-Tuple{Type,%20Any}) which returns all items in the iterator created by `zip`.

```
julia> z = zip(a,b)
zip(1:5, 'a':1:'e')

julia> typeof(z)
Base.Iterators.Zip{Tuple{UnitRange{Int64}, StepRange{Char, Int64}}}

julia> collect(z)
5-element Vector{Tuple{Int64, Char}}:
 (1, 'a')
 (2, 'b')
 (3, 'c')
 (4, 'd')
 (5, 'e')
```

By the way, the equivalent way in Python is `list(zip())`:

```python
a = [1, 2, 3, 4, 5]
b = ["a", "b", "c", "d", "e"]
list(zip(a, b))
# returns a list: [(1, 'a'), (2, 'b'), (3, 'c'), (4, 'd'), (5, 'e')]
```
