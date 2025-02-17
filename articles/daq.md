Data Acquisition (DAQ) Systems
==============================

<iframe width="560" height="315" 
  src="https://www.youtube.com/embed/6E5apEYpPSQ?autoplay=1&mute=1" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
</iframe>
                    
Data Acquisition systems, or DAQs, are the heart of modern experimental setups. They gather, process, and store data from detectors, allowing researchers to analyze experimental results in real time or offline.

<img src="https://codimd.web.cern.ch/uploads/upload_43fb6517b051368d7b4f5ebde271b203.png" width="800px" height="auto">

CESAR is the control software that allows us to switch on the beam, select a beam configuration (momentum, momentum tolerance, to an extend the beam size via collimator settings unless we are using a muon beam, etc.) configure detectors such as the XCETs, start pressure scans, etc.

TDAQ is the software that we are using to actually capture data. It is the thing you saw in our session a few weeks back where we did some measurements with cosmic muons.

CESAR is not a data acquisition software, it shows you some values and you can do some measurements like the pressure scan. But it can not record the particle-by-particle data that we are interested in. Also, TDAQ and CESAR are not synchronized and do not "talk" to each other - we did record data during the pressure scans but because CESAR on it's own decides when to change the pressure and what to accept as "valid" measurements for each individual pressure, it is difficult to draw finer-grained data out of the TDAQ recording. 

This is one of the reason why we will only use the pressure scans to establish the XCET boundaries but not during the actual data taking - too many independently varied variables makes the interpretation of the results difficult.


<img src="../articles/images/TDAQ.png" width="800px" height="auto">



A typical DAQ system includes components like digitizers, triggers, and data storage units. The digitizer converts analog signals from detectors into digital data that can be processed by computers.

![](/daq2.png)

The image above illustrates the flow of data within a DAQ system. Detectors produce signals that are digitized, filtered, and stored for analysis. Timing synchronization is critical, and DAQ systems often include precise clocks to ensure accurate event reconstruction.

![](/daq3.png)

Modern DAQ systems use software frameworks to manage data flow and enable user-friendly configuration. For example, the CAEN SY5527 system allows seamless integration with custom analysis software, as shown above.

Whether in high-energy physics or medical imaging, DAQs play an essential role in extracting meaningful information from complex experiments.
