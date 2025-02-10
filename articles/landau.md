# Deriving spectra – how to generate a Landau distribution?

Whatever spectra you look at – the QDC data from a scintillator, calorimeter, or the signal distribution of our own detector COSMOSS, you will recognize a very specific distribution. For example...

<img src="../articles/images/landau1.png" width="400px" height="auto">
<img src="../articles/images/landau2.png" width="400px" height="auto">
<img src="../articles/images/landau3.png" width="400px" height="auto">

These are all examples of Landau distributions –– distributions that characterize the energy loss of particles in matter.

But these can be derived without using any experimental data. All we need to know, is the following formula

$$ \\frac{d \\sigma}{d \\varepsilon} \\propto \\frac{1}{\\varepsilon^2} $$
Here, the $ \\varepsilon $ is the energy loss due to a single interaction, and $ \\sigma $ denotes the cross-section – this is essentially the probability for the interaction with energy loss $ \\varepsilon $ to occur.

Let us first tackle the simulation first, because the analytic approach requires Fourier transforms, so it is slightly more intricate.

### Monte Carlo Approach

Monte Carlo simulations are used when you know the underlying physics, but you have no imputs. So, you generate random inputs, feed them into the formulas, and observe what are the outputs.

Here, we will use a Monte Carlo simulation alongside *inverse transform sampling*. What is that? 

It's a technique for pseudo-ranom number generation. Essentially, you know that your data is supposed to be random, but at the same time, it should also approximately follow a known distribution. For this, we will us the fact that a datapoint has equal probability to occupy any piece of area under the probability distribution. I.e. if 5% of people are known to be shorter than 155cm, and another 5% are known to be between 168cm and 169.2 cm, then our randomly generated datapoint has equal probability of lying in the $ h<155 $cm range, as it has to lie in the $ 168.0$ cm $< h \\leq 169.2 $ cm. 

The inverse transform sampling entails:
- Generating random numbers
- Transforming these random numbers using the inverse of the cumulative distribution function (CDF) of the target distribution

Alright, let's get down to business.

First, we will need the cumulative distribution function (CDF) of our function, let us denote it as $F(\\varepsilon)$.
$$ F(\\varepsilon)= \\int_\\sigma(\\varepsilon_{min})^\\sigma(\\varepsilon) C d\\sigma=\\int_\\varepsilon_{min}^\\varepsilon \\frac{C}{\\varepsilon}{\\varepsilon^2} $$

$$ F(\\varepsilon)= \\frac{C}{\\varepsilon_{min}} - \\frac{C}{\\varepsilon} $$

where C is a normalization constant. We can find it by noting that the total area under the probability density graph must be 1. Therefore,

$$ C = \\frac{1}{\\frac{1}{\\varepsilon_{min}-\\frac{1}{varepsilon_{max}} $$

Now, what we will do is to generate random values of F(x), and then look at which $ \\varepsilon $ values these correspond to. 

$$ \\varepsilon=\\frac{\\epsilon_{min}}{1-u \\left(1-\\frac{\\epsilon_{min}}{\\varepsilon_{max}}\\right)}
