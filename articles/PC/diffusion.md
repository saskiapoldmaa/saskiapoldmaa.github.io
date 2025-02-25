# All I Know About Diffusion

I had encountered diffusion equations in previous years' physics cups but I had never managed to solve them. The 2025 Seagull prompted me to go back to them, and to my surprise, they didn't seem as daunting this time.

My biggest blunder was loioking for help from heat transfer problems. No wonder I did not find anything helpful from there –– heat transfer, at the very begiining, is a completely different process from the heat transfer in the steady state. It turns out that this 'heat wave' trvarses through the material as a diffusive process.

### 1D
Imagine you have two walls, one at temperature $T_1$, and the second at temperature 0. These two walls are brought into contact, and the temperature is kept constant at $T_1$ on one of the walls.
What is the temperature in the second wall, at distance x from the interface, and at time t?

Fourier's first law tells us that

$$ J = \\kappa \\frac{\\partial T}{\\partial x} $$

Material heats up when the heat doesn't just pass through it, but rather it gets trapped in the medium. Hence, the warming is proportional to the divergence of $J$, and in our 1D case

$$c \\rho \\frac{\\partial T}{\\partial t}=\\kappa \\frac{\\partial^2 T}{\\partial x^2}, $$

which is often expressed using the diffusion constant D as

$$ \\frac{\\partial T}{\\partial t}=D \\frac{\\partial^2 T}{\\partial x^2}. $$

We will solve it by assuming a self-similar solution. I.e., at whatever instant, the temperature profile looks identical to how it was before, just zoomed in/out. More formally, this means that $T=T(\\xi) $ where $\\xi$ is a product of $x$ and $t$, at some unknown powers. For diffusion, it is standard practice to use $\\xi=\\frac{x}{\\sqrt{Dt}}$.

Plugging this into the equations, and letting $T'$ denote $\\frac{dT}{d \\xi}$, the diffusion eqn. takes the form

$$-\\frac{\\xi T'}{2 t}=\\frac{T''}{t} $$ from which we get the Gaussian
$$ T' =C_1 e^{-\\xi^2/2} $$ and integrating once more, we get
$$T=C_2-C_3 erf \\left( \\frac{x}{\\sqrt{2}} \\right) $$

Our boundary conditions are $T(x=0, t) =T_1$ and $T(x=\\infty, t)=0$, from which we deduce the final solution

$$T=T_1 \\left( 1- erf \\left( \\frac{x}{\\sqrt{2}} \\right) \\right) $$

### 1D with a twist ft. fractional derivatives

Imagine a sheet of water with thickness H, density $\\rho_w$ and heat capacity $c_w$ is flowing over the medium. Let us assume that this sheet of water extends to infinity, therefore we have to only look at 1D. Let us label the direction in which the water is flowing as x-axis, and the vertical (pointed downwards) as z-axis. What is the temperature of water at distance x and time t?

The energy balance between the soil and the water can be written as

$$vHc_w\\rho_w \\frac{\\partial T}{\\partial x}=J=\\kappa \\frac{\\partial T}{\\partial z} $$

But we don't really care about y – we want a final expression featuring x and t.

We know that
$$\\frac{\\partial T}{\\partial t}=D\\frac{\\partial^2 T}{\\partial z^2}$$

but we can't do much here, since our first equation has the first expression features a first derivative of T over z, while the second one has the second derivative. What we can do, however, is expand the second expression...

$$\\left(\\sqrt{\\frac{\\partial }{\\partial t}}T-\\sqrt{D}\\frac{\\partial T}{\\partial z}\\right)\\left(\\sqrt{\\frac{\\partial}{\\partial t}}T+\\sqrt{D}\\frac{\\partial T}{\\partial z}\\right)=0$$

Note that T is not under the square root, that is because $\\sqrt{\\frac{\\partial }{\\partial t}}$ is not just the square root of the normal derivative, it is its own operator.

By now substituting $\\frac{\\partial T}{\\partial z}$ from the first eqn., we get

$$\\frac{(vHc_w \\rho_w)^2}{\\kappa c \\rho}\\frac{\\partial^2 T}{\\parttial x^2}=\\frac{\\partial T}{\\partial t}$$

which is like a standard diffusion equation, only that the effective diffusivity constant is very wacky, since it also accounts for the flow of the water etc. Solving this in the same way as in the previous section, we get

$$T(x, t)=T_0 \\left( 1- erf \\left( \\frac{x}{\\sqrt{2}} \\right) \\right) $$

### 2D

Here, we do exaclty the same: assume a self-similar solution, transform the diffusion equation into a first-order DE, and then solve it. This time, we will take a different value of $\\xi$: $\\xi=\\frac{x}{\\sqrt{2Dt}}$ where the 2 simply appears because the heat is now dissipating in 2 directions.

Also, our diffusion equation is slightly different. First, the Fourier law  for cylindrical symmetry is

$$ 2 \\pi r J = \\kappa \\frac{\\partial T}{\\partial s}, $$

where $ s $ is the distance from the axis of symmetry, and the dif. eqn. itself is consequently

$$\\frac{\\partial T}{\\partial t}= \\frac{D}{s} \\frac{\\partial}{\\partial s}\\frac{\\partial T}{\\partial s}$$

By replacing in the $\\xi$, we get

$$ \\frac{\\xi T'}{2t}=\\frac{D}{s} \\sqrt{2Dt}\\left( \\xi T'' + T' \\right) $$

which is equivalent to

$$ -\\xi^2 T'=\\xi T''+T' $$ 

and also to

$$\\xi u + u'=0 $$

where $u=\\xi T'$. Solving for u and then beginning to solve for $T$, we get

$$ T=\\int \\frac{C_1 e^{-\\xi^2/2}}{\\xi} \\,d\\xi = -C_2 \\mathrm{Ei} \\left(\\frac{s^2}{4Dt}\\right)+C_3 $$

where Ei is the exponential integral.

Now we get to the Physics Cup 2024 Problem no. 5: 
<iframe src="https://physicscup.ee/physics-cup-taltech-2024-problem-5/" width="600" height="300"></iframe>

<img src="../articles/images/kajakas2.png" width="600px" height="auto">

A 300C stone is thrown into cold water. Find how much time it takes to evaporate 1g of water.

This is a standard case of thermal diffusion. I referred to [this](https://physlab.org/wp-content/uploads/2016/04/Doc.pdf) for help.

Our diffusion equation is
$$ \\frac{\\partial T}{\\partial t}=\\frac{\\kappa}{c \\rho} \\frac{1}{r^2} \\frac{\\partial}{\\partial r}\\left(r^2 \\frac{\\partial T}{\\partial r}\\right) $$

We will now take a leap and say that the temperature can be expressed as 
$$ T(r, t)=T_1+\\frac{B(r, t)}{r} $$
where $ T_1 $ is the temperature of the water.

After manipulating the previous formula, we get 
$$ \\frac{\\partial B}{\\partial t}=\\frac{\\kappa}{c \\rho} \\frac{\\partial^2 B}{\\partial r^2} $$ 

and our boundary conditions for this equation are 

$ B(r=a, t)=0$, $B(r, 0)=r(T_0-T_1)$, $B(r, \\infty)=0$ and $ B(0, t)=0 $ (because $B\\propto r$).
