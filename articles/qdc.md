Charge to Digital Converters
============================

QDC a.k.a a charge to digital converter allows you to measure the charge that passes through it. It comes in all shapes and sizes ranging from an electrical component to the impressive CAEN v792AC (see picture below) that we are using.

![](/qdc1.jpeg)

Now let's look at the current at the QDC's input.

![](/qdc2.png)

As you can see, there is a very strong background in addition to the current signal caused by a detector. For the noise to contribute as little as possible to our reading, and also to not lose any of the actual signal, we must pick a very specific integration window. On the picture you can see the thought process behind why the specific $t_{start}$ and $t_{end}$ were chosen. The same situation but in real life (and with voltage not current), on an oscilloscope...

![](/qdc3.png)

The green signal here is known as a `GATE` signal. The gate carries the information about $t\_{start}$ and $t\_{end}$. When the gate goes `LOW`, our switch closes and current begins flowing onto one plate of the capacitor. To open the switch, the gate must become `HIGH` again. An uncharged capacitor initially acts as a wire, so a short-enough current signal that has just been let though the gate, will just go through the capacitor unbothered. Although it does not actually flow _through_ it, instead the capacitor is being charged but the changing electric field creates a displacement current between the capacitor plates. Anyways, when the gate closes and the capacitor has just reached its maximum voltage, the ADC chimes in and measures the maximum voltage (and hence maximum charge on the capacitor) that was achieved during this cycle.

![](/qdc4.png)

The inner workings of a QDC.

What opens and closes the gate? It's a so-called gate generator that receives the signal slightly earlier than the other components. This is because the other elements have a delay line attached to them, but the gate does not. When the gate generator detects a rise in current, it opens the gate just in time for the signal to arrive at the gate.

By the way, more often than not, the current entering a QDC is not only $I(t)$, our signal. There is also a pedestal current – a constant current which is generated inside a QDC by default. Its purpose is to reduce the relative error on the ADC reading (I'm not sure why this is important, since after subtracting the pedestal current in data analysis, the relative error will still be the same) and to bring the capacitor into a mode where it is working linearly, meaning the real capacitance coincides with the nominal one. The pedestal current also depends on the wires being used, so it must always be determined experimentally (and separately for every channel!). It is common practice to not deduct your pedestal current from the measurement results, but in an ideal world this deduction is always made.
