---
title: Best Uniform Approximation and Least-Squares Approximation
date: 2026-10-29 11:18:06
updated: 2026-10-29 16:37:57
math: true
categories:
  - Numerical Analysis
tags:
  - 数值分析
  - 函数逼近
  - 最佳一致逼近
  - 最佳平方逼近
  - 正交多项式
  - 最小二乘法
description: 数值分析课程笔记：最佳一致逼近、最佳平方逼近、Legendre 与 Chebyshev 多项式，以及离散数据的最小二乘拟合。
---

插值要求近似函数在指定节点上与原函数完全相等，而函数逼近更关心近似函数在整个区间上的总体表现。本章讨论两个核心问题：怎样定义“最接近”，以及在给定的低维函数空间中怎样真正求出最优近似。

<!-- more -->

## 1. 函数逼近的基本思想

### 1.1 为什么需要函数逼近？

许多函数虽然有明确表达式，但直接计算可能代价很高。函数逼近的目标是用性质良好、计算简单的函数代替复杂函数，例如：

- 代数多项式；
- 有理函数；
- 三角多项式；
- 分段多项式。

研究一个逼近方法时，通常需要回答五个问题：

1. **存在性**：最佳逼近函数是否存在？
2. **最优性判定**：怎样判断一个候选函数已经达到最优？
3. **唯一性**：最佳逼近是否只有一个？
4. **误差与收敛速度**：提高逼近空间的维数后，误差怎样变化？
5. **构造方法**：怎样稳定、高效地算出最佳逼近？

### 1.2 从多项式逼近到神经网络

1885 年，Weierstrass 证明闭区间上的任意连续函数都可以被多项式任意精确地一致逼近。1937 年，Marshall Stone 又把这一思想推广到更一般的紧空间和函数代数，这就是 Stone--Weierstrass 定理。

多项式至今仍是重要的“万能逼近器”，原因不仅是它可以逼近连续函数，还包括：

- 对光滑函数，特别是解析函数，经典多项式方法往往收敛很快；
- 可以给出可证明的误差界，这对科学计算的可靠性很重要；
- 可以精确满足导数连续、周期性等数学结构约束。

PPT 还用神经网络说明“万能逼近”的现代版本。一个单隐层的两层全连接网络可写成

$$
f_\theta(x)=\sum_{j=1}^Na_j\sigma(W_jx+b_j).
$$

若激活函数 $\sigma$ 连续、非线性且不是多项式，则在适当条件下，这类网络可以把任意连续函数逼近到任意精度。这里的核心思想与多项式逼近相同：选择一族足够丰富的简单基函数，通过线性组合构造复杂函数。经典逼近理论仍然有意义，因为它提供清晰的误差分析、收敛速度与结构保持结论。

### 1.3 Taylor 逼近的局限

以 $f(x)=e^x$ 为例，在 $x=0$ 处取四阶 Taylor 多项式：

$$
p_4(x)=1+x+\frac{x^2}{2}+\frac{x^3}{6}+\frac{x^4}{24}.
$$

余项为

$$
R_4(x)=\frac{e^\xi}{5!}x^5,
\qquad \xi\in(-1,1).
$$

因此在 $[-1,1]$ 上

$$
|R_4(x)|\le \frac{e}{120}\approx 0.02265.
$$

Taylor 多项式在展开点附近通常很好，但它首先保证的是局部导数匹配，不一定是在整个区间上误差最小。函数逼近要解决的正是“在整个区间上怎样更合理地分配误差”。

### 1.4 插值、逼近与拟合的区别

| 问题 | 已知信息 | 主要要求 |
| --- | --- | --- |
| 函数插值 | 精确节点值 $f(x_i)$ | $p(x_i)=f(x_i)$ |
| 函数逼近 | 已知完整函数 $f(x)$ | 在某种函数范数下使 $p$ 最接近 $f$ |
| 曲线拟合 | 一组可能带噪声的数据 $(x_i,y_i)$ | 在离散误差意义下整体最接近数据 |

三者的共同点是都要在一个简单函数族中寻找近似函数；差别在于“接近”的定义不同。

## 2. 范数与逼近空间

### 2.1 连续函数空间

记

$$
C[a,b]=\{f\mid f\text{ 在 }[a,b]\text{ 上连续}\}.
$$

在 $C[a,b]$ 上常用两种误差度量。

**无穷范数**：

$$
\|f\|_\infty=\max_{a\le x\le b}|f(x)|.
$$

它只关心区间中最坏位置的误差，因此又称最大模范数。

**二范数**：

$$
\|f\|_2=\left(\int_a^b |f(x)|^2\,dx\right)^{1/2}.
$$

它衡量整个区间上的“误差能量”。某个很窄区域中的误差即使较大，对积分的影响也可能有限。

范数满足正定性、齐次性和三角不等式：

$$
\|f\|\ge 0,
\qquad \|f\|=0\iff f=0,
$$

$$
\|cf\|=|c|\,\|f\|,
\qquad
\|f+g\|\le \|f\|+\|g\|.
$$

### 2.2 多项式空间

记

$$
H_n=\operatorname{span}\{1,x,x^2,\ldots,x^n\},
$$

即所有次数不超过 $n$ 的代数多项式组成的线性空间，其维数为 $n+1$。

Weierstrass 逼近定理说明：对任意 $f\in C[a,b]$ 和任意 $\varepsilon>0$，总存在某个代数多项式 $p$，使

$$
\|f-p\|_\infty<\varepsilon.
$$

它保证多项式可以任意精确地一致逼近连续函数，但没有告诉我们固定次数 $n$ 后哪个多项式最好，也没有直接给出构造方法。

## 3. 最佳一致逼近

### 3.1 定义

给定函数空间 $\Phi$ 和 $f\in C[a,b]$。若 $g^*\in\Phi$ 满足

$$
\|f-g^*\|_\infty
=\min_{g\in\Phi}\|f-g\|_\infty,
$$

则称 $g^*$ 是 $f$ 在 $\Phi$ 中的**最佳一致逼近函数**。

当 $\Phi=H_n$ 时，$g^*$ 称为 $f$ 的 $n$ 次最佳一致逼近多项式。

对 $p_n\in H_n$，定义偏差

$$
\Delta(f,p_n)=\|f-p_n\|_\infty
=\max_{a\le x\le b}|f(x)-p_n(x)|.
$$

所有 $n$ 次多项式能够达到的最小偏差记为

$$
E_n(f)=\min_{p_n\in H_n}\Delta(f,p_n).
$$

因为 $H_n\subset H_{n+1}$，增加次数不会使最佳误差变差：

$$
E_{n+1}(f)\le E_n(f).
$$

### 3.2 偏差点

设

$$
\mu=\|p_n-f\|_\infty.
$$

若某点 $x_0$ 满足

$$
|p_n(x_0)-f(x_0)|=\mu,
$$

则称 $x_0$ 为偏差点。进一步地：

$$
p_n(x_0)-f(x_0)=\mu
$$

时称为正偏差点；等于 $-\mu$ 时称为负偏差点。

最佳一致逼近多项式必须同时存在正、负偏差点。直观上，如果所有最大偏差都在同一侧，就可以把多项式整体向另一侧平移一点，从而减小最大误差，因此原多项式不可能最优。

### 3.3 Chebyshev 交错定理

这是最佳一致逼近中最重要的判定定理。

> 多项式 $p_n\in H_n$ 是 $f\in C[a,b]$ 的最佳一致逼近多项式，当且仅当区间内至少存在 $n+2$ 个依次排列的点
>
> $$
> a\le t_1<t_2<\cdots<t_{n+2}\le b,
> $$
>
> 使误差在这些点上达到同样的最大绝对值，并且符号严格交替：
>
> $$
> p_n(t_k)-f(t_k)
> =\pm(-1)^k\|p_n-f\|_\infty,
> \qquad k=1,2,\ldots,n+2.
> $$

这组点称为 **Chebyshev 交错点组**。

定理包含三个缺一不可的条件：

1. 至少有 $n+2$ 个点；
2. 误差符号交替；
3. 每个点的误差绝对值都等于全区间的最大误差。

例如，判断 $p\in H_2$ 是否最佳，需要找到 $4$ 个等幅交错偏差点。仅有 $4$ 个误差绝对值相等的点还不够，因为它们的符号可能不交替。

若误差在四点依次取 $+1,-1,+1,-1$，但已知 $\|f-p\|_\infty=2$，仍不能由此判定 $p$ 最佳，因为这四点并没有达到最大误差 $2$。

#### 充分性的直观证明

假设 $p_n$ 已有 $n+2$ 个交错点，并且另有 $q_n\in H_n$ 的最大误差更小。为了在每个交错点上都缩小误差，差多项式

$$
p_n-q_n
$$

必须在相邻交错点之间不断变号，因而至少有 $n+1$ 个不同零点。但它的次数不超过 $n$，除非恒为零，否则不可能有这么多零点。因此不存在更好的 $q_n$。

#### 必要性的证明思路（反证法）

反过来，设 $p_n$ 已经是最佳一致逼近，但其交错点最多只有 $M\le n+1$ 个。可在相邻交错区间之间选取

$$
\tau_i=\frac{t_i+t_{i+1}}2,
\qquad i=1,2,\ldots,M-1,
$$

并构造次数不超过 $M-1\le n$ 的多项式

$$
q(x)=\pm(-1)^{M+1}\prod_{i=1}^{M-1}(x-\tau_i).
$$

选择整体符号后，$q(t_k)$ 与误差 $p_n(t_k)-f(t_k)$ 在所有交错偏差点上同号。由于偏差点集合是紧集，且误差在非偏差点处严格小于 $E_n$，可取足够小的 $\lambda>0$，使

$$
\max_{a\le x\le b}|p_n(x)-f(x)-\lambda q(x)|
<E_n.
$$

也就是说，$p_n-\lambda q\in H_n$ 比 $p_n$ 的最大误差更小，与 $p_n$ 最佳矛盾。因此交错点不可能少于 $n+2$ 个。

### 3.4 存在性、唯一性与插值关系

Chebyshev 定理还能推出：

- 对任意 $f\in C[a,b]$，其 $n$ 次最佳一致逼近多项式存在且唯一；
- 在相邻交错点之间，误差连续且符号相反，所以至少有一个零点；
- 由此可取 $n+1$ 个误差零点，最佳逼近多项式正是 $f$ 在这些点上的 Lagrange 插值多项式。

这里的插值节点不是预先指定的，而是由最佳逼近的交错结构决定的。

唯一性也可直接由交错点说明。若 $P_n$、$Q_n$ 都是最佳逼近，则平均多项式

$$
R_n=\frac{P_n+Q_n}{2}
$$

同样是最佳逼近。取 $R_n$ 的 $n+2$ 个交错点 $t_k$，由三角不等式取等号的条件可知，$P_n(t_k)-f(t_k)$ 和 $Q_n(t_k)-f(t_k)$ 必须同号且都等于 $\pm E_n$。于是

$$
P_n(t_k)=Q_n(t_k),
\qquad k=1,2,\ldots,n+2.
$$

$P_n-Q_n$ 是次数不超过 $n$ 的多项式，却有 $n+2$ 个零点，只能恒为零。因此最佳一致逼近唯一。

对于插值关系，若最佳逼近不恒等于 $f$，相邻交错点间的误差符号相反，由介值定理在每个区间中至少有一个零点 $x_k$：

$$
p_n^*(x_k)=f(x_k),
\qquad k=1,2,\ldots,n+1.
$$

因此 $p_n^*$ 就是以这些 $x_k$ 为节点的唯一 $n$ 次 Lagrange 插值多项式。需要与后文区分：通常所说的 Chebyshev 插值节点特指 Chebyshev 多项式的零点。

## 4. 一次最佳一致逼近

设 $f\in C^2[a,b]$，且 $f''(x)$ 在区间内不变号。求

$$
p_1(x)=c_0+c_1x.
$$

一次最佳一致逼近需要 $3$ 个交错点。由于 $f$ 始终保持凸性或凹性，这三个点是两个端点 $a,b$ 和一个内部点 $t$。

端点误差相等给出

$$
p_1(a)-f(a)=p_1(b)-f(b),
$$

所以直线斜率为端点割线斜率：

$$
\boxed{c_1=\frac{f(b)-f(a)}{b-a}}.
$$

内部偏差点是误差函数的极值点，因此

$$
p_1'(t)-f'(t)=0,
$$

即

$$
\boxed{f'(t)=c_1}.
$$

再利用端点和内部点的误差等幅反号，可得

$$
\boxed{
p_1(x)=\frac{f(a)+f(t)}{2}
+c_1\left(x-\frac{a+t}{2}\right)
}.
$$

这条最佳直线与端点割线平行，并且通过由端点 $(a,f(a))$ 与内部点 $(t,f(t))$ 连线中点确定的位置。

### 例 1：$\sqrt{1+x^2}$ 的一次最佳一致逼近

求

$$
f(x)=\sqrt{1+x^2},
\qquad x\in[0,1]
$$

的一次最佳一致逼近。

首先计算斜率：

$$
c_1=\frac{f(1)-f(0)}{1-0}
=\sqrt2-1
\approx0.4142.
$$

由于

$$
f'(x)=\frac{x}{\sqrt{1+x^2}},
$$

内部偏差点满足

$$
\frac{t}{\sqrt{1+t^2}}=\sqrt2-1.
$$

平方并整理得到

$$
t^2=\frac{\sqrt2-1}{2},
\qquad
t=\sqrt{\frac{\sqrt2-1}{2}}\approx0.4551.
$$

相应函数值为

$$
f(t)=\sqrt{1+t^2}
=\sqrt{\frac{1+\sqrt2}{2}}
\approx1.0987.
$$

代入公式：

$$
p_1^*(x)
=\frac{1+f(t)}{2}
+(\sqrt2-1)\left(x-\frac t2\right)
\approx0.9551+0.4142x.
$$

最大误差可在端点计算：

$$
E_1=|p_1^*(0)-f(0)|
\approx|0.9551-1|
\approx0.0449.
$$

误差在 $x=0,t,1$ 三点等幅交错，因此由 Chebyshev 定理可确认该直线确实是最佳一致逼近。

## 5. 最佳平方逼近

### 5.1 定义：什么是最佳平方逼近？

给定权函数 $\rho(x)$，定义

$$
\|f\|_\rho
=\left(\int_a^b \rho(x)f^2(x)\,dx\right)^{1/2}.
$$

若 $p_n^*\in H_n$ 满足

$$
\|f-p_n^*\|_\rho^2
=\min_{p_n\in H_n}
\int_a^b\rho(x)[f(x)-p_n(x)]^2\,dx,
$$

则称 $p_n^*$ 为 $f$ 的 $n$ 次最佳平方逼近多项式。

由于范数非负，最小化 $\|f-p_n\|_\rho$ 与最小化它的平方完全等价。实际推导时通常使用平方形式，因为平方根不会改变极小点，去掉平方根后求导更简单。

当不带权，即 $\rho(x)=1$ 时，定义退化为

$$
\|f-p_n^*\|_2^2
=\min_{p_n\in H_n}\int_a^b[f(x)-p_n(x)]^2\,dx.
$$

最佳一致逼近控制的是“最坏点”，最佳平方逼近控制的是整个区间上误差平方的累计量。因此，平方逼近允许局部出现较大的误差，只要这一误差出现的范围较窄，或者被其他位置较小的误差所补偿。

### 5.2 线性空间基础

为了把函数逼近理解成“投影”，先回顾线性空间。设 $V$ 是非空集合，$K$ 是数域（通常为 $\mathbb R$ 或 $\mathbb C$）。若 $V$ 上定义了向量加法和数乘，并满足以下八条性质，则称 $V$ 为 $K$ 上的线性空间：

1. 交换律：$u+v=v+u$；
2. 结合律：$(u+v)+w=u+(v+w)$；
3. 存在唯一零元 $0_V$，使 $u+0_V=u$；
4. 每个 $u$ 存在负元 $-u$，使 $u+(-u)=0_V$；
5. $a(u+v)=au+av$；
6. $(a+b)u=au+bu$；
7. $(ab)u=a(bu)$；
8. $1u=u$。

数值向量、连续函数、多项式都可以看作向量。函数的“相加”和“数乘”都是逐点定义的，因此 $C[a,b]$ 和 $H_n$ 都是线性空间。

### 5.3 内积、范数与正交

在实线性空间 $V$ 上，若映射 $\langle u,v\rangle$ 满足：

1. 对称性：$\langle u,v\rangle=\langle v,u\rangle$；
2. 第一变量齐次性：$\langle au,v\rangle=a\langle u,v\rangle$；
3. 可加性：$\langle u+v,w\rangle=\langle u,w\rangle+\langle v,w\rangle$；
4. 正定性：$\langle u,u\rangle\ge0$，且等号成立当且仅当 $u=0_V$，

则称其为内积，$V$ 称为内积空间。复数空间中第一条要改为共轭对称性。

内积给出了长度和角度：

$$
\|u\|=\sqrt{\langle u,u\rangle}.
$$

若 $\langle u,v\rangle=0$，则称 $u$ 与 $v$ 正交。

#### 例：$\mathbb R^n$ 上的标准内积与带权内积

设

$$
x=(x_1,\ldots,x_n)^T,
\qquad y=(y_1,\ldots,y_n)^T.
$$

标准内积和二范数为

$$
\langle x,y\rangle=x^Ty=\sum_{i=1}^nx_iy_i,
\qquad
\|x\|_2=\left(\sum_{i=1}^nx_i^2\right)^{1/2}.
$$

更一般地，若 $M$ 是 $n$ 阶正定对称矩阵，则

$$
\langle x,y\rangle_M=y^TMx
$$

也是内积。特别地，若 $M=\operatorname{diag}(\omega_1,\ldots,\omega_n)$ 且 $\omega_i>0$，则

$$
\langle x,y\rangle_M=\sum_{i=1}^n\omega_ix_iy_i,
\qquad
\|x\|_M=\left(\sum_{i=1}^n\omega_ix_i^2\right)^{1/2}.
$$

这里的 $\omega_i$ 就是各分量的权系数。

#### 例：$C[a,b]$ 上的标准内积

对 $f,g\in C[a,b]$，定义

$$
\langle f,g\rangle=\int_a^bf(x)g(x)\,dx.
$$

它满足对称性、线性和正定性，因此确实是内积。相应二范数为

$$
\|f\|_2=\sqrt{\langle f,f\rangle}
=\left(\int_a^bf^2(x)\,dx\right)^{1/2}.
$$

可以把函数想象成一个“无限维向量”

$$
[f(a),f(a+dx),\ldots,f(b)]^T,
$$

积分内积就是有限维向量点积在连续情形下的对应物。

### 5.4 权函数与带权内积

权函数用于表达区间内不同位置的重要程度。权重越大的位置，其误差对目标函数的影响越大。常见权函数包括：

严格地说，在有限或无限区间 $[a,b]$ 上，非负函数 $\rho(x)$ 若满足：

1. 对每个 $k=0,1,2,\ldots$，矩 $\int_a^b|x|^k\rho(x)\,dx$ 存在且有限；
2. 对任意在 $[a,b]$ 上非负的连续函数 $g$，若

   $$
   \int_a^bg(x)\rho(x)\,dx=0,
   $$
   则 $g(x)\equiv0$，

就称 $\rho$ 为 $[a,b]$ 上的权函数。第二条也可表述为：对任意 $a<u<v<b$，都有

$$
\int_u^v\rho(x)\,dx>0.
$$

它排除了权函数在某个完整子区间上恒为零的情况，从而保证带权“长度”为零时函数本身确实为零。

$$
\rho(x)=1,
\qquad
\rho(x)=\frac1{\sqrt{1-x^2}}\quad(-1<x<1),
$$

$$
\rho(x)=e^{-x}\quad(0\le x<\infty),
\qquad
\rho(x)=e^{-x^2}\quad(-\infty<x<\infty).
$$

带权内积定义为

$$
\langle f,g\rangle_\rho
=\int_a^b\rho(x)f(x)g(x)\,dx.
$$

相应范数为

$$
\|f\|_\rho=\sqrt{\langle f,f\rangle_\rho}.
$$

若

$$
\langle f,g\rangle_\rho=0,
$$

则称 $f$ 与 $g$ 关于权 $\rho$ 正交。正交可以理解为函数空间中的“垂直”。

例如在 $[-\pi,\pi]$ 上取 $\rho=1$，函数族

$$
1,\cos x,\sin x,\cos2x,\sin2x,\ldots
$$

彼此正交，这正是 Fourier 展开的基础。

### 5.5 法方程的推导与几何意义

设 $\varphi_0,\ldots,\varphi_n$ 是 $H_n$ 的一组基，令

$$
p_n(x)=\sum_{j=0}^n a_j\varphi_j(x).
$$

目标函数为

$$
I(a_0,\ldots,a_n)
=\int_a^b\rho(x)
\left[f(x)-\sum_{j=0}^na_j\varphi_j(x)\right]^2dx.
$$

令所有偏导数为零。对 $a_k$ 求偏导：

$$
\frac{\partial I}{\partial a_k}
=-2\int_a^b\rho(x)
\left[f(x)-\sum_{j=0}^na_j\varphi_j(x)\right]
\varphi_k(x)\,dx.
$$

令 $\partial I/\partial a_k=0$，得到法方程

$$
\boxed{
\sum_{j=0}^n
\langle\varphi_k,\varphi_j\rangle_\rho a_j
=\langle f,\varphi_k\rangle_\rho,
\qquad k=0,1,\ldots,n.
}
$$

它也可以写成

$$
Ga=d,
$$

其中 $G$ 是 Gram 矩阵。法方程的几何意义是

$$
\boxed{
\langle f-p_n^*,q\rangle_\rho=0,
\qquad \forall q\in H_n.
}
$$

也就是说，最佳平方逼近的残差与整个逼近空间正交；$p_n^*$ 是 $f$ 在 $H_n$ 上的正交投影。

#### 为什么法方程一定有唯一解？

Gram 矩阵为

$$
G=(\langle\varphi_k,\varphi_j\rangle_\rho)_{k,j=0}^n.
$$

对任意非零向量 $c=(c_0,\ldots,c_n)^T$，有

$$
c^TGc
=\left\langle\sum_{k=0}^nc_k\varphi_k,
\sum_{j=0}^nc_j\varphi_j\right\rangle_\rho
=\left\|\sum_{k=0}^nc_k\varphi_k\right\|_\rho^2>0.
$$

因为基函数线性无关，非零系数不能得到零函数。因此 $G$ 正定、$\det G\ne0$，法方程有唯一解，最佳平方逼近多项式存在且唯一。

#### 平方误差公式的推导

记残差 $\delta=f-p_n^*$。由于 $\delta$ 与 $H_n$ 正交，而 $p_n^*\in H_n$，所以

$$
\langle f-p_n^*,p_n^*\rangle_\rho=0.
$$

于是

$$
\begin{aligned}
\|\delta\|_\rho^2
&=\langle f-p_n^*,f-p_n^*\rangle_\rho\\
&=\langle f-p_n^*,f\rangle_\rho
-\langle f-p_n^*,p_n^*\rangle_\rho\\
&=\langle f,f\rangle_\rho
-\langle p_n^*,f\rangle_\rho.
\end{aligned}
$$

若 $p_n^*=\sum_{j=0}^na_j\varphi_j$，则

$$
\boxed{
\|f-p_n^*\|_\rho^2
=\|f\|_\rho^2-
\sum_{j=0}^na_j\langle\varphi_j,f\rangle_\rho
}.
$$

### 5.6 方法一：用单项式基直接求解

若在 $[0,1]$ 上取单项式基 $1,x,\ldots,x^n$ 和 $\rho=1$，则

$$
G_{kj}=\int_0^1x^{k+j}\,dx=\frac1{k+j+1},
$$

得到 Hilbert 矩阵。它虽然理论上可逆，但阶数稍大时病态性很强，这也是实际计算更偏爱正交基的原因。

展开写为

$$
\begin{bmatrix}
1&1/2&\cdots&1/(n+1)\\
1/2&1/3&\cdots&1/(n+2)\\
\vdots&\vdots&\ddots&\vdots\\
1/(n+1)&1/(n+2)&\cdots&1/(2n+1)
\end{bmatrix}
\begin{bmatrix}a_0\\a_1\\\vdots\\a_n\end{bmatrix}
=
\begin{bmatrix}d_0\\d_1\\\vdots\\d_n\end{bmatrix},
$$

其中

$$
d_k=\int_0^1f(x)x^k\,dx.
$$

### 例 2：$\sqrt{1+x^2}$ 的一次最佳平方逼近

仍取

$$
f(x)=\sqrt{1+x^2},
\qquad x\in[0,1],
$$

令

$$
p_1(x)=a_0+a_1x.
$$

法方程右端为

$$
d_0=\int_0^1\sqrt{1+x^2}\,dx
=\frac12\ln(1+\sqrt2)+\frac{\sqrt2}{2}
\approx1.1478,
$$

$$
d_1=\int_0^1x\sqrt{1+x^2}\,dx
=\frac13(1+x^2)^{3/2}\Big|_0^1
=\frac{2\sqrt2-1}{3}
\approx0.6095.
$$

于是

$$
\begin{bmatrix}
1&1/2\\
1/2&1/3
\end{bmatrix}
\begin{bmatrix}a_0\\a_1\end{bmatrix}
=
\begin{bmatrix}d_0\\d_1\end{bmatrix}.
$$

解得

$$
a_0=-2\sqrt2+2\ln(1+\sqrt2)+2
\approx0.9343,
$$

$$
a_1=-4-3\ln(1+\sqrt2)+5\sqrt2
\approx0.4269.
$$

因此

$$
\boxed{p_1^*(x)\approx0.9343+0.4269x}.
$$

利用残差正交性，平方误差可写成

$$
\|f-p_1^*\|_2^2
=\langle f,f\rangle-\langle p_1^*,f\rangle.
$$

因为

$$
\langle f,f\rangle
=\int_0^1(1+x^2)\,dx=\frac43,
$$

所以

$$
\|f-p_1^*\|_2^2
=\frac43-a_0d_0-a_1d_1
\approx0.0007.
$$

但它的最大误差约为

$$
\|f-p_1^*\|_\infty\approx0.0657.
$$

与例 1 比较可以看到：最佳平方逼近使积分平方误差最小，并不保证最大误差最小。两种“最佳”对应不同的优化目标。

## 6. 正交多项式

### 6.1 定义与基本性质

若多项式序列 $\{\varphi_k\}_{k=0}^{\infty}$ 满足

$$
\deg\varphi_k=k,
$$

并且

$$
\langle\varphi_j,\varphi_k\rangle_\rho
=0,
\qquad j\ne k,
$$

则称其为关于区间 $[a,b]$ 和权函数 $\rho$ 的正交多项式族。

它具有以下重要性质：

1. $\varphi_0,\ldots,\varphi_n$ 构成 $H_n$ 的一组基；
2. $\varphi_n$ 与所有次数低于 $n$ 的多项式正交；
3. 正交多项式满足三项递推关系；
4. $\varphi_n$ 在区间内部有 $n$ 个互不相同的实零点。

下面把这些结论逐一展开。

#### 性质 1：构成多项式空间的一组基

因为 $\deg\varphi_k=k$，每个 $\varphi_k$ 的次数都不同，所以 $\varphi_0,\ldots,\varphi_n$ 线性无关。$H_n$ 的维数正好是 $n+1$，因此

$$
\{\varphi_0,\varphi_1,\ldots,\varphi_n\}
$$

构成 $H_n$ 的一组基。任意 $p\in H_n$ 都能唯一表示为

$$
p(x)=\sum_{k=0}^nc_k\varphi_k(x).
$$

#### 性质 2：与所有低次多项式正交

任意 $p\in H_{n-1}$ 都可写成

$$
p=\sum_{k=0}^{n-1}c_k\varphi_k.
$$

利用线性性和两两正交性：

$$
\langle p,\varphi_n\rangle_\rho
=\sum_{k=0}^{n-1}c_k
\langle\varphi_k,\varphi_n\rangle_\rho=0.
$$

因此 $\varphi_n$ 不只是与前面的正交多项式正交，而是与所有次数低于 $n$ 的多项式正交。

#### 性质 3：三项递推关系

设 $\varphi_k$ 的首项系数为 $a_k\ne0$。因为 $x\varphi_n\in H_{n+1}$，由性质 1 可展开为

$$
x\varphi_n(x)=\sum_{k=0}^{n+1}c_{n,k}\varphi_k(x),
\qquad
c_{n,k}=
\frac{\langle x\varphi_n,\varphi_k\rangle_\rho}
{\langle\varphi_k,\varphi_k\rangle_\rho}.
$$

若 $k<n-1$，则由内积对称性

$$
\langle x\varphi_n,\varphi_k\rangle_\rho
=\langle\varphi_n,x\varphi_k\rangle_\rho=0,
$$

因为 $x\varphi_k$ 的次数至多为 $n-1$。因此展开式中只剩 $\varphi_{n+1},\varphi_n,\varphi_{n-1}$ 三项：

$$
c_{n,n+1}\varphi_{n+1}(x)
=(x-c_{n,n})\varphi_n(x)-c_{n,n-1}\varphi_{n-1}(x).
$$

比较首项系数并计算相应内积，记

$$
\alpha_{n+1}=\frac{a_n}{a_{n+1}},
\qquad
\beta_n=
\frac{\langle\varphi_n,x\varphi_n\rangle_\rho}
{\langle\varphi_n,\varphi_n\rangle_\rho},
$$

$$
\gamma_n=
\frac{\langle\varphi_n,\varphi_n\rangle_\rho}
{\langle\varphi_{n-1},\varphi_{n-1}\rangle_\rho},
\qquad
\alpha_n=\frac{a_{n-1}}{a_n},
$$

得到 PPT 中的一般形式

$$
\boxed{
\alpha_{n+1}\varphi_{n+1}(x)
=(x-\beta_n)\varphi_n(x)
-\alpha_n\gamma_n\varphi_{n-1}(x)
}.
$$

初值取

$$
\varphi_{-1}=0,
\qquad \alpha_0=\gamma_0=1.
$$

若每个正交多项式都是首一多项式，即 $a_k=1$，则 $\alpha_n=1$，递推式简化为

$$
\boxed{
\varphi_{n+1}(x)
=(x-\beta_n)\varphi_n(x)-\gamma_n\varphi_{n-1}(x)
},
$$

其中

$$
\beta_n=
\frac{\langle\varphi_n,x\varphi_n\rangle_\rho}
{\langle\varphi_n,\varphi_n\rangle_\rho},
\qquad
\gamma_n=
\frac{\langle\varphi_n,\varphi_n\rangle_\rho}
{\langle\varphi_{n-1},\varphi_{n-1}\rangle_\rho}.
$$

三项递推式很重要，因为它使我们不必每次从头进行 Gram--Schmidt 正交化，就能按次数依次生成正交多项式。

#### 性质 4：$n$ 个互异实零点都位于区间内部

设 $t$ 是 $\varphi_n$ 的任意零点。

先证明它是单根。若 $t$ 是重根或非实根，则可把共轭根一并提出，写成

$$
\varphi_n(x)=(x-t)(x-\overline t)p_{n-2}(x),
$$

其中 $p_{n-2}$ 的次数不超过 $n-2$。于是

$$
\langle\varphi_n,p_{n-2}\rangle_\rho
=\int_a^b\rho(x)|x-t|^2p_{n-2}^2(x)\,dx>0,
$$

这与性质 2 所要求的正交性矛盾。因此所有根都是实单根。

再证明根位于 $(a,b)$。设 $t$ 是一个实根，写成

$$
\varphi_n(x)=(x-t)p_{n-1}(x).
$$

由正交性，

$$
0=\langle\varphi_n,p_{n-1}\rangle_\rho
=\int_a^b\rho(x)(x-t)p_{n-1}^2(x)\,dx.
$$

若 $t\le a$ 或 $t\ge b$，则 $x-t$ 在整个区间上不变号，积分不可能为零。因此 $t\in(a,b)$。结合次数为 $n$，可知 $\varphi_n$ 在 $(a,b)$ 内恰有 $n$ 个不同的实根。

### 6.2 正交基简化最佳平方逼近

若使用正交基

$$
p_n^*(x)=\sum_{k=0}^na_k\varphi_k(x),
$$

法方程完全解耦：

$$
\boxed{
a_k=\frac{\langle f,\varphi_k\rangle_\rho}
{\langle\varphi_k,\varphi_k\rangle_\rho}
}.
$$

平方误差也可直接计算：

$$
\boxed{
\|f-p_n^*\|_\rho^2
=\|f\|_\rho^2
-\sum_{k=0}^n
\frac{\langle f,\varphi_k\rangle_\rho^2}
{\langle\varphi_k,\varphi_k\rangle_\rho}
}.
$$

这说明加入一个新的正交基函数时，平方误差恰好减少该方向上的投影能量。

同时得到 Bessel 不等式

$$
\sum_{k=0}^n
\frac{\langle f,\varphi_k\rangle_\rho^2}
{\langle\varphi_k,\varphi_k\rangle_\rho}
\le\|f\|_\rho^2,
$$

因为左边是被投影捕获的能量，而总能量减去它正好是非负的平方误差。

### 6.3 Gram--Schmidt 正交化

从 $1,x,x^2,\ldots$ 出发，可递推构造正交多项式：

$$
g_0(x)=1,
$$

$$
g_n(x)=x^n-
\sum_{k=0}^{n-1}
\frac{\langle x^n,g_k\rangle_\rho}
{\langle g_k,g_k\rangle_\rho}g_k(x).
$$

本质上是从 $x^n$ 中减去它在所有低阶方向上的投影。

当 $\rho(x)=1$ 时，前两步可写得更具体：

$$
g_1(x)=x-
\frac{\int_a^bx\,dx}{\int_a^b1\,dx}
=x-\frac{a+b}{2},
$$

$$
g_2(x)=x^2
-\frac{\langle x^2,g_0\rangle}{\langle g_0,g_0\rangle}g_0(x)
-\frac{\langle x^2,g_1\rangle}{\langle g_1,g_1\rangle}g_1(x).
$$

化简为

$$
g_2(x)=x^2-\frac{a^2+ab+b^2}{3}
-(a+b)\left(x-\frac{a+b}{2}\right).
$$

## 7. Legendre 多项式

在 $[-1,1]$ 上取权函数 $\rho(x)=1$，由单项式正交化得到 Legendre 多项式：

$$
P_n(x)=\frac1{2^nn!}
\frac{d^n}{dx^n}(x^2-1)^n.
$$

前几个多项式为

$$
P_0(x)=1,
\qquad P_1(x)=x,
$$

$$
P_2(x)=\frac{3x^2-1}{2},
\qquad
P_3(x)=\frac{5x^3-3x}{2}.
$$

继续递推可得

$$
P_4(x)=\frac{35x^4-30x^2+3}{8},
$$

$$
P_5(x)=\frac{63x^5-70x^3+15x}{8},
$$

$$
P_6(x)=\frac{231x^6-315x^4+105x^2-5}{16}.
$$

从 Rodrigues 公式可看出 $P_n$ 的首项系数为

$$
a_n=\frac{(2n)!}{2^n(n!)^2}.
$$

因此对应的首一 Legendre 多项式为

$$
\boxed{
\widetilde P_n(x)
=\frac{P_n(x)}{a_n}
=\frac{n!}{(2n)!}
\frac{d^n}{dx^n}(x^2-1)^n
}.
$$

主要性质包括：

$$
(n+1)P_{n+1}(x)
=(2n+1)xP_n(x)-nP_{n-1}(x),
$$

$$
\int_{-1}^1P_n(x)P_m(x)\,dx
=
\begin{cases}
0,&m\ne n,\\
\dfrac2{2n+1},&m=n,
\end{cases}
$$

以及奇偶性

$$
P_n(-x)=(-1)^nP_n(x).
$$

将 $P_n$ 除以其首项系数可得到首一 Legendre 多项式。它在所有首一 $n$ 次多项式中具有最小的二范数。

#### 为什么首一 Legendre 多项式具有最小平方范数？

任取另一个首一 $n$ 次多项式 $Q_n$。因为它和 $\widetilde P_n$ 的最高次项相同，所以两者之差次数至多为 $n-1$，可写成

$$
Q_n(x)=\widetilde P_n(x)
+\sum_{k=0}^{n-1}b_k\widetilde P_k(x).
$$

利用 Legendre 多项式的正交性，交叉项全部消失：

$$
\begin{aligned}
\|Q_n\|_2^2
&=\langle Q_n,Q_n\rangle\\
&=\|\widetilde P_n\|_2^2
+\sum_{k=0}^{n-1}b_k^2\|\widetilde P_k\|_2^2\\
&\ge\|\widetilde P_n\|_2^2.
\end{aligned}
$$

只有当所有 $b_k=0$，即 $Q_n=\widetilde P_n$ 时取等号。因此 $\widetilde P_n$ 是唯一的最小范数首一多项式。

### 例 3：$e^x$ 在 $[-1,1]$ 上的最佳三次平方逼近

使用基 $P_0,P_1,P_2,P_3$，设

$$
S_3^*(x)=\sum_{k=0}^3a_kP_k(x),
\qquad
a_k=\frac{\langle e^x,P_k\rangle}{\langle P_k,P_k\rangle}.
$$

逐项积分得到

$$
\langle e^x,P_0\rangle=e-e^{-1},
$$

$$
\langle e^x,P_1\rangle=\frac2e,
$$

$$
\langle e^x,P_2\rangle=e-\frac7e,
$$

$$
\langle e^x,P_3\rangle=-5e+\frac{37}{e}.
$$

又因为 $\langle P_k,P_k\rangle=2/(2k+1)$，所以

$$
a_0\approx1.1752,
\quad a_1\approx1.1036,
\quad a_2\approx0.3578,
\quad a_3\approx0.0705.
$$

即

$$
S_3^*(x)
\approx1.1752P_0+1.1036P_1+0.3578P_2+0.0705P_3.
$$

展开为单项式形式：

$$
\boxed{
S_3^*(x)
\approx0.1761x^3+0.5367x^2+0.9980x+0.9963
}.
$$

正交基形式便于求系数，单项式形式便于直接代入计算；两者表示的是同一个多项式。

### 例 4：一般区间上的变量代换

求 $e^x$ 在 $[-2,0]$ 上的最佳三次平方逼近。把区间映射到 $[-1,1]$：

$$
x=\frac{b-a}{2}t+\frac{b+a}{2}=t-1,
\qquad t=x+1.
$$

于是改为逼近

$$
g(t)=e^{t-1},
\qquad t\in[-1,1].
$$

利用 Legendre 基计算得

$$
\widetilde S_3^*(t)
\approx0.0648t^3+0.1974t^2+0.3671t+0.3665.
$$

代回 $t=x+1$：

$$
\boxed{
S_3^*(x)
\approx0.0648x^3+0.3918x^2+0.9564x+0.9959
}.
$$

一般地，将 $[a,b]$ 映射到 $[-1,1]$ 可使用

$$
x=\frac{b-a}{2}t+\frac{b+a}{2},
\qquad
t=\frac{2x-a-b}{b-a}.
$$

## 8. Chebyshev 多项式

### 8.1 定义与性质

在 $[-1,1]$ 上取权函数

$$
\rho(x)=\frac1{\sqrt{1-x^2}},
$$

得到 Chebyshev 多项式

$$
\boxed{T_n(x)=\cos(n\arccos x)}.
$$

令 $x=\cos\theta$，就有

$$
T_n(x)=\cos(n\theta).
$$

前几个多项式为

$$
T_0=1,
\quad T_1=x,
\quad T_2=2x^2-1,
\quad T_3=4x^3-3x.
$$

继续递推可得

$$
T_4(x)=8x^4-8x^2+1,
$$

$$
T_5(x)=16x^5-20x^3+5x,
$$

$$
T_6(x)=32x^6-48x^4+18x^2-1.
$$

递推关系为

$$
T_{n+1}(x)=2xT_n(x)-T_{n-1}(x).
$$

其证明直接来自三角恒等式

$$
\cos[(n+1)\theta]+\cos[(n-1)\theta]
=2\cos\theta\cos(n\theta).
$$

令 $x=\cos\theta$ 即得到递推关系。

当 $n\ge1$ 时，$T_n$ 的首项系数为 $2^{n-1}$。其带权正交关系为

$$
\int_{-1}^1\frac{T_n(x)T_m(x)}{\sqrt{1-x^2}}\,dx
=
\begin{cases}
0,&m\ne n,\\
\pi,&m=n=0,\\
\pi/2,&m=n\ne0.
\end{cases}
$$

此外，$T_{2k}$ 只含 $x$ 的偶次幂，$T_{2k+1}$ 只含 $x$ 的奇次幂，等价地

$$
T_n(-x)=(-1)^nT_n(x).
$$

$T_n$ 的 $n$ 个零点为

$$
x_k=\cos\frac{(2k-1)\pi}{2n},
\qquad k=1,2,\ldots,n,
$$

极值点为

$$
\widetilde x_k=\cos\frac{k\pi}{n},
\qquad k=0,1,\ldots,n.
$$

在这些极值点上，$T_n$ 依次取 $+1,-1,+1,\ldots$，这正是交错结构的来源。

### 8.2 首一多项式的最小最大模性质

对 $n\ge1$，

$$
\widetilde T_n(x)=\frac1{2^{n-1}}T_n(x)
$$

是首一 $n$ 次多项式，并且在所有首一 $n$ 次多项式中，其无穷范数最小：

$$
\boxed{
\min_{\substack{p\text{ 首一}\\\deg p=n}}
\|p\|_\infty
=\left\|\frac1{2^{n-1}}T_n\right\|_\infty
=\frac1{2^{n-1}}.
}
$$

#### 定理证明

首先，因为 $|T_n(x)|\le1$，所以

$$
\left\|\frac1{2^{n-1}}T_n\right\|_\infty
=\frac1{2^{n-1}}.
$$

又因为 $2^{1-n}T_n(x)$ 是首一多项式，可写成

$$
\frac1{2^{n-1}}T_n(x)=x^n-q_{n-1}(x),
\qquad q_{n-1}\in H_{n-1}.
$$

求首一 $n$ 次多项式与零函数的最佳一致逼近，等价于在 $H_{n-1}$ 中寻找 $x^n$ 的最佳一致逼近。$T_n$ 在 $n+1$ 个极值点

$$
\widetilde x_k=\cos\frac{k\pi}{n},
\qquad k=0,1,\ldots,n
$$

依次取 $(-1)^k$，故误差

$$
x^n-q_{n-1}(x)=\frac1{2^{n-1}}T_n(x)
$$

在 $n+1$ 个点上等幅交错。由 Chebyshev 交错定理，$q_{n-1}$ 是 $x^n$ 的最佳一致逼近，因此 $2^{1-n}T_n$ 是与零的偏差最小的首一 $n$ 次多项式。

### 例 5：三次多项式的二次最佳一致逼近

设

$$
f(x)=c_0+c_1x+c_2x^2+c_3x^3,
\qquad c_3\ne0,
$$

求其在 $[-1,1]$ 上的二次最佳一致逼近。

对任意二次多项式 $p_2$，误差 $f-p_2$ 的三次项系数固定为 $c_3$。由于

$$
T_3(x)=4x^3-3x,
$$

首项为 $c_3x^3$ 且最大模最小的三次误差应取

$$
f(x)-p_2^*(x)=\frac{c_3}{4}T_3(x)
=c_3x^3-\frac{3c_3}{4}x.
$$

因此

$$
\boxed{
p_2^*(x)
=c_0+\left(c_1+\frac{3c_3}{4}\right)x+c_2x^2
}.
$$

最小最大误差为

$$
\boxed{E_2=\frac{|c_3|}{4}}.
$$

### 8.3 Chebyshev 节点与插值误差

Lagrange 插值余项包含节点多项式

$$
\omega_{n+1}(x)=\prod_{i=0}^n(x-x_i).
$$

若把节点选为 $T_{n+1}$ 的 $n+1$ 个零点，则

$$
\omega_{n+1}(x)=\frac1{2^n}T_{n+1}(x),
$$

它在所有首一 $n+1$ 次多项式中最大模最小。若

$$
M_{n+1}=\max_{-1\le x\le1}|f^{(n+1)}(x)|,
$$

则插值误差满足

$$
\boxed{
\|f-L_n\|_\infty
\le\frac{M_{n+1}}{2^n(n+1)!}
}.
$$

这解释了为什么 Chebyshev 节点比等距节点更适合高次插值：它们在端点附近更密集，能够压低节点多项式的最大值，从而缓解 Runge 现象。

#### 误差界的推导

由 Lagrange 余项，任意节点下都有

$$
R_n(x)=f(x)-L_n(x)
=\frac{f^{(n+1)}(\xi_x)}{(n+1)!}\omega_{n+1}(x),
$$

所以

$$
\|f-L_n\|_\infty
\le\frac{M_{n+1}}{(n+1)!}
\|\omega_{n+1}\|_\infty.
$$

$\omega_{n+1}$ 是首一 $n+1$ 次多项式。上一节的定理说明，在所有这样的多项式中

$$
\frac1{2^n}T_{n+1}(x)
$$

的无穷范数最小，最小值为 $2^{-n}$。当 $x_0,\ldots,x_n$ 取为 $T_{n+1}$ 的零点时，恰有

$$
\omega_{n+1}(x)=\frac1{2^n}T_{n+1}(x),
$$

从而得到 PPT 中的误差界。对一般区间 $[a,b]$，可先通过线性变量代换映射到 $[-1,1]$。

## 9. Hermite 多项式（选学）

在 $(-\infty,\infty)$ 上取权函数 $\rho(x)=e^{-x^2}$，得到 Hermite 多项式

$$
H_n(x)=(-1)^ne^{x^2}\frac{d^n}{dx^n}e^{-x^2}.
$$

$H_n$ 的首项系数为 $2^n$。前几个 Hermite 多项式为

$$
H_0(x)=1,
\qquad H_1(x)=2x,
$$

$$
H_2(x)=4x^2-2,
\qquad H_3(x)=8x^3-12x,
$$

$$
H_4(x)=16x^4-48x^2+12,
$$

$$
H_5(x)=32x^5-160x^3+120x,
$$

$$
H_6(x)=64x^6-480x^4+720x^2-120.
$$

其递推关系为

$$
H_{n+1}(x)=2xH_n(x)-2nH_{n-1}(x),
$$

并满足

$$
\int_{-\infty}^{\infty}H_n(x)H_m(x)e^{-x^2}\,dx
=
\begin{cases}
0,&m\ne n,\\
\sqrt\pi\,2^nn!,&m=n.
\end{cases}
$$

注意这里的 Hermite 多项式是一个正交多项式族，不要与前面“同时插函数值和导数值”的 Hermite 插值混淆。

由于它们在高斯权 $e^{-x^2}$ 下正交，Hermite 多项式常用于无穷区间上的函数展开和 Gauss--Hermite 求积。PPT 还指出，Hermite 多项式也可作为神经网络激活函数的一组基。

## 10. 曲线拟合的最小二乘法

### 10.1 离散最小二乘问题

给定 $m+1$ 个数据点

$$
(x_i,y_i),
\qquad i=0,1,\ldots,m,
$$

在函数族

$$
\Phi=\operatorname{span}
\{\varphi_0,\varphi_1,\ldots,\varphi_n\},
\qquad n<m,
$$

中寻找

$$
S(x)=\sum_{j=0}^na_j\varphi_j(x),
$$

使它在离散数据点上尽量接近 $y_i$。记残差向量

$$
\delta=(\delta_0,\delta_1,\ldots,\delta_m)^T,
\qquad
\delta_i=S(x_i)-y_i.
$$

“尽量接近”可以采用不同度量：

$$
\|\delta\|_\infty
=\max_{0\le i\le m}|S(x_i)-y_i|,
$$

$$
\|\delta\|_1
=\sum_{i=0}^m|S(x_i)-y_i|,
$$

$$
\|\delta\|_2^2
=\sum_{i=0}^m|S(x_i)-y_i|^2.
$$

最小化无穷范数通常求解较复杂；绝对值和在零点处不可导；平方和连续可导，并能导出线性法方程，因此最小二乘法最常用。

使加权残差平方和最小：

$$
\boxed{
\sum_{i=0}^mw_i[S(x_i)-y_i]^2
=\min,
\qquad w_i>0.
}
$$

权重可以反映数据可靠程度：可靠数据取较大权重，不可靠数据取较小权重。

定义离散带权内积

$$
\langle f,g\rangle_d
=\sum_{i=0}^mw_if(x_i)g(x_i).
$$

法方程仍为

$$
\boxed{
\sum_{j=0}^n
\langle\varphi_k,\varphi_j\rangle_d a_j
=\langle y,\varphi_k\rangle_d,
\qquad k=0,1,\ldots,n.
}
$$

连续最佳平方逼近与离散最小二乘在形式上完全一致，只是前者用积分内积，后者用加权求和内积。

写成矩阵形式，设设计矩阵

$$
A_{ij}=\varphi_j(x_i),
\qquad
W=\operatorname{diag}(w_0,\ldots,w_m),
$$

则目标为 $\|W^{1/2}(Aa-y)\|_2^2$，法方程为

$$
\boxed{A^TWAa=A^TWy}.
$$

其中 $G=A^TWA$ 就是离散 Gram 矩阵。

### 10.2 Haar 条件

若 $\varphi_0,\ldots,\varphi_n$ 的任意非零线性组合在数据点中至多有 $n$ 个零点，则称它们满足 Haar 条件。此时 Gram 矩阵非奇异，法方程有唯一解。

对多项式基

$$
1,x,\ldots,x^n,
$$

只要至少有 $n+1$ 个不同的数据横坐标，Haar 条件自然成立。

### 例 6：用单项式基拟合二次多项式

给定数据

| $x_i$ | 0 | 0.25 | 0.50 | 0.75 | 1.00 |
| ---: | ---: | ---: | ---: | ---: | ---: |
| $y_i$ | 1.0000 | 1.2840 | 1.6487 | 2.1170 | 2.7183 |

设

$$
p_2(x)=a_0+a_1x+a_2x^2,
$$

并取 $w_i=1$。所需离散内积为

$$
\sum1=5,
\quad \sum x_i=2.5,
\quad \sum x_i^2=1.875,
$$

$$
\sum x_i^3=1.5625,
\quad \sum x_i^4=1.3828125.
$$

右端为

$$
\sum y_i=8.768,
\quad
\sum x_iy_i=5.4514,
\quad
\sum x_i^2y_i=4.4015375.
$$

于是法方程为

$$
\begin{bmatrix}
5&2.5&1.875\\
2.5&1.875&1.5625\\
1.875&1.5625&1.3828125
\end{bmatrix}
\begin{bmatrix}a_0\\a_1\\a_2\end{bmatrix}
=
\begin{bmatrix}
8.768\\5.4514\\4.4015375
\end{bmatrix}.
$$

解得

$$
a_0\approx1.0051,
\qquad a_1\approx0.8642,
\qquad a_2\approx0.8437.
$$

故二次最小二乘拟合多项式为

$$
\boxed{
p_2(x)\approx1.0051+0.8642x+0.8437x^2
}.
$$

拟合多项式通常不会逐点穿过全部数据，因为它优化的是所有残差平方和，而不是强制每个残差为零。

## 11. 离散正交多项式

给定节点集 $\{x_i\}_{i=0}^m$ 和正权 $\{w_i\}_{i=0}^m$。若多项式族 $\{\varphi_k\}_{k=0}^n$ 满足

$$
\sum_{i=0}^mw_i\varphi_k(x_i)\varphi_j(x_i)
=
\begin{cases}
0,&k\ne j,\\
A_k>0,&k=j,
\end{cases}
$$

则称它们关于该离散点集带权正交。若 $\varphi_k$ 的首项系数非零且次数为 $k$，它们构成离散正交多项式族。

使用离散正交基后，法方程解耦，且残差平方和可直接写成

$$
\boxed{
\|\delta\|_2^2
=\|y\|_d^2
-\sum_{k=0}^n
\frac{\langle y,\varphi_k\rangle_d^2}
{\langle\varphi_k,\varphi_k\rangle_d}
}.
$$

### 11.1 三项递推构造

为避免求解耦合的法方程，可在数据点集上构造离散正交多项式：

$$
\varphi_0(x)=1,
\qquad
\varphi_1(x)=x-\alpha_0,
$$

$$
\varphi_{k+1}(x)
=(x-\alpha_k)\varphi_k(x)
-\beta_k\varphi_{k-1}(x),
$$

其中

$$
\alpha_k=
\frac{\langle x\varphi_k,\varphi_k\rangle_d}
{\langle\varphi_k,\varphi_k\rangle_d},
$$

$$
\beta_k=
\frac{\langle\varphi_k,\varphi_k\rangle_d}
{\langle\varphi_{k-1},\varphi_{k-1}\rangle_d}.
$$

在正交基下，拟合系数直接为

$$
a_k^*=
\frac{\langle y,\varphi_k\rangle_d}
{\langle\varphi_k,\varphi_k\rangle_d}.
$$

### 例 7：用离散正交基重新计算例 6

对同一组数据，先有

$$
\langle\varphi_0,\varphi_0\rangle_d=5,
\qquad
\alpha_0=\frac{\sum x_i}{5}=0.5,
$$

所以

$$
\varphi_1(x)=x-0.5.
$$

继续计算：

$$
\langle\varphi_1,\varphi_1\rangle_d
=\sum_{i=0}^4(x_i-0.5)^2=0.625,
$$

$$
\beta_1=\frac{0.625}{5}=0.125,
\qquad
\alpha_1=0.5.
$$

因此

$$
\varphi_2(x)
=(x-0.5)^2-0.125
=x^2-x+0.125.
$$

还需要

$$
\langle\varphi_2,\varphi_2\rangle_d
=0.0546875,
$$

以及

$$
\langle y,\varphi_0\rangle_d=8.768,
\quad
\langle y,\varphi_1\rangle_d=1.0674,
\quad
\langle y,\varphi_2\rangle_d=0.0461375.
$$

故

$$
a_0^*=\frac{8.768}{5}=1.7536,
$$

$$
a_1^*=\frac{1.0674}{0.625}=1.70784,
$$

$$
a_2^*=\frac{0.0461375}{0.0546875}
\approx0.84365714.
$$

正交基形式为

$$
p_2^*(x)
=1.7536
+1.70784(x-0.5)
+0.84365714(x^2-x+0.125).
$$

展开后

$$
\boxed{
p_2^*(x)
\approx1.0051+0.8642x+0.8437x^2
}.
$$

它与直接解法方程得到的结果一致，但正交基把系数计算完全解耦，数值上通常也更加稳定。

在 Python 中可用 `numpy.polyfit(x, y, 2)` 完成同样的二次最小二乘拟合。该函数返回的系数按降幂排列，即大致为

```python
array([0.84365714, 0.86418286, 1.00513714])
```

## 12. 三类“最佳”的总结

| 方法 | 优化目标 | 典型判据/方程 | 适用场景 |
| --- | --- | --- | --- |
| 最佳一致逼近 | 最小化最大误差 $\|f-p\|_\infty$ | Chebyshev 等幅交错 | 对最坏误差有严格要求 |
| 最佳平方逼近 | 最小化积分平方误差 | 残差与逼近空间正交 | 已知完整函数，重视总体误差 |
| 离散最小二乘拟合 | 最小化数据残差平方和 | 离散法方程 | 数据带噪声且点数多于参数数目 |

需要特别记住：

1. “最佳”必须先说明使用哪一种范数；
2. 最佳一致逼近追求最坏点的误差最小，其误差呈等幅交错；
3. 最佳平方逼近是函数空间中的正交投影；
4. 正交基不会改变逼近空间，却能显著简化系数计算；
5. 连续最佳平方逼近与离散最小二乘的核心结构相同，区别只是内积由积分变为加权求和。
