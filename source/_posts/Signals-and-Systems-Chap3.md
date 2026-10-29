---
title: Signals and Systems Chapter-3
date: 2026-10-29 11:14:41
updated: 2026-10-29
math: true
categories:
  - Signals and Systems
tags:
  - Signal Processing
  - Fourier Series
  - Continuous-Time Signals
  - Harmonic Analysis
  - Convergence
description: Signals and Systems Course Notes (Chapter-3)
index_img: /img/PeriodicComplexExponentialSignals.png
---

## 3. FOURIER SERIES

### 3.0 Introduction

#### 3.0.1 Basic Analysis Method for LTI Systems

::: {.bi-pair}
::: {.bi-en lang="en"}
The basic strategy for analyzing a linear time-invariant system is to choose elementary signals whose responses are simple. If an input can be expanded as
:::

::: {.bi-zh lang="zh-CN"}
分析线性时不变系统的基本思路，是选择系统响应较为简单的基本信号。若输入可以展开为
:::
:::

$$
x(t)=\sum_k a_k\phi_k(t),
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
and the response to each elementary signal is
:::

::: {.bi-zh lang="zh-CN"}
且系统对每个基本信号的响应为
:::
:::

$$
\mathcal S\{\phi_k(t)\}=\psi_k(t),
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
then linearity gives
:::

::: {.bi-zh lang="zh-CN"}
则由线性性可得
:::
:::

$$
y(t)=\mathcal S\{x(t)\}=\sum_k a_k\psi_k(t).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Chapter 2 used shifted impulses as elementary signals. This produces a time-domain description through convolution. Fourier analysis uses complex exponentials instead. Complex exponentials preserve their form when they pass through an LTI system, which turns the system operation into multiplication by a scalar.
:::

::: {.bi-zh lang="zh-CN"}
第 2 章使用移位冲激作为基本信号，并通过卷积得到时域描述。傅里叶分析则使用复指数。复指数通过 LTI 系统后保持其函数形式不变，系统运算因此转化为与一个标量相乘。
:::
:::

#### 3.0.2 Time-Domain and Frequency-Domain Building Blocks

::: {.bi-pair}
::: {.bi-en lang="en"}
The two viewpoints use different elementary signals:

- **Time domain:** shifted impulses $\delta(t-\tau)$ or $\delta[n-k]$.
- **Frequency domain:** complex exponentials $e^{j\omega t}$ or $e^{j\omega n}$.
- **Generalized exponential analysis:** $e^{st}$ in continuous time and $z^n$ in discrete time.

The impulse representation reveals how the system combines shifted copies of its impulse response. The exponential representation reveals how the system changes the magnitude and phase of each frequency component.
:::

::: {.bi-zh lang="zh-CN"}
这两种观点使用不同的基本信号：

- **时域：**移位冲激 $\delta(t-\tau)$ 或 $\delta[n-k]$。
- **频域：**复指数 $e^{j\omega t}$ 或 $e^{j\omega n}$。
- **广义指数分析：**连续时间中的 $e^{st}$ 和离散时间中的 $z^n$。

冲激表示揭示系统如何组合冲激响应的移位副本；复指数表示则揭示系统如何改变每个频率分量的幅度和相位。
:::
:::

### 3.1 Response of LTI Systems to Complex Exponentials

#### 3.1.1 Eigenvalues and Eigenfunctions

::: {.bi-pair}
::: {.bi-en lang="en"}
In linear algebra, a nonzero vector $v$ is an eigenvector of a matrix $A$ if applying $A$ changes only its scale:
:::

::: {.bi-zh lang="zh-CN"}
在线性代数中，若矩阵 $A$ 作用于非零向量 $v$ 后只改变其尺度，则 $v$ 是 $A$ 的特征向量：
:::
:::

$$
Av=\lambda v.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The same idea applies to systems. A nonzero signal $\phi(t)$ is an eigenfunction of a system $\mathcal S$ if
:::

::: {.bi-zh lang="zh-CN"}
同样的思想可以用于系统。若非零信号 $\phi(t)$ 满足
:::
:::

$$
\mathcal S\{\phi(t)\}=\lambda\phi(t),
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
where the scalar $\lambda$ is the associated eigenvalue. The input waveform is preserved, while its amplitude and phase may change.
:::

::: {.bi-zh lang="zh-CN"}
则 $\phi(t)$ 是系统 $\mathcal S$ 的特征函数，标量 $\lambda$ 是对应的特征值。输入的波形保持不变，但其幅度和相位可以发生变化。
:::
:::

#### 3.1.2 Continuous-Time Complex Exponentials

::: {.bi-pair}
::: {.bi-en lang="en"}
Let a continuous-time LTI system have impulse response $h(t)$ and input
:::

::: {.bi-zh lang="zh-CN"}
设连续时间 LTI 系统的冲激响应为 $h(t)$，输入为
:::
:::

$$
x(t)=e^{st}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Using the convolution integral,
:::

::: {.bi-zh lang="zh-CN"}
利用卷积积分，
:::
:::

$$
\begin{aligned}
y(t)
&=\int_{-\infty}^{\infty}h(\tau)e^{s(t-\tau)}\,d\tau\\
&=e^{st}\int_{-\infty}^{\infty}h(\tau)e^{-s\tau}\,d\tau\\
&=H(s)e^{st},
\end{aligned}
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
\boxed{H(s)=\int_{-\infty}^{\infty}h(\tau)e^{-s\tau}\,d\tau}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Therefore, $e^{st}$ is an eigenfunction of every CT LTI system for every value of $s$ for which the integral exists. The corresponding eigenvalue is the system function $H(s)$. For Fourier analysis, $s=j\omega$, so
:::

::: {.bi-zh lang="zh-CN"}
因此，只要积分存在，$e^{st}$ 对任意 $s$ 都是连续时间 LTI 系统的特征函数，对应特征值为系统函数 $H(s)$。在傅里叶分析中取 $s=j\omega$，于是
:::
:::

$$
e^{j\omega t}\longrightarrow H(j\omega)e^{j\omega t}.
$$

#### 3.1.3 Discrete-Time Complex Exponentials

::: {.bi-pair}
::: {.bi-en lang="en"}
The discrete-time result is analogous. For an LTI system with impulse response $h[n]$ and input $x[n]=z^n$,
:::

::: {.bi-zh lang="zh-CN"}
离散时间情形与此类似。对于冲激响应为 $h[n]$ 的 LTI 系统，若输入 $x[n]=z^n$，则
:::
:::

$$
\begin{aligned}
y[n]
&=\sum_{k=-\infty}^{\infty}h[k]z^{n-k}\\
&=z^n\sum_{k=-\infty}^{\infty}h[k]z^{-k}\\
&=H(z)z^n,
\end{aligned}
$$

$$
\boxed{H(z)=\sum_{k=-\infty}^{\infty}h[k]z^{-k}}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Thus, $z^n$ is an eigenfunction whenever the defining sum converges. Restricting $z$ to the unit circle, $z=e^{j\omega}$, gives the Fourier-analysis building block $e^{j\omega n}$.
:::

::: {.bi-zh lang="zh-CN"}
因此，只要定义该系统函数的级数收敛，$z^n$ 就是系统的特征函数。将 $z$ 限制在单位圆上，即令 $z=e^{j\omega}$，便得到傅里叶分析中的基本信号 $e^{j\omega n}$。
:::
:::

#### 3.1.4 Linear Combinations of Eigenfunctions

::: {.bi-pair}
::: {.bi-en lang="en"}
If the input is a linear combination of CT exponential eigenfunctions,
:::

::: {.bi-zh lang="zh-CN"}
若输入是连续时间复指数特征函数的线性组合，
:::
:::

$$
x(t)=\sum_k a_k e^{s_k t},
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
then superposition gives
:::

::: {.bi-zh lang="zh-CN"}
则由叠加性可得
:::
:::

$$
y(t)=\sum_k a_k H(s_k)e^{s_k t}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The input and output contain the same exponential modes. The system changes only the coefficient of each mode from $a_k$ to $a_kH(s_k)$. Fourier analysis therefore reduces two questions to a systematic procedure:

1. Which signals can be represented as linear combinations of complex exponentials?
2. How are the expansion coefficients calculated?
:::

::: {.bi-zh lang="zh-CN"}
输入和输出包含相同的指数模态。系统只把每个模态的系数由 $a_k$ 改变为 $a_kH(s_k)$。因此，傅里叶分析把问题归结为两个系统性步骤：

1. 哪些信号可以表示为复指数的线性组合？
2. 如何计算这些展开系数？
:::
:::

### 3.2 Fourier Series Representation of CT Periodic Signals

#### 3.2.1 Periodicity and Harmonics

::: {.bi-pair}
::: {.bi-en lang="en"}
A continuous-time signal is periodic with period $T>0$ if
:::

::: {.bi-zh lang="zh-CN"}
若连续时间信号存在周期 $T>0$，使得
:::
:::

$$
x(t+T)=x(t),\qquad \forall t\in\mathbb R.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The smallest positive period is the fundamental period. Its fundamental angular frequency is
:::

::: {.bi-zh lang="zh-CN"}
最小正周期称为基波周期，对应的基波角频率为
:::
:::

$$
\boxed{\omega_0=\frac{2\pi}{T}}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The harmonically related complex exponentials are
:::

::: {.bi-zh lang="zh-CN"}
相互成谐波关系的复指数为
:::
:::

$$
\phi_k(t)=e^{jk\omega_0t}=e^{jk(2\pi/T)t},\qquad k\in\mathbb Z.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The $k$th harmonic has angular frequency $k\omega_0$. The zero-frequency term $k=0$ is the DC component. Positive and negative indices represent conjugate frequency directions and are both needed in the complex representation.
:::

::: {.bi-zh lang="zh-CN"}
第 $k$ 次谐波的角频率为 $k\omega_0$。$k=0$ 的零频率项是直流分量。正、负下标表示互为共轭方向的频率分量，在复指数表示中二者都不可缺少。
:::
:::

#### 3.2.2 Complex and Trigonometric Forms

::: {.bi-pair}
::: {.bi-en lang="en"}
The complex exponential Fourier series of a periodic signal is
:::

::: {.bi-zh lang="zh-CN"}
周期信号的复指数傅里叶级数为
:::
:::

$$
\boxed{x(t)=\sum_{k=-\infty}^{\infty}a_ke^{jk\omega_0t}}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
An equivalent trigonometric form is
:::

::: {.bi-zh lang="zh-CN"}
等价的三角函数形式为
:::
:::

$$
x(t)=b_0+\sum_{k=1}^{\infty}
\left[b_k\cos(k\omega_0t)+c_k\sin(k\omega_0t)\right].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For $k>0$, the two coefficient sets are related by
:::

::: {.bi-zh lang="zh-CN"}
对于 $k>0$，两组系数之间的关系为
:::
:::

$$
a_0=b_0,\qquad
a_k=\frac{b_k-jc_k}{2},\qquad
a_{-k}=\frac{b_k+jc_k}{2}.
$$

#### 3.2.3 Orthonormality of Complex Harmonics

::: {.bi-pair}
::: {.bi-en lang="en"}
For any nonzero integer $k$, the integral of a complex harmonic over any complete period is zero:
:::

::: {.bi-zh lang="zh-CN"}
对于任意非零整数 $k$，复指数谐波在任意完整周期上的积分为零：
:::
:::

$$
\frac{1}{T}\int_{t_0}^{t_0+T}e^{jk\omega_0t}\,dt=0,
\qquad k\ne0.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Including $k=0$ gives the compact identity
:::

::: {.bi-zh lang="zh-CN"}
把 $k=0$ 的情形也包括在内，可写成紧凑形式
:::
:::

$$
\frac{1}{T}\int_{t_0}^{t_0+T}e^{jk\omega_0t}\,dt=\delta[k].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Define the inner product of two $T$-periodic signals by
:::

::: {.bi-zh lang="zh-CN"}
定义两个 $T$ 周期信号的内积为
:::
:::

$$
\langle f,g\rangle
=\frac{1}{T}\int_{t_0}^{t_0+T}f(t)g^*(t)\,dt.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Then the harmonic family is orthonormal:
:::

::: {.bi-zh lang="zh-CN"}
于是，这组谐波构成正交归一函数族：
:::
:::

$$
\left\langle e^{jm\omega_0t},e^{jn\omega_0t}\right\rangle
=\delta[m-n].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The corresponding sine and cosine functions are orthogonal. For positive integers $m$ and $n$,
:::

::: {.bi-zh lang="zh-CN"}
相应的正弦和余弦函数彼此正交。对于正整数 $m,n$，
:::
:::

$$
\begin{aligned}
\left\langle\sin(m\omega_0t),\sin(n\omega_0t)\right\rangle
&=\frac12\delta[m-n],\\
\left\langle\cos(m\omega_0t),\cos(n\omega_0t)\right\rangle
&=\frac12\delta[m-n],\\
\left\langle\sin(m\omega_0t),\cos(n\omega_0t)\right\rangle
&=0.
\end{aligned}
$$

#### 3.2.4 Analysis and Synthesis Equations

::: {.bi-pair}
::: {.bi-en lang="en"}
The synthesis equation reconstructs the signal from its harmonic components:
:::

::: {.bi-zh lang="zh-CN"}
综合方程利用各个谐波分量重构信号：
:::
:::

$$
\boxed{x(t)=\sum_{k=-\infty}^{\infty}a_ke^{jk\omega_0t}}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
To isolate $a_n$, take the inner product with $e^{jn\omega_0t}$:
:::

::: {.bi-zh lang="zh-CN"}
为了分离出 $a_n$，将信号与 $e^{jn\omega_0t}$ 作内积：
:::
:::

$$
\begin{aligned}
\left\langle x,e^{jn\omega_0t}\right\rangle
&=\sum_{k=-\infty}^{\infty}a_k
\left\langle e^{jk\omega_0t},e^{jn\omega_0t}\right\rangle\\
&=\sum_{k=-\infty}^{\infty}a_k\delta[k-n]\\
&=a_n.
\end{aligned}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Therefore, the analysis equation is
:::

::: {.bi-zh lang="zh-CN"}
因此，分析方程为
:::
:::

$$
\boxed{
a_k=\frac{1}{T}\int_{t_0}^{t_0+T}x(t)e^{-jk\omega_0t}\,dt
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The integration interval may be any complete period. The coefficient $a_k$ gives the magnitude and phase of the $k$th harmonic. In particular,
:::

::: {.bi-zh lang="zh-CN"}
积分区间可以选择任意一个完整周期。系数 $a_k$ 给出第 $k$ 次谐波的幅度和相位。特别地，
:::
:::

$$
a_0=\frac{1}{T}\int_{t_0}^{t_0+T}x(t)\,dt
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
is the average value, or DC component, of the signal.
:::

::: {.bi-zh lang="zh-CN"}
是信号的平均值，也就是直流分量。
:::
:::

#### 3.2.5 Magnitude and Phase Spectra

::: {.bi-pair}
::: {.bi-en lang="en"}
The doubly infinite sequence $\{a_k\}$ is the Fourier-series spectrum of $x(t)$. The sequences $\{|a_k|\}$ and $\{\angle a_k\}$ are its magnitude spectrum and phase spectrum. Because the frequencies occur only at $\omega=k\omega_0$, the spectrum of a periodic signal is discrete, with line spacing $\omega_0$.
:::

::: {.bi-zh lang="zh-CN"}
双向无限序列 $\{a_k\}$ 称为 $x(t)$ 的傅里叶级数频谱。序列 $\{|a_k|\}$ 和 $\{\angle a_k\}$ 分别称为幅度谱和相位谱。由于频率只出现在 $\omega=k\omega_0$ 处，周期信号的频谱是离散线谱，其谱线间隔为 $\omega_0$。
:::
:::

::: {.bi-pair}
::: {.bi-en lang="en"}
For a single complex exponential,
:::

::: {.bi-zh lang="zh-CN"}
对于单个复指数，
:::
:::

$$
x(t)=e^{j\omega_0t}
\quad\Longleftrightarrow_{\mathrm{FS}}\quad
a_k=\delta[k-1].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For a phase-shifted cosine,
:::

::: {.bi-zh lang="zh-CN"}
对于带相位的余弦信号，
:::
:::

$$
\begin{aligned}
x(t)&=\cos(\omega_0t+\phi)\\
&=\frac12e^{j\phi}e^{j\omega_0t}
+\frac12e^{-j\phi}e^{-j\omega_0t},
\end{aligned}
$$

$$
a_1=\frac12e^{j\phi},\qquad
a_{-1}=\frac12e^{-j\phi},\qquad
a_k=0\quad(k\ne\pm1).
$$

#### 3.2.6 Example: Periodic Triangle Wave

::: {.bi-pair}
::: {.bi-en lang="en"}
Consider the $T$-periodic triangle wave defined over one period by
:::

::: {.bi-zh lang="zh-CN"}
考虑如下 $T$ 周期三角波，其在一个周期内定义为
:::
:::

$$
x(t)=1-\frac{2|t|}{T},
\qquad |t|\le\frac{T}{2}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The signal is real and even, so its coefficients are real and even. The DC coefficient is
:::

::: {.bi-zh lang="zh-CN"}
该信号为实偶信号，因此其系数也是实偶序列。直流系数为
:::
:::

$$
a_0=\frac{1}{T}\int_{-T/2}^{T/2}
\left(1-\frac{2|t|}{T}\right)dt
=\frac12.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For $k\ne0$, evaluating the analysis integral gives
:::

::: {.bi-zh lang="zh-CN"}
对于 $k\ne0$，计算分析积分可得
:::
:::

$$
a_k=
\begin{cases}
\dfrac{2}{\pi^2k^2}, & k\text{ odd},\\[6pt]
0, & k\text{ even}.
\end{cases}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Only odd harmonics are present, and their amplitudes decay as $1/k^2$. The $N$th symmetric partial sum is
:::

::: {.bi-zh lang="zh-CN"}
该信号只包含奇次谐波，其幅度按 $1/k^2$ 衰减。第 $N$ 阶对称部分和为
:::
:::

$$
S_N(t)=\sum_{k=-N}^{N}a_ke^{jk\omega_0t}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
As $N$ increases, the partial sums approach the corners and straight segments rapidly. The relatively fast $1/k^2$ coefficient decay reflects the continuity of the triangle wave, even though its derivative has jump discontinuities.
:::

::: {.bi-zh lang="zh-CN"}
随着 $N$ 增大，部分和会迅速逼近三角波的折点和直线段。系数以较快的 $1/k^2$ 速度衰减，这反映了三角波本身连续，尽管其导数存在跳跃间断。
:::
:::

#### 3.2.7 Example: Periodic Rectangular Pulse

::: {.bi-pair}
::: {.bi-en lang="en"}
Consider a $T$-periodic rectangular pulse with half-width $T_1$, where $0<T_1<T/2$:
:::

::: {.bi-zh lang="zh-CN"}
考虑半宽为 $T_1$ 的 $T$ 周期矩形脉冲，其中 $0<T_1<T/2$：
:::
:::

$$
x(t)=
\begin{cases}
1, & |t|<T_1,\\
0, & T_1<|t|<T/2,
\end{cases}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
with periodic extension outside this interval. Its DC coefficient equals its duty cycle:
:::

::: {.bi-zh lang="zh-CN"}
并在该区间外作周期延拓。其直流系数等于占空比：
:::
:::

$$
a_0=\frac{1}{T}\int_{-T_1}^{T_1}dt
=\frac{2T_1}{T}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For $k\ne0$,
:::

::: {.bi-zh lang="zh-CN"}
对于 $k\ne0$，
:::
:::

$$
\begin{aligned}
a_k
&=\frac{1}{T}\int_{-T_1}^{T_1}e^{-jk\omega_0t}\,dt\\
&=\frac{2\sin(k\omega_0T_1)}{k\omega_0T}\\
&=\frac{\sin(k\omega_0T_1)}{k\pi}.
\end{aligned}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Using the sampling function
:::

::: {.bi-zh lang="zh-CN"}
定义抽样函数
:::
:::

$$
\operatorname{Sa}(x)=\frac{\sin x}{x},
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
the coefficient formula, including $k=0$ by continuity, becomes
:::

::: {.bi-zh lang="zh-CN"}
则利用连续延拓可把包括 $k=0$ 在内的系数统一写为
:::
:::

$$
\boxed{
a_k=\frac{2T_1}{T}\operatorname{Sa}(k\omega_0T_1)
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The line spectrum samples a sinc-shaped envelope at $\omega_k=k\omega_0$. The first zero of the envelope occurs at
:::

::: {.bi-zh lang="zh-CN"}
该线谱是在 $\omega_k=k\omega_0$ 处对 sinc 形包络的采样。包络的第一个零点位于
:::
:::

$$
|\omega|=\frac{\pi}{T_1},
\qquad
|f|=\frac{1}{2T_1}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For fixed $T$, changing $T_1$ changes both the duty cycle and envelope width. A narrower pulse has a wider main lobe. For fixed $T_1$, changing $T$ changes the frequency-line spacing $\Delta\omega=2\pi/T$ while preserving the continuous envelope shape.
:::

::: {.bi-zh lang="zh-CN"}
当 $T$ 固定时，改变 $T_1$ 会同时改变占空比和包络宽度；脉冲越窄，主瓣越宽。当 $T_1$ 固定时，改变 $T$ 会改变谱线间隔 $\Delta\omega=2\pi/T$，但连续包络的形状保持不变。
:::
:::

#### 3.2.8 Gibbs Phenomenon

::: {.bi-pair}
::: {.bi-en lang="en"}
The partial sums of the rectangular pulse approach the signal throughout each smooth interval, but oscillations remain near every jump discontinuity. As the number of harmonics increases:

- the oscillations become concentrated closer to the discontinuity;
- the maximum overshoot does not vanish;
- the limiting overshoot is approximately $9\%$ of the jump size.

This behavior is the Gibbs phenomenon. Adding more harmonics improves localization but does not eliminate the peak overshoot.
:::

::: {.bi-zh lang="zh-CN"}
矩形脉冲的傅里叶级数部分和会在每个光滑区间内逼近原信号，但在每个跳跃间断附近始终存在振荡。随着谐波数量增加：

- 振荡越来越集中在间断点附近；
- 最大过冲并不会消失；
- 极限过冲约为跳跃幅度的 $9\%$。

这种现象称为 Gibbs 现象。增加谐波数量能够缩小振荡区域，却不能消除峰值过冲。
:::
:::

#### 3.2.9 Example: Periodic Impulse Train

::: {.bi-pair}
::: {.bi-en lang="en"}
The periodic impulse train with period $T$ is
:::

::: {.bi-zh lang="zh-CN"}
周期为 $T$ 的冲激列为
:::
:::

$$
x(t)=\sum_{n=-\infty}^{\infty}\delta(t-nT).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Exactly one unit impulse lies in any period. Its Fourier coefficients are therefore
:::

::: {.bi-zh lang="zh-CN"}
任意一个周期内恰好包含一个单位冲激，因此其傅里叶系数为
:::
:::

$$
a_k
=\frac{1}{T}\int_{-T/2}^{T/2}
\delta(t)e^{-jk\omega_0t}\,dt
=\frac{1}{T},
\qquad k\in\mathbb Z.
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
\sum_{n=-\infty}^{\infty}\delta(t-nT)
=\frac{1}{T}\sum_{k=-\infty}^{\infty}e^{jk(2\pi/T)t}
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
All harmonics have the same coefficient magnitude $1/T$. The impulse train does not satisfy the ordinary Dirichlet conditions because it is a generalized function, but its Fourier series is well-defined in the distributional sense.
:::

::: {.bi-zh lang="zh-CN"}
所有谐波的系数幅度都等于 $1/T$。冲激列是广义函数，因此不满足通常意义下的 Dirichlet 条件，但其傅里叶级数可以在分布意义下严格定义。
:::
:::

#### 3.2.10 Key Points

::: {.bi-pair}
::: {.bi-en lang="en"}
- A CT periodic signal is represented by harmonics at integer multiples of $\omega_0=2\pi/T$.
- The analysis equation computes the coefficient of each orthonormal harmonic.
- A periodic signal has a discrete line spectrum.
- Smooth signals generally have faster coefficient decay than signals with sharp transitions.
- Jump discontinuities produce Gibbs oscillations in finite partial sums.
- The periodic impulse train has a flat Fourier-series spectrum.
:::

::: {.bi-zh lang="zh-CN"}
- 连续时间周期信号由 $\omega_0=2\pi/T$ 的整数倍频率谐波表示。
- 分析方程计算每个正交归一谐波的系数。
- 周期信号具有离散线谱。
- 与存在突变的信号相比，光滑信号的系数通常衰减得更快。
- 跳跃间断会使有限部分和出现 Gibbs 振荡。
- 周期冲激列具有平坦的傅里叶级数频谱。
:::
:::

### 3.3 Convergence of CT Fourier Series

#### 3.3.1 Why Convergence Must Be Specified

::: {.bi-pair}
::: {.bi-en lang="en"}
Not every CT periodic signal is represented pointwise by its Fourier series. Two distinct questions must be considered:

1. Does the analysis integral defining every $a_k$ exist?
2. If all coefficients exist, do the partial sums converge to the original signal?

Different convergence concepts answer the second question in different ways.
:::

::: {.bi-zh lang="zh-CN"}
并非每个连续时间周期信号都能由其傅里叶级数逐点表示。需要分别考虑两个问题：

1. 定义每个 $a_k$ 的分析积分是否存在？
2. 即使所有系数都存在，部分和是否收敛到原信号？

不同的收敛概念会以不同方式回答第二个问题。
:::
:::

#### 3.3.2 Mean-Square Convergence

::: {.bi-pair}
::: {.bi-en lang="en"}
Suppose the signal has finite energy over one period:
:::

::: {.bi-zh lang="zh-CN"}
设信号在一个周期内具有有限能量：
:::
:::

$$
\int_{t_0}^{t_0+T}|x(t)|^2\,dt<\infty.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Define the symmetric partial sum and approximation error by
:::

::: {.bi-zh lang="zh-CN"}
定义对称部分和与逼近误差为
:::
:::

$$
S_N(t)=\sum_{k=-N}^{N}a_ke^{jk\omega_0t},
\qquad
e_N(t)=x(t)-S_N(t).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Mean-square convergence means
:::

::: {.bi-zh lang="zh-CN"}
均方收敛是指
:::
:::

$$
\boxed{
\lim_{N\to\infty}
\int_{t_0}^{t_0+T}|e_N(t)|^2\,dt=0
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
This condition says that the approximation error contains asymptotically no energy over a period. It does not require $S_N(t)$ to converge to $x(t)$ at every individual time.
:::

::: {.bi-zh lang="zh-CN"}
该条件表示逼近误差在一个周期内的能量趋于零，但并不要求 $S_N(t)$ 在每个时刻都收敛到 $x(t)$。
:::
:::

#### 3.3.3 Dirichlet Conditions

::: {.bi-pair}
::: {.bi-en lang="en"}
A widely used set of sufficient conditions for pointwise behavior is given by the Dirichlet conditions. Over any one period:

1. $x(t)$ is absolutely integrable.
2. $x(t)$ has a finite number of maxima and minima.
3. $x(t)$ has a finite number of discontinuities, and every discontinuity has finite one-sided limits.
:::

::: {.bi-zh lang="zh-CN"}
Dirichlet 条件给出了一组常用的逐点收敛充分条件。在任意一个周期内：

1. $x(t)$ 绝对可积。
2. $x(t)$ 只有有限个极大值和极小值。
3. $x(t)$ 只有有限个间断点，并且每个间断点都具有有限的单侧极限。
:::
:::

$$
\int_{t_0}^{t_0+T}|x(t)|\,dt<\infty.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
These conditions exclude pathological oscillations and unbounded discontinuities that rarely occur in elementary physical models. They are sufficient rather than necessary, so some signals outside this class can still possess meaningful Fourier representations.
:::

::: {.bi-zh lang="zh-CN"}
这些条件排除了初等物理模型中很少出现的病态振荡和无界间断。它们是充分条件而不是必要条件，因此某些不满足这些条件的信号仍可能具有有意义的傅里叶表示。
:::
:::

#### 3.3.4 Values at Discontinuities

::: {.bi-pair}
::: {.bi-en lang="en"}
If the Dirichlet conditions hold, the Fourier series converges at each time $t$ to the midpoint of the left- and right-hand limits:
:::

::: {.bi-zh lang="zh-CN"}
若满足 Dirichlet 条件，则傅里叶级数在每个时刻 $t$ 收敛到左右极限的中点：
:::
:::

$$
\boxed{
S_x(t)=\frac12\left[x(t^-)+x(t^+)\right]
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
At every continuity point, $x(t^-)=x(t^+)=x(t)$, so the series converges to $x(t)$. At a jump, it converges to the average of the two limiting values, regardless of the value assigned to the signal exactly at that isolated point.
:::

::: {.bi-zh lang="zh-CN"}
在连续点处，$x(t^-)=x(t^+)=x(t)$，因此级数收敛到 $x(t)$。在跳跃间断点处，级数收敛到两个单侧极限的平均值，而与信号在该孤立点被指定为何值无关。
:::
:::

::: {.bi-pair}
::: {.bi-en lang="en"}
Signals that differ only at isolated points have identical integrals over every interval, identical Fourier coefficients, and identical responses through convolution with ordinary LTI impulse responses. For LTI analysis, such pointwise differences are normally immaterial.
:::

::: {.bi-zh lang="zh-CN"}
仅在孤立点取值不同的信号，在任意区间上的积分相同，傅里叶系数相同，与通常的 LTI 冲激响应进行卷积后所得响应也相同。因此，在 LTI 系统分析中，这类逐点差异通常没有实际影响。
:::
:::

### 3.4 Properties of CT Fourier Series

#### 3.4.1 Fourier-Series Correspondence

::: {.bi-pair}
::: {.bi-en lang="en"}
For the remainder of this section, use the notation
:::

::: {.bi-zh lang="zh-CN"}
本节后续内容采用如下记号：
:::
:::

$$
x(t)\ \xleftrightarrow{\mathrm{FS}}\ a_k,
\qquad
x(t)=\sum_{k=-\infty}^{\infty}a_ke^{jk\omega_0t}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The coefficient sequence alone does not specify the time-domain signal unless the basis frequency $\omega_0$, or equivalently the period $T$, is also known. The same sequence used with different fundamental frequencies generates different periodic signals.
:::

::: {.bi-zh lang="zh-CN"}
仅有系数序列并不能唯一确定时域信号，还必须知道基函数频率 $\omega_0$，或等价地知道周期 $T$。同一系数序列与不同基波频率结合，会生成不同的周期信号。
:::
:::

#### 3.4.2 Linearity

::: {.bi-pair}
::: {.bi-en lang="en"}
If $x(t)$ and $y(t)$ have the same period $T$ and
:::

::: {.bi-zh lang="zh-CN"}
若 $x(t)$ 与 $y(t)$ 具有相同周期 $T$，并且
:::
:::

$$
x(t)\ \xleftrightarrow{\mathrm{FS}}\ a_k,
\qquad
y(t)\ \xleftrightarrow{\mathrm{FS}}\ b_k,
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
\boxed{
Ax(t)+By(t)
\ \xleftrightarrow{\mathrm{FS}}\
Aa_k+Bb_k
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The common-period requirement provides a shared harmonic basis. If two signals have different but commensurate periods, choose a common period before combining their coefficient sequences.
:::

::: {.bi-zh lang="zh-CN"}
相同周期这一要求保证两信号使用共同的谐波基。若两个信号周期不同但可公度，应先选择一个公共周期，再组合它们的系数序列。
:::
:::

#### 3.4.3 Time Shifting

::: {.bi-pair}
::: {.bi-en lang="en"}
A time shift produces a linear phase factor in the Fourier coefficients:
:::

::: {.bi-zh lang="zh-CN"}
时移会在傅里叶系数中产生线性相位因子：
:::
:::

$$
\boxed{
x(t-t_0)
\ \xleftrightarrow{\mathrm{FS}}\
e^{-jk\omega_0t_0}a_k
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Indeed, with $\tau=t-t_0$,
:::

::: {.bi-zh lang="zh-CN"}
令 $\tau=t-t_0$，可得
:::
:::

$$
\begin{aligned}
b_k
&=\frac1T\int_{t_0'}^{t_0'+T} x(t-t_0)e^{-jk\omega_0t}\,dt\\
&=e^{-jk\omega_0t_0}
\frac1T\int_{t_0'-t_0}^{t_0'-t_0+T} x(\tau)e^{-jk\omega_0\tau}\,d\tau\\
&=e^{-jk\omega_0t_0}a_k.
\end{aligned}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For a half-period shift,
:::

::: {.bi-zh lang="zh-CN"}
对于半周期移位，
:::
:::

$$
e^{-jk\omega_0(T/2)}=e^{-jk\pi}=(-1)^k.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Thus, shifting a periodic signal by $T/2$ multiplies its even-index coefficients by $1$ and its odd-index coefficients by $-1$.
:::

::: {.bi-zh lang="zh-CN"}
因此，将周期信号移位 $T/2$ 后，偶数下标系数乘以 $1$，奇数下标系数乘以 $-1$。
:::
:::

#### 3.4.4 Frequency Shifting

::: {.bi-pair}
::: {.bi-en lang="en"}
Multiplication by a harmonic complex exponential shifts the coefficient sequence:
:::

::: {.bi-zh lang="zh-CN"}
信号乘以谐波复指数会使系数序列发生移位：
:::
:::

$$
\boxed{
e^{jM\omega_0t}x(t)
\ \xleftrightarrow{\mathrm{FS}}\
a_{k-M}
},
\qquad M\in\mathbb Z.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
This is modulation by a harmonic frequency. Multiplication by an inharmonic exponential may change the fundamental period or may produce an aperiodic signal, so it cannot always be represented as a simple integer shift of the original coefficient sequence.
:::

::: {.bi-zh lang="zh-CN"}
这对应于谐波频率调制。若乘以非谐波复指数，信号的基波周期可能改变，甚至可能变成非周期信号，因此不能总把结果表示为原系数序列的整数移位。
:::
:::

::: {.bi-pair}
::: {.bi-en lang="en"}
For example, if
:::

::: {.bi-zh lang="zh-CN"}
例如，若
:::
:::

$$
x(t)=1+\cos(\omega_0t),
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
then modulation by $e^{j3\omega_0t}$ moves the three nonzero spectral lines from $k=-1,0,1$ to $k=2,3,4$:
:::

::: {.bi-zh lang="zh-CN"}
则乘以 $e^{j3\omega_0t}$ 后，三个非零谱线从 $k=-1,0,1$ 移到 $k=2,3,4$：
:::
:::

$$
e^{j3\omega_0t}x(t)
=\frac12e^{j2\omega_0t}
+e^{j3\omega_0t}
+\frac12e^{j4\omega_0t}.
$$

#### 3.4.5 Time Reversal

::: {.bi-pair}
::: {.bi-en lang="en"}
Time reversal reverses the coefficient index:
:::

::: {.bi-zh lang="zh-CN"}
时间反转会反转系数下标：
:::
:::

$$
\boxed{
x(-t)
\ \xleftrightarrow{\mathrm{FS}}\
a_{-k}
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Consequently, Fourier series preserves even and odd symmetry:
:::

::: {.bi-zh lang="zh-CN"}
因此，傅里叶级数保持奇偶对称性：
:::
:::

$$
\begin{aligned}
x(t)\text{ even}
&\quad\Longleftrightarrow\quad a_k=a_{-k},\\
x(t)\text{ odd}
&\quad\Longleftrightarrow\quad a_k=-a_{-k}.
\end{aligned}
$$

#### 3.4.6 Time Scaling

::: {.bi-pair}
::: {.bi-en lang="en"}
For $\alpha>0$, time scaling preserves the coefficient values but changes the period and harmonic spacing:
:::

::: {.bi-zh lang="zh-CN"}
对于 $\alpha>0$，时间尺度变换保持系数值不变，但会改变周期和谐波间隔：
:::
:::

$$
\boxed{
x(\alpha t)
\ \xleftrightarrow{\mathrm{FS}}\
a_k,
\qquad
T_{\mathrm{new}}=\frac{T}{\alpha},
\qquad
\omega_{0,\mathrm{new}}=\alpha\omega_0
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Compression in time expands the frequency spacing, while expansion in time compresses it. The phrase “the coefficients are unchanged” is meaningful only when the new harmonic basis is also specified. For $\alpha<0$, combine positive time scaling with time reversal.
:::

::: {.bi-zh lang="zh-CN"}
时域压缩会扩大频率间隔，时域扩展会压缩频率间隔。只有同时说明新的谐波基时，“系数不变”这一说法才完整。对于 $\alpha<0$，可将正尺度变换与时间反转结合处理。
:::
:::

#### 3.4.7 Differentiation

::: {.bi-pair}
::: {.bi-en lang="en"}
Differentiating term by term multiplies the $k$th Fourier coefficient by $jk\omega_0$:
:::

::: {.bi-zh lang="zh-CN"}
逐项求导会使第 $k$ 个傅里叶系数乘以 $jk\omega_0$：
:::
:::

$$
\boxed{
\frac{dx(t)}{dt}
\ \xleftrightarrow{\mathrm{FS}}\
jk\omega_0a_k
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The result also follows from integration by parts. The boundary term vanishes because both $x(t)$ and $e^{-jk\omega_0t}$ have period $T$:
:::

::: {.bi-zh lang="zh-CN"}
该结果也可以通过分部积分得到。由于 $x(t)$ 和 $e^{-jk\omega_0t}$ 都具有周期 $T$，边界项为零：
:::
:::

$$
\begin{aligned}
b_k
&=\frac1T\int_{t_0}^{t_0+T} x'(t)e^{-jk\omega_0t}\,dt\\
&=jk\omega_0\frac1T\int_{t_0}^{t_0+T}x(t)e^{-jk\omega_0t}\,dt\\
&=jk\omega_0a_k.
\end{aligned}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Differentiation emphasizes high-order harmonics because the multiplier magnitude grows in proportion to $|k|$.
:::

::: {.bi-zh lang="zh-CN"}
由于乘数的幅度与 $|k|$ 成正比增长，微分会增强高次谐波。
:::
:::

#### 3.4.8 Integration

::: {.bi-pair}
::: {.bi-en lang="en"}
Let
:::

::: {.bi-zh lang="zh-CN"}
令
:::
:::

$$
y(t)=\int_0^t x(s)\,ds.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Integrating the Fourier series term by term gives
:::

::: {.bi-zh lang="zh-CN"}
对傅里叶级数逐项积分可得
:::
:::

$$
y(t)=a_0t+
\sum_{k\ne0}\frac{a_k}{jk\omega_0}
\left(e^{jk\omega_0t}-1\right).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The term $a_0t$ is a ramp. Therefore, the running integral is periodic if and only if the input has zero average value:
:::

::: {.bi-zh lang="zh-CN"}
其中 $a_0t$ 是斜坡项。因此，累积积分为周期信号的充要条件是输入的平均值为零：
:::
:::

$$
\boxed{a_0=0}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
When $a_0=0$, every nonzero-frequency coefficient is divided by $jk\omega_0$:
:::

::: {.bi-zh lang="zh-CN"}
当 $a_0=0$ 时，每个非零频率系数都除以 $jk\omega_0$：
:::
:::

$$
b_k=\frac{a_k}{jk\omega_0},
\qquad k\ne0.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The coefficient $b_0$ depends on the integration constant. Integration suppresses higher harmonics because the magnitude factor is proportional to $1/|k|$.
:::

::: {.bi-zh lang="zh-CN"}
系数 $b_0$ 取决于积分常数。由于幅度因子与 $1/|k|$ 成正比，积分会抑制高次谐波。
:::
:::

#### 3.4.9 Multiplication

::: {.bi-pair}
::: {.bi-en lang="en"}
If $x(t)$ and $y(t)$ have the same period and coefficient sequences $a_k$ and $b_k$, then multiplication in time corresponds to discrete convolution of the coefficient sequences:
:::

::: {.bi-zh lang="zh-CN"}
若 $x(t)$ 与 $y(t)$ 具有相同周期，傅里叶系数分别为 $a_k$ 与 $b_k$，则时域相乘对应系数序列的离散卷积：
:::
:::

$$
\boxed{
x(t)y(t)
\ \xleftrightarrow{\mathrm{FS}}\
c_k=\sum_{m=-\infty}^{\infty}a_mb_{k-m}
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
To see this, multiply the two synthesis equations:
:::

::: {.bi-zh lang="zh-CN"}
将两个综合方程相乘即可得到该性质：
:::
:::

$$
\begin{aligned}
x(t)y(t)
&=\left(\sum_m a_me^{jm\omega_0t}\right)
\left(\sum_\ell b_\ell e^{j\ell\omega_0t}\right)\\
&=\sum_k\left(\sum_m a_mb_{k-m}\right)e^{jk\omega_0t}.
\end{aligned}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
This property is the frequency-domain counterpart of modulation. Multiplication mixes harmonics, so a coefficient at index $k$ can receive contributions from every pair of indices whose sum is $k$.
:::

::: {.bi-zh lang="zh-CN"}
该性质是调制在频域中的对应关系。时域相乘会混合谐波，因此下标为 $k$ 的系数可能接收所有下标之和等于 $k$ 的系数对所产生的贡献。
:::
:::

#### 3.4.10 Periodic Convolution

::: {.bi-pair}
::: {.bi-en lang="en"}
For two signals with common period $T$, define periodic convolution by integrating over one period:
:::

::: {.bi-zh lang="zh-CN"}
对于具有公共周期 $T$ 的两个信号，定义周期卷积为在一个周期上的积分：
:::
:::

$$
(x\circledast_Ty)(t)
=\int_{t_0}^{t_0+T}x(\tau)y(t-\tau)\,d\tau.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The result is also $T$-periodic. Periodic convolution is commutative, associative, and bilinear, just like ordinary convolution whenever the operations exist.
:::

::: {.bi-zh lang="zh-CN"}
所得结果仍为 $T$ 周期信号。在相关运算存在时，周期卷积与普通卷积一样满足交换律、结合律和双线性。
:::
:::

::: {.bi-pair}
::: {.bi-en lang="en"}
Periodic convolution in time corresponds to pointwise multiplication in the Fourier-series domain:
:::

::: {.bi-zh lang="zh-CN"}
时域周期卷积对应傅里叶级数域中的逐点相乘：
:::
:::

$$
\boxed{
x(t)\circledast_Ty(t)
\ \xleftrightarrow{\mathrm{FS}}\
Ta_kb_k
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The factor $T$ appears because this definition does not normalize the periodic convolution integral by $1/T$. If a normalized definition is used, the factor disappears.
:::

::: {.bi-zh lang="zh-CN"}
因该定义没有用 $1/T$ 对周期卷积积分作归一化，所以结果中出现因子 $T$。若采用归一化的周期卷积定义，该因子将消失。
:::
:::

#### 3.4.11 Conjugation and Symmetry

::: {.bi-pair}
::: {.bi-en lang="en"}
Complex conjugation reverses the coefficient index and conjugates the coefficient:
:::

::: {.bi-zh lang="zh-CN"}
复共轭会反转系数下标并对系数取共轭：
:::
:::

$$
\boxed{
x^*(t)
\ \xleftrightarrow{\mathrm{FS}}\
a_{-k}^*
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
If $x(t)$ is real, then $x^*(t)=x(t)$, which gives conjugate symmetry:
:::

::: {.bi-zh lang="zh-CN"}
若 $x(t)$ 为实信号，则 $x^*(t)=x(t)$，从而得到共轭对称关系：
:::
:::

$$
\boxed{a_{-k}=a_k^*}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Important special cases are:

- If $x(t)$ is real and even, $a_k$ is real and even.
- If $x(t)$ is real and odd, $a_k$ is purely imaginary and odd.
- For every real signal, $|a_k|$ is even and $\angle a_k$ is odd, apart from phase ambiguity at zeros.
:::

::: {.bi-zh lang="zh-CN"}
重要的特殊情形包括：

- 若 $x(t)$ 为实偶信号，则 $a_k$ 为实偶序列。
- 若 $x(t)$ 为实奇信号，则 $a_k$ 为纯虚奇序列。
- 对任意实信号，$|a_k|$ 为偶序列，$\angle a_k$ 为奇序列，但零点处的相位存在不确定性。
:::
:::

#### 3.4.12 Even-Odd Decomposition

::: {.bi-pair}
::: {.bi-en lang="en"}
For a real periodic signal, define its even and odd parts by
:::

::: {.bi-zh lang="zh-CN"}
对于实周期信号，定义其偶部和奇部为
:::
:::

$$
x_e(t)=\frac{x(t)+x(-t)}{2},
\qquad
x_o(t)=\frac{x(t)-x(-t)}{2}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Using time reversal and conjugate symmetry,
:::

::: {.bi-zh lang="zh-CN"}
利用时间反转性质和共轭对称性可得
:::
:::

$$
\boxed{
x_e(t)\ \xleftrightarrow{\mathrm{FS}}\ \operatorname{Re}\{a_k\}
},
$$

$$
\boxed{
x_o(t)\ \xleftrightarrow{\mathrm{FS}}\ j\operatorname{Im}\{a_k\}
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Thus, the real part of the coefficient sequence describes the even part of a real signal, while its imaginary part, multiplied by $j$, describes the odd part.
:::

::: {.bi-zh lang="zh-CN"}
因此，对于实信号，系数序列的实部描述信号的偶部，而其虚部乘以 $j$ 后描述信号的奇部。
:::
:::

#### 3.4.13 Parseval's Relation

::: {.bi-pair}
::: {.bi-en lang="en"}
Parseval's relation equates the average power in time with the sum of the powers of all harmonic components:
:::

::: {.bi-zh lang="zh-CN"}
Parseval 关系把时域平均功率与所有谐波分量的功率之和联系起来：
:::
:::

$$
\boxed{
\frac1T\int_{t_0}^{t_0+T}|x(t)|^2\,dt
=\sum_{k=-\infty}^{\infty}|a_k|^2
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The quantity $|a_k|^2$ is the average power carried by the $k$th orthonormal harmonic component. Orthogonality makes all cross terms vanish, so the total average power is the sum of the individual harmonic powers.
:::

::: {.bi-zh lang="zh-CN"}
量 $|a_k|^2$ 是第 $k$ 个正交归一谐波分量所携带的平均功率。正交性使所有交叉项均为零，因此总平均功率等于各谐波功率之和。
:::
:::

#### 3.4.14 Property Summary

::: {.bi-pair}
::: {.bi-en lang="en"}
Assume all signals use the same fundamental frequency unless stated otherwise.

| Time-domain operation | Fourier-series coefficients |
|---|---|
| $Ax(t)+By(t)$ | $Aa_k+Bb_k$ |
| $x(t-t_0)$ | $e^{-jk\omega_0t_0}a_k$ |
| $e^{jM\omega_0t}x(t)$ | $a_{k-M}$ |
| $x(-t)$ | $a_{-k}$ |
| $x(\alpha t)$, $\alpha>0$ | $a_k$, with $\omega_0\mapsto\alpha\omega_0$ |
| $x'(t)$ | $jk\omega_0a_k$ |
| $\int x(t)dt$, with $a_0=0$ | $a_k/(jk\omega_0)$ for $k\ne0$ |
| $x(t)y(t)$ | $\sum_m a_mb_{k-m}$ |
| $x(t)\circledast_Ty(t)$ | $Ta_kb_k$ |
| $x^*(t)$ | $a_{-k}^*$ |
:::

::: {.bi-zh lang="zh-CN"}
除非另有说明，假设所有信号使用相同的基波频率。

| 时域运算 | 傅里叶级数系数 |
|---|---|
| $Ax(t)+By(t)$ | $Aa_k+Bb_k$ |
| $x(t-t_0)$ | $e^{-jk\omega_0t_0}a_k$ |
| $e^{jM\omega_0t}x(t)$ | $a_{k-M}$ |
| $x(-t)$ | $a_{-k}$ |
| $x(\alpha t)$，$\alpha>0$ | $a_k$，且 $\omega_0\mapsto\alpha\omega_0$ |
| $x'(t)$ | $jk\omega_0a_k$ |
| $\int x(t)dt$，且 $a_0=0$ | 当 $k\ne0$ 时为 $a_k/(jk\omega_0)$ |
| $x(t)y(t)$ | $\sum_m a_mb_{k-m}$ |
| $x(t)\circledast_Ty(t)$ | $Ta_kb_k$ |
| $x^*(t)$ | $a_{-k}^*$ |
:::
:::

#### 3.4.15 Key Points

::: {.bi-pair}
::: {.bi-en lang="en"}
- Time shift changes phase but not coefficient magnitude.
- Harmonic modulation shifts the line spectrum by an integer number of harmonic indices.
- Differentiation emphasizes high-frequency harmonics, while integration suppresses them.
- Multiplication in time becomes convolution of Fourier coefficients.
- Periodic convolution in time becomes coefficient-wise multiplication.
- Real signals have conjugate-symmetric Fourier coefficients.
- Parseval's relation expresses conservation of average power between time and harmonic representations.
:::

::: {.bi-zh lang="zh-CN"}
- 时移改变相位，但不改变系数幅度。
- 谐波调制使线谱移动整数个谐波下标。
- 微分增强高频谐波，而积分抑制高频谐波。
- 时域相乘对应傅里叶系数的卷积。
- 时域周期卷积对应系数的逐点相乘。
- 实信号的傅里叶系数具有共轭对称性。
- Parseval 关系表示时域与谐波表示之间的平均功率守恒。
:::
:::
