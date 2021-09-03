---
layout: layouts/project.njk
title: Airline Data Processor
metaTitle: Airline Data Processor
metaDesc: Fun with C++ and pointers.
socialImage: ""
date: 2021-09-01T12:49:50.103Z
tags:
  - airline
  - rule-engine
  - blog
  - projects
---
Working with legacy code can prove a real challenge. C++ interop isn't the most fun thing to work with, especially when trying to juggle data types between languages and when dealing with tight performance restrictions.

**This is exactly the situation I found myself in.**

The scenario seemed simple: read some airline data from one place, do some fancy stuff to it to make it more readable, and put it somewhere else for people to read it.

The hard part: The data updates every single hour, and whatever solution I came up with had to be able to process hundreds of gigabytes and millions of records within that hour. Also, the data source is written in C++, but this solution is in C#.

> I would have saved so much development time if, instead of fighting against the limitations of C# for low-level C++ interop, I'd just used C++ instead

Imagine a freeway. Now imagine that freeway has to be somehow engineered to handle tens of thousands of cars trying to get on every hour and be able to provide the throughput to allow all those cars to make their trip before the next hour's traffic rush. Imagine this freeway isn't just a straight road; it has tolls and branching exits. Now imagine this freeway has two different toll standards, FasTrak on the on-ramps and SunPass on the off-ramps.

![Image of a traffic jam on a congested city road](/images/busy-crowded-traffic-jam-road.jpg "Juuuust like this.")

**This is exactly the situation I found myself in.**

The solution basically had to be engineered from scratch. I was working in C#, but several niceties of the language were out of the question due to performance issues. I had to do a **lot** of low-level coding for this, to the point where I might as well just have used C++ for the project.

For example, the binary C++ struct data stored all the strings within records as `char[]`s, with each `char` being a single byte. The first, naïve approach was to use the [Marshal](https://docs.microsoft.com/en-us/dotnet/api/system.runtime.interopservices.marshal.ptrtostructure?view=net-5.0) class to individually convert each record to the corresponding C# object. This was far too inefficient to meet the hourly cutoff.

I figured out that the speediest way to do this was to use [fixed-size buffers](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/unsafe-code#fixed-size-buffers) in the C# objects. Regular C# strings aren't [blittable](https://docs.microsoft.com/en-us/dotnet/framework/interop/blittable-and-non-blittable-types), which seemingly forced me to use the slow `Marshal` class to marshal the unmanaged C++ structs into their C# equivalents.

By using fixed-size buffers, I was able to make every field in each of the dozens of records blittable, which then allowed me to do the very C++ technique of simply casting a pointer to an object pointer. While unsafe, this was way faster than `Marshal.PtrToStructure`.

In the end, I was able to get the project working and processing all the data in under thirty minutes, easily meeting the hourly cutoff. This had several benefits:

* Since the new data processor received data from a federated data server, it has nearly no downtime. The previous tool used for this purpose read directly from the same data files as the server, which caused regular downtime (nearly twenty minutes out of the hour) whenever the server had to update the data every hour.
* The new data processor sent the processed data directly to a MySQL database, which is much more flexible and easy to work with than the previous bespoke client.

If there's one thing I learned from this project, it's the importance of using the right tool for the job. I would have saved so much development time if, instead of fighting against the limitations of C# for low-level C++ interop, I'd just used C++ instead.

<a href="https://www.freepik.com/photos/city">City photo created by rawpixel.com - www.freepik.com</a>