---
layout: layouts/project.njk
title: Automated Regression Testing
metaTitle: Automating Regression Testing through GitLab CI
metaDesc: The story about that one time I had to completely modernize a really
  outdated regression testing system.
date: 2021-09-03T16:50:48.983Z
tags:
  - work
  - projects
---
Let's say you make an improvement to a complicated machine. How do you check to make sure that machine works the exact same way before and after the change you made? The last thing you want is for your small improvement to unknowingly mess up other parts of the machine.

In software engineering, we call this **regression testing**. We're literally testing to see if a change in one part of the project has caused the project's behavior as a whole to **regress** to a buggier, less-desirable state. As you can probably imagine, it's pretty important to do, especially for big projects.

The only issue is that testing takes **time**, and time is something developers tend to be short on.

**This was exactly the situation I found myself in.**

The team I was working on had a regression testing tool, built with C++, but it was tricky to set up and had to be run manually for every change. Did I mention each regression test could easily take multiple hours? In other words, if you found a **regression** (a bug that happened because of your change), you'd have to fix the bug, and then run regression tests *again* until you found no regressions.

Needless to say, this was not optimal.

I was tasked with modifying the regression tool so that it could be integrated into our GitLab repository's **CI** (continuous integration). This would make it so whenever a developer pushed a change to our repository, the tests would be run automatically, and the developer would be free to work on something else.

There were a few issues with the regression tool that needed to be addressed to make it compatible with GitLab's CI. Among them:
* The tool took all of its configuration through a config file specified elsewhere. This made it very clunky to fit into the command line-based CI process.
* Part of the tool's testing process was to clone and build the project that was being tested. This needed to be toggled off when running in GitLab, since GitLab already builds the project as part of its pipeline.
* The tool had no way to compare against results of a previous regression test. This meant every test had to be run every single time for a complete report, which was inefficient.

----

## Modernizing the tool

My first priority was implementing an easily scalable way to use command line switches with the tool. The tool had been previously designed to use hardcoded switches, which were suboptimal and hard to work with. I replaced them with a standard [getopt](https://www.gnu.org/software/libc/manual/html_node/Getopt.html) setup, which allowed for **much** easier implementation of command line options.

With `getopt` implemented, I added a `-g/--gitlab` switch to disable certain aspects of the tool for use with GitLab CI. Specifically, using `-g` disabled the cloning and building processes; it only executed and ran tests on the project.

Next, I started the process of migrating a bunch of the configuration from the static config file to command line options. For example, the specific regression suite to run was moved to the command line as the default argument. This made the tool more intuitive to use.

We often ran into problems while running regressions because we forgot to update the repository containing them. To fix that, I also made the tool automatically fetch any new tests from the remote GitLab repository, so that they'd always be up-to-date.

Believe it or not, the tool also used to output its test results to a report with a hardcoded name. This meant that any subsequent runs would overwrite the report. To remedy that, I changed the reports to be named dynamically based on the time of the test and the regression suite that was being run.

Another important feature: being able to compare regression results against previous runs. I added functionality to the tool that output more fine-grained results to a folder, which could then be read from in subsequent runs to compare against.

The tool was now in a state where it could be used in GitLab's CI, but the pipeline was still far from perfect. Each pipeline run could take hours to complete its full test, and with a limited number of runners, the tests would bottleneck the pipeline. 

That still remains a problem to this day, but I was able to mitigate it massively by multithreading the regression tests. For reference, this brought the total test time down by **over 70%**.

Nowadays, our team only has to run manual regression tests in exceptional circumstances (or when something breaks). I consider that a success!

