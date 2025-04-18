Capturing Signals
==========

<iframe width="560" height="315" 
  src="https://www.youtube.com/embed/j4yKByB6G5U?autoplay=1&mute=1" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
</iframe>

The essence of the experiment lies in the various electric signals, which the detectors produce. Before turning them into data, we need to somehow pass them through logic gates and then digitize them in the least headachy way. For this, we often use NIM crates. How do these look like?

Well, they are just little red panels, completely blocked away by bundles of wires. And this is the biggest downside of NIMs – so. many. wires. Despite this, they have been the industry standard for the past $\\sim 60$ years, and while they're slowly going out of style, for smaller scale experiments they have remained indispensable.

So, we'll take a deep dive into what constitutes the red panel: discriminators, coincidence modules, amplifiers and timing modules.

### 1. Coincidence units

If we need to set three signals in coincidence, we should first set two of the signals in coincidence with each other and then set that signal into another coincidence with the 3rd signal. If we just set all of them into one big coincidence, then we could find that the some signal hasn't even arrived before another signal is already gone. This is because of the delays previously discussed, but also because the discriminator signals have an arbitrary (user-defined) length. It is easier for us to elongate the coincidence signal of inputs 1 & 2, in a way that signal 3 would aso fit in the coincidence window, then it is to elongate 2 discriminator signals.

<img src="https://codimd.web.cern.ch/uploads/upload_491e531bc6c5e0f8952c552bfd2a2183.jpg" width="600px" height="auto">

<img src="/coincidence_better.png" alt="" width="80%" height="auto">

Do signals usually come in bunches or are they more-or-less equally spaced? Well, as it turns out, there is a mathematical reason for them to come in bunches. For events that are both stochastic (random) and memoryless, the probability of an event happening is always highest at the current moment. 
<img src="../articles/images/NIMtime_between.png" alt="" width="30%" height="auto">

NIM (Nuclear Instrumentation Module) crates serve as the backbone of many laboratory setups in nuclear and particle physics experiments. These crates provide the standardized framework and power supply necessary to house and connect various NIM modules.

The discriminator works just like a comparator. It's output is used as a reference point for when to take measurements. Thanks to the delay component, the comparator's output transition (from 'high' to 'low' or vice versa) occurs precisely when the signal reaches the ADC. The second transition, which signifies the end of the measurement, occurs as the tail end of the signal passes the ADC. 

<img src="../discriminator.png" alt="" width="70%" height="auto">

Here you see the output of a dicriminator and its appearance on a NIM.

The modules plugged into a NIM crate perform tasks like signal amplification, timing, logic processing, and more. Each module adheres to the NIM standard, ensuring compatibility across different systems.

Power distribution is a crucial feature of NIM crates. Each slot provides regulated power to the modules, ensuring stable operation. The above image shows the internal wiring layout of a standard NIM crate.

One notable use of NIM crates is in coincidence measurements. For example, when studying the simultaneous detection of particles in multiple detectors, the signals from each detector pass through NIM modules that generate precise timing and logic outputs.

The NIM standard was developed to facilitate modularity, and it remains widely used despite newer systems like VME and CAMAC being introduced. The simplicity and robustness of NIM crates make them invaluable for small-scale and prototype experiments.
