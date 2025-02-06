What particles are in the beam?
===============================
<a href="https://github.com/saskiapoldmaa/saskiapoldmaa.github.io/blob/main/Files/XCET_scan.csv" download>
    <button style="background-color:#616eff; color:white; border:none; padding:7px 12px; cursor:pointer; font-size:15px; border-radius:5px;">
         👇 Access data!
    </button>
</a>

Well, there are lots of beams on offer at CERN. You just pick one out from a catalogue, place your order on the computer by selecting the right beamfile, and to place the order, you call to the CCC (CERN Control Centre).

We worked with positive hadron beams – that means the beam is composed of protons, pions, the alike.
Whenever we wanted only muons, we would order for a beamstopper to be put in the beam. The beamstopper is a massive metal block, which stops the particles, and muons are the only decayproducts that can actually penetrate it.

We don't even have to program anything to gain some first insights. Let's look at the Cherenkovs!

A particle emits light in a Cherenkov detector if it exceeds light speed in that medium.

$$v>\\frac{c}{n}$$
where n is the refractive index in that medium and c is the speed of light in that medium. In any relativistic scenario, speeds are avoided as much as possible, so let us translate this speed over to the particle's energy (this is particle physics' lingo for kinetic energy)

$$E_k=\\frac{m_0 c^2}{\\sqrt{\\left.1-(v / c)^2\\right)}}-m_0 c^2$$ where m_0 is the particle's rest mass.

What we'd like to know is what pressure must we put the Cherenkov detector under, to make the light move slower than the particle. For this, we will express the refractive index as
$$n=1+kP$$
where P is the pressure and k is a gas-specific constant. In our experiment, we used $CO_2$, so $k=4.5\\cdot 10^{-4}$.
Anyways, we now have three equations, which we will have to combine to find the pressure in the Cherenkov as a function of energy. This comes out to be

$$P=\\frac{1}{k}\\left( \\frac{m_0c^2+E}{\\sqrt{E^2+2Em_0c^2}}-1 \\right)$$.

So for a 3 GeV beam, the different particles will begin emitting light in the Cherenkov detectors at the following pressures.

| Particle  | Pressure (bar) |
|---|---|
|Muon   |1.287   |
|Pion   |5.3   |
|Kaon   |22.8   |
|Proton |65.9   |

And for a 9 GeV beam, these values will be 
| Particle  | Pressure (bar) |
|---|---|
|Muon   |0.15   |
|Pion   |0.20   |
|Kaon   |3.06   |
|Proton |9.97   |

To illustrate this, let us look at the data gathered during a "pressure scan" –– this is a procedure, during which a Cherenkov detector is pumped to almost its maximal pressure, and it is then let to slowly run empty. In the process, the Cherenkov efficiency –– fraction of particles passing through the detector, which emit light, is monitored. 

Below are the results of one of these pressure scans for a 9 GeV beam. Look out for what happens as the pressure increases!

<iframe src="../Files/pressure_vs_cherenkov.html" width="100%" height="400"></iframe>

See how different particles popped up as little bumps in the graph? Although all of these particles are almost at the same energies – 9 GeV, due to their different masses, it takes a different amount of pressure for each type of these particles to become visible in the Cherenkov detector.

<img src="../articles/images/Identification/3GeVhadron.png" alt="" width="70%" height="auto">
