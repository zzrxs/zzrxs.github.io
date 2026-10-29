---
title: Elementary Number Theory-Chap3
date: 2026-10-19 21:29:06
updated: 2026-10-19 21:29:06
math: true
categories:
  - Elementary Number Theory
tags:
  - Elementary Number Theory
  - Congruence
  - Residue Class
  - Linear Congruence
description: Elementary Number Theory Notes (3):Congruence, Residue Class, Modular Arithmetic, Polynomial Congruence and Linear Congruence Equation
---

同余可以看作一种“受控的相等”：我们不要求两个整数本身相同，只要求它们相差模数的整数倍。本章从等价关系出发构造剩余类环 $\mathbb Z_n$，讨论多项式在模运算下的性质，最后完整解决线性同余方程 $ax\equiv b\pmod n$。

<!-- more -->

## 1. 等价关系与剩余类

### 1.1 等价关系

集合 $X$ 上的二元关系 $\sim$ 若满足下列三条，就称为 **equivalence relation**：

1. 反身性：$a\sim a$；
2. 对称性：$a\sim b\Rightarrow b\sim a$；
3. 传递性：$a\sim b$ 且 $b\sim c\Rightarrow a\sim c$。

$a$ 的等价类定义为

$$
[a]=\{x\in X:x\sim a\}.
$$

两个等价类要么完全相同，要么互不相交；并且

$$
[a]=[b]\iff a\sim b.
$$

### 1.2 同余的定义

设 $n$ 为正整数。若

$$
n\mid(a-b),
$$

就称 $a$ 与 $b$ **模 $n$ 同余**，记为

$$
a\equiv b\pmod n.
$$

由带余除法，$a\equiv b\pmod n$ 当且仅当 $a,b$ 除以 $n$ 得到相同余数。

**引理** 模 $n$ 同余是 $\mathbb Z$ 上的等价关系。

**证明**

- $n\mid a-a=0$，所以具有反身性；
- 若 $n\mid a-b$，则 $n\mid-(a-b)=b-a$，所以具有对称性；
- 若 $n\mid a-b$ 且 $n\mid b-c$，则

  $$
  n\mid(a-b)+(b-c)=a-c,
  $$

  所以具有传递性。证毕。

模 $n$ 的所有同余类组成集合

$$
\mathbb Z/n\mathbb Z=\mathbb Z_n.
$$

例如 $\mathbb Z_4$ 有四个类

$$
[0],[1],[2],[3],
$$

其中

$$
[3]=\{4k+3:k\in\mathbb Z\}.
$$

## 2. 剩余类的运算

定义

$$
[a]+[b]=[a+b],
\qquad
[a]-[b]=[a-b],
\qquad
[a][b]=[ab].
$$

这里必须先确认：换一组代表元，结果不会改变。

**引理（Well-Definedness）** 上述加、减、乘法都是良定义的。

**证明** 若 $a\equiv a'\pmod n$ 且 $b\equiv b'\pmod n$，则

$$
(a+b)-(a'+b')=(a-a')+(b-b'),
$$

$$
(a-b)-(a'-b')=(a-a')-(b-b'),
$$

以及

$$
ab-a'b'=a(b-b')+b'(a-a')
$$

都被 $n$ 整除。因此运算结果只依赖同余类，不依赖所选代表元。证毕。

指数一般不能直接换成剩余类。例如模 $3$ 时 $[4]=[1]$，但

$$
[2^4]=[1]\ne[2]=[2^1].
$$

因此在没有额外定义时，类似 $[a]^{[b]}$ 的写法没有意义。

**例** 计算 $3^{2021}\pmod7$。因为

$$
3^3\equiv-1\pmod7,
\qquad
2021=3\cdot673+2,
$$

所以

$$
3^{2021}\equiv(-1)^{673}3^2\equiv-9\equiv5\pmod7.
$$

### 2.1 Group 与 Ring

一个集合 $G$ 配备二元运算，若满足结合律、存在单位元、每个元素都有逆元，就称为 **group**；若运算还满足交换律，则称为 abelian group。

一个带单位元的 **ring** $R$ 满足：

1. $(R,+)$ 是 abelian group；
2. 乘法满足结合律并有单位元 $1$；
3. 乘法对加法满足左右分配律。

若乘法还交换，则称为 commutative ring。

**定理** $\mathbb Z_n$ 在上述加法和乘法下构成带单位元 $[1]$ 的 commutative ring。

**证明** 良定义性已经证明，其余环公理都由 $\mathbb Z$ 中对应的恒等式传递到同余类。证毕。

### 2.2 Complete Residue System

从每个模 $n$ 同余类中恰好选一个代表元，得到的集合称为 **complete residue system modulo $n$**。

常见选择有最小非负剩余系

$$
0,1,\ldots,n-1,
$$

以及最小绝对剩余系。若 $n$ 为奇数，可以取

$$
-\frac{n-1}{2},\ldots,-1,0,1,\ldots,\frac{n-1}{2}.
$$

若 $n$ 为偶数，可在 $-n/2$ 与 $n/2$ 中二选一作为端点。

## 3. 多项式同余

**引理** 设 $f\in\mathbb Z[x]$。若 $a\equiv b\pmod n$，则

$$
f(a)\equiv f(b)\pmod n.
$$

**证明** 对每个 $j\ge1$，有因式分解

$$
a^j-b^j=(a-b)(a^{j-1}+a^{j-2}b+\cdots+b^{j-1}).
$$

因为 $n\mid a-b$，所以 $n\mid a^j-b^j$。将这些差按 $f$ 的整数系数作线性组合，便得到 $n\mid f(a)-f(b)$。证毕。

这说明求解

$$
f(x)\equiv0\pmod n
$$

时，只需检查一个完全剩余系中的 $n$ 个代表元。

**例** 令

$$
f(x)=x^5+x^3-x^2+2.
$$

逐一代入 $x=0,1,2$ 可知，模 $3$ 时唯一解为

$$
x\equiv1\pmod3.
$$

但这不代表 $f(x)=0$ 有整数解。由有理根定理，可能的整数根只有 $\pm1,\pm2$，逐一检验都不是根。反过来，若某个整数方程有整数解，那么它模每个 $n$ 都有解，因此找到一个无解的模数就能排除整数解。

不过，“对每个模数都可解”也不一定推出整数可解。讲义给出

$$
f(x)=(x^2-13)(x^2-17)(x^2-221),
$$

它没有整数根，但以后可证明对每个 $n>1$，同余 $f(x)\equiv0\pmod n$ 都有解。这是 naive local-to-global principle 失效的例子。

### 3.1 Euler's Polynomial

Euler 发现

$$
f(x)=x^2+x+41
$$

在 $-41<x<40$ 的每个整数处都取素数值，但

$$
f(41)=41\cdot43
$$

已经是合数。

**定理** 不存在非恒定多项式 $f\in\mathbb Z[x]$，使 $f(t)$ 对每个整数 $t$ 都是素数。

**证明** 假设存在这样的 $f$。任选 $a\in\mathbb Z$，记 $f(a)=p$，其中 $p$ 为素数。对任意 $k\in\mathbb Z$，

$$
a+kp\equiv a\pmod p.
$$

由多项式保持同余，

$$
f(a+kp)\equiv f(a)\equiv0\pmod p.
$$

而 $f(a+kp)$ 又被假设为素数，所以只能等于 $p$。于是多项式 $f(x)-p$ 在无穷多个整数 $a+kp$ 处为零，这与非零多项式只有有限多个根矛盾。证毕。

## 4. 线性同余方程

考虑

$$
ax\equiv b\pmod n,
\qquad n>0.
$$

它等价于存在整数 $y$ 使

$$
ax-ny=b,
$$

因此可以直接用线性 Diophantine equation 的结论。

### 4.1 可解条件与解的个数

**定理** 令 $d=\gcd(a,n)$。同余

$$
ax\equiv b\pmod n
$$

有解，当且仅当 $d\mid b$。

若 $x_0$ 是一个整数解，则全部整数解为

$$
x=x_0+\frac ndt,
\qquad t\in\mathbb Z.
$$

模 $n$ 意义下恰有 $d$ 个不同的解类，可取代表元

$$
x_0,
x_0+\frac nd,
\ldots,
x_0+(d-1)\frac nd.
$$

**证明** 可解条件和整数通解直接来自 $ax-ny=b$。再看解类计数：参数 $t,t'$ 给出同一个模 $n$ 类，当且仅当

$$
n\mid\frac nd(t-t'),
$$

即 $d\mid t-t'$。所以不同解类恰由 $t$ 模 $d$ 的 $d$ 个类给出。证毕。

特别地，若 $\gcd(a,n)=1$，则 $ax\equiv b\pmod n$ 有唯一解类。

### 4.2 可逆元

**命题** $[a]\in\mathbb Z_n$ 有乘法逆元，当且仅当

$$
\gcd(a,n)=1.
$$

因此

$$
\mathbb Z_n^\times
=\{[a]\in\mathbb Z_n:\gcd(a,n)=1\}
$$

在乘法下构成群。特别地，若 $p$ 是素数，则 $\mathbb Z_p$ 中每个非零类都可逆。

**证明** 若 $\gcd(a,n)=1$，Bézout identity 给出 $au+nv=1$，故 $au\equiv1\pmod n$，即 $[u]$ 是 $[a]$ 的逆元。

反过来，若 $ab\equiv1\pmod n$，则存在 $q$ 使 $ab-nq=1$。$a,n$ 的任一公因数都整除左边，从而整除 $1$，所以 $\gcd(a,n)=1$。证毕。

## 5. 约分与消去

**引理** 设 $n>0$。

1. 若 $d\mid a,b,n$，则

   $$
   ax\equiv b\pmod n
   \iff
   \frac adx\equiv\frac bd\pmod{n/d}.
   $$

2. 若 $c\in\mathbb Z$ 且 $d=\gcd(c,n)$，则

   $$
   ca\equiv cb\pmod n
   \iff
   a\equiv b\pmod{n/c}.
   $$

   特别地，当 $\gcd(c,n)=1$ 时，可以在模 $n$ 同余式两边消去 $c$。

**证明** 第 1 条只是把

$$
n\mid ax-b
$$

两边同除以 $d$。

对第 2 条，写 $c=dc'$, $n=dn'$，其中 $\gcd(c',n')=1$，则

$$
n\mid c(a-b)
\iff
n'\mid c'(a-b)
\iff
n'\mid a-b.
$$

最后一步使用 Euclid's lemma。证毕。

注意模运算中的“约分”一般会同时改变模数。例如

$$
2\cdot1\equiv2\cdot4\pmod6,
$$

但 $1\not\equiv4\pmod6$；正确结论是 $1\equiv4\pmod3$。

## 6. 求解算法

求解

$$
ax\equiv b\pmod n
$$

可以按以下步骤进行：

1. 计算 $d=\gcd(a,n)$；若 $d\nmid b$，则无解；
2. 若 $d\mid b$，约去 $d$，得到

   $$
   a'x\equiv b'\pmod{n'},
   \qquad
   (a',b',n')=\left(\frac ad,\frac bd,\frac nd\right);
   $$

3. 此时 $\gcd(a',n')=1$。用 extended Euclidean algorithm 找到 $u,v$ 使

   $$
   ua'+vn'=1;
   $$

4. 因而

   $$
   x_0\equiv ub'\pmod{n'};
   $$

5. 模 $n$ 的 $d$ 个解类为

   $$
   x\equiv x_0+tn'\pmod n,
   \qquad t=0,1,\ldots,d-1.
   $$

**例** 求解

$$
10x\equiv6\pmod{14}.
$$

这里 $d=\gcd(10,14)=2$，约分后得到

$$
5x\equiv3\pmod7.
$$

因为 $5^{-1}\equiv3\pmod7$，所以

$$
x\equiv3\cdot3\equiv9\equiv2\pmod7.
$$

还原到模 $14$，共有两个解类：

$$
\boxed{x\equiv2,9\pmod{14}}.
$$

## 7. 小结

模 $n$ 同余把无限的整数集合分成 $n$ 个剩余类，并让 $\mathbb Z_n$ 继承整数的加法和乘法。最重要的判据是

$$
ax\equiv b\pmod n\text{ 可解}
\iff
\gcd(a,n)\mid b.
$$

当可解时，解类数正好是 $\gcd(a,n)$；当 $a$ 与 $n$ 互素时，$a$ 在 $\mathbb Z_n$ 中可逆，方程也就有唯一解类。下一章会把多个不同模数下的同余条件合并为一个条件。
