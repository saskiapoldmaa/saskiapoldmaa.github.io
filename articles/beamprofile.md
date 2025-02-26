# What does a beam look like?

<a href="https://github.com/saskiapoldmaa/saskiapoldmaa.github.io/blob/main/Files/XCET_scan.csv" download>
    <button style="background-color:#616eff; color:white; border:none; padding:7px 12px; cursor:pointer; font-size:15px; border-radius:5px;">
         👇 Access data!
    </button>
</a>


<img src="../articles/images/spill.png" width="800px" height="auto">

This is a screenshot from CESAR – the more archaic one of the two DAQs. It represents the number of particles encountered per second over about a hour and a half. It might not seem obvious, but the frequency is actually at 0 most of the time. However, soemtimes it hovers at the 2,500 Hz mark, and sometimes, it hasn't quite 
reached that level yet.

The sudden rises in count rate occur during the spills –– the beam is not a continuous flow of particles, but rather a pulsation. Every 40 seconds or so (this depends on the experimental area), another bunch of particles arrives from the Proton Synchrotron to our experiment.

But how does the beam look like spatially? How wide is it? Is it circular?
These are also images from CESAR, they are so-called beamprofiles – given to us by a bunch of scintillating fibers. By noting down which fiber captures a signal, the particle's approximate position can be determined.

<img src="https://codimd.web.cern.ch/uploads/upload_88fad15ed028d5ff5531140f612c45e4.png" width="800px" height="auto">


The DWC give us an insight into how the beam looks like. Here are some 2D images from DWCs...
<img src="../articles/images/hitmap_hadron.png" width="50%" height="auto" >

for the hadron beam

<img src="../articles/images/hitmap_muon.png" width="50%" height="auto" >

and for the muon beam.

Curiously, the hadron beam is moch more concentrated. And the muon beam seems to take the shape of a square – well that is actually not because of the beam itself, but simply from the fact that the DWCs are rectangular, and near the edges, they are slightly less efficient.

Here is also a 3D image of the trajectories of 1 000 random hadrons as they move in-between the two DWCs...

<iframe src="../Files/plot.html" width="850" height="650"></iframe>



