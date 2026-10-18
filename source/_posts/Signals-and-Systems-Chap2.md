---
title: Signals and Systems Chapter-2
date: 2026-09-29 18:57:45
updated: 2026-10-18
math: true
categories:
  - Signals and Systems
tags:
  - Signal Processing
  - LTI Systems
  - Discrete-Time Convolution
  - Continuous-Time Convolution
  - Differential Equations
  - Difference Equations
  - Block Diagrams
  - Singularity Functions
description: Signals and Systems Course Notes (Chapter-2)
index_img: /img/LTIConvolution.png
---

## 2. LINEAR TIME-INVARIANT SYSTEMS

### 2.0 Introduction

::: {.bi-pair}
::: {.bi-en lang="en"}
The analysis of a linear time-invariant system begins by representing an input as a linear combination of basic signals. Suppose
:::

::: {.bi-zh lang="zh-CN"}
线性时不变系统的分析首先把输入表示为基本信号的线性组合。设
:::
:::

$$
x[n]=\sum_k a_k\phi_k[n]
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
and the response of a linear system $\mathcal S$ to each basic signal is known:
:::

::: {.bi-zh lang="zh-CN"}
并且已知线性系统 $\mathcal S$ 对每个基本信号的响应：
:::
:::

$$
\mathcal S\{\phi_k[n]\}=\psi_k[n].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Linearity then gives
:::

::: {.bi-zh lang="zh-CN"}
由线性性可得
:::
:::

$$
y[n]=\mathcal S\{x[n]\}
=\sum_k a_k\psi_k[n].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For a discrete-time LTI system, shifted unit impulses form the most useful set of basic signals. Every sequence can be decomposed into shifted impulses, and time invariance determines the response to every shift from a single function, the unit impulse response. This leads directly to the convolution sum.

Convolution also appears in convolutional neural networks. In most deep-learning libraries, however, the operation called convolution is implemented as cross-correlation because the kernel is not reversed. The distinction is explained in Section 2.1.11.
:::

::: {.bi-zh lang="zh-CN"}
对于离散时间 LTI 系统，移位单位冲激是最有用的一组基本信号。任意序列都可以分解为移位冲激，而时不变性能够由单个函数——单位冲激响应——确定系统对任意移位冲激的响应。这直接导出卷积和。

卷积也出现在卷积神经网络中。然而在多数深度学习库里，名为“卷积”的运算实际实现的是互相关，因为核没有反转。二者的区别见第 2.1.11 节。
:::
:::

### 2.1 DT LTI Systems and Convolution Sum

#### 2.1.1 Representation of DT Signals by Impulses

::: {.bi-pair}
::: {.bi-en lang="en"}
The discrete-time unit impulse is
:::

::: {.bi-zh lang="zh-CN"}
离散时间单位冲激为
:::
:::

$$
\delta[n]=
\begin{cases}
1,&n=0,\\
0,&n\ne0.
\end{cases}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Its sampling property is
:::

::: {.bi-zh lang="zh-CN"}
其采样性质为
:::
:::

$$
x[n]\delta[n-n_0]=x[n_0]\delta[n-n_0].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Therefore, every discrete-time signal can be expanded as
:::

::: {.bi-zh lang="zh-CN"}
因此，任意离散时间信号都可以展开为
:::
:::

$$
\boxed{x[n]=\sum_{k=-\infty}^{\infty}x[k]\delta[n-k]}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Each $\delta[n-k]$ is nonzero only at $n=k$, and its coefficient is the sample value $x[k]$. Thus, the shifted impulses act as basis sequences and the samples $x[k]$ act as coordinates.

For example,
:::

::: {.bi-zh lang="zh-CN"}
每个 $\delta[n-k]$ 仅在 $n=k$ 时非零，其系数就是采样值 $x[k]$。因此，移位冲激相当于基序列，而样本 $x[k]$ 相当于坐标。

例如，
:::
:::

$$
\begin{aligned}
x[n]={}&\cdots+x[-2]\delta[n+2]+x[-1]\delta[n+1]
+x[0]\delta[n]\\
&+x[1]\delta[n-1]+x[2]\delta[n-2]+\cdots.
\end{aligned}
$$

#### 2.1.2 Impulse Response and the Convolution Sum

::: {.bi-pair}
::: {.bi-en lang="en"}
Let $\mathcal S$ be a discrete-time LTI system. Its unit impulse response is
:::

::: {.bi-zh lang="zh-CN"}
设 $\mathcal S$ 为离散时间 LTI 系统，其单位冲激响应为
:::
:::

$$
h[n]=\mathcal S\{\delta[n]\}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Time invariance implies
:::

::: {.bi-zh lang="zh-CN"}
由时不变性可得
:::
:::

$$
\mathcal S\{\delta[n-k]\}=h[n-k].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Applying the system to the impulse expansion of $x[n]$ and using linearity gives
:::

::: {.bi-zh lang="zh-CN"}
把系统作用于 $x[n]$ 的冲激展开式，并利用线性性，得到
:::
:::

$$
\begin{aligned}
y[n]
&=\mathcal S\left\{\sum_{k=-\infty}^{\infty}x[k]\delta[n-k]\right\}\\
&=\sum_{k=-\infty}^{\infty}x[k]\mathcal S\{\delta[n-k]\}\\
&=\sum_{k=-\infty}^{\infty}x[k]h[n-k].
\end{aligned}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The convolution sum is therefore defined by
:::

::: {.bi-zh lang="zh-CN"}
因此，卷积和定义为
:::
:::

$$
\boxed{
y[n]=(x*h)[n]
=\sum_{k=-\infty}^{\infty}x[k]h[n-k]
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
An LTI system is fully characterized by its impulse response. Once $h[n]$ is known, the output for any admissible input follows from convolution.
:::

::: {.bi-zh lang="zh-CN"}
一个 LTI 系统完全由其冲激响应表征。一旦知道 $h[n]$，任意容许输入的输出都可由卷积得到。
:::
:::

#### 2.1.3 Impulse Responses of Simple LTI Systems

::: {.bi-pair}
::: {.bi-en lang="en"}

| System | Input-output relation | Impulse response |
| --- | --- | --- |
| Identity | $y[n]=x[n]$ | $h[n]=\delta[n]$ |
| Scalar multiplication | $y[n]=Kx[n]$ | $h[n]=K\delta[n]$ |
| Time shift | $y[n]=x[n-n_0]$ | $h[n]=\delta[n-n_0]$ |
| Accumulator | $y[n]=\displaystyle\sum_{k=-\infty}^{n}x[k]$ | $h[n]=u[n]$ |
| First-order difference | $y[n]=x[n]-x[n-1]$ | $h[n]=\delta[n]-\delta[n-1]$ |

These examples provide a useful shortcut: the impulse response can often be found by substituting $x[n]=\delta[n]$ directly into the system equation.
:::

::: {.bi-zh lang="zh-CN"}

| 系统 | 输入—输出关系 | 冲激响应 |
| --- | --- | --- |
| 恒等系统 | $y[n]=x[n]$ | $h[n]=\delta[n]$ |
| 标量乘法 | $y[n]=Kx[n]$ | $h[n]=K\delta[n]$ |
| 时间移位 | $y[n]=x[n-n_0]$ | $h[n]=\delta[n-n_0]$ |
| 累加器 | $y[n]=\displaystyle\sum_{k=-\infty}^{n}x[k]$ | $h[n]=u[n]$ |
| 一阶差分 | $y[n]=x[n]-x[n-1]$ | $h[n]=\delta[n]-\delta[n-1]$ |

这些例子提供了一个实用捷径：通常只需在系统方程中直接代入 $x[n]=\delta[n]$，就能求出冲激响应。
:::
:::

#### 2.1.4 Existence and Absolute Convergence

::: {.bi-pair}
::: {.bi-en lang="en"}
The convolution of two arbitrary sequences does not always exist. For each fixed $n$, the series
:::

::: {.bi-zh lang="zh-CN"}
任意两个序列的卷积并不总是存在。对于每个固定的 $n$，级数
:::
:::

$$
\sum_{k=-\infty}^{\infty}x_1[k]x_2[n-k]
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
must converge. Absolute convergence,
:::

::: {.bi-zh lang="zh-CN"}
必须收敛。绝对收敛条件
:::
:::

$$
\sum_{k=-\infty}^{\infty}
\left|x_1[k]x_2[n-k]\right|<\infty,
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
is a convenient sufficient condition.

For example, let
:::

::: {.bi-zh lang="zh-CN"}
是一个方便的充分条件。

例如，令
:::
:::

$$
x_1[n]=u[n],\qquad x_2[n]=u[-n].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Then $x_2[n-k]=u[k-n]$, so the product remains equal to one for infinitely many $k$. The sum diverges for every $n$.

Common sufficient conditions include:

- At least one sequence has finite support.
- Both sequences are right-sided. For each fixed $n$, only finitely many indices can satisfy both lower bounds.
- Both sequences are left-sided. The analogous upper-bound argument applies.
- One sequence belongs to $\ell^1$ and the other belongs to $\ell^p$, where $1\le p\le\infty$. Young's inequality gives

  $$
  \|x_1*x_2\|_p\le \|x_1\|_1\|x_2\|_p.
  $$

The support of a sequence is
:::

::: {.bi-zh lang="zh-CN"}
于是 $x_2[n-k]=u[k-n]$，乘积会在无穷多个 $k$ 上保持为 1，因此该求和对每个 $n$ 都发散。

常用的充分条件包括：

- 至少有一个序列具有有限支撑。
- 两个序列都是右边序列。对每个固定的 $n$，同时满足两个下界的索引只有有限个。
- 两个序列都是左边序列，此时可使用类似的上界论证。
- 一个序列属于 $\ell^1$，另一个属于 $\ell^p$，其中 $1\le p\le\infty$。Young 不等式给出

  $$
  \|x_1*x_2\|_p\le \|x_1\|_1\|x_2\|_p.
  $$

序列的支撑定义为
:::
:::

$$
\operatorname{supp}(x)=\{n:x[n]\ne0\}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
If $x_1[n]$ is supported on $[a,b]$ and $x_2[n]$ is supported on $[c,d]$, then
:::

::: {.bi-zh lang="zh-CN"}
若 $x_1[n]$ 的支撑为 $[a,b]$，$x_2[n]$ 的支撑为 $[c,d]$，则
:::
:::

$$
\operatorname{supp}(x_1*x_2)\subseteq[a+c,b+d].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
If the endpoint samples are nonzero, the output support is exactly $[a+c,b+d]$. Hence, sequences of lengths $L_1$ and $L_2$ normally produce a sequence of length $L_1+L_2-1$.
:::

::: {.bi-zh lang="zh-CN"}
若端点样本非零，则输出支撑恰好为 $[a+c,b+d]$。因此，长度分别为 $L_1$ 和 $L_2$ 的序列通常产生长度为 $L_1+L_2-1$ 的序列。
:::
:::

#### 2.1.5 Graphical Calculation of Convolution

::: {.bi-pair}
::: {.bi-en lang="en"}
For
:::

::: {.bi-zh lang="zh-CN"}
对于
:::
:::

$$
y[n]=\sum_{k=-\infty}^{\infty}x_1[k]x_2[n-k],
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
treat $n$ as a fixed parameter and $k$ as the running variable.

1. Express both sequences as functions of $k$: $x_1[k]$ and $x_2[k]$.
2. Reverse the second sequence to obtain $x_2[-k]$.
3. Shift the reversed sequence by $n$ to obtain $x_2[n-k]$.
4. Multiply the overlapping samples to form

   $$
   g_n[k]=x_1[k]x_2[n-k].
   $$

5. Sum the product over $k$:

   $$
   y[n]=\sum_{k=-\infty}^{\infty}g_n[k].
   $$

6. Repeat for every required value of $n$.

The reversal occurs with respect to the dummy variable $k$. A common mistake is to shift $x_2[k]$ without reversing it first.

For finite-support sequences, the summation limits can be obtained from the overlap conditions. If
:::

::: {.bi-zh lang="zh-CN"}
把 $n$ 看作固定参数，把 $k$ 看作运行变量。

1. 将两个序列都写成 $k$ 的函数：$x_1[k]$ 和 $x_2[k]$。
2. 反转第二个序列，得到 $x_2[-k]$。
3. 将反转后的序列平移 $n$，得到 $x_2[n-k]$。
4. 将重叠的样本相乘，形成

   $$
   g_n[k]=x_1[k]x_2[n-k].
   $$

5. 对 $k$ 求和：

   $$
   y[n]=\sum_{k=-\infty}^{\infty}g_n[k].
   $$

6. 对每个所需的 $n$ 重复上述过程。

反转是相对于虚变量 $k$ 进行的。常见错误是没有先反转，就直接平移 $x_2[k]$。

对于有限支撑序列，可以由重叠条件确定求和范围。若
:::
:::

$$
x_1[k]\ne0\quad\text{for }a\le k\le b
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
and
:::

::: {.bi-zh lang="zh-CN"}
并且
:::
:::

$$
x_2[m]\ne0\quad\text{for }c\le m\le d,
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
then $x_2[n-k]$ is nonzero when
:::

::: {.bi-zh lang="zh-CN"}
则当以下条件成立时，$x_2[n-k]$ 非零：
:::
:::

$$
n-d\le k\le n-c.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Thus,
:::

::: {.bi-zh lang="zh-CN"}
因此，
:::
:::

$$
y[n]=\sum_{k=\max(a,n-d)}^{\min(b,n-c)}
x_1[k]x_2[n-k],
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
provided that the lower limit does not exceed the upper limit.
:::

::: {.bi-zh lang="zh-CN"}
前提是下限不超过上限。
:::
:::

#### 2.1.6 Example: Superposition of Shifted Impulse Responses

::: {.bi-pair}
::: {.bi-en lang="en"}
Suppose
:::

::: {.bi-zh lang="zh-CN"}
设
:::
:::

$$
h[n]=\delta[n]+\delta[n-1]+\delta[n-2]
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
and
:::

::: {.bi-zh lang="zh-CN"}
并且
:::
:::

$$
x[n]=0.5\delta[n]+2\delta[n-1].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The input contains two shifted impulses, so the output is the corresponding weighted sum of shifted impulse responses:
:::

::: {.bi-zh lang="zh-CN"}
输入包含两个移位冲激，因此输出是对应移位冲激响应的加权和：
:::
:::

$$
\begin{aligned}
y[n]
&=0.5h[n]+2h[n-1]\\
&=0.5\delta[n]+2.5\delta[n-1]
+2.5\delta[n-2]+2\delta[n-3].
\end{aligned}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
This example illustrates the physical meaning of convolution: every input sample generates a shifted copy of $h[n]$, and the output adds all copies after weighting them by the input samples.
:::

::: {.bi-zh lang="zh-CN"}
该例说明了卷积的物理含义：每个输入样本都会生成一份移位后的 $h[n]$，输出则把所有副本按照相应输入样本加权后相加。
:::
:::

#### 2.1.7 Example: Rectangular Sequence Convolved with a Truncated Exponential

::: {.bi-pair}
::: {.bi-en lang="en"}
Consider
:::

::: {.bi-zh lang="zh-CN"}
考虑
:::
:::

$$
x[n]=
\begin{cases}
1,&0\le n\le4,\\
0,&\text{otherwise},
\end{cases}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
and
:::

::: {.bi-zh lang="zh-CN"}
以及
:::
:::

$$
h[n]=
\begin{cases}
\alpha^n,&0\le n\le6,\\
0,&\text{otherwise},
\end{cases}
\qquad \alpha>1.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The support of the output is $0\le n\le10$. Using $j=n-k$ gives
:::

::: {.bi-zh lang="zh-CN"}
输出支撑为 $0\le n\le10$。令 $j=n-k$，得到
:::
:::

$$
y[n]=\sum_{j=\max(0,n-4)}^{\min(6,n)}\alpha^j.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The amount of overlap changes at $n=0,4,6,$ and $10$, which produces five cases:
:::

::: {.bi-zh lang="zh-CN"}
重叠量在 $n=0,4,6,10$ 处发生变化，因此产生五种情况：
:::
:::

$$
y[n]=
\begin{cases}
0,&n<0,\\[2mm]
\displaystyle\frac{\alpha^{n+1}-1}{\alpha-1},
&0\le n\le4,\\[3mm]
\displaystyle\alpha^{n-4}\frac{\alpha^5-1}{\alpha-1},
&4<n\le6,\\[3mm]
\displaystyle\frac{\alpha^7-\alpha^{n-4}}{\alpha-1},
&6<n\le10,\\[3mm]
0,&n>10.
\end{cases}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The graphical and analytic methods give the same boundaries. The graphical method makes the overlap visible, while the analytic method converts the overlap into inequalities on the summation index.
:::

::: {.bi-zh lang="zh-CN"}
图解法和解析法得到相同的分段边界。图解法直观显示重叠区域，解析法则把重叠转化为求和索引的不等式。
:::
:::

#### 2.1.8 Example: Convolution by Impulse Algebra

::: {.bi-pair}
::: {.bi-en lang="en"}
Let
:::

::: {.bi-zh lang="zh-CN"}
令
:::
:::

$$
x_1[n]=u[n+2]-u[n-1]
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
and
:::

::: {.bi-zh lang="zh-CN"}
并且
:::
:::

$$
x_2[n]=2^n\bigl(\delta[n]+\delta[n-1]+\delta[n-2]\bigr).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
First rewrite the sequences as weighted impulses:
:::

::: {.bi-zh lang="zh-CN"}
首先把序列改写为加权冲激：
:::
:::

$$
x_1[n]=\delta[n+2]+\delta[n+1]+\delta[n],
$$

$$
x_2[n]=\delta[n]+2\delta[n-1]+4\delta[n-2].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Using
:::

::: {.bi-zh lang="zh-CN"}
利用
:::
:::

$$
\delta[n-n_1]*\delta[n-n_2]
=\delta[n-n_1-n_2],
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
and collecting impulses at the same index gives
:::

::: {.bi-zh lang="zh-CN"}
并合并同一索引处的冲激，得到
:::
:::

$$
\boxed{
x_1[n]*x_2[n]
=\delta[n+2]+3\delta[n+1]+7\delta[n]
+6\delta[n-1]+4\delta[n-2]
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
This multiplication-table approach is convenient for short finite sequences but becomes inefficient for long or infinite sequences.
:::

::: {.bi-zh lang="zh-CN"}
这种乘法表方法适合较短的有限序列，但对于长序列或无限序列效率很低。
:::
:::

#### 2.1.9 Algebraic Properties of the Convolution Sum

##### Commutative Property

$$
x_1[n]*x_2[n]=x_2[n]*x_1[n].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Starting from the definition and substituting $m=n-k$,
:::

::: {.bi-zh lang="zh-CN"}
从定义出发，并作变量代换 $m=n-k$，
:::
:::

$$
\begin{aligned}
(x_1*x_2)[n]
&=\sum_{k=-\infty}^{\infty}x_1[k]x_2[n-k]\\
&=\sum_{m=-\infty}^{\infty}x_2[m]x_1[n-m]\\
&=(x_2*x_1)[n].
\end{aligned}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Therefore,
:::

::: {.bi-zh lang="zh-CN"}
因此，
:::
:::

$$
y[n]=x[n]*h[n]=h[n]*x[n].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The input and impulse response play symmetric mathematical roles, even though their physical interpretations differ.
:::

::: {.bi-zh lang="zh-CN"}
输入和冲激响应在数学上具有对称地位，尽管它们的物理含义不同。
:::
:::

##### Distributive Property

$$
x_1[n]*\bigl(x_2[n]+x_3[n]\bigr)
=x_1[n]*x_2[n]+x_1[n]*x_3[n].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For LTI systems, a parallel connection with impulse responses $h_1[n]$ and $h_2[n]$ has the equivalent impulse response
:::

::: {.bi-zh lang="zh-CN"}
对于 LTI 系统，冲激响应分别为 $h_1[n]$ 和 $h_2[n]$ 的并联系统，其等效冲激响应为
:::
:::

$$
h[n]=h_1[n]+h_2[n].
$$

##### Associative Property

::: {.bi-pair}
::: {.bi-en lang="en"}
Under conditions that permit the sums to be rearranged,
:::

::: {.bi-zh lang="zh-CN"}
在允许重新排列求和次序的条件下，
:::
:::

$$
\bigl(x_1[n]*x_2[n]\bigr)*x_3[n]
=x_1[n]*\bigl(x_2[n]*x_3[n]\bigr).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Consequently, a cascade of LTI systems with impulse responses $h_1[n]$ and $h_2[n]$ has
:::

::: {.bi-zh lang="zh-CN"}
因此，冲激响应分别为 $h_1[n]$ 和 $h_2[n]$ 的 LTI 级联系统具有
:::
:::

$$
h[n]=h_1[n]*h_2[n].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Commutativity also shows that the order of two well-defined LTI stages does not change the overall response.

Associativity requires care when infinite sums are not absolutely convergent. Consider
:::

::: {.bi-zh lang="zh-CN"}
交换律还表明，两个卷积定义良好的 LTI 环节调换顺序不会改变总响应。

当无限和不绝对收敛时，使用结合律必须谨慎。考虑
:::
:::

$$
x_1[n]=1,qquad
x_2[n]=u[n],qquad
x_3[n]=\delta[n]-\delta[n-1].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Since $x_2*x_3=\delta$, one grouping gives
:::

::: {.bi-zh lang="zh-CN"}
由于 $x_2*x_3=\delta$，一种分组方式给出
:::
:::

$$
x_1*(x_2*x_3)=1.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
However, $x_1*x_2$ is undefined. In another grouping, $x_1*x_3=0$, so
:::

::: {.bi-zh lang="zh-CN"}
然而，$x_1*x_2$ 没有定义。采用另一种分组时，$x_1*x_3=0$，所以
:::
:::

$$
(x_1*x_3)*x_2=0.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
This does not contradict associativity because the required convergence conditions fail. Useful sufficient conditions include:

- At least two of the three sequences have finite support.
- All three sequences are right-sided, or all three are left-sided.
- Two sequences belong to $\ell^1$ and the remaining sequence belongs to $\ell^p$, where $1\le p\le\infty$.

In the last case,
:::

::: {.bi-zh lang="zh-CN"}
这并不违背结合律，因为所需的收敛条件没有满足。常用的充分条件包括：

- 三个序列中至少两个具有有限支撑。
- 三个序列都是右边序列，或者都是左边序列。
- 两个序列属于 $\ell^1$，其余一个属于 $\ell^p$，其中 $1\le p\le\infty$。

在最后一种情况下，
:::
:::

$$
\|x_1*x_2*x_3\|_p
\le\|x_1\|_1\|x_2\|_1\|x_3\|_p.
$$

##### Identity Element

::: {.bi-pair}
::: {.bi-en lang="en"}
The unit impulse is the identity element for convolution:
:::

::: {.bi-zh lang="zh-CN"}
单位冲激是卷积的单位元：
:::
:::

$$
x[n]*\delta[n]=\delta[n]*x[n]=x[n].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
More generally,
:::

::: {.bi-zh lang="zh-CN"}
更一般地，
:::
:::

$$
x[n]*\delta[n-n_0]=x[n-n_0].
$$

##### Bilinearity

::: {.bi-pair}
::: {.bi-en lang="en"}
Convolution is linear in each argument. In particular,
:::

::: {.bi-zh lang="zh-CN"}
卷积对每个自变量都是线性的。特别地，
:::
:::

$$
x_1[n]*\bigl(Kx_2[n]\bigr)
=K\bigl(x_1[n]*x_2[n]\bigr).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For linear combinations,
:::

::: {.bi-zh lang="zh-CN"}
对于线性组合，
:::
:::

$$
\left(\sum_i a_i x_{1,i}[n]\right)
*
\left(\sum_j b_j x_{2,j}[n]\right)
=\sum_i\sum_j a_i b_j
\bigl(x_{1,i}[n]*x_{2,j}[n]\bigr).
$$

#### 2.1.10 Shift, Difference, and Accumulation Properties

##### Time Shift Property

::: {.bi-pair}
::: {.bi-en lang="en"}
If
:::

::: {.bi-zh lang="zh-CN"}
若
:::
:::

$$
f[n]=x_1[n]*x_2[n],
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
then
:::

::: {.bi-zh lang="zh-CN"}
则
:::
:::

$$
x_1[n-a]*x_2[n-b]=f[n-a-b].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
This follows from
:::

::: {.bi-zh lang="zh-CN"}
这是因为
:::
:::

$$
x[n-a]=x[n]*\delta[n-a]
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
and
:::

::: {.bi-zh lang="zh-CN"}
以及
:::
:::

$$
\delta[n-a]*\delta[n-b]=\delta[n-a-b].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Two cascaded delays therefore add:
:::

::: {.bi-zh lang="zh-CN"}
因此，两个级联延迟的延迟量相加：
:::
:::

$$
x[n]*\delta[n-n_1]*\delta[n-n_2]
=x[n-(n_1+n_2)].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For an LTI system with $x*h=y$,
:::

::: {.bi-zh lang="zh-CN"}
对于满足 $x*h=y$ 的 LTI 系统，
:::
:::

$$
x[n-n_0]*h[n]
=x[n]*h[n-n_0]
=y[n-n_0].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
This equation is also a direct expression of time invariance.
:::

::: {.bi-zh lang="zh-CN"}
该方程也是时不变性的直接表达。
:::
:::

##### Difference Property

::: {.bi-pair}
::: {.bi-en lang="en"}
Define the first-difference operator by
:::

::: {.bi-zh lang="zh-CN"}
定义一阶差分算子为
:::
:::

$$
\Delta x[n]=x[n]-x[n-1].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Since
:::

::: {.bi-zh lang="zh-CN"}
由于
:::
:::

$$
\Delta\delta[n]=\delta[n]-\delta[n-1],
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
the difference system has impulse response $\Delta\delta[n]$. Associativity and commutativity give
:::

::: {.bi-zh lang="zh-CN"}
差分系统的冲激响应为 $\Delta\delta[n]$。由结合律和交换律可得
:::
:::

$$
\boxed{
\Delta(x*h)
=(\Delta x)*h
=x*(\Delta h)
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Thus, the first difference can be applied before or after an LTI system, provided that all convolutions are well-defined.
:::

::: {.bi-zh lang="zh-CN"}
因此，只要所有卷积都有定义，一阶差分既可以在 LTI 系统之前进行，也可以在之后进行。
:::
:::

##### Accumulation Property

::: {.bi-pair}
::: {.bi-en lang="en"}
The accumulator has impulse response $u[n]$ because
:::

::: {.bi-zh lang="zh-CN"}
累加器的冲激响应为 $u[n]$，因为
:::
:::

$$
x[n]*u[n]=\sum_{k=-\infty}^{n}x[k].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Therefore,
:::

::: {.bi-zh lang="zh-CN"}
所以，
:::
:::

$$
\boxed{
\sum_{k=-\infty}^{n}(x*h)[k]
=x[n]*\left(\sum_{k=-\infty}^{n}h[k]\right)
=\left(\sum_{k=-\infty}^{n}x[k]\right)*h[n]
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Accumulation can be moved from the output to either input of a convolution, subject to convergence.
:::

::: {.bi-zh lang="zh-CN"}
在满足收敛条件时，可以把累加运算从卷积输出移到任意一个输入上。
:::
:::

#### 2.1.11 Frequently Used Convolution Results

::: {.bi-pair}
::: {.bi-en lang="en"}
The following identities are useful in exercises.
:::

::: {.bi-zh lang="zh-CN"}
以下恒等式在习题中很有用。
:::
:::

##### Two Unit Steps

$$
u[n]*u[n]
=\sum_{k=0}^{n}1
=(n+1)u[n].
$$

##### A Right-Sided Exponential and a Unit Step

::: {.bi-pair}
::: {.bi-en lang="en"}
For $a\ne1$,
:::

::: {.bi-zh lang="zh-CN"}
当 $a\ne1$ 时，
:::
:::

$$
\begin{aligned}
a^n u[n]*u[n]
&=\sum_{k=0}^{n}a^k\\
&=\frac{1-a^{n+1}}{1-a}u[n].
\end{aligned}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
When $a=1$, the result reduces to $(n+1)u[n]$.
:::

::: {.bi-zh lang="zh-CN"}
当 $a=1$ 时，结果退化为 $(n+1)u[n]$。
:::
:::

##### Two Identical Right-Sided Exponentials

$$
\begin{aligned}
a^n u[n]*a^n u[n]
&=\sum_{k=0}^{n}a^k a^{n-k}\\
&=(n+1)a^n u[n].
\end{aligned}
$$

##### Two Different Right-Sided Exponentials

::: {.bi-pair}
::: {.bi-en lang="en"}
For $a\ne b$,
:::

::: {.bi-zh lang="zh-CN"}
当 $a\ne b$ 时，
:::
:::

$$
\begin{aligned}
a^n u[n]*b^n u[n]
&=\sum_{k=0}^{n}a^k b^{n-k}\\
&=\frac{b^{n+1}-a^{n+1}}{b-a}u[n].
\end{aligned}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
As $b\to a$, this expression approaches $(n+1)a^n u[n]$.
:::

::: {.bi-zh lang="zh-CN"}
当 $b\to a$ 时，该表达式趋于 $(n+1)a^n u[n]$。
:::
:::

#### 2.1.12 Convolution and Cross-Correlation in CNNs

::: {.bi-pair}
::: {.bi-en lang="en"}
Let a one-dimensional kernel be
:::

::: {.bi-zh lang="zh-CN"}
设一维卷积核为
:::
:::

$$
W=[w_{-1},w_0,w_1].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
A common neural-network layer computes
:::

::: {.bi-zh lang="zh-CN"}
常见的神经网络层计算
:::
:::

$$
y[n_0]
=w_{-1}x[n_0-1]+w_0x[n_0]+w_1x[n_0+1]
=\sum_{k=-1}^{1}w_kx[n_0+k].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Because the kernel index appears as $n_0+k$, this operation is cross-correlation rather than convolution with the kernel values in their displayed order. It can still be written as a conventional convolution by defining
:::

::: {.bi-zh lang="zh-CN"}
由于核索引写成 $n_0+k$，该运算相对于核的显示顺序是互相关，而不是卷积。定义
:::
:::

$$
h[n]
=w_{-1}\delta[n-1]+w_0\delta[n]+w_1\delta[n+1]
=\sum_{k=-1}^{1}w_k\delta[n+k].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Then
:::

::: {.bi-zh lang="zh-CN"}
仍可把它写成常规卷积：
:::
:::

$$
y[n]=(x*h)[n].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The reversal is usually immaterial during neural-network training because the kernel coefficients are learned. In signal processing, however, convolution and cross-correlation should be distinguished because a fixed asymmetric kernel produces different outputs under the two definitions.
:::

::: {.bi-zh lang="zh-CN"}
在神经网络训练中，核系数由学习得到，所以反转通常无关紧要。但在信号处理中必须区分卷积和互相关，因为对于固定的非对称核，两种定义会产生不同输出。
:::
:::

#### 2.1.13 Key Points

::: {.bi-pair}
::: {.bi-en lang="en"}
- Shifted impulses provide a complete representation of a discrete-time signal.
- The impulse response completely characterizes a discrete-time LTI system.
- The output of an LTI system is $y[n]=x[n]*h[n]$.
- Graphical convolution consists of reversal, shifting, multiplication, and summation.
- Support intervals determine the possible output interval and the correct summation limits.
- Convolution is commutative, distributive, bilinear, and conditionally associative.
- A shifted impulse implements a delay, $\Delta\delta[n]$ implements first difference, and $u[n]$ implements accumulation.
- Infinite sums require convergence checks before algebraic rearrangements are used.
:::

::: {.bi-zh lang="zh-CN"}
- 移位冲激能够完整表示离散时间信号。
- 冲激响应完全表征离散时间 LTI 系统。
- LTI 系统的输出为 $y[n]=x[n]*h[n]$。
- 图解卷积包括反转、移位、相乘和求和。
- 支撑区间决定可能的输出区间以及正确的求和上下限。
- 卷积满足交换律、分配律、双线性，并在适当条件下满足结合律。
- 移位冲激实现延迟，$\Delta\delta[n]$ 实现一阶差分，$u[n]$ 实现累加。
- 对无限和进行代数重排之前必须检查收敛性。
:::
:::

### 2.2 CT LTI Systems and Convolution Integral

#### 2.2.1 Representation of CT Signals by Impulses

::: {.bi-pair}
::: {.bi-en lang="en"}
The continuous-time impulse representation can be motivated by a rectangular approximation. Define
:::

::: {.bi-zh lang="zh-CN"}
连续时间冲激表示可以由矩形近似引出。定义
:::
:::

$$
\delta_\Delta(t)=
\begin{cases}
\dfrac{1}{\Delta},&0\le t\le\Delta,\\
0,&\text{otherwise}.
\end{cases}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The function has unit area and approaches a Dirac impulse as $\Delta\to0$. A continuous-time signal can be approximated by shifted pulses:
:::

::: {.bi-zh lang="zh-CN"}
该函数的面积为 1，并在 $\Delta\to0$ 时趋于 Dirac 冲激。连续时间信号可以用移位脉冲近似：
:::
:::

$$
x(t)\approx\sum_{k=-\infty}^{\infty}
x(k\Delta)\delta_\Delta(t-k\Delta)\Delta.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Taking the limit converts the Riemann sum into an integral:
:::

::: {.bi-zh lang="zh-CN"}
取极限后，Riemann 和变为积分：
:::
:::

$$
\boxed{
x(t)=\int_{-\infty}^{\infty}x(\tau)\delta(t-\tau)d\tau
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The shifted impulses $\delta(t-\tau)$ act as basic signals, and $x(\tau)d\tau$ supplies their infinitesimal weights.
:::

::: {.bi-zh lang="zh-CN"}
移位冲激 $\delta(t-\tau)$ 充当基本信号，$x(\tau)d\tau$ 提供其无穷小权重。
:::
:::

#### 2.2.2 Impulse Response and the Convolution Integral

::: {.bi-pair}
::: {.bi-en lang="en"}
Let $\mathcal S$ be a continuous-time LTI system with impulse response
:::

::: {.bi-zh lang="zh-CN"}
设 $\mathcal S$ 为连续时间 LTI 系统，其冲激响应为
:::
:::

$$
h(t)=\mathcal S\{\delta(t)\}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Time invariance gives
:::

::: {.bi-zh lang="zh-CN"}
由时不变性可得
:::
:::

$$
\mathcal S\{\delta(t-\tau)\}=h(t-\tau).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Applying linearity to the impulse representation produces
:::

::: {.bi-zh lang="zh-CN"}
对冲激表示应用线性性，得到
:::
:::

$$
\begin{aligned}
y(t)
&=\mathcal S\left\{\int_{-\infty}^{\infty}
x(\tau)\delta(t-\tau)d\tau\right\}\\
&=\int_{-\infty}^{\infty}x(\tau)h(t-\tau)d\tau.
\end{aligned}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Therefore,
:::

::: {.bi-zh lang="zh-CN"}
因此，
:::
:::

$$
\boxed{
y(t)=(x*h)(t)
=\int_{-\infty}^{\infty}x(\tau)h(t-\tau)d\tau
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The impulse response completely characterizes a continuous-time LTI system under the usual conditions that make the integral and interchange of limits well-defined.
:::

::: {.bi-zh lang="zh-CN"}
在使积分以及极限交换有定义的通常条件下，冲激响应完全表征连续时间 LTI 系统。
:::
:::

#### 2.2.3 Impulse Responses of Simple CT LTI Systems

::: {.bi-pair}
::: {.bi-en lang="en"}

| System | Input-output relation | Impulse response |
| --- | --- | --- |
| Identity | $y(t)=x(t)$ | $h(t)=\delta(t)$ |
| Scalar multiplication | $y(t)=Kx(t)$ | $h(t)=K\delta(t)$ |
| Time shift | $y(t)=x(t-t_0)$ | $h(t)=\delta(t-t_0)$ |
| Integrator | $y(t)=\displaystyle\int_{-\infty}^{t}x(\tau)d\tau$ | $h(t)=u(t)$ |
| Differentiator | $y(t)=\dfrac{dx(t)}{dt}$ | $h(t)=\delta'(t)$ |

The integrator and differentiator form an inverse pair because
:::

::: {.bi-zh lang="zh-CN"}

| 系统 | 输入—输出关系 | 冲激响应 |
| --- | --- | --- |
| 恒等系统 | $y(t)=x(t)$ | $h(t)=\delta(t)$ |
| 标量乘法 | $y(t)=Kx(t)$ | $h(t)=K\delta(t)$ |
| 时间移位 | $y(t)=x(t-t_0)$ | $h(t)=\delta(t-t_0)$ |
| 积分器 | $y(t)=\displaystyle\int_{-\infty}^{t}x(\tau)d\tau$ | $h(t)=u(t)$ |
| 微分器 | $y(t)=\dfrac{dx(t)}{dt}$ | $h(t)=\delta'(t)$ |

积分器和微分器互为逆系统，因为
:::
:::

$$
u(t)*\delta'(t)=\delta(t).
$$

#### 2.2.4 Existence and Absolute Convergence

::: {.bi-pair}
::: {.bi-en lang="en"}
The convolution integral does not necessarily exist for arbitrary signals. For each fixed $t$, a convenient sufficient condition is
:::

::: {.bi-zh lang="zh-CN"}
任意信号的卷积积分并不一定存在。对于每个固定的 $t$，一个方便的充分条件是
:::
:::

$$
\int_{-\infty}^{\infty}
\left|x_1(\tau)x_2(t-\tau)\right|d\tau<\infty.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For example,
:::

::: {.bi-zh lang="zh-CN"}
例如，
:::
:::

$$
x_1(t)=u(t),\qquad x_2(t)=u(-t)
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
give an infinite overlap interval, so the convolution integral diverges for every $t$.

Common sufficient conditions include:

- At least one signal has compact support.
- Both signals are right-sided.
- Both signals are left-sided.
- One signal belongs to $L^1$ and the other belongs to $L^p$, where $1\le p\le\infty$.

If $x_1(t)$ is supported on $[a,b]$ and $x_2(t)$ is supported on $[c,d]$, then
:::

::: {.bi-zh lang="zh-CN"}
具有无限长的重叠区间，因此卷积积分对每个 $t$ 都发散。

常用的充分条件包括：

- 至少有一个信号具有紧支撑。
- 两个信号都是右边信号。
- 两个信号都是左边信号。
- 一个信号属于 $L^1$，另一个属于 $L^p$，其中 $1\le p\le\infty$。

若 $x_1(t)$ 的支撑为 $[a,b]$，$x_2(t)$ 的支撑为 $[c,d]$，则
:::
:::

$$
\operatorname{supp}(x_1*x_2)\subseteq[a+c,b+d].
$$

#### 2.2.5 Graphical Calculation of CT Convolution

::: {.bi-pair}
::: {.bi-en lang="en"}
For
:::

::: {.bi-zh lang="zh-CN"}
对于
:::
:::

$$
y(t)=\int_{-\infty}^{\infty}x_1(\tau)x_2(t-\tau)d\tau,
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
treat $t$ as fixed and $\tau$ as the integration variable.

1. Plot $x_1(\tau)$ and $x_2(\tau)$.
2. Reverse the second signal to obtain $x_2(-\tau)$.
3. Shift it by $t$ to obtain $x_2(t-\tau)$.
4. Multiply the overlapping portions.
5. Integrate the product over $\tau$.
6. Repeat as $t$ moves through each distinct overlap region.

If $x_1(\tau)$ is supported on $[a,b]$ and $x_2(t)$ is supported on $[c,d]$, then
:::

::: {.bi-zh lang="zh-CN"}
把 $t$ 看作固定参数，把 $\tau$ 看作积分变量。

1. 绘制 $x_1(\tau)$ 和 $x_2(\tau)$。
2. 反转第二个信号，得到 $x_2(-\tau)$。
3. 将其平移 $t$，得到 $x_2(t-\tau)$。
4. 将重叠部分相乘。
5. 对乘积关于 $\tau$ 积分。
6. 随着 $t$ 经过各个不同的重叠区间，重复上述过程。

若 $x_1(\tau)$ 的支撑为 $[a,b]$，$x_2(t)$ 的支撑为 $[c,d]$，则
:::
:::

$$
x_2(t-\tau)\ne0
\quad\Longleftrightarrow\quad
t-d\le\tau\le t-c.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The effective limits are therefore
:::

::: {.bi-zh lang="zh-CN"}
所以有效积分上下限为
:::
:::

$$
\max(a,t-d)\le\tau\le\min(b,t-c).
$$

#### 2.2.6 Example: Rectangular Pulse and Truncated Ramp

::: {.bi-pair}
::: {.bi-en lang="en"}
Let
:::

::: {.bi-zh lang="zh-CN"}
令
:::
:::

$$
x(t)=
\begin{cases}
1,&0\le t\le T,\\
0,&\text{otherwise},
\end{cases}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
and
:::

::: {.bi-zh lang="zh-CN"}
并令
:::
:::

$$
h(t)=
\begin{cases}
t,&0\le t\le2T,\\
0,&\text{otherwise}.
\end{cases}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The integrand equals $t-\tau$ wherever $[0,T]$ overlaps $[t-2T,t]$. The output support is $[0,3T]$. Evaluating the integral in each overlap region gives
:::

::: {.bi-zh lang="zh-CN"}
在 $[0,T]$ 与 $[t-2T,t]$ 重叠的位置，被积函数等于 $t-\tau$。输出支撑为 $[0,3T]$。在每个重叠区间计算积分，得到
:::
:::

$$
y(t)=
\begin{cases}
0,&t<0,\\[1mm]
\dfrac{1}{2}t^2,&0\le t\le T,\\[2mm]
tT-\dfrac{1}{2}T^2,&T<t\le2T,\\[2mm]
-\dfrac{1}{2}t^2+tT+\dfrac{3}{2}T^2,&2T<t\le3T,\\[2mm]
0,&t>3T.
\end{cases}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The formulas agree at the boundaries. The output rises quadratically, then linearly, and finally decreases quadratically to zero as the overlap disappears.
:::

::: {.bi-zh lang="zh-CN"}
各段公式在边界处相互一致。随着重叠出现和消失，输出先按二次曲线上升，再线性变化，最后按二次曲线下降到零。
:::
:::

#### 2.2.7 Convolution of Rectangular Pulses

::: {.bi-pair}
::: {.bi-en lang="en"}
Define
:::

::: {.bi-zh lang="zh-CN"}
定义
:::
:::

$$
p_T(t)=
\begin{cases}
1,&|t|\le T,\\
0,&\text{otherwise}.
\end{cases}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The convolution of two identical pulses equals the overlap length:
:::

::: {.bi-zh lang="zh-CN"}
两个相同脉冲的卷积等于其重叠长度：
:::
:::

$$
(p_T*p_T)(t)=
\begin{cases}
2T-|t|,&|t|\le2T,\\
0,&|t|>2T.
\end{cases}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For widths $2T_1$ and $2T_2$, assume $T_2\ge T_1$. The result is a trapezoid:
:::

::: {.bi-zh lang="zh-CN"}
对于宽度分别为 $2T_1$ 和 $2T_2$ 的脉冲，设 $T_2\ge T_1$，结果是梯形：
:::
:::

$$
(p_{T_1}*p_{T_2})(t)=
\begin{cases}
0,&|t|>T_1+T_2,\\
T_1+T_2-|t|,&T_2-T_1<|t|\le T_1+T_2,\\
2T_1,&|t|\le T_2-T_1.
\end{cases}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
When $T_1=T_2$, the flat region disappears and the trapezoid becomes a triangle.
:::

::: {.bi-zh lang="zh-CN"}
当 $T_1=T_2$ 时，平坦区消失，梯形退化为三角形。
:::
:::

#### 2.2.8 Algebraic and Calculus Properties

::: {.bi-pair}
::: {.bi-en lang="en"}
The commutative, distributive, associative, identity, bilinear, and time-shift properties have the same forms as in discrete time:
:::

::: {.bi-zh lang="zh-CN"}
交换律、分配律、结合律、单位元、双线性和时间移位性质与离散时间情形具有相同形式：
:::
:::

$$
x_1*x_2=x_2*x_1,
$$

$$
x_1*(x_2+x_3)=x_1*x_2+x_1*x_3,
$$

$$
(x_1*x_2)*x_3=x_1*(x_2*x_3),
$$

$$
x*\delta=x,
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
and, if $f=x_1*x_2$,
:::

::: {.bi-zh lang="zh-CN"}
并且，若 $f=x_1*x_2$，则
:::
:::

$$
x_1(t-a)*x_2(t-b)=f(t-a-b).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Associativity requires convergence conditions that justify changing the order of integration. For example, at least two compactly supported signals, three signals with the same sidedness, or two $L^1$ signals and one $L^p$ signal provide useful sufficient conditions.

Differentiation can be applied to either convolution factor:
:::

::: {.bi-zh lang="zh-CN"}
结合律要求满足允许改变积分次序的收敛条件。例如，至少两个信号具有紧支撑、三个信号具有相同的单边性，或者两个 $L^1$ 信号和一个 $L^p$ 信号，都是常用的充分条件。

微分可以作用于卷积的任一因子：
:::
:::

$$
\boxed{
\frac{d}{dt}(x*h)
=\frac{dx}{dt}*h
=x*\frac{dh}{dt}
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Likewise, integration can be moved to either factor:
:::

::: {.bi-zh lang="zh-CN"}
同样，积分也可以移到任一因子上：
:::
:::

$$
\boxed{
\int_{-\infty}^{t}(x*h)(\lambda)d\lambda
=\left(\int_{-\infty}^{t}x(\tau)d\tau\right)*h(t)
=x(t)*\left(\int_{-\infty}^{t}h(\tau)d\tau\right)
}.
$$

#### 2.2.9 Frequently Used CT Convolution Results

::: {.bi-pair}
::: {.bi-en lang="en"}
For $a>0$, $\alpha>0$, $\beta>0$, and $\alpha\ne\beta$,
:::

::: {.bi-zh lang="zh-CN"}
对于 $a>0$、$\alpha>0$、$\beta>0$ 且 $\alpha\ne\beta$，
:::
:::

$$
u(t)*u(t)=t\,u(t),
$$

$$
e^{-at}u(t)*u(t)
=\frac{1-e^{-at}}{a}u(t),
$$

$$
\sin(\omega t)u(t)*u(t)
=\frac{1-\cos(\omega t)}{\omega}u(t),
$$

$$
e^{-at}u(t)*e^{-at}u(t)
=t e^{-at}u(t),
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
and
:::

::: {.bi-zh lang="zh-CN"}
并且
:::
:::

$$
e^{-\alpha t}u(t)*e^{-\beta t}u(t)
=\frac{e^{-\alpha t}-e^{-\beta t}}{\beta-\alpha}u(t).
$$

#### 2.2.10 Additional Impulse Properties

::: {.bi-pair}
::: {.bi-en lang="en"}
The continuous-time and discrete-time impulses are even:
:::

::: {.bi-zh lang="zh-CN"}
连续时间冲激和离散时间冲激都是偶函数：
:::
:::

$$
\delta(-t)=\delta(t),\qquad \delta[-n]=\delta[n].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Their step relations are
:::

::: {.bi-zh lang="zh-CN"}
它们与阶跃的关系为
:::
:::

$$
u(t)=\int_{-\infty}^{t}\delta(\tau)d\tau,
\qquad
\frac{du(t)}{dt}=\delta(t),
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
and
:::

::: {.bi-zh lang="zh-CN"}
以及
:::
:::

$$
u[n]=\sum_{k=-\infty}^{n}\delta[k],
\qquad
u[n]-u[n-1]=\delta[n].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The multiplication and sifting properties are
:::

::: {.bi-zh lang="zh-CN"}
乘法与筛选性质为
:::
:::

$$
x(t)\delta(t-t_0)=x(t_0)\delta(t-t_0),
$$

$$
\int_{-\infty}^{\infty}x(\tau)\delta(t-\tau)d\tau=x(t).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For $a\ne0$, the CT scaling property is
:::

::: {.bi-zh lang="zh-CN"}
对于 $a\ne0$，连续时间缩放性质为
:::
:::

$$
\boxed{\delta(at)=\frac{1}{|a|}\delta(t)}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For a nonzero integer $M$,
:::

::: {.bi-zh lang="zh-CN"}
对于非零整数 $M$，
:::
:::

$$
\delta[Mn]=\delta[n]
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
because both sequences are nonzero only at $n=0$.
:::

::: {.bi-zh lang="zh-CN"}
因为两个序列都只在 $n=0$ 时非零。
:::
:::

### 2.3 Properties of LTI Systems

#### 2.3.1 Memory

::: {.bi-pair}
::: {.bi-en lang="en"}
An LTI system is memoryless only when its impulse response is concentrated at the origin:
:::

::: {.bi-zh lang="zh-CN"}
只有当冲激响应集中在原点时，LTI 系统才是无记忆的：
:::
:::

$$
\boxed{
h[n]=K\delta[n]
}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
or
:::

::: {.bi-zh lang="zh-CN"}
或者
:::
:::

$$
\boxed{
h(t)=K\delta(t)
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The corresponding input-output relation is scalar multiplication:
:::

::: {.bi-zh lang="zh-CN"}
相应的输入—输出关系是标量乘法：
:::
:::

$$
y[n]=Kx[n]
\qquad\text{or}\qquad
y(t)=Kx(t).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Every other LTI impulse response uses input values away from the current time and therefore introduces memory.
:::

::: {.bi-zh lang="zh-CN"}
其他所有 LTI 冲激响应都会使用当前时刻以外的输入值，因此会引入记忆。
:::
:::

#### 2.3.2 Invertibility

::: {.bi-pair}
::: {.bi-en lang="en"}
If an LTI system with impulse response $h$ has an LTI inverse with impulse response $h^{-1}$, their cascade must equal the identity system:
:::

::: {.bi-zh lang="zh-CN"}
若冲激响应为 $h$ 的 LTI 系统具有冲激响应为 $h^{-1}$ 的 LTI 逆系统，则二者级联必须等于恒等系统：
:::
:::

$$
h[n]*h^{-1}[n]=\delta[n]
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
or
:::

::: {.bi-zh lang="zh-CN"}
或者
:::
:::

$$
h(t)*h^{-1}(t)=\delta(t).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
This condition must be used together with the convergence and associativity conditions needed for the cascade.

The discrete-time accumulator and first-order difference system form an inverse pair:
:::

::: {.bi-zh lang="zh-CN"}
使用该条件时，还必须同时满足级联所需的收敛条件和结合律条件。

离散时间累加器与一阶差分系统互为逆系统：
:::
:::

$$
h[n]=u[n],
\qquad
h^{-1}[n]=\delta[n]-\delta[n-1].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Similarly, the CT integrator and differentiator have
:::

::: {.bi-zh lang="zh-CN"}
类似地，连续时间积分器和微分器满足
:::
:::

$$
h(t)=u(t),
\qquad
h^{-1}(t)=\delta'(t).
$$

#### 2.3.3 Causality

::: {.bi-pair}
::: {.bi-en lang="en"}
A discrete-time LTI system is causal if and only if
:::

::: {.bi-zh lang="zh-CN"}
离散时间 LTI 系统是因果的，当且仅当
:::
:::

$$
\boxed{h[n]=0\quad\text{for all }n<0}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For a causal system, the convolution sum becomes
:::

::: {.bi-zh lang="zh-CN"}
对于因果系统，卷积和可写成
:::
:::

$$
y[n]=\sum_{k=-\infty}^{n}x[k]h[n-k].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
A continuous-time LTI system is causal if and only if
:::

::: {.bi-zh lang="zh-CN"}
连续时间 LTI 系统是因果的，当且仅当
:::
:::

$$
\boxed{h(t)=0\quad\text{for all }t<0}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Its convolution integral can then be written as
:::

::: {.bi-zh lang="zh-CN"}
其卷积积分于是可以写成
:::
:::

$$
y(t)=\int_{-\infty}^{t}x(\tau)h(t-\tau)d\tau.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
These formulas show directly that the output at the current time uses only present and past input values.
:::

::: {.bi-zh lang="zh-CN"}
这些公式直接表明，当前时刻的输出只使用当前和过去的输入值。
:::
:::

#### 2.3.4 BIBO Stability

::: {.bi-pair}
::: {.bi-en lang="en"}
A discrete-time LTI system is BIBO stable if and only if its impulse response is absolutely summable:
:::

::: {.bi-zh lang="zh-CN"}
离散时间 LTI 系统 BIBO 稳定，当且仅当其冲激响应绝对可和：
:::
:::

$$
\boxed{
\sum_{k=-\infty}^{\infty}|h[k]|<\infty
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
If $|x[n]|\le B$, then
:::

::: {.bi-zh lang="zh-CN"}
若 $|x[n]|\le B$，则
:::
:::

$$
\begin{aligned}
|y[n]|
&\le\sum_{k=-\infty}^{\infty}|x[k]||h[n-k]|\\
&\le B\sum_{k=-\infty}^{\infty}|h[k]|.
\end{aligned}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The CT condition is absolute integrability:
:::

::: {.bi-zh lang="zh-CN"}
连续时间条件是绝对可积：
:::
:::

$$
\boxed{
\int_{-\infty}^{\infty}|h(\tau)|d\tau<\infty
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For $|x(t)|\le B$,
:::

::: {.bi-zh lang="zh-CN"}
对于 $|x(t)|\le B$，
:::
:::

$$
|y(t)|
\le B\int_{-\infty}^{\infty}|h(\tau)|d\tau.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The bound is independent of time, so every bounded input produces a bounded output.
:::

::: {.bi-zh lang="zh-CN"}
该上界与时间无关，所以每个有界输入都会产生有界输出。
:::
:::

#### 2.3.5 Unit Step Response

::: {.bi-pair}
::: {.bi-en lang="en"}
The unit step response of a discrete-time LTI system is
:::

::: {.bi-zh lang="zh-CN"}
离散时间 LTI 系统的单位阶跃响应为
:::
:::

$$
s[n]=u[n]*h[n]
=\sum_{k=-\infty}^{n}h[k].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The impulse response follows by first difference:
:::

::: {.bi-zh lang="zh-CN"}
对其作一阶差分即可得到冲激响应：
:::
:::

$$
\boxed{h[n]=s[n]-s[n-1]}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For a continuous-time LTI system,
:::

::: {.bi-zh lang="zh-CN"}
对于连续时间 LTI 系统，
:::
:::

$$
s(t)=u(t)*h(t)
=\int_{-\infty}^{t}h(\tau)d\tau,
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
so
:::

::: {.bi-zh lang="zh-CN"}
所以
:::
:::

$$
\boxed{h(t)=\frac{ds(t)}{dt}}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The step response and impulse response therefore contain the same system information, related by accumulation and differentiation.
:::

::: {.bi-zh lang="zh-CN"}
因此，阶跃响应和冲激响应包含相同的系统信息，二者通过累加与微分相联系。
:::
:::

### 2.4 Causal LTI Systems Described by Differential and Difference Equations

#### 2.4.1 Linear Constant-Coefficient Differential Equations

::: {.bi-pair}
::: {.bi-en lang="en"}
A continuous-time system can be described implicitly by an $N$th-order linear constant-coefficient differential equation (LCCDE):
:::

::: {.bi-zh lang="zh-CN"}
连续时间系统可以由一个 $N$ 阶线性常系数微分方程（LCCDE）隐式描述：
:::
:::

$$
\boxed{
\sum_{k=0}^{N}a_k\frac{d^k y(t)}{dt^k}
=\sum_{k=0}^{M}b_k\frac{d^k x(t)}{dt^k}
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The equation alone does not specify a unique output. An $N$th-order equation normally requires $N$ auxiliary conditions, such as
:::

::: {.bi-zh lang="zh-CN"}
仅有该方程不能唯一确定输出。$N$ 阶方程通常需要 $N$ 个辅助条件，例如
:::
:::

$$
y(0^+),\ y'(0^+),\ldots,y^{(N-1)}(0^+).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
With constant coefficients and initial rest, the equation defines a causal LTI system for right-sided inputs. Nonzero initial conditions must be treated as an additional source of response.
:::

::: {.bi-zh lang="zh-CN"}
在常系数和初始静止条件下，该方程为右边输入定义了一个因果 LTI 系统。非零初始条件必须视为额外的响应来源。
:::
:::

#### 2.4.2 RLC Circuit Example

::: {.bi-pair}
::: {.bi-en lang="en"}
For a parallel RLC circuit with voltage $v(t)$ and source current $i_s(t)$,
:::

::: {.bi-zh lang="zh-CN"}
对于电压为 $v(t)$、源电流为 $i_s(t)$ 的并联 RLC 电路，
:::
:::

$$
i_R(t)=\frac{1}{R}v(t),
$$

$$
i_L(t)=\frac{1}{L}\int_{-\infty}^{t}v(\tau)d\tau,
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
and
:::

::: {.bi-zh lang="zh-CN"}
并且
:::
:::

$$
i_C(t)=C\frac{dv(t)}{dt}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Kirchhoff's current law gives
:::

::: {.bi-zh lang="zh-CN"}
由 Kirchhoff 电流定律可得
:::
:::

$$
i_R(t)+i_L(t)+i_C(t)=i_s(t).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Differentiating produces the second-order LCCDE
:::

::: {.bi-zh lang="zh-CN"}
对其求导，得到二阶 LCCDE：
:::
:::

$$
\boxed{
C\frac{d^2v(t)}{dt^2}
+\frac{1}{R}\frac{dv(t)}{dt}
+\frac{1}{L}v(t)
=\frac{di_s(t)}{dt}
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The order reflects the two independent energy-storage elements, the inductor and capacitor.
:::

::: {.bi-zh lang="zh-CN"}
方程阶数对应两个独立的储能元件：电感器和电容器。
:::
:::

#### 2.4.3 First-Order Equation and Initial Condition

::: {.bi-pair}
::: {.bi-en lang="en"}
Consider
:::

::: {.bi-zh lang="zh-CN"}
考虑
:::
:::

$$
y'(t)+2y(t)=x(t),
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
with
:::

::: {.bi-zh lang="zh-CN"}
并给定
:::
:::

$$
x(t)=Ke^{3t}u(t),
\qquad y(0)=y_0.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For $t>0$, the homogeneous equation has characteristic root $\lambda=-2$:
:::

::: {.bi-zh lang="zh-CN"}
对于 $t>0$，齐次方程的特征根为 $\lambda=-2$：
:::
:::

$$
y_h(t)=Ae^{-2t}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
A particular solution of the form $y_p(t)=Be^{3t}$ gives
:::

::: {.bi-zh lang="zh-CN"}
取形如 $y_p(t)=Be^{3t}$ 的特解，得到
:::
:::

$$
5Be^{3t}=Ke^{3t},
\qquad B=\frac{K}{5}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Using the initial condition,
:::

::: {.bi-zh lang="zh-CN"}
利用初始条件，
:::
:::

$$
A=y_0-\frac{K}{5}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Hence,
:::

::: {.bi-zh lang="zh-CN"}
因此，
:::
:::

$$
\boxed{
y(t)=\left(y_0-\frac{K}{5}\right)e^{-2t}
+\frac{K}{5}e^{3t},\qquad t>0
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The same result can be separated by source:
:::

::: {.bi-zh lang="zh-CN"}
同一结果还可以按响应来源分解：
:::
:::

$$
y(t)=
\underbrace{y_0e^{-2t}}_{\text{zero-input response}}
+\underbrace{\frac{K}{5}\left(e^{3t}-e^{-2t}\right)}_{\text{zero-state response}}.
$$

#### 2.4.4 Homogeneous Solution

::: {.bi-pair}
::: {.bi-en lang="en"}
For
:::

::: {.bi-zh lang="zh-CN"}
对于
:::
:::

$$
\sum_{k=0}^{N}a_k y^{(k)}(t)=f_x(t),
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
the homogeneous solution satisfies
:::

::: {.bi-zh lang="zh-CN"}
齐次解满足
:::
:::

$$
\sum_{k=0}^{N}a_k y_h^{(k)}(t)=0.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Substitution of $y_h(t)=e^{\lambda t}$ produces the characteristic equation
:::

::: {.bi-zh lang="zh-CN"}
代入 $y_h(t)=e^{\lambda t}$，得到特征方程
:::
:::

$$
\boxed{
\sum_{k=0}^{N}a_k\lambda^k=0
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
If the $N$ roots $\lambda_1,\ldots,\lambda_N$ are distinct, then
:::

::: {.bi-zh lang="zh-CN"}
若 $N$ 个根 $\lambda_1,\ldots,\lambda_N$ 互不相同，则
:::
:::

$$
y_h(t)=\sum_{i=1}^{N}A_i e^{\lambda_i t}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
If the distinct roots $\lambda_i$ have multiplicities $m_i$, with $\sum_i m_i=N$, then
:::

::: {.bi-zh lang="zh-CN"}
若不同根 $\lambda_i$ 的重数为 $m_i$，且 $\sum_i m_i=N$，则
:::
:::

$$
\boxed{
y_h(t)=\sum_{i=1}^{r}\sum_{k=1}^{m_i}
A_{ik}t^{k-1}e^{\lambda_i t}
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The roots determine the natural modes. Auxiliary conditions determine their coefficients.
:::

::: {.bi-zh lang="zh-CN"}
特征根决定自然模态，辅助条件决定各模态的系数。
:::
:::

#### 2.4.5 Particular Solution and Resonance

::: {.bi-pair}
::: {.bi-en lang="en"}
The method of undetermined coefficients selects a trial solution with the same basic form as the forcing function $f_x(t)$. Common choices are:

| Forcing term | Trial particular solution |
| --- | --- |
| Polynomial of degree $p$, with $0$ not a characteristic root | $\displaystyle\sum_{k=0}^{p}B_k t^k$ |
| Polynomial of degree $p$, with $0$ a root of multiplicity $m$ | $\displaystyle t^m\sum_{k=0}^{p}B_k t^k$ |
| $e^{at}$, with $a$ not a characteristic root | $Be^{at}$ |
| $e^{at}$, with $a$ a root of multiplicity $m$ | $Bt^m e^{at}$ |

Sinusoids follow from their complex-exponential forms:
:::

::: {.bi-zh lang="zh-CN"}
待定系数法根据强迫函数 $f_x(t)$ 的基本形式选择试探特解。常用形式为：

| 强迫项 | 试探特解 |
| --- | --- |
| $p$ 次多项式，且 $0$ 不是特征根 | $\displaystyle\sum_{k=0}^{p}B_k t^k$ |
| $p$ 次多项式，且 $0$ 是重数为 $m$ 的特征根 | $\displaystyle t^m\sum_{k=0}^{p}B_k t^k$ |
| $e^{at}$，且 $a$ 不是特征根 | $Be^{at}$ |
| $e^{at}$，且 $a$ 是重数为 $m$ 的特征根 | $Bt^m e^{at}$ |

正弦信号可由其复指数形式处理：
:::
:::

$$
\cos(\omega t)=\frac{e^{j\omega t}+e^{-j\omega t}}{2},
$$

$$
\sin(\omega t)=\frac{e^{j\omega t}-e^{-j\omega t}}{2j}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
When the forcing function contains a natural mode, the ordinary trial duplicates part of $y_h(t)$. Multiplication by $t^m$ removes this duplication. This case is often described as resonance in the algebraic solution procedure.
:::

::: {.bi-zh lang="zh-CN"}
当强迫函数包含某个自然模态时，普通试探形式会与 $y_h(t)$ 的一部分重复。乘以 $t^m$ 可以消除这种重复。在代数求解过程中，这种情况通常称为共振。
:::
:::

#### 2.4.6 Solution Procedure

::: {.bi-pair}
::: {.bi-en lang="en"}
The complete solution is
:::

::: {.bi-zh lang="zh-CN"}
完整解为
:::
:::

$$
y(t)=y_h(t)+y_p(t).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
A reliable procedure is:

1. Form the characteristic equation and determine $y_h(t)$.
2. Choose the correct trial form for $y_p(t)$, including any required factor $t^m$.
3. Substitute $y_p(t)$ into the differential equation to determine its coefficients.
4. Apply all auxiliary conditions to the complete solution.

For example,
:::

::: {.bi-zh lang="zh-CN"}
可靠的求解步骤如下：

1. 建立特征方程并求出 $y_h(t)$。
2. 为 $y_p(t)$ 选择正确的试探形式，包括必要的因子 $t^m$。
3. 将 $y_p(t)$ 代入微分方程，确定其系数。
4. 把所有辅助条件应用于完整解。

例如，
:::
:::

$$
y'(t)+2y(t)=e^{-t}u(t),
\qquad y(0^+)=2
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
has
:::

::: {.bi-zh lang="zh-CN"}
具有
:::
:::

$$
y_h(t)=Ae^{-2t},
\qquad y_p(t)=Be^{-t}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Substitution gives $B=1$, and the initial condition gives $A=1$. Thus,
:::

::: {.bi-zh lang="zh-CN"}
代入后得到 $B=1$，初始条件给出 $A=1$。因此，
:::
:::

$$
\boxed{y(t)=e^{-2t}+e^{-t},\qquad t>0}.
$$

#### 2.4.7 Example with a Repeated Forcing Mode

::: {.bi-pair}
::: {.bi-en lang="en"}
Consider
:::

::: {.bi-zh lang="zh-CN"}
考虑
:::
:::

$$
y''(t)+3y'(t)+2y(t)=x'(t)+2x(t),
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
where
:::

::: {.bi-zh lang="zh-CN"}
其中
:::
:::

$$
x(t)=e^{-t}u(t),
\qquad y(0^+)=0,
\qquad y'(0^+)=3.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For $t>0$, the right-hand side equals $e^{-t}$. The characteristic roots are $-1$ and $-2$:
:::

::: {.bi-zh lang="zh-CN"}
对于 $t>0$，右端等于 $e^{-t}$。特征根为 $-1$ 和 $-2$：
:::
:::

$$
y_h(t)=Ae^{-t}+Be^{-2t}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Because $e^{-t}$ is already a natural mode, use
:::

::: {.bi-zh lang="zh-CN"}
由于 $e^{-t}$ 已经是自然模态，应取
:::
:::

$$
y_p(t)=Ct e^{-t}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Substitution gives $C=1$. Applying the initial conditions gives $A=2$ and $B=-2$, so
:::

::: {.bi-zh lang="zh-CN"}
代入得到 $C=1$。使用初始条件得到 $A=2$、$B=-2$，所以
:::
:::

$$
\boxed{
y(t)=(t+2)e^{-t}-2e^{-2t},\qquad t\ge0
}.
$$

#### 2.4.8 Initial Rest

::: {.bi-pair}
::: {.bi-en lang="en"}
Suppose a right-sided input turns on at $t=t_0$:
:::

::: {.bi-zh lang="zh-CN"}
设右边输入在 $t=t_0$ 时接通：
:::
:::

$$
x(t)=0\qquad(t<t_0).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Under initial rest, the system has no stored energy before the input arrives, and
:::

::: {.bi-zh lang="zh-CN"}
在初始静止条件下，输入到来之前系统没有储能，并且
:::
:::

$$
y^{(k)}(t_0)=0,
\qquad k=0,1,\ldots,N-1.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For linear systems, this condition enforces causality: no input before $t_0$ produces no output before $t_0$.

For the mechanical system
:::

::: {.bi-zh lang="zh-CN"}
对于线性系统，该条件保证因果性：$t_0$ 之前没有输入，就不会有输出。

对于机械系统
:::
:::

$$
m q''(t)=f(t),
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
initial rest at $t_0$ means
:::

::: {.bi-zh lang="zh-CN"}
$t_0$ 时刻的初始静止意味着
:::
:::

$$
q(t_0)=0,
\qquad q'(t_0)=0.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For an initially relaxed RLC circuit, the inductor and capacitor store no energy. The corresponding inductor current and capacitor voltage are zero at the switching time.
:::

::: {.bi-zh lang="zh-CN"}
对于初始松弛的 RLC 电路，电感器和电容器均不储存能量，因此开关时刻的电感电流和电容电压都为零。
:::
:::

#### 2.4.9 Integrating-Factor Solution of a First-Order Equation

::: {.bi-pair}
::: {.bi-en lang="en"}
For
:::

::: {.bi-zh lang="zh-CN"}
对于
:::
:::

$$
y'(t)+ay(t)=f_x(t),
\qquad y(t_0)=y_0,
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
the integrating-factor solution is
:::

::: {.bi-zh lang="zh-CN"}
利用积分因子得到解
:::
:::

$$
\boxed{
y(t)=y_0e^{-a(t-t_0)}
+\int_{t_0}^{t}f_x(\tau)e^{-a(t-\tau)}d\tau
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The first term is the zero-input response. The integral is the zero-state response.

Under initial rest, the zero-input term vanishes. Extending the lower limit to $-\infty$ gives
:::

::: {.bi-zh lang="zh-CN"}
第一项是零输入响应，积分项是零状态响应。

在初始静止条件下，零输入项消失。把积分下限扩展到 $-\infty$，得到
:::
:::

$$
y(t)=\int_{-\infty}^{t}f_x(\tau)e^{-a(t-\tau)}d\tau.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
This is convolution with
:::

::: {.bi-zh lang="zh-CN"}
这就是与下式的卷积：
:::
:::

$$
h(t)=e^{-at}u(t).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The result connects the differential-equation description directly to the impulse-response description of a causal LTI system.
:::

::: {.bi-zh lang="zh-CN"}
该结果把微分方程描述直接联系到因果 LTI 系统的冲激响应描述。
:::
:::

#### 2.4.10 Zero-Input and Zero-State Responses

::: {.bi-pair}
::: {.bi-en lang="en"}
The complete response can be decomposed as
:::

::: {.bi-zh lang="zh-CN"}
完整响应可以分解为
:::
:::

$$
\boxed{y(t)=y_{zi}(t)+y_{zs}(t)}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
- The **zero-input response** $y_{zi}(t)$ comes from the initial state with the external input set to zero. It consists only of natural modes.
- The **zero-state response** $y_{zs}(t)$ comes from the external input with the initial state set to zero. It normally contains a particular solution and natural-mode terms required to satisfy zero-state conditions.

For distinct characteristic roots,
:::

::: {.bi-zh lang="zh-CN"}
- **零输入响应** $y_{zi}(t)$ 来自初始状态，此时外部输入置零；它只包含自然模态。
- **零状态响应** $y_{zs}(t)$ 来自外部输入，此时初始状态置零；它通常包含一个特解，以及为满足零状态条件所需的自然模态项。

当特征根互不相同时，
:::
:::

$$
y_{zi}(t)=\sum_{k=1}^{N}A_{zi,k}e^{\lambda_k t},
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
while
:::

::: {.bi-zh lang="zh-CN"}
而
:::
:::

$$
y_{zs}(t)=\sum_{k=1}^{N}A_{zs,k}e^{\lambda_k t}+y_p(t).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The natural response and forced response form a different decomposition:
:::

::: {.bi-zh lang="zh-CN"}
自然响应与强迫响应构成另一种分解：
:::
:::

$$
y(t)=
\underbrace{\sum_k A_k e^{\lambda_k t}}_{\text{natural response}}
+\underbrace{y_p(t)}_{\text{forced response}}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Therefore,
:::

::: {.bi-zh lang="zh-CN"}
因此，
:::
:::

$$
\text{natural response}
=\text{zero-input response}
+\text{natural-mode part of the zero-state response}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
These two decompositions answer different questions. Homogeneous and particular solutions describe mathematical form, while zero-input and zero-state responses identify the physical source of the output.
:::

::: {.bi-zh lang="zh-CN"}
两种分解回答不同的问题。齐次解和特解描述数学形式，而零输入响应和零状态响应标识输出的物理来源。
:::
:::

#### 2.4.11 Linearity with Initial State

::: {.bi-pair}
::: {.bi-en lang="en"}
The zero-state response is linear in the external input, and the zero-input response is linear in the initial state. When the initial state is nonzero and held fixed, the complete response is not linear as a function of the external input alone because the same zero-input term appears for every input.

For
:::

::: {.bi-zh lang="zh-CN"}
零状态响应对外部输入是线性的，零输入响应对初始状态是线性的。当初始状态非零且保持固定时，完整响应并不是仅关于外部输入的线性函数，因为每个输入都叠加了相同的零输入项。

对于
:::
:::

$$
y'(t)+2y(t)=x(t),
\qquad y(0^-)=2,
\qquad x(t)=e^{-t}u(t),
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
the two components are
:::

::: {.bi-zh lang="zh-CN"}
两个分量为
:::
:::

$$
y_{zi}(t)=2e^{-2t},
$$

$$
y_{zs}(t)=-e^{-2t}+e^{-t}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Thus,
:::

::: {.bi-zh lang="zh-CN"}
因此，
:::
:::

$$
\boxed{y(t)=e^{-2t}+e^{-t},\qquad t>0}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Scaling only the input by three scales $y_{zs}$ but leaves $y_{zi}$ unchanged:
:::

::: {.bi-zh lang="zh-CN"}
仅将输入放大三倍，会把 $y_{zs}$ 放大三倍，但 $y_{zi}$ 保持不变：
:::
:::

$$
y(t)=-e^{-2t}+3e^{-t}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Scaling only the initial state from $2$ to $6$ scales $y_{zi}$ by three but leaves $y_{zs}$ unchanged:
:::

::: {.bi-zh lang="zh-CN"}
仅把初始状态从 $2$ 改为 $6$，会把 $y_{zi}$ 放大三倍，但 $y_{zs}$ 保持不变：
:::
:::

$$
y(t)=5e^{-2t}+e^{-t}.
$$

#### 2.4.12 Example: Recovering the Zero-Input and Zero-State Parts

::: {.bi-pair}
::: {.bi-en lang="en"}
Suppose the same initial state produces
:::

::: {.bi-zh lang="zh-CN"}
设在相同初始状态下，系统产生
:::
:::

$$
y_1(t)=2e^{-t}+\cos(2t)
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
for input $x(t)$, and
:::

::: {.bi-zh lang="zh-CN"}
作为输入 $x(t)$ 的响应，并产生
:::
:::

$$
y_2(t)=e^{-t}+2\cos(2t)
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
for input $2x(t)$. Write the zero-input response as $z(t)$ and the zero-state response to $x(t)$ as $s(t)$. Then
:::

::: {.bi-zh lang="zh-CN"}
作为输入 $2x(t)$ 的响应。用 $z(t)$ 表示零输入响应，用 $s(t)$ 表示对 $x(t)$ 的零状态响应，则
:::
:::

$$
z(t)+s(t)=y_1(t),
$$

$$
z(t)+2s(t)=y_2(t).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Solving gives
:::

::: {.bi-zh lang="zh-CN"}
解得
:::
:::

$$
z(t)=3e^{-t},
\qquad
s(t)=-e^{-t}+\cos(2t).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For input $4x(t)$ under the same initial condition,
:::

::: {.bi-zh lang="zh-CN"}
在相同初始条件下，对于输入 $4x(t)$，
:::
:::

$$
\begin{aligned}
y_4(t)
&=z(t)+4s(t)\\
&=-e^{-t}+4\cos(2t),
\qquad t>0.
\end{aligned}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The zero-input term remains unchanged because the initial state remains unchanged.
:::

::: {.bi-zh lang="zh-CN"}
由于初始状态没有改变，零输入项保持不变。
:::
:::

#### 2.4.13 Key Points

::: {.bi-pair}
::: {.bi-en lang="en"}
- A constant-coefficient differential equation requires auxiliary conditions to specify a unique system response.
- Characteristic roots determine the natural modes of the system.
- A repeated forcing mode requires multiplication of the trial particular solution by a sufficient power of $t$.
- Initial rest converts an LCCDE description into a causal zero-state LTI system for right-sided inputs.
- The complete response equals the sum of zero-input and zero-state responses.
- Natural/forced and zero-input/zero-state are different decompositions and should not be interchanged.
- Superposition applies separately to the external input and to the initial state.
:::

::: {.bi-zh lang="zh-CN"}
- 常系数微分方程需要辅助条件才能确定唯一的系统响应。
- 特征根决定系统的自然模态。
- 若强迫项与自然模态重复，试探特解必须乘以足够高次的 $t$。
- 对于右边输入，初始静止条件把 LCCDE 描述变为因果零状态 LTI 系统。
- 完整响应等于零输入响应与零状态响应之和。
- 自然/强迫分解与零输入/零状态分解不同，不能混用。
- 叠加原理分别适用于外部输入和初始状态。
:::
:::

#### 2.4.14 Linear Constant-Coefficient Difference Equations

::: {.bi-pair}
::: {.bi-en lang="en"}
Many discrete-time systems are naturally described by recursions. Typical examples include a bank balance,
:::

::: {.bi-zh lang="zh-CN"}
许多离散时间系统天然由递推关系描述。典型例子包括银行余额，
:::
:::

$$
y[n]=(1+r)y[n-1]+x[n],
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
where $r$ is the interest rate, and exponential smoothing,
:::

::: {.bi-zh lang="zh-CN"}
其中 $r$ 是利率；另一个例子是指数平滑，
:::
:::

$$
y[n]=(1-\alpha)y[n-1]+\alpha x[n],
\qquad 0<\alpha<1.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
A differential equation can also be converted into a difference equation. For example, the forward-difference approximation
:::

::: {.bi-zh lang="zh-CN"}
微分方程也可以转换为差分方程。例如，前向差分近似
:::
:::

$$
y'(nT)\approx \frac{y(nT)-y((n-1)T)}{T}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
turns $y'(t)=x(t)$ into Euler's recursion
:::

::: {.bi-zh lang="zh-CN"}
把 $y'(t)=x(t)$ 转换为 Euler 递推式
:::
:::

$$
y[n]=y[n-1]+Tx[n].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The general linear constant-coefficient difference equation (LCCDE) is
:::

::: {.bi-zh lang="zh-CN"}
一般的线性常系数差分方程（LCCDE）为
:::
:::

$$
\boxed{
\sum_{k=0}^{N}a_k y[n-k]
=
\sum_{k=-M_1}^{M}b_k x[n-k]
},
\qquad a_0\neq0,
\quad a_N\neq0.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The order is $N$. For a causal system, the input side contains only present and past samples, so $M_1=0$:
:::

::: {.bi-zh lang="zh-CN"}
方程阶数为 $N$。对于因果系统，输入端只包含当前和过去的样本，所以 $M_1=0$：
:::
:::

$$
\sum_{k=0}^{N}a_k y[n-k]
=
\sum_{k=0}^{M}b_k x[n-k].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The equation specifies an input-output relation implicitly. It does not define a unique system until $N$ auxiliary conditions are supplied.
:::

::: {.bi-zh lang="zh-CN"}
该方程隐式规定输入—输出关系。在给出 $N$ 个辅助条件之前，它不能唯一确定系统。
:::
:::

#### 2.4.15 Initial Conditions and Initial Rest

::: {.bi-pair}
::: {.bi-en lang="en"}
Starting the recursion at $n=n_0$ requires $N$ consecutive output values, usually
:::

::: {.bi-zh lang="zh-CN"}
从 $n=n_0$ 开始递推需要 $N$ 个连续输出值，通常为
:::
:::

$$
y[n_0-N],\ldots,y[n_0-2],y[n_0-1].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
If the input is zero before $n_0$, the initial-rest condition is
:::

::: {.bi-zh lang="zh-CN"}
如果输入在 $n_0$ 之前为零，则初始静止条件为
:::
:::

$$
x[n]=0 \text{ for } n<n_0
\quad\Longrightarrow\quad
y[n]=0 \text{ for } n<n_0.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Equivalently,
:::

::: {.bi-zh lang="zh-CN"}
等价地，
:::
:::

$$
y[n_0-k]=0,
\qquad k=1,2,\ldots,N.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
An LCCDE together with initial rest describes a causal LTI system for right-sided inputs. Nonzero initial conditions generally introduce a zero-input response and prevent the input-output mapping from being linear in the input alone.
:::

::: {.bi-zh lang="zh-CN"}
LCCDE 与初始静止条件共同为右边输入描述了一个因果 LTI 系统。非零初始条件通常会引入零输入响应，使输入—输出映射不再仅关于输入线性。
:::
:::

#### 2.4.16 Iterative Solution

::: {.bi-pair}
::: {.bi-en lang="en"}
Solving the causal LCCDE for the current output gives
:::

::: {.bi-zh lang="zh-CN"}
由因果 LCCDE 解出当前输出，得到
:::
:::

$$
\boxed{
y[n]
=
\frac{1}{a_0}
\left(
\sum_{k=0}^{M}b_kx[n-k]
-
\sum_{k=1}^{N}a_ky[n-k]
\right)
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Thus, the current output is computed from present and past inputs together with past outputs.

When $N=0$, there is no feedback from previous outputs:
:::

::: {.bi-zh lang="zh-CN"}
因此，当前输出由当前和过去的输入以及过去的输出共同计算。

当 $N=0$ 时，不存在来自过去输出的反馈：
:::
:::

$$
y[n]=\sum_{k=0}^{M}\frac{b_k}{a_0}x[n-k].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
This is a nonrecursive finite impulse response (FIR) system with
:::

::: {.bi-zh lang="zh-CN"}
这是一个非递归有限冲激响应（FIR）系统，其冲激响应为
:::
:::

$$
h[n]=\sum_{k=0}^{M}\frac{b_k}{a_0}\delta[n-k].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
When previous outputs appear, the equation is recursive and commonly produces an infinite impulse response (IIR).
:::

::: {.bi-zh lang="zh-CN"}
当方程中出现过去输出时，它是递归的，并且通常产生无限冲激响应（IIR）。
:::
:::

#### 2.4.17 First-Order Recursive Example

::: {.bi-pair}
::: {.bi-en lang="en"}
Consider
:::

::: {.bi-zh lang="zh-CN"}
考虑
:::
:::

$$
y[n]-ay[n-1]=x[n],
\qquad y[-1]=y_{-1}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Forward iteration for $n\ge0$ gives
:::

::: {.bi-zh lang="zh-CN"}
对 $n\ge0$ 向前迭代，得到
:::
:::

$$
\begin{aligned}
y[0]&=ay_{-1}+x[0],\\
y[1]&=a^2y_{-1}+ax[0]+x[1],\\
y[2]&=a^3y_{-1}+a^2x[0]+ax[1]+x[2].
\end{aligned}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Therefore,
:::

::: {.bi-zh lang="zh-CN"}
因此，
:::
:::

$$
\boxed{
y[n]=a^{n+1}y_{-1}+\sum_{k=0}^{n}a^{n-k}x[k],
\qquad n\ge0
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Backward iteration gives, for $n<-1$,
:::

::: {.bi-zh lang="zh-CN"}
向后迭代可得，对于 $n<-1$，
:::
:::

$$
y[n]
=
a^{n+1}y_{-1}
-
\sum_{k=n+1}^{-1}a^{n-k}x[k].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Under initial rest, $y[-1]=0$, and an impulse input produces
:::

::: {.bi-zh lang="zh-CN"}
在初始静止条件下，$y[-1]=0$，冲激输入产生
:::
:::

$$
\boxed{h[n]=a^n u[n]}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Because the response generally has infinitely many nonzero samples, this is an IIR system.
:::

::: {.bi-zh lang="zh-CN"}
由于该响应通常具有无限多个非零样本，所以这是一个 IIR 系统。
:::
:::

#### 2.4.18 Homogeneous Solution

::: {.bi-pair}
::: {.bi-en lang="en"}
For
:::

::: {.bi-zh lang="zh-CN"}
对于
:::
:::

$$
\sum_{k=0}^{N}a_k y_h[n-k]=0,
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
substitute $y_h[n]=c\alpha^n$. The characteristic equation is
:::

::: {.bi-zh lang="zh-CN"}
代入 $y_h[n]=c\alpha^n$，得到特征方程
:::
:::

$$
\boxed{
\sum_{k=0}^{N}a_k\alpha^{N-k}=0
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
If the $N$ characteristic roots $\alpha_1,\ldots,\alpha_N$ are distinct, then
:::

::: {.bi-zh lang="zh-CN"}
若 $N$ 个特征根 $\alpha_1,\ldots,\alpha_N$ 互不相同，则
:::
:::

$$
y_h[n]=\sum_{i=1}^{N}c_i\alpha_i^n.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
If $\alpha_i$ has multiplicity $m_i$, its contribution is
:::

::: {.bi-zh lang="zh-CN"}
若 $\alpha_i$ 的重数为 $m_i$，则其贡献为
:::
:::

$$
\left(
c_{i1}+c_{i2}n+\cdots+c_{im_i}n^{m_i-1}
\right)\alpha_i^n.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Hence, for $r$ distinct roots with $\sum_{i=1}^{r}m_i=N$,
:::

::: {.bi-zh lang="zh-CN"}
因此，若共有 $r$ 个不同根，且 $\sum_{i=1}^{r}m_i=N$，则
:::
:::

$$
y_h[n]
=
\sum_{i=1}^{r}
\sum_{k=1}^{m_i}
c_{ik}n^{k-1}\alpha_i^n.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The constants are determined from the auxiliary conditions together with any unknown constants in the particular solution.
:::

::: {.bi-zh lang="zh-CN"}
各常数由辅助条件与特解中的未知常数共同确定。
:::
:::

#### 2.4.19 Particular Solution

::: {.bi-pair}
::: {.bi-en lang="en"}
The particular solution is chosen to match the form of the forcing sequence
:::

::: {.bi-zh lang="zh-CN"}
特解应选择为与下列强迫序列形式相匹配的形式：
:::
:::

$$
f_x[n]=\sum_{k=0}^{M}b_kx[n-k].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Common trial forms are:

| Forcing term | Trial particular solution |
| --- | --- |
| Polynomial of degree $p$, with $1$ not a characteristic root | $\displaystyle \sum_{k=0}^{p}B_kn^k$ |
| Polynomial of degree $p$, with $1$ a root of multiplicity $m$ | $\displaystyle n^m\sum_{k=0}^{p}B_kn^k$ |
| $\alpha^n$, with $\alpha$ not a characteristic root | $B\alpha^n$ |
| $\alpha_i^n$, with $\alpha_i$ a root of multiplicity $m_i$ | $Bn^{m_i}\alpha_i^n$ |

Sinusoidal inputs are handled through complex exponentials:
:::

::: {.bi-zh lang="zh-CN"}
常用试探形式为：

| 强迫项 | 试探特解 |
| --- | --- |
| $p$ 次多项式，且 $1$ 不是特征根 | $\displaystyle \sum_{k=0}^{p}B_kn^k$ |
| $p$ 次多项式，且 $1$ 是重数为 $m$ 的特征根 | $\displaystyle n^m\sum_{k=0}^{p}B_kn^k$ |
| $\alpha^n$，且 $\alpha$ 不是特征根 | $B\alpha^n$ |
| $\alpha_i^n$，且 $\alpha_i$ 是重数为 $m_i$ 的特征根 | $Bn^{m_i}\alpha_i^n$ |

正弦输入通过复指数形式处理：
:::
:::

$$
\cos(\omega n)=\frac{e^{j\omega n}+e^{-j\omega n}}{2},
\qquad
\sin(\omega n)=\frac{e^{j\omega n}-e^{-j\omega n}}{2j}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The complete response is
:::

::: {.bi-zh lang="zh-CN"}
完整响应为
:::
:::

$$
\boxed{y[n]=y_h[n]+y_p[n]}.
$$

#### 2.4.20 Example: Fibonacci Sequence

::: {.bi-pair}
::: {.bi-en lang="en"}
The Fibonacci recursion is
:::

::: {.bi-zh lang="zh-CN"}
Fibonacci 递推式为
:::
:::

$$
y[n]-y[n-1]-y[n-2]=0,
\qquad y[1]=y[2]=1.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Its characteristic equation is
:::

::: {.bi-zh lang="zh-CN"}
其特征方程为
:::
:::

$$
\alpha^2-\alpha-1=0,
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
with roots
:::

::: {.bi-zh lang="zh-CN"}
特征根为
:::
:::

$$
\alpha_{1,2}=\frac{1\pm\sqrt5}{2}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Therefore,
:::

::: {.bi-zh lang="zh-CN"}
因此，
:::
:::

$$
y[n]=c_1\alpha_1^n+c_2\alpha_2^n.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Applying the initial conditions gives $c_1=1/\sqrt5$ and $c_2=-1/\sqrt5$, so
:::

::: {.bi-zh lang="zh-CN"}
应用初始条件得到 $c_1=1/\sqrt5$、$c_2=-1/\sqrt5$，所以
:::
:::

$$
\boxed{
y[n]
=
\frac{1}{\sqrt5}
\left[
\left(\frac{1+\sqrt5}{2}\right)^n
-
\left(\frac{1-\sqrt5}{2}\right)^n
\right]
}.
$$

#### 2.4.21 Example: Polynomial Forcing

::: {.bi-pair}
::: {.bi-en lang="en"}
Solve
:::

::: {.bi-zh lang="zh-CN"}
求解
:::
:::

$$
y[n]+2y[n-1]=x[n]-x[n-1],
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
where $x[n]=n^2$ for $n\ge0$ and $y[1]=-1$.

The characteristic root is $\alpha=-2$, so
:::

::: {.bi-zh lang="zh-CN"}
其中 $n\ge0$ 时 $x[n]=n^2$，且 $y[1]=-1$。

特征根为 $\alpha=-2$，所以
:::
:::

$$
y_h[n]=c(-2)^n.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For the forcing term,
:::

::: {.bi-zh lang="zh-CN"}
对于强迫项，
:::
:::

$$
x[n]-x[n-1]=n^2-(n-1)^2=2n-1.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Try
:::

::: {.bi-zh lang="zh-CN"}
试取
:::
:::

$$
y_p[n]=B_1n+B_0.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Substitution gives
:::

::: {.bi-zh lang="zh-CN"}
代入得到
:::
:::

$$
3B_1n+3B_0-2B_1=2n-1,
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
so
:::

::: {.bi-zh lang="zh-CN"}
所以
:::
:::

$$
B_1=\frac23,
\qquad
B_0=\frac19.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Using $y[1]=-1$ yields $c=8/9$. Hence,
:::

::: {.bi-zh lang="zh-CN"}
使用 $y[1]=-1$ 可得 $c=8/9$。因此，
:::
:::

$$
\boxed{
y[n]
=
\underbrace{\frac89(-2)^n}_{\text{natural response}}
+
\underbrace{\frac23n+\frac19}_{\text{forced response}}
}.
$$

#### 2.4.22 Zero-Input and Zero-State Responses

::: {.bi-pair}
::: {.bi-en lang="en"}
As in the continuous-time case, the complete response can be decomposed as
:::

::: {.bi-zh lang="zh-CN"}
与连续时间情形一样，完整响应可分解为
:::
:::

$$
\boxed{y[n]=y_{zi}[n]+y_{zs}[n]}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The zero-input response satisfies
:::

::: {.bi-zh lang="zh-CN"}
零输入响应满足
:::
:::

$$
L_y\{y_{zi}[n]\}=0
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
with the original initial conditions. It is linear in the initial state.

The zero-state response satisfies
:::

::: {.bi-zh lang="zh-CN"}
并采用原始初始条件。它对初始状态是线性的。

零状态响应满足
:::
:::

$$
L_y\{y_{zs}[n]\}=f_x[n]
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
with all initial values set to zero. It is linear in the input.

For distinct characteristic roots,
:::

::: {.bi-zh lang="zh-CN"}
其中所有初始值均置为零。它对输入是线性的。

对于互异的特征根，
:::
:::

$$
y_{zi}[n]=\sum_{k=1}^{N}c_{zi,k}\alpha_k^n,
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
while
:::

::: {.bi-zh lang="zh-CN"}
而
:::
:::

$$
y_{zs}[n]=\sum_{k=1}^{N}c_{zs,k}\alpha_k^n+y_p[n].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Therefore,
:::

::: {.bi-zh lang="zh-CN"}
因此，
:::
:::

$$
y[n]
=
\sum_k(c_{zi,k}+c_{zs,k})\alpha_k^n+y_p[n].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
This shows that
:::

::: {.bi-zh lang="zh-CN"}
这表明
:::
:::

$$
\boxed{
\text{natural response}
=
\text{zero-input response}
+
\text{natural part of the zero-state response}
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Natural/forced and zero-input/zero-state are different decompositions.
:::

::: {.bi-zh lang="zh-CN"}
自然响应/强迫响应与零输入响应/零状态响应是两种不同的分解方式。
:::
:::

#### 2.4.23 Example: Response Decompositions

::: {.bi-pair}
::: {.bi-en lang="en"}
Consider
:::

::: {.bi-zh lang="zh-CN"}
考虑
:::
:::

$$
y[n]-y[n-1]-2y[n-2]
=
x[n]+2x[n-2],
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
with
:::

::: {.bi-zh lang="zh-CN"}
并给定
:::
:::

$$
x[n]=u[n],
\qquad
y[-1]=2,
\qquad
y[-2]=-\frac12.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The characteristic equation is
:::

::: {.bi-zh lang="zh-CN"}
特征方程为
:::
:::

$$
\alpha^2-\alpha-2=0,
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
so the roots are $2$ and $-1$:
:::

::: {.bi-zh lang="zh-CN"}
所以其根为 $2$ 和 $-1$：
:::
:::

$$
y_h[n]=A2^n+B(-1)^n.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The delayed step must be handled carefully:
:::

::: {.bi-zh lang="zh-CN"}
必须谨慎处理延迟阶跃：
:::
:::

$$
x[n]+2x[n-2]
=
\begin{cases}
1, & n=0,1,\\
3, & n\ge2.
\end{cases}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For $n\ge2$, a constant trial gives
:::

::: {.bi-zh lang="zh-CN"}
当 $n\ge2$ 时，设常数形式的试探解可得
:::
:::

$$
K-K-2K=3,
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
so $K=-3/2$. First use the recursion at the switching samples:
:::

::: {.bi-zh lang="zh-CN"}
所以 $K=-3/2$。首先在输入切换处的样本上使用递推关系：
:::
:::

$$
y[0]=2,
\qquad
y[1]=7.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Applying these values to the complete response gives
:::

::: {.bi-zh lang="zh-CN"}
将这些值代入完整响应可得
:::
:::

$$
\boxed{
y[n]=4\cdot2^n-\frac12(-1)^n-\frac32,
\qquad n\ge0
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Thus,
:::

::: {.bi-zh lang="zh-CN"}
因此，
:::
:::

$$
y_{\text{natural}}[n]
=
4\cdot2^n-\frac12(-1)^n,
$$

$$
y_{\text{forced}}[n]=-\frac32.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Ignoring the input and applying the original initial conditions gives
:::

::: {.bi-zh lang="zh-CN"}
忽略输入并应用原始初始条件可得
:::
:::

$$
y_{zi}[n]=2\cdot2^n-(-1)^n.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The remaining part is the zero-state response:
:::

::: {.bi-zh lang="zh-CN"}
其余部分为零状态响应：
:::
:::

$$
y_{zs}[n]
=
2\cdot2^n+\frac12(-1)^n-\frac32.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Indeed,
:::

::: {.bi-zh lang="zh-CN"}
事实上，
:::
:::

$$
y[n]=y_{zi}[n]+y_{zs}[n].
$$

#### 2.4.24 Impulse Response from an LCCDE

::: {.bi-pair}
::: {.bi-en lang="en"}
For a causal LTI system described by an LCCDE, the impulse response is the zero-state response to
:::

::: {.bi-zh lang="zh-CN"}
对于由 LCCDE 描述的因果 LTI 系统，其冲激响应是系统在零状态条件下对下列输入的响应：
:::
:::

$$
x[n]=\delta[n].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Therefore,
:::

::: {.bi-zh lang="zh-CN"}
因此，
:::
:::

$$
h[n]=0,
\qquad n<0,
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
and the recursion determines $h[0],h[1],\ldots$.

For example,
:::

::: {.bi-zh lang="zh-CN"}
而递推关系决定 $h[0],h[1],\ldots$。

例如，
:::
:::

$$
y[n]-3y[n-1]+3y[n-2]-y[n-3]=x[n]
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
has characteristic equation
:::

::: {.bi-zh lang="zh-CN"}
的特征方程为
:::
:::

$$
(\alpha-1)^3=0.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The causal impulse response must have the form
:::

::: {.bi-zh lang="zh-CN"}
因果冲激响应必具有以下形式：
:::
:::

$$
h[n]=c_1n^2+c_2n+c_3,
\qquad n\ge0.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Initial rest and the impulse input give
:::

::: {.bi-zh lang="zh-CN"}
初始静止条件和冲激输入给出
:::
:::

$$
h[0]=1,
\qquad h[1]=3,
\qquad h[2]=6.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Thus,
:::

::: {.bi-zh lang="zh-CN"}
因此，
:::
:::

$$
\boxed{
h[n]=\frac12(n^2+3n+2)u[n]
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The coefficients are determined by the starting conditions immediately after the impulse.
:::

::: {.bi-zh lang="zh-CN"}
这些系数由冲激作用后紧接着的起始条件决定。
:::
:::

#### 2.4.25 Key Points for Difference Equations

::: {.bi-pair}
::: {.bi-en lang="en"}
- An $N$th-order LCCDE requires $N$ auxiliary conditions.
- Initial rest makes a causal LCCDE define a zero-state LTI system for right-sided inputs.
- Nonrecursive equations lead to FIR systems; recursive equations commonly lead to IIR systems.
- Characteristic roots determine the discrete-time natural modes.
- A repeated characteristic root adds powers of $n$ to the corresponding exponential mode.
- The complete response may be decomposed either into natural and forced responses or into zero-input and zero-state responses.
- The impulse response is obtained by applying $\delta[n]$ under zero-state conditions.
:::

::: {.bi-zh lang="zh-CN"}
- 一个 $N$ 阶 LCCDE 需要 $N$ 个辅助条件。
- 对右边序列输入而言，初始静止条件使因果 LCCDE 定义一个零状态 LTI 系统。
- 非递归方程产生 FIR 系统；递归方程通常产生 IIR 系统。
- 特征根决定离散时间自然模态。
- 重复特征根会在相应指数模态中引入 $n$ 的幂次因子。
- 完整响应既可分解为自然响应与强迫响应，也可分解为零输入响应与零状态响应。
- 在零状态条件下施加 $\delta[n]$ 即可得到冲激响应。
:::
:::

### 2.5 Block Diagram Representations of First-Order Systems

::: {.bi-pair}
::: {.bi-en lang="en"}
Block diagrams expose how a system can be implemented using simple operations. The fundamental elements are:

- adders,
- scalar multipliers or amplifiers,
- unit delays for discrete-time systems,
- integrators for continuous-time systems.
:::

::: {.bi-zh lang="zh-CN"}
框图揭示了如何利用简单运算来实现一个系统。基本元件包括：

- 加法器；
- 标量乘法器或放大器；
- 离散时间系统中的单位延时器；
- 连续时间系统中的积分器。
:::
:::

#### 2.5.1 Discrete-Time First-Order System

::: {.bi-pair}
::: {.bi-en lang="en"}
Consider
:::

::: {.bi-zh lang="zh-CN"}
考虑
:::
:::

$$
y[n]+ay[n-1]=bx[n].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Solving for the current output gives
:::

::: {.bi-zh lang="zh-CN"}
解出当前输出可得
:::
:::

$$
\boxed{y[n]=bx[n]-ay[n-1]}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The block diagram therefore contains:

1. a feedforward branch that multiplies $x[n]$ by $b$;
2. an adder whose output is $y[n]$;
3. a feedback branch that delays $y[n]$ by one sample to form $y[n-1]$;
4. a multiplier $-a$ in the feedback path.

The unit-delay block stores the system state from one sample to the next.
:::

::: {.bi-zh lang="zh-CN"}
因此，该框图包含：

1. 一条将 $x[n]$ 乘以 $b$ 的前馈支路；
2. 一个输出为 $y[n]$ 的加法器；
3. 一条将 $y[n]$ 延迟一个样本以形成 $y[n-1]$ 的反馈支路；
4. 反馈通路中的乘法器 $-a$。

单位延时器将系统状态从一个样本保存到下一个样本。
:::
:::

#### 2.5.2 Continuous-Time First-Order System

::: {.bi-pair}
::: {.bi-en lang="en"}
For
:::

::: {.bi-zh lang="zh-CN"}
对于
:::
:::

$$
y'(t)+ay(t)=bx(t),
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
rewrite the derivative as
:::

::: {.bi-zh lang="zh-CN"}
将导数改写为
:::
:::

$$
y'(t)=-ay(t)+bx(t).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Assuming initial rest, $y(-\infty)=0$, integration gives
:::

::: {.bi-zh lang="zh-CN"}
假设初始静止，即 $y(-\infty)=0$，积分可得
:::
:::

$$
\boxed{
y(t)
=
\int_{-\infty}^{t}
\left[-ay(\tau)+bx(\tau)\right]d\tau
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The block diagram uses an adder to form $y'(t)$, an integrator to produce $y(t)$, and a feedback gain $-a$. The integrator stores the continuous-time state.
:::

::: {.bi-zh lang="zh-CN"}
该框图使用加法器形成 $y'(t)$，使用积分器产生 $y(t)$，并使用反馈增益 $-a$。积分器存储连续时间状态。
:::
:::

#### 2.5.3 Recovering a Differential Equation from a Block Diagram

::: {.bi-pair}
::: {.bi-en lang="en"}
For a second-order integrator realization, let the successive integrator outputs be $z'(t)$ and $z(t)$. The feedback paths give
:::

::: {.bi-zh lang="zh-CN"}
对于二阶积分器实现，令两个连续积分器的输出分别为 $z'(t)$ 和 $z(t)$。反馈支路给出
:::
:::

$$
z''(t)=x(t)-a_1z'(t)-a_0z(t),
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
or
:::

::: {.bi-zh lang="zh-CN"}
即
:::
:::

$$
z''(t)+a_1z'(t)+a_0z(t)=x(t).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
If the output branches are weighted by $b_2,b_1,b_0$, then
:::

::: {.bi-zh lang="zh-CN"}
若各输出支路的权重分别为 $b_2,b_1,b_0$，则
:::
:::

$$
y(t)=b_2z''(t)+b_1z'(t)+b_0z(t).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Using the differential operator $D=d/dt$,
:::

::: {.bi-zh lang="zh-CN"}
使用微分算子 $D=d/dt$，
:::
:::

$$
(D^2+a_1D+a_0)z(t)=x(t),
$$

$$
y(t)=(b_2D^2+b_1D+b_0)z(t).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Eliminating the auxiliary signal gives the input-output equation
:::

::: {.bi-zh lang="zh-CN"}
消去辅助信号可得输入—输出方程
:::
:::

$$
\boxed{
y''(t)+a_1y'(t)+a_0y(t)
=
b_2x''(t)+b_1x'(t)+b_0x(t)
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
This example illustrates a general method: label the outputs of the memory elements, write the equations at the adders, and eliminate the internal signals.
:::

::: {.bi-zh lang="zh-CN"}
这个例子说明了一种通用方法：标记记忆元件的输出，写出各加法器处的方程，再消去内部信号。
:::
:::

#### 2.5.4 Key Points

::: {.bi-pair}
::: {.bi-en lang="en"}
- Unit delays and integrators are the memory elements in DT and CT block diagrams, respectively.
- Feedback implements dependence on past outputs or internal states.
- A first-order equation requires one memory element; an $N$th-order realization generally requires $N$ memory elements.
- Internal state variables provide a convenient bridge between a block diagram and its differential or difference equation.
:::

::: {.bi-zh lang="zh-CN"}
- 单位延时器和积分器分别是离散时间与连续时间框图中的记忆元件。
- 反馈用于实现对过去输出或内部状态的依赖。
- 一阶方程需要一个记忆元件；一个 $N$ 阶系统的实现通常需要 $N$ 个记忆元件。
- 内部状态变量在框图与微分方程或差分方程之间提供了便捷的联系。
:::
:::

### 2.6 Singularity Functions

::: {.bi-pair}
::: {.bi-en lang="en"}
Singularity functions form a unified family containing the impulse, its derivatives, the step, the ramp, and higher-order running integrals.
:::

::: {.bi-zh lang="zh-CN"}
奇异函数构成一个统一的函数族，其中包括冲激、冲激的各阶导数、阶跃、斜坡以及更高阶的累次积分。
:::
:::

#### 2.6.1 Unit Impulse as the Convolution Identity

::: {.bi-pair}
::: {.bi-en lang="en"}
The unit impulse is the identity element of convolution:
:::

::: {.bi-zh lang="zh-CN"}
单位冲激是卷积的单位元：
:::
:::

$$
x[n]*\delta[n]=x[n],
\qquad
x(t)*\delta(t)=x(t).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Consequently,
:::

::: {.bi-zh lang="zh-CN"}
因此，
:::
:::

$$
\delta[n]*\delta[n]=\delta[n],
\qquad
\delta(t)*\delta(t)=\delta(t).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Cascading two identity systems still produces an identity system.
:::

::: {.bi-zh lang="zh-CN"}
两个单位系统级联后仍为单位系统。
:::
:::

#### 2.6.2 Derivatives of the Impulse

::: {.bi-pair}
::: {.bi-en lang="en"}
Define
:::

::: {.bi-zh lang="zh-CN"}
定义
:::
:::

$$
u_0(t)=\delta(t)
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
and the unit doublet
:::

::: {.bi-zh lang="zh-CN"}
以及单位偶极子
:::
:::

$$
u_1(t)=\delta'(t).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Convolution with the unit doublet differentiates a signal:
:::

::: {.bi-zh lang="zh-CN"}
信号与单位偶极子的卷积会对该信号求导：
:::
:::

$$
\boxed{x(t)*u_1(t)=x'(t)}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Two cascaded differentiators have impulse response
:::

::: {.bi-zh lang="zh-CN"}
两个级联微分器的冲激响应为
:::
:::

$$
u_2(t)=u_1(t)*u_1(t)=\delta''(t),
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
and therefore
:::

::: {.bi-zh lang="zh-CN"}
因此
:::
:::

$$
x(t)*u_2(t)=x''(t).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
More generally, for $k\ge1$,
:::

::: {.bi-zh lang="zh-CN"}
更一般地，对于 $k\ge1$，
:::
:::

$$
\boxed{
u_k(t)
=
\delta^{(k)}(t)
=
\underbrace{u_1(t)*u_1(t)*\cdots*u_1(t)}_{k\text{ times}}
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Hence,
:::

::: {.bi-zh lang="zh-CN"}
于是，
:::
:::

$$
\boxed{x(t)*u_k(t)=x^{(k)}(t)}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
These identities are interpreted in the generalized-function, or distributional, sense when ordinary derivatives do not exist.
:::

::: {.bi-zh lang="zh-CN"}
当通常意义下的导数不存在时，应在广义函数（即分布）的意义下解释这些恒等式。
:::
:::

#### 2.6.3 Integrals of the Impulse

::: {.bi-pair}
::: {.bi-en lang="en"}
The first running integral of the impulse is the unit step:
:::

::: {.bi-zh lang="zh-CN"}
冲激的一阶累次积分是单位阶跃：
:::
:::

$$
u_{-1}(t)
=
u(t)
=
\int_{-\infty}^{t}\delta(\tau)d\tau.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Convolution with the step performs a running integral:
:::

::: {.bi-zh lang="zh-CN"}
与阶跃函数卷积会执行一次累积积分：
:::
:::

$$
\boxed{
x(t)*u_{-1}(t)
=
\int_{-\infty}^{t}x(\tau)d\tau
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The convolution of two steps is the unit ramp:
:::

::: {.bi-zh lang="zh-CN"}
两个阶跃函数的卷积是单位斜坡：
:::
:::

$$
u_{-2}(t)
=
u_{-1}(t)*u_{-1}(t)
=
tu(t).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Thus,
:::

::: {.bi-zh lang="zh-CN"}
因此，
:::
:::

$$
x(t)*u_{-2}(t)
=
\int_{-\infty}^{t}
\int_{-\infty}^{\tau}
x(\sigma)d\sigma\,d\tau.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For an $m$th-order running integral,
:::

::: {.bi-zh lang="zh-CN"}
对于 $m$ 阶累次积分，
:::
:::

$$
u_{-m}(t)
=
\underbrace{u_{-1}(t)*u_{-1}(t)*\cdots*u_{-1}(t)}_{m\text{ times}},
\qquad m\ge1.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The closed form is
:::

::: {.bi-zh lang="zh-CN"}
其闭式表达式为
:::
:::

$$
\boxed{
u_{-m}(t)
=
\frac{t^{m-1}}{(m-1)!}u(t)
}.
$$

#### 2.6.4 Unified Integer-Order View

::: {.bi-pair}
::: {.bi-en lang="en"}
The indexed family $u_k(t)$ organizes differentiation and integration around the impulse:
:::

::: {.bi-zh lang="zh-CN"}
带下标的函数族 $u_k(t)$ 将围绕冲激的微分与积分关系组织起来：
:::
:::

$$
\cdots,
\frac{t^2}{2}u(t),
tu(t),
u(t),
\delta(t),
\delta'(t),
\delta''(t),
\cdots
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Moving one position to the right differentiates; moving one position to the left integrates. For integer indices for which the convolution is defined,
:::

::: {.bi-zh lang="zh-CN"}
向右移动一个位置表示求一次导数；向左移动一个位置表示求一次积分。对于卷积有定义的整数下标，
:::
:::

$$
u_p(t)*u_q(t)=u_{p+q}(t).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
This compact relation explains why cascaded differentiators add positive orders and cascaded integrators add negative orders.
:::

::: {.bi-zh lang="zh-CN"}
这一紧凑关系解释了为什么级联微分器的正阶数相加，而级联积分器的负阶数相加。
:::
:::

#### 2.6.5 Key Points

::: {.bi-pair}
::: {.bi-en lang="en"}
- The impulse is the identity element of convolution.
- Convolution with $\delta^{(k)}(t)$ produces the $k$th derivative of a signal.
- Convolution with $u(t)$ produces a running integral.
- Repeated integration of the impulse generates polynomial signals multiplied by $u(t)$.
- Singularity functions give a unified language for ideal differentiators, integrators, and LTI impulse responses.
:::

::: {.bi-zh lang="zh-CN"}
- 冲激是卷积的单位元。
- 与 $\delta^{(k)}(t)$ 卷积会得到信号的 $k$ 阶导数。
- 与 $u(t)$ 卷积会得到一次累积积分。
- 对冲激反复积分会产生乘以 $u(t)$ 的多项式信号。
- 奇异函数为理想微分器、积分器以及 LTI 冲激响应提供了统一的描述语言。
:::
:::
