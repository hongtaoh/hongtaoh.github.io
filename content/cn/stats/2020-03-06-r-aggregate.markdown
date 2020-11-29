---
title: R aggregate 求不同组平均数，如何处理缺失值
author: 郝鸿涛
date: '2020-03-06'
slug: r-aggregate-function-na
categories: []
tags: []
---

今天碰到的一个问题是，用 `aggregate` 求不同组平均数的时候，缺失值不好处理。下面通过用 `iris` 这个经典数据说一下如果处理缺失值。


```r
iris[sample(nrow(iris),5),] # 随即抽几行，大致浏览数据格式
```

```
##     Sepal.Length Sepal.Width Petal.Length Petal.Width    Species
## 6            5.4         3.9          1.7         0.4     setosa
## 142          6.9         3.1          5.1         2.3  virginica
## 67           5.6         3.0          4.5         1.5 versicolor
## 14           4.3         3.0          1.1         0.1     setosa
## 148          6.5         3.0          5.2         2.0  virginica
```

```r
iris[c(1,5,15,30,45,90,145),4] <- NA #制造缺失值
aggregate(x=iris$Petal.Width, by=list(iris$Species), FUN=mean)
```

```
##      Group.1  x
## 1     setosa NA
## 2 versicolor NA
## 3  virginica NA
```

```r
aggregate(x=iris$Petal.Width, by=list(iris$Species), FUN=mean, na.rm=TRUE, na.action=na.pass)
```

```
##      Group.1         x
## 1     setosa 0.2466667
## 2 versicolor 1.3265306
## 3  virginica 2.0163265
```
