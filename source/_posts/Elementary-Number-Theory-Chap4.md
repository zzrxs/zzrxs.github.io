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
description: Elementary Number Theory Notes (4):Chinese Remainder Theorem, Ring Isomorphism, Polynomial Congruence and Generalized CRT
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
\quad\text{for every }i.
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

因为 $315=9\cdot5\cdot7$，且 $9,5,7$ 两两互素，所以原同余等价于

$$
\begin{cases}
x^2+x+9\equiv0\pmod9,\\
x^2+x+9\equiv0\pmod5,\\
x^2+x+9\equiv0\pmod7.
\end{cases}
$$

#### 1. 模 $9$ 的局部解

模 $9$ 时，常数项 $9\equiv0\pmod9$，所以
$$
x^2+x+9\equiv x^2+x=x(x+1)\pmod9.
$$
因此需要解
$$
x(x+1)\equiv0\pmod9.
$$
因为连续整数 $x$ 与 $x+1$ 互素：
$$
\gcd(x,x+1)=1,
$$
如果 $9=3^2$ 整除它们的乘积，那么完整的 $3^2$ 必须全部落在其中一个因子上。于是 $9\mid x$ 或者 $9\mid x+1.$
因此
$$
x\equiv0\pmod9
$$
或者
$$
x\equiv-1\equiv8\pmod9.
$$
所以模 $9$ 有两个局部解：
$$
\boxed{x\equiv0,8\pmod9}.
$$
也可以直接代入 $0,1,\ldots,8$ 检查，但上面的因式分解更能说明为什么只有这两个解。

#### 2. 模 $5$ 的局部解

模 $5$ 时，
$$
9\equiv4\pmod5,
$$
所以方程变成
$$
x^2+x+4\equiv0\pmod5.
$$
可以直接检验 $x=0,1,2,3,4$：
$$
\begin{aligned}
f(0)&\equiv4,\\
f(1)&\equiv1+1+4\equiv1,\\
f(2)&\equiv4+2+4=10\equiv0,\\
f(3)&\equiv9+3+4=16\equiv1,\\
f(4)&\equiv16+4+4=24\equiv4.
\end{aligned}
$$
所以唯一解为
$$
\boxed{x\equiv2\pmod5}.
$$
也可以用判别式理解。判别式为
$$
\Delta=1-4\cdot4=-15\equiv0\pmod5,
$$
所以只有一个二重根。由于 $2^{-1}\equiv3\pmod5$，
$$
x\equiv\frac{-1}{2}
\equiv-1\cdot3
\equiv-3
\equiv2\pmod5.
$$

#### 3. 模 $7$ 的局部解

模 $7$ 时，
$$
9\equiv2\pmod7,
$$
所以方程变成
$$
x^2+x+2\equiv0\pmod7.
$$
判别式为
$$
\Delta=1-4\cdot2=-7\equiv0\pmod7.
$$
因此也只有一个二重根：
$$
x\equiv\frac{-1}{2}\pmod7.
$$
因为
$$
2^{-1}\equiv4\pmod7,
$$
所以
$$
x\equiv-4\equiv3\pmod7.
$$
因此模 $7$ 的唯一解为
$$
\boxed{x\equiv3\pmod7}.
$$

#### 4. 得到局部解

$$
\begin{array}{c|c}
\text{模数}&\text{解}\\
\hline
9&x\equiv0,8\pmod9\\
5&x\equiv2\pmod5\\
7&x\equiv3\pmod7
\end{array}
$$

解的总数为 $2\cdot1\cdot1=2$。具体来说，只有下面两组可能：
$$
\begin{cases}
x\equiv0\pmod9,\\
x\equiv2\pmod5,\\
x\equiv3\pmod7,
\end{cases}
$$
以及
$$
\begin{cases}
x\equiv8\pmod9,\\
x\equiv2\pmod5,\\
x\equiv3\pmod7.
\end{cases}
$$
CRT 保证每组局部选择唯一对应一个模 $315$ 的解类。

#### 5. 先合并模 $5$ 和模 $7$

两组解的模 $5$、模 $7$ 条件相同：
$$
\begin{cases}
x\equiv2\pmod5,\\
x\equiv3\pmod7.
\end{cases}
$$
先写成
$$
x=2+5s.
$$
代入模 $7$ 条件：
$$
2+5s\equiv3\pmod7,
$$
所以
$$
5s\equiv1\pmod7.
$$
因为
$$
5^{-1}\equiv3\pmod7,
$$
两边乘以 $3$ 得
$$
s\equiv3\pmod7.
$$
于是令 $s=3+7t$，得到
$$
x=2+5(3+7t)=17+35t.
$$
所以模 $5$ 和模 $7$ 的两个条件可以合并为
$$
\boxed{x\equiv17\pmod{35}}.
$$
现在只需把它分别与两个模 $9$ 条件合并。

#### 6. 第一种情况：$x\equiv8\pmod9$

已经知道
$$
x=17+35t.
$$
要求
$$
17+35t\equiv8\pmod9.
$$
注意
$$
17\equiv8\pmod9,
\qquad
35\equiv8\equiv-1\pmod9,
$$
所以
$$
8+8t\equiv8\pmod9.
$$
即
$$
8t\equiv0\pmod9.
$$
由于 $8$ 在模 $9$ 下可逆，所以
$$
t\equiv0\pmod9.
$$
取 $t=0$，得到
$$
x=17.
$$
因此第一组解为
$$
\boxed{x\equiv17\pmod{315}}.
$$

#### 7. 第二种情况：$x\equiv0\pmod9$

仍然从
$$
x=17+35t
$$
出发，要求
$$
17+35t\equiv0\pmod9.
$$
化简为
$$
8+8t\equiv0\pmod9,
$$
即
$$
8t\equiv1\pmod9.
$$
由于
$$
8^{-1}\equiv8\pmod9
$$
因为
$$
8\cdot8=64\equiv1\pmod9
$$
所以
$$
t\equiv8\pmod9.
$$
取 $t=8$，得到
$$
x=17+35\cdot8=297.
$$
因此第二组解为
$$
\boxed{x\equiv297\pmod{315}}.
$$

#### 8. 验证答案

对 $x=17$：
$$
17^2+17+9=289+17+9=315,
$$
所以
$$
17^2+17+9\equiv0\pmod{315}.
$$
对 $x=297$：
$$
297^2+297+9=88515=315\cdot281,
$$
所以
$$
297^2+297+9\equiv0\pmod{315}.
$$
最终答案为
$$
\boxed{x\equiv17,297\pmod{315}}.
$$
这两个解与模 $9$ 的两个局部根一一对应：
$$
\begin{array}{c|c|c|c}
\text{整体解}&\bmod 9&\bmod5&\bmod7\\
\hline
17&8&2&3\\
297&0&2&3
\end{array}
$$
模 $5$ 和模 $7$ 的局部根都是唯一的，只有模 $9$ 提供了两个选择，所以最终恰好得到两个整体解。

## 5. $x^2\equiv1$ 的解数

这一部分研究的是方程
$$
x^2\equiv1\pmod n,
$$
也就是
$$
n\mid x^2-1=(x-1)(x+1).
$$
核心问题是：模数 $n$ 的素因数幂，应该如何分配到 $x-1$ 与 $x+1$ 这两个相邻数中。

将 $n$ 分解为
$$
n=2^e p_1^{e_1}\cdots p_r^{e_r},
$$
其中 $p_1,\ldots,p_r$ 是互不相同的奇素数。
这些素数幂两两互素，所以由 CRT，
$$
x^2\equiv1\pmod n
$$
等价于同时满足
$$
x^2\equiv1\pmod{2^e}
$$
以及
$$
x^2\equiv1\pmod{p_i^{e_i}},
\qquad i=1,\ldots,r.
$$
因此我们只需要解决两类基本问题：
1. 模奇素数幂 $p^e$；
2. 模 $2^e$。
得到局部解以后，再由 CRT 任意组合。

### 一、奇素数幂

#### 1. 为什么模 $p^e$ 只有 $\pm1$

设 $p$ 是奇素数。方程
$$
x^2\equiv1\pmod{p^e}
$$
等价于
$$
p^e\mid x^2-1=(x-1)(x+1).
$$
关键是
$$
\gcd(x-1,x+1)\mid2.
$$
原因是任何同时整除 $x-1$ 和 $x+1$ 的整数，也会整除两者之差：
$$
(x+1)-(x-1)=2.
$$
因此
$$
\gcd(x-1,x+1)\in\{1,2\}.
$$
由于 $p$ 是奇素数，$p\nmid2$，所以 $p$ 不可能同时整除 $x-1$ 与 $x+1$。
换句话说，$p$ 的全部幂次只能出现在其中一个因子里：
$$
p^e\mid x-1
$$
或者
$$
p^e\mid x+1.
$$
于是
$$
x\equiv1\pmod{p^e}
$$
或者
$$
x\equiv-1\pmod{p^e}.
$$
因此模奇素数幂恰好有两个解：
$$
\boxed{x\equiv\pm1\pmod{p^e}}.
$$
“恰好”需要两部分：
- 我们证明了任何解都必须是 $\pm1$；
- $1$ 和 $-1$ 确实都满足平方同余于 $1$。
并且由于 $p^e$ 是奇数且大于 $2$，这两个剩余类不同。

#### 2. 例：模 $27$

求解
$$
x^2\equiv1\pmod{27}.
$$
因为
$$
27\mid(x-1)(x+1)
$$
且 $3$ 不可能同时整除相差 $2$ 的 $x-1,x+1$，所以 $27$ 必须完整地整除其中一个因子。
因此
$$
x\equiv1\pmod{27}
$$
或者
$$
x\equiv-1\equiv26\pmod{27}.
$$
只有两个解：
$$
\boxed{x\equiv1,26\pmod{27}}.
$$

### 二、$2$ 的幂

$2$ 比奇素数特殊，是因为 $x-1$ 与 $x+1$ 在 $x$ 为奇数时都是偶数。也就是说，因子 $2$ 可以同时出现在两个因子中。
这正是模 $2^e$ 时出现四个解的原因。

#### 1. $e=1$：模 $2$

模 $2$ 只有两个剩余类 $0,1$：
$$
0^2\equiv0\pmod2,
\qquad
1^2\equiv1\pmod2.
$$
所以只有一个解：
$$
\boxed{x\equiv1\pmod2}.
$$
注意模 $2$ 时
$$
1\equiv-1\pmod2,
$$
因此所谓的 $\pm1$ 实际上是同一个剩余类。

#### 2. $e=2$：模 $4$

要求
$$
x^2\equiv1\pmod4.
$$
偶数平方模 $4$ 同余于 $0$，所以 $x$ 必须是奇数。模 $4$ 的奇数类为 $1,3$：
$$
1^2\equiv1\pmod4,
$$
$$
3^2=9\equiv1\pmod4.
$$
因此有两个解：
$$
\boxed{x\equiv1,3\pmod4},
$$
也就是
$$
\boxed{x\equiv\pm1\pmod4}.
$$

#### 3. $e\ge3$：为什么有四个解？

设
$$
x^2\equiv1\pmod{2^e},
\qquad e\ge3.
$$
首先，$x$ 必须是奇数。因为若 $x$ 为偶数，则 $x^2$ 为偶数，不可能满足
$$
x^2\equiv1\pmod{2^e}.
$$
既然 $x$ 为奇数，那么 $x-1$ 和 $x+1$ 都是偶数。
同时，这两个偶数相差 $2$：
$$
(x+1)-(x-1)=2.
$$
因此它们不能同时被 $4$ 整除。事实上：
- 其中一个恰好被 $2$ 整除，但不被 $4$ 整除；
- 另一个至少被 $4$ 整除。

例如：
- 若 $x\equiv1\pmod4$，则 $x-1$ 被 $4$ 整除，而 $x+1$ 只含一个因子 $2$；
- 若 $x\equiv3\pmod4$，则 $x+1$ 被 $4$ 整除，而 $x-1$ 只含一个因子 $2$。

而原方程要求

$$
2^e\mid(x-1)(x+1).
$$

因为其中一个因子只贡献一个 $2$，另一个因子必须至少贡献剩下的 $2^{e-1}$。

#### 4. 第一种情况：$x\equiv1\pmod4$

这时

$$
2\parallel x+1,
$$

即 $x+1$ 恰好含一个因子 $2$。
为了让乘积含有至少 $e$ 个因子 $2$，必须有

$$
2^{e-1}\mid x-1.
$$

所以

$$
x\equiv1\pmod{2^{e-1}}.
$$

但是我们最终是在模 $2^e$ 下研究解。一个模 $2^{e-1}$ 的剩余类会对应两个模 $2^e$ 的类：

$$
x\equiv1\pmod{2^e}
$$

或者

$$
x\equiv1+2^{e-1}\pmod{2^e}.
$$

#### 5. 第二种情况：$x\equiv3\pmod4$

这时

$$
2\parallel x-1,
$$

所以另一个因子必须满足

$$
2^{e-1}\mid x+1.
$$

于是

$$
x\equiv-1\pmod{2^{e-1}}.
$$

提升到模 $2^e$ 后，对应两个类：

$$
x\equiv-1\pmod{2^e}
$$

或者

$$
x\equiv-1+2^{e-1}\pmod{2^e}.
$$

因此总共得到四个解：

$$
\boxed{
x\equiv
1,\ -1,\ 1+2^{e-1},\ -1+2^{e-1}
\pmod{2^e}.
}
$$

通常写成

$$
\boxed{
x\equiv\pm1,\ 2^{e-1}\pm1
\pmod{2^e}.
}
$$

#### 6. 验证这四个数确实是解

$\pm1$ 显然满足。
再检查

$$
x=2^{e-1}+1.
$$

它的平方为

$$
\begin{aligned}
x^2
&=(2^{e-1}+1)^2\\
&=2^{2e-2}+2^e+1.
\end{aligned}
$$

因为 $e\ge3$，所以 $2e-2\ge e$，从而 $2^{2e-2}$ 和 $2^e$ 都被 $2^e$ 整除。因此

$$
x^2\equiv1\pmod{2^e}.
$$

同理，

$$
(2^{e-1}-1)^2
=2^{2e-2}-2^e+1
\equiv1\pmod{2^e}.
$$

所以四个候选全部是解。

#### 7. 例：模 $16$

这里 $e=4$，所以

$$
2^{e-1}=8.
$$

四个解为

$$
x\equiv\pm1,\ 8\pm1\pmod{16}.
$$

也就是

$$
x\equiv1,15,9,7\pmod{16}.
$$

整理为

$$
\boxed{x\equiv1,7,9,15\pmod{16}}.
$$

验证：

$$
1^2\equiv1\pmod{16},
$$

$$
7^2=49\equiv1\pmod{16},
$$

$$
9^2=81\equiv1\pmod{16},
$$

$$
15^2=225\equiv1\pmod{16}.
$$

### 三、用 CRT 计算一般 $n$ 的解数

#### 1. 局部解数相乘

把 $n$ 写成

$$
n=2^e p_1^{e_1}\cdots p_r^{e_r},
$$

其中 $p_1,\ldots,p_r$ 是不同的奇素数。
每个奇素数幂模数提供两个选择：

$$
x\equiv\pm1\pmod{p_i^{e_i}}.
$$

所以奇数部分一共提供

$$
2^r
$$

种局部组合。
$2^e$ 部分的解数则是：

$$
c(e)=
\begin{cases}
1,&e=0,\\
1,&e=1,\\
2,&e=2,\\
4,&e\ge3.
\end{cases}
$$

这里 $e=0$ 表示 $n$ 为奇数，没有 $2$ 的幂这一局部条件。
于是整体解数为

$$
c(e)\cdot2^r.
$$

每一种局部解组合，都由 CRT 唯一确定一个模 $n$ 的整体解。

#### 2. 翻译成 $\omega(n)$

$\omega(n)$ 表示 $n$ 的不同素因数个数。
例如

$$
n=2^5\cdot3^2\cdot7^4
$$

虽然指数很大，但不同素因数只有 $2,3,7$，所以

$$
\omega(n)=3.
$$
下面分情况讨论。

##### 情况一：$8\mid n$

此时 $e\ge3$。
设奇素因数有 $r$ 个，那么

$$
\omega(n)=r+1.
$$

模 $2^e$ 有 $4$ 个解，每个奇素数幂有 $2$ 个解，所以总数为

$$
4\cdot2^r
=2^{r+2}
=2^{\omega(n)+1}.
$$

因此

$$
\boxed{2^{\omega(n)+1}}.
$$

##### 情况二：$n\equiv2\pmod4$

这意味着 $n$ 中恰好只有一个因子 $2$，即

$$
e=1.
$$

模 $2$ 只有一个解，奇素数幂部分有 $2^r$ 种选择。
因为

$$
\omega(n)=r+1,
$$

所以

$$
2^r=2^{\omega(n)-1}.
$$

因此解数为

$$
\boxed{2^{\omega(n)-1}}.
$$

##### 情况三：其他情形

还剩下两类。
$n$ 是奇数
这时没有 $2$ 的局部部分，每个素数幂提供两个解，因此

$$
2^{\omega(n)}
$$

个解。

$4\mid n$ 但 $8\nmid n$
这时 $e=2$。模 $4$ 有两个解，每个奇素数幂也有两个解。所有不同素因数都各贡献一个因子 $2$，所以总数仍为

$$
2^{\omega(n)}.
$$

综上，

$$
\boxed{
\#\{x\bmod n:x^2\equiv1\pmod n\}
=
\begin{cases}
2^{\omega(n)+1},&8\mid n,\\
2^{\omega(n)-1},&n\equiv2\pmod4,\\
2^{\omega(n)},&\text{otherwise}.
\end{cases}
}
$$

### 四、几个计数例子

#### 1. 奇数模数：$n=45$

因为
$$
45=3^2\cdot5,
$$
所以
$$
\omega(45)=2.
$$
$45$ 是奇数，使用“其他情形”：
$$
2^{\omega(45)}=2^2=4.
$$
局部条件为
$$
x\equiv\pm1\pmod9,
$$
$$
x\equiv\pm1\pmod5.
$$
共有四种符号组合，CRT 给出四个解：
$$
\boxed{x\equiv1,19,26,44\pmod{45}}.
$$

#### 2. $n=12$

因为
$$
12=4\cdot3,
$$
且
$$
\omega(12)=2.
$$
这里 $4\mid12$ 但 $8\nmid12$，所以解数为
$$
2^{\omega(12)}=4.
$$
模 $4$ 有两个解 $\pm1$，模 $3$ 也有两个解 $\pm1$，因此共有
$$
2\cdot2=4
$$
个整体解：
$$
\boxed{x\equiv1,5,7,11\pmod{12}}.
$$

#### 3. $n=24$

因为
$$
24=8\cdot3
$$
且
$$
\omega(24)=2.
$$
由于 $8\mid24$，解数为
$$
2^{\omega(24)+1}=2^3=8.
$$
模 $8$ 有四个解：
$$
x\equiv1,3,5,7\pmod8.
$$
模 $3$ 有两个解：
$$
x\equiv1,2\pmod3.
$$
因此一共有
$$
4\cdot2=8
$$
个整体解：
$$
\boxed{x\equiv1,5,7,11,13,17,19,23\pmod{24}}.
$$

### 五、为什么 $x^2\equiv x$ 有 $2^{\omega(n)}$ 个解？

现在考虑
$$
x^2\equiv x\pmod n.
$$
等价于
$$
n\mid x(x-1).
$$
仍将 $n$ 分解为
$$
n=p_1^{e_1}\cdots p_k^{e_k},
$$
其中
$$
k=\omega(n).
$$
首先研究单个素数幂：
$$
x^2\equiv x\pmod{p^e}.
$$
它等价于
$$
p^e\mid x(x-1).
$$
因为连续整数一定互素：
$$
\gcd(x,x-1)=1,
$$
所以素数 $p$ 不可能同时整除 $x$ 与 $x-1$。完整的 $p^e$ 只能落在一个因子中：
$$
p^e\mid x
$$
或者
$$
p^e\mid x-1.
$$
所以模 $p^e$ 只有两个解：
$$
\boxed{x\equiv0,1\pmod{p^e}}.
$$
每个不同的素数幂都可以独立选择 $0$ 或 $1$。一共有 $k=\omega(n)$ 个素数幂，因此局部选择数为
$$
\underbrace{2\cdot2\cdots2}_{k\text{ 个}}
=2^k
=2^{\omega(n)}.
$$
CRT 保证每一种局部选择都唯一对应一个模 $n$ 的整体解，所以
$$
\boxed{
\#\{x\bmod n:x^2\equiv x\pmod n\}
=2^{\omega(n)}.
}
$$
这些满足 $x^2=x$ 的元素称为环 $\mathbb Z_n$ 中的 idempotents。

#### 例：$x^2\equiv x\pmod{12}$

因为
$$
12=4\cdot3,
$$
所以分别求解
$$
x\equiv0\text{ 或 }1\pmod4,
$$
以及
$$
x\equiv0\text{ 或 }1\pmod3.
$$
共有四种局部组合：
$$
\begin{array}{c|c}
x\bmod4&x\bmod3\\
\hline
0&0\\
0&1\\
1&0\\
1&1
\end{array}
$$
用 CRT 合并后分别得到
$$
x\equiv0,4,9,1\pmod{12}.
$$
所以全部解为
$$
\boxed{x\equiv0,1,4,9\pmod{12}}.
$$
验证：
$$
0^2\equiv0\pmod{12},
$$
$$
1^2\equiv1\pmod{12},
$$
$$
4^2=16\equiv4\pmod{12},
$$
$$
9^2=81\equiv9\pmod{12}.
$$
最值得记住的区别是：
- 对 $x^2\equiv1\pmod n$，$2^e$ 部分比较特殊，可能贡献 $1,2$ 或 $4$ 个解；
- 对 $x^2\equiv x\pmod n$，每一个素数幂始终恰好贡献 $0,1$ 两种选择，所以答案总是 $2^{\omega(n)}$。

设 $\omega(n)$ 表示 $n$ 的不同素因数个数。

## 6. Generalized Chinese Remainder Theorem

当模数之间有公共因数时，不同的同余条件可能互相矛盾。方程组有解的关键是：对于任意两个同余条件，它们指定的余数在两个模数的最大公因数下必须相同。

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
