---

title: "多项分布"
date: 2024-11-27
author: 郝鸿涛
slug: multinomial
draft: false
toc: false
tags: 统计

---

之前我讲过[双项分布 (Binomial Distribution)](/cn/2024/03/23/discrete-distributions/)。这次我们讲多项分布 (Multinomial Distribution)。

我们有一个六面的骰子🎲，如果这个骰子是一个不公平的骰子，也就是说每一面的概率并不相同。我们把每一面的概率记为 `$\pi_i$`。假设我们抛掷六次的结果是 1,3,3,4,4,5 (n = 6)，此次事件的概率为：

`$$P(1,3,3,4,4,5) = p_1 \cdot p_3 \cdot p_3 \cdot p_4 \cdot p_4 \cdot p_5 = p_1^1 \cdot p_3^2 \cdot p_4^2 \cdot p_5^1$$`

那现在我问，随机抛掷该骰子 6 次，结果1出现1次，3出现2次，4出现2次，5出现1次的概率是多少？

这时候我们需要求出有多少不同的序列会得到如此的结果。

为了便于理解，我们现在先来看一个比较简单的例子。假设有 3 个颜色的球，分别是红、白、蓝，放入三个位置。如果我们要放 1 个红球(`$n_1 = 1$`)、1个白球(`$n_2 = 1$`)、1个篮球(`$n_3 = 1$`)，那么一共有六种排列结果:

```
RWB, RBW, WRB, WBR, BRW, BWR
```

计算方法为 `$3! = 3\times2\times1 = 6$`。

那如果我们要要放 2 个红球(`$n_1 = 2$`)、1个白球(`$n_2 = 1$`)、0个篮球(`$n_3 = 0$`)，所有可能的排列为

```
RRW, RWR, WRR
```

这是因为2个红球是相同的，所以要除以 `$2!$`。

那依此类推，

>随机抛掷 k 面骰子 n 次，每个面 i 出现的概率是 `$p_i \left(\sum{p_i} = 1 \right)$`，那么每个面分别出现 `$x_1, x_2,...,x_k \left(\sum{x_i} = n\right)$` 次的概率为：

`$$f(x_1,...,x_k|p_1,...,p_k) = \frac{n!}{x_1!x_2!...x_k!} \cdot p_1^{x_1} \cdot p_2^{x_2} \cdot ... \cdot p_k^{x_k}$$`

