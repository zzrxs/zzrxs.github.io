---
title: Signals and Systems Chapter-1
date: 2026-09-22 13:46:11
updated: 2026-10-18
math: true
categories:
  - Signals and Systems
tags:
  - Signal Processing
  - LTI Systems
description: Signals and Systems Course Notes (Chapter-1)
index_img: /img/SignalsSystemsChap1.png
---

<!-- ## Introduction

### What Do Signals and Systems Study?

- **Signal** :
  - May describe a wide variety of physical phenomena.
  - Represented mathematically as a function of one or more independent variables:

$$
x:I\to X,\qquad t\mapsto x(t).
$$

$I$ is the set of values for the independent variable and $X$ is the set of signal values. This course mainly discusses signals with only one independent variable, and this variable is uniformly referred to as "time". A continuous-time signal is denoted as $x(t)$, and a discrete-time signal is denoted as $x[n]$.

- **System** :
  - A process or rule that transforms an input signal into an output signal.
  - If the system is denoted by the operator $\mathcal T$, then

$$
y=\mathcal T\{x\},\qquad x\longrightarrow \boxed{\mathcal T}\longrightarrow y.
$$

<!-- ### Two Important Perspectives

1. **Time-domain perspective**: Study the signal values along the time axis and the system response at each instant.
2. **Representation perspective**: Treat a signal as a vector in a vector space and expand it using a set of basic signals. If $\{\phi_k\}$ is a basis, then

   $$
   x=\sum_k a_k\phi_k.
   $$

   Different bases lead to different signal representations. The unit-impulse basis emphasizes sample values, the Fourier basis emphasizes frequency components, and the Haar wavelet basis retains both time and scale information.

Fourier's central idea is that, under suitable conditions, a periodic signal can be represented as a weighted sum of sines and cosines at different frequencies. This changes the question from how a waveform varies with time to which frequencies compose the signal. The representation underlies speech, image, communication, radar, biomedical, and financial signal processing. -->

<!-- ## Syllabus

<details>
<summary>1. SIGNALS AND SYSTEMS</summary>

- 1.1 Definition and Representations of Signals
- 1.2 Transformation of Independent Variable
- 1.3 Basic Signals: Exponential & Sinusoidal Signals
- 1.4 Basic Signals: Unit Impulse & Unit Step Signals
- 1.5 Definitions and Representations of Systems
- 1.6 Basic System Properties

</details>

<details>
<summary>2. LINEAR TIME-INVARIANT SYSTEMS</summary>

- 2.0 Introduction
- 2.1 DT LTI Systems and Convolution Sum
- 2.2 CT LTI Systems and Convolution Integral
- 2.3 Properties of LTI Systems
- 2.4 Causal LTI Systems Described by Differential and Difference Equations
- 2.5 Block Diagram Representations of First-order Systems
- 2.6 Singularity Functions

</details>

<details>
<summary>3. FOURIER SERIES REPRESENTATION OF PERIODIC SIGNALS</summary>

- 3.0 Introduction
- 3.1 Response of LTI Systems to Complex Exponentials
- 3.2 Fourier Series Representation of CT Periodic Signals
- 3.3 Convergence of Fourier Series
- 3.4 Properties of CT Fourier Series
- 3.5 Fourier Series Representation of DT Periodic Signals
- 3.6 Fourier Series and LTI Systems

</details>

<details>
<summary>4. THE CONTINUOUS-TIME FOURIER TRANSFORM</summary>

- 4.0 Introduction
- 4.1 CT Fourier Transform
- 4.2 Fourier Transform of CT Periodic Signals
- 4.3 Properties of CT Fourier Transform
- 4.4 Convolution Property
- 4.5 Multiplication Property
- 4.6 Systems Characterized by Linear Constant-Coefficient Differential Equations

</details>

<details>
<summary>5. THE DISCRETE-TIME FOURIER TRANSFORM</summary>

- 5.0 Introduction
- 5.1 DT Fourier Transform
- 5.2 DT Fourier Transform for Periodic Signals
- 5.3 Properties of DT Fourier Transform
- 5.4 Convolution Property
- 5.5 Multiplication Property
- 5.6 Systems Characterized by Linear Constant-Coefficient Difference Equations

</details>

<details>
<summary>6. TIME AND FREQUENCY CHARACTERIZATION OF SIGNALS AND SYSTEMS</summary>

- 6.1 Magnitude-phase Representation of Fourier Transform
- 6.2 Relations Among Fourier Representations

</details>

<details>
<summary>7. SAMPLING</summary>

- 7.1 Sampling and Reconstruction of CT Signals
- 7.2 Sampling of DT Signals
- 7.3 DT Processing of CT Signals

</details>

<details>
<summary>8. COMMUNICATION SYSTEMS</summary>

- 8.1 CT Modulation
- 8.2 DT Modulation

</details>

<details>
<summary>9. THE LAPLACE TRANSFORM</summary>

- 9.0 Introduction
- 9.1 Laplace Transform
- 9.2 Region of Convergence
- 9.3 Properties of Laplace Transform
- 9.4 Inverse Laplace Transform
- 9.5 Laplace Transform of Singularity Functions
- 9.6 Analysis of LTI Systems by Laplace Transform
- 9.7 Block Diagram Representations
- 9.8 Unilateral Laplace Transform

</details>

<details>
<summary>10. THE Z-TRANSFORM</summary>

- 10.0 Introduction
- 10.1 z-Transform
- 10.2 Region of Convergence
- 10.3 Properties of z-Transform
- 10.4 Inverse z-Transform
- 10.5 Analysis of LTI Systems by z-Transform
- 10.6 Block Diagram Representations
- 10.7 Unilateral z-Transform

</details> -->

## 1. SIGNALS AND SYSTEMS

### 1.1 Definition and Representations of Signals

#### 1.1.1 Mathematical Representation

::: {.bi-pair}
::: {.bi-en lang="en"}
Function of one or more independent variables.

- Electrical voltage: $V_0:\mathbb R\to\mathbb R$, $t\mapsto V_0(t)$
- Daily temperature: $T:\mathbb Z\to\mathbb R$, $n\mapsto T[n]$
- Speech signal: $x:\mathbb R\to\mathbb R$, $t\mapsto x(t)$
- Color image: $P:I\times J\to R\times G\times B$, $(i,j)\mapsto(r[i,j],g[i,j],b[i,j])$

This course focuses on one-dimensional signals. Even when the independent variable is not physical time, such as an index in a DNA base sequence or a week number in stock-market data, it is denoted uniformly by $t$ or $n$.
:::

::: {.bi-zh lang="zh-CN"}
一个或多个自变量的函数。

- 电压：$V_0:\mathbb R\to\mathbb R$，$t\mapsto V_0(t)$
- 每日温度：$T:\mathbb Z\to\mathbb R$，$n\mapsto T[n]$
- 语音信号：$x:\mathbb R\to\mathbb R$，$t\mapsto x(t)$
- 彩色图像：$P:I\times J\to R\times G\times B$，$(i,j)\mapsto(r[i,j],g[i,j],b[i,j])$

本课程重点讨论一维信号。即使自变量并非物理时间，例如 DNA 碱基序列中的索引或股票市场数据中的周数，也统一用 $t$ 或 $n$ 表示。
:::
:::

#### 1.1.2 CT vs DT

::: {.bi-pair}
::: {.bi-en lang="en"}

| Type | Independent Variable | Notation | Description |
| --- | --- | --- | --- |
| Continuous-Time signal (CT) | $t\in\mathbb R$ | $x(t)$ | Defined at every continuous instant. Often called an analog signal. |
| Discrete-Time signal (DT) | Usually $n\in\mathbb Z$ | $x[n]$ | Defined only at discrete instants, also known as a sequence |

:::

::: {.bi-zh lang="zh-CN"}

| 类型 | 自变量 | 记号 | 说明 |
| --- | --- | --- | --- |
| 连续时间信号（CT） | $t\in\mathbb R$ | $x(t)$ | 在每个连续时刻都有定义，通常称为模拟信号。 |
| 离散时间信号（DT） | 通常为 $n\in\mathbb Z$ | $x[n]$ | 仅在离散时刻有定义，也称为序列。 |

:::
:::

#### 1.1.3 Signals as Vectors

::: {.bi-pair}
::: {.bi-en lang="en"}
A finite-length sequence can be directly written as a finite-dimensional vector, and infinite-length sequences and continuous-time functions can also be regarded as generalized vectors:
:::

::: {.bi-zh lang="zh-CN"}
有限长度序列可以直接写成有限维向量；无限长度序列和连续时间函数也可以视为广义向量：
:::
:::

$$
\begin{aligned}
\mathbb C^N
&=\{[x_0,x_1,\ldots,x_{N-1}]^{\mathrm T}:x_n\in\mathbb C, n\in\{0,1,\ldots,N-1\}\},\\
\mathbb C^{\mathbb Z}
&=\{x:x[n]\in\mathbb C,\ n\in\mathbb Z\},\\
\mathbb C^{\mathbb R}
&=\{x:x(t)\in\mathbb C,\ t\in\mathbb R\}.
\end{aligned}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
When signals are regarded as vectors, tools from linear algebra such as linear combinations, bases, inner products, norms and projections can be applied to signal analysis.

**Vector space:** A vector space $V$ is closed under vector addition and scalar multiplication. These operations satisfy commutativity, associativity, and distributivity. The space also contains a zero vector, an additive inverse for every vector, and a multiplicative identity for scalar multiplication. A nonempty subset $S\subseteq V$ is a subspace of $V$ if it is closed under vector addition and scalar multiplication.

The span of a set $S$ contains all finite linear combinations of vectors in $S$:
:::

::: {.bi-zh lang="zh-CN"}
将信号视为向量后，便可把线性组合、基、内积、范数和投影等线性代数工具用于信号分析。

**向量空间：** 向量空间 $V$ 对向量加法和标量乘法封闭，并且这些运算满足交换律、结合律和分配律。该空间还包含零向量、每个向量的加法逆元以及标量乘法的乘法单位元。如果非空子集 $S\subseteq V$ 对向量加法和标量乘法封闭，则 $S$ 是 $V$ 的子空间。

集合 $S$ 的张成空间包含 $S$ 中向量的一切有限线性组合：
:::
:::

$$
\operatorname{span}(S)
=\left\{\sum_{k=0}^{N-1}\alpha_k\phi_k:
\alpha_k\in\mathbb C\text{ or }\mathbb R,\ \phi_k\in S\right\}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The set $\{\phi_k\}$ is linearly independent if
:::

::: {.bi-zh lang="zh-CN"}
如果集合 $\{\phi_k\}$ 满足以下条件，则它是线性无关的：
:::
:::

$$
\sum_{k=0}^{N-1}\alpha_k\phi_k=0
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
holds only when every $\alpha_k=0$. The dimension of a vector space is the maximum number of linearly independent vectors it contains. If no finite maximum exists, the space is infinite-dimensional.
:::

::: {.bi-zh lang="zh-CN"}
仅当所有 $\alpha_k=0$ 时上式才成立。向量空间的维数是其中所含线性无关向量的最大数目；若不存在有限的最大数目，该空间就是无限维的。
:::
:::

#### 1.1.4 Inner Products, Norms, and Signal Spaces

::: {.bi-pair}
::: {.bi-en lang="en"}
The inner product $\langle x,y\rangle$ measures similarity between two signals. It also provides the foundation for correlation, pattern matching, and convolution analysis. In a complex vector space, an inner product satisfies
:::

::: {.bi-zh lang="zh-CN"}
内积 $\langle x,y\rangle$ 衡量两个信号之间的相似程度，也是相关、模式匹配和卷积分析的基础。在复向量空间中，内积满足
:::
:::

$$
\begin{aligned}
\langle x+y,z\rangle&=\langle x,z\rangle+\langle y,z\rangle,\\
\langle \alpha x,y\rangle&=\alpha\langle x,y\rangle,\\
\langle x,y\rangle^*&=\langle y,x\rangle,\\
\langle x,x\rangle&\ge 0,
\end{aligned}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
and $\langle x,x\rangle=0$ if and only if $x=0$. Common standard inner products are
:::

::: {.bi-zh lang="zh-CN"}
并且当且仅当 $x=0$ 时，$\langle x,x\rangle=0$。常用的标准内积为
:::
:::

$$
\begin{aligned}
\langle x,y\rangle_{\mathbb C^N}
&=\sum_{n=0}^{N-1}x_ny_n^*,\\
\langle x,y\rangle_{\ell^2}
&=\sum_{n=-\infty}^{\infty}x[n]y^*[n],\\
\langle x,y\rangle_{L^2}
&=\int_{-\infty}^{\infty}x(t)y^*(t)\,dt.
\end{aligned}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
A norm $\|x\|$ represents the length or magnitude of a signal. It satisfies positive definiteness, absolute homogeneity, and the triangle inequality:
:::

::: {.bi-zh lang="zh-CN"}
范数 $\|x\|$ 表示信号的长度或大小，并满足正定性、绝对齐次性和三角不等式：
:::
:::

$$
\|x\|\ge0,\qquad \|\alpha x\|=|\alpha|\|x\|,
\qquad \|x+y\|\le\|x\|+\|y\|.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The 2-norm induced by an inner product is
:::

::: {.bi-zh lang="zh-CN"}
由内积诱导的 2-范数为
:::
:::

$$
\|x\|_2=\sqrt{\langle x,x\rangle}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The corresponding 2-norms for a finite-dimensional vector, a discrete-time sequence, and a continuous-time signal are
:::

::: {.bi-zh lang="zh-CN"}
有限维向量、离散时间序列和连续时间信号所对应的 2-范数分别为
:::
:::

$$
\left(\sum_{n=0}^{N-1}|x_n|^2\right)^{1/2},\qquad
\left(\sum_{n=-\infty}^{\infty}|x[n]|^2\right)^{1/2},\qquad
\left(\int_{-\infty}^{\infty}|x(t)|^2dt\right)^{1/2}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Square-summable sequences form $\ell^2(\mathbb Z)$, while square-integrable functions form $L^2(\mathbb R)$. More generally, $\ell^p$ and $L^p$ use the $p$-norm. The spaces $\ell^\infty$ and $L^\infty$ measure signal magnitude by the supremum of its absolute value.

This viewpoint also explains signal denoising. If a clean signal belongs to a subspace $S$, a noisy signal $x$ can be projected onto $S$ to obtain an estimate $\hat x$. The error $x-\hat x$ is orthogonal to $S$.
:::

::: {.bi-zh lang="zh-CN"}
平方可和序列构成 $\ell^2(\mathbb Z)$，平方可积函数构成 $L^2(\mathbb R)$。更一般地，$\ell^p$ 和 $L^p$ 使用 $p$-范数，而 $\ell^\infty$ 和 $L^\infty$ 通过绝对值的上确界衡量信号大小。

这一视角也能解释信号去噪。如果干净信号属于子空间 $S$，就可以把含噪信号 $x$ 投影到 $S$ 上得到估计 $\hat x$，并且误差 $x-\hat x$ 与 $S$ 正交。
:::
:::

#### 1.1.5 Common Signal Classifications

##### Deterministic and Random Signals

::: {.bi-pair}
::: {.bi-en lang="en"}
- A **deterministic signal** can be described by an exact mathematical expression or rule. Its value is uniquely determined once the independent variable is given.
- A **random signal** cannot be predicted completely by a deterministic expression. Even at a specified time, its value remains a random variable and is usually described through probability distributions, means, and correlation functions.
:::

::: {.bi-zh lang="zh-CN"}
- **确定性信号**可以由精确的数学表达式或规则描述；给定自变量后，其取值唯一确定。
- **随机信号**无法由确定性表达式完全预测。即使指定时刻，其取值仍是随机变量，通常用概率分布、均值和相关函数描述。
:::
:::

##### Energy and Power Signals

::: {.bi-pair}
::: {.bi-en lang="en"}
For a physical resistor, power is proportional to the square of the voltage. Signal theory extends this form to general signals and omits proportionality constants that do not affect classification.

The total energy and average power of a continuous-time signal are
:::

::: {.bi-zh lang="zh-CN"}
对于物理电阻，功率与电压的平方成正比。信号理论将这一形式推广到一般信号，并省略不影响分类的比例常数。

连续时间信号的总能量和平均功率为
:::
:::

$$
E_\infty=\int_{-\infty}^{\infty}|x(t)|^2dt,
\qquad
P_\infty=\lim_{T\to\infty}\frac{1}{2T}
\int_{-T}^{T}|x(t)|^2dt.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For a discrete-time signal, the corresponding definitions are
:::

::: {.bi-zh lang="zh-CN"}
对于离散时间信号，相应定义为
:::
:::

$$
E_\infty=\sum_{n=-\infty}^{\infty}|x[n]|^2,
\qquad
P_\infty=\lim_{N\to\infty}\frac{1}{2N+1}
\sum_{n=-N}^{N}|x[n]|^2.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
- If $0<E_\infty<\infty$, the signal is an **energy signal**, and $P_\infty=0$.
- If $0<P_\infty<\infty$, the signal is a **power signal**, and normally $E_\infty=\infty$.
- If neither quantity meets the corresponding finite condition, the signal is neither an energy signal nor a power signal.
- The zero signal is a special case whose energy and power are both zero.

A bounded signal with finite duration is usually an energy signal. A nonzero periodic signal is usually a power signal. For a periodic signal, the average only needs to be evaluated over one period:
:::

::: {.bi-zh lang="zh-CN"}
- 若 $0<E_\infty<\infty$，则该信号是**能量信号**，且 $P_\infty=0$。
- 若 $0<P_\infty<\infty$，则该信号是**功率信号**，并且通常 $E_\infty=\infty$。
- 若两个量均不满足相应的有限性条件，则该信号既不是能量信号，也不是功率信号。
- 零信号是特殊情况，其能量和功率均为零。

持续时间有限的有界信号通常是能量信号；非零周期信号通常是功率信号。对于周期信号，只需在一个周期内计算平均值：
:::
:::

$$
P=\frac{1}{T_0}\int_{t_0}^{t_0+T_0}|x(t)|^2dt
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
P=\frac{1}{N_0}\sum_{n=n_0}^{n_0+N_0-1}|x[n]|^2.
$$

##### Periodic and Aperiodic Signals

::: {.bi-pair}
::: {.bi-en lang="en"}
A continuous-time signal is periodic if there exists a $T>0$ such that
:::

::: {.bi-zh lang="zh-CN"}
若存在 $T>0$ 使得下式成立，则连续时间信号是周期信号：
:::
:::

$$
x(t+T)=x(t),\qquad \forall t,
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
for every $t$. The smallest positive value that satisfies this condition is the fundamental period $T_0$. A discrete-time signal is periodic if there exists a positive integer $N$ such that
:::

::: {.bi-zh lang="zh-CN"}
上式对每个 $t$ 都成立。满足该条件的最小正数称为基波周期 $T_0$。若存在正整数 $N$ 使得下式成立，则离散时间信号是周期信号：
:::
:::

$$
x[n+N]=x[n],\qquad \forall n,
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
for every $n$. The smallest such positive integer is the fundamental period $N_0$. A constant signal remains unchanged under every positive shift, so it has no unique smallest positive period.
:::

::: {.bi-zh lang="zh-CN"}
上式对每个 $n$ 都成立。满足该条件的最小正整数称为基波周期 $N_0$。常数信号在任意正移位下均保持不变，因此不存在唯一的最小正周期。
:::
:::

##### Even and Odd Signals

::: {.bi-pair}
::: {.bi-en lang="en"}
An even signal is symmetric about the vertical axis, while an odd signal is antisymmetric about the origin:
:::

::: {.bi-zh lang="zh-CN"}
偶信号关于纵轴对称，而奇信号关于原点反对称：
:::
:::

$$
\begin{aligned}
x(t)&=x(-t) &&\text{even signal},\\
x(t)&=-x(-t) &&\text{odd signal}.
\end{aligned}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For a discrete-time signal, replace $t$ with $n$. If an odd signal has a finite value at the origin, then $x(0)=0$.

Every signal has a unique decomposition into an even part and an odd part:
:::

::: {.bi-zh lang="zh-CN"}
对于离散时间信号，将 $t$ 替换为 $n$。如果奇信号在原点处取有限值，则 $x(0)=0$。

任意信号都可以唯一地分解为偶部与奇部之和：
:::
:::

$$
x(t)=x_e(t)+x_o(t),
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
x_e(t)=\frac{x(t)+x(-t)}{2},\qquad
x_o(t)=\frac{x(t)-x(-t)}{2}.
$$

### 1.2 Transformation of Independent Variable

::: {.bi-pair}
::: {.bi-en lang="en"}
Transformations of the independent variable change a signal's position, direction, or rate of variation along the time axis. They do not directly change the set of signal values. When sketching a transformed signal, track where each distinctive point of the original signal moves.
:::

::: {.bi-zh lang="zh-CN"}
自变量变换会改变信号沿时间轴的位置、方向或变化速率，但不会直接改变信号值的集合。绘制变换后的信号时，应跟踪原信号中每个特征点移动到的位置。
:::
:::

#### 1.2.1 Time Shifting

$$
x(t)\to x(t-t_0),\qquad x[n]\to x[n-n_0].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
- $t_0>0$ or $n_0>0$: shift to the right, called a delay.
- $t_0<0$ or $n_0<0$: shift to the left, called an advance.

Do not determine the direction from the sign inside the parentheses alone. Instead, equate the new argument to the location of a feature in the original signal. If the original signal has a peak at $t=t_1$, the peak of $x(t-t_0)$ satisfies $t-t_0=t_1$ and therefore occurs at $t=t_1+t_0$.
:::

::: {.bi-zh lang="zh-CN"}
- $t_0>0$ 或 $n_0>0$：向右移位，称为延迟。
- $t_0<0$ 或 $n_0<0$：向左移位，称为超前。

不要仅根据括号内的符号判断移位方向，而应令新自变量等于原信号某个特征点的位置。如果原信号在 $t=t_1$ 处有峰值，则 $x(t-t_0)$ 的峰值满足 $t-t_0=t_1$，所以位于 $t=t_1+t_0$。
:::
:::

#### 1.2.2 Time Reversal

$$
x(t)\to x(-t),\qquad x[n]\to x[-n].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Time reversal reflects the signal about $t=0$ or $n=0$. Playing a tape backward is an intuitive example.
:::

::: {.bi-zh lang="zh-CN"}
时间反转把信号关于 $t=0$ 或 $n=0$ 镜像翻转。倒放磁带是一个直观例子。
:::
:::

#### 1.2.3 Time Scaling

::: {.bi-pair}
::: {.bi-en lang="en"}
For a continuous-time signal,
:::

::: {.bi-zh lang="zh-CN"}
对于连续时间信号，
:::
:::

$$
x(t)\to x(at).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}

| Range of $a$ | Effect |
| --- | --- |
| $a>1$ | Forward compression; the signal varies faster |
| $0<a<1$ | Forward expansion; the signal varies more slowly |
| $-1<a<0$ | Reversal followed by expansion |
| $a<-1$ | Reversal followed by compression |

A feature located at $t=t_1$ in the original signal moves to $t=t_1/a$. The horizontal scale therefore changes by a factor of $1/|a|$.

Discrete-time scaling is restricted by the integer index. For a positive integer $M$, $x[Mn]$ keeps every $M$th sample of the original sequence and performs decimation. The expression $x[n/M]$ is undefined whenever $n/M$ is not an integer unless an interpolation rule specifies the missing values.
:::

::: {.bi-zh lang="zh-CN"}

| $a$ 的范围 | 效果 |
| --- | --- |
| $a>1$ | 正向压缩；信号变化更快 |
| $0<a<1$ | 正向扩展；信号变化更慢 |
| $-1<a<0$ | 先反转，再扩展 |
| $a<-1$ | 先反转，再压缩 |

原信号中位于 $t=t_1$ 的特征点移动到 $t=t_1/a$，因此水平尺度按 $1/|a|$ 的倍数变化。

离散时间尺度变换受到整数索引的限制。对于正整数 $M$，$x[Mn]$ 保留原序列的每第 $M$ 个采样点，实现抽取。除非用插值规则规定缺失值，否则当 $n/M$ 不是整数时，$x[n/M]$ 没有定义。
:::
:::

#### 1.2.4 General Affine Transformation

$$
x(t)\to x(\alpha t+\beta).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The most reliable sketching method maps distinctive points. A feature located at $t=t_1$ in the original signal satisfies
:::

::: {.bi-zh lang="zh-CN"}
最可靠的绘图方法是映射特征点。若某个特征在原信号中位于 $t=t_1$，则它在变换后的信号中满足
:::
:::

$$
\alpha t+\beta=t_1,
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
in the transformed signal, so it moves to
:::

::: {.bi-zh lang="zh-CN"}
因此它移动到
:::
:::

$$
t=\frac{t_1-\beta}{\alpha}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The transformation can also be decomposed into elementary operations. To shift first and scale afterward, first form $x(t+\beta)$ and then replace $t$ by $at$, which gives $x(\alpha t+\beta)$. For example,
:::

::: {.bi-zh lang="zh-CN"}
该变换也可以分解为基本操作。若先移位、后缩放，先构造 $x(t+\beta)$，再用 $at$ 替换 $t$，即可得到 $x(\alpha t+\beta)$。例如，
:::
:::

$$
x(-3t-2)
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
can be obtained by first changing $x(t)$ into $x(t-2)$ and then applying $t\mapsto-3t$. Regardless of the chosen decomposition, verify the result with the distinctive-point equation.
:::

::: {.bi-zh lang="zh-CN"}
可以先把 $x(t)$ 变为 $x(t-2)$，再应用 $t\mapsto-3t$ 得到。无论采用何种分解，都应使用特征点方程验证结果。
:::
:::

### 1.3 Basic Signals: Exponential & Sinusoidal Signals

#### 1.3.1 Continuous-Time Real Exponential Signals

::: {.bi-pair}
::: {.bi-en lang="en"}
The general form is
:::

::: {.bi-zh lang="zh-CN"}
一般形式为
:::
:::

$$
x(t)=Ce^{at},\qquad C,a\in\mathbb R.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
- $a>0$: exponential growth as $t$ increases.
- $a<0$: exponential decay as $t$ increases.
- $a=0$: $x(t)=C$, a constant signal.

The parameter $C$ determines the amplitude and sign, while $a$ determines the growth or decay rate. Exponential signals commonly describe capacitor charging and discharging in RC circuits, damped mechanical responses, and population growth.
:::

::: {.bi-zh lang="zh-CN"}
- $a>0$：随着 $t$ 增大而指数增长。
- $a<0$：随着 $t$ 增大而指数衰减。
- $a=0$：$x(t)=C$，即常数信号。

参数 $C$ 决定幅度和符号，参数 $a$ 决定增长或衰减速率。指数信号常用于描述 RC 电路中电容器的充放电、阻尼机械响应以及种群增长。
:::
:::

#### 1.3.2 Continuous-Time Complex Exponentials and Euler's Formula

::: {.bi-pair}
::: {.bi-en lang="en"}
When the exponent is purely imaginary,
:::

::: {.bi-zh lang="zh-CN"}
当指数为纯虚数时，
:::
:::

$$
x(t)=e^{j\omega_0t}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Euler's formula gives
:::

::: {.bi-zh lang="zh-CN"}
由欧拉公式可得
:::
:::

$$
e^{j\omega_0t}=\cos(\omega_0t)+j\sin(\omega_0t).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The real and imaginary parts of the complex exponential are a cosine and a sine, respectively. The signal rotates in the complex plane at a constant angular velocity and has unit magnitude.

Angular frequency, ordinary frequency, and period are related by
:::

::: {.bi-zh lang="zh-CN"}
复指数的实部和虚部分别是余弦和正弦。该信号以恒定角速度在复平面中旋转，并且幅值为 1。

角频率、普通频率与周期之间的关系为
:::
:::

$$
f_0=\frac{\omega_0}{2\pi},\qquad
T_0=\frac{2\pi}{|\omega_0|}=\frac{1}{|f_0|},
\qquad \omega_0\ne0.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The unit of $\omega_0$ is rad/s, and the unit of $f_0$ is hertz(Hz). A negative frequency represents rotation in the opposite direction in the complex plane. The fundamental angular frequency is normally stated as $|\omega_0|$.

Multiplication by a complex constant $C=|C|e^{j\phi}$ gives
:::

::: {.bi-zh lang="zh-CN"}
$\omega_0$ 的单位是 rad/s，$f_0$ 的单位是赫兹（Hz）。负频率表示在复平面中沿相反方向旋转。基波角频率通常写成 $|\omega_0|$。

乘以复常数 $C=|C|e^{j\phi}$ 可得
:::
:::

$$
Ce^{j\omega_0t}=|C|e^{j(\omega_0t+\phi)}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The magnitude $|C|$ controls the amplitude, while $\phi$ controls the initial phase.
:::

::: {.bi-zh lang="zh-CN"}
幅值 $|C|$ 控制振幅，而 $\phi$ 控制初相位。
:::
:::

#### 1.3.3 Sinusoidal Signals and Complex Exponential Representation

::: {.bi-pair}
::: {.bi-en lang="en"}
A continuous-time sinusoidal signal can be written as
:::

::: {.bi-zh lang="zh-CN"}
连续时间正弦信号可以写成
:::
:::

$$
x(t)=A\cos(\omega_0t+\phi).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Its amplitude is $|A|$, its angular frequency is $|\omega_0|$, and its initial phase is $\phi$. Euler's formula gives
:::

::: {.bi-zh lang="zh-CN"}
其振幅为 $|A|$，角频率为 $|\omega_0|$，初相位为 $\phi$。由欧拉公式可得
:::
:::

$$
A\cos(\omega_0t+\phi)
=\frac{A}{2}e^{j\phi}e^{j\omega_0t}
+\frac{A}{2}e^{-j\phi}e^{-j\omega_0t},
$$

$$
A\sin(\omega_0t+\phi)
=\operatorname{Im}\left\{Ae^{j(\omega_0t+\phi)}\right\}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
A real cosine can therefore be viewed as the sum of two complex exponentials with opposite frequencies. Complex exponentials are natural building blocks for Fourier analysis and LTI system analysis.
:::

::: {.bi-zh lang="zh-CN"}
因此，实余弦信号可以看作频率互为相反数的两个复指数信号之和。复指数是傅里叶分析和 LTI 系统分析中的自然构成单元。
:::
:::

#### 1.3.4 General Continuous-Time Complex Exponentials

::: {.bi-pair}
::: {.bi-en lang="en"}
Let
:::

::: {.bi-zh lang="zh-CN"}
令
:::
:::

$$
C=|C|e^{j\phi},\qquad a=r+j\omega_0,
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Then
:::

::: {.bi-zh lang="zh-CN"}
则
:::
:::

$$
\begin{aligned}
x(t)&=Ce^{at}\\
&=|C|e^{rt}e^{j(\omega_0t+\phi)}\\
&=|C|e^{rt}\cos(\omega_0t+\phi)
+j|C|e^{rt}\sin(\omega_0t+\phi).
\end{aligned}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The real part $r$ determines whether the envelope grows or decays, while the imaginary part $\omega_0$ determines the oscillation frequency. The cases $r<0$, $r>0$, and $r=0$ correspond to a decaying oscillation, a growing oscillation, and a constant-amplitude oscillation, respectively.
:::

::: {.bi-zh lang="zh-CN"}
实部 $r$ 决定包络是增长还是衰减，虚部 $\omega_0$ 决定振荡频率。$r<0$、$r>0$ 和 $r=0$ 分别对应衰减振荡、增长振荡和等幅振荡。
:::
:::

#### 1.3.5 Discrete-Time Exponential Signals

::: {.bi-pair}
::: {.bi-en lang="en"}
The general form of a discrete-time complex exponential is
:::

::: {.bi-zh lang="zh-CN"}
离散时间复指数信号的一般形式为
:::
:::

$$
x[n]=C\alpha^n=Ce^{\beta n},
\qquad \alpha=e^\beta.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
When $C,\alpha\in\mathbb R$:

- $\alpha>1$: monotonically growing magnitude.
- $0<\alpha<1$: monotonically decaying magnitude.
- $\alpha=1$: constant sequence.
- $\alpha<-1$: growing magnitude with alternating sign.
- $-1<\alpha<0$: decaying magnitude with alternating sign.
- $\alpha=-1$: constant magnitude with alternating sign.

If
:::

::: {.bi-zh lang="zh-CN"}
当 $C,\alpha\in\mathbb R$ 时：

- $\alpha>1$：幅值单调增长。
- $0<\alpha<1$：幅值单调衰减。
- $\alpha=1$：常数序列。
- $\alpha<-1$：幅值增长且符号交替。
- $-1<\alpha<0$：幅值衰减且符号交替。
- $\alpha=-1$：幅值恒定且符号交替。

若
:::
:::

$$
C=|C|e^{j\phi},\qquad \alpha=|\alpha|e^{j\omega_0},
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
x[n]=|C||\alpha|^n e^{j(\omega_0n+\phi)}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The magnitude $|\alpha|$ determines the envelope, while $\omega_0$ determines the phase increment per sample.
:::

::: {.bi-zh lang="zh-CN"}
幅值 $|\alpha|$ 决定包络，$\omega_0$ 决定每个采样点的相位增量。
:::
:::

#### 1.3.6 Periodicity and Aliasing of Discrete-Time Complex Exponentials

::: {.bi-pair}
::: {.bi-en lang="en"}
For
:::

::: {.bi-zh lang="zh-CN"}
对于
:::
:::

$$
x[n]=e^{j\omega_0n},
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
periodicity requires a positive integer $N$ such that
:::

::: {.bi-zh lang="zh-CN"}
周期性要求存在正整数 $N$，使得
:::
:::

$$
e^{j\omega_0(n+N)}=e^{j\omega_0n}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Canceling the common factor gives
:::

::: {.bi-zh lang="zh-CN"}
消去公共因子得到
:::
:::

$$
e^{j\omega_0N}=1
\iff \omega_0N=2\pi k,
\qquad k\in\mathbb Z.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Therefore, a discrete-time complex exponential is periodic if and only if
:::

::: {.bi-zh lang="zh-CN"}
因此，离散时间复指数信号是周期信号，当且仅当
:::
:::

$$
\frac{\omega_0}{2\pi}\in\mathbb Q.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
If $\omega_0=2\pi k/N$, reduce the fraction by the greatest common divisor of $k$ and $N$. The resulting denominator is the fundamental period:
:::

::: {.bi-zh lang="zh-CN"}
如果 $\omega_0=2\pi k/N$，应使用 $k$ 和 $N$ 的最大公约数约分。约分后得到的分母就是基波周期：
:::
:::

$$
N_0=\frac{N}{\gcd(N,k)}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For example, $e^{j3\pi n}=e^{j\pi n}$. Its fundamental period is $2$, and $3\pi$ should not be treated directly as the fundamental angular frequency.

In continuous time, distinct values of $\omega$ produce distinct signals. In discrete time,
:::

::: {.bi-zh lang="zh-CN"}
例如，$e^{j3\pi n}=e^{j\pi n}$，其基波周期为 $2$，不能直接把 $3\pi$ 当作基波角频率。

在连续时间中，不同的 $\omega$ 会产生不同的信号；而在离散时间中，
:::
:::

$$
e^{j(\omega_0+2\pi k)n}=e^{j\omega_0n},
\qquad k\in\mathbb Z.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Thus, discrete-time frequency is periodic with period $2\pi$. It is sufficient to consider any interval of length $2\pi$, such as $(-\pi,\pi]$. Discrete samples cannot distinguish frequencies separated by an integer multiple of $2\pi$, which is the basic form of frequency aliasing.

| Property | CT : $e^{j\omega_0t}$ | DT : $e^{j\omega_0n}$ |
| --- | --- | --- |
| Do distinct frequencies always produce distinct signals? | Yes | No. Frequencies separated by $2\pi k$ produce the same signal |
| Is the signal always periodic? | Yes. When $\omega_0=0$, it is constant and has no unique fundamental period | Only when $\omega_0/(2\pi)$ is rational |
| Fundamental period | $\frac{2\pi}{\lvert\omega_0\rvert}$ | The smallest positive integer $N_0$ satisfying $\omega_0N_0=2\pi k$ |

:::

::: {.bi-zh lang="zh-CN"}
因此，离散时间频率以 $2\pi$ 为周期。只需考虑任意长度为 $2\pi$ 的区间，例如 $(-\pi,\pi]$。离散采样无法区分相差 $2\pi$ 整数倍的频率，这就是频率混叠的基本形式。

| 性质 | CT：$e^{j\omega_0t}$ | DT：$e^{j\omega_0n}$ |
| --- | --- | --- |
| 不同频率是否总产生不同信号？ | 是 | 否，相差 $2\pi k$ 的频率产生相同信号 |
| 信号是否总是周期信号？ | 是；当 $\omega_0=0$ 时为常数，且无唯一基波周期 | 仅当 $\omega_0/(2\pi)$ 为有理数时 |
| 基波周期 | $\frac{2\pi}{\lvert\omega_0\rvert}$ | 满足 $\omega_0N_0=2\pi k$ 的最小正整数 $N_0$ |

:::
:::

### 1.4 Basic Signals: Unit Impulse & Unit Step Signals

#### 1.4.1 Discrete-Time Unit Impulse and Unit Step Sequences

::: {.bi-pair}
::: {.bi-en lang="en"}
The unit impulse sequence is defined as
:::

::: {.bi-zh lang="zh-CN"}
单位冲激序列定义为
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
The unit step sequence is defined as
:::

::: {.bi-zh lang="zh-CN"}
单位阶跃序列定义为
:::
:::

$$
u[n]=
\begin{cases}
0,&n<0,\\
1,&n\ge0.
\end{cases}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The two sequences are related through first difference and running sum:
:::

::: {.bi-zh lang="zh-CN"}
两个序列通过一阶差分和累加和联系起来：
:::
:::

$$
\delta[n]=u[n]-u[n-1],
$$

$$
u[n]=\sum_{m=-\infty}^{n}\delta[m]
=\sum_{k=0}^{\infty}\delta[n-k].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The impulse sequence has the sampling property:
:::

::: {.bi-zh lang="zh-CN"}
冲激序列具有采样性质：
:::
:::

$$
x[n]\delta[n] = x[0]\delta[n]
$$

$$
x[n]\delta[n-k]=x[k]\delta[n-k].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The factor $\delta[n-k]$ is nonzero only at $n=k$, so the product retains only $x[k]$. Consequently, every discrete-time signal can be expanded as a linear combination of shifted impulses:
:::

::: {.bi-zh lang="zh-CN"}
因子 $\delta[n-k]$ 仅在 $n=k$ 时非零，因此乘积只保留 $x[k]$。所以，任意离散时间信号都可以展开为移位冲激的线性组合：
:::
:::

$$
x[n]=\sum_{k=-\infty}^{\infty}x[k]\delta[n-k].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Here, $\delta[n-k]$ acts as a standard basis vector in sequence space, and $x[k]$ is the coordinate of the signal at index $k$.
:::

::: {.bi-zh lang="zh-CN"}
这里，$\delta[n-k]$ 相当于序列空间中的标准基向量，$x[k]$ 是信号在索引 $k$ 处的坐标。
:::
:::

#### 1.4.2 Continuous-Time Unit Step Function

::: {.bi-pair}
::: {.bi-en lang="en"}
The Heaviside unit step function is defined as
:::

::: {.bi-zh lang="zh-CN"}
Heaviside 单位阶跃函数定义为
:::
:::

$$
u(t)=
\begin{cases}
0,&t<0,\\
1,&t>0.
\end{cases}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The value of $u(0)$ does not affect many continuous-time operations. Depending on the convention, it may be defined as $0$, $1$, or $1/2$. The choice $u(0)=1/2$ is common when symmetry or Fourier transforms are involved.

The shifted step $u(t-t_0)$ jumps from 0 to 1 at $t=t_0$. A piecewise-constant signal with several jumps can be represented as a sum of shifted steps. The coefficient of each term equals the new value minus the old value at that point. For example,
:::

::: {.bi-zh lang="zh-CN"}
$u(0)$ 的取值不影响许多连续时间运算。根据约定，它可以定义为 $0$、$1$ 或 $1/2$；涉及对称性或傅里叶变换时常取 $u(0)=1/2$。

移位阶跃 $u(t-t_0)$ 在 $t=t_0$ 处从 0 跳变到 1。具有多个跳变的分段常数信号可以表示为若干移位阶跃之和，每一项的系数等于该点的新值减去旧值。例如，
:::
:::

$$
x(t)=2u(t-1)-3u(t-2)+2u(t-4)
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
has jump sizes $2,-3,2$ at $t=1,2,4$, respectively.
:::

::: {.bi-zh lang="zh-CN"}
在 $t=1,2,4$ 处的跳变量分别为 $2,-3,2$。
:::
:::

#### 1.4.3 Continuous-Time Unit Impulse

::: {.bi-pair}
::: {.bi-en lang="en"}
The Dirac impulse $\delta(t)$ is a generalized function rather than an ordinary function with a finite value at every point. It satisfies
:::

::: {.bi-zh lang="zh-CN"}
Dirac 冲激 $\delta(t)$ 是广义函数，而不是在每一点都具有有限值的普通函数。它满足
:::
:::

$$
\delta(t)=0\quad(t\ne0),
\qquad
\int_{-\infty}^{\infty}\delta(t)dt=1.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
It can be interpreted as the limit of a narrow pulse whose width approaches zero and whose amplitude approaches infinity while its area remains one. It models an instantaneous force impulse, a point charge, or a point-mass density.

The unit step and unit impulse are related through differentiation and integration:
:::

::: {.bi-zh lang="zh-CN"}
它可以理解为窄脉冲的极限：脉冲宽度趋于零、振幅趋于无穷大，而面积保持为 1。它可以模拟瞬时力冲量、点电荷或点质量密度。

单位阶跃与单位冲激通过微分和积分联系起来：
:::
:::

$$
\delta(t)=\frac{du(t)}{dt},
\qquad
u(t)=\int_{-\infty}^{t}\delta(\tau)d\tau.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
If the step height is $A$, its derivative is an impulse with area $A$:
:::

::: {.bi-zh lang="zh-CN"}
如果阶跃高度为 $A$，其导数就是面积为 $A$ 的冲激：
:::
:::

$$
\frac{d}{dt}\big[A u(t-t_0)\big]=A\delta(t-t_0).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Therefore, every jump in a piecewise-constant signal produces an impulse in its derivative. The impulse weight equals the jump size. For the previous example,
:::

::: {.bi-zh lang="zh-CN"}
因此，分段常数信号中的每一次跳变都会在其导数中产生一个冲激，冲激权重等于跳变量。对于前面的例子，
:::
:::

$$
\frac{dx(t)}{dt}
=2\delta(t-1)-3\delta(t-2)+2\delta(t-4).
$$

#### 1.4.4 Sampling Property of the Impulse

::: {.bi-pair}
::: {.bi-en lang="en"}
The continuous-time impulse satisfies
:::

::: {.bi-zh lang="zh-CN"}
连续时间冲激满足
:::
:::

$$
x(t)\delta(t-t_0)=x(t_0)\delta(t-t_0).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Integration gives the sifting, or sampling, property:
:::

::: {.bi-zh lang="zh-CN"}
积分后得到筛选性质，也称采样性质：
:::
:::

$$
\int_{-\infty}^{\infty}x(t)\delta(t-t_0)dt=x(t_0).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
If the integration interval does not contain $t_0$, the result is zero. If the upper limit is the variable $t$, then
:::

::: {.bi-zh lang="zh-CN"}
如果积分区间不包含 $t_0$，结果为零。如果积分上限是变量 $t$，则
:::
:::

$$
\int_{-\infty}^{t}x(\tau)\delta(\tau-t_0)d\tau
=x(t_0)u(t-t_0).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
A continuous-time signal can also be written formally as a continuous superposition of impulses:
:::

::: {.bi-zh lang="zh-CN"}
连续时间信号还可以形式化地写成冲激的连续叠加：
:::
:::

$$
x(t)=\int_{-\infty}^{\infty}x(\tau)\delta(t-\tau)d\tau.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The discrete-time impulse expansion uses a sum, while the continuous-time expansion uses an integral. These representations lead directly to the convolution sum and convolution integral for linear time invariant (LTI) systems.
:::

::: {.bi-zh lang="zh-CN"}
离散时间冲激展开使用求和，而连续时间冲激展开使用积分。这些表示直接导出线性时不变（LTI）系统的卷积和与卷积积分。
:::
:::

### 1.5 Definitions and Representations of Systems

#### 1.5.1 Input-Output Relation

::: {.bi-pair}
::: {.bi-en lang="en"}
A system maps an input $x$ to an output $y$:
:::

::: {.bi-zh lang="zh-CN"}
系统把输入 $x$ 映射为输出 $y$：
:::
:::

$$
y=\mathcal T\{x\}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
A system can be described by an algebraic equation, a differential equation, a difference equation, a block diagram, a matrix, or an algorithm. These representations may look different, but they describe the same input-output mapping.

For a bank account, let $x[n]$ denote the net deposit on day $n$, let $y[n]$ denote the balance at the end of that day, and let $r$ denote the daily interest rate. Then
:::

::: {.bi-zh lang="zh-CN"}
系统可以用代数方程、微分方程、差分方程、框图、矩阵或算法描述。这些表示的外观可能不同，但描述的是同一个输入—输出映射。

以银行账户为例，令 $x[n]$ 表示第 $n$ 天的净存款，$y[n]$ 表示当天结束时的余额，$r$ 表示日利率，则
:::
:::

$$
y[n]=(1+r)y[n-1]+x[n].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The current output depends on the previous day's balance, so the system must retain a state.
:::

::: {.bi-zh lang="zh-CN"}
当前输出取决于前一天的余额，因此系统必须保存状态。
:::
:::

#### 1.5.2 Physical System Modeling

::: {.bi-pair}
::: {.bi-en lang="en"}
**RC circuit.** For a series resistor-capacitor circuit, the source voltage $V_s(t)$ is the input and the capacitor voltage $V_C(t)$ is the output. From
:::

::: {.bi-zh lang="zh-CN"}
**RC 电路。** 对于串联电阻—电容电路，电源电压 $V_s(t)$ 是输入，电容电压 $V_C(t)$ 是输出。由
:::
:::

$$
i(t)=\frac{V_s(t)-V_C(t)}{R},
\qquad
i(t)=C\frac{dV_C(t)}{dt},
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
we obtain
:::

::: {.bi-zh lang="zh-CN"}
可得
:::
:::

$$
\frac{dV_C(t)}{dt}+\frac{1}{RC}V_C(t)
=\frac{1}{RC}V_s(t).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
**Motion with drag.** Consider a body of mass $m$ under an applied force $f(t)$ and a drag force $\rho v(t)$ proportional to its velocity. Newton's second law gives
:::

::: {.bi-zh lang="zh-CN"}
**含阻力的运动。** 考虑质量为 $m$ 的物体，它受到外力 $f(t)$ 和与速度成正比的阻力 $\rho v(t)$。由牛顿第二定律可得
:::
:::

$$
\frac{dv(t)}{dt}+\frac{\rho}{m}v(t)=\frac{1}{m}f(t).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Both physical systems have the form
:::

::: {.bi-zh lang="zh-CN"}
两个物理系统都具有以下形式：
:::
:::

$$
\frac{dy(t)}{dt}+ay(t)=bx(t)
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Although their physical mechanisms differ, their mathematical models have the same structure. The same system-analysis methods can therefore be applied to both.
:::

::: {.bi-zh lang="zh-CN"}
尽管二者的物理机制不同，其数学模型具有相同结构，因此可以使用相同的系统分析方法。
:::
:::

#### 1.5.3 Common Elementary Systems

::: {.bi-pair}
::: {.bi-en lang="en"}
- Amplifier: $y(t)=c x(t)$.
- Adder: $y(t)=x_1(t)+x_2(t)$.
- Multiplier: $y(t)=x_1(t)x_2(t)$.
- Differentiator: $y(t)=dx(t)/dt$.
- Backward-difference system: $y[n]=x[n]-x[n-1]$.
- Integrator: $y(t)=\int_{-\infty}^{t}x(\tau)d\tau$.
- Accumulator: $y[n]=\sum_{k=-\infty}^{n}x[k]$.
:::

::: {.bi-zh lang="zh-CN"}
- 放大器：$y(t)=c x(t)$。
- 加法器：$y(t)=x_1(t)+x_2(t)$。
- 乘法器：$y(t)=x_1(t)x_2(t)$。
- 微分器：$y(t)=dx(t)/dt$。
- 后向差分系统：$y[n]=x[n]-x[n-1]$。
- 积分器：$y(t)=\int_{-\infty}^{t}x(\tau)d\tau$。
- 累加器：$y[n]=\sum_{k=-\infty}^{n}x[k]$。
:::
:::

#### 1.5.4 System Interconnections

::: {.bi-pair}
::: {.bi-en lang="en"}
A complex system can be assembled from interconnected subsystems. The boundary of a subsystem depends on the chosen level of abstraction. The three basic interconnection types are:

- **Series, or cascade:** The output of one system becomes the input of the next. The overall operator is $\mathcal T_2\circ\mathcal T_1$.
- **Parallel:** The same input enters multiple systems, and their outputs are added. The overall output is the sum of the subsystem outputs.
- **Feedback:** The output passes through a feedback system and returns to the input, where it is added to or subtracted from the external input. Feedback can change gain, dynamic behavior, and stability.
:::

::: {.bi-zh lang="zh-CN"}
复杂系统可以由相互连接的子系统构成。子系统的边界取决于所选择的抽象层次。三种基本连接方式为：

- **串联或级联：** 一个系统的输出成为下一个系统的输入，总算子为 $\mathcal T_2\circ\mathcal T_1$。
- **并联：** 同一输入进入多个系统，再将它们的输出相加；总输出等于各子系统输出之和。
- **反馈：** 输出经过反馈系统后返回输入端，并与外部输入相加或相减。反馈能够改变增益、动态行为和稳定性。
:::
:::

### 1.6 Basic System Properties

::: {.bi-pair}
::: {.bi-en lang="en"}
Let a system $\mathcal T$ transform an input $x$ into an output $y$. The following properties describe whether the system can operate in real time, whether it loses information, whether it can produce an unbounded output, and how readily it can be analyzed.
:::

::: {.bi-zh lang="zh-CN"}
设系统 $\mathcal T$ 将输入 $x$ 变换为输出 $y$。以下性质描述系统能否实时工作、是否丢失信息、是否会产生无界输出，以及分析它的难易程度。
:::
:::

#### 1.6.1 Memory

::: {.bi-pair}
::: {.bi-en lang="en"}
A system is **memoryless** if its output at any time depends only on the input value at that same time:
:::

::: {.bi-zh lang="zh-CN"}
如果系统在任意时刻的输出只取决于该时刻的输入值，则该系统是**无记忆的**：
:::
:::

$$
y(t)=F(x(t),t)
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
y[n]=F(x[n],n).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For example, an amplifier $y(t)=cx(t)$, an adder, and a multiplier are memoryless systems.

A system **has memory** if its current output depends on past or future input values, or on past output values. For example,
:::

::: {.bi-zh lang="zh-CN"}
例如，放大器 $y(t)=cx(t)$、加法器和乘法器都是无记忆系统。

如果当前输出依赖过去或未来的输入值，或依赖过去的输出值，则系统**具有记忆**。例如，
:::
:::

$$
y[n]=\sum_{k=-\infty}^{n}x[k]
=y[n-1]+x[n]
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
y(t)=\frac{1}{C}\int_{-\infty}^{t}x(\tau)d\tau
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
both have memory. A differentiator, time reversal $y[n]=x[-n]$, and time scaling $y(t)=x(at)$ also generally have memory because the output at a given time does not depend solely on the input at that same time.
:::

::: {.bi-zh lang="zh-CN"}
都具有记忆。微分器、时间反转 $y[n]=x[-n]$ 和时间缩放 $y(t)=x(at)$ 通常也具有记忆，因为给定时刻的输出并非只取决于同一时刻的输入。
:::
:::

#### 1.6.2 Invertibility

::: {.bi-pair}
::: {.bi-en lang="en"}
A system is invertible if distinct inputs always produce distinct outputs. Equivalently, an inverse system $\mathcal T^{-1}$ exists such that
:::

::: {.bi-zh lang="zh-CN"}
如果不同输入总会产生不同输出，则系统是可逆的。等价地，存在逆系统 $\mathcal T^{-1}$，使得
:::
:::

$$
\mathcal T^{-1}\{\mathcal T\{x\}\}=x.
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
y(t)=2x(t)
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
has the inverse $x(t)=y(t)/2$. The system
:::

::: {.bi-zh lang="zh-CN"}
其逆系统为 $x(t)=y(t)/2$。而系统
:::
:::

$$
y(t)=x^2(t)
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
is generally noninvertible because $x(t)$ and $-x(t)$ produce the same output. The zero-output system is also noninvertible. Invertibility means that the system preserves the input information, which is important in channel coding and lossless compression.
:::

::: {.bi-zh lang="zh-CN"}
通常不可逆，因为 $x(t)$ 和 $-x(t)$ 会产生相同输出。恒零输出系统也不可逆。可逆性意味着系统保留了输入信息，这对信道编码和无损压缩十分重要。
:::
:::

#### 1.6.3 Causality

::: {.bi-pair}
::: {.bi-en lang="en"}
In a causal system, the output at any time $t_0$ can depend only on input values for $t\le t_0$. It cannot depend on future inputs. More precisely, if two inputs are identical for all $t\le t_0$, their corresponding outputs must also be identical for all $t\le t_0$.

The discrete-time definition follows by replacing $t$ with $n$. To test causality, inspect the input indices used by the output expression:

- $y(t)=x(2t-1)$ is noncausal. Although it accesses past values at some times, $2t-1>t$ when $t>1$, so it also accesses future inputs.
- $y(t)=x(t+1)$ explicitly accesses a future value and is therefore noncausal.
- $y[n]=x[-n]$ is noncausal. For example, at $n=-5$, the output depends on $x[5]$.
- $y[n]=\dfrac{x^3[n-1]}{2n+1}$ uses only a past input value and is causal.

A real-time physical system must be causal. When processing a fully recorded signal offline, an algorithm may use samples that are future values relative to the current index, so noncausal processing remains useful. Causality in this temporal sense does not apply directly to spatial variables.
:::

::: {.bi-zh lang="zh-CN"}
在因果系统中，任意时刻 $t_0$ 的输出只能依赖满足 $t\le t_0$ 的输入值，不能依赖未来输入。更准确地说，如果两个输入在所有 $t\le t_0$ 上完全相同，则对应输出在所有 $t\le t_0$ 上也必须相同。

将 $t$ 替换为 $n$ 即得到离散时间定义。判断因果性时，应检查输出表达式所使用的输入索引：

- $y(t)=x(2t-1)$ 非因果。虽然它在某些时刻访问过去值，但当 $t>1$ 时有 $2t-1>t$，所以也会访问未来输入。
- $y(t)=x(t+1)$ 明确访问未来值，因此非因果。
- $y[n]=x[-n]$ 非因果。例如在 $n=-5$ 时，输出依赖 $x[5]$。
- $y[n]=\dfrac{x^3[n-1]}{2n+1}$ 只使用过去的输入值，因此是因果的。

实时物理系统必须是因果的。离线处理完整记录的信号时，算法可以使用相对于当前索引的未来样本，因此非因果处理仍有用途。这种时间意义上的因果性不能直接套用于空间变量。
:::
:::

#### 1.6.4 BIBO Stability

::: {.bi-pair}
::: {.bi-en lang="en"}
A system is **bounded-input, bounded-output (BIBO) stable** if every bounded input produces a bounded output. In other words, if a finite $B_x$ exists such that
:::

::: {.bi-zh lang="zh-CN"}
如果每一个有界输入都会产生有界输出，则系统是**有界输入—有界输出（BIBO）稳定的**。也就是说，若存在有限的 $B_x$，使得
:::
:::

$$
|x(t)|\le B_x
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
then a finite $B_y$ must exist such that
:::

::: {.bi-zh lang="zh-CN"}
则必须存在有限的 $B_y$，使得
:::
:::

$$
|y(t)|\le B_y.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
To prove instability, it is sufficient to find one bounded input that produces an unbounded output.

- $y(t)=t x(t)$ is unstable. The bounded input $x(t)=1$ produces the unbounded output $y(t)=t$.
- $y(t)=e^{x(t)}$ is stable. If $|x(t)|\le B$, then $e^{-B}\le y(t)\le e^B$.
- The accumulator $y[n]=\sum_{k=-\infty}^{n}x[k]$ is unstable. With $x[n]=u[n]$, the output grows with $n$.
:::

::: {.bi-zh lang="zh-CN"}
要证明系统不稳定，只需找到一个能够产生无界输出的有界输入。

- $y(t)=t x(t)$ 不稳定。有界输入 $x(t)=1$ 产生无界输出 $y(t)=t$。
- $y(t)=e^{x(t)}$ 稳定。若 $|x(t)|\le B$，则 $e^{-B}\le y(t)\le e^B$。
- 累加器 $y[n]=\sum_{k=-\infty}^{n}x[k]$ 不稳定。取 $x[n]=u[n]$ 时，输出随 $n$ 增长。
:::
:::

#### 1.6.5 Linearity

::: {.bi-pair}
::: {.bi-en lang="en"}
A system is linear if and only if it satisfies additivity and homogeneity. If
:::

::: {.bi-zh lang="zh-CN"}
系统是线性的，当且仅当它同时满足可加性和齐次性。若
:::
:::

$$
\mathcal T\{x_1\}=y_1,
\qquad
\mathcal T\{x_2\}=y_2,
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
then, for arbitrary scalars $a,b$, it must satisfy
:::

::: {.bi-zh lang="zh-CN"}
则对于任意标量 $a,b$，必须满足
:::
:::

$$
\mathcal T\{ax_1+bx_2\}=ay_1+by_2.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
This is the superposition property. A linear system must map the zero input to the zero output, but this zero-input test is necessary rather than sufficient for linearity.

Linearity cannot be established by testing only a few specific signals. Compare
:::

::: {.bi-zh lang="zh-CN"}
这就是叠加性质。线性系统必须把零输入映射为零输出，但零输入检验只是线性的必要条件，而不是充分条件。

不能仅通过测试少数几个特定信号来证明线性，应比较
:::
:::

$$
\mathcal T\{ax_1+bx_2\}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
with
:::

::: {.bi-zh lang="zh-CN"}
与
:::
:::

$$
a\mathcal T\{x_1\}+b\mathcal T\{x_2\}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For example, $y[n]=x^2[n]$ is nonlinear because squaring produces cross terms. The system $y(t)=x(2t)$ is linear because scaling the independent variable does not violate superposition. A constant-bias system $y(t)=x(t)+c$ is also nonlinear when $c\ne0$.

Many physical systems are nonlinear, but they can often be linearized for small perturbations around an operating point. Linear models remain important because they are analytically tractable and can describe local behavior accurately.
:::

::: {.bi-zh lang="zh-CN"}
例如，$y[n]=x^2[n]$ 是非线性的，因为平方运算会产生交叉项。系统 $y(t)=x(2t)$ 是线性的，因为缩放自变量不会破坏叠加性质。当 $c\ne0$ 时，带常数偏置的系统 $y(t)=x(t)+c$ 也是非线性的。

许多物理系统是非线性的，但通常可以在工作点附近针对小扰动进行线性化。线性模型仍然重要，因为它们便于解析处理，并能准确描述局部行为。
:::
:::

#### 1.6.6 Time Invariance

::: {.bi-pair}
::: {.bi-en lang="en"}
A system is time invariant if a shift in the input produces the same shift in the output. For a continuous-time system, if
:::

::: {.bi-zh lang="zh-CN"}
如果输入的移位会使输出产生完全相同的移位，则系统是时不变的。对于连续时间系统，若
:::
:::

$$
y(t)=\mathcal T\{x(t)\},
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
then, for every $t_0$,
:::

::: {.bi-zh lang="zh-CN"}
则对于任意 $t_0$，
:::
:::

$$
\mathcal T\{x(t-t_0)\}=y(t-t_0).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The discrete-time definition is
:::

::: {.bi-zh lang="zh-CN"}
离散时间定义为
:::
:::

$$
\mathcal T\{x[n-n_0]\}=y[n-n_0].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The standard test compares two paths:

1. Shift the input first and then pass it through the system to obtain $y_1$.
2. Pass the original input through the system first and then shift the output to obtain $y_2$.

The system is time invariant only if $y_1=y_2$ for every input and every shift.

- $y[n]=n x[n]$ is time varying because the explicit factor $n$ does not shift with the input.
- $y(t)=x^2(t+1)$ is time invariant. Although it contains a fixed advance, the system rule does not depend on absolute time.
- $y(t)=x(t)\cos(\omega t)$ is time varying because the carrier $\cos(\omega t)$ is fixed to the absolute time axis.

A direct consequence of time invariance is that if the input has period $T$, the output also satisfies $y(t+T)=y(t)$. The value $T$ is a period of the output, although it need not be the fundamental period.
:::

::: {.bi-zh lang="zh-CN"}
标准检验比较以下两条路径：

1. 先对输入移位，再通过系统，得到 $y_1$。
2. 先让原输入通过系统，再对输出移位，得到 $y_2$。

只有对任意输入和任意移位都有 $y_1=y_2$ 时，系统才是时不变的。

- $y[n]=n x[n]$ 是时变的，因为显式因子 $n$ 不会随输入一起移位。
- $y(t)=x^2(t+1)$ 是时不变的。虽然其中含有固定超前，但系统规则并不依赖绝对时间。
- $y(t)=x(t)\cos(\omega t)$ 是时变的，因为载波 $\cos(\omega t)$ 固定在绝对时间轴上。

时不变性的一个直接推论是：若输入的周期为 $T$，则输出也满足 $y(t+T)=y(t)$。$T$ 是输出的一个周期，但不一定是其基波周期。
:::
:::

#### 1.6.7 Linear Time-Invariant Systems and Impulse Response

::: {.bi-pair}
::: {.bi-en lang="en"}
A system that is both linear and time invariant is called a **linear time-invariant (LTI) system**. In a discrete-index setting, the term linear shift-invariant (LSI) system is also common.

LTI systems are important because signals can be decomposed into linear combinations of basic signals, and the response to a shifted input is the correspondingly shifted response. For a discrete-time LTI system $\mathcal T$, define its impulse response as the output produced by the unit impulse:
:::

::: {.bi-zh lang="zh-CN"}
同时具有线性和时不变性的系统称为**线性时不变（LTI）系统**。在离散索引情形下，也常称为线性移不变（LSI）系统。

LTI 系统之所以重要，是因为信号可以分解成基本信号的线性组合，而且移位输入的响应就是相应移位后的响应。对于离散时间 LTI 系统 $\mathcal T$，把单位冲激产生的输出定义为其冲激响应：
:::
:::

$$
h[n]=\mathcal T\{\delta[n]\}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Every input can be written as
:::

::: {.bi-zh lang="zh-CN"}
任意输入都可以写成
:::
:::

$$
x[n]=\sum_{k=-\infty}^{\infty}x[k]\delta[n-k].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
By linearity, the response to this weighted sum equals the weighted sum of the individual responses:
:::

::: {.bi-zh lang="zh-CN"}
根据线性性，该加权和的响应等于各个响应的加权和：
:::
:::

$$
y[n]
=\sum_{k=-\infty}^{\infty}x[k]\mathcal T\{\delta[n-k]\}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
By time invariance, the response to the shifted impulse $\delta[n-k]$ is $h[n-k]$. Therefore,
:::

::: {.bi-zh lang="zh-CN"}
根据时不变性，移位冲激 $\delta[n-k]$ 的响应为 $h[n-k]$。因此，
:::
:::

$$
y[n]=\sum_{k=-\infty}^{\infty}x[k]h[n-k]
=(x*h)[n].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
This is the discrete-time convolution sum. It follows directly from impulse decomposition, linearity, and time invariance. From a matrix viewpoint, a discrete-time LTI system corresponds to a doubly infinite Toeplitz matrix whose entries are constant along each diagonal. Multiplying this matrix by the input vector is equivalent to convolution.

Typical examples:

- The unit delay $y[n]=x[n-1]$ is linear, time invariant, and BIBO stable.
- The unit advance $y[n]=x[n+1]$ is also linear, time invariant, and BIBO stable, but it is noncausal.
- The accumulator is linear and time invariant, but it is not BIBO stable.

Later chapters develop convolution, impulse responses, and the causality and stability conditions for LTI systems in greater detail.
:::

::: {.bi-zh lang="zh-CN"}
这就是离散时间卷积和。它直接来源于冲激分解、线性性和时不变性。从矩阵角度看，离散时间 LTI 系统对应一个双无限 Toeplitz 矩阵，其每条对角线上的元素均为常数。该矩阵与输入向量相乘就等价于卷积。

典型例子：

- 单位延迟 $y[n]=x[n-1]$ 是线性、时不变且 BIBO 稳定的。
- 单位超前 $y[n]=x[n+1]$ 也是线性、时不变且 BIBO 稳定的，但它是非因果的。
- 累加器是线性且时不变的，但不是 BIBO 稳定的。

后续章节将更详细地讨论卷积、冲激响应以及 LTI 系统的因果性与稳定性条件。
:::
:::
