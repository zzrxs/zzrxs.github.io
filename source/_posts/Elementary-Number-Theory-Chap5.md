---
title: Elementary Number Theory-Chap5
date: 2026-10-19 21:48:48
updated: 2026-10-19 21:48:48
math: true
categories:
  - Elementary Number Theory
tags:
  - Elementary Number Theory
  - Fermat's Little Theorem
  - Wilson's Theorem
  - Pseudoprime
  - Carmichael Number
description: 初等数论笔记（五）：有限域上的多项式、Fermat 与 Wilson 定理、伪素数和 Carmichael 数
---

当模数 $p$ 为素数时，$\mathbb Z_p$ 是一个 field，非零元素都可逆。这一事实带来多项式根数上界、Fermat's little theorem 与 Wilson's theorem，并进一步产生快速素性检验。不过 Fermat 检验并非完美：pseudoprimes 和 Carmichael numbers 会“伪装”成素数。

<!-- more -->

## 1. 素数模下的多项式根

**定理（Lagrange's Root Bound）** 设 $p$ 为素数，

$$
f(x)=a_dx^d+\cdots+a_1x+a_0\in\mathbb Z[x],
$$

且 $f$ 的系数不全被 $p$ 整除。则同余

$$
f(x)\equiv0\pmod p
$$

至多有 $d$ 个模 $p$ 解类。

**证明** 对 $d$ 归纳。若 $d=0$，则 $p\nmid a_0$，所以没有根。

设结论对次数不超过 $d-1$ 的多项式成立。若 $f$ 没有根，结论显然；否则取一个根 $a$。由 polynomial remainder theorem，存在次数至多为 $d-1$ 的 $g\in\mathbb Z[x]$，使

$$
f(x)-f(a)=(x-a)g(x).
$$

对另一个根 $b$，有

$$
0\equiv f(b)-f(a)equiv(b-a)g(b)\pmod p.
$$

因为 $\mathbb Z_p$ 是 field，没有 zero divisors，所以要么 $b\equiv a\pmod p$，要么 $g(b)\equiv0\pmod p$。

$g$ 的系数不可能全被 $p$ 整除：否则 $f(a)$ 以及 $(x-a)g(x)$ 的全部系数都被 $p$ 整除，进而 $f$ 的全部系数也被 $p$ 整除，与假设矛盾。由归纳假设，$g$ 至多有 $d-1$ 个根，再加上 $a$，$f$ 至多有 $d$ 个根。证毕。

这个定理的条件缺一不可：

- 次数为 $d$ 的多项式可以少于 $d$ 个根；
- 若全部系数被 $p$ 整除，则每个剩余类都是根；
- 若模数为合数，非零 $d$ 次多项式可能有超过 $d$ 个根。例如 $x^2\equiv1$ 在某些合数模数下有许多解。

**推论** 若次数不超过 $d$ 的多项式模素数 $p$ 有超过 $d$ 个根，则其全部系数都被 $p$ 整除。

## 2. 有限群中的 Lagrange's Theorem

设 $G$ 是群，$H\le G$ 是子群。对 $g\in G$，右陪集定义为

$$
Hg=\{hg:h\in H\}.
$$

任意两个右陪集要么相等，要么不交，因此它们把 $G$ 分割。映射 $h\mapsto hg$ 是 $H$ 到 $Hg$ 的双射，所以每个陪集都有 $|H|$ 个元素。

**定理（Lagrange's Theorem）** 若 $H$ 是有限群 $G$ 的子群，则

$$
|G|=|G:H|\,|H|,
$$

其中 $|G:H|$ 是右陪集个数。特别地，$|H|\mid|G|$。

**证明** $G$ 是若干个互不相交的右陪集的并，每个陪集都有 $|H|$ 个元素。按陪集逐块计数即可。证毕。

**推论** 若 $g\in G$，则 $g$ 的阶整除 $|G|$，并且

$$
g^{|G|}=e.
$$

**证明** 对循环子群 $\langle g\rangle$ 使用 Lagrange's theorem。它的大小就是 $g$ 的阶，故整除 $|G|$。证毕。

## 3. Fermat's Little Theorem

**定理（Fermat's Little Theorem）** 若 $p$ 为素数且 $p\nmid a$，则

$$
\boxed{a^{p-1}\equiv1\pmod p}.
$$

**证明** $\mathbb Z_p$ 的所有非零类组成乘法群

$$
\mathbb Z_p^\times=\mathbb Z_p\setminus\{[0]\},
$$

其阶为 $p-1$。对 $[a]\in\mathbb Z_p^\times$ 使用上一节推论，得到 $[a]^{p-1}=[1]$。证毕。

**例** 计算 $11^{111}\pmod{29}$。由于

$$
111=4\cdot28-1,
$$

Fermat's little theorem 给出

$$
11^{111}\equiv11^{-1}\pmod{29}.
$$

又因为 $11\cdot8=88\equiv1\pmod{29}$，所以

$$
\boxed{11^{111}\equiv8\pmod{29}}.
$$

**推论** 若 $p$ 为素数，则对每个整数 $a$，

$$
\boxed{a^p\equiv a\pmod p}.
$$

若 $p\nmid a$，这是将 Fermat 定理两边乘以 $a$；若 $p\mid a$，两边都模 $p$ 同余于 $0$。

关系 $x^p\equiv x\pmod p$ 可以不断降低多项式函数的次数。

**例** 设

$$
f(x)=x^{29}-x^{11}-1.
$$

模 $7$ 时有 $x^7\equiv x$，故

$$
x^{29}=x^{7\cdot4+1}\equiv x^5,
\qquad
x^{11}=x^{7+4}\equiv x^5.
$$

因此

$$
f(x)\equiv x^5-x^5-1\equiv-1\pmod7,
$$

所以 $f(x)\equiv0\pmod7$ 无解。

### 3.1 每个 $\mathbb Z_p$ 上的函数都是多项式函数

**命题** 每个函数 $h:\mathbb Z_p\to\mathbb Z_p$ 都可由一个多项式表示。因此共有

$$
p^p
$$

个不同的多项式函数 $\mathbb Z_p\to\mathbb Z_p$。

**证明** 对 $a\in\mathbb Z_p$，定义

$$
\delta_a(x)=1-(x-a)^{p-1}.
$$

由 Fermat's little theorem，

$$
\delta_a(a)=1,
\qquad
\delta_a(b)=0\quad(b\ne a).
$$

因此

$$
F(x)=\sum_{a\in\mathbb Z_p}h(a)\delta_a(x)
$$

满足 $F(b)=h(b)$ 对每个 $b$ 都成立。这是有限域上的 indicator-polynomial 插值。

一个函数需要给 $p$ 个输入各指定一个值，每个值有 $p$ 种选择，所以函数总数为 $p^p$。证毕。

## 4. Wilson's Theorem

**定理（Wilson's Theorem）** 对整数 $n>1$，

$$
\boxed{(n-1)!\equiv-1\pmod n}
$$

当且仅当 $n$ 为素数。

**证明（素数情形）** 设 $n=p$ 为素数。$p=2$ 时直接成立。若 $p$ 为奇素数，在群 $\mathbb Z_p^\times$ 中把每个元素与其逆元配对。除自逆元外，每一对的乘积都是 $1$。

自逆元满足

$$
x^2\equiv1\pmod p,
$$

即 $(x-1)(x+1)\equiv0\pmod p$。由于 $p$ 为素数，只有 $x\equiv\pm1$ 两个解。因此

$$
(p-1)!\equiv1\cdot(-1)\equiv-1\pmod p.
$$

**证明（反向）** 若 $n$ 为合数，取真因数 $d$，使 $1<d<n$。因为 $d$ 出现在 $(n-1)!$ 的因子中，$d\mid(n-1)!$。若同时有 $n\mid(n-1)!+1$，则 $d\mid(n-1)!+1$，从而 $d$ 整除两数之差 $1$，矛盾。因此合数不满足 Wilson 同余。证毕。

Wilson's theorem 是精确的素性判据，但直接计算 $(n-1)!$ 的代价很高，并不是实用的大整数素性检验。

### 4.1 $-1$ 何时是二次剩余？

**命题** 设 $p$ 为奇素数，则

$$
x^2+1\equiv0\pmod p
$$

有解，当且仅当

$$
p\equiv1\pmod4.
$$

**证明** 令 $k=(p-1)/2$。把 $(p-1)!$ 的前后两半配对：

$$
(p-j)\equiv-j\pmod p,
$$

从而

$$
(p-1)!\equiv(-1)^k(k!)^2\pmod p.
$$

结合 Wilson's theorem，

$$
(k!)^2\equiv(-1)^{k+1}\pmod p.
$$

若 $p\equiv1\pmod4$，则 $k$ 为偶数，于是

$$
(k!)^2\equiv-1\pmod p,
$$

所以 $x\equiv\pm k!$ 给出两个解。

若 $p\equiv3\pmod4$，则 $k$ 为奇数。假设 $x^2\equiv-1\pmod p$，由 Fermat's little theorem，

$$
1\equiv x^{p-1}=(x^2)^k\equiv(-1)^k\equiv-1\pmod p,
$$

矛盾。证毕。

## 5. Fermat Tests 与 Pseudoprimes

Wilson 判据虽然准确，但阶乘计算低效。Fermat 同余可转化为更快的必要条件。

设 $n>1$ 且 $a\in\mathbb Z$。若

$$
a^n\equiv a\pmod n,
$$

就称 $n$ **通过 base-$a$ Fermat test**。若 $n$ 是合数却通过测试，就称 $n$ 是 base-$a$ **pseudoprime**。当 $\gcd(a,n)=1$ 时，条件等价于

$$
a^{n-1}\equiv1\pmod n.
$$

Base $2$ pseudoprime 常被简称为 pseudoprime。

**例**

$$
341=11\cdot31
$$

是合数，但

$$
2^{10}=1024\equiv1\pmod{341}.
$$

因此

$$
2^{341}=2(2^{10})^{34}\equiv2\pmod{341},
$$

所以 $341$ 是 base-$2$ pseudoprime。

### 5.1 Base-$2$ Pseudoprimes 有无穷多个

**引理** 若 $d\mid m$，则

$$
2^d-1\mid2^m-1.
$$

**证明** 写 $m=dt$，并使用

$$
(2^d)^t-1=(2^d-1)(2^{d(t-1)}+\cdots+2^d+1).
$$

证毕。

**定理** 若 $n$ 是奇的 base-$2$ pseudoprime，则

$$
M_n=2^n-1
$$

也是奇的 base-$2$ pseudoprime。

**证明** 因为 $n$ 为合数，取 $1<d<n$ 且 $d\mid n$。由引理，$2^d-1$ 是 $M_n$ 的真因数，所以 $M_n$ 为合数；它显然是奇数。

$n$ 通过 base-$2$ 测试，所以可写

$$
2^n-2=kn.
$$

于是

$$
M_n-1=2^n-2=kn.
$$

又因 $2^n\equiv1\pmod{M_n}$，所以

$$
2^{M_n-1}=2^{kn}=(2^n)^k\equiv1\pmod{M_n}.
$$

因此 $2^{M_n}\equiv2\pmod{M_n}$，即 $M_n$ 也是 base-$2$ pseudoprime。证毕。

从 $n_0=341$ 出发递归定义

$$
n_{r+1}=2^{n_r}-1,
$$

便得到严格递增的 base-$2$ pseudoprime 序列，所以这类伪素数有无穷多个。

## 6. Carmichael Numbers

合数 $n$ 若对每个整数 $a$ 都满足

$$
a^n\equiv a\pmod n,
$$

就称为 **Carmichael number**。对与 $n$ 互素的 $a$，这等价于 $a^{n-1}\equiv1\pmod n$。

Alford、Granville 与 Pomerance 已证明 Carmichael numbers 有无穷多个。

### 6.1 Korselt's Sufficient Criterion

**引理（Korselt's Sufficient Criterion）** 设 $n$ 是 square-free，并且对每个素因数 $p\mid n$ 都有

$$
p-1\mid n-1.
$$

那么 $n$ 要么是素数，要么是 Carmichael number。

**证明** 任取整数 $a$，并固定 $p\mid n$。

- 若 $p\mid a$，则 $a^n\equiv a\equiv0\pmod p$；
- 若 $p\nmid a$，由 Fermat's little theorem，$a^{p-1}\equiv1\pmod p$。又因 $n-1=(p-1)k$，

  $$
  a^n=a(a^{p-1})^k\equiv a\pmod p.
  $$

所以每个素因数 $p\mid n$ 都整除 $a^n-a$。$n$ 是 square-free，各素因数互不相同，故它们的乘积 $n$ 也整除 $a^n-a$。若 $n$ 为合数，它就是 Carmichael number。证毕。

**例**

$$
561=3\cdot11\cdot17
$$

是 square-free，而且

$$
2\mid560,
\qquad
10\mid560,
\qquad
16\mid560.
$$

所以 $561$ 是 Carmichael number；它也是最小的 Carmichael number。

### 6.2 Carmichael Number 必须 Square-Free

**命题** 每个 Carmichael number 都是 square-free。

**证明** 假设存在素数 $p$ 使 $p^2\mid n$。Carmichael 条件必须对整数 $a=p$ 成立，即

$$
p^n\equiv p\pmod n.
$$

这会推出 $p^n\equiv p\pmod{p^2}$。但 $n>1$，所以 $p^n\equiv0\pmod{p^2}$，而 $p\not\equiv0\pmod{p^2}$，矛盾。故不存在平方素因子。证毕。

Korselt criterion 的完整逆命题还断言：每个 Carmichael number 对每个 $p\mid n$ 都满足 $p-1\mid n-1$。其证明需要更深入地使用单位群结构，讲义在此暂不展开。

### 6.3 Freshman's Dream Criterion

**定理（Freshman's Dream Criterion）** 对 $n>1$，恒等同余

$$
(a+b)^n\equiv a^n+b^n\pmod n
$$

对所有整数 $a,b$ 成立，当且仅当 $n$ 是素数或 Carmichael number。

**证明** 若 $n$ 为素数，binomial theorem 中间项的二项式系数都被 $n$ 整除，所以结论成立。

若 $n$ 是 Carmichael number，则

$$
(a+b)^n\equiv a+b\equiv a^n+b^n\pmod n.
$$

反过来，假设所给同余对所有 $a,b$ 成立。从 $0^n\equiv0$ 开始，并在同余中取 $a=m,b=1$，归纳得到

$$
(m+1)^n\equiv m^n+1\equiv m+1\pmod n
$$

对每个非负整数 $m$ 成立。每个模 $n$ 剩余类都有非负代表元，因此

$$
a^n\equiv a\pmod n
$$

对每个整数 $a$ 都成立。于是 $n$ 若为合数就是 Carmichael number，否则为素数。证毕。

## 7. Fast Modular Exponentiation

直接计算 $a^m$ 再取模会产生极大的中间数。Square-and-multiply 使用 $m$ 的二进制展开，在每一步都取模，只需 $O(\log m)$ 次平方与乘法。

从左到右读 $m$ 的二进制位，初始令 $y=1$。每读一位：

1. 把 $y$ 替换为 $y^2\bmod n$；
2. 若当前位为 $1$，再把 $y$ 替换为 $ay\bmod n$。

最终 $y\equiv a^m\pmod n$。

**例** 因为

$$
341=(101010101)_2,
$$

计算 $2^{341}\pmod{341}$ 时，每一步所得结果依次为

$$
2,4,32,1,2,4,32,1,2.
$$

所以

$$
2^{341}\equiv2\pmod{341},
$$

整个过程从未真正构造巨大的整数 $2^{341}$。

## 8. 小结

素数模数使 $\mathbb Z_p$ 成为 field，从而有：

$$
\deg f=d\Longrightarrow f\text{ 至多有 }d\text{ 个根},
$$

$$
a^{p-1}\equiv1\pmod p\quad(p\nmid a),
$$

$$
(p-1)!\equiv-1\pmod p.
$$

Fermat 同余适合快速筛除合数，但通过测试不等于素数，因为存在 pseudoprimes，甚至存在对所有底数都通过测试的 Carmichael numbers。实际计算中应把 Fermat 思想与更强的检验结合，而 fast modular exponentiation 是这些算法的基本计算工具。
