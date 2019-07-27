"use strict"
export default class {
    // TODO: Add all iperf options
    
    interval;
    format;
    client = {
        remote,    // NOT IPERF -- option to ssh into another device and run ssh
        host,      // -c | host IP
        protocol,  // -u | sets udp (default tcp)
        bandwidth, // -b n[units] | bandwidth in [units]bits/s
        units,     // K/M | kbit/s or mbit/s
        time,      // -t n | seconds to run
        reverse,   // -R | reverses flow
        omit,      // -O n | omits first n seconds
        // Client options not included: 
        //      --sctp | uses sctp rather than tcp
        //      -n n[KM] | number of buffers to transmit
        //      -k n[KM] | number of packets to transmit (overwrites time)
        //      -l n[KM] | number of buffers to read/write
        //      -p n | The number of simultaneous connections to make
        //      -M n | Attempt to set the TCP maximum segment size (MSS).
        //      -N | Set the TCP no delay option, disabling Nagle's algorithm. 
        //      -4 | only use IPv4
        //      -6 | only use IPv6
        //      -S n | The type-of-service for outgoing packets. (Many routers ignore the TOS field.)
        //      -L n | Set the IPv6 flow label (currently only supported on Linux).
        //      -Z | Use a "zero copy" method of sending data, such as sendfile(2), instead of the usual write(2). This uses much less CPU.
        //      -T str | Prefix every output line with this string.
        //      -C algo | Set the congestion control algorithm (Linux only for iPerf 3.0, Linux and FreeBSD for iPerf 3.1).
    }
    server = {
        remote, // NOT IPERF -- option to ssh into another device and run ssh
    }

    constructor(interval, format, client, server){
        this.interval = interval
        this.format = format
        
        Object.preventExtensions(this.client)
        this.client = client

        Object.preventExtensions(this.server)
        this.server = server
    }
}