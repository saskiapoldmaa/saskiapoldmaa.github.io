Cherenkov detectors
===================

<p><img src="/diy_che.png" alt="" width="30%" height="auto"> <img src="/kamiokande_che.png" alt="" width="30%" height="auto"> <img src="/xcet.gif" alt="" width="30%" height="auto"></p>
<p><a href="https://indico.cern.ch/event/1337180/contributions/5629322/attachments/2880440/5046367/isotdaq24.Negri.DaqIntro.pdf">DIY Detector</a>, <a href="https://www.asahi.com/ajw/articles/14370116">Kamiokande</a>, <a href="https://sba.web.cern.ch/sba/Documentations/Informations&amp;Training/Beam_Equipments/Threshold_Cerenkov_counters/">XCET</a></p>

Common denominator between these pictures?

Cherenkov radiation – when a particle is faster than light in that medium, the gas will emit light. Faster than light – wasn't that impossible? Well, yes, but right now the particle is not exceeding the speed at which information/energy is transferred – the group velocity. It's instead exceeding the phase velocity of light, which is totally fine.

Anyways, Cherenkov radiation is all around us. If you could shield the ocean from sunlight, you would see a blue glow in the water due to cosmic rays. Or, you could take a light-tight can, fill it with water and put a light detector (PMT) in it, as shown on the first picture.

In our experiment, we used threshold Cherenkov detectors (XCETs) – the second most popular Cherenkov detector at CERN besides the Ring Imaging CHerenkov (RICH) detectors. XCETs are gas-filled detectors designed to determinine if a charged particle passing through them exceeds a specific cutoff momentum.

The threshold momentum is regulated by the pressure in the detector. The higher the pressure, the higher is the refractive index and the slower does light travel in that medium. Hence, to raise the threshold momentum for particles, you need to decrease the pressure (so increase to decrease!).

By using two Cherenkov detectors at different pressures, with two distinct momentum cutoffs for light emission, you can identify all particles within the momentum range defined by the cutoff momenta of each detector. A particle will fall into this momentum range if it emits light in one Cherenkov detector but not in the other.

To map the momentum of all particles in the beam, i.e. to measure the particles' spectrum, you need to perform a so-called pressure scan. For this, only one Cherenkov detector is necessary, but you need to vary the pressure in it from maximum to minimum. This can be done by initially pumping the detector full of gas and taking measurements while it gradually depressurizes.

The results of pressure scans are usually given by # of particles in a spill that made the medium emit light. You get an idea of what fraction of particles emitted light by comparing this to the trigger rate - the total number of particles in a spill. This is a sample pressure scan from our testbeam: <img src="/che.png" alt="" width="70%" height="auto">

Here, the x-axis represents the pressure in the Cherenkov detector in bars. On the y-axis is the Cherenkov efficiency. The efficiency of a Cherenkov detector is truly not an efficiency; it is actually the fraction of particles that emit light or

$\\eta=\\frac{\\text{Light-emitting particles per spill}}{\\text{Trigger rate}}$

As you can see from the previous picture, at low pressure the threshold momentum is very high, so there are few particles that actually get detected, but as the pressure increases, the momentum becomes less and less discriminating, so more particles are detected.

Pressure scans are more useful after you've translated the x-axis from pressure to threshold momentum.Because particle energies usually follow a normal distribution, the 50% efficiency usually responds to the peak of the spectrum. <img src="/pre.png" alt="" width="30%" height="auto">
