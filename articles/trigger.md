Trigger
=======

Particle detectors are not some miracle devices. The detectors actually go off all the time due to ambient light or electrical noise. To understand how this amounts to detecting particles, imagine yourself inside of the detector. You would expect it to be completely dark, since the detector is shielded from external radiation. Yet, you see a constant background of little flashes of light, caused by noise and light leaks. But occassionally, these sparks seem to be suspiciously synchronized, even forming distinct lines.

Such patterns are what set real hits apart from all the noise, and so distinguishing such events is a key task in experimental high-energy physics (HEP-ex). 

There are two mainstream ways to distinguish such events: one is through data analysis—recognizing concurrent signals, once you already have all the data. This is called triggerless DAQ and it is more suitable for simpler experiments, (like our team's muon detector).
The other option is the so-called synchronous DAQ. This filters and groups the data into individual events using logic gates: the data from other detectors is recorded only once the trigger detector has set off.

<img src="/DAQtypes.png" width="60%" height="auto">

Each event corresponds to a single particle.

These types of electrical triggers are especially irreplaceable for more sophisticated experiments, like the LHC ones, which would be physically incapable of recording all the data they would otherwise produce (50 TB/s!). In the LHC, however, trigger systems become slightly more complex: not only is it necessary to filter out data that originates from collisions – most collisions are actually not interesting for us, because they tell us nothing about the specific scattering that we are looking for. For this, the trigger is composed of both electronics (level-1 trigger), custom CPUs (high level triggers), and these days even AI, which filter out common phenomena before the data gets sent to the experimentalists.

<img src="/ATLAS_trigger.jpg">

One of the ATLAS trigger systems. Photo by [CERN](https://cds.cern.ch/record/2309423). See [CMS trigger](https://cms-opendata-workshop.github.io/workshop2021-lesson-introtrigger/01-introduction/index.html) for more insights.

### A detailed view of a simple trigger

Trigger systems are not just useful for particle physics: they're also commonplace in many other sensors, such as the oscilloscope. 

<img src="/images/Trigger_level_en.gif" width="30%" height="auto">

The oscilloscope only displays such signals which exceed the voltage threshold. 

Similar to the oscilloscope, a basic trigger system is also based on threshold voltages: once the voltage exceeds the threshold, the measurement is initiated. But wouldn't we lose all information about the first portion of the signal (the so-called rising edge)? We would, were it not for the delay.

<img src="/easy_trigger.png" width="30%" height="auto">

A beta detector's trigger system. Since the voltmeter (ADC) is delayed with respect to the trigger, we can record the signal in its entire length.

These delays must be especially fine-tuned when we have a multi-level trigger, consisting of various detectors. Some detectors might have an inherently slower reaction. But it's also the cables that cause a delay. In typical beamtests, the delays from the wires themselves can add up to about 100 ns (compare this with the 20 ns SiPM signal!). Also, even particles at almost the speed of light will not travel through the experimental area in an infinitesimal time — a 10m experimental area will see a 33ns time delay between the up- and downstream detectors recording the particle, equivalent to about 5.5 meters of wire. 

We can work around these delays by either adding in more electronic components or simply introducing new cables.

Trigger systems can become very complicated, for example an extra layer of complexity is added if we take two previously explained trigger systems and combine the outputs of our two discriminators with an AND gate. This results in the coincidence method: if the voltage is above a treshold at both detectors simultaneously, then the detectors begin taking their measurements.

There is a short yet not infinitesimal time frame in which the signal needs to pass through the detector and other components until it gets stored on the disk. On the image, this time frame is 1 ms. We cannot have a new trigger go off during that same time, since the processing of the previous one has still not yet finished, so we need to ignore all incoming signal for that time period. This is done by a busy logic.

<img src="/my_trigger.png" width="80%" height="auto"> 

Busy logic.

A busy logic is very intuitive: if your system says it's 'BUSY', then it's unaccepting of new signals because it has other stuff to do. It is ready to take on a new signal once it goes into 'NOT BUSY' mode.

If you want to learn more, I reccommend these presentations: [simpler triggers](https://indico.cern.ch/event/1337180/contributions/5629322/attachments/2880440/5046367/isotdaq24.Negri.DaqIntro.pdf), [bigger ones](https://indico.fnal.gov/event/43762/contributions/192710/attachments/133065/163909/TriggerLecture_day1.pdf)
