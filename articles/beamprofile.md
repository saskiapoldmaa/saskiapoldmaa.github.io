# What does a beam look like?

<a href="https://github.com/saskiapoldmaa/saskiapoldmaa.github.io/blob/main/Files/XCET_scan.csv" download>
    <button style="background-color:#616eff; color:white; border:none; padding:7px 12px; cursor:pointer; font-size:15px; border-radius:5px;">
         👇 Access data!
    </button>
</a>


<img src="../articles/images/spill.png" width="800px" height="auto">

This is a screenshot from CESAR – the more archaic one of the two DAQs that is mostly used to monitor the experiment as the beam is running The plot shows the number of events in a 20 second interval. Surprisingly, however, this is a **terrible** representation of how the beam actually looks like. 

In reality, the beam is not a continuous flow of particles, but rather a pulsation. Every 40 seconds or so, another bunch of particles arrives from the Proton Synchrotron to the experiment.

But how does the beam look like spatially? How wide is it? Is it circular?
The images below are also from CESAR, they are so-called beamprofiles – measured by a bunch of scintillating fibers. By noting down which fiber captures a signal, the particle's approximate position can be determined.

<img src="https://codimd.web.cern.ch/uploads/upload_88fad15ed028d5ff5531140f612c45e4.png" width="800px" height="auto">

The DWC are better at giving us a particle-by-particle vision of the beam. Here are some 2D images from DWCs...
<img src="../articles/images/hitmap_hadron.png" width="50%" height="auto" >

for the hadron beam

<img src="../articles/images/hitmap_muon.png" width="50%" height="auto" >

and for the muon beam.

Curiously, the hadron beam is moch more concentrated. And the muon beam seems to take the shape of a square – well that is actually not because of the beam itself, but simply from the fact that the DWCs are rectangular, and near the edges, they are slightly less efficient. The point is, that the muon beam is much wider, because it is created from the scattering of those same hadrons (the beam at the T10 beamline is by default a hadron beam, to make it into a muon beam, a massive iron block is placed into the beam, which initiates scattering.)

Below you can see a nice 3D visualization of the trajectories of 1 000 random muons as they move in-between the two DWCs...

<iframe src="Files/plot.html" width="850" height="650"></iframe>

We see that the beam is not entirely parallel. This is of course bad, because those deviating particles will just be lost from the beam. This is our first glimpse into beam dynamics - a field that is absolutely massive (and fascinating!). I reccommend browsing this [entry-level article](https://cds.cern.ch/record/2743947/files/Wilson-Holzer2020_Chapter_BeamDynamics_2.pdf) to get an idea of the different strategies (most notably, quadrupoles) used for manipulating the shape of the beam.

An interesting concept to take away from the article is Liouville's theorem, which states that $\\sigma_x\\sigma_{p_x}=const.$ where $\\sigma_x$ is the variance in position and $\\sigma_{p_x}$ the variance in x-directional momentum. Same applies for the y-direction. This has noticeable similarities to the uncertainty principles, which tells us that $\\sigma_x \\sigma_{p_x}\\geq \\hbar/2$. In reality, this product is much greater than $\\hbar/2$. Also, Liouville's theorem has a fascinating conenction to adiabatic invariants, as highlighted [here](https://www.damtp.cam.ac.uk/user/tong/dynamics/clas.pdf)

But at its core, the Liouville theorem theorem tells us that the beam's area in the phase space is constant, i.e. if you reduce the variance in momentum (align the beam better), then $\\sigma_x$ must increase, and the beam becomes wider. Here are a few illustrations of this for the muon beam:
<img src="../articles/images/X-X' Phase Space for a 1GeV Muon Beam.png" width="50%" height="auto" >
<img src="../articles/images/X-X' Phase Space for a 2GeV Muon Beam.png" width="50%" height="auto" >
<img src="../articles/images/X-X' Phase Space for a 5GeV Muon Beam.png" width="50%" height="auto" >
<img src="../articles/images/X-X' Phase Space for a 7GeV Muon Beam.png" width="50%" height="auto" >

And here are a few phase space plots for the hadron (pion) beam:
<img src="../articles/images/X-X' Phase Space for a 3GeV Pion Beam.png" width="50%" height="auto" >
<img src="../articles/images/X-X' Phase Space for a 5GeV Pion Beam.png" width="50%" height="auto" >
<img src="../articles/images/X-X' Phase Space for a 9GeV Pion Beam.png" width="50%" height="auto" >

Liouville's theorem is nicely evident, but it is also interesting to see the differences between the muon and pion beam: the pion beam seems to have some sort of spokes. After taking a look at the beam dynamics article, it might become evident that these are an artifact of the quadrupoles. That happens when particles with different momenta (or charge species) experience different bending or focusing strengths in the magnets. For the muon beam, however, this effect is overpowered by scattering. 