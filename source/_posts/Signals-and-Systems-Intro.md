---
title: Signals and Systems Intro
date: 2026-09-22 13:46:11
updated: 2026-10-18
math: true
categories:
  - Signals and Systems
tags:
  - Intro
description: Signals and Systems Course Notes (Intro)
index_img: /img/SignalsSystemsIntro.png
---

## Introduction

### What Do Signals and Systems Study?

::: {.bi-pair}
::: {.bi-en lang="en"}

- **Signal**
  - May describe a wide variety of physical phenomena.
  - Is represented mathematically as a function of one or more independent variables:
:::

::: {.bi-zh lang="zh-CN"}

- **信号**
  - 可以描述多种多样的物理现象。
  - 在数学上表示为一个或多个自变量的函数：
:::
:::

$$
x:I\to X,\qquad t\mapsto x(t).
$$

::: {.bi-pair}
::: {.bi-en lang="en"}
$I$ is the set of values of the independent variable, and $X$ is the set of signal values. This course mainly discusses signals with only one independent variable, which is uniformly referred to as **time**. A continuous-time signal is denoted by $x(t)$, whereas a discrete-time signal is denoted by $x[n]$.
:::

::: {.bi-zh lang="zh-CN"}
$I$ 是自变量的取值集合，$X$ 是信号值的集合。本课程主要讨论只有一个自变量的信号，并将该自变量统一称为**时间**。连续时间信号记作 $x(t)$，离散时间信号记作 $x[n]$。
:::
:::

::: {.bi-pair}
::: {.bi-en lang="en"}

- **System**
  - A process or rule that transforms an input signal into an output signal.
  - If the system is denoted by the operator $\mathcal T$, then

:::

::: {.bi-zh lang="zh-CN"}

- **系统**
  - 将输入信号变换为输出信号的过程或规则。
  - 如果用算子 $\mathcal T$ 表示该系统，则

:::
:::

$$
y=\mathcal T\{x\},\qquad x\longrightarrow \boxed{\mathcal T}\longrightarrow y.
$$

<!--
### Two Important Perspectives / 两个重要视角

1. **Time-domain perspective / 时域视角**: Study the signal values along the time axis and the system response at each instant. / 研究信号沿时间轴的取值以及系统在每个时刻的响应。
2. **Representation perspective / 表示视角**: Treat a signal as a vector in a vector space and expand it using a set of basic signals. / 将信号视为向量空间中的向量，并使用一组基本信号对其展开。

If $\{\phi_k\}$ is a basis, then / 如果 $\{\phi_k\}$ 是一组基，则

$$
x=\sum_k a_k\phi_k.
$$

Different bases lead to different signal representations. The unit-impulse basis emphasizes sample values, the Fourier basis emphasizes frequency components, and the Haar wavelet basis retains both time and scale information. / 不同的基会产生不同的信号表示。单位冲激基突出信号的采样值，傅里叶基突出频率分量，而 Haar 小波基同时保留时间与尺度信息。

Fourier's central idea is that, under suitable conditions, a periodic signal can be represented as a weighted sum of sines and cosines at different frequencies. This changes the question from how a waveform varies with time to which frequencies compose the signal. The representation underlies speech, image, communication, radar, biomedical, and financial signal processing. / 傅里叶分析的核心思想是：在适当条件下，周期信号可以表示为不同频率正弦和余弦信号的加权和。这样，问题就从波形如何随时间变化转化为信号由哪些频率组成。这种表示是语音、图像、通信、雷达、生物医学和金融信号处理的基础。
-->

## Syllabus

<details class="bi-details">
<summary><span class="bi-summary-en" lang="en">1. SIGNALS AND SYSTEMS</span><span class="bi-summary-separator"> / </span><span class="bi-summary-zh" lang="zh-CN">1. 信号与系统</span></summary>

::: {.bi-pair}
::: {.bi-en lang="en"}

- 1.1 Definition and Representations of Signals
- 1.2 Transformation of the Independent Variable
- 1.3 Basic Signals: Exponential and Sinusoidal Signals
- 1.4 Basic Signals: Unit Impulse and Unit Step Signals
- 1.5 Definitions and Representations of Systems
- 1.6 Basic System Properties
:::

::: {.bi-zh lang="zh-CN"}

- 1.1 信号的定义与表示
- 1.2 自变量变换
- 1.3 基本信号：指数信号与正弦信号
- 1.4 基本信号：单位冲激信号与单位阶跃信号
- 1.5 系统的定义与表示
- 1.6 系统的基本性质
:::
:::

</details>

<details class="bi-details">
<summary><span class="bi-summary-en" lang="en">2. LINEAR TIME-INVARIANT SYSTEMS</span><span class="bi-summary-separator"> / </span><span class="bi-summary-zh" lang="zh-CN">2. 线性时不变系统</span></summary>

::: {.bi-pair}
::: {.bi-en lang="en"}

- 2.0 Introduction
- 2.1 DT LTI Systems and the Convolution Sum
- 2.2 CT LTI Systems and the Convolution Integral
- 2.3 Properties of LTI Systems
- 2.4 Causal LTI Systems Described by Differential and Difference Equations
- 2.5 Block Diagram Representations of First-Order Systems
- 2.6 Singularity Functions
:::

::: {.bi-zh lang="zh-CN"}

- 2.0 引言
- 2.1 离散时间 LTI 系统与卷积和
- 2.2 连续时间 LTI 系统与卷积积分
- 2.3 LTI 系统的性质
- 2.4 由微分方程和差分方程描述的因果 LTI 系统
- 2.5 一阶系统的框图表示
- 2.6 奇异函数
:::
:::

</details>

<details class="bi-details">
<summary><span class="bi-summary-en" lang="en">3. FOURIER SERIES REPRESENTATION OF PERIODIC SIGNALS</span><span class="bi-summary-separator"> / </span><span class="bi-summary-zh" lang="zh-CN">3. 周期信号的傅里叶级数表示</span></summary>

::: {.bi-pair}
::: {.bi-en lang="en"}

- 3.0 Introduction
- 3.1 Response of LTI Systems to Complex Exponentials
- 3.2 Fourier Series Representation of CT Periodic Signals
- 3.3 Convergence of the Fourier Series
- 3.4 Properties of the CT Fourier Series
- 3.5 Fourier Series Representation of DT Periodic Signals
- 3.6 Fourier Series and LTI Systems
:::

::: {.bi-zh lang="zh-CN"}

- 3.0 引言
- 3.1 LTI 系统对复指数信号的响应
- 3.2 连续时间周期信号的傅里叶级数表示
- 3.3 傅里叶级数的收敛性
- 3.4 连续时间傅里叶级数的性质
- 3.5 离散时间周期信号的傅里叶级数表示
- 3.6 傅里叶级数与 LTI 系统
:::
:::

</details>

<details class="bi-details">
<summary><span class="bi-summary-en" lang="en">4. THE CONTINUOUS-TIME FOURIER TRANSFORM</span><span class="bi-summary-separator"> / </span><span class="bi-summary-zh" lang="zh-CN">4. 连续时间傅里叶变换</span></summary>

::: {.bi-pair}
::: {.bi-en lang="en"}

- 4.0 Introduction
- 4.1 CT Fourier Transform
- 4.2 Fourier Transform of CT Periodic Signals
- 4.3 Properties of the CT Fourier Transform
- 4.4 Convolution Property
- 4.5 Multiplication Property
- 4.6 Systems Characterized by Linear Constant-Coefficient Differential Equations
:::

::: {.bi-zh lang="zh-CN"}
- 4.0 引言
- 4.1 连续时间傅里叶变换
- 4.2 连续时间周期信号的傅里叶变换
- 4.3 连续时间傅里叶变换的性质
- 4.4 卷积性质
- 4.5 相乘性质
- 4.6 由线性常系数微分方程表征的系统
:::
:::

</details>

<details class="bi-details">
<summary><span class="bi-summary-en" lang="en">5. THE DISCRETE-TIME FOURIER TRANSFORM</span><span class="bi-summary-separator"> / </span><span class="bi-summary-zh" lang="zh-CN">5. 离散时间傅里叶变换</span></summary>

::: {.bi-pair}
::: {.bi-en lang="en"}
- 5.0 Introduction
- 5.1 DT Fourier Transform
- 5.2 DT Fourier Transform for Periodic Signals
- 5.3 Properties of the DT Fourier Transform
- 5.4 Convolution Property
- 5.5 Multiplication Property
- 5.6 Systems Characterized by Linear Constant-Coefficient Difference Equations
:::

::: {.bi-zh lang="zh-CN"}
- 5.0 引言
- 5.1 离散时间傅里叶变换
- 5.2 周期信号的离散时间傅里叶变换
- 5.3 离散时间傅里叶变换的性质
- 5.4 卷积性质
- 5.5 相乘性质
- 5.6 由线性常系数差分方程表征的系统
:::
:::

</details>

<details class="bi-details">
<summary><span class="bi-summary-en" lang="en">6. TIME AND FREQUENCY CHARACTERIZATION OF SIGNALS AND SYSTEMS</span><span class="bi-summary-separator"> / </span><span class="bi-summary-zh" lang="zh-CN">6. 信号与系统的时域和频域表征</span></summary>

::: {.bi-pair}
::: {.bi-en lang="en"}
- 6.1 Magnitude-Phase Representation of the Fourier Transform
- 6.2 Relations Among Fourier Representations
:::

::: {.bi-zh lang="zh-CN"}
- 6.1 傅里叶变换的幅度-相位表示
- 6.2 各种傅里叶表示之间的关系
:::
:::

</details>

<details class="bi-details">
<summary><span class="bi-summary-en" lang="en">7. SAMPLING</span><span class="bi-summary-separator"> / </span><span class="bi-summary-zh" lang="zh-CN">7. 采样</span></summary>

::: {.bi-pair}
::: {.bi-en lang="en"}
- 7.1 Sampling and Reconstruction of CT Signals
- 7.2 Sampling of DT Signals
- 7.3 DT Processing of CT Signals
:::

::: {.bi-zh lang="zh-CN"}
- 7.1 连续时间信号的采样与重建
- 7.2 离散时间信号的采样
- 7.3 连续时间信号的离散时间处理
:::
:::

</details>

<details class="bi-details">
<summary><span class="bi-summary-en" lang="en">8. COMMUNICATION SYSTEMS</span><span class="bi-summary-separator"> / </span><span class="bi-summary-zh" lang="zh-CN">8. 通信系统</span></summary>

::: {.bi-pair}
::: {.bi-en lang="en"}
- 8.1 CT Modulation
- 8.2 DT Modulation
:::

::: {.bi-zh lang="zh-CN"}
- 8.1 连续时间调制
- 8.2 离散时间调制
:::
:::

</details>

<details class="bi-details">
<summary><span class="bi-summary-en" lang="en">9. THE LAPLACE TRANSFORM</span><span class="bi-summary-separator"> / </span><span class="bi-summary-zh" lang="zh-CN">9. 拉普拉斯变换</span></summary>

::: {.bi-pair}
::: {.bi-en lang="en"}
- 9.0 Introduction
- 9.1 Laplace Transform
- 9.2 Region of Convergence
- 9.3 Properties of the Laplace Transform
- 9.4 Inverse Laplace Transform
- 9.5 Laplace Transform of Singularity Functions
- 9.6 Analysis of LTI Systems Using the Laplace Transform
- 9.7 Block Diagram Representations
- 9.8 Unilateral Laplace Transform
:::

::: {.bi-zh lang="zh-CN"}
- 9.0 引言
- 9.1 拉普拉斯变换
- 9.2 收敛域
- 9.3 拉普拉斯变换的性质
- 9.4 拉普拉斯逆变换
- 9.5 奇异函数的拉普拉斯变换
- 9.6 使用拉普拉斯变换分析 LTI 系统
- 9.7 框图表示
- 9.8 单边拉普拉斯变换
:::
:::

</details>

<details class="bi-details">
<summary><span class="bi-summary-en" lang="en">10. THE Z-TRANSFORM</span><span class="bi-summary-separator"> / </span><span class="bi-summary-zh" lang="zh-CN">10. Z 变换</span></summary>

::: {.bi-pair}
::: {.bi-en lang="en"}
- 10.0 Introduction
- 10.1 Z-Transform
- 10.2 Region of Convergence
- 10.3 Properties of the Z-Transform
- 10.4 Inverse Z-Transform
- 10.5 Analysis of LTI Systems Using the Z-Transform
- 10.6 Block Diagram Representations
- 10.7 Unilateral Z-Transform
:::

::: {.bi-zh lang="zh-CN"}
- 10.0 引言
- 10.1 Z 变换
- 10.2 收敛域
- 10.3 Z 变换的性质
- 10.4 Z 逆变换
- 10.5 使用 Z 变换分析 LTI 系统
- 10.6 框图表示
- 10.7 单边 Z 变换
:::
:::

</details>
