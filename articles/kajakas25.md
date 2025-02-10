# Seagull 2025
<img src="../articles/images/kajakas1.png" width="600px" height="auto">
<img src="../articles/images/kajakas2.png" width="600px" height="auto">

A 300C stone is thrown into cold water. Find how much time it takes to evaporate 1g of water.
This is a standard case of thermal diffusion. I referred to [this](https://physlab.org/wp-content/uploads/2016/04/Doc.pdf) for help.
Our diffusion equation is
$$ \\frac{\\partial T}{\\partial t}=\\frac{\\kappa}{c \\rho} \\frac{1}{r^2} \\frac{\\partial}{\\partial r}\\left(r^2 \\frac{\\partial T}{\\partial r}\\right) $$
We will now take a leap and say that the temperature can be expressed as 
$$ T(r, t)=T_1+\\frac{B(r, t)}{r} $$
where $ T_1 $ is the temperature of the water.
After manipulating the previous formula, we get 
$$ \\frac{\\partial B}{\\partial t}=D \\frac{\\partial^2 B}{\\partial r^2} $$ and our boundayr conditions for this equation are 

$ T(r=a, t)=T_1$, $T(r, 0)=T_0$, $T(r, \\infty)=T_1$

<img src="../articles/images/kajakas3.png" width="600px" height="auto">
<img src="../articles/images/kajakas4.png" width="600px" height="auto">
<img src="../articles/images/kajakas5.png" width="600px" height="auto">
