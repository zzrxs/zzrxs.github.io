---
title: Signals and Systems Chapter-2
date: 2026-09-29 18:57:45
updated: 2026-10-13
math: true
categories:
  - Signals and Systems
tags:
  - Signal Processing
  - LTI Systems
  - Discrete-Time Convolution
  - Continuous-Time Convolution
  - Differential Equations
description: Signals and Systems Course Notes (Chapter-2)
index_img: /img/LTIConvolution.png
---

## 2. LINEAR TIME-INVARIANT SYSTEMS

### 2.0 Introduction

The analysis of a linear time-invariant system begins by representing an input as a linear combination of basic signals. Suppose

$$
x[n]=\sum_k a_k\phi_k[n]
$$

and the response of a linear system $\mathcal S$ to each basic signal is known:

$$
\mathcal S\{\phi_k[n]\}=\psi_k[n].
$$

Linearity then gives

$$
y[n]=\mathcal S\{x[n]\}
=\sum_k a_k\psi_k[n].
$$

For a discrete-time LTI system, shifted unit impulses form the most useful set of basic signals. Every sequence can be decomposed into shifted impulses, and time invariance determines the response to every shift from a single function, the unit impulse response. This leads directly to the convolution sum.

Convolution also appears in convolutional neural networks. In most deep-learning libraries, however, the operation called convolution is implemented as cross-correlation because the kernel is not reversed. The distinction is explained in Section 2.1.11.

### 2.1 DT LTI Systems and Convolution Sum

#### 2.1.1 Representation of DT Signals by Impulses

The discrete-time unit impulse is

$$
\delta[n]=
\begin{cases}
1,&n=0,\\
0,&n\ne0.
\end{cases}
$$

Its sampling property is

$$
x[n]\delta[n-n_0]=x[n_0]\delta[n-n_0].
$$

Therefore, every discrete-time signal can be expanded as

$$
\boxed{x[n]=\sum_{k=-\infty}^{\infty}x[k]\delta[n-k]}.
$$

Each $\delta[n-k]$ is nonzero only at $n=k$, and its coefficient is the sample value $x[k]$. Thus, the shifted impulses act as basis sequences and the samples $x[k]$ act as coordinates.

For example,

$$
\begin{aligned}
x[n]={}&\cdots+x[-2]\delta[n+2]+x[-1]\delta[n+1]
+x[0]\delta[n]\\
&+x[1]\delta[n-1]+x[2]\delta[n-2]+\cdots.
\end{aligned}
$$

#### 2.1.2 Impulse Response and the Convolution Sum

Let $\mathcal S$ be a discrete-time LTI system. Its unit impulse response is

$$
h[n]=\mathcal S\{\delta[n]\}.
$$

Time invariance implies

$$
\mathcal S\{\delta[n-k]\}=h[n-k].
$$

Applying the system to the impulse expansion of $x[n]$ and using linearity gives

$$
\begin{aligned}
y[n]
&=\mathcal S\left\{\sum_{k=-\infty}^{\infty}x[k]\delta[n-k]\right\}\\
&=\sum_{k=-\infty}^{\infty}x[k]\mathcal S\{\delta[n-k]\}\\
&=\sum_{k=-\infty}^{\infty}x[k]h[n-k].
\end{aligned}
$$

The convolution sum is therefore defined by

$$
\boxed{
y[n]=(x*h)[n]
=\sum_{k=-\infty}^{\infty}x[k]h[n-k]
}.
$$

An LTI system is fully characterized by its impulse response. Once $h[n]$ is known, the output for any admissible input follows from convolution.

#### 2.1.3 Impulse Responses of Simple LTI Systems

| System | Input-output relation | Impulse response |
| --- | --- | --- |
| Identity | $y[n]=x[n]$ | $h[n]=\delta[n]$ |
| Scalar multiplication | $y[n]=Kx[n]$ | $h[n]=K\delta[n]$ |
| Time shift | $y[n]=x[n-n_0]$ | $h[n]=\delta[n-n_0]$ |
| Accumulator | $y[n]=\displaystyle\sum_{k=-\infty}^{n}x[k]$ | $h[n]=u[n]$ |
| First-order difference | $y[n]=x[n]-x[n-1]$ | $h[n]=\delta[n]-\delta[n-1]$ |

These examples provide a useful shortcut: the impulse response can often be found by substituting $x[n]=\delta[n]$ directly into the system equation.

#### 2.1.4 Existence and Absolute Convergence

The convolution of two arbitrary sequences does not always exist. For each fixed $n$, the series

$$
\sum_{k=-\infty}^{\infty}x_1[k]x_2[n-k]
$$

must converge. Absolute convergence,

$$
\sum_{k=-\infty}^{\infty}
\left|x_1[k]x_2[n-k]\right|<\infty,
$$

is a convenient sufficient condition.

For example, let

$$
x_1[n]=u[n],\qquad x_2[n]=u[-n].
$$

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

$$
\operatorname{supp}(x)=\{n:x[n]\ne0\}.
$$

If $x_1[n]$ is supported on $[a,b]$ and $x_2[n]$ is supported on $[c,d]$, then

$$
\operatorname{supp}(x_1*x_2)\subseteq[a+c,b+d].
$$

If the endpoint samples are nonzero, the output support is exactly $[a+c,b+d]$. Hence, sequences of lengths $L_1$ and $L_2$ normally produce a sequence of length $L_1+L_2-1$.

#### 2.1.5 Graphical Calculation of Convolution

For

$$
y[n]=\sum_{k=-\infty}^{\infty}x_1[k]x_2[n-k],
$$

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

$$
x_1[k]\ne0\quad\text{for }a\le k\le b
$$

and

$$
x_2[m]\ne0\quad\text{for }c\le m\le d,
$$

then $x_2[n-k]$ is nonzero when

$$
n-d\le k\le n-c.
$$

Thus,

$$
y[n]=\sum_{k=\max(a,n-d)}^{\min(b,n-c)}
x_1[k]x_2[n-k],
$$

provided that the lower limit does not exceed the upper limit.

#### 2.1.6 Example: Superposition of Shifted Impulse Responses

Suppose

$$
h[n]=\delta[n]+\delta[n-1]+\delta[n-2]
$$

and

$$
x[n]=0.5\delta[n]+2\delta[n-1].
$$

The input contains two shifted impulses, so the output is the corresponding weighted sum of shifted impulse responses:

$$
\begin{aligned}
y[n]
&=0.5h[n]+2h[n-1]\\
&=0.5\delta[n]+2.5\delta[n-1]
+2.5\delta[n-2]+2\delta[n-3].
\end{aligned}
$$

This example illustrates the physical meaning of convolution: every input sample generates a shifted copy of $h[n]$, and the output adds all copies after weighting them by the input samples.

#### 2.1.7 Example: Rectangular Sequence Convolved with a Truncated Exponential

Consider

$$
x[n]=
\begin{cases}
1,&0\le n\le4,\\
0,&\text{otherwise},
\end{cases}
$$

and

$$
h[n]=
\begin{cases}
\alpha^n,&0\le n\le6,\\
0,&\text{otherwise},
\end{cases}
\qquad \alpha>1.
$$

The support of the output is $0\le n\le10$. Using $j=n-k$ gives

$$
y[n]=\sum_{j=\max(0,n-4)}^{\min(6,n)}\alpha^j.
$$

The amount of overlap changes at $n=0,4,6,$ and $10$, which produces five cases:

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

The graphical and analytic methods give the same boundaries. The graphical method makes the overlap visible, while the analytic method converts the overlap into inequalities on the summation index.

#### 2.1.8 Example: Convolution by Impulse Algebra

Let

$$
x_1[n]=u[n+2]-u[n-1]
$$

and

$$
x_2[n]=2^n\bigl(\delta[n]+\delta[n-1]+\delta[n-2]\bigr).
$$

First rewrite the sequences as weighted impulses:

$$
x_1[n]=\delta[n+2]+\delta[n+1]+\delta[n],
$$

$$
x_2[n]=\delta[n]+2\delta[n-1]+4\delta[n-2].
$$

Using

$$
\delta[n-n_1]*\delta[n-n_2]
=\delta[n-n_1-n_2],
$$

and collecting impulses at the same index gives

$$
\boxed{
x_1[n]*x_2[n]
=\delta[n+2]+3\delta[n+1]+7\delta[n]
+6\delta[n-1]+4\delta[n-2]
}.
$$

This multiplication-table approach is convenient for short finite sequences but becomes inefficient for long or infinite sequences.

#### 2.1.9 Algebraic Properties of the Convolution Sum

##### Commutative Property

$$
x_1[n]*x_2[n]=x_2[n]*x_1[n].
$$

Starting from the definition and substituting $m=n-k$,

$$
\begin{aligned}
(x_1*x_2)[n]
&=\sum_{k=-\infty}^{\infty}x_1[k]x_2[n-k]\\
&=\sum_{m=-\infty}^{\infty}x_2[m]x_1[n-m]\\
&=(x_2*x_1)[n].
\end{aligned}
$$

Therefore,

$$
y[n]=x[n]*h[n]=h[n]*x[n].
$$

The input and impulse response play symmetric mathematical roles, even though their physical interpretations differ.

##### Distributive Property

$$
x_1[n]*\bigl(x_2[n]+x_3[n]\bigr)
=x_1[n]*x_2[n]+x_1[n]*x_3[n].
$$

For LTI systems, a parallel connection with impulse responses $h_1[n]$ and $h_2[n]$ has the equivalent impulse response

$$
h[n]=h_1[n]+h_2[n].
$$

##### Associative Property

Under conditions that permit the sums to be rearranged,

$$
\bigl(x_1[n]*x_2[n]\bigr)*x_3[n]
=x_1[n]*\bigl(x_2[n]*x_3[n]\bigr).
$$

Consequently, a cascade of LTI systems with impulse responses $h_1[n]$ and $h_2[n]$ has

$$
h[n]=h_1[n]*h_2[n].
$$

Commutativity also shows that the order of two well-defined LTI stages does not change the overall response.

Associativity requires care when infinite sums are not absolutely convergent. Consider

$$
x_1[n]=1,qquad
x_2[n]=u[n],qquad
x_3[n]=\delta[n]-\delta[n-1].
$$

Since $x_2*x_3=\delta$, one grouping gives

$$
x_1*(x_2*x_3)=1.
$$

However, $x_1*x_2$ is undefined. In another grouping, $x_1*x_3=0$, so

$$
(x_1*x_3)*x_2=0.
$$

This does not contradict associativity because the required convergence conditions fail. Useful sufficient conditions include:

- At least two of the three sequences have finite support.
- All three sequences are right-sided, or all three are left-sided.
- Two sequences belong to $\ell^1$ and the remaining sequence belongs to $\ell^p$, where $1\le p\le\infty$.

In the last case,

$$
\|x_1*x_2*x_3\|_p
\le\|x_1\|_1\|x_2\|_1\|x_3\|_p.
$$

##### Identity Element

The unit impulse is the identity element for convolution:

$$
x[n]*\delta[n]=\delta[n]*x[n]=x[n].
$$

More generally,

$$
x[n]*\delta[n-n_0]=x[n-n_0].
$$

##### Bilinearity

Convolution is linear in each argument. In particular,

$$
x_1[n]*\bigl(Kx_2[n]\bigr)
=K\bigl(x_1[n]*x_2[n]\bigr).
$$

For linear combinations,

$$
\left(\sum_i a_i x_{1,i}[n]\right)
*
\left(\sum_j b_j x_{2,j}[n]\right)
=\sum_i\sum_j a_i b_j
\bigl(x_{1,i}[n]*x_{2,j}[n]\bigr).
$$

#### 2.1.10 Shift, Difference, and Accumulation Properties

##### Time Shift Property

If

$$
f[n]=x_1[n]*x_2[n],
$$

then

$$
x_1[n-a]*x_2[n-b]=f[n-a-b].
$$

This follows from

$$
x[n-a]=x[n]*\delta[n-a]
$$

and

$$
\delta[n-a]*\delta[n-b]=\delta[n-a-b].
$$

Two cascaded delays therefore add:

$$
x[n]*\delta[n-n_1]*\delta[n-n_2]
=x[n-(n_1+n_2)].
$$

For an LTI system with $x*h=y$,

$$
x[n-n_0]*h[n]
=x[n]*h[n-n_0]
=y[n-n_0].
$$

This equation is also a direct expression of time invariance.

##### Difference Property

Define the first-difference operator by

$$
\Delta x[n]=x[n]-x[n-1].
$$

Since

$$
\Delta\delta[n]=\delta[n]-\delta[n-1],
$$

the difference system has impulse response $\Delta\delta[n]$. Associativity and commutativity give

$$
\boxed{
\Delta(x*h)
=(\Delta x)*h
=x*(\Delta h)
}.
$$

Thus, the first difference can be applied before or after an LTI system, provided that all convolutions are well-defined.

##### Accumulation Property

The accumulator has impulse response $u[n]$ because

$$
x[n]*u[n]=\sum_{k=-\infty}^{n}x[k].
$$

Therefore,

$$
\boxed{
\sum_{k=-\infty}^{n}(x*h)[k]
=x[n]*\left(\sum_{k=-\infty}^{n}h[k]\right)
=\left(\sum_{k=-\infty}^{n}x[k]\right)*h[n]
}.
$$

Accumulation can be moved from the output to either input of a convolution, subject to convergence.

#### 2.1.11 Frequently Used Convolution Results

The following identities are useful in exercises.

##### Two Unit Steps

$$
u[n]*u[n]
=\sum_{k=0}^{n}1
=(n+1)u[n].
$$

##### A Right-Sided Exponential and a Unit Step

For $a\ne1$,

$$
\begin{aligned}
a^n u[n]*u[n]
&=\sum_{k=0}^{n}a^k\\
&=\frac{1-a^{n+1}}{1-a}u[n].
\end{aligned}
$$

When $a=1$, the result reduces to $(n+1)u[n]$.

##### Two Identical Right-Sided Exponentials

$$
\begin{aligned}
a^n u[n]*a^n u[n]
&=\sum_{k=0}^{n}a^k a^{n-k}\\
&=(n+1)a^n u[n].
\end{aligned}
$$

##### Two Different Right-Sided Exponentials

For $a\ne b$,

$$
\begin{aligned}
a^n u[n]*b^n u[n]
&=\sum_{k=0}^{n}a^k b^{n-k}\\
&=\frac{b^{n+1}-a^{n+1}}{b-a}u[n].
\end{aligned}
$$

As $b\to a$, this expression approaches $(n+1)a^n u[n]$.

#### 2.1.12 Convolution and Cross-Correlation in CNNs

Let a one-dimensional kernel be

$$
W=[w_{-1},w_0,w_1].
$$

A common neural-network layer computes

$$
y[n_0]
=w_{-1}x[n_0-1]+w_0x[n_0]+w_1x[n_0+1]
=\sum_{k=-1}^{1}w_kx[n_0+k].
$$

Because the kernel index appears as $n_0+k$, this operation is cross-correlation rather than convolution with the kernel values in their displayed order. It can still be written as a conventional convolution by defining

$$
h[n]
=w_{-1}\delta[n-1]+w_0\delta[n]+w_1\delta[n+1]
=\sum_{k=-1}^{1}w_k\delta[n+k].
$$

Then

$$
y[n]=(x*h)[n].
$$

The reversal is usually immaterial during neural-network training because the kernel coefficients are learned. In signal processing, however, convolution and cross-correlation should be distinguished because a fixed asymmetric kernel produces different outputs under the two definitions.

#### 2.1.13 Key Points

- Shifted impulses provide a complete representation of a discrete-time signal.
- The impulse response completely characterizes a discrete-time LTI system.
- The output of an LTI system is $y[n]=x[n]*h[n]$.
- Graphical convolution consists of reversal, shifting, multiplication, and summation.
- Support intervals determine the possible output interval and the correct summation limits.
- Convolution is commutative, distributive, bilinear, and conditionally associative.
- A shifted impulse implements a delay, $\Delta\delta[n]$ implements first difference, and $u[n]$ implements accumulation.
- Infinite sums require convergence checks before algebraic rearrangements are used.

### 2.2 CT LTI Systems and Convolution Integral

#### 2.2.1 Representation of CT Signals by Impulses

The continuous-time impulse representation can be motivated by a rectangular approximation. Define

$$
\delta_\Delta(t)=
\begin{cases}
\dfrac{1}{\Delta},&0\le t\le\Delta,\\
0,&\text{otherwise}.
\end{cases}
$$

The function has unit area and approaches a Dirac impulse as $\Delta\to0$. A continuous-time signal can be approximated by shifted pulses:

$$
x(t)\approx\sum_{k=-\infty}^{\infty}
x(k\Delta)\delta_\Delta(t-k\Delta)\Delta.
$$

Taking the limit converts the Riemann sum into an integral:

$$
\boxed{
x(t)=\int_{-\infty}^{\infty}x(\tau)\delta(t-\tau)d\tau
}.
$$

The shifted impulses $\delta(t-\tau)$ act as basic signals, and $x(\tau)d\tau$ supplies their infinitesimal weights.

#### 2.2.2 Impulse Response and the Convolution Integral

Let $\mathcal S$ be a continuous-time LTI system with impulse response

$$
h(t)=\mathcal S\{\delta(t)\}.
$$

Time invariance gives

$$
\mathcal S\{\delta(t-\tau)\}=h(t-\tau).
$$

Applying linearity to the impulse representation produces

$$
\begin{aligned}
y(t)
&=\mathcal S\left\{\int_{-\infty}^{\infty}
x(\tau)\delta(t-\tau)d\tau\right\}\\
&=\int_{-\infty}^{\infty}x(\tau)h(t-\tau)d\tau.
\end{aligned}
$$

Therefore,

$$
\boxed{
y(t)=(x*h)(t)
=\int_{-\infty}^{\infty}x(\tau)h(t-\tau)d\tau
}.
$$

The impulse response completely characterizes a continuous-time LTI system under the usual conditions that make the integral and interchange of limits well-defined.

#### 2.2.3 Impulse Responses of Simple CT LTI Systems

| System | Input-output relation | Impulse response |
| --- | --- | --- |
| Identity | $y(t)=x(t)$ | $h(t)=\delta(t)$ |
| Scalar multiplication | $y(t)=Kx(t)$ | $h(t)=K\delta(t)$ |
| Time shift | $y(t)=x(t-t_0)$ | $h(t)=\delta(t-t_0)$ |
| Integrator | $y(t)=\displaystyle\int_{-\infty}^{t}x(\tau)d\tau$ | $h(t)=u(t)$ |
| Differentiator | $y(t)=\dfrac{dx(t)}{dt}$ | $h(t)=\delta'(t)$ |

The integrator and differentiator form an inverse pair because

$$
u(t)*\delta'(t)=\delta(t).
$$

#### 2.2.4 Existence and Absolute Convergence

The convolution integral does not necessarily exist for arbitrary signals. For each fixed $t$, a convenient sufficient condition is

$$
\int_{-\infty}^{\infty}
\left|x_1(\tau)x_2(t-\tau)\right|d\tau<\infty.
$$

For example,

$$
x_1(t)=u(t),\qquad x_2(t)=u(-t)
$$

give an infinite overlap interval, so the convolution integral diverges for every $t$.

Common sufficient conditions include:

- At least one signal has compact support.
- Both signals are right-sided.
- Both signals are left-sided.
- One signal belongs to $L^1$ and the other belongs to $L^p$, where $1\le p\le\infty$.

If $x_1(t)$ is supported on $[a,b]$ and $x_2(t)$ is supported on $[c,d]$, then

$$
\operatorname{supp}(x_1*x_2)\subseteq[a+c,b+d].
$$

#### 2.2.5 Graphical Calculation of CT Convolution

For

$$
y(t)=\int_{-\infty}^{\infty}x_1(\tau)x_2(t-\tau)d\tau,
$$

treat $t$ as fixed and $\tau$ as the integration variable.

1. Plot $x_1(\tau)$ and $x_2(\tau)$.
2. Reverse the second signal to obtain $x_2(-\tau)$.
3. Shift it by $t$ to obtain $x_2(t-\tau)$.
4. Multiply the overlapping portions.
5. Integrate the product over $\tau$.
6. Repeat as $t$ moves through each distinct overlap region.

If $x_1(\tau)$ is supported on $[a,b]$ and $x_2(t)$ is supported on $[c,d]$, then

$$
x_2(t-\tau)\ne0
\quad\Longleftrightarrow\quad
t-d\le\tau\le t-c.
$$

The effective limits are therefore

$$
\max(a,t-d)\le\tau\le\min(b,t-c).
$$

#### 2.2.6 Example: Rectangular Pulse and Truncated Ramp

Let

$$
x(t)=
\begin{cases}
1,&0\le t\le T,\\
0,&\text{otherwise},
\end{cases}
$$

and

$$
h(t)=
\begin{cases}
t,&0\le t\le2T,\\
0,&\text{otherwise}.
\end{cases}
$$

The integrand equals $t-\tau$ wherever $[0,T]$ overlaps $[t-2T,t]$. The output support is $[0,3T]$. Evaluating the integral in each overlap region gives

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

The formulas agree at the boundaries. The output rises quadratically, then linearly, and finally decreases quadratically to zero as the overlap disappears.

#### 2.2.7 Convolution of Rectangular Pulses

Define

$$
p_T(t)=
\begin{cases}
1,&|t|\le T,\\
0,&\text{otherwise}.
\end{cases}
$$

The convolution of two identical pulses equals the overlap length:

$$
(p_T*p_T)(t)=
\begin{cases}
2T-|t|,&|t|\le2T,\\
0,&|t|>2T.
\end{cases}
$$

For widths $2T_1$ and $2T_2$, assume $T_2\ge T_1$. The result is a trapezoid:

$$
(p_{T_1}*p_{T_2})(t)=
\begin{cases}
0,&|t|>T_1+T_2,\\
T_1+T_2-|t|,&T_2-T_1<|t|\le T_1+T_2,\\
2T_1,&|t|\le T_2-T_1.
\end{cases}
$$

When $T_1=T_2$, the flat region disappears and the trapezoid becomes a triangle.

#### 2.2.8 Algebraic and Calculus Properties

The commutative, distributive, associative, identity, bilinear, and time-shift properties have the same forms as in discrete time:

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

and, if $f=x_1*x_2$,

$$
x_1(t-a)*x_2(t-b)=f(t-a-b).
$$

Associativity requires convergence conditions that justify changing the order of integration. For example, at least two compactly supported signals, three signals with the same sidedness, or two $L^1$ signals and one $L^p$ signal provide useful sufficient conditions.

Differentiation can be applied to either convolution factor:

$$
\boxed{
\frac{d}{dt}(x*h)
=\frac{dx}{dt}*h
=x*\frac{dh}{dt}
}.
$$

Likewise, integration can be moved to either factor:

$$
\boxed{
\int_{-\infty}^{t}(x*h)(\lambda)d\lambda
=\left(\int_{-\infty}^{t}x(\tau)d\tau\right)*h(t)
=x(t)*\left(\int_{-\infty}^{t}h(\tau)d\tau\right)
}.
$$

#### 2.2.9 Frequently Used CT Convolution Results

For $a>0$, $\alpha>0$, $\beta>0$, and $\alpha\ne\beta$,

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

and

$$
e^{-\alpha t}u(t)*e^{-\beta t}u(t)
=\frac{e^{-\alpha t}-e^{-\beta t}}{\beta-\alpha}u(t).
$$

#### 2.2.10 Additional Impulse Properties

The continuous-time and discrete-time impulses are even:

$$
\delta(-t)=\delta(t),\qquad \delta[-n]=\delta[n].
$$

Their step relations are

$$
u(t)=\int_{-\infty}^{t}\delta(\tau)d\tau,
\qquad
\frac{du(t)}{dt}=\delta(t),
$$

and

$$
u[n]=\sum_{k=-\infty}^{n}\delta[k],
\qquad
u[n]-u[n-1]=\delta[n].
$$

The multiplication and sifting properties are

$$
x(t)\delta(t-t_0)=x(t_0)\delta(t-t_0),
$$

$$
\int_{-\infty}^{\infty}x(\tau)\delta(t-\tau)d\tau=x(t).
$$

For $a\ne0$, the CT scaling property is

$$
\boxed{\delta(at)=\frac{1}{|a|}\delta(t)}.
$$

For a nonzero integer $M$,

$$
\delta[Mn]=\delta[n]
$$

because both sequences are nonzero only at $n=0$.

### 2.3 Properties of LTI Systems

#### 2.3.1 Memory

An LTI system is memoryless only when its impulse response is concentrated at the origin:

$$
\boxed{
h[n]=K\delta[n]
}
$$

or

$$
\boxed{
h(t)=K\delta(t)
}.
$$

The corresponding input-output relation is scalar multiplication:

$$
y[n]=Kx[n]
\qquad\text{or}\qquad
y(t)=Kx(t).
$$

Every other LTI impulse response uses input values away from the current time and therefore introduces memory.

#### 2.3.2 Invertibility

If an LTI system with impulse response $h$ has an LTI inverse with impulse response $h^{-1}$, their cascade must equal the identity system:

$$
h[n]*h^{-1}[n]=\delta[n]
$$

or

$$
h(t)*h^{-1}(t)=\delta(t).
$$

This condition must be used together with the convergence and associativity conditions needed for the cascade.

The discrete-time accumulator and first-order difference system form an inverse pair:

$$
h[n]=u[n],
\qquad
h^{-1}[n]=\delta[n]-\delta[n-1].
$$

Similarly, the CT integrator and differentiator have

$$
h(t)=u(t),
\qquad
h^{-1}(t)=\delta'(t).
$$

#### 2.3.3 Causality

A discrete-time LTI system is causal if and only if

$$
\boxed{h[n]=0\quad\text{for all }n<0}.
$$

For a causal system, the convolution sum becomes

$$
y[n]=\sum_{k=-\infty}^{n}x[k]h[n-k].
$$

A continuous-time LTI system is causal if and only if

$$
\boxed{h(t)=0\quad\text{for all }t<0}.
$$

Its convolution integral can then be written as

$$
y(t)=\int_{-\infty}^{t}x(\tau)h(t-\tau)d\tau.
$$

These formulas show directly that the output at the current time uses only present and past input values.

#### 2.3.4 BIBO Stability

A discrete-time LTI system is BIBO stable if and only if its impulse response is absolutely summable:

$$
\boxed{
\sum_{k=-\infty}^{\infty}|h[k]|<\infty
}.
$$

If $|x[n]|\le B$, then

$$
\begin{aligned}
|y[n]|
&\le\sum_{k=-\infty}^{\infty}|x[k]||h[n-k]|\\
&\le B\sum_{k=-\infty}^{\infty}|h[k]|.
\end{aligned}
$$

The CT condition is absolute integrability:

$$
\boxed{
\int_{-\infty}^{\infty}|h(\tau)|d\tau<\infty
}.
$$

For $|x(t)|\le B$,

$$
|y(t)|
\le B\int_{-\infty}^{\infty}|h(\tau)|d\tau.
$$

The bound is independent of time, so every bounded input produces a bounded output.

#### 2.3.5 Unit Step Response

The unit step response of a discrete-time LTI system is

$$
s[n]=u[n]*h[n]
=\sum_{k=-\infty}^{n}h[k].
$$

The impulse response follows by first difference:

$$
\boxed{h[n]=s[n]-s[n-1]}.
$$

For a continuous-time LTI system,

$$
s(t)=u(t)*h(t)
=\int_{-\infty}^{t}h(\tau)d\tau,
$$

so

$$
\boxed{h(t)=\frac{ds(t)}{dt}}.
$$

The step response and impulse response therefore contain the same system information, related by accumulation and differentiation.

### 2.4 Causal LTI Systems Described by Differential Equations

#### 2.4.1 Linear Constant-Coefficient Differential Equations

A continuous-time system can be described implicitly by an $N$th-order linear constant-coefficient differential equation (LCCDE):

$$
\boxed{
\sum_{k=0}^{N}a_k\frac{d^k y(t)}{dt^k}
=\sum_{k=0}^{M}b_k\frac{d^k x(t)}{dt^k}
}.
$$

The equation alone does not specify a unique output. An $N$th-order equation normally requires $N$ auxiliary conditions, such as

$$
y(0^+),\ y'(0^+),\ldots,y^{(N-1)}(0^+).
$$

With constant coefficients and initial rest, the equation defines a causal LTI system for right-sided inputs. Nonzero initial conditions must be treated as an additional source of response.

#### 2.4.2 RLC Circuit Example

For a parallel RLC circuit with voltage $v(t)$ and source current $i_s(t)$,

$$
i_R(t)=\frac{1}{R}v(t),
$$

$$
i_L(t)=\frac{1}{L}\int_{-\infty}^{t}v(\tau)d\tau,
$$

and

$$
i_C(t)=C\frac{dv(t)}{dt}.
$$

Kirchhoff's current law gives

$$
i_R(t)+i_L(t)+i_C(t)=i_s(t).
$$

Differentiating produces the second-order LCCDE

$$
\boxed{
C\frac{d^2v(t)}{dt^2}
+\frac{1}{R}\frac{dv(t)}{dt}
+\frac{1}{L}v(t)
=\frac{di_s(t)}{dt}
}.
$$

The order reflects the two independent energy-storage elements, the inductor and capacitor.

#### 2.4.3 First-Order Equation and Initial Condition

Consider

$$
y'(t)+2y(t)=x(t),
$$

with

$$
x(t)=Ke^{3t}u(t),
\qquad y(0)=y_0.
$$

For $t>0$, the homogeneous equation has characteristic root $\lambda=-2$:

$$
y_h(t)=Ae^{-2t}.
$$

A particular solution of the form $y_p(t)=Be^{3t}$ gives

$$
5Be^{3t}=Ke^{3t},
\qquad B=\frac{K}{5}.
$$

Using the initial condition,

$$
A=y_0-\frac{K}{5}.
$$

Hence,

$$
\boxed{
y(t)=\left(y_0-\frac{K}{5}\right)e^{-2t}
+\frac{K}{5}e^{3t},\qquad t>0
}.
$$

The same result can be separated by source:

$$
y(t)=
\underbrace{y_0e^{-2t}}_{\text{zero-input response}}
+\underbrace{\frac{K}{5}\left(e^{3t}-e^{-2t}\right)}_{\text{zero-state response}}.
$$

#### 2.4.4 Homogeneous Solution

For

$$
\sum_{k=0}^{N}a_k y^{(k)}(t)=f_x(t),
$$

the homogeneous solution satisfies

$$
\sum_{k=0}^{N}a_k y_h^{(k)}(t)=0.
$$

Substitution of $y_h(t)=e^{\lambda t}$ produces the characteristic equation

$$
\boxed{
\sum_{k=0}^{N}a_k\lambda^k=0
}.
$$

If the $N$ roots $\lambda_1,\ldots,\lambda_N$ are distinct, then

$$
y_h(t)=\sum_{i=1}^{N}A_i e^{\lambda_i t}.
$$

If the distinct roots $\lambda_i$ have multiplicities $m_i$, with $\sum_i m_i=N$, then

$$
\boxed{
y_h(t)=\sum_{i=1}^{r}\sum_{k=1}^{m_i}
A_{ik}t^{k-1}e^{\lambda_i t}
}.
$$

The roots determine the natural modes. Auxiliary conditions determine their coefficients.

#### 2.4.5 Particular Solution and Resonance

The method of undetermined coefficients selects a trial solution with the same basic form as the forcing function $f_x(t)$. Common choices are:

| Forcing term | Trial particular solution |
| --- | --- |
| Polynomial of degree $p$, with $0$ not a characteristic root | $\displaystyle\sum_{k=0}^{p}B_k t^k$ |
| Polynomial of degree $p$, with $0$ a root of multiplicity $m$ | $\displaystyle t^m\sum_{k=0}^{p}B_k t^k$ |
| $e^{at}$, with $a$ not a characteristic root | $Be^{at}$ |
| $e^{at}$, with $a$ a root of multiplicity $m$ | $Bt^m e^{at}$ |

Sinusoids follow from their complex-exponential forms:

$$
\cos(\omega t)=\frac{e^{j\omega t}+e^{-j\omega t}}{2},
$$

$$
\sin(\omega t)=\frac{e^{j\omega t}-e^{-j\omega t}}{2j}.
$$

When the forcing function contains a natural mode, the ordinary trial duplicates part of $y_h(t)$. Multiplication by $t^m$ removes this duplication. This case is often described as resonance in the algebraic solution procedure.

#### 2.4.6 Solution Procedure

The complete solution is

$$
y(t)=y_h(t)+y_p(t).
$$

A reliable procedure is:

1. Form the characteristic equation and determine $y_h(t)$.
2. Choose the correct trial form for $y_p(t)$, including any required factor $t^m$.
3. Substitute $y_p(t)$ into the differential equation to determine its coefficients.
4. Apply all auxiliary conditions to the complete solution.

For example,

$$
y'(t)+2y(t)=e^{-t}u(t),
\qquad y(0^+)=2
$$

has

$$
y_h(t)=Ae^{-2t},
\qquad y_p(t)=Be^{-t}.
$$

Substitution gives $B=1$, and the initial condition gives $A=1$. Thus,

$$
\boxed{y(t)=e^{-2t}+e^{-t},\qquad t>0}.
$$

#### 2.4.7 Example with a Repeated Forcing Mode

Consider

$$
y''(t)+3y'(t)+2y(t)=x'(t)+2x(t),
$$

where

$$
x(t)=e^{-t}u(t),
\qquad y(0^+)=0,
\qquad y'(0^+)=3.
$$

For $t>0$, the right-hand side equals $e^{-t}$. The characteristic roots are $-1$ and $-2$:

$$
y_h(t)=Ae^{-t}+Be^{-2t}.
$$

Because $e^{-t}$ is already a natural mode, use

$$
y_p(t)=Ct e^{-t}.
$$

Substitution gives $C=1$. Applying the initial conditions gives $A=2$ and $B=-2$, so

$$
\boxed{
y(t)=(t+2)e^{-t}-2e^{-2t},\qquad t\ge0
}.
$$

#### 2.4.8 Initial Rest

Suppose a right-sided input turns on at $t=t_0$:

$$
x(t)=0\qquad(t<t_0).
$$

Under initial rest, the system has no stored energy before the input arrives, and

$$
y^{(k)}(t_0)=0,
\qquad k=0,1,\ldots,N-1.
$$

For linear systems, this condition enforces causality: no input before $t_0$ produces no output before $t_0$.

For the mechanical system

$$
m q''(t)=f(t),
$$

initial rest at $t_0$ means

$$
q(t_0)=0,
\qquad q'(t_0)=0.
$$

For an initially relaxed RLC circuit, the inductor and capacitor store no energy. The corresponding inductor current and capacitor voltage are zero at the switching time.

#### 2.4.9 Integrating-Factor Solution of a First-Order Equation

For

$$
y'(t)+ay(t)=f_x(t),
\qquad y(t_0)=y_0,
$$

the integrating-factor solution is

$$
\boxed{
y(t)=y_0e^{-a(t-t_0)}
+\int_{t_0}^{t}f_x(\tau)e^{-a(t-\tau)}d\tau
}.
$$

The first term is the zero-input response. The integral is the zero-state response.

Under initial rest, the zero-input term vanishes. Extending the lower limit to $-\infty$ gives

$$
y(t)=\int_{-\infty}^{t}f_x(\tau)e^{-a(t-\tau)}d\tau.
$$

This is convolution with

$$
h(t)=e^{-at}u(t).
$$

The result connects the differential-equation description directly to the impulse-response description of a causal LTI system.

#### 2.4.10 Zero-Input and Zero-State Responses

The complete response can be decomposed as

$$
\boxed{y(t)=y_{zi}(t)+y_{zs}(t)}.
$$

- The **zero-input response** $y_{zi}(t)$ comes from the initial state with the external input set to zero. It consists only of natural modes.
- The **zero-state response** $y_{zs}(t)$ comes from the external input with the initial state set to zero. It normally contains a particular solution and natural-mode terms required to satisfy zero-state conditions.

For distinct characteristic roots,

$$
y_{zi}(t)=\sum_{k=1}^{N}A_{zi,k}e^{\lambda_k t},
$$

while

$$
y_{zs}(t)=\sum_{k=1}^{N}A_{zs,k}e^{\lambda_k t}+y_p(t).
$$

The natural response and forced response form a different decomposition:

$$
y(t)=
\underbrace{\sum_k A_k e^{\lambda_k t}}_{\text{natural response}}
+\underbrace{y_p(t)}_{\text{forced response}}.
$$

Therefore,

$$
\text{natural response}
=\text{zero-input response}
+\text{natural-mode part of the zero-state response}.
$$

These two decompositions answer different questions. Homogeneous and particular solutions describe mathematical form, while zero-input and zero-state responses identify the physical source of the output.

#### 2.4.11 Linearity with Initial State

The zero-state response is linear in the external input, and the zero-input response is linear in the initial state. When the initial state is nonzero and held fixed, the complete response is not linear as a function of the external input alone because the same zero-input term appears for every input.

For

$$
y'(t)+2y(t)=x(t),
\qquad y(0^-)=2,
\qquad x(t)=e^{-t}u(t),
$$

the two components are

$$
y_{zi}(t)=2e^{-2t},
$$

$$
y_{zs}(t)=-e^{-2t}+e^{-t}.
$$

Thus,

$$
\boxed{y(t)=e^{-2t}+e^{-t},\qquad t>0}.
$$

Scaling only the input by three scales $y_{zs}$ but leaves $y_{zi}$ unchanged:

$$
y(t)=-e^{-2t}+3e^{-t}.
$$

Scaling only the initial state from $2$ to $6$ scales $y_{zi}$ by three but leaves $y_{zs}$ unchanged:

$$
y(t)=5e^{-2t}+e^{-t}.
$$

#### 2.4.12 Example: Recovering the Zero-Input and Zero-State Parts

Suppose the same initial state produces

$$
y_1(t)=2e^{-t}+\cos(2t)
$$

for input $x(t)$, and

$$
y_2(t)=e^{-t}+2\cos(2t)
$$

for input $2x(t)$. Write the zero-input response as $z(t)$ and the zero-state response to $x(t)$ as $s(t)$. Then

$$
z(t)+s(t)=y_1(t),
$$

$$
z(t)+2s(t)=y_2(t).
$$

Solving gives

$$
z(t)=3e^{-t},
\qquad
s(t)=-e^{-t}+\cos(2t).
$$

For input $4x(t)$ under the same initial condition,

$$
\begin{aligned}
y_4(t)
&=z(t)+4s(t)\\
&=-e^{-t}+4\cos(2t),
\qquad t>0.
\end{aligned}
$$

The zero-input term remains unchanged because the initial state remains unchanged.

#### 2.4.13 Key Points

- A constant-coefficient differential equation requires auxiliary conditions to specify a unique system response.
- Characteristic roots determine the natural modes of the system.
- A repeated forcing mode requires multiplication of the trial particular solution by a sufficient power of $t$.
- Initial rest converts an LCCDE description into a causal zero-state LTI system for right-sided inputs.
- The complete response equals the sum of zero-input and zero-state responses.
- Natural/forced and zero-input/zero-state are different decompositions and should not be interchanged.
- Superposition applies separately to the external input and to the initial state.
