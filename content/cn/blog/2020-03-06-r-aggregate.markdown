---
title: R aggregate 求不同组平均数，如何处理缺失值
author: 郝鸿涛
date: '2020-03-06'
slug: r-aggregate-function-na
categories: []
tags: 统计
---

今天碰到的一个问题是，用 `aggregate` 求不同组平均数的时候，缺失值不好处理。下面通过用 `iris` 这个经典数据说一下如果处理缺失值。


```r
iris[sample(nrow(iris),5),] # 随即抽几行，大致浏览数据格式
```

```
##     Sepal.Length Sepal.Width Petal.Length Petal.Width    Species
## 136          7.7         3.0          6.1         2.3  virginica
## 85           5.4         3.0          4.5         1.5 versicolor
## 33           5.2         4.1          1.5         0.1     setosa
## 50           5.0         3.3          1.4         0.2     setosa
## 48           4.6         3.2          1.4         0.2     setosa
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
