Delay Wire Chambers
===================

For more technical questions on the DWC, refer [here](https://cds.cern.ch/record/702443/files/sl-note-98-023.pdf)

DWCs a.k.a delay wire chambers are gas-filled rectangular chambers that help you track a particle - or at least get their position at the moment they pass the detector. They work like this: a particle passes the gas-filled (argon & $ CO\_2 $) chamber. If the particle is charged, it will ionize the gas inside. In the chamber there are multiple layers of parallel wires, each layer acting as an electrode with neighbouring layers being oppositely charged. The positive ions and electrons, which were created in the ionization, will start to move towards their respective electrodes (electrons towards anode and ions towards cathodes). They're not only moving towards the electrodes, they are also accelerating due to the Coulomb force – especially electrons, which reach such a high velocity, that they start to ionize the surrounding gas even further, creating an avalanche (more specifically a Townsend avalanche). Eventually all of the kicked out electrons reach the anode and cause a great current in it. This current in the anode (more specifically its magnetic field) will go on to create an image current\* in the cathode. This step is important, because it's not the anode current that we are measuring, it's instead the image current in the cathode. Also, the current will be produced in 2-3 neighbouring cathode wires at a time.

### DWC readout

Neighbouring cathode wires are connected to each other with little delay lines. The two edgemost wires are connected to a sensor. The current from the edgemost wires has a characteristic shape: it's like a mountain composed of tiny steps.

Image current
... also known as mirror current, in this context, is just the current which the magnetic field of the neighbouring anode produced in our cathode. The words "image" or "mirror" are used because it turns out that as far as the magnetic field is concerned, the current inside our electrode can be modelled as a reflection of the anode, where the mirror is the surface of our cathode. Each tiny step is the contribution from a single wire. They add up consecutively thanks to the delay lines between the wires, but this is not really the important part. The delay lines are actually there so that the little current mountain would reach the two edges of the cathode, where the detectors are, at different times. The moment when the signal is detected in the sensor is at the rising edge. The detector is a TDC, time to digital converter. This is like a very precise stopwatch that measures the time from the trigger until a signal. The delay lines made it so that the time measured by the two TDCs is not equal. It's actually the difference in the times that gives us the position along one axis. 

$$ \\text{time difference} = \\text{time}_{\\text{Left}} - \\text{time}_{\\text{Right}} $$ no mv

$$ X=A \\cdot \\text{time difference}_{\\text{Right}} + B $$ where the A and B are constants that were measured during the calibration. More specifically, A is the slope and B is the offset.

During calibration, a test generator is used to create electrical signals in the chamber. Though two signals are needed to find the two variables $A$ and $B$, it is standard practice to use three. Those three test point must lie on the same straight line.

![](https://codimd.web.cern.ch/uploads/upload_4c2548f7dbef143fb33bb59ee30d33b6.png)

### TDC vs Scaler

So a TDC is in essence just a stopwatch. And so is the scaler, but the scaler isn't controlled by the trigger, so this is one of the only detectors that is always just doing its own thing – measuring the time of every hit, no matter whether the TDAQ is BUSY or not.
