Trigger
=======

Triggers are truly the magic behind particle physics – so buckle up, there's truly no way around this.

Particle detectors are not some miracle devices. The detectors actually go off all the time due to ambient light, radiation or just electrical noise. To understand how this amounts to detecting particles, imagine yourself in a dreamland, floating around in empty space. Everywhere around you, you can see little sparks constantly lighting up. But occassionally, these sparks seem to be suspiciously synchronized, even forming distinct lines.

This is identical to what the detectors see. At whatever instant, there seems to be something going on. But when an array of detectors seems to go off simultaneously, then you have found yourself a particle!

Such events can be detected both via data analysis, like I had done with my DIY detector (this is called a triggerless DAQ), or through the much simpler method of using AND gates. Once the AND gate gets a signal, indicating that multiple detectors got a hit simultaneously, the info is quickly spread to all other detectors: "Quick! Write that down!", and so the readings of all the detectors get grouped together into a single _event_.

<img src="/DAQtypes.png" width="60%" height="auto">


Each event corresponds to a single particle.

Electronic triggers are especially fundamental for more sophisticated experiments, like the LHC ones, which would be physically incapable of recording all of the data that they would otherwise produce (50 TB/s!). In this context, trigger systems are slightly more complex: not only is it necessary to filter out data that originates from collisions – most collisions are actually not of interest, because they don't carry any novel information with them. For this, the trigger is composed of both electronics (level-1 trigger) and custom CPUs (high level trigger), which filter out common phenomena.

<img src="/ATLAS_trigger.jpg">

One of the ATLAS trigegrs. Photo by [CERN](https://cds.cern.ch/record/2309423). Want to read more? I recommend the [CMS trigger](https://cms-opendata-workshop.github.io/workshop2021-lesson-introtrigger/01-introduction/index.html).

### A detailed view of a simple trigger

You might already be wondering whether the oscilloscope's trigger has anything to do with this – yes it does!

Similar to the oscilloscope, a basic trigger system is also based on threshold voltages: once the voltage exceeds the threshold, the measurement is initiated. But wouldn't we lose the first portion of the signal? We would, were it not for the delay.

<img src="/easy_trigger.png" width="50%" height="auto">

A beta detector's trigger system.

The figure shows a simple beta radiation detector. Since the voltmeter (ADC) is delayed with respect to the trigger, we can record the signal in its entire length.

These delays must be especially fine-tuned when we want to base the trigger on multiple detectors: some detectors might be inherently slower, but it is also the cables that affect the delay. Delays from the different length wires in typical experiments can be on the order of 100 ns. Additionally, a particle, travelling at the speed of light, will actually hit one detector 3.3 ns earlier than the other detector, which is located a meter downstream. In our testing area, this amounts to the delay of a half a meter long cable.

These delays are fine-tuned by adding in electronics components or simply introducing new cables.

Trigger systems can become very complicated, for example an extra layer of complexity is added if we take two previously explained trigger systems and combine the outputs of our two discriminators with an AND gate. This results in the coincidence method: if the voltage is above a treshold at both detectors simultaneously, then the detectors begin taking their measurements.

There is a short yet not infinitesimal time frame in which the signal needs to pass through the detector and other components until it gets stored on the disk. On the image, this time frame is 1 ms. We cannot have a new trigger go off during that same time, since the processing of the previous one has still not yet finished, so we need to ignore all incoming signal for that time period. This is done by a busy logic.

<img src="/my_trigger.png" width="50%" height="auto"> 

Busy logic.

A busy logic is very intuitive: if your system says it's 'BUSY', then it's unaccepting of new signals because it has other stuff to do. It is ready to take on a new signal once it goes into 'NOT BUSY' mode.

If you want to learn more, I reccommend these presentations: [simpler triggers](https://indico.cern.ch/event/1337180/contributions/5629322/attachments/2880440/5046367/isotdaq24.Negri.DaqIntro.pdf), [bigger ones](https://indico.fnal.gov/event/43762/contributions/192710/attachments/133065/163909/TriggerLecture_day1.pdf)
