---
title: Elementary Number Theory-Chap6
date: 2026-10-28 21:38:52
updated: 2026-10-28 21:38:52
math: true
categories:
  - Elementary Number Theory
tags:
  - Elementary Number Theory
  - Euler's Totient Function
  - Multiplicative Order
  - Primitive Root
  - Unit Group
description: Elementary Number Theory Notes (6):Euler Function, Order of Elements in the Unit Group and Primitive Roots
---

Fermat's little theorem 研究模素数时的幂运算；当模数是一般正整数时，只要把注意力限制在可逆剩余类上，同样的群论思想仍然成立。本章以单位群 $U_n=(\mathbb Z/n\mathbb Z)^\times$ 为主线，依次讨论 Euler's totient function、元素的阶以及 primitive roots。

<!-- more -->

## 1. Euler's Totient Function

### 1.1 单位群与 $\varphi(n)$

模 $n$ 的单位群定义为

$$
U_n=(\mathbb Z/n\mathbb Z)^\times.
$$

它由 $\mathbb Z_n$ 中所有具有乘法逆元的剩余类组成。

**定义（Euler's Totient Function）** Euler 函数 $\varphi(n)$ 定义为

$$
\boxed{
\varphi(n)=|U_n|
=\#\{a\in\mathbb Z:1\le a\le n,\ \gcd(a,n)=1\}.
}
$$

因此 $\varphi(n)$ 统计 $1,\ldots,n$ 中与 $n$ 互素的整数个数。特别地，

$$
\varphi(1)=1.
$$

当 $n>1$ 时，$n$ 本身不与 $n$ 互素，所以也可以等价地统计

$$
1\le a<n
$$

中与 $n$ 互素的整数。

**引理** 剩余类 $[a]_n$ 是 $\mathbb Z/n\mathbb Z$ 中的单位，当且仅当

$$
\gcd(a,n)=1.
$$

**证明** $[a]_n$ 可逆，等价于存在整数 $x$ 使

$$
ax\equiv1\pmod n.
$$

线性同余 $ax\equiv1\pmod n$ 有解，当且仅当

$$
\gcd(a,n)\mid1.
$$

最大公因数为正整数，因此这又等价于 $\gcd(a,n)=1$。证毕。

这个判据把“环中的可逆性”转化成了普通整数的 gcd 问题。例如

$$
U_{12}=\{[1],[5],[7],[11]\},
$$

所以

$$
\varphi(12)=4.
$$

$[5]$ 的逆元仍是 $[5]$，因为

$$
5^2=25\equiv1\pmod{12}.
$$

而 $[6]$ 不可逆，因为 $\gcd(6,12)=6\ne1$。

### 1.2 Euler's Theorem

**定理（Euler's Theorem）** 若

$$
\gcd(a,n)=1,
$$

则

$$
\boxed{a^{\varphi(n)}\equiv1\pmod n}.
$$

**证明** 由 $\gcd(a,n)=1$，$[a]_n$ 属于有限群 $U_n$。这个群的大小是

$$
|U_n|=\varphi(n).
$$

由 Lagrange's theorem，有限群中任意元素的阶整除群的阶，因此

$$
[a]_n^{\,\varphi(n)}=[1]_n.
$$

这正是

$$
a^{\varphi(n)}\equiv1\pmod n.
$$

证毕。

#### 定理想表达什么？

Euler's theorem 是 Fermat's little theorem 对一般模数的推广。区别在于：

- 模素数 $p$ 时，每个非零剩余类都可逆，单位群大小为 $p-1$；
- 模一般整数 $n$ 时，只有与 $n$ 互素的剩余类可逆，单位群大小为 $\varphi(n)$。

当 $n=p$ 为素数时，

$$
\varphi(p)=p-1,
$$

Euler's theorem 就变成

$$
a^{p-1}\equiv1\pmod p,
$$

也就是 Fermat's little theorem。

条件 $\gcd(a,n)=1$ 不能省略。例如 $a=2,n=8$ 时，

$$
\varphi(8)=4,
$$

但

$$
2^4=16\equiv0\not\equiv1\pmod8.
$$

原因是 $[2]_8$ 不属于单位群，不能对它使用 Lagrange's theorem。

### 1.3 Multiplicative Arithmetic Functions

**定义** 算术函数是一个定义在正整数上的函数。若函数

$$
f:\mathbb N\longrightarrow\mathbb C
$$

满足

$$
f(1)=1
$$

并且当 $\gcd(m,n)=1$ 时有

$$
f(mn)=f(m)f(n),
$$

就称 $f$ 是 **multiplicative function（积性函数）**。

这里“积性”只要求在 $m,n$ 互素时成立，并不要求对所有 $m,n$ 都成立。若对所有正整数都成立，则称为 completely multiplicative。

积性函数由它在素数幂上的取值完全决定。若

$$
n=\prod_{i=1}^r p_i^{e_i},
$$

由于不同素数幂两两互素，

$$
f(n)=\prod_{i=1}^r f(p_i^{e_i}).
$$

例如固定 $k\ge0$ 时，函数 $f(n)=n^k$ 是完全积性的；Euler 函数 $\varphi$ 则是积性的。

### 1.4 为什么 Euler 函数是积性的？

设

$$
N=n_1n_2\cdots n_r,
$$

其中 $n_1,\ldots,n_r$ 两两互素。Ring-theoretic Chinese remainder theorem 给出环同构

$$
\mathbb Z_N
\cong
\mathbb Z_{n_1}\times\cdots\times\mathbb Z_{n_r}.
$$

直积环中的元素

$$
(u_1,\ldots,u_r)
$$

可逆，当且仅当每个分量 $u_i$ 都可逆。因此该环同构限制为单位群之间的群同构：

$$
\boxed{
U_N\cong U_{n_1}\times\cdots\times U_{n_r}.
}
$$

**证明** 若 $(u_1,\ldots,u_r)$ 可逆，设逆元为 $(v_1,\ldots,v_r)$，则

$$
u_iv_i=1
$$

对每个 $i$ 都成立，所以每个 $u_i$ 可逆。反过来，若每个 $u_i$ 都有逆元 $v_i$，那么

$$
(u_1,\ldots,u_r)(v_1,\ldots,v_r)=(1,\ldots,1),
$$

故整个元组可逆。CRT 环同构保持乘法与单位元，因此它把左边的单位恰好对应到右边各分量的单位。证毕。

**推论（Multiplicativity of Euler's Function）** 若 $\gcd(m,n)=1$，则

$$
\boxed{\varphi(mn)=\varphi(m)\varphi(n)}.
$$

**证明** CRT 给出

$$
U_{mn}\cong U_m\times U_n.
$$

两边取元素个数：

$$
|U_{mn}|=|U_m||U_n|,
$$

也就是

$$
\varphi(mn)=\varphi(m)\varphi(n).
$$

证毕。

需要注意，互素条件是必要的。例如

$$
\varphi(4)=2,
$$

但

$$
\varphi(16)=8\ne\varphi(4)\varphi(4)=4.
$$

### 1.5 素数幂上的 Euler 函数

**引理** 若 $p$ 是素数且 $e\ge1$，则

$$
\boxed{
\varphi(p^e)
=p^e-p^{e-1}
=p^{e-1}(p-1).
}
$$

**证明** 在

$$
1,2,\ldots,p^e
$$

中，一个整数不与 $p^e$ 互素，当且仅当它能被 $p$ 整除。这些整数为

$$
p,2p,\ldots,p^{e-1}p=p^e,
$$

共有 $p^{e-1}$ 个。因此与 $p^e$ 互素的整数共有

$$
p^e-p^{e-1}=p^{e-1}(p-1)
$$

个。证毕。

例如

$$
\varphi(2^5)=32-16=16,
$$

因为 $1,\ldots,32$ 中恰有 $16$ 个奇数。

结合积性便得到一般公式。

**推论** 对每个 $n\ge1$，

$$
\boxed{
\varphi(n)
=n\prod_{p\mid n}\left(1-\frac1p\right),
}
$$

其中乘积遍历 $n$ 的所有不同素因数。

**证明** 设

$$
n=p_1^{e_1}\cdots p_r^{e_r}.
$$

由积性与素数幂公式，

$$
\begin{aligned}
\varphi(n)
&=\prod_{i=1}^r\varphi(p_i^{e_i})\\
&=\prod_{i=1}^r p_i^{e_i}\left(1-\frac1{p_i}\right)\\
&=n\prod_{p\mid n}\left(1-\frac1p\right).
\end{aligned}
$$

证毕。

**例** 计算 $\varphi(360)$。由于

$$
360=2^3\cdot3^2\cdot5,
$$

所以

$$
\begin{aligned}
\varphi(360)
&=360\left(1-\frac12\right)
\left(1-\frac13\right)
\left(1-\frac15\right)\\
&=360\cdot\frac12\cdot\frac23\cdot\frac45\\
&=96.
\end{aligned}
$$

指数 $3,2,1$ 不直接出现在乘积因子中，是因为每个不同素因数只负责排除其倍数一次；指数已经包含在前面的 $n$ 中。

### 1.6 例：计算大幂的末位数字

#### 例一：$3^{2022}$ 的最后三位

最后三位由模 $1000$ 的剩余决定。因为

$$
1000=2^3\cdot5^3,
$$

所以

$$
\varphi(1000)
=\varphi(2^3)\varphi(5^3)
=4\cdot100
=400.
$$

又因 $\gcd(3,1000)=1$，Euler's theorem 给出

$$
3^{400}\equiv1\pmod{1000}.
$$

将指数化简：

$$
2022=5\cdot400+22,
$$

所以

$$
3^{2022}\equiv3^{22}\pmod{1000}.
$$

使用重复平方：

$$
3^{10}=59049\equiv49\pmod{1000},
$$

$$
3^{20}\equiv49^2=2401\equiv401\pmod{1000},
$$

从而

$$
3^{22}\equiv401\cdot9=3609\equiv609\pmod{1000}.
$$

因此

$$
\boxed{3^{2022}\equiv609\pmod{1000}},
$$

最后三位是 $609$。

#### 例二：$2^{2022}$ 的最后两位

最后两位对应模 $100$。这里不能直接使用 Euler's theorem，因为

$$
\gcd(2,100)\ne1.
$$

把模数分解为

$$
100=4\cdot25.
$$

显然

$$
2^{2022}\equiv0\pmod4.
$$

另一方面，$\gcd(2,25)=1$ 且

$$
\varphi(25)=20.
$$

由于 $2022\equiv2\pmod{20}$，

$$
2^{2022}\equiv2^2\equiv4\pmod{25}.
$$

因此需要合并

$$
\begin{cases}
x\equiv0\pmod4,\\
x\equiv4\pmod{25}.
\end{cases}
$$

$x=4$ 已经同时满足两式，所以 CRT 给出

$$
\boxed{2^{2022}\equiv4\pmod{100}}.
$$

写成两位数，最后两位是 $04$。

这个例子说明：当底数与整体模数不互素时，可以先把模数拆成素数幂，在能够使用 Euler's theorem 的局部模数上化简指数，再用 CRT 合并。

### 1.7 Divisor-Sum Identity

**定理** 对每个正整数 $n$，

$$
\boxed{\sum_{d\mid n}\varphi(d)=n}.
$$

这里求和遍历 $n$ 的所有正因数。

**证明** 对每个 $d\mid n$，定义

$$
S_d
=\left\{
a\in\{1,\ldots,n\}:
\gcd(a,n)=\frac nd
\right\}.
$$

每个 $a\in\{1,\ldots,n\}$ 都有唯一的最大公因数 $\gcd(a,n)$。该最大公因数一定是 $n$ 的因数，所以 $a$ 恰好属于一个集合 $S_d$。因此这些集合两两不交，并且它们的并是整个 $\{1,\ldots,n\}$。

现在计算 $|S_d|$。条件

$$
\gcd(a,n)=\frac nd
$$

意味着 $a$ 可以写成

$$
a=\frac nd\,b,
\qquad1\le b\le d.
$$

代入最大公因数：

$$
\gcd\left(\frac nd b,n\right)
=\frac nd\gcd(b,d).
$$

所以 $a\in S_d$ 当且仅当

$$
\gcd(b,d)=1.
$$

这样的 $b$ 恰有 $\varphi(d)$ 个，因此

$$
|S_d|=\varphi(d).
$$

这些集合把一个含 $n$ 个元素的集合分割，故

$$
n
=\sum_{d\mid n}|S_d|
=\sum_{d\mid n}\varphi(d).
$$

证毕。

#### 例：$n=12$

$12$ 的正因数是

$$
1,2,3,4,6,12.
$$

对应的 Euler 函数值为

$$
1,1,2,2,2,4.
$$

因此

$$
\sum_{d\mid12}\varphi(d)
=1+1+2+2+2+4
=12.
$$

从集合分组的角度看，$\{1,\ldots,12\}$ 按照 $\gcd(a,12)$ 的值被分成若干组，每组大小恰好是某个 $\varphi(d)$。

### 1.8 关于 $\varphi(n)=m$ 的背景

令

$$
A(m)=\#\{n\ge1:\varphi(n)=m\}.
$$

Carmichael's totient conjecture 猜想

$$
A(m)\ne1
$$

对所有 $m$ 都成立，也就是说，Euler 函数的任何取值都不会恰好只对应一个正整数。这个猜想至今仍未解决。

与之互补，Sierpiński 猜想每个整数 $k\ge2$ 都会作为某个 $A(m)$ 的值出现；这一猜想已经由 Kevin Ford 证明。

## 2. 单位群中的元素阶

### 2.1 Order Modulo $n$

**定义** 设 $a\in U_n$，也就是 $\gcd(a,n)=1$。$a$ 模 $n$ 的阶定义为满足

$$
a^k\equiv1\pmod n
$$

的最小正整数 $k$，记为

$$
\operatorname{ord}_n(a)=k.
$$

元素的阶描述了连续计算

$$
1,a,a^2,a^3,\ldots\pmod n
$$

时第一次回到 $1$ 所需要的步数。

例如模 $15$ 时，

$$
2^1\equiv2,\qquad
2^2\equiv4,\qquad
2^3\equiv8,\qquad
2^4\equiv1\pmod{15}.
$$

所以

$$
\operatorname{ord}_{15}(2)=4.
$$

阶只对单位定义。如果 $\gcd(a,n)\ne1$，幂序列不一定能够回到 $1$。例如模 $8$ 时，

$$
2,4,0,0,\ldots
$$

永远不会出现 $1$。

### 2.2 哪些指数会使 $a^h\equiv1$？

**引理** 设

$$
k=\operatorname{ord}_n(a).
$$

对每个正整数 $h$，

$$
\boxed{
a^h\equiv1\pmod n
\iff
k\mid h.
}
$$

特别地，

$$
\boxed{k\mid\varphi(n)}.
$$

**证明** 对 $h$ 除以 $k$：

$$
h=qk+r,
\qquad0\le r<k.
$$

因为 $a^k\equiv1\pmod n$，

$$
a^h
=a^{qk+r}
=(a^k)^qa^r
\equiv a^r\pmod n.
$$

若 $a^h\equiv1\pmod n$，则 $a^r\equiv1\pmod n$。但 $k$ 是使 $a^k\equiv1$ 成立的最小正整数，而 $0\le r<k$，所以只能有 $r=0$。于是 $k\mid h$。

反过来，若 $h=qk$，则

$$
a^h=(a^k)^q\equiv1\pmod n.
$$

Euler's theorem 给出

$$
a^{\varphi(n)}\equiv1\pmod n,
$$

代入刚证明的等价关系，得到

$$
k\mid\varphi(n).
$$

证毕。

#### 这个引理的含义

$a^h\equiv1$ 并不是偶然发生的。所有能让幂回到 $1$ 的正指数，恰好是元素阶 $k$ 的正倍数：

$$
k,2k,3k,\ldots
$$

例如 $\operatorname{ord}_{15}(2)=4$，所以

$$
2^h\equiv1\pmod{15}
$$

当且仅当 $4\mid h$。因此 $2^{100}\equiv1\pmod{15}$，但 $2^{102}\not\equiv1\pmod{15}$。

同时，元素阶不但整除 $\varphi(n)$，而且通常比 $\varphi(n)$ 更小。Euler's theorem 给出对所有单位都有效的统一指数；元素阶则是针对某个具体元素的最小周期。

### 2.3 一个幂的阶

**命题** 若

$$
\operatorname{ord}_n(a)=k,
$$

则对每个正整数 $h$，

$$
\boxed{
\operatorname{ord}_n(a^h)
=\frac{k}{\gcd(k,h)}.
}
$$

**证明** 令

$$
d=\gcd(k,h),
\qquad
k=dk_0,
\qquad
h=dh_0,
$$

其中 $\gcd(k_0,h_0)=1$。

首先，

$$
(a^h)^{k_0}
=a^{hk_0}
=a^{dh_0k_0}
=a^{h_0k}
\equiv1\pmod n.
$$

所以 $a^h$ 的阶整除 $k_0$。

反过来，若

$$
(a^h)^t\equiv1\pmod n,
$$

则

$$
a^{ht}\equiv1\pmod n.
$$

由上一节的引理，

$$
k\mid ht.
$$

代入 $k=dk_0,h=dh_0$，得到

$$
k_0\mid h_0t.
$$

因为 $\gcd(k_0,h_0)=1$，Euclid's lemma 推出

$$
k_0\mid t.
$$

所以任何使 $(a^h)^t\equiv1$ 的指数 $t$ 都是 $k_0$ 的倍数，而 $k_0$ 本身已经可行。因此

$$
\operatorname{ord}_n(a^h)=k_0
=\frac{k}{\gcd(k,h)}.
$$

证毕。

#### 为什么取幂会缩短周期？

设 $a$ 的幂沿一个长度为 $k$ 的循环移动。每次乘以 $a^h$，相当于在这个循环上一次前进 $h$ 步。

- 若 $\gcd(k,h)=1$，步长与环长互素，最终仍会经过所有 $k$ 个位置，所以阶不变；
- 若 $\gcd(k,h)>1$，每次跳跃会跳过一部分位置，周期缩短为 $k/\gcd(k,h)$。

**例** 模 $11$ 时，$2$ 的阶为 $10$。因此

$$
\operatorname{ord}_{11}(2^4)
=\frac{10}{\gcd(10,4)}
=5.
$$

确实，

$$
2^4\equiv5\pmod{11},
$$

而

$$
5^1\equiv5,\quad
5^2\equiv3,\quad
5^3\equiv4,\quad
5^4\equiv9,\quad
5^5\equiv1\pmod{11}.
$$

### 2.4 用元素阶证明 Mersenne Numbers 互素

**命题** 若

$$
\gcd(\ell,m)=1,
$$

则

$$
\boxed{
\gcd(2^\ell-1,2^m-1)=1.
}
$$

因此，不同素数指标对应的 Mersenne numbers 两两互素。

**证明** 令

$$
D=\gcd(2^\ell-1,2^m-1).
$$

若 $D=1$，结论已经成立。否则 $D$ 是奇数，所以 $\gcd(2,D)=1$，$2$ 是模 $D$ 的单位。令

$$
k=\operatorname{ord}_D(2).
$$

因为

$$
D\mid2^\ell-1,
$$

所以

$$
2^\ell\equiv1\pmod D.
$$

由阶的基本性质，$k\mid\ell$。同理，从 $D\mid2^m-1$ 得到 $k\mid m$。因此

$$
k\mid\gcd(\ell,m)=1,
$$

所以 $k=1$。

$\operatorname{ord}_D(2)=1$ 意味着

$$
2\equiv1\pmod D,
$$

于是 $D\mid1$，故 $D=1$。证毕。

若 $\ell,m$ 是不同素数，则 $\gcd(\ell,m)=1$，所以

$$
M_\ell=2^\ell-1,
\qquad
M_m=2^m-1
$$

互素。

例如

$$
M_3=7,\qquad M_5=31,
$$

并且 $\gcd(7,31)=1$。

这个命题也可以看作更强公式

$$
\gcd(2^\ell-1,2^m-1)
=2^{\gcd(\ell,m)}-1
$$

在 $\gcd(\ell,m)=1$ 时的特殊情形；这里的证明展示了元素阶如何把指数上的整除关系转化成整数本身的 gcd 结论。

## 3. Primitive Roots

### 3.1 群的大小不能决定群的结构

知道

$$
|U_n|=\varphi(n)
$$

只告诉我们单位群中有多少元素，不能告诉我们这些元素如何相乘。

例如

$$
|U_5|=\varphi(5)=4,
\qquad
|U_8|=\varphi(8)=4.
$$

但两个群的结构不同。

在 $U_5$ 中，

$$
2^1\equiv2,\quad
2^2\equiv4,\quad
2^3\equiv3,\quad
2^4\equiv1\pmod5.
$$

所以 $2$ 的幂遍历了 $U_5$ 的全部四个元素：

$$
U_5=\langle2\rangle.
$$

因此 $U_5$ 是一个阶为 $4$ 的 cyclic group，记为

$$
U_5\cong C_4.
$$

而

$$
U_8=\{1,3,5,7\}.
$$

其中每个非单位元都满足

$$
3^2\equiv5^2\equiv7^2\equiv1\pmod8.
$$

所以每个元素的阶至多为 $2$，没有任何元素能生成四个元素。其结构为

$$
U_8\cong C_2\times C_2.
$$

这说明即使两个单位群大小相同，它们也不一定同构。

### 3.2 Primitive Root 的定义

**定义** 若 $U_n$ 是 cyclic group，它的生成元称为模 $n$ 的 **primitive root（原根）**。

等价地，$g$ 是模 $n$ 的 primitive root，当且仅当

$$
\boxed{
\operatorname{ord}_n(g)=\varphi(n).
}
$$

也就是说，

$$
1,g,g^2,\ldots,g^{\varphi(n)-1}
$$

模 $n$ 后恰好遍历 $U_n$ 中的所有元素。

例如模 $5$ 时，

$$
\operatorname{ord}_5(2)=4=\varphi(5),
$$

所以 $2$ 是 primitive root。$3$ 也是，因为

$$
3,3^2,3^3,3^4
\equiv3,4,2,1\pmod5.
$$

但

$$
\operatorname{ord}_5(1)=1,
\qquad
\operatorname{ord}_5(4)=2,
$$

所以 $1,4$ 不是 primitive roots。

模 $8$ 则不存在 primitive root，因为 $U_8$ 中没有阶为

$$
\varphi(8)=4
$$

的元素。

### 3.3 如何检验 Primitive Root？

**推论（Primitive Root Criterion）** 设 $a\in U_n$。则 $a$ 是模 $n$ 的 primitive root，当且仅当对 $\varphi(n)$ 的每个素因数 $q$ 都有

$$
\boxed{
a^{\varphi(n)/q}\not\equiv1\pmod n.
}
$$

**证明** 令

$$
N=\varphi(n),
\qquad
r=\operatorname{ord}_n(a).
$$

由 Lagrange's theorem，$r\mid N$。

若 $a$ 是 primitive root，则 $r=N$。对任意素数 $q\mid N$，指数 $N/q$ 严格小于 $N$，不可能是 $r$ 的倍数。因此

$$
a^{N/q}\not\equiv1\pmod n.
$$

反过来，假设对每个素因数 $q\mid N$ 都有 $a^{N/q}\not\equiv1$。若 $r<N$，则

$$
\frac Nr>1
$$

至少有一个素因数 $q$。于是

$$
q\mid\frac Nr,
$$

所以

$$
r\mid\frac Nq.
$$

由阶的基本性质，

$$
a^{N/q}\equiv1\pmod n,
$$

与假设矛盾。因此只能有 $r=N$，即 $a$ 是 primitive root。证毕。

#### 为什么只检查素因数就够了？

我们的目标是排除 $r$ 为 $N$ 的真因数。如果 $r<N$，那么商 $N/r$ 一定含有某个素因数 $q$，从而 $r\mid N/q$。所以任何“阶太小”的情况，至少会被某个素因数 $q$ 对应的测试捕获。

不需要检查 $\varphi(n)$ 的所有因数，只需检查它的不同素因数。

### 3.4 例：模 $11$ 的 Primitive Roots

因为

$$
\varphi(11)=10=2\cdot5,
$$

检验 $2$ 是否为 primitive root，只需检查素因数 $2,5$：

$$
2^{10/5}=2^2=4\not\equiv1\pmod{11},
$$

以及

$$
2^{10/2}=2^5=32\equiv10\not\equiv1\pmod{11}.
$$

所以

$$
\operatorname{ord}_{11}(2)=10,
$$

$2$ 是模 $11$ 的 primitive root。

它的幂依次为

$$
\begin{array}{c|cccccccccc}
j&0&1&2&3&4&5&6&7&8&9\\
\hline
2^j\bmod11&1&2&4&8&5&10&9&7&3&6
\end{array}
$$

确实遍历了 $U_{11}$ 的全部十个元素。

### 3.5 一个 cyclic unit group 有多少 Primitive Roots？

**命题** 若 $U_n$ 是 cyclic group，则它恰有

$$
\boxed{\varphi(\varphi(n))}
$$

个 primitive roots。

**证明** 设

$$
U_n=\langle g\rangle,
\qquad
N=\varphi(n).
$$

每个元素都可唯一写成 $g^j$ 的形式。由幂的阶公式，

$$
\operatorname{ord}_n(g^j)
=\frac{N}{\gcd(N,j)}.
$$

$g^j$ 生成整个 $U_n$，当且仅当其阶等于 $N$，也就是

$$
\frac N{\gcd(N,j)}=N.
$$

这等价于

$$
\gcd(N,j)=1.
$$

模 $N$ 意义下，与 $N$ 互素的指数 $j$ 恰有 $\varphi(N)$ 个。因此 primitive roots 的数量为

$$
\varphi(N)=\varphi(\varphi(n)).
$$

证毕。

#### 继续计算模 $11$ 的例子

已经知道 $2$ 是模 $11$ 的 primitive root。所有 primitive roots 都是

$$
2^j,
\qquad
\gcd(j,10)=1.
$$

模 $10$ 与 $10$ 互素的指数是

$$
j=1,3,7,9.
$$

对应得到

$$
2^1,2^3,2^7,2^9
\equiv2,8,7,6\pmod{11}.
$$

所以模 $11$ 的全部 primitive roots 为

$$
\boxed{2,6,7,8}.
$$

数量为

$$
\varphi(\varphi(11))
=\varphi(10)
=4.
$$

### 3.6 模素数时各阶元素的数量

**定理** 设 $p$ 为素数。对每个 $d\mid p-1$，单位群 $U_p$ 中恰有

$$
\boxed{\varphi(d)}
$$

个阶为 $d$ 的元素。

这是本讲最关键的结构定理。它不仅说明哪些阶会出现，还精确给出每种阶有多少元素。

**证明** 对每个 $d\mid p-1$，定义

$$
\Omega_d
=\{a\in U_p:\operatorname{ord}_p(a)=d\},
$$

并记

$$
\omega(d)=|\Omega_d|.
$$

由 Lagrange's theorem，每个 $a\in U_p$ 的阶都整除

$$
|U_p|=p-1.
$$

因此各集合 $\Omega_d$ 将 $U_p$ 分割：

$$
\sum_{d\mid p-1}\omega(d)=p-1.
$$

现在固定一个 $d\mid p-1$。

如果 $\Omega_d$ 为空，则

$$
\omega(d)=0\le\varphi(d).
$$

如果 $\Omega_d$ 非空，取 $a\in\Omega_d$。由于 $a$ 的阶为 $d$，

$$
1,a,a^2,\ldots,a^{d-1}
$$

是 $d$ 个互不相同的元素，并且都满足

$$
x^d\equiv1\pmod p.
$$

多项式

$$
x^d-1
$$

的次数为 $d$。由模素数下的 polynomial root bound，它至多有 $d$ 个根。我们已经找到了 $d$ 个根，所以这些幂就是它的全部根。

任何阶为 $d$ 的元素 $b$ 都满足 $b^d\equiv1\pmod p$，因此 $b$ 必须是某个 $a^j$。由幂的阶公式，

$$
\operatorname{ord}_p(a^j)
=\frac d{\gcd(d,j)}.
$$

它等于 $d$，当且仅当

$$
\gcd(d,j)=1.
$$

在 $j=0,1,\ldots,d-1$ 中，与 $d$ 互素的指数恰有 $\varphi(d)$ 个。因此，只要 $\Omega_d$ 非空，就有

$$
\omega(d)=\varphi(d).
$$

综上，对每个 $d\mid p-1$，

$$
\omega(d)\in\{0,\varphi(d)\},
$$

特别地，

$$
\omega(d)\le\varphi(d).
$$

另一方面，前面已经证明 divisor-sum identity：

$$
\sum_{d\mid p-1}\varphi(d)=p-1.
$$

现在有

$$
\sum_{d\mid p-1}\omega(d)
=p-1
=\sum_{d\mid p-1}\varphi(d),
$$

并且每一项都满足 $\omega(d)\le\varphi(d)$。如果某一项严格小于对应的 $\varphi(d)$，总和就会严格小于右边。因此每一项都必须相等：

$$
\omega(d)=\varphi(d).
$$

证毕。

#### 证明的关键逻辑

证明分成两步：

1. polynomial root bound 说明：某种阶一旦出现，该阶元素的数量就必须是 $\varphi(d)$；
2. divisor-sum identity 与总人数 $p-1$ 迫使每个可能的阶都实际出现。

这是一种典型的“先逐项给出上界，再比较总和迫使全部取等号”的论证。

### 3.7 例：按阶分解 $U_{11}$

$U_{11}$ 的大小为

$$
10.
$$

所以元素的阶只能是 $10$ 的正因数

$$
1,2,5,10.
$$

由定理，各阶元素数量分别是：

| 阶 $d$ | $\varphi(d)$ | 阶为 $d$ 的元素 |
| ---: | ---: | --- |
| $1$ | $1$ | $1$ |
| $2$ | $1$ | $10$ |
| $5$ | $4$ | $3,4,5,9$ |
| $10$ | $4$ | $2,6,7,8$ |

四行的元素数量相加：

$$
1+1+4+4=10,
$$

恰好覆盖整个 $U_{11}$。

阶为 $10$ 的元素正是 primitive roots，所以再次得到模 $11$ 的 primitive roots：

$$
2,6,7,8.
$$

### 3.8 素数一定存在 Primitive Root

**推论** 若 $p$ 是素数，则 $U_p$ 是 cyclic group；换句话说，模每个素数都存在 primitive root。

**证明** 在上一节定理中取

$$
d=p-1.
$$

则 $U_p$ 中阶为 $p-1$ 的元素共有

$$
\varphi(p-1)>0
$$

个。任选其中一个元素 $g$，都有

$$
\operatorname{ord}_p(g)=p-1=|U_p|.
$$

所以 $g$ 生成整个 $U_p$，$U_p$ 是 cyclic group。证毕。

这个结论与模合数的情形形成对比：模素数一定存在 primitive root，但一般模数未必存在，例如模 $8$ 就不存在。

## 4. 小结

本章把 Fermat's little theorem 背后的群论思想推广到了任意模数。

Euler 函数统计单位群大小：

$$
\varphi(n)=|U_n|,
$$

并满足

$$
\varphi(n)
=n\prod_{p\mid n}\left(1-\frac1p\right).
$$

Euler's theorem 给出所有单位都满足的统一幂指数：

$$
a^{\varphi(n)}\equiv1\pmod n
\qquad(\gcd(a,n)=1).
$$

元素阶

$$
\operatorname{ord}_n(a)
$$

则描述某个具体元素的最小周期，并且

$$
\operatorname{ord}_n(a)\mid\varphi(n),
$$

$$
\operatorname{ord}_n(a^h)
=\frac{\operatorname{ord}_n(a)}
{\gcd(\operatorname{ord}_n(a),h)}.
$$

当某个单位的阶达到 $\varphi(n)$ 时，它就是 primitive root，其幂遍历整个单位群。对素数 $p$，$U_p$ 一定是 cyclic group，而且对每个 $d\mid p-1$，恰有

$$
\varphi(d)
$$

个元素的阶等于 $d$。

这些结论把 Euler 函数、有限群中的元素阶、多项式根数上界和 primitive roots 串联成了一条完整的逻辑链。
