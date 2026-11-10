---
title: Elementary Number Theory-Chap8
date: 2026-11-10 15:01:06
updated: 2026-11-10 15:01:06
math: true
categories:
  - Elementary Number Theory
tags:
  - Elementary Number Theory
  - Power Congruence
  - Primitive Root
  - Hensel's Lemma
  - Lifting Roots
description: Elementary Number Theory Notes (8):Indices, Power Congruences and Hensel Lifting
---

当模 $n$ 存在 primitive root 时，单位群是 cyclic group，幂同余可以通过 index 转化成普通线性同余。另一条主线是把模 $p^k$ 的多项式根提升到模 $p^{k+1}$：Hensel's lemma 用导数决定新增加的 base-$p$ 数位，是 Newton's method 在 $p$-adic 世界中的对应物。

<!-- more -->

## 1. Indices 与 Power Congruences

### 1.1 Artin's Primitive-Root Conjecture

**猜想（Artin's Primitive-Root Conjecture）** 设 $a\in\mathbb Z$，且 $a\ne-1$、$a$ 不是完全平方数。则存在无穷多个素数 $p$，使 $a$ 是模 $p$ 的 primitive root。

猜想还预言这样的素数具有正的自然密度。对 $a=2$，预测密度为 Artin's constant：

$$
\boxed{
A
=\prod_{\ell\ \mathrm{prime}}
\left(
1-\frac1{\ell(\ell-1)}
\right)
=0.3739558136\ldots
}
$$

对一般 $a$，密度还可能乘上一个有理修正因子。

#### 为什么排除 $a=-1$ 和完全平方数？

$-1$ 模奇素数的阶为 $2$，因此当 $p>3$ 时，它不可能具有阶 $p-1$，不可能成为 primitive root。

若 $a=b^2$ 是完全平方数，那么模 $p$ 时

$$
a^{(p-1)/2}
=b^{p-1}
\equiv1\pmod p
$$

只要 $p\nmid b$。所以 $a$ 的阶整除 $(p-1)/2$，也不能达到 $p-1$。因此这两类整数不可能满足猜想的结论。

Artin's conjecture 至今仍未在一般情形下得到无条件证明。它在本讲中的作用是说明：primitive roots 不只是有限群中的抽象生成元，其在素数中的分布还包含深刻的未解问题。

### 1.2 Index：模运算中的离散对数

设模 $n$ 存在 primitive root $g$，并令

$$
N=\varphi(n).
$$

因为

$$
U_n=\langle g\rangle,
$$

每个单位 $a\in U_n$ 都可以唯一写成

$$
a\equiv g^j\pmod n,
\qquad0\le j<N.
$$

**定义** 这个唯一的指数 $j$ 称为 $a$ 相对于 $g$ 的 **index**，记为

$$
\operatorname{ind}_g(a)=j.
$$

也可以把 index 看成模 $N$ 的剩余类。

Index 类似于普通对数：它把乘法转化成加法。若

$$
a\equiv g^r,\qquad b\equiv g^s\pmod n,
$$

则

$$
ab\equiv g^{r+s}\pmod n,
$$

所以

$$
\boxed{
\operatorname{ind}_g(ab)
\equiv
\operatorname{ind}_g(a)+\operatorname{ind}_g(b)
\pmod N.
}
$$

同理，

$$
\boxed{
\operatorname{ind}_g(a^k)
\equiv
k\operatorname{ind}_g(a)
\pmod N.
}
$$

并且

$$
\operatorname{ind}_g(1)=0,
\qquad
\operatorname{ind}_g(g)=1.
$$

之所以称为“离散对数”，是因为从 $g^j$ 反求 $j$ 类似于解指数方程；但这里的变量位于有限 cyclic group 中。对大素数，这个 discrete logarithm problem 通常很难，也是许多密码系统的基础。

#### 例：模 $11$ 的 Index Table

$2$ 是模 $11$ 的 primitive root，其幂为

$$
\begin{array}{c|cccccccccc}
j&0&1&2&3&4&5&6&7&8&9\\
\hline
2^j\bmod11&1&2&4&8&5&10&9&7&3&6
\end{array}
$$

因此例如

$$
\operatorname{ind}_2(7)=7,
\qquad
\operatorname{ind}_2(3)=8.
$$

又因为

$$
7\cdot3=21\equiv10\pmod{11},
$$

所以

$$
\operatorname{ind}_2(10)
\equiv7+8
\equiv5\pmod{10},
$$

与表中 $2^5\equiv10$ 一致。

### 1.3 一般 Power Congruence

考虑

$$
x^k\equiv a\pmod n,
$$

其中模 $n$ 存在 primitive root，且 $a\in U_n$。

**定理** 令

$$
d=\gcd(k,\varphi(n)).
$$

则同余

$$
x^k\equiv a\pmod n
$$

有解，当且仅当

$$
\boxed{
a^{\varphi(n)/d}\equiv1\pmod n.
}
$$

一旦有解，模 $n$ 恰有 $d$ 个解类。

**证明** 取模 $n$ 的 primitive root $g$，令

$$
N=\varphi(n).
$$

写成

$$
a\equiv g^r\pmod n.
$$

若 $x^k\equiv a$，由于 $a$ 是单位，$x$ 也必须是单位，因此存在 $i$ 使

$$
x\equiv g^i\pmod n.
$$

代入原方程：

$$
g^{ki}\equiv g^r\pmod n.
$$

$g$ 的阶为 $N$，所以这等价于指数的线性同余

$$
\boxed{ki\equiv r\pmod N}.
$$

线性同余理论告诉我们，它有解当且仅当

$$
d=\gcd(k,N)\mid r,
$$

并且有解时模 $N$ 恰有 $d$ 个解类 $i$。不同的 $i\bmod N$ 对应不同的 $g^i\bmod n$，所以原幂同余也恰有 $d$ 个解。

还需要把条件 $d\mid r$ 改写成不依赖 index 的形式。因为 $a\equiv g^r$，

$$
a^{N/d}\equiv1\pmod n
$$

当且仅当

$$
g^{rN/d}\equiv1\pmod n.
$$

$g$ 的阶为 $N$，所以

$$
N\mid\frac{rN}{d}.
$$

约去 $N$，得到

$$
d\mid r.
$$

因此

$$
a^{N/d}\equiv1\pmod n
\iff
d\mid r,
$$

证明完成。

#### 定理的直观意义

取 $k$ 次幂在 cyclic group 中对应指数映射

$$
i\longmapsto ki\pmod N.
$$

这个映射的核有 $d=\gcd(k,N)$ 个元素，所以每个能够到达的值都有 $d$ 个原像；不能到达的值则没有原像。这解释了为什么解数不是任意的，而是“零个或恰好 $d$ 个”。

当 $\gcd(k,\varphi(n))=1$ 时，$d=1$，取 $k$ 次幂是 $U_n$ 上的双射，因此每个单位 $a$ 都有唯一的 $k$ 次根。

### 1.4 例：求解 $x^6\equiv9\pmod{17}$

$3$ 是模 $17$ 的 primitive root。因为

$$
3^8\equiv-1\pmod{17},
$$

所以 $3$ 的阶不整除 $8$；它的阶又整除 $16$，因此阶只能是 $16$。

写

$$
x\equiv3^i\pmod{17},
\qquad
9\equiv3^2\pmod{17}.
$$

原方程转化为

$$
6i\equiv2\pmod{16}.
$$

这里

$$
\gcd(6,16)=2,
$$

且 $2\mid2$，所以有两个解类。约去 $2$：

$$
3i\equiv1\pmod8.
$$

$3^{-1}\equiv3\pmod8$，所以

$$
i\equiv3\pmod8.
$$

模 $16$ 对应

$$
i\equiv3,11\pmod{16}.
$$

因此

$$
x\equiv3^3,3^{11}\pmod{17}.
$$

计算

$$
3^3=27\equiv10\pmod{17},
$$

以及

$$
3^{11}=3^8\cdot3^3\equiv(-1)\cdot10\equiv7\pmod{17}.
$$

所以全部解为

$$
\boxed{x\equiv7,10\pmod{17}}.
$$

可以验证

$$
7^6\equiv10^6\equiv9\pmod{17}.
$$

## 2. 模素数幂提升多项式根

### 2.1 什么是 Lift？

设 $p$ 是素数。若

$$
s\equiv r\pmod{p^k},
$$

就称 $[s]\in\mathbb Z_{p^{k+1}}$ 是 $[r]\in\mathbb Z_{p^k}$ 的一个 **lift（提升）**。

如果 $r$ 还是同余

$$
f(x)\equiv0\pmod{p^k}
$$

的根，并且

$$
f(s)\equiv0\pmod{p^{k+1}},
$$

就称 $s$ 是根 $r$ 从模 $p^k$ 到模 $p^{k+1}$ 的 lift。

模 $p^{k+1}$ 中所有约化为 $r\bmod p^k$ 的类都具有形式

$$
\boxed{
s=r+tp^k,
\qquad
t=0,1,\ldots,p-1.
}
$$

因此一个模 $p^k$ 的类共有 $p$ 个候选 lifts。问题是：其中有几个仍然是多项式根？

### 2.2 Hensel's Lemma：One-Step Form

**定理（Hensel's Lemma）** 设 $f\in\mathbb Z[x]$、$k\ge1$，并假设

$$
f(r)\equiv0\pmod{p^k},
$$

以及

$$
f'(r)\not\equiv0\pmod p.
$$

写成

$$
f(r)=p^kq.
$$

则存在唯一的 $t\bmod p$，使

$$
s=r+tp^k
$$

满足

$$
f(s)\equiv0\pmod{p^{k+1}}.
$$

这个唯一的 $t$ 为

$$
\boxed{
t\equiv-q[f'(r)]^{-1}\pmod p.
}
$$

**证明** 令

$$
s=r+tp^k.
$$

对多项式作 Taylor expansion，或者逐项使用 binomial theorem：

$$
f(r+tp^k)
\equiv
f(r)+tp^kf'(r)
\pmod{p^{k+1}}.
$$

为什么二次及更高项可以忽略？它们都含有

$$
(tp^k)^j,\qquad j\ge2,
$$

因而至少被 $p^{2k}$ 整除。由于 $k\ge1$，

$$
2k\ge k+1,
$$

所以这些项模 $p^{k+1}$ 全部为 $0$。

代入 $f(r)=p^kq$：

$$
f(s)
\equiv
p^k(q+tf'(r))
\pmod{p^{k+1}}.
$$

因此

$$
f(s)\equiv0\pmod{p^{k+1}}
$$

当且仅当

$$
q+tf'(r)\equiv0\pmod p.
$$

假设 $f'(r)\not\equiv0\pmod p$，所以 $f'(r)$ 在模 $p$ 下可逆。这个关于 $t$ 的线性同余有唯一解：

$$
t\equiv-q[f'(r)]^{-1}\pmod p.
$$

证毕。

#### 为什么导数非零如此重要？

导数条件保证线性修正项

$$
tf'(r)
$$

能够随着 $t$ 遍历全部模 $p$ 剩余类，因此恰好有一个 $t$ 可以抵消误差 $q$。

这种根称为 **nonsingular root** 或 simple root。对 nonsingular root：

- lift 一定存在；
- lift 唯一；
- 下一层的根仍与原根模 $p$ 同余，导数继续非零，因此可以不断提升。

### 2.3 逐层唯一提升

**推论** 若 $a$ 是

$$
f(x)\equiv0\pmod p
$$

的根，并且

$$
p\nmid f'(a),
$$

则对每个 $m\ge1$，$a$ 都唯一提升为模 $p^m$ 的一个根。

**证明** 从模 $p$ 的根开始反复使用 one-step Hensel's lemma。每次得到的 lift 都与 $a$ 模 $p$ 同余，所以

$$
f'(r)\equiv f'(a)\not\equiv0\pmod p.
$$

因此下一次提升仍满足定理条件，且仍然唯一。证毕。

这说明一个模 $p$ 的 nonsingular root 决定了一条唯一的根链：

$$
r_1\pmod p
\longleftarrow
r_2\pmod{p^2}
\longleftarrow
r_3\pmod{p^3}
\longleftarrow\cdots.
$$

### 2.4 Block Lifting

有时可以一次提升不止一层。假设

$$
1\le m\le k
$$

并且

$$
f(r)\equiv0\pmod{p^k}.
$$

从模 $p^k$ 提升到模 $p^{k+m}$ 的候选可写成

$$
s=r+p^kt,
\qquad t\bmod p^m.
$$

因为 $m\le k$，Taylor expansion 中的二次项被 $p^{2k}$ 整除，而

$$
2k\ge k+m.
$$

所以模 $p^{k+m}$ 仍只需保留线性项：

$$
f(s)\equiv f(r)+p^ktf'(r)\pmod{p^{k+m}}.
$$

除以 $p^k$，得到关于 $t$ 的同余：

$$
\frac{f(r)}{p^k}+f'(r)t\equiv0\pmod{p^m}.
$$

若 $f'(r)$ 模 $p^m$ 可逆，令

$$
u\equiv[f'(r)]^{-1}\pmod{p^m},
$$

则

$$
t\equiv-\frac{f(r)}{p^k}u\pmod{p^m}.
$$

因此唯一 lift 可直接写成

$$
\boxed{
s\equiv r-f(r)u\pmod{p^{k+m}}.
}
$$

One-step lifting 是 $m=1$ 的特殊情形；block lifting 则一次确定多个 base-$p$ 数位。

### 2.5 完整例题：提升三次多项式的根

令

$$
f(x)=x^3-x^2+4x+1.
$$

模 $5$ 时，

$$
f(1)=5\equiv0\pmod5,
$$

$$
f(-1)=-5\equiv0\pmod5.
$$

所以模 $5$ 的根为

$$
x\equiv\pm1\pmod5.
$$

导数为

$$
f'(x)=3x^2-2x+4.
$$

#### 分支一：从 $r=-1$ 开始

首先

$$
f(-1)=-5=5(-1),
$$

所以 $q=-1$。又有

$$
f'(-1)=9\equiv4\pmod5.
$$

$4$ 在模 $5$ 下的逆元仍是 $4$，因为

$$
4\cdot4\equiv1\pmod5.
$$

Hensel 公式给出

$$
t\equiv-(-1)\cdot4\equiv4\pmod5.
$$

因此模 $25$ 的 lift 为

$$
s=-1+4\cdot5=19\equiv-6\pmod{25}.
$$

接着用代表元 $r=-6$：

$$
f(-6)=-275=25(-11),
$$

所以这一步 $q=-11$。同时

$$
f'(-6)=124\equiv4\pmod5.
$$

因此

$$
t\equiv-(-11)\cdot4
\equiv44
\equiv4\pmod5.
$$

模 $125$ 的 lift 为

$$
s=-6+4\cdot25=94.
$$

所以这个分支依次为

$$
\boxed{
x\equiv-1\pmod5,\qquad
x\equiv19\pmod{25},\qquad
x\equiv94\pmod{125}.
}
$$

#### 分支二：从 $r=1$ 开始

这里

$$
f(1)=5,
$$

但

$$
f'(1)=3-2+4=5\equiv0\pmod5.
$$

这个根是 singular root，不能应用 nonsingular Hensel's lemma。事实上它没有模 $25$ 的 lift。

候选 lifts 为

$$
s=1+5t,
\qquad t=0,1,2,3,4.
$$

Taylor 公式给出

$$
f(s)\equiv f(1)+5t f'(1)\equiv5\pmod{25},
$$

与 $t$ 无关，始终不为 $0$。所以该分支在模 $25$ 时消失。

## 3. 与 Newton's Method 的类比

实数上的 Newton iteration 为

$$
x_{j+1}
=x_j-\frac{f(x_j)}{f'(x_j)}.
$$

Hensel lifting 的修正公式同样使用

$$
[f'(r)]^{-1}.
$$

区别在于：

- Newton's method 通过实数绝对值让误差越来越小；
- Hensel lifting 让误差被越来越高次的 $p$ 整除；
- 每一步确定根的一个新 base-$p$ 数位。

条件

$$
f'(r)\not\equiv0\pmod p
$$

正对应实分析中 simple root 的条件 $f'(r)\ne0$。在两种环境里，非零导数都保证局部可逆性和修正步骤的唯一性。

## 4. Singular Roots 的提升

当

$$
f'(r)\equiv0\pmod p
$$

时，Hensel lift 不再保证唯一。此时可能一个 lift 都没有，也可能所有 $p$ 个候选都是 lifts。

**命题（Singular One-Step Case）** 假设

$$
f(r)=p^kq
$$

并且

$$
f'(r)\equiv0\pmod p.
$$

则：

1. 若 $q\not\equiv0\pmod p$，根 $r$ 没有模 $p^{k+1}$ 的 lift；
2. 若 $q\equiv0\pmod p$，全部 $p$ 个类

   $$
   r+tp^k,\qquad t=0,\ldots,p-1
   $$

   都是模 $p^{k+1}$ 的根。

**证明** Hensel's lemma 的计算仍然告诉我们，候选 $s=r+tp^k$ 是根，当且仅当

$$
q+tf'(r)\equiv0\pmod p.
$$

现在 $f'(r)\equiv0\pmod p$，所以左边恒等于

$$
q\pmod p,
$$

完全不依赖 $t$。

- 若 $q\not\equiv0\pmod p$，没有任何 $t$ 可行；
- 若 $q\equiv0\pmod p$，每个 $t$ 都可行。

证毕。

### 4.1 例：没有 Lift

考虑

$$
f(x)=x^2+1.
$$

模 $2$ 时，$x\equiv1$ 是根，因为

$$
f(1)=2\equiv0\pmod2.
$$

但

$$
f'(x)=2x,
\qquad
f'(1)=2\equiv0\pmod2.
$$

这里 $k=1$ 且

$$
f(1)=2=2^1\cdot1,
$$

所以 $q=1\not\equiv0\pmod2$。由 singular criterion，该根没有模 $4$ 的 lift。

确实，模 $4$ 的两个候选是 $1,3$，但

$$
1^2+1\equiv3^2+1\equiv2\not\equiv0\pmod4.
$$

### 4.2 例：所有候选都是 Lifts

考虑

$$
f(x)=x^2-1.
$$

模 $4$ 时有两个根

$$
x\equiv\pm1\pmod4.
$$

它们都是 singular roots，因为

$$
f'(x)=2x\equiv0\pmod2.
$$

对 $r=1$，

$$
f(1)=0,
$$

所以 $q=0$，两个模 $8$ lifts 都成立：

$$
1,\quad1+4=5.
$$

对 $r=3\equiv-1\pmod4$，

$$
f(3)=8=4\cdot2,
$$

所以 $q=2\equiv0\pmod2$，两个 lifts 也都成立：

$$
3,\quad3+4=7.
$$

因此模 $8$ 的全部根为

$$
\boxed{x\equiv1,3,5,7\pmod8}.
$$

这与之前得到的 $x^2\equiv1\pmod{2^e}$ 的解数结论一致。

## 5. 小结

当模 $n$ 存在 primitive root $g$ 时，每个单位都可写成 $g$ 的幂。Index 把单位群中的乘法转化成指数上的加法，并把 power congruence

$$
x^k\equiv a\pmod n
$$

化为线性同余

$$
ki\equiv\operatorname{ind}_g(a)\pmod{\varphi(n)}.
$$

若

$$
d=\gcd(k,\varphi(n)),
$$

则方程可解当且仅当

$$
a^{\varphi(n)/d}\equiv1\pmod n,
$$

有解时恰有 $d$ 个解。

Hensel's lemma 则解决另一个方向的问题：如何把模 $p^k$ 的根提升到模 $p^{k+1}$。当

$$
f'(r)\not\equiv0\pmod p
$$

时，lift 存在且唯一；当导数模 $p$ 为零时，lift 的行为分裂为“没有任何 lift”或“全部候选都是 lifts”。

两条主线分别把复杂问题线性化：

- index 把乘法幂同余化为指数的线性同余；
- Hensel lifting 用导数把高次多项式局部化为一阶修正。
