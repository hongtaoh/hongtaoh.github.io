---
title: "从零开始训练简易版 BERT"
date: 2026-02-01
author: "郝鸿涛"
slug: bert
draft: false
toc: true
tags: llm
---

Bert 的作用是得到上下文相关的向量表示。举一个例子，

- 「你来就来，还带礼物。你几个意思啊？」
- 「别多想。我就意思一下」
- 「我看不懂这句话里这个词是什么意思」
- 「你这么说就没意思了啊」

你看，这几句话里的「意思」，它的含义是不同的。向量表示的时候我们肯定不能静态地给同一个词相同的向量表示。

上下文相关的向量表示，就是说即使是同一个词，在不同的语境下，我们希望它的向量表示是不同的。如何实现这一点呢？这就需要「注意力机制」，就是那篇大名鼎鼎的 [Attention is all you need](https://arxiv.org/abs/1706.03762) 的论文。这篇论文提到的 Transformer 架构，包括了 Encoder 和 Decoder，但 Bert 只涉及 Encoder。

在训练之前，我们要做一个「字-向量」查找表，以下简称「词表」。我们需要把所有的字整合在一起。最开始，我们可以随机分配向量表示。比方说，「你」的向量表示为 `[0.1, -0.5, 0.9]` 之类。当然，真正的训练中，维度会更高，但我们这里只是为了演示，所以重在简单。这里需要注意的是，同一个词的向量表示是一样的。另外，

Bert 的训练核心是这样子。先随机找一个句子，比如 「你这么说就没意思了啊」，然后遮住一个字，比如 「说」:「你这么 MASK 就没意思了啊」。我们把 MASK 当作一个具体的字。

1. 每个字通过词表查找表来得到向量表示。
2. 加上位置表示，也就是说要告诉模型，每个字的位置。
3. 经过多层的 Self-Attention，得到每个字新的向量表示。这一点我们接下来讲。
4. Mask 这个字的输出向量经过分类器之后，我们得到上面词表中每一个字是这个被遮住词的概率。

这里需要注意的是，虽然「意思」是一个词，不应该分开，但是中文分词很难，而且容易出错。BERT 的强大之处在于：即使输入的是单独的「意」和「思」，经过 Attention 机制后，「意」的向量会吸收「思」的信息，从而接近「意思」这个概念的向量表示。

## 手算 Self-Attention 

为了搞懂 Self-Attention 到底是怎么算的，我抛开复杂的公式，举一个最简单的例子。

**场景设定：**
* 输入只有两个英文词：**one cat**。
* 假设向量维度 (`$d_{model}$`) 为 **3**。
* 输入向量 (`$X$`) 如下：
{{< indentedblock >}}
- one: `[1, 0, 2]`
- cat: `[-1, 2, 0]`
{{< /indentedblock >}}
即：

`$$ X = \begin{bmatrix} 1 & 0 & 2 \\ -1 &2 & 0 \end{bmatrix} $$`

### 第一步：准备权重矩阵 (Q, K, V)

Self-Attention 需要三个权重矩阵 `$W^Q, W^K, W^V$`。为了方便手算，我假设模型目前学到的权重矩阵如下。为了演示效果，我特意设计了简单的整数矩阵：

`$$
W^Q = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}, \quad
W^K = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 0 & 1 \\ 0 & 1 & 0 \end{bmatrix}, \quad
W^V = \begin{bmatrix} 2 & 0 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 2 \end{bmatrix}
$$`

### 第二步：计算 Q, K, V 向量

计算公式为：向量 `$\times$` 矩阵。

**1. 计算 Query (Q)**
`$$Q = X \times W^Q = \begin{bmatrix} 1 & 0 & 2 \\ -1 & 2 & 0 \end{bmatrix}$$`
* `$q_{\text{one}} = [1, 0, 2]$`
* `$q_{\text{cat}} = [-1, 2, 0]$`

**2. 计算 Key (K)**
`$$K = X \times W^K = \begin{bmatrix} 1 & 2 & 0 \\ -1 & 0 & 2 \end{bmatrix}$$`
* `$k_{\text{one}} = [1, 2, 0]$`  
* `$k_{\text{cat}} = [-1, 0, 2]$`

**3. 计算 Value (V)**
`$$V = X \times W^V = \begin{bmatrix} 2 & 0 & 4 \\ -2 & 4 & 0 \end{bmatrix}$$`
* `$v_{\text{one}} = [2, 0, 4]$`
* `$v_{\text{cat}} = [-2, 4, 0]$`

### 第三步：计算注意力分数 (Attention Score)

这一步是计算相似度。我们拿 **Query** 去点积 **Key** 的转置 (`$Q \cdot K^T$`)。

`$$
\text{Score} = \begin{bmatrix}
q_{\text{one}} \cdot k_{\text{one}} & q_{\text{one}} \cdot k_{\text{cat}} \\
q_{\text{cat}} \cdot k_{\text{one}} & q_{\text{cat}} \cdot k_{\text{cat}}
\end{bmatrix}
$$`

**具体计算过程：**

* **One 对 One**: `$1\times1 + 0\times2 + 2\times0 = \mathbf{1}$`
* **One 对 Cat**: `$1\times(-1) + 0\times0 + 2\times2 = -1 + 4 = \mathbf{3}$`
* **Cat 对 One**: `$(-1)\times1 + 2\times2 + 0\times0 = -1 + 4 = \mathbf{3}$`
* **Cat 对 Cat**: `$(-1)\times(-1) + 2\times0 + 0\times2 = \mathbf{1}$`

**得到分数矩阵：**
`$$
\text{Scores} = \begin{bmatrix} 1 & 3 \\ 3 & 1 \end{bmatrix}
$$`

### 第四步：缩放 (Scaling)

为了防止数值过大，我们需要除以 `$\sqrt{d_k}$`。这里 `$\sqrt{3} \approx 1.732$`。

`$$
\text{Scaled Scores} = \begin{bmatrix} 1/1.732 & 3/1.732 \\ 3/1.732 & 1/1.732 \end{bmatrix} \approx \begin{bmatrix} 0.58 & 1.73 \\ 1.73 & 0.58 \end{bmatrix}
$$`

### 第五步：归一化 (Softmax)

我们要把分数变成概率，即对每一行做 Softmax：`$\frac{e^x}{\sum e^x}$`。

**以第一行 (one) 为例：**
* `$e^{0.58} \approx 1.79$`
* `$e^{1.73} \approx 5.64$`
* 总和 `$= 7.43$`
* **对自己的权重**: `$1.79 / 7.43 \approx \mathbf{0.24}$`
* **对 cat 的权重**: `$5.64 / 7.43 \approx \mathbf{0.76}$`

同理计算第二行，最终得到 **Attention Matrix**：

`$$
A = \begin{bmatrix}
0.24 & 0.76 \\
0.76 & 0.24
\end{bmatrix}
$$`

> **含义解读**：计算 "one" 的新向量时，模型认为应该保留 24% 的原意，并吸收 76% 关于 "cat" 的信息。

### 第六步：加权求和 (Multiply by V)

最后，用计算出的权重去混合 `$V$` 向量。

**1. 计算 one 的新向量 (`$Z_{\text{one}}$`)：**
`$$
\begin{aligned}
Z_{\text{one}} &= 0.24 \cdot v_{\text{one}} + 0.76 \cdot v_{\text{cat}} \\
&= 0.24 \cdot [2, 0, 4] + 0.76 \cdot [-2, 4, 0] \\
&= [0.48, 0, 0.96] + [-1.52, 3.04, 0] \\
&= \mathbf{[-1.04, 3.04, 0.96]}
\end{aligned}
$$`

**2. 计算 cat 的新向量 (`$Z_{\text{cat}}$`)：**
`$$
\begin{aligned}
Z_{\text{cat}} &= 0.76 \cdot v_{\text{one}} + 0.24 \cdot v_{\text{cat}} \\
&= 0.76 \cdot [2, 0, 4] + 0.24 \cdot [-2, 4, 0] \\
&= [1.52, 0, 3.04] + [-0.48, 0.96, 0] \\
&= \mathbf{[1.04, 0.96, 3.04]}
\end{aligned}
$$`

**最终结果对比：**

Self-Attention 层的输出矩阵 `$Z$` 为：
`$$
Z = \begin{bmatrix}
-1.04 & 3.04 & 0.96 \\
1.04 & 0.96 & 3.04
\end{bmatrix}
$$`

* **One 的变化**：从 `[1, 0, 2]` 变为 `[-1.04, 3.04, 0.96]`。它吸收了大量 cat 的特征（特别是中间维度变成了 3.04）。
* **Cat 的变化**：从 `[-1, 2, 0]` 变为 `[1.04, 0.96, 3.04]`。它也吸收了大量 one 的特征（特别是第三维变成了 3.04）。

这就是 BERT 获取上下文能力的数学本质：通过互相关注，将别人的特征融入自己的向量中。

## 写代码计算 Self Attention

代码写起来会简单很多，我们顺便也验证一下上面算的对不对。


```python
import numpy as np 
from typing import List, Dict 
```


```python
def softmax(X:np.ndarray):
    '''对每一行做 softmax
    '''
    # p_i  = e^x_i / sum (e^x_ij). j is all items in X_i
    # 分子分母同时乘以 e^-max(x_i)
    X = np.asarray(X)
    X_max = np.max(X, axis = -1, keepdims=True)
    exp_X = np.exp(X - X_max)
    return exp_X / np.sum(exp_X, axis = -1, keepdims=True)

def self_attention(X: np.ndarray, w_Q: np.ndarray, w_K: np.ndarray, w_V: np.ndarray):
    # 1. 计算 Q, K, V
    Q = X @ w_Q
    K = X @ w_K
    V = X @ w_V
    
    # 2. 获取维度 d_k 用于缩放
    d_k = Q.shape[-1]
    
    # 3. 计算注意力分数
    attention_scores = Q @ K.T
    
    # 4. 缩放
    scaled_scores = attention_scores / np.sqrt(d_k)
    
    # 5. Softmax 归一化得到注意力权重矩阵 A
    A = softmax(scaled_scores)
    
    # 打印中间结果用于对比教程
    print("--- 验证中间结果 ---")
    print(f"Scaled Scores:\n{np.round(scaled_scores, 2)}")
    print(f"\nAttention Matrix (A):\n{np.round(A, 2)}")
    
    # 6. 加权求和
    return A @ V
```


```python
X = np.array([
    [1, 0, 2], 
    [-1, 2, 0]
], dtype=float)

w_Q = np.array([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
])

w_K = np.array([
    [1, 0, 0],
    [0, 0, 1],
    [0, 1, 0]
])

w_V = np.array([
    [2, 0, 0],
    [0, 2, 0],
    [0, 0, 2]
])

print("--- 输入 ---")
print(f"X:\n{X}")

output = self_attention(X, w_Q, w_K, w_V)

print("\n--- 最终输出 (Z) ---")
print(np.round(output, 2))
```

{{< indentedblock >}}
--- 输入 ---
X:
[[ 1.  0.  2.]
[-1.  2.  0.]]
--- 验证中间结果 ---
Scaled Scores:
[[0.58 1.73]
[1.73 0.58]]

Attention Matrix (A):
[[0.24 0.76]
[0.76 0.24]]

--- 最终输出 (Z) ---
[[-1.04  3.04  0.96]
[ 1.04  0.96  3.04]]
{{< /indentedblock >}}
我们看到，我们上面手算的结果是正确的。

## BERT 模型训练

BERT 是一种 Masked Language Model (MLM)。什么意思？

我们说最重要的：我们为什么用 BERT？最核心的理由是我们想把一段话甚至一整篇文章转化成上下文相关的 Embedding。或者说，我们需要的是最后我们算出来的 `$Z$`。

那上面告诉我们了，为了得到 `$Z$`，我们需要 `$X$`, `$W^Q$`, `$W^K$`, `$W^V$`。但这些并不是平白无故就出现了。如何得到？模型训练。

我们首先对 `$W^Q$`, `$W^K$`, `$W^V$` 进行随机初始化。那怎么训练呢？

我用 Claude 生成了 [100 个简单的英文句子]('./files/simple_sentences.txt)。首先，我们得到所有单独的词，制作一个 TOKEN-EMBEDDING 查找表，这里要加上一个 `[MASK]`。我们把这个表叫做 `$E$`，也是随机初始化。

`$$E \in \mathbb{R}^{m \times d}$$`

其中 `$m$` 是词表大小，`$d$` 是 embedding 的维度。

### 训练流程

我们看第一句话：`the cat sits on the mat`。我们把 `sits` 遮住，变成 `the cat [MASK] on the mat`，用来训练。

这句话经过 Self-Attention 计算后，得到 `$Z$`。我们重点看 `$Z_{\text{mask}}$`，它包含了上下文信息。

我们需要做的是，让模型来预测这个被遮住的词是什么。准确来说，我们需要计算词表中每一个词是这个被遮住词的概率，然后找到 `sits` 的概率，计算 loss，最后反向传播。

### 从 `$Z_{\text{mask}}$` 到预测

在真实的 BERT 训练中，直接得到的 `$Z_{\text{mask}}$` 并不会直接用来做预测，而是要经过一些处理。这么做的好处是，我们有更多的参数可以调节，这样可以让结果更准确。

#### 第一步：特征整理（Refinement）

得到 `$Z_{\text{mask}}$` 之后，我们先做一点特征整理：

`$$Z_{\text{refined}} = \text{Activation}(Z_{\text{mask}} \cdot W_{\text{dense}} + b_{\text{dense}})$$`

其中：
- `$Z_{\text{mask}} \in \mathbb{R}^{1 \times d}$`（[MASK] 位置的输出向量）
- `$W_{\text{dense}} \in \mathbb{R}^{d \times d}$`（全连接层权重）
- `$b_{\text{dense}} \in \mathbb{R}^{1 \times d}$`（全连接层偏置）
- Activation 通常是 GELU 或 ReLU

最后的结果 `$Z_{\text{refined}} \in \mathbb{R}^{1 \times d}$`。

#### 第二步：计算 Logits

现在我们要考察：`$Z_{\text{refined}}$` 到底像谁？

我们把 `$Z_{\text{refined}}$` 拿去和字典 `$E$` 里的每一个词比对：

`$$\text{Logits} = Z_{\text{refined}} \cdot E^T + b_{\text{vocab}}$$`

其中：
- `$E \in \mathbb{R}^{m \times d}$`（Embedding Matrix，就是词表）
- `$E^T \in \mathbb{R}^{d \times m}$`（E 的转置）
- `$b_{\text{vocab}} \in \mathbb{R}^{1 \times m}$`（词表偏置）
- `$\text{Logits} \in \mathbb{R}^{1 \times m}$`（每个词的原始分数）

为什么要乘以 `$E^T$`？

`$E$` 是那本字典（所有词的向量）。`$Z_{\text{refined}}$` 是模型根据上下文"猜"出来的向量。

`$Z_{\text{refined}} \cdot E^T$` 本质上是在做点积（Dot Product），也就是计算相似度。模型在问："我猜出来的这个向量，跟字典里的 `cat` 像不像？跟 `sits` 像不像？跟 `mat` 像不像？"

`$b_{\text{vocab}}$` 在这里有用是因为有的词本身就很常见，比如 an, the, a, for 等。它起到的作用就像一个贝叶斯统计里的先验概率。

#### 第三步：计算概率分布

对 logits 做 softmax，得到概率分布：

`$$P = \text{softmax}(\text{Logits}) = \frac{e^{\text{Logits}_i}}{\sum_{j=1}^{m} e^{\text{Logits}_j}}$$`

现在 `$P$` 中的每个值表示对应词是被遮住词的概率，所有概率加起来等于 1。

#### 第四步：计算 Loss

使用交叉熵损失。假设正确答案 `sits` 在词表中的索引是 `$k$`：

`$$\text{Loss} = -\log(P_k)$$`

就是负对数似然，只看正确答案的概率。

### 反向传播：更新所有参数

计算完 Loss 后，我们通过反向传播更新所有参数。需要更新的参数有：

| 参数 | 形状 | 作用 |
|------|------|------|
| `$E$` | `$m \times d$` | Embedding Matrix，词向量查找表 |
| `$W^Q$` | `$d \times d$` | 计算 Query |
| `$W^K$` | `$d \times d$` | 计算 Key |
| `$W^V$` | `$d \times d$` | 计算 Value |
| `$W_{\text{dense}}$` | `$d \times d$` | 特征整理层权重 |
| `$b_{\text{dense}}$` | `$1 \times d$` | 特征整理层偏置 |
| `$b_{\text{vocab}}$` | `$1 \times m$` | 词表偏置 |

注意：计算 Logits 时用的 `$E^T$` 就是 Embedding Matrix 的转置，不是额外的参数。这叫做 **weight tying**（权重绑定），输入和输出共享同一套词向量。

更新规则（梯度下降）：

`$$\theta \leftarrow \theta - \eta \cdot \frac{\partial \text{Loss}}{\partial \theta}$$`

其中 `$\theta$` 代表任意参数，`$\eta$` 是学习率。

### 训练循环

重复以下步骤，直到 Loss 收敛：
1. 随机选一个句子
2. 随机遮住一个词，记录正确答案
3. 前向传播：
{{< indentedblock >}}
- 查 Embedding Matrix 得到 X
- 计算 Self-Attention 得到 Z
- 取 Z_mask，做特征整理得到 Z_refined
- 和 E^T 做点积得到 Logits
- Softmax 得到概率分布
{{< /indentedblock >}}
4. 计算 Loss
5. 反向传播：计算所有参数的梯度
6. 更新参数

训练完成后，模型学会了根据上下文预测被遮住的词，同时 Embedding Matrix 和 Self-Attention 参数都变得有意义了。

## 训练代码

接下来，我们开始实战写代码。需要注意的是，因为梯度计算需要用到矩阵求导，我们暂且不去管数学，而是用 PyTorch 自动求导。之后在进阶版，我们会写清楚每一步的梯度。


```python
import torch 
import re 
import torch.nn as nn

# 设置随机种子
torch.manual_seed(42)
np.random.seed(42)
```


```python
def load_data(filename:str):
    with open(filename, 'r', encoding='utf-8') as f:
        text = f.read().lower() # 全部转小写
    
    # 去标点符号，只保留单词
    text = re.sub(r'[^\w\s]', '', text) 
    sentences = text.strip().split('\n')

    # 建立词表
    words = text.split()
    unique_words = sorted(list(set(words)))
    unique_words += ['[MASK]'] 

    word2id = {w:i for i, w in enumerate(unique_words)}
    id2word = {i:w for i, w in enumerate(unique_words)}

    return sentences, word2id, id2word 

sentences, word2id, id2word = load_data('data/simple_sentences.txt')
vocab_size = len(word2id)

print(f"词表大小: {vocab_size}")
print(f"所有的词: {list(word2id.keys())}")
```

{{< indentedblock >}}
词表大小: 89
所有的词: ['a', 'an', 'apple', 'at', 'ball', 'barks', 'bed', 'bench', 'bird', 'book', 'boy', 'branch', 'bread', 'by', 'cat', 'catches', 'chair', 'chases', 'child', 'clouds', 'coffee', 'digs', 'dog', 'doll', 'door', 'drinks', 'east', 'eats', 'fire', 'fish', 'flies', 'float', 'from', 'garden', 'girl', 'grass', 'hide', 'hides', 'hill', 'house', 'in', 'juice', 'jumps', 'man', 'mat', 'meat', 'milk', 'moon', 'mouse', 'night', 'on', 'over', 'paper', 'park', 'plays', 'reads', 'rises', 'river', 'rock', 'runs', 'school', 'sea', 'seed', 'sets', 'shine', 'shines', 'sings', 'sits', 'sky', 'sleeps', 'stars', 'store', 'sun', 'swims', 'table', 'tea', 'the', 'to', 'tree', 'under', 'walks', 'wall', 'watches', 'water', 'west', 'window', 'with', 'woman', '[MASK]']
{{< /indentedblock >}}
```python
class MiniBert(nn.Module):
    def __init__(self, vocab_size:int, d_model:int):
        super().__init__()
        # 把初始化的方差调小，乘以 0.01 或者 0.1
        scale = 0.01

        # 1. Token Embedding 表
        self.E = nn.Parameter(
            torch.randn(vocab_size, d_model) * scale
        )
        # 这里需要强调一下，E 其实是有顺序的，就是 word2id 里的顺序
        # 因为之后我们用到 input_ids = [word2id[w] for w in words]

        # 2. Attention 权重
        self.W_Q = nn.Parameter(
            torch.randn(d_model, d_model) * scale
        )
        self.W_K = nn.Parameter(
            torch.randn(d_model, d_model) * scale
        )
        self.W_V = nn.Parameter(
            torch.randn(d_model, d_model) * scale
        )

        # 3. MLM Head 中间映射
        self.W_dense = nn.Parameter(
            torch.randn(d_model, d_model) * scale
        )
        self.b_dense = nn.Parameter(
            torch.zeros(d_model)
        )

        # 4. vocab bias（embedding 权重共享）
        self.b_vocab = nn.Parameter(
            torch.zeros(vocab_size)
        )

        self.dropout = nn.Dropout(p=0.1) # BERT 标准是 0.1 (10%)
        self.layer_norm = nn.LayerNorm(d_model)
    
    def bert_forward(self, input_ids):
        X = self.E[input_ids] # Shape: [seq_len, d_model]

        # 2. 计算 Q, K, V
        Q = X @ self.W_Q # Shape: [seq_len, d_model]
        K = X @ self.W_K # Shape: [seq_len, d_model]
        V = X @ self.W_V # Shape: [seq_len, d_model]

        # 3. Self Attention 计算
        d_k = Q.shape[-1]
        # transpose(-2, -1) 倒数第2个维度 和 倒数第1个维度 互换
        # 这是为了应对之后 torch 的 batch。但这里的话，本质上就是 Q @ K.T
        scores = Q @ K.transpose(-2, -1)
        # scores = Q @ K.T 
        # Shape: [seq_len, seq_len]
        scaled_scores = scores/torch.sqrt(torch.tensor(d_k)) 
        A = torch.softmax(scaled_scores, dim = -1) # Shape: [seq_len, seq_len]

        Z = A @ V # (seq_len, d_model)

        # 对 Attention 的结果做一次 Dropout
        Z = self.dropout(Z) # 

        # 残差连接 + LayerNorm
        # 公式的本质：Output = Norm(Input + Attention(Input))
        # 这让梯度有了“高速公路”，可以直接流回 Input
        Z = self.layer_norm(Z + X) # (seq_len, d_model)

        # 4. Refinement (Dense Layer + Activation)
        # Z_refined = GELU(Z * W + b)
        # Shape: (seq_len, d_model)
        Z_refined = torch.nn.functional.gelu(Z @ self.W_dense + self.b_dense)
        
        # 5. Output Logits (Weight Tying)
        # 复用 E 的转置进行预测
        # 因为 E 是 word2id 的顺序，所以 logits 也是 word2id 的顺序
        logits = Z_refined @ self.E.T + self.b_vocab # Shape: (seq_len, vocab_size)
        
        return logits, A
```


```python
def train(vocab_size:int, d_model:int, learning_rate:float, epoches:int):
    model = MiniBert(vocab_size=vocab_size, d_model=d_model)
    optimizer = torch.optim.Adam(model.parameters(), lr = learning_rate)

    for epoch in range(epoches):
        total_loss = 0 
        for sent in sentences:
            words = sent.split()
            if len(words) < 2: continue # 少于两个词，我们直接略过

            # 1. 把文字转成 ID
            input_ids = [word2id[w] for w in words]
            
            # 2. 随机选一个位置遮住
            mask_pos = np.random.randint(0, len(words))
            target_word_id = input_ids[mask_pos] # 正确答案
            
            # 3. 把输入里的这个位置替换成 [MASK]
            input_ids[mask_pos] = word2id['[MASK]']
            
            # 转成 Tensor 喂给模型
            input_tensor = torch.tensor(input_ids) 

            # --- 前向传播 ---
            optimizer.zero_grad() # 清空上一步的梯度
            
            logits, _ = model.bert_forward(input_tensor)

            # ==========================================
            #   计算 Loss 开始
            # ==========================================

            # 1. 锁定位置：我们只关心 [MASK] 这个位置的预测结果
            # mask_logits 是一个长长的向量，代表每个词的分数
            mask_logits = logits[mask_pos] 
            
            # 2. 手动 Softmax：把分数变成概率 (0.0 ~ 1.0)
            # dim=0 表示对这一个向量内部做归一化
            probs = torch.softmax(mask_logits, dim=0)
            
            # 3. 锁定答案：把“正确答案”对应的那个概率抠出来
            # 比如 target_word_id 是 5，我们就看第 5 个概率是多少
            target_prob = probs[target_word_id]
            
            # 4. 计算 Loss：-log(概率)
            # cross entropy loss: - sum (y_i * log(p_i))
            # 概率越接近 1，log 后越接近 0，loss 越小
            # 加一个极小值 1e-9 是为了防止 target_prob 为 0 时 log 报错
            loss = -torch.log(target_prob + 1e-9)

            # ==========================================
            #   计算 Loss 结束
            # ==========================================

            # --- 反向传播 & 更新参数 ---
            loss.backward()  # 这一步会自动算出 W_Q, E 等所有参数的梯度
            optimizer.step() # 这一步会自动执行 param -= lr * grad
            
            total_loss += loss.item()

        if epoch % 50 == 0:
            print(f"Epoch {epoch}, Loss: {total_loss/len(sentences):.4f}")
        
    print("训练完成！")
    return model 
```


```python
trained_model = train(
    vocab_size=vocab_size, 
    d_model=128, 
    learning_rate=0.001, 
    epoches=500
)
```

{{< indentedblock >}}
Epoch 0, Loss: 3.8556
Epoch 50, Loss: 1.2090
Epoch 100, Loss: 0.6556
Epoch 150, Loss: 0.2926
Epoch 200, Loss: 0.2074
Epoch 250, Loss: 0.1870
Epoch 300, Loss: 0.1895
Epoch 350, Loss: 0.2070
Epoch 400, Loss: 0.0788
Epoch 450, Loss: 0.1339
训练完成！
{{< /indentedblock >}}
这里有不少值得说的点。首先，我们上面只是用到了 `$Z_\text{mask}$` 但是我们在上面的训练代码中，却把全部的 `$Z$` 都用起来了。为什么呢？

- GPU 计算的是并行计算，所以只算 `$Z_\text{mask}$` 和全部的 `$Z$` 都算，在计算资源的使用量上并没有显著差异。
- 在真实的 BERT 训练中，并不只是随机遮住一个字，而是多个字。
- 在真实的 BERT 训练中，Self Attention 有很多层，比如 12 层，而不仅仅是一层。那第二层的输入是 `$Z$`，而不是 `$Z_\text{mask}$`。
另外，我们用到了 dropout：`Z = self.dropout(Z)`。这个其实很好理解。首先，`$Z$` 的维度是 `$m \times d$`。Dropout 是说，每一个元素，或者说，每一行（即，每一个字）的每一个数字，都有百分之十（这是一个参数，可以调节）的概率变为 0。然后呢，每一行，我们要确保 dropout 前后的期望值不变，那就需要把别的数字改变一下。其实就是每个数字除以 `$0.9$` 就可以。这就是所谓的 inverted dropout. 这么做有什么用？它可以逼迫模型在缺少数据的情况下拼尽全力去做好预测。

我们还用到了 `Z = self.layer_norm(Z + X)`。它的本质是 Output = Norm(Input + Attention(Input)). 这是何凯明大神那篇著名的 ResNet 论文的的精髓。它可以显著提高模型的拟合。

还有就是我们看到 Loss 大致是在不断下降的，但是偶尔会有起伏。这很正常，因为遮的词是随机的，有时候就比较难。

我们现在来用几个句子来检测一下：

- The man eats the MASK
- The man read the MASK
- The man MASK the book

注意，这两句话并没有出现在训练集里，但是所有的词都是训练时见过的。我们看看模型是否可以准确预测出正确的词。


```python
def predict(model:MiniBert, sentence:str, word2id:Dict, id2word:Dict):
    # --- 1. 准备工作 ---
    model.eval() # 关闭 Dropout

    words = sentence.split()
    try:
        mask_idx = words.index('[MASK]')
    except ValueError:
        print(f"出错: 句子 '{sentence}' 里没有找到 [MASK]")
        return
    
    input_ids = [word2id.get(w,0) for w in words]
    input_tensor = torch.tensor([input_ids]) # 转成 Tensor 并增加 Batch 维度: [seq_len] -> [1, seq_len]

    # --- 2. 模型推理 ---
    with torch.no_grad(): # 预测模式不需要算梯度，省内存
        logits, _ = model.bert_forward(input_tensor)
    
    # --- 3. 提取结果 ---
    # logits 形状: [batch=1, seq_len, vocab_size]
    # 我们只关心 [MASK] 那个位置的预测结果
    # 因为 E 是 word2id 的顺序，所以 logits 也是 word2id 的顺序
    mask_logits = logits[0, mask_idx, :] # Shape: (1, 1, vocab_size)

    probs = torch.softmax(mask_logits, dim = -1)

    # 取出概率最大的前 5 个词
    top_k = torch.topk(probs, k=5)
    top_ids = top_k.indices.tolist()
    top_values = top_k.values.tolist()

    # --- 4. 打印结果 ---
    print(f"\n📝 输入句子: {sentence}")
    print(f"📍 [MASK] 位置: 第 {mask_idx} 个词")
    print("🤖 模型预测结果:")
    print("-" * 30)
    for i in range(len(top_ids)):
        word = id2word[top_ids[i]]
        score = top_values[i]
        print(f"  {i+1}. {word:<10} (信心: {score:.2%})")
    print("-" * 30)
```


```python
# 测试用例 1: 考察宾语 (Object)
# 预期：eats 后面应该是食物 (apple, fish, meat)
predict(trained_model, "the man eats the [MASK]", word2id, id2word)
```

{{< indentedblock >}}
📝 输入句子: the man eats the [MASK]
📍 [MASK] 位置: 第 4 个词
🤖 模型预测结果:
------------------------------
1. meat       (信心: 99.51%)
2. ball       (信心: 0.31%)
3. woman      (信心: 0.06%)
4. bread      (信心: 0.05%)
5. fish       (信心: 0.02%)
------------------------------
{{< /indentedblock >}}
```python
# 测试用例 2: 
predict(trained_model, "the man read the [MASK]", word2id, id2word)
```

{{< indentedblock >}}
📝 输入句子: the man read the [MASK]
📍 [MASK] 位置: 第 4 个词
🤖 模型预测结果:
------------------------------
1. book       (信心: 47.85%)
2. meat       (信心: 20.08%)
3. house      (信心: 11.64%)
4. store      (信心: 7.70%)
5. bread      (信心: 3.66%)
------------------------------
{{< /indentedblock >}}
```python
# 测试用例 3: 考察谓语 (Verb) / 语法
# 预期：man 和 book 中间应该是动作 (reads, likes, buys, sees)
predict(trained_model, "the man [MASK] the book", word2id, id2word)
```

{{< indentedblock >}}
📝 输入句子: the man [MASK] the book
📍 [MASK] 位置: 第 2 个词
🤖 模型预测结果:
------------------------------
1. man        (信心: 71.53%)
2. plays      (信心: 22.49%)
3. woman      (信心: 5.23%)
4. over       (信心: 0.59%)
5. cat        (信心: 0.08%)
------------------------------
{{< /indentedblock >}}
我们可以看到，前两个还行，第三个就很一般了。
