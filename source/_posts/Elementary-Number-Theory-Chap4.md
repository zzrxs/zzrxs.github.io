---
title: Elementary Number Theory-Chap4
date: 2026-10-19 21:29:13
updated: 2026-10-19 21:29:13
math: true
categories:
  - Elementary Number Theory
tags:
  - Elementary Number Theory
  - Chinese Remainder Theorem
  - Congruence
  - Polynomial Congruence
description: 初等数论笔记（四）：Chinese Remainder Theorem、环同构、多项式同余与广义 CRT
---

Chinese Remainder Theorem（CRT）说明：若若干模数两两互素，那么分别给出的同余条件可以无冲突地合并成一个模乘积的同余类。本章不仅给出显式构造与证明，还讨论它的环论形式、多项式根的分解，以及模数不互素时的广义版本。

<!-- more -->

## 1. 两两互素模数的 CRT

**定理（Chinese Remainder Theorem）** 设正整数 $n_1,\ldots,n_k$ 两两互素，$b_1,\ldots,b_k\in\mathbb Z$，并令

$$
N=n_1n_2\cdots n_k.
$$

则同余方程组

$$
x\equiv b_i\pmod{n_i},
\qquad i=1,\ldots,k
$$

一定有解，而且全部解构成模 $N$ 的唯一同余类。

更具体地，令

$$
N_i=\frac N{n_i}.
$$

因为 $\gcd(N_i,n_i)=1$，可以选取 $M_i\in\mathbb Z$ 使

$$
N_iM_i\equiv1\pmod{n_i}.
$$

那么

$$
\boxed{x_0=\sum_{i=1}^k b_iN_iM_i}
$$

就是一组解，所有解都满足

$$
x\equiv x_0\pmod N.
$$

### 1.1 为什么这个构造有效？

固定一个 $i$。当 $j\ne i$ 时，$n_i$ 是 $N_j=N/n_j$ 的因数，所以

$$
N_jM_j\equiv0\pmod{n_i}.
$$

而专门对应第 $i$ 个模数的项满足

$$
N_iM_i\equiv1\pmod{n_i}.
$$

因此

$$
x_0
=\sum_{j=1}^k b_jN_jM_j
\equiv b_iN_iM_i
\equiv b_i
\pmod{n_i}.
$$

这对每个 $i$ 都成立，故 $x_0$ 同时满足全部条件。

再证唯一性。若 $x$ 也是解，则每个 $n_i$ 都整除 $x-x_0$。因为 $n_1,\ldots,n_k$ 两两互素，反复使用 Euclid's lemma 得

$$
N=n_1\cdots n_k\mid x-x_0.
$$

故 $x\equiv x_0\pmod N$。反过来，给 $x_0$ 加上 $N$ 的任意倍数显然仍满足每一个同余式。证毕。

### 1.2 例：三个模数

求解

$$
\begin{cases}
x\equiv1\pmod9,\\
x\equiv4\pmod5,\\
x\equiv2\pmod7.
\end{cases}
$$

这里

$$
N=9\cdot5\cdot7=315,
$$

$$
(N_1,N_2,N_3)=(35,63,45).
$$

可取逆元

$$
35^{-1}\equiv-1\pmod9,
\qquad
63^{-1}\equiv2\pmod5,
\qquad
45^{-1}\equiv-2\pmod7.
$$

于是

$$
\begin{aligned}
x_0
&=1\cdot35(-1)+4\cdot63(2)+2\cdot45(-2)\\
&=289.
\end{aligned}
$$

完整答案为

$$
\boxed{x\equiv289\pmod{315}}.
$$

### 1.3 素数幂分解

若

$$
n=p_1^{e_1}\cdots p_k^{e_k}
$$

是 $n>1$ 的素数幂分解，则这些素数幂两两互素，因此

$$
a\equiv b\pmod n
\iff
a\equiv b\pmod{p_i^{e_i}}
\quad\text{对每个 }i.
$$

这说明许多模合数的问题都可以先拆到各个 prime-power modulus 上，再用 CRT 拼回去。

## 2. 先解线性同余，再使用 CRT

若方程组中的每一条是一般线性同余

$$
a_ix\equiv b_i\pmod{n_i},
$$

标准做法不是直接套 CRT，而是先逐条求解，化成 $x\equiv c_i$ 的形式，再合并。

**例** 求解

$$
11x\equiv29\pmod{315}.
$$

由于 $315=9\cdot5\cdot7$，它等价于分别模 $9,5,7$ 的三个同余。$11$ 在三个模数下都可逆，解得

$$
x\equiv1\pmod9,
\qquad
x\equiv4\pmod5,
\qquad
x\equiv2\pmod7.
$$

这正是上一节的系统，所以

$$
x\equiv289\pmod{315}.
$$

**例** 求解

$$
\begin{cases}
7x\equiv3\pmod{12},\\
10x\equiv6\pmod{14}.
\end{cases}
$$

第一式中 $7^{-1}\equiv7\pmod{12}$，故

$$
x\equiv21\equiv9\pmod{12}.
$$

第二式先约去 $2$：

$$
5x\equiv3\pmod7,
$$

从而 $x\equiv2\pmod7$。于是原系统化为

$$
\begin{cases}
x\equiv9\pmod{12},\\
x\equiv2\pmod7.
\end{cases}
$$

由 CRT 得

$$
\boxed{x\equiv9\pmod{84}}.
$$

## 3. 环论形式

环 $R_1,\ldots,R_k$ 的直积 $R_1\times\cdots\times R_k$ 按坐标逐项进行加法和乘法。Ring homomorphism 要保持加法、乘法和乘法单位元。

例如

$$
\mathbb Z_3\longrightarrow\mathbb Z_6,
\qquad
[a]_3\longmapsto[2a]_6
$$

是加法群同态，却不是环同态，因为

$$
[2]_6^2=[4]_6\ne[2]_6.
$$

另一方面，自然约化映射

$$
\mathbb Z_m\longrightarrow\mathbb Z_n,
\qquad
[a]_m\longmapsto[a]_n
$$

当且仅当 $n\mid m$ 时良定义；此时它是环同态。

**定理（Ring-Theoretic CRT）** 在普通 CRT 的条件下，映射

$$
\Phi:\mathbb Z_N
\longrightarrow
\mathbb Z_{n_1}\times\cdots\times\mathbb Z_{n_k},
$$

$$
[a]_N\longmapsto([a]_{n_1},\ldots,[a]_{n_k})
$$

是环同构。

**证明** 因为每个 $n_i\mid N$，映射良定义，并且显然保持加法、乘法和单位元。普通 CRT 的存在性说明右边任意一组剩余类都有原像，所以 $\Phi$ 满射。

若 $[a]_N$ 位于核中，则每个 $n_i\mid a$。由两两互素性，$N\mid a$，所以 $[a]_N=[0]_N$；故核只有零元，$\Phi$ 单射。于是 $\Phi$ 是环同构。证毕。

这个结论比“方程组有唯一解”更强：它说明模 $N$ 的整个代数结构都可以拆解成若干较小的模环。

## 4. 多项式同余与 CRT

对 $f\in\mathbb Z[x]$，定义模 $n$ 的根集

$$
Z_n(f)=\{[a]\in\mathbb Z_n:f(a)\equiv0\pmod n\}.
$$

**定理（Nonlinear CRT）** 若 $n_1,\ldots,n_k$ 两两互素且 $N=n_1\cdots n_k$，则

$$
Z_N(f)
\longrightarrow
Z_{n_1}(f)\times\cdots\times Z_{n_k}(f)
$$

由自然约化给出的映射是双射。因此

$$
\boxed{|Z_N(f)|=\prod_{i=1}^k|Z_{n_i}(f)|}.
$$

**证明** 映射显然良定义，单射来自普通 CRT 的唯一性。反过来，从每个局部根集中选 $[a_i]\in Z_{n_i}(f)$。普通 CRT 给出 $[a]_N$，使 $a\equiv a_i\pmod{n_i}$。多项式保持同余，所以

$$
f(a)\equiv f(a_i)\equiv0\pmod{n_i}
$$

对每个 $i$ 都成立。两两互素性进一步推出 $N\mid f(a)$，所以 $[a]_N\in Z_N(f)$，证明满射。证毕。

### 4.1 例：二次同余

求解

$$
x^2+x+9\equiv0\pmod{315}.
$$

因为 $315=9\cdot5\cdot7$，先求局部解：

$$
\begin{array}{c|c}
\text{模数}&\text{解}\\
\hline
9&x\equiv0,8\pmod9\\
5&x\equiv2\pmod5\\
7&x\equiv3\pmod7
\end{array}
$$

解的总数为 $2\cdot1\cdot1=2$。分别组合后得到

$$
\boxed{x\equiv17,297\pmod{315}}.
$$

## 5. $x^2\equiv1$ 的解数

设 $\omega(n)$ 表示 $n$ 的不同素因数个数。

### 5.1 奇素数幂

对奇素数幂 $p^e$，同余

$$
x^2\equiv1\pmod{p^e}
$$

恰有两个解 $x\equiv\pm1\pmod{p^e}$。

**证明** 因为

$$
p^e\mid(x-1)(x+1),
$$

而 $\gcd(x-1,x+1)$ 整除 $2$。$p$ 为奇素数，所以 $p$ 不可能同时整除两个因子，完整的 $p^e$ 必须全部落在其中一个因子上。因此 $x\equiv1$ 或 $x\equiv-1\pmod{p^e}$。证毕。

### 5.2 $2$ 的幂

模 $2^e$ 的解数分别为：

- $e=1$ 时有 $1$ 个解；
- $e=2$ 时有 $2$ 个解；
- $e\ge3$ 时有 $4$ 个解

  $$
  x\equiv\pm1,\ 2^{e-1}\pm1\pmod{2^e}.
  $$

对 $e\ge3$，任何解 $x$ 都是奇数。$x-1,x+1$ 是两个相邻偶数，其中一个恰含一个因子 $2$，因此另一个必须被 $2^{e-1}$ 整除，由此只能得到上述四类。

### 5.3 用 CRT 合并计数

由各素数幂上的局部解数相乘，$x^2\equiv1\pmod n$ 的解类总数为

$$
\boxed{
\begin{cases}
2^{\omega(n)+1},&8\mid n,\\
2^{\omega(n)-1},&n\equiv2\pmod4,\\
2^{\omega(n)},&\text{其他情形}.
\end{cases}
}
$$

类似地，$x^2\equiv x\pmod n$ 在每个素数幂模数上只有 $0,1$ 两个解，因此 CRT 给出总计

$$
2^{\omega(n)}
$$

个解类。

## 6. Generalized Chinese Remainder Theorem

模数不两两互素时，方程组未必有解。真正的障碍是各余数在公共因子上是否相容。

**定理（Generalized CRT）** 设 $n_1,\ldots,n_k$ 为正整数，$b_1,\ldots,b_k\in\mathbb Z$。方程组

$$
x\equiv b_i\pmod{n_i},
\qquad i=1,\ldots,k
$$

有解，当且仅当对所有 $i,j$，

$$
\boxed{\gcd(n_i,n_j)\mid b_i-b_j}.
$$

一旦有解，所有解构成模

$$
L=\operatorname{lcm}(n_1,\ldots,n_k)
$$

的唯一同余类。

### 6.1 必要性

若 $x$ 是解，则 $\gcd(n_i,n_j)$ 同时整除 $x-b_i$ 与 $x-b_j$，所以也整除两者之差 $b_i-b_j$。

### 6.2 充分性

把每个模数写为

$$
n_i=\prod_p p^{e_{i,p}}.
$$

对每个出现过的素数 $p$，令

$$
E_p=\max_i e_{i,p},
$$

并从具有最高 $p$ 次幂的某个原同余式中保留条件

$$
x\equiv b_{i(p)}\pmod{p^{E_p}}.
$$

这些保留下来的 prime-power moduli 两两互素，普通 CRT 给出一个共同解 $x$。

对任一被舍去的条件 $x\equiv b_j\pmod{n_j}$，其每个素数幂 $p^{e_{j,p}}$ 都整除 $\gcd(n_{i(p)},n_j)$。相容条件保证

$$
p^{e_{j,p}}\mid b_{i(p)}-b_j.
$$

而 $x\equiv b_{i(p)}\pmod{p^{E_p}}$，所以 $x\equiv b_j\pmod{p^{e_{j,p}}}$。对 $n_j$ 的全部素数分别处理，便得到 $x\equiv b_j\pmod{n_j}$。

若 $x,y$ 都是解，则每个 $n_i\mid x-y$，所以 $L\mid x-y$；反过来，加上 $L$ 的倍数不会改变任何一个同余条件。证毕。

### 6.3 例：不互素的三个模数

求解

$$
\begin{cases}
x\equiv11\pmod{36},\\
x\equiv7\pmod{40},\\
x\equiv32\pmod{75}.
\end{cases}
$$

先检查兼容性：

$$
\gcd(36,40)=4\mid11-7,
$$

$$
\gcd(36,75)=3\mid11-32,
$$

$$
\gcd(40,75)=5\mid7-32.
$$

保留每个素数的最高幂条件，可化为

$$
x\equiv7\pmod8,
\qquad
x\equiv2\pmod9,
\qquad
x\equiv7\pmod{25}.
$$

写 $x=7+8t$。模 $9$ 条件给出 $t\equiv5\pmod9$，于是 $x=47+72u$。再代入模 $25$ 条件，得到 $u\equiv5\pmod{25}$。因此

$$
\boxed{x\equiv407\pmod{1800}},
$$

其中

$$
1800=\operatorname{lcm}(36,40,75).
$$

## 7. 小结

普通 CRT 的关键词是“两两互素”，它把多个局部条件唯一地拼成模乘积的整体条件；环论形式则说明这种拼接实际是

$$
\mathbb Z_N\cong
\mathbb Z_{n_1}\times\cdots\times\mathbb Z_{n_k}.
$$

对多项式同余，根集也随之分解，根的数量相乘。若模数不互素，则要把“两两互素”替换成精确的相容条件

$$
\gcd(n_i,n_j)\mid b_i-b_j,
$$

并把最终模数从乘积改为最小公倍数。
