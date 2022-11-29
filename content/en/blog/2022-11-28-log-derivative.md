---

title: How to Take the Derivative of the Logarithm Function
date: 2022-11-28
author: Hongtao Hao
slug: log-derivative
draft: false
toc: true
tags: ML

---

What is the derivative of `$f(x) = log(x)$`? This post tries to prove that it is `$\frac{1}{x}$` when the log base is `$e$`.

## Derivative of exponential function and the definition of e

Before talking about the derivative of log function, let us review the definition of `$e$`. It is related to the derivative of the exponential function, for example, `$f(x) = 2^x$`.

According to the definition of derivative, we know that the derivative of `$f(x) = 2^x$` should be:

`$$\lim_{dx \to 0}\frac{2^{x+dx} - 2^x}{dx} = \lim_{dx \to 0}\frac{(2^{dx} - 1) \cdot 2^x}{dx}$$`

And we know that as `$dx$` approaches `$0$`, `$\frac{2^{dx} - 1}{dx}$` is approaching a constent (`$ln(2)$`). That is to say, the derivative of `$f(x) = 2^x$` is `$2^x$` itself multiplied by a constant. 

Then we wonder, is there a case where the drivatie of `$f(x) = t^x$` is itself? That is to say, when will the constant be `$1$`? And that is the definition of `$e$`! We stipulate that if the derivative of `$f(x) = t^x$` is `$t^x$` itself, then we denote that special `$t$` with `$e$`.

Therefore, we have:

`$$\lim_{dx \to 0} \frac{e^{dx} - 1}{dx} = 1$$`

So, as `$dx$` approaches `$0$`, we have

`$$e^{dx} = dx + 1$$`

Therefore, we have 

`$$\lim_{dx \to 0}(dx + 1)^{\frac{1}{dx}} = e$$`

If we replace `$dx$` with `$n$`, we have:

`$$\lim_{n \to 0}(n + 1)^{\frac{1}{n}} = e$$`

## Direct derivation

With this background information, we should be able to derive the derivative of the log function. We will take the natural log function as an example, i.e., we have `$f(x) = ln(x)$`.

`$$\begin{aligned} f^\prime(x) &= \lim_{dx \to 0}\frac{ln(x+dx) - ln(x)}{dx} \\ & = \lim_{dx \to 0}\frac{ln(\frac{x+dx}{dx})}{dx} \\ &= \lim_{dx \to 0}\frac{ln(1 + \frac{dx}{x})}{dx} \\ &= \lim_{dx \to 0}\frac{1}{dx}ln(1 + \frac{dx}{x}) \\ &= \lim_{dx \to 0}{ln(1 + \frac{dx}{x})}^{\frac{1}{dx}}\end{aligned}$$`

Nowt, it's becoming interesting. It looks similar to the definition of `$e$`, right? But not quite the same. Let's say we denote `$\frac{dx}{x}$` as `$m$`, then the above equation can be written as

`$$f^\prime(x) = {ln(m + 1)}^{\frac{x}{n}} = {ln(m + 1)}^{\frac{1}{m}\cdot \frac{1}{x}} = \frac{1}{x}{ln(m + 1)}^{\frac{1}{m}} $$`

You might jump and say that we can use the definition of `$e$` directly, but to do that, we need to prove that `$m$` here and the `$n$` in the difinition of `$e$` is the same. 

In the definition of `$e$`

`$$\lim_{n \to 0}(n + 1)^{\frac{1}{n}} = e$$`

We have `$n$` which is approaching `$0$`, and `$\frac{1}{n}$` approaching positive infinity. Since `$m = \frac{dx}{x}$`, and `$dx$` is approaching `$0$`, so `$m$` is approaching `$0$` and `$\frac{1}{m} = \frac{x}{dx}$` is approaching positive infinity. Therefore, we can say with certainty that as `$dx$` approaches `$0$`, `${(m + 1)}^{\frac{1}{m}}$` is approaching `$e$`. Thus, `${ln(m + 1)}^{\frac{1}{m}}$` is approaching 1. Therefore, `$f^\prime(x)$` is approaching `$\frac{1}{x}$`, which means that **the derivative of the natural log function is `$\frac{1}{x}$`**.

## A more clever method: inverse function. 

In case you are not familiar with the properties of the derivatives of inversion functions, let's have an example. 

Suppose we have `$y = x^2$`, so we have `$x = \sqrt{y}$`. We know that `$y^{\prime} = 2x$`. And that `$x^{\prime} = \frac{1}{2\sqrt{y}} = \frac{1}{2x}$`. 

We find that `$y^{\prime} \cdot x^{\prime} = 1$`.

Now, let's say `$y = e^x$`, so we have `$x = ln(y)$`. Since `$y^{\prime} = e^x$`, we have 

`$$x^{\prime} = \frac{1}{e^x} = \frac{1}{e^{ln(y)}} = \frac{1}{y}$$`

Therefore, if `$f(x) = ln(x)$`, we have 

`$$f^{\prime}(x) = \frac{1}{x}$$`
