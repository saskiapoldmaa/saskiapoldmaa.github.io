# ROOT Tutorial No 3: Working With Monitor And Raw Data Files

Let's recap from the previous session:

- we did have a look at three runs at nominally 1 GeV energy
    - Run 17221**64897** is a +1 GeV/c muon beam 
    - Run 17221**72954** is a mixed -1 GeV/c beam with 8 mm of lead placed into the path of the beam to absorb the electrons in the beam (So that mostly pions and muons should remain in the beam)
    - Run 17221**78299** is also a mixed -1 GeV/c beam without the 8 mm lead absorber
    - To make things easier, we will label the data with the last five digits of the run - this will give us a nice time-ordering without us requiring to repeat all 10 digits of the run number

- we did have a look at the QDC data which will give us information about the amount of energy deposited in the scintillators `S2`, `S3` and a calorimeter `CAL17`


Lat time, we had a look at the monitor files. These contain ready-made histograms about the quantities we are interested in and are great for getting a quick overview about the data and to decide if a run is interesting or not. Let's plot the data from these three runs in a slightly different way to compare the results more effectively:

### Compare Results From QDC Monitor ROOT Files

**NOTE**: In order to make it easier for you to run the notebook on your computer or later at CERN, we will use a "common prefix" for the path to the data files. Please update this path so it points towards the directory where your local ROOT can find the files. 


```python
import ROOT
import numpy as np 
from matplotlib import pyplot as plt
```

    Welcome to JupyROOT 6.30/04



```python
from pathlib import Path

# Use the path to where ROOT can find your local files
# it could for example be 
# path_to_datafiles = Path(r"/home/myusername/data")

# Here, we will be using the path to the central place where we store the data. The filesystem is called /eos, 
# there is a web service called "CERNbox" that can be used to access this file system. You will be using this 
# a lot here at CERN :-)

path_to_datafiles = Path(r"/eos/project/b/bl4s/Technics&Physics/2024/Data/T10July/2024/T10July/root")
```


```python
# Read in all three QDC monitor files:

path_qdc_64897 = path_to_datafiles / Path(r"1722164897_QDC.root")
qdc_muons = ROOT.TFile.Open(str(path_qdc_64897.absolute()))

path_qdc_72954 = path_to_datafiles / Path(r"1722172954_QDC.root")
qdc_absorber = ROOT.TFile.Open(str(path_qdc_72954.absolute()))

path_qdc_78299 = path_to_datafiles / Path(r"1722178299_QDC.root")
qdc_no_absorber = ROOT.TFile.Open(str(path_qdc_78299.absolute()))
```


```python
# This allows to interactively play with the plots - do not run this cell (or comment it out) in case you have issues with that
%jsroot
```

**Wait a second ... **

1) How do we know which channels of the QDC we have to get the histogram from?
=> Look at the signal table in the log book!

![signal_table_qdc.png](tut2_files/signal_table_qdc.png)

2) What are S2, S3 and CAL13 again?

![image.png](tut2_files/image.png)



```python
# Lets plot the three files, grouped by detector, next to each other:

# 1) create "Stacks" of histograms, we will use that to plot the data for S2, S3, and CAL17:
stack0 = ROOT.THStack("stack0", "S2 data")
stack1 = ROOT.THStack("stack1", "S3 data")
stack2 = ROOT.THStack("stack2", "CAL17 data")

# 2) Add the histograms to each stack:
# QDC data for S2 over all three runs
s2_muons = qdc_muons.Get("Histogramming/QDCMonitor/QDC0_ch00")
s2_muons.SetLineColor(2) # red line
s2_muons.SetTitle("+1 GeV/c muons")
stack0.Add(s2_muons)

s2_absorber = qdc_absorber.Get("Histogramming/QDCMonitor/QDC0_ch00")
s2_absorber.SetLineColor(9) # purple line
s2_absorber.SetTitle("-1 GeV/c mixed, absorber")
stack0.Add(s2_absorber)

s2_no_absorber = qdc_no_absorber.Get("Histogramming/QDCMonitor/QDC0_ch00")
s2_no_absorber.SetLineColor(8) # green line
s2_no_absorber.SetTitle("-1 GeV/c mixed, no absorber")
stack0.Add(s2_no_absorber)


# QDC data for S3 over all three runs
s3_muons = qdc_muons.Get("Histogramming/QDCMonitor/QDC0_ch01")
s3_muons.SetLineColor(2) # red line
s3_muons.SetTitle("+1 GeV/c muons")
stack1.Add(s3_muons)

s3_absorber = qdc_absorber.Get("Histogramming/QDCMonitor/QDC0_ch01")
s3_absorber.SetLineColor(9) # purple line
s3_absorber.SetTitle("-1 GeV/c mixed, absorber")
stack1.Add(s3_absorber)

s3_no_absorber = qdc_no_absorber.Get("Histogramming/QDCMonitor/QDC0_ch01")
s3_no_absorber.SetLineColor(8) # green line
s3_no_absorber.SetTitle("-1 GeV/c mixed, no absorber")
stack1.Add(s3_no_absorber)


# QDC data for CAL17 over all three runs
cal17_muons = qdc_muons.Get("Histogramming/QDCMonitor/QDC0_ch02")
cal17_muons.SetLineColor(2) # red line
cal17_muons.SetTitle("+1 GeV/c muons")
stack2.Add(cal17_muons)

cal17_absorber = qdc_absorber.Get("Histogramming/QDCMonitor/QDC0_ch02")
cal17_absorber.SetLineColor(9) # purple line
cal17_absorber.SetTitle("-1 GeV/c mixed, absorber")
stack2.Add(cal17_absorber)

cal17_no_absorber = qdc_no_absorber.Get("Histogramming/QDCMonitor/QDC0_ch02")
cal17_no_absorber.SetLineColor(8) # green line
cal17_no_absorber.SetTitle("-1 GeV/c mixed, no absorber")
stack2.Add(cal17_no_absorber)


# 3) Createa a canvas with three "sections", one for each of the detectors S2, S3 and CAL17
c0 = ROOT.TCanvas("c0", "Comparison over all three runs, grouped by detector", 10, 10, 1200, 1200)
c0.Divide(2, 2)
c0.cd(1)


stack0.Draw("nostack")
stack0.GetXaxis().SetTitle("QDC count")
stack0.GetYaxis().SetTitle("#Occurances")
stack0.GetXaxis().SetLimits(200, 1400)

c0.cd(2)
stack1.Draw("nostack")
stack1.GetXaxis().SetTitle("QDC count")
stack1.GetYaxis().SetTitle("#Occurances")
stack1.GetXaxis().SetLimits(200, 1400)

c0.cd(3)
stack2.Draw("nostack")
stack2.GetXaxis().SetTitle("QDC count")
stack2.GetYaxis().SetTitle("#Occurances")
stack2.GetXaxis().SetLimits(200, 1400)

# 4) Create a legend
c0.cd(4)
leg = ROOT.TLegend(0.1, 0.1, 0.9, 0.9, "Legend")
leg.AddEntry(s2_muons, "1722164897: +1 GeV muons")
leg.AddEntry(s2_absorber, "1722172954: -1 GeV mixed, absorber")
leg.AddEntry(s2_no_absorber, "1722178299: -1 GeV mixed, no absorber")
leg.SetTextSize(0.04)
leg.Draw()

c0.Update()
```

    Warning in <TCanvas::Constructor>: Deleting canvas with same name: c0



```python
# c0.Draw()
```




<div id="root_plot_1722867144758" style="width: 1200px; height: 1200px; position: relative">
</div>

<script>

function display_root_plot_1722867144758(Core) {
   let obj = Core.parse({"_typename":"TCanvasWebSnapshot","fUniqueID":0,"fBits":0,"fObjectID":"","fOption":"","fKind":3,"fSnapshot":{"_typename":"TCanvas","fUniqueID":0,"fBits":3342344,"fLineColor":1,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":1001,"fLeftMargin":0.1,"fRightMargin":0.1,"fBottomMargin":0.1,"fTopMargin":0.1,"fXfile":2,"fYfile":2,"fAfile":1,"fXstat":0.99,"fYstat":0.99,"fAstat":2,"fFrameFillColor":0,"fFrameLineColor":1,"fFrameFillStyle":1001,"fFrameLineStyle":1,"fFrameLineWidth":1,"fFrameBorderSize":1,"fFrameBorderMode":0,"fX1":0,"fY1":0,"fX2":1,"fY2":1,"fXtoAbsPixelk":5e-5,"fXtoPixelk":5e-5,"fXtoPixel":1196,"fYtoAbsPixelk":1172.00005,"fYtoPixelk":1172.00005,"fYtoPixel":-1172,"fUtoAbsPixelk":5e-5,"fUtoPixelk":5e-5,"fUtoPixel":1196,"fVtoAbsPixelk":1172.00005,"fVtoPixelk":1172,"fVtoPixel":-1172,"fAbsPixeltoXk":0,"fPixeltoXk":0,"fPixeltoX":8.36120401337793e-4,"fAbsPixeltoYk":1,"fPixeltoYk":0,"fPixeltoY":-8.53242320819113e-4,"fXlowNDC":0,"fYlowNDC":0,"fXUpNDC":1,"fYUpNDC":1,"fWNDC":1,"fHNDC":1,"fAbsXlowNDC":0,"fAbsYlowNDC":0,"fAbsWNDC":1,"fAbsHNDC":1,"fUxmin":0,"fUymin":0,"fUxmax":1,"fUymax":1,"fTheta":30,"fPhi":30,"fAspectRatio":0,"fNumber":0,"fTickx":0,"fTicky":0,"fLogx":0,"fLogy":0,"fLogz":0,"fPadPaint":0,"fCrosshair":0,"fCrosshairPos":0,"fBorderSize":2,"fBorderMode":0,"fModified":false,"fGridx":false,"fGridy":false,"fAbsCoord":false,"fEditable":true,"fFixedAspectRatio":false,"fPrimitives":{"_typename":"TList","name":"TList","arr":[],"opt":[]},"fExecs":null,"fName":"c0","fTitle":"Comparison over all three runs, grouped by detector","fNumPaletteColor":0,"fNextPaletteColor":0,"fDISPLAY":"$DISPLAY","fDoubleBuffer":0,"fRetained":true,"fXsizeUser":0,"fYsizeUser":0,"fXsizeReal":20,"fYsizeReal":20,"fWindowTopX":0,"fWindowTopY":0,"fWindowWidth":0,"fWindowHeight":0,"fCw":1196,"fCh":1172,"fCatt":{"_typename":"TAttCanvas","fXBetween":2,"fYBetween":2,"fTitleFromTop":1.2,"fXdate":0.2,"fYdate":0.3,"fAdate":1},"kMoveOpaque":true,"kResizeOpaque":true,"fHighLightColor":2,"fBatch":true,"kShowEventStatus":false,"kAutoExec":true,"kMenuBar":true},"fActive":false,"fReadOnly":true,"fWithoutPrimitives":false,"fHasExecs":false,"fPrimitives":[{"_typename":"TWebSnapshot","fUniqueID":0,"fBits":0,"fObjectID":"","fOption":"","fKind":4,"fSnapshot":{"_typename":"TWebPainting","fUniqueID":0,"fBits":0,"fOper":"0:255,255,255;1:0,0,0;2:255,0,0;3:0,255,0;4:0,0,255;5:255,255,0;6:255,0,255;7:0,255,255;8:89,211,84;9:89,84,216;10:254,254,254;11:192,182,172;12:76,76,76;13:102,102,102;14:127,127,127;15:153,153,153;16:178,178,178;17:204,204,204;18:229,229,229;19:242,242,242;20:204,198,170;21:204,198,170;22:193,191,168;23:186,181,163;24:178,165,150;25:183,163,155;26:173,153,140;27:155,142,130;28:135,102,86;29:175,206,198;30:132,193,163;31:137,168,160;32:130,158,140;33:173,188,198;34:122,142,153;35:117,137,145;36:104,130,150;37:109,122,132;38:124,153,209;39:127,127,155;40:170,165,191;41:211,206,135;42:221,186,135;43:188,158,130;44:198,153,124;45:191,130,119;46:206,94,96;47:170,142,147;48:165,119,122;49:147,104,112;50:211,89,84;51:146,0,255;52:122,0,255;53:98,0,255;54:74,0,255;55:51,0,255;56:27,0,255;57:3,0,255;58:0,20,255;59:0,44,255;60:0,68,255;61:0,91,255;62:0,115,255;63:0,139,255;64:0,163,255;65:0,187,255;66:0,210,255;67:0,234,255;68:0,255,251;69:0,255,227;70:0,255,204;71:0,255,180;72:0,255,156;73:0,255,132;74:0,255,108;75:0,255,85;76:0,255,61;77:0,255,37;78:0,255,13;79:10,255,0;80:34,255,0;81:57,255,0;82:81,255,0;83:105,255,0;84:129,255,0;85:153,255,0;86:176,255,0;87:200,255,0;88:224,255,0;89:248,255,0;90:255,238,0;91:255,214,0;92:255,190,0;93:255,166,0;94:255,142,0;95:255,119,0;96:255,95,0;97:255,71,0;98:255,47,0;99:255,23,0;110:254,254,254;201:91,91,91;202:122,122,122;203:183,183,183;204:214,214,214;205:137,15,15;206:183,20,20;207:234,71,71;208:239,117,117;209:15,137,15;210:20,183,20;211:71,234,71;212:117,239,117;213:15,15,137;214:20,20,183;215:71,71,234;216:117,117,239;217:137,137,15;218:183,183,20;219:234,234,71;220:239,239,117;221:137,15,137;222:183,20,183;223:234,71,234;224:239,117,239;225:15,137,137;226:20,183,183;227:71,234,234;228:117,239,239;390:255,255,204;391:255,255,153;392:204,204,153;393:255,255,102;394:204,204,102;395:153,153,102;396:255,255,51;397:204,204,51;398:153,153,51;399:102,102,51;400:255,255,0;401:204,204,0;402:153,153,0;403:102,102,0;404:51,51,0;406:204,255,204;407:153,255,153;408:153,204,153;409:102,255,102;410:102,204,102;411:102,153,102;412:51,255,51;413:51,204,51;414:51,153,51;415:51,102,51;416:0,255,0;417:0,204,0;418:0,153,0;419:0,102,0;420:0,51,0;422:204,255,255;423:153,255,255;424:153,204,204;425:102,255,255;426:102,204,204;427:102,153,153;428:51,255,255;429:51,204,204;430:51,153,153;431:51,102,102;432:0,255,255;433:0,204,204;434:0,153,153;435:0,102,102;436:0,51,51;590:204,204,255;591:153,153,255;592:153,153,204;593:102,102,255;594:102,102,204;595:102,102,153;596:51,51,255;597:51,51,204;598:51,51,153;599:51,51,102;600:0,0,255;601:0,0,204;602:0,0,153;603:0,0,102;604:0,0,51;606:255,204,255;607:255,153,255;608:204,153,204;609:255,102,255;610:204,102,204;611:153,102,153;612:255,51,255;613:204,51,204;614:153,51,153;615:102,51,102;616:255,0,255;617:204,0,204;618:153,0,153;619:102,0,102;620:51,0,51;622:255,204,204;623:255,153,153;624:204,153,153;625:255,102,102;626:204,102,102;627:153,102,102;628:255,51,51;629:204,51,51;630:153,51,51;631:102,51,51;632:255,0,0;633:204,0,0;634:153,0,0;635:102,0,0;636:51,0,0;791:255,204,153;792:204,153,102;793:153,102,51;794:153,102,0;795:204,153,51;796:255,204,102;797:255,153,0;798:255,204,51;799:204,153,0;800:255,204,0;801:255,153,51;802:204,102,0;803:102,51,0;804:153,51,0;805:204,102,51;806:255,153,102;807:255,102,0;808:255,102,51;809:204,51,0;810:255,51,0;811:153,255,51;812:102,204,0;813:51,102,0;814:51,153,0;815:102,204,51;816:153,255,102;817:102,255,0;818:102,255,51;819:51,204,0;820:51,255,0;821:204,255,153;822:153,204,102;823:102,153,51;824:102,153,0;825:153,204,51;826:204,255,102;827:153,255,0;828:204,255,51;829:153,204,0;830:204,255,0;831:153,255,204;832:102,204,153;833:51,153,102;834:0,153,102;835:51,204,153;836:102,255,204;837:0,255,102;838:51,255,204;839:0,204,153;840:0,255,204;841:51,255,153;842:0,204,102;843:0,102,51;844:0,153,51;845:51,204,102;846:102,255,153;847:0,255,153;848:51,255,102;849:0,204,51;850:0,255,51;851:153,204,255;852:102,153,204;853:51,102,153;854:0,51,153;855:51,102,204;856:102,153,255;857:0,102,255;858:51,102,255;859:0,51,204;860:0,51,255;861:51,153,255;862:0,102,204;863:0,51,102;864:0,102,153;865:51,153,204;866:102,204,255;867:0,153,255;868:51,204,255;869:0,153,204;870:0,204,255;871:204,153,255;872:153,102,204;873:102,51,153;874:102,0,153;875:153,51,204;876:204,102,255;877:153,0,255;878:204,51,255;879:153,0,204;880:204,0,255;881:153,51,255;882:102,0,204;883:51,0,102;884:51,0,153;885:102,51,204;886:153,102,255;887:102,0,255;888:102,51,255;889:51,0,204;890:51,0,255;891:255,51,153;892:204,0,102;893:102,0,51;894:153,0,51;895:204,51,102;896:255,102,153;897:255,0,102;898:255,51,102;899:204,0,51;900:255,0,51;901:255,153,204;902:204,102,153;903:153,51,102;904:153,0,102;905:204,51,153;906:255,102,204;907:255,0,153;908:204,0,153;909:255,51,204;910:255,0,153;920:204,204,204;921:153,153,153;922:102,102,102;923:51,51,51;924:53,42,134;925:51,44,137;926:50,45,140;927:49,47,143;928:48,48,146;929:46,50,148;930:45,51,151;931:44,53,154;932:43,55,157;933:42,56,160;934:40,58,162;935:39,59,165;936:38,61,168;937:37,63,171;938:35,64,174;939:34,66,176;940:33,67,179;941:32,69,182;942:31,71,185;943:29,72,187;944:28,74,190;945:27,75,193;946:26,77,196;947:24,79,199;948:23,80,201;949:22,82,204;950:21,83,207;951:19,85,210;952:18,86,213;953:17,88,215;954:16,90,218;955:15,91,221;956:15,92,221;957:15,94,220;958:15,95,220;959:15,96,220;960:15,97,220;961:15,98,220;962:16,99,219;963:16,100,219;964:16,102,219;965:16,103,219;966:16,104,218;967:16,105,218;968:17,106,218;969:17,107,218;970:17,109,217;971:17,110,217;972:17,111,217;973:17,112,217;974:17,113,216;975:18,114,216;976:18,115,216;977:18,117,216;978:18,118,215;979:18,119,215;980:18,120,215;981:18,121,215;982:19,122,215;983:19,123,214;984:19,125,214;985:19,126,214;986:19,127,214;987:19,128,213;988:19,129,213;989:19,130,213;990:18,131,212;991:18,132,212;992:17,134,211;993:17,135,211;994:16,136,211;995:16,137,210;996:15,138,210;997:15,139,210;998:15,140,209;999:14,141,209;1000:14,142,208;1001:13,143,208;1002:13,145,208;1003:12,146,207;1004:12,147,207;1005:12,148,207;1006:11,149,206;1007:11,150,206;1008:10,151,205;1009:10,152,205;1010:9,153,205;1011:9,154,204;1012:8,155,204;1013:8,157,204;1014:8,158,203;1015:7,159,203;1016:7,160,202;1017:6,161,202;1018:6,162,202;1019:5,163,201;1020:7,164,200;1021:8,164,199;1022:9,165,198;1023:10,166,197;1024:12,166,195;1025:13,167,194;1026:14,167,193;1027:15,168,192;1028:17,169,191;1029:18,169,189;1030:19,170,188;1031:20,170,187;1032:22,171,186;1033:23,172,185;1034:24,172,184;1035:25,173,182;1036:27,173,181;1037:28,174,180;1038:29,175,179;1039:30,175,178;1040:32,176,176;1041:33,176,175;1042:34,177,174;1043:35,178,173;1044:37,178,172;1045:38,179,170;1046:39,180,169;1047:40,180,168;1048:42,181,167;1049:43,181,166;1050:44,182,165;1051:45,183,163;1052:48,183,162;1053:51,183,161;1054:54,183,159;1055:57,184,158;1056:59,184,156;1057:62,184,155;1058:65,184,154;1059:68,185,152;1060:71,185,151;1061:73,185,149;1062:76,185,148;1063:79,186,146;1064:82,186,145;1065:84,186,144;1066:87,186,142;1067:90,187,141;1068:93,187,139;1069:96,187,138;1070:98,187,137;1071:101,188,135;1072:104,188,134;1073:107,188,132;1074:110,188,131;1075:112,189,130;1076:115,189,128;1077:118,189,127;1078:121,189,125;1079:124,190,124;1080:126,190,123;1081:129,190,121;1082:132,190,120;1083:135,191,118;1084:137,190,117;1085:139,190,117;1086:142,190,116;1087:144,190,115;1088:146,190,114;1089:148,190,113;1090:151,190,112;1091:153,190,111;1092:155,189,110;1093:158,189,109;1094:160,189,108;1095:162,189,107;1096:165,189,106;1097:167,189,105;1098:169,189,104;1099:171,188,104;1100:174,188,103;1101:176,188,102;1102:178,188,101;1103:181,188,100;1104:183,188,99;1105:185,188,98;1106:188,188,97;1107:190,187,96;1108:192,187,95;1109:194,187,94;1110:197,187,93;1111:199,187,92;1112:201,187,92;1113:204,187,91;1114:206,186,90;1115:208,186,89;1116:210,187,88;1117:211,187,86;1118:212,188,85;1119:214,188,84;1120:215,188,83;1121:217,189,81;1122:218,189,80;1123:220,190,79;1124:221,190,78;1125:222,191,77;1126:224,191,75;1127:225,191,74;1128:227,192,73;1129:228,192,72;1130:229,193,70;1131:231,193,69;1132:232,194,68;1133:234,194,67;1134:235,194,66;1135:236,195,64;1136:238,195,63;1137:239,196,62;1138:241,196,61;1139:242,197,59;1140:244,197,58;1141:245,197,57;1142:246,198,56;1143:248,198,55;1144:249,199,53;1145:251,199,52;1146:252,200,51;1147:253,200,50;1148:253,202,49;1149:253,203,47;1150:253,205,46;1151:253,206,45;1152:253,208,44;1153:252,209,43;1154:252,211,42;1155:252,213,41;1156:252,214,39;1157:252,216,38;1158:252,217,37;1159:252,219,36;1160:251,220,35;1161:251,222,34;1162:251,224,33;1163:251,225,31;1164:251,227,30;1165:251,228,29;1166:250,230,28;1167:250,231,27;1168:250,233,26;1169:250,235,25;1170:250,236,23;1171:250,238,22;1172:250,239,21;1173:249,241,20;1174:249,242,19;1175:249,244,18;1176:249,246,17;1177:249,247,16;1178:249,249,14","fBuf":[924,925,926,927,928,929,930,931,932,933,934,935,936,937,938,939,940,941,942,943,944,945,946,947,948,949,950,951,952,953,954,955,956,957,958,959,960,961,962,963,964,965,966,967,968,969,970,971,972,973,974,975,976,977,978,979,980,981,982,983,984,985,986,987,988,989,990,991,992,993,994,995,996,997,998,999,1000,1001,1002,1003,1004,1005,1006,1007,1008,1009,1010,1011,1012,1013,1014,1015,1016,1017,1018,1019,1020,1021,1022,1023,1024,1025,1026,1027,1028,1029,1030,1031,1032,1033,1034,1035,1036,1037,1038,1039,1040,1041,1042,1043,1044,1045,1046,1047,1048,1049,1050,1051,1052,1053,1054,1055,1056,1057,1058,1059,1060,1061,1062,1063,1064,1065,1066,1067,1068,1069,1070,1071,1072,1073,1074,1075,1076,1077,1078,1079,1080,1081,1082,1083,1084,1085,1086,1087,1088,1089,1090,1091,1092,1093,1094,1095,1096,1097,1098,1099,1100,1101,1102,1103,1104,1105,1106,1107,1108,1109,1110,1111,1112,1113,1114,1115,1116,1117,1118,1119,1120,1121,1122,1123,1124,1125,1126,1127,1128,1129,1130,1131,1132,1133,1134,1135,1136,1137,1138,1139,1140,1141,1142,1143,1144,1145,1146,1147,1148,1149,1150,1151,1152,1153,1154,1155,1156,1157,1158,1159,1160,1161,1162,1163,1164,1165,1166,1167,1168,1169,1170,1171,1172,1173,1174,1175,1176,1177,1178]}},{"_typename":"TWebSnapshot","fUniqueID":0,"fBits":0,"fObjectID":"","fOption":"","fKind":5,"fSnapshot":{"_typename":"TStyle","fUniqueID":0,"fBits":0,"fName":"Modern","fTitle":"Modern Style","fLineColor":1,"fLineStyle":1,"fLineWidth":1,"fFillColor":19,"fFillStyle":1001,"fMarkerColor":1,"fMarkerStyle":1,"fMarkerSize":1,"fTextAngle":0,"fTextSize":0.05,"fTextAlign":11,"fTextColor":1,"fTextFont":62,"fXaxis":{"_typename":"TAttAxis","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42},"fYaxis":{"_typename":"TAttAxis","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":0,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42},"fZaxis":{"_typename":"TAttAxis","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42},"fBarWidth":1,"fBarOffset":0,"fColorModelPS":0,"fDrawBorder":0,"fOptLogx":0,"fOptLogy":0,"fOptLogz":0,"fOptDate":0,"fOptStat":1111,"fOptTitle":1,"fOptFile":0,"fOptFit":0,"fShowEventStatus":0,"fShowEditor":0,"fShowToolBar":0,"fNumberContours":20,"fAttDate":{"_typename":"TAttText","fTextAngle":0,"fTextSize":0.025,"fTextAlign":11,"fTextColor":1,"fTextFont":62},"fDateX":0.01,"fDateY":0.01,"fEndErrorSize":2,"fErrorX":0.5,"fFuncColor":2,"fFuncStyle":1,"fFuncWidth":2,"fGridColor":0,"fGridStyle":3,"fGridWidth":1,"fLegendBorderSize":1,"fLegendFillColor":0,"fLegendFont":42,"fLegendTextSize":0,"fHatchesLineWidth":1,"fHatchesSpacing":1,"fFrameFillColor":0,"fFrameLineColor":1,"fFrameFillStyle":1001,"fFrameLineStyle":1,"fFrameLineWidth":1,"fFrameBorderSize":1,"fFrameBorderMode":0,"fHistFillColor":0,"fHistLineColor":602,"fHistFillStyle":1001,"fHistLineStyle":1,"fHistLineWidth":1,"fHistMinimumZero":false,"fHistTopMargin":0.05,"fCanvasPreferGL":false,"fCanvasColor":0,"fCanvasBorderSize":2,"fCanvasBorderMode":0,"fCanvasDefH":500,"fCanvasDefW":700,"fCanvasDefX":10,"fCanvasDefY":10,"fPadColor":0,"fPadBorderSize":2,"fPadBorderMode":0,"fPadBottomMargin":0.1,"fPadTopMargin":0.1,"fPadLeftMargin":0.1,"fPadRightMargin":0.1,"fPadGridX":false,"fPadGridY":false,"fPadTickX":0,"fPadTickY":0,"fPaperSizeX":20,"fPaperSizeY":26,"fScreenFactor":1,"fStatColor":0,"fStatTextColor":1,"fStatBorderSize":1,"fStatFont":42,"fStatFontSize":0,"fStatStyle":1001,"fStatFormat":"6.4g","fStatX":0.98,"fStatY":0.935,"fStatW":0.2,"fStatH":0.16,"fStripDecimals":true,"fTitleAlign":23,"fTitleColor":0,"fTitleTextColor":1,"fTitleBorderSize":0,"fTitleFont":42,"fTitleFontSize":0.05,"fTitleStyle":0,"fTitleX":0.5,"fTitleY":0.995,"fTitleW":0,"fTitleH":0,"fLegoInnerR":0.5,"fLineStyles":["","  "," 12 12"," 4 8"," 12 16 4 16"," 20 12 4 12"," 20 12 4 12 4 12 4 12"," 20 20"," 20 12 4 12 4 12"," 80 20"," 80 40 4 40","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  "],"fHeaderPS":"","fTitlePS":"","fFitFormat":"5.4g","fPaintTextFormat":"g","fLineScalePS":3,"fJoinLinePS":0,"fCapLinePS":0,"fTimeOffset":788918400,"fImageScaling":1,"fCandleWhiskerRange":1,"fCandleBoxRange":0.5,"fCandleScaled":false,"fViolinScaled":true,"fXAxisExpXOffset":0,"fXAxisExpYOffset":0,"fYAxisExpXOffset":0,"fYAxisExpYOffset":0,"fAxisMaxDigits":5,"fOrthoCamera":false}},{"_typename":"TPadWebSnapshot","fUniqueID":0,"fBits":0,"fObjectID":"","fOption":"","fKind":3,"fSnapshot":{"_typename":"TPad","fUniqueID":0,"fBits":9,"fLineColor":1,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":1001,"fLeftMargin":0.1,"fRightMargin":0.1,"fBottomMargin":0.1,"fTopMargin":0.1,"fXfile":2,"fYfile":2,"fAfile":1,"fXstat":0.99,"fYstat":0.99,"fAstat":2,"fFrameFillColor":0,"fFrameLineColor":1,"fFrameFillStyle":1001,"fFrameLineStyle":1,"fFrameLineWidth":1,"fFrameBorderSize":1,"fFrameBorderMode":0,"fX1":49.9999888241285,"fY1":-185.981263856684,"fX2":1550.00001117587,"fY2":1673.83126385668,"fXtoAbsPixelk":-7.17594572277049,"fXtoPixelk":-19.1359454554437,"fXtoPixel":0.382719994653463,"fYtoAbsPixelk":518.024046856451,"fYtoPixelk":506.304047118413,"fYtoPixel":-0.302482100825286,"fUtoAbsPixelk":11.9600497326732,"fUtoPixelk":5e-5,"fUtoPixel":574.080000534654,"fVtoAbsPixelk":574.280050261962,"fVtoPixelk":562.560000523925,"fVtoPixel":-562.560000523925,"fAbsPixeltoXk":18.7499890860629,"fPixeltoXk":49.9999888241285,"fPixeltoX":2.61287629068206,"fAbsPixeltoYk":1712.57735728192,"fPixeltoYk":-185.981263856684,"fPixeltoY":-3.30598074157651,"fXlowNDC":0.00999999977648258,"fYlowNDC":0.509999999776483,"fXUpNDC":0.490000000223517,"fYUpNDC":0.990000000223517,"fWNDC":0.480000000447035,"fHNDC":0.480000000447035,"fAbsXlowNDC":0.00999999977648258,"fAbsYlowNDC":0.509999999776483,"fAbsWNDC":0.480000000447035,"fAbsHNDC":0.480000000447035,"fUxmin":200,"fUymin":0,"fUxmax":1400,"fUymax":1487.85,"fTheta":30,"fPhi":30,"fAspectRatio":0,"fNumber":1,"fTickx":0,"fTicky":0,"fLogx":0,"fLogy":0,"fLogz":0,"fPadPaint":0,"fCrosshair":0,"fCrosshairPos":0,"fBorderSize":2,"fBorderMode":0,"fModified":false,"fGridx":false,"fGridy":false,"fAbsCoord":false,"fEditable":true,"fFixedAspectRatio":false,"fPrimitives":{"_typename":"TList","name":"TList","arr":[],"opt":[]},"fExecs":{"_typename":"TList","name":"TList","arr":[],"opt":[]},"fName":"c0_1","fTitle":"c0_1","fNumPaletteColor":0,"fNextPaletteColor":0},"fActive":false,"fReadOnly":true,"fWithoutPrimitives":false,"fHasExecs":true,"fPrimitives":[{"_typename":"TWebSnapshot","fUniqueID":0,"fBits":0,"fObjectID":"","fOption":"","fKind":1,"fSnapshot":{"_typename":"TFrame","fUniqueID":0,"fBits":8,"fLineColor":1,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":1001,"fX1":200,"fY1":0,"fX2":1400,"fY2":1487.85,"fBorderSize":1,"fBorderMode":0}},{"_typename":"TWebSnapshot","fUniqueID":0,"fBits":0,"fObjectID":"","fOption":"nostack","fKind":1,"fSnapshot":{"_typename":"THStack","fUniqueID":0,"fBits":8,"fName":"stack0","fTitle":"S2 data","fHists":{"_typename":"TList","name":"TList","arr":[{"_typename":"TH1D","fUniqueID":0,"fBits":8,"fName":"QDC0_ch00","fTitle":"+1 GeV\/c muons","fLineColor":2,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":1001,"fMarkerColor":1,"fMarkerStyle":1,"fMarkerSize":1,"fNcells":822,"fXaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"xaxis","fTitle":"Charge in QDC counts","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":820,"fXmin":0,"fXmax":4100,"fXbins":[],"fFirst":1,"fLast":820,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fYaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"yaxis","fTitle":"# Events","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":0,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":1,"fXmin":0,"fXmax":1,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fZaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"zaxis","fTitle":"","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":1,"fXmin":0,"fXmax":1,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fBarOffset":0,"fBarWidth":1000,"fEntries":15023,"fTsumw":15023,"fTsumw2":15023,"fTsumwx":8087665,"fTsumwx2":4529442619,"fMaximum":-1111,"fMinimum":-1111,"fNormFactor":0,"fContour":[],"fSumw2":[],"fOption":"","fFunctions":{"_typename":"TList","name":"TList","arr":[],"opt":[]},"fBufferSize":0,"fBuffer":[],"fBinStatErrOpt":0,"fStatOverflows":2,"fArray":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,1,0,0,1,0,0,1,1,1,0,0,1,0,0,1,0,1,0,4,13,20,45,54,85,109,136,162,223,227,265,280,342,344,299,359,379,391,357,346,377,374,389,372,395,400,354,336,361,352,316,298,289,278,261,266,250,232,222,213,217,220,183,203,162,158,157,145,141,141,140,114,129,100,116,87,85,99,103,81,86,71,78,64,65,55,63,39,55,52,39,38,43,31,34,31,26,30,31,23,29,25,21,28,20,14,22,11,19,20,17,15,11,14,15,7,11,12,9,8,10,6,10,3,8,7,3,3,6,6,5,6,4,4,4,2,5,4,2,6,2,1,2,3,2,3,1,1,3,1,4,1,2,2,3,2,2,2,1,1,2,0,3,1,1,1,0,1,3,1,1,1,1,0,0,1,0,1,1,0,0,0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,1,1,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{"_typename":"TH1D","fUniqueID":0,"fBits":8,"fName":"QDC0_ch00","fTitle":"-1 GeV\/c mixed, absorber","fLineColor":9,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":1001,"fMarkerColor":1,"fMarkerStyle":1,"fMarkerSize":1,"fNcells":822,"fXaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"xaxis","fTitle":"Charge in QDC counts","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":820,"fXmin":0,"fXmax":4100,"fXbins":[],"fFirst":1,"fLast":820,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fYaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"yaxis","fTitle":"# Events","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":0,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":1,"fXmin":0,"fXmax":1,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fZaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"zaxis","fTitle":"","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":1,"fXmin":0,"fXmax":1,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fBarOffset":0,"fBarWidth":1000,"fEntries":6529,"fTsumw":6529,"fTsumw2":6529,"fTsumwx":3484998,"fTsumwx2":1950876074,"fMaximum":-1111,"fMinimum":-1111,"fNormFactor":0,"fContour":[],"fSumw2":[],"fOption":"","fFunctions":{"_typename":"TList","name":"TList","arr":[],"opt":[]},"fBufferSize":0,"fBuffer":[],"fBinStatErrOpt":0,"fStatOverflows":2,"fArray":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,2,0,0,0,1,4,8,21,22,47,63,68,75,100,102,109,120,138,155,172,157,185,164,175,145,170,189,171,159,157,169,172,148,135,160,132,138,132,132,112,127,80,107,94,95,97,89,73,80,89,72,65,63,55,54,48,62,51,48,46,32,37,32,31,36,39,20,40,24,16,21,21,24,16,13,15,23,16,19,11,9,10,13,9,8,9,8,8,10,12,7,5,7,3,9,4,5,5,5,6,3,1,5,4,4,2,4,2,4,2,1,4,1,3,2,4,1,1,1,5,0,1,5,3,0,2,1,0,0,1,0,1,2,0,0,0,0,0,0,1,0,0,0,0,1,2,0,0,0,1,1,0,2,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{"_typename":"TH1D","fUniqueID":0,"fBits":8,"fName":"QDC0_ch00","fTitle":"-1 GeV\/c mixed, no absorber","fLineColor":8,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":1001,"fMarkerColor":1,"fMarkerStyle":1,"fMarkerSize":1,"fNcells":822,"fXaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"xaxis","fTitle":"Charge in QDC counts","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":820,"fXmin":0,"fXmax":4100,"fXbins":[],"fFirst":1,"fLast":820,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fYaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"yaxis","fTitle":"# Events","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":0,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":1,"fXmin":0,"fXmax":1,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fZaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"zaxis","fTitle":"","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":1,"fXmin":0,"fXmax":1,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fBarOffset":0,"fBarWidth":1000,"fEntries":56630,"fTsumw":56630,"fTsumw2":56630,"fTsumwx":31051884,"fTsumwx2":17799911868,"fMaximum":-1111,"fMinimum":-1111,"fNormFactor":0,"fContour":[],"fSumw2":[],"fOption":"","fFunctions":{"_typename":"TList","name":"TList","arr":[],"opt":[]},"fBufferSize":0,"fBuffer":[],"fBinStatErrOpt":0,"fStatOverflows":2,"fArray":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,2,0,0,2,0,0,0,3,2,8,18,29,67,132,183,262,379,543,606,764,760,966,1097,1054,1213,1221,1274,1286,1417,1398,1359,1362,1357,1382,1347,1325,1334,1292,1221,1221,1254,1100,1123,1098,1089,985,1012,955,895,796,828,772,809,730,643,676,630,595,607,556,552,491,485,441,427,458,433,421,329,334,354,323,328,303,255,246,260,245,206,198,205,188,173,175,163,173,161,155,124,135,125,118,122,112,111,95,95,93,94,78,92,55,71,62,57,74,63,55,52,45,56,47,38,44,39,40,38,25,38,37,31,27,24,31,28,26,25,18,19,28,15,16,25,25,22,16,13,14,12,12,17,15,22,11,12,7,12,7,5,7,13,11,11,9,8,4,8,4,9,3,4,5,5,4,4,5,2,5,5,5,2,6,4,6,4,4,5,2,3,3,4,3,1,4,3,1,2,2,1,3,0,2,2,2,0,1,2,2,0,0,1,0,0,2,0,2,0,1,2,2,1,1,2,0,0,1,1,0,0,1,1,0,1,0,0,0,0,0,0,0,1,0,1,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}],"opt":["","",""]},"fHistogram":{"_typename":"TH1F","fUniqueID":0,"fBits":512,"fName":"stack0","fTitle":"S2 data","fLineColor":602,"fLineStyle":1,"fLineWidth":0,"fFillColor":0,"fFillStyle":1001,"fMarkerColor":1,"fMarkerStyle":1,"fMarkerSize":1,"fNcells":822,"fXaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"xaxis","fTitle":"QDC count","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":820,"fXmin":200,"fXmax":1400,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fYaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"yaxis","fTitle":"#Occurances","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":0,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":1,"fXmin":0,"fXmax":1,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fZaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"zaxis","fTitle":"","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":1,"fXmin":0,"fXmax":1,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fBarOffset":0,"fBarWidth":1000,"fEntries":0,"fTsumw":0,"fTsumw2":0,"fTsumwx":0,"fTsumwx2":0,"fMaximum":1487.85,"fMinimum":0,"fNormFactor":0,"fContour":[],"fSumw2":[],"fOption":"","fFunctions":{"_typename":"TList","name":"TList","arr":[],"opt":[]},"fBufferSize":0,"fBuffer":[],"fBinStatErrOpt":0,"fStatOverflows":2,"fArray":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"fMaximum":-1111,"fMinimum":-1111}},{"_typename":"TWebSnapshot","fUniqueID":0,"fBits":0,"fObjectID":"","fOption":"blNDC","fKind":1,"fSnapshot":{"_typename":"TPaveText","fUniqueID":0,"fBits":9,"fLineColor":1,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":0,"fX1":650.436870806356,"fY1":1562.24251953792,"fX2":949.563129193644,"fY2":1664.53221008639,"fX1NDC":0.400291248690014,"fY1NDC":0.940000003948808,"fX2NDC":0.599708751309986,"fY2NDC":0.995000004768372,"fBorderSize":0,"fInit":1,"fShadowColor":1,"fCornerRadius":0,"fOption":"blNDC","fName":"title","fTextAngle":0,"fTextSize":0,"fTextAlign":22,"fTextColor":1,"fTextFont":42,"fLabel":"","fLongest":7,"fMargin":0.05,"fLines":{"_typename":"TList","name":"TList","arr":[{"_typename":"TLatex","fUniqueID":0,"fBits":0,"fName":"","fTitle":"S2 data","fTextAngle":0,"fTextSize":0,"fTextAlign":0,"fTextColor":0,"fTextFont":0,"fX":0,"fY":0,"fLineColor":1,"fLineStyle":1,"fLineWidth":2,"fLimitFactorSize":3,"fOriginSize":0.0467500016093254}],"opt":[""]}}}]},{"_typename":"TPadWebSnapshot","fUniqueID":0,"fBits":0,"fObjectID":"","fOption":"","fKind":3,"fSnapshot":{"_typename":"TPad","fUniqueID":0,"fBits":9,"fLineColor":1,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":1001,"fLeftMargin":0.1,"fRightMargin":0.1,"fBottomMargin":0.1,"fTopMargin":0.1,"fXfile":2,"fYfile":2,"fAfile":1,"fXstat":0.99,"fYstat":0.99,"fAstat":2,"fFrameFillColor":0,"fFrameLineColor":1,"fFrameFillStyle":1001,"fFrameLineStyle":1,"fFrameLineWidth":1,"fFrameBorderSize":1,"fFrameBorderMode":0,"fX1":49.9999888241285,"fY1":-312.63752329331,"fX2":1550.00001117587,"fY2":2813.73752329331,"fXtoAbsPixelk":590.824054277229,"fXtoPixelk":-19.1359454554437,"fXtoPixel":0.382719994653463,"fYtoAbsPixelk":518.024046856451,"fYtoPixelk":506.304047118413,"fYtoPixel":-0.179940023874656,"fUtoAbsPixelk":609.960049732673,"fUtoPixelk":5e-5,"fUtoPixel":574.080000534654,"fVtoAbsPixelk":574.280050261962,"fVtoPixelk":562.560000523925,"fVtoPixel":-562.560000523925,"fAbsPixeltoXk":-1543.75003274181,"fPixeltoXk":49.9999888241285,"fPixeltoX":2.61287629068206,"fAbsPixeltoYk":2878.87033524737,"fPixeltoYk":-312.63752329331,"fPixeltoY":-5.5574072875337,"fXlowNDC":0.509999999776483,"fYlowNDC":0.509999999776483,"fXUpNDC":0.990000000223517,"fYUpNDC":0.990000000223517,"fWNDC":0.480000000447035,"fHNDC":0.480000000447035,"fAbsXlowNDC":0.509999999776483,"fAbsYlowNDC":0.509999999776483,"fAbsWNDC":0.480000000447035,"fAbsHNDC":0.480000000447035,"fUxmin":200,"fUymin":0,"fUxmax":1400,"fUymax":2501.1,"fTheta":30,"fPhi":30,"fAspectRatio":0,"fNumber":2,"fTickx":0,"fTicky":0,"fLogx":0,"fLogy":0,"fLogz":0,"fPadPaint":0,"fCrosshair":0,"fCrosshairPos":0,"fBorderSize":2,"fBorderMode":0,"fModified":false,"fGridx":false,"fGridy":false,"fAbsCoord":false,"fEditable":true,"fFixedAspectRatio":false,"fPrimitives":{"_typename":"TList","name":"TList","arr":[],"opt":[]},"fExecs":{"_typename":"TList","name":"TList","arr":[],"opt":[]},"fName":"c0_2","fTitle":"c0_2","fNumPaletteColor":0,"fNextPaletteColor":0},"fActive":false,"fReadOnly":true,"fWithoutPrimitives":false,"fHasExecs":true,"fPrimitives":[{"_typename":"TWebSnapshot","fUniqueID":0,"fBits":0,"fObjectID":"","fOption":"","fKind":1,"fSnapshot":{"_typename":"TFrame","fUniqueID":0,"fBits":8,"fLineColor":1,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":1001,"fX1":200,"fY1":0,"fX2":1400,"fY2":2501.1,"fBorderSize":1,"fBorderMode":0}},{"_typename":"TWebSnapshot","fUniqueID":0,"fBits":0,"fObjectID":"","fOption":"nostack","fKind":1,"fSnapshot":{"_typename":"THStack","fUniqueID":0,"fBits":8,"fName":"stack1","fTitle":"S3 data","fHists":{"_typename":"TList","name":"TList","arr":[{"_typename":"TH1D","fUniqueID":0,"fBits":8,"fName":"QDC0_ch01","fTitle":"+1 GeV\/c muons","fLineColor":2,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":1001,"fMarkerColor":1,"fMarkerStyle":1,"fMarkerSize":1,"fNcells":822,"fXaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"xaxis","fTitle":"Charge in QDC counts","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":820,"fXmin":0,"fXmax":4100,"fXbins":[],"fFirst":1,"fLast":820,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fYaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"yaxis","fTitle":"# Events","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":0,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":1,"fXmin":0,"fXmax":1,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fZaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"zaxis","fTitle":"","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":1,"fXmin":0,"fXmax":1,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fBarOffset":0,"fBarWidth":1000,"fEntries":15023,"fTsumw":15023,"fTsumw2":15023,"fTsumwx":8068569,"fTsumwx2":4524847397,"fMaximum":-1111,"fMinimum":-1111,"fNormFactor":0,"fContour":[],"fSumw2":[],"fOption":"","fFunctions":{"_typename":"TList","name":"TList","arr":[],"opt":[]},"fBufferSize":0,"fBuffer":[],"fBinStatErrOpt":0,"fStatOverflows":2,"fArray":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,6,6,10,3,10,16,8,8,14,11,11,13,9,16,13,17,15,28,49,94,167,249,401,564,695,829,934,980,990,955,836,769,672,591,558,442,367,319,277,302,210,218,195,173,156,149,146,117,100,103,89,79,72,55,64,56,50,46,49,44,52,35,27,29,36,19,27,19,21,16,8,13,21,13,7,22,6,13,7,9,3,3,8,9,8,5,2,4,7,5,4,5,2,3,3,4,2,1,1,1,2,1,1,0,2,3,1,0,0,0,0,1,0,2,1,2,1,1,1,0,0,1,2,0,2,0,1,1,0,0,1,2,1,0,0,2,2,0,0,0,0,1,1,0,0,0,0,1,0,2,0,0,0,0,1,0,0,2,0,1,0,1,0,1,0,0,1,0,0,0,0,0,0,2,2,0,1,0,1,2,0,1,1,2,0,0,0,0,0,0,0,0,0,0,1,0,0,3,0,1,0,1,1,0,0,0,1,0,0,1,0,2,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,1,0,1,0,2,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,0,1,1,0,0,1,0,1,0,2,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,2,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,2,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{"_typename":"TH1D","fUniqueID":0,"fBits":8,"fName":"QDC0_ch01","fTitle":"-1 GeV\/c mixed, absorber","fLineColor":9,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":1001,"fMarkerColor":1,"fMarkerStyle":1,"fMarkerSize":1,"fNcells":822,"fXaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"xaxis","fTitle":"Charge in QDC counts","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":820,"fXmin":0,"fXmax":4100,"fXbins":[],"fFirst":1,"fLast":820,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fYaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"yaxis","fTitle":"# Events","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":0,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":1,"fXmin":0,"fXmax":1,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fZaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"zaxis","fTitle":"","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":1,"fXmin":0,"fXmax":1,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fBarOffset":0,"fBarWidth":1000,"fEntries":6529,"fTsumw":6529,"fTsumw2":6529,"fTsumwx":3808830,"fTsumwx2":2587297230,"fMaximum":-1111,"fMinimum":-1111,"fNormFactor":0,"fContour":[],"fSumw2":[],"fOption":"","fFunctions":{"_typename":"TList","name":"TList","arr":[],"opt":[]},"fBufferSize":0,"fBuffer":[],"fBinStatErrOpt":0,"fStatOverflows":2,"fArray":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,4,4,9,8,5,5,8,8,8,13,9,10,18,20,18,28,42,59,74,93,118,158,196,271,254,304,339,340,347,336,309,284,257,215,195,176,141,154,118,96,87,84,71,55,57,53,58,38,34,46,36,23,30,22,17,14,30,14,19,7,16,11,11,15,10,9,4,5,3,13,8,4,8,9,12,10,8,12,9,3,8,8,6,8,5,4,5,10,3,4,9,8,7,6,5,8,7,5,6,3,3,5,4,2,2,2,2,2,1,4,5,3,0,1,2,5,4,6,1,6,5,2,2,2,2,2,5,2,3,2,4,3,4,2,0,3,3,2,1,4,1,2,2,2,1,2,0,3,1,2,0,2,1,0,3,4,2,1,3,2,4,4,2,2,0,1,1,1,2,3,2,2,1,3,5,2,3,2,2,3,3,2,2,3,1,1,3,0,1,0,0,1,1,2,2,1,2,0,0,4,3,4,3,1,0,2,1,3,2,1,2,0,1,4,0,3,0,2,1,0,2,2,1,0,2,1,1,1,0,1,1,1,3,0,1,3,0,1,1,1,1,2,0,0,0,0,0,1,0,2,1,0,2,3,0,0,0,2,1,0,0,0,0,1,0,0,3,1,0,2,0,1,2,0,1,0,0,2,0,0,1,3,0,0,0,0,1,1,0,0,1,0,2,0,0,1,0,0,0,0,1,0,1,0,1,1,0,0,0,1,1,1,1,0,1,1,0,1,1,1,0,1,1,0,1,0,0,1,1,0,1,0,1,3,0,0,0,0,0,0,0,3,0,1,0,0,0,0,1,0,0,0,2,0,0,0,2,0,0,1,0,2,1,0,0,2,0,0,0,0,0,0,0,0,0,1,2,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{"_typename":"TH1D","fUniqueID":0,"fBits":8,"fName":"QDC0_ch01","fTitle":"-1 GeV\/c mixed, no absorber","fLineColor":8,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":1001,"fMarkerColor":1,"fMarkerStyle":1,"fMarkerSize":1,"fNcells":822,"fXaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"xaxis","fTitle":"Charge in QDC counts","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":820,"fXmin":0,"fXmax":4100,"fXbins":[],"fFirst":1,"fLast":820,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fYaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"yaxis","fTitle":"# Events","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":0,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":1,"fXmin":0,"fXmax":1,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fZaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"zaxis","fTitle":"","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":1,"fXmin":0,"fXmax":1,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fBarOffset":0,"fBarWidth":1000,"fEntries":56630,"fTsumw":56630,"fTsumw2":56630,"fTsumwx":34767339,"fTsumwx2":22776546941,"fMaximum":-1111,"fMinimum":-1111,"fNormFactor":0,"fContour":[],"fSumw2":[],"fOption":"","fFunctions":{"_typename":"TList","name":"TList","arr":[],"opt":[]},"fBufferSize":0,"fBuffer":[],"fBinStatErrOpt":0,"fStatOverflows":2,"fArray":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,0,1,1,0,0,0,1,1,1,5,20,32,49,58,92,74,77,74,70,87,75,80,68,68,71,57,56,60,67,75,86,135,196,330,496,718,967,1291,1701,1865,2160,2319,2382,2368,2238,2138,2060,1908,1737,1580,1427,1384,1254,1108,1092,944,840,819,748,718,658,671,570,540,503,475,463,451,414,374,371,341,316,320,283,269,272,232,249,230,270,217,226,206,197,194,203,208,181,159,165,143,168,147,153,155,157,125,155,154,121,137,140,101,109,109,113,105,96,115,90,96,97,88,90,73,93,86,79,66,75,66,67,63,54,58,56,48,48,55,58,60,60,57,48,55,63,43,48,43,29,53,49,35,36,44,38,37,37,26,30,40,30,22,27,19,29,40,37,27,33,25,26,29,22,23,17,17,12,18,16,29,17,19,13,22,12,11,17,9,11,11,13,10,14,11,12,8,8,5,8,7,3,6,7,4,5,10,10,8,6,2,2,6,3,6,5,11,6,7,5,5,7,4,3,10,2,7,3,4,3,0,5,7,4,5,2,0,3,5,4,1,1,2,2,3,0,3,2,2,1,4,3,5,1,3,2,0,1,2,1,5,4,3,2,3,2,1,0,1,2,2,2,1,3,0,3,1,1,0,2,1,2,0,1,0,2,2,0,1,0,0,1,1,0,0,0,0,1,2,1,0,0,1,0,0,0,2,0,0,1,0,2,1,2,0,1,1,1,0,3,0,2,1,1,1,0,0,0,1,1,2,0,0,1,1,0,1,1,0,1,0,1,0,0,0,1,2,0,0,1,0,1,0,2,3,0,0,0,2,0,2,2,1,0,0,1,1,1,0,2,0,1,0,0,0,1,0,1,0,0,2,0,0,0,0,1,1,0,1,1,0,1,1,0,1,0,0,0,2,0,2,0,0,0,1,0,0,0,0,0,0,2,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,2,1,1,0,1,0,0,2,0,0,1,0,0,0,0,0,1,1,0,1,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,1,2,0,0,0,1,1,0,0,0,0,1,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}],"opt":["","",""]},"fHistogram":{"_typename":"TH1F","fUniqueID":0,"fBits":512,"fName":"stack1","fTitle":"S3 data","fLineColor":602,"fLineStyle":1,"fLineWidth":0,"fFillColor":0,"fFillStyle":1001,"fMarkerColor":1,"fMarkerStyle":1,"fMarkerSize":1,"fNcells":822,"fXaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"xaxis","fTitle":"QDC count","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":820,"fXmin":200,"fXmax":1400,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fYaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"yaxis","fTitle":"#Occurances","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":0,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":1,"fXmin":0,"fXmax":1,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fZaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"zaxis","fTitle":"","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":1,"fXmin":0,"fXmax":1,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fBarOffset":0,"fBarWidth":1000,"fEntries":0,"fTsumw":0,"fTsumw2":0,"fTsumwx":0,"fTsumwx2":0,"fMaximum":2501.1,"fMinimum":0,"fNormFactor":0,"fContour":[],"fSumw2":[],"fOption":"","fFunctions":{"_typename":"TList","name":"TList","arr":[],"opt":[]},"fBufferSize":0,"fBuffer":[],"fBinStatErrOpt":0,"fStatOverflows":2,"fArray":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"fMaximum":-1111,"fMinimum":-1111}},{"_typename":"TWebSnapshot","fUniqueID":0,"fBits":0,"fObjectID":"","fOption":"blNDC","fKind":1,"fSnapshot":{"_typename":"TPaveText","fUniqueID":0,"fBits":9,"fLineColor":1,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":0,"fX1":650.436870806356,"fY1":2626.15503284357,"fX2":949.563129193644,"fY2":2798.10566296809,"fX1NDC":0.400291248690014,"fY1NDC":0.940000003948808,"fX2NDC":0.599708751309986,"fY2NDC":0.995000004768372,"fBorderSize":0,"fInit":1,"fShadowColor":1,"fCornerRadius":0,"fOption":"blNDC","fName":"title","fTextAngle":0,"fTextSize":0,"fTextAlign":22,"fTextColor":1,"fTextFont":42,"fLabel":"","fLongest":7,"fMargin":0.05,"fLines":{"_typename":"TList","name":"TList","arr":[{"_typename":"TLatex","fUniqueID":0,"fBits":0,"fName":"","fTitle":"S3 data","fTextAngle":0,"fTextSize":0,"fTextAlign":0,"fTextColor":0,"fTextFont":0,"fX":0,"fY":0,"fLineColor":1,"fLineStyle":1,"fLineWidth":2,"fLimitFactorSize":3,"fOriginSize":0.0467500016093254}],"opt":[""]}}}]},{"_typename":"TPadWebSnapshot","fUniqueID":0,"fBits":0,"fObjectID":"","fOption":"","fKind":3,"fSnapshot":{"_typename":"TPad","fUniqueID":0,"fBits":9,"fLineColor":1,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":1001,"fLeftMargin":0.1,"fRightMargin":0.1,"fBottomMargin":0.1,"fTopMargin":0.1,"fXfile":2,"fYfile":2,"fAfile":1,"fXstat":0.99,"fYstat":0.99,"fAstat":2,"fFrameFillColor":0,"fFrameLineColor":1,"fFrameFillStyle":1001,"fFrameLineStyle":1,"fFrameLineWidth":1,"fFrameBorderSize":1,"fFrameBorderMode":0,"fX1":49.9999888241285,"fY1":-244.912518247404,"fX2":1550.00001117587,"fY2":2204.2125182474,"fXtoAbsPixelk":-7.17594572277049,"fXtoPixelk":-19.1359454554437,"fXtoPixel":0.382719994653463,"fYtoAbsPixelk":1104.02404685645,"fYtoPixelk":506.304047118413,"fYtoPixel":-0.229698358450927,"fUtoAbsPixelk":11.9600497326732,"fUtoPixelk":5e-5,"fUtoPixel":574.080000534654,"fVtoAbsPixelk":1160.28005026196,"fVtoPixelk":562.560000523925,"fVtoPixel":-562.560000523925,"fAbsPixeltoXk":18.7499890860629,"fPixeltoXk":49.9999888241285,"fPixeltoX":2.61287629068206,"fAbsPixeltoYk":4806.40786595919,"fPixeltoYk":-244.912518247404,"fPixeltoY":-4.35353568368509,"fXlowNDC":0.00999999977648258,"fYlowNDC":0.00999999977648258,"fXUpNDC":0.490000000223517,"fYUpNDC":0.490000000223517,"fWNDC":0.480000000447035,"fHNDC":0.480000000447035,"fAbsXlowNDC":0.00999999977648258,"fAbsYlowNDC":0.00999999977648258,"fAbsWNDC":0.480000000447035,"fAbsHNDC":0.480000000447035,"fUxmin":200,"fUymin":0,"fUxmax":1400,"fUymax":1959.3,"fTheta":30,"fPhi":30,"fAspectRatio":0,"fNumber":3,"fTickx":0,"fTicky":0,"fLogx":0,"fLogy":0,"fLogz":0,"fPadPaint":0,"fCrosshair":0,"fCrosshairPos":0,"fBorderSize":2,"fBorderMode":0,"fModified":false,"fGridx":false,"fGridy":false,"fAbsCoord":false,"fEditable":true,"fFixedAspectRatio":false,"fPrimitives":{"_typename":"TList","name":"TList","arr":[],"opt":[]},"fExecs":{"_typename":"TList","name":"TList","arr":[],"opt":[]},"fName":"c0_3","fTitle":"c0_3","fNumPaletteColor":0,"fNextPaletteColor":0},"fActive":false,"fReadOnly":true,"fWithoutPrimitives":false,"fHasExecs":true,"fPrimitives":[{"_typename":"TWebSnapshot","fUniqueID":0,"fBits":0,"fObjectID":"","fOption":"","fKind":1,"fSnapshot":{"_typename":"TFrame","fUniqueID":0,"fBits":8,"fLineColor":1,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":1001,"fX1":200,"fY1":0,"fX2":1400,"fY2":1959.3,"fBorderSize":1,"fBorderMode":0}},{"_typename":"TWebSnapshot","fUniqueID":0,"fBits":0,"fObjectID":"","fOption":"nostack","fKind":1,"fSnapshot":{"_typename":"THStack","fUniqueID":0,"fBits":8,"fName":"stack2","fTitle":"CAL17 data","fHists":{"_typename":"TList","name":"TList","arr":[{"_typename":"TH1D","fUniqueID":0,"fBits":8,"fName":"QDC0_ch02","fTitle":"+1 GeV\/c muons","fLineColor":2,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":1001,"fMarkerColor":1,"fMarkerStyle":1,"fMarkerSize":1,"fNcells":822,"fXaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"xaxis","fTitle":"Charge in QDC counts","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":820,"fXmin":0,"fXmax":4100,"fXbins":[],"fFirst":1,"fLast":820,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fYaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"yaxis","fTitle":"# Events","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":0,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":1,"fXmin":0,"fXmax":1,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fZaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"zaxis","fTitle":"","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":1,"fXmin":0,"fXmax":1,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fBarOffset":0,"fBarWidth":1000,"fEntries":15023,"fTsumw":15023,"fTsumw2":15023,"fTsumwx":12931105,"fTsumwx2":11141366619,"fMaximum":-1111,"fMinimum":-1111,"fNormFactor":0,"fContour":[],"fSumw2":[],"fOption":"","fFunctions":{"_typename":"TList","name":"TList","arr":[],"opt":[]},"fBufferSize":0,"fBuffer":[],"fBinStatErrOpt":0,"fStatOverflows":2,"fArray":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,4,6,9,33,41,52,101,132,155,237,287,345,487,568,653,786,894,1012,1155,1155,1199,1120,985,840,716,601,437,329,248,153,105,69,55,18,16,7,2,2,1,0,2,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{"_typename":"TH1D","fUniqueID":0,"fBits":8,"fName":"QDC0_ch02","fTitle":"-1 GeV\/c mixed, absorber","fLineColor":9,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":1001,"fMarkerColor":1,"fMarkerStyle":1,"fMarkerSize":1,"fNcells":822,"fXaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"xaxis","fTitle":"Charge in QDC counts","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":820,"fXmin":0,"fXmax":4100,"fXbins":[],"fFirst":1,"fLast":820,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fYaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"yaxis","fTitle":"# Events","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":0,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":1,"fXmin":0,"fXmax":1,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fZaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"zaxis","fTitle":"","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":1,"fXmin":0,"fXmax":1,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fBarOffset":0,"fBarWidth":1000,"fEntries":6529,"fTsumw":6529,"fTsumw2":6529,"fTsumwx":5438168,"fTsumwx2":4545681806,"fMaximum":-1111,"fMinimum":-1111,"fNormFactor":0,"fContour":[],"fSumw2":[],"fOption":"","fFunctions":{"_typename":"TList","name":"TList","arr":[],"opt":[]},"fBufferSize":0,"fBuffer":[],"fBinStatErrOpt":0,"fStatOverflows":2,"fArray":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,3,2,8,8,10,21,31,57,69,71,110,109,124,160,171,176,191,218,210,242,232,229,268,212,239,239,265,231,247,246,234,214,208,206,178,144,132,113,115,83,71,70,64,43,37,38,29,30,20,23,12,8,12,7,4,6,6,0,4,2,3,1,1,0,0,1,2,1,3,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{"_typename":"TH1D","fUniqueID":0,"fBits":8,"fName":"QDC0_ch02","fTitle":"-1 GeV\/c mixed, no absorber","fLineColor":8,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":1001,"fMarkerColor":1,"fMarkerStyle":1,"fMarkerSize":1,"fNcells":822,"fXaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"xaxis","fTitle":"Charge in QDC counts","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":820,"fXmin":0,"fXmax":4100,"fXbins":[],"fFirst":1,"fLast":820,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fYaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"yaxis","fTitle":"# Events","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":0,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":1,"fXmin":0,"fXmax":1,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fZaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"zaxis","fTitle":"","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":1,"fXmin":0,"fXmax":1,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fBarOffset":0,"fBarWidth":1000,"fEntries":56630,"fTsumw":56630,"fTsumw2":56630,"fTsumwx":55270494,"fTsumwx2":54510395142,"fMaximum":-1111,"fMinimum":-1111,"fNormFactor":0,"fContour":[],"fSumw2":[],"fOption":"","fFunctions":{"_typename":"TList","name":"TList","arr":[],"opt":[]},"fBufferSize":0,"fBuffer":[],"fBinStatErrOpt":0,"fStatOverflows":2,"fArray":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,3,10,8,20,24,37,44,69,85,118,167,173,211,225,277,314,320,296,364,342,353,387,389,321,319,313,323,347,310,348,271,327,329,306,324,357,388,348,345,368,364,359,347,402,391,369,416,416,414,393,431,476,439,507,526,571,625,633,727,824,875,983,1014,1149,1263,1379,1424,1587,1623,1755,1782,1842,1858,1866,1739,1705,1714,1588,1440,1324,1177,1004,885,750,683,518,481,392,329,217,179,171,91,75,66,44,32,22,20,13,6,4,7,2,2,4,0,0,4,1,0,1,1,0,2,1,3,2,1,1,1,1,3,0,0,0,1,2,0,0,2,0,1,2,0,1,0,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}],"opt":["","",""]},"fHistogram":{"_typename":"TH1F","fUniqueID":0,"fBits":512,"fName":"stack2","fTitle":"CAL17 data","fLineColor":602,"fLineStyle":1,"fLineWidth":0,"fFillColor":0,"fFillStyle":1001,"fMarkerColor":1,"fMarkerStyle":1,"fMarkerSize":1,"fNcells":822,"fXaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"xaxis","fTitle":"QDC count","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":820,"fXmin":200,"fXmax":1400,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fYaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"yaxis","fTitle":"#Occurances","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":0,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":1,"fXmin":0,"fXmax":1,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fZaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"zaxis","fTitle":"","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":1,"fXmin":0,"fXmax":1,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fBarOffset":0,"fBarWidth":1000,"fEntries":0,"fTsumw":0,"fTsumw2":0,"fTsumwx":0,"fTsumwx2":0,"fMaximum":1959.3,"fMinimum":0,"fNormFactor":0,"fContour":[],"fSumw2":[],"fOption":"","fFunctions":{"_typename":"TList","name":"TList","arr":[],"opt":[]},"fBufferSize":0,"fBuffer":[],"fBinStatErrOpt":0,"fStatOverflows":2,"fArray":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"fMaximum":-1111,"fMinimum":-1111}},{"_typename":"TWebSnapshot","fUniqueID":0,"fBits":0,"fObjectID":"","fOption":"blNDC","fKind":1,"fSnapshot":{"_typename":"TPaveText","fUniqueID":0,"fBits":9,"fLineColor":1,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":0,"fX1":577.276334667259,"fY1":2057.26502572884,"fX2":1022.72366533274,"fY2":2191.96690474327,"fX1NDC":0.3515175586574,"fY1NDC":0.940000003948808,"fX2NDC":0.6484824413426,"fY2NDC":0.995000004768372,"fBorderSize":0,"fInit":1,"fShadowColor":1,"fCornerRadius":0,"fOption":"blNDC","fName":"title","fTextAngle":0,"fTextSize":0,"fTextAlign":22,"fTextColor":1,"fTextFont":42,"fLabel":"","fLongest":10,"fMargin":0.05,"fLines":{"_typename":"TList","name":"TList","arr":[{"_typename":"TLatex","fUniqueID":0,"fBits":0,"fName":"","fTitle":"CAL17 data","fTextAngle":0,"fTextSize":0,"fTextAlign":0,"fTextColor":0,"fTextFont":0,"fX":0,"fY":0,"fLineColor":1,"fLineStyle":1,"fLineWidth":2,"fLimitFactorSize":3,"fOriginSize":0.0467500016093254}],"opt":[""]}}}]},{"_typename":"TPadWebSnapshot","fUniqueID":0,"fBits":0,"fObjectID":"","fOption":"","fKind":3,"fSnapshot":{"_typename":"TPad","fUniqueID":0,"fBits":9,"fLineColor":1,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":1001,"fLeftMargin":0.1,"fRightMargin":0.1,"fBottomMargin":0.1,"fTopMargin":0.1,"fXfile":2,"fYfile":2,"fAfile":1,"fXstat":0.99,"fYstat":0.99,"fAstat":2,"fFrameFillColor":0,"fFrameLineColor":1,"fFrameFillStyle":1001,"fFrameLineStyle":1,"fFrameLineWidth":1,"fFrameBorderSize":1,"fFrameBorderMode":0,"fX1":0,"fY1":0,"fX2":1,"fY2":1,"fXtoAbsPixelk":609.960049732673,"fXtoPixelk":5e-5,"fXtoPixel":574.080000534654,"fYtoAbsPixelk":1160.28005026196,"fYtoPixelk":562.560050523925,"fYtoPixel":-562.560000523925,"fUtoAbsPixelk":609.960049732673,"fUtoPixelk":5e-5,"fUtoPixel":574.080000534654,"fVtoAbsPixelk":1160.28005026196,"fVtoPixelk":562.560000523925,"fVtoPixel":-562.560000523925,"fAbsPixeltoXk":-1.06249999854481,"fPixeltoXk":0,"fPixeltoX":0.00174191750116478,"fAbsPixeltoYk":2.06249999854481,"fPixeltoYk":0,"fPixeltoY":-0.00177758816671764,"fXlowNDC":0.509999999776483,"fYlowNDC":0.00999999977648258,"fXUpNDC":0.990000000223517,"fYUpNDC":0.490000000223517,"fWNDC":0.480000000447035,"fHNDC":0.480000000447035,"fAbsXlowNDC":0.509999999776483,"fAbsYlowNDC":0.00999999977648258,"fAbsWNDC":0.480000000447035,"fAbsHNDC":0.480000000447035,"fUxmin":0,"fUymin":0,"fUxmax":1,"fUymax":1,"fTheta":30,"fPhi":30,"fAspectRatio":0,"fNumber":4,"fTickx":0,"fTicky":0,"fLogx":0,"fLogy":0,"fLogz":0,"fPadPaint":0,"fCrosshair":0,"fCrosshairPos":0,"fBorderSize":2,"fBorderMode":0,"fModified":false,"fGridx":false,"fGridy":false,"fAbsCoord":false,"fEditable":true,"fFixedAspectRatio":false,"fPrimitives":{"_typename":"TList","name":"TList","arr":[],"opt":[]},"fExecs":{"_typename":"TList","name":"TList","arr":[],"opt":[]},"fName":"c0_4","fTitle":"c0_4","fNumPaletteColor":0,"fNextPaletteColor":0},"fActive":false,"fReadOnly":true,"fWithoutPrimitives":false,"fHasExecs":true,"fPrimitives":[{"_typename":"TWebSnapshot","fUniqueID":0,"fBits":0,"fObjectID":"","fOption":"","fKind":1,"fSnapshot":{"_typename":"TLegend","fUniqueID":0,"fBits":8,"fLineColor":1,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":1001,"fX1":0.1,"fY1":0.1,"fX2":0.9,"fY2":0.9,"fX1NDC":0.1,"fY1NDC":0.1,"fX2NDC":0.9,"fY2NDC":0.9,"fBorderSize":1,"fInit":1,"fShadowColor":1,"fCornerRadius":0,"fOption":"brNDC","fName":"TPave","fTextAngle":0,"fTextSize":0.04,"fTextAlign":12,"fTextColor":1,"fTextFont":42,"fPrimitives":{"_typename":"TList","name":"TList","arr":[{"_typename":"TLegendEntry","fUniqueID":0,"fBits":0,"fTextAngle":0,"fTextSize":0,"fTextAlign":0,"fTextColor":0,"fTextFont":42,"fLineColor":1,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":0,"fMarkerColor":1,"fMarkerStyle":21,"fMarkerSize":1,"fObject":null,"fLabel":"Legend","fOption":"h"},{"_typename":"TLegendEntry","fUniqueID":0,"fBits":0,"fTextAngle":0,"fTextSize":0,"fTextAlign":0,"fTextColor":0,"fTextFont":42,"fLineColor":2,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":1001,"fMarkerColor":1,"fMarkerStyle":1,"fMarkerSize":1,"fObject":{"$ref":21},"fLabel":"1722164897: +1 GeV muons","fOption":"lpf"},{"_typename":"TLegendEntry","fUniqueID":0,"fBits":0,"fTextAngle":0,"fTextSize":0,"fTextAlign":0,"fTextColor":0,"fTextFont":42,"fLineColor":9,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":1001,"fMarkerColor":1,"fMarkerStyle":1,"fMarkerSize":1,"fObject":{"$ref":26},"fLabel":"1722172954: -1 GeV mixed, absorber","fOption":"lpf"},{"_typename":"TLegendEntry","fUniqueID":0,"fBits":0,"fTextAngle":0,"fTextSize":0,"fTextAlign":0,"fTextColor":0,"fTextFont":42,"fLineColor":8,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":1001,"fMarkerColor":1,"fMarkerStyle":1,"fMarkerSize":1,"fObject":{"$ref":31},"fLabel":"1722178299: -1 GeV mixed, no absorber","fOption":"lpf"}],"opt":["h","lpf","lpf","lpf"]},"fEntrySeparation":0.1,"fMargin":0.25,"fNColumns":1,"fColumnSeparation":0}}]}],"fScripts":"","fHighlightConnect":false,"fFixedSize":false});
   Core.settings.HandleKeys = false;
   Core.draw("root_plot_1722867144758", obj, "");
}

function script_load_root_plot_1722867144758(src, on_error) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = function() { display_root_plot_1722867144758(JSROOT); };
    script.onerror = function() { script.remove(); on_error(); };
    document.head.appendChild(script);
}

if (typeof requirejs !== 'undefined') {

    // We are in jupyter notebooks, use require.js which should be configured already
    requirejs.config({
       paths: { 'JSRootCore' : [ 'build/jsroot', 'https://root.cern/js/7.4.3/build/jsroot', 'https://jsroot.gsi.de/7.4.3/build/jsroot' ] }
    })(['JSRootCore'],  function(Core) {
       display_root_plot_1722867144758(Core);
    });

} else if (typeof JSROOT !== 'undefined') {

   // JSROOT already loaded, just use it
   display_root_plot_1722867144758(JSROOT);

} else {

    // We are in jupyterlab without require.js, directly loading jsroot
    // Jupyterlab might be installed in a different base_url so we need to know it.
    try {
        var base_url = JSON.parse(document.getElementById('jupyter-config-data').innerHTML).baseUrl;
    } catch(_) {
        var base_url = '/';
    }

    // Try loading a local version of requirejs and fallback to cdn if not possible.
    script_load_root_plot_1722867144758(base_url + 'static/build/jsroot.js', function(){
        console.error('Fail to load JSROOT locally, please check your jupyter_notebook_config.py file');
        script_load_root_plot_1722867144758('https://root.cern/js/7.4.3/build/jsroot.js', function(){
            document.getElementById("root_plot_1722867144758").innerHTML = "Failed to load JSROOT";
        });
    });
}

</script>



**Some Notes, Observations And Comments**

1) Instead of copy pasting the code that sets up the canvas and draws the histograms, it may be a good idea to define a helper function that takes this over and allows to reuse the code

2) For S2 and S3, the data looks somewhat similar, the main difference (at least according to the Landau distribution) seems to be the amplitude. For the Cal17, the distribution looks very much differently - the interaction with the lead crystal is not comparable to the interaction of the beam with the plastic scintillator!

3) We have only looked at the resulting histogram. As such, we have no idea which particles contributed to which part of the distribution (and if the green and the blue curve would become more similar if we would, for example, "filter" out the electrons from the green distribution, similar to what we do with an absorber).

**POSSIBLE TODO**:
In case you want to try something yourself, maybe you can create a different summary plot, where we compare the results of all three detectors S2, S3 and CAL17 in one histogramm per run?

### Working with Raw Data Files

Let's have a look at the **raw data** file for run ´1722178299´ which contains the results from the green curves above:


```python
path_no_abs = path_to_datafiles / Path("1722178299.root")
raw_no_absorber = ROOT.TFile(str(path_no_abs.absolute()))
```


```python
raw_no_absorber.ls()
```

    TFile**		/eos/project/b/bl4s/Technics&Physics/2024/Data/T10July/2024/T10July/root/1722178299.root	
     TFile*		/eos/project/b/bl4s/Technics&Physics/2024/Data/T10July/2024/T10July/root/1722178299.root	
      KEY: TTree	RAWdata;1	BL4S RAW data tree
      KEY: TTree	RECOdata;1	BL4S RECO data tree


We have two trees in this root file:
- the "RAW data tree" containing, and you will never guess it, the raw data
- the "RECO tree" which contains "reconstructed" data

the RECO tree is similar in idea to the data we got from the monitor files (i.e., it's mostly graphs and histograms) but the plots and graphs in this section are created from a different part in our software. We would recommend to use the monitor files in case you need to take an overview instead of using the RECO tree.


```python
rawdata = raw_no_absorber.Get("RAWdata")
```

Beforew we dive into the ROOT "Rawdata" tree, let's briefly talk about some structures and some ideas regarding ROOT:

- ROOT heavily uses a "tree" metaphor. 
    - Different data channels (and different ways to look at the same data) are organised in **branches** (think of this as the columns in a spreadsheet or the attributes in a database)
    - The data stored in the branches are called **leaves** (think of these as the values that you fill into a spreadsheet or into a database)
    
- Every time our Software receives a trigger pulse, a new **event** is created. What we call event, ROOT calls an **entry**
    - The data belonging to one event is grouped together using the ID of the event/entry. Think of this as the rows in a spreadsheet or the entries in a database
    - The main purpose of running a DAQ system like ours is to 
        - fetch data from different sources
        - group the sources together based upon the event ID / entry number
        - store the data in this structured fashion to disk
        - grouping things together by event/entry is called **event building**.
    
- There are further structures and concepts (Chains, Baskets, Series, etc.)
    - But we will happily ignore those concepts until a later time (if we need them).


So, for a simple tree with only three branches `A`, `B`, and `C`, the picture could look a little bit like this:

![root_branches_leafs_events-2.png](tut2_files/root_branches_leafs_events-2.png)


The data structures that ROOT can handle can be a lot more complicated. But our case already looks a little bit like the picture above (at least if we limit ourselves to the branches that we are actually interested in)


```python
rawdata.Print()
```

    ******************************************************************************
    *Tree    :RAWdata   : BL4S RAW data tree                                     *
    *Entries :    56630 : Total =       107036799 bytes  File  Size =    5639581 *
    *        :          : Tree compression factor =  19.11                       *
    ******************************************************************************
    *Br    0 :QDC0_ch0  : QDC0_ch0/i                                             *
    *Entries :    56630 : Total  Size=     227641 bytes  File Size  =     108979 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=   2.08     *
    *............................................................................*
    *Br    1 :QDC0_ch0_OF : QDC0_ch0_OF/b                                        *
    *Entries :    56630 : Total  Size=      57295 bytes  File Size  =        474 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.81     *
    *............................................................................*
    *Br    2 :QDC0_ch0_UT : QDC0_ch0_UT/b                                        *
    *Entries :    56630 : Total  Size=      57295 bytes  File Size  =        474 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.81     *
    *............................................................................*
    *Br    3 :QDC0_ch0_valid : QDC0_ch0_valid/b                                  *
    *Entries :    56630 : Total  Size=      57313 bytes  File Size  =        480 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 118.33     *
    *............................................................................*
    *Br    4 :QDC0_ch1  : QDC0_ch1/i                                             *
    *Entries :    56630 : Total  Size=     227641 bytes  File Size  =     105365 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=   2.16     *
    *............................................................................*
    *Br    5 :QDC0_ch1_OF : QDC0_ch1_OF/b                                        *
    *Entries :    56630 : Total  Size=      57295 bytes  File Size  =        474 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.81     *
    *............................................................................*
    *Br    6 :QDC0_ch1_UT : QDC0_ch1_UT/b                                        *
    *Entries :    56630 : Total  Size=      57295 bytes  File Size  =        474 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.81     *
    *............................................................................*
    *Br    7 :QDC0_ch1_valid : QDC0_ch1_valid/b                                  *
    *Entries :    56630 : Total  Size=      57313 bytes  File Size  =        480 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 118.33     *
    *............................................................................*
    *Br    8 :QDC0_ch2  : QDC0_ch2/i                                             *
    *Entries :    56630 : Total  Size=     227641 bytes  File Size  =     107167 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=   2.12     *
    *............................................................................*
    *Br    9 :QDC0_ch2_OF : QDC0_ch2_OF/b                                        *
    *Entries :    56630 : Total  Size=      57295 bytes  File Size  =        474 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.81     *
    *............................................................................*
    *Br   10 :QDC0_ch2_UT : QDC0_ch2_UT/b                                        *
    *Entries :    56630 : Total  Size=      57295 bytes  File Size  =        474 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.81     *
    *............................................................................*
    *Br   11 :QDC0_ch2_valid : QDC0_ch2_valid/b                                  *
    *Entries :    56630 : Total  Size=      57313 bytes  File Size  =        480 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 118.33     *
    *............................................................................*
    *Br   12 :QDC0_ch3  : QDC0_ch3/i                                             *
    *Entries :    56630 : Total  Size=     227641 bytes  File Size  =      25123 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=   9.04     *
    *............................................................................*
    *Br   13 :QDC0_ch3_OF : QDC0_ch3_OF/b                                        *
    *Entries :    56630 : Total  Size=      57295 bytes  File Size  =        474 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.81     *
    *............................................................................*
    *Br   14 :QDC0_ch3_UT : QDC0_ch3_UT/b                                        *
    *Entries :    56630 : Total  Size=      57295 bytes  File Size  =        474 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.81     *
    *............................................................................*
    *Br   15 :QDC0_ch3_valid : QDC0_ch3_valid/b                                  *
    *Entries :    56630 : Total  Size=      57313 bytes  File Size  =        480 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 118.33     *
    *............................................................................*
    *Br   16 :QDC0_ch4  : QDC0_ch4/i                                             *
    *Entries :    56630 : Total  Size=     227641 bytes  File Size  =      24796 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=   9.16     *
    *............................................................................*
    *Br   17 :QDC0_ch4_OF : QDC0_ch4_OF/b                                        *
    *Entries :    56630 : Total  Size=      57295 bytes  File Size  =        474 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.81     *
    *............................................................................*
    *Br   18 :QDC0_ch4_UT : QDC0_ch4_UT/b                                        *
    *Entries :    56630 : Total  Size=      57295 bytes  File Size  =        474 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.81     *
    *............................................................................*
    *Br   19 :QDC0_ch4_valid : QDC0_ch4_valid/b                                  *
    *Entries :    56630 : Total  Size=      57313 bytes  File Size  =        480 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 118.33     *
    *............................................................................*
    *Br   20 :QDC0_ch5  : QDC0_ch5/i                                             *
    *Entries :    56630 : Total  Size=     227641 bytes  File Size  =      23119 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=   9.82     *
    *............................................................................*
    *Br   21 :QDC0_ch5_OF : QDC0_ch5_OF/b                                        *
    *Entries :    56630 : Total  Size=      57295 bytes  File Size  =        474 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.81     *
    *............................................................................*
    *Br   22 :QDC0_ch5_UT : QDC0_ch5_UT/b                                        *
    *Entries :    56630 : Total  Size=      57295 bytes  File Size  =        474 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.81     *
    *............................................................................*
    *Br   23 :QDC0_ch5_valid : QDC0_ch5_valid/b                                  *
    *Entries :    56630 : Total  Size=      57313 bytes  File Size  =        480 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 118.33     *
    *............................................................................*
    *Br   24 :QDC0_ch6  : QDC0_ch6/i                                             *
    *Entries :    56630 : Total  Size=     227641 bytes  File Size  =      22707 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  10.00     *
    *............................................................................*
    *Br   25 :QDC0_ch6_OF : QDC0_ch6_OF/b                                        *
    *Entries :    56630 : Total  Size=      57295 bytes  File Size  =        474 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.81     *
    *............................................................................*
    *Br   26 :QDC0_ch6_UT : QDC0_ch6_UT/b                                        *
    *Entries :    56630 : Total  Size=      57295 bytes  File Size  =        474 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.81     *
    *............................................................................*
    *Br   27 :QDC0_ch6_valid : QDC0_ch6_valid/b                                  *
    *Entries :    56630 : Total  Size=      57313 bytes  File Size  =        480 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 118.33     *
    *............................................................................*
    *Br   28 :QDC0_ch7  : QDC0_ch7/i                                             *
    *Entries :    56630 : Total  Size=     227641 bytes  File Size  =      24344 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=   9.33     *
    *............................................................................*
    *Br   29 :QDC0_ch7_OF : QDC0_ch7_OF/b                                        *
    *Entries :    56630 : Total  Size=      57295 bytes  File Size  =        474 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.81     *
    *............................................................................*
    *Br   30 :QDC0_ch7_UT : QDC0_ch7_UT/b                                        *
    *Entries :    56630 : Total  Size=      57295 bytes  File Size  =        474 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.81     *
    *............................................................................*
    *Br   31 :QDC0_ch7_valid : QDC0_ch7_valid/b                                  *
    *Entries :    56630 : Total  Size=      57313 bytes  File Size  =        480 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 118.33     *
    *............................................................................*
    *Br   32 :QDC0_ch8  : QDC0_ch8/i                                             *
    *Entries :    56630 : Total  Size=     227641 bytes  File Size  =      19011 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  11.95     *
    *............................................................................*
    *Br   33 :QDC0_ch8_OF : QDC0_ch8_OF/b                                        *
    *Entries :    56630 : Total  Size=      57295 bytes  File Size  =        474 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.81     *
    *............................................................................*
    *Br   34 :QDC0_ch8_UT : QDC0_ch8_UT/b                                        *
    *Entries :    56630 : Total  Size=      57295 bytes  File Size  =        474 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.81     *
    *............................................................................*
    *Br   35 :QDC0_ch8_valid : QDC0_ch8_valid/b                                  *
    *Entries :    56630 : Total  Size=      57313 bytes  File Size  =        480 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 118.33     *
    *............................................................................*
    *Br   36 :QDC0_ch9  : QDC0_ch9/i                                             *
    *Entries :    56630 : Total  Size=     227641 bytes  File Size  =      23209 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=   9.79     *
    *............................................................................*
    *Br   37 :QDC0_ch9_OF : QDC0_ch9_OF/b                                        *
    *Entries :    56630 : Total  Size=      57295 bytes  File Size  =        474 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.81     *
    *............................................................................*
    *Br   38 :QDC0_ch9_UT : QDC0_ch9_UT/b                                        *
    *Entries :    56630 : Total  Size=      57295 bytes  File Size  =        474 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.81     *
    *............................................................................*
    *Br   39 :QDC0_ch9_valid : QDC0_ch9_valid/b                                  *
    *Entries :    56630 : Total  Size=      57313 bytes  File Size  =        480 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 118.33     *
    *............................................................................*
    *Br   40 :QDC0_ch10 : QDC0_ch10/i                                            *
    *Entries :    56630 : Total  Size=     227653 bytes  File Size  =      19690 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  11.54     *
    *............................................................................*
    *Br   41 :QDC0_ch10_OF : QDC0_ch10_OF/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br   42 :QDC0_ch10_UT : QDC0_ch10_UT/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br   43 :QDC0_ch10_valid : QDC0_ch10_valid/b                                *
    *Entries :    56630 : Total  Size=      57319 bytes  File Size  =        482 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 117.84     *
    *............................................................................*
    *Br   44 :QDC0_ch11 : QDC0_ch11/i                                            *
    *Entries :    56630 : Total  Size=     227653 bytes  File Size  =      23993 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=   9.47     *
    *............................................................................*
    *Br   45 :QDC0_ch11_OF : QDC0_ch11_OF/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br   46 :QDC0_ch11_UT : QDC0_ch11_UT/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br   47 :QDC0_ch11_valid : QDC0_ch11_valid/b                                *
    *Entries :    56630 : Total  Size=      57319 bytes  File Size  =        482 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 117.84     *
    *............................................................................*
    *Br   48 :QDC0_ch12 : QDC0_ch12/i                                            *
    *Entries :    56630 : Total  Size=     227653 bytes  File Size  =      24153 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=   9.40     *
    *............................................................................*
    *Br   49 :QDC0_ch12_OF : QDC0_ch12_OF/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br   50 :QDC0_ch12_UT : QDC0_ch12_UT/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br   51 :QDC0_ch12_valid : QDC0_ch12_valid/b                                *
    *Entries :    56630 : Total  Size=      57319 bytes  File Size  =        482 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 117.84     *
    *............................................................................*
    *Br   52 :QDC0_ch13 : QDC0_ch13/i                                            *
    *Entries :    56630 : Total  Size=     227653 bytes  File Size  =      24394 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=   9.31     *
    *............................................................................*
    *Br   53 :QDC0_ch13_OF : QDC0_ch13_OF/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br   54 :QDC0_ch13_UT : QDC0_ch13_UT/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br   55 :QDC0_ch13_valid : QDC0_ch13_valid/b                                *
    *Entries :    56630 : Total  Size=      57319 bytes  File Size  =        482 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 117.84     *
    *............................................................................*
    *Br   56 :QDC0_ch14 : QDC0_ch14/i                                            *
    *Entries :    56630 : Total  Size=     227653 bytes  File Size  =      24010 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=   9.46     *
    *............................................................................*
    *Br   57 :QDC0_ch14_OF : QDC0_ch14_OF/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br   58 :QDC0_ch14_UT : QDC0_ch14_UT/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br   59 :QDC0_ch14_valid : QDC0_ch14_valid/b                                *
    *Entries :    56630 : Total  Size=      57319 bytes  File Size  =        482 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 117.84     *
    *............................................................................*
    *Br   60 :QDC0_ch15 : QDC0_ch15/i                                            *
    *Entries :    56630 : Total  Size=     227653 bytes  File Size  =      22835 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=   9.95     *
    *............................................................................*
    *Br   61 :QDC0_ch15_OF : QDC0_ch15_OF/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br   62 :QDC0_ch15_UT : QDC0_ch15_UT/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br   63 :QDC0_ch15_valid : QDC0_ch15_valid/b                                *
    *Entries :    56630 : Total  Size=      57319 bytes  File Size  =        482 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 117.84     *
    *............................................................................*
    *Br   64 :QDC0_ch16 : QDC0_ch16/i                                            *
    *Entries :    56630 : Total  Size=     227653 bytes  File Size  =      21012 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  10.81     *
    *............................................................................*
    *Br   65 :QDC0_ch16_OF : QDC0_ch16_OF/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br   66 :QDC0_ch16_UT : QDC0_ch16_UT/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br   67 :QDC0_ch16_valid : QDC0_ch16_valid/b                                *
    *Entries :    56630 : Total  Size=      57319 bytes  File Size  =        482 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 117.84     *
    *............................................................................*
    *Br   68 :QDC0_ch17 : QDC0_ch17/i                                            *
    *Entries :    56630 : Total  Size=     227653 bytes  File Size  =      18672 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  12.17     *
    *............................................................................*
    *Br   69 :QDC0_ch17_OF : QDC0_ch17_OF/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br   70 :QDC0_ch17_UT : QDC0_ch17_UT/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br   71 :QDC0_ch17_valid : QDC0_ch17_valid/b                                *
    *Entries :    56630 : Total  Size=      57319 bytes  File Size  =        482 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 117.84     *
    *............................................................................*
    *Br   72 :QDC0_ch18 : QDC0_ch18/i                                            *
    *Entries :    56630 : Total  Size=     227653 bytes  File Size  =      18071 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  12.57     *
    *............................................................................*
    *Br   73 :QDC0_ch18_OF : QDC0_ch18_OF/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br   74 :QDC0_ch18_UT : QDC0_ch18_UT/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br   75 :QDC0_ch18_valid : QDC0_ch18_valid/b                                *
    *Entries :    56630 : Total  Size=      57319 bytes  File Size  =        482 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 117.84     *
    *............................................................................*
    *Br   76 :QDC0_ch19 : QDC0_ch19/i                                            *
    *Entries :    56630 : Total  Size=     227653 bytes  File Size  =      20449 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  11.11     *
    *............................................................................*
    *Br   77 :QDC0_ch19_OF : QDC0_ch19_OF/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br   78 :QDC0_ch19_UT : QDC0_ch19_UT/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br   79 :QDC0_ch19_valid : QDC0_ch19_valid/b                                *
    *Entries :    56630 : Total  Size=      57319 bytes  File Size  =        482 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 117.84     *
    *............................................................................*
    *Br   80 :QDC0_ch20 : QDC0_ch20/i                                            *
    *Entries :    56630 : Total  Size=     227653 bytes  File Size  =      21978 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  10.34     *
    *............................................................................*
    *Br   81 :QDC0_ch20_OF : QDC0_ch20_OF/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br   82 :QDC0_ch20_UT : QDC0_ch20_UT/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br   83 :QDC0_ch20_valid : QDC0_ch20_valid/b                                *
    *Entries :    56630 : Total  Size=      57319 bytes  File Size  =        482 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 117.84     *
    *............................................................................*
    *Br   84 :QDC0_ch21 : QDC0_ch21/i                                            *
    *Entries :    56630 : Total  Size=     227653 bytes  File Size  =      23522 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=   9.66     *
    *............................................................................*
    *Br   85 :QDC0_ch21_OF : QDC0_ch21_OF/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br   86 :QDC0_ch21_UT : QDC0_ch21_UT/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br   87 :QDC0_ch21_valid : QDC0_ch21_valid/b                                *
    *Entries :    56630 : Total  Size=      57319 bytes  File Size  =        482 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 117.84     *
    *............................................................................*
    *Br   88 :QDC0_ch22 : QDC0_ch22/i                                            *
    *Entries :    56630 : Total  Size=     227653 bytes  File Size  =      17776 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  12.78     *
    *............................................................................*
    *Br   89 :QDC0_ch22_OF : QDC0_ch22_OF/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br   90 :QDC0_ch22_UT : QDC0_ch22_UT/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br   91 :QDC0_ch22_valid : QDC0_ch22_valid/b                                *
    *Entries :    56630 : Total  Size=      57319 bytes  File Size  =        482 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 117.84     *
    *............................................................................*
    *Br   92 :QDC0_ch23 : QDC0_ch23/i                                            *
    *Entries :    56630 : Total  Size=     227653 bytes  File Size  =      17567 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  12.93     *
    *............................................................................*
    *Br   93 :QDC0_ch23_OF : QDC0_ch23_OF/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br   94 :QDC0_ch23_UT : QDC0_ch23_UT/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br   95 :QDC0_ch23_valid : QDC0_ch23_valid/b                                *
    *Entries :    56630 : Total  Size=      57319 bytes  File Size  =        482 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 117.84     *
    *............................................................................*
    *Br   96 :QDC0_ch24 : QDC0_ch24/i                                            *
    *Entries :    56630 : Total  Size=     227653 bytes  File Size  =      22467 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  10.11     *
    *............................................................................*
    *Br   97 :QDC0_ch24_OF : QDC0_ch24_OF/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br   98 :QDC0_ch24_UT : QDC0_ch24_UT/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br   99 :QDC0_ch24_valid : QDC0_ch24_valid/b                                *
    *Entries :    56630 : Total  Size=      57319 bytes  File Size  =        482 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 117.84     *
    *............................................................................*
    *Br  100 :QDC0_ch25 : QDC0_ch25/i                                            *
    *Entries :    56630 : Total  Size=     227653 bytes  File Size  =      17311 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  13.12     *
    *............................................................................*
    *Br  101 :QDC0_ch25_OF : QDC0_ch25_OF/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br  102 :QDC0_ch25_UT : QDC0_ch25_UT/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br  103 :QDC0_ch25_valid : QDC0_ch25_valid/b                                *
    *Entries :    56630 : Total  Size=      57319 bytes  File Size  =        482 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 117.84     *
    *............................................................................*
    *Br  104 :QDC0_ch26 : QDC0_ch26/i                                            *
    *Entries :    56630 : Total  Size=     227653 bytes  File Size  =      19268 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  11.79     *
    *............................................................................*
    *Br  105 :QDC0_ch26_OF : QDC0_ch26_OF/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br  106 :QDC0_ch26_UT : QDC0_ch26_UT/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br  107 :QDC0_ch26_valid : QDC0_ch26_valid/b                                *
    *Entries :    56630 : Total  Size=      57319 bytes  File Size  =        482 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 117.84     *
    *............................................................................*
    *Br  108 :QDC0_ch27 : QDC0_ch27/i                                            *
    *Entries :    56630 : Total  Size=     227653 bytes  File Size  =      15412 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  14.74     *
    *............................................................................*
    *Br  109 :QDC0_ch27_OF : QDC0_ch27_OF/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br  110 :QDC0_ch27_UT : QDC0_ch27_UT/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br  111 :QDC0_ch27_valid : QDC0_ch27_valid/b                                *
    *Entries :    56630 : Total  Size=      57319 bytes  File Size  =        482 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 117.84     *
    *............................................................................*
    *Br  112 :QDC0_ch28 : QDC0_ch28/i                                            *
    *Entries :    56630 : Total  Size=     227653 bytes  File Size  =      23377 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=   9.72     *
    *............................................................................*
    *Br  113 :QDC0_ch28_OF : QDC0_ch28_OF/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br  114 :QDC0_ch28_UT : QDC0_ch28_UT/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br  115 :QDC0_ch28_valid : QDC0_ch28_valid/b                                *
    *Entries :    56630 : Total  Size=      57319 bytes  File Size  =        482 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 117.84     *
    *............................................................................*
    *Br  116 :QDC0_ch29 : QDC0_ch29/i                                            *
    *Entries :    56630 : Total  Size=     227653 bytes  File Size  =      20634 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  11.01     *
    *............................................................................*
    *Br  117 :QDC0_ch29_OF : QDC0_ch29_OF/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br  118 :QDC0_ch29_UT : QDC0_ch29_UT/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br  119 :QDC0_ch29_valid : QDC0_ch29_valid/b                                *
    *Entries :    56630 : Total  Size=      57319 bytes  File Size  =        482 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 117.84     *
    *............................................................................*
    *Br  120 :QDC0_ch30 : QDC0_ch30/i                                            *
    *Entries :    56630 : Total  Size=     227653 bytes  File Size  =      21003 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  10.82     *
    *............................................................................*
    *Br  121 :QDC0_ch30_OF : QDC0_ch30_OF/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br  122 :QDC0_ch30_UT : QDC0_ch30_UT/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br  123 :QDC0_ch30_valid : QDC0_ch30_valid/b                                *
    *Entries :    56630 : Total  Size=      57319 bytes  File Size  =        482 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 117.84     *
    *............................................................................*
    *Br  124 :QDC0_ch31 : QDC0_ch31/i                                            *
    *Entries :    56630 : Total  Size=     227653 bytes  File Size  =      18624 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  12.20     *
    *............................................................................*
    *Br  125 :QDC0_ch31_OF : QDC0_ch31_OF/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br  126 :QDC0_ch31_UT : QDC0_ch31_UT/b                                      *
    *Entries :    56630 : Total  Size=      57301 bytes  File Size  =        476 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.32     *
    *............................................................................*
    *Br  127 :QDC0_ch31_valid : QDC0_ch31_valid/b                                *
    *Entries :    56630 : Total  Size=      57319 bytes  File Size  =        482 *
    *Baskets :        2 : Basket Size=      32000 bytes  Compression= 117.84     *
    *............................................................................*
    *Br  128 :NTDC0_ch0 : UInt_t Number of entries in branch TDC0_ch0            *
    *Entries :    56630 : Total  Size=     227678 bytes  File Size  =      19598 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  11.59     *
    *............................................................................*
    *Br  129 :TDC0_ch0  : TDC0_ch0[NTDC0_ch0]/i                                  *
    *Entries :    56630 : Total  Size=     420631 bytes  File Size  =     180818 *
    *Baskets :       21 : Basket Size=      32000 bytes  Compression=   2.32     *
    *............................................................................*
    *Br  130 :NTDC0_ch0_leading :                                                *
    *         | UInt_t Number of entries in branch TDC0_ch0_leading              *
    *Entries :    56630 : Total  Size=     227774 bytes  File Size  =      19656 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  11.56     *
    *............................................................................*
    *Br  131 :TDC0_ch0_leading : TDC0_ch0_leading[NTDC0_ch0_leading]/i           *
    *Entries :    56630 : Total  Size=     420863 bytes  File Size  =     180981 *
    *Baskets :       21 : Basket Size=      32000 bytes  Compression=   2.32     *
    *............................................................................*
    *Br  132 :NTDC0_ch0_trailing :                                               *
    *         | UInt_t Number of entries in branch TDC0_ch0_trailing             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  133 :TDC0_ch0_trailing : TDC0_ch0_trailing[NTDC0_ch0_trailing]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  134 :NTDC0_ch1 : UInt_t Number of entries in branch TDC0_ch1            *
    *Entries :    56630 : Total  Size=     227678 bytes  File Size  =      19598 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  11.59     *
    *............................................................................*
    *Br  135 :TDC0_ch1  : TDC0_ch1[NTDC0_ch1]/i                                  *
    *Entries :    56630 : Total  Size=     420631 bytes  File Size  =     180799 *
    *Baskets :       21 : Basket Size=      32000 bytes  Compression=   2.32     *
    *............................................................................*
    *Br  136 :NTDC0_ch1_leading :                                                *
    *         | UInt_t Number of entries in branch TDC0_ch1_leading              *
    *Entries :    56630 : Total  Size=     227774 bytes  File Size  =      19656 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  11.56     *
    *............................................................................*
    *Br  137 :TDC0_ch1_leading : TDC0_ch1_leading[NTDC0_ch1_leading]/i           *
    *Entries :    56630 : Total  Size=     420863 bytes  File Size  =     180947 *
    *Baskets :       21 : Basket Size=      32000 bytes  Compression=   2.32     *
    *............................................................................*
    *Br  138 :NTDC0_ch1_trailing :                                               *
    *         | UInt_t Number of entries in branch TDC0_ch1_trailing             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  139 :TDC0_ch1_trailing : TDC0_ch1_trailing[NTDC0_ch1_trailing]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  140 :NTDC0_ch2 : UInt_t Number of entries in branch TDC0_ch2            *
    *Entries :    56630 : Total  Size=     227678 bytes  File Size  =       2406 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  94.41     *
    *............................................................................*
    *Br  141 :TDC0_ch2  : TDC0_ch2[NTDC0_ch2]/i                                  *
    *Entries :    56630 : Total  Size=     456113 bytes  File Size  =     201137 *
    *Baskets :       22 : Basket Size=      32000 bytes  Compression=   2.26     *
    *............................................................................*
    *Br  142 :NTDC0_ch2_leading :                                                *
    *         | UInt_t Number of entries in branch TDC0_ch2_leading              *
    *Entries :    56630 : Total  Size=     227774 bytes  File Size  =       2462 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  92.29     *
    *............................................................................*
    *Br  143 :TDC0_ch2_leading : TDC0_ch2_leading[NTDC0_ch2_leading]/i           *
    *Entries :    56630 : Total  Size=     456353 bytes  File Size  =     201290 *
    *Baskets :       22 : Basket Size=      32000 bytes  Compression=   2.26     *
    *............................................................................*
    *Br  144 :NTDC0_ch2_trailing :                                               *
    *         | UInt_t Number of entries in branch TDC0_ch2_trailing             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  145 :TDC0_ch2_trailing : TDC0_ch2_trailing[NTDC0_ch2_trailing]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  146 :NTDC0_ch3 : UInt_t Number of entries in branch TDC0_ch3            *
    *Entries :    56630 : Total  Size=     227678 bytes  File Size  =       5593 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  40.61     *
    *............................................................................*
    *Br  147 :TDC0_ch3  : TDC0_ch3[NTDC0_ch3]/i                                  *
    *Entries :    56630 : Total  Size=     233051 bytes  File Size  =      10518 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  22.09     *
    *............................................................................*
    *Br  148 :NTDC0_ch3_leading :                                                *
    *         | UInt_t Number of entries in branch TDC0_ch3_leading              *
    *Entries :    56630 : Total  Size=     227774 bytes  File Size  =       5660 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  40.14     *
    *............................................................................*
    *Br  149 :TDC0_ch3_leading : TDC0_ch3_leading[NTDC0_ch3_leading]/i           *
    *Entries :    56630 : Total  Size=     233235 bytes  File Size  =      10647 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  21.83     *
    *............................................................................*
    *Br  150 :NTDC0_ch3_trailing :                                               *
    *         | UInt_t Number of entries in branch TDC0_ch3_trailing             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  151 :TDC0_ch3_trailing : TDC0_ch3_trailing[NTDC0_ch3_trailing]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  152 :NTDC0_ch4 : UInt_t Number of entries in branch TDC0_ch4            *
    *Entries :    56630 : Total  Size=     227678 bytes  File Size  =       2315 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  98.12     *
    *............................................................................*
    *Br  153 :TDC0_ch4  : TDC0_ch4[NTDC0_ch4]/i                                  *
    *Entries :    56630 : Total  Size=     456029 bytes  File Size  =     200802 *
    *Baskets :       22 : Basket Size=      32000 bytes  Compression=   2.27     *
    *............................................................................*
    *Br  154 :NTDC0_ch4_leading :                                                *
    *         | UInt_t Number of entries in branch TDC0_ch4_leading              *
    *Entries :    56630 : Total  Size=     227774 bytes  File Size  =       2378 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  95.55     *
    *............................................................................*
    *Br  155 :TDC0_ch4_leading : TDC0_ch4_leading[NTDC0_ch4_leading]/i           *
    *Entries :    56630 : Total  Size=     456269 bytes  File Size  =     200982 *
    *Baskets :       22 : Basket Size=      32000 bytes  Compression=   2.27     *
    *............................................................................*
    *Br  156 :NTDC0_ch4_trailing :                                               *
    *         | UInt_t Number of entries in branch TDC0_ch4_trailing             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  157 :TDC0_ch4_trailing : TDC0_ch4_trailing[NTDC0_ch4_trailing]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  158 :NTDC0_ch5 : UInt_t Number of entries in branch TDC0_ch5            *
    *Entries :    56630 : Total  Size=     227678 bytes  File Size  =      10654 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  21.32     *
    *............................................................................*
    *Br  159 :TDC0_ch5  : TDC0_ch5[NTDC0_ch5]/i                                  *
    *Entries :    56630 : Total  Size=     444679 bytes  File Size  =     196252 *
    *Baskets :       21 : Basket Size=      32000 bytes  Compression=   2.26     *
    *............................................................................*
    *Br  160 :NTDC0_ch5_leading :                                                *
    *         | UInt_t Number of entries in branch TDC0_ch5_leading              *
    *Entries :    56630 : Total  Size=     227774 bytes  File Size  =      10719 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  21.20     *
    *............................................................................*
    *Br  161 :TDC0_ch5_leading : TDC0_ch5_leading[NTDC0_ch5_leading]/i           *
    *Entries :    56630 : Total  Size=     444911 bytes  File Size  =     196417 *
    *Baskets :       21 : Basket Size=      32000 bytes  Compression=   2.26     *
    *............................................................................*
    *Br  162 :NTDC0_ch5_trailing :                                               *
    *         | UInt_t Number of entries in branch TDC0_ch5_trailing             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  163 :TDC0_ch5_trailing : TDC0_ch5_trailing[NTDC0_ch5_trailing]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  164 :NTDC0_ch6 : UInt_t Number of entries in branch TDC0_ch6            *
    *Entries :    56630 : Total  Size=     227678 bytes  File Size  =      16981 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  13.38     *
    *............................................................................*
    *Br  165 :TDC0_ch6  : TDC0_ch6[NTDC0_ch6]/i                                  *
    *Entries :    56630 : Total  Size=     430347 bytes  File Size  =     187701 *
    *Baskets :       21 : Basket Size=      32000 bytes  Compression=   2.29     *
    *............................................................................*
    *Br  166 :NTDC0_ch6_leading :                                                *
    *         | UInt_t Number of entries in branch TDC0_ch6_leading              *
    *Entries :    56630 : Total  Size=     227774 bytes  File Size  =      17036 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  13.34     *
    *............................................................................*
    *Br  167 :TDC0_ch6_leading : TDC0_ch6_leading[NTDC0_ch6_leading]/i           *
    *Entries :    56630 : Total  Size=     430579 bytes  File Size  =     187808 *
    *Baskets :       21 : Basket Size=      32000 bytes  Compression=   2.29     *
    *............................................................................*
    *Br  168 :NTDC0_ch6_trailing :                                               *
    *         | UInt_t Number of entries in branch TDC0_ch6_trailing             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  169 :TDC0_ch6_trailing : TDC0_ch6_trailing[NTDC0_ch6_trailing]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  170 :NTDC0_ch7 : UInt_t Number of entries in branch TDC0_ch7            *
    *Entries :    56630 : Total  Size=     227678 bytes  File Size  =       1881 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.76     *
    *............................................................................*
    *Br  171 :TDC0_ch7  : TDC0_ch7[NTDC0_ch7]/i                                  *
    *Entries :    56630 : Total  Size=     228527 bytes  File Size  =       2878 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  79.16     *
    *............................................................................*
    *Br  172 :NTDC0_ch7_leading :                                                *
    *         | UInt_t Number of entries in branch TDC0_ch7_leading              *
    *Entries :    56630 : Total  Size=     227774 bytes  File Size  =       1946 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.76     *
    *............................................................................*
    *Br  173 :TDC0_ch7_leading : TDC0_ch7_leading[NTDC0_ch7_leading]/i           *
    *Entries :    56630 : Total  Size=     228711 bytes  File Size  =       2995 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  76.10     *
    *............................................................................*
    *Br  174 :NTDC0_ch7_trailing :                                               *
    *         | UInt_t Number of entries in branch TDC0_ch7_trailing             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  175 :TDC0_ch7_trailing : TDC0_ch7_trailing[NTDC0_ch7_trailing]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  176 :NTDC0_ch8 : UInt_t Number of entries in branch TDC0_ch8            *
    *Entries :    56630 : Total  Size=     227678 bytes  File Size  =       1881 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.76     *
    *............................................................................*
    *Br  177 :TDC0_ch8  : TDC0_ch8[NTDC0_ch8]/i                                  *
    *Entries :    56630 : Total  Size=     228527 bytes  File Size  =       2878 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  79.16     *
    *............................................................................*
    *Br  178 :NTDC0_ch8_leading :                                                *
    *         | UInt_t Number of entries in branch TDC0_ch8_leading              *
    *Entries :    56630 : Total  Size=     227774 bytes  File Size  =       1946 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.76     *
    *............................................................................*
    *Br  179 :TDC0_ch8_leading : TDC0_ch8_leading[NTDC0_ch8_leading]/i           *
    *Entries :    56630 : Total  Size=     228711 bytes  File Size  =       2995 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  76.10     *
    *............................................................................*
    *Br  180 :NTDC0_ch8_trailing :                                               *
    *         | UInt_t Number of entries in branch TDC0_ch8_trailing             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  181 :TDC0_ch8_trailing : TDC0_ch8_trailing[NTDC0_ch8_trailing]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  182 :NTDC0_ch9 : UInt_t Number of entries in branch TDC0_ch9            *
    *Entries :    56630 : Total  Size=     227678 bytes  File Size  =       1881 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.76     *
    *............................................................................*
    *Br  183 :TDC0_ch9  : TDC0_ch9[NTDC0_ch9]/i                                  *
    *Entries :    56630 : Total  Size=     228527 bytes  File Size  =       2878 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  79.16     *
    *............................................................................*
    *Br  184 :NTDC0_ch9_leading :                                                *
    *         | UInt_t Number of entries in branch TDC0_ch9_leading              *
    *Entries :    56630 : Total  Size=     227774 bytes  File Size  =       1946 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.76     *
    *............................................................................*
    *Br  185 :TDC0_ch9_leading : TDC0_ch9_leading[NTDC0_ch9_leading]/i           *
    *Entries :    56630 : Total  Size=     228711 bytes  File Size  =       2995 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  76.10     *
    *............................................................................*
    *Br  186 :NTDC0_ch9_trailing :                                               *
    *         | UInt_t Number of entries in branch TDC0_ch9_trailing             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  187 :TDC0_ch9_trailing : TDC0_ch9_trailing[NTDC0_ch9_trailing]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  188 :NTDC0_ch10 : UInt_t Number of entries in branch TDC0_ch10          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  189 :TDC0_ch10 : TDC0_ch10[NTDC0_ch10]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  190 :NTDC0_ch10_leading :                                               *
    *         | UInt_t Number of entries in branch TDC0_ch10_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  191 :TDC0_ch10_leading : TDC0_ch10_leading[NTDC0_ch10_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  192 :NTDC0_ch10_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC0_ch10_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  193 :TDC0_ch10_trailing : TDC0_ch10_trailing[NTDC0_ch10_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  194 :NTDC0_ch11 : UInt_t Number of entries in branch TDC0_ch11          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  195 :TDC0_ch11 : TDC0_ch11[NTDC0_ch11]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  196 :NTDC0_ch11_leading :                                               *
    *         | UInt_t Number of entries in branch TDC0_ch11_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  197 :TDC0_ch11_leading : TDC0_ch11_leading[NTDC0_ch11_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  198 :NTDC0_ch11_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC0_ch11_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  199 :TDC0_ch11_trailing : TDC0_ch11_trailing[NTDC0_ch11_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  200 :NTDC0_ch12 : UInt_t Number of entries in branch TDC0_ch12          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  201 :TDC0_ch12 : TDC0_ch12[NTDC0_ch12]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  202 :NTDC0_ch12_leading :                                               *
    *         | UInt_t Number of entries in branch TDC0_ch12_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  203 :TDC0_ch12_leading : TDC0_ch12_leading[NTDC0_ch12_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  204 :NTDC0_ch12_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC0_ch12_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  205 :TDC0_ch12_trailing : TDC0_ch12_trailing[NTDC0_ch12_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  206 :NTDC0_ch13 : UInt_t Number of entries in branch TDC0_ch13          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  207 :TDC0_ch13 : TDC0_ch13[NTDC0_ch13]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  208 :NTDC0_ch13_leading :                                               *
    *         | UInt_t Number of entries in branch TDC0_ch13_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  209 :TDC0_ch13_leading : TDC0_ch13_leading[NTDC0_ch13_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  210 :NTDC0_ch13_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC0_ch13_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  211 :TDC0_ch13_trailing : TDC0_ch13_trailing[NTDC0_ch13_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  212 :NTDC0_ch14 : UInt_t Number of entries in branch TDC0_ch14          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  213 :TDC0_ch14 : TDC0_ch14[NTDC0_ch14]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  214 :NTDC0_ch14_leading :                                               *
    *         | UInt_t Number of entries in branch TDC0_ch14_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  215 :TDC0_ch14_leading : TDC0_ch14_leading[NTDC0_ch14_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  216 :NTDC0_ch14_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC0_ch14_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  217 :TDC0_ch14_trailing : TDC0_ch14_trailing[NTDC0_ch14_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  218 :NTDC0_ch15 : UInt_t Number of entries in branch TDC0_ch15          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  219 :TDC0_ch15 : TDC0_ch15[NTDC0_ch15]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  220 :NTDC0_ch15_leading :                                               *
    *         | UInt_t Number of entries in branch TDC0_ch15_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  221 :TDC0_ch15_leading : TDC0_ch15_leading[NTDC0_ch15_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  222 :NTDC0_ch15_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC0_ch15_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  223 :TDC0_ch15_trailing : TDC0_ch15_trailing[NTDC0_ch15_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  224 :NTDC0_ch16 : UInt_t Number of entries in branch TDC0_ch16          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  225 :TDC0_ch16 : TDC0_ch16[NTDC0_ch16]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  226 :NTDC0_ch16_leading :                                               *
    *         | UInt_t Number of entries in branch TDC0_ch16_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  227 :TDC0_ch16_leading : TDC0_ch16_leading[NTDC0_ch16_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  228 :NTDC0_ch16_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC0_ch16_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  229 :TDC0_ch16_trailing : TDC0_ch16_trailing[NTDC0_ch16_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  230 :NTDC0_ch17 : UInt_t Number of entries in branch TDC0_ch17          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  231 :TDC0_ch17 : TDC0_ch17[NTDC0_ch17]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  232 :NTDC0_ch17_leading :                                               *
    *         | UInt_t Number of entries in branch TDC0_ch17_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  233 :TDC0_ch17_leading : TDC0_ch17_leading[NTDC0_ch17_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  234 :NTDC0_ch17_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC0_ch17_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  235 :TDC0_ch17_trailing : TDC0_ch17_trailing[NTDC0_ch17_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  236 :NTDC0_ch18 : UInt_t Number of entries in branch TDC0_ch18          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  237 :TDC0_ch18 : TDC0_ch18[NTDC0_ch18]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  238 :NTDC0_ch18_leading :                                               *
    *         | UInt_t Number of entries in branch TDC0_ch18_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  239 :TDC0_ch18_leading : TDC0_ch18_leading[NTDC0_ch18_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  240 :NTDC0_ch18_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC0_ch18_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  241 :TDC0_ch18_trailing : TDC0_ch18_trailing[NTDC0_ch18_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  242 :NTDC0_ch19 : UInt_t Number of entries in branch TDC0_ch19          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  243 :TDC0_ch19 : TDC0_ch19[NTDC0_ch19]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  244 :NTDC0_ch19_leading :                                               *
    *         | UInt_t Number of entries in branch TDC0_ch19_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  245 :TDC0_ch19_leading : TDC0_ch19_leading[NTDC0_ch19_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  246 :NTDC0_ch19_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC0_ch19_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  247 :TDC0_ch19_trailing : TDC0_ch19_trailing[NTDC0_ch19_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  248 :NTDC0_ch20 : UInt_t Number of entries in branch TDC0_ch20          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  249 :TDC0_ch20 : TDC0_ch20[NTDC0_ch20]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  250 :NTDC0_ch20_leading :                                               *
    *         | UInt_t Number of entries in branch TDC0_ch20_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  251 :TDC0_ch20_leading : TDC0_ch20_leading[NTDC0_ch20_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  252 :NTDC0_ch20_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC0_ch20_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  253 :TDC0_ch20_trailing : TDC0_ch20_trailing[NTDC0_ch20_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  254 :NTDC0_ch21 : UInt_t Number of entries in branch TDC0_ch21          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  255 :TDC0_ch21 : TDC0_ch21[NTDC0_ch21]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  256 :NTDC0_ch21_leading :                                               *
    *         | UInt_t Number of entries in branch TDC0_ch21_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  257 :TDC0_ch21_leading : TDC0_ch21_leading[NTDC0_ch21_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  258 :NTDC0_ch21_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC0_ch21_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  259 :TDC0_ch21_trailing : TDC0_ch21_trailing[NTDC0_ch21_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  260 :NTDC0_ch22 : UInt_t Number of entries in branch TDC0_ch22          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  261 :TDC0_ch22 : TDC0_ch22[NTDC0_ch22]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  262 :NTDC0_ch22_leading :                                               *
    *         | UInt_t Number of entries in branch TDC0_ch22_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  263 :TDC0_ch22_leading : TDC0_ch22_leading[NTDC0_ch22_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  264 :NTDC0_ch22_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC0_ch22_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  265 :TDC0_ch22_trailing : TDC0_ch22_trailing[NTDC0_ch22_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  266 :NTDC0_ch23 : UInt_t Number of entries in branch TDC0_ch23          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  267 :TDC0_ch23 : TDC0_ch23[NTDC0_ch23]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  268 :NTDC0_ch23_leading :                                               *
    *         | UInt_t Number of entries in branch TDC0_ch23_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  269 :TDC0_ch23_leading : TDC0_ch23_leading[NTDC0_ch23_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  270 :NTDC0_ch23_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC0_ch23_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  271 :TDC0_ch23_trailing : TDC0_ch23_trailing[NTDC0_ch23_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  272 :NTDC0_ch24 : UInt_t Number of entries in branch TDC0_ch24          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  273 :TDC0_ch24 : TDC0_ch24[NTDC0_ch24]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  274 :NTDC0_ch24_leading :                                               *
    *         | UInt_t Number of entries in branch TDC0_ch24_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  275 :TDC0_ch24_leading : TDC0_ch24_leading[NTDC0_ch24_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  276 :NTDC0_ch24_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC0_ch24_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  277 :TDC0_ch24_trailing : TDC0_ch24_trailing[NTDC0_ch24_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  278 :NTDC0_ch25 : UInt_t Number of entries in branch TDC0_ch25          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  279 :TDC0_ch25 : TDC0_ch25[NTDC0_ch25]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  280 :NTDC0_ch25_leading :                                               *
    *         | UInt_t Number of entries in branch TDC0_ch25_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  281 :TDC0_ch25_leading : TDC0_ch25_leading[NTDC0_ch25_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  282 :NTDC0_ch25_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC0_ch25_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  283 :TDC0_ch25_trailing : TDC0_ch25_trailing[NTDC0_ch25_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  284 :NTDC0_ch26 : UInt_t Number of entries in branch TDC0_ch26          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  285 :TDC0_ch26 : TDC0_ch26[NTDC0_ch26]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  286 :NTDC0_ch26_leading :                                               *
    *         | UInt_t Number of entries in branch TDC0_ch26_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  287 :TDC0_ch26_leading : TDC0_ch26_leading[NTDC0_ch26_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  288 :NTDC0_ch26_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC0_ch26_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  289 :TDC0_ch26_trailing : TDC0_ch26_trailing[NTDC0_ch26_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  290 :NTDC0_ch27 : UInt_t Number of entries in branch TDC0_ch27          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  291 :TDC0_ch27 : TDC0_ch27[NTDC0_ch27]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  292 :NTDC0_ch27_leading :                                               *
    *         | UInt_t Number of entries in branch TDC0_ch27_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  293 :TDC0_ch27_leading : TDC0_ch27_leading[NTDC0_ch27_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  294 :NTDC0_ch27_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC0_ch27_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  295 :TDC0_ch27_trailing : TDC0_ch27_trailing[NTDC0_ch27_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  296 :NTDC0_ch28 : UInt_t Number of entries in branch TDC0_ch28          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  297 :TDC0_ch28 : TDC0_ch28[NTDC0_ch28]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  298 :NTDC0_ch28_leading :                                               *
    *         | UInt_t Number of entries in branch TDC0_ch28_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  299 :TDC0_ch28_leading : TDC0_ch28_leading[NTDC0_ch28_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  300 :NTDC0_ch28_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC0_ch28_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  301 :TDC0_ch28_trailing : TDC0_ch28_trailing[NTDC0_ch28_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  302 :NTDC0_ch29 : UInt_t Number of entries in branch TDC0_ch29          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  303 :TDC0_ch29 : TDC0_ch29[NTDC0_ch29]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  304 :NTDC0_ch29_leading :                                               *
    *         | UInt_t Number of entries in branch TDC0_ch29_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  305 :TDC0_ch29_leading : TDC0_ch29_leading[NTDC0_ch29_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  306 :NTDC0_ch29_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC0_ch29_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  307 :TDC0_ch29_trailing : TDC0_ch29_trailing[NTDC0_ch29_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  308 :NTDC0_ch30 : UInt_t Number of entries in branch TDC0_ch30          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  309 :TDC0_ch30 : TDC0_ch30[NTDC0_ch30]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  310 :NTDC0_ch30_leading :                                               *
    *         | UInt_t Number of entries in branch TDC0_ch30_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  311 :TDC0_ch30_leading : TDC0_ch30_leading[NTDC0_ch30_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  312 :NTDC0_ch30_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC0_ch30_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  313 :TDC0_ch30_trailing : TDC0_ch30_trailing[NTDC0_ch30_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  314 :NTDC0_ch31 : UInt_t Number of entries in branch TDC0_ch31          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  315 :TDC0_ch31 : TDC0_ch31[NTDC0_ch31]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  316 :NTDC0_ch31_leading :                                               *
    *         | UInt_t Number of entries in branch TDC0_ch31_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  317 :TDC0_ch31_leading : TDC0_ch31_leading[NTDC0_ch31_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  318 :NTDC0_ch31_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC0_ch31_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  319 :TDC0_ch31_trailing : TDC0_ch31_trailing[NTDC0_ch31_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  320 :Scaler0_ch0 : Scaler0_ch0/i                                        *
    *Entries :    56630 : Total  Size=     227677 bytes  File Size  =       1898 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 119.69     *
    *............................................................................*
    *Br  321 :Scaler0_ch1 : Scaler0_ch1/i                                        *
    *Entries :    56630 : Total  Size=     227677 bytes  File Size  =       1898 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 119.69     *
    *............................................................................*
    *Br  322 :Scaler0_ch2 : Scaler0_ch2/i                                        *
    *Entries :    56630 : Total  Size=     227677 bytes  File Size  =     103117 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=   2.20     *
    *............................................................................*
    *Br  323 :Scaler0_ch3 : Scaler0_ch3/i                                        *
    *Entries :    56630 : Total  Size=     227677 bytes  File Size  =     103122 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=   2.20     *
    *............................................................................*
    *Br  324 :Scaler0_ch4 : Scaler0_ch4/i                                        *
    *Entries :    56630 : Total  Size=     227677 bytes  File Size  =      95267 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=   2.38     *
    *............................................................................*
    *Br  325 :Scaler0_ch5 : Scaler0_ch5/i                                        *
    *Entries :    56630 : Total  Size=     227677 bytes  File Size  =      13502 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  16.82     *
    *............................................................................*
    *Br  326 :Scaler0_ch6 : Scaler0_ch6/i                                        *
    *Entries :    56630 : Total  Size=     227677 bytes  File Size  =      79857 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=   2.84     *
    *............................................................................*
    *Br  327 :Scaler0_ch7 : Scaler0_ch7/i                                        *
    *Entries :    56630 : Total  Size=     227677 bytes  File Size  =       1898 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 119.69     *
    *............................................................................*
    *Br  328 :Scaler0_ch8 : Scaler0_ch8/i                                        *
    *Entries :    56630 : Total  Size=     227677 bytes  File Size  =       1898 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 119.69     *
    *............................................................................*
    *Br  329 :Scaler0_ch9 : Scaler0_ch9/i                                        *
    *Entries :    56630 : Total  Size=     227677 bytes  File Size  =       1898 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 119.69     *
    *............................................................................*
    *Br  330 :Scaler0_ch10 : Scaler0_ch10/i                                      *
    *Entries :    56630 : Total  Size=     227689 bytes  File Size  =     108168 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=   2.10     *
    *............................................................................*
    *Br  331 :Scaler0_ch11 : Scaler0_ch11/i                                      *
    *Entries :    56630 : Total  Size=     227689 bytes  File Size  =     106740 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=   2.13     *
    *............................................................................*
    *Br  332 :Scaler0_ch12 : Scaler0_ch12/i                                      *
    *Entries :    56630 : Total  Size=     227689 bytes  File Size  =       1906 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 119.19     *
    *............................................................................*
    *Br  333 :Scaler0_ch13 : Scaler0_ch13/i                                      *
    *Entries :    56630 : Total  Size=     227689 bytes  File Size  =      99802 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=   2.28     *
    *............................................................................*
    *Br  334 :Scaler0_ch14 : Scaler0_ch14/i                                      *
    *Entries :    56630 : Total  Size=     227689 bytes  File Size  =       1906 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 119.19     *
    *............................................................................*
    *Br  335 :Scaler0_ch15 : Scaler0_ch15/i                                      *
    *Entries :    56630 : Total  Size=     227689 bytes  File Size  =     109577 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=   2.07     *
    *............................................................................*
    *Br  336 :NTDC1_ch0 : UInt_t Number of entries in branch TDC1_ch0            *
    *Entries :    56630 : Total  Size=     227678 bytes  File Size  =       1881 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.76     *
    *............................................................................*
    *Br  337 :TDC1_ch0  : TDC1_ch0[NTDC1_ch0]/i                                  *
    *Entries :    56630 : Total  Size=     228527 bytes  File Size  =       2878 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  79.16     *
    *............................................................................*
    *Br  338 :NTDC1_ch0_leading :                                                *
    *         | UInt_t Number of entries in branch TDC1_ch0_leading              *
    *Entries :    56630 : Total  Size=     227774 bytes  File Size  =       1946 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.76     *
    *............................................................................*
    *Br  339 :TDC1_ch0_leading : TDC1_ch0_leading[NTDC1_ch0_leading]/i           *
    *Entries :    56630 : Total  Size=     228711 bytes  File Size  =       2995 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  76.10     *
    *............................................................................*
    *Br  340 :NTDC1_ch0_trailing :                                               *
    *         | UInt_t Number of entries in branch TDC1_ch0_trailing             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  341 :TDC1_ch0_trailing : TDC1_ch0_trailing[NTDC1_ch0_trailing]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  342 :NTDC1_ch1 : UInt_t Number of entries in branch TDC1_ch1            *
    *Entries :    56630 : Total  Size=     227678 bytes  File Size  =       1881 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.76     *
    *............................................................................*
    *Br  343 :TDC1_ch1  : TDC1_ch1[NTDC1_ch1]/i                                  *
    *Entries :    56630 : Total  Size=     228527 bytes  File Size  =       2878 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  79.16     *
    *............................................................................*
    *Br  344 :NTDC1_ch1_leading :                                                *
    *         | UInt_t Number of entries in branch TDC1_ch1_leading              *
    *Entries :    56630 : Total  Size=     227774 bytes  File Size  =       1946 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.76     *
    *............................................................................*
    *Br  345 :TDC1_ch1_leading : TDC1_ch1_leading[NTDC1_ch1_leading]/i           *
    *Entries :    56630 : Total  Size=     228711 bytes  File Size  =       2995 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  76.10     *
    *............................................................................*
    *Br  346 :NTDC1_ch1_trailing :                                               *
    *         | UInt_t Number of entries in branch TDC1_ch1_trailing             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  347 :TDC1_ch1_trailing : TDC1_ch1_trailing[NTDC1_ch1_trailing]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  348 :NTDC1_ch2 : UInt_t Number of entries in branch TDC1_ch2            *
    *Entries :    56630 : Total  Size=     227678 bytes  File Size  =       1881 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.76     *
    *............................................................................*
    *Br  349 :TDC1_ch2  : TDC1_ch2[NTDC1_ch2]/i                                  *
    *Entries :    56630 : Total  Size=     228527 bytes  File Size  =       2878 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  79.16     *
    *............................................................................*
    *Br  350 :NTDC1_ch2_leading :                                                *
    *         | UInt_t Number of entries in branch TDC1_ch2_leading              *
    *Entries :    56630 : Total  Size=     227774 bytes  File Size  =       1946 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.76     *
    *............................................................................*
    *Br  351 :TDC1_ch2_leading : TDC1_ch2_leading[NTDC1_ch2_leading]/i           *
    *Entries :    56630 : Total  Size=     228711 bytes  File Size  =       2995 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  76.10     *
    *............................................................................*
    *Br  352 :NTDC1_ch2_trailing :                                               *
    *         | UInt_t Number of entries in branch TDC1_ch2_trailing             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  353 :TDC1_ch2_trailing : TDC1_ch2_trailing[NTDC1_ch2_trailing]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  354 :NTDC1_ch3 : UInt_t Number of entries in branch TDC1_ch3            *
    *Entries :    56630 : Total  Size=     227678 bytes  File Size  =       1881 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.76     *
    *............................................................................*
    *Br  355 :TDC1_ch3  : TDC1_ch3[NTDC1_ch3]/i                                  *
    *Entries :    56630 : Total  Size=     228527 bytes  File Size  =       2878 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  79.16     *
    *............................................................................*
    *Br  356 :NTDC1_ch3_leading :                                                *
    *         | UInt_t Number of entries in branch TDC1_ch3_leading              *
    *Entries :    56630 : Total  Size=     227774 bytes  File Size  =       1946 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.76     *
    *............................................................................*
    *Br  357 :TDC1_ch3_leading : TDC1_ch3_leading[NTDC1_ch3_leading]/i           *
    *Entries :    56630 : Total  Size=     228711 bytes  File Size  =       2995 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  76.10     *
    *............................................................................*
    *Br  358 :NTDC1_ch3_trailing :                                               *
    *         | UInt_t Number of entries in branch TDC1_ch3_trailing             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  359 :TDC1_ch3_trailing : TDC1_ch3_trailing[NTDC1_ch3_trailing]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  360 :NTDC1_ch4 : UInt_t Number of entries in branch TDC1_ch4            *
    *Entries :    56630 : Total  Size=     227678 bytes  File Size  =       1881 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.76     *
    *............................................................................*
    *Br  361 :TDC1_ch4  : TDC1_ch4[NTDC1_ch4]/i                                  *
    *Entries :    56630 : Total  Size=     228527 bytes  File Size  =       2878 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  79.16     *
    *............................................................................*
    *Br  362 :NTDC1_ch4_leading :                                                *
    *         | UInt_t Number of entries in branch TDC1_ch4_leading              *
    *Entries :    56630 : Total  Size=     227774 bytes  File Size  =       1946 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.76     *
    *............................................................................*
    *Br  363 :TDC1_ch4_leading : TDC1_ch4_leading[NTDC1_ch4_leading]/i           *
    *Entries :    56630 : Total  Size=     228711 bytes  File Size  =       2995 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  76.10     *
    *............................................................................*
    *Br  364 :NTDC1_ch4_trailing :                                               *
    *         | UInt_t Number of entries in branch TDC1_ch4_trailing             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  365 :TDC1_ch4_trailing : TDC1_ch4_trailing[NTDC1_ch4_trailing]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  366 :NTDC1_ch5 : UInt_t Number of entries in branch TDC1_ch5            *
    *Entries :    56630 : Total  Size=     227678 bytes  File Size  =       1881 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.76     *
    *............................................................................*
    *Br  367 :TDC1_ch5  : TDC1_ch5[NTDC1_ch5]/i                                  *
    *Entries :    56630 : Total  Size=     228527 bytes  File Size  =       2878 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  79.16     *
    *............................................................................*
    *Br  368 :NTDC1_ch5_leading :                                                *
    *         | UInt_t Number of entries in branch TDC1_ch5_leading              *
    *Entries :    56630 : Total  Size=     227774 bytes  File Size  =       1946 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.76     *
    *............................................................................*
    *Br  369 :TDC1_ch5_leading : TDC1_ch5_leading[NTDC1_ch5_leading]/i           *
    *Entries :    56630 : Total  Size=     228711 bytes  File Size  =       2995 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  76.10     *
    *............................................................................*
    *Br  370 :NTDC1_ch5_trailing :                                               *
    *         | UInt_t Number of entries in branch TDC1_ch5_trailing             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  371 :TDC1_ch5_trailing : TDC1_ch5_trailing[NTDC1_ch5_trailing]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  372 :NTDC1_ch6 : UInt_t Number of entries in branch TDC1_ch6            *
    *Entries :    56630 : Total  Size=     227678 bytes  File Size  =       1881 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.76     *
    *............................................................................*
    *Br  373 :TDC1_ch6  : TDC1_ch6[NTDC1_ch6]/i                                  *
    *Entries :    56630 : Total  Size=     228527 bytes  File Size  =       2878 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  79.16     *
    *............................................................................*
    *Br  374 :NTDC1_ch6_leading :                                                *
    *         | UInt_t Number of entries in branch TDC1_ch6_leading              *
    *Entries :    56630 : Total  Size=     227774 bytes  File Size  =       1946 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.76     *
    *............................................................................*
    *Br  375 :TDC1_ch6_leading : TDC1_ch6_leading[NTDC1_ch6_leading]/i           *
    *Entries :    56630 : Total  Size=     228711 bytes  File Size  =       2995 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  76.10     *
    *............................................................................*
    *Br  376 :NTDC1_ch6_trailing :                                               *
    *         | UInt_t Number of entries in branch TDC1_ch6_trailing             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  377 :TDC1_ch6_trailing : TDC1_ch6_trailing[NTDC1_ch6_trailing]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  378 :NTDC1_ch7 : UInt_t Number of entries in branch TDC1_ch7            *
    *Entries :    56630 : Total  Size=     227678 bytes  File Size  =       1881 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.76     *
    *............................................................................*
    *Br  379 :TDC1_ch7  : TDC1_ch7[NTDC1_ch7]/i                                  *
    *Entries :    56630 : Total  Size=     228527 bytes  File Size  =       2878 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  79.16     *
    *............................................................................*
    *Br  380 :NTDC1_ch7_leading :                                                *
    *         | UInt_t Number of entries in branch TDC1_ch7_leading              *
    *Entries :    56630 : Total  Size=     227774 bytes  File Size  =       1946 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.76     *
    *............................................................................*
    *Br  381 :TDC1_ch7_leading : TDC1_ch7_leading[NTDC1_ch7_leading]/i           *
    *Entries :    56630 : Total  Size=     228711 bytes  File Size  =       2995 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  76.10     *
    *............................................................................*
    *Br  382 :NTDC1_ch7_trailing :                                               *
    *         | UInt_t Number of entries in branch TDC1_ch7_trailing             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  383 :TDC1_ch7_trailing : TDC1_ch7_trailing[NTDC1_ch7_trailing]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  384 :NTDC1_ch8 : UInt_t Number of entries in branch TDC1_ch8            *
    *Entries :    56630 : Total  Size=     227678 bytes  File Size  =       1881 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.76     *
    *............................................................................*
    *Br  385 :TDC1_ch8  : TDC1_ch8[NTDC1_ch8]/i                                  *
    *Entries :    56630 : Total  Size=     228527 bytes  File Size  =       2878 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  79.16     *
    *............................................................................*
    *Br  386 :NTDC1_ch8_leading :                                                *
    *         | UInt_t Number of entries in branch TDC1_ch8_leading              *
    *Entries :    56630 : Total  Size=     227774 bytes  File Size  =       1946 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.76     *
    *............................................................................*
    *Br  387 :TDC1_ch8_leading : TDC1_ch8_leading[NTDC1_ch8_leading]/i           *
    *Entries :    56630 : Total  Size=     228711 bytes  File Size  =       2995 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  76.10     *
    *............................................................................*
    *Br  388 :NTDC1_ch8_trailing :                                               *
    *         | UInt_t Number of entries in branch TDC1_ch8_trailing             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  389 :TDC1_ch8_trailing : TDC1_ch8_trailing[NTDC1_ch8_trailing]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  390 :NTDC1_ch9 : UInt_t Number of entries in branch TDC1_ch9            *
    *Entries :    56630 : Total  Size=     227678 bytes  File Size  =       1881 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.76     *
    *............................................................................*
    *Br  391 :TDC1_ch9  : TDC1_ch9[NTDC1_ch9]/i                                  *
    *Entries :    56630 : Total  Size=     228527 bytes  File Size  =       2878 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  79.16     *
    *............................................................................*
    *Br  392 :NTDC1_ch9_leading :                                                *
    *         | UInt_t Number of entries in branch TDC1_ch9_leading              *
    *Entries :    56630 : Total  Size=     227774 bytes  File Size  =       1946 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.76     *
    *............................................................................*
    *Br  393 :TDC1_ch9_leading : TDC1_ch9_leading[NTDC1_ch9_leading]/i           *
    *Entries :    56630 : Total  Size=     228711 bytes  File Size  =       2995 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  76.10     *
    *............................................................................*
    *Br  394 :NTDC1_ch9_trailing :                                               *
    *         | UInt_t Number of entries in branch TDC1_ch9_trailing             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  395 :TDC1_ch9_trailing : TDC1_ch9_trailing[NTDC1_ch9_trailing]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  396 :NTDC1_ch10 : UInt_t Number of entries in branch TDC1_ch10          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  397 :TDC1_ch10 : TDC1_ch10[NTDC1_ch10]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  398 :NTDC1_ch10_leading :                                               *
    *         | UInt_t Number of entries in branch TDC1_ch10_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  399 :TDC1_ch10_leading : TDC1_ch10_leading[NTDC1_ch10_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  400 :NTDC1_ch10_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC1_ch10_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  401 :TDC1_ch10_trailing : TDC1_ch10_trailing[NTDC1_ch10_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  402 :NTDC1_ch11 : UInt_t Number of entries in branch TDC1_ch11          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  403 :TDC1_ch11 : TDC1_ch11[NTDC1_ch11]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  404 :NTDC1_ch11_leading :                                               *
    *         | UInt_t Number of entries in branch TDC1_ch11_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  405 :TDC1_ch11_leading : TDC1_ch11_leading[NTDC1_ch11_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  406 :NTDC1_ch11_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC1_ch11_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  407 :TDC1_ch11_trailing : TDC1_ch11_trailing[NTDC1_ch11_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  408 :NTDC1_ch12 : UInt_t Number of entries in branch TDC1_ch12          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  409 :TDC1_ch12 : TDC1_ch12[NTDC1_ch12]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  410 :NTDC1_ch12_leading :                                               *
    *         | UInt_t Number of entries in branch TDC1_ch12_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  411 :TDC1_ch12_leading : TDC1_ch12_leading[NTDC1_ch12_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  412 :NTDC1_ch12_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC1_ch12_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  413 :TDC1_ch12_trailing : TDC1_ch12_trailing[NTDC1_ch12_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  414 :NTDC1_ch13 : UInt_t Number of entries in branch TDC1_ch13          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  415 :TDC1_ch13 : TDC1_ch13[NTDC1_ch13]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  416 :NTDC1_ch13_leading :                                               *
    *         | UInt_t Number of entries in branch TDC1_ch13_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  417 :TDC1_ch13_leading : TDC1_ch13_leading[NTDC1_ch13_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  418 :NTDC1_ch13_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC1_ch13_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  419 :TDC1_ch13_trailing : TDC1_ch13_trailing[NTDC1_ch13_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  420 :NTDC1_ch14 : UInt_t Number of entries in branch TDC1_ch14          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       5609 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  40.50     *
    *............................................................................*
    *Br  421 :TDC1_ch14 : TDC1_ch14[NTDC1_ch14]/i                                *
    *Entries :    56630 : Total  Size=     233070 bytes  File Size  =      10516 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  22.09     *
    *............................................................................*
    *Br  422 :NTDC1_ch14_leading :                                               *
    *         | UInt_t Number of entries in branch TDC1_ch14_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       5670 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  40.07     *
    *............................................................................*
    *Br  423 :TDC1_ch14_leading : TDC1_ch14_leading[NTDC1_ch14_leading]/i        *
    *Entries :    56630 : Total  Size=     233254 bytes  File Size  =      10638 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  21.85     *
    *............................................................................*
    *Br  424 :NTDC1_ch14_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC1_ch14_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  425 :TDC1_ch14_trailing : TDC1_ch14_trailing[NTDC1_ch14_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  426 :NTDC1_ch15 : UInt_t Number of entries in branch TDC1_ch15          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       2416 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  94.02     *
    *............................................................................*
    *Br  427 :TDC1_ch15 : TDC1_ch15[NTDC1_ch15]/i                                *
    *Entries :    56630 : Total  Size=     456143 bytes  File Size  =     201375 *
    *Baskets :       22 : Basket Size=      32000 bytes  Compression=   2.26     *
    *............................................................................*
    *Br  428 :NTDC1_ch15_leading :                                               *
    *         | UInt_t Number of entries in branch TDC1_ch15_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       2476 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression=  91.77     *
    *............................................................................*
    *Br  429 :TDC1_ch15_leading : TDC1_ch15_leading[NTDC1_ch15_leading]/i        *
    *Entries :    56630 : Total  Size=     456383 bytes  File Size  =     201518 *
    *Baskets :       22 : Basket Size=      32000 bytes  Compression=   2.26     *
    *............................................................................*
    *Br  430 :NTDC1_ch15_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC1_ch15_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  431 :TDC1_ch15_trailing : TDC1_ch15_trailing[NTDC1_ch15_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  432 :NTDC1_ch16 : UInt_t Number of entries in branch TDC1_ch16          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  433 :TDC1_ch16 : TDC1_ch16[NTDC1_ch16]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  434 :NTDC1_ch16_leading :                                               *
    *         | UInt_t Number of entries in branch TDC1_ch16_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  435 :TDC1_ch16_leading : TDC1_ch16_leading[NTDC1_ch16_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  436 :NTDC1_ch16_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC1_ch16_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  437 :TDC1_ch16_trailing : TDC1_ch16_trailing[NTDC1_ch16_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  438 :NTDC1_ch17 : UInt_t Number of entries in branch TDC1_ch17          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  439 :TDC1_ch17 : TDC1_ch17[NTDC1_ch17]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  440 :NTDC1_ch17_leading :                                               *
    *         | UInt_t Number of entries in branch TDC1_ch17_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  441 :TDC1_ch17_leading : TDC1_ch17_leading[NTDC1_ch17_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  442 :NTDC1_ch17_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC1_ch17_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  443 :TDC1_ch17_trailing : TDC1_ch17_trailing[NTDC1_ch17_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  444 :NTDC1_ch18 : UInt_t Number of entries in branch TDC1_ch18          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  445 :TDC1_ch18 : TDC1_ch18[NTDC1_ch18]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  446 :NTDC1_ch18_leading :                                               *
    *         | UInt_t Number of entries in branch TDC1_ch18_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  447 :TDC1_ch18_leading : TDC1_ch18_leading[NTDC1_ch18_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  448 :NTDC1_ch18_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC1_ch18_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  449 :TDC1_ch18_trailing : TDC1_ch18_trailing[NTDC1_ch18_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  450 :NTDC1_ch19 : UInt_t Number of entries in branch TDC1_ch19          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  451 :TDC1_ch19 : TDC1_ch19[NTDC1_ch19]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  452 :NTDC1_ch19_leading :                                               *
    *         | UInt_t Number of entries in branch TDC1_ch19_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  453 :TDC1_ch19_leading : TDC1_ch19_leading[NTDC1_ch19_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  454 :NTDC1_ch19_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC1_ch19_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  455 :TDC1_ch19_trailing : TDC1_ch19_trailing[NTDC1_ch19_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  456 :NTDC1_ch20 : UInt_t Number of entries in branch TDC1_ch20          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  457 :TDC1_ch20 : TDC1_ch20[NTDC1_ch20]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  458 :NTDC1_ch20_leading :                                               *
    *         | UInt_t Number of entries in branch TDC1_ch20_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  459 :TDC1_ch20_leading : TDC1_ch20_leading[NTDC1_ch20_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  460 :NTDC1_ch20_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC1_ch20_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  461 :TDC1_ch20_trailing : TDC1_ch20_trailing[NTDC1_ch20_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  462 :NTDC1_ch21 : UInt_t Number of entries in branch TDC1_ch21          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  463 :TDC1_ch21 : TDC1_ch21[NTDC1_ch21]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  464 :NTDC1_ch21_leading :                                               *
    *         | UInt_t Number of entries in branch TDC1_ch21_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  465 :TDC1_ch21_leading : TDC1_ch21_leading[NTDC1_ch21_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  466 :NTDC1_ch21_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC1_ch21_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  467 :TDC1_ch21_trailing : TDC1_ch21_trailing[NTDC1_ch21_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  468 :NTDC1_ch22 : UInt_t Number of entries in branch TDC1_ch22          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  469 :TDC1_ch22 : TDC1_ch22[NTDC1_ch22]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  470 :NTDC1_ch22_leading :                                               *
    *         | UInt_t Number of entries in branch TDC1_ch22_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  471 :TDC1_ch22_leading : TDC1_ch22_leading[NTDC1_ch22_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  472 :NTDC1_ch22_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC1_ch22_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  473 :TDC1_ch22_trailing : TDC1_ch22_trailing[NTDC1_ch22_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  474 :NTDC1_ch23 : UInt_t Number of entries in branch TDC1_ch23          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  475 :TDC1_ch23 : TDC1_ch23[NTDC1_ch23]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  476 :NTDC1_ch23_leading :                                               *
    *         | UInt_t Number of entries in branch TDC1_ch23_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  477 :TDC1_ch23_leading : TDC1_ch23_leading[NTDC1_ch23_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  478 :NTDC1_ch23_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC1_ch23_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  479 :TDC1_ch23_trailing : TDC1_ch23_trailing[NTDC1_ch23_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  480 :NTDC1_ch24 : UInt_t Number of entries in branch TDC1_ch24          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  481 :TDC1_ch24 : TDC1_ch24[NTDC1_ch24]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  482 :NTDC1_ch24_leading :                                               *
    *         | UInt_t Number of entries in branch TDC1_ch24_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  483 :TDC1_ch24_leading : TDC1_ch24_leading[NTDC1_ch24_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  484 :NTDC1_ch24_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC1_ch24_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  485 :TDC1_ch24_trailing : TDC1_ch24_trailing[NTDC1_ch24_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  486 :NTDC1_ch25 : UInt_t Number of entries in branch TDC1_ch25          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  487 :TDC1_ch25 : TDC1_ch25[NTDC1_ch25]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  488 :NTDC1_ch25_leading :                                               *
    *         | UInt_t Number of entries in branch TDC1_ch25_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  489 :TDC1_ch25_leading : TDC1_ch25_leading[NTDC1_ch25_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  490 :NTDC1_ch25_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC1_ch25_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  491 :TDC1_ch25_trailing : TDC1_ch25_trailing[NTDC1_ch25_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  492 :NTDC1_ch26 : UInt_t Number of entries in branch TDC1_ch26          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  493 :TDC1_ch26 : TDC1_ch26[NTDC1_ch26]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  494 :NTDC1_ch26_leading :                                               *
    *         | UInt_t Number of entries in branch TDC1_ch26_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  495 :TDC1_ch26_leading : TDC1_ch26_leading[NTDC1_ch26_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  496 :NTDC1_ch26_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC1_ch26_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  497 :TDC1_ch26_trailing : TDC1_ch26_trailing[NTDC1_ch26_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  498 :NTDC1_ch27 : UInt_t Number of entries in branch TDC1_ch27          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  499 :TDC1_ch27 : TDC1_ch27[NTDC1_ch27]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  500 :NTDC1_ch27_leading :                                               *
    *         | UInt_t Number of entries in branch TDC1_ch27_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  501 :TDC1_ch27_leading : TDC1_ch27_leading[NTDC1_ch27_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  502 :NTDC1_ch27_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC1_ch27_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  503 :TDC1_ch27_trailing : TDC1_ch27_trailing[NTDC1_ch27_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  504 :NTDC1_ch28 : UInt_t Number of entries in branch TDC1_ch28          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  505 :TDC1_ch28 : TDC1_ch28[NTDC1_ch28]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  506 :NTDC1_ch28_leading :                                               *
    *         | UInt_t Number of entries in branch TDC1_ch28_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  507 :TDC1_ch28_leading : TDC1_ch28_leading[NTDC1_ch28_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  508 :NTDC1_ch28_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC1_ch28_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  509 :TDC1_ch28_trailing : TDC1_ch28_trailing[NTDC1_ch28_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  510 :NTDC1_ch29 : UInt_t Number of entries in branch TDC1_ch29          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  511 :TDC1_ch29 : TDC1_ch29[NTDC1_ch29]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  512 :NTDC1_ch29_leading :                                               *
    *         | UInt_t Number of entries in branch TDC1_ch29_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  513 :TDC1_ch29_leading : TDC1_ch29_leading[NTDC1_ch29_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  514 :NTDC1_ch29_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC1_ch29_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  515 :TDC1_ch29_trailing : TDC1_ch29_trailing[NTDC1_ch29_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  516 :NTDC1_ch30 : UInt_t Number of entries in branch TDC1_ch30          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  517 :TDC1_ch30 : TDC1_ch30[NTDC1_ch30]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  518 :NTDC1_ch30_leading :                                               *
    *         | UInt_t Number of entries in branch TDC1_ch30_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  519 :TDC1_ch30_leading : TDC1_ch30_leading[NTDC1_ch30_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  520 :NTDC1_ch30_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC1_ch30_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  521 :TDC1_ch30_trailing : TDC1_ch30_trailing[NTDC1_ch30_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*
    *Br  522 :NTDC1_ch31 : UInt_t Number of entries in branch TDC1_ch31          *
    *Entries :    56630 : Total  Size=     227690 bytes  File Size  =       1890 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 120.19     *
    *............................................................................*
    *Br  523 :TDC1_ch31 : TDC1_ch31[NTDC1_ch31]/i                                *
    *Entries :    56630 : Total  Size=     228550 bytes  File Size  =       2893 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  78.75     *
    *............................................................................*
    *Br  524 :NTDC1_ch31_leading :                                               *
    *         | UInt_t Number of entries in branch TDC1_ch31_leading             *
    *Entries :    56630 : Total  Size=     227786 bytes  File Size  =       1954 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 116.29     *
    *............................................................................*
    *Br  525 :TDC1_ch31_leading : TDC1_ch31_leading[NTDC1_ch31_leading]/i        *
    *Entries :    56630 : Total  Size=     228734 bytes  File Size  =       3010 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.73     *
    *............................................................................*
    *Br  526 :NTDC1_ch31_trailing :                                              *
    *         | UInt_t Number of entries in branch TDC1_ch31_trailing            *
    *Entries :    56630 : Total  Size=     227798 bytes  File Size  =       1962 *
    *Baskets :        8 : Basket Size=      32000 bytes  Compression= 115.82     *
    *............................................................................*
    *Br  527 :TDC1_ch31_trailing : TDC1_ch31_trailing[NTDC1_ch31_trailing]/i     *
    *Entries :    56630 : Total  Size=     228757 bytes  File Size  =       3030 *
    *Baskets :       15 : Basket Size=      32000 bytes  Compression=  75.23     *
    *............................................................................*


That is again quite a lot. Let's zoom in a bit and have a look at QDC channel 0. In total there are four branches associated with each channel of a QDC (and we have 32 channels on the QDC, so in total 128 branches for all the QDC data). For ch0, these four branches are:

```
*Br    0 :QDC0_ch0  : QDC0_ch0/i                                             *
*Entries :    56630 : Total  Size=     227641 bytes  File Size  =     108979 *
*Baskets :        8 : Basket Size=      32000 bytes  Compression=   2.08     *
*............................................................................*
*Br    1 :QDC0_ch0_OF : QDC0_ch0_OF/b                                        *
*Entries :    56630 : Total  Size=      57295 bytes  File Size  =        474 *
*Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.81     *
*............................................................................*
*Br    2 :QDC0_ch0_UT : QDC0_ch0_UT/b                                        *
*Entries :    56630 : Total  Size=      57295 bytes  File Size  =        474 *
*Baskets :        2 : Basket Size=      32000 bytes  Compression= 119.81     *
*............................................................................*
*Br    3 :QDC0_ch0_valid : QDC0_ch0_valid/b                                  *
*Entries :    56630 : Total  Size=      57313 bytes  File Size  =        480 *
*Baskets :        2 : Basket Size=      32000 bytes  Compression= 118.33     *
*............................................................................*
```

- Branch No 0 contains the QDC counts for ch0 of the QDC. The datatype is "integer" (see the`/i` at the end of `QDC0_ch0/i`) which makes sense since the QDC is essentially a counter that can count from 0 t 4095 (the higher the count, the higher the deposited energy)

- Branch No 1 and 2 contain information if an entry was overflowing the range from above (OF) or from below (UT). The data type is `bool` because it is a `true` or `false` type of information

- Branch No 3 contains a flag about whether the data was legal, again in the form of a binary flag.

- Note that every branch contains the same number of entries (events) `56630` => compare to the log book how many entries there should be in the data file!

**SO** By iterating through the data stored in the `QDC0_ch0`, `QDC0_ch1`, and `QDC0_ch2` branches, we could try to recreate the histograms that we got from the monitor file:


```python
num_bins = 100
s2_no_absorber_hist = ROOT.TH1I("s2_no_absorber_hist", "S2, -1 GeV mixed beam, No absorber", num_bins, 0, 4096)
s3_no_absorber_hist = ROOT.TH1I("s3_no_absorber_hist", "S3, -1 GeV mixed beam, No absorber", num_bins, 0, 4096)
cal17_no_absorber_hist = ROOT.TH1I("cal17_no_absorber_hist", "CAL 17, -1 GeV mixed beam, No absorber", num_bins, 0, 4096)
```


```python
num_events = rawdata.GetBranch("QDC0_ch0").GetEntries()
print(f"Number of events recorded: {num_events}")
```

    Number of events recorded: 56630



```python
for ev_id in range(0, num_events):
    rawdata.GetEntry(ev_id) # Move ot entry with id ev_id 
    s2_cnt = int(getattr(rawdata, "QDC0_ch0"))
    s2_no_absorber_hist.Fill(s2_cnt)
    
    s3_cnt = int(getattr(rawdata, "QDC0_ch1"))
    s3_no_absorber_hist.Fill(s3_cnt)
    
    cal17_cnt = int(getattr(rawdata, "QDC0_ch2"))
    cal17_no_absorber_hist.Fill(cal17_cnt)  
```


```python
stack3 = ROOT.THStack("stack3", "S2, S3, and CAL17 data for Run 1722178299")

s2_no_absorber_hist.SetLineColor(210)
s2_no_absorber_hist.SetTitle("S2")
stack3.Add(s2_no_absorber_hist)


s3_no_absorber_hist.SetLineColor(92)
s3_no_absorber_hist.SetTitle("S3")
stack3.Add(s3_no_absorber_hist)

cal17_no_absorber_hist.SetLineColor(46)
cal17_no_absorber_hist.SetTitle("CAL17")
stack3.Add(cal17_no_absorber_hist)

# 3) Createa a canvas with three "sections", one for each of the detectors S2, S3 and CAL17
c1 = ROOT.TCanvas("c1", "S2, S3, and CAL17 data for Run 1722178299", 10, 10, 1200, 600)
c1.cd(1)

stack3.Draw("nostack")
stack3.GetXaxis().SetTitle("QDC count")
stack3.GetYaxis().SetTitle("#Occurances")
stack3.GetXaxis().SetLimits(200, 1400)

leg = ROOT.TLegend(0.7, 0.7, 0.97, 0.974, "Legend")
leg.AddEntry(s2_no_absorber_hist, "S2")
leg.AddEntry(s3_no_absorber_hist, "S3")
leg.AddEntry(cal17_no_absorber_hist, "CAL17")
leg.Draw()

c1.Update()
```

    Warning in <TCanvas::Constructor>: Deleting canvas with same name: c1



```python
# c1.Draw()
```




<div id="root_plot_1722867178910" style="width: 1200px; height: 600px; position: relative">
</div>

<script>

function display_root_plot_1722867178910(Core) {
   let obj = Core.parse({"_typename":"TCanvasWebSnapshot","fUniqueID":0,"fBits":0,"fObjectID":"","fOption":"","fKind":3,"fSnapshot":{"_typename":"TCanvas","fUniqueID":0,"fBits":3342344,"fLineColor":1,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":1001,"fLeftMargin":0.1,"fRightMargin":0.1,"fBottomMargin":0.1,"fTopMargin":0.1,"fXfile":2,"fYfile":2,"fAfile":1,"fXstat":0.99,"fYstat":0.99,"fAstat":2,"fFrameFillColor":0,"fFrameLineColor":1,"fFrameFillStyle":1001,"fFrameLineStyle":1,"fFrameLineWidth":1,"fFrameBorderSize":1,"fFrameBorderMode":0,"fX1":49.9999888241285,"fY1":-2120.60640799749,"fX2":1550.00001117587,"fY2":19085.4564079975,"fXtoAbsPixelk":-39.8666071617122,"fXtoPixelk":-39.8666071617122,"fXtoPixel":0.79733332145214,"fYtoAbsPixelk":514.800046590614,"fYtoPixelk":514.800046590614,"fYtoPixel":-0.0269734181664576,"fUtoAbsPixelk":5e-5,"fUtoPixelk":5e-5,"fUtoPixel":1196,"fVtoAbsPixelk":572.00005,"fVtoPixelk":572,"fVtoPixel":-572,"fAbsPixeltoXk":49.9999888241285,"fPixeltoXk":49.9999888241285,"fPixeltoX":1.25418062069544,"fAbsPixeltoYk":19085.4564079975,"fPixeltoYk":-2120.60640799749,"fPixeltoY":-37.0735363915996,"fXlowNDC":0,"fYlowNDC":0,"fXUpNDC":1,"fYUpNDC":1,"fWNDC":1,"fHNDC":1,"fAbsXlowNDC":0,"fAbsYlowNDC":0,"fAbsWNDC":1,"fAbsHNDC":1,"fUxmin":200,"fUymin":0,"fUxmax":1400,"fUymax":16964.85,"fTheta":30,"fPhi":30,"fAspectRatio":0,"fNumber":0,"fTickx":0,"fTicky":0,"fLogx":0,"fLogy":0,"fLogz":0,"fPadPaint":0,"fCrosshair":0,"fCrosshairPos":0,"fBorderSize":2,"fBorderMode":0,"fModified":false,"fGridx":false,"fGridy":false,"fAbsCoord":false,"fEditable":true,"fFixedAspectRatio":false,"fPrimitives":{"_typename":"TList","name":"TList","arr":[],"opt":[]},"fExecs":null,"fName":"c1","fTitle":"S2, S3, and CAL17 data for Run 1722178299","fNumPaletteColor":0,"fNextPaletteColor":0,"fDISPLAY":"$DISPLAY","fDoubleBuffer":0,"fRetained":true,"fXsizeUser":0,"fYsizeUser":0,"fXsizeReal":20,"fYsizeReal":10,"fWindowTopX":0,"fWindowTopY":0,"fWindowWidth":0,"fWindowHeight":0,"fCw":1196,"fCh":572,"fCatt":{"_typename":"TAttCanvas","fXBetween":2,"fYBetween":2,"fTitleFromTop":1.2,"fXdate":0.2,"fYdate":0.3,"fAdate":1},"kMoveOpaque":true,"kResizeOpaque":true,"fHighLightColor":2,"fBatch":true,"kShowEventStatus":false,"kAutoExec":true,"kMenuBar":true},"fActive":false,"fReadOnly":true,"fWithoutPrimitives":false,"fHasExecs":false,"fPrimitives":[{"_typename":"TWebSnapshot","fUniqueID":0,"fBits":0,"fObjectID":"","fOption":"","fKind":4,"fSnapshot":{"_typename":"TWebPainting","fUniqueID":0,"fBits":0,"fOper":"0:255,255,255;1:0,0,0;2:255,0,0;3:0,255,0;4:0,0,255;5:255,255,0;6:255,0,255;7:0,255,255;8:89,211,84;9:89,84,216;10:254,254,254;11:192,182,172;12:76,76,76;13:102,102,102;14:127,127,127;15:153,153,153;16:178,178,178;17:204,204,204;18:229,229,229;19:242,242,242;20:204,198,170;21:204,198,170;22:193,191,168;23:186,181,163;24:178,165,150;25:183,163,155;26:173,153,140;27:155,142,130;28:135,102,86;29:175,206,198;30:132,193,163;31:137,168,160;32:130,158,140;33:173,188,198;34:122,142,153;35:117,137,145;36:104,130,150;37:109,122,132;38:124,153,209;39:127,127,155;40:170,165,191;41:211,206,135;42:221,186,135;43:188,158,130;44:198,153,124;45:191,130,119;46:206,94,96;47:170,142,147;48:165,119,122;49:147,104,112;50:211,89,84;51:146,0,255;52:122,0,255;53:98,0,255;54:74,0,255;55:51,0,255;56:27,0,255;57:3,0,255;58:0,20,255;59:0,44,255;60:0,68,255;61:0,91,255;62:0,115,255;63:0,139,255;64:0,163,255;65:0,187,255;66:0,210,255;67:0,234,255;68:0,255,251;69:0,255,227;70:0,255,204;71:0,255,180;72:0,255,156;73:0,255,132;74:0,255,108;75:0,255,85;76:0,255,61;77:0,255,37;78:0,255,13;79:10,255,0;80:34,255,0;81:57,255,0;82:81,255,0;83:105,255,0;84:129,255,0;85:153,255,0;86:176,255,0;87:200,255,0;88:224,255,0;89:248,255,0;90:255,238,0;91:255,214,0;92:255,190,0;93:255,166,0;94:255,142,0;95:255,119,0;96:255,95,0;97:255,71,0;98:255,47,0;99:255,23,0;110:254,254,254;201:91,91,91;202:122,122,122;203:183,183,183;204:214,214,214;205:137,15,15;206:183,20,20;207:234,71,71;208:239,117,117;209:15,137,15;210:20,183,20;211:71,234,71;212:117,239,117;213:15,15,137;214:20,20,183;215:71,71,234;216:117,117,239;217:137,137,15;218:183,183,20;219:234,234,71;220:239,239,117;221:137,15,137;222:183,20,183;223:234,71,234;224:239,117,239;225:15,137,137;226:20,183,183;227:71,234,234;228:117,239,239;390:255,255,204;391:255,255,153;392:204,204,153;393:255,255,102;394:204,204,102;395:153,153,102;396:255,255,51;397:204,204,51;398:153,153,51;399:102,102,51;400:255,255,0;401:204,204,0;402:153,153,0;403:102,102,0;404:51,51,0;406:204,255,204;407:153,255,153;408:153,204,153;409:102,255,102;410:102,204,102;411:102,153,102;412:51,255,51;413:51,204,51;414:51,153,51;415:51,102,51;416:0,255,0;417:0,204,0;418:0,153,0;419:0,102,0;420:0,51,0;422:204,255,255;423:153,255,255;424:153,204,204;425:102,255,255;426:102,204,204;427:102,153,153;428:51,255,255;429:51,204,204;430:51,153,153;431:51,102,102;432:0,255,255;433:0,204,204;434:0,153,153;435:0,102,102;436:0,51,51;590:204,204,255;591:153,153,255;592:153,153,204;593:102,102,255;594:102,102,204;595:102,102,153;596:51,51,255;597:51,51,204;598:51,51,153;599:51,51,102;600:0,0,255;601:0,0,204;602:0,0,153;603:0,0,102;604:0,0,51;606:255,204,255;607:255,153,255;608:204,153,204;609:255,102,255;610:204,102,204;611:153,102,153;612:255,51,255;613:204,51,204;614:153,51,153;615:102,51,102;616:255,0,255;617:204,0,204;618:153,0,153;619:102,0,102;620:51,0,51;622:255,204,204;623:255,153,153;624:204,153,153;625:255,102,102;626:204,102,102;627:153,102,102;628:255,51,51;629:204,51,51;630:153,51,51;631:102,51,51;632:255,0,0;633:204,0,0;634:153,0,0;635:102,0,0;636:51,0,0;791:255,204,153;792:204,153,102;793:153,102,51;794:153,102,0;795:204,153,51;796:255,204,102;797:255,153,0;798:255,204,51;799:204,153,0;800:255,204,0;801:255,153,51;802:204,102,0;803:102,51,0;804:153,51,0;805:204,102,51;806:255,153,102;807:255,102,0;808:255,102,51;809:204,51,0;810:255,51,0;811:153,255,51;812:102,204,0;813:51,102,0;814:51,153,0;815:102,204,51;816:153,255,102;817:102,255,0;818:102,255,51;819:51,204,0;820:51,255,0;821:204,255,153;822:153,204,102;823:102,153,51;824:102,153,0;825:153,204,51;826:204,255,102;827:153,255,0;828:204,255,51;829:153,204,0;830:204,255,0;831:153,255,204;832:102,204,153;833:51,153,102;834:0,153,102;835:51,204,153;836:102,255,204;837:0,255,102;838:51,255,204;839:0,204,153;840:0,255,204;841:51,255,153;842:0,204,102;843:0,102,51;844:0,153,51;845:51,204,102;846:102,255,153;847:0,255,153;848:51,255,102;849:0,204,51;850:0,255,51;851:153,204,255;852:102,153,204;853:51,102,153;854:0,51,153;855:51,102,204;856:102,153,255;857:0,102,255;858:51,102,255;859:0,51,204;860:0,51,255;861:51,153,255;862:0,102,204;863:0,51,102;864:0,102,153;865:51,153,204;866:102,204,255;867:0,153,255;868:51,204,255;869:0,153,204;870:0,204,255;871:204,153,255;872:153,102,204;873:102,51,153;874:102,0,153;875:153,51,204;876:204,102,255;877:153,0,255;878:204,51,255;879:153,0,204;880:204,0,255;881:153,51,255;882:102,0,204;883:51,0,102;884:51,0,153;885:102,51,204;886:153,102,255;887:102,0,255;888:102,51,255;889:51,0,204;890:51,0,255;891:255,51,153;892:204,0,102;893:102,0,51;894:153,0,51;895:204,51,102;896:255,102,153;897:255,0,102;898:255,51,102;899:204,0,51;900:255,0,51;901:255,153,204;902:204,102,153;903:153,51,102;904:153,0,102;905:204,51,153;906:255,102,204;907:255,0,153;908:204,0,153;909:255,51,204;910:255,0,153;920:204,204,204;921:153,153,153;922:102,102,102;923:51,51,51;924:53,42,134;925:51,44,137;926:50,45,140;927:49,47,143;928:48,48,146;929:46,50,148;930:45,51,151;931:44,53,154;932:43,55,157;933:42,56,160;934:40,58,162;935:39,59,165;936:38,61,168;937:37,63,171;938:35,64,174;939:34,66,176;940:33,67,179;941:32,69,182;942:31,71,185;943:29,72,187;944:28,74,190;945:27,75,193;946:26,77,196;947:24,79,199;948:23,80,201;949:22,82,204;950:21,83,207;951:19,85,210;952:18,86,213;953:17,88,215;954:16,90,218;955:15,91,221;956:15,92,221;957:15,94,220;958:15,95,220;959:15,96,220;960:15,97,220;961:15,98,220;962:16,99,219;963:16,100,219;964:16,102,219;965:16,103,219;966:16,104,218;967:16,105,218;968:17,106,218;969:17,107,218;970:17,109,217;971:17,110,217;972:17,111,217;973:17,112,217;974:17,113,216;975:18,114,216;976:18,115,216;977:18,117,216;978:18,118,215;979:18,119,215;980:18,120,215;981:18,121,215;982:19,122,215;983:19,123,214;984:19,125,214;985:19,126,214;986:19,127,214;987:19,128,213;988:19,129,213;989:19,130,213;990:18,131,212;991:18,132,212;992:17,134,211;993:17,135,211;994:16,136,211;995:16,137,210;996:15,138,210;997:15,139,210;998:15,140,209;999:14,141,209;1000:14,142,208;1001:13,143,208;1002:13,145,208;1003:12,146,207;1004:12,147,207;1005:12,148,207;1006:11,149,206;1007:11,150,206;1008:10,151,205;1009:10,152,205;1010:9,153,205;1011:9,154,204;1012:8,155,204;1013:8,157,204;1014:8,158,203;1015:7,159,203;1016:7,160,202;1017:6,161,202;1018:6,162,202;1019:5,163,201;1020:7,164,200;1021:8,164,199;1022:9,165,198;1023:10,166,197;1024:12,166,195;1025:13,167,194;1026:14,167,193;1027:15,168,192;1028:17,169,191;1029:18,169,189;1030:19,170,188;1031:20,170,187;1032:22,171,186;1033:23,172,185;1034:24,172,184;1035:25,173,182;1036:27,173,181;1037:28,174,180;1038:29,175,179;1039:30,175,178;1040:32,176,176;1041:33,176,175;1042:34,177,174;1043:35,178,173;1044:37,178,172;1045:38,179,170;1046:39,180,169;1047:40,180,168;1048:42,181,167;1049:43,181,166;1050:44,182,165;1051:45,183,163;1052:48,183,162;1053:51,183,161;1054:54,183,159;1055:57,184,158;1056:59,184,156;1057:62,184,155;1058:65,184,154;1059:68,185,152;1060:71,185,151;1061:73,185,149;1062:76,185,148;1063:79,186,146;1064:82,186,145;1065:84,186,144;1066:87,186,142;1067:90,187,141;1068:93,187,139;1069:96,187,138;1070:98,187,137;1071:101,188,135;1072:104,188,134;1073:107,188,132;1074:110,188,131;1075:112,189,130;1076:115,189,128;1077:118,189,127;1078:121,189,125;1079:124,190,124;1080:126,190,123;1081:129,190,121;1082:132,190,120;1083:135,191,118;1084:137,190,117;1085:139,190,117;1086:142,190,116;1087:144,190,115;1088:146,190,114;1089:148,190,113;1090:151,190,112;1091:153,190,111;1092:155,189,110;1093:158,189,109;1094:160,189,108;1095:162,189,107;1096:165,189,106;1097:167,189,105;1098:169,189,104;1099:171,188,104;1100:174,188,103;1101:176,188,102;1102:178,188,101;1103:181,188,100;1104:183,188,99;1105:185,188,98;1106:188,188,97;1107:190,187,96;1108:192,187,95;1109:194,187,94;1110:197,187,93;1111:199,187,92;1112:201,187,92;1113:204,187,91;1114:206,186,90;1115:208,186,89;1116:210,187,88;1117:211,187,86;1118:212,188,85;1119:214,188,84;1120:215,188,83;1121:217,189,81;1122:218,189,80;1123:220,190,79;1124:221,190,78;1125:222,191,77;1126:224,191,75;1127:225,191,74;1128:227,192,73;1129:228,192,72;1130:229,193,70;1131:231,193,69;1132:232,194,68;1133:234,194,67;1134:235,194,66;1135:236,195,64;1136:238,195,63;1137:239,196,62;1138:241,196,61;1139:242,197,59;1140:244,197,58;1141:245,197,57;1142:246,198,56;1143:248,198,55;1144:249,199,53;1145:251,199,52;1146:252,200,51;1147:253,200,50;1148:253,202,49;1149:253,203,47;1150:253,205,46;1151:253,206,45;1152:253,208,44;1153:252,209,43;1154:252,211,42;1155:252,213,41;1156:252,214,39;1157:252,216,38;1158:252,217,37;1159:252,219,36;1160:251,220,35;1161:251,222,34;1162:251,224,33;1163:251,225,31;1164:251,227,30;1165:251,228,29;1166:250,230,28;1167:250,231,27;1168:250,233,26;1169:250,235,25;1170:250,236,23;1171:250,238,22;1172:250,239,21;1173:249,241,20;1174:249,242,19;1175:249,244,18;1176:249,246,17;1177:249,247,16;1178:249,249,14","fBuf":[924,925,926,927,928,929,930,931,932,933,934,935,936,937,938,939,940,941,942,943,944,945,946,947,948,949,950,951,952,953,954,955,956,957,958,959,960,961,962,963,964,965,966,967,968,969,970,971,972,973,974,975,976,977,978,979,980,981,982,983,984,985,986,987,988,989,990,991,992,993,994,995,996,997,998,999,1000,1001,1002,1003,1004,1005,1006,1007,1008,1009,1010,1011,1012,1013,1014,1015,1016,1017,1018,1019,1020,1021,1022,1023,1024,1025,1026,1027,1028,1029,1030,1031,1032,1033,1034,1035,1036,1037,1038,1039,1040,1041,1042,1043,1044,1045,1046,1047,1048,1049,1050,1051,1052,1053,1054,1055,1056,1057,1058,1059,1060,1061,1062,1063,1064,1065,1066,1067,1068,1069,1070,1071,1072,1073,1074,1075,1076,1077,1078,1079,1080,1081,1082,1083,1084,1085,1086,1087,1088,1089,1090,1091,1092,1093,1094,1095,1096,1097,1098,1099,1100,1101,1102,1103,1104,1105,1106,1107,1108,1109,1110,1111,1112,1113,1114,1115,1116,1117,1118,1119,1120,1121,1122,1123,1124,1125,1126,1127,1128,1129,1130,1131,1132,1133,1134,1135,1136,1137,1138,1139,1140,1141,1142,1143,1144,1145,1146,1147,1148,1149,1150,1151,1152,1153,1154,1155,1156,1157,1158,1159,1160,1161,1162,1163,1164,1165,1166,1167,1168,1169,1170,1171,1172,1173,1174,1175,1176,1177,1178]}},{"_typename":"TWebSnapshot","fUniqueID":0,"fBits":0,"fObjectID":"","fOption":"","fKind":5,"fSnapshot":{"_typename":"TStyle","fUniqueID":0,"fBits":0,"fName":"Modern","fTitle":"Modern Style","fLineColor":1,"fLineStyle":1,"fLineWidth":1,"fFillColor":19,"fFillStyle":1001,"fMarkerColor":1,"fMarkerStyle":1,"fMarkerSize":1,"fTextAngle":0,"fTextSize":0.05,"fTextAlign":11,"fTextColor":1,"fTextFont":62,"fXaxis":{"_typename":"TAttAxis","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42},"fYaxis":{"_typename":"TAttAxis","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":0,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42},"fZaxis":{"_typename":"TAttAxis","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42},"fBarWidth":1,"fBarOffset":0,"fColorModelPS":0,"fDrawBorder":0,"fOptLogx":0,"fOptLogy":0,"fOptLogz":0,"fOptDate":0,"fOptStat":1111,"fOptTitle":1,"fOptFile":0,"fOptFit":0,"fShowEventStatus":0,"fShowEditor":0,"fShowToolBar":0,"fNumberContours":20,"fAttDate":{"_typename":"TAttText","fTextAngle":0,"fTextSize":0.025,"fTextAlign":11,"fTextColor":1,"fTextFont":62},"fDateX":0.01,"fDateY":0.01,"fEndErrorSize":2,"fErrorX":0.5,"fFuncColor":2,"fFuncStyle":1,"fFuncWidth":2,"fGridColor":0,"fGridStyle":3,"fGridWidth":1,"fLegendBorderSize":1,"fLegendFillColor":0,"fLegendFont":42,"fLegendTextSize":0,"fHatchesLineWidth":1,"fHatchesSpacing":1,"fFrameFillColor":0,"fFrameLineColor":1,"fFrameFillStyle":1001,"fFrameLineStyle":1,"fFrameLineWidth":1,"fFrameBorderSize":1,"fFrameBorderMode":0,"fHistFillColor":0,"fHistLineColor":602,"fHistFillStyle":1001,"fHistLineStyle":1,"fHistLineWidth":1,"fHistMinimumZero":false,"fHistTopMargin":0.05,"fCanvasPreferGL":false,"fCanvasColor":0,"fCanvasBorderSize":2,"fCanvasBorderMode":0,"fCanvasDefH":500,"fCanvasDefW":700,"fCanvasDefX":10,"fCanvasDefY":10,"fPadColor":0,"fPadBorderSize":2,"fPadBorderMode":0,"fPadBottomMargin":0.1,"fPadTopMargin":0.1,"fPadLeftMargin":0.1,"fPadRightMargin":0.1,"fPadGridX":false,"fPadGridY":false,"fPadTickX":0,"fPadTickY":0,"fPaperSizeX":20,"fPaperSizeY":26,"fScreenFactor":1,"fStatColor":0,"fStatTextColor":1,"fStatBorderSize":1,"fStatFont":42,"fStatFontSize":0,"fStatStyle":1001,"fStatFormat":"6.4g","fStatX":0.98,"fStatY":0.935,"fStatW":0.2,"fStatH":0.16,"fStripDecimals":true,"fTitleAlign":23,"fTitleColor":0,"fTitleTextColor":1,"fTitleBorderSize":0,"fTitleFont":42,"fTitleFontSize":0.05,"fTitleStyle":0,"fTitleX":0.5,"fTitleY":0.995,"fTitleW":0,"fTitleH":0,"fLegoInnerR":0.5,"fLineStyles":["","  "," 12 12"," 4 8"," 12 16 4 16"," 20 12 4 12"," 20 12 4 12 4 12 4 12"," 20 20"," 20 12 4 12 4 12"," 80 20"," 80 40 4 40","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  "],"fHeaderPS":"","fTitlePS":"","fFitFormat":"5.4g","fPaintTextFormat":"g","fLineScalePS":3,"fJoinLinePS":0,"fCapLinePS":0,"fTimeOffset":788918400,"fImageScaling":1,"fCandleWhiskerRange":1,"fCandleBoxRange":0.5,"fCandleScaled":false,"fViolinScaled":true,"fXAxisExpXOffset":0,"fXAxisExpYOffset":0,"fYAxisExpXOffset":0,"fYAxisExpYOffset":0,"fAxisMaxDigits":5,"fOrthoCamera":false}},{"_typename":"TWebSnapshot","fUniqueID":0,"fBits":0,"fObjectID":"","fOption":"","fKind":1,"fSnapshot":{"_typename":"TFrame","fUniqueID":0,"fBits":8,"fLineColor":1,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":1001,"fX1":200,"fY1":0,"fX2":1400,"fY2":16964.85,"fBorderSize":1,"fBorderMode":0}},{"_typename":"TWebSnapshot","fUniqueID":0,"fBits":0,"fObjectID":"","fOption":"nostack","fKind":1,"fSnapshot":{"_typename":"THStack","fUniqueID":0,"fBits":8,"fName":"stack3","fTitle":"S2, S3, and CAL17 data for Run 1722178299","fHists":{"_typename":"TList","name":"TList","arr":[{"_typename":"TH1I","fUniqueID":0,"fBits":8,"fName":"s2_no_absorber_hist","fTitle":"S2","fLineColor":210,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":1001,"fMarkerColor":1,"fMarkerStyle":1,"fMarkerSize":1,"fNcells":102,"fXaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"xaxis","fTitle":"","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":100,"fXmin":0,"fXmax":4096,"fXbins":[],"fFirst":1,"fLast":100,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fYaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"yaxis","fTitle":"","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":0,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":1,"fXmin":0,"fXmax":1,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fZaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"zaxis","fTitle":"","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":1,"fXmin":0,"fXmax":1,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fBarOffset":0,"fBarWidth":1000,"fEntries":56630,"fTsumw":56630,"fTsumw2":56630,"fTsumwx":31051884,"fTsumwx2":17799911868,"fMaximum":-1111,"fMinimum":-1111,"fNormFactor":0,"fContour":[],"fSumw2":[],"fOption":"","fFunctions":{"_typename":"TList","name":"TList","arr":[],"opt":[]},"fBufferSize":0,"fBuffer":[],"fBinStatErrOpt":0,"fStatOverflows":2,"fArray":[0,0,0,0,1,1,0,0,5,15,1613,7951,11081,10263,7936,5622,3930,2662,1730,1191,827,540,367,245,184,132,95,74,36,38,29,17,11,5,9,5,1,3,1,2,3,0,0,0,1,1,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{"_typename":"TH1I","fUniqueID":0,"fBits":8,"fName":"s3_no_absorber_hist","fTitle":"S3","fLineColor":92,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":1001,"fMarkerColor":1,"fMarkerStyle":1,"fMarkerSize":1,"fNcells":102,"fXaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"xaxis","fTitle":"","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":100,"fXmin":0,"fXmax":4096,"fXbins":[],"fFirst":1,"fLast":100,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fYaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"yaxis","fTitle":"","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":0,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":1,"fXmin":0,"fXmax":1,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fZaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"zaxis","fTitle":"","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":1,"fXmin":0,"fXmax":1,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fBarOffset":0,"fBarWidth":1000,"fEntries":56630,"fTsumw":56630,"fTsumw2":56630,"fTsumwx":34767339,"fTsumwx2":22776546941,"fMaximum":-1111,"fMinimum":-1111,"fNormFactor":0,"fContour":[],"fSumw2":[],"fOption":"","fFunctions":{"_typename":"TList","name":"TList","arr":[],"opt":[]},"fBufferSize":0,"fBuffer":[],"fBinStatErrOpt":0,"fStatOverflows":2,"fArray":[0,0,0,0,0,0,0,0,4,7,478,589,1165,12764,16157,8450,4688,2885,1984,1504,1242,961,754,590,458,392,332,234,235,155,110,83,51,46,48,32,33,14,21,20,12,11,8,2,5,8,8,6,5,4,6,9,5,3,4,5,4,3,1,2,6,3,3,2,2,4,3,2,1,2,0,0,0,2,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{"_typename":"TH1I","fUniqueID":0,"fBits":8,"fName":"cal17_no_absorber_hist","fTitle":"CAL17","fLineColor":46,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":1001,"fMarkerColor":1,"fMarkerStyle":1,"fMarkerSize":1,"fNcells":102,"fXaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"xaxis","fTitle":"","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":100,"fXmin":0,"fXmax":4096,"fXbins":[],"fFirst":1,"fLast":100,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fYaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"yaxis","fTitle":"","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":0,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":1,"fXmin":0,"fXmax":1,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fZaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"zaxis","fTitle":"","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":1,"fXmin":0,"fXmax":1,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fBarOffset":0,"fBarWidth":1000,"fEntries":56630,"fTsumw":56630,"fTsumw2":56630,"fTsumwx":55270494,"fTsumwx2":54510395142,"fMaximum":-1111,"fMinimum":-1111,"fNormFactor":0,"fContour":[],"fSumw2":[],"fOption":"","fFunctions":{"_typename":"TList","name":"TList","arr":[],"opt":[]},"fBufferSize":0,"fBuffer":[],"fBinStatErrOpt":0,"fStatOverflows":2,"fArray":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,76,1022,2669,2751,2716,3049,3635,6263,11826,14090,6892,1470,130,12,11,8,6,3,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}],"opt":["","",""]},"fHistogram":{"_typename":"TH1F","fUniqueID":0,"fBits":512,"fName":"stack3","fTitle":"S2, S3, and CAL17 data for Run 1722178299","fLineColor":602,"fLineStyle":1,"fLineWidth":0,"fFillColor":0,"fFillStyle":1001,"fMarkerColor":1,"fMarkerStyle":1,"fMarkerSize":1,"fNcells":102,"fXaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"xaxis","fTitle":"QDC count","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":100,"fXmin":200,"fXmax":1400,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fYaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"yaxis","fTitle":"#Occurances","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":0,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":1,"fXmin":0,"fXmax":1,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fZaxis":{"_typename":"TAxis","fUniqueID":0,"fBits":0,"fName":"zaxis","fTitle":"","fNdivisions":510,"fAxisColor":1,"fLabelColor":1,"fLabelFont":42,"fLabelOffset":0.005,"fLabelSize":0.035,"fTickLength":0.03,"fTitleOffset":1,"fTitleSize":0.035,"fTitleColor":1,"fTitleFont":42,"fNbins":1,"fXmin":0,"fXmax":1,"fXbins":[],"fFirst":0,"fLast":0,"fBits2":0,"fTimeDisplay":false,"fTimeFormat":"","fLabels":null,"fModLabs":null},"fBarOffset":0,"fBarWidth":1000,"fEntries":0,"fTsumw":0,"fTsumw2":0,"fTsumwx":0,"fTsumwx2":0,"fMaximum":16964.85,"fMinimum":0,"fNormFactor":0,"fContour":[],"fSumw2":[],"fOption":"","fFunctions":{"_typename":"TList","name":"TList","arr":[],"opt":[]},"fBufferSize":0,"fBuffer":[],"fBinStatErrOpt":0,"fStatOverflows":2,"fArray":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"fMaximum":-1111,"fMinimum":-1111}},{"_typename":"TWebSnapshot","fUniqueID":0,"fBits":0,"fObjectID":"","fOption":"blNDC","fKind":1,"fSnapshot":{"_typename":"TPaveText","fUniqueID":0,"fBits":9,"fLineColor":1,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":0,"fX1":407.491632947156,"fY1":17733.7553722782,"fX2":1192.50836705284,"fY2":18979.4261950359,"fX1NDC":0.238327759197324,"fY1NDC":0.936258746027113,"fX2NDC":0.761672240802676,"fY2NDC":0.995000004768372,"fBorderSize":0,"fInit":1,"fShadowColor":1,"fCornerRadius":0,"fOption":"blNDC","fName":"title","fTextAngle":0,"fTextSize":0,"fTextAlign":22,"fTextColor":1,"fTextFont":42,"fLabel":"","fLongest":41,"fMargin":0.05,"fLines":{"_typename":"TList","name":"TList","arr":[{"_typename":"TLatex","fUniqueID":0,"fBits":0,"fName":"","fTitle":"S2, S3, and CAL17 data for Run 1722178299","fTextAngle":0,"fTextSize":0,"fTextAlign":0,"fTextColor":0,"fTextFont":0,"fX":0,"fY":0,"fLineColor":1,"fLineStyle":1,"fLineWidth":2,"fLimitFactorSize":3,"fOriginSize":0.0499300695955753}],"opt":[""]}}},{"_typename":"TWebSnapshot","fUniqueID":0,"fBits":0,"fObjectID":"","fOption":"","fKind":1,"fSnapshot":{"_typename":"TLegend","fUniqueID":0,"fBits":8,"fLineColor":1,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":1001,"fX1":1100.00000447035,"fY1":12723.637563199,"fX2":1505.00001050532,"fY2":18534.0987747816,"fX1NDC":0.7,"fY1NDC":0.7,"fX2NDC":0.97,"fY2NDC":0.974,"fBorderSize":1,"fInit":1,"fShadowColor":1,"fCornerRadius":0,"fOption":"brNDC","fName":"TPave","fTextAngle":0,"fTextSize":0,"fTextAlign":12,"fTextColor":1,"fTextFont":42,"fPrimitives":{"_typename":"TList","name":"TList","arr":[{"_typename":"TLegendEntry","fUniqueID":0,"fBits":0,"fTextAngle":0,"fTextSize":0,"fTextAlign":0,"fTextColor":0,"fTextFont":42,"fLineColor":1,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":0,"fMarkerColor":1,"fMarkerStyle":21,"fMarkerSize":1,"fObject":null,"fLabel":"Legend","fOption":"h"},{"_typename":"TLegendEntry","fUniqueID":0,"fBits":0,"fTextAngle":0,"fTextSize":0,"fTextAlign":0,"fTextColor":0,"fTextFont":42,"fLineColor":210,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":1001,"fMarkerColor":1,"fMarkerStyle":1,"fMarkerSize":1,"fObject":{"$ref":17},"fLabel":"S2","fOption":"lpf"},{"_typename":"TLegendEntry","fUniqueID":0,"fBits":0,"fTextAngle":0,"fTextSize":0,"fTextAlign":0,"fTextColor":0,"fTextFont":42,"fLineColor":92,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":1001,"fMarkerColor":1,"fMarkerStyle":1,"fMarkerSize":1,"fObject":{"$ref":22},"fLabel":"S3","fOption":"lpf"},{"_typename":"TLegendEntry","fUniqueID":0,"fBits":0,"fTextAngle":0,"fTextSize":0,"fTextAlign":0,"fTextColor":0,"fTextFont":42,"fLineColor":46,"fLineStyle":1,"fLineWidth":1,"fFillColor":0,"fFillStyle":1001,"fMarkerColor":1,"fMarkerStyle":1,"fMarkerSize":1,"fObject":{"$ref":27},"fLabel":"CAL17","fOption":"lpf"}],"opt":["h","lpf","lpf","lpf"]},"fEntrySeparation":0.1,"fMargin":0.25,"fNColumns":1,"fColumnSeparation":0}}],"fScripts":"","fHighlightConnect":false,"fFixedSize":false});
   Core.settings.HandleKeys = false;
   Core.draw("root_plot_1722867178910", obj, "");
}

function script_load_root_plot_1722867178910(src, on_error) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = function() { display_root_plot_1722867178910(JSROOT); };
    script.onerror = function() { script.remove(); on_error(); };
    document.head.appendChild(script);
}

if (typeof requirejs !== 'undefined') {

    // We are in jupyter notebooks, use require.js which should be configured already
    requirejs.config({
       paths: { 'JSRootCore' : [ 'build/jsroot', 'https://root.cern/js/7.4.3/build/jsroot', 'https://jsroot.gsi.de/7.4.3/build/jsroot' ] }
    })(['JSRootCore'],  function(Core) {
       display_root_plot_1722867178910(Core);
    });

} else if (typeof JSROOT !== 'undefined') {

   // JSROOT already loaded, just use it
   display_root_plot_1722867178910(JSROOT);

} else {

    // We are in jupyterlab without require.js, directly loading jsroot
    // Jupyterlab might be installed in a different base_url so we need to know it.
    try {
        var base_url = JSON.parse(document.getElementById('jupyter-config-data').innerHTML).baseUrl;
    } catch(_) {
        var base_url = '/';
    }

    // Try loading a local version of requirejs and fallback to cdn if not possible.
    script_load_root_plot_1722867178910(base_url + 'static/build/jsroot.js', function(){
        console.error('Fail to load JSROOT locally, please check your jupyter_notebook_config.py file');
        script_load_root_plot_1722867178910('https://root.cern/js/7.4.3/build/jsroot.js', function(){
            document.getElementById("root_plot_1722867178910").innerHTML = "Failed to load JSROOT";
        });
    });
}

</script>



### Questions 

1) Why does the histogramm look different to before?
2) How could we try to recreate the original histogram from the raw data?
3) Can you try to filter out entries before filling the values into the histogramm(s)?
