---
title: Understanding the Groupby Function in Pandas
date: 2021-07-10T16:17:09-04:00
author: "Hongtao Hao"
slug: pandas-groupby
draft: false
toc: false
---
## Some key points

- Suppose you have a DataFrame named as `df`, then `df.groupby('param')` will create multiple groups based on the parameter you provide.

- Each group is a DataFrame. 

- For each group, `group[0]` is the string of `param`, whereas `group[1]` is the group's actual data in the form DataFrame.

## How to get a specific group's data

```python
dfGroupby = df.groupby('param')
dfGroupby.get_group("GROUP_NAME")
```

## How to print a groupby object

Question is posted here: https://stackoverflow.com/questions/22691010/how-to-print-a-groupby-object

QPeiran [provides a clever solution](https://stackoverflow.com/a/61264620/13716814), which later is improved by set92:

```python
df.groupby('param').apply(display)
```

Gajraj Singh Chouhan mentions that you need to import `display` from `Ipython.display`, but I am not sure whether it's necessary. I didn't import it and didn't experience any problem. 