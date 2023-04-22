---

title: "Optimization: Least Squares"
date: 2023-03-22
author: Hongtao Hao
slug: least-squares
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

# Least squares

Matrix equations: `$Ax = b$`

If you have more equations than variables, i.e., when `$A$` is tall (**overdetermined**), for example

`$$
A = \begin{bmatrix}
    2 & 3  \\
    4 & -1  \\
    2 & 1 
  \end{bmatrix}
$$`
And 
`$$
x = \begin{bmatrix}
    x_1 \\
    x_2 
  \end{bmatrix}
$$`
`$$
b = \begin{bmatrix}
    1 \\ 2  \\ 3
  \end{bmatrix}
$$`

More often than not, you don't have viable solutions. One fix is to use least squares. 

If you have more variables than equations (e.g., you only have `$2x + 3y = 0$`), i.e., when `$A$` is wide:

`$$
A = \begin{bmatrix}
    2 & 3 
  \end{bmatrix}
$$`
And 
`$$
x = \begin{bmatrix}
    x_1 \\
    x_2
  \end{bmatrix}
$$`
`$$
b = 0
$$`

it means you either have no solutions or have infinitely many solutions. One solution is to use regularization.

Least squres: to minimize `$||Ax - b||^2$` and subject to `$x$`.

## Interpretation

The graphcal interpretation of minimizing `$||Ax - b||^2$`

Take the above example as an instance.


`$$
A = \begin{bmatrix}
    2 & 3  \\
    4 & -1  \\
    2 & 1 
  \end{bmatrix}
$$` 
`$$
x = \begin{bmatrix}
    x_1 \\
    x_2 
  \end{bmatrix}
$$`
`$$
\vec{b} = \begin{bmatrix}
    1 \\ 2  \\ 3
  \end{bmatrix}
$$`

We write 

`$$
a_1 = \begin{bmatrix}
    2  \\
    4  \\
    2  
  \end{bmatrix}
$$`
and 

`$$
a_2 = \begin{bmatrix}
    3  \\
    -1  \\
    1  
  \end{bmatrix}
$$`

So we are actually minimizing

`$$||\vec{a_1}x_1 + \vec{a_2}x_2 - \vec{b}||^2$$`
It should be noted that `$\vec{a_1}x_1 + \vec{a_2}x_2$` is a vector itself (Let's denoted it as `$\vec{t}$`) and it is on the plane defined by `$\vec{a_1}$` and `$\vec{a_2}$`. So the above objective is to minimize the length of the vector `$\vec{t} - \vec{b}$`. This is equivalent to finding the projection of `$\vec{b}$` on the plane defined by `$\vec{a_1}$` and `$\vec{a_2}$`.

![](/en/blog/2023-03-22-least-square_files/least-square-projection.png)


Also note that if the equations have a solution, for example


`$$
A = \begin{bmatrix}
    2 & 1  \\
    3 & -1
  \end{bmatrix}
$$`
`$$
x = \begin{bmatrix}
    x_1 \\
    x_2 
  \end{bmatrix}
$$`
`$$
\vec{b} = \begin{bmatrix}
    1 \\ 2
  \end{bmatrix}
$$`
So
`$$
a_1 = \begin{bmatrix}
    2  \\
    3 
  \end{bmatrix}
$$`
and 

`$$
a_2 = \begin{bmatrix}
    5  \\
    7 
  \end{bmatrix}
$$`
We have

`$$
\vec{a_1}x_1 + \vec{a_2}x_2 = \vec{b}
$$`

In this case, `$\vec{b}$` is on the plane defined by `$\vec{a_1}$` and `$\vec{a_2}$`. 

In the case previously, because there are no solutions, `$\vec{b}$` is not on the plane defined by `$\vec{a_1}$` and `$\vec{a_2}$`. What we want to do is to find a vector on the plane defined by `$\vec{a_1}$` and `$\vec{a_2}$` that is as close to `$\vec{b}$` as possible. 

## Norm
- One norm: `$||r||_1 = |r_1| + |r_2| + ... |r_n|$`
- Two norm (aka Euclidean distance): `$||r||_2 = \sqrt{{r_1}^2 + {r_2}^2 + ... + {r_n}^2}$`

## Curve Fitting (Regression)

Suppose we are giving two series of numbers: 

```
x = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ]
y = [ 1, 3, 0, 1, 2, 4, 6, 7, 5, 5, 6, 7.2, 5.5,  4, 3.2, 5]
```

And we suspect that they are related by a fourth-degree polynomial `$y = u_1x^4 + u_2x^3 + u_3x^2 + u_4x + u_5$`. How can we find all the `$u$`s that best agree with our data? Using least squares!


```julia
using Plots, Gurobi, JuMP, Polynomials
```


```julia
x = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ]
y = [ 1, 3, 0, 1, 2, 4, 6, 7, 5, 5, 6, 7.2, 5.5,  4, 3.2, 5]

Plots.scatter(x, y,
    label="",
    xlabel="x",
    ylabel="y"
)

savefig("/en/blog/2023-03-22-least-square_files/least-squares-01.png")
```

![](/en/blog/2023-03-22-least-square_files/least-squares-01.png)


```julia
k = 4
n = length(x)
A = zeros(n, k+1)

# get the A matrix
for i in 1:n
    A[i,:] = [x[i]^m for m in k:-1:0]
end
```

Something like this but with a higher degree:

![](/en/blog/2023-03-22-least-square_files/least-sequare-polynomial.png)


```julia
m = Model(Gurobi.Optimizer)

@variable(m, u[1:k+1])
@objective(m, Min, sum( (y - A*u).^2 ))

optimize!(m)
```

    Set parameter Username
    Academic license - for non-commercial use only - expires 2024-02-21
    Gurobi Optimizer version 10.0.1 build v10.0.1rc0 (mac64[x86])
    
    CPU model: Intel(R) Core(TM) i5-5250U CPU @ 1.60GHz
    Thread count: 2 physical cores, 4 logical processors, using up to 4 threads
    
    Optimize a model with 0 rows, 5 columns and 0 nonzeros
    Model fingerprint: 0xc477cc36
    Model has 15 quadratic objective terms
    Coefficient statistics:
      Matrix range     [0e+00, 0e+00]
      Objective range  [1e+02, 2e+06]
      QObjective range [3e+01, 2e+10]
      Bounds range     [0e+00, 0e+00]
      RHS range        [0e+00, 0e+00]
    Warning: Model contains large quadratic objective coefficients
             Consider reformulating model or setting NumericFocus parameter
             to avoid numerical issues.
    Presolve time: 0.00s
    Presolved: 0 rows, 5 columns, 0 nonzeros
    Presolved model has 15 quadratic objective terms
    Ordering time: 0.00s
    
    Barrier statistics:
     Free vars  : 9
     AA' NZ     : 6.000e+00
     Factor NZ  : 1.000e+01
     Factor Ops : 3.000e+01 (less than 1 second per iteration)
     Threads    : 1
    
                      Objective                Residual
    Iter       Primal          Dual         Primal    Dual     Compl     Time
       0   3.35330000e+02  3.35330000e+02  0.00e+00 2.34e+06  0.00e+00     0s
       1   3.33379918e+02  3.35327161e+02  2.23e-08 2.33e+06  0.00e+00     0s
       2   3.33281966e+02  3.35327055e+02  4.91e-08 2.33e+06  0.00e+00     0s
       3   3.33104809e+02  3.35326933e+02  1.08e-07 2.33e+06  0.00e+00     0s
       4   3.32715344e+02  3.35326658e+02  2.37e-07 2.33e+06  0.00e+00     0s
       5   3.20366412e+02  3.35178088e+02  5.17e-07 2.29e+06  0.00e+00     0s
       6   3.18195814e+02  3.35161569e+02  1.14e-06 2.29e+06  0.00e+00     0s
       7   3.13444319e+02  3.35122582e+02  2.50e-06 2.28e+06  0.00e+00     0s
       8   2.81119294e+02  3.33872605e+02  5.38e-06 2.18e+06  0.00e+00     0s
       9   2.60552748e+02  3.33436335e+02  1.18e-05 2.16e+06  0.00e+00     0s
      10   2.67193397e+02  3.30286001e+02  2.97e-06 2.05e+06  0.00e+00     0s
      11   2.65244952e+02  3.28704816e+02  6.46e-06 2.00e+06  0.00e+00     0s
      12   2.77148108e+02  3.27643838e+02  1.41e-05 1.98e+06  0.00e+00     0s
      13   2.48136085e+02  3.09760405e+02  2.89e-05 1.68e+06  0.00e+00     0s
      14   9.38163318e+01  2.76831470e+02  1.16e-05 1.34e+06  0.00e+00     0s
      15   1.10524099e+02  2.61479626e+02  3.38e-06 1.21e+06  0.00e+00     0s
      16   1.03515571e+02  2.45285834e+02  7.12e-06 1.10e+06  0.00e+00     0s
      17   1.15518922e+02  2.36704952e+02  1.53e-05 1.04e+06  0.00e+00     0s
      18   4.94511564e+01  2.11255549e+02  5.38e-06 8.79e+05  0.00e+00     0s
      19   5.54851811e+01  1.91957180e+02  1.68e-06 7.69e+05  0.00e+00     0s
      20   5.84647149e+01  1.86886513e+02  3.99e-06 7.42e+05  0.00e+00     0s
      21   6.15863372e+01  1.70310423e+02  8.34e-06 6.55e+05  0.00e+00     0s
      22   7.64449887e+01  1.52720041e+02  1.73e-05 5.67e+05  0.00e+00     0s
      23   1.21617080e+01  1.71645472e+01  2.14e-06 5.67e-01  0.00e+00     0s
      24   1.71642681e+01  1.71643923e+01  5.68e-11 5.67e-07  0.00e+00     0s
    
    Barrier solved model in 24 iterations and 0.00 seconds (0.00 work units)
    Optimal objective 1.71642681e+01
    
    
    User-callback calls 88, time in user-callback 0.00 sec



```julia
u = value.(u)
```




    5-element Vector{Float64}:
      0.002320865140005629
     -0.08461679037317738
      0.969732004634473
     -3.3515882584235666
      4.320673076823761



### A simpler way

In fact, there is a much simpler way. Because the above operations are used frequently, there is a special operator for that: `\`


```julia
u = A\y
```




    5-element Vector{Float64}:
      0.002320865086925458
     -0.08461679037336926
      0.9697320046439619
     -3.3515882584477747
      4.3206730769230814




```julia
Plots.scatter(x, y,
    label="",
    xlabel="x",
    ylabel="y"
)

f(x) = u[1]*x^4 + u[2]*x^3 + u[3]*x^2 + u[4]*x + u[5]

# use continuous x range; otherwise the fit line is discrete
xs = 1:0.01:16

Plots.plot!(xs, f,
    linecolor = "green",
    linewidth = 2,
    label = "fourth-degree polynomial fit line"
)

savefig("/en/blog/2023-03-22-least-square_files/least-squares-02.png")
```

![](/en/blog/2023-03-22-least-square_files/least-squares-02.png)

When polynomials have much higher orders, it is best to use the `Polynomials` package rather than writting it manually like `f(x) = u[1]*x^4 + u[2]*x^3 + u[3]*x^2 + u[4]*x + u[5]`. In `Polynomials`, the power order increases, i.e., `f(x) = u[1]x + u[2]x^2 + u[3]x^3 ...`, so we need to reverse the order of `u`:


```julia
p = Polynomial(reverse(u))
```




4.3206730769230814 &#45; 3.3515882584477747&#8729;x &#43; 0.9697320046439619&#8729;x<sup>2</sup> &#45; 0.08461679037336926&#8729;x<sup>3</sup> &#43; 0.002320865086925458&#8729;x<sup>4</sup>




```julia
ys = p.(xs)
Plots.scatter(x, y,
    label="",
    xlabel="x",
    ylabel="y"
)

# note it is is (xs, ys) rather than (xs, p)
Plots.plot!(xs, ys,
    linecolor = "green",
    linewidth = 2,
    label = "fourth-degree polynomial fit line"
)

savefig("/en/blog/2023-03-22-least-square_files/least-squares-03.png")
```

![](/en/blog/2023-03-22-least-square_files/least-squares-03.png)
