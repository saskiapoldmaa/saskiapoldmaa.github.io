# Solving the Diffusion Equation

I had encountered diffusion equations in previous years' physics cups but I had never managed to solve them. The 2025 Seagull prompted me to go back to them, and to my surprise, they didn't seem as daunting this time.

My biggest blunder was loioking for help from heat transfer problems. No wonder I did not find anything helpful from there –– heat transfer, at the very begiining, is a completely different process from the heat transfer in the steady state. It turns out that this 'heat wave' trvarses through the material as a diffusive process.

### 1D
Imagine you have two walls, one at temperature T_1, and the second at temperature 0. These two walls are brought into contact, and the temperature is kept constant at $T_1$ on one of the walls.
What is the temperature in the second wall, at distance x from the interface, and at time t?

Fourier's first law tells us that

$$ J = \\kappa \\frac{\\partial T}{\\partial x} $$

Material heats up when the heat doesn't just pass through it, but rather it gets trapped in the medium. Hence, the warming is proportional to the divergence of $J$, and in our 1D case

$$c \\rho \\frac{\\partial T}{\\partial t}=\\kappa \\frac{\\partial^2 T}{\\partial x^2}, $$

which is often expressed using the diffusion constant D as

$$ \\frac{\\partial T}{\\partial t}=D \\frac{\\partial^2 T}{\\partial x^2}. $$

We will solve it by assuming a self-similar solution. I.e., at whatever instant, the temperature profile looks identical to how it was before, just zoomed in/out. More formally, this means that $T=T(\\xi) $ where $\\xi$ is a product of $x$ and $t$, at some unknown powers. For diffusion, it is standard practice to use $\\xi=\\frac{x}{\\sqrt{Dt}}.

Plugging this into the equations, and letting $T'$ denote $\\frac{dT}{d \\xi}$, the diffusion eqn. takes the form

$$-\\frac{\\xi T'}{2 t}=\\frac{T''}{t} $$ from which we get the Gaussian
$$ T' =C_1 e^{-\\xi^2/2} $$ and integrating once more, we get
$$T=C_2-C_2 erf \\left( \\frac{x}{\\sqrt{2}} \\right) $$

Our boundary conditions are $T(x=0, t) =T_1$ and $T(x=\\infty, t)=0$, from which we deduce the final solution

$$T=T_1 \\left( 1- erf \\left( \\frac{x}{\\sqrt{2}} \\right) \\right) $$

<img src="../articles/images/kajakas2.png" width="600px" height="auto">

I decided to write a [separate article](../articles/PC/diffusion.md) on diffusion, so this is just an excerpt from that.

A 300C stone is thrown into cold water. Find how much time it takes to evaporate 1g of water.

This is a standard case of thermal diffusion. I referred to [this](https://physlab.org/wp-content/uploads/2016/04/Doc.pdf) for help.

Our diffusion equation is
$$ \\frac{\\partial T}{\\partial t}=\\frac{\\kappa}{c \\rho} \\frac{1}{r^2} \\frac{\\partial}{\\partial r}\\left(r^2 \\frac{\\partial T}{\\partial r}\\right) $$

We will now take a leap and say that the temperature can be expressed as 
$$ T(r, t)=T_1+\\frac{B(r, t)}{r} $$
where $ T_1 $ is the temperature of the water.

After manipulating the previous formula, we get 
$$ \\frac{\\partial B}{\\partial t}=\\frac{\\kappa}{c \\rho} \\frac{\\partial^2 B}{\\partial r^2} $$ and our boundary conditions for this equation are 

$ B(r=a, t)=0$, $B(r, 0)=r(T_0-T_1)$, $B(r, \\infty)=0$ and $ B(0, t)=0 $ (because $B\\propto r$).
