---

title: "Explanining Log-Sum-Exp"
date: 2024-12-14T17:25:22-06:00
author: Hongtao Hao
slug: log-sum-exp
draft: false
toc: true
tags: Math
translate: false
---

## Motivationn & Definition

In this post, we explain the concept of [Log-Sum-Exp](https://en.wikipedia.org/wiki/LogSumExp).

Suppose we have three extremely small numbers: `$a_1 = e^{-200}, a_2 = e^{-201}, a_3 = e^{-202}$`. We are interested in the sum of these three numbers. 

There are two issues to solve here:

1. The sum will still be very small. To make the result more readible, we want to take the logarithm of it. 
2. Dealing with extremely small numbers may lead to [aithmetic underflow](https://en.wikipedia.org/wiki/Arithmetic_underflow). 

To solve these two issues, we use the trick of Log-Sum-Exp. 

The result of direct computation is 

`$$S = \ln(a_1 + a_2 + a_3)$$`

Log-Sum-Exp will give this result:

`$$S = M + \ln\left(e^{a_1 - M} + e^{a_2 - M} + e^{a_3 - M}\right)$$`

where `$M = \max(\ln(a_1), \ln(a_2), \ln(a_3))$`

Note that the base for `$\ln$` is `$e$`, not `$10$`.

## Proof

### Direct computation

Because `$\log(ab) = \log(a) + \log(b)$`, we have:

`$$
\begin{align*}
S & 
= \ln(a_1 + a_2 + a_3) \\&
= \ln(e^{-200} + e^{-201} + e^{-202}) \\&
= \ln(e^{-200}(1 + e^{-1} + e^{-2})) \\&
= \ln(e^{-200}) + \ln(1 + e^{-1} + e^{-2}) \\&
= -200 + \ln(1 + e^{-1} + e^{-2})
\end{align*}
$$`

### Log-Sum-Exp

`$M = \ln(a_1) = -200$`

`$$
\begin{align*}
S & 
= M + \ln\left(e^{a_1 - M} + e^{a_2 - M} + e^{a_3 - M}\right) \\&
= -200 + \ln(e^0 + e^{-1} + e^{-2}) \\&
= -200 + \ln(1 + e^{-1} + e^{-2})
\end{align*}
$$`

We can see that the results are the same. 
