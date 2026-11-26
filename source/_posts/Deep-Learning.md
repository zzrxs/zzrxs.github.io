---
title: Deep Learning
date: 2026-11-25 16:16:00
updated: 2026-11-25
categories:
  - Deep Learning
tags:
  - Neural Network
  - CNN
  - RNN
  - Transformer
  - High-Dimensional Data
  - Frequency Principle
description: Deep Learning Course Notes
math: true
---

深度学习可以统一地理解为：在数据、模型与优化算法共同决定的函数空间中，寻找一个能够逼近目标规律并对未见数据保持良好表现的函数。本笔记从这一观点出发，讨论基本模型与训练方法、典型网络结构、高维数据的反直觉性质，以及神经网络训练中出现的频率原则、参数凝聚和平坦解等现象。

## 1. 人工智能、机器学习与函数拟合

### 1.1 基本概念

人工智能（Artificial Intelligence, AI）指由人制造的机器所表现出的智能。机器学习（Machine Learning, ML）是实现 AI 的主要途径之一：算法从数据中自动发现规律，再利用规律对未知数据作预测。常见方法包括线性回归、神经网络、聚类、降维与强化学习。

AI 已被用于函数拟合、图像识别与生成、大语言模型、自动驾驶、围棋、蛋白质结构预测、音乐生成等任务。无论表面任务怎样变化，其中一个共同核心都是**数据拟合（data fitting）**。

设数据集为

$$
S=\{(x_i,y_i)\}_{i=1}^{n}\subset\mathcal X\times\mathcal Y,
$$

输入空间 $\mathcal X\subseteq\mathbb R^d$，输出空间 $\mathcal Y\subseteq\mathbb R^{d_o}$。客观规律记为目标函数

$$
f^*:\mathcal X\to\mathcal Y,
$$

模型记为 $f_\theta$。参数 $\theta$ 改变时，$f_\theta$ 构成一个函数空间。训练就是在这个空间中寻找一个与 $f^*$ 足够接近的函数。

深度学习的三个基本要素是：

1. **模型**：决定能表示哪些函数；
2. **数据**：提供关于目标函数的有限观测；
3. **优化**：决定训练从大量候选函数中实际选到哪一个。

因此，理解一种机器学习算法，不能只看网络结构，还要同时研究数据分布与优化动力学。

### 1.2 训练集、验证集与测试集

- **训练集**用于计算梯度并更新模型参数，其损失称为训练误差。
- **验证集**用于比较超参数、选择模型并判断是否早停。
- **测试集**只用于最终评估泛化能力，训练和调参阶段都不应使用。

不能根据测试集反复修改模型，否则测试集已经间接参与训练，最终测试误差将不再是可信的泛化估计。

经验风险常写为

$$
R_S(\theta)=\frac1n\sum_{i=1}^{n}\ell\bigl(f_\theta(x_i),y_i\bigr).
$$

训练误差反映对已知样本的拟合，测试误差反映对未知样本的泛化。两者之间的差称为 generalization gap。

### 1.3 线性回归示例

一维线性模型为

$$
f_\theta(x)=Ax+b,\qquad \theta=(A,b).
$$

训练集上的均方误差为

$$
L(A,b)=\frac1{n_1}\sum_{i=1}^{n_1}\left(Ax_i^{\rm train}+b-y_i^{\rm train}\right)^2.
$$

令 $\partial L/\partial A=0$、$\partial L/\partial b=0$，得到正规方程。定义

$$
\bar x=\frac1{n_1}\sum_i x_i^{\rm train},\qquad
\bar y=\frac1{n_1}\sum_i y_i^{\rm train},
$$

$$
S_{xy}=\sum_i(x_i^{\rm train}-\bar x)(y_i^{\rm train}-\bar y),\qquad
S_{xx}=\sum_i(x_i^{\rm train}-\bar x)^2,
$$

则

$$
A=\frac{S_{xy}}{S_{xx}},\qquad b=\bar y-A\bar x.
$$

测试误差不仅依赖测试样本，也依赖从训练集得到的 $\bar x,\bar y,S_{xy},S_{xx}$。这正体现了“训练集上学到的统计规律如何影响新数据上的表现”。线性模型可以解析求解，而复杂神经网络通常需要迭代优化。

### 1.4 三种学习方式

| 学习方式 | 数据与目标 | 典型任务 | 常见算法 |
| --- | --- | --- | --- |
| Supervised Learning | 带标签数据，学习预测或分类 | 垃圾邮件识别、房价预测 | 线性/逻辑回归、SVM、决策树、神经网络 |
| Unsupervised Learning | 无标签数据，发现隐藏结构 | 客户细分、关联分析、降维 | K-Means、关联规则、PCA |
| Reinforcement Learning | 用奖励信号指导行为，最大化累计奖励 | 机器人行走、游戏决策 | Q-learning、SARSA |

监督学习像根据标准答案练习；无监督学习像自行总结材料结构；强化学习只获得得分或奖励，而不直接知道每一步的标准答案。

## 2. 神经网络基础

### 2.1 从神经元到全连接网络

#### 2.1.1 单个神经元如何处理信息

设输入为 $x=(x_1,x_2,\ldots,x_d)^\top$。人工神经元先计算加权和，再通过激活函数：

$$
z=w^\top x+b=\sum_{i=1}^{d}w_ix_i+b,
\qquad h=\sigma(z).
$$

$w_i$ 表示第 $i$ 个输入的影响：绝对值越大，影响通常越强；正权重推动 $z$ 增大，负权重抑制输出。偏置 $b$ 用来移动判断阈值。例如预测股票涨跌时，可以给经济学家的意见更大权重；若某项指标通常与上涨负相关，则可学习到负权重。

$\sigma(\cdot)$ 称为激活函数。阶跃函数 $H(z)$ 在 $z\ge0$ 时输出 $1$，否则输出 $0$；Sigmoid 是平滑的软开关；Tanh 输出位于 $(-1,1)$；ReLU 定义为 $\max(0,z)$。若采用阶跃函数，判断边界满足

$$
w^\top x+b=0.
$$

它在二维中是一条直线，在三维中是平面，在高维中是超平面。单个感知器因此只能形成一个线性决策边界。

#### 2.1.2 从一个神经元到一层网络

把 $m$ 个神经元并列起来，得到一层全连接网络：

$$
h=\sigma(Wx+b),
$$

其中 $W\in\mathbb R^{m\times d}$、$b\in\mathbb R^m$，$\sigma$ 逐元素作用。$W$ 的第 $j$ 行是第 $j$ 个神经元的权重，输出 $h_j$ 可以理解为它提取的一种特征。

设 $x_1,x_2\in\{0,1\}$，用阶跃函数可以构造

$$
\operatorname{AND}(x_1,x_2)=H(x_1+x_2-1.5),
$$

$$
\operatorname{OR}(x_1,x_2)=H(x_1+x_2-0.5),
\qquad
\operatorname{NOT}(x_1)=H(0.5-x_1).
$$

AND 只有两个输入都为 $1$ 时越过阈值；OR 只要求至少一个输入为 $1$。这些逻辑的正负样本都能被一条直线分开。

#### 2.1.3 XOR 为什么不能由单个感知器完成

XOR（exclusive OR）表示“两个输入不同时输出 $1$，相同时输出 $0$”：

| $x_1$ | $x_2$ | XOR |
| ---: | ---: | ---: |
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

几何上，$(0,1)$、$(1,0)$ 位于一条对角线，$(0,0)$、$(1,1)$ 位于另一条对角线，不存在一条直线能把两类点完全分开。

还可以严格证明。假设

$$
y=H(w_1x_1+w_2x_2+b)
$$

能够实现 XOR，则四个样本要求

$$
\begin{aligned}
b&<0,\\
w_1+b&\ge0,\\
w_2+b&\ge0,\\
w_1+w_2+b&<0.
\end{aligned}
$$

由中间两式得到 $w_1\ge-b$、$w_2\ge-b$，于是

$$
w_1+w_2+b\ge-b>0,
$$

与最后一个条件矛盾。这说明问题不是权重尚未调好，而是单个线性决策边界的表达能力不足。

#### 2.1.4 两层网络如何解决 XOR

隐藏层可以先构造两个中间特征：

$$
h_1=H(x_1+x_2-0.5)\quad(\text{OR}),
$$

$$
h_2=H(x_1+x_2-1.5)\quad(\text{AND}).
$$

输出层令

$$
y=H(h_1-2h_2-0.5).
$$

逐项代入：

| $(x_1,x_2)$ | $h_1$ | $h_2$ | $h_1-2h_2-0.5$ | $y$ |
| --- | ---: | ---: | ---: | ---: |
| $(0,0)$ | 0 | 0 | $-0.5$ | 0 |
| $(0,1)$ | 1 | 0 | $0.5$ | 1 |
| $(1,0)$ | 1 | 0 | $0.5$ | 1 |
| $(1,1)$ | 1 | 1 | $-1.5$ | 0 |

隐藏层完成非线性映射 $(x_1,x_2)\mapsto(h_1,h_2)$。原空间中线性不可分的点，进入新特征空间后变得线性可分。这正是多层网络的基本思想：前层学习表示，后层在新表示上完成更简单的判断。

#### 2.1.5 多层网络为什么需要非线性

堆叠线性变换与非线性激活得到多层网络：

$$
h^{(\ell+1)}=\sigma\!\left(W^{(\ell)}h^{(\ell)}+b^{(\ell)}\right).
$$

若删除激活函数，两层仿射变换可以合并：

$$
W_2(W_1x+b_1)+b_2
=(W_2W_1)x+(W_2b_1+b_2).
$$

无论叠多少层，结果仍只是一个仿射模型，不能解决 XOR。激活函数让不同输入区域经历不同变换，网络才能产生弯曲或分段的复杂决策边界。

一个常见的单隐藏层网络是

$$
f_\theta(x)=\sum_{j=1}^{m}a_j\sigma(w_j^\top x+b_j).
$$

它也可以看作基函数 $u_j(x)=\sigma(w_j^\top x+b_j)$ 的加权和。每个隐藏神经元刻画一种模式或方向，输出层再组合这些模式。宽度 $m$ 决定一层能并行提取多少特征，深度则允许模型逐层组合简单特征，形成更复杂的表示。

### 2.2 万有逼近定理及其边界

Cybenko（1989）、Hornik et al.（1989）与 Leshno et al.（1993）的结果表明，在适当条件下，具有单个隐藏层且使用非多项式非线性激活函数的前馈网络，可以在紧集上以任意精度逼近连续函数。

它与 Weierstrass approximation theorem 有相似精神：后者用多项式逼近连续函数，前者用可训练神经元的叠加逼近。但“存在某个多项式/网络”与“训练算法能高效找到它”是两回事。

“可以表示”不等于“容易训练”：

- 定理不保证所需宽度、内存和计算量可接受；
- 不保证梯度算法能找到构造出的逼近解；
- 不保证有限样本下具有良好泛化；
- 深度、数据结构和优化偏好仍然重要。

如果激活函数本身是固定次数多项式，有限层复合仍受多项式次数结构限制。特别地，一维、无偏置、ReLU 的两层网络

$$
f(x)=\sum_j a_j\operatorname{ReLU}(w_jx)
$$

只有以原点为折点的分段线性形状，因而没有一般的万有逼近能力；偏置项 $b_j$ 使折点可以移动到 $-b_j/w_j$，不可随意删去。

### 2.3 损失函数

#### 2.3.1 为什么需要损失函数

模型 $f_\theta$ 给出预测，损失函数则把“预测得有多差”转换成一个可以比较和优化的标量。对单个样本 $(x_i,y_i)$，记

$$
\ell_i(\theta)=\ell\bigl(f_\theta(x_i),y_i\bigr),
$$

整个训练集上的平均损失称为经验风险（empirical risk）：

$$
R_S(\theta)=\frac1n\sum_{i=1}^{n}\ell_i(\theta).
$$

训练的目标通常是

$$
\theta^*=\arg\min_\theta R_S(\theta).
$$

损失函数相当于给优化算法提供方向。损失选择不同，即使模型和数据完全相同，最终学到的函数也可能不同。训练所用的 loss 与最终报告的评价指标也不一定相同。例如分类训练常用可导的 cross-entropy，最终可能报告 accuracy、precision 或 recall。

#### 2.3.2 回归中的 MSE 与 MAE

设模型输出连续值，预测误差为

$$
e_i=f_\theta(x_i)-y_i.
$$

均方误差（Mean Squared Error, MSE）为

$$
R_{\mathrm{MSE}}(\theta)
=\frac1n\sum_{i=1}^{n}\|e_i\|_2^2.
$$

它对大误差进行平方惩罚。例如误差从 $1$ 增大到 $2$，对应损失从 $1$ 增大到 $4$。MSE 光滑、梯度容易计算，但离群点会产生很大影响。在“误差近似服从 Gaussian distribution”的假设下，最小化 MSE 等价于最大化数据似然。

绝对误差（Mean Absolute Error, MAE）为

$$
R_{\mathrm{MAE}}(\theta)
=\frac1n\sum_{i=1}^{n}\|e_i\|_1.
$$

MAE 对误差进行线性惩罚，因此通常比 MSE 更不容易被少量离群点支配；但它在误差为零处不可导，实际实现会使用 subgradient。MAE 中的绝对值不能去掉，否则正误差和负误差会互相抵消。例如误差 $2$ 和 $-2$ 的平均值为零，但模型显然并未预测正确。

#### 2.3.3 从分类概率到交叉熵

分类模型不仅要给出类别，还希望给出每一类的概率。二分类时，模型通常输出正类概率 $p_i\in(0,1)$，标签 $y_i\in\{0,1\}$。Binary Cross-Entropy（BCE）为

$$
R_{\mathrm{BCE}}
=-\frac1n\sum_{i=1}^{n}
\left[y_i\log p_i+(1-y_i)\log(1-p_i)\right].
$$

若 $y_i=1$，单样本损失化为 $-\log p_i$；模型给真实类别的概率越接近 $1$，损失越接近 $0$。若模型非常自信地给错，例如真实标签为 $1$ 却给出 $p_i\approx0$，损失会迅速增大。

交叉熵也可以从 maximum likelihood 理解。模型对训练集中真实标签给出的联合概率越大越好；把概率连乘取负对数，就得到各样本 negative log-likelihood 的求和。对数把乘法变成加法，也让计算和求导更加稳定。

#### 2.3.4 Softmax：把 logits 转换成多分类概率

多分类网络的最后一层通常先输出 $C$ 个任意实数

$$
z=(z_1,z_2,\ldots,z_C)\in\mathbb R^C,
$$

称为 **logits**。Logit 不是概率：它可以为负数，也不要求总和为 $1$。Softmax 将 logits 转成概率分布：

$$
p_c=\operatorname{softmax}(z)_c
=\frac{e^{z_c}}{\sum_{j=1}^{C}e^{z_j}},
\qquad c=1,\ldots,C.
$$

Softmax 有三个基本性质：

1. $p_c>0$，每个输出都是正数；
2. $\sum_{c=1}^{C}p_c=1$，所有类别形成概率分布；
3. 若 $z_a>z_b$，则 $p_a>p_b$，因此不会改变类别排名。

例如三个类别的 logits 为

$$
z=(2,1,0),
$$

则

$$
p\approx(0.665,0.245,0.090).
$$

最大 logit 对应约 $66.5\%$ 的概率，但另外两类仍保留非零概率。Logits 之间的**相对差值**决定 Softmax 输出；给所有 logits 同时加同一个常数 $a$，结果不变：

$$
\operatorname{softmax}(z+a)
=\operatorname{softmax}(z).
$$

这一性质也带来数值稳定技巧。直接计算 $e^{z_c}$ 可能溢出，因此实现时通常先减去最大值 $m=\max_j z_j$：

$$
p_c=\frac{e^{z_c-m}}{\sum_j e^{z_j-m}}.
$$

Softmax 还可加入 temperature $T>0$：

$$
p_c(T)=\frac{e^{z_c/T}}{\sum_j e^{z_j/T}}.
$$

$T<1$ 会让分布更尖锐，模型更偏向最大 logit；$T>1$ 会让分布更平缓，生成任务中的随机性通常更高。

需要区分 Softmax 与 Sigmoid：Softmax 适合“多个类别中只能选一个”的互斥分类；多标签任务中多个类别可以同时成立，通常应对每个类别独立使用 Sigmoid，再配合 BCE。

#### 2.3.5 Softmax Cross-Entropy

设样本 $i$ 的 one-hot 标签为 $y_i=(y_{i1},\ldots,y_{iC})$，预测概率为 $p_i$，多分类交叉熵为

$$
R_{\mathrm{CE}}
=-\frac1n\sum_{i=1}^{n}\sum_{c=1}^{C}y_{ic}\log p_{ic}.
$$

因为 one-hot 标签只有真实类别 $t_i$ 的分量为 $1$，单样本损失可以简化为

$$
\ell_i=-\log p_{i,t_i}.
$$

若模型给真实类别的概率为 $0.8$，损失约为

$$
-\log0.8\approx0.223;
$$

若只给真实类别 $0.1$ 的概率，则

$$
-\log0.1\approx2.303.
$$

因此 cross-entropy 不仅关心“猜对没有”，还关心模型有多自信。两个模型 accuracy 相同，给真实类别概率更高的模型通常具有更小的 cross-entropy。

Softmax 与 cross-entropy 组合还有一个简洁梯度。对单样本 logits $z$，有

$$
\frac{\partial\ell}{\partial z_c}=p_c-y_c.
$$

预测概率高于标签的类别得到正梯度，梯度下降会压低其 logit；真实类别通常满足 $p_c<1$，对应负梯度，梯度下降会提高其 logit。这也是二者经常组合使用的原因。实际框架通常直接提供 `CrossEntropyLoss`，内部完成稳定的 LogSoftmax 与 NLL，不应先手动 Softmax 再重复计算。

#### 2.3.6 困惑度 Perplexity

语言模型在每个位置根据前文预测下一个 token。给定序列 $x_1,\ldots,x_N$，平均 negative log-likelihood 为

$$
L_{\mathrm{NLL}}
=-\frac1N\sum_{t=1}^{N}
\log p_\theta(x_t\mid x_{<t}).
$$

困惑度定义为

$$
\operatorname{PPL}=\exp(L_{\mathrm{NLL}})
=\exp\left(
-\frac1N\sum_{t=1}^{N}
\log p_\theta(x_t\mid x_{<t})
\right).
$$

利用对数性质，还可写成

$$
\operatorname{PPL}
=\left(
\prod_{t=1}^{N}
\frac1{p_\theta(x_t\mid x_{<t})}
\right)^{1/N}.
$$

因此 PPL 是“真实 token 概率倒数的几何平均”。它可以粗略理解为：模型在每个位置平均像是在多少个同等可能的候选中犹豫。

- 若每一步都给真实 token 概率 $0.5$，则 $\operatorname{PPL}=2$；
- 若真实 token 的概率依次为 $0.5,0.25,0.125$，几何平均为 $0.25$，所以 $\operatorname{PPL}=4$；
- 若模型在大小为 $V$ 的词表上始终均匀猜测，则每个真实 token 的概率为 $1/V$，故 $\operatorname{PPL}=V$；
- 理想模型每一步都给真实 token 概率 $1$，其 PPL 为 $1$，这是理论最小值。

PPL 越小，说明模型平均为真实 token 分配的概率越高。但 PPL 不是 accuracy，也不直接等于生成质量：模型可能具有较低 PPL，却仍产生事实错误、重复或不安全内容。

比较 PPL 时必须保持测试语料、tokenizer、词表和计算方式一致。同一句话采用字符、单词或 subword tokenization，会产生不同的序列长度和概率分解，因此不同 tokenization 下的 PPL 通常不能直接横向比较。若使用以 $2$ 为底的对数，则 PPL 写作 $2^{H}$；使用自然对数时写作 $e^H$，二者只要前后一致即可。

#### 2.3.7 Softmax、Cross-Entropy 与 PPL 的关系

三者可以串成一条完整链路：

1. 网络输出 logits $z$；
2. Softmax 把 logits 变成概率 $p$；
3. Cross-entropy 读取真实类别的概率并计算 $-\log p_{\rm true}$；
4. 在语言模型中，对所有 token 的 cross-entropy/NLL 取平均再指数化，得到 Perplexity。

简写为

$$
z
\xrightarrow{\mathrm{Softmax}}p
\xrightarrow{-\log p_{\rm true}}L_{\mathrm{CE}}
\xrightarrow{\exp}\operatorname{PPL}.
$$

损失函数随参数 $\theta$ 变化形成的几何形态称为**损失景观（loss landscape）**。同一个模型在训练集和测试集上会得到不同的损失景观；训练实际沿训练损失景观移动，而泛化关注的是模型在未见数据上的损失。

## 3. 优化、反向传播与初始化

### 3.1 梯度下降法 Gradient Descent

在 $\theta_0$ 附近线性化：

$$
R(\theta_0+\Delta\theta)\approx R(\theta_0)+\nabla R(\theta_0)^\top\Delta\theta.
$$

固定 $\|\Delta\theta\|$ 时，内积在 $\Delta\theta$ 与梯度方向相反时最小，因此梯度下降更新为

$$
g_t=\nabla_\theta R_S(\theta_{t-1}),\qquad
\theta_t=\theta_{t-1}-\eta g_t,
$$

其中 $\eta$ 是 learning rate 或 step size。

### 3.2 向后传播 Backpropagation

反向传播本质上是链式法则的高效实现。以

$$
f_\theta(x)=\sum_{j=1}^{m}a_j\sigma(w_j^\top x+b_j),\qquad
L=\frac12(f_\theta(x)-y)^2
$$

为例，记 $e=f_\theta(x)-y$，则

$$
\frac{\partial L}{\partial a_j}=e\,\sigma(w_j^\top x+b_j),
$$

$$
\frac{\partial L}{\partial w_j}=e\,a_j\sigma'(w_j^\top x+b_j)x,
\qquad
\frac{\partial L}{\partial b_j}=e\,a_j\sigma'(w_j^\top x+b_j).
$$

多层网络把输出误差沿计算图向后传播，并复用中间结果，避免对每个参数重复展开整条链式法则。

### 3.3 SGD、Momentum、Adagrad 与 Adam

#### 3.3.1 从 GD 到 mini-batch SGD

设训练集包含 $n$ 个样本，经验风险为

$$
R_S(\theta)=\frac1n\sum_{i=1}^{n}\ell_i(\theta).
$$

Full-batch Gradient Descent（GD）每次更新都计算全部样本的梯度：

$$
g_t=\nabla_\theta R_S(\theta_{t-1}),
\qquad
\theta_t=\theta_{t-1}-\eta g_t.
$$

一次梯度越准确，计算代价也越大。当训练数据和模型规模很大时，每一步都遍历全部数据会超过计算或存储资源的承载能力。

带随机的梯度下降法 Stochastic Gradient Descent（SGD）的核心思想是：每次只使用随机抽取的一小部分样本。设 mini-batch 为 $B_t$，包含 $|B|$ 个样本，则

$$
R_{B_t}(\theta)=\frac1{|B|}\sum_{i\in B_t}\ell_i(\theta),
$$

$$
g_t=\nabla_\theta R_{B_t}(\theta_{t-1}),
\qquad
\theta_t=\theta_{t-1}-\eta g_t.
$$

严格说，只取一个样本时称为 stochastic gradient；实际深度学习通常使用 mini-batch，但习惯上仍统称 SGD。把全部训练样本分批并完整使用一遍称为一个 **epoch**。

若 batch 均匀随机抽取，则 mini-batch gradient 是 full gradient 的无偏估计：

$$
\mathbb E[g_t]=\nabla R_S(\theta_{t-1}).
$$

不过单次 $g_t$ 带有随机误差。Batch 越大，梯度方差通常越小、方向越稳定，但每一步成本更高；batch 越小，更新更频繁、噪声更强，也更容易充分利用有限显存。实践中需要在吞吐量、显存、梯度噪声和泛化之间折中。

SGD 的随机性有时能帮助参数离开鞍点或狭窄极小值。课件强调，SGD 在实际训练中经常找到比 full-batch GD 泛化更好的解，但这是一种常见经验，不是对所有任务都成立的保证。

#### 3.3.2 动量法 Momentum：积累稳定的下降方向

当损失函数等高线呈狭长椭圆形时，不同方向曲率相差很大。普通 SGD 在陡峭方向反复改变符号，产生“之”字形震荡；沿平缓方向却前进缓慢。损失景观中的鞍点和浅局部极小区域也可能让更新停滞。

Momentum 保存过去梯度的累积方向：

$$
g_t=\nabla R(\theta_{t-1}),\qquad
m_t=\mu m_{t-1}+g_t,
$$

$$
\theta_t=\theta_{t-1}-\eta m_t.
$$

$\mu\in[0,1)$ 是 momentum coefficient。若某个方向的梯度连续同号，历史项会叠加，使该方向更新加速；若某个方向的梯度正负交替，累积时会相互抵消，从而抑制震荡。

可以把参数想象成一个有惯性的小球：梯度提供当前受力，$m_t$ 保存过去形成的速度。即使当前位置梯度较小，已有动量仍可能让它穿过平坦区域或浅的局部结构。这里的“惯性”只是帮助理解公式的类比，真实优化过程仍由离散更新决定。

展开递推可得

$$
m_t=g_t+\mu g_{t-1}+\mu^2g_{t-2}+\cdots,
$$

因此越久远的梯度权重越小。常见 $\mu$ 取值接近 $0.9$，意味着算法会综合最近若干步的方向。

#### 3.3.3 自适应优化法 Adagrad：为每个参数调整学习率

SGD 和 Momentum 通常给所有参数使用同一个全局学习率 $\eta$。Adagrad 根据每个参数过去梯度的大小，自动调整它自己的有效步长。对向量运算逐元素定义

$$
n_t=n_{t-1}+g_t\odot g_t,
$$

$$
\theta_t=\theta_{t-1}
-\eta\frac{g_t}{\sqrt{n_t}+\varepsilon}.
$$

$n_t$ 累计平方梯度。某个参数若经常出现大梯度，$n_t$ 会迅速增大，其有效学习率

$$
\eta_{t,j}^{\mathrm{eff}}
=\frac{\eta}{\sqrt{n_{t,j}}+\varepsilon}
$$

就会减小；很少更新或梯度较小的参数则保持较大步长。这个特点适合稀疏特征，例如词表中低频词对应的 embedding 参数。

$\varepsilon$ 防止除零。Adagrad 的主要局限是 $n_t$ 只增不减，训练很久后有效学习率可能衰减得过小，导致模型几乎停止学习。

#### 3.3.4 Adam：Momentum 与自适应步长的结合

Momentum 解决“怎样利用梯度方向的历史”，Adagrad 解决“不同参数怎样使用不同步长”。Adam（Adaptive Moment Estimation）同时维护梯度的一阶矩和平方梯度的二阶矩：

$$
m_t=\beta_1m_{t-1}+(1-\beta_1)g_t,
$$

$$
v_t=\beta_2v_{t-1}+(1-\beta_2)g_t^2,
$$

$m_t$ 类似 Momentum，用于估计稳定的下降方向；$v_t$ 估计各参数近期梯度的平方尺度，用来调整逐参数学习率。与 Adagrad 的无限累加不同，指数移动平均会逐渐遗忘很久以前的梯度。

由于 $m_0=v_0=0$，训练初期两个估计会系统性偏小，因此需要 bias correction：

$$
\hat m_t=\frac{m_t}{1-\beta_1^t},
\qquad
\hat v_t=\frac{v_t}{1-\beta_2^t}.
$$

最终更新为

$$
\theta_t=\theta_{t-1}-\eta\frac{\hat m_t}{\sqrt{\hat v_t}+\varepsilon}.
$$

经典默认值常取 $\beta_1=0.9$、$\beta_2=0.999$、$\varepsilon=10^{-8}$，但学习率和其他参数仍需结合任务调整。Adam 在图像识别、语言模型等任务中使用广泛，通常在训练初期收敛较快。它并不自动保证比 SGD 泛化更好；一些视觉任务仍会选择带 Momentum 的 SGD。

| 方法 | 使用的信息 | 主要优点 | 常见局限 |
| --- | --- | --- | --- |
| SGD | 当前 mini-batch 梯度 | 简单、内存开销小，常有良好泛化 | 易震荡，对学习率敏感 |
| Momentum | 当前梯度与历史方向 | 抑制之字形震荡，加速稳定方向 | 新增 $\mu$，仍使用全局学习率 |
| Adagrad | 累计平方梯度 | 为每个参数自适应缩放，适合稀疏特征 | 有效学习率可能过早衰减 |
| Adam | 梯度一阶矩与二阶矩 | 同时具有动量和逐参数缩放 | 仍需调参，最终泛化不一定优于 SGD |

### 3.4 学习率与稳定性

#### 3.4.1 一维二次函数的完整推导

学习率 $\eta$ 决定每一步沿更新方向走多远。考虑最简单的二次函数

$$
L(\theta)=\frac12\lambda\theta^2,
$$

其中 $\lambda>0$ 表示曲率。其梯度为 $\partial L/\partial\theta=\lambda\theta$，所以

$$
\theta_{t+1}
=\theta_t-\eta\lambda\theta_t
=(1-\eta\lambda)\theta_t.
$$

递推得到

$$
\theta_t=(1-\eta\lambda)^t\theta_0.
$$

要使 $\theta_t\to0$，必须满足

$$
|1-\eta\lambda|<1
\quad\Longleftrightarrow\quad
0<\eta<\frac{2}{\lambda}.
$$

课件最后一行的分式在文本提取时容易显示成 $2\lambda$；由上面的不等式可知，正确条件是 $\eta<2/\lambda$。

不同学习率对应不同动力学：

- $0<\eta\lambda<1$：$1-\eta\lambda\in(0,1)$，参数同号、单调接近零；
- $\eta\lambda=1$：在这个理想二次模型中一步到达零；
- $1<\eta\lambda<2$：系数为负，参数在零点两侧交替，但振幅逐渐减小；
- $\eta\lambda=2$：系数为 $-1$，参数等幅振荡，不收敛；
- $\eta\lambda>2$：振荡幅度不断增大，训练爆炸。

因此，“损失偶尔上升”不一定意味着必然发散；在 $1<\eta\lambda<2$ 时，参数会振荡但总体仍收敛。

#### 3.4.2 多维问题、Hessian 与条件数

对多维二次函数

$$
L(\theta)=\frac12\theta^\top H\theta,
$$

把参数分解到 Hessian $H$ 的特征向量方向。第 $i$ 个方向满足

$$
\theta_{t+1}^{(i)}
=(1-\eta\lambda_i)\theta_t^{(i)}.
$$

要让所有正曲率方向稳定，需要

$$
0<\eta<\frac{2}{\lambda_{\max}}.
$$

最大的曲率限制了可用学习率，最小的正曲率则决定慢方向的收敛速度。条件数

$$
\kappa=\frac{\lambda_{\max}}{\lambda_{\min}}
$$

很大时，损失等高线呈狭长椭圆：为避免陡峭方向发散，只能选择较小学习率，导致平缓方向进展缓慢。这正是 Momentum 能发挥作用的典型场景。

#### 3.4.3 实际训练中的学习率选择

学习率通常是最重要的超参数之一：

- **过小**：训练损失下降很慢，有限训练时间内可能表现为欠拟合；
- **合适**：损失总体快速下降，允许一定 mini-batch 波动；
- **过大**：损失大幅震荡、出现 `NaN`，甚至参数爆炸。

实际损失不是固定二次函数，$\lambda_{\max}$ 会随参数位置变化，所以一个训练全程固定的最佳学习率通常不存在。常见策略包括：

1. **Warmup**：开始时从较小学习率逐步升高，避免随机初始化阶段激活和梯度不稳定；
2. **Step/Exponential Decay**：按阶段或指数降低学习率；
3. **Cosine Decay**：按余弦曲线平滑下降；
4. **按验证集调节**：验证指标长期不改善时降低学习率。

较大学习率还会限制优化进入过于尖锐的区域。后文的 Hessian 平坦性和 edge of stability 会再次得到

$$
\lambda_{\max}\approx\frac{2}{\eta}.
$$

### 3.5 参数初始化

#### 3.5.1 初始化要解决什么问题

训练开始前必须为权重选择初值。初始化会影响：

- 前向传播时激活值是否逐层放大、缩小或进入饱和区；
- 反向传播时梯度是否爆炸或消失；
- 同层神经元能否打破对称、学习不同特征；
- 优化速度、最终解以及后文讨论的频率原则和参数凝聚。

不能把同层所有权重都初始化为相同值，尤其不能全部设为零。若两个神经元初值完全相同，它们接收相同梯度，之后仍保持相同，相当于只训练了一个神经元。偏置常可初始化为零，因为权重的随机性已经打破神经元之间的对称。

另一方面，权重也不能随意取得很大。大权重会使 Sigmoid/Tanh 进入饱和区，导数接近零；深层网络中的激活和梯度也可能快速爆炸。

#### 3.5.2 方差保持的基本思想

考虑一层的线性部分

$$
z_j=\sum_{i=1}^{m_{\rm in}}W_{ji}x_i.
$$

若输入和权重独立、均值为零，则近似有

$$
\operatorname{Var}(z_j)
=m_{\rm in}\operatorname{Var}(W_{ji})
\operatorname{Var}(x_i).
$$

若 $\operatorname{Var}(W)$ 与宽度无关，网络越宽，输出方差越大。为了让各层信号保持相近尺度，需要令权重方差与 $m_{\rm in}$ 成反比。网络越宽，单个权重的典型尺度因此越小。

记

$$
m_{\rm in}=\text{输入宽度},
\qquad
m_{\rm out}=\text{输出宽度}.
$$

不同初始化方案的区别，主要在于希望保持前向方差、反向方差，还是针对特定激活函数补偿方差损失。

#### 3.5.3 LeCun Initialization

LeCun initialization 令权重方差约为 $1/m_{\rm in}$。课件给出的正态形式为

$$
W_{ij}\sim\mathcal N\left(0,\frac1{m_{\rm in}}\right),
$$

对应标准差 $1/\sqrt{m_{\rm in}}$。等方差的均匀分布写为

$$
W_{ij}\sim\mathcal U\left(
-\sqrt{\frac3{m_{\rm in}}},
\sqrt{\frac3{m_{\rm in}}}
\right).
$$

它主要从保持前向传播方差出发，常与 SELU 等激活搭配；对近似线性的 Tanh 区域也能提供合理尺度。

#### 3.5.4 Xavier Initialization

Xavier 或 Glorot initialization 同时考虑输入和输出宽度，希望兼顾前向激活与反向梯度：

$$
W_{ij}\sim\mathcal N\left(
0,\frac{2}{m_{\rm in}+m_{\rm out}}
\right),
$$

或使用均匀分布

$$
W_{ij}\sim\mathcal U\left(
-\sqrt{\frac6{m_{\rm in}+m_{\rm out}}},
\sqrt{\frac6{m_{\rm in}+m_{\rm out}}}
\right).
$$

Xavier 假设激活在工作区间内近似线性、正负较对称，因此常用于 Tanh 或 Sigmoid。若初值仍使 Sigmoid 大量进入饱和区，梯度问题依旧会出现。

#### 3.5.5 Kaiming Initialization

ReLU 会把约一半负输入截断为零，使信号的二阶矩下降。Kaiming 或 He initialization 用额外因子 $2$ 进行补偿：

$$
W_{ij}\sim\mathcal N\left(0,\frac2{m_{\rm in}}\right),
$$

或

$$
W_{ij}\sim\mathcal U\left(
-\sqrt{\frac6{m_{\rm in}}},
\sqrt{\frac6{m_{\rm in}}}
\right).
$$

它通常适合 ReLU 及其变体。若更关注反向传播方差，也可选用基于 $m_{\rm out}$ 的 `fan_out` 模式；具体实现还会根据 Leaky ReLU 的负半轴斜率调整 gain。

#### 3.5.6 $\gamma$-Initialization

课件还给出一个用于显式研究初始化尺度的 $\gamma$-Initialization。正态形式为

$$
W_{ij}\sim\mathcal N\left(
0,\frac1{m_{\rm in}^{2\gamma}}
\right),
$$

均匀形式写为

$$
W_{ij}\sim\mathcal U\left(
-\frac1{m_{\rm in}^{2\gamma}},
\frac1{m_{\rm in}^{2\gamma}}
\right).
$$

$\gamma$ 控制初始化随网络宽度缩小的速度。$\gamma$ 越大，宽网络中的初值越小。该参数化便于研究“大初始化、中等初始化、小初始化”怎样改变训练动力学、函数平滑性与参数凝聚，不代表所有工程任务都应固定采用某个 $\gamma$。

| 初始化 | 正态分布方差 | 典型激活/用途 |
| --- | ---: | --- |
| LeCun | $1/m_{\rm in}$ | SELU，保持前向尺度 |
| Xavier | $2/(m_{\rm in}+m_{\rm out})$ | Tanh、Sigmoid |
| Kaiming | $2/m_{\rm in}$ | ReLU 及其变体 |
| $\gamma$-Initialization | $1/m_{\rm in}^{2\gamma}$ | 分析初始化尺度与宽度的关系 |

#### 3.5.7 实际使用时的判断

初始化方案要与激活函数、残差结构、Normalization 和网络深度共同考虑：

- Tanh/Sigmoid 网络常从 Xavier 开始；
- ReLU 网络常从 Kaiming 开始；
- SELU 的自归一化设定常配合 LeCun normal；
- 深残差网络和 Transformer 往往还会对 residual branch 或输出投影额外缩放。

课件强调“模型越大，初始化越小，初始化对结果影响很大”。这里的“越小”指单个参数的典型尺度随宽度缩小，而不是把整个网络输出机械地压到零。大语言模型通常结合 residual scaling、Normalization、优化器和精度格式专门设计初始化，不会只机械套用上述三种经典公式。

## 4. 深度学习的泛化谜团、理论观与发展历史

### 4.1 No Free Lunch 与泛化谜团

Wolpert and Macready（1997）的 No Free Lunch theorem 表明：若对所有可能的问题分布平均，所有学习算法的平均性能相同。任何算法在某类问题上的优势，都来自它对这类数据结构的偏好；总能构造一个使该方法泛化很差的数据集。因此，不能脱离数据分布谈“万能算法”。

传统直觉认为，模型复杂度越高，越容易出现大的 generalization gap。然而现代神经网络常满足“参数量远大于样本量”，仍可在自然数据上泛化良好；同一网络甚至能把 random labels 训练到 $100\%$ accuracy，却在随机标签的测试集上接近随机猜测。Zhang et al.（2016）的 CIFAR-10 实验把这一矛盾表现得很清楚。

当参数量大于样本数时，训练误差为零的解通常有很多。经验损失本身没有明确说明应选择哪个插值解，但训练过程常选到较平滑、泛化较好的解，这称为优化与参数化带来的**隐式偏好（implicit bias）**。本课程重点考察两类 simplicity bias：

- 函数空间中的低频偏好，即 Frequency Principle；
- 参数空间中的凝聚，即许多神经元等效为少数有效神经元。

1995 年的 Vapnik–Jackel bet 与 Leo Breiman 对 NIPS 论文的反思，已经提出了长期问题：高度参数化网络为什么不过拟合、有效参数量是什么、反向传播为什么不总是落入坏的局部极小值、何时应该停止训练。这些问题至今仍是深度学习理论的核心。

### 4.2 The Bitter Lesson、Scaling Law 与可解释性

Rich Sutton 的 The Bitter Lesson 总结了 AI 研究的一个反复经验：长期来看，能够利用不断增长计算量的通用学习方法，往往比大量手工知识更有效。深度学习的复兴正体现了数据、并行计算与可扩展算法的共同作用。

经验上，在其他瓶颈没有先出现的一定范围内，模型参数量、训练数据量、总计算量与测试损失之间会呈近似 power law。OpenAI（2020）等工作将这种规律概括为 Scaling Law。它未必给出机制解释，却能指导数据、参数和算力的配置。OpenAI（2017）观察到的 sentiment neuron 也说明，大规模无监督序列模型可能自发形成具有明确语义的内部单元。

可解释性很重要，但科学性不只等于“已经解释清楚”。Tycho Brahe 的观测、Johannes Kepler 的经验定律与 Isaac Newton 的理论展示了一条常见路径：先积累可重复的控制变量规律，再发展统一机制。何恺明在 2024 年也强调，系统成功很大程度上由实证推动和验证。

理论的价值之一是告诉我们哪些目标不可能或代价极高。热力学定律排除了永动机，化学理论排除了普通条件下把铜炼成金；同样，深度学习理论应帮助判断 DNN 擅长什么、什么困难，例如普通网络对高频成分学习较慢，以及“涌现是否必然要求超大模型和海量数据”。

好的理论至少应满足：问题重要、模型可分析、结论可实验验证；更进一步，它应提出新问题、指导算法设计并培养可持续研究方向。面对海量 AI 论文，不能只追求把所有文献读完。更有效的方法是先掌握必要背景，再围绕一个重要问题做控制变量实验，寻找多数人可能忽略或误判的现象。

### 4.3 神经网络发展简史

神经网络的发展不是一条持续上升的直线，而是经历了多次“提出模型、发现局限、研究降温、依靠新算法和新算力重新兴起”的循环。

#### 1943：McCulloch-Pitts 神经元

Warren McCulloch 与 Walter Pitts 在论文 *A Logical Calculus of the Ideas Immanent in Nervous Activity* 中提出了早期形式化神经元。它接收若干二值输入，计算加权和，再与阈值 $T$ 比较：

$$
y=\begin{cases}
1, & \boldsymbol{w}^{\mathrm T}\boldsymbol{x}+b\geq T,\\
0, & \boldsymbol{w}^{\mathrm T}\boldsymbol{x}+b<T.
\end{cases}
$$

通过选择不同的权重与阈值，一个神经元可以实现 AND、OR、NOT 等逻辑运算。例如，令 $x_1,x_2\in\{0,1\}$，使用 $x_1+x_2$ 作为输入和，阈值取 $2$ 得到 AND，阈值取 $1$ 得到 OR。它的重要意义不在于模型本身有多强，而在于第一次清楚地说明：简单的“加权、求和、激活”单元可以组合成执行复杂逻辑的网络。

这一模型中的权重主要由人工设定，还没有现代意义上的数据驱动训练过程。

#### 1956：Artificial Intelligence 成为独立研究方向

Marvin Minsky、John McCarthy、Nathaniel Rochester 与 Claude Shannon 等人组织了 Dartmouth Conference。会议提案提出一个影响深远的设想：学习以及智能的其他特征可以被精确描述，从而由机器进行模拟。

这次会议通常被视为 Artificial Intelligence 学科正式形成的标志。它讨论的范围远大于神经网络，但为“能否让机器从经验中学习”提供了统一的研究语境。此后的符号主义方法、搜索方法与神经网络方法都在这个框架下发展，并在不同年代交替成为主流。

#### 1957：Perceptron 开始从数据中学习权重

Frank Rosenblatt 提出 Perceptron。与 McCulloch-Pitts 模型依靠人工指定权重不同，Perceptron 可以根据训练样本自动调整权重和阈值。若样本 $(\boldsymbol{x},y)$ 被错误分类，一种典型更新方式为

$$
\boldsymbol{w}\leftarrow \boldsymbol{w}+\eta (y-\hat y)\boldsymbol{x},
$$

其中 $η$ 是学习率。这个更新规则把“神经元模型”推进为“可学习的神经元模型”。对于线性可分数据，Perceptron learning algorithm 能在有限次更新后找到一个分离超平面。

它的局限也很明确：单层 Perceptron 的决策边界只能是直线或超平面，因此只能处理线性可分问题。后面的 XOR 问题正是针对这一局限的典型反例。

#### 1958–1959：视觉皮层研究提供生物学启发

David Hubel 与 Torsten Wiesel 研究猫的视觉皮层，发现不同神经元会对视野中特定位置、方向和形状的刺激产生响应，由此形成 **receptive field** 的概念。这类实验说明，视觉系统并非直接把整幅图像交给一个统一处理器，而是先检测局部特征，再逐层形成更复杂的表示。

后来的 CNN 并不是对生物视觉系统的逐项复制，但局部感受野、层次化特征以及相邻神经元共享某些检测模式等思想，都能从这条研究脉络中找到启发。

#### 1960：ADALINE 与可微分的误差学习

Bernard Widrow 与 Marcian Hoff 提出 ADALINE，即 **Adaptive Linear Neuron**。它在输出经过阈值函数之前，直接根据线性输出与目标值之间的误差调整参数，常使用 LMS（Least Mean Squares）或 Widrow-Hoff rule：

$$
\boldsymbol{w}\leftarrow\boldsymbol{w}+\eta(y-\boldsymbol{w}^{\mathrm T}\boldsymbol{x})\boldsymbol{x}.
$$

Perceptron 主要关心最终分类是否正确，而 ADALINE 优化连续的平方误差，因此能够利用“预测离目标还有多远”的信息。这个思路与后来使用损失函数、梯度和误差反传来训练神经网络的范式更加接近。

#### 1969：XOR 暴露单层网络的根本限制

Marvin Minsky 与 Seymour Papert 在 *Perceptrons* 中系统分析了单层感知器的表示能力。XOR 的四个输入点为

$$
(0,0)\mapsto0,\quad(1,1)\mapsto0,\quad
(1,0)\mapsto1,\quad(0,1)\mapsto1.
$$

输出为 $1$ 的两个点位于对角线上，不存在一条直线能把它们与另外两个点分开，因此单层 Perceptron 无法表示 XOR。多层网络可以先构造多个线性边界，再组合成非线性决策区域，从表示能力上解决 XOR；当时真正困难的是缺少高效、通用且容易实现的多层网络训练方法。

这项批评与过高的早期期望共同导致研究投入下降。需要注意的是，XOR 证明的是**单层线性分类器**的局限，并不意味着所有神经网络都无法表示非线性函数。

#### 1970 与 1974：Backpropagation 的算法基础形成

Backpropagation 的核心是链式法则。网络前向计算得到损失后，从输出层向输入层逐层计算梯度，从而避免对每个参数分别重复计算完整网络。

- **1970**：Seppo Linnainmaa 给出了可在计算机上运行的 reverse-mode automatic differentiation。若一个标量损失依赖大量中间变量，反向模式可以复用局部导数，高效计算损失对所有参数的梯度。
- **1974**：Paul Werbos 在博士论文中提出把这种反向求导思想用于神经网络训练。不过，当时神经网络研究已进入低潮，这一思路没有立即得到广泛采用。

因此，BP 不是在 1980s 突然从零出现的。它先经历数学方法和计算实现的积累，之后才在更合适的研究环境中普及。

#### 1979：Fukushima 的多层视觉网络

Kunihiko Fukushima 提出受视觉皮层启发的多层结构。该方向后来发展为 Neocognitron，通过局部连接和层次化处理识别视觉模式，并对一定程度的位置变化具有鲁棒性。

它已经具有现代 CNN 的若干结构特征，但其训练方法与今天的端到端 BP 训练并不相同。它说明卷积网络的成功来自两条路线的汇合：一条是视觉系统启发的局部、分层结构，另一条是可以联合优化各层参数的反向传播。

#### 1982：BP 重新出现，Hopfield network 引入能量观点

由于前一轮 AI winter 的影响，Werbos 直到 1982 年才发表有关 BP 用于神经网络的工作。同年，John Hopfield 提出 Hopfield network。网络中的状态不断更新，并使能量函数逐渐下降，最终收敛到一个稳定状态。简化的能量函数可写为

$$
E(\boldsymbol{s})=-\frac{1}{2}\sum_{i\ne j}w_{ij}s_is_j-\sum_i b_i s_i.
$$

稳定状态可以保存为记忆，因此 Hopfield network 可用于 associative memory；寻找低能量状态的过程也使它与组合优化产生联系。这个工作把统计物理中的能量与神经网络计算联系起来，John Hopfield 也因相关基础性贡献获得 2024 Nobel Prize in Physics。

#### 1985：Boltzmann machine 发展随机生成模型

David Ackley、Geoffrey Hinton 与 Terrence Sejnowski 提出 Boltzmann machine。它把神经元状态视为随机变量，用能量函数定义不同状态出现的概率：

$$
p(\boldsymbol{s})=\frac{e^{-E(\boldsymbol{s})}}{Z},
$$

其中 $Z$ 是 partition function。与确定性的 Hopfield network 相比，随机采样使模型能够描述数据分布，也能在训练时探索不同状态。其主要问题是训练成本高，因为估计模型分布通常需要大量采样。后来的 Restricted Boltzmann Machine 和 Deep Belief Net 都建立在这条研究线上。

#### 1986：BP 成为训练多层感知器的实用方法

David Rumelhart、Geoffrey Hinton 与 Ronald Williams 在 1986 年的工作中系统展示了 Backpropagation 如何训练多层网络。对第 $l$ 层参数 $W^{(l)}$，BP 利用后一层的误差信号递推当前层误差：

$$
\delta^{(l)}=\left(W^{(l+1)}\right)^{\mathrm T}\delta^{(l+1)}\odot\sigma'\!\left(z^{(l)}\right),
$$

再得到 $\partial L/\partial W^{(l)}$。由于每条边的局部导数只需参与有限次计算，整体复杂度与一次前向传播处于同一量级。

BP 解决了“如何把最终输出误差分配给各层参数”的 credit assignment 问题，使多层 Perceptron 能够从数据中学习非线性表示。它并未消除局部最优、梯度消失或计算成本问题，但为此后深度学习的训练方式奠定了基础。

#### 1987：长期基础研究获得支持

Geoffrey Hinton 在 1987 年移居加拿大，其中一个重要背景是 CIFAR 鼓励长期基础研究，而不只追求短期应用。在神经网络论文经常因研究主题而被拒绝的时期，稳定的研究环境使 Hinton、Yann LeCun 等人能够继续推进表示学习、生成模型和 BP。

这一年份没有对应某个单独的新模型，却反映了科研生态的重要性：当一个方向暂时不占主流时，持续投入可能决定它能否等到数据、算力与算法条件成熟。

#### 1989：理论、视觉与机器人应用同时推进

1989 年出现了几个互相呼应的进展：

1. **Universal Approximation Theorem**：George Cybenko 等人的结果表明，具有单个隐藏层和合适非线性激活函数的网络，可以在紧集上以任意精度逼近连续函数。它回答了“网络能否表示复杂函数”，但没有保证需要多少神经元，也没有说明训练算法一定能找到相应参数。
2. **LeNet 与邮政编码识别**：Yann LeCun 等人将 BP 用于手写邮政编码识别。卷积结构利用局部连接和权重共享减少参数，美国支票与信件自动处理则提供了真实应用需求。这项工作展示了 CNN 在图像处理中的实际潜力。
3. **机器人控制**：Charles Anderson 使用神经网络学习控制倒立摆。CMU 的 ALVINN 将神经网络用于 autonomous land vehicle，根据道路图像预测车辆行驶方向。这些实验说明神经网络已经从静态分类扩展到控制与驾驶。

#### 1995 与 1990s 后期：SVM 兴起，神经网络再次降温

Support Vector Machine 通过最大化分类间隔获得决策边界，借助 kernel function 还能在隐式高维空间中处理非线性问题。它在中小规模数据集上表现稳定，并具有较完整的优化与泛化理论，因此在 1990s 成为主流机器学习方法之一。

与此同时，神经网络面临多重困难：

- 深层网络的误差信号在层间连乘，容易出现 vanishing gradient 或 exploding gradient，实践中常出现“深层网络反而不如浅层网络”的现象。
- 当时流行的 RNN 需要沿时间展开，长序列使梯度问题更加明显。
- 数据集规模有限，CPU 训练速度慢，大模型很难充分训练。
- BP 是非凸优化，缺少像 SVM 那样容易解释的全局优化与泛化理论。

这次低潮不是因为神经网络已经被证明无效，而是当时的计算条件和训练方法不足以稳定发挥深层模型的表示能力。

#### 2002：Contrastive Divergence 降低生成模型训练成本

Geoffrey Hinton 提出 Contrastive Divergence（CD），用于近似训练 Restricted Boltzmann Machine。最大似然梯度需要比较数据分布和模型分布下的统计量，而精确计算模型分布代价很高。CD 从真实数据出发，只运行少量 Gibbs sampling 步骤，用短链的重构样本近似模型期望。

CD 并不是精确的最大似然优化，但显著降低了训练 Boltzmann 类模型的成本，为随后逐层训练 Deep Belief Net 提供了可行工具。

#### 2006：Deep Belief Nets 与逐层预训练

Geoffrey Hinton、Simon Osindero 与 Yee-Whye Teh 提出 *A Fast Learning Algorithm for Deep Belief Nets*。训练过程先把相邻两层视为 Restricted Boltzmann Machine，逐层进行 unsupervised pretraining，再使用监督信号对整个网络 fine-tuning。

逐层预训练为深层网络提供了较好的参数起点，在随机初始化和激活函数尚不成熟的年代，能够缓解深层网络难以优化的问题。这项工作重新点燃了研究界对深层神经网络的兴趣，“Deep Learning”也逐渐成为一个明确的研究方向。Geoffrey Hinton 后来因 Boltzmann machine 等基础性工作获得 2024 Nobel Prize in Physics。

#### 2009：ImageNet 提供大规模视觉数据

Fei-Fei Li、Jia Deng 等人建设 ImageNet，利用 WordNet 的类别层次组织图像。规模约为 **1400 万张图像、超过 20,000 个类别**。ImageNet 的价值不只是“图片多”，还在于它提供了统一的数据、标签和评测基础，使不同视觉算法能够在相同任务上比较。

随后举办的 ImageNet Large Scale Visual Recognition Challenge（ILSVRC）聚焦其中一部分常用类别。大规模标注数据为高容量 CNN 提供了足够训练信号，也使 GPU 的并行计算优势得到充分发挥。

#### 2011–2012：GPU 深度网络进入语音识别系统

George Dahl、Abdel-rahman Mohamed 等人探索使用 GPU 高效训练深度网络。 Mohamed 与 Dahl 在 Microsoft Research 实习期间推动深度网络用于语音识别，Navdeep Jaitly 在 **2011** 年于 Google 实习期间把相关方法用于 Android speech recognition，替代了大量人工设计的旧流程。

到 **2012** 年，Microsoft、Google、IBM 与 Hinton 实验室的研究者共同发表 *Deep Neural Networks for Acoustic Modeling in Speech Recognition: The Shared Views of Four Research Groups*。这一阶段说明深度学习的复兴并非只由图像任务推动，语音识别也是最早证明深度网络工业价值的领域之一。

#### 2012：AlexNet 改变计算机视觉的发展方向

Alex Krizhevsky、Ilya Sutskever 与 Geoffrey Hinton 设计 AlexNet，并在 ImageNet 竞赛中领先第二名 **10.8 个百分点以上**。从单个组件看，AlexNet 使用的大多不是全新概念，而是把它们组合成了可以大规模训练的系统：

- CNN 利用局部连接和权重共享提取空间特征；
- GPU 显著加速卷积与矩阵运算；
- ReLU 比饱和型激活函数更利于深层网络优化；
- Dropout 抑制过拟合；
- SGD 在大规模数据上持续更新参数。

AlexNet 的意义在于证明：当数据、计算资源和可扩展算法同时到位时，较大的神经网络能够明显超过精心设计的传统视觉特征。此后，计算机视觉研究迅速转向以深度 CNN 为核心的方法。

#### 2016–2017：AlphaGo 展示深度学习与搜索的结合

**2016 年 3 月**，AlphaGo 在五局比赛中击败 Lee Sedol，成为首个在无让子条件下击败围棋九段职业选手的程序。它并非只依靠一个神经网络，而是结合 policy network、value network 与 Monte Carlo tree search：策略网络缩小候选落子范围，价值网络评估局面，搜索则在二者指导下规划未来步骤。

**2017 年**，AlphaGo 在 Future of Go Summit 中以三局全胜击败当时世界排名第一的 Ke Jie。同年的 AlphaGo Zero 不再依赖人类棋谱，只通过 self-play 学习，并以 $100:0$ 战胜早期竞技版本。它说明在规则明确、反馈可得的环境中，深度网络、强化学习与搜索可以从自我生成的数据中形成超越人类经验的策略。

#### 2018：深度学习奠基工作获得 Turing Award

Geoffrey Hinton、Yann LeCun 与 Yoshua Bengio 获得 2018 Turing Award，以表彰他们在深度神经网络概念与工程上的奠基性贡献。三人的代表路线各有侧重：Hinton 推进 BP、Boltzmann machine 和表示学习；LeCun 推进 CNN 与端到端视觉学习；Bengio 推进序列概率建模、representation learning 和生成模型等方向。

PPT 还把这次获奖放在更长的机器学习理论脉络中比较：Leslie Valiant 因包括 PAC learning 在内的计算理论贡献获得 **2010 Turing Award**，Judea Pearl 因概率推理和因果推理获得 **2011 Turing Award**。这说明现代 AI 同时依赖神经网络、学习理论以及概率和因果建模。

#### 2020–2021：AlphaFold2 推进蛋白质结构预测

DeepMind 在 **2020** 年展示 AlphaFold2，在蛋白质结构预测任务中达到接近实验方法的精度。模型根据氨基酸序列及其演化信息预测三维结构，把深度学习扩展到重要的科学问题。PPT 将其概括为“几乎实现原子级别的准确预测”。

相关成果在 **2021** 年发表于 *Nature*。这里要区分两个时间点：2020 对应 AlphaFold2 在 CASP14 中的突破性表现，2021 对应论文正式发表。它的影响不只是一项竞赛成绩，更在于显著提高了大规模获得蛋白质结构假设的效率。

#### 2020：GPT-3 展示大规模语言模型的 few-shot 能力

OpenAI 提出 GPT-3。它沿用 Transformer 的 autoregressive language modeling，通过预测下一个 token 学习语言规律，并通过扩大模型、数据和计算量显著提升通用语言能力。

GPT-3 的突出特点是 **few-shot learning**：不一定为每个任务单独更新参数，而是在输入上下文中给出少量示例或自然语言说明，让同一个模型完成翻译、问答和文本生成等任务。它推动研究者重新认识规模化预训练的作用，也引发了对 large language model 的广泛关注。

#### 2024：神经网络与统计物理的基础工作获得 Nobel Prize

John Hopfield 与 Geoffrey Hinton 获得 2024 Nobel Prize in Physics。PPT 将这一事件分别联系到 Hopfield network 和 Boltzmann machine：前者用能量下降描述联想记忆，后者用统计物理中的概率分布学习数据结构。

这个奖项并不表示神经网络只属于物理学，而是强调其若干关键思想与统计物理之间的深刻联系，例如能量函数、稳定状态和概率采样。这些早期模型也为后来更复杂的生成模型与表示学习提供了概念基础。

#### 三次浪潮背后的共同规律

回顾这条时间线，可以把神经网络的发展概括为三个阶段：早期阈值模型与 Perceptron 证明机器可以学习简单边界；BP、CNN 和生成模型建立多层网络的训练方法；大数据、GPU 与可扩展算法使深度网络进入视觉、语音、博弈、自然语言和科学计算。

Hinton 将早期 BP 效果不佳的原因概括为四点：标注数据集小了数千倍、计算机慢了数百万倍、权重初始化方式不合适、激活函数类型不合适。因此，现代深度学习的成功不能简单归因于某一个算法，它来自以下条件的共同成熟：

1. **数据**：ImageNet、互联网文本等大规模数据使高容量模型能够学习复杂规律。
2. **计算**：GPU 和并行计算让大规模矩阵运算变得可行。
3. **算法**：BP、ReLU、合理初始化、正则化和可扩展优化器改善了训练过程。
4. **结构**：CNN、RNN、Transformer 等架构把任务中的空间、时间或注意力结构引入模型。

这也解释了神经网络为何经历多次起伏：模型思想可能提前出现很多年，但只有当训练方法、数据规模和计算资源同时满足要求时，它才会转化为稳定的工程能力。

## 5. 高维数据与维数灾难

### 5.1 高维数据及其稀疏性

高维数据是特征数 $d$ 很大的向量

$$
x=(x_1,x_2,\ldots,x_d)^\top\in\mathbb R^d.
$$

图像的像素、文本的 one-hot/embedding、围棋棋盘位置都构成高维表示。例如 $256\times256$ 灰度图像是一个 $65,536$ 维向量。

在单位超立方体 $[0,1]^d$ 中，每个坐标分成 $k$ 段，共得到 $k^d$ 个小立方体。若希望每格至少一个样本，需要

$$
n\ge k^d.
$$

样本数随维数指数增长，所以有限样本在高维空间极端稀疏。直接在图像像素空间均匀随机采样，几乎只会得到雪花噪声；GAN 和 Diffusion Model 能产生自然图像，是因为它们学习了自然图像所处的特殊低维结构或高概率区域。

### 5.2 连续概率与体积比

连续随机变量单点概率为零，区间概率等于概率密度的积分。均匀分布下，概率就是目标区域与总体区域的体积比。例如：

- 在 $[0,10]$ 上均匀选点，落在 $[3,5]$ 的概率为 $2/10=0.2$；
- 在 $10\times10$ 房间内均匀撒点，落在中央 $2\times2$ 区域的概率为 $4/100=0.04$。

一维的“体积”是长度，二维是面积，三维是通常的体积。$d$ 维半径为 $r$ 的球体积为

$$
V_d(r)=\frac{\pi^{d/2}}{\Gamma(d/2+1)}r^d.
$$

标准正态分布的密度为

$$
p(x)=\frac1{\sigma\sqrt{2\pi}}
\exp\!\left[-\frac{(x-\mu)^2}{2\sigma^2}\right].
$$

标准化 $Z=(X-\mu)/\sigma$ 后可用标准正态 CDF $\Phi$ 计算概率。$\mu\pm\sigma$、$\mu\pm2\sigma$、$\mu\pm3\sigma$ 分别包含约 $68\%$、$95\%$、$99.7\%$ 的概率。例如男生身高 $X\sim N(175,6^2)$ 时，$169<X<181$ 的概率约为 $68\%$。

### 5.3 体积集中在表面

把 $d$ 维对象 $\Omega$ 的每一维缩小到 $(1-\varepsilon)$，体积比为

$$
\frac{\operatorname{Vol}((1-\varepsilon)\Omega)}
{\operatorname{Vol}(\Omega)}=(1-\varepsilon)^d.
$$

当 $d$ 很大时，这个比例迅速趋于零。于是几乎所有体积都位于厚度为 $\varepsilon$ 的表层。对 $1000$ 维单位球，半径 $0.99$ 的内球占比为 $0.99^{1000}<0.01\%$。

这会直接影响采样：在 $100$ 维单位球中均匀采样，再用两层 ReLU 网络学习 $y=\|x\|_2^2$，样本几乎都靠近边界。模型在边界误差可以很小，在内部却可能很差。若目标函数的重要信息位于低概率区域，应设计局部增强或重要性采样。

### 5.4 距离、角度与 Gaussian Annulus

这一节讨论的几个现象都来自同一个核心事实：高维空间中的概率质量不会像二维示意图那样均匀地分散在各个半径和方向上，而会集中在很窄的区域。为了看清距离为什么接近 $\sqrt2$、夹角为什么接近 $90^\circ$，需要先理解高维单位球的体积集中。

#### 5.4.1 高维单位球的体积集中在边界

记 $d$ 维单位球为

$$
B_d=\left\{x\in\mathbb R^d:\|x\|_2\leq1\right\}.
$$

若 $x$ 在 $B_d$ 中均匀采样，则半径 $R=\|x\|_2$ 的累积分布为

$$
\mathbb P(R\leq r)
=\frac{\operatorname{Vol}(rB_d)}{\operatorname{Vol}(B_d)}
=r^d,\qquad 0\leq r\leq1.
$$

因此，落在外层厚度为 $\varepsilon$ 的球壳中的概率为

$$
\mathbb P(R\geq1-\varepsilon)
=1-(1-\varepsilon)^d
\geq1-e^{-\varepsilon d}.
$$

当 $d$ 很大时，只要 $\varepsilon$ 稍大于 $1/d$，上式就已经非常接近 $1$。例如取 $\varepsilon=c/d$，外层球壳所占比例近似为 $1-e^{-c}$。所以高维单位球的大部分体积集中在距离边界约 $O(1/d)$ 的区域内，均匀采样点通常满足

$$
\|x\|_2\approx1.
$$

这不是说球的内部不存在，而是内部相对于外层球壳的体积太小，随机采样很难碰到。它也解释了为什么只用均匀样本训练模型时，模型在球面附近可能拟合得很好，在靠近原点的区域却缺少数据。

#### 5.4.2 高维随机点之间的距离集中在 $\sqrt2$

在 $B_d$ 中独立均匀采样 $x$ 和 $y$，其欧氏距离为

$$
\|x-y\|_2
=\left(\sum_{i=1}^d(x_i-y_i)^2\right)^{1/2}.
$$

把平方展开：

$$
\|x-y\|_2^2
=\|x\|_2^2+\|y\|_2^2-2x^\top y.
$$

在高维情况下，体积集中使 $\|x\|_2\approx\|y\|_2\approx1$；下一小节还会说明两个独立随机方向的内积 $x^\top y\approx0$。于是

$$
\|x-y\|_2^2\approx1+1-0=2,
\qquad
\|x-y\|_2\approx\sqrt2.
$$

这里的“集中”比“平均距离等于 $\sqrt2$”更强。它表示随着 $d$ 增大，距离分布在 $\sqrt2$ 周围越来越窄，任意抽取两个点都很可能得到相近的距离。对于球面上的点，这一结论最直接；对于单位球内的点，因为半径本身趋近 $1$，也得到同样的渐近现象。

**对距离算法的影响：** KNN、基于半径的聚类和部分异常检测方法依赖“近点明显比远点更近”。如果最近邻距离与最远邻距离的相对差异越来越小，距离排序会对噪声、尺度和无关特征非常敏感。高维任务中通常需要先做特征选择、标准化、降维，或换用更符合数据结构的相似度。

需要注意，距离集中描述的是各向同性随机数据的典型行为。真实数据可能位于低维 manifold 或若干 cluster 上，此时有意义的近邻结构仍然可能存在。

#### 5.4.3 高维随机向量的夹角集中在 $90^\circ$

向量 $x$ 与 $y$ 的夹角 $\theta$ 满足

$$
\cos\theta=\frac{x^\top y}{\|x\|_2\|y\|_2}.
$$

先固定一个单位向量 $v$，再从单位球面 $S^{d-1}$ 上均匀采样单位向量 $x$。由于旋转对称性，不妨令

$$
v=(1,0,\ldots,0)^\top,
\qquad x^\top v=x_1.
$$

球面上有 $\sum_{i=1}^d x_i^2=1$。各坐标地位相同，所以

$$
\mathbb E[x_i]=0,
\qquad
\mathbb E[x_i^2]=\frac1d.
$$

因此

$$
\mathbb E[x^\top v]=0,
\qquad
\operatorname{Var}(x^\top v)=\frac1d.
$$

随机投影 $x^\top v$ 的典型量级为 $1/\sqrt d$。当 $d\to\infty$ 时，它以很高概率接近零。若 $x,y$ 是两个独立随机单位向量，固定 $y$ 后可以把它看作上面的 $v$，所以

$$
x^\top y=O_p\!\left(\frac1{\sqrt d}\right),
\qquad
\cos\theta\approx0,
\qquad
\theta\approx90^\circ.
$$

更精细地说，对固定的 $0<t<1$，存在常数 $c>0$ 使

$$
\mathbb P\left(|x^\top y|\geq t\right)
\leq2e^{-cdt^2}.
$$

维数越大，明显偏离正交的概率下降得越快。这里的“近似正交”不表示内积严格等于零，也不表示可以在 $d$ 维空间中取得任意多个严格正交向量；它表示有限数量的随机方向通常具有很小的两两相关性。

#### 5.4.4 距离集中与角度集中的关系

对单位向量，距离和夹角并不是两个独立现象，因为

$$
\|x-y\|_2^2
=2-2\cos\theta
=4\sin^2\frac\theta2.
$$

当 $\theta\approx90^\circ$ 时，$\cos\theta\approx0$，所以距离自然接近 $\sqrt2$。反过来，如果单位向量间的距离接近 $\sqrt2$，其夹角也接近直角。因此可以把 PPT 中的两个实验理解为同一种 concentration of measure 的两种观察方式。

近似正交也解释了随机特征和随机投影为什么有用：随机选取的多个方向通常不会高度重合，可以从不同方向保留信息。不过，神经网络中的 embedding 最终通过训练形成，不能把“随机向量近似正交”直接理解为“训练后的词向量一定正交”。

#### 5.4.5 Gaussian Annulus Theorem 的现象

考虑标准 $d$ 维高斯向量

$$
X\sim N(0,I_d),
$$

其概率密度为

$$
p(x)=\frac1{(2\pi)^{d/2}}
\exp\left(-\frac{\|x\|_2^2}{2}\right).
$$

密度 $p(x)$ 在原点达到最大值，但这不表示随机样本集中在原点。高维高斯样本的距离满足

$$
\|X\|_2\approx\sqrt d,
$$

即大部分概率质量位于半径约为 $\sqrt d$ 的薄球壳，也就是 Gaussian annulus 中。

最直接的代数解释是

$$
\|X\|_2^2=\sum_{i=1}^d X_i^2\sim\chi_d^2.
$$

因此

$$
\mathbb E\|X\|_2^2=d,
\qquad
\operatorname{Var}(\|X\|_2^2)=2d.
$$

平方半径相对于均值的标准差为 $\sqrt{2/d}$，随维数增大而趋于零，所以 $\|X\|_2^2/d\to1$，进而 $\|X\|_2/\sqrt d\to1$。

#### 5.4.6 为什么密度最大点不是概率质量最大区域

密度描述“单位体积内的概率”，而概率质量还要乘以该位置附近的体积。半径为 $r$ 的薄球壳，其表面积与 $r^{d-1}$ 成正比，因此半径方向上的概率质量近似为

$$
F(r)\propto
\exp\left(-\frac{r^2}{2}\right)r^{d-1}.
$$

其中两项相互竞争：

- $e^{-r^2/2}$ 随 $r$ 增大而衰减；
- $r^{d-1}$ 表示球壳体积，随 $r$ 快速增长。

对数求导得到

$$
\log F(r)=-\frac{r^2}{2}+(d-1)\log r+C,
$$

$$
\frac{\mathrm d}{\mathrm dr}\log F(r)
=-r+\frac{d-1}{r}.
$$

令导数为零，可得概率质量的峰值位置

$$
r_*=\sqrt{d-1}\sim\sqrt d.
$$

这就是高斯环带背后的折中：原点附近虽然密度高，但可用体积太小；远处球壳体积大，但单点密度太低；两者乘积最终在 $\sqrt d$ 附近达到最大。

#### 5.4.7 环带究竟有多薄

Gaussian concentration 可以写成如下形式：存在常数 $c>0$，使任意 $t>0$ 满足

$$
\mathbb P\left(\left|\|X\|_2-\sqrt d\right|\geq t\right)
\leq 2e^{-ct^2}.
$$

因此，为包含一个固定的高概率比例，$N(0,I_d)$ 所需球壳的**绝对厚度**是 $O(1)$；与半径 $\sqrt d$ 相比，其**相对厚度**为 $O(1/\sqrt d)$，会趋于零。若改用归一化高斯 $Z=X/\sqrt d\sim N(0,I_d/d)$，则 $\|Z\|_2$ 集中在 $1$ 附近，绝对厚度为 $O(1/\sqrt d)$。

这个区分很重要。“薄环带”主要指相对于半径越来越薄，而不是说 $N(0,I_d)$ 的半径波动必然以绝对尺度趋于零。

### 5.5 Johnson–Lindenstrauss 引理与线性可分性

前面看到，随机高维方向通常近似正交。这个性质进一步带来一个实用结论：只要目标维数与数据点数量的对数有关，就能通过随机线性映射把高维数据压缩到较低维，并近似保持所有点对之间的距离。

#### 5.5.1 随机投影要解决什么问题

设数据集中有 $n$ 个点

$$
x_1,\ldots,x_n\in\mathbb R^d,
$$

其中 $d$ 很大。直接存储和计算距离需要较高的空间与时间成本。例如，词表大小为 $1{,}000{,}000$ 时，one-hot 表示位于百万维空间；每个向量虽然稀疏，但通用的矩阵运算和相似度计算仍然可能昂贵。

降维的理想目标是找到 $f:\mathbb R^d\to\mathbb R^k$，其中 $k\ll d$，同时让原空间中相近的点在新空间仍然相近。Johnson–Lindenstrauss lemma 说明，对有限点集，这个目标可以通过随机投影实现。

#### 5.5.2 Johnson–Lindenstrauss 引理

给定 $0<\varepsilon<1$，对于 $\mathbb R^d$ 中任意 $n$ 个点，存在映射

$$
f:\mathbb R^d\to\mathbb R^k,
\qquad
k=O\!\left(\frac{\log n}{\varepsilon^2}\right),
$$

使任意两个点 $u,v$ 都满足

$$
(1-\varepsilon)\|u-v\|_2^2
\leq
\|f(u)-f(v)\|_2^2
\leq
(1+\varepsilon)\|u-v\|_2^2.
$$

$\varepsilon$ 控制允许的相对误差。$\varepsilon$ 越小，距离保持得越精确，需要的目标维数 $k$ 越大。最重要的是，$k$ 只对数据点数 $n$ 呈对数增长，并且不显式依赖原始维数 $d$。

若还要求结论以至少 $1-\delta$ 的概率成立，常见写法为

$$
k=O\!\left(\frac{\log(n/\delta)}{\varepsilon^2}\right).
$$

#### 5.5.3 Gaussian random projection 的构造

$$
f(x)=Rx,
$$

其中

$$
R=\frac1{\sqrt k}
\begin{pmatrix}
r_{11}&r_{12}&\cdots&r_{1d}\\
r_{21}&r_{22}&\cdots&r_{2d}\\
\vdots&\vdots&\ddots&\vdots\\
r_{k1}&r_{k2}&\cdots&r_{kd}
\end{pmatrix},
\qquad
r_{ij}\overset{\mathrm{i.i.d.}}\sim N(0,1).
$$

等价地，也可以直接写 $R_{ij}\sim N(0,1/k)$。系数 $1/\sqrt k$ 不能省略，它保证投影后的长度在期望意义下不变。对任意固定向量 $z$，

$$
\mathbb E\|Rz\|_2^2=\|z\|_2^2.
$$

要保持点 $u,v$ 的距离，只需令 $z=u-v$，因为

$$
f(u)-f(v)=R(u-v)=Rz.
$$

#### 5.5.4 为什么随机映射能保持距离

固定非零向量 $z$。Gaussian matrix 的每一行与 $z$ 做内积后仍然服从 Gaussian distribution，并且

$$
\frac{\|Rz\|_2^2}{\|z\|_2^2}
\sim\frac1k\chi_k^2.
$$

卡方分布集中在其均值 $k$ 附近，所以存在常数 $c>0$，使

$$
\mathbb P\left(
\left|\|Rz\|_2^2-\|z\|_2^2\right|
>\varepsilon\|z\|_2^2
\right)
\leq2e^{-c\varepsilon^2k}.
$$

这先保证一个固定向量的长度得到保持。$n$ 个数据点共有

$$
\binom n2=\frac{n(n-1)}2
$$

个点对。对所有点对使用 union bound，只要让单个点对失败的概率远小于 $1/n^2$，就能让全部距离同时保持。令

$$
e^{-c\varepsilon^2k}\lesssim\frac1{n^2},
$$

取对数便得到

$$
k\gtrsim C\frac{\log n}{\varepsilon^2}.
$$

这就是 JL 引理中 $\log n$ 和 $1/\varepsilon^2$ 的来源。证明的关键不是寻找一个精心优化的投影矩阵，而是说明随机抽取的矩阵以很高概率已经足够好。

#### 5.5.5 直观理解与实际含义

随机投影可理解为用 $k$ 个近似互不相关的随机方向重新测量数据。单个方向会丢失大量信息，但多个方向共同提供统计稳定的长度估计。由于高维随机方向近似正交，各行不容易重复测量完全相同的信息。

JL 引理保证的是**有限点集的两两欧氏距离**，并不保证所有性质都保持：

- 它不保证每个原始坐标都能恢复，因此通常不是可逆压缩。
- 它不自动保留类别标签、概率密度或非欧氏结构。
- 它给出的是存在性和高概率保证，实际需要根据误差容忍度选择 $k$。
- Dense Gaussian matrix 的乘法成本可能较高，工程中还会使用 Rademacher matrix、sparse random projection 或 fast JL transform。

若数据已经中心化且向量范数也近似保持，则由 polarization identity

$$
2u^\top v
=\|u\|_2^2+\|v\|_2^2-\|u-v\|_2^2
$$

可知内积和夹角也会得到近似保持。因此随机投影可用于近似最近邻、聚类、检索和降维预处理。

百万维 one-hot 向量降到低维 embedding 是一个直观例子，但需要区分两件事：JL 使用固定随机矩阵并提供几何保证；神经网络的 embedding matrix 通常经过训练，会主动改变几何结构以适应任务。JL 更适合解释“为什么低维表示有可能保留大量点的距离信息”，而不是完整解释 learned embedding 的语义来源。

#### 5.5.6 与高维线性可分性的关系

随机投影讨论的是从高维降到较低维，同时尽量保留几何关系；kernel method 和神经网络常做相反方向的事情，把数据变换到更容易线性分类的表示空间。

Kernel method 使用非线性映射 $\phi(x)$ 把原始数据嵌入高维 feature space，再由 SVM 等线性分类器寻找超平面。神经网络则连续执行

$$
h^{(l)}=\sigma\!\left(W^{(l)}h^{(l-1)}+b^{(l)}\right),
$$

希望倒数第二层表示 $h^{(L-1)}$ 已经接近线性可分，最后一层只需进行线性分类。

“维数更高”会提供更多可用方向，但高维并不自动保证泛化。若表示中包含大量噪声或样本太少，分类器仍会过拟合。有效方法需要一边获得更好的可分性，一边通过正则化、结构假设和足够数据控制模型复杂度。

### 5.6 维数灾难的三个例子

Richard Bellman 在 20 世纪 50 年代用 curse of dimensionality 描述动态规划中状态维数增加带来的指数复杂度。一般而言，为保持固定精度，数据量或计算量随 $d$ 指数增长。

1. **数值积分**：每维取 $n$ 个网格点，$d$ 维张量网格需要 $n^d$ 个节点。
2. **PDE 数值解**：$d$ 维有限差分每维剖分 $n$ 格，未知量有 $N=n^d$ 个。
3. **函数逼近**：对光滑度为 $s$ 的一般 $d$ 维函数，经典逼近误差常呈 $n^{-s/d}$ 量级。维数越高，为维持误差所需样本越接近指数增长（DeVore, 1998）。

### 5.7 Monte Carlo 与神经网络如何缓解维数灾难

对 $I=\int_{[0,1]^d}f(x)\,\mathrm dx$，均匀采样 $X_i$，Monte Carlo 估计

$$
I_n=\frac1n\sum_{i=1}^{n}f(X_i)
$$

是无偏的 (也即 $\mathbb{E}[I_n] = I$ )，且

$$
\operatorname{Var}(I_n)=\frac{\operatorname{Var}(f(X))}{n},
\qquad |I_n-I|=O_p(n^{-1/2}).
$$

其收敛阶不显式依赖维数。对

$$
f(x)=\sum_{i=1}^{d}x_i^2,\qquad I=\frac d3,
$$

Monte Carlo 误差保持 $O(n^{-1/2})$，而逐维中点网格法的误差约为 $O(n^{-2/d})$，随 $d$ 增大迅速恶化。

两层网络

$$
f_m(x)=\frac1m\sum_{j=1}^{m}a_j\sigma(w_j^\top x+b_j)
$$

可以理解为在函数空间中对特征的 Monte Carlo 离散。对 Barron space 中的函数，宽度 $m$ 的两层网络可达到 $O(m^{-1/2})$ 的逼近阶，且 path norm 有界；这一阶不依赖输入维数（E, Ma & Wu, 2019）。这并不表示神经网络能解决所有高维函数，而是说明对具有特定结构和有限 Barron norm 的函数，它可以避免一般光滑函数类的最坏维数灾难。

## 6. 全连接网络与残差网络

### 6.1 深层网络的退化与梯度困难

网络加深理论上至少可以让新增层学习恒等映射，从而不比浅层网络差；实际 plain network 却会出现 degradation problem。He et al.（2016）在 CIFAR-10 上发现，56 层普通网络的训练误差和测试误差都可能高于 20 层网络；这不是单纯的过拟合，因为连训练误差也变差。

深层网络还会遭遇梯度消失或爆炸。以每层只有一个神经元的 sigmoid 网络为例，输入稍离开原点时 $\sigma'(z)$ 接近零。反向传播需要连乘很多层导数，早期层参数对损失的影响便几乎消失。

### 6.2 Residual Connection

残差块写为

$$
X^{(k+1)}=F_k(X^{(k)})+X^{(k)}.
$$

网络不再要求 $F_k$ 直接学习目标映射，而只需学习相对恒等映射的残差。若残差无用，令 $F_k\approx0$ 即可。ResNet-18/34 的实验表明，在不依赖额外参数来解释的条件下，34 层 residual network 克服了相同深度 plain network 的退化。

反向传播为

$$
\frac{\partial L}{\partial X^{(k)}}
=\frac{\partial L}{\partial X^{(k+1)}}
\left(I+\frac{\partial F_k}{\partial X^{(k)}}\right).
$$

没有 skip connection 时只剩 Jacobian 乘积项。残差结构提供了恒等项 $I$，梯度可以沿直接路径传播，因此缓解深层网络中小 Jacobian 连乘造成的梯度消失。

## 7. Convolutional Neural Network

### 7.1 图像数据的局部关联、不变性与幂律

图像相邻像素通常有相似颜色或灰度，距离增大时关联减弱。常见衰减模型包括指数衰减 $e^{-kx}$ 与幂律衰减 $x^{-k}$。幂律可看作不同衰减尺度指数项的叠加，例如

$$
\int_0^\infty e^{-\alpha t}\,\mathrm d\alpha=\frac1t,
$$

因此包含很慢的长程成分。用两个像素灰度 $\phi_1,\phi_2$ 的 mutual information

$$
I(\phi_1;\phi_2)=\iint p_2(\phi_1,\phi_2)
\log_2\frac{p_2(\phi_1,\phi_2)}{p_1(\phi_1)p_1(\phi_2)}
\,\mathrm d\phi_1\mathrm d\phi_2
$$

可以测量关联。$I>0$ 表示相关，独立时 $I=0$。自然图像以局部关联为主，但长程关联不可忽略。

图像识别还希望对小幅平移具有稳定性：同一物体移动几像素不应改变类别。卷积的参数共享和平移等变性正适合这种结构。

Hubel and Wiesel（1959）的视觉皮层研究提供了生物学启发。V1 简单细胞对特定位置、方向和边缘敏感，复杂细胞整合多个简单细胞的响应。CNN 可粗略类比为：卷积层提取局部模式，池化逐步整合，全连接层组合高级特征。

### 7.2 卷积、Padding、Stride 与通道

#### 7.2.1 为什么图像适合使用卷积

计算机中的灰度图像可以看作二维矩阵，每个元素表示一个像素的亮度；RGB 图像则由 Red、Green、Blue 三个矩阵叠在一起。图像具有明显的局部结构，例如一条边缘通常由相邻像素的明暗变化形成。卷积用一个较小的窗口反复扫描整张图像，正适合寻找这种局部模式。

二维连续卷积定义为

$$
(f*g)(x,y)=\iint f(x-u,y-v)g(u,v)\,\mathrm du\mathrm dv,
$$

离散图像上的形式为

$$
F[x,y]=\sum_{u,v}f[x-u,y-v]g[u,v].
$$

严格的数学卷积需要翻转 kernel。PyTorch、TensorFlow 等深度学习框架通常实现不翻转 kernel 的 cross-correlation：

$$
Y[i,j]=\sum_{u=0}^{K_h-1}\sum_{v=0}^{K_w-1}
K[u,v]X[i+u,j+v].
$$

只要 kernel 参数通过训练学习，两种约定具有相同的表达能力，因此深度学习中通常也把 cross-correlation 称为“卷积”。

#### 7.2.2 一个具体的图像卷积例子

假设下面的 $5\times5$ 矩阵是一张灰度图。$0$ 表示黑色，$1$ 表示白色。图像左侧为黑色，右侧为白色，中间存在一条竖直边缘：

$$
X=
\begin{bmatrix}
0&0&0&1&1\\
0&0&0&1&1\\
0&0&0&1&1\\
0&0&0&1&1\\
0&0&0&1&1
\end{bmatrix}.
$$

选择一个 $3\times3$ 的竖直边缘检测 kernel：

$$
K=
\begin{bmatrix}
-1&0&1\\
-1&0&1\\
-1&0&1
\end{bmatrix}.
$$

现在令 stride 为 $1$、padding 为 $0$。首先把 $K$ 盖在图像左上角，对应的局部区域为

$$
P_{1,1}=
\begin{bmatrix}
0&0&0\\
0&0&0\\
0&0&0
\end{bmatrix}.
$$

将两个矩阵对应位置相乘后求和：

$$
Y_{1,1}=(-1)\times0+0\times0+1\times0+\cdots+1\times0=0.
$$

kernel 向右移动一格后，覆盖的区域为

$$
P_{1,2}=
\begin{bmatrix}
0&0&1\\
0&0&1\\
0&0&1
\end{bmatrix}.
$$

此时

$$
\begin{aligned}
Y_{1,2}
&=\sum_{u,v}P_{1,2}[u,v]K[u,v]\\
&=(-1\times0+0\times0+1\times1)\times3\\
&=3.
\end{aligned}
$$

较大的正数说明这个区域与“左暗右亮”的竖直边缘模式相匹配。继续滑动 kernel，可以得到完整输出：

$$
Y=
\begin{bmatrix}
0&3&3\\
0&3&3\\
0&3&3
\end{bmatrix}.
$$

原图大小为 $5\times5$，kernel 大小为 $3\times3$，没有 padding，所以输出变成 $3\times3$。同一个 kernel 在所有位置重复使用，这就是 **parameter sharing**。不论边缘出现在图像左侧还是右侧，都能使用同一组参数检测。

上面的 kernel 是人为指定的，只用于解释卷积。实际 CNN 通常随机初始化 kernel，然后通过 Backpropagation 学习参数。训练后，不同 kernel 可能分别响应竖直边缘、水平边缘、颜色过渡或纹理。

#### 7.2.3 Padding 和 Stride

- **Zero padding** 在边界补零。`same padding` 可让输出空间尺寸保持不变。
- **Stride $(s_x,s_y)$** 表示横纵方向每次移动的步数。更大 stride 会下采样。

若输入大小为 $H\times W$，kernel 为 $K_h\times K_w$，padding 为 $P_h,P_w$，stride 为 $S_h,S_w$，输出大小为

$$
H_{\rm out}=\left\lfloor\frac{H+2P_h-K_h}{S_h}\right\rfloor+1,
$$

$$
W_{\rm out}=\left\lfloor\frac{W+2P_w-K_w}{S_w}\right\rfloor+1.
$$

在上面的例子中，$H=W=5$、$K_h=K_w=3$、$P=0$、$S=1$，因此输出为

$$
H_{\rm out}=W_{\rm out}
=\frac{5-3}{1}+1=3.
$$

如果设置 padding $P=1$，输出会重新变成 $5\times5$。如果 stride 改为 $2$，kernel 每次跨过两个像素，输出尺寸会更小，同时计算量也会下降。

#### 7.2.4 多通道卷积

RGB 图像具有三个输入通道。一个卷积核也必须在通道方向上具有相同深度。例如，处理 RGB 图像的 $3\times3$ kernel 实际形状为 $3\times3\times3$。它分别与三个颜色通道的局部区域相乘，然后把结果求和并加上 bias：

$$
Y_{i,j,o}
=b_o+
\sum_{c=1}^{C_{\rm in}}
\sum_{u=1}^{K_h}
\sum_{v=1}^{K_w}
K_{u,v,c,o}X_{i+u,j+v,c}.
$$

其中 $o$ 表示输出通道。每个输出通道对应一组不同的 kernel 参数，因此可以检测不同特征。若使用 $C_{\rm out}=64$ 组 kernel，就会生成 64 张 feature map。

从 $C_{\rm in}$ 到 $C_{\rm out}$ 的卷积层参数量为

$$
C_{\rm out}(K_hK_wC_{\rm in}+1),
$$

其中 $1$ 对应每个输出通道的 bias。参数量与图片宽高无关，这正是局部连接和参数共享带来的优势。

### 7.3 Pooling、感受野与完整流程

#### 7.3.1 CNN 通常包含的四个模块

一个标准 CNN 通常由以下四个模块构成：

1. **Convolutional Layer**：使用多个可学习 kernel 扫描局部区域，提取边缘、纹理和形状等特征。卷积后通常紧接 ReLU 等 activation function，因此激活有时会单独画出，但仍可视为卷积模块的一部分。
2. **Pooling Layer**：对局部特征进行汇总并降低空间分辨率。它通常不改变通道数，也通常没有可学习参数。
3. **Fully-Connected Layer**：把前面提取到的局部特征组合成全局表示，用于判断整张图像属于什么类别。
4. **Output Layer**：根据任务给出最终结果。多分类常使用 Softmax，二分类或多标签任务常使用 Sigmoid，回归任务则可以直接输出连续数值。

输入图像是网络处理的数据入口，不属于 PPT 列出的四个计算模块。实际模型还可能加入 Batch Normalization、Residual Connection、Dropout 等结构；现代 CNN 也可能用 Global Average Pooling 代替传统 fully-connected layer。

#### 7.3.2 什么是 Pooling

Pooling 是对 feature map 的局部区域进行固定规则的汇总。卷积回答“这个位置附近检测到了什么特征”，Pooling 则回答“这一小片区域中最显著或平均的特征响应是多少”。

假设卷积层输出下面的 $4\times4$ feature map：

$$
X=
\begin{bmatrix}
1&3&2&0\\
4&6&1&2\\
2&1&5&3\\
0&2&4&7
\end{bmatrix}.
$$

使用 $2\times2$ pooling window，stride 设为 $2$。四个窗口互不重叠，因此输出大小从 $4\times4$ 变为 $2\times2$。

#### 7.3.3 Max Pooling

Max Pooling 取每个局部区域中的最大值。左上角窗口为

$$
\begin{bmatrix}
1&3\\
4&6
\end{bmatrix},
$$

其输出是 $6$。对四个窗口执行相同操作：

$$
\operatorname{MaxPool}(X)=
\begin{bmatrix}
\max(1,3,4,6)&\max(2,0,1,2)\\
\max(2,1,0,2)&\max(5,3,4,7)
\end{bmatrix}
=
\begin{bmatrix}
6&2\\
2&7
\end{bmatrix}.
$$

如果某个 feature map 负责检测边缘，较大的数值表示该位置与目标边缘高度匹配。Max Pooling 保留局部区域内最强的响应，因此只要特征在窗口内小幅移动，输出就可能保持不变。

#### 7.3.4 Average Pooling

Average Pooling 取每个区域的平均值。左上角输出为

$$
\frac{1+3+4+6}{4}=3.5.
$$

完整结果为

$$
\operatorname{AvgPool}(X)=
\begin{bmatrix}
3.5&1.25\\
1.25&4.75
\end{bmatrix}.
$$

Max Pooling 强调最显著的局部特征；Average Pooling 保留区域的整体平均响应，结果更加平滑，但可能削弱强烈而稀疏的特征。

#### 7.3.5 Pooling 的作用与代价

Pooling 主要有以下作用：

1. **降低空间尺寸**：$28\times28$ feature map 经过 $2\times2$、stride 为 $2$ 的 pooling 后变为 $14\times14$，后续计算量明显减少。
2. **扩大有效感受野**：高层的一个数值汇总了更大的输入区域，使网络逐步从局部边缘过渡到物体部件和整体结构。
3. **提高小幅平移稳定性**：只要最强响应仍位于同一窗口，Max Pooling 的结果就不会改变。
4. **压缩局部冗余**：相邻像素或特征通常高度相关，Pooling 可以保留概括信息。

Pooling 也会丢失特征的精确位置和细节。在 image segmentation、keypoint detection 等需要精确空间位置的任务中，过度 pooling 会造成困难。现代 CNN 经常使用 stride 大于 $1$ 的 convolution 完成可学习的降采样，也可能完全取消传统 pooling。

#### 7.3.6 Pooling 的反向传播

Max Pooling 没有需要训练的参数，但梯度仍需传回前一层。前向传播时需要记录每个窗口中最大值的位置。反向传播时，上游梯度只传给这个最大值位置，其余位置得到零梯度。

例如

$$
\begin{bmatrix}
1&3\\
4&6
\end{bmatrix}
\xrightarrow{\text{Max Pooling}}6,
$$

若上游传回梯度 $g$，则输入梯度为

$$
\begin{bmatrix}
0&0\\
0&g
\end{bmatrix}.
$$

Average Pooling 会把梯度平均分配给窗口内的每个位置。对于 $2\times2$ 窗口，上游梯度 $g$ 会变成

$$
\begin{bmatrix}
g/4&g/4\\
g/4&g/4
\end{bmatrix}.
$$

#### 7.3.7 Pooling 与感受野

Receptive field 表示某个神经元能够“看到”的原图范围。假设先使用 $3\times3$、stride 为 $1$ 的卷积，再使用 $2\times2$、stride 为 $2$ 的 pooling。一个卷积输出能看到 $3\times3$ 个输入像素，而相邻两个卷积输出的感受野彼此错开一个像素，因此一个 pooling 输出最终覆盖 $4\times4$ 个原始像素。

感受野可以递推计算。令第 $l$ 层 kernel size 为 $k_l$、stride 为 $s_l$，$r_l$ 表示感受野大小，$j_l$ 表示相邻输出在原图上的间隔，则

$$
j_l=j_{l-1}s_l,
\qquad
r_l=r_{l-1}+(k_l-1)j_{l-1}.
$$

随着卷积和 pooling 层叠，高层神经元可以整合越来越大范围的信息。

#### 7.3.8 Global Average Pooling

Global Average Pooling（GAP）对每个通道的整张 feature map 求平均。若输入形状为 $H\times W\times C$，GAP 输出形状为 $1\times1\times C$：

$$
y_c=\frac1{HW}\sum_{i=1}^H\sum_{j=1}^W X_{i,j,c}.
$$

每个通道最终只保留一个数字。GAP 可以大幅减少参数量，并且不要求输入 feature map 具有固定的 $H,W$。许多现代分类网络使用 GAP 汇总空间信息，再接一个较小的线性输出层。

#### 7.3.9 一个完整 CNN 的数据流

典型 CNN 流程如下：

1. 输入 RGB 三通道图像；
2. 卷积产生多个特征通道；
3. ReLU 逐元素激活；
4. pooling 降采样但通常不改变通道数；
5. 重复卷积、激活和池化；
6. flatten 成向量并通过 fully-connected network；
7. Softmax 输出类别概率。

以 CIFAR-10 的 $32\times32$ RGB 图像为例，一个简单网络的形状变化可以是：

|阶段|输出形状|含义|
|---|---:|---|
|输入|$32\times32\times3$|RGB 图像|
|$3\times3$ Conv，16 个输出通道，same padding|$32\times32\times16$|提取 16 类局部特征|
|ReLU|$32\times32\times16$|加入非线性|
|$2\times2$ Max Pooling|$16\times16\times16$|空间尺寸减半，通道数不变|
|$3\times3$ Conv，32 个输出通道|$16\times16\times32$|组合成更丰富的特征|
|$2\times2$ Max Pooling|$8\times8\times32$|再次降采样|
|Flatten|$2048$|把三维 feature map 展开为向量|
|Fully-Connected|$10$|为十个类别产生 logits|
|Softmax|$10$|转换为类别概率|

AlexNet 的第一层卷积核会学习不同方向、颜色与边缘特征，与 V1 receptive fields 的方向选择性有相似之处。

#### 7.3.10 平移等变性与近似平移不变性

卷积对平移是等变的。令平移 $T_{a,b}I(x,y)=I(x-a,y-b)$，则变量代换可得

$$
K*(T_{a,b}I)=T_{a,b}(K*I).
$$

也就是说，输入平移会使特征图同步平移；再结合 pooling 或全局聚合，分类器可以获得近似平移不变性。这使同一物体出现在不同位置时仍能共享同一组检测器。

## 8. 自然语言处理、RNN 与 LSTM

### 8.1 语言任务与数据准备

Natural Language Processing（NLP）希望计算机理解、生成和处理人类语言，应用包括机器翻译、语音识别、文本分类、信息检索与智能客服。语言具有以下结构：

- 字符、词根、单词、短语、句子、段落构成复杂层次；
- 有主语、谓语、宾语等语法约束与递归结构；
- 本质上是离散符号序列；
- 存在长程依赖与上下文相关性，例如“上海的交通大学”和“上海的交通”中相同词片段语义不同。

全连接网络输入长度固定且没有历史状态，普通 CNN 也难以直接保存任意长历史，因此出现 RNN、LSTM，后来发展到 Transformer。

模型性能会随高质量数据增多而提升，但数据质量同样关键。重复数据会降低有效多样性和上下文处理能力；偏见、有毒内容和隐私信息会被模型学习甚至复现。常见清洗包括：

- 用启发式规则过滤，如论坛点赞数、长度或格式；
- 训练质量分类器，例如以 Wikipedia 为正样本、低质量网页为负样本；
- 用分类器或关键字过滤有毒、敏感和个人信息；
- 在句子、文档和数据集级别去重，可用精确匹配或近似相似度。

2023 年曾有人发现，反复要求 ChatGPT 重复某个单词可能诱发训练隐私泄露；该漏洞后来修复。这说明记忆、重复与隐私风险不是抽象问题。

### 8.2 Tokenization、BPE 与特殊 token

Tokenization 把字符聚合成语义或语法单元。基于规则的方法按空格和标点切分；统计方法依据频率学习子词边界。常见算法包括 BPE、WordPiece 与 Unigram。

BPE 从基本字符词表开始，每轮合并语料中频率最高的相邻 token。对 `loop`、`pool`、`loot`、`tool`、`loots`，若频数分别为 $15,10,10,5,8$，`oo` 共出现 $48$ 次，先合并 `o+o→oo`；随后 `l+oo` 出现 $33$ 次，再合并为 `loo`，直到达到预设词表大小。

常见特殊 token：

- `CLS`：句子开始或分类汇总位置；
- `SEP`：序列结束或多句分隔；
- `MASK`：Masked Language Model 中被遮蔽的词；
- `PAD`：把不同长度序列补齐；
- `UNK`：词表外 token。

### 8.3 One-hot、Embedding 与 Next Token Prediction

词表大小为 $N$ 时，one-hot 向量 $e_i\in\mathbb R^N$ 对所有词保持对称，任意两词先验距离相同。可训练 embedding 为

$$
x_i=W_{\rm emb}e_i,\qquad W_{\rm emb}\in\mathbb R^{d\times N}.
$$

它把超高维稀疏表示投影到低维稠密空间，并从上下文学习“study 与 learn 比 study 与 play 更近”等关系。Johnson–Lindenstrauss 的随机投影视角说明，$d$ 可以远小于 $N$ 而仍近似保留有限词集合的几何关系。

Next Token Prediction 根据前文预测下一个 token。它不依赖昂贵人工标签，几乎任何文本都能形成训练对；要持续准确预测，模型必须学习语法、语义与上下文。对序列 $x_1,\ldots,x_T$，训练目标为

$$
L=-\sum_{t=1}^{T-1}\log p_\theta(x_{t+1}\mid x_{\le t}).
$$

推理时把新预测 token 接回输入，循环生成到 `SEP`。输出既可取最大概率 token，也可从分布采样；采样使答案具有多样性。

### 8.4 Vanilla RNN 与 Encoder–Decoder

#### 8.4.1 什么是循环神经网络

循环神经网络（Recurrent Neural Network，**RNN**）是一类专门处理序列数据的神经网络。序列中的第 $t$ 个元素不仅由当前输入 $x_t$ 决定，还受到前一时刻状态 $h_{t-1}$ 的影响。这个状态像一份不断更新的摘要，把已经读过的内容传到后续时间步。

普通全连接网络通常把每个输入独立处理，没有显式记忆；RNN 在网络中加入从上一时刻到下一时刻的循环连接，因此能够处理文本、语音、时间序列等具有先后顺序的数据。

例如依次读入“我”“喜欢”“苹果”时：

- 读到“我”后，$h_1$ 记录当前出现了一个说话主体；
- 读到“喜欢”后，$h_2$ 同时包含“我”和“喜欢”的上下文；
- 读到“苹果”后，$h_3$ 表示完整短语的信息。

这里的“记住”不是把原句原封不动存起来，而是把历史压缩成一个有限维向量。

#### 8.4.2 Vanilla RNN 的数学形式

PPT 中使用 $S_t$ 表示状态，这里统一记为 $h_t$。一个基本 RNN 可以写为

$$
h_0=0,
$$

$$
h_t=\phi(Ux_t+Wh_{t-1}+b_h),
\qquad t=1,2,\ldots,T,
$$

$$
o_t=Vh_t+b_o,
\qquad
p_t=\operatorname{softmax}(o_t).
$$

各符号的含义如下：

- $x_t\in\mathbb R^{d_x}$：第 $t$ 个输入，例如当前 token 的 embedding；
- $h_t\in\mathbb R^{d_h}$：当前 hidden state，也称状态记忆；
- $U\in\mathbb R^{d_h\times d_x}$：input-to-hidden 权重；
- $W\in\mathbb R^{d_h\times d_h}$：hidden-to-hidden 的 recurrent weight；
- $V\in\mathbb R^{d_y\times d_h}$：hidden-to-output 权重；
- $\phi$：通常取 Tanh，也可以使用其他 activation function；
- $p_t$：当前时刻对输出类别或下一个 token 的概率分布。

RNN 最重要的特征是**时间参数共享**：每个时间步都使用同一组 $U,W,V,b_h,b_o$。因此，序列长度从 10 变成 100 时，模型参数量并不会增加；同一套状态更新规则会在所有位置重复执行。

#### 8.4.3 沿时间展开如何理解

循环结构可以沿时间展开为一条很深的网络：

$$
h_1=\phi(Ux_1+Wh_0+b_h),
$$

$$
h_2=\phi(Ux_2+Wh_1+b_h),
$$

$$
\cdots
$$

$$
h_T=\phi(Ux_T+Wh_{T-1}+b_h).
$$

图上虽然画出了多个 RNN cell，但它们不是互不相关的层，而是同一个 cell 在不同时间步的复制。展开后的深度等于序列长度，这也是 RNN 能整合历史信息、却又容易出现长程梯度问题的原因。

如果任务是 Next Token Prediction，则 $h_t$ 产生的 $p_t$ 用于预测 $x_{t+1}$。训练时可以一次读入完整序列并并行计算损失，但 $h_t$ 仍必须依赖 $h_{t-1}$，所以 Vanilla RNN 的时间步计算无法完全并行。

#### 8.4.4 RNN 的常见输入输出形式

根据任务需要，RNN 可以在不同时间步读取输入或产生输出：

|形式|结构|典型任务|
|---|---|---|
|Many-to-one|读入整个序列，只使用最终状态|影评情感分类、序列分类|
|One-to-many|一个输入启动一个输出序列|图像描述、音乐生成|
|Many-to-many，同步|每个输入位置都有对应输出|词性标注、序列标注|
|Many-to-many，异步|输入和输出长度可以不同|机器翻译、对话生成|

以 IMDB 情感分类为例，RNN 依次读取影评中的 token，最后用 $h_T$ 预测 positive 或 negative。对于语言模型，每个 $h_t$ 都需要输出下一个 token 的概率。

#### 8.4.5 Encoder–Decoder RNN

机器翻译的输入和输出长度通常不同，例如把“我喜欢吃苹果”翻译为 “I like eating apples”。Encoder–Decoder 使用两个循环网络：

1. **Encoder** 依次读取源语言 $x_1,\ldots,x_n$，得到最终状态 $h_n$；
2. 把 $h_n$ 作为源句的 context vector，并用它初始化 Decoder；
3. **Decoder** 从开始符号出发，每一步根据前一输出和当前状态预测下一个目标 token，直到生成结束符号。

PPT 中的形式可写为

$$
h_t=f_1(Ux_t+W_1h_{t-1}+b_1),
\qquad t=1,\ldots,n,
$$

$$
s_0=h_n,
$$

$$
s_t=f_2(W_2s_{t-1}+U_2e(y_{t-1})+b_2),
$$

$$
p(y_t\mid y_{<t},x_{1:n})
=\operatorname{softmax}(Vs_t+b_o).
$$

其中 $e(y_{t-1})$ 是上一目标 token 的 embedding。训练时常使用 **teacher forcing**，即把真实的 $y_{t-1}$ 输入 Decoder；推理时没有真实答案，只能把模型刚刚生成的 token 接回下一步。

早期 Encoder–Decoder 把整句压缩进单个固定维度向量 $h_n$。句子较长时，这个向量容易成为 information bottleneck。8.7 中的 Attention 允许 Decoder 在每一步重新查看不同的输入位置，从而缓解这一问题。

#### 8.4.6 BPTT 如何训练 RNN

随时间反向传播（Backpropagation Through Time，**BPTT**）就是对展开后的 RNN 执行 Backpropagation。设总损失为

$$
L=\sum_{t=1}^{T}\ell_t,
$$

同一个 recurrent weight $W$ 在所有时间步重复使用，所以它接收来自所有时间步的梯度：

$$
\frac{\partial L}{\partial W}
=\sum_{t=1}^{T}\frac{\partial\ell_t}{\partial W}.
$$

某个较晚损失 $\ell_t$ 对较早状态 $h_k$ 的影响需要连续经过多个状态转移：

$$
\frac{\partial\ell_t}{\partial h_k}
=
\frac{\partial\ell_t}{\partial h_t}
\prod_{j=k+1}^{t}
\frac{\partial h_j}{\partial h_{j-1}}.
$$

对于

$$
h_j=\phi(Ux_j+Wh_{j-1}+b_h),
$$

单步 Jacobian 为

$$
\frac{\partial h_j}{\partial h_{j-1}}
=\operatorname{diag}\!\left(\phi'(a_j)\right)W.
$$

因此，长距离梯度本质上包含许多个 $W$ 和 activation derivative 的连乘。

#### 8.4.7 梯度消失、梯度爆炸与处理方法

如果这些 Jacobian 的范数长期小于 $1$，连乘会指数衰减，较晚损失几乎无法影响很早的状态，这就是 **vanishing gradient**。模型可能记得相邻单词，却学不会跨越几十个 token 的依赖。

如果 Jacobian 的范数长期大于 $1$，连乘会迅速增长，产生 **exploding gradient**。训练会出现损失剧烈波动、参数变成极大数值，甚至出现 `NaN`。

常见缓解方法包括：

- **Gradient clipping**：当梯度范数超过阈值时按比例缩小，主要处理梯度爆炸；
- **Truncated BPTT**：只反传固定长度的时间窗口，减少内存与计算量，但会截断更长依赖；
- 合理初始化 recurrent matrix，例如使用 orthogonal initialization；
- 使用 LSTM 或 GRU 的 gated state update，改善长程梯度传播。

这些方法不能保证模型拥有无限记忆。RNN 的历史仍压缩在有限状态中，并且时间步之间存在顺序依赖。

### 8.5 LSTM

#### 8.5.1 为什么需要 LSTM

Long Short-Term Memory（**LSTM**）是一种带门控机制的循环神经网络。它针对 Vanilla RNN 难以学习长期依赖的问题，引入独立的 cell state $C_t$，让信息沿时间方向通过加法路径传递。

可以把人类记忆作一个不严格的类比：车牌号可能只需短期保留，自己的专业则需要长期保存。当新信息到来时，模型需要决定旧信息保留多少、新信息写入多少，以及当前输出多少。

PPT 给出三条设计原则：

1. 信息在使用前先做可学习的 linear transformation；
2. 控制比例的 gate 使用 Sigmoid，使输出位于 $[0,1]$；
3. 候选内容通常使用 Tanh，将数值限制在 $[-1,1]$。

#### 8.5.2 LSTM 的两个状态

LSTM 同时维护两个状态：

- $h_t$：hidden state，提供当前时刻的对外输出，也参与下一步 gate 计算；
- $C_t$：cell state，承担较稳定的长期记忆通道。

为简化表示，令

$$
q_t=[h_{t-1};x_t],
$$

即把上一 hidden state 和当前输入拼接起来。随后所有 gate 都以 $q_t$ 为输入。

#### 8.5.3 Forget Gate

遗忘门决定旧 cell state $C_{t-1}$ 保留多少：

$$
f_t=\sigma(W_fq_t+b_f).
$$

$f_t$ 的每个元素都位于 $[0,1]$。接近 $1$ 表示对应记忆基本保留，接近 $0$ 表示大部分遗忘。它不是给整个状态一个单独的开关，而是对不同维度分别控制。

#### 8.5.4 Input Gate 与候选记忆

Input gate 决定写入比例，候选记忆 $\widetilde C_t$ 表示当前输入可能带来的新内容：

$$
i_t=\sigma(W_iq_t+b_i),
\qquad
\widetilde C_t=\tanh(W_cq_t+b_c).
$$

旧记忆与新内容组合为

$$
C_t=f_t\odot C_{t-1}+i_t\odot\widetilde C_t.
$$

$\odot$ 表示 element-wise multiplication。这个更新由加法构成：第一项保留旧记忆，第二项写入候选记忆。

用一个标量例子理解：若 $C_{t-1}=0.8$、$f_t=0.9$、$\widetilde C_t=0.5$、$i_t=0.2$，则

$$
C_t=0.9\times0.8+0.2\times0.5=0.82.
$$

模型保留了大部分旧记忆，只写入少量新信息。

#### 8.5.5 Output Gate

Output gate 决定当前 cell state 有多少形成对外可见的 hidden state：

$$
o_t=\sigma(W_oq_t+b_o),
\qquad
h_t=o_t\odot\tanh(C_t).
$$

cell state 先经过 Tanh 限制范围，再由 $o_t$ 逐维控制输出比例。即使某段信息暂时没有出现在 $h_t$ 中，它仍可能保留在 $C_t$ 中供后续时间步使用。

“Forget Gate”“Input Gate”“Output Gate”和“候选知识”等名称是帮助理解的形象类比，并不构成某个神经元只执行一种固定语义功能的严格证明。

#### 8.5.6 LSTM 为什么能缓解梯度消失

忽略 gate 对早期状态的间接依赖，沿 cell state 主通道有

$$
\frac{\partial C_t}{\partial C_{t-1}}=f_t.
$$

从时刻 $k$ 到 $T$ 的直接梯度近似包含

$$
\frac{\partial C_T}{\partial C_k}
\approx\prod_{t=k+1}^{T}f_t.
$$

普通 RNN 在每一步反复乘以 recurrent weight 和 Tanh derivative；LSTM 可以在任务需要时学习 $f_t\approx1$，使记忆通道接近 identity mapping，梯度因而更容易跨越多个时间步。

Ilya Sutskever 把 LSTM 形容为“旋转 $90^\circ$ 的 ResNet”：ResNet 让信息沿网络深度通过 residual connection 相加，LSTM 让 $C_t$ 沿时间方向通过 gate 和加法更新。

#### 8.5.7 LSTM 的能力边界

LSTM 是对 RNN 的改进，并不意味着长期依赖问题被彻底解决：

- 如果许多 $f_t$ 持续小于 $1$，梯度仍然会逐渐衰减；
- gate 和状态增多，使参数量与计算量高于 Vanilla RNN；
- 时间步仍需按顺序计算，难以像 Transformer 那样大规模并行；
- 对极长上下文，固定维度状态仍可能形成信息瓶颈。

因此 LSTM 在语音、时间序列和中等长度文本上长期具有实用价值，但大规模语言模型后来更多使用 Attention 和 Transformer。

### 8.6 RNN 能学到什么

#### 8.6.1 Character-level RNN 的训练任务

Character-level RNN 不把单词作为基本单位，而是逐字符预测下一个字符。假设训练文本片段为 `hello`，可以构造

$$
\text{input}=(h,e,l,l),
\qquad
\text{target}=(e,l,l,o).
$$

每个时间步根据当前字符和 hidden state 预测下一个字符，损失为所有位置的 cross-entropy 之和：

$$
L=-\sum_{t=1}^{T-1}\log p_\theta(c_{t+1}\mid c_{\leq t}).
$$

生成时先给出一个起始字符，再从预测分布选择或采样下一个字符，把新字符重新输入 RNN，循环产生完整文本。

这种任务没有显式标注“单词”“句子”或“代码语法”。如果模型想降低 next-character prediction loss，就必须自己发现空格、标点、拼写、缩进和局部语法等规律。

#### 8.6.2 Shakespeare 实验中的学习过程

PPT 展示了用 Shakespeare 作品训练 RNN 的过程：

1. 训练初期，模型只知道字符的大致频率，输出几乎是随机字母与空格；
2. 继续训练后，输出开始出现类似单词的片段，标点和空格也更合理；
3. 训练进一步进行，模型能够产生角色名、换行、对话格式和类似戏剧的句子。

这说明 RNN 会从纯字符序列中逐层形成结构。但是“看起来像 Shakespeare”不等于文本具有可靠情节或长期逻辑。模型往往先学会局部格式与短程统计规律，再逐步学习更长范围的依赖。

#### 8.6.3 LaTeX 与 C code 生成

相同方法也能训练 LaTeX 或 C code：

- 对 LaTeX，模型会学到命令以反斜杠开头、花括号配对、数学环境和章节格式；
- 对 C code，模型会学到缩进、括号、分号、注释以及 `if` 等常见语法模式。

生成结果可能在局部看起来非常逼真，却不一定能够编译，也不保证数学表达式或程序逻辑正确。序列模型善于复制表面统计结构，语义正确性需要更强的长期约束、执行反馈或外部验证。

#### 8.6.4 可解释的 recurrent unit

Karpathy、Johnson 与 Fei-Fei 对 character-level RNN 的单元激活进行可视化，PPT 展示了若干具有明显模式的 unit：

- **Quote detection cell**：进入引号后保持较强激活，离开引号后状态改变；
- **Line length tracking cell**：随着字符在一行中的位置向后移动，激活逐渐减弱，像是在追踪行长度；
- **If statement cell**：进入 C code 的嵌套 `if` 结构后激活模式发生系统变化；
- **Quote/comment cell**：在代码注释或引号内部保持较强激活。

这些状态不是研究者预先规定的，而是在 next-character prediction 训练中自发形成的。RNN 为了预测下一个字符，需要知道“当前是否在引号中”“当前嵌套了几层代码块”等上下文，所以某些 hidden dimensions 会承担类似有限状态机的功能。

#### 8.6.5 如何正确理解可解释性

单个 unit 出现清晰模式，并不表示整个网络采用简单的“一种概念对应一个神经元”编码。更常见的情况是：

- 一个概念分散编码在多个神经元中；
- 一个神经元同时参与多个相关功能；
- 激活模式会随随机初始化、数据和训练过程改变；
- 可视化通常选择最容易解释的单元，不能代表所有单元。

因此，这些实验能够证明 RNN 的状态中确实形成了语法和位置相关信息，但不能仅凭相关性断言某个神经元就是唯一的“引号神经元”或“if 神经元”。

### 8.7 图像描述与 LSTM Attention

#### 8.7.1 CNN 与 RNN 如何结合

Image Captioning 要把一张固定大小的图像转换为长度不定的自然语言序列，可以看作 one-to-many 任务。经典方案把 CNN 与循环神经网络结合：

1. CNN 提取图像特征；
2. 线性层把图像特征映射为 RNN/LSTM 的初始状态，或者把它作为第一个输入；
3. Decoder 从 `START` token 开始预测第一个词；
4. 把刚生成的词重新输入，继续预测后续词；
5. 生成 `END` token 后停止。

例如模型先根据图像得到视觉向量，再依次生成 `straw`、`hat`、`END`。在每一步，预测既依赖图像信息，也依赖此前已经生成的词。

#### 8.7.2 图像描述模型如何训练

假设真实描述为 $y_1,\ldots,y_T$，训练目标仍是 Next Token Prediction：

$$
L=-\sum_{t=1}^{T}
\log p_\theta(y_t\mid y_{<t},I),
$$

其中 $I$ 表示输入图像。训练时通常使用真实的前一个词作为输入，即 teacher forcing；推理时只能使用模型自己的预测，因此早期预测错误可能继续影响后面的句子，这称为 exposure bias。

模型在 PPT 示例中能够生成：

- `A cat is sitting on a tree branch`；
- `A dog is running in the grass with a frisbee`；
- `Two giraffes standing in a grassy field`；
- `A man riding a dirt bike on a dirt track`。

这些结果说明 CNN 提取的视觉概念可以被 RNN 组织成语法完整的句子。

#### 8.7.3 失败示例说明了什么

PPT 也展示了几类典型错误：

- 图中只有穿毛皮衣的女人，模型却生成 `A woman is holding a cat in her hand`，属于 object hallucination；
- 图中人物拿着手机，模型误写成 `computer mouse`；
- 图中人物正在倒立，模型生成 `holding a surfboard`；
- 图中是蜘蛛网，模型却说 `A bird is perched on a tree branch`；
- 棒球运动员正在扑接球，模型描述为 `throwing a ball`，混淆了动作。

这类错误来自视觉识别与语言先验的共同作用。语言模型知道“树枝上常有鸟”“沙滩常有冲浪板”，当视觉证据不够明确时，常见搭配可能压过真实图像内容，产生流畅但错误的描述。

#### 8.7.4 固定图像向量的限制

最简单的 CNN–RNN 把整张图像压缩成一个全局向量。Decoder 生成每个词时只能使用同一份压缩表示，这会带来两个问题：

1. 图像中的多个物体和位置全部挤进一个向量，细节容易丢失；
2. 生成 `bird`、`water` 或 `tree` 时，模型不能显式选择对应区域。

Attention 允许 Decoder 在每个时间步根据当前语言状态重新选择图像区域。

#### 8.7.5 Annotation Vectors

Attention 模型不把 CNN 最后一层 feature map 立即压成单个向量，而是保留空间位置。把 CNN 输出写成 annotation vectors：

$$
v=\{v_1,\ldots,v_L\},\qquad v_i\in\mathbb R^D,
$$

例如 feature map 大小为 $14\times14\times512$，则

$$
L=14\times14=196,
\qquad
D=512.
$$

每个 $v_i$ 表示图像中一个空间区域的视觉特征。模型生成不同词时，可以给这些区域分配不同权重。

#### 8.7.6 Attention 权重与 Context Vector

第 $t$ 步使用上一 Decoder 状态 $h_{t-1}$ 与每个区域 $v_i$ 计算匹配得分：

$$
e_{ti}=f_{\rm att}(v_i,h_{t-1}),
$$

$$
\alpha_{ti}
=\frac{\exp(e_{ti})}{\sum_{j=1}^{L}\exp(e_{tj})}.
$$

因此

$$
\alpha_{ti}\geq0,
\qquad
\sum_{i=1}^{L}\alpha_{ti}=1.
$$

$\alpha_{ti}$ 可以理解为生成第 $t$ 个词时对第 $i$ 个图像区域的注意比例。随后计算 context vector：

$$
z_t=\sum_{i=1}^{L}\alpha_{ti}v_i
$$

并将它与前一词 embedding 一起输入 LSTM，例如

$$
h_t=\operatorname{LSTM}\!\left(
[e(y_{t-1});z_t],h_{t-1}
\right).
$$

这样，生成 `bird` 时 $z_t$ 可以主要包含鸟所在区域，生成 `water` 时则可以转向水面区域。

#### 8.7.7 Soft Attention 与 Hard Attention

- **Soft Attention** 使用所有区域的加权平均 $z_t$，整个过程可微，可以直接使用 Backpropagation 训练；
- **Hard Attention** 在每一步选择一个离散位置，解释更接近“看向某处”，但离散采样通常不能直接求导，需要 REINFORCE、sampling approximation 等方法。

PPT 中的热力图会显示生成不同词时的关注区域发生变化。这种可视化提供了有用线索，但 attention weight 不一定等同于完整的因果解释。模型仍可能同时利用全局视觉特征、hidden state 和语言先验。

#### 8.7.8 从 RNN Attention 到 Transformer

这里的 Attention 仍以 RNN/LSTM 为 Decoder，主要解决每一步如何选择图像区域。Transformer 则进一步把 Attention 变成序列建模的核心运算，减少循环依赖并提高并行能力。两者共享“根据当前 query 对多个信息来源动态加权”的基本思想，但计算结构不同。

## 9. Transformer

### 9.1 为什么从 RNN 转向 Transformer

Vaswani et al. 在 2017 年提出 Transformer。此前机器翻译主要使用 RNN/LSTM Encoder–Decoder；循环结构按时间顺序计算，难以充分并行，长程梯度问题仍然存在。Transformer 的主要优势是：

- self-attention 直接建立任意 token 间的全局联系；
- multi-head attention 可以同时提取不同关系；
- position encoding 补充顺序；
- 序列位置可并行计算，训练效率高。

最初 Transformer 为翻译使用 encoder–decoder。后来 decoder-only 结构因适配 Next Token Prediction、任务形式灵活，成为许多大语言模型的基础。

### 9.2 从“补成绩”理解 Query、Key、Value

假设学生 D 的化学成绩缺失，要根据其他学生估计。可先把 D 已知科目的成绩线性映射为 Query，把 A、B、C 的已知特征映射为 Key，用点积衡量相似度；再把他们的化学成绩映射为 Value，按相似度加权。

示例

$$
Q_DK_A^\top=0.89,\qquad
Q_DK_B^\top=-0.09,\qquad
Q_DK_C^\top=0.56.
$$

Softmax 后

$$
\operatorname{Att}=[0.48,0.18,0.34].
$$

若 $V=[0.5,0.1,0.5]$，则 D 的化学成绩估计为

$$
0.48\times0.5+0.18\times0.1+0.34\times0.5=0.43.
$$

这体现了 attention 的两步：用 Query–Key 计算相关性，再对 Value 加权求和。线性映射负责从同一输入中提取“用于匹配的特征”和“真正要传递的信息”；这些投影不靠人工指定，而由训练学习。

### 9.3 Embedding 与位置编码

设序列长度为 $n$，模型维度为 $d_m$。Token embedding 得到

$$
X_{\rm emb}\in\mathbb R^{n\times d_m}.
$$

Attention 本身对输入排列没有顺序感，因此加入

$$
X^{(0)}=X_{\rm emb}+X_{\rm pos}.
$$

$X_{\rm pos}$ 可以学习，也可以人为构造。

原始正余弦位置编码为

$$
PE(k,2i)=\sin(\omega_i k),\qquad
PE(k,2i+1)=\cos(\omega_i k),
$$

$$
\omega_i=10000^{-2i/d_m}.
$$

两个位置向量的点积只依赖相对偏移 $\Delta k$：

$$
PE(k)^\top PE(k+\Delta k)
=\sum_i\cos(\omega_i\Delta k),
$$

所以绝对编码中隐含相对距离信息。

**外推（extrapolation）** 指模型处理超过训练上下文长度的能力。可学习绝对位置在未训练的位置通常外推较差；相对位置编码具有位移不变性，往往更容易外推。T5 类方法可在 attention score 中加入可学习相对偏置 $r_{i-j}$：

$$
A_{ij}=(x_iW_Q)(x_jW_K)^\top+r_{i-j}.
$$

相对位置能让长文本继续生成流畅内容，但不保证模型真正理解超长文本；要增强长上下文能力，仍通常需要更长文本训练。

Rotary Position Embedding（RoPE）用旋转矩阵把绝对位置注入 Query/Key，同时让内积显式依赖相对位置：

$$
R_{\theta,i}R_{\theta,j}^\top=R_{\theta,i-j}.
$$

频率基通常取

$$
\theta_i=b^{-2(i-1)/H},\qquad b=10000,quad i=1,\ldots,H/2.
$$

### 9.4 Scaled Dot-Product Attention 与 Causal Mask

第 $\ell$ 层线性投影：

$$
Q^{(\ell)}=X^{(\ell)}W_Q^{(\ell)},\quad
K^{(\ell)}=X^{(\ell)}W_K^{(\ell)},\quad
V^{(\ell)}=X^{(\ell)}W_V^{(\ell)}.
$$

其中 $W_Q,W_K\in\mathbb R^{d_m\times d_k}$，$W_V\in\mathbb R^{d_m\times d_v}$。Scaled dot-product attention 为

$$
\operatorname{Attention}(Q,K,V)
=\operatorname{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}}+M\right)V.
$$

$1/\sqrt{d_k}$ 防止维数大时点积方差过大、Softmax 过度饱和。Decoder-only 模型使用 causal mask：当 $j>i$ 时令 $M_{ij}=-\infty$，Softmax 后对应权重为零，使第 $i$ 个 token 只能关注自己及以前位置，不能偷看未来答案。

Attention 不要求 Query 数 $n_Q$ 与 Key/Value 数 $n_K$ 相等：

$$
Q\in\mathbb R^{n_Q\times d_k},\quad
K\in\mathbb R^{n_K\times d_k},\quad
V\in\mathbb R^{n_K\times d_v}.
$$

一个 Query 可以访问任意多 Key–Value 对，这为 cross-attention、检索和多模态扩展提供了基础。

### 9.5 Multi-Head、Residual、LayerNorm 与 FNN

Multi-head attention 让不同头学习不同关系，例如语法依赖、指代、实体属性或局部邻接：

$$
\operatorname{MHA}(X)=\operatorname{Concat}(head_1,\ldots,head_h)W_O.
$$

输出经 $W_O$ 投影回 $d_m$ 维，加入 residual connection，并使用 normalization。LayerNorm 对每个 token 的特征维做归一化：

$$
\operatorname{LN}(x)=\gamma\odot
\frac{x-\mu(x)}{\sqrt{\sigma^2(x)+\varepsilon}}+\beta,
$$

其中 $\gamma,\beta$ 可训练。

三种常见布局是

$$
\operatorname{PostNorm}(x)=\operatorname{Norm}(x+\operatorname{Sublayer}(x)),
$$

$$
\operatorname{PreNorm}(x)=x+\operatorname{Sublayer}(\operatorname{Norm}(x)),
$$

$$
\operatorname{SandwichNorm}(x)
=x+\operatorname{Norm}(\operatorname{Sublayer}(\operatorname{Norm}(x))).
$$

Pre-Norm 通常更利于深层梯度传播；Sandwich-Norm 在残差写回前再归一化，以抑制输出数值放大。

每个 token 还独立通过相同的 position-wise FNN：

$$
\operatorname{FNN}(x)=W_2\phi(W_1x+b_1)+b_2.
$$

Attention 在 token 间传递信息，FNN 在单个 token 的通道维上做非线性变换。完整 block 重复 $N$ 次。

### 9.6 输出与解码

最后把每个位置的 $d_m$ 维状态投影到词表大小 $d$：

$$
z_t=h_tW_{\rm vocab}+b,qquad
p_t=\operatorname{softmax}(z_t).
$$

Greedy decoding 每步取最大概率 token；sampling decoding 按分布抽样，可结合 temperature、top-$k$ 或 top-$p$ 调节随机性。训练时每个位置都预测下一 token，推理时则把生成结果逐步接回上下文。

### 9.7 从语言到视觉与多模态

Vision Transformer（ViT，2020）把图像切成 $16\times16$ patch，把每个 patch 当作一个“词”，线性嵌入后交给 Transformer。在预训练数据足够时，ViT 可超过传统 CNN。更一般地，文本 token、图像 patch、音频片段、蛋白质序列或其他结构都可变为 token，因此 Transformer 成为跨领域的通用序列架构。

## 10. 函数空间中的 Frequency Principle

### 10.1 过参数化网络选择了哪一个解

参数量大于样本量时，许多函数都能做到训练误差为零。有的插值函数在样本间剧烈振荡，有的则平滑延伸。普通初始化和训练设置下，神经网络通常先学轮廓，再学细节，并倾向于选择较平滑的插值；很大的初始化可能破坏这种偏好。

为了定量描述“轮廓与细节”，将函数作 Fourier 展开。Euler 公式

$$
e^{ix}=\cos x+i\sin x
$$

说明函数可用不同频率和振幅的三角成分表示。低频决定平滑轮廓，高频描述快速振荡、锐利边缘与细节。只保留图像低频会得到模糊轮廓，只保留高频则主要剩边缘和纹理。

**Frequency Principle（F-Principle）或 spectral bias**：神经网络在训练中通常按从低频到高频的顺序拟合目标函数。

### 10.2 控制变量实验

一维实验用相同振幅的

$$
f(x)=\sin x+\sin5x
$$

或

$$
f(x)=\sin x+\sin3x+\sin5x
$$

排除“振幅更大所以先学”的解释。观察各主频相对误差，可见低频率先收敛。二维图像坐标拟合中，以像素坐标为输入、灰度为输出，并仅用未遮挡部分训练 DNN，网络同样先恢复整体轮廓，再补充细节。

### 10.3 泛化与 Early Stopping

频率原则为平滑泛化提供一种解释：虽然训练点允许许多插值，常规训练先选择低频、变化较平缓的解。若观测来自 $\sin x$ 并含噪声，主要真实结构在低频，随机噪声往往含更多高频。训练初期模型先学信号，继续训练才逐渐拟合噪声，因此测试误差可能先降后升。

Early stopping 在验证误差开始上升时停止训练，相当于在模型彻底拟合高频噪声前截断，能够提高泛化。

### 10.4 加速高频学习：Multi-Scale DNN 与 Fourier Features

输入缩放可把高频函数转换到网络更容易学习的频段。若

$$
f(x)=g(\alpha x),\qquad \alpha>1,
$$

则给网络输入乘以适当尺度，等价于调整所见频率。不同空间位置和不同频率可能需要不同缩放，单一尺度不够。

Multi-Scale DNN 同时提供多个尺度通道：

$$
f(x)\approx\sum_{r=1}^{M}f_{\theta_r}(\alpha_r x).
$$

可以把不同尺度用于第一隐藏层，也可以建立多个输入缩放不同的子网络，让梯度下降自动选择更合适的通道。实验中，普通 DNN 难以恢复 PDE 解的高频结构，Mscale-DNN 更接近真解。

Fourier feature network 显式使用

$$
\gamma(x)=\bigl[\sin(2\pi b_1^\top x),\cos(2\pi b_1^\top x),\ldots\bigr]
$$

把输入映射到多个频率尺度。Neural Radiance Fields（NeRF）正是通过 positional/Fourier encoding 加速高频几何和纹理的学习。

### 10.5 图像频率与响应频率

图像频率指相邻像素强度变化的快慢；响应频率则描述输入–输出映射 $f(x)$ 对输入扰动的敏感程度。分类器若因某个像素的微小扰动 $\delta$ 就从第一类跳到第二类，便在该方向具有高响应频率。这与对抗扰动密切相关，但不能简单等同于图像中是否有锐利边缘。

### 10.6 一维理论解释

考虑 tanh 两层网络

$$
h(x)=\sum_{j=1}^{m}a_j\tanh(w_jx+b_j).
$$

tanh 光滑，其 Fourier amplitude 随频率指数衰减。课件中的近似形式为

$$
\widehat h(k)\approx
\sum_j a_j\exp\!\left(\frac{ib_jk}{w_j}\right)
\exp\!\left(-\frac{\pi |k|}{2|w_j|}\right).
$$

令频率 $k$ 处误差 $A(k)=\widehat h(k)-\widehat f(k)$、损失

$$
L(k)=\frac12|A(k)|^2.
$$

由 Parseval theorem，时域 MSE 等于频域误差积分。梯度含有

$$
\frac{\partial L(k)}{\partial\theta}
\approx A(k)\exp\!\left(-\frac{\pi|k|}{2|w_j|}\right)G(\theta,k).
$$

小初始化使 $|w_j|$ 较小，高频梯度被指数压制，低频率主导早期训练。由此可见，激活函数的光滑性会通过 gradient-based training 转化为频率偏好。

若使用频谱偏高的非单调激活，不同频率可同时快速拟合，训练集仍能完美插值，但测试区间可能出现剧烈振荡、泛化很差；使用低频激活则更符合 F-Principle，得到平滑插值。这说明改变激活频谱可以改变频率收敛顺序。

课件以一类形如

$$
\sigma_{a,b}(x)\propto
\left(1-\frac{x^2}{a^2}\right)
\exp\!\left(-\frac{x^2}{2a^2b}\right)
$$

的非单调激活作对比，在 $b=5$ 时比较 $a=0.1$ 与 $a=0.3$：较窄的 $a=0.1$ 在输入域变化更快、频谱更偏高，较宽的 $a=0.3$ 更偏低频。

## 11. 参数空间中的凝聚现象

### 11.1 初始化尺度与 ReLU 特征

两层网络

$$
f_\theta(x)=\sum_{k=1}^{m}a_k\operatorname{ReLU}(w_kx+b_k)
$$

可用 Gaussian 或 uniform 初始化。课件用

$$
a_k\sim N(0,\beta_1^2),\qquad
(w_k,b_k)\sim N(0,\beta_2^2I),
$$

并令尺度随宽度满足 $\beta_1\sim m^{-\lambda_1}$、$\beta_2\sim m^{-\lambda_2}$。宽度增大时常缩小初始化。

ReLU 神经元的折点是

$$
w_kx+b_k=0
\quad\Longrightarrow\quad
x=-\frac{b_k}{w_k}.
$$

对一维输入，把 $(w_k,b_k)$ 看成二维向量，定义方向与幅度

$$
\tan\vartheta_k=\frac{b_k}{w_k},
\qquad
A_k=a_k\sqrt{w_k^2+b_k^2}.
$$

于是 $(\vartheta_k,A_k)$ 表示一个神经元的特征。$w$ 同号且折点相同的 ReLU 可以合并为一个等效神经元；折点不同则一般不能合并。

### 11.2 大初始化与小初始化

大初始化时，网络初始函数有许多随机锯齿，训练前后参数方向变化较小，最终特征受随机初值强烈影响，容易产生复杂插值甚至过拟合。

小初始化时，参数会在训练中明显移动，许多神经元逐渐聚集到少数方向，输出更平滑，最终有效特征主要由数据决定。这就是**凝聚（condensation）**：小初始化下，同层神经元具有趋同偏好。

课件动画使用 50 个 ReLU 神经元、20 个样本和小初始化。开始时参数方向分散，训练后形成少数群；右侧模型逐步拟合数据。动画只说明特征或方向聚集，不能解释成所有完整参数块严格相同，变速播放也不能用于判断真实动力学速度。

训练过程常先形成一个有效神经元；误差仍大时再逐步增加有效方向。若

$$
w_1=w_2,\qquad w_3=w_4=w_5,
$$

则

$$
\sum_{k=1}^{5}a_k\sigma(w_k^\top x)
=(a_1+a_2)\sigma(w_1^\top x)
+(a_3+a_4+a_5)\sigma(w_3^\top x),
$$

五个神经元等价于两个。可把等效小网络的参数量理解为 effective number of parameters。

### 11.3 为什么不直接训练小网络

凝聚后的大网络与等效小网络可以表示同一个函数，但大网络通常更容易优化：冗余参数提供了更多损失下降方向，使训练路径更灵活。直接训练很小网络可能受限于不良参数化和狭窄优化通道。

初始化也不能无限小，更不能全零。全零会保持神经元对称，某些结构下梯度也为零；过小初始化会使训练变慢。默认初始化通常是可训练性与 simplicity bias 的折中，大语言模型则会专门调节尺度。

实际网络中也观察到类似现象。例如 ResNet-18 某层把每个 convolution kernel 当作一个单元，训练前两两 cosine similarity 不高，训练后部分卷积核相似度接近 $1$，出现明显凝聚。

频率原则与凝聚共同提供一种潜在解释：过参数化网络虽有大量名义参数，却偏向低频函数，并把许多神经元压缩为少数有效特征，所以实际复杂度远小于原始参数计数。当有效神经元逐步增多时，网络才有能力学习更高频部分。

## 12. 损失景观、平坦解与 Edge of Stability

### 12.1 平坦解与尖锐解

局部极小值附近若参数轻微扰动只引起小损失变化，称为 flat minimum；若轻微扰动就使损失急升，称为 sharp minimum。训练和测试数据都含噪声，平坦解通常对数据与参数扰动更鲁棒，因此常与更好泛化相关。

Keskar et al.（2016）比较 small-batch 与 large-batch training：

- SB 的 batch size 为 256；
- LB 每批约为总样本的 $10\%$；
- 在 CIFAR-100、CNN、Adam 设置下比较两类终点。

以 $x_s^*$、$x_l^*$ 表示 SB 与 LB 的解，考察线性路径

$$
f\bigl(\alpha x_l^*+(1-\alpha)x_s^*\bigr),\qquad \alpha\in[0,1].
$$

实验显示 small-batch 解通常更平坦。直观上，小批量梯度噪声使优化更难稳定停留在狭窄尖锐盆地。

### 12.2 Hessian 与稳定条件

局部二阶展开为

$$
L(\theta+\delta)\approx L(\theta)
+\nabla L(\theta)^\top\delta
+\frac12\delta^\top H(\theta)\delta,
$$

其中 $H=\nabla^2L$。在极小值附近，Hessian 最大特征值 $\lambda_{\max}$ 描述最陡方向的曲率；$\lambda_{\max}$ 越小，局部越平坦。

沿 Hessian 特征方向，GD 稳定性与一维二次函数相同：

$$
\eta\lambda_{\max}<2
\quad\Longleftrightarrow\quad
\lambda_{\max}<\frac2\eta.
$$

课件个别公式排版把 $2/\eta$ 写得易混淆；由推导可知正确量纲是 $\lambda_{\max}<2/\eta$。

### 12.3 Edge of Stability

实验中，训练最终常满足

$$
\lambda_{\max}\approx\frac2\eta,
$$

即处于刚好接近离散 GD 稳定边界的位置，称为 edge of stability。更大的、但仍合理的学习率只允许优化停在曲率更小的区域，所以往往找到更平坦的解；学习率过大则完全不稳定。

提升平坦性的常见经验包括：

- 使用较小 batch；
- 在稳定范围内采用较大学习率；
- 使用 Dropout，引入随机子网络扰动。

“平坦”与泛化的关系会受参数重标度等影响，因此 Hessian 指标不是绝对坐标无关的复杂度定义；在固定参数化与实验条件下，它仍是重要诊断量。

## 14. 思考题与推导练习

### 14.1 损失函数与两层网络

1. 写出 MSE 与 cross-entropy；分别推导 $\partial R/\partial\theta$。
2. 对

   $$
   f_\theta(x)=\sum_{j=1}^{m}a_j\sigma(w_j^\top x+b_j)
   $$

   在 MSE 下推导 $a_j,w_j,b_j$ 的梯度，并从 $(x^{(0)},\theta^{(0)})$ 出发写出 learning rate 为 $\eta$ 时的一步 GD 更新。

### 14.2 高维空间与 Monte Carlo

1. 解释 curse of dimensionality，并分别从积分、PDE、函数逼近举例。
2. 绘制 $d=5,10,20$ 时 $V_d(r)$ 在 $r\in[0,1]$ 的曲线，分析维数增加的影响。
3. 证明 Monte Carlo 误差为 $O(n^{-1/2})$ 且收敛阶不显式依赖 $d$。
4. 既然 Monte Carlo 没有指数维数因子，为什么高维二次函数在内部低采样区域仍可能有很大泛化误差？提示：无偏积分估计只约束全局平均，不保证每一点的函数逼近误差。

### 14.3 Residual Network

从

$$
X^{(k+1)}=F_k(X^{(k)})+X^{(k)}
$$

推导反向传播公式，并比较无 skip connection 时的 Jacobian 连乘，说明恒等项为什么有利于梯度传播。

### 14.4 CNN 平移等变性

证明

$$
K*(T_{a,b}I)=T_{a,b}(K*I),
$$

并解释平移等变的 feature map 与 pooling/全局聚合如何共同改善图像分类中的平移不变性。

### 14.5 训练现象

1. 设计控制变量实验，区分“低频先学”与“大振幅先学”。
2. 解释 early stopping 为什么能抑制高频噪声。
3. 讨论大初始化、小初始化对 ReLU 折点与凝聚的影响。
4. 比较 small-batch 与 large-batch 对平坦解的偏好。
5. 从二次函数推导 $\lambda_{\max}<2/\eta$，解释 edge of stability。

## 15. 主要参考资料

- 许志钦、张耀宇：《深度学习现象导论》，课程代码：`https://github.com/xuzhiqin1990/understanding_dl`。
- Blum, A., Hopcroft, J. & Kannan, R. *High-Dimensional Space*. Cambridge University Press, 2020.
- Cybenko, G. “Approximation by Superpositions of a Sigmoidal Function.” 1989.
- DeVore, R. A. “Nonlinear Approximation.” *Acta Numerica*, 1998.
- E, W., Ma, C. & Wu, L. “Barron Spaces and the Compositional Function Spaces for Neural Network Models.” 2019.
- He, K. et al. “Deep Residual Learning for Image Recognition.” 2016.
- Hubel, D. H. & Wiesel, T. N. “Receptive Fields of Single Neurones in the Cat’s Striate Cortex.” 1959.
- Dayan, P. & Abbott, L. F. *Theoretical Neuroscience*.
- Karpathy, A., Johnson, J. & Fei-Fei, L. “Visualizing and Understanding Recurrent Networks.” 2016.
- Keskar, N. S. et al. “On Large-Batch Training for Deep Learning: Generalization Gap and Sharp Minima.” 2016.
- Krizhevsky, A., Sutskever, I. & Hinton, G. “ImageNet Classification with Deep Convolutional Neural Networks.” 2012.
- LeCun, Y. et al. “Backpropagation Applied to Handwritten Zip Code Recognition.” 1989.
- Su, J. et al. “RoFormer: Enhanced Transformer with Rotary Position Embedding.”
- Vaswani, A. et al. “Attention Is All You Need.” 2017.
- Wu, L., Ma, C. & E, W. “How SGD Selects the Global Minima in Over-Parameterized Learning.” 2018.
- 赵鑫、李军毅、周昆、唐天一、文继荣：《大语言模型》，`https://llmbook-zh.github.io/`，2024。
- Stanford CS231n course slides（RNN 文本生成、可解释神经元与图像描述示例）。
- Hugging Face NLP Course（WordPiece 与 Unigram tokenization）。
