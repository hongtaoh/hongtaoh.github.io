---
title: "How to Update Cell Value in Pandas "
date: 2022-09-23T10:13:30-05:00
author: "Hongtao Hao"
slug: pandas-update-cell-value
draft: false
toc: false
tags: python
---

This is how you update a value at a specific cell:

- Suppose the row index of the cell is `row_idx`, and the column label is `'colname'`, then you can update the cell value this way: `df.at[row_idx, 'colname'] = new_value`. 

Or:

- Suppose the row index of the cell is `row_idx`, and the column index is `col_idx`, then you can update the cell value this way: `df.iat[row_idx, col_idx] = new_value`.

I got this idea from [this post](https://re-thought.com/how-to-change-or-update-a-cell-value-in-python-pandas-dataframe/) by Anna Zverkova. Thank you Anna! This is very helpful!
