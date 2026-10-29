---
title: Elementary Number Theory-Chap2
date: 2026-10-19 21:29:01
updated: 2026-10-19 21:29:01
math: true
categories:
  - Elementary Number Theory
tags:
  - Elementary Number Theory
  - Prime Numbers
  - Fundamental Theorem of Arithmetic
  - Mersenne Prime
  - Fermat Number
description: Elementary Number Theory Notes (2):Prime factorization, Infinitude and distribution of prime numbers, Fermat numbers and Mersenne numbers
---

素数是整数乘法结构的“原子”。本章先证明 Fundamental Theorem of Arithmetic，说明每个正整数都能且只能以一种方式分解为素数幂；随后讨论素数的无穷性与总体分布，并介绍 Fermat numbers、Mersenne numbers 及若干相关结论。

<!-- more -->

## 1. 素数与试除法

整数 $p>1$ 若只有 $1,p$ 两个正因数，就称为 **prime**；大于 $1$ 而非素数的整数称为 **composite**。

### 1.1 Trial-Division Criterion

**命题（Trial-Division Criterion）** 整数 $n>1$ 是合数，当且仅当它有一个满足

$$
p\le\sqrt n
$$

的素因数 $p$。

**证明** 若 $n$ 是合数，可写成 $n=ab$，其中 $1<a\le b<n$。若 $a>\sqrt n$，则 $b\ge a>\sqrt n$，从而 $ab>n$，矛盾，所以 $a\le\sqrt n$。取 $a$ 的任一素因数 $p$，便有 $p\le a\le\sqrt n$ 且 $p\mid n$。

反过来，若 $n$ 有素因数 $p\le\sqrt n<n$，则 $p$ 是 $n$ 的真因数，故 $n$ 为合数。证毕。

因此判断 $n$ 是否为素数，只需试除不超过 $\sqrt n$ 的素数。但从计算复杂度看，若 $N$ 有 $B$ 个二进制位，则 $\sqrt N\approx2^{B/2}$，试除法对位数而言仍是指数级的。

现代背景中，Miller–Rabin 是高效的随机素性检验，Agrawal–Kayal–Saxena（AKS）给出了确定性的多项式时间素性检验。一般整数分解则困难得多：目前不知道经典计算机上的通用多项式时间算法；Pollard's rho 适合寻找较小因子，而 Shor's algorithm 在足够强的容错量子计算机上可在多项式时间内完成分解。

## 2. Fundamental Theorem of Arithmetic

### 2.1 素数版 Euclid's Lemma

**引理** 若 $p$ 是素数且

$$
p\mid a_1a_2\cdots a_k,
$$

则至少存在一个 $i$ 使 $p\mid a_i$。

**证明** 先证 $k=2$。若 $p\mid ab$ 而 $p\nmid a$，因为 $p$ 为素数，必有 $\gcd(p,a)=1$。由 Euclid's lemma 得 $p\mid b$。一般情形对因子个数归纳即可。证毕。

### 2.2 算术基本定理

**定理（Fundamental Theorem of Arithmetic）** 每个整数 $n\ge2$ 都可以写成

$$
n=p_1^{e_1}\cdots p_r^{e_r},
$$

其中 $p_1,\ldots,p_r$ 是互不相同的素数，$e_1,\ldots,e_r$ 为正整数。除去素因子的排列顺序，这种分解唯一。整数 $1$ 对应空乘积。

**证明（存在性）** 对 $n$ 作强归纳。若 $n$ 为素数，结论显然。若 $n$ 为合数，则 $n=ab$，其中 $1<a,b<n$。由归纳假设，$a,b$ 都能分解成素数的乘积，合并两组分解便得到 $n$ 的素因数分解。

**证明（唯一性）** 暂时允许素因子重复，设

$$
p_1p_2\cdots p_s=q_1q_2\cdots q_t
$$

是两种素数分解。左边的 $p_1$ 整除右边的乘积，由上一引理，$p_1$ 必整除某个 $q_j$。两个数都是素数，所以 $p_1=q_j$。约去这一公共因子，再对剩余因子数归纳，最终两边的素因子连同重数完全一致。证毕。

### 2.3 用素因数指数计算 gcd 与 lcm

把正整数统一写为

$$
a=\prod_p p^{\alpha_p},
\qquad
b=\prod_p p^{\beta_p},
$$

其中只有有限多个指数非零，则

$$
\boxed{
\gcd(a,b)=\prod_p p^{\min(\alpha_p,\beta_p)},
\qquad
\operatorname{lcm}(a,b)=\prod_p p^{\max(\alpha_p,\beta_p)}.
}
$$

原因是：一个正整数整除另一个正整数，当且仅当前者的每个素因数指数都不超过后者的对应指数。

**例**

$$
360=2^3\cdot3^2\cdot5,
\qquad
168=2^3\cdot3\cdot7.
$$

所以

$$
\gcd(360,168)=2^3\cdot3=24,
$$

$$
\operatorname{lcm}(360,168)=2^3\cdot3^2\cdot5\cdot7=2520.
$$

**引理** 若 $a_1,\ldots,a_r$ 是两两互素的正整数，且 $a_1\cdots a_r$ 是一个 $m$ 次幂，则每个 $a_i$ 都是 $m$ 次幂。

**证明** 两两互素意味着任一素数至多出现在一个 $a_i$ 的素因数分解中。乘积是 $m$ 次幂，故乘积中每个素因数的指数都被 $m$ 整除；这些指数不会分散到不同的 $a_i$，因此每个 $a_i$ 中的指数也都被 $m$ 整除。证毕。

**推论** 若正整数 $N$ 不是完全平方数，则 $\sqrt N$ 是无理数。

**证明** 假设 $\sqrt N=a/b$，其中 $a,b$ 为互素正整数，则 $a^2=Nb^2$。左边每个素因数的指数都是偶数；但 $N$ 不是平方数，所以 $N$ 中至少有一个素因数的指数为奇数，乘上 $b^2$ 后仍为奇数，矛盾。证毕。

## 3. 素数有无穷多个

**定理（Euclid）** 素数有无穷多个。

**证明** 假设全部素数只有 $p_1,\ldots,p_r$，考虑

$$
N=p_1p_2\cdots p_r+1.
$$

$N>1$，所以 $N$ 至少有一个素因数。但对每个 $i$，$N$ 除以 $p_i$ 的余数都是 $1$，故没有任何 $p_i$ 能整除 $N$。这与 $p_1,\ldots,p_r$ 已列出全部素数矛盾。证毕。

素数虽然无穷，却可能出现任意长的连续合数段。给定 $r\ge1$，下面 $r$ 个相邻整数

$$
(r+1)!+2,(r+1)!+3,\ldots,(r+1)!+(r+1)
$$

全是合数，因为第 $j$ 个数可被 $j$ 整除。

Twin-prime conjecture 猜想存在无穷多对相差 $2$ 的素数 $p,p+2$，至今仍未解决。

### 3.1 算术级数中的素数

**定理（Dirichlet's Theorem on Arithmetic Progressions）** 若正整数 $a,b$ 互素，则形如

$$
aq+b
$$

的素数有无穷多个。

这是比 Euclid 定理深得多的结果，本课程在此只引用而不证明。不过，$4q+3$ 的特殊情形可用初等方法处理。

**命题** 形如 $4q+3$ 的素数有无穷多个。

**证明** 假设只有 $p_1,\ldots,p_r$ 这些 $4q+3$ 型素数，令

$$
N=4p_1p_2\cdots p_r-1.
$$

则 $N\equiv3\pmod4$。$N$ 的素因数分解中必有至少一个素因数 $p\equiv3\pmod4$；否则所有奇素因子都模 $4$ 同余于 $1$，它们的乘积也只能同余于 $1$。因此 $p$ 必等于某个 $p_i$。但 $p_i$ 同时整除 $4p_1\cdots p_r$ 和 $N$，从而整除两者之差 $1$，矛盾。证毕。

同样的思路可以证明形如 $3q+2$ 的素数也有无穷多个。

另一个深刻结果是 **Green–Tao Theorem**：对每个正整数 $k$，素数中都存在长度为 $k$ 的等差数列。

## 4. 素数如何分布

记

$$
\pi(x)=\#\{p\le x:p\text{ 为素数}\}.
$$

**定理（Prime Number Theorem）** 当 $x\to\infty$ 时，

$$
\boxed{\pi(x)\sim\frac{x}{\log x}},
$$

即

$$
\lim_{x\to\infty}\frac{\pi(x)}{x/\log x}=1.
$$

它由 Hadamard 与 de la Vallée Poussin 于 1896 年独立证明。本章只把它作为素数分布的背景结论。特别地，

$$
\frac{\pi(x)}{\lfloor x\rfloor}\longrightarrow0,
$$

所以素数虽然有无穷多个，却在自然数中具有自然密度 $0$。

**Bertrand's Postulate** 断言：对每个整数 $n>1$，都存在素数 $p$ 满足

$$
n<p<2n.
$$

比 $x/\log x$ 更精确的常用近似是 logarithmic integral

$$
\operatorname{Li}(x)=\int_2^x\frac{dt}{\log t}.
$$

Littlewood 证明 $\pi(x)-\operatorname{Li}(x)$ 会无穷多次变号。von Koch 的经典结果则指出，Riemann hypothesis 等价于误差估计

$$
\pi(x)=\operatorname{Li}(x)+O(\sqrt x\log x).
$$

这些属于 analytic number theory，在此不展开证明。

## 5. Fermat Numbers

### 5.1 为什么指数必须是 $2$ 的幂？

**引理** 若 $2^m+1$ 是素数，则 $m=2^s$，其中 $s\ge0$。

**证明** 写 $m=2^sq$，其中 $q$ 为奇数。若 $q>1$，令 $x=2^{2^s}$，则

$$
2^m+1=x^q+1.
$$

奇数 $q$ 满足 $x+1\mid x^q+1$，因此 $2^{2^s}+1$ 是 $2^m+1$ 的真因数，和后者为素数矛盾。所以 $q=1$。证毕。

定义 **Fermat numbers**

$$
F_s=2^{2^s}+1,\qquad s\ge0.
$$

若 $F_s$ 为素数，则称为 Fermat prime。

**引理** 不同的 Fermat numbers 两两互素。

**证明** 归纳可得恒等式

$$
F_0F_1\cdots F_{n-1}=F_n-2.
$$

因此 $F_n$ 与任一较早的 $F_j$ 的公因数都整除 $2$。所有 Fermat numbers 都是奇数，所以最大公因数只能是 $1$。证毕。

这也给出素数无穷性的另一证明：从每个 $F_n$ 中选一个素因数，两两互素保证选出的素因数互不相同。

Gauss 证明：若

$$
n=2^ep_1\cdots p_r,
$$

其中 $p_i$ 是互不相同的 Fermat primes，则正 $n$ 边形可由尺规作出；Wantzel 后来证明该条件也是必要的。

## 6. Mersenne Numbers

定义 **Mersenne numbers**

$$
M_n=2^n-1,\qquad n\ge2.
$$

若 $M_n$ 为素数，则称为 Mersenne prime。

**命题** 若 $a>1,m>1$ 且 $a^m-1$ 为素数，则 $a=2$ 且 $m$ 为素数。

**证明** 因为

$$
a^m-1=(a-1)(a^{m-1}+a^{m-2}+\cdots+1),
$$

若乘积为素数，只能有 $a-1=1$，即 $a=2$。若 $m=rs$ 且 $r,s>1$，则 $2^r-1$ 是 $2^{rs}-1$ 的真因数，仍与素性矛盾。证毕。

所以 $M_n$ 为素数时 $n$ 必须为素数，但反命题不成立，例如

$$
M_{11}=2^{11}-1=2047=23\cdot89.
$$

### 6.1 Mersenne Numbers 的 gcd

**命题** 对正整数 $m,n$，

$$
\boxed{\gcd(2^m-1,2^n-1)=2^{\gcd(m,n)}-1}.
$$

**证明** 对指数执行 Euclidean algorithm。若 $m=qn+r$，则

$$
2^m-1=2^r(2^{qn}-1)+(2^r-1).
$$

又有 $2^n-1\mid2^{qn}-1$，所以

$$
\gcd(2^m-1,2^n-1)
=\gcd(2^n-1,2^r-1).
$$

这正是把指数对 $(m,n)$ 变为 $(n,r)$。不断迭代，最后得到指数的最大公因数 $d=\gcd(m,n)$，于是结果为 $2^d-1$。证毕。

特别地，若 $m,n$ 是不同的素数，则 $\gcd(m,n)=1$，故 $M_m,M_n$ 互素。

讲义还提到 Pierpont primes：形如 $2^m3^n+1$ 的素数；形如 $2^m3^n-1$ 的素数有时称为 second-kind Pierpont primes。关于是否存在无穷多对

$$
(2^m3^n-1,\ 2^m3^n+1)
$$

同时为素数，仍应视为开放问题，不能当成已知结论。

## 7. 小结

本章的核心是素因数分解的存在性与唯一性：存在性来自强归纳，唯一性依赖 prime version of Euclid's lemma。它把整除问题转化成素因数指数的逐项比较，并解释了 gcd、lcm、完全幂与无理数判别。

关于素数的总体图景则是：素数有无穷多个，却越来越稀疏；$\pi(x)$ 的主项为 $x/\log x$。Fermat numbers 与 Mersenne numbers 展示了特殊形式整数中因式分解、互素性和素性之间的精细联系。
