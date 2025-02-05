# Tutorial 05: Working with DWC Data (Updated Version)

<a href="https://github.com/saskiapoldmaa/saskiapoldmaa.github.io/blob/main/Files/tutorial05_working_with_dwc_corrected.ipynb" download>
    <button style="background-color:#616eff; color:white; border:none; padding:7px 12px; cursor:pointer; font-size:15px; border-radius:5px;">
         👇 Try it out yourself!
    </button>
</a>

We will have a look at working with DWC data, both raw and monitor files.
Plus, we will try to investigate a different way to work with DWC so we can hopefully filter out data that we are interested in more efficiently

## Short recap / introduction: How does a DWC work

You can find a historic document describing the DWC at CERN following this link: [https://sba.web.cern.ch/sba/Documentations/Eastdocs/docs/DWC-UserGuide.pdf](https://sba.web.cern.ch/sba/Documentations/Eastdocs/docs/DWC-UserGuide.pdf)

The document is a bit on the very technical side but if you are interested (or just curious), we would recommend taking at least a look at it. No worries, we will explain everything to you!

## Let's read some data files!

```python
import ROOT
```

    Welcome to JupyROOT 6.30/04



```python
import timeit
import numpy as np
```


```python
from pathlib import Path
# Change this path to the location where you can find the downloaded data 
path_to_data_files = Path(r"/eos/project/b/bl4s/Technics&Physics/2024/Data/T10July/2024/T10July")
# for example
# path_to_data_files = Path(r"./data/T10July/2024/T10July")

path_to_coarse_alignment_file = path_to_data_files / Path("root/1722192350.root")
path_to_coarse_alignment_monitor_file = path_to_data_files / Path("root/1722192350_DWC.root")

# The raw data file
coarse_dwc = ROOT.TFile.Open(str(path_to_coarse_alignment_file.absolute()))

# The monitor file
coarse_dwc_mon = ROOT.TFile.Open(str(path_to_coarse_alignment_monitor_file.absolute()))
```

This are the result of our first "coarse" alignment. They were not perfect but, especially compared to the results from 2023, pretty good!


```python
# Again, a bit of cosmetics:

# This will make the 2D histograms look nicer
ROOT.gStyle.SetPalette( ROOT.kRainBow )
```


```python
# This allows to interactively play with the plots - do not run this cell (or comment it out) in case you have issues with that
%jsroot
```

### Let'st start by reading the result of the DWC Monitor files again


```python
c0_has_been_drawn = True
```


```python
c0 = ROOT.TCanvas("c0", "Hitmap (x-y) for all three DWC", 10, 10, 1200, 1200)
c0.Divide(2, 2)

c0.cd(1)
dwc_dut = coarse_dwc_mon.Get("Histogramming/DWCMonitor/DWC_DUT_firsthitmap")
dwc_dut.Draw("colz")

c0.cd(2)
dwc_upstream = coarse_dwc_mon.Get("Histogramming/DWCMonitor/DWC_UPSTREAM_firsthitmap")
dwc_upstream.Draw("colz")

c0.cd(3)
dwc_downstream = coarse_dwc_mon.Get("Histogramming/DWCMonitor/DWC_DOWNSTREAM_firsthitmap")
dwc_downstream.Draw("colz")

if not c0_has_been_drawn:
    c0_has_been_drawn = True
    c0.Update()    
else:
    c0.Draw()
```

Let's try to re-create the histogram from the raw data

For this, we need the calibration constants that have been determined in runs `1722068199` to `1722069459`. You can find them in this path:


```python
# Change this to the path where you stored the files
path_to_dwc_calib = path_to_data_files / Path(r"DWC")

dwc_dut_calib = path_to_dwc_calib / Path("DWC_DUT/DWC_DUT_calibration.json")
dwc_upstream_calib = path_to_dwc_calib / Path("DWC_UPSTREAM/DWC_UPSTREAM_calibration.json")
dwc_downstream_calib = path_to_dwc_calib / Path("DWC_DOWNSTREAM/DWC_DOWNSTREAM_calibration.json")
```

`json` stands for "Java Script Object Notation" -> obligatory wikpedia link here: [JSON@Wikipedia.org](https://en.wikipedia.org/wiki/JSON)
It started out as the "internal" file format in which your browser's scripting engine keeps data stored but it turned out to be very useful outside of that niche and so nowaday it is used a lot. Within our DAQ system, all configuration files for the monitoring are json files. And since the calibration constants **are** used in monitoring, they are also in json files. Luckily, we can directly read json from Python:


```python
import json
```


```python
calibration = {
    "DWC_DUT": {"path": dwc_dut_calib,},
    "DWC_UPSTREAM": {"path": dwc_upstream_calib,},
    "DWC_DOWNSTREAM": {"path": dwc_downstream_calib,},
}
```


```python
for key, temp in calibration.items():
    with open(str(temp["path"].absolute()), "r") as f:
        calib_constants = json.load(f)
        calibration[key].update(calib_constants)

# Let's print all the calibration constants that we loaded
for key, temp in calibration.items():
    print(f"{key:<20s} | slope_x: {temp['xaxis']['slope']:+6.4f} | offset_x: {temp['xaxis']['offset']:+6.4f}")
    print(f"{key:<20s} | slope_y: {temp['yaxis']['slope']:+6.4f} | offset_y: {temp['yaxis']['offset']:+6.4f}")
    print("----------------------------------------------------------------------------------------------")
```

    DWC_DUT              | slope_x: +0.0178 | offset_x: -0.0499
    DWC_DUT              | slope_y: +0.0175 | offset_y: -0.0592
    ----------------------------------------------------------------------------------------------
    DWC_UPSTREAM         | slope_x: +0.0175 | offset_x: +0.0450
    DWC_UPSTREAM         | slope_y: +0.0177 | offset_y: -0.1022
    ----------------------------------------------------------------------------------------------
    DWC_DOWNSTREAM       | slope_x: +0.0179 | offset_x: -0.0343
    DWC_DOWNSTREAM       | slope_y: +0.0178 | offset_y: -0.0340
    ----------------------------------------------------------------------------------------------


But how do we use these constants?

On page `5` in the DWC manual above, there are two formulae given for how to calculate the horizontal `x` coordinate of the Hit from the time differences between the `Right` (R)  and `Left` (L) signals coming from the chamber:

$$ X \quad = \quad \left( t_{R} - t_{L} \right) \; \times \; \text{slope}_{x} \; + \; \text{offset}_{x} $$

The same structure can also be applied to the vertical coordinate `y`, but this time we are taking the time difference between the `Up` (U) and `Down` (D) signals from the same chamber:

$$ Y \quad = \quad \left( t_{U} - t_{D} \right) \; \times \; \text{slope}_{y} \; + \; \text{offset}_{y} $$

In both cases, we used the calibration constants that we printed in the table above

**Note**: you may have noticed that we have not given a unit for the `slope_<x|y>` and `offset_<x|y>` parameters above. The manual states that these values are givin in `mm/ns` and `mm` respectively. But the numbers actually come from our software and not from whatever the persons who originally built the DWC in the early 1980-ies used. We will have to find out what the units of these values are.

Please Remember: in physics (and engineering, see for example here: [Mars Climate Orbiter: Cause of Failure @ Wikipedia](https://en.wikipedia.org/wiki/Mars_Climate_Orbiter#Cause_of_failure)), no measurement result should ever be written down, exchanged, used or stored in a file without making clear what unit is meant!!!

### Try to recreate the DWC hitmaps from RAW data

The formula use the arrival time of signals for the `L`, `R`, `U` and `D` signals from a chamber to calculate the `x` and `y` coordinate. 
This information is available from the TDC, specifically if you look into the logbook [here](https://codimd.web.cern.ch/HZC6VD4mQf6wQ1yZPSGlQA#Signal-Table-Update), channels `0-11` of `TDC1`:

<img src="images/tutorial_05/signal_table_dwc.png">

(We used "DUMMY" here to describe the DUT -> we should fix that, consistent names are important otherwise we get confused, sorry for that)

Specifically, we can conclude from this table that the upstream chamber's signals have the following mapping:


```python
tdc_channels = {
    "DWC_UPSTREAM": {
        "L": "TDC1_ch0_leading",
        "NUM_L": "NTDC1_ch0_leading",
        "R": "TDC1_ch1_leading",
        "NUM_R": "NTDC1_ch1_leading",
        "U": "TDC1_ch2_leading",
        "NUM_U": "NTDC1_ch2_leading",
        "D": "TDC1_ch3_leading",
        "NUM_D": "NTDC1_ch3_leading",
    }, 
    "DWC_DOWNSTREAM": {
        "L": "TDC1_ch4_leading",
        "NUM_L": "NTDC1_ch4_leading",
        "R": "TDC1_ch5_leading",
        "NUM_R": "NTDC1_ch5_leading",
        "U": "TDC1_ch6_leading",
        "NUM_U": "NTDC1_ch6_leading",
        "D": "TDC1_ch7_leading",
        "NUM_D": "NTDC1_ch7_leading",
    },
    "DWC_DUT": {
        "L": "TDC1_ch8_leading",
        "NUM_L": "NTDC1_ch8_leading",
        "R": "TDC1_ch9_leading",
        "NUM_R": "NTDC1_ch9_leading",
        "U": "TDC1_ch10_leading",
        "NUM_U": "NTDC1_ch10_leading",
        "D": "TDC1_ch11_leading",
        "NUM_D": "NTDC1_ch11_leading",
    }, 
}
```

Before we start calculating the `x` and `y` coordinates from raw data, let's have another look at another histogram in the monitor file, the "hits" 1D histogramm:


```python
c1_has_been_drawn = False
```


```python
# Let's only have a look at the "UPSTREAM" chamber - the data will look similar for the other two DWC:

dwc_upstream_hits = coarse_dwc_mon.Get("Histogramming/DWCMonitor/DWC_UPSTREAM_hits")
c1 = ROOT.TCanvas("c1", "Number of Hits for the UPSTREAM chamber", 10, 10, 800, 800)
c1.cd()
dwc_upstream_hits.Draw()

if not c1_has_been_drawn:
    c1_has_been_drawn = True 
    c1.Update()
else:
    c1.Draw()
```



Our TDC is a so called **Multi-Hit TDC** which means that for each event, it can record more than one result. This last histogram tells us how often we got `0`, `1`, `2`, etc. number of results over all recorded events. We would expect either `0` or `1`:

- The DWC has an efficiency that is less than 100%. So some particles will not manage to ionize the gas inside the chamber and will therefore not create any electrical signal that we could amplify and then measure. Thus, we will get `0` entries for these particles

- Otherwise, we would expect a single hit on all four channels of the TDC for every particle that we can register.


Obviously, for most patricles, this is true. Let's find out what "most" means here by acutally calculating the efficiency and the number of particles that we see with more than one hit:


```python
n_something = 0.0
n_nothing = 0.0
n_exactly_one = 0.0
n_total = dwc_upstream_hits.GetEntries()

for num_hits_on_dwc in range(0, 11):
    bin_id = dwc_upstream_hits.FindBin(num_hits_on_dwc)
    nn = dwc_upstream_hits.GetBinContent(bin_id)
    if num_hits_on_dwc == 0:
        n_nothing += nn
    else:
        if num_hits_on_dwc == 1:
            n_exactly_one += nn
        n_something += nn
    print(f"num hits: {num_hits_on_dwc:3d} | count: {int(nn):6d}")
```

    num hits:   0 | count:  12357
    num hits:   1 | count: 310712
    num hits:   2 | count:  18629
    num hits:   3 | count:   1418
    num hits:   4 | count:   7518
    num hits:   5 | count:    265
    num hits:   6 | count:   1956
    num hits:   7 | count:     13
    num hits:   8 | count:   1581
    num hits:   9 | count:    953
    num hits:  10 | count:   2869



```python
print(f"Number of particles that did not cause a hit : {n_nothing:6.0f}")
print(f"=> Calculated efficiency of DWC              : {100.0 * n_something/n_total:5.1f}%\r\n")
print(f"Number of particles that cause exactly 1 hit : {n_exactly_one:6.0f}")
print(f"Number of particles that caused > 1 hit      : {n_something - n_exactly_one:6.0f}")
print(f"=> Perecentage of \"strange\" events           : {100 * (n_something - n_exactly_one)/n_total:5.1f}%")
```

    Number of particles that did not cause a hit :  12357
    => Calculated efficiency of DWC              :  96.6%
    
    Number of particles that cause exactly 1 hit : 310712
    Number of particles that caused > 1 hit      :  35202
    => Perecentage of "strange" events           :   9.8%


So, to summarize:
- About 3.4% of the time, the DWC did not "see" the particle, even though it created a trigger pulse
- About 10% of the time, the particle did cause more than one hit on the DWC
- About 86.8% of the time, we got exactly one hit per particle (as expected)

These are actually quite ok-ish numbers!

In order to re-create the 2D hitmap, we have to decide what to do with events where there are more than one hit:
- We could decide to not include them into our statistics, this is the "safe" thing to do. We lose about 10% of our data though (but this may be acceptable
- We could decided to only take the "first" hit. If we assume that the additional hits occur due to "echos" of the signal (something which happens in electronics quite a bit and which gives you so called "reflections"), then this is the smart thing to do since echos should arrive "later". But: it is possible that we get the echo of a particle that passed through a bit before our current particle, that echo would somehow seem to arrive "before" the actual signal and will make the measurement wrong. Also, if we do this, we include also multiple hits due to noise (which can occur at any time, more or less equally likely before and after the actual signal)
    - If the number of particles with "multiple" hits (`num_hits_on_dwc > 1`) is not too large, it is usually a bad idea to do this, as it increases the chances of taking wrong/misleading data into account!
- We could include all hits, for each event, thus counting everything (reflections, noise, ....)
    - This is most of the time a really bad idea, so let's not do that (unless we have a good reason)

If you look at the branches in the ROOT file, we have hitmaps for all three of these ideas:


```python
# Uncomment and run the following command to actually see the full listing of all branches in the monitor file:
# coarse_dwc_mon.ls()
```

```
 ...
 
 KEY: TH2D	DWC_UPSTREAM_hitmap;1	DWC_UPSTREAM Hitmap
 KEY: TH2D	DWC_UPSTREAM_singlehitmap;1	DWC_UPSTREAM Single Hitmap
 KEY: TH2D	DWC_UPSTREAM_firsthitmap;1	DWC_UPSTREAM First Hitmap
 KEY: TH1D	DWC_UPSTREAM_xProfile;1	DWC_UPSTREAM X Profile
 KEY: TH1D	DWC_UPSTREAM_yProfile;1	DWC_UPSTREAM Y Profile
 KEY: TH1D	DWC_UPSTREAM_singlexProfile;1	DWC_UPSTREAM Single X Profile
 KEY: TH1D	DWC_UPSTREAM_singleyProfile;1	DWC_UPSTREAM Single Y Profile
 KEY: TH1D	DWC_UPSTREAM_firstxProfile;1	DWC_UPSTREAM First X Profile
 KEY: TH1D	DWC_UPSTREAM_firstyProfile;1	DWC_UPSTREAM First Y Profile
 KEY: TH1D	DWC_UPSTREAM_hits;1	DWC_UPSTREAM Hits
 
 ...
 
 ```
 
 - `DWC_UPSTREAM_hitmap` contains everything (including multiple hits per event)
 - `DWC_UPSTREAM_singlehitmap` only contains those events that had a single hit on the DWC
 - `DWC_UPSTREAM_firsthitmap` contains data from everything that had at least one hit (but only takes the first)
 
 
 **Questions**:
 - Which histogram did we plot earlier
 - Can you try for yourself to plot the other ones as well?
 - The `xProfile` and `yProfile` histograms contain additional data for only one plane and are also following this "everything", "first", and "single" logic. Maybe you want to have a look at them and try to understand the structure of the histograms to also understand a bit the differences between these three was of building a histogram from the perspective of data
 
 

### Ok, but now for real: let's build the histograms ourselves!


```python
dwc_raw_data = coarse_dwc.Get("RAWdata")
```


```python
dwc_raw_data
```




    <cppyy.gbl.TTree object at 0x9df4390>




```python
dwc_upstream = coarse_dwc_mon.Get("Histogramming/DWCMonitor/DWC_UPSTREAM_firsthitmap")
upstream_hitmap_single = dwc_upstream.Clone("Manually created upstream hitmap, only take events with a single hit")
upstream_hitmap_single.Reset()
```

We now have to:m
- Loop over the raw data, event/entry  by event/entry
- Get the number of hits per entry
- Decide based upon the number of hits to include the datapoint for each of the three histograms. If the dataset goes into none of the three, skip ahead to the next particle
- calculate x and y
- Add x and y to the to correct histograms


```python
slope_x = calibration["DWC_UPSTREAM"]['xaxis']['slope']
slope_y = calibration["DWC_UPSTREAM"]['yaxis']['slope']

offset_x = calibration["DWC_UPSTREAM"]['xaxis']['offset']
offset_y = calibration["DWC_UPSTREAM"]['yaxis']['offset']
```

Our TDC is a counter that increases it's value ever `25 ps` -> we have to multiply the times we get by `25e-3` to get nano seconds!


```python
count_to_ns = 25e-3
```


```python
# We will show a small number of "unusal" or "interesting" entries -> 
# Change this number below to increase or decrese the size
max_num_interesting = 20
num_interesting = 0
```


```python
# Do some stuff outside of the loop that doesn't change over the course of the loop:
l_branch_name = tdc_channels["DWC_UPSTREAM"]["L"]
r_branch_name = tdc_channels["DWC_UPSTREAM"]["R"]
u_branch_name = tdc_channels["DWC_UPSTREAM"]["U"]
d_branch_name = tdc_channels["DWC_UPSTREAM"]["D"]
```


```python
# define some counters so we can compare to results to the ones we found by looking at the monitor file earlier
n_has_at_least_one = 0
n_has_exactly_one = 0
n_total = 0
```


```python
%%time
# Measure execution time of this cell

for event_id, entry in enumerate(dwc_raw_data):
    num_hits = {}
    has_at_least_one = True
    has_exact_one = True
    for key in ["NUM_L", "NUM_R", "NUM_U", "NUM_D"]:
        branch_name = tdc_channels["DWC_UPSTREAM"][key]
        nn = int(getattr(entry, branch_name, 0))
        if nn == 0:
            has_at_least_one = False
            has_exact_one = False
            break
        elif nn > 1:
            has_exact_one = False
        num_hits[key] = nn
    
    # You can print out num_hits here to get an idea what different combinations can occur.
    # We will print here the first 20 "interesting" ones:
    if has_at_least_one and not has_exact_one and num_interesting < max_num_interesting:
        print(f"event_id = {event_id:6d} | {num_hits}")
        num_interesting += 1        
    
    n_total += 1
    
    # If no data is available, skip to the next particle
    if not has_at_least_one:
        continue
        
    n_has_at_least_one += 1
            
    if has_exact_one:
        # Ok, we have exactly one hit for all four channels -> 
        # Convert the counts to nano seconds. We always get a list of entries even if there is only a single hit
        t_l = count_to_ns * float(getattr(entry, l_branch_name, [0.0, ])[0])
        t_r = count_to_ns * float(getattr(entry, r_branch_name, [0.0, ])[0])
        t_u = count_to_ns * float(getattr(entry, u_branch_name, [0.0, ])[0])
        t_d = count_to_ns * float(getattr(entry, d_branch_name, [0.0, ])[0])
        
        # See formula earlier in the notebook!
        x = slope_x * (t_r - t_l) + offset_x
        y = slope_y * (t_u - t_d) + offset_y
        
        # If we only have a single hit, then it is easy to fill it into all three histograms
        upstream_hitmap_single.Fill(x,y)
        n_has_exactly_one += 1
```

    event_id =      7 | {'NUM_L': 1, 'NUM_R': 2, 'NUM_U': 1, 'NUM_D': 1}
    event_id =     18 | {'NUM_L': 1, 'NUM_R': 1, 'NUM_U': 2, 'NUM_D': 1}
    event_id =     21 | {'NUM_L': 1, 'NUM_R': 2, 'NUM_U': 2, 'NUM_D': 2}
    event_id =     87 | {'NUM_L': 1, 'NUM_R': 1, 'NUM_U': 2, 'NUM_D': 2}
    event_id =    108 | {'NUM_L': 1, 'NUM_R': 1, 'NUM_U': 2, 'NUM_D': 1}
    event_id =    134 | {'NUM_L': 2, 'NUM_R': 2, 'NUM_U': 1, 'NUM_D': 2}
    event_id =    136 | {'NUM_L': 1, 'NUM_R': 1, 'NUM_U': 2, 'NUM_D': 1}
    event_id =    144 | {'NUM_L': 1, 'NUM_R': 1, 'NUM_U': 2, 'NUM_D': 1}
    event_id =    146 | {'NUM_L': 2, 'NUM_R': 1, 'NUM_U': 1, 'NUM_D': 2}
    event_id =    147 | {'NUM_L': 1, 'NUM_R': 1, 'NUM_U': 2, 'NUM_D': 1}
    event_id =    149 | {'NUM_L': 1, 'NUM_R': 2, 'NUM_U': 1, 'NUM_D': 1}
    event_id =    151 | {'NUM_L': 1, 'NUM_R': 2, 'NUM_U': 1, 'NUM_D': 1}
    event_id =    153 | {'NUM_L': 2, 'NUM_R': 2, 'NUM_U': 2, 'NUM_D': 2}
    event_id =    165 | {'NUM_L': 1, 'NUM_R': 1, 'NUM_U': 1, 'NUM_D': 2}
    event_id =    167 | {'NUM_L': 2, 'NUM_R': 2, 'NUM_U': 2, 'NUM_D': 2}
    event_id =    169 | {'NUM_L': 1, 'NUM_R': 1, 'NUM_U': 1, 'NUM_D': 2}
    event_id =    173 | {'NUM_L': 1, 'NUM_R': 1, 'NUM_U': 2, 'NUM_D': 1}
    event_id =    189 | {'NUM_L': 1, 'NUM_R': 1, 'NUM_U': 2, 'NUM_D': 1}
    event_id =    190 | {'NUM_L': 2, 'NUM_R': 2, 'NUM_U': 2, 'NUM_D': 2}
    event_id =    191 | {'NUM_L': 2, 'NUM_R': 2, 'NUM_U': 2, 'NUM_D': 2}
    CPU times: user 2min 41s, sys: 931 ms, total: 2min 42s
    Wall time: 2min 44s



```python
c2_has_been_drawn = False
```


```python
c2 = ROOT.TCanvas("c2", "Hitmap (x-y) for upstream chamber", 10, 10, 1500, 500)
c2.Divide(3, 1)

c2.cd(1)
upstream_hitmap_single.SetTitle("Single Hit From Raw Data")
upstream_hitmap_single.Draw("colz")

c2.cd(2)
dwc_upstream.SetTitle("First Hit, From Monitor File")
dwc_upstream.Draw("colz")

c2.cd(3)
dwc_upstream_single_monitor = coarse_dwc_mon.Get("Histogramming/DWCMonitor/DWC_UPSTREAM_singlehitmap")
dwc_upstream_single_monitor.SetTitle("Single Hit, From Monitor File")
dwc_upstream_single_monitor.Draw("colz")

if not c2_has_been_drawn:
    c2_has_been_drawn = True 
    c2.Update()
else:
    c2.Draw()
```


```python
print(f"Number of particles that did not cause a hit : {n_total - n_has_at_least_one:6d}")
print(f"=> Calculated efficiency of DWC              : {100.0 * float(n_has_at_least_one)/float(n_total):5.1f}%\r\n")
print(f"Number of particles that cause exactly 1 hit : {n_has_exactly_one:6d}")
print(f"Number of particles that caused > 1 hit      : {n_has_at_least_one - n_has_exactly_one:6d}")
print(f"=> Perecentage of \"strange\" events           : {100 * float(n_has_at_least_one - n_has_exactly_one)/float(n_total):5.1f}%")
```

    Number of particles that did not cause a hit :  12313
    => Calculated efficiency of DWC              :  96.6%
    
    Number of particles that cause exactly 1 hit : 308325
    Number of particles that caused > 1 hit      :  37633
    => Perecentage of "strange" events           :  10.5%


**Some Things to Note:**

- Can you tell the difference between the two histograms? Please have especialyl a look at the number of entries, the mean and standard deviation values given for each of the two
- If you looked at the x-profile and y-profile histogram(s), does your answer from the previous question make sense?
- How many entries does the "single" histogram have less than the number in the single hit histogram from the monitor file (and the number we retrieved from the "hits" histogram earlier). Why could there be a discrepancy here?
- And, we have not forgotten about this: What are the units for the calibration constants now? [mm] and [mm/ns] or [cm] and [cm/ns] (or something else)?