# WePerf
### IPerf, YouPerf... WePerf

## Why WePerf?
iPerf can be a real hassle sometimes. It requires to set up a server, set up a client, refer to the documentation and see what parameters need to be inputed, then you need to run the command and check the results manually and copy them down.

That process was just too much for me, so I made an Electron application to do it all for me on a single machine!

This application runs both the client and server with the ability to ssh into any machine on the network and run the test, provided it has iPerf3 installed that is. Not only does it make running the test a breeze, it also displays a graphical output of the results with the ability to save them.

### Similar to WePerf
This application was inspired by [JPerf](https://github.com/andygrove/jperf).

### Features
* Graphical User Interface for iPerf
* Save presets for quick re-testing
* Displayed graph of both client and server data
* Downloadable data & graph
* Basic Mininet Integration

### Todo:
* OpenDaylight Integration
* Advanced Mininet Integration (building and visualizing topologies)
