---
title: Signals and Systems Chapter-1
date: 2026-09-22 13:46:11
updated: 2026-09-22
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

Function of one or more independent variables.

- Electrical voltage: $V_0:\mathbb R\to\mathbb R$, $t\mapsto V_0(t)$
- Daily temperature: $T:\mathbb Z\to\mathbb R$, $n\mapsto T[n]$
- Speech signal: $x:\mathbb R\to\mathbb R$, $t\mapsto x(t)$
- Color image: $P:I\times J\to R\times G\times B$, $(i,j)\mapsto(r[i,j],g[i,j],b[i,j])$

This course focuses on one-dimensional signals. Even when the independent variable is not physical time, such as an index in a DNA base sequence or a week number in stock-market data, it is denoted uniformly by $t$ or $n$.

#### 1.1.2 CT vs DT

| Type | Independent Variable | Notation | Description |
| --- | --- | --- | --- |
| Continuous-Time signal (CT) | $t\in\mathbb R$ | $x(t)$ | Defined at every continuous instant. Often called an analog signal. |
| Discrete-Time signal (DT) | Usually $n\in\mathbb Z$ | $x[n]$ | Defined only at discrete instants, also known as a sequence |

#### 1.1.3 Signals as Vectors

A finite-length sequence can be directly written as a finite-dimensional vector, and infinite-length sequences and continuous-time functions can also be regarded as generalized vectors:

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

When signals are regarded as vectors, tools from linear algebra such as linear combinations, bases, inner products, norms and projections can be applied to signal analysis.

**Vector space:** A vector space $V$ is closed under vector addition and scalar multiplication. These operations satisfy commutativity, associativity, and distributivity. The space also contains a zero vector, an additive inverse for every vector, and a multiplicative identity for scalar multiplication. A nonempty subset $S\subseteq V$ is a subspace of $V$ if it is closed under vector addition and scalar multiplication.

The span of a set $S$ contains all finite linear combinations of vectors in $S$:

$$
\operatorname{span}(S)
=\left\{\sum_{k=0}^{N-1}\alpha_k\phi_k:
\alpha_k\in\mathbb C\text{ or }\mathbb R,\ \phi_k\in S\right\}.
$$

The set $\{\phi_k\}$ is linearly independent if

$$
\sum_{k=0}^{N-1}\alpha_k\phi_k=0
$$

holds only when every $\alpha_k=0$. The dimension of a vector space is the maximum number of linearly independent vectors it contains. If no finite maximum exists, the space is infinite-dimensional.

#### 1.1.4 Inner Products, Norms, and Signal Spaces

The inner product $\langle x,y\rangle$ measures similarity between two signals. It also provides the foundation for correlation, pattern matching, and convolution analysis. In a complex vector space, an inner product satisfies

$$
\begin{aligned}
\langle x+y,z\rangle&=\langle x,z\rangle+\langle y,z\rangle,\\
\langle \alpha x,y\rangle&=\alpha\langle x,y\rangle,\\
\langle x,y\rangle^*&=\langle y,x\rangle,\\
\langle x,x\rangle&\ge 0,
\end{aligned}
$$

and $\langle x,x\rangle=0$ if and only if $x=0$. Common standard inner products are

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

A norm $\|x\|$ represents the length or magnitude of a signal. It satisfies positive definiteness, absolute homogeneity, and the triangle inequality:

$$
\|x\|\ge0,\qquad \|\alpha x\|=|\alpha|\|x\|,
\qquad \|x+y\|\le\|x\|+\|y\|.
$$

The 2-norm induced by an inner product is

$$
\|x\|_2=\sqrt{\langle x,x\rangle}.
$$

The corresponding 2-norms for a finite-dimensional vector, a discrete-time sequence, and a continuous-time signal are

$$
\left(\sum_{n=0}^{N-1}|x_n|^2\right)^{1/2},\qquad
\left(\sum_{n=-\infty}^{\infty}|x[n]|^2\right)^{1/2},\qquad
\left(\int_{-\infty}^{\infty}|x(t)|^2dt\right)^{1/2}.
$$

Square-summable sequences form $\ell^2(\mathbb Z)$, while square-integrable functions form $L^2(\mathbb R)$. More generally, $\ell^p$ and $L^p$ use the $p$-norm. The spaces $\ell^\infty$ and $L^\infty$ measure signal magnitude by the supremum of its absolute value.

This viewpoint also explains signal denoising. If a clean signal belongs to a subspace $S$, a noisy signal $x$ can be projected onto $S$ to obtain an estimate $\hat x$. The error $x-\hat x$ is orthogonal to $S$.

#### 1.1.5 Common Signal Classifications

##### Deterministic and Random Signals

- A **deterministic signal** can be described by an exact mathematical expression or rule. Its value is uniquely determined once the independent variable is given.
- A **random signal** cannot be predicted completely by a deterministic expression. Even at a specified time, its value remains a random variable and is usually described through probability distributions, means, and correlation functions.

##### Energy and Power Signals

For a physical resistor, power is proportional to the square of the voltage. Signal theory extends this form to general signals and omits proportionality constants that do not affect classification.

The total energy and average power of a continuous-time signal are

$$
E_\infty=\int_{-\infty}^{\infty}|x(t)|^2dt,
\qquad
P_\infty=\lim_{T\to\infty}\frac{1}{2T}
\int_{-T}^{T}|x(t)|^2dt.
$$

For a discrete-time signal, the corresponding definitions are

$$
E_\infty=\sum_{n=-\infty}^{\infty}|x[n]|^2,
\qquad
P_\infty=\lim_{N\to\infty}\frac{1}{2N+1}
\sum_{n=-N}^{N}|x[n]|^2.
$$

- If $0<E_\infty<\infty$, the signal is an **energy signal**, and $P_\infty=0$.
- If $0<P_\infty<\infty$, the signal is a **power signal**, and normally $E_\infty=\infty$.
- If neither quantity meets the corresponding finite condition, the signal is neither an energy signal nor a power signal.
- The zero signal is a special case whose energy and power are both zero.

A bounded signal with finite duration is usually an energy signal. A nonzero periodic signal is usually a power signal. For a periodic signal, the average only needs to be evaluated over one period:

$$
P=\frac{1}{T_0}\int_{t_0}^{t_0+T_0}|x(t)|^2dt
$$

or

$$
P=\frac{1}{N_0}\sum_{n=n_0}^{n_0+N_0-1}|x[n]|^2.
$$

##### Periodic and Aperiodic Signals

A continuous-time signal is periodic if there exists a $T>0$ such that

$$
x(t+T)=x(t),\qquad \forall t,
$$

for every $t$. The smallest positive value that satisfies this condition is the fundamental period $T_0$. A discrete-time signal is periodic if there exists a positive integer $N$ such that

$$
x[n+N]=x[n],\qquad \forall n,
$$

for every $n$. The smallest such positive integer is the fundamental period $N_0$. A constant signal remains unchanged under every positive shift, so it has no unique smallest positive period.

##### Even and Odd Signals

An even signal is symmetric about the vertical axis, while an odd signal is antisymmetric about the origin:

$$
\begin{aligned}
x(t)&=x(-t) &&\text{even signal},\\
x(t)&=-x(-t) &&\text{odd signal}.
\end{aligned}
$$

For a discrete-time signal, replace $t$ with $n$. If an odd signal has a finite value at the origin, then $x(0)=0$.

Every signal has a unique decomposition into an even part and an odd part:

$$
x(t)=x_e(t)+x_o(t),
$$

where

$$
x_e(t)=\frac{x(t)+x(-t)}{2},\qquad
x_o(t)=\frac{x(t)-x(-t)}{2}.
$$

### 1.2 Transformation of Independent Variable

Transformations of the independent variable change a signal's position, direction, or rate of variation along the time axis. They do not directly change the set of signal values. When sketching a transformed signal, track where each distinctive point of the original signal moves.

#### 1.2.1 Time Shifting

$$
x(t)\to x(t-t_0),\qquad x[n]\to x[n-n_0].
$$

- $t_0>0$ or $n_0>0$: shift to the right, called a delay.
- $t_0<0$ or $n_0<0$: shift to the left, called an advance.

Do not determine the direction from the sign inside the parentheses alone. Instead, equate the new argument to the location of a feature in the original signal. If the original signal has a peak at $t=t_1$, the peak of $x(t-t_0)$ satisfies $t-t_0=t_1$ and therefore occurs at $t=t_1+t_0$.

#### 1.2.2 Time Reversal

$$
x(t)\to x(-t),\qquad x[n]\to x[-n].
$$

Time reversal reflects the signal about $t=0$ or $n=0$. Playing a tape backward is an intuitive example.

#### 1.2.3 Time Scaling

For a continuous-time signal,

$$
x(t)\to x(at).
$$

| Range of $a$ | Effect |
| --- | --- |
| $a>1$ | Forward compression; the signal varies faster |
| $0<a<1$ | Forward expansion; the signal varies more slowly |
| $-1<a<0$ | Reversal followed by expansion |
| $a<-1$ | Reversal followed by compression |

A feature located at $t=t_1$ in the original signal moves to $t=t_1/a$. The horizontal scale therefore changes by a factor of $1/|a|$.

Discrete-time scaling is restricted by the integer index. For a positive integer $M$, $x[Mn]$ keeps every $M$th sample of the original sequence and performs decimation. The expression $x[n/M]$ is undefined whenever $n/M$ is not an integer unless an interpolation rule specifies the missing values.

#### 1.2.4 General Affine Transformation

$$
x(t)\to x(\alpha t+\beta).
$$

The most reliable sketching method maps distinctive points. A feature located at $t=t_1$ in the original signal satisfies

$$
\alpha t+\beta=t_1,
$$

in the transformed signal, so it moves to

$$
t=\frac{t_1-\beta}{\alpha}.
$$

The transformation can also be decomposed into elementary operations. To shift first and scale afterward, first form $x(t+\beta)$ and then replace $t$ by $at$, which gives $x(\alpha t+\beta)$. For example,

$$
x(-3t-2)
$$

can be obtained by first changing $x(t)$ into $x(t-2)$ and then applying $t\mapsto-3t$. Regardless of the chosen decomposition, verify the result with the distinctive-point equation.

### 1.3 Basic Signals: Exponential & Sinusoidal Signals

#### 1.3.1 Continuous-Time Real Exponential Signals

The general form is

$$
x(t)=Ce^{at},\qquad C,a\in\mathbb R.
$$

- $a>0$: exponential growth as $t$ increases.
- $a<0$: exponential decay as $t$ increases.
- $a=0$: $x(t)=C$, a constant signal.

The parameter $C$ determines the amplitude and sign, while $a$ determines the growth or decay rate. Exponential signals commonly describe capacitor charging and discharging in RC circuits, damped mechanical responses, and population growth.

#### 1.3.2 Continuous-Time Complex Exponentials and Euler's Formula

When the exponent is purely imaginary,

$$
x(t)=e^{j\omega_0t}.
$$

Euler's formula gives

$$
e^{j\omega_0t}=\cos(\omega_0t)+j\sin(\omega_0t).
$$

The real and imaginary parts of the complex exponential are a cosine and a sine, respectively. The signal rotates in the complex plane at a constant angular velocity and has unit magnitude.

Angular frequency, ordinary frequency, and period are related by

$$
f_0=\frac{\omega_0}{2\pi},\qquad
T_0=\frac{2\pi}{|\omega_0|}=\frac{1}{|f_0|},
\qquad \omega_0\ne0.
$$

The unit of $\omega_0$ is rad/s, and the unit of $f_0$ is hertz(Hz). A negative frequency represents rotation in the opposite direction in the complex plane. The fundamental angular frequency is normally stated as $|\omega_0|$.

Multiplication by a complex constant $C=|C|e^{j\phi}$ gives

$$
Ce^{j\omega_0t}=|C|e^{j(\omega_0t+\phi)}.
$$

The magnitude $|C|$ controls the amplitude, while $\phi$ controls the initial phase.

#### 1.3.3 Sinusoidal Signals and Complex Exponential Representation

A continuous-time sinusoidal signal can be written as

$$
x(t)=A\cos(\omega_0t+\phi).
$$

Its amplitude is $|A|$, its angular frequency is $|\omega_0|$, and its initial phase is $\phi$. Euler's formula gives

$$
A\cos(\omega_0t+\phi)
=\frac{A}{2}e^{j\phi}e^{j\omega_0t}
+\frac{A}{2}e^{-j\phi}e^{-j\omega_0t},
$$

$$
A\sin(\omega_0t+\phi)
=\operatorname{Im}\left\{Ae^{j(\omega_0t+\phi)}\right\}.
$$

A real cosine can therefore be viewed as the sum of two complex exponentials with opposite frequencies. Complex exponentials are natural building blocks for Fourier analysis and LTI system analysis.

#### 1.3.4 General Continuous-Time Complex Exponentials

Let

$$
C=|C|e^{j\phi},\qquad a=r+j\omega_0,
$$

Then

$$
\begin{aligned}
x(t)&=Ce^{at}\\
&=|C|e^{rt}e^{j(\omega_0t+\phi)}\\
&=|C|e^{rt}\cos(\omega_0t+\phi)
+j|C|e^{rt}\sin(\omega_0t+\phi).
\end{aligned}
$$

The real part $r$ determines whether the envelope grows or decays, while the imaginary part $\omega_0$ determines the oscillation frequency. The cases $r<0$, $r>0$, and $r=0$ correspond to a decaying oscillation, a growing oscillation, and a constant-amplitude oscillation, respectively.

#### 1.3.5 Discrete-Time Exponential Signals

The general form of a discrete-time complex exponential is

$$
x[n]=C\alpha^n=Ce^{\beta n},
\qquad \alpha=e^\beta.
$$

When $C,\alpha\in\mathbb R$:

- $\alpha>1$: monotonically growing magnitude.
- $0<\alpha<1$: monotonically decaying magnitude.
- $\alpha=1$: constant sequence.
- $\alpha<-1$: growing magnitude with alternating sign.
- $-1<\alpha<0$: decaying magnitude with alternating sign.
- $\alpha=-1$: constant magnitude with alternating sign.

If

$$
C=|C|e^{j\phi},\qquad \alpha=|\alpha|e^{j\omega_0},
$$

then

$$
x[n]=|C||\alpha|^n e^{j(\omega_0n+\phi)}.
$$

The magnitude $|\alpha|$ determines the envelope, while $\omega_0$ determines the phase increment per sample.

#### 1.3.6 Periodicity and Aliasing of Discrete-Time Complex Exponentials

For

$$
x[n]=e^{j\omega_0n},
$$

periodicity requires a positive integer $N$ such that

$$
e^{j\omega_0(n+N)}=e^{j\omega_0n}.
$$

Canceling the common factor gives

$$
e^{j\omega_0N}=1
\iff \omega_0N=2\pi k,
\qquad k\in\mathbb Z.
$$

Therefore, a discrete-time complex exponential is periodic if and only if

$$
\frac{\omega_0}{2\pi}\in\mathbb Q.
$$

If $\omega_0=2\pi k/N$, reduce the fraction by the greatest common divisor of $k$ and $N$. The resulting denominator is the fundamental period:

$$
N_0=\frac{N}{\gcd(N,k)}.
$$

For example, $e^{j3\pi n}=e^{j\pi n}$. Its fundamental period is $2$, and $3\pi$ should not be treated directly as the fundamental angular frequency.

In continuous time, distinct values of $\omega$ produce distinct signals. In discrete time,

$$
e^{j(\omega_0+2\pi k)n}=e^{j\omega_0n},
\qquad k\in\mathbb Z.
$$

Thus, discrete-time frequency is periodic with period $2\pi$. It is sufficient to consider any interval of length $2\pi$, such as $(-\pi,\pi]$. Discrete samples cannot distinguish frequencies separated by an integer multiple of $2\pi$, which is the basic form of frequency aliasing.

| Property | CT : $e^{j\omega_0t}$ | DT : $e^{j\omega_0n}$ |
| --- | --- | --- |
| Do distinct frequencies always produce distinct signals? | Yes | No. Frequencies separated by $2\pi k$ produce the same signal |
| Is the signal always periodic? | Yes. When $\omega_0=0$, it is constant and has no unique fundamental period | Only when $\omega_0/(2\pi)$ is rational |
| Fundamental period | $2\pi\omega_0$ | The smallest positive integer $N_0$ satisfying $\omega_0N_0=2\pi k$ |

### 1.4 Basic Signals: Unit Impulse & Unit Step Signals

#### 1.4.1 Discrete-Time Unit Impulse and Unit Step Sequences

The unit impulse sequence is defined as

$$
\delta[n]=
\begin{cases}
1,&n=0,\\
0,&n\ne0.
\end{cases}
$$

The unit step sequence is defined as

$$
u[n]=
\begin{cases}
0,&n<0,\\
1,&n\ge0.
\end{cases}
$$

The two sequences are related through first difference and running sum:

$$
\delta[n]=u[n]-u[n-1],
$$

$$
u[n]=\sum_{m=-\infty}^{n}\delta[m]
=\sum_{k=0}^{\infty}\delta[n-k].
$$

The impulse sequence has the sampling propert:

$$
x[n]\delta[n] = x[0]\delta[n]
$$

$$
x[n]\delta[n-k]=x[k]\delta[n-k].
$$

The factor $\delta[n-k]$ is nonzero only at $n=k$, so the product retains only $x[k]$. Consequently, every discrete-time signal can be expanded as a linear combination of shifted impulses:

$$
x[n]=\sum_{k=-\infty}^{\infty}x[k]\delta[n-k].
$$

Here, $\delta[n-k]$ acts as a standard basis vector in sequence space, and $x[k]$ is the coordinate of the signal at index $k$.

#### 1.4.2 Continuous-Time Unit Step Function

The Heaviside unit step function is defined as

$$
u(t)=
\begin{cases}
0,&t<0,\\
1,&t>0.
\end{cases}
$$

The value of $u(0)$ does not affect many continuous-time operations. Depending on the convention, it may be defined as $0$, $1$, or $1/2$. The choice $u(0)=1/2$ is common when symmetry or Fourier transforms are involved.

The shifted step $u(t-t_0)$ jumps from 0 to 1 at $t=t_0$. A piecewise-constant signal with several jumps can be represented as a sum of shifted steps. The coefficient of each term equals the new value minus the old value at that point. For example,

$$
x(t)=2u(t-1)-3u(t-2)+2u(t-4)
$$

has jump sizes $2,-3,2$ at $t=1,2,4$, respectively.

#### 1.4.3 Continuous-Time Unit Impulse

The Dirac impulse $\delta(t)$ is a generalized function rather than an ordinary function with a finite value at every point. It satisfies

$$
\delta(t)=0\quad(t\ne0),
\qquad
\int_{-\infty}^{\infty}\delta(t)dt=1.
$$

It can be interpreted as the limit of a narrow pulse whose width approaches zero and whose amplitude approaches infinity while its area remains one. It models an instantaneous force impulse, a point charge, or a point-mass density.

The unit step and unit impulse are related through differentiation and integration:

$$
\delta(t)=\frac{du(t)}{dt},
\qquad
u(t)=\int_{-\infty}^{t}\delta(\tau)d\tau.
$$

If the step height is $A$, its derivative is an impulse with area $A$:

$$
\frac{d}{dt}\big[A u(t-t_0)\big]=A\delta(t-t_0).
$$

Therefore, every jump in a piecewise-constant signal produces an impulse in its derivative. The impulse weight equals the jump size. For the previous example,

$$
\frac{dx(t)}{dt}
=2\delta(t-1)-3\delta(t-2)+2\delta(t-4).
$$

#### 1.4.4 Sampling Property of the Impulse

The continuous-time impulse satisfies

$$
x(t)\delta(t-t_0)=x(t_0)\delta(t-t_0).
$$

Integration gives the sifting, or sampling, property:

$$
\int_{-\infty}^{\infty}x(t)\delta(t-t_0)dt=x(t_0).
$$

If the integration interval does not contain $t_0$, the result is zero. If the upper limit is the variable $t$, then

$$
\int_{-\infty}^{t}x(\tau)\delta(\tau-t_0)d\tau
=x(t_0)u(t-t_0).
$$

A continuous-time signal can also be written formally as a continuous superposition of impulses:

$$
x(t)=\int_{-\infty}^{\infty}x(\tau)\delta(t-\tau)d\tau.
$$

The discrete-time impulse expansion uses a sum, while the continuous-time expansion uses an integral. These representations lead directly to the convolution sum and convolution integral for linear time invariant (LTI) systems.

### 1.5 Definitions and Representations of Systems

#### 1.5.1 Input-Output Relation

A system maps an input $x$ to an output $y$:

$$
y=\mathcal T\{x\}.
$$

A system can be described by an algebraic equation, a differential equation, a difference equation, a block diagram, a matrix, or an algorithm. These representations may look different, but they describe the same input-output mapping.

For a bank account, let $x[n]$ denote the net deposit on day $n$, let $y[n]$ denote the balance at the end of that day, and let $r$ denote the daily interest rate. Then

$$
y[n]=(1+r)y[n-1]+x[n].
$$

The current output depends on the previous day's balance, so the system must retain a state.

#### 1.5.2 Physical System Modeling

**RC circuit.** For a series resistor-capacitor circuit, the source voltage $V_s(t)$ is the input and the capacitor voltage $V_C(t)$ is the output. From

$$
i(t)=\frac{V_s(t)-V_C(t)}{R},
\qquad
i(t)=C\frac{dV_C(t)}{dt},
$$

we obtain

$$
\frac{dV_C(t)}{dt}+\frac{1}{RC}V_C(t)
=\frac{1}{RC}V_s(t).
$$

**Motion with drag.** Consider a body of mass $m$ under an applied force $f(t)$ and a drag force $\rho v(t)$ proportional to its velocity. Newton's second law gives

$$
\frac{dv(t)}{dt}+\frac{\rho}{m}v(t)=\frac{1}{m}f(t).
$$

Both physical systems have the form

$$
\frac{dy(t)}{dt}+ay(t)=bx(t)
$$

Although their physical mechanisms differ, their mathematical models have the same structure. The same system-analysis methods can therefore be applied to both.

#### 1.5.3 Common Elementary Systems

- Amplifier: $y(t)=c x(t)$.
- Adder: $y(t)=x_1(t)+x_2(t)$.
- Multiplier: $y(t)=x_1(t)x_2(t)$.
- Differentiator: $y(t)=dx(t)/dt$.
- Backward-difference system: $y[n]=x[n]-x[n-1]$.
- Integrator: $y(t)=\int_{-\infty}^{t}x(\tau)d\tau$.
- Accumulator: $y[n]=\sum_{k=-\infty}^{n}x[k]$.

#### 1.5.4 System Interconnections

A complex system can be assembled from interconnected subsystems. The boundary of a subsystem depends on the chosen level of abstraction. The three basic interconnection types are:

- **Series, or cascade:** The output of one system becomes the input of the next. The overall operator is $\mathcal T_2\circ\mathcal T_1$.
- **Parallel:** The same input enters multiple systems, and their outputs are added. The overall output is the sum of the subsystem outputs.
- **Feedback:** The output passes through a feedback system and returns to the input, where it is added to or subtracted from the external input. Feedback can change gain, dynamic behavior, and stability.

### 1.6 Basic System Properties

Let a system $\mathcal T$ transform an input $x$ into an output $y$. The following properties describe whether the system can operate in real time, whether it loses information, whether it can produce an unbounded output, and how readily it can be analyzed.

#### 1.6.1 Memory

A system is **memoryless** if its output at any time depends only on the input value at that same time:

$$
y(t)=F(x(t),t)
$$

or

$$
y[n]=F(x[n],n).
$$

For example, an amplifier $y(t)=cx(t)$, an adder, and a multiplier are memoryless systems.

A system **has memory** if its current output depends on past or future input values, or on past output values. For example,

$$
y[n]=\sum_{k=-\infty}^{n}x[k]
=y[n-1]+x[n]
$$

and

$$
y(t)=\frac{1}{C}\int_{-\infty}^{t}x(\tau)d\tau
$$

both have memory. A differentiator, time reversal $y[n]=x[-n]$, and time scaling $y(t)=x(at)$ also generally have memory because the output at a given time does not depend solely on the input at that same time.

#### 1.6.2 Invertibility

A system is invertible if distinct inputs always produce distinct outputs. Equivalently, an inverse system $\mathcal T^{-1}$ exists such that

$$
\mathcal T^{-1}\{\mathcal T\{x\}\}=x.
$$

For example,

$$
y(t)=2x(t)
$$

has the inverse $x(t)=y(t)/2$. The system

$$
y(t)=x^2(t)
$$

is generally noninvertible because $x(t)$ and $-x(t)$ produce the same output. The zero-output system is also noninvertible. Invertibility means that the system preserves the input information, which is important in channel coding and lossless compression.

#### 1.6.3 Causality

In a causal system, the output at any time $t_0$ can depend only on input values for $t\le t_0$. It cannot depend on future inputs. More precisely, if two inputs are identical for all $t\le t_0$, their corresponding outputs must also be identical for all $t\le t_0$.

The discrete-time definition follows by replacing $t$ with $n$. To test causality, inspect the input indices used by the output expression:

- $y(t)=x(2t-1)$ is noncausal. Although it accesses past values at some times, $2t-1>t$ when $t>1$, so it also accesses future inputs.
- $y(t)=x(t+1)$ explicitly accesses a future value and is therefore noncausal.
- $y[n]=x[-n]$ is noncausal. For example, at $n=-5$, the output depends on $x[5]$.
- $y[n]=\dfrac{x^3[n-1]}{2n+1}$ uses only a past input value and is causal.

A real-time physical system must be causal. When processing a fully recorded signal offline, an algorithm may use samples that are future values relative to the current index, so noncausal processing remains useful. Causality in this temporal sense does not apply directly to spatial variables.

#### 1.6.4 BIBO Stability

A system is **bounded-input, bounded-output (BIBO) stable** if every bounded input produces a bounded output. In other words, if a finite $B_x$ exists such that

$$
|x(t)|\le B_x
$$

then a finite $B_y$ must exist such that

$$
|y(t)|\le B_y.
$$

To prove instability, it is sufficient to find one bounded input that produces an unbounded output.

- $y(t)=t x(t)$ is unstable. The bounded input $x(t)=1$ produces the unbounded output $y(t)=t$.
- $y(t)=e^{x(t)}$ is stable. If $|x(t)|\le B$, then $e^{-B}\le y(t)\le e^B$.
- The accumulator $y[n]=\sum_{k=-\infty}^{n}x[k]$ is unstable. With $x[n]=u[n]$, the output grows with $n$.

#### 1.6.5 Linearity

A system is linear if and only if it satisfies additivity and homogeneity. If

$$
\mathcal T\{x_1\}=y_1,
\qquad
\mathcal T\{x_2\}=y_2,
$$

then, for arbitrary scalars $a,b$, it must satisfy

$$
\mathcal T\{ax_1+bx_2\}=ay_1+by_2.
$$

This is the superposition property. A linear system must map the zero input to the zero output, but this zero-input test is necessary rather than sufficient for linearity.

Linearity cannot be established by testing only a few specific signals. Compare

$$
\mathcal T\{ax_1+bx_2\}
$$

with

$$
a\mathcal T\{x_1\}+b\mathcal T\{x_2\}.
$$

For example, $y[n]=x^2[n]$ is nonlinear because squaring produces cross terms. The system $y(t)=x(2t)$ is linear because scaling the independent variable does not violate superposition. A constant-bias system $y(t)=x(t)+c$ is also nonlinear when $c\ne0$.

Many physical systems are nonlinear, but they can often be linearized for small perturbations around an operating point. Linear models remain important because they are analytically tractable and can describe local behavior accurately.

#### 1.6.6 Time Invariance

A system is time invariant if a shift in the input produces the same shift in the output. For a continuous-time system, if

$$
y(t)=\mathcal T\{x(t)\},
$$

then, for every $t_0$,

$$
\mathcal T\{x(t-t_0)\}=y(t-t_0).
$$

The discrete-time definition is

$$
\mathcal T\{x[n-n_0]\}=y[n-n_0].
$$

The standard test compares two paths:

1. Shift the input first and then pass it through the system to obtain $y_1$.
2. Pass the original input through the system first and then shift the output to obtain $y_2$.

The system is time invariant only if $y_1=y_2$ for every input and every shift.

- $y[n]=n x[n]$ is time varying because the explicit factor $n$ does not shift with the input.
- $y(t)=x^2(t+1)$ is time invariant. Although it contains a fixed advance, the system rule does not depend on absolute time.
- $y(t)=x(t)\cos(\omega t)$ is time varying because the carrier $\cos(\omega t)$ is fixed to the absolute time axis.

A direct consequence of time invariance is that if the input has period $T$, the output also satisfies $y(t+T)=y(t)$. The value $T$ is a period of the output, although it need not be the fundamental period.

#### 1.6.7 Linear Time-Invariant Systems and Impulse Response

A system that is both linear and time invariant is called a **linear time-invariant (LTI) system**. In a discrete-index setting, the term linear shift-invariant (LSI) system is also common.

LTI systems are important because signals can be decomposed into linear combinations of basic signals, and the response to a shifted input is the correspondingly shifted response. For a discrete-time LTI system $\mathcal T$, define its impulse response as the output produced by the unit impulse:

$$
h[n]=\mathcal T\{\delta[n]\}.
$$

Every input can be written as

$$
x[n]=\sum_{k=-\infty}^{\infty}x[k]\delta[n-k].
$$

By linearity, the response to this weighted sum equals the weighted sum of the individual responses:

$$
y[n]
=\sum_{k=-\infty}^{\infty}x[k]\mathcal T\{\delta[n-k]\}.
$$

By time invariance, the response to the shifted impulse $\delta[n-k]$ is $h[n-k]$. Therefore,

$$
y[n]=\sum_{k=-\infty}^{\infty}x[k]h[n-k]
=(x*h)[n].
$$

This is the discrete-time convolution sum. It follows directly from impulse decomposition, linearity, and time invariance. From a matrix viewpoint, a discrete-time LTI system corresponds to a doubly infinite Toeplitz matrix whose entries are constant along each diagonal. Multiplying this matrix by the input vector is equivalent to convolution.

Typical examples:

- The unit delay $y[n]=x[n-1]$ is linear, time invariant, and BIBO stable.
- The unit advance $y[n]=x[n+1]$ is also linear, time invariant, and BIBO stable, but it is noncausal.
- The accumulator is linear and time invariant, but it is not BIBO stable.

Later chapters develop convolution, impulse responses, and the causality and stability conditions for LTI systems in greater detail.
