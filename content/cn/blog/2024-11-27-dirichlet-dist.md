---

title: "理解 Dirichlet Distribution"
date: 2024-12-04
author: 郝鸿涛
slug: dirichlet-dist
draft: false
toc: true
tags: 统计

---

## 基本概念

我们在 [双项分布](/cn/2024/03/23/discrete-distributions/) 的基础上介绍了 [Beta 分布](/cn/2024/11/27/beta/)。同样的，我们要在 [多项分布](/cn/2024/11/27/multinomial/) 的基础上介绍 [Dirichlet Distribution](https://en.wikipedia.org/wiki/Dirichlet_distribution)。

随机抛掷 `$k$` 面骰子 `$n$` 次，每个面 `$i$` 出现的概率是 `$p_i \left(\sum{p_i} = 1\right)$`，那么每个面分别出现 `$x_1, x_2,...,x_k \left(\sum{x_i} = n\right)$` 次的联合概率为：

`$$P(x_1,...,x_k|p_1,...,p_k) = \frac{n!}{x_1!x_2!...x_k!} \cdot p_1^{x_1} \cdot p_2^{x_2} \cdot ... \cdot p_k^{x_k}$$`

这是多项分布。

那如果随机抛掷 `$k$` 面骰子 `$n$` 次，最后每个面分别出现 `$x_1, x_2,...,x_k \left(\sum{x_i} = n\right)$` 次，请问每个面 `$i$` 出现的概率 `$p_i$` 是什么？

根据贝叶斯定理

`$$P(p_1,...,p_k|x_1,...,x_k) \propto P(p_1,...,p_k)\cdot P(x_1,...,x_k|p_1,...,p_k)$$`

我们没有任何先验信息，所以使用均匀分布作为先验，也就是说 `$P(p_1,...,p_k)=1$`。另外，`$\frac{n!}{x_1!x_2!...x_k!}$` 也是一个常数。所以：

`$$P(p_1,...,p_k|x_1,...,x_k) \propto \prod_{i=1}^k p_i^{x_i}$$`

## 具体例子

为了简化，我们假设有 3 面的骰子，投掷 10 次，观测到的数据为

`$$x_1 = 2, x_2 = 3, x_3 = 5$$`

我们知道 `$p_i \ge 0$` 且 `$p_1 + p_2 + p_3 = 1$`

在不考虑归一化的情况下，`$P(p_1 = 0.1, p_2 = 0.7, p_3 = 0.2)$` 的概率密度是

`$$\prod_{i=1}^3 p_i^{x_i} = 0.1^2 \cdot 0.7^3 \cdot 0.2^5$$`

它肯定没有 `$P(p_1 = 0.1, p_2 = 0.2, p_3 = 0.7)$` 的概率密度大：

`$$\prod_{i=1}^3 p_i^{x_i} = 0.1^2 \cdot 0.2^3 \cdot 0.7^5$$`

## 标准公式 

记 `$\alpha_i$` 为

`$$\alpha_i = x_i + 1$$`

所以

`$$P(p_1,...,p_k|\alpha_1,...,\alpha_k) \propto \prod_{i=1}^k p_i^{\alpha_i - 1}$$`

最后要除以一个归一化的常数，我们用 `$\mathrm {B}(\alpha)$` 表示：

`$$\mathrm {B} ({\boldsymbol {\alpha }})={\frac {\prod \limits _{i=1}^{K}\Gamma (\alpha _{i})}{\Gamma \left(\sum \limits _{i=1}^{K}\alpha _{i}\right)}},\qquad {\boldsymbol {\alpha }}=(\alpha _{1},\ldots ,\alpha _{K})$$`

这个比较复杂，我们这里不讲如何推导 `$\mathrm {B}(\alpha)$`。

最后，Dirchlet Distribution 的完整表达式为

`$$P(p_1,...,p_k|\alpha_1,...,\alpha_k)= \frac{1}{\mathrm {B}(\alpha)} \prod_{i=1}^k p_i^{\alpha_i - 1}$$`

这里需要注意的是，虽然根据我们上面的 `$\alpha_i = x_i + 1$`，`$\alpha \ge 1$`，但是在正式的定义中 `$\alpha \gt 0 $`。

当 `$k=2$` 是，`$Dir(\alpha)$` 退化为 [Beta 分布](/cn/2024/11/27/beta/)。

## 可视化

最后 Dirchlet Distribution 长什么样子呢？

我们举一个例子。假如我们求的是 `$p_1, p_2, p_3$`。那我们知道 `$p_i \ge 0$` 且 `$p_1+p_2+p_3 = 1$`。

我们可以画一个三角形，其内任何一点表示联合分布。然后每一个点上加一个维度，表示该联合概率分布的密度。这种可视化方法被称为 [Ternary plot](https://en.wikipedia.org/wiki/Ternary_plot)。

下面我用 [Herb Susmann](https://observablehq.com/@herbps10/dirichlet-distribution) 做的交互式可视化来展示：

## 交互图表

<iframe width="100%" height="976" frameborder="0"
  src="https://observablehq.com/embed/@hongtaoh/dirichlet-distribution?cells=viewof+alpha1%2Cviewof+alpha2%2Cviewof+alpha3%2CalphaList%2CternaryDensityPlot%2CdensityLegend%2CmarginalDensityPlot"></iframe>

<!-- 最后的结果如下：

![dirichlet distribution](/cn/blog/2024-11-27-dirichlet-dist_files/wikipedia-dirichlet-dist2.png)

此图来自维基百科上的 [Dirichlet distribution 词条](https://en.wikipedia.org/wiki/Dirichlet_distribution)。 -->
