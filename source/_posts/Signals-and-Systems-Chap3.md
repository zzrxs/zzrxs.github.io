---
title: Signals and Systems Chapter-3
date: 2026-10-29 11:14:41
updated: 2026-11-7
math: true
categories:
  - Signals and Systems
tags:
  - Signal Processing
  - Fourier Series
  - Continuous-Time Signals
  - Harmonic Analysis
  - Convergence
  - Discrete-Time Fourier Series
  - Frequency Response
  - Digital Filters
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
| --- | --- |
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
| --- | --- |
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

### 3.5 Fourier Series Representation of DT Periodic Signals

#### 3.5.1 DT Periodic Signals and Harmonics

::: {.bi-pair}
::: {.bi-en lang="en"}
A discrete-time signal is periodic with period $N\in\mathbb Z_{>0}$ if
:::

::: {.bi-zh lang="zh-CN"}
若离散时间信号存在正整数周期 $N$，使得
:::
:::

$$
x[n+N]=x[n],\qquad \forall n\in\mathbb Z.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The smallest positive period is the fundamental period. For $N>1$, define the fundamental angular frequency by
:::

::: {.bi-zh lang="zh-CN"}
最小正周期称为基波周期。当 $N>1$ 时，定义基波角频率为
:::
:::

$$
\omega_0=\frac{2\pi}{N}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For the constant sequence with fundamental period $N=1$, the only distinct harmonic is the zero-frequency component, so it is convenient to take $\omega_0=0$.
:::

::: {.bi-zh lang="zh-CN"}
对于基波周期为 $N=1$ 的常数序列，唯一不同的谐波是零频率分量，因此通常取 $\omega_0=0$。
:::
:::

::: {.bi-pair}
::: {.bi-en lang="en"}
The $k$th DT harmonic is
:::

::: {.bi-zh lang="zh-CN"}
第 $k$ 个离散时间谐波为
:::
:::

$$
\phi_N^{(k)}[n]
=e^{jk(2\pi/N)n}
=e^{jk\omega_0n}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Its fundamental period is
:::

::: {.bi-zh lang="zh-CN"}
其基波周期为
:::
:::

$$
N_k=\frac{N}{\gcd(N,k)},
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
with the constant case interpreted separately when $N$ divides $k$. Every harmonic frequency is an integer multiple of $\omega_0$, so the family is harmonically related.
:::

::: {.bi-zh lang="zh-CN"}
当 $N$ 整除 $k$ 时，对应常数序列的情形需单独理解。所有谐波频率都是 $\omega_0$ 的整数倍，因此这组复指数彼此成谐波关系。
:::
:::

#### 3.5.2 Finiteness of the DT Fourier Basis

::: {.bi-pair}
::: {.bi-en lang="en"}
Unlike CT harmonics, DT harmonics repeat as the frequency index changes by $N$:
:::

::: {.bi-zh lang="zh-CN"}
与连续时间谐波不同，离散时间谐波的频率下标每增加 $N$ 就会重复：
:::
:::

$$
\begin{aligned}
\phi_N^{(k+rN)}[n]
&=e^{j(k+rN)(2\pi/N)n}\\
&=e^{jk(2\pi/N)n}e^{jr2\pi n}\\
&=\phi_N^{(k)}[n],
\qquad r\in\mathbb Z.
\end{aligned}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Therefore, a period-$N$ sequence has only $N$ distinct Fourier basis signals. Let $\langle N\rangle$ denote any set of $N$ consecutive integers, such as
:::

::: {.bi-zh lang="zh-CN"}
因此，周期为 $N$ 的序列只有 $N$ 个不同的傅里叶基信号。用 $\langle N\rangle$ 表示任意 $N$ 个连续整数构成的集合，例如
:::
:::

$$
\langle N\rangle=\{0,1,\ldots,N-1\}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Then the complete basis can be represented by
:::

::: {.bi-zh lang="zh-CN"}
完整的基可以表示为
:::
:::

$$
\left\{\phi_N^{(k)}[n]:k\in\langle N\rangle\right\}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
This finiteness is the key structural difference between CT and DT Fourier series. A CT Fourier series generally uses infinitely many distinct harmonics, while a DT period-$N$ Fourier series uses exactly $N$ distinct harmonics.
:::

::: {.bi-zh lang="zh-CN"}
这种有限性是连续时间与离散时间傅里叶级数之间最重要的结构差异。连续时间傅里叶级数通常使用无限多个不同谐波，而周期为 $N$ 的离散时间傅里叶级数只使用 $N$ 个不同谐波。
:::
:::

#### 3.5.3 Orthonormality of DT Harmonics

::: {.bi-pair}
::: {.bi-en lang="en"}
For two period-$N$ sequences, define the normalized inner product over one period by
:::

::: {.bi-zh lang="zh-CN"}
对于两个周期为 $N$ 的序列，定义一个周期上的归一化内积为
:::
:::

$$
\langle x,y\rangle
=\frac1N\sum_{n\in\langle N\rangle}x[n]y^*[n].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The $N$ distinct harmonics form an orthonormal basis:
:::

::: {.bi-zh lang="zh-CN"}
这 $N$ 个不同谐波构成一组正交归一基：
:::
:::

$$
\boxed{
\left\langle\phi_N^{(k)},\phi_N^{(m)}\right\rangle
=\delta[k-m]
},
\qquad k,m\in\langle N\rangle.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For $k=m$, every term in the inner-product sum equals $1$. For $k\ne m$, the finite geometric sum gives
:::

::: {.bi-zh lang="zh-CN"}
当 $k=m$ 时，内积求和中的每一项都等于 $1$。当 $k\ne m$ 时，有限几何级数给出
:::
:::

$$
\frac1N\sum_{n=0}^{N-1}e^{j(k-m)(2\pi/N)n}=0.
$$

#### 3.5.4 DT Fourier-Series Analysis and Synthesis

::: {.bi-pair}
::: {.bi-en lang="en"}
Every period-$N$ sequence has the finite synthesis equation
:::

::: {.bi-zh lang="zh-CN"}
任意周期为 $N$ 的序列都具有有限项综合方程
:::
:::

$$
\boxed{
x[n]=\sum_{k\in\langle N\rangle}a_ke^{jk\omega_0n}
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Orthonormality gives the analysis equation
:::

::: {.bi-zh lang="zh-CN"}
由正交归一性可得分析方程
:::
:::

$$
\boxed{
a_k=\frac1N\sum_{n\in\langle N\rangle}
x[n]e^{-jk\omega_0n}
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Both sums may be taken over any $N$ consecutive integers. Because the basis and all sums are finite, DT Fourier series has no convergence problem for a periodic sequence.
:::

::: {.bi-zh lang="zh-CN"}
两个求和都可以在任意 $N$ 个连续整数上进行。由于基和所有求和都是有限的，离散时间周期序列的傅里叶级数不存在收敛性问题。
:::
:::

#### 3.5.5 Periodicity of the Coefficient Sequence

::: {.bi-pair}
::: {.bi-en lang="en"}
Since $\phi_N^{(k+rN)}[n]=\phi_N^{(k)}[n]$, the Fourier coefficients may be extended periodically in $k$:
:::

::: {.bi-zh lang="zh-CN"}
由于 $\phi_N^{(k+rN)}[n]=\phi_N^{(k)}[n]$，傅里叶系数可以在下标 $k$ 上作周期延拓：
:::
:::

$$
\boxed{a_{k+rN}=a_k},
\qquad r\in\mathbb Z.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Only one block of $N$ consecutive coefficients is used in the synthesis equation. Thus, DT Fourier series establishes a correspondence between two period-$N$ sequences: the time-domain sequence $x[n]$ and the frequency-domain coefficient sequence $a_k$.
:::

::: {.bi-zh lang="zh-CN"}
综合方程只使用任意一组连续的 $N$ 个系数。因此，离散时间傅里叶级数在两个周期为 $N$ 的序列之间建立对应关系：时域序列 $x[n]$ 与频域系数序列 $a_k$。
:::
:::

#### 3.5.6 Example: Periodic Sinusoid

::: {.bi-pair}
::: {.bi-en lang="en"}
Consider
:::

::: {.bi-zh lang="zh-CN"}
考虑
:::
:::

$$
x[n]=\cos\left(\frac{6\pi}{5}n+\frac{\pi}{5}\right).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The fundamental period is $N=5$, so $\omega_0=2\pi/5$. Euler's identity gives
:::

::: {.bi-zh lang="zh-CN"}
其基波周期为 $N=5$，因此 $\omega_0=2\pi/5$。利用 Euler 恒等式可得
:::
:::

$$
x[n]
=\frac12e^{j\pi/5}e^{j3\omega_0n}
+\frac12e^{-j\pi/5}e^{-j3\omega_0n}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Using the coefficient interval $\langle5\rangle=\{0,1,2,3,4\}$ and the identity $-3\equiv2\pmod5$,
:::

::: {.bi-zh lang="zh-CN"}
选取系数区间 $\langle5\rangle=\{0,1,2,3,4\}$，并利用 $-3\equiv2\pmod5$，可得
:::
:::

$$
a_3=\frac12e^{j\pi/5},
\qquad
a_2=\frac12e^{-j\pi/5},
\qquad
a_0=a_1=a_4=0.
$$

#### 3.5.7 Example: Periodic Rectangular Sequence

::: {.bi-pair}
::: {.bi-en lang="en"}
Within one period, define a rectangular sequence by
:::

::: {.bi-zh lang="zh-CN"}
在一个周期内定义矩形序列
:::
:::

$$
x[n]=
\begin{cases}
1, & -N_1\le n\le N_1,\\
0, & N_1<n<N-N_1,
\end{cases}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
and extend it periodically with period $N$. The coefficient is
:::

::: {.bi-zh lang="zh-CN"}
并将其以周期 $N$ 作周期延拓。其系数为
:::
:::

$$
a_k=\frac1N\sum_{n=-N_1}^{N_1}e^{-jk(2\pi/N)n}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
If $k$ is a multiple of $N$, every exponential equals $1$, so
:::

::: {.bi-zh lang="zh-CN"}
若 $k$ 是 $N$ 的整数倍，则每个复指数项都等于 $1$，因此
:::
:::

$$
a_k=\frac{2N_1+1}{N}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Otherwise, evaluating the finite geometric sum gives
:::

::: {.bi-zh lang="zh-CN"}
否则，计算有限几何级数可得
:::
:::

$$
\boxed{
a_k=\frac1N
\frac{\sin\left[\dfrac{2\pi k}{N}\left(N_1+\dfrac12\right)\right]}
{\sin\left(\dfrac{\pi k}{N}\right)}
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The coefficient sequence is periodic in $k$ with period $N$. As the rectangular pulse occupies more samples, its frequency-domain main lobe becomes narrower, reflecting the same time-width and frequency-width tradeoff seen in the CT case.
:::

::: {.bi-zh lang="zh-CN"}
该系数序列关于 $k$ 以 $N$ 为周期。随着矩形脉冲占据更多样本，其频域主瓣会变窄，这体现了与连续时间情形相同的时宽与频宽权衡。
:::
:::

#### 3.5.8 Key Points

::: {.bi-pair}
::: {.bi-en lang="en"}
- A period-$N$ DT signal has exactly $N$ distinct complex-exponential harmonics.
- Both the signal $x[n]$ and its coefficient sequence $a_k$ are periodic with period $N$ in their respective indices.
- Analysis and synthesis use finite sums over any $N$ consecutive integers.
- DT Fourier series therefore has no convergence issue for periodic sequences.
- Frequency indices that differ by a multiple of $N$ describe the same DT harmonic.
:::

::: {.bi-zh lang="zh-CN"}
- 周期为 $N$ 的离散时间信号恰好具有 $N$ 个不同的复指数谐波。
- 信号 $x[n]$ 与系数序列 $a_k$ 分别关于各自下标以 $N$ 为周期。
- 分析与综合都在任意 $N$ 个连续整数上使用有限求和。
- 因此，离散时间周期序列的傅里叶级数不存在收敛性问题。
- 相差 $N$ 的整数倍的频率下标表示同一个离散时间谐波。
:::
:::

### 3.6 Properties of DT Fourier Series

#### 3.6.1 Linearity and Index Convention

::: {.bi-pair}
::: {.bi-en lang="en"}
Use the correspondence
:::

::: {.bi-zh lang="zh-CN"}
采用如下对应记号：
:::
:::

$$
x[n]\ \xleftrightarrow{\mathrm{FS}}\ a_k,
\qquad
y[n]\ \xleftrightarrow{\mathrm{FS}}\ b_k,
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
where both signals have period $N$. Linearity gives
:::

::: {.bi-zh lang="zh-CN"}
其中两个信号都具有周期 $N$。由线性性可得
:::
:::

$$
\boxed{
Ax[n]+By[n]
\ \xleftrightarrow{\mathrm{FS}}\
Aa_k+Bb_k
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
All coefficient indices in this section are interpreted modulo $N$. For example, $a_{k-m}$ denotes the periodic extension of the coefficient sequence.
:::

::: {.bi-zh lang="zh-CN"}
本节中的所有系数下标都按模 $N$ 理解。例如，$a_{k-m}$ 表示系数序列的周期延拓。
:::
:::

#### 3.6.2 Time and Frequency Shifting

::: {.bi-pair}
::: {.bi-en lang="en"}
A shift by an integer $n_0$ in time introduces a phase factor:
:::

::: {.bi-zh lang="zh-CN"}
时域中移位整数个样本 $n_0$ 会引入相位因子：
:::
:::

$$
\boxed{
x[n-n_0]
\ \xleftrightarrow{\mathrm{FS}}\
e^{-jk\omega_0n_0}a_k
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Multiplication by a harmonic complex exponential shifts the coefficient sequence circularly:
:::

::: {.bi-zh lang="zh-CN"}
乘以谐波复指数会使系数序列发生循环移位：
:::
:::

$$
\boxed{
e^{jm\omega_0n}x[n]
\ \xleftrightarrow{\mathrm{FS}}\
a_{k-m}
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The shift is circular because the coefficient sequence has period $N$.
:::

::: {.bi-zh lang="zh-CN"}
由于系数序列以 $N$ 为周期，该频率移位是循环移位。
:::
:::

#### 3.6.3 Time Reversal, Conjugation, and Symmetry

::: {.bi-pair}
::: {.bi-en lang="en"}
Time reversal and complex conjugation obey
:::

::: {.bi-zh lang="zh-CN"}
时间反转与复共轭满足
:::
:::

$$
\boxed{x[-n]\ \xleftrightarrow{\mathrm{FS}}\ a_{-k}},
$$

$$
\boxed{x^*[n]\ \xleftrightarrow{\mathrm{FS}}\ a_{-k}^*}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Consequently:

- $x[n]$ is even if and only if $a_k$ is even.
- $x[n]$ is odd if and only if $a_k$ is odd.
- If $x[n]$ is real, then $a_{-k}=a_k^*$.
- A real even sequence has real even coefficients.
- A real odd sequence has purely imaginary odd coefficients.
:::

::: {.bi-zh lang="zh-CN"}
因此：

- $x[n]$ 为偶序列，当且仅当 $a_k$ 为偶序列。
- $x[n]$ 为奇序列，当且仅当 $a_k$ 为奇序列。
- 若 $x[n]$ 为实序列，则 $a_{-k}=a_k^*$。
- 实偶序列具有实偶系数。
- 实奇序列具有纯虚奇系数。
:::
:::

#### 3.6.4 Integer Time Expansion

::: {.bi-pair}
::: {.bi-en lang="en"}
Continuous time allows arbitrary scaling of the independent variable. In discrete time, a natural expansion operation inserts $m-1$ zeros between adjacent samples. For a positive integer $m$, define
:::

::: {.bi-zh lang="zh-CN"}
连续时间允许对自变量进行任意尺度变换。在离散时间中，自然的扩展运算是在相邻样本之间插入 $m-1$ 个零。对于正整数 $m$，定义
:::
:::

$$
x_{(m)}[n]=
\begin{cases}
x[n/m], & n\text{ is a multiple of }m,\\
0, & \text{otherwise}.
\end{cases}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
If $x[n]$ has period $N$, then $x_{(m)}[n]$ has period $mN$, and
:::

::: {.bi-zh lang="zh-CN"}
若 $x[n]$ 的周期为 $N$，则 $x_{(m)}[n]$ 的周期为 $mN$，并且
:::
:::

$$
\boxed{
x_{(m)}[n]
\ \xleftrightarrow{\mathrm{FS}}\
\frac1m a_k
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The new coefficient sequence is interpreted with period $mN$. The operation expands the time-axis period and creates repeated spectral structure within the enlarged coefficient period.
:::

::: {.bi-zh lang="zh-CN"}
新的系数序列应按周期 $mN$ 理解。该运算扩大了时域周期，并在扩大的系数周期内产生重复的频谱结构。
:::
:::

#### 3.6.5 First Difference

::: {.bi-pair}
::: {.bi-en lang="en"}
The first-difference operation is the DT analogue of differentiation:
:::

::: {.bi-zh lang="zh-CN"}
一阶差分是离散时间中与微分对应的运算：
:::
:::

$$
\Delta x[n]=x[n]-x[n-1].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Using the time-shift property,
:::

::: {.bi-zh lang="zh-CN"}
利用时移性质可得
:::
:::

$$
\boxed{
\Delta x[n]
\ \xleftrightarrow{\mathrm{FS}}\
\left(1-e^{-jk\omega_0}\right)a_k
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The multiplier is zero at $k=0$ and grows toward high DT frequencies, so first difference removes the DC component and emphasizes rapid sample-to-sample changes.
:::

::: {.bi-zh lang="zh-CN"}
该乘数在 $k=0$ 处为零，并向离散时间高频方向增大，因此一阶差分会消除直流分量并增强样本之间的快速变化。
:::
:::

#### 3.6.6 Running Sum

::: {.bi-pair}
::: {.bi-en lang="en"}
Let
:::

::: {.bi-zh lang="zh-CN"}
令
:::
:::

$$
y[n]=\sum_{m=n_0}^{n}x[m].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The running sum is periodic if and only if the input has zero average value over one period:
:::

::: {.bi-zh lang="zh-CN"}
累加和为周期序列的充要条件是输入在一个周期上的平均值为零：
:::
:::

$$
a_0=0.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
When this condition holds, the non-DC coefficients are
:::

::: {.bi-zh lang="zh-CN"}
满足该条件时，非直流系数为
:::
:::

$$
\boxed{
b_k=\frac{a_k}{1-e^{-jk\omega_0}},
\qquad k\ne0
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The value of $b_0$ depends on the starting index and the additive constant, just as the DC coefficient of a CT integral depends on its integration constant.
:::

::: {.bi-zh lang="zh-CN"}
$b_0$ 的取值取决于起始下标和所加常数，这与连续时间积分的直流系数取决于积分常数相对应。
:::
:::

#### 3.6.7 Multiplication and Circular Convolution

::: {.bi-pair}
::: {.bi-en lang="en"}
If $x[n]$ and $y[n]$ have the same period $N$, multiplication in time corresponds to periodic, or circular, convolution of the coefficient sequences:
:::

::: {.bi-zh lang="zh-CN"}
若 $x[n]$ 与 $y[n]$ 具有相同周期 $N$，则时域相乘对应系数序列的周期卷积，也称循环卷积：
:::
:::

$$
\boxed{
x[n]y[n]
\ \xleftrightarrow{\mathrm{FS}}\
c_k=\sum_{m\in\langle N\rangle}a_mb_{k-m}
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The subtraction $k-m$ is evaluated modulo $N$. In the CT Fourier-series case, the coefficient convolution extends over all integer indices. In the DT case, it is a finite circular convolution because both coefficient sequences are periodic.
:::

::: {.bi-zh lang="zh-CN"}
下标差 $k-m$ 按模 $N$ 计算。在连续时间傅里叶级数中，系数卷积遍历所有整数下标；在离散时间情形中，由于两个系数序列都是周期的，因此得到有限循环卷积。
:::
:::

#### 3.6.8 Periodic Convolution in Time

::: {.bi-pair}
::: {.bi-en lang="en"}
Define the periodic convolution of two period-$N$ sequences by
:::

::: {.bi-zh lang="zh-CN"}
定义两个周期为 $N$ 的序列的周期卷积为
:::
:::

$$
(x\circledast_Ny)[n]
=\sum_{m\in\langle N\rangle}x[m]y[n-m].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Periodic convolution is commutative, associative, and bilinear. Its Fourier-series coefficients satisfy
:::

::: {.bi-zh lang="zh-CN"}
周期卷积满足交换律、结合律和双线性，其傅里叶级数系数满足
:::
:::

$$
\boxed{
x[n]\circledast_Ny[n]
\ \xleftrightarrow{\mathrm{FS}}\
Na_kb_k
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The factor $N$ results from the $1/N$ normalization used in the analysis equation and the unnormalized definition of periodic convolution.
:::

::: {.bi-zh lang="zh-CN"}
因分析方程采用 $1/N$ 归一化，而周期卷积的定义没有归一化，所以结果中出现因子 $N$。
:::
:::

#### 3.6.9 Parseval's Relation

::: {.bi-pair}
::: {.bi-en lang="en"}
Parseval's relation equates the average power in one time-domain period with the sum of the powers of the $N$ distinct harmonics:
:::

::: {.bi-zh lang="zh-CN"}
Parseval 关系把一个时域周期内的平均功率与 $N$ 个不同谐波的功率之和联系起来：
:::
:::

$$
\boxed{
\frac1N\sum_{n\in\langle N\rangle}|x[n]|^2
=\sum_{k\in\langle N\rangle}|a_k|^2
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Each $|a_k|^2$ is the average power carried by one orthonormal harmonic component.
:::

::: {.bi-zh lang="zh-CN"}
每个 $|a_k|^2$ 表示一个正交归一谐波分量所携带的平均功率。
:::
:::

#### 3.6.10 Property Summary

::: {.bi-pair}
::: {.bi-en lang="en"}
All coefficient indices below are periodic modulo $N$.

| Time-domain operation | DT Fourier-series coefficients |
| --- | --- |
| $Ax[n]+By[n]$ | $Aa_k+Bb_k$ |
| $x[n-n_0]$ | $e^{-jk\omega_0n_0}a_k$ |
| $e^{jm\omega_0n}x[n]$ | $a_{k-m}$ |
| $x[-n]$ | $a_{-k}$ |
| $x^*[n]$ | $a_{-k}^*$ |
| $x[n]-x[n-1]$ | $(1-e^{-jk\omega_0})a_k$ |
| Running sum, $a_0=0$ | $a_k/(1-e^{-jk\omega_0})$, $k\ne0$ |
| $x[n]y[n]$ | $\sum_{m\in\langle N\rangle}a_mb_{k-m}$ |
| $x[n]\circledast_Ny[n]$ | $Na_kb_k$ |

:::

::: {.bi-zh lang="zh-CN"}
下表中的所有系数下标均按模 $N$ 周期延拓。

| 时域运算 | 离散时间傅里叶级数系数 |
| --- | --- |
| $Ax[n]+By[n]$ | $Aa_k+Bb_k$ |
| $x[n-n_0]$ | $e^{-jk\omega_0n_0}a_k$ |
| $e^{jm\omega_0n}x[n]$ | $a_{k-m}$ |
| $x[-n]$ | $a_{-k}$ |
| $x^*[n]$ | $a_{-k}^*$ |
| $x[n]-x[n-1]$ | $(1-e^{-jk\omega_0})a_k$ |
| 累加和，$a_0=0$ | $a_k/(1-e^{-jk\omega_0})$，$k\ne0$ |
| $x[n]y[n]$ | $\sum_{m\in\langle N\rangle}a_mb_{k-m}$ |
| $x[n]\circledast_Ny[n]$ | $Na_kb_k$ |

:::
:::

### 3.7 Fourier Series and LTI Systems

#### 3.7.1 Frequency Response

::: {.bi-pair}
::: {.bi-en lang="en"}
Complex exponentials are eigenfunctions of LTI systems. For a CT LTI system with impulse response $h(t)$,
:::

::: {.bi-zh lang="zh-CN"}
复指数是 LTI 系统的特征函数。对于冲激响应为 $h(t)$ 的连续时间 LTI 系统，
:::
:::

$$
e^{j\omega t}
\longrightarrow
H(j\omega)e^{j\omega t},
$$

$$
\boxed{
H(j\omega)=\int_{-\infty}^{\infty}h(t)e^{-j\omega t}\,dt
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For a DT LTI system with impulse response $h[n]$,
:::

::: {.bi-zh lang="zh-CN"}
对于冲激响应为 $h[n]$ 的离散时间 LTI 系统，
:::
:::

$$
e^{j\omega n}
\longrightarrow
H(e^{j\omega})e^{j\omega n},
$$

$$
\boxed{
H(e^{j\omega})
=\sum_{n=-\infty}^{\infty}h[n]e^{-j\omega n}
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The functions $H(j\omega)$ and $H(e^{j\omega})$ are the CT and DT frequency responses. Their magnitudes determine how the system scales sinusoidal components, while their phases determine the phase shifts.
:::

::: {.bi-zh lang="zh-CN"}
函数 $H(j\omega)$ 和 $H(e^{j\omega})$ 分别称为连续时间与离散时间频率响应。其幅度决定系统对正弦分量的缩放，其相位决定相移。
:::
:::

#### 3.7.2 Periodic Inputs through LTI Systems

::: {.bi-pair}
::: {.bi-en lang="en"}
Let a CT periodic input have Fourier series
:::

::: {.bi-zh lang="zh-CN"}
设连续时间周期输入的傅里叶级数为
:::
:::

$$
x(t)=\sum_{k=-\infty}^{\infty}a_ke^{jk\omega_0t}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The output is
:::

::: {.bi-zh lang="zh-CN"}
则输出为
:::
:::

$$
\boxed{
y(t)=\sum_{k=-\infty}^{\infty}
H(jk\omega_0)a_ke^{jk\omega_0t}
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
x(t)\ \xleftrightarrow{\mathrm{FS}}\ a_k
\quad\Longrightarrow\quad
y(t)\ \xleftrightarrow{\mathrm{FS}}\ H(jk\omega_0)a_k.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Similarly, for a period-$N$ DT input,
:::

::: {.bi-zh lang="zh-CN"}
类似地，对于周期为 $N$ 的离散时间输入，
:::
:::

$$
\boxed{
x[n]\ \xleftrightarrow{\mathrm{FS}}\ a_k
\quad\Longrightarrow\quad
y[n]\ \xleftrightarrow{\mathrm{FS}}\
H(e^{jk\omega_0})a_k
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The output has the same period as the input, although its fundamental period may become smaller if the system eliminates some harmonics. An LTI system cannot create new frequency components. It can only scale or phase-shift the components already present, and it may remove components by assigning them zero gain.
:::

::: {.bi-zh lang="zh-CN"}
输出具有与输入相同的周期，但若系统消除了某些谐波，输出的基波周期可能变小。LTI 系统不能产生新的频率分量，只能缩放或移相输入中已有的分量，也可以通过赋予零增益来消除某些分量。
:::
:::

#### 3.7.3 Frequency-Shaping and Frequency-Selective Filters

::: {.bi-pair}
::: {.bi-en lang="en"}
An LTI system acts as a filter through its frequency response. Two useful viewpoints are:

- A **frequency-shaping filter** changes the relative magnitudes or phases across the spectrum. An audio equalizer is a common example.
- A **frequency-selective filter** passes one frequency range with little distortion and strongly attenuates another range.

Lowpass, highpass, and bandpass filters are standard frequency-selective filters.
:::

::: {.bi-zh lang="zh-CN"}
LTI 系统通过其频率响应实现滤波。常用的两种观点为：

- **频谱整形滤波器**改变频谱中不同分量的相对幅度或相位，音频均衡器是常见例子。
- **选频滤波器**让某一频率范围近似无失真地通过，同时显著衰减另一个频率范围。

低通、高通和带通滤波器是标准的选频滤波器。
:::
:::

#### 3.7.4 CT Differentiator

::: {.bi-pair}
::: {.bi-en lang="en"}
For the ideal differentiator
:::

::: {.bi-zh lang="zh-CN"}
对于理想微分器
:::
:::

$$
y(t)=x'(t),
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
the impulse response and frequency response are
:::

::: {.bi-zh lang="zh-CN"}
其冲激响应和频率响应分别为
:::
:::

$$
h(t)=\delta'(t),
\qquad
H(j\omega)=j\omega.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For a periodic input, the output coefficient is
:::

::: {.bi-zh lang="zh-CN"}
对于周期输入，输出系数为
:::
:::

$$
b_k=jk\omega_0a_k.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The differentiator suppresses the DC component and gives larger gain to higher frequencies. For example,
:::

::: {.bi-zh lang="zh-CN"}
微分器消除直流分量，并对高频分量赋予更大增益。例如，
:::
:::

$$
x(t)=\sin\left(\frac t2\right)+\frac12\sin(2t)
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
produces
:::

::: {.bi-zh lang="zh-CN"}
产生输出
:::
:::

$$
y(t)=\frac12\cos\left(\frac t2\right)+\cos(2t).
$$

#### 3.7.5 Ideal CT Frequency-Selective Filters

::: {.bi-pair}
::: {.bi-en lang="en"}
An ideal lowpass filter with cutoff frequency $\omega_c$ has frequency response
:::

::: {.bi-zh lang="zh-CN"}
截止频率为 $\omega_c$ 的理想低通滤波器具有频率响应
:::
:::

$$
H_{\mathrm{LP}}(j\omega)=
\begin{cases}
1, & |\omega|\le\omega_c,\\
0, & |\omega|>\omega_c.
\end{cases}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
An ideal highpass filter reverses the passband and stopband:
:::

::: {.bi-zh lang="zh-CN"}
理想高通滤波器交换通带与阻带：
:::
:::

$$
H_{\mathrm{HP}}(j\omega)=
\begin{cases}
0, & |\omega|<\omega_c,\\
1, & |\omega|\ge\omega_c.
\end{cases}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
An ideal bandpass filter passes frequencies between two cutoffs:
:::

::: {.bi-zh lang="zh-CN"}
理想带通滤波器允许两个截止频率之间的分量通过：
:::
:::

$$
H_{\mathrm{BP}}(j\omega)=
\begin{cases}
1, & \omega_{c1}\le|\omega|\le\omega_{c2},\\
0, & \text{otherwise}.
\end{cases}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For
:::

::: {.bi-zh lang="zh-CN"}
对于
:::
:::

$$
x(t)=\sin t+\sin(2t)+\sin(3t)+\sin(4t),
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
an ideal lowpass filter with $\omega_c=2.5$ retains the first two terms, an ideal highpass filter with the same cutoff retains the last two, and an ideal bandpass filter with $\omega_{c1}=1.5$ and $\omega_{c2}=3.5$ retains the components at $2$ and $3$ rad/s.
:::

::: {.bi-zh lang="zh-CN"}
截止频率为 $\omega_c=2.5$ 的理想低通滤波器保留前两个分量；相同截止频率的理想高通滤波器保留后两个分量；下、上截止频率分别为 $\omega_{c1}=1.5$ 与 $\omega_{c2}=3.5$ 的理想带通滤波器保留 $2$ 和 $3$ rad/s 分量。
:::
:::

#### 3.7.6 RC Lowpass Filter

::: {.bi-pair}
::: {.bi-en lang="en"}
For a series $RC$ circuit with the capacitor voltage as output,
:::

::: {.bi-zh lang="zh-CN"}
对于以电容电压作为输出的串联 $RC$ 电路，
:::
:::

$$
RC\frac{dv_C(t)}{dt}+v_C(t)=v_S(t).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Substituting the eigenfunction input $v_S(t)=e^{j\omega t}$ gives
:::

::: {.bi-zh lang="zh-CN"}
代入特征函数输入 $v_S(t)=e^{j\omega t}$ 可得
:::
:::

$$
\boxed{
H_{\mathrm{LP}}(j\omega)=\frac{1}{1+j\omega RC}
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Its magnitude and phase are
:::

::: {.bi-zh lang="zh-CN"}
其幅度和相位为
:::
:::

$$
|H_{\mathrm{LP}}(j\omega)|
=\frac{1}{\sqrt{1+(\omega RC)^2}},
$$

$$
\angle H_{\mathrm{LP}}(j\omega)
=-\arctan(\omega RC).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The impulse and step responses are
:::

::: {.bi-zh lang="zh-CN"}
其冲激响应与阶跃响应分别为
:::
:::

$$
h(t)=\frac1{RC}e^{-t/(RC)}u(t),
$$

$$
s(t)=\left(1-e^{-t/(RC)}\right)u(t).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The time constant is $\tau=RC$. A larger $\tau$ narrows the effective lowpass range and slows the transient response. A smaller $\tau$ passes a wider range of frequencies and responds faster.
:::

::: {.bi-zh lang="zh-CN"}
时间常数为 $\tau=RC$。较大的 $\tau$ 会缩窄有效低通范围并减慢瞬态响应；较小的 $\tau$ 会允许更宽的频率范围通过，并产生更快的响应。
:::
:::

#### 3.7.7 RC Highpass Filter

::: {.bi-pair}
::: {.bi-en lang="en"}
Using the resistor voltage as output gives
:::

::: {.bi-zh lang="zh-CN"}
若改用电阻电压作为输出，则
:::
:::

$$
RC\frac{dv_R(t)}{dt}+v_R(t)
=RC\frac{dv_S(t)}{dt}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The frequency response is
:::

::: {.bi-zh lang="zh-CN"}
频率响应为
:::
:::

$$
\boxed{
H_{\mathrm{HP}}(j\omega)
=\frac{j\omega RC}{1+j\omega RC}
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Its magnitude is
:::

::: {.bi-zh lang="zh-CN"}
其幅度为
:::
:::

$$
|H_{\mathrm{HP}}(j\omega)|
=\frac{|\omega|RC}{\sqrt{1+(\omega RC)^2}}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The step and impulse responses are
:::

::: {.bi-zh lang="zh-CN"}
其阶跃响应与冲激响应分别为
:::
:::

$$
s(t)=e^{-t/(RC)}u(t),
$$

$$
h(t)=\delta(t)-\frac1{RC}e^{-t/(RC)}u(t).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
A larger time constant passes a broader range of high-frequency components but produces a slower transient. A smaller time constant gives a faster transient while attenuating a larger portion of the lower-frequency range.
:::

::: {.bi-zh lang="zh-CN"}
较大的时间常数允许更宽的高频范围通过，但会产生更慢的瞬态；较小的时间常数产生更快的瞬态，同时会衰减更大范围的低频分量。
:::
:::

#### 3.7.8 Frequencies in Discrete Time

::: {.bi-pair}
::: {.bi-en lang="en"}
DT complex exponentials are periodic in frequency:
:::

::: {.bi-zh lang="zh-CN"}
离散时间复指数关于频率具有周期性：
:::
:::

$$
e^{j(\omega+2\pi r)n}=e^{j\omega n},
\qquad r\in\mathbb Z.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Therefore, it is sufficient to describe a DT frequency response over any interval of length $2\pi$, commonly $[-\pi,\pi)$ or $[0,2\pi)$. Low frequencies lie near $2\pi r$, where adjacent samples vary slowly. High frequencies lie near $(2r+1)\pi$, where the sequence alternates rapidly.
:::

::: {.bi-zh lang="zh-CN"}
因此，只需在任意长度为 $2\pi$ 的区间上描述离散时间频率响应，常用区间为 $[-\pi,\pi)$ 或 $[0,2\pi)$。低频位于 $2\pi r$ 附近，此时相邻样本变化缓慢；高频位于 $(2r+1)\pi$ 附近，此时序列快速交替变化。
:::
:::

::: {.bi-pair}
::: {.bi-en lang="en"}
For a period-$N$ signal, the distinct harmonic frequencies are $N$ equally spaced points on the unit circle. Points near $e^{j0}=1$ represent low frequencies, while points near $e^{j\pi}=-1$ represent high frequencies.
:::

::: {.bi-zh lang="zh-CN"}
对于周期为 $N$ 的信号，$N$ 个不同谐波频率对应单位圆上等间隔分布的 $N$ 个点。靠近 $e^{j0}=1$ 的点表示低频，靠近 $e^{j\pi}=-1$ 的点表示高频。
:::
:::

#### 3.7.9 Ideal DT Frequency-Selective Filters

::: {.bi-pair}
::: {.bi-en lang="en"}
Within the principal interval $-\pi\le\omega\le\pi$, an ideal DT lowpass filter is
:::

::: {.bi-zh lang="zh-CN"}
在主值区间 $-\pi\le\omega\le\pi$ 内，理想离散时间低通滤波器为
:::
:::

$$
H_{\mathrm{LP}}(e^{j\omega})=
\begin{cases}
1, & |\omega|\le\omega_c,\\
0, & \omega_c<|\omega|\le\pi.
\end{cases}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The ideal highpass and bandpass responses are
:::

::: {.bi-zh lang="zh-CN"}
理想高通与带通响应分别为
:::
:::

$$
H_{\mathrm{HP}}(e^{j\omega})=
\begin{cases}
0, & |\omega|<\omega_c,\\
1, & \omega_c\le|\omega|\le\pi,
\end{cases}
$$

$$
H_{\mathrm{BP}}(e^{j\omega})=
\begin{cases}
1, & \omega_{c1}\le|\omega|\le\omega_{c2},\\
0, & \text{otherwise}.
\end{cases}
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Each DT frequency response repeats with period $2\pi$ outside the principal interval.
:::

::: {.bi-zh lang="zh-CN"}
每个离散时间频率响应在主值区间之外都以 $2\pi$ 为周期重复。
:::
:::

#### 3.7.10 First-Order Recursive DT Filter

::: {.bi-pair}
::: {.bi-en lang="en"}
Consider the causal difference equation
:::

::: {.bi-zh lang="zh-CN"}
考虑因果差分方程
:::
:::

$$
y[n]-ay[n-1]=x[n].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For input $x[n]=e^{j\omega n}$, the frequency response is
:::

::: {.bi-zh lang="zh-CN"}
对于输入 $x[n]=e^{j\omega n}$，频率响应为
:::
:::

$$
\boxed{
H(e^{j\omega})=\frac{1}{1-ae^{-j\omega}}
},
\qquad |a|<1.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The stability condition $|a|<1$ also guarantees convergence of the frequency-response sum. Writing $a=|a|e^{j\phi}$ gives
:::

::: {.bi-zh lang="zh-CN"}
稳定条件 $|a|<1$ 同时保证频率响应级数收敛。写成 $a=|a|e^{j\phi}$ 后可得
:::
:::

$$
|H(e^{j\omega})|
=\frac{1}{\sqrt{1+|a|^2-2|a|\cos(\omega-\phi)}}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The response peaks near $\omega=\phi$. For real positive $a$, the peak is near $0$, so the system behaves as a lowpass filter. For real negative $a$, the peak is near $\pi$, so it behaves as a highpass filter.
:::

::: {.bi-zh lang="zh-CN"}
响应在 $\omega=\phi$ 附近达到峰值。若 $a$ 为正实数，峰值位于 $0$ 附近，系统表现为低通滤波器；若 $a$ 为负实数，峰值位于 $\pi$ 附近，系统表现为高通滤波器。
:::
:::

::: {.bi-pair}
::: {.bi-en lang="en"}
The impulse and step responses are
:::

::: {.bi-zh lang="zh-CN"}
其冲激响应与阶跃响应分别为
:::
:::

$$
h[n]=a^nu[n],
$$

$$
s[n]=\frac{1-a^{n+1}}{1-a}u[n].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
This is an infinite impulse response, or IIR, filter. As $|a|$ approaches $1$, the passband becomes narrower and the time response decays more slowly. A smaller $|a|$ gives a broader frequency response and a faster transient.
:::

::: {.bi-zh lang="zh-CN"}
这是一个无限冲激响应（IIR）滤波器。当 $|a|$ 接近 $1$ 时，通带变窄，时域响应衰减更慢；较小的 $|a|$ 会产生更宽的频率响应和更快的瞬态。
:::
:::

#### 3.7.11 Moving-Average Lowpass Filter

::: {.bi-pair}
::: {.bi-en lang="en"}
A moving-average filter with $M_1$ future samples and $M_2$ past samples is
:::

::: {.bi-zh lang="zh-CN"}
包含 $M_1$ 个未来样本和 $M_2$ 个过去样本的移动平均滤波器为
:::
:::

$$
y[n]=\frac{1}{M_1+M_2+1}
\sum_{k=-M_1}^{M_2}x[n-k].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Its FIR impulse response is
:::

::: {.bi-zh lang="zh-CN"}
其有限冲激响应（FIR）为
:::
:::

$$
h[n]=\frac{1}{M_1+M_2+1}
\sum_{k=-M_1}^{M_2}\delta[n-k].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Let $L=M_1+M_2+1$. Its frequency response is
:::

::: {.bi-zh lang="zh-CN"}
令 $L=M_1+M_2+1$，其频率响应为
:::
:::

$$
\boxed{
H(e^{j\omega})
=e^{j(M_1-M_2)\omega/2}
\frac{\sin(L\omega/2)}{L\sin(\omega/2)}
}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The normalized average has unit gain at $\omega=0$. Increasing $L$ narrows the main lobe, suppresses a wider range of nonzero frequencies, and produces a smoother output.
:::

::: {.bi-zh lang="zh-CN"}
归一化平均在 $\omega=0$ 处具有单位增益。增大 $L$ 会使主瓣变窄，抑制更宽范围的非零频率，并产生更平滑的输出。
:::
:::

::: {.bi-pair}
::: {.bi-en lang="en"}
For $M_1=0$ and $M_2=1$,
:::

::: {.bi-zh lang="zh-CN"}
当 $M_1=0$、$M_2=1$ 时，
:::
:::

$$
y[n]=\frac12\big(x[n]+x[n-1]\big),
$$

$$
H(e^{j\omega})=e^{-j\omega/2}\cos(\omega/2).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
This filter passes a constant sequence unchanged and completely removes the alternating sequence $(-1)^n$ because $H(e^{j\pi})=0$.
:::

::: {.bi-zh lang="zh-CN"}
该滤波器会让常数序列保持不变，并因 $H(e^{j\pi})=0$ 而完全消除交替序列 $(-1)^n$。
:::
:::

::: {.bi-pair}
::: {.bi-en lang="en"}
For the symmetric three-point average, $M_1=M_2=1$,
:::

::: {.bi-zh lang="zh-CN"}
对于对称三点平均，即 $M_1=M_2=1$，
:::
:::

$$
y[n]=\frac13\big(x[n+1]+x[n]+x[n-1]\big),
$$

$$
H(e^{j\omega})
=\frac13+\frac23\cos\omega.
$$

#### 3.7.12 Causality and Delay of Moving Averages

::: {.bi-pair}
::: {.bi-en lang="en"}
The centered moving average
:::

::: {.bi-zh lang="zh-CN"}
中心移动平均
:::
:::

$$
y_1[n]=\frac{1}{2M+1}\sum_{k=-M}^{M}x[n-k]
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
is noncausal because it uses future samples. A realizable causal version is
:::

::: {.bi-zh lang="zh-CN"}
由于使用未来样本，因此是非因果的。可实现的因果版本为
:::
:::

$$
y_2[n]=\frac{1}{2M+1}\sum_{k=0}^{2M}x[n-k].
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The two outputs satisfy
:::

::: {.bi-zh lang="zh-CN"}
两个输出满足
:::
:::

$$
\boxed{y_2[n]=y_1[n-M]}.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The causal realization adds a delay of $M$ samples without changing the magnitude response. A larger window yields stronger smoothing and a narrower passband, but also increases delay and makes the response more sluggish.
:::

::: {.bi-zh lang="zh-CN"}
因果实现增加了 $M$ 个样本的延时，但不改变幅频响应。更大的窗口带来更强的平滑作用和更窄的通带，同时也增加延时，使响应更迟缓。
:::
:::

#### 3.7.13 First-Difference Highpass Filter

::: {.bi-pair}
::: {.bi-en lang="en"}
The scaled first-difference filter is
:::

::: {.bi-zh lang="zh-CN"}
缩放后的一阶差分滤波器为
:::
:::

$$
y[n]=\frac12\big(x[n]-x[n-1]\big).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Its impulse response and frequency response are
:::

::: {.bi-zh lang="zh-CN"}
其冲激响应与频率响应分别为
:::
:::

$$
h[n]=\frac12\big(\delta[n]-\delta[n-1]\big),
$$

$$
\boxed{
H(e^{j\omega})
=\frac12(1-e^{-j\omega})
=je^{-j\omega/2}\sin(\omega/2)
}.
$$

$$
|H(e^{j\omega})|=|\sin(\omega/2)|.
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The filter eliminates constants because $H(e^{j0})=0$ and gives unit magnitude to the highest DT frequency because $|H(e^{j\pi})|=1$. It therefore acts as a highpass filter.
:::

::: {.bi-zh lang="zh-CN"}
由于 $H(e^{j0})=0$，该滤波器会消除常数分量；又因为 $|H(e^{j\pi})|=1$，它对最高离散时间频率具有单位幅度增益。因此，该系统表现为高通滤波器。
:::
:::

::: {.bi-pair}
::: {.bi-en lang="en"}
In image processing, applying differences along horizontal and vertical directions suppresses slowly varying regions and emphasizes abrupt intensity changes. This makes first differences useful for edge detection.
:::

::: {.bi-zh lang="zh-CN"}
在图像处理中，沿水平和垂直方向应用差分会抑制缓慢变化区域，并增强亮度的突变，因此一阶差分可用于边缘检测。
:::
:::

#### 3.7.14 Chapter Summary

::: {.bi-pair}
::: {.bi-en lang="en"}
- Complex exponentials diagonalize LTI-system operations: each frequency component is multiplied by the frequency response at that frequency.
- CT periodic signals generally use infinitely many distinct harmonics, while a period-$N$ DT signal uses exactly $N$ distinct harmonics.
- DT Fourier coefficients are periodic in their frequency index, so multiplication produces circular convolution in the coefficient domain.
- LTI filters reshape a spectrum without creating new frequency components.
- Ideal filters specify exact passbands and stopbands, while practical RC, recursive, moving-average, and difference filters produce gradual frequency responses.
- Frequency selectivity and transient speed are linked: narrower passbands usually correspond to longer or slower time-domain responses.
:::

::: {.bi-zh lang="zh-CN"}
- 复指数使 LTI 系统运算对角化：每个频率分量只需乘以该频率处的频率响应。
- 连续时间周期信号通常使用无限多个不同谐波，而周期为 $N$ 的离散时间信号恰好使用 $N$ 个不同谐波。
- 离散时间傅里叶系数关于频率下标周期重复，因此时域相乘会在系数域产生循环卷积。
- LTI 滤波器能够重塑频谱，但不能产生新的频率分量。
- 理想滤波器规定精确的通带与阻带，而实际的 RC、递归、移动平均和差分滤波器具有渐变的频率响应。
- 选频能力与瞬态速度彼此关联：更窄的通带通常对应更长或更慢的时域响应。
:::
:::
