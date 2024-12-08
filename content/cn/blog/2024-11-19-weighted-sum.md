---

title: "加权平均"
date: 2024-11-19
author: 郝鸿涛
slug: weighted-sum
draft: false
toc: false
tags: 统计

---

假设三个评委给一个选手打分: 85, 90, 95。三个评委评分的可信度分别为 0.8, 0.5, 0.2。请问如何计算该选手最后的分数？

一个简单的办法是：


```python
import numpy as np 
scores = np.array([85, 90, 95])
cred = np.array([0.8, 0.5, 0.2])
final_scores = np.sum(scores * cred)
final_scores
```




{{< indentedblock >}}
    132.0



{{< /indentedblock >}}
这个方法有问题。

第一，从最后结果来看，分数大于 100，不很直观。

第二，这种方法意味着我们采纳评委一 80% 的意见，评委二 50% 的意见，评委三 20% 的意见。这样，我们总共采纳了 150% 的意见。

那怎么解决这个问题？最后的结果除以 1.5 (0.8 + 0.5 + 0.2) 就可以了。这样我们就采纳了 100% 的意见。

也可以这么理解。评委一，我们采纳其 0.8/1.5 的意见，评委二，采纳 0.5/1.5 的意见，评委三采纳 0.2/1.5 的意见。

最后的结果是分数乘以权重，然后结果加起来。但需要注意的是，这里的权重是每个可信度除以可信度之和。


```python
final_scores /= np.sum(cred)
final_scores
```




{{< indentedblock >}}
    88.0



{{< /indentedblock >}}