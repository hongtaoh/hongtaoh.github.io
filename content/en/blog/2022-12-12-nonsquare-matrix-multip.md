---

title: Understanding Non-Square Matrix Multiplication
date: 2022-12-12
author: Hongtao Hao
slug: matrix-multiplication
draft: false
toc: false
tags: ML

---

Through this tutorial, I want to explain how to compuate the multiplications of non-square matrix; for example, the result of multiplying a `$2 \times 5$` matrix by a `$5 \times 2$` matrix (`a` by `c` in the following example.)


```python
import numpy as np
```


```python
a = np.array([[1, 2,7,9,10], [3, 4,5,12,11]])
a
```




    array([[ 1,  2,  7,  9, 10],
           [ 3,  4,  5, 12, 11]])



`a` is a `$2 \times 5$` matrix. It means the transformation from a 5d space to a 2d space. You can consider each column of `a` as the corresponding coordinates of each of the five axes (of the original `5d` space).  

Suppose we have a vector in a 5d space, i.e., a `$5 \times 1$` vector:


```python
b= np.array([1,2,3,4,5]).reshape(-1, 1)
b
```




    array([[1],
           [2],
           [3],
           [4],
           [5]])



Multiplying `a` by `b` means mapping `b` onto `a`. The resulting `$2 \times 1$` matrix is the result vector. 


```python
a @ b
```




    array([[112],
           [129]])



## Matrix multiplication

Suppose we have a `$5 \times 2$` matrix:


```python
c = np.array([[1,2], [3,4], [4,7], [9,10], [11,-1]])
c
```




    array([[ 1,  2],
           [ 3,  4],
           [ 4,  7],
           [ 9, 10],
           [11, -1]])



`c` means transforming a `2d` space to `5d`. A `2d` space has two axes (`$\vec{x}$` and `$\vec{y}$`). The first column of `c` is the coordinates of `$\vec{x}$` in the new `5d` space, and the second column, `$\vec{y}$`. 

What does `$c \times a$` means? This matrix multiplication is the result of two space transformations: first `a` and then `c`. That is to say, it means we first transform a `5d` space to `2d` and then transform `2d` space to `5d`. 

To understand what `$c \times a$` means, let's first consider multiplying a `$2 \times 1$` matrix, i.e., a vector in two-dimensional space, by `c`:


```python
d = np.array([[1], [2]])
d
```




    array([[1],
           [2]])



`$\vec{d}$` means `$1 \vec{x} + 2 \vec{y}$`. Since in the new `5d` space, the coordinates of `$\vec{x}$` is `[1, 3, 4, 9, 11]` and the coordinates of `$\vec{y}$` is `[2, 4, 7, 10, -1]`, the result of `$c \times d$` will be:


```python
c @ d
```




    array([[ 5],
           [11],
           [18],
           [29],
           [ 9]])



That is the coordinates of `$\vec{d}$` in the new `5d` space. 

The calculation of `$c \times a$` is the same. You can view each column of `a` as a `$\vec{d}$`. 


```python
e = c @ a
e
```




    array([[  7,  10,  17,  33,  32],
           [ 15,  22,  41,  75,  74],
           [ 25,  36,  63, 120, 117],
           [ 39,  58, 113, 201, 200],
           [  8,  18,  72,  87,  99]])



For any vector in a five-dimensional space, say `f = [1, 5, -9, 9, 8]`, multiplying it by `a` and then by `c` is the same as multiplying it by `e` directly. 


```python
f = np.array([[1], [5], [-9], [9], [8]])
g = a @ f
h = c @ g
h
```




    array([[ 457],
           [1023],
           [1654],
           [2721],
           [1025]])




```python
e @ f
```




    array([[ 457],
           [1023],
           [1654],
           [2721],
           [1025]])


