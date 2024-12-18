---
title: "理解 Log-Sum-Exp"
date: 2024-12-18T13:25:22-06:00
author: Hongtao Hao
slug: log-sum-exp
draft: false
toc: true
tags: 数学
---
## 动机与定义

在本文中，我们将解释 [Log-Sum-Exp](https://en.wikipedia.org/wiki/LogSumExp) 的概念。

假设我们有三个极小的数字：`$a_1 = e^{-200}, a_2 = e^{-201}, a_3 = e^{-202}$`。我们希望计算这三个数的和。

这里需要解决两个问题：
1. 计算的和仍然非常小。为了使结果更具可读性，我们希望对其取对数。
2. 处理极小的数字可能会导致 [算术下溢](https://en.wikipedia.org/wiki/Arithmetic_underflow)。

为了解决这两个问题，我们使用 Log-Sum-Exp 技巧。

直接计算的结果为：
$$S = \ln(a_1 + a_2 + a_3)$$

Log-Sum-Exp 的结果如下：

$$S = M + \ln\left(e^{a_1 - M} + e^{a_2 - M} + e^{a_3 - M}\right)$$

其中 `$M = \max(\ln(a_1), \ln(a_2), \ln(a_3))$`。

注意 `$\ln$` 的底数为 `$e$`，而不是 `$10$`。

## 证明

### 直接计算

由于 `$\log(ab) = \log(a) + \log(b)$`，我们有：

`
$$
\begin{align*}
S &
= \ln(a_1 + a_2 + a_3) \\&
= \ln(e^{-200} + e^{-201} + e^{-202}) \\&
= \ln(e^{-200}(1 + e^{-1} + e^{-2})) \\&
= \ln(e^{-200}) + \ln(1 + e^{-1} + e^{-2}) \\&
= -200 + \ln(1 + e^{-1} + e^{-2})
\end{align*}
$$
`

### Log-Sum-Exp

`$M = \ln(a_1) = -200$`

`
$$
\begin{align*}
S &
= M + \ln\left(e^{a_1 - M} + e^{a_2 - M} + e^{a_3 - M}\right) \\&
= -200 + \ln(e^0 + e^{-1} + e^{-2}) \\&
= -200 + \ln(1 + e^{-1} + e^{-2})
\end{align*}
$$
`

我们可以看到，结果是相同的。
