Why to love ROOT
===============

ROOT is a program/library designed to handle large amounts of experimental data, whether from high-energy physics or from other research fields. Here's a little overview about the aspects I find particularly neat about it.

### 1\. The structure

In ROOT, data is groupe together into a forest-themed structure: all data points lie on individual leaves, tied together with others into branches and trees. ![image](/branches.png)

On this picture, you can see one of such trees. You might notice a slight discrepancy between the tree in ROOT and one we'd find in nature – for the ROOT tree, all branches take the same length, and feature the same amount of leaves (grey squares). That is because each branch corresponds to a single output of some detector, and each leaf is a single reading of that channel. These branches must have the same length, because only then can we group together the readings from multiple detectors into coherent measurements.

### 2\. Landau distributions

Yes, there are some Python libraries, which _promise_ to help with creating these distributions, but do they automatically give you all of the parameters of the distribution? Also, any kind of data visualization is just so natural in ROOT. Even the preview of ROOT files is not just a long file of numerical jargon, but it is instead displayed really neatly in the form of histograms (see Figure below). Although this histogram representation makes no sense for some datasets, it is tremendously useful for the other ones.

![image](/Landau.png)

The preview of a ROOT file. The nice Landau distribution is the histogram of QDC counts recorded from a scintillator.
