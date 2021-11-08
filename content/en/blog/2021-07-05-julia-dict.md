---
title: "Julia: Dict"
date: 2021-07-05T17:21:54-04:00
author: "Hongtao Hao"
slug: julia-dict
draft: false
toc: false
---
{{<block class="tip">}}
The following codes run under Julia v1.6.1 and DataStructures v0.17.20.
{{<end>}}
  
## How to access values by using keys

Creating a dictionary with String keys:

```
julia> dict = Dict("A" => 1, "B" => 2, "C" => 3)
Dict{String, Int64} with 3 entries:
  "B" => 2
  "A" => 1
  "C" => 3

julia> dict["A"]
1
```

Creating a dictionary with Symbols:

I learned it from the post of [*Julia Dictionary*](https://www.geeksforgeeks.org/julia-dictionary/) by Geeks for Geeks. 

```
julia> dict2 = Dict(:A => 4, :B => 5, :C => 6)
Dict{Symbol, Int64} with 3 entries:
  :A => 4
  :B => 5
  :C => 6

julia> dict2[:A]
4
```

## How to add a new key

```
julia> dict["D"] = 9
9
```

## How to get an array of keys in a dict

```
julia> keys(dict)
KeySet for a Dict{String, Int64} with 3 entries. Keys:
  "B"
  "A"
  "C"

julia> collect(keys(dict))
3-element Vector{String}:
 "B"
 "A"
 "C"
```

## How to create a reverse dictionary

Sometimes, it's useful to create a reverse dictionary. I found a way to do it:

```
julia> dict = Dict("A" => 1, "B" => 2, "C" => 3)
Dict{String, Int64} with 3 entries:
  "B" => 2
  "A" => 1
  "C" => 3

julia> reverse_dict = Dict() # initiating an empty dictionary
Dict{Any, Any}()

julia> for i in keys(dict)
           reverse_dict[dict[i]] = i
       end

julia> reverse_dict
Dict{Any, Any} with 3 entries:
  2 => "B"
  3 => "C"
  1 => "A"
```

In fact, after reading the section of "Example 3: By using (key, value) tuples" on [Geeks for Geeks' tutorial on Julia's Dictionary](https://www.geeksforgeeks.org/julia-dictionary/), I found a simpler way:

```julia
dict = Dict("A" => 1, "B" => 2, "C" => 3)

reverse_dict = Dict() # Initiating an empty dictionary

for (k, v) in dict
    reverse_dict[v] = k
end
```

## How to preserve the order of inputs when create a Julia Dict

Dictionaries created by Julia Base are unsorted. I learned from [kmsquire's answer](https://stackoverflow.com/a/29904797/13716814) on Stack Overflow that if you want to preserve the order of keys you inserted, you can use [OrderedCollections.jl](https://juliacollections.github.io/OrderedCollections.jl/latest/ordered_containers.html), which is part of [DataStructures.jl](https://juliacollections.github.io/DataStructures.jl/latest/). So you'll need to install DataStructures.jl.

```
julia> OrderedDict("USA" => 22, "China" => 33, "Japan" => 44, "Nigeria" => 11, "South Korea" => 77)
Dict{String, Int64} with 5 entries:
  "USA"         => 22
  "South Korea" => 77
  "China"       => 33
  "Nigeria"     => 11
  "Japan"       => 44

julia> using DataStructures

julia> OrderedDict("USA" => 22, "China" => 33, "Japan" => 44, "Nigeria" => 11, "South Korea" => 77)
OrderedDict{String, Int64} with 5 entries:
  "USA"         => 22
  "China"       => 33
  "Japan"       => 44
  "Nigeria"     => 11
  "South Korea" => 77
```

## How to create a Dict from a DataFrame

See [here](https://stackoverflow.com/a/63752262).

## References

- [Julia Dictionary](https://www.geeksforgeeks.org/julia-dictionary/) on [Geeks for Geeks](https://www.geeksforgeeks.org/)