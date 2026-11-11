---
title: Numerical Integration and Numerical Differentiation
date: 2026-11-10 15:31:29
updated: 2026-11-10
categories:
  - Numerical Analysis
tags:
  - Numerical Integration
  - Newton-Cotes
  - Romberg
  - Gauss Quadrature
  - Numerical Differentiation
description: Numerical Analysis Course Notes (4-Starting from interpolatory quadrature, systematically derive the Newton–Cotes, composite quadrature, Romberg and Gaussian quadrature formulas.)
math: true
---

本章讨论两个看似相反、实则都可由插值思想统一处理的问题：如何用有限个函数值近似定积分，以及如何用有限个函数值近似导数。重点不只是记住公式，还要理解公式从哪里来、误差由什么决定，以及实际计算时为什么不能盲目减小步长或提高次数。

<!-- more -->

## 1. 数值积分为什么必要

设

$$
I=\int_a^b f(x)\,\mathrm dx.
$$

若能找到原函数 $F(x)$，当然可由 Newton--Leibniz 公式得到 $I=F(b)-F(a)$。但实际问题中常遇到以下情形：

1. 原函数表达式很复杂，例如 $\int\frac{1}{1+x^4}\,\mathrm dx$；
2. 原函数不能用初等函数表示，例如 $\int\frac{\sin x}{x}\,\mathrm dx$、$\int e^{-x^2}\,\mathrm dx$；
3. $f$ 没有解析表达式，只给出实验数据表；
4. 即使有解析表达式，也希望用便于计算机实现、能控制误差的统一算法。

数值积分的目标就是只利用有限个函数值，构造

$$
I\approx I_n=\sum_{k=0}^{n}A_kf(x_k).
$$

其中 $x_k$ 称为**求积节点**，$A_k$ 称为**求积系数或权重**。

### 1.1 一个递推积分的启示

考虑

$$
I_n=\frac1e\int_0^1x^ne^x\,\mathrm dx.
$$

分部积分可得

$$
\begin{aligned}
I_n
&=\frac1e\left([x^ne^x]_0^1-n\int_0^1x^{n-1}e^x\,\mathrm dx\right)\\
&=1-nI_{n-1},
\end{aligned}
$$

且

$$
I_0=\frac1e\int_0^1e^x\,\mathrm dx=1-\frac1e\approx0.63212056.
$$

形式上可由 $I_0$ 正向递推所有 $I_n$，但误差也会满足

$$
e_n=-ne_{n-1},
$$

因而被 $n!$ 量级放大。更稳定的做法是把关系改写成

$$
I_{n-1}=\frac{1-I_n}{n},
$$

先对足够大的 $N$ 给出 $I_N$ 的粗略估计，再反向递推；此时误差每一步都除以 $n$。这个例子说明：**数学上等价的计算公式，数值稳定性可能完全不同。**

## 2. 从积分中值定理到基本求积公式

### 2.1 积分中值定理

若 $f\in C[a,b]$，$g$ 在 $[a,b]$ 上可积且不变号，则存在 $\xi\in(a,b)$，使

$$
\int_a^bf(x)g(x)\,\mathrm dx
=f(\xi)\int_a^bg(x)\,\mathrm dx.
$$

取 $g(x)\equiv1$，有

$$
\int_a^bf(x)\,\mathrm dx=(b-a)f(\xi).
$$

几何上，这表示曲边梯形面积等于“区间长度乘某个中间高度”。困难在于 $\xi$ 未知，于是需要用已知节点处的函数值近似 $f(\xi)$。

### 2.2 矩形、梯形与 Simpson 公式

用端点或中点高度代替 $f(\xi)$，得到

$$
\begin{aligned}
I_L&=(b-a)f(a), &&\text{左矩形公式},\\
I_R&=(b-a)f(b), &&\text{右矩形公式},\\
I_M&=(b-a)f\!\left(\frac{a+b}{2}\right), &&\text{中点公式}.
\end{aligned}
$$

用端点连线近似曲线，得到梯形公式

$$
T=\frac{b-a}{2}[f(a)+f(b)].
$$

用通过 $a,(a+b)/2,b$ 三点的二次多项式近似 $f$，得到 Simpson 公式

$$
S=\frac{b-a}{6}\left[f(a)+4f\!\left(\frac{a+b}{2}\right)+f(b)\right].
$$

## 3. 机械求积公式与代数精度

### 3.1 定义

形如

$$
\int_a^bf(x)\,\mathrm dx\approx\sum_{k=0}^nA_kf(x_k)
$$

的公式称为**机械求积公式**。它把积分运算转化为函数值的加权求和。

若该公式对所有次数不超过 $m$ 的多项式都精确，但不能保证对所有 $m+1$ 次多项式精确，则称它具有 **$m$ 次代数精度**。

检验方法是依次代入

$$
1,x,x^2,\ldots,x^m,x^{m+1}.
$$

精确到 $m$ 次等价于

$$
\sum_{k=0}^nA_kx_k^j
=\int_a^bx^j\,\mathrm dx
=\frac{b^{j+1}-a^{j+1}}{j+1},
\qquad j=0,1,\ldots,m.
$$

若 $n+1$ 个互异节点已经给定，令 $j=0,1,\ldots,n$ 可得到关于 $A_0,\ldots,A_n$ 的 Vandermonde 线性方程组。其系数矩阵非奇异，所以存在唯一的一组权重，使公式至少具有 $n$ 次代数精度。

### 3.2 例：在 $[-1,1]$ 上用节点 $-1,0,1$ 构造公式

设

$$
\int_{-1}^{1}f(x)\,\mathrm dx
\approx A_0f(-1)+A_1f(0)+A_2f(1).
$$

要求对 $1,x,x^2$ 精确：

$$
\begin{cases}
A_0+A_1+A_2=2,\\
-A_0+A_2=0,\\
A_0+A_2=\dfrac23.
\end{cases}
$$

解得

$$
A_0=A_2=\frac13,\qquad A_1=\frac43,
$$

于是

$$
\int_{-1}^{1}f(x)\,\mathrm dx
\approx\frac13[f(-1)+4f(0)+f(1)].
$$

由于节点与权重关于原点对称，代入奇函数 $x^3$ 时两边同为零，因此公式也对三次多项式精确。代入 $x^4$：

$$
\int_{-1}^{1}x^4\,\mathrm dx=\frac25,
\qquad
\frac13[1+0+1]=\frac23,
$$

并不精确，所以它的代数精度为 3。这正是标准区间上的 Simpson 公式。

### 3.3 例：含导数值的非机械公式

设

$$
\int_0^1f(x)\,\mathrm dx
\approx A_0f(0)+A_1f(1)+B_0f'(0).
$$

依次代入 $1,x,x^2$：

$$
\begin{cases}
A_0+A_1=1,\\
A_1+B_0=\dfrac12,\\
A_1=\dfrac13.
\end{cases}
$$

故

$$
A_0=\frac23,\qquad A_1=\frac13,\qquad B_0=\frac16.
$$

对 $x^3$，右端等于 $1/3$，而积分为 $1/4$，所以代数精度为 2。由于公式还使用导数值，它不属于只用函数值的机械求积公式。

## 4. 插值型求积公式

给定互异节点 $x_0,\ldots,x_n$，用 Lagrange 插值多项式

$$
L_n(x)=\sum_{k=0}^nf(x_k)l_k(x),
\qquad
l_k(x)=\prod_{\substack{j=0\\j\ne k}}^n\frac{x-x_j}{x_k-x_j}
$$

近似 $f(x)$。两边积分：

$$
\begin{aligned}
\int_a^bf(x)\,\mathrm dx
&\approx\int_a^bL_n(x)\,\mathrm dx\\
&=\sum_{k=0}^nf(x_k)\int_a^bl_k(x)\,\mathrm dx.
\end{aligned}
$$

因此插值型求积公式的权重为

$$
A_k=\int_a^bl_k(x)\,\mathrm dx.
$$

任何次数不超过 $n$ 的多项式都等于自身的 $n$ 次插值多项式，所以插值型公式至少具有 $n$ 次代数精度。

若 $f\in C^{n+1}[a,b]$，Lagrange 余项为

$$
f(x)-L_n(x)
=\frac{f^{(n+1)}(\xi_x)}{(n+1)!}\omega_{n+1}(x),
\qquad
\omega_{n+1}(x)=\prod_{k=0}^n(x-x_k).
$$

故求积余项

$$
R_n[f]
=\int_a^b[f(x)-L_n(x)]\,\mathrm dx
=\int_a^b\frac{f^{(n+1)}(\xi_x)}{(n+1)!}\omega_{n+1}(x)\,\mathrm dx.
$$

只有当 $\omega_{n+1}$ 在区间内不变号，或能用更合适的 Hermite 余项时，才可直接用积分中值定理把导数项提出积分号。

## 5. Newton--Cotes 求积公式

### 5.1 构造与 Cotes 系数

把 $[a,b]$ 等分为 $n$ 份：

$$
h=\frac{b-a}{n},\qquad x_k=a+kh,\quad k=0,1,\ldots,n.
$$

在这些等距节点上构造插值型求积公式：

$$
I_n=(b-a)\sum_{k=0}^nc_k^{(n)}f(x_k).
$$

令 $x=a+th$，则 $t\in[0,n]$，并且

$$
l_k(a+th)
=\prod_{\substack{j=0\\j\ne k}}^n\frac{t-j}{k-j}
=\frac{(-1)^{n-k}}{k!(n-k)!}
\prod_{\substack{j=0\\j\ne k}}^n(t-j).
$$

所以

$$
\boxed{
c_k^{(n)}
=\frac1n\frac{(-1)^{n-k}}{k!(n-k)!}
\int_0^n\prod_{\substack{j=0\\j\ne k}}^n(t-j)\,\mathrm dt
}.
$$

由构造立刻得到两条性质：

$$
\sum_{k=0}^nc_k^{(n)}=1,
\qquad
c_k^{(n)}=c_{n-k}^{(n)}.
$$

当 $n\ge8$ 时会出现负的 Cotes 系数，输入或舍入误差可能被放大；高次等距插值还可能出现 Runge 现象。因此实际中通常不用很高阶的单个 Newton--Cotes 公式，而采用低阶复化公式或 Gauss 公式。

### 5.2 三个常用公式

当 $n=1$：

$$
\boxed{T=\frac{b-a}{2}[f(a)+f(b)]}
$$

为梯形公式，代数精度为 1。

当 $n=2$：

$$
\boxed{
S=\frac{b-a}{6}\left[f(a)+4f\!\left(\frac{a+b}{2}\right)+f(b)\right]
}
$$

为 Simpson 公式，代数精度为 3。

当 $n=4$：

$$
\boxed{
C=\frac{b-a}{90}
[7f(x_0)+32f(x_1)+12f(x_2)+32f(x_3)+7f(x_4)]
}
$$

为 Cotes 公式，代数精度为 5。

### 5.3 为什么偶数阶 Newton--Cotes 会“多精确一次”

一般的 $n$ 次插值只能保证对 $n$ 次多项式精确。若 $n$ 为偶数，考虑 $f(x)=x^{n+1}$。其首项系数为 1，故插值余项恰为

$$
f(x)-L_n(x)=\omega_{n+1}(x)=\prod_{k=0}^n(x-x_k).
$$

节点关于区间中点对称。令 $x=a+th$，再作变换 $t=n-s$，有

$$
\prod_{k=0}^n(n-s-k)
=(-1)^{n+1}\prod_{k=0}^n(s-k)
=-\prod_{k=0}^n(s-k),
$$

因为 $n+1$ 为奇数。因此

$$
\int_0^n\prod_{k=0}^n(t-k)\,\mathrm dt
=-\int_0^n\prod_{k=0}^n(t-k)\,\mathrm dt=0.
$$

所以公式对 $x^{n+1}$ 也精确，即偶数阶 Newton--Cotes 至少具有 $n+1$ 次代数精度。

## 6. 基本公式的误差推导

### 6.1 梯形公式余项

用端点 $a,b$ 作一次插值，余项为

$$
f(x)-L_1(x)=\frac{f''(\xi_x)}{2}(x-a)(x-b).
$$

在 $(a,b)$ 内，$(x-a)(x-b)\le0$，不变号。由积分中值定理，存在 $\eta\in(a,b)$，使

$$
\begin{aligned}
R_T[f]
&=\int_a^b[f(x)-L_1(x)]\,\mathrm dx\\
&=\frac{f''(\eta)}2\int_a^b(x-a)(x-b)\,\mathrm dx.
\end{aligned}
$$

令 $u=x-a$、$H=b-a$：

$$
\int_a^b(x-a)(x-b)\,\mathrm dx
=\int_0^Hu(u-H)\,\mathrm du
=-\frac{H^3}{6}.
$$

故

$$
\boxed{R_T[f]=-\frac{(b-a)^3}{12}f''(\eta)}.
$$

### 6.2 Simpson 公式余项

Simpson 公式有三次代数精度，直接使用二次 Lagrange 余项不能方便地得到含四阶导数的结果。应构造三次 Hermite 多项式 $p_3$，满足

$$
p_3(a)=f(a),\quad
p_3\!\left(\frac{a+b}{2}\right)=f\!\left(\frac{a+b}{2}\right),\quad
p_3(b)=f(b),\quad
p_3'\!\left(\frac{a+b}{2}\right)=f'\!\left(\frac{a+b}{2}\right).
$$

Hermite 余项为

$$
f(x)-p_3(x)
=\frac{f^{(4)}(\xi_x)}{4!}
(x-a)\left(x-\frac{a+b}{2}\right)^2(x-b).
$$

Simpson 公式对 $p_3$ 精确。上述节点因子在 $[a,b]$ 上不为正，故可用积分中值定理。记 $H=b-a$，令 $x=a+Ht$：

$$
\begin{aligned}
R_S[f]
&=\frac{f^{(4)}(\eta)}{24}H^5
\int_0^1t\left(t-\frac12\right)^2(t-1)\,\mathrm dt\\
&=\frac{f^{(4)}(\eta)}{24}H^5\left(-\frac1{120}\right).
\end{aligned}
$$

因此

$$
\boxed{R_S[f]=-\frac{(b-a)^5}{2880}f^{(4)}(\eta)}.
$$

### 6.3 含导数值公式的余项

回到

$$
Q[f]=\frac23f(0)+\frac13f(1)+\frac16f'(0).
$$

构造满足 $p_2(0)=f(0),p_2'(0)=f'(0),p_2(1)=f(1)$ 的二次 Hermite 插值多项式。固定 $x\in(0,1)$，令

$$
\Phi(t)=f(t)-p_2(t)-K_xt^2(t-1),
$$

并选 $K_x$ 使 $\Phi(x)=0$。又有 $\Phi(0)=\Phi'(0)=\Phi(1)=0$。连续应用 Rolle 定理三次，存在 $\xi_x\in(0,1)$ 使

$$
0=\Phi'''(\xi_x)=f'''(\xi_x)-6K_x.
$$

故

$$
f(x)-p_2(x)=\frac{f'''(\xi_x)}6x^2(x-1).
$$

节点因子在 $[0,1]$ 上不为正，因此

$$
\begin{aligned}
R[f]
&=\frac{f'''(\eta)}6\int_0^1x^2(x-1)\,\mathrm dx\\
&=\frac{f'''(\eta)}6\left(\frac14-\frac13\right)
=-\frac{f'''(\eta)}{72}.
\end{aligned}
$$

## 7. 复化求积公式

高次插值并不总是可靠。更稳妥的思想是把 $[a,b]$ 划分成许多小区间，在每一段使用低阶公式，再把结果相加。

令

$$
h=\frac{b-a}{n},\qquad x_k=a+kh.
$$

### 7.1 复化梯形公式

在每个 $[x_k,x_{k+1}]$ 上应用梯形公式：

$$
\boxed{
T_n=\frac h2\left[f(a)+2\sum_{k=1}^{n-1}f(x_k)+f(b)\right]
}.
$$

逐段余项相加：

$$
R_T[f]=-rac{h^3}{12}\sum_{k=0}^{n-1}f''(\eta_k).
$$

由连续函数的平均值性质，存在 $\eta\in(a,b)$，使

$$
\frac1n\sum_{k=0}^{n-1}f''(\eta_k)=f''(\eta).
$$

又因 $nh=b-a$，故

$$
\boxed{R_T[f]=-\frac{b-a}{12}h^2f''(\eta)}.
$$

所以复化梯形公式是二阶方法，误差为 $O(h^2)$。

### 7.2 复化 Simpson 公式

记每个小区间中点为 $x_{k+1/2}=x_k+h/2$，则

$$
\boxed{
S_n=\frac h6\left[
f(a)+4\sum_{k=0}^{n-1}f(x_{k+1/2})
+2\sum_{k=1}^{n-1}f(x_k)+f(b)
\right]
}.
$$

逐段相加可得

$$
\boxed{R_S[f]=-\frac{b-a}{2880}h^4f^{(4)}(\eta)}.
$$

因此它是四阶方法，误差为 $O(h^4)$。

### 7.3 复化 Cotes 公式

在每个 $[x_k,x_{k+1}]$ 内再取四分点 $x_{k+1/4},x_{k+1/2},x_{k+3/4}$：

$$
\boxed{
\begin{aligned}
C_n=\frac h{90}\Bigg[&7f(a)
+32\sum_{k=0}^{n-1}f(x_{k+1/4})
+12\sum_{k=0}^{n-1}f(x_{k+1/2})\\
&+32\sum_{k=0}^{n-1}f(x_{k+3/4})
+14\sum_{k=1}^{n-1}f(x_k)+7f(b)\Bigg].
\end{aligned}
}
$$

余项为

$$
\boxed{R_C[f]=-\frac{b-a}{1935360}h^6f^{(6)}(\eta)},
$$

即六阶方法。

当步长减半时，三种公式的主误差大约分别缩小为原来的

$$
\frac14,\qquad\frac1{16},\qquad\frac1{64}.
$$

## 8. 变步长与复化梯形递推

若直接猜一个很小的 $h$，可能计算过多；若 $h$ 太大，又难以保证精度。变步长算法从较粗网格开始，不断将步长减半，并重复利用旧函数值。

设 $T_n$ 已知。把每段二分后，新出现的节点只有各段中点。因此

$$
\begin{aligned}
T_{2n}
&=\frac h4\sum_{k=0}^{n-1}
\left[f(x_k)+2f\left(x_k+\frac h2\right)+f(x_{k+1})\right]\\
&=\frac12T_n+\frac h2\sum_{k=0}^{n-1}f\left(x_k+\frac h2\right).
\end{aligned}
$$

若记 $h_n=(b-a)/n$，则递推式为

$$
\boxed{
T_{2n}=\frac12T_n+rac{h_n}{2}
\sum_{k=0}^{n-1}f\left(a+kh_n+\frac{h_n}{2}\right)
}.
$$

### 8.1 事后误差估计

复化梯形主误差为 $Ch^2$，于是

$$
I-T_n\approx Ch^2,qquad
I-T_{2n}\approx C\left(\frac h2\right)^2.
$$

两式相除得

$$
\frac{I-T_{2n}}{I-T_n}\approx\frac14.
$$

消去 $I-T_n$：

$$
\boxed{I-T_{2n}\approx\frac13(T_{2n}-T_n)}.
$$

因此若希望误差不超过 $\varepsilon$，可用

$$
|T_{2n}-T_n|<3\varepsilon
$$

作为实用停止准则。

### 8.2 例：计算 $\pi$

利用

$$
\pi=\int_0^1\frac4{1+x^2}\,\mathrm dx,
$$

逐次二分得到 PPT 中的结果：

| $n$ | $T_n$ | $n$ | $T_n$ |
| ---: | ---: | ---: | ---: |
| 1 | 3.0000000 | 32 | 3.14142989 |
| 2 | 3.1000000 | 64 | 3.14155196 |
| 4 | 3.13117647 | 128 | 3.14158248 |
| 8 | 3.13898849 | 256 | 3.14159011 |
| 16 | 3.14094161 | 512 | 3.14159209 |

题设要求误差不超过 $10^{-6}$。用事后估计，应检查

$$
|T_{2n}-T_n|<3\times10^{-6}.
$$

例如

$$
|T_{256}-T_{128}|\approx7.63\times10^{-6}>3\times10^{-6},
$$

而

$$
|T_{512}-T_{256}|\approx1.98\times10^{-6}<3\times10^{-6}.
$$

所以可取 $T_{512}\approx3.14159209$。

## 9. Romberg 求积

Romberg 方法把“步长减半”和 Richardson 外推结合起来，不只比较误差，还主动消去误差展开中的低阶项。

### 9.1 从梯形到 Simpson，再到 Cotes

由上一节

$$
I-T_n\approx Ch^2,qquad I-T_{2n}\approx\frac14Ch^2.
$$

线性组合

$$
\widetilde T=\frac43T_{2n}-\frac13T_n
$$

恰好消去 $Ch^2$。把 $T_n,T_{2n}$ 展开可验证

$$
\boxed{S_n=\frac43T_{2n}-\frac13T_n}.
$$

Simpson 公式的主误差为 $O(h^4)$。再将步长减半：

$$
\boxed{C_n=\frac{16}{15}S_{2n}-\frac1{15}S_n}.
$$

Cotes 公式的主误差为 $O(h^6)$，继续外推：

$$
\boxed{R_n=\frac{64}{63}C_{2n}-\frac1{63}C_n}.
$$

### 9.2 统一递推公式

记 $T_m^{(0)}$ 为复化梯形值；上标表示外推次数。则

$$
\boxed{
T_m^{(k)}
=\frac{4^k}{4^k-1}T_{2m}^{(k-1)}
-\frac1{4^k-1}T_m^{(k-1)},
\qquad k=1,2,\ldots
}.
$$

常用三角表排列如下：

$$
\begin{array}{c|cccc}
T_1&T_1^{(0)}\\
T_2&T_2^{(0)}&T_1^{(1)}\\
T_4&T_4^{(0)}&T_2^{(1)}&T_1^{(2)}\\
T_8&T_8^{(0)}&T_4^{(1)}&T_2^{(2)}&T_1^{(3)}
\end{array}
$$

若目标精度为 $\varepsilon$，可比较同一列相邻两项，例如

$$
|T_m^{(k)}-T_{m-1}^{(k)}|<\varepsilon.
$$

### 9.3 例：$\int_0^1\sqrt{x^3}\,\mathrm dx$

精确值为

$$
\int_0^1x^{3/2}\,\mathrm dx=\frac25=0.4.
$$

先算

$$
T_1^{(0)}=\frac12[f(0)+f(1)]=0.5,
$$

再由递推得到 PPT 中的 Romberg 表：

| 层 $k$ | 梯形列 | 一次外推 | 二次外推 | 三次外推 | 四次外推 | 五次外推 |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 0 | 0.50000000 | | | | | |
| 1 | 0.42677670 | 0.40236893 | | | | |
| 2 | 0.40701811 | 0.40043192 | 0.40030278 | | | |
| 3 | 0.40181246 | 0.40007725 | 0.40005361 | 0.40004965 | | |
| 4 | 0.40046340 | 0.40001371 | 0.40000948 | 0.40000878 | 0.40000862 | |
| 5 | 0.40011767 | 0.40000243 | 0.40000168 | 0.40000155 | 0.40000152 | 0.40000152 |

从表中可见，外推显著加快了收敛。

### 9.4 Romberg 的适用条件

Romberg 外推依赖误差能按偶次幂展开：

$$
T(h)=I+c_1h^2+c_2h^4+c_3h^6+\cdots.
$$

因此要求被积函数足够光滑。若函数在区间内不光滑、高度振荡或存在尖峰，如 $\sqrt{x-0.5}$、$\sin(1/x)$、$e^{-1000x}$，高阶误差项可能不能有效消去，算法会收敛缓慢甚至给出误导性的误差估计。外推还包含相近数相减，因此对舍入误差较敏感。

### 9.5 Romberg 算法实现

下面的实现只计算新加入的中点函数值，并按三角表逐列外推：

```python
def romberg(func, a, b, max_level=10, tol=1e-10):
    """用 Romberg 方法近似计算 integral_a^b func(x) dx。"""
    table = [[0.0] * (max_level + 1) for _ in range(max_level + 1)]
    table[0][0] = 0.5 * (b - a) * (func(a) + func(b))

    for k in range(1, max_level + 1):
        h = (b - a) / (2**k)

        # 本层新出现的是编号为奇数的网格点
        midpoint_sum = sum(func(a + (2 * i - 1) * h)
                           for i in range(1, 2**(k - 1) + 1))
        table[k][0] = 0.5 * table[k - 1][0] + h * midpoint_sum

        # Richardson 外推
        for m in range(1, k + 1):
            table[k][m] = (
                4**m * table[k][m - 1] - table[k - 1][m - 1]
            ) / (4**m - 1)

        if abs(table[k][k] - table[k - 1][k - 1]) < tol:
            return table[k][k], [row[: i + 1] for i, row in enumerate(table[: k + 1])]

    return table[max_level][max_level], table
```

这里的 `table[k][0]` 是把区间分成 $2^k$ 段后的复化梯形值，`table[k][m]` 是第 $m$ 次外推值。算法把函数值复用和误差加速分成两个清晰步骤。

## 10. Gauss 型求积公式

### 10.1 为什么还要选择节点

前面的插值型公式把节点固定后，只剩 $n+1$ 个权重可调，所以一般至少具有 $n$ 次代数精度。若节点与权重都作为未知量，则共有 $2n+2$ 个参数，理论上可以满足从 $1$ 到 $x^{2n+1}$ 的 $2n+2$ 个矩条件。

带权积分的 Gauss 型公式写成

$$
\int_a^b\rho(x)f(x)\,\mathrm dx
\approx\sum_{k=0}^{n}A_kf(x_k),
$$

其中 $\rho(x)\ge0$ 为权函数。若公式具有 $2n+1$ 次代数精度，则 $x_k$ 称为 **Gauss 点**，$A_k$ 称为 **Gauss 系数**。这是 $n+1$ 个节点的机械求积公式所能达到的最高代数精度。

### 10.2 例：在 $[-1,1]$ 上构造两点 Gauss 公式

设

$$
\int_{-1}^1f(x)\,\mathrm dx
\approx A_0f(x_0)+A_1f(x_1).
$$

要求对 $1,x,x^2,x^3$ 精确：

$$
\begin{cases}
A_0+A_1=2,\\
A_0x_0+A_1x_1=0,\\
A_0x_0^2+A_1x_1^2=\dfrac23,\\
A_0x_0^3+A_1x_1^3=0.
\end{cases}
$$

由区间对称性可设 $x_1=-x_0$、$A_0=A_1$。代入得

$$
A_0=A_1=1,qquad x_0=-\frac1{\sqrt3},\quad x_1=\frac1{\sqrt3}.
$$

因此

$$
\boxed{
\int_{-1}^1f(x)\,\mathrm dx
\approx f\!\left(-\frac1{\sqrt3}\right)
+f\!\left(\frac1{\sqrt3}\right)
}.
$$

代入 $x^4$ 时，右端为 $2/9$，而积分为 $2/5$，故代数精度恰为 3。

直接解高次非线性矩方程很困难。下面给出更有结构的构造。

### 10.3 Gauss 点与正交多项式

令

$$
\omega_{n+1}(x)=\prod_{k=0}^n(x-x_k).
$$

**定理：**插值型求积公式具有 $2n+1$ 次代数精度，当且仅当 $\omega_{n+1}$ 与所有次数不超过 $n$ 的多项式关于权函数 $\rho$ 正交，即

$$
\boxed{
\int_a^b\rho(x)p(x)\omega_{n+1}(x)\,\mathrm dx=0,
\qquad \forall p\in\mathbb P_n
}.
$$

**必要性：**若公式具有 $2n+1$ 次精度，则 $p\omega_{n+1}$ 的次数不超过 $2n+1$，所以

$$
\int_a^b\rho(x)p(x)\omega_{n+1}(x)\,\mathrm dx
=\sum_{k=0}^nA_kp(x_k)\omega_{n+1}(x_k)=0.
$$

**充分性：**任取 $f\in\mathbb P_{2n+1}$，用多项式除法写成

$$
f(x)=P(x)\omega_{n+1}(x)+Q(x),
\qquad P,Q\in\mathbb P_n.
$$

由正交性，第一项积分为零：

$$
\int_a^b\rho f=\int_a^b\rho Q.
$$

插值型公式至少对 $Q$ 精确，而且 $\omega_{n+1}(x_k)=0$，故 $f(x_k)=Q(x_k)$。于是

$$
\int_a^b\rho f
=\sum_{k=0}^nA_kQ(x_k)
=\sum_{k=0}^nA_kf(x_k).
$$

所以公式对所有 $2n+1$ 次多项式精确。

### 10.4 构造步骤

1. 设首一正交多项式

   $$
   \omega_{n+1}(x)=x^{n+1}+a_nx^n+\cdots+a_1x+a_0.
   $$

2. 令它分别与 $1,x,\ldots,x^n$ 关于 $\rho$ 正交，解 $n+1$ 个线性方程求 $a_0,\ldots,a_n$；
3. 求 $\omega_{n+1}$ 的 $n+1$ 个零点，作为 Gauss 点；
4. 再利用对 $1,x,\ldots,x^n$ 的精确性解线性方程求权重。

### 10.5 例：权函数 $\rho(x)=\sqrt{x}$

构造

$$
\int_0^1\sqrt{x},f(x)\,\mathrm dx
\approx A_0f(x_0)+A_1f(x_1).
$$

取首一二次正交多项式

$$
\omega_2(x)=x^2+bx+c.
$$

与 $1,x$ 正交：

$$
\begin{cases}
\displaystyle\int_0^1\sqrt{x}(x^2+bx+c)\,\mathrm dx=0,\\[2mm]
\displaystyle\int_0^1x\sqrt{x}(x^2+bx+c)\,\mathrm dx=0.
\end{cases}
$$

即

$$
\begin{cases}
\dfrac27+\dfrac25b+\dfrac23c=0,\\[1mm]
\dfrac29+\dfrac27b+\dfrac25c=0.
\end{cases}
$$

解得

$$
b=-\frac{10}{9},\qquad c=\frac5{21}.
$$

所以

$$
\omega_2(x)=x^2-\frac{10}{9}x+\frac5{21},
$$

其零点为

$$
x_{0,1}=\frac59\pm\frac{2\sqrt{70}}{63}
\approx0.82116,\ 0.28995.
$$

再要求公式对 $1,x$ 精确：

$$
\begin{cases}
A_0+A_1=\displaystyle\int_0^1\sqrt{x}\,\mathrm dx=\dfrac23,\\[2mm]
A_0x_0+A_1x_1=\displaystyle\int_0^1x\sqrt{x}\,\mathrm dx=\dfrac25.
\end{cases}
$$

得到

$$
A_0\approx0.389111,qquad A_1\approx0.277556.
$$

该两点 Gauss 公式具有 3 次代数精度。

## 11. Gauss 公式的余项与性质

### 11.1 余项推导

在 Gauss 点 $x_0,\ldots,x_n$ 上作 $2n+1$ 次 Hermite 插值，使

$$
H_{2n+1}(x_i)=f(x_i),\qquad
H_{2n+1}'(x_i)=f'(x_i).
$$

余项为

$$
f(x)-H_{2n+1}(x)
=\frac{f^{(2n+2)}(\xi_x)}{(2n+2)!}\omega_{n+1}^2(x).
$$

Gauss 公式对 $H_{2n+1}$ 精确，而且在节点处 $H_{2n+1}(x_i)=f(x_i)$，故

$$
\begin{aligned}
R[f]
&=\int_a^b\rho(x)[f(x)-H_{2n+1}(x)]\,\mathrm dx\\
&=\int_a^b\rho(x)
\frac{f^{(2n+2)}(\xi_x)}{(2n+2)!}\omega_{n+1}^2(x)\,\mathrm dx.
\end{aligned}
$$

因为 $\rho(x)\omega_{n+1}^2(x)\ge0$，存在 $\eta\in(a,b)$ 使

$$
\boxed{
R[f]=\frac{f^{(2n+2)}(\eta)}{(2n+2)!}
\int_a^b\rho(x)\omega_{n+1}^2(x)\,\mathrm dx
}.
$$

### 11.2 权重为正

对 $f(x)=l_k^2(x)$ 使用 Gauss 公式。其次数为 $2n$，公式精确，且 $l_k(x_j)=\delta_{kj}$，所以

$$
A_k=\int_a^b\rho(x)l_k^2(x)\,\mathrm dx>0.
$$

正权重意味着函数值误差不会因正负大系数相消而被严重放大，因此 Gauss 公式数值稳定。

Gauss 公式对连续函数也具有收敛性；其优点是精度高，并可配合不同权函数处理无穷区间或奇异积分。缺点是节点与权重需要预先计算，增加节点数时通常要重新计算全部参数。

## 12. Gauss--Legendre 求积

在 $[-1,1]$、$\rho(x)=1$ 时，正交多项式为 Legendre 多项式。采用首一形式：

- 一个节点（$n=0$）：$\omega_1(x)=x$，故 $x_0=0,A_0=2$；
- 两个节点（$n=1$）：$\omega_2(x)=x^2-1/3$，故 $x_{0,1}=\pm\sqrt3/3,A_0=A_1=1$；
- 三个节点（$n=2$）：$\omega_3(x)=x^3-3x/5$，故 $x_{0,2}=\pm\sqrt{15}/5,x_1=0$，权重 $A_0=A_2=5/9,A_1=8/9$。

### 12.1 从 $[-1,1]$ 变换到任意区间

令

$$
x=\frac{b-a}{2}t+\frac{a+b}{2},qquad t\in[-1,1],
$$

则

$$
\boxed{
\int_a^bf(x)\,\mathrm dx
=\frac{b-a}{2}\int_{-1}^1
f\!\left(\frac{b-a}{2}t+\frac{a+b}{2}\right)\mathrm dt
}.
$$

因此先对变换后的函数使用标准 Gauss--Legendre 节点和权重，再乘 $(b-a)/2$ 即可。

### 12.2 例：三点公式计算 $\int_0^{\pi/2}x^2\cos x\,\mathrm dx$

精确值可由两次分部积分得到

$$
\int_0^{\pi/2}x^2\cos x\,\mathrm dx
=\frac{\pi^2}{4}-2
\approx0.46740110027234.
$$

令

$$
x=\frac\pi4t+\frac\pi4=\frac\pi4(t+1),
$$

并记

$$
g(t)=f\!\left(\frac\pi4(t+1)\right)
=\frac{\pi^2}{16}(t+1)^2
\cos\!\left[\frac\pi4(t+1)\right].
$$

三点 Gauss--Legendre 公式给出

$$
\begin{aligned}
I
&=\frac\pi4\int_{-1}^1g(t)\,\mathrm dt\\
&\approx\frac\pi4\left[
\frac59g\!\left(-\frac{\sqrt{15}}5\right)
+\frac89g(0)
+\frac59g\!\left(\frac{\sqrt{15}}5\right)
\right]\\
&\approx0.46724250353.
\end{aligned}
$$

### 12.3 Gauss--Legendre 余项

Legendre 多项式 $P_{n+1}$ 的首项系数为

$$
\frac{(2n+2)!}{2^{n+1}[(n+1)!]^2}.
$$

把它除以首项系数得到首一多项式 $\widetilde P_{n+1}$，再结合正交关系，可得

$$
\boxed{
R[f]=
\frac{2^{2n+3}[(n+1)!]^4}
{(2n+3)[(2n+2)!]^3}
f^{(2n+2)}(\eta)
}.
$$

## 13. Gauss--Chebyshev 求积

在 $[-1,1]$ 上取

$$
\rho(x)=\frac1{\sqrt{1-x^2}}.
$$

相应正交多项式为 Chebyshev 多项式。$n+1$ 个节点和权重为

$$
\boxed{
x_k=\cos\frac{(2k+1)\pi}{2n+2},qquad
A_k=\frac\pi{n+1},quad k=0,1,\ldots,n
}.
$$

所以

$$
\boxed{
\int_{-1}^1\frac{f(x)}{\sqrt{1-x^2}}\,\mathrm dx
\approx\frac\pi{n+1}\sum_{k=0}^n
f\!\left(\cos\frac{(2k+1)\pi}{2n+2}\right)
}.
$$

### 13.1 例：五点公式计算奇异积分

计算

$$
I=\int_{-1}^1\frac{e^x}{\sqrt{1-x^2}}\,\mathrm dx.
$$

取 $n=4$，节点为

$$
x_k=\cos\frac{(2k+1)\pi}{10},\qquad k=0,\ldots,4,
$$

权重均为 $\pi/5$。因此

$$
I\approx\frac\pi5\sum_{k=0}^4
\exp\!\left(\cos\frac{(2k+1)\pi}{10}\right)
\approx3.9774632587767.
$$

PPT 给出的参考值约为 $3.9774632605064$，五点公式已经非常准确。

### 13.2 Gauss--Chebyshev 余项

Chebyshev 多项式 $T_{n+1}$ 的首项系数为 $2^n$。由其正交性可得

$$
\boxed{
R[f]=\frac{2\pi}{2^{2n+2}(2n+2)!}
f^{(2n+2)}(\eta)
}.
$$

更一般地，在 $[0,\infty)$ 上配权 $e^{-x}$ 可得到 Gauss--Laguerre 公式；在 $(-\infty,\infty)$ 上配权 $e^{-x^2}$ 可得到 Gauss--Hermite 公式。

## 14. 数值微分的基本思想

解析定义为

$$
f'(x)=\lim_{h\to0}\frac{f(x+h)-f(x)}h.
$$

舍去极限并取有限 $h$，得到机械求导公式：

$$
\begin{aligned}
f'(x)&\approx\frac{f(x+h)-f(x)}h, &&\text{向前差商},\\
f'(x)&\approx\frac{f(x)-f(x-h)}h, &&\text{向后差商},\\
f'(x)&\approx\frac{f(x+h)-f(x-h)}{2h}, &&\text{中心差商}.
\end{aligned}
$$

### 14.1 中心差商的截断误差

在 $x$ 处分别展开：

$$
\begin{aligned}
f(x+h)&=f(x)+hf'(x)+\frac{h^2}{2!}f''(x)
+\frac{h^3}{3!}f'''(x)+\frac{h^4}{4!}f^{(4)}(x)+\cdots,\\
f(x-h)&=f(x)-hf'(x)+\frac{h^2}{2!}f''(x)
-\frac{h^3}{3!}f'''(x)+\frac{h^4}{4!}f^{(4)}(x)-\cdots.
\end{aligned}
$$

相减再除以 $2h$：

$$
\boxed{
\frac{f(x+h)-f(x-h)}{2h}
=f'(x)+\frac{h^2}{3!}f'''(x)
+\frac{h^4}{5!}f^{(5)}(x)+\cdots
}.
$$

所以中心差商的截断误差为 $O(h^2)$，且误差展开只含 $h$ 的偶次幂。

### 14.2 为什么步长不能无限小

只看截断误差，$h$ 越小越好。但浮点计算还包含舍入误差。若每个函数值的绝对误差约为 $\varepsilon_f$，差商中的舍入误差量级约为

$$
O\!\left(\frac{\varepsilon_f}{h}\right).
$$

中心差商总误差可粗略写为

$$
E(h)\approx C_1h^2+C_2\frac{\varepsilon_f}{h}.
$$

前一项随 $h$ 减小而下降，后一项却会上升；当 $f(x+h)$ 与 $f(x-h)$ 很接近时，相减还会损失有效数字。因此数值微分存在合适的中间步长，而不是“越小越好”。

## 15. 插值型求导公式

构造 $f$ 的 $n$ 次插值多项式 $p_n$，用

$$
f'(x)\approx p_n'(x)
$$

近似导数。Lagrange 余项写成

$$
R_n(x)=f(x)-p_n(x)
=\frac{f^{(n+1)}(\xi_x)}{(n+1)!}
\prod_{j=0}^n(x-x_j).
$$

一般点上直接求导时，$\xi_x$ 也随 $x$ 变化，不能简单地把它当常数。可严格证明：在节点 $x_k$ 处存在 $\xi\in(a,b)$，使

$$
\boxed{
f'(x_k)-p_n'(x_k)
=\frac{f^{(n+1)}(\xi)}{(n+1)!}
\prod_{\substack{j=0\\j\ne k}}^n(x_k-x_j)
}.
$$

### 15.1 两点公式

取等距节点 $x_0,x_1=x_0+h$。线性插值为

$$
p_1(x)=\frac{-(x-x_1)f(x_0)+(x-x_0)f(x_1)}h.
$$

求导：

$$
\boxed{
p_1'(x_0)=p_1'(x_1)=\frac{f(x_1)-f(x_0)}h
}.
$$

在两端分别解释为向前、向后差商。余项为

$$
f'(x_0)-p_1'(x_0)=-\frac h2f''(\xi),
\qquad
f'(x_1)-p_1'(x_1)=\frac h2f''(\xi),
$$

故是一阶精度。

### 15.2 三点公式

取 $x_j=x_0+jh$，令 $x=x_0+th$。二次插值可写为

$$
p_2(x_0+th)
=\frac12(t-1)(t-2)f_0-t(t-2)f_1+\frac12t(t-1)f_2,
$$

其中 $f_j=f(x_j)$。对 $x$ 求导要注意 $\mathrm dt/\mathrm dx=1/h$：

$$
p_2'(x_0+th)
=\frac1{2h}[(2t-3)f_0-(4t-4)f_1+(2t-1)f_2].
$$

分别代入 $t=0,1,2$：

$$
\boxed{
\begin{aligned}
f'(x_0)&\approx\frac{-3f_0+4f_1-f_2}{2h},
&R_0&=\frac{h^2}{3}f'''(\xi),\\
f'(x_1)&\approx\frac{-f_0+f_2}{2h},
&R_1&=-\frac{h^2}{6}f'''(\xi),\\
f'(x_2)&\approx\frac{f_0-4f_1+3f_2}{2h},
&R_2&=\frac{h^2}{3}f'''(\xi).
\end{aligned}
}
$$

三式均为二阶精度；中点公式不但系数对称，余项常数也最小。

### 15.3 五点公式

取五个等距节点 $x_0,ldots,x_4$，对四次插值多项式求导，得到

$$
\boxed{
\begin{aligned}
f'(x_0)&\approx\frac{-25f_0+48f_1-36f_2+16f_3-3f_4}{12h},
&R_0&=\frac{h^4}{5}f^{(5)}(\xi),\\
f'(x_1)&\approx\frac{-3f_0-10f_1+18f_2-6f_3+f_4}{12h},
&R_1&=-\frac{h^4}{20}f^{(5)}(\xi),\\
f'(x_2)&\approx\frac{f_0-8f_1+8f_3-f_4}{12h},
&R_2&=\frac{h^4}{30}f^{(5)}(\xi),\\
f'(x_3)&\approx\frac{-f_0+6f_1-18f_2+10f_3+3f_4}{12h},
&R_3&=-\frac{h^4}{20}f^{(5)}(\xi),\\
f'(x_4)&\approx\frac{3f_0-16f_1+36f_2-48f_3+25f_4}{12h},
&R_4&=\frac{h^4}{5}f^{(5)}(\xi).
\end{aligned}
}
$$

这些公式都是四阶精度。中心公式的误差常数最小，端点公式则适合不能取得区间外函数值的场合。

## 16. 数值微分中的 Richardson 外推

中心差商记为

$$
G_0^{(0)}(h)=\frac{f(x+h)-f(x-h)}{2h}.
$$

由 Taylor 展开，存在偶次幂误差结构

$$
G_0^{(0)}(h)
=f'(x)+\alpha_1h^2+\alpha_2h^4+\alpha_3h^6+\cdots.
$$

步长减半：

$$
G_0^{(0)}\!\left(\frac h2\right)
=f'(x)+\frac{\alpha_1h^2}{4}
+\frac{\alpha_2h^4}{16}+\cdots.
$$

作组合

$$
G_1^{(0)}(h)
=\frac{4G_0^{(0)}(h/2)-G_0^{(0)}(h)}3,
$$

即可消去 $h^2$ 项，得到四阶近似。继续外推，令

$$
G_0^{(k)}
=\frac{f(x+h_k)-f(x-h_k)}{2h_k},
\qquad h_k=\frac h{2^k},
$$

递推式为

$$
\boxed{
G_m^{(k)}
=\frac{4^mG_{m-1}^{(k+1)}-G_{m-1}^{(k)}}{4^m-1},
\qquad m=1,2,\ldots
}.
$$

$m$ 次外推后

$$
f'(x)\approx G_m^{(0)},
\qquad R=O(h^{2m+2}).
$$

可用相邻外推结果之差作为停止指标：

$$
|G_m^{(0)}-G_{m-1}^{(0)}|<\varepsilon.
$$

但还应增加“误差反弹”规则：若继续减小步长后，相邻近似的差反而增大，说明舍入误差开始占主导，应返回上一层较稳定的结果。

下面给出带精度判断和误差反弹判断的实现：

```python
def richardson_derivative(f, x, h=1e-2, levels=8, tol=1e-12):
    """用中心差商和 Richardson 外推近似 f'(x)。"""
    table = [[0.0] * levels for _ in range(levels)]
    previous_change = float("inf")

    for k in range(levels):
        hk = h / (2**k)
        table[k][0] = (f(x + hk) - f(x - hk)) / (2 * hk)

        for m in range(1, k + 1):
            table[k][m] = (
                4**m * table[k][m - 1] - table[k - 1][m - 1]
            ) / (4**m - 1)

        if k > 0:
            change = abs(table[k][k] - table[k - 1][k - 1])
            scale = max(1.0, abs(table[k][k]))
            if change <= tol * scale:
                return table[k][k], [row[: i + 1] for i, row in enumerate(table[: k + 1])]
            if k >= 2 and change > previous_change:
                # 舍入误差开始占主导，返回上一层结果
                return table[k - 1][k - 1], [row[: i + 1] for i, row in enumerate(table[:k])]
            previous_change = change

    return table[levels - 1][levels - 1], table
```

## 17. 样条求导与应用

除了直接用局部插值公式，也可先根据函数值以及可用的导数信息构造三次样条 $S(x)$，再令

$$
f'(x_k)\approx S'(x_k).
$$

三次样条在各子区间上是三次多项式，并满足整体一、二阶导数连续。其节点导数可由三对角方程组求出，适合需要在整段区间上获得平滑导数曲线的情形。

数值求导在机器学习与优化中也很常见：

1. 用中心差商检查自动微分得到的梯度，例如 PyTorch 的 `gradcheck`；
2. 在零阶优化中，只利用函数值估计梯度；
3. 在高维问题中近似 Jacobian 或 Hessian。

需要牢记：数值微分会放大数据噪声。若原始数据来自实验测量，通常应先进行平滑、拟合或正则化，再求导。

## 18. 方法对比与使用建议

| 方法 | 典型精度 | 主要优点 | 主要限制 |
| --- | ---: | --- | --- |
| 复化梯形 | $O(h^2)$ | 简单、可递推复用节点 | 收敛较慢 |
| 复化 Simpson | $O(h^4)$ | 精度与成本平衡较好 | 要求函数较光滑 |
| 复化 Cotes | $O(h^6)$ | 更高阶 | 节点更多，高阶 NC 可能不稳定 |
| Romberg | 逐列提高偶数阶 | 自动外推、光滑函数上很高效 | 对不光滑、振荡和舍入误差敏感 |
| Gauss--Legendre | $n+1$ 点达 $2n+1$ 次精度 | 同节点数下代数精度最高 | 节点不是等距点，增点需重算 |
| Gauss--Chebyshev | $n+1$ 点达 $2n+1$ 次精度 | 天然处理 $1/\sqrt{1-x^2}$ 型奇性 | 只适合相应权函数 |
| 中心差商 | $O(h^2)$ | 简单且误差结构对称 | $h$ 太小会发生消去 |
| 五点中心差分 | $O(h^4)$ | 精度高、误差常数小 | 需要更多邻近数据 |
| Richardson 求导 | 可逐次提高 | 不需显式推导更高阶模板 | 会放大舍入和数据误差 |

实际选择时，可遵循以下原则：

1. 函数光滑且节点可自由选择：优先考虑 Gauss 求积；
2. 需要逐步加密并复用已有计算：使用复化梯形或 Romberg；
3. 函数不光滑：先分段，把奇点、拐点或快速变化位置作为分点；
4. 数值微分优先使用对称节点；端点没有区间外数据时再用单边公式；
5. 积分通常有平滑作用，微分则会放大噪声，因此数值微分对舍入误差和数据误差更敏感。

## 19. PPT 课后习题提示

PPT 最后一页列出了教材习题 3、4、8、12，分别涉及：直接验证 Cotes 公式的五次代数精度；用 Simpson 公式计算 $\int_0^1e^{-x}\,\mathrm dx$ 并估计误差；用 Romberg 方法计算带权/奇异积分并满足给定精度；以及根据函数值表用三点、五点公式计算导数并估计误差。解题时应分别对应本章的“代入单项式检验”“误差上界”“外推表”和“插值型求导余项”。
