---
title: "Julia: How to Write Data Frames as JSON Files"
date: 2021-07-13T16:35:25-04:00
author: "Hongtao Hao"
slug: julia-write-json
draft: false
toc: true
---
{{<block class="tip">}}
The following post is tested under Julia v1.6.1, DataFrames.jl v1.2.0, JSON.jl v0.21.1, and JSONTables.jl v1.0.1.
{{<end>}}

To export data frames as JSON files in Julia, you need [`JSON.jl`](https://github.com/JuliaIO/JSON.jl), or [`JSONTables.jl`](https://github.com/JuliaData/JSONTables.jl). The key difference between the two packages is that `JSON.jl` transforms **a dictionary, a vector of dictionaries, or a vector of DataFrameRow**, whereas `JSONTables.jl` processes **dataframes**. Note that `JSON.jl` might be capable of processing other forms of data than what I mentioned above, but I don't know what they are. 

To write JSON files, the output can either be a json object of arrays, or a json array of objects. I'll explain the differences between the two in the following part. 

Let's first look at a simple example. 

```julia
using DataFrames, JSON, Dates, DataStructures, JSONTables, Random
dates_simple = collect(Date(2021,1,1):Day(1):Date(2021,1,5))
names_simple = ["John", "Mike", "Tom", "David", "Joshua"]
properties_simple = ["Awesome", "Amazing", "Excellent", "Wonderful", "Awful"]
values_simple = rand(5)
df_simple = DataFrame(:Date => dates_simple, :Name => names_simple, 
    :Property => properties_simple, :Value => values_simple)
```

```
julia> df_simple

5×4 DataFrame
 Row │ Date        Name    Property   Value    
     │ Date        String  String     Float64  
─────┼─────────────────────────────────────────
   1 │ 2021-01-01  John    Awesome    0.590845
   2 │ 2021-01-02  Mike    Amazing    0.766797
   3 │ 2021-01-03  Tom     Excellent  0.566237
   4 │ 2021-01-04  David   Wonderful  0.460085
   5 │ 2021-01-05  Joshua  Awful      0.794026
```

## JSON object of arrays

Let's first look at how to produce a json object of arrays. In a json object of arrays, each column name will be this object's key, and the content of this column will be the key's value.

The easiest way to get a json object of arrays is through JSONTables.jl's `objecttable()`.

```julia
jts_objecttable_source = objecttable(df_simple) # jts here stands for JSONTables
open("jts_objecttable.json", "w") do f
    write(f, jts_objecttable_source)
end
```

{{<figure src="/media/enblog/julia_write_json/jts_objecttable.png" caption="Results of jts_objecttable.json (rendered on Observablehq)" class="fullwidth">}}

We can achieve this through `JSON.jl` as well, and there are two ways we can do this.

The first solution:

```julia
df_simple_dict = OrderedDict(:Date => dates_simple, :Name => names_simple, 
    :Property => properties_simple, :Value => values_simple)
json_string_jjl_1 = JSON.json(df_simple_dict)
open("jjl_objecttable_1.json", "w") do f # jjl here stands for json.jl; w means "writing"
    write(f, json_string_jjl_1)
end
```

{{<figure src="/media/enblog/julia_write_json/jjl_objecttable_1.png" caption="Results of jjl_objecttable_1.json (rendered on Observablehq)" class="fullwidth">}}

The second solution:

```julia
open("jjl_objecttable_2.json", "w") do f
    JSON.print(f, df_simple_dict)
end
```

{{<figure src="/media/enblog/julia_write_json/jjl_objecttable_2.png" caption="Results of jjl_objecttable_2.json (rendered on Observablehq)" class="fullwidth">}}

As you can see, the first option first transforms `df_simple_dict` into JSON, and then uses the `write()` function to export the JSON file. The second option uses `JSON.print()` to do conversion and exporting simultaneously. 

You have these two options when exporting files through `JSON.jl`. I'll use the second one for illustration later in this post. 

## JSON array of objects

In a JSON array of objects, each row in the data frame will be an object in which the df's column name is the key and the cell value is the value. 

It's very easy to produce a JSON array of objects using JSONTables.jl's `arraytable()` function:

```julia
jts_arraytable_source = arraytable(df_simple) # jts here stands for JSONTables
open("jts_arraytable.json", "w") do f
    write(f, jts_arraytable_source)
end
```

{{<figure src="/media/enblog/julia_write_json/jts_arraytable.png" caption="Results of jts_arraytable.json (rendered on Observablehq)" class="fullwidth">}}

To get a JSON array of objects using `JSON.jl`, we need to first obtain an array whose element corresponds to each row in the data frame:

```julia
array_objects = [] # initiate an array
# iterate through the data frame row by row and add each row to array_objects
for r in eachrow(df_simple) 
    push!(array_objects, r)
end

open("jjl_arraytable.json", "w") do f # jjl here stands for json.jl
    JSON.print(f, array_objects)
end
```

{{<figure src="/media/enblog/julia_write_json/jjl_arraytable.png" caption="Results of jjl_arraytable.json (rendered on Observablehq)" class="fullwidth">}}

## Practice: a more complicated data frame

Let's practice through a more complex data frame.

```julia
dates = repeat(dates_simple, inner = 5)
names = repeat(names_simple, outer = 5)
properties = repeat(properties_simple, outer = 5)
values = 10 * rand(25)
df = DataFrame(:Date => dates, :Name => names, :Property => properties, :Value => values)
```

```bash
julia> df

25×4 DataFrame
 Row │ Date        Name    Property   Value    
     │ Date        String  String     Float64  
─────┼─────────────────────────────────────────
   1 │ 2021-01-01  John    Awesome    4.96169
   2 │ 2021-01-01  Mike    Amazing    7.32
   3 │ 2021-01-01  Tom     Excellent  2.99058
   4 │ 2021-01-01  David   Wonderful  4.49182
   5 │ 2021-01-01  Joshua  Awful      8.75096
   6 │ 2021-01-02  John    Awesome    0.462887
   7 │ 2021-01-02  Mike    Amazing    6.98356
   8 │ 2021-01-02  Tom     Excellent  3.65109
  ⋮  │     ⋮         ⋮         ⋮         ⋮
  19 │ 2021-01-04  David   Wonderful  5.9552
  20 │ 2021-01-04  Joshua  Awful      2.92462
  21 │ 2021-01-05  John    Awesome    2.8858
  22 │ 2021-01-05  Mike    Amazing    6.1816
  23 │ 2021-01-05  Tom     Excellent  6.6426
  24 │ 2021-01-05  David   Wonderful  7.53508
  25 │ 2021-01-05  Joshua  Awful      0.368842
                                10 rows omitted
```

Let's say I want an array of objects, similar to the above array tables. Since each person has five values scattered on five dates, I want the value to contain both the date and the corresponding value. 

To do that, we need the `groupby()` function:

```julia
data = []
for g in groupby(df, :Name)
    person_data = OrderedDict(
        "Name" => g.Name[end],
        "Property" => g.Property[end],
        "Value" => collect(zip(g.Date, g.Value))
    )
    push!(data, person_data)
end

open("person_data.json", "w") do f
    JSON.print(f, data)
end
```

{{<figure src="/media/enblog/julia_write_json/person_data.png" caption="Results of person_data.json (rendered on Observablehq)">}}

## References

- [dfdx's response](https://discourse.julialang.org/t/how-to-write-data-to-file-with-json-jl/2993/2) to the question of [How to write data to file with JSON.jl?](https://discourse.julialang.org/t/how-to-write-data-to-file-with-json-jl/2993)

