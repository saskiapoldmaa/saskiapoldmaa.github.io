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
     QDC0_ch3_OF     = 0
     QDC0_ch3_UT     = 0
     QDC0_ch3_valid  = 1
     QDC0_ch4        = 138
     QDC0_ch4_OF     = 0
     QDC0_ch4_UT     = 0
     QDC0_ch4_valid  = 1
     QDC0_ch5        = 120
     QDC0_ch5_OF     = 0
     QDC0_ch5_UT     = 0
     QDC0_ch5_valid  = 1
     QDC0_ch6        = 148
     QDC0_ch6_OF     = 0
     QDC0_ch6_UT     = 0
     QDC0_ch6_valid  = 1
     QDC0_ch7        = 104
     QDC0_ch7_OF     = 0
     QDC0_ch7_UT     = 0
     QDC0_ch7_valid  = 1
     QDC0_ch8        = 94
     QDC0_ch8_OF     = 0
     QDC0_ch8_UT     = 0
     QDC0_ch8_valid  = 1
     QDC0_ch9        = 143
     QDC0_ch9_OF     = 0
     QDC0_ch9_UT     = 0
     QDC0_ch9_valid  = 1
     QDC0_ch10       = 117
     QDC0_ch10_OF    = 0
     QDC0_ch10_UT    = 0
     QDC0_ch10_valid = 1
     QDC0_ch11       = 149
     QDC0_ch11_OF    = 0
     QDC0_ch11_UT    = 0
     QDC0_ch11_valid = 1
     QDC0_ch12       = 148
     QDC0_ch12_OF    = 0
     QDC0_ch12_UT    = 0
     QDC0_ch12_valid = 1
     QDC0_ch13       = 159
     QDC0_ch13_OF    = 0
     QDC0_ch13_UT    = 0
     QDC0_ch13_valid = 1
     QDC0_ch14       = 124
     QDC0_ch14_OF    = 0
     QDC0_ch14_UT    = 0
     QDC0_ch14_valid = 1
     QDC0_ch15       = 61
     QDC0_ch15_OF    = 0
     QDC0_ch15_UT    = 0
     QDC0_ch15_valid = 1
     QDC0_ch16       = 124
     QDC0_ch16_OF    = 0
     QDC0_ch16_UT    = 0
     QDC0_ch16_valid = 1
     QDC0_ch17       = 119
     QDC0_ch17_OF    = 0
     QDC0_ch17_UT    = 0
     QDC0_ch17_valid = 1
     QDC0_ch18       = 98
     QDC0_ch18_OF    = 0
     QDC0_ch18_UT    = 0
     QDC0_ch18_valid = 1
     QDC0_ch19       = 148
     QDC0_ch19_OF    = 0
     QDC0_ch19_UT    = 0
     QDC0_ch19_valid = 1
     QDC0_ch20       = 150
     QDC0_ch20_OF    = 0
     QDC0_ch20_UT    = 0
     QDC0_ch20_valid = 1
     QDC0_ch21       = 125
     QDC0_ch21_OF    = 0
     QDC0_ch21_UT    = 0
     QDC0_ch21_valid = 1
     QDC0_ch22       = 149
     QDC0_ch22_OF    = 0
     QDC0_ch22_UT    = 0
     QDC0_ch22_valid = 1
     QDC0_ch23       = 160
     QDC0_ch23_OF    = 0
     QDC0_ch23_UT    = 0
     QDC0_ch23_valid = 1
     QDC0_ch24       = 153
     QDC0_ch24_OF    = 0
     QDC0_ch24_UT    = 0
     QDC0_ch24_valid = 1
     QDC0_ch25       = 143
     QDC0_ch25_OF    = 0
     QDC0_ch25_UT    = 0
     QDC0_ch25_valid = 1
     QDC0_ch26       = 126
     QDC0_ch26_OF    = 0
     QDC0_ch26_UT    = 0
     QDC0_ch26_valid = 1
     QDC0_ch27       = 139
     QDC0_ch27_OF    = 0
     QDC0_ch27_UT    = 0
     QDC0_ch27_valid = 1
     QDC0_ch28       = 110
     QDC0_ch28_OF    = 0
     QDC0_ch28_UT    = 0
     QDC0_ch28_valid = 1
     QDC0_ch29       = 102
     QDC0_ch29_OF    = 0
     QDC0_ch29_UT    = 0
     QDC0_ch29_valid = 1
     QDC0_ch30       = 115
     QDC0_ch30_OF    = 0
     QDC0_ch30_UT    = 0
     QDC0_ch30_valid = 1
     QDC0_ch31       = 149
     QDC0_ch31_OF    = 0
     QDC0_ch31_UT    = 0
     QDC0_ch31_valid = 1
     NTDC0_ch0       = 0
     NTDC0_ch0_leading = 0
     NTDC0_ch0_trailing = 0
     NTDC0_ch1       = 0
     NTDC0_ch1_leading = 0
     NTDC0_ch1_trailing = 0
     NTDC0_ch2       = 1
     TDC0_ch2        = 9075
     NTDC0_ch2_leading = 1
     TDC0_ch2_leading = 9075
     NTDC0_ch2_trailing = 0
     NTDC0_ch3       = 0
     NTDC0_ch3_leading = 0
     NTDC0_ch3_trailing = 0
     NTDC0_ch4       = 1
     TDC0_ch4        = 10074
     NTDC0_ch4_leading = 1
     TDC0_ch4_leading = 10074
     NTDC0_ch4_trailing = 0
     NTDC0_ch5       = 1
     TDC0_ch5        = 5637
     NTDC0_ch5_leading = 1
     TDC0_ch5_leading = 5637
     NTDC0_ch5_trailing = 0
     NTDC0_ch6       = 1
     TDC0_ch6        = 7644
     NTDC0_ch6_leading = 1
     TDC0_ch6_leading = 7644
     NTDC0_ch6_trailing = 0
     NTDC0_ch7       = 0
     NTDC0_ch7_leading = 0
     NTDC0_ch7_trailing = 0
     NTDC0_ch8       = 0
     NTDC0_ch8_leading = 0
     NTDC0_ch8_trailing = 0
     NTDC0_ch9       = 0
     NTDC0_ch9_leading = 0
     NTDC0_ch9_trailing = 0
     NTDC0_ch10      = 0
     NTDC0_ch10_leading = 0
     NTDC0_ch10_trailing = 0
     NTDC0_ch11      = 0
     NTDC0_ch11_leading = 0
     NTDC0_ch11_trailing = 0
     NTDC0_ch12      = 0
     NTDC0_ch12_leading = 0
     NTDC0_ch12_trailing = 0
     NTDC0_ch13      = 0
     NTDC0_ch13_leading = 0
     NTDC0_ch13_trailing = 0
     NTDC0_ch14      = 0
     NTDC0_ch14_leading = 0
     NTDC0_ch14_trailing = 0
     NTDC0_ch15      = 0
     NTDC0_ch15_leading = 0
     NTDC0_ch15_trailing = 0
     NTDC0_ch16      = 0
     NTDC0_ch16_leading = 0
     NTDC0_ch16_trailing = 0
     NTDC0_ch17      = 0
     NTDC0_ch17_leading = 0
     NTDC0_ch17_trailing = 0
     NTDC0_ch18      = 0
     NTDC0_ch18_leading = 0
     NTDC0_ch18_trailing = 0
     NTDC0_ch19      = 0
     NTDC0_ch19_leading = 0
     NTDC0_ch19_trailing = 0
     NTDC0_ch20      = 0
     NTDC0_ch20_leading = 0
     NTDC0_ch20_trailing = 0
     NTDC0_ch21      = 0
     NTDC0_ch21_leading = 0
     NTDC0_ch21_trailing = 0
     NTDC0_ch22      = 0
     NTDC0_ch22_leading = 0
     NTDC0_ch22_trailing = 0
     NTDC0_ch23      = 0
     NTDC0_ch23_leading = 0
     NTDC0_ch23_trailing = 0
     NTDC0_ch24      = 0
     NTDC0_ch24_leading = 0
     NTDC0_ch24_trailing = 0
     NTDC0_ch25      = 0
     NTDC0_ch25_leading = 0
     NTDC0_ch25_trailing = 0
     NTDC0_ch26      = 0
     NTDC0_ch26_leading = 0
     NTDC0_ch26_trailing = 0
     NTDC0_ch27      = 0
     NTDC0_ch27_leading = 0
     NTDC0_ch27_trailing = 0
     NTDC0_ch28      = 0
     NTDC0_ch28_leading = 0
     NTDC0_ch28_trailing = 0
     NTDC0_ch29      = 0
     NTDC0_ch29_leading = 0
     NTDC0_ch29_trailing = 0
     NTDC0_ch30      = 0
     NTDC0_ch30_leading = 0
     NTDC0_ch30_trailing = 0
     NTDC0_ch31      = 0
     NTDC0_ch31_leading = 0
     NTDC0_ch31_trailing = 0
     Scaler0_ch0     = 0
     Scaler0_ch1     = 0
     Scaler0_ch2     = 26
     Scaler0_ch3     = 26
     Scaler0_ch4     = 133
     Scaler0_ch5     = 0
     Scaler0_ch6     = 68
     Scaler0_ch7     = 343
     Scaler0_ch8     = 0
     Scaler0_ch9     = 0
     Scaler0_ch10    = 1456
     Scaler0_ch11    = 1951
     Scaler0_ch12    = 0
     Scaler0_ch13    = 339
     Scaler0_ch14    = 0
     Scaler0_ch15    = 263499
     NTDC1_ch0       = 1
     TDC1_ch0        = 11963
     NTDC1_ch0_leading = 1
     TDC1_ch0_leading = 11963
     NTDC1_ch0_trailing = 0
     NTDC1_ch1       = 1
     TDC1_ch1        = 12406
     NTDC1_ch1_leading = 1
     TDC1_ch1_leading = 12406
     NTDC1_ch1_trailing = 0
     NTDC1_ch2       = 1
     TDC1_ch2        = 8409
     NTDC1_ch2_leading = 1
     TDC1_ch2_leading = 8409
     NTDC1_ch2_trailing = 0
     NTDC1_ch3       = 1
     TDC1_ch3        = 13533
     NTDC1_ch3_leading = 1
     TDC1_ch3_leading = 13533
     NTDC1_ch3_trailing = 0
     NTDC1_ch4       = 1
     TDC1_ch4        = 11873
     NTDC1_ch4_leading = 1
     TDC1_ch4_leading = 11873
     NTDC1_ch4_trailing = 0
     NTDC1_ch5       = 1
     TDC1_ch5        = 11443
     NTDC1_ch5_leading = 1
     TDC1_ch5_leading = 11443
     NTDC1_ch5_trailing = 0
     NTDC1_ch6       = 1
     TDC1_ch6        = 8628
     NTDC1_ch6_leading = 1
     TDC1_ch6_leading = 8628
     NTDC1_ch6_trailing = 0
     NTDC1_ch7       = 1
     TDC1_ch7        = 13450
     NTDC1_ch7_leading = 1
     TDC1_ch7_leading = 13450
     NTDC1_ch7_trailing = 0
     NTDC1_ch8       = 1
     TDC1_ch8        = 11203
     NTDC1_ch8_leading = 1
     TDC1_ch8_leading = 11203
     NTDC1_ch8_trailing = 0
     NTDC1_ch9       = 1
     TDC1_ch9        = 11744
     NTDC1_ch9_leading = 1
     TDC1_ch9_leading = 11744
     NTDC1_ch9_trailing = 0
     NTDC1_ch10      = 1
     TDC1_ch10       = 9001
     NTDC1_ch10_leading = 1
     TDC1_ch10_leading = 9001
     NTDC1_ch10_trailing = 0
     NTDC1_ch11      = 1
     TDC1_ch11       = 15097
     NTDC1_ch11_leading = 1
     TDC1_ch11_leading = 15097
     NTDC1_ch11_trailing = 0
     NTDC1_ch12      = 0
     NTDC1_ch12_leading = 0
     NTDC1_ch12_trailing = 0
     NTDC1_ch13      = 1
     TDC1_ch13       = 5069
     NTDC1_ch13_leading = 1
     TDC1_ch13_leading = 5069
     NTDC1_ch13_trailing = 0
     NTDC1_ch14      = 0
     NTDC1_ch14_leading = 0
     NTDC1_ch14_trailing = 0
     NTDC1_ch15      = 1
     TDC1_ch15       = 10088
     NTDC1_ch15_leading = 1
     TDC1_ch15_leading = 10088
     NTDC1_ch15_trailing = 0
     NTDC1_ch16      = 0
     NTDC1_ch16_leading = 0
     NTDC1_ch16_trailing = 0
     NTDC1_ch17      = 0
     NTDC1_ch17_leading = 0
     NTDC1_ch17_trailing = 0
     NTDC1_ch18      = 0
     NTDC1_ch18_leading = 0
     NTDC1_ch18_trailing = 0
     NTDC1_ch19      = 0
     NTDC1_ch19_leading = 0
     NTDC1_ch19_trailing = 0
     NTDC1_ch20      = 0
     NTDC1_ch20_leading = 0
     NTDC1_ch20_trailing = 0
     NTDC1_ch21      = 0
     NTDC1_ch21_leading = 0
     NTDC1_ch21_trailing = 0
     NTDC1_ch22      = 0
     NTDC1_ch22_leading = 0
     NTDC1_ch22_trailing = 0
     NTDC1_ch23      = 0
     NTDC1_ch23_leading = 0
     NTDC1_ch23_trailing = 0
     NTDC1_ch24      = 0
     NTDC1_ch24_leading = 0
     NTDC1_ch24_trailing = 0
     NTDC1_ch25      = 0
     NTDC1_ch25_leading = 0
     NTDC1_ch25_trailing = 0
     NTDC1_ch26      = 0
     NTDC1_ch26_leading = 0
     NTDC1_ch26_trailing = 0
     NTDC1_ch27      = 0
     NTDC1_ch27_leading = 0
     NTDC1_ch27_trailing = 0
     NTDC1_ch28      = 0
     NTDC1_ch28_leading = 0
     NTDC1_ch28_trailing = 0
     NTDC1_ch29      = 0
     NTDC1_ch29_leading = 0
     NTDC1_ch29_trailing = 0
     NTDC1_ch30      = 0
     NTDC1_ch30_leading = 0
     NTDC1_ch30_trailing = 0
     NTDC1_ch31      = 0
     NTDC1_ch31_leading = 0
     NTDC1_ch31_trailing = 0


Before accessing certain branches, let us list all branches there are


```python
branches = tree.GetListOfBranches()
print(branches)
```

    { @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968, @0x16b8e2968 }


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
    QDC0_ch2_valid
    QDC0_ch3
    QDC0_ch3_OF
    QDC0_ch3_UT
    QDC0_ch3_valid
    QDC0_ch4
    QDC0_ch4_OF
    QDC0_ch4_UT
    QDC0_ch4_valid
    QDC0_ch5
    QDC0_ch5_OF
    QDC0_ch5_UT
    QDC0_ch5_valid
    QDC0_ch6
    QDC0_ch6_OF
    QDC0_ch6_UT
    QDC0_ch6_valid
    QDC0_ch7
    QDC0_ch7_OF
    QDC0_ch7_UT
    QDC0_ch7_valid
    QDC0_ch8
    QDC0_ch8_OF
    QDC0_ch8_UT
    QDC0_ch8_valid
    QDC0_ch9
    QDC0_ch9_OF
    QDC0_ch9_UT
    QDC0_ch9_valid
    QDC0_ch10
    QDC0_ch10_OF
    QDC0_ch10_UT
    QDC0_ch10_valid
    QDC0_ch11
    QDC0_ch11_OF
    QDC0_ch11_UT
    QDC0_ch11_valid
    QDC0_ch12
    QDC0_ch12_OF
    QDC0_ch12_UT
    QDC0_ch12_valid
    QDC0_ch13
    QDC0_ch13_OF
    QDC0_ch13_UT
    QDC0_ch13_valid
    QDC0_ch14
    QDC0_ch14_OF
    QDC0_ch14_UT
    QDC0_ch14_valid
    QDC0_ch15
    QDC0_ch15_OF
    QDC0_ch15_UT
    QDC0_ch15_valid
    QDC0_ch16
    QDC0_ch16_OF
    QDC0_ch16_UT
    QDC0_ch16_valid
    QDC0_ch17
    QDC0_ch17_OF
    QDC0_ch17_UT
    QDC0_ch17_valid
    QDC0_ch18
    QDC0_ch18_OF
    QDC0_ch18_UT
    QDC0_ch18_valid
    QDC0_ch19
    QDC0_ch19_OF
    QDC0_ch19_UT
    QDC0_ch19_valid
    QDC0_ch20
    QDC0_ch20_OF
    QDC0_ch20_UT
    QDC0_ch20_valid
    QDC0_ch21
    QDC0_ch21_OF
    QDC0_ch21_UT
    QDC0_ch21_valid
    QDC0_ch22
    QDC0_ch22_OF
    QDC0_ch22_UT
    QDC0_ch22_valid
    QDC0_ch23
    QDC0_ch23_OF
    QDC0_ch23_UT
    QDC0_ch23_valid
    QDC0_ch24
    QDC0_ch24_OF
    QDC0_ch24_UT
    QDC0_ch24_valid
    QDC0_ch25
    QDC0_ch25_OF
    QDC0_ch25_UT
    QDC0_ch25_valid
    QDC0_ch26
    QDC0_ch26_OF
    QDC0_ch26_UT
    QDC0_ch26_valid
    QDC0_ch27
    QDC0_ch27_OF
    QDC0_ch27_UT
    QDC0_ch27_valid
    QDC0_ch28
    QDC0_ch28_OF
    QDC0_ch28_UT
    QDC0_ch28_valid
    QDC0_ch29
    QDC0_ch29_OF
    QDC0_ch29_UT
    QDC0_ch29_valid
    QDC0_ch30
    QDC0_ch30_OF
    QDC0_ch30_UT
    QDC0_ch30_valid
    QDC0_ch31
    QDC0_ch31_OF
    QDC0_ch31_UT
    QDC0_ch31_valid
    NTDC0_ch0
    TDC0_ch0
    NTDC0_ch0_leading
    TDC0_ch0_leading
    NTDC0_ch0_trailing
    TDC0_ch0_trailing
    NTDC0_ch1
    TDC0_ch1
    NTDC0_ch1_leading
    TDC0_ch1_leading
    NTDC0_ch1_trailing
    TDC0_ch1_trailing
    NTDC0_ch2
    TDC0_ch2
    NTDC0_ch2_leading
    TDC0_ch2_leading
    NTDC0_ch2_trailing
    TDC0_ch2_trailing
    NTDC0_ch3
    TDC0_ch3
    NTDC0_ch3_leading
    TDC0_ch3_leading
    NTDC0_ch3_trailing
    TDC0_ch3_trailing
    NTDC0_ch4
    TDC0_ch4
    NTDC0_ch4_leading
    TDC0_ch4_leading
    NTDC0_ch4_trailing
    TDC0_ch4_trailing
    NTDC0_ch5
    TDC0_ch5
    NTDC0_ch5_leading
    TDC0_ch5_leading
    NTDC0_ch5_trailing
    TDC0_ch5_trailing
    NTDC0_ch6
    TDC0_ch6
    NTDC0_ch6_leading
    TDC0_ch6_leading
    NTDC0_ch6_trailing
    TDC0_ch6_trailing
    NTDC0_ch7
    TDC0_ch7
    NTDC0_ch7_leading
    TDC0_ch7_leading
    NTDC0_ch7_trailing
    TDC0_ch7_trailing
    NTDC0_ch8
    TDC0_ch8
    NTDC0_ch8_leading
    TDC0_ch8_leading
    NTDC0_ch8_trailing
    TDC0_ch8_trailing
    NTDC0_ch9
    TDC0_ch9
    NTDC0_ch9_leading
    TDC0_ch9_leading
    NTDC0_ch9_trailing
    TDC0_ch9_trailing
    NTDC0_ch10
    TDC0_ch10
    NTDC0_ch10_leading
    TDC0_ch10_leading
    NTDC0_ch10_trailing
    TDC0_ch10_trailing
    NTDC0_ch11
    TDC0_ch11
    NTDC0_ch11_leading
    TDC0_ch11_leading
    NTDC0_ch11_trailing
    TDC0_ch11_trailing
    NTDC0_ch12
    TDC0_ch12
    NTDC0_ch12_leading
    TDC0_ch12_leading
    NTDC0_ch12_trailing
    TDC0_ch12_trailing
    NTDC0_ch13
    TDC0_ch13
    NTDC0_ch13_leading
    TDC0_ch13_leading
    NTDC0_ch13_trailing
    TDC0_ch13_trailing
    NTDC0_ch14
    TDC0_ch14
    NTDC0_ch14_leading
    TDC0_ch14_leading
    NTDC0_ch14_trailing
    TDC0_ch14_trailing
    NTDC0_ch15
    TDC0_ch15
    NTDC0_ch15_leading
    TDC0_ch15_leading
    NTDC0_ch15_trailing
    TDC0_ch15_trailing
    NTDC0_ch16
    TDC0_ch16
    NTDC0_ch16_leading
    TDC0_ch16_leading
    NTDC0_ch16_trailing
    TDC0_ch16_trailing
    NTDC0_ch17
    TDC0_ch17
    NTDC0_ch17_leading
    TDC0_ch17_leading
    NTDC0_ch17_trailing
    TDC0_ch17_trailing
    NTDC0_ch18
    TDC0_ch18
    NTDC0_ch18_leading
    TDC0_ch18_leading
    NTDC0_ch18_trailing
    TDC0_ch18_trailing
    NTDC0_ch19
    TDC0_ch19
    NTDC0_ch19_leading
    TDC0_ch19_leading
    NTDC0_ch19_trailing
    TDC0_ch19_trailing
    NTDC0_ch20
    TDC0_ch20
    NTDC0_ch20_leading
    TDC0_ch20_leading
    NTDC0_ch20_trailing
    TDC0_ch20_trailing
    NTDC0_ch21
    TDC0_ch21
    NTDC0_ch21_leading
    TDC0_ch21_leading
    NTDC0_ch21_trailing
    TDC0_ch21_trailing
    NTDC0_ch22
    TDC0_ch22
    NTDC0_ch22_leading
    TDC0_ch22_leading
    NTDC0_ch22_trailing
    TDC0_ch22_trailing
    NTDC0_ch23
    TDC0_ch23
    NTDC0_ch23_leading
    TDC0_ch23_leading
    NTDC0_ch23_trailing
    TDC0_ch23_trailing
    NTDC0_ch24
    TDC0_ch24
    NTDC0_ch24_leading
    TDC0_ch24_leading
    NTDC0_ch24_trailing
    TDC0_ch24_trailing
    NTDC0_ch25
    TDC0_ch25
    NTDC0_ch25_leading
    TDC0_ch25_leading
    NTDC0_ch25_trailing
    TDC0_ch25_trailing
    NTDC0_ch26
    TDC0_ch26
    NTDC0_ch26_leading
    TDC0_ch26_leading
    NTDC0_ch26_trailing
    TDC0_ch26_trailing
    NTDC0_ch27
    TDC0_ch27
    NTDC0_ch27_leading
    TDC0_ch27_leading
    NTDC0_ch27_trailing
    TDC0_ch27_trailing
    NTDC0_ch28
    TDC0_ch28
    NTDC0_ch28_leading
    TDC0_ch28_leading
    NTDC0_ch28_trailing
    TDC0_ch28_trailing
    NTDC0_ch29
    TDC0_ch29
    NTDC0_ch29_leading
    TDC0_ch29_leading
    NTDC0_ch29_trailing
    TDC0_ch29_trailing
    NTDC0_ch30
    TDC0_ch30
    NTDC0_ch30_leading
    TDC0_ch30_leading
    NTDC0_ch30_trailing
    TDC0_ch30_trailing
    NTDC0_ch31
    TDC0_ch31
    NTDC0_ch31_leading
    TDC0_ch31_leading
    NTDC0_ch31_trailing
    TDC0_ch31_trailing
    Scaler0_ch0
    Scaler0_ch1
    Scaler0_ch2
    Scaler0_ch3
    Scaler0_ch4
    Scaler0_ch5
    Scaler0_ch6
    Scaler0_ch7
    Scaler0_ch8
    Scaler0_ch9
    Scaler0_ch10
    Scaler0_ch11
    Scaler0_ch12
    Scaler0_ch13
    Scaler0_ch14
    Scaler0_ch15
    NTDC1_ch0
    TDC1_ch0
    NTDC1_ch0_leading
    TDC1_ch0_leading
    NTDC1_ch0_trailing
    TDC1_ch0_trailing
    NTDC1_ch1
    TDC1_ch1
    NTDC1_ch1_leading
    TDC1_ch1_leading
    NTDC1_ch1_trailing
    TDC1_ch1_trailing
    NTDC1_ch2
    TDC1_ch2
    NTDC1_ch2_leading
    TDC1_ch2_leading
    NTDC1_ch2_trailing
    TDC1_ch2_trailing
    NTDC1_ch3
    TDC1_ch3
    NTDC1_ch3_leading
    TDC1_ch3_leading
    NTDC1_ch3_trailing
    TDC1_ch3_trailing
    NTDC1_ch4
    TDC1_ch4
    NTDC1_ch4_leading
    TDC1_ch4_leading
    NTDC1_ch4_trailing
    TDC1_ch4_trailing
    NTDC1_ch5
    TDC1_ch5
    NTDC1_ch5_leading
    TDC1_ch5_leading
    NTDC1_ch5_trailing
    TDC1_ch5_trailing
    NTDC1_ch6
    TDC1_ch6
    NTDC1_ch6_leading
    TDC1_ch6_leading
    NTDC1_ch6_trailing
    TDC1_ch6_trailing
    NTDC1_ch7
    TDC1_ch7
    NTDC1_ch7_leading
    TDC1_ch7_leading
    NTDC1_ch7_trailing
    TDC1_ch7_trailing
    NTDC1_ch8
    TDC1_ch8
    NTDC1_ch8_leading
    TDC1_ch8_leading
    NTDC1_ch8_trailing
    TDC1_ch8_trailing
    NTDC1_ch9
    TDC1_ch9
    NTDC1_ch9_leading
    TDC1_ch9_leading
    NTDC1_ch9_trailing
    TDC1_ch9_trailing
    NTDC1_ch10
    TDC1_ch10
    NTDC1_ch10_leading
    TDC1_ch10_leading
    NTDC1_ch10_trailing
    TDC1_ch10_trailing
    NTDC1_ch11
    TDC1_ch11
    NTDC1_ch11_leading
    TDC1_ch11_leading
    NTDC1_ch11_trailing
    TDC1_ch11_trailing
    NTDC1_ch12
    TDC1_ch12
    NTDC1_ch12_leading
    TDC1_ch12_leading
    NTDC1_ch12_trailing
    TDC1_ch12_trailing
    NTDC1_ch13
    TDC1_ch13
    NTDC1_ch13_leading
    TDC1_ch13_leading
    NTDC1_ch13_trailing
    TDC1_ch13_trailing
    NTDC1_ch14
    TDC1_ch14
    NTDC1_ch14_leading
    TDC1_ch14_leading
    NTDC1_ch14_trailing
    TDC1_ch14_trailing
    NTDC1_ch15
    TDC1_ch15
    NTDC1_ch15_leading
    TDC1_ch15_leading
    NTDC1_ch15_trailing
    TDC1_ch15_trailing
    NTDC1_ch16
    TDC1_ch16
    NTDC1_ch16_leading
    TDC1_ch16_leading
    NTDC1_ch16_trailing
    TDC1_ch16_trailing
    NTDC1_ch17
    TDC1_ch17
    NTDC1_ch17_leading
    TDC1_ch17_leading
    NTDC1_ch17_trailing
    TDC1_ch17_trailing
    NTDC1_ch18
    TDC1_ch18
    NTDC1_ch18_leading
    TDC1_ch18_leading
    NTDC1_ch18_trailing
    TDC1_ch18_trailing
    NTDC1_ch19
    TDC1_ch19
    NTDC1_ch19_leading
    TDC1_ch19_leading
    NTDC1_ch19_trailing
    TDC1_ch19_trailing
    NTDC1_ch20
    TDC1_ch20
    NTDC1_ch20_leading
    TDC1_ch20_leading
    NTDC1_ch20_trailing
    TDC1_ch20_trailing
    NTDC1_ch21
    TDC1_ch21
    NTDC1_ch21_leading
    TDC1_ch21_leading
    NTDC1_ch21_trailing
    TDC1_ch21_trailing
    NTDC1_ch22
    TDC1_ch22
    NTDC1_ch22_leading
    TDC1_ch22_leading
    NTDC1_ch22_trailing
    TDC1_ch22_trailing
    NTDC1_ch23
    TDC1_ch23
    NTDC1_ch23_leading
    TDC1_ch23_leading
    NTDC1_ch23_trailing
    TDC1_ch23_trailing
    NTDC1_ch24
    TDC1_ch24
    NTDC1_ch24_leading
    TDC1_ch24_leading
    NTDC1_ch24_trailing
    TDC1_ch24_trailing
    NTDC1_ch25
    TDC1_ch25
    NTDC1_ch25_leading
    TDC1_ch25_leading
    NTDC1_ch25_trailing
    TDC1_ch25_trailing
    NTDC1_ch26
    TDC1_ch26
    NTDC1_ch26_leading
    TDC1_ch26_leading
    NTDC1_ch26_trailing
    TDC1_ch26_trailing
    NTDC1_ch27
    TDC1_ch27
    NTDC1_ch27_leading
    TDC1_ch27_leading
    NTDC1_ch27_trailing
    TDC1_ch27_trailing
    NTDC1_ch28
    TDC1_ch28
    NTDC1_ch28_leading
    TDC1_ch28_leading
    NTDC1_ch28_trailing
    TDC1_ch28_trailing
    NTDC1_ch29
    TDC1_ch29
    NTDC1_ch29_leading
    TDC1_ch29_leading
    NTDC1_ch29_trailing
    TDC1_ch29_trailing
    NTDC1_ch30
    TDC1_ch30
    NTDC1_ch30_leading
    TDC1_ch30_leading
    NTDC1_ch30_trailing
    TDC1_ch30_trailing
    NTDC1_ch31
    TDC1_ch31
    NTDC1_ch31_leading
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


