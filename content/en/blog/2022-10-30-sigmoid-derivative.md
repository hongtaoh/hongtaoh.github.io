---
title: "How to Take the Derivative of the Sigmoid Function"
date: 2022-10-30T12:26:07-05:00
author: "Hongtao Hao"
slug: sigmoid-derivative
draft: false
toc: false
tags: ML
---
Given that we have the sigmoid function:

``
$$\sigma(x) = \frac{1}{1 + e^{-x}}$$
``

What is its derivative?

It can be rewritten as 

``
$$\sigma (x) = (1 + e^{-x})^{-1}$$
``

Say that we have:

``
$$m(x) = -x$$
``

``
$$t(m) = e^{m}$$
``

``
$$h(t) = 1 + t$$
``

``
$$g(h) = h^{-1}$$
``
Then, we have 

``
$$\sigma(x) = g(h)$$
``
So:

``
$$\begin{aligned} \frac{d\sigma}{dx} & = \frac{dg}{dh}\cdot \frac{dh}{dt}\cdot \frac{dt}{dm}\cdot \frac{dm}{dx} \\ &= (-h^{-2})\times 1\times e^{m}\times(-1) \\& = h^{-2}\cdot e^{m} \\ &=e^{-x}\cdot (1+t)^{-2} \\ &=  e^{-x}\cdot(1+e^{m})^{-2} \\ &= e^{-x}\cdot (1+e^{-x})^{-2} \\ &= \frac{e^{-x}}{(1 + e^{-x})^{2}}\end{aligned}$$
``

If you play with it, you will know that

``
$$\frac{d\sigma}{dx} = \frac{e^{-x}}{(1 + e^{-x})^{2}} = \sigma(x)\cdot (1 - \sigma(x))$$
``

This post is inspired and based upon [*Taking the derivative of the simgoid function*](https://medium.com/@DannyDenenberg/derivative-of-the-sigmoid-function-774446dfa462) by Danny Denenberg.

