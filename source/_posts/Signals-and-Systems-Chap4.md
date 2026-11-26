---
title: Signals and Systems Chapter-4
date: 2026-11-26 11:16:39
updated: 2026-11-26
math: true
categories:
  - Signals and Systems
tags:
  - Signal Processing
  - Fourier Transform
  - Continuous-Time Signals
  - LTI Systems
  - Filtering
description: Signals and Systems Course Notes (Chapter-4)
index_img: /img/PeriodicComplexExponentialSignals.png
---

## 4. CONTINUOUS-TIME FOURIER TRANSFORM

### 4.0 Introduction

::: {.bi-pair}
::: {.bi-en lang="en"}
Fourier series use discrete harmonics for periodic signals. Aperiodic CT signals require a continuum of complex exponentials, turning the synthesis sum into an integral. The LTI strategy remains: decompose the input, use exponential eigenfunctions, and combine the responses.
:::
::: {.bi-zh lang="zh-CN"}
傅里叶级数使用离散谐波表示周期信号。非周期连续时间信号需要连续分布的复指数，因此综合求和变为积分。LTI 分析策略不变：分解输入，利用复指数特征函数，再合成各响应。
:::
:::

### 4.1 From Fourier Series to Fourier Transform

::: {.bi-pair}
::: {.bi-en lang="en"}
For a period-$T$ pulse train equal to one on $|t|<T_1$, with $\omega_0=2\pi/T$,
:::
::: {.bi-zh lang="zh-CN"}
对周期为 $T$、在 $|t|<T_1$ 内为一的脉冲序列，令 $\omega_0=2\pi/T$，
:::
:::

$$a_0=\frac{2T_1}{T},\qquad a_k=\frac{2\sin(k\omega_0T_1)}{k\omega_0T},\ k\ne0.$$

::: {.bi-pair}
::: {.bi-en lang="en"}
$Ta_k$ samples $X(j\omega)=2\sin(\omega T_1)/\omega$ at $\omega=k\omega_0$. As $T\to\infty$, the train becomes one pulse and the Riemann sum becomes
:::
::: {.bi-zh lang="zh-CN"}
$Ta_k$ 是 $X(j\omega)=2\sin(\omega T_1)/\omega$ 在 $\omega=k\omega_0$ 处的采样。当 $T\to\infty$ 时，序列成为单个脉冲，黎曼和变为
:::
:::

$$\boxed{X(j\omega)=\int_{-\infty}^{\infty}x(t)e^{-j\omega t}dt},\qquad
\boxed{x(t)=\frac1{2\pi}\int_{-\infty}^{\infty}X(j\omega)e^{j\omega t}d\omega}.$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Thus $x\leftrightarrow X$, and a periodic extension has $a_k=X(jk\omega_0)/T$: Fourier series samples the Fourier transform. Finite energy guarantees mean-square convergence. Common sufficient Dirichlet conditions are absolute integrability and finitely many finite extrema and jumps in every finite interval.
:::
::: {.bi-zh lang="zh-CN"}
因此记作 $x\leftrightarrow X$，周期延拓满足 $a_k=X(jk\omega_0)/T$：傅里叶级数是傅里叶变换的采样。有限能量保证均方收敛。常用充分 Dirichlet 条件是绝对可积，并在每个有限区间内只有有限个有限极值和跳变。
:::
:::

### 4.2 Fundamental Transform Pairs

$$e^{-at}u(t)\leftrightarrow\boxed{\frac1{a+j\omega}},\quad \operatorname{Re}a>0,$$
$$|X|=\frac1{\sqrt{a^2+\omega^2}},\qquad \angle X=-\tan^{-1}\frac{\omega}{a},$$
$$e^{-a|t|}\leftrightarrow\boxed{\frac{2a}{a^2+\omega^2}}.$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The first pair follows by integrating $e^{-(a+j\omega)t}$ from zero to infinity; splitting at zero gives the two-sided pair.
:::
::: {.bi-zh lang="zh-CN"}
第一对由 $e^{-(a+j\omega)t}$ 从零积分到无穷得到；在零点拆分积分即可得到双边变换对。
:::
:::

$$u(t+T_1)-u(t-T_1)\leftrightarrow\frac{2\sin(\omega T_1)}{\omega}
=2T_1\operatorname{sinc}\left(\frac{\omega T_1}{\pi}\right),$$
$$u(\omega+\omega_c)-u(\omega-\omega_c)\leftrightarrow\frac{\sin(\omega_ct)}{\pi t},$$
$$\boxed{\delta(t)\leftrightarrow1},\qquad\boxed{1\leftrightarrow2\pi\delta(\omega)}.$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Here $\operatorname{sinc}\theta=\sin(\pi\theta)/(\pi\theta)$. Wider time support means narrower bandwidth. The impulse contains all frequencies equally; a constant contains only DC.
:::
::: {.bi-zh lang="zh-CN"}
这里 $\operatorname{sinc}\theta=\sin(\pi\theta)/(\pi\theta)$。更宽的时域支撑意味着更窄的带宽。冲激等量包含所有频率；常数只包含直流。
:::
:::

### 4.3 Periodic Signals

$$e^{j\omega_0t}\leftrightarrow2\pi\delta(\omega-\omega_0),$$
$$x(t)=\sum_ka_ke^{jk\omega_0t}\Longleftrightarrow
\boxed{X(j\omega)=2\pi\sum_ka_k\delta(\omega-k\omega_0)}.$$

::: {.bi-pair}
::: {.bi-en lang="en"}
A periodic signal has impulses at harmonic frequencies; the $k$th impulse area is $2\pi a_k$.
:::
::: {.bi-zh lang="zh-CN"}
周期信号在谐波频率处具有冲激；第 $k$ 个冲激面积为 $2\pi a_k$。
:::
:::

$$\cos\omega_0t\leftrightarrow\pi[\delta(\omega-\omega_0)+\delta(\omega+\omega_0)],$$
$$\sin\omega_0t\leftrightarrow\frac{\pi}{j}[\delta(\omega-\omega_0)-\delta(\omega+\omega_0)],$$
$$\sum_k\delta(t-kT)\leftrightarrow\frac{2\pi}{T}\sum_k\delta\left(\omega-k\frac{2\pi}{T}\right).$$

### 4.4 CTFT Properties

#### 4.4.1 Linearity, Shifts, and Modulation

$$ax_1+bx_2\leftrightarrow aX_1+bX_2,$$
$$x(t-t_0)\leftrightarrow e^{-j\omega t_0}X,\qquad
e^{j\omega_0t}x(t)\leftrightarrow X(j(\omega-\omega_0)),$$
$$x(t)\cos\omega_ct\leftrightarrow\frac12X(j(\omega-\omega_c))+\frac12X(j(\omega+\omega_c)).$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For multipath $y=a_0x(t)+a_1x(t-\tau)$, $Y=(a_0+a_1e^{-j\omega\tau})X$. If $a_0=a_1=1$, the factor $2e^{-j\omega\tau/2}\cos(\omega\tau/2)$ creates periodic cancellation. Cosine modulation creates two shifted half-amplitude spectra.
:::
::: {.bi-zh lang="zh-CN"}
对多径信号 $y=a_0x(t)+a_1x(t-\tau)$，有 $Y=(a_0+a_1e^{-j\omega\tau})X$。若 $a_0=a_1=1$，因子 $2e^{-j\omega\tau/2}\cos(\omega\tau/2)$ 产生周期性抵消。余弦调制产生两个半幅移位频谱。
:::
:::

#### 4.4.2 Reversal, Symmetry, and Scaling

$$x(-t)\leftrightarrow X(-j\omega),\qquad x^*(t)\leftrightarrow X^*(-j\omega).$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Real signals satisfy $X(-j\omega)=X^*(j\omega)$. Real-even signals have real-even spectra; real-odd signals have imaginary-odd spectra. For real $x=x_e+x_o$, $x_e\leftrightarrow\operatorname{Re}X$ and $x_o\leftrightarrow j\operatorname{Im}X$.
:::
::: {.bi-zh lang="zh-CN"}
实信号满足 $X(-j\omega)=X^*(j\omega)$。实偶信号具有实偶频谱；实奇信号具有纯虚奇频谱。对实信号 $x=x_e+x_o$，$x_e\leftrightarrow\operatorname{Re}X$，$x_o\leftrightarrow j\operatorname{Im}X$。
:::
:::

$$e^{-at}u(t)-e^{at}u(-t)\leftrightarrow\boxed{\frac{-2j\omega}{a^2+\omega^2}},$$
$$\boxed{x(at)\leftrightarrow\frac1{|a|}X\left(j\frac{\omega}{a}\right)},$$
$$\boxed{x(at+b)\leftrightarrow\frac1{|a|}e^{j\omega b/a}X\left(j\frac{\omega}{a}\right)},$$
$$e^{-(at)^2}\leftrightarrow\frac{\sqrt\pi}{|a|}e^{-(\omega/a)^2/4}.$$

#### 4.4.3 Time Differentiation and Integration

$$\boxed{x^{(k)}(t)\leftrightarrow(j\omega)^kX(j\omega)},$$
$$\int_{-\infty}^{t}x(\tau)d\tau\leftrightarrow
\boxed{\frac{X(j\omega)}{j\omega}+\pi X(0)\delta(\omega)},$$
$$\operatorname{sgn}(t)\leftrightarrow\frac2{j\omega},\qquad
u(t)\leftrightarrow\frac1{j\omega}+\pi\delta(\omega).$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Differentiation removes DC and emphasizes high frequencies. The integration impulse term restores the lost constant. The sign pair follows by a decaying-odd limit, two steps, or integrating $2\delta(t)$.
:::
::: {.bi-zh lang="zh-CN"}
微分消除直流并增强高频。积分中的冲激项恢复丢失的常数。符号函数变换可由衰减奇函数取极限、两个阶跃相减，或积分 $2\delta(t)$ 得到。
:::
:::

##### Triangular pulse

$$x''(t)=\frac2T\left[\delta\left(t+\frac T2\right)-2\delta(t)+\delta\left(t-\frac T2\right)\right],$$
$$X_2=-\frac8T\sin^2\frac{\omega T}{4},\qquad
\boxed{X=\frac{X_2}{(j\omega)^2}=\frac{8\sin^2(\omega T/4)}{\omega^2T}}.$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The integration impulses vanish because the relevant zero-frequency values are zero; $X(0)=T/2$, the triangular area.
:::
::: {.bi-zh lang="zh-CN"}
相关零频值为零，所以积分冲激项消失；$X(0)=T/2$，即三角形面积。
:::
:::

#### 4.4.4 Duality and Frequency Differentiation

$$x(t)\leftrightarrow X(j\omega)\Longrightarrow\boxed{X(t)\leftrightarrow2\pi x(-\omega)},$$
$$\frac1{\pi t}\leftrightarrow-j\operatorname{sgn}\omega,\qquad
\frac1{1+t^2}\leftrightarrow\pi e^{-|\omega|},$$
$$tx(t)\leftrightarrow j\frac{dX}{d\omega},\qquad
-\frac{x(t)}{jt}+\pi x(0)\delta(t)\leftrightarrow\int_{-\infty}^{\omega}X(j\eta)d\eta,$$
$$te^{-2t}u(t)\leftrightarrow\boxed{\frac1{(2+j\omega)^2}},\qquad
tu(t)\leftrightarrow-\frac1{\omega^2}+j\pi\delta'(\omega).$$

#### 4.4.5 Parseval's Relation

$$\boxed{\int|x(t)|^2dt=\frac1{2\pi}\int|X(j\omega)|^2d\omega}.$$

::: {.bi-pair}
::: {.bi-en lang="en"}
$|X|^2$ is energy density in angular frequency; power density is the limit of $|X_T|^2/T$. If $X=\sqrt\pi$ for $|\omega|\le1/2$, $X=\sqrt\pi/2$ for $1/2<|\omega|\le1$, and zero otherwise, then $E=[\pi+\pi/4]/(2\pi)=5/8$. Even symmetry also gives $x'(0)=0$.
:::
::: {.bi-zh lang="zh-CN"}
$|X|^2$ 是关于角频率的能量密度；功率密度是 $|X_T|^2/T$ 的极限。若 $|\omega|\le1/2$ 时 $X=\sqrt\pi$，$1/2<|\omega|\le1$ 时 $X=\sqrt\pi/2$，其余为零，则 $E=[\pi+\pi/4]/(2\pi)=5/8$。偶对称性还给出 $x'(0)=0$。
:::
:::

$$\boxed{\int_{-\infty}^{\infty}\frac{\sin^2(Wt)}{\pi^2t^2}dt=\frac W\pi}.$$

#### 4.4.6 Generalized-Signal and Shift Examples

::: {.bi-pair}
::: {.bi-en lang="en"}
Let $x=2$ for $|t|<1$, $x=0$ for $1<|t|<2$, and $x=1$ for $|t|>2$. Either transform $2g_2+u(-t-2)+u(t-2)$ directly, or differentiate its jumps and restore the DC term:
:::
::: {.bi-zh lang="zh-CN"}
令 $|t|<1$ 时 $x=2$，$1<|t|<2$ 时 $x=0$，$|t|>2$ 时 $x=1$。可直接变换 $2g_2+u(-t-2)+u(t-2)$，也可先对跳变求导再恢复直流项：
:::
:::

$$x'=-\delta(t+2)+2\delta(t+1)-2\delta(t-1)+\delta(t-2),$$
$$\boxed{X=2\pi\delta(\omega)+\frac{4\sin\omega}{\omega}-\frac{2\sin2\omega}{\omega}}.$$

$$e^{-2t}u(t)\leftrightarrow\frac1{2+j\omega},$$
$$e^{-2(t-1)}u(t)\leftrightarrow\boxed{\frac{e^2}{2+j\omega}},\qquad
e^{-2t}u(t-1)\leftrightarrow\boxed{\frac{e^{-2}e^{-j\omega}}{2+j\omega}}.$$

::: {.bi-pair}
::: {.bi-en lang="en"}
The middle signal changes amplitude without shifting its step; the last delays the complete right-sided exponential.
:::
::: {.bi-zh lang="zh-CN"}
中间信号只改变幅度而不移动阶跃；最后一个信号延迟整个右边指数。
:::
:::

### 4.5 Convolution and LTI Systems

$$\boxed{x_1*x_2\leftrightarrow X_1X_2},\qquad y=h*x\leftrightarrow Y=HX.$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Changing variables in the double integral proves the property. Equivalently, $H(j\omega)$ is the eigenvalue of each exponential. Thus $H=Y/X$ where $X\ne0$, and $H=|H|e^{j\angle H}$ fully specifies gain and phase. Ordinary BIBO-stable systems satisfy $\int|h|dt<\infty$.
:::
::: {.bi-zh lang="zh-CN"}
在二重积分中换元可证明该性质。等价地，$H(j\omega)$ 是每个复指数的特征值。因此在 $X\ne0$ 处 $H=Y/X$，且 $H=|H|e^{j\angle H}$ 完整规定增益和相位。普通 BIBO 稳定系统满足 $\int|h|dt<\infty$。
:::
:::

| System | $h(t)$ | $H(j\omega)$ |
|---|---|---|
| Identity | $\delta(t)$ | $1$ |
| Delay | $\delta(t-t_0)$ | $e^{-j\omega t_0}$ |
| Differentiator | $\delta'(t)$ | $j\omega$ |
| Integrator | $u(t)$ | $1/(j\omega)+\pi\delta(\omega)$ |
| Ideal lowpass | $\sin(\omega_ct)/(\pi t)$ | $1$ for $|\omega|\le\omega_c$ |
| First-order lowpass | $e^{-t}u(t)$ | $1/(1+j\omega)$ |

#### 4.5.1 Rectangle Convolution

$$x_1=\sqrt{\frac2T}\left[u\left(t+\frac T4\right)-u\left(t-\frac T4\right)\right],\quad
X_1=\sqrt{\frac2T}\frac{2\sin(\omega T/4)}{\omega},$$
$$x_1*x_1=\left(1-\frac{2|t|}{T}\right)\left[u\left(t+\frac T2\right)-u\left(t-\frac T2\right)\right],$$
$$\boxed{X=X_1^2=\frac{8\sin^2(\omega T/4)}{\omega^2T}}.$$

#### 4.5.2 Complete Response Examples

::: {.bi-pair}
::: {.bi-en lang="en"}
For $h=e^{-at}u(t)$ and $x=e^{-bt}u(t)$,
:::
::: {.bi-zh lang="zh-CN"}
对于 $h=e^{-at}u(t)$ 与 $x=e^{-bt}u(t)$，
:::
:::

$$Y=\frac1{(a+j\omega)(b+j\omega)},$$
$$a\ne b:\quad\boxed{y=\frac{e^{-at}-e^{-bt}}{b-a}u(t)},\qquad
a=b:\quad\boxed{y=te^{-at}u(t)}.$$

::: {.bi-pair}
::: {.bi-en lang="en"}
For $x=\cos\omega_0t$, combine its two exponential eigenfunctions:
:::
::: {.bi-zh lang="zh-CN"}
对 $x=\cos\omega_0t$，合并其两个复指数特征函数：
:::
:::

$$\boxed{y=\frac{a\cos\omega_0t+\omega_0\sin\omega_0t}{a^2+\omega_0^2}}
=\frac{\cos(\omega_0t-\tan^{-1}(\omega_0/a))}{\sqrt{a^2+\omega_0^2}}.$$

::: {.bi-pair}
::: {.bi-en lang="en"}
If input and impulse-response sinc signals have unit rectangular spectra of half-widths $\omega_i$ and $\omega_c$, multiplication retains their overlap: the output bandwidth is $\min(\omega_i,\omega_c)$; $y=x$ if $\omega_i\le\omega_c$, otherwise $y=h$.
:::
::: {.bi-zh lang="zh-CN"}
若输入和冲激响应 sinc 信号具有半宽为 $\omega_i$ 与 $\omega_c$ 的单位矩形频谱，相乘只保留重叠部分：输出带宽为 $\min(\omega_i,\omega_c)$；$\omega_i\le\omega_c$ 时 $y=x$，否则 $y=h$。
:::
:::

### 4.6 System Interconnections

$$h_{\rm cascade}=h_1*h_2,\quad H_{\rm cascade}=H_1H_2,\qquad
h_{\rm parallel}=h_1+h_2,\quad H_{\rm parallel}=H_1+H_2.$$

::: {.bi-pair}
::: {.bi-en lang="en"}
Cascade order does not matter for ideal LTI blocks. Negative feedback gives
:::
::: {.bi-zh lang="zh-CN"}
理想 LTI 模块的级联顺序不影响结果。负反馈给出
:::
:::

$$Y=H_1X-H_1H_2Y,\qquad\boxed{H_{\rm closed}=\frac{H_1}{1+H_1H_2}}.$$

::: {.bi-pair}
::: {.bi-en lang="en"}
In time, $y=h_1*x-h_1*h_2*y$: a convolution equation becomes algebraic in frequency.
:::
::: {.bi-zh lang="zh-CN"}
在时域中，$y=h_1*x-h_1*h_2*y$：卷积方程在频域中变为代数方程。
:::
:::

### 4.7 Frequency-Selective Filtering

::: {.bi-pair}
::: {.bi-en lang="en"}
Ideal lowpass, highpass, bandpass, and bandstop filters retain prescribed regions. The zero-phase ideal lowpass has $h=\sin(\omega_ct)/(\pi t)$, which is two-sided and noncausal.
:::
::: {.bi-zh lang="zh-CN"}
理想低通、高通、带通与带阻滤波器保留规定的频率区域。零相位理想低通具有 $h=\sin(\omega_ct)/(\pi t)$，它是双边且非因果的。
:::
:::

$$y'(t)+y(t)=x(t)\Longrightarrow\boxed{H(j\omega)=\frac1{1+j\omega}},$$
$$|H|=\frac1{\sqrt{1+\omega^2}},\qquad\angle H=-\tan^{-1}\omega.$$

::: {.bi-pair}
::: {.bi-en lang="en"}
This causal RC lowpass attenuates high frequencies gradually. A linear-phase ideal lowpass uses
:::
::: {.bi-zh lang="zh-CN"}
该因果 RC 低通逐渐衰减高频。线性相位理想低通使用
:::
:::

$$H(j\omega)=\begin{cases}e^{-j\omega t_0},&|\omega|\le\omega_c,\\0,&|\omega|>\omega_c.\end{cases}$$

::: {.bi-pair}
::: {.bi-en lang="en"}
It delays every passed frequency equally, avoiding waveform distortion. Nonlinear phase can distort the waveform.
:::
::: {.bi-zh lang="zh-CN"}
它对所有通过频率施加相同延迟，从而避免波形失真；非线性相位可能产生失真。
:::
:::

$$H(j\omega)=\begin{cases}j\omega/(3\pi),&|\omega|\le3\pi,\\0,&|\omega|>3\pi,\end{cases}$$

::: {.bi-pair}
::: {.bi-en lang="en"}
is a cutoff-$3\pi$ lowpass of gain $1/(3\pi)$ cascaded with a differentiator. Bandlimiting prevents unbounded high-frequency amplification.
:::
::: {.bi-zh lang="zh-CN"}
它等价于截止频率为 $3\pi$、增益为 $1/(3\pi)$ 的低通与微分器级联。带限可避免高频被无限放大。
:::
:::

#### 4.7.1 Music-and-Voice Separation

::: {.bi-pair}
::: {.bi-en lang="en"}
Music and speech may overlap in time but occupy different dominant spectral regions. Inspect the spectrum, identify the voice-dominated band, apply a bandstop filter, compute $Y=HX$, and invert the transform. Perfect separation is impossible where their spectra overlap because an LTI filter affects both signals at the same frequency.
:::
::: {.bi-zh lang="zh-CN"}
音乐与语音可能在时间上重叠，却占据不同的主要频谱区域。先观察频谱，找出语音占优的频带，再使用带阻滤波器，计算 $Y=HX$ 并作逆变换。若二者频谱重叠，则无法完美分离，因为 LTI 滤波器会同时影响同一频率处的两个信号。
:::
:::

### 4.8 Chapter Summary

::: {.bi-pair}
::: {.bi-en lang="en"}
- The CTFT represents aperiodic signals with a continuum of exponentials.
- Periodic signals have impulse spectra weighted by Fourier-series coefficients.
- Transform properties simplify shifts, scaling, modulation, symmetry, differentiation, and integration.
- Parseval equates time- and frequency-domain energy.
- Convolution becomes multiplication; $H(j\omega)$ completely characterizes an LTI system.
- Filter magnitude selects frequencies, while phase controls delay and distortion.
:::
::: {.bi-zh lang="zh-CN"}
- 连续时间傅里叶变换用连续复指数表示非周期信号。
- 周期信号具有由傅里叶级数系数加权的冲激频谱。
- 变换性质简化移位、缩放、调制、对称、微分与积分。
- Parseval 关系说明时域与频域能量相等。
- 卷积变为乘法；$H(j\omega)$ 完整表征 LTI 系统。
- 滤波器幅度选择频率，相位控制延迟与失真。
:::
:::
