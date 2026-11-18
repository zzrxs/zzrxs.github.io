---
title: Elementary Number Theory-Chap9
date: 2026-11-17 15:22:10
updated: 2026-11-17 15:22:10
math: true
categories:
  - Elementary Number Theory
tags:
  - Elementary Number Theory
  - Quadratic Residue
  - Legendre Symbol
  - Euler's Criterion
  - Gauss's Lemma
description: "Elementary Number Theory Notes (9): Quadratic Residues, Legendre Symbols, Euler's Criterion and Gauss's Lemma"
---

上一章研究了 power congruence 与 Hensel lifting。本章把注意力集中到最重要的幂同余之一：

$$
x^2\equiv a\pmod n.
$$

我们先讨论合数模数下的 quadratic residue，再把模奇素数时“是否为平方”编码成 Legendre symbol。Euler's criterion 给出适合计算的幂判别法，Gauss's lemma 则从最小绝对剩余的符号变化解释同一个问题，并导出关于 $-1$ 与 $2$ 的两个 supplementary laws。

<!-- more -->

## 1. 合数模数下的 Quadratic Residues

### 1.1 Completing the Square

在实数或复数范围内，解二次方程通常先配方。模运算中也可以这样做，但除法必须格外小心：只有可逆元素才能被“除掉”。

考虑

$$
ax^2+bx+c\equiv0\pmod n.
$$

令判别式

$$
\Delta=b^2-4ac.
$$

**命题（Completing the Square）** 若

$$
\gcd(2a,n)=1,
$$

则映射

$$
x\longmapsto s=2ax+b
$$

在下列两个解集之间建立一一对应：

$$
ax^2+bx+c\equiv0\pmod n
$$

与

$$
s^2\equiv\Delta\pmod n.
$$

对应的反向公式是

$$
\boxed{
x\equiv(s-b)(2a)^{-1}\pmod n.
}
$$

**证明** 直接展开得到恒等式

$$
\begin{aligned}
(2ax+b)^2-\Delta
&=4a^2x^2+4abx+b^2-(b^2-4ac)\\
&=4a(ax^2+bx+c).
\end{aligned}
$$

因此，若 $x$ 满足原二次同余，则

$$
(2ax+b)^2\equiv\Delta\pmod n.
$$

反过来，若 $s=2ax+b$ 且 $s^2\equiv\Delta\pmod n$，则

$$
4a(ax^2+bx+c)\equiv0\pmod n.
$$

条件 $\gcd(2a,n)=1$ 保证 $2a$ 是模 $n$ 的单位，于是 $4a$ 也是单位，可以在同余两边约去，得到

$$
ax^2+bx+c\equiv0\pmod n.
$$

此外，$2a$ 可逆，所以 affine map

$$
x\mapsto2ax+b
$$

本身是模 $n$ 剩余类上的双射，其逆映射正是

$$
x\equiv(s-b)(2a)^{-1}\pmod n.
$$

故两个方程不仅同时可解，而且解的个数完全相同。证毕。

#### 为什么需要 $\gcd(2a,n)=1$？

这个条件承担了两个作用：

1. 允许从 $4aF(x)\equiv0\pmod n$ 推出 $F(x)\equiv0\pmod n$；
2. 保证 $x\mapsto2ax+b$ 不会把多个不同的 $x$ 压到同一个 $s$ 上。

如果 $2a$ 不可逆，配方恒等式仍然成立，但它未必给出解集之间的一一对应。

#### 例：解一个二次同余

求解

$$
3x^2+4x+1\equiv0\pmod{11}.
$$

这里

$$
\gcd(2\cdot3,11)=1,
\qquad
\Delta=4^2-4\cdot3\cdot1=4.
$$

先求

$$
s^2\equiv4\pmod{11},
$$

得到

$$
s\equiv2,\,-2\equiv9\pmod{11}.
$$

又因为

$$
(2a)^{-1}=6^{-1}\equiv2\pmod{11},
$$

所以

$$
x\equiv(s-4)\cdot2\pmod{11}.
$$

分别代入两个 $s$：

$$
\begin{aligned}
s=2&:\quad x\equiv(2-4)\cdot2\equiv7\pmod{11},\\
s=9&:\quad x\equiv(9-4)\cdot2\equiv10\pmod{11}.
\end{aligned}
$$

因此

$$
\boxed{x\equiv7,10\pmod{11}}.
$$

### 1.2 二次剩余的定义

记

$$
U_n=(\mathbb Z/n\mathbb Z)^\times
$$

为模 $n$ 的单位群。

**定义** 若 $a\in U_n$，并且存在 $s\in U_n$ 使

$$
a\equiv s^2\pmod n,
$$

则称 $a$ 是模 $n$ 的 **quadratic residue**。所有模 $n$ 的单位二次剩余组成的集合记为

$$
Q_n.
$$

不属于 $Q_n$ 的单位称为 quadratic nonresidue。

这里把 $a$ 限制为单位并不会遗漏平方根的单位性。事实上，若 $a$ 是单位且

$$
s^2\equiv a\pmod n,
$$

取 $a^{-1}$ 后有

$$
s(sa^{-1})\equiv1\pmod n.
$$

因此 $s$ 也有逆元，自动属于 $U_n$。

例如：

$$
Q_{11}=\{1,3,4,5,9\}.
$$

这是因为

$$
1^2,2^2,3^2,4^2,5^2
\equiv1,4,9,5,3\pmod{11},
$$

而 $6,\ldots,10$ 的平方会重复这些结果。

再如，模 $12$ 的单位为

$$
U_{12}=\{1,5,7,11\},
$$

并且每一个单位的平方都满足

$$
1^2\equiv5^2\equiv7^2\equiv11^2\equiv1\pmod{12}.
$$

所以

$$
Q_{12}=\{1\}.
$$

这说明模合数时，一个 quadratic residue 的平方根个数可能远多于两个。

### 1.3 Squaring Map 与平方根个数

考虑映射

$$
\theta:U_n\longrightarrow Q_n,
\qquad
\theta(s)=s^2.
$$

**引理** 映射 $\theta$ 是满射群同态，其 kernel 为

$$
\ker\theta
=\{s\in U_n:s^2\equiv1\pmod n\}.
$$

因此

$$
\boxed{
U_n/\ker\theta\cong Q_n
}
$$

并且

$$
\boxed{
|Q_n|=\frac{\varphi(n)}{|\ker\theta|}.
}
$$

此外，每一个 $a\in Q_n$ 都恰有 $|\ker\theta|$ 个模 $n$ 的单位平方根。

**证明** 因为 $U_n$ 是 abelian group，

$$
\theta(st)=(st)^2=s^2t^2=\theta(s)\theta(t),
$$

所以 $\theta$ 是群同态。它的像按照 $Q_n$ 的定义就是全部 $Q_n$，因此是满射。

一个元素 $s$ 落在 kernel 中，当且仅当

$$
\theta(s)=1,
$$

也就是

$$
s^2\equiv1\pmod n.
$$

由 First Isomorphism Theorem，

$$
U_n/\ker\theta\cong\operatorname{Im}\theta=Q_n.
$$

取群的大小便得

$$
|Q_n|
=\frac{|U_n|}{|\ker\theta|}
=\frac{\varphi(n)}{|\ker\theta|}.
$$

最后固定 $a\in Q_n$，任取它的一个平方根 $s_0$。对任意 $s\in U_n$，

$$
s^2\equiv a\pmod n
$$

当且仅当

$$
(ss_0^{-1})^2\equiv1\pmod n.
$$

也就是说，所有平方根恰好是

$$
s_0\ker\theta
$$

这个 coset 中的元素，因此平方根个数等于 $|\ker\theta|$。证毕。

#### 这个结论在表达什么？

Squaring map 把 $U_n$ 中相差一个 $x^2\equiv1$ 的解的元素识别在一起。每个 quadratic residue 的原像都是 kernel 的一个 coset，所以所有 quadratic residue 的平方根个数都相同。

例如模 $11$ 时，

$$
\ker\theta=\{1,10\},
$$

故每个非零平方都有两个根，即 $\pm s$。模 $12$ 时，

$$
\ker\theta=U_{12},
$$

所以唯一的 quadratic residue $1$ 有四个单位平方根。

### 1.4 CRT：把合数模问题拆成局部问题

**引理** 设

$$
n=n_1n_2\cdots n_r,
$$

其中 $n_i$ 两两互素。对任意 $a\in U_n$，

$$
\boxed{
a\in Q_n
\iff
a\in Q_{n_i}\quad\text{对每个 }i.
}
$$

等价地，

$$
\boxed{
Q_n\cong Q_{n_1}\times\cdots\times Q_{n_r}.
}
$$

**证明** 由 Chinese Remainder Theorem，

$$
U_n\cong U_{n_1}\times\cdots\times U_{n_r}.
$$

若

$$
a\equiv s^2\pmod n,
$$

则约化到每个模 $n_i$ 后都有

$$
a\equiv s^2\pmod{n_i},
$$

所以 $a$ 在每个局部模数上都是平方。

反过来，若对每个 $i$ 都存在 $s_i$ 满足

$$
s_i^2\equiv a\pmod{n_i},
$$

CRT 给出唯一的模 $n$ 剩余类 $s$，使

$$
s\equiv s_i\pmod{n_i}
$$

对所有 $i$ 成立。于是

$$
s^2\equiv a\pmod{n_i}
$$

对所有 $i$ 成立，再由 CRT 得

$$
s^2\equiv a\pmod n.
$$

证毕。

这个结论说明，判断模合数 $n$ 的单位是否为平方，只需：

1. 把 $n$ 分解成互素的 prime powers；
2. 在每个 prime-power modulus 上分别判断；
3. 用 CRT 把局部平方根组合起来。

#### 例：$Q_8,Q_{16},Q_{24},Q_{45}$

模 $8$ 时每个奇数的平方都同余于 $1$，所以

$$
Q_8=\{1\}.
$$

方程 $x^2\equiv1\pmod8$ 有

$$
x\equiv1,3,5,7\pmod8
$$

四个解，因此每个 $Q_8$ 中的元素有 $4$ 个平方根。

模 $16$ 时，

$$
Q_{16}=\{1,9\},
$$

并且

$$
\ker\theta=\{1,7,9,15\}.
$$

因此每个 quadratic residue 有 $4$ 个平方根。

因为

$$
24=8\cdot3,
\qquad
Q_8=\{1\},
\qquad
Q_3=\{1\},
$$

CRT 给出

$$
Q_{24}=\{1\}.
$$

此时

$$
|\ker\theta|
=|\ker(U_8\to Q_8)|\cdot|\ker(U_3\to Q_3)|
=4\cdot2=8,
$$

所以 $1$ 在模 $24$ 下有 $8$ 个单位平方根。

最后，

$$
45=9\cdot5.
$$

有

$$
Q_9=\{1,4,7\},
\qquad
Q_5=\{1,4\}.
$$

将局部条件用 CRT 组合，得到

$$
Q_{45}=\{1,4,16,19,31,34\}.
$$

模 $9$ 与模 $5$ 的每个非零平方各有两个根，所以模 $45$ 的每个 quadratic residue 有

$$
2\cdot2=4
$$

个平方根。

### 1.5 存在 Primitive Root 的模数

若 $n>2$ 且模 $n$ 存在 primitive root $g$，则

$$
U_n=\langle g\rangle
$$

是阶为

$$
N=\varphi(n)
$$

的 cyclic group。因为 $N$ 是偶数，所有平方恰好是 $g$ 的偶次幂。

**引理** 若 $n>2$ 存在 primitive root $g$，则

$$
\boxed{
Q_n=\langle g^2\rangle
}
$$

是阶为

$$
\boxed{\frac{\varphi(n)}2}
$$

的 cyclic group。

**证明** 任意单位可写成 $g^j$。它的平方是

$$
(g^j)^2=g^{2j},
$$

所以每个平方都是 $g$ 的偶次幂；反过来每个 $g^{2j}$ 都明显是 $(g^j)^2$。因此

$$
Q_n=\langle g^2\rangle.
$$

又因为 $\operatorname{ord}(g)=N$，

$$
\operatorname{ord}(g^2)
=\frac{N}{\gcd(N,2)}
=\frac N2.
$$

证毕。

### 1.6 奇素数幂与 $2$ 的幂

**引理** 设 $p$ 是奇素数，$e\ge1$，且 $p\nmid a$。则

$$
\boxed{
a\in Q_{p^e}
\iff
a\in Q_p.
}
$$

**证明** 若 $a$ 是模 $p^e$ 的平方，把同余约化到模 $p$，它自然仍是平方。

反过来，若

$$
x^2\equiv a\pmod p,
$$

因为 $p\nmid a$，所以 $p\nmid x$。对多项式

$$
f(X)=X^2-a
$$

有

$$
f'(x)=2x\not\equiv0\pmod p.
$$

由 Hensel's lemma，这个模 $p$ 的根可以唯一提升为模 $p^e$ 的根。因此 $a$ 是模 $p^e$ 的平方。证毕。

这条引理非常重要：对奇素数幂而言，判断单位是否为平方只需查看它模 $p$ 的结果，指数 $e$ 不会增加新的可解性障碍。

对于 $2$ 的幂，情况不同。

**引理** 设 $a$ 为奇数，则：

$$
\begin{array}{c|c}
\text{模数}&a\text{ 是平方的条件}\\
\hline
2&\text{总是成立}\\
4&a\equiv1\pmod4\\
2^e,\ e\ge3&a\equiv1\pmod8
\end{array}
$$

**证明** 模 $2$ 与模 $4$ 的情形可以直接枚举。

当 $e\ge3$ 时，任意奇数可写成 $2k+1$，其平方为

$$
(2k+1)^2=4k(k+1)+1.
$$

由于 $k(k+1)$ 为偶数，

$$
(2k+1)^2\equiv1\pmod8.
$$

所以 $a\equiv1\pmod8$ 是必要条件。

反过来，前一章已经得到

$$
U_{2^e}=\{\pm5^j:0\le j<2^{e-2}\}.
$$

其中 $5$ 的阶为 $2^{e-2}$，所以 $5^2$ 的阶为 $2^{e-3}$。因此

$$
5^{2j},
\qquad
0\le j<2^{e-3},
$$

给出 $2^{e-3}$ 个不同的平方，并且它们都同余于 $1\pmod8$。

另一方面，模 $2^e$ 恰有 $2^{e-3}$ 个剩余类同余于 $1\pmod8$。既然已经找到了这么多个不同平方，它们必定覆盖全部这些剩余类。充分性成立。证毕。

### 1.7 一般模数的完整判别

**定理** 写成 prime-power factorization

$$
n=2^f\prod_{j=1}^r p_j^{e_j},
$$

其中 $p_j$ 是互不相同的奇素数，且 $a\in U_n$。则

$$
a\in Q_n
$$

当且仅当同时满足：

1. 对每个 $j$，

   $$
   a\in Q_{p_j};
   $$

2. $2$-part 满足

   $$
   \begin{cases}
   \text{没有额外条件},&f=0\text{ 或 }1,\\
   a\equiv1\pmod4,&f=2,\\
   a\equiv1\pmod8,&f\ge3.
   \end{cases}
   $$

**证明** 先由 CRT 把模 $n$ 的平方问题拆成各个 prime-power modulus 上的问题。

对于每个奇素数幂 $p_j^{e_j}$，上一引理说明

$$
a\in Q_{p_j^{e_j}}
\iff
a\in Q_{p_j}.
$$

对于 $2^f$，直接使用上一节给出的分类。把所有局部条件合并即得结论。证毕。

## 2. Legendre Symbol 与 Euler's Criterion

### 2.1 Legendre Symbol

从现在起设 $p$ 是奇素数。

**定义** 对整数 $a$，Legendre symbol 定义为

$$
\boxed{
\left(\frac ap\right)
=
\begin{cases}
0,&p\mid a,\\
1,&p\nmid a\text{ 且 }a\in Q_p,\\
-1,&p\nmid a\text{ 且 }a\notin Q_p.
\end{cases}
}
$$

它只依赖于 $a$ 模 $p$ 的剩余类。

因此 Legendre symbol 把三种情况压缩成一个数字：

- $0$ 表示 $a$ 不是单位；
- $1$ 表示 $a$ 是非零平方；
- $-1$ 表示 $a$ 是非零非平方。

若 $g$ 是模 $p$ 的 primitive root，则

$$
Q_p
=\{g^{2j}:0\le j<(p-1)/2\}.
$$

于是

$$
\boxed{
\left(\frac{g^j}{p}\right)=(-1)^j.
}
$$

换言之，primitive root 的偶次幂是 quadratic residues，奇次幂是 quadratic nonresidues。

### 2.2 Multiplicativity

**定理（Multiplicativity）** 对任意奇素数 $p$ 及整数 $a,b$，

$$
\boxed{
\left(\frac{ab}{p}\right)
=
\left(\frac ap\right)
\left(\frac bp\right).
}
$$

等价地，限制在单位群上的映射

$$
U_p\longrightarrow\{\pm1\},
\qquad
[a]_p\longmapsto\left(\frac ap\right)
$$

是满射群同态，其 kernel 为 $Q_p$。

**证明** 若 $p\mid ab$，由于 $p$ 是素数，

$$
p\mid a
\quad\text{或}\quad
p\mid b.
$$

此时等式两边都为 $0$。

现在假设 $p\nmid ab$。取 primitive root $g$，写成

$$
a\equiv g^i\pmod p,
\qquad
b\equiv g^j\pmod p.
$$

于是

$$
ab\equiv g^{i+j}\pmod p.
$$

由指数奇偶性，

$$
\begin{aligned}
\left(\frac{ab}{p}\right)
&=(-1)^{i+j}\\
&=(-1)^i(-1)^j\\
&=\left(\frac ap\right)\left(\frac bp\right).
\end{aligned}
$$

映射值为 $1$ 的元素恰好是 $g$ 的偶次幂，也就是 $Q_p$。证毕。

#### 乘法性有什么用？

它允许我们先分解整数，再分别判断。例如

$$
\left(\frac{12}{p}\right)
=
\left(\frac3p\right)
\left(\frac4p\right)
=
\left(\frac3p\right),
$$

因为 $4$ 是平方，所以当 $p\nmid2$ 时

$$
\left(\frac4p\right)=1.
$$

注意 Legendre symbol 对加法没有类似的简单规则。

### 2.3 Euler's Criterion

**定理（Euler's Criterion）** 设 $p$ 是奇素数。对任意整数 $a$，

$$
\boxed{
a^{(p-1)/2}
\equiv
\left(\frac ap\right)
\pmod p.
}
$$

**证明** 若 $p\mid a$，则左边模 $p$ 为 $0$，右边按照定义也是 $0$。

以下设 $p\nmid a$。取模 $p$ 的 primitive root $g$，写

$$
a\equiv g^j\pmod p.
$$

元素

$$
g^{(p-1)/2}
$$

的阶为 $2$。模奇素数 $p$ 的方程

$$
x^2\equiv1\pmod p
$$

只有 $x\equiv\pm1$ 两个解；其中阶为 $2$ 的非单位元只能是 $-1$。所以

$$
g^{(p-1)/2}\equiv-1\pmod p.
$$

于是

$$
\begin{aligned}
a^{(p-1)/2}
&\equiv g^{j(p-1)/2}\\
&\equiv(-1)^j\\
&=\left(\frac ap\right)
\pmod p.
\end{aligned}
$$

证毕。

**推论** 若 $p\nmid a$，则

$$
\boxed{
a\in Q_p
\iff
a^{(p-1)/2}\equiv1\pmod p.
}
$$

若 $a$ 是 quadratic nonresidue，则

$$
a^{(p-1)/2}\equiv-1\pmod p.
$$

Euler's criterion 把“是否存在平方根”转化为一次 modular exponentiation，特别适合用 repeated squaring 计算。

#### 例：判断 $7$ 是否为模 $13$ 的平方

计算

$$
7^{(13-1)/2}=7^6.
$$

利用 repeated squaring，

$$
7^2\equiv10\pmod{13},
\qquad
7^4\equiv10^2\equiv9\pmod{13},
$$

所以

$$
7^6\equiv7^4\cdot7^2
\equiv9\cdot10
\equiv12
\equiv-1\pmod{13}.
$$

因此

$$
\left(\frac7{13}\right)=-1,
$$

方程

$$
x^2\equiv7\pmod{13}
$$

无解。

### 2.4 First Supplementary Law

**推论（The First Supplementary Law）** 对任意奇素数 $p$，

$$
\boxed{
\left(\frac{-1}{p}\right)=(-1)^{(p-1)/2}.
}
$$

因此

$$
\boxed{
-1\in Q_p
\iff
p\equiv1\pmod4.
}
$$

**证明** 在 Euler's criterion 中取 $a=-1$：

$$
(-1)^{(p-1)/2}
\equiv
\left(\frac{-1}{p}\right)
\pmod p.
$$

两边都是 $\pm1$。由于 $p$ 是奇素数，这两个整数若模 $p$ 同余就必须相等。

当 $p\equiv1\pmod4$ 时，$(p-1)/2$ 为偶数，符号为 $1$；当 $p\equiv3\pmod4$ 时，$(p-1)/2$ 为奇数，符号为 $-1$。证毕。

#### 一个容易出现的符号错误

由乘法性，

$$
\boxed{
\left(\frac{-a}{p}\right)
=
\left(\frac{-1}{p}\right)
\left(\frac ap\right).
}
$$

它一般不等于

$$
-\left(\frac ap\right).
$$

例如 $17\equiv1\pmod4$，所以

$$
\left(\frac{-1}{17}\right)=1.
$$

因此 $a$ 与 $-a$ 在模 $17$ 下具有相同的 quadratic character。

### 2.5 存在无穷多个 $1\pmod4$ 的素数

**推论** 形如

$$
p\equiv1\pmod4
$$

的素数有无穷多个。

**证明** 反设这样的素数只有

$$
p_1,p_2,\ldots,p_r.
$$

构造

$$
N=(2p_1p_2\cdots p_r)^2+1.
$$

$N$ 是奇数。任取一个素因子 $q\mid N$，则 $q$ 是奇素数，并且

$$
(2p_1p_2\cdots p_r)^2\equiv-1\pmod q.
$$

因此 $-1$ 是模 $q$ 的 quadratic residue。由 first supplementary law，

$$
q\equiv1\pmod4.
$$

按照反设，$q$ 必须等于某个 $p_i$。但

$$
N\equiv1\pmod{p_i},
$$

所以 $p_i\nmid N$，与 $q\mid N$ 矛盾。故这类素数必有无穷多个。证毕。

这个证明与 Euclid 关于素数无穷性的证明结构相同：假设名单有限，然后构造一个整数，迫使它产生名单之外的新素数。

## 3. Gauss's Lemma

Euler's criterion 非常适合直接计算。Gauss's lemma 给出另一种描述：观察

$$
a,2a,\ldots,\frac{p-1}{2}a
$$

约化成最小绝对剩余后，有多少个落在负半区间。

### 3.1 Least Absolute Residue

若 $p\nmid t$，记

$$
\langle t\rangle_p
$$

为 $t$ 模 $p$ 的唯一代表元，并满足

$$
-\frac p2
<
\langle t\rangle_p
<
\frac p2.
$$

它称为 $t$ 模 $p$ 的 least absolute residue。

例如模 $11$ 时，

$$
\langle7\rangle_{11}=-4,
\qquad
\langle9\rangle_{11}=-2,
\qquad
\langle3\rangle_{11}=3.
$$

### 3.2 Gauss's Lemma

**定理（Gauss's Lemma）** 设 $p$ 是奇素数且 $p\nmid a$。在

$$
\langle a\rangle_p,\,
\langle2a\rangle_p,\,
\ldots,\,
\left\langle\frac{p-1}{2}a\right\rangle_p
$$

中，设负数项的个数为 $\mu$，则

$$
\boxed{
\left(\frac ap\right)=(-1)^\mu.
}
$$

**证明** 令

$$
m=\frac{p-1}{2}.
$$

先证明

$$
|\langle a\rangle_p|,
|\langle2a\rangle_p|,
\ldots,
|\langle ma\rangle_p|
$$

恰好是 $1,2,\ldots,m$ 的一个排列。

若 $1\le i,j\le m$ 且

$$
ai\equiv\pm aj\pmod p,
$$

因为 $p\nmid a$，可以约去 $a$，得到

$$
i\equiv\pm j\pmod p.
$$

若 $i\equiv j\pmod p$，由 $1\le i,j<p$ 可得 $i=j$。

若 $i\equiv-j\pmod p$，则

$$
p\mid i+j.
$$

但

$$
2\le i+j\le2m=p-1,
$$

不可能被 $p$ 整除。因此不同的 $i$ 不会产生相同的绝对值。

每个 least absolute residue 的绝对值都属于 $\{1,\ldots,m\}$，一共有 $m$ 个不同值，所以它们正好构成该集合的一个排列。

把所有 least absolute residues 相乘。一方面，

$$
\prod_{j=1}^m ja
=a^m m!.
$$

另一方面，绝对值的乘积是 $m!$，其中恰有 $\mu$ 个负号，所以

$$
\prod_{j=1}^m\langle ja\rangle_p
=(-1)^\mu m!.
$$

由于每个 $\langle ja\rangle_p\equiv ja\pmod p$，

$$
a^m m!\equiv(-1)^\mu m!\pmod p.
$$

这里 $m!$ 不被 $p$ 整除，可以约去：

$$
a^m\equiv(-1)^\mu\pmod p.
$$

再由 Euler's criterion，

$$
a^m
\equiv
\left(\frac ap\right)
\pmod p.
$$

两边均为 $\pm1$，故

$$
\left(\frac ap\right)=(-1)^\mu.
$$

证毕。

#### 定理的直观意义

乘以 $a$ 会重新排列非零剩余类。只观察前一半

$$
1,2,\ldots,\frac{p-1}{2},
$$

并把结果拉回对称区间 $(-p/2,p/2)$ 后，每越过一次 $p/2$ 就产生一个负号。负号总数的奇偶性正好记录 $a$ 是平方还是非平方。

### 3.3 例：计算 $\left(\frac{11}{29}\right)$

取

$$
m=\frac{29-1}{2}=14.
$$

把

$$
11,22,\ldots,14\cdot11
$$

化为模 $29$ 的 least absolute residues，得到

$$
11,-7,4,-14,-3,8,-10,1,12,-6,5,-13,-2,9.
$$

其中负数为

$$
-7,-14,-3,-10,-6,-13,-2,
$$

一共

$$
\mu=7
$$

项。因此

$$
\left(\frac{11}{29}\right)
=(-1)^7
=-1.
$$

所以 $11$ 是模 $29$ 的 quadratic nonresidue，方程

$$
x^2\equiv11\pmod{29}
$$

无解。

### 3.4 Second Supplementary Law

**推论（The Second Supplementary Law）** 对任意奇素数 $p$，

$$
\boxed{
\left(\frac2p\right)
=(-1)^{(p^2-1)/8}.
}
$$

等价地，

$$
\boxed{
2\in Q_p
\iff
p\equiv1\text{ 或 }7\pmod8.
}
$$

**证明** 对 $a=2$ 使用 Gauss's lemma。需要观察

$$
2,4,6,\ldots,p-1
$$

的 least absolute residues。

一个数 $2j$ 在变成 least absolute residue 时出现负号，当且仅当其 least positive residue 大于 $p/2$。因为

$$
1\le j\le\frac{p-1}{2},
$$

所以这里只需数满足

$$
2j>\frac p2
$$

的 $j$。

若

$$
p=4r+1,
$$

则恰有

$$
r=\frac{p-1}{4}
$$

项为负，因此

$$
\left(\frac2p\right)=(-1)^{(p-1)/4}.
$$

若

$$
p=4r+3,
$$

则恰有

$$
r+1=\frac{p+1}{4}
$$

项为负，因此

$$
\left(\frac2p\right)=(-1)^{(p+1)/4}.
$$

把 $p$ 的四种奇数模 $8$ 剩余类分别代入：

$$
\begin{array}{c|cccc}
p\bmod8&1&3&5&7\\
\hline
\left(\frac2p\right)&1&-1&-1&1
\end{array}
$$

这恰好等价于

$$
\left(\frac2p\right)=(-1)^{(p^2-1)/8}.
$$

证毕。

#### 例

因为

$$
17\equiv1\pmod8,
$$

所以

$$
\left(\frac2{17}\right)=1.
$$

事实上

$$
6^2=36\equiv2\pmod{17}.
$$

而

$$
13\equiv5\pmod8,
$$

所以

$$
\left(\frac2{13}\right)=-1,
$$

模 $13$ 不存在 $2$ 的平方根。

## 4. Quadratic Nonresidues 与 Artin's Conjecture

由 second supplementary law，

$$
2\text{ 是模 }p\text{ 的 quadratic nonresidue}
\iff
p\equiv3,5\pmod8.
$$

每个 primitive root 都必然是 quadratic nonresidue。原因是：若 $g$ 是 primitive root，则

$$
g^{(p-1)/2}\equiv-1\pmod p,
$$

由 Euler's criterion，

$$
\left(\frac gp\right)=-1.
$$

但是反过来并不成立。Quadratic nonresidue 只排除了元素阶整除 $(p-1)/2$ 的可能，还不能保证阶恰好等于 $p-1$。

例如

$$
\left(\frac2{43}\right)=-1
$$

因为 $43\equiv3\pmod8$，但

$$
2^{14}\equiv1\pmod{43}.
$$

因此 $2$ 的阶整除 $14$，不可能达到

$$
42=\varphi(43),
$$

所以 $2$ 不是模 $43$ 的 primitive root。

### 4.1 Primitive Root 的逐素因子检验

对 $g\in U_p$，

$$
g\text{ 是 primitive root}
$$

当且仅当对 $p-1$ 的每个素因子 $q$ 都有

$$
\boxed{
g^{(p-1)/q}\not\equiv1\pmod p.
}
$$

当 $q=2$ 时，这个条件正是

$$
g^{(p-1)/2}\not\equiv1\pmod p,
$$

也就是 $g$ 为 quadratic nonresidue。由此可见：

> 成为 quadratic nonresidue 只是通过了 primitive-root test 的第一关；$p-1$ 的其他素因子还会带来更多检验。

### 4.2 Artin's Constant 的启发式来源

Artin's primitive-root conjecture 预测：像 $2$ 这样既不是 $-1$、也不是完全平方的整数，会对正密度的素数 $p$ 成为 primitive root。

对固定的奇素数 $q$，启发式地：

1. 大约有比例

   $$
   \frac1{q-1}
   $$

   的素数满足 $q\mid p-1$；

2. 在这样的 cyclic group $U_p$ 中，大约有比例

   $$
   \frac1q
   $$

   的元素满足

   $$
   x^{(p-1)/q}=1.
   $$

因此与 $q$ 对应的检验失败的预期比例为

$$
\frac1{q(q-1)}.
$$

若暂时把不同素数 $q$ 造成的障碍看作相互独立，就得到预测密度

$$
\boxed{
A
=\prod_{q\ \mathrm{prime}}
\left(1-\frac1{q(q-1)}\right)
\approx0.373956.
}
$$

这个常数称为 **Artin's constant**。

其中 $q=2$ 的因子为

$$
1-\frac1{2(2-1)}=\frac12,
$$

正好对应 quadratic-nonresidue test。由于 $2$ 在约一半的奇素数下为 nonresidue，所以在已经满足

$$
p\equiv3,5\pmod8
$$

的素数中，启发式预测约有

$$
2A\approx74.8\%
$$

会使 $2$ 成为 primitive root。

必须强调，这里的“独立性”只是 heuristic，并不是证明。讲义给出的背景说明是：Hooley 在 Generalized Riemann Hypothesis 的条件下证明了相应密度结果；无条件情形仍然困难。

这一节也说明了 quadratic residues 理论在 primitive roots 问题中的地位：它解决的是 $q=2$ 这一层障碍，而更完整的 reciprocity laws 与解析数论工具会处理更深的问题。

## 5. 小结

本章围绕同余

$$
x^2\equiv a\pmod n
$$

建立了以下框架：

1. 当 $\gcd(2a,n)=1$ 时，二次同余可以通过 completing the square 化为判别式的平方根问题；
2. $Q_n$ 是单位群 $U_n$ 在 squaring map 下的像，并且每个 quadratic residue 的平方根个数等于

   $$
   |\{x\in U_n:x^2\equiv1\pmod n\}|;
   $$

3. CRT 把合数模数下的平方问题拆成各个 prime-power modulus 上的问题；
4. 对奇素数幂，

   $$
   a\in Q_{p^e}\iff a\in Q_p;
   $$

   对 $2^e$，当 $e\ge3$ 时判别条件是

   $$
   a\equiv1\pmod8;
   $$

5. Legendre symbol 用 $0,\pm1$ 编码模奇素数时的 quadratic character，并具有乘法性；
6. Euler's criterion 给出

   $$
   a^{(p-1)/2}
   \equiv
   \left(\frac ap\right)
   \pmod p;
   $$

7. Gauss's lemma 用 least absolute residues 中负项个数的奇偶性计算 Legendre symbol；
8. 两个 supplementary laws 分别是

   $$
   \left(\frac{-1}{p}\right)
   =(-1)^{(p-1)/2},
   \qquad
   \left(\frac2p\right)
   =(-1)^{(p^2-1)/8}.
   $$

这些结果为下一步的 Quadratic Reciprocity 做好了准备：我们已经知道如何处理分子为 $-1$ 和 $2$ 的 Legendre symbol，接下来需要理解两个不同奇素数交换位置时会发生什么。
