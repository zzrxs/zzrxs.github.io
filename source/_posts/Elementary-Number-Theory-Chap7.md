---
title: Elementary Number Theory-Chap7
date: 2026-11-3 15:00:51
updated: 2026-11-3 15:00:51
math: true
categories:
  - Elementary Number Theory
tags:
  - Elementary Number Theory
  - Primitive Root
  - Unit Group
  - Prime Power
  - Carmichael Number
description: Elementary Number Theory Notes (7):Primitive Roots, Unit Group Structure and Universal Exponents for Prime Power Moduli
---

上一章证明了模素数 $p$ 的单位群 $U_p$ 总是 cyclic group。本章继续回答两个更精细的问题：一个模 $p$ 的 primitive root 何时能提升为模 $p^e$ 的 primitive root？究竟哪些模数拥有 primitive root？最后，我们用单位群的完整结构引入 universal exponent，并证明 Korselt's criterion 的充要形式。

<!-- more -->

## 1. 奇素数幂上的 Primitive Roots

### 1.1 从模 $p$ 提升到模 $p^2$

设 $p$ 是奇素数，$g$ 是模 $p$ 的 primitive root。我们希望同一个整数 $g$ 在模 $p^2$ 时仍有最大可能的阶

$$
\varphi(p^2)=p(p-1).
$$

但这不一定自动成立；关键是检查

$$
g^{p-1}\not\equiv1\pmod{p^2}.
$$

**引理** 设 $p$ 是奇素数。存在模 $p$ 的 primitive root $g$，使得

$$
\boxed{g^{p-1}\not\equiv1\pmod{p^2}}.
$$

**证明** 任取一个模 $p$ 的 primitive root $g$。若它已经满足条件，结论成立。

否则

$$
g^{p-1}\equiv1\pmod{p^2}.
$$

整数 $g+p$ 与 $g$ 模 $p$ 同余，因此它仍代表模 $p$ 的同一个 primitive root。由 binomial theorem，

$$
\begin{aligned}
(g+p)^{p-1}
&\equiv g^{p-1}+(p-1)pg^{p-2}\pmod{p^2}\\
&\equiv1-pg^{p-2}\pmod{p^2}.
\end{aligned}
$$

第二步使用了 $p-1\equiv-1\pmod p$。

因为 $g$ 是模 $p$ 的单位，$p\nmid g$，所以

$$
p\nmid g^{p-2}.
$$

从而 $pg^{p-2}$ 被 $p$ 整除但不被 $p^2$ 整除，因此

$$
(g+p)^{p-1}\not\equiv1\pmod{p^2}.
$$

所以 $g$ 与 $g+p$ 中至少有一个满足要求。证毕。

#### 为什么只看 $g$ 与 $g+p$？

它们模 $p$ 是同一个剩余类，因此在模 $p$ 下具有完全相同的阶；但它们模 $p^2$ 是不同的类。加上一个 $p$ 不会破坏 primitive root modulo $p$ 的性质，却可能改变模 $p^2$ 的高一位信息。

这正是“lifting”的基本思想：保持低次幂模数下的信息不变，同时调整新增的一位。

### 1.2 模 $p^2$ 时阶只有两种可能

**推论** 设 $p$ 是奇素数，$g$ 是模 $p$ 的 primitive root。则 $g$ 和 $g+p$ 中至少有一个是模 $p^2$ 的 primitive root。

**证明** 设 $g$ 模 $p^2$ 的阶为

$$
r=\operatorname{ord}_{p^2}(g).
$$

把同余模 $p^2$ 约化到模 $p$，$g$ 的阶变为 $p-1$，所以

$$
p-1\mid r.
$$

另一方面，由 Lagrange's theorem，

$$
r\mid|U_{p^2}|=\varphi(p^2)=p(p-1).
$$

由于 $p$ 是素数，夹在这两个整除条件之间的 $r$ 只有两种可能：

$$
r=p-1
$$

或者

$$
r=p(p-1).
$$

若 $g^{p-1}\equiv1\pmod{p^2}$，则阶为 $p-1$；若

$$
g^{p-1}\not\equiv1\pmod{p^2},
$$

阶就不能是 $p-1$，只能等于 $p(p-1)$，此时 $g$ 是模 $p^2$ 的 primitive root。

上一引理说明：如果 $g$ 不满足这个非同余条件，那么 $g+p$ 一定满足。因此两者中至少有一个是模 $p^2$ 的 primitive root。证毕。

### 1.3 非同余条件如何逐级传播？

下面证明，一旦 $g$ 在模 $p^2$ 的层面没有“过早回到 $1$”，这个性质会一直传播到所有更高的 $p$ 次幂。

**引理** 设 $p$ 是奇素数，$g$ 是模 $p$ 的 primitive root，并且

$$
g^{p-1}\not\equiv1\pmod{p^2}.
$$

则对每个 $k\ge2$，

$$
\boxed{
g^{p^{k-2}(p-1)}
\not\equiv1\pmod{p^k}.
}
$$

**证明** 对 $k$ 归纳。

当 $k=2$ 时，结论就是假设

$$
g^{p-1}\not\equiv1\pmod{p^2}.
$$

假设结论对某个 $k\ge2$ 成立。Euler's theorem 模 $p^{k-1}$ 给出

$$
g^{\varphi(p^{k-1})}
=g^{p^{k-2}(p-1)}
\equiv1\pmod{p^{k-1}}.
$$

因此存在整数 $a$ 使

$$
g^{p^{k-2}(p-1)}
=1+ap^{k-1}.
$$

归纳假设又说明这个数模 $p^k$ 不等于 $1$，所以

$$
p\nmid a.
$$

两边取 $p$ 次幂：

$$
g^{p^{k-1}(p-1)}
=(1+ap^{k-1})^p.
$$

展开右边：

$$
(1+ap^{k-1})^p
=1+ap^k+\sum_{j=2}^{p}\binom pj a^jp^{j(k-1)}.
$$

当 $j\ge2$ 时，每个后续项都被 $p^{k+1}$ 整除。因此

$$
g^{p^{k-1}(p-1)}
\equiv1+ap^k\pmod{p^{k+1}}.
$$

又因 $p\nmid a$，右边模 $p^{k+1}$ 不等于 $1$。这正是 $k+1$ 时的结论。证毕。

#### 这一步在追踪什么？

表达式

$$
g^{p^{k-2}(p-1)}=1+ap^{k-1}
$$

表示该幂已经模 $p^{k-1}$ 等于 $1$，但在下一层模 $p^k$ 仍保留一个非零误差。每升高一层，这个误差恰好多增加一个因子 $p$，却不会完全消失。

### 1.4 模 $p^2$ 的 Primitive Root 自动提升

**推论** 若 $p$ 是奇素数，$g$ 是模 $p^2$ 的 primitive root，则对每个 $k\ge2$，$g$ 都是模 $p^k$ 的 primitive root。

**证明** 首先，$g$ 约化到模 $p$ 后仍是 primitive root。

否则设它模 $p$ 的阶为 $s<p-1$。那么

$$
g^s=1+ap
$$

对某个整数 $a$ 成立。取 $p$ 次幂：

$$
g^{sp}=(1+ap)^p\equiv1\pmod{p^2}.
$$

这说明 $g$ 模 $p^2$ 的阶至多为 $sp<p(p-1)$，与 $g$ 是模 $p^2$ 的 primitive root 矛盾。

现在令

$$
r=\operatorname{ord}_{p^k}(g).
$$

约化到模 $p$ 后，$g$ 的阶为 $p-1$，所以

$$
p-1\mid r.
$$

又由 Lagrange's theorem，

$$
r\mid\varphi(p^k)=p^{k-1}(p-1).
$$

因此

$$
r=p^m(p-1)
$$

对某个 $0\le m\le k-1$ 成立。

若 $m\le k-2$，则

$$
r\mid p^{k-2}(p-1),
$$

从而

$$
g^{p^{k-2}(p-1)}\equiv1\pmod{p^k},
$$

与上一引理矛盾。因此只能有 $m=k-1$，即

$$
r=p^{k-1}(p-1)=\varphi(p^k).
$$

所以 $g$ 是模 $p^k$ 的 primitive root。证毕。

**命题** 若 $p$ 是奇素数，则对每个 $e\ge1$，单位群

$$
U_{p^e}
$$

都是 cyclic group。

**证明** $e=1$ 时已经在上一章证明。先取模 $p$ 的 primitive root；由第 1.2 节，可在 $g$ 与 $g+p$ 中找到一个模 $p^2$ 的 primitive root；再由第 1.4 节，它自动成为所有模 $p^e$ 的 primitive root。证毕。

#### 例：$2$ 是所有 $11^e$ 下的 Primitive Root

$2$ 是模 $11$ 的 primitive root，并且

$$
2^{10}=1024.
$$

模 $121$ 计算：

$$
1024=8\cdot121+56,
$$

所以

$$
2^{10}\equiv56\not\equiv1\pmod{121}.
$$

因此 $2$ 是模 $11^2$ 的 primitive root，进而对每个 $e\ge1$，$2$ 都是模 $11^e$ 的 primitive root。

## 2. $2$ 的幂模数

奇素数幂的单位群总是 cyclic，但 $2^e$ 是特殊情形。

### 2.1 $U_{2^e}$ 何时是 Cyclic Group？

**命题** 单位群 $U_{2^e}$ 是 cyclic group，当且仅当

$$
e=1\quad\text{或}\quad e=2.
$$

**证明** 当 $e=1$ 时，

$$
U_2=\{1\},
$$

是平凡 cyclic group。

当 $e=2$ 时，

$$
U_4=\{1,3\}=\langle3\rangle,
$$

也是 cyclic group。

现在设 $e\ge3$。一个偶数阶 cyclic group 中，方程

$$
x^2=1
$$

恰有两个解：单位元，以及唯一的阶为 $2$ 的元素。

但模 $2^e$ 时，

$$
x^2\equiv1\pmod{2^e}
$$

有四个解：

$$
x\equiv\pm1,\quad 2^{e-1}\pm1\pmod{2^e}.
$$

因此 $U_{2^e}$ 不可能是 cyclic group。证毕。

这个论证没有尝试寻找生成元，而是比较一个 cyclic group 必须具有的结构性质与实际单位群的性质。

### 2.2 $5$ 的幂具有多大的阶？

记号

$$
2^r\parallel N
$$

表示 $2^r\mid N$，但 $2^{r+1}\nmid N$；也就是说，$N$ 中恰好含有 $r$ 个因子 $2$。

**引理** 对每个 $n\ge0$，

$$
\boxed{
2^{n+2}\parallel 5^{2^n}-1.
}
$$

**证明** 对 $n$ 归纳。

当 $n=0$ 时，

$$
5^{2^0}-1=5-1=4,
$$

所以 $2^2\parallel4$。

假设

$$
2^{n+2}\parallel5^{2^n}-1.
$$

利用平方差：

$$
5^{2^{n+1}}-1
=\left(5^{2^n}-1\right)
\cdot\left(5^{2^n}+1\right).
$$

第一个因子恰好含有 $2^{n+2}$。又因为

$$
5^{2^n}\equiv1\pmod4,
$$

所以

$$
5^{2^n}+1\equiv2\pmod4,
$$

第二个因子恰好含一个因子 $2$。因此乘积恰好含

$$
2^{n+2}\cdot2=2^{n+3},
$$

即

$$
2^{n+3}\parallel5^{2^{n+1}}-1.
$$

归纳完成。证毕。

### 2.3 $U_{2^e}$ 的具体表示

**命题** 对 $e\ge3$，

$$
\boxed{
U_{2^e}
=\{\pm5^i:0\le i<2^{e-2}\}.
}
$$

特别地，

$$
\operatorname{ord}_{2^e}(5)=2^{e-2}.
$$

**证明** $U_{2^e}$ 的阶为

$$
\varphi(2^e)=2^{e-1}.
$$

所以 $5$ 的阶是某个 $2$ 的幂，写成

$$
\operatorname{ord}_{2^e}(5)=2^t.
$$

Lagrange's theorem 给出 $t\le e-1$。但 $U_{2^e}$ 在 $e\ge3$ 时不是 cyclic group，所以任何元素的阶都不能达到整个群的大小 $2^{e-1}$，从而

$$
t\le e-2.
$$

另一方面，在上一引理中取 $n=e-3$：

$$
2^{e-1}\parallel5^{2^{e-3}}-1.
$$

因此

$$
5^{2^{e-3}}\not\equiv1\pmod{2^e}.
$$

所以 $5$ 的阶不整除 $2^{e-3}$，即 $t>e-3$。结合 $t\le e-2$，得到

$$
t=e-2.
$$

于是子群 $\langle5\rangle$ 有 $2^{e-2}$ 个元素。因为

$$
5\equiv1\pmod4,
$$

所有 $5$ 的幂都模 $4$ 同余于 $1$。模 $2^e$ 的单位类中，恰有 $2^{e-2}$ 个模 $4$ 同余于 $1$，所以它们正好就是

$$
1,5,5^2,\ldots,5^{2^{e-2}-1}.
$$

这些数的相反数恰好是所有模 $4$ 同余于 $3$ 的单位类。因此每个单位都唯一具有形式

$$
\pm5^i.
$$

证毕。

### 2.4 直积分解

**引理** 设 $G$ 是 abelian group，$H_1,H_2\le G$。若

$$
H_1\cap H_2=\{1\},
\qquad
G=H_1H_2,
$$

则

$$
\boxed{G\cong H_1\times H_2}.
$$

**证明** 定义

$$
\Phi:H_1\times H_2\longrightarrow G,
\qquad
(h_1,h_2)\longmapsto h_1h_2.
$$

因为 $G$ 是 abelian group，

$$
\Phi((h_1,h_2)(h_1',h_2'))
=h_1h_1'h_2h_2'
=\Phi(h_1,h_2)\Phi(h_1',h_2'),
$$

所以 $\Phi$ 是 homomorphism。

条件 $G=H_1H_2$ 说明 $\Phi$ 是满射。若

$$
\Phi(h_1,h_2)=h_1h_2=1,
$$

则

$$
h_1=h_2^{-1}\in H_1\cap H_2.
$$

交集只有单位元，所以 $h_1=h_2=1$，核是平凡的。因此 $\Phi$ 是同构。证毕。

**推论** 对 $e\ge3$，

$$
\boxed{
U_{2^e}\cong C_2\times C_{2^{e-2}},
}
$$

两个因子分别由 $-1$ 与 $5$ 生成。

**证明** 上一命题说明每个单位都能写成

$$
(-1)^\varepsilon5^i.
$$

子群 $\langle-1\rangle$ 的阶为 $2$，子群 $\langle5\rangle$ 的阶为 $2^{e-2}$。每个 $5$ 的幂都模 $4$ 同余于 $1$，而 $-1\equiv3\pmod4$，所以两个子群的交集只有 $1$。应用上一引理即可。证毕。

### 2.5 例：求解 $x^6\equiv9\pmod{16}$

右边 $9$ 是模 $16$ 的单位，因此任何解 $x$ 也必须是单位。由上面的结构，每个单位可写成

$$
x=\pm5^i,
\qquad i\pmod4.
$$

又因为

$$
9\equiv5^2\pmod{16},
$$

且六次幂会消去符号，所以方程等价于

$$
5^{6i}\equiv5^2\pmod{16}.
$$

$5$ 模 $16$ 的阶为 $4$，因此指数满足

$$
6i\equiv2\pmod4.
$$

约去公因数 $2$：

$$
3i\equiv1\pmod2,
$$

所以 $i$ 为奇数，即

$$
i\equiv1,3\pmod4.
$$

于是

$$
x\equiv\pm5,\quad\pm5^3\pmod{16}.
$$

计算

$$
5^3=125\equiv13\pmod{16},
$$

得到四个解

$$
\boxed{x\equiv3,5,11,13\pmod{16}}.
$$

## 3. 哪些模数拥有 Primitive Root？

### 3.1 Cyclic Groups 的直积

**引理** 有限 cyclic groups 的直积

$$
C_{m_1}\times\cdots\times C_{m_s}
$$

是 cyclic group，当且仅当 $m_1,\ldots,m_s$ 两两互素。

**证明** 直积中元素 $(x_1,\ldots,x_s)$ 的阶是各分量阶的最小公倍数：

$$
\operatorname{ord}(x_1,\ldots,x_s)
=\operatorname{lcm}(\operatorname{ord}(x_1),\ldots,\operatorname{ord}(x_s)).
$$

每个分量取生成元时，能够达到的最大阶为

$$
\operatorname{lcm}(m_1,\ldots,m_s).
$$

整个群的阶为

$$
m_1\cdots m_s.
$$

直积是 cyclic group，当且仅当存在元素的阶等于群的阶，也就是

$$
\operatorname{lcm}(m_1,\ldots,m_s)
=m_1\cdots m_s.
$$

这恰好等价于 $m_1,\ldots,m_s$ 两两互素。证毕。

例如

$$
C_3\times C_4\cong C_{12}
$$

是 cyclic group，因为 $\gcd(3,4)=1$；而

$$
C_2\times C_4
$$

不是 cyclic group，因为任一元素的阶至多为 $\operatorname{lcm}(2,4)=4$，达不到群的大小 $8$。

### 3.2 Unit Group 的结构定理

**定理（Structure of the Unit Group）** 写成

$$
n=2^f\prod_{j=1}^r p_j^{e_j},
$$

其中 $p_j$ 是互不相同的奇素数。则

$$
\boxed{
U_n\cong
\begin{cases}
\displaystyle
\prod_{j=1}^r
C_{p_j^{e_j-1}(p_j-1)},
&f=0\text{ 或 }1,\\[8pt]
\displaystyle
C_2\times C_{2^{f-2}}
\times
\prod_{j=1}^r
C_{p_j^{e_j-1}(p_j-1)},
&f\ge2.
\end{cases}
}
$$

空乘积表示平凡群。

**证明** 由 Chinese remainder theorem，

$$
U_n
\cong
U_{2^f}\times
\prod_{j=1}^r U_{p_j^{e_j}}.
$$

对每个奇素数幂，前面已经证明

$$
U_{p_j^{e_j}}
\cong
C_{\varphi(p_j^{e_j})}
=C_{p_j^{e_j-1}(p_j-1)}.
$$

而 $2$ 的幂部分满足

$$
U_1,\ U_2\text{ 为平凡群},
$$

$$
U_4\cong C_2,
$$

以及对 $f\ge3$，

$$
U_{2^f}\cong C_2\times C_{2^{f-2}}.
$$

把这些因子组合起来便得到结论。证毕。

### 3.3 Primitive Root 存在性的完整分类

**推论** $U_n$ 是 cyclic group，也就是模 $n$ 存在 primitive root，当且仅当

$$
\boxed{
n=1,\ 2,\ 4,\ p^e,\ 2p^e,
}
$$

其中 $p$ 是奇素数，$e\ge1$。

**证明** 令

$$
m_j=p_j^{e_j-1}(p_j-1).
$$

每个 $m_j$ 都是偶数。

若 $f=0$ 或 $f=1$，结构定理中的非平凡因子是

$$
C_{m_1}\times\cdots\times C_{m_r}.
$$

这些因子的阶全是偶数，所以当 $r\ge2$ 时不可能两两互素。由直积判据，只有 $r\le1$ 时群才是 cyclic。这给出

$$
n=1,2,p^e,2p^e.
$$

若 $f=2$，还有一个 $C_2$ 因子。它与任何奇素数幂产生的 $C_{m_j}$ 都有公因数 $2$，所以必须 $r=0$，得到

$$
n=4.
$$

若 $f\ge3$，仅 $2$ 的幂部分就含有

$$
C_2\times C_{2^{f-2}},
$$

两个因子的阶不互素，因此不可能是 cyclic group。

合并三种情况即得完整分类。证毕。

例如：

- 模 $9=3^2$ 存在 primitive root；
- 模 $18=2\cdot3^2$ 存在 primitive root；
- 模 $12=4\cdot3$ 不存在 primitive root；
- 模 $15=3\cdot5$ 不存在 primitive root。

## 4. Universal Exponents 与 Korselt's Criterion

### 4.1 有限群的 Exponent

**定义** 有限群 $G$ 的 exponent $e(G)$ 是使

$$
g^E=1
$$

对每个 $g\in G$ 都成立的最小正整数 $E$。

单位群 $U_n$ 的 exponent 称为模 $n$ 的 **universal exponent**，记为

$$
e(n).
$$

等价地，

$$
e(G)
=\operatorname{lcm}
\{\operatorname{ord}(g):g\in G\}.
$$

因为每个元素的阶都整除 $|G|$，

$$
e(G)\mid|G|.
$$

特别地，

$$
\boxed{e(n)\mid\varphi(n)}.
$$

#### 与 Euler 指数有什么区别？

Euler's theorem 保证 $\varphi(n)$ 是所有单位都适用的指数：

$$
a^{\varphi(n)}\equiv1\pmod n.
$$

但 $\varphi(n)$ 不一定是最小的统一指数。$e(n)$ 才是能够同时“消掉”所有单位的最小正指数。

例如

$$
\varphi(8)=4,
$$

但每个奇数 $a$ 都满足

$$
a^2\equiv1\pmod8.
$$

所以

$$
e(8)=2<4.
$$

### 4.2 直积的 Exponent

**引理** 对有限群 $G_1,\ldots,G_r$，

$$
\boxed{
e(G_1\times\cdots\times G_r)
=\operatorname{lcm}(e(G_1),\ldots,e(G_r)).
}
$$

特别地，

$$
e(C_m)=m.
$$

**证明** 指数 $E$ 能使直积中的每个元素满足 $g^E=1$，当且仅当它能使每个分量群中的所有元素都满足 $g_i^E=1$。因此 $E$ 必须是各个 $e(G_i)$ 的公倍数，而它们的最小公倍数恰好可行。证毕。

结合前面的单位群结构，得到：

对奇素数 $p$，

$$
\boxed{
e(p^a)=\varphi(p^a)=p^{a-1}(p-1).
}
$$

对 $2$ 的幂，

$$
\boxed{
e(2)=1,\qquad
e(4)=2,\qquad
e(2^a)=2^{a-2}\quad(a\ge3).
}
$$

对一般

$$
n=\prod p_i^{a_i},
$$

$e(n)$ 是各素数幂 universal exponents 的最小公倍数。

### 4.3 例：$e(1000)$ 与末三位

分解

$$
1000=8\cdot125.
$$

由 CRT 和单位群结构，

$$
U_{1000}
\cong U_8\times U_{125}
\cong C_2\times C_2\times C_{100}.
$$

因此

$$
e(1000)
=\operatorname{lcm}(2,2,100)
=100.
$$

而

$$
\varphi(1000)=400.
$$

所以 universal exponent 比 Euler 指数小得多。因为 $\gcd(3,1000)=1$，

$$
3^{100}\equiv1\pmod{1000}.
$$

于是

$$
3^{1001}
=3(3^{100})^{10}
\equiv3\pmod{1000}.
$$

因此最后三位为

$$
\boxed{003}.
$$

### 4.4 Korselt's Criterion

**定理（Korselt's Criterion）** 合数 $n$ 是 Carmichael number，当且仅当：

1. $n$ 是 square-free；
2. 对每个素数 $p\mid n$，

   $$
   p-1\mid n-1.
   $$

#### 充分性

假设 $n$ 是 square-free，并且对每个 $p\mid n$ 都有 $p-1\mid n-1$。任取整数 $a$。

若 $p\mid a$，则

$$
a^n\equiv a\equiv0\pmod p.
$$

若 $p\nmid a$，Fermat's little theorem 给出

$$
a^{p-1}\equiv1\pmod p.
$$

因为 $p-1\mid n-1$，

$$
a^{n-1}\equiv1\pmod p,
$$

所以仍有

$$
a^n\equiv a\pmod p.
$$

因此每个素因数 $p\mid n$ 都整除 $a^n-a$。又因 $n$ 是 square-free，这些不同素因数的乘积就是 $n$，从而

$$
n\mid a^n-a.
$$

所以 $n$ 是 Carmichael number。

#### 必要性：为什么必须 Square-Free？

反过来，设 $n$ 是 Carmichael number。假设存在素数 $p$ 使

$$
p^2\mid n.
$$

取

$$
a=\frac np.
$$

由于 $p^2\mid n$，可以验证

$$
n\mid a^2.
$$

因此 $n\mid a^n$。但显然

$$
n\nmid a,
$$

这与 Carmichael 条件

$$
a^n\equiv a\pmod n
$$

矛盾。所以 $n$ 必须是 square-free。

#### 必要性：为什么 $p-1\mid n-1$？

对任意单位 $a\in U_n$，Carmichael 条件给出

$$
a^{n-1}\equiv1\pmod n.
$$

所以 universal exponent 满足

$$
e(n)\mid n-1.
$$

由于 $n$ 已经证明是 square-free，

$$
U_n\cong\prod_{p\mid n}U_p.
$$

每个 $U_p$ 是阶为 $p-1$ 的 cyclic group，所以它的 exponent 是 $p-1$。由直积 exponent 公式，

$$
e(n)=\operatorname{lcm}_{p\mid n}(p-1).
$$

因此对每个 $p\mid n$，

$$
p-1\mid e(n)\mid n-1.
$$

必要性得证。

#### 例：验证 $561$

$$
561=3\cdot11\cdot17
$$

是 square-free，并且

$$
3-1=2\mid560,
$$

$$
11-1=10\mid560,
$$

$$
17-1=16\mid560.
$$

所以 $561$ 是 Carmichael number。

## 5. 小结

本章首先证明了奇素数幂的单位群总是 cyclic：

$$
U_{p^e}\cong C_{p^{e-1}(p-1)}
\qquad(p\text{ 为奇素数}).
$$

对 $2$ 的幂，结构则为

$$
U_{2^e}\cong C_2\times C_{2^{e-2}}
\qquad(e\ge3),
$$

因此不再 cyclic。

结合 CRT，得到 primitive root 存在性的完整分类：

$$
\boxed{
n=1,2,4,p^e,2p^e
}
$$

且只有这些模数拥有 primitive root。

Universal exponent

$$
e(n)
=\operatorname{lcm}
\{\operatorname{ord}_n(a):a\in U_n\}
$$

比 $\varphi(n)$ 更精确地描述了所有单位幂的共同周期。最后，单位群结构把 Carmichael number 的定义转化成了 Korselt's criterion：

$$
n\text{ 为 Carmichael number}
\iff
\begin{cases}
n\text{ square-free},\\
p-1\mid n-1\quad\text{对每个 }p\mid n.
\end{cases}
$$
