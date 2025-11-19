# Let's get to work on REAL data! 

First, download and extract the data files from [Zenodo](https://doi.org/10.5281/zenodo.17503416). They should appear in a new folder titled ```./17503417``` where the long number is just the DOI of the dataset.

Inside the extracted folder, you will see files with even longer names, like 1722286312. Each such file corresponds to a run of the experiment, and the title is the UNIX timestamp of when the run started. 

Let's try to open one of these files and see what's inside. Download the Jupyter Notebook below:

<a href="https://github.com/saskiapoldmaa/saskiapoldmaa.github.io/blob/main/Files/monitor_and_raw_data_files.ipynb" download>
    <button style="background-color:#616eff; color:white; border:none; padding:7px 12px; cursor:pointer; font-size:15px; border-radius:5px;">
         👇 Try it out yourself!
    </button>
</a>

You can browse around the ROOT file using the ROOT File Viewer extension. You will see that there are different subfolders or "trees" in the file — these are like different overviews of the same run. Every tree is like a table, where every row corresponds to an event (particle being detected) and every column gives the measurement of a given detector for that event. 

```python
import ROOT
```

Next we will open the ROOT file and list its high-level structure. Either replace ```./``` with the folder you saved the data to, or save this Jupyter Notebook to the same location with the data.


```python
file = ROOT.TFile.Open("./17503417/1722292780.root")
file.ls()

```

    TFile**		./17503417/1722292780.root	
     TFile*		./17503417/1722292780.root	
      KEY: TTree	RAWdata;4	BL4S RAW data tree [current cycle]
      KEY: TTree	RAWdata;3	BL4S RAW data tree [backup cycle]
      KEY: TTree	RECOdata;2	BL4S RECO data tree [current cycle]
      KEY: TTree	RECOdata;1	BL4S RECO data tree [backup cycle]


These are the same trees we saw with the ROOT Viewer. Note that ROOT automatically splits big trees into multiple parts, such as RAWdata:4 and RAWdata:3. For data analysis, however, these are all just a single tree, titled RAWdata.

Now let's print the content of our first tree.


```python
tree = file.Get("RAWdata")
#tree.Print()
```

Chances are that the cell above never stopped running. This is not because our code is wrong — there is simply so much data to print, that VS Code begins throttling the output.

Note that simply pausing the execution is not enough, we need to restart the kernel to clean up the memory. In general, you should add a bit of print statements to all of your longer for-loops, to see whether the program is still running or it has come to a halt.

1. Click restart at the top menu
2. comment out ```tree.Print()```

Let's try to print a single entry at a time


```python
# prints the 67th entry for all branches
tree.Show(67)
```

    ======> EVENT:67
     QDC0_ch0        = 454
     QDC0_ch0_OF     = 0
     QDC0_ch0_UT     = 0
     QDC0_ch0_valid  = 1
     QDC0_ch1        = 579
     QDC0_ch1_OF     = 0
     QDC0_ch1_UT     = 0
     QDC0_ch1_valid  = 1
     QDC0_ch2        = 624
     QDC0_ch2_OF     = 0
     QDC0_ch2_UT     = 0
     QDC0_ch2_valid  = 1
     QDC0_ch3        = 133
     ...
     NTDC1_ch31      = 0
     NTDC1_ch31_leading = 0
     NTDC1_ch31_trailing = 0


Before accessing certain branches, let us list all branches there are


```python
branches = tree.GetListOfBranches()
print(branches)
```

    { @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, ..., @0x16b8e2968, @0x16b8e2968, @0x16b8e2968 }


Now, instead of the (almost) nice branch names (such as QDC0_ch0, QDC0_ch0_OF, etc.), we get their memory addresses. To actually see the titles we've given to these branches, you should use 


```python
for branch in branches:
    print(branch.GetName())

```

    QDC0_ch0
    QDC0_ch0_OF
    QDC0_ch0_UT
    QDC0_ch0_valid
    QDC0_ch1
    QDC0_ch1_OF
    QDC0_ch1_UT
    QDC0_ch1_valid
    QDC0_ch2
    QDC0_ch2_OF
    QDC0_ch2_UT
    ...
    TDC1_ch31_leading
    NTDC1_ch31_trailing
    TDC1_ch31_trailing


To begin analyzing the 67th entry , we need to access it using .GetEntry() 


```python
tree.GetEntry(67)
```




    1200



Compared to ```tree.Show()```, GetEntry() is to simply navigate to the 67th event in our memory, not to print it. Its output — 1200 — is the size of the entry in bytes.

To access a specific entry in a given branch, we can use ```getattr(tree, branch_name)```. For example, qdc_ch0_67 is the charge value measured in the 0th channel of the QDC0 detector for the 67th event.


```python
qdc_ch0_67 = getattr(tree, "QDC0_ch0")
print(qdc_ch0_67)

```

    454


Another way to access specific entries is like this...


```python
print(tree.QDC0_ch0)
```

    454


The difference is that using getattr, you can use a variable (e.g. ```branch_name = "QDC0_ch0"```) to reference to the specific branch.

Next, let's do a bit of plotting. For that, we need to create a canvas and enter data one event at a time.


```python
hist = ROOT.TH1F("hQDC0", "QDC Channel 0", 100, 0, 4000)

for i in range(tree.GetEntries()):
    tree.GetEntry(i)
    hist.Fill(tree.QDC0_ch0)

hist.Draw()
```

    Info in <TCanvas::MakeDefCanvas>:  created default TCanvas with name c1



```python
for i in range(tree.GetEntries()):
    tree.GetEntry(i)
    if tree.QDC0_ch0 > 1000:
        hist.Fill(tree.QDC0_ch0)

hist.Draw()
```


```python
tree.Draw("QDC0_ch0")
tree.Draw("QDC0_ch1:QDC0_ch0", "", "COLZ")
```




    530434


