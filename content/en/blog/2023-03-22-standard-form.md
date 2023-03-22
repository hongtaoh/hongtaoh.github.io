---

title: "Optimization: Standard Form"
date: 2023-03-22
author: Hongtao Hao
slug: standard-form
draft: false
toc: false
tags: Optimization

---

{{<block class = "note">}}
Images in this posst came from the slides of [CS524 at UW-Madison](https://laurentlessard.com/teaching/524-intro-to-optimization/), 2023Spring
{{<end>}}

{{<block class = "reminder">}}
This notebook runs in [Julia](https://julialang.org/) and is rendered by [Hupyter](https://github.com/hongtaoh/hupyter).
{{<end>}}

The standard form of linear optimization problems is:

`$$
\begin{align*}
\underset{x\in \mathbb{R}^n}{\text{maximize}}\qquad& c^{T} x\\
\text{subject to:}\qquad&  Ax \le b\\ 
& x \ge 0
\end{align*}
$$`

## Transformation tricks
- Conversion between min and max: `$min f(x) = - max(-f(x))$`
- `$Ax >= b$` <=> `$-Ax <= -b$`
- `$f(x) = 0$` <=> `$f(x) >= 0$` and `$f(x) <= 0$`
- `$x \in \mathbb{R} <=> u \ge 0, v \ge 0, x = u - v$`

## An example
`$$
\begin{align*}
\underset{p, q}{\text{minimize}}\qquad& p + q\\
\text{subject to:}\qquad&  5p - 3q = 7\\ &
2p + q \ge 2 \\ &
1 \le q \le 4
\end{align*}
$$`

Let us transform the above. 

First, `$p$` is unbounded, so we have `$p = u - v, u \ge 0, v \ge 0$`. 

The standard form is `$x \ge 0$`, but `$q$` here does not conform to this format. We split `$1 \le q \le 4$` into two parts: `$q \ge 1$` and `$q \le 4$`. We can use the former one as something like `$x \ge 0$`. We can have `$w = q + 1$`. Because `$q \ge 1$`, so we have `$w \ge 0$`; because `$q \le 4$`, we have `$w \le 3$`.

Because the constraints of the standard form are like `$Ax \le b$`, so we need to change the constraints as well. According to the conversion tricks, we can have:

`$$
5p - 3q \le 7 \\
5p - 3q \ge 7 \\
-2p - q \le -2
$$`

Because 

`$$
p = u - v \\
q = w + 1
$$`

we have

`$$
5u - 5v - 3w \le 10 \\
-5u + 5v + 3w \le -10 \\
-2u + 2v - w \le -1
$$`

Do not forget that we have another constraint:

`$$
w \le 3
$$`

## Solution

Therefore, the standard form of the example linear problem is:

`$$
\begin{align*}
\underset{u, v, w}{\text{maximize}}\qquad& -u + v - w - 1\\
\text{subject to:}\qquad&  5u - 5v - 3w \le 10 \\&
-5u + 5v + 3w \le -10 \\&
-2u + 2v - w \le -1 \\&
w \le 3 \\&
u \ge 0 \\&
v \ge 0 \\&
w \ge 0 
\end{align*}
$$`

It should be noted that the objective value of the standard form is the negative of that of the example problem. 
