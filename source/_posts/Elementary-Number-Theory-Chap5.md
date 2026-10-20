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
0\equiv f(b)-f(a)\equiv(b-a)g(b)\pmod p.
$$

因为 $\mathbb Z_p$ 是 field，没有 zero divisors，所以要么 $b\equiv a\pmod p$，要么 $g(b)\equiv0\pmod p$。

$g$ 的系数不可能全被 $p$ 整除：否则 $f(a)$ 以及 $(x-a)g(x)$ 的全部系数都被 $p$ 整除，进而 $f$ 的全部系数也被 $p$ 整除，与假设矛盾。由归纳假设，$g$ 至多有 $d-1$ 个根，再加上 $a$，$f$ 至多有 $d$ 个根。证毕。

这个定理的条件缺一不可：

- 次数为 $d$ 的多项式可以少于 $d$ 个根；
- 若全部系数被 $p$ 整除，则每个剩余类都是根；
- 若模数为合数，非零 $d$ 次多项式可能有超过 $d$ 个根。例如 $x^2\equiv1$ 在某些合数模数下有许多解。

**推论** 若次数不超过 $d$ 的多项式模素数 $p$ 有超过 $d$ 个根，则其全部系数都被 $p$ 整除。

### 定理解释

Lagrange's Root Bound 想表达的是：

```text
在模素数的世界里，非零多项式的根不会多得失去控制；一个 d 次多项式至多有 d 个根。
```

这个结论和实数、复数上的“$d$ 次多项式至多有 $d$ 个根”非常相似。真正起作用的不是数的大小，而是模素数 $p$ 时 $mathbb Z_p$ 是一个 field。

#### 1. 为什么“$p$ 是素数”很重要？

在 field 中没有 zero divisors。也就是说，若

$$
uv\equiv0\pmod p,
$$

则必有

$$
u\equiv0\pmod p
$$

或者

$$
v\equiv0\pmod p.
$$

证明中的关键一步

$$
(b-a)g(b)\equiv0\pmod p
$$

正是利用这一性质，把新的根 $b$ 分成两类：要么 $b=a$，要么 $b$ 是次数更低的 $g$ 的根。于是每找到一个根，就可以“剥掉”一个一次因子，次数也随之降低 $1$。

如果模数是合数，这一步就可能失败。例如模 $8$ 时

$$
2\cdot4\equiv0\pmod8,
$$

但 $2\not\equiv0\pmod8$ 且 $4\not\equiv0\pmod8$。因此模 $8$ 的二次方程

$$
x^2\equiv1\pmod8
$$

有

$$
x\equiv1,3,5,7\pmod8
$$

四个解，已经超过多项式 $x^2-1$ 的次数 $2$。

#### 2. 为什么要排除“所有系数都被 $p$ 整除”？

若 $f$ 的全部系数都被 $p$ 整除，那么模 $p$ 时 $f$ 实际上就是零多项式。例如

$$
f(x)=5x^3+10x+15
$$

模 $5$ 时满足

$$
f(x)\equiv0
$$

对每个 $x\in\mathbb Z_5$ 都成立，所以它有 $5$ 个根。此时根数不再受原来次数的限制。

因此定理中的“系数不全被 $p$ 整除”实际是在说：$f$ 模 $p$ 后必须仍是一个非零多项式。

#### 3. 例：一个三次多项式刚好有三个根

考虑

$$
f(x)=x^3-x=x(x-1)(x+1).
$$

模 $5$ 时，它的根为

$$
x\equiv0,1,-1\equiv4\pmod5.
$$

这是三个互不相同的根，刚好等于 $f$ 的次数 $3$。Lagrange's Root Bound 只给出“至多”三个根，并不保证一定有三个根。

例如

$$
x^2+1\equiv0\pmod3
$$

就没有解，因为模 $3$ 的平方只能是 $0$ 或 $1$。

#### 4. 推论应该怎样理解？

若次数不超过 $d$ 的多项式有超过 $d$ 个根，那么它不可能是模 $p$ 的非零多项式。因此唯一的可能是：它的每个系数都模 $p$ 同余于 $0$。

例如设

$$
f(x)=ax+b
$$

在模素数 $p$ 下对两个不同的剩余类都取值 $0$。一次多项式本来至多有一个根；现在出现两个根，只能说明

$$
a\equiv b\equiv0\pmod p.
$$

这个推论常用来证明两个低次多项式相等：如果它们在足够多的点上取值相同，就考察差多项式 $f-g$，再用根数超过次数迫使其所有系数都为零。

## 2. 有限群中的 Lagrange's Theorem

设 $G$ 是群，$H\le G$ 是子群。对 $g\in G$，右陪集$\left(\text{right coset} \right)$定义为

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

### 定理解释

这个定理想表达的核心是：

```text
一个有限群的子群会像大小完全相同的“积木”一样，把整个群整齐地分割。因此，子群的元素个数一定整除整个群的元素个数。
```

#### 1. 为什么陪集像“平移后的子群”？

设 $H$ 是 $G$ 的子群。对某个 $g\in G$，
\[
Hg=\{hg:h\in H\}
\]
可以理解为：把 $H$ 中的每个元素都统一右乘 $g$。
例如在加法群 $\mathbb Z_{12}$ 中，取子群
\[
H=\{0,4,8\}.
\]
加法群中“右乘 $g$”应理解为“加上 $g$”。于是它的陪集为
\[
H+0=\{0,4,8\},
\]
\[
H+1=\{1,5,9\},
\]
\[
H+2=\{2,6,10\},
\]
\[
H+3=\{3,7,11\}.
\]
继续计算会开始重复，例如
\[
H+4=H.
\]
因此 $\mathbb Z_{12}$ 被分成四块：
\[
\mathbb Z_{12}
=\{0,4,8\}
\sqcup
\{1,5,9\}
\sqcup
\{2,6,10\}
\sqcup
\{3,7,11\}.
\]
每一块都有 $3$ 个元素，总共有 $4$ 块，所以
\[
12=4\cdot3.
\]
这正是 Lagrange's theorem：
\[
|G|=|G:H|\,|H|.
\]
其中：
- $|G|=12$ 是整个群的大小；
- $|H|=3$ 是子群的大小；
- $|G:H|=4$ 是陪集数量，也称为 $H$ 在 $G$ 中的指数。

#### 2. 为什么不同陪集要么相同，要么不交？

假设两个陪集 $Hg_1$ 和 $Hg_2$ 有一个公共元素，那么存在 $h_1,h_2\in H$，使得
\[
h_1g_1=h_2g_2.
\]
于是
\[
g_1=h_1^{-1}h_2g_2.
\]
由于 $H$ 是子群，
\[
h_1^{-1}h_2\in H.
\]
因此 $g_1$ 可以写成某个 $H$ 中的元素乘以 $g_2$。这会推出
\[
Hg_1=Hg_2.
\]
所以两个陪集只可能：
- 完全相同；
- 完全不相交。
不可能只重叠一部分。
这就保证了陪集确实能把 $G$ 整齐地分块。

#### 3. 为什么每个陪集与 $H$ 一样大？

考虑映射
\[
\varphi:H\longrightarrow Hg,
\qquad
h\longmapsto hg.
\]
它是双射。

##### 单射

若
\[
h_1g=h_2g,
\]
两边右乘 $g^{-1}$，得到
\[
h_1=h_2.
\]
所以不同的 $h$ 不会得到相同的 $hg$。

##### 满射

根据 $Hg$ 的定义，$Hg$ 中的每个元素本来就具有 $hg$ 的形式。
因此
\[
|Hg|=|H|.
\]
也就是说，虽然陪集通常不是子群，但它的元素个数与 $H$ 完全相同。

#### 4. Lagrange's Theorem 的真正含义

如果有限群 $G$ 有 $|G|$ 个元素，那么任意子群 $H$ 的大小必须整除 $|G|$：
\[
|H|\mid|G|.
\]
例如，一个大小为 $12$ 的群，其子群大小只可能是
\[
1,2,3,4,6,12.
\]
不可能存在大小为 $5$ 或 $7$ 的子群，因为
\[
5\nmid12,\qquad7\nmid12.
\]
不过需要注意：
$d\mid|G|$ 只是存在大小为 $d$ 的子群的必要条件，并不保证一定存在这样的子群。

Lagrange's theorem 只告诉我们哪些大小“不可能”，没有说每个因数都一定能实现。

#### 5. 元素的阶是什么意思？

对 $g\in G$，不断计算
\[
e,g,g^2,g^3,\ldots
\]
因为 $G$ 是有限群，最终一定会回到单位元 $e$。
使
\[
g^m=e
\]
成立的最小正整数 $m$，称为 $g$ 的阶，记作
\[
\operatorname{ord}(g)=m.
\]
由 $g$ 生成的循环子群是
\[
\langle g\rangle
=\{e,g,g^2,\ldots,g^{m-1}\}.
\]
它恰好有 $m$ 个元素，因此
\[
|\langle g\rangle|=\operatorname{ord}(g).
\]
现在对循环子群 $\langle g\rangle$ 使用 Lagrange's theorem：
\[
|\langle g\rangle|\mid|G|.
\]
于是
\[
\boxed{\operatorname{ord}(g)\mid|G|}.
\]
也就是说：
有限群中一个元素的循环周期，一定整除整个群的大小。

#### 6. 为什么能推出 $g^{|G|}=e$？

设
\[
\operatorname{ord}(g)=m.
\]
根据 Lagrange's theorem，
\[
m\mid|G|.
\]
因此存在整数 $q$，使得
\[
|G|=mq.
\]
于是
\[
g^{|G|}
=g^{mq}
=(g^m)^q
=e^q
=e.
\]
所以
\[
\boxed{g^{|G|}=e}.
\]
注意，这里并不是说 $g$ 的阶一定等于 $|G|$，而是说它的阶整除 $|G|$。

#### 7. 例：模 $7$ 的乘法群

考虑
\[
\mathbb Z_7^\times=\{1,2,3,4,5,6\}.
\]
这是模 $7$ 的所有非零剩余类组成的乘法群，共有
\[
|\mathbb Z_7^\times|=6
\]
个元素。
取 $g=2$：
\[
2^1\equiv2\pmod7,
\]
\[
2^2\equiv4\pmod7,
\]
\[
2^3\equiv8\equiv1\pmod7.
\]
因此
\[
\operatorname{ord}(2)=3.
\]
Lagrange's theorem 断言这个阶必须整除群的大小：
\[
3\mid6.
\]
同时，
\[
2^6=(2^3)^2\equiv1^2\equiv1\pmod7.
\]
再取 $g=3$：
\[
3^1\equiv3,
\]
\[
3^2\equiv2,
\]
\[
3^3\equiv6,
\]
\[
3^4\equiv4,
\]
\[
3^5\equiv5,
\]
\[
3^6\equiv1\pmod7.
\]
所以
\[
\operatorname{ord}(3)=6.
\]
同样满足
\[
6\mid6.
\]
因此群中不同元素的阶可以不同，但都必须整除群的大小。

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

### 3.1 定理解释

Fermat's Little Theorem 可以理解为 Lagrange's theorem 在模素数乘法群中的直接应用。

#### 1. 为什么指数恰好是 $p-1$？

模素数 $p$ 时，非零剩余类为

$$
\mathbb Z_p^\times=\{[1],[2],\ldots,[p-1]\},
$$

一共有 $p-1$ 个元素。Lagrange's theorem 告诉我们，每个 $[a]$ 的阶都整除 $p-1$。若

$$
\operatorname{ord}_p(a)=m,
$$

则 $m\mid p-1$，从而

$$
a^{p-1}=\left(a^m\right)^{(p-1)/m}\equiv1\pmod p.
$$

所以 $p-1$ 是对所有非零剩余类都有效的统一指数，但它不一定是每个元素的最小指数。

例如模 $7$ 时，$2$ 的阶为 $3$：

$$
2^3\equiv1\pmod7.
$$

虽然最小指数是 $3$，Fermat's little theorem 给出的

$$
2^6\equiv1\pmod7
$$

当然仍然成立。

#### 2. 为什么条件 $p\nmid a$ 不能省略？

若 $p\mid a$，则 $[a]=[0]$，它不属于乘法群 $\mathbb Z_p^\times$，也没有乘法逆元。此时

$$
a^{p-1}\equiv0\pmod p,
$$

而不是 $1$。

不过把等式再乘一个 $a$ 后，就得到对所有整数都成立的统一形式

$$
a^p\equiv a\pmod p.
$$

这也是为什么多项式计算中经常使用 $x^p\equiv x$，而不是只使用 $x^{p-1}\equiv1$。

#### 3. 例：计算大指数

计算

$$
7^{222}\pmod{13}.
$$

因为 $13$ 是素数且 $13\nmid7$，所以

$$
7^{12}\equiv1\pmod{13}.
$$

将指数除以 $12$：

$$
222=18\cdot12+6.
$$

因此

$$
7^{222}\equiv7^6\pmod{13}.
$$

继续计算

$$
7^2=49\equiv10\pmod{13},
$$

$$
7^4\equiv10^2=100\equiv9\pmod{13},
$$

所以

$$
7^6\equiv7^4\cdot7^2\equiv9\cdot10=90\equiv12\pmod{13}.
$$

最终

$$
\boxed{7^{222}\equiv12\pmod{13}}.
$$

Fermat's little theorem 的实际作用不是直接给出每个幂的答案，而是把巨大指数按 $p-1$ 化简。

#### 4. 它是素数的必要条件，不是充分条件

若 $p$ 是素数，则 Fermat 同余一定成立；但反过来，某个整数满足

$$
a^{n-1}\equiv1\pmod n
$$

并不能保证 $n$ 是素数。后面将看到，$341$ 是合数，却满足 base-$2$ Fermat test。这正是 pseudoprime 出现的原因。

### 3.2 每个 $\mathbb Z_p$ 上的函数都是多项式函数

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

#### Indicator Polynomial 的直观含义

$\delta_a(x)$ 可以看作模 $p$ 世界中的“开关”：

$$
\delta_a(x)=
\begin{cases}
1,&x=a,\\
0,&x\ne a.
\end{cases}
$$

因此求和

$$
F(x)=\sum_{a\in\mathbb Z_p}h(a)\delta_a(x)
$$

在输入 $x=b$ 时，除了 $a=b$ 对应的那一项外，其余项全部变为 $0$，只留下

$$
F(b)=h(b)\delta_b(b)=h(b).
$$

这和 Lagrange interpolation 的思想相同：为每个输入点构造一个只在该点取值 $1$、在其他点取值 $0$ 的基函数，再按照目标函数值进行线性组合。

需要注意的是，“每个函数都能用多项式表示”并不表示表示它的多项式唯一。例如由

$$
x^p-x\equiv0\pmod p
$$

可知，多项式 $F(x)$ 与

$$
F(x)+(x^p-x)Q(x)
$$

在 $\mathbb Z_p$ 上表示完全相同的函数。唯一的是函数的取值，而不是多项式的形式。

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

### 定理解释

Wilson's theorem 给出了一个非常漂亮的等价关系：

```text
n 是素数，当且仅当从 1 乘到 n-1 的结果模 n 等于 -1。
```

#### 1. 为什么逆元配对后只剩下 $1$ 和 $-1$？

在 $\mathbb Z_p^\times$ 中，每个元素 $a$ 都有唯一逆元 $a^{-1}$。如果 $a\ne a^{-1}$，就可以把二者配成一对，它们的乘积为 $1$。

只有满足

$$
a=a^{-1}
$$

的元素不能与另一个不同元素配对。该条件等价于

$$
a^2\equiv1\pmod p.
$$

模素数时，

$$
(a-1)(a+1)\equiv0\pmod p
$$

只能推出 $a\equiv1$ 或 $a\equiv-1$。所以全部元素相乘时，普通逆元对都贡献 $1$，最后只剩

$$
1\cdot(-1)=-1.
$$

#### 2. 例：$p=7$

模 $7$ 的非零元素为

$$
1,2,3,4,5,6.
$$

其逆元配对为

$$
2^{-1}\equiv4\pmod7,
\qquad
3^{-1}\equiv5\pmod7,
$$

而 $1$ 与 $6\equiv-1$ 是自逆元。因此

$$
6!
\equiv1\cdot(2\cdot4)(3\cdot5)\cdot6
\equiv1\cdot1\cdot1\cdot(-1)
\equiv-1\pmod7.
$$

数值上

$$
6!=720\equiv6\equiv-1\pmod7.
$$

#### 3. 合数为什么不能满足？

若 $n$ 是合数，它有真因数 $d$，其中 $1<d<n$。这个 $d$ 本身就是 $(n-1)!$ 的一个因子，因此

$$
d\mid(n-1)!.
$$

如果还假设 $(n-1)!\equiv-1\pmod n$，那么因为 $d\mid n$，也必须有

$$
d\mid(n-1)!+1.
$$

这样 $d$ 就同时整除两个相邻整数 $(n-1)!$ 与 $(n-1)!+1$，只能有 $d=1$，与 $d>1$ 矛盾。

例如 $n=8$ 时

$$
7!=5040\equiv0\pmod8,
$$

并不等于 $-1\pmod8$。

#### 4. 为什么它不适合直接做大整数素性检验？

理论上，只要计算 $(n-1)!\bmod n$ 就能判断 $n$ 是否为素数。但这需要进行大约 $n$ 次乘法；若 $n$ 有 $B$ 个二进制位，那么 $n$ 的大小约为 $2^B$，运算次数对输入位数是指数级的。

所以 Wilson's theorem 更适合用于理论证明，而 Fermat test、Miller–Rabin 等方法更适合实际计算。

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

#### 命题解释与例子

这个命题把“$-1$ 能否写成平方”完全归结为素数除以 $4$ 的余数：

$$
-1\text{ 是模 }p\text{ 的平方}
\iff
p\equiv1\pmod4.
$$

其背后的原因是：如果 $x^2\equiv-1$，那么 $x^4\equiv1$，但 $x^2\not\equiv1$，所以 $x$ 在乘法群中的阶恰好是 $4$。Lagrange's theorem 要求

$$
4\mid|\mathbb Z_p^\times|=p-1,
$$

也就是 $p\equiv1\pmod4$。

例如 $p=13$ 满足 $13\equiv1\pmod4$，并且

$$
5^2=25\equiv12\equiv-1\pmod{13}.
$$

所以两个解为

$$
x\equiv\pm5\equiv5,8\pmod{13}.
$$

而 $p=7$ 满足 $7\equiv3\pmod4$。模 $7$ 的平方剩余只有

$$
0,1,2,4,
$$

不包含 $-1\equiv6$，因此 $x^2\equiv-1\pmod7$ 无解。

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

### 5.1 概念解释

Fermat test 的逻辑方向是

$$
n\text{ 是素数}
\Longrightarrow
a^n\equiv a\pmod n.
$$

因此，如果计算发现

$$
a^n\not\equiv a\pmod n,
$$

就可以断定 $n$ 一定是合数。这样的 $a$ 称为证明 $n$ 为合数的 Fermat witness。

但是反方向不成立：通过测试只说明“这一次没有发现它是合数”，不能证明它一定是素数。Pseudoprime 正是通过了某个底数测试的合数。

#### 1. 为什么互素时可以把指数从 $n$ 改成 $n-1$？

若 $\gcd(a,n)=1$，则 $a$ 在模 $n$ 下有逆元。于是

$$
a^n\equiv a\pmod n
$$

两边可以约去 $a$，得到

$$
a^{n-1}\equiv1\pmod n.
$$

反过来，把后一个同余两边乘以 $a$ 就得到前一个。因此在 $a$ 与 $n$ 互素时，两种写法完全等价。

若 $\gcd(a,n)>1$，则 $a$ 未必可逆，不能随意约去。例如模 $8$ 时

$$
2\cdot1\equiv2\cdot5\pmod8,
$$

但 $1\not\equiv5\pmod8$。

#### 2. 为什么 $341$ 能骗过 base-$2$ test？

关键巧合是

$$
341=11\cdot31
$$

并且

$$
2^{10}=1024=3\cdot341+1.
$$

所以 $2^{10}$ 在模 $341$ 下已经回到 $1$。由于

$$
340=34\cdot10,
$$

便有

$$
2^{340}=(2^{10})^{34}\equiv1\pmod{341}.
$$

这和素数时的 Fermat 同余形式完全一样，但 $341$ 的分解已经明确告诉我们它是合数。

#### 3. 一次测试与多次测试

一个数可能通过某个底数的 Fermat test，却在另一个底数下失败。因此实际素性检验会选择多个底数，或者使用更强的 Miller–Rabin test。

不过后面介绍的 Carmichael numbers 更麻烦：它们会对所有底数都满足 $a^n\equiv a\pmod n$。所以无论尝试多少个普通 Fermat 底数，都不能排除这类合数。

### 5.2 Base-$2$ Pseudoprimes 有无穷多个

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

#### 定理的构造思路

这个定理同时完成了两件不同的事：

1. 证明 $M_n=2^n-1$ 是合数；
2. 证明这个合数仍然通过 base-$2$ Fermat test。

第一件事依赖 $n$ 本身是合数。若 $d$ 是 $n$ 的真因数，则

$$
2^d-1\mid2^n-1,
$$

所以 $M_n$ 有真因数。

第二件事依赖 $n$ 已经通过 base-$2$ test：

$$
2^n\equiv2\pmod n
\iff
n\mid2^n-2.
$$

这个整除关系恰好使 $M_n-1=2^n-2$ 成为 $n$ 的倍数；而在模 $M_n$ 下又天然有

$$
2^n\equiv1\pmod{M_n}.
$$

两条关系结合起来，就得到

$$
2^{M_n-1}\equiv1\pmod{M_n}.
$$

从一个 pseudoprime 构造出更大的 pseudoprime，并且可以无限重复，这就是“存在无穷多个”的证明机制。这里给出的是存在性构造，并不表示得到的数适合直接展开计算；从 $341$ 开始，下一项 $2^{341}-1$ 已经非常大。

## 6. Carmichael Numbers

合数 $n$ 若对每个整数 $a$ 都满足

$$
a^n\equiv a\pmod n,
$$

就称为 **Carmichael number**。对与 $n$ 互素的 $a$，这等价于 $a^{n-1}\equiv1\pmod n$。

Alford、Granville 与 Pomerance 已证明 Carmichael numbers 有无穷多个。

### 概念解释

普通 base-$a$ pseudoprime 只需要骗过一个固定底数 $a$；Carmichael number 则对每个整数 $a$ 都模仿素数的 Fermat 性质。因此可以把它理解为

```text
对所有底数都通过普通 Fermat test 的合数。
```

这里的“对所有整数 $a$”看起来条件很强，但因为同余只取决于 $a\bmod n$，实际只需检查 $n$ 个剩余类。不过，逐个检查仍不能解释其结构；Korselt criterion 则把这个全称条件转化为关于 $n$ 的素因数的简单整除条件。

对与 $n$ 互素的 $a$，Carmichael 条件可以写成

$$
a^{n-1}\equiv1\pmod n.
$$

这意味着单位群 $\mathbb Z_n^\times$ 中每个元素的阶都整除 $n-1$。从群论角度看，Carmichael number 的特殊之处就在于：虽然 $n$ 不是素数，但它的单位群仍表现出类似 $\mathbb Z_p^\times$ 的统一指数性质。

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

#### 判据为什么有效？

Korselt 条件把模 $n$ 的问题拆成了模每个素因数 $p$ 的问题。

条件

$$
p-1\mid n-1
$$

保证 Fermat's little theorem 中的指数 $p-1$ 可以整除 $n-1$。因此只要 $p\nmid a$，就有

$$
a^{n-1}
=\left(a^{p-1}\right)^{(n-1)/(p-1)}
\equiv1\pmod p.
$$

若 $p\mid a$，则 $a^n\equiv a\equiv0\pmod p$，同样没有问题。

最后，square-free 条件意味着

$$
n=p_1p_2\cdots p_r
$$

中的素因数都只出现一次。既然每个 $p_i$ 都整除 $a^n-a$，两两互素性便推出它们的乘积 $n$ 也整除 $a^n-a$。

以 $561$ 为例，对任意整数 $a$：

- 模 $3$ 时，因为 $2\mid560$，有 $a^{561}\equiv a\pmod3$；
- 模 $11$ 时，因为 $10\mid560$，有 $a^{561}\equiv a\pmod{11}$；
- 模 $17$ 时，因为 $16\mid560$，有 $a^{561}\equiv a\pmod{17}$。

由于 $3,11,17$ 两两互素，CRT 意义下这三个局部同余合并为

$$
a^{561}\equiv a\pmod{561}.
$$

所以我们不需要检查 $a=0,1,\ldots,560$，只需检查 $561$ 的素因数结构。

### 6.2 Carmichael Number 必须 Square-Free

**命题** 每个 Carmichael number 都是 square-free。

**证明** 假设存在素数 $p$ 使 $p^2\mid n$。Carmichael 条件必须对整数 $a=p$ 成立，即

$$
p^n\equiv p\pmod n.
$$

这会推出 $p^n\equiv p\pmod{p^2}$。但 $n>1$，所以 $p^n\equiv0\pmod{p^2}$，而 $p\not\equiv0\pmod{p^2}$，矛盾。故不存在平方素因子。证毕。

Korselt criterion 的完整逆命题还断言：每个 Carmichael number 对每个 $p\mid n$ 都满足 $p-1\mid n-1$。其证明需要更深入地使用单位群结构，讲义在此暂不展开。

#### 为什么 square-free 是必要条件？

Square-free 的意思是素因数分解中没有任何指数大于 $1$。例如

$$
30=2\cdot3\cdot5
$$

是 square-free，而

$$
12=2^2\cdot3
$$

不是。

证明中选择 $a=p$ 是最直接的反例构造。若 $p^2\mid n$，Carmichael 条件要求同余在模 $p^2$ 下也成立：

$$
p^n\equiv p\pmod{p^2}.
$$

但是 $n>1$ 使左边至少含两个因子 $p$，所以左边模 $p^2$ 为 $0$；右边只有一个因子 $p$，模 $p^2$ 不为 $0$。两边不可能同余。

所以 Carmichael number 的素因数必须彼此不同。这也解释了 Korselt criterion 中为什么需要单独写出 square-free 条件。

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

#### Freshman's Dream 的含义

通常情况下，

$$
(a+b)^n
=a^n+\binom n1a^{n-1}b+\cdots+\binom n{n-1}ab^{n-1}+b^n,
$$

中间还有许多交叉项，所以不能直接把幂“分配”到加法上。

当 $n=p$ 为素数时，中间的二项式系数

$$
\binom pk,
\qquad1\le k\le p-1,
$$

全部被 $p$ 整除，于是模 $p$ 时交叉项消失，得到

$$
(a+b)^p\equiv a^p+b^p\pmod p.
$$

Carmichael number 的机制不同：不一定每个二项式系数都被 $n$ 整除，而是利用

$$
t^n\equiv t\pmod n
$$

分别把 $(a+b)^n,a^n,b^n$ 化成 $a+b,a,b$，最终仍得到相同结论。

例如 $561$ 是 Carmichael number，所以对任意 $a,b$，

$$
(a+b)^{561}equiv a+b\pmod{561},
$$

同时

$$
a^{561}+b^{561}\equiv a+b\pmod{561}.
$$

因此

$$
(a+b)^{561}\equiv a^{561}+b^{561}\pmod{561},
$$

尽管 $561$ 明明是合数。

反向证明中的归纳则说明，只要 Freshman's dream 对所有 $a,b$ 成立，就可以从 $0^n\equiv0$ 逐步推出

$$
1^n\equiv1,quad2^n\equiv2,quad3^n\equiv3,ldots,
$$

最终得到完整的 Carmichael 条件。

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

### 算法解释

#### 1. 为什么二进制展开有用？

若已经处理过的二进制前缀表示整数 $r$，那么读入下一位 $b\in\{0,1\}$ 后，新前缀表示

$$
2r+b.
$$

假设当前变量满足

$$
y\equiv a^r\pmod n,
$$

那么先平方得到

$$
y^2\equiv a^{2r}\pmod n.
$$

若下一位 $b=1$，再乘一次 $a$，就得到

$$
ay^2\equiv a^{2r+1}\pmod n.
$$

这正好分别对应新二进制位为 $0$ 和 $1$ 的两种情况。因此每读一位，变量 $y$ 都保持为“$a$ 的当前前缀次幂”。

#### 2. 完整计算 $2^{341}\bmod341$

指数的二进制展开为

$$
341=(101010101)_2.
$$

从 $y=1$ 开始，每一行先平方；若当前位为 $1$，再乘以 $2$：

| 读入位 | 更新过程 | $y\bmod341$ |
| --- | --- | ---: |
| $1$ | $1^2\cdot2$ | $2$ |
| $0$ | $2^2$ | $4$ |
| $1$ | $4^2\cdot2$ | $32$ |
| $0$ | $32^2=1024$ | $1$ |
| $1$ | $1^2\cdot2$ | $2$ |
| $0$ | $2^2$ | $4$ |
| $1$ | $4^2\cdot2$ | $32$ |
| $0$ | $32^2$ | $1$ |
| $1$ | $1^2\cdot2$ | $2$ |

最终得到

$$
2^{341}\equiv2\pmod{341}.
$$

其中最关键的一次化简是

$$
32^2=1024=3\cdot341+1,
$$

所以每次遇到 $32^2$ 都会重新回到 $1$。

#### 3. 为什么运算次数是 $O(\log m)$？

正整数 $m$ 的二进制位数为

$$
\lfloor\log_2m\rfloor+1.
$$

算法对每个二进制位进行一次平方，并且至多再进行一次乘法，所以乘法总数至多约为二进制位数的两倍，即 $O(\log m)$。

相比之下，直接计算

$$
a^m=a\cdot a\cdots a
$$

需要大约 $m$ 次乘法。当指数有几百甚至几千个二进制位时，两者差距非常大。

每一步立即模 $n$ 还保证中间结果始终可以控制在 $n^2$ 附近，不会真的生成拥有指数级位数的 $a^m$。这也是 Fermat test、Miller–Rabin test 和公钥密码算法能够高效执行大指数模运算的基础。

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
