---
title: Elementary Number Theory-Chap1
date: 2026-10-19 21:28:57
updated: 2026-10-19 21:28:57
math: true
categories:
  - Elementary Number Theory
tags:
  - Elementary Number Theory
  - Divisibility
  - Euclidean Algorithm
  - Diophantine Equation
description: 初等数论笔记（一）：整除、Euclidean algorithm、Bézout identity 与线性 Diophantine equation
---

本章从整数的带余除法出发，建立整除、最大公因数与最小公倍数的基本理论。Euclidean algorithm 不仅能计算最大公因数，反向回代后还会给出 Bézout identity；这又完整地解决了二元一次不定方程 $ax+by=c$ 的可解性与全部整数解。

<!-- more -->

## 1. 带余除法

### 1.1 Division Algorithm

**定理（Division Algorithm）** 设 $a,b\in\mathbb Z$ 且 $b\ne0$，则存在唯一的一对整数 $q,r$，使得

$$
a=qb+r,\qquad 0\le r<|b|.
$$

$q$ 称为商，$r$ 称为余数。这里把余数范围写成 $0\le r<|b|$，是为了同时覆盖 $b>0$ 和 $b<0$。

**证明** 先令 $B=|b|>0$，考虑集合

$$
S=\{a-kB:k\in\mathbb Z\}.
$$

取足够小的 $k$，就能使 $a-kB\ge0$，因此 $S$ 含有非负整数。根据良序原理，$S$ 的非负元素中存在最小者，记为

$$
r=a-q'B.
$$

若 $r\ge B$，则

$$
r-B=a-(q'+1)B\ge0
$$

也是 $S$ 中的非负元素，并且比 $r$ 更小，矛盾。因此 $0\le r<B$。由于 $B=\pm b$，适当改变商的符号即可写成 $a=qb+r$。

再证唯一性。若

$$
a=qb+r=q'b+r',\qquad 0\le r,r'<|b|,
$$

则

$$
(q-q')b=r'-r.
$$

右边的绝对值严格小于 $|b|$，而左边若非零，就是 $b$ 的非零倍数，绝对值至少为 $|b|$。所以只能有 $q=q'$，进而 $r=r'$。证毕。

### 1.2 整除

对 $a,b\in\mathbb Z$，若存在 $c\in\mathbb Z$ 使得 $a=bc$，就称 **$b$ 整除 $a$**，记为

$$
b\mid a.
$$

此时 $b$ 是 $a$ 的因数，$a$ 是 $b$ 的倍数。每个整数都整除 $0$；但只有 $0$ 能被 $0$ 整除。

**例** 任意整数的平方除以 $4$ 的余数只能是 $0$ 或 $1$。若整数为 $2k$，则

$$
(2k)^2=4k^2\equiv0\pmod4;
$$

若为 $2k+1$，则

$$
(2k+1)^2=4k(k+1)+1\equiv1\pmod4.
$$

**命题（整除对整数线性组合封闭）** 若 $c\mid a_i$ 对 $i=1,\ldots,k$ 都成立，则对任意 $x_1,\ldots,x_k\in\mathbb Z$，

$$
c\mid x_1a_1+\cdots+x_ka_k.
$$

**证明** 写成 $a_i=cb_i$，则

$$
x_1a_1+\cdots+x_ka_k
=c(x_1b_1+\cdots+x_kb_k),
$$

括号内仍为整数。证毕。

这条简单性质会反复出现：一个数若同时整除若干整数，也就整除由它们通过加、减和整数倍得到的一切整数。

## 2. 最大公因数与 Euclidean Algorithm

### 2.1 最大公因数

若 $a,b$ 不全为零，则它们的最大公因数 $\gcd(a,b)$ 是同时整除 $a,b$ 的最大正整数。特别地，

$$
\gcd(a,0)=|a|\qquad(a\ne0),
$$

而 $\gcd(0,0)$ 不定义。

**引理** 若 $a=qb+r$，且 $(a,b)\ne(0,0)$，则

$$
\boxed{\gcd(a,b)=\gcd(b,r)}.
$$

**证明** 若 $d\mid a$ 且 $d\mid b$，那么 $d\mid a-qb=r$；反过来，若 $d\mid b$ 且 $d\mid r$，那么 $d\mid qb+r=a$。因此 $(a,b)$ 与 $(b,r)$ 的公因数集合完全相同，最大正公因数自然相同。证毕。

### 2.2 Euclidean Algorithm

对正整数 $r_{-1}>r_0$ 连续作带余除法：

$$
\begin{aligned}
r_{-1}&=q_1r_0+r_1, &0\le r_1<r_0,\\
r_0&=q_2r_1+r_2, &0\le r_2<r_1,\\
&\ \vdots\\
r_{s-2}&=q_sr_{s-1}+r_s, &0\le r_s<r_{s-1}.
\end{aligned}
$$

正余数严格递减，所以过程必在有限步后出现 $r_s=0$。

**定理（Euclidean Algorithm）** Euclidean algorithm 中最后一个非零余数就是原来两个整数的最大公因数。

**证明** 每一步都由上一节引理得到

$$
\gcd(r_{i-2},r_{i-1})=\gcd(r_{i-1},r_i).
$$

于是最大公因数沿算法保持不变。最后一步给出

$$
\gcd(r_{s-2},r_{s-1})=\gcd(r_{s-1},0)=r_{s-1}.
$$

所以最后一个非零余数就是所求。证毕。

**例** 计算 $\gcd(1763,2021)$：

$$
\begin{aligned}
2021&=1\cdot1763+258,\\
1763&=6\cdot258+215,\\
258&=1\cdot215+43,\\
215&=5\cdot43.
\end{aligned}
$$

因此

$$
\gcd(1763,2021)=43.
$$

同样的论证还能推广到 Euclidean domain；例如在 $\mathbb Q[x]$ 中，可以用多项式次数充当 Euclidean function。

## 3. Bézout Identity

**定理（Bézout Identity）** 若 $a,b\in\mathbb Z$ 不全为零，则存在 $u,v\in\mathbb Z$，使得

$$
\boxed{\gcd(a,b)=au+bv}.
$$

**证明** 在 Euclidean algorithm 中，最初的两个数显然是 $a,b$ 的整数线性组合。每个新余数都是前两个余数之差再减去一个整数倍，因此归纳可知，每个余数仍是 $a,b$ 的整数线性组合。最后一个非零余数等于 $\gcd(a,b)$，于是它也具有 $au+bv$ 的形式。证毕。

**例（反向回代）** 对上一节的计算，

$$
\begin{aligned}
43&=258-215\\
&=258-(1763-6\cdot258)\\
&=7\cdot258-1763\\
&=7(2021-1763)-1763\\
&=7\cdot2021-8\cdot1763.
\end{aligned}
$$

所以一组 Bézout 系数为 $u=-8,v=7$：

$$
43=(-8)\cdot1763+7\cdot2021.
$$

### 3.1 Extended Euclidean Algorithm

Bézout identity 告诉我们整数 $u,v$ 一定存在，但只说明“存在”还不够。在求解线性 Diophantine equation 或模逆元时，我们需要真正计算出一组满足

$$
au+bv=\gcd(a,b)
$$

的系数。**Extended Euclidean Algorithm** 正是完成这件事的算法。

普通 Euclidean algorithm 只记录余数：

$$
r_{i-1}=q_ir_i+r_{i+1}.
$$

扩展版本在计算余数的同时，还记录每个余数怎样表示成原始输入 $a,b$ 的整数线性组合：

$$
r_i=s_i a+t_i b.
$$

当算法到达最后一个非零余数时，便同时得到

$$
r_k=\gcd(a,b)=s_ka+t_kb.
$$

因此 $u=s_k,v=t_k$ 就是一组 Bézout 系数。

#### 1. 系数递推公式

为便于说明，先设 $a\ge b>0$。对一般整数，可以先取绝对值、处理零的情形，并在必要时交换两个输入；最后再把符号对应回原来的 $a,b$。初始化

$$
r_0=a,\qquad r_1=b.
$$

显然

$$
r_0=1\cdot a+0\cdot b,
$$

$$
r_1=0\cdot a+1\cdot b.
$$

所以取

$$
(s_0,t_0)=(1,0),\qquad(s_1,t_1)=(0,1).
$$

若某一步带余除法为

$$
r_{i-1}=q_ir_i+r_{i+1},
$$

则

$$
r_{i+1}=r_{i-1}-q_ir_i.
$$

把

$$
r_{i-1}=s_{i-1}a+t_{i-1}b,
\qquad
r_i=s_ia+t_ib
$$

代入，得到

$$
\begin{aligned}
r_{i+1}
&=(s_{i-1}a+t_{i-1}b)-q_i(s_ia+t_ib)\\
&=(s_{i-1}-q_is_i)a+(t_{i-1}-q_it_i)b.
\end{aligned}
$$

因此系数与余数使用完全相同的递推方式：

$$
\boxed{
\begin{aligned}
r_{i+1}&=r_{i-1}-q_ir_i,\\
s_{i+1}&=s_{i-1}-q_is_i,\\
t_{i+1}&=t_{i-1}-q_it_i.
\end{aligned}
}
$$

这就是“扩展”的含义：在普通算法之外，同步维护两列线性组合系数。

#### 2. 例：同时计算 gcd 与 Bézout 系数

再次计算

$$
\gcd(2021,1763).
$$

从

$$
(r_0,s_0,t_0)=(2021,1,0),
$$

$$
(r_1,s_1,t_1)=(1763,0,1)
$$

开始，按照上面的公式递推：

| $i$ | $r_i$ | $s_i$ | $t_i$ | 下一次除法的商 |
| ---: | ---: | ---: | ---: | ---: |
| $0$ | $2021$ | $1$ | $0$ | $1$ |
| $1$ | $1763$ | $0$ | $1$ | $6$ |
| $2$ | $258$ | $1$ | $-1$ | $1$ |
| $3$ | $215$ | $-6$ | $7$ | $5$ |
| $4$ | $43$ | $7$ | $-8$ | - |

例如第三个余数为

$$
r_2=r_0-r_1=258,
$$

对应系数为

$$
(s_2,t_2)=(1,0)-(0,1)=(1,-1),
$$

所以

$$
258=1\cdot2021-1\cdot1763.
$$

下一步商为 $6$：

$$
(s_3,t_3)
=(s_1,t_1)-6(s_2,t_2)
=(-6,7).
$$

最后一个非零余数所在行直接给出

$$
\gcd(2021,1763)=43
=7\cdot2021-8\cdot1763.
$$

这和前面的反向回代结果完全一致。反向回代适合手算并展示原理；系数递推则更适合写成程序，因为它只需要从前往后执行一次。

#### 3. 用扩展 Euclidean algorithm 求模逆元

整数 $a$ 在模 $n$ 下有逆元，当且仅当

$$
\gcd(a,n)=1.
$$

扩展 Euclidean algorithm 若给出

$$
au+nv=1,
$$

两边模 $n$ 取同余，就得到

$$
au\equiv1\pmod n.
$$

所以 $u$ 就是 $a$ 的一个模 $n$ 逆元。

例如求 $17$ 在模 $64$ 下的逆元。Euclidean algorithm 给出

$$
\begin{aligned}
64&=3\cdot17+13,\\
17&=1\cdot13+4,\\
13&=3\cdot4+1.
\end{aligned}
$$

反向回代：

$$
\begin{aligned}
1&=13-3\cdot4\\
&=13-3(17-13)\\
&=4\cdot13-3\cdot17\\
&=4(64-3\cdot17)-3\cdot17\\
&=4\cdot64-15\cdot17.
\end{aligned}
$$

因此

$$
-15\cdot17\equiv1\pmod{64},
$$

也就是

$$
\boxed{17^{-1}\equiv-15\equiv49\pmod{64}}.
$$

验证可得

$$
17\cdot49=833=13\cdot64+1.
$$

#### 4. 算法得到的系数是否唯一？

扩展 Euclidean algorithm 给出的是一组 Bézout 系数，但通常不是唯一的一组。若

$$
au_0+bv_0=d,
\qquad d=\gcd(a,b),
$$

那么对任意 $t\in\mathbb Z$，

$$
u=u_0+\frac bd t,
\qquad
v=v_0-\frac ad t
$$

仍满足

$$
au+bv=d.
$$

算法的任务不是列出全部系数，而是高效地找到其中一组。后面求解 $ax+by=c$ 时，再由这一组特解生成全部整数解。

对不全为零的有限整数列 $a_1,\ldots,a_k$，也可迭代定义

$$
\gcd(a_1,\ldots,a_k)
=\gcd(\gcd(a_1,a_2),a_3,\ldots,a_k),
$$

并得到其最大公因数是 $a_1,\ldots,a_k$ 的整数线性组合。

### 3.2 哪些整数能写成 $ax+by$？

令 $d=\gcd(a,b)$。整数 $c$ 能写成

$$
c=ax+by,\qquad x,y\in\mathbb Z
$$

当且仅当 $d\mid c$。

**证明** 因为 $d\mid a,b$，所以 $d$ 整除每一个线性组合 $ax+by$，必要性成立。反之，由 Bézout identity 有 $d=au+bv$。若 $c=kd$，则

$$
c=a(ku)+b(kv),
$$

故充分性也成立。特别地，$d$ 是所有正整数线性组合 $ax+by$ 中最小的一个。

### 3.3 Coprime 与 Euclid's Lemma

若 $\gcd(a_1,\ldots,a_k)=1$，称这些整数 **coprime**；若任意两数的最大公因数都为 $1$，称它们 **pairwise coprime**。Pairwise coprime 一定推出 coprime，反之不成立。例如 $6,10,15$ 整体最大公因数为 $1$，但任意两数都不互素。

Bézout identity 立即给出

$$
\gcd(a,b)=1
\iff
\exists x,y\in\mathbb Z,\ ax+by=1.
$$

**推论（Euclid's Lemma）**

1. 若 $\gcd(a,b)=1$ 且 $a\mid bc$，则 $a\mid c$；
2. 若 $\gcd(a,b)=1$、$a\mid c$ 且 $b\mid c$，则 $ab\mid c$；
3. 若 $a_1,\ldots,a_k$ pairwise coprime 且每个 $a_i\mid c$，则 $a_1\cdots a_k\mid c$。

**证明** 由 $\gcd(a,b)=1$ 可取 $u,v$ 使 $au+bv=1$。两边乘以 $c$：

$$
c=acu+bcv.
$$

若 $a\mid bc$，则右边两项都被 $a$ 整除，因此 $a\mid c$，得到第 1 条。

对第 2 条，写 $c=ak$。由 $b\mid ak$ 且 $\gcd(a,b)=1$，第 1 条推出 $b\mid k$，故 $c$ 被 $ab$ 整除。

对第 3 条，先注意 pairwise coprime 蕴含

$$
\gcd(a_1\cdots a_{j-1},a_j)=1.
$$

这可通过把各个 Bézout 等式相乘得到。然后反复使用第 2 条即可。证毕。

## 4. 最小公倍数

对非零整数 $a,b$，最小公倍数 $\operatorname{lcm}(a,b)$ 是同时被 $a,b$ 整除的最小正整数。

**定理** 对任意非零整数 $a,b$，

$$
\boxed{\gcd(a,b)\operatorname{lcm}(a,b)=|ab|}.
$$

**证明** 令 $d=\gcd(a,b)$，写成

$$
a=da_0,\qquad b=db_0,
$$

其中 $\gcd(a_0,b_0)=1$。数

$$
M=d|a_0b_0|=\frac{|ab|}{d}
$$

显然是 $a,b$ 的正公倍数。

若 $c>0$ 是任意公倍数，写 $c=ak=da_0k$。又因 $b=db_0\mid c$，可得 $b_0\mid a_0k$。由 $\gcd(a_0,b_0)=1$ 和 Euclid's lemma，$b_0\mid k$，所以 $M\mid c$。这说明 $M$ 整除一切正公倍数，因而就是最小公倍数。证毕。

## 5. Linear Diophantine Equation

考虑二元一次不定方程

$$
ax+by=c,
$$

其中 $a,b,c\in\mathbb Z$，且 $a,b$ 不全为零。

**定理** 令 $d=\gcd(a,b)$。方程 $ax+by=c$ 有整数解，当且仅当

$$
d\mid c.
$$

若 $(x_0,y_0)$ 是一组特解，则全部整数解为

$$
\boxed{
x=x_0+\frac{b}{d}t,
\qquad
y=y_0-\frac{a}{d}t,
\qquad t\in\mathbb Z.
}
$$

**证明** 可解条件已经由第 3.1 节证明。将上式代回，有

$$
a\left(x_0+\frac bd t\right)
+b\left(y_0-\frac ad t\right)
=ax_0+by_0=c,
$$

因此这些确实都是解。

反过来，设 $(x,y)$ 是任意解。用它减去特解对应的等式，得到

$$
a(x-x_0)=-b(y-y_0).
$$

写 $a=da'$, $b=db'$，其中 $\gcd(a',b')=1$，则

$$
a'(x-x_0)=-b'(y-y_0).
$$

由 Euclid's lemma，$b'\mid x-x_0$，故 $x-x_0=b't$。代回即得 $y-y_0=-a't$。因此没有其他形式的解。证毕。

### 5.1 求解步骤

1. 用 Euclidean algorithm 求 $d=\gcd(a,b)$；
2. 若 $d\nmid c$，则无整数解；
3. 若 $d\mid c$，用 extended Euclidean algorithm 找到 $u,v$，使 $au+bv=d$；
4. 一组特解为

   $$
   (x_0,y_0)=\left(\frac cd u,\frac cd v\right);
   $$

5. 代入通解公式。

**例** 求解

$$
1763x+2021y=86.
$$

前面已经得到

$$
43=(-8)\cdot1763+7\cdot2021.
$$

因为 $86=2\cdot43$，一组特解为 $(x_0,y_0)=(-16,14)$。全部整数解为

$$
x=-16+47t,
\qquad
y=14-41t,
\qquad t\in\mathbb Z.
$$

这里 $2021/43=47$，$1763/43=41$。

## 6. 小结

本章的逻辑链条可以概括为

$$
\text{Division Algorithm}
\Longrightarrow
\text{Euclidean Algorithm}
\Longrightarrow
\text{Bézout Identity}
\Longrightarrow
\text{线性不定方程与整除推论}.
$$

其中最值得记住的三个公式是

$$
\gcd(a,b)=\gcd(b,a-qb),
$$

$$
\gcd(a,b)=au+bv,
$$

以及

$$
ax+by=c\text{ 有整数解} \iff \gcd(a,b)\mid c.
$$
