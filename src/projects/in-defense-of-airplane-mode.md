---
layout: layouts/project.njk
title: In Defense of Airplane Mode
metaTitle: In Defense of Airplane Mode
metaDesc: Why the oft-maligned setting is secretly useful
date: 2024-11-11T23:45:13.670Z
tags:
  - airplane-mode
  - blog
  - thoughts
---
For many of us, turning on airplane mode is just another part of the bureaucratic, frustrating process of air travel. If we stop to think about *why* it's even needed, most of us will just assume it has something to do with interference and the plane's sensors or something. 

Of course, if that were true, hundreds of planes would fall out of the sky yearly due to negligent passengers leaving their phones on, and I imagine airplane mode enforcement would be **much** stricter. Most of us know that airplane mode still probably exists for a reason, but don't care too much to learn. Some of us even prefer to keep our phones off airplane mode during flights on the off-chance we can grab some cell service and get texts during a flight.

Despite popular conception, the "federal regulations" that are mentioned in every airline safety presentation that require the use of airplane mode are actually from the **FCC**, **not** the FAA. The regulation originated out of a general desire to reduce electromagnetic (or RF) interference with airplane instruments. 

However, cell signals are usually carried on frequencies between 700 MHz and 2100 MHz, far above the bands used by most aircraft radio equipment (\~800 MHz to \~140 MHz). There is also very little evidence to support the idea of passenger electronics interfering with modern aircraft technology. So, ***why airplane mode?***

Another idea is that airplane mode is less to protect the *airplane* and more to protect people on the *ground* from cell interference. To understand why, we need to understand how **cellular internet** works. 

## What even is a "cell"?

Cell networks are named for the (usually hexagonal) **cells** that land areas in the network are split into. Each *cell* in the network has at least one cell tower (or **base station**) which serves its area. Your **cellular device** works by trying to find a nearby tower and, once connected to that tower, sending information to it. That information is then **distributed** to other cells in the network. 

When your phone is connected to a tower, it tries to transmit using as little power as possible for efficiency; this means that your phone **needs less power to "talk" to a closer tower,** much like how you can speak more quietly to a nearby person than one that's further away. However, if your phone can't find a cell tower, it will, to use scientific radio terminology, **scream into the void** as loudly as possible until it gets a signal from another cell tower it can connect to. 

*This, incidentally, is why it is possible to spy on cell traffic with a device that pretends to be a cell tower (known as an **[IMSI-catcher](https://en.wikipedia.org/wiki/IMSI-catcher)**). Fun fact: **IMSI-catchers are used by government agencies to spy on people all the time**, especially protestors or dissidents. **Don't take phones to protests!***

Back to screaming into the void. Your phone, in a desperate effort to get **some sort** of signal, will transmit on **as high a power as possible** and see if anyone responds. This *may* have the effect of drowning out other devices on the network, especially lower-power devices that may be used by ground systems used in air traffic control. It also has a much more immediate implication: **it'll drain the hell out of your battery.** 

## Selfish altruism

All those transmissions take power, and this is also true of Bluetooth, WiFi, and especially GPS connections. This is why live position tracking apps, like Google Maps or Pokémon Go, are real battery hogs. This brings us to the **real, practical reason you should use airplane mode,** not just on flights but also whenever you need to conserve your battery: **mobile network functions are the single biggest drain on your device's battery,** especially if you're somewhere with no signal, and disabling those functions wholesale **stops your phone from wasting battery** on trying to get a signal when there is no signal to be found.

See for yourself. Go to your phone's battery usage breakdown (if it has one) and see how much battery usage is for "**mobile network**" or "**standby.**" Over **45%** of my phone's battery usage in the past twelve hours has been on mobile network functions. This was after an average work day and commute.

Next time you're out late and need to squeeze your battery for another thirty minutes to get home safely, or you're hiking and need to keep some charge in case you get lost, consider **leaving your device on airplane mode when you're not using it.** It could make a big difference.