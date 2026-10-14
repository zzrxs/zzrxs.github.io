---
title: Signals and Systems Intro
date: 2026-09-22 13:46:11
updated: 2026-09-22
math: true
categories:
  - Signals and Systems
tags:
  - Intro
description: Signals and Systems Course Notes (Intro)
index_img: /img/SignalsSystemsIntro.png
---


## Introduction

### What Do Signals and Systems Study?

- **Signal** :
  - May describe a wide variety of physical phenomena.
  - Represented mathematically as a function of one or more independent variables:

$$
x:I\to X,\qquad t\mapsto x(t).
$$

$I$ is the set of values for the independent variable and $X$ is the set of signal values. This course mainly discusses signals with only one independent variable, and this variable is uniformly referred to as "time". A continuous-time signal is denoted as $x(t)$, and a discrete-time signal is denoted as $x[n]$.

- **System** :
  - A process or rule that transforms an input signal into an output signal.
  - If the system is denoted by the operator $\mathcal T$, then

$$
y=\mathcal T\{x\},\qquad x\longrightarrow \boxed{\mathcal T}\longrightarrow y.
$$

<!-- ### Two Important Perspectives

1. **Time-domain perspective**: Study the signal values along the time axis and the system response at each instant.
2. **Representation perspective**: Treat a signal as a vector in a vector space and expand it using a set of basic signals. If $\{\phi_k\}$ is a basis, then

   $$
   x=\sum_k a_k\phi_k.
   $$

   Different bases lead to different signal representations. The unit-impulse basis emphasizes sample values, the Fourier basis emphasizes frequency components, and the Haar wavelet basis retains both time and scale information.

Fourier's central idea is that, under suitable conditions, a periodic signal can be represented as a weighted sum of sines and cosines at different frequencies. This changes the question from how a waveform varies with time to which frequencies compose the signal. The representation underlies speech, image, communication, radar, biomedical, and financial signal processing. -->

## Syllabus

<details>
<summary>1. SIGNALS AND SYSTEMS</summary>

- 1.1 Definition and Representations of Signals
- 1.2 Transformation of Independent Variable
- 1.3 Basic Signals: Exponential & Sinusoidal Signals
- 1.4 Basic Signals: Unit Impulse & Unit Step Signals
- 1.5 Definitions and Representations of Systems
- 1.6 Basic System Properties

</details>

<details>
<summary>2. LINEAR TIME-INVARIANT SYSTEMS</summary>

- 2.0 Introduction
- 2.1 DT LTI Systems and Convolution Sum
- 2.2 CT LTI Systems and Convolution Integral
- 2.3 Properties of LTI Systems
- 2.4 Causal LTI Systems Described by Differential and Difference Equations
- 2.5 Block Diagram Representations of First-order Systems
- 2.6 Singularity Functions

</details>

<details>
<summary>3. FOURIER SERIES REPRESENTATION OF PERIODIC SIGNALS</summary>

- 3.0 Introduction
- 3.1 Response of LTI Systems to Complex Exponentials
- 3.2 Fourier Series Representation of CT Periodic Signals
- 3.3 Convergence of Fourier Series
- 3.4 Properties of CT Fourier Series
- 3.5 Fourier Series Representation of DT Periodic Signals
- 3.6 Fourier Series and LTI Systems

</details>

<details>
<summary>4. THE CONTINUOUS-TIME FOURIER TRANSFORM</summary>

- 4.0 Introduction
- 4.1 CT Fourier Transform
- 4.2 Fourier Transform of CT Periodic Signals
- 4.3 Properties of CT Fourier Transform
- 4.4 Convolution Property
- 4.5 Multiplication Property
- 4.6 Systems Characterized by Linear Constant-Coefficient Differential Equations

</details>

<details>
<summary>5. THE DISCRETE-TIME FOURIER TRANSFORM</summary>

- 5.0 Introduction
- 5.1 DT Fourier Transform
- 5.2 DT Fourier Transform for Periodic Signals
- 5.3 Properties of DT Fourier Transform
- 5.4 Convolution Property
- 5.5 Multiplication Property
- 5.6 Systems Characterized by Linear Constant-Coefficient Difference Equations

</details>

<details>
<summary>6. TIME AND FREQUENCY CHARACTERIZATION OF SIGNALS AND SYSTEMS</summary>

- 6.1 Magnitude-phase Representation of Fourier Transform
- 6.2 Relations Among Fourier Representations

</details>

<details>
<summary>7. SAMPLING</summary>

- 7.1 Sampling and Reconstruction of CT Signals
- 7.2 Sampling of DT Signals
- 7.3 DT Processing of CT Signals

</details>

<details>
<summary>8. COMMUNICATION SYSTEMS</summary>

- 8.1 CT Modulation
- 8.2 DT Modulation

</details>

<details>
<summary>9. THE LAPLACE TRANSFORM</summary>

- 9.0 Introduction
- 9.1 Laplace Transform
- 9.2 Region of Convergence
- 9.3 Properties of Laplace Transform
- 9.4 Inverse Laplace Transform
- 9.5 Laplace Transform of Singularity Functions
- 9.6 Analysis of LTI Systems by Laplace Transform
- 9.7 Block Diagram Representations
- 9.8 Unilateral Laplace Transform

</details>

<details>
<summary>10. THE Z-TRANSFORM</summary>

- 10.0 Introduction
- 10.1 z-Transform
- 10.2 Region of Convergence
- 10.3 Properties of z-Transform
- 10.4 Inverse z-Transform
- 10.5 Analysis of LTI Systems by z-Transform
- 10.6 Block Diagram Representations
- 10.7 Unilateral z-Transform

</details>
