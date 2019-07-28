export class Iperf {
    // TODO: Add all iperf options

    // Properties
    public interval:Number;
    public format:Format;
    public client:Client;
    public server:Server;


    // Constructors
    constructor(interval:Number = 1, format:Format = Format.M, client:Client, server:Server){
        this.interval = interval
        this.format = format
        this.client = client
        this.server = server
    }

    // Methods
    public getClientCommand():String {
        var cmd = 'iperf -J' // Forces JSON result
        cmd = `${cmd} -c ${this.client.host}`
        cmd = `${cmd} -f ${this.format}`
        cmd = `${cmd} -i ${this.interval}`
        cmd = (this.client.protocol == Protocol.UDP) ? `${cmd} -u` : cmd
        cmd = `${cmd} -b ${this.client.bandwidth}${this.client.units}`
        cmd = `${cmd} -t ${this.client.time}`
        cmd = (this.client.reverse == true) ? `${cmd} -R` : cmd
        cmd = (this.client.omit != undefined && this.client.omit > 0) ? `${cmd} -O ${this.client.omit}` : cmd
        return cmd
    }
    public getServerCommand():String {
        var cmd = 'iperf -J' // Forces JSON result
        cmd = `${cmd} -s`
        return cmd
    }
}

export interface Client{
    remote:String,    // NOT IPERF -- option to ssh into another device and run ssh
        host:String,      // -c | host IP
        protocol:Protocol,  // -u | sets udp (default tcp)
        bandwidth:Number, // -b n[units] | bandwidth in [units]bits/s
        units:Units,     // K/M | kbit/s or mbit/s
        time:Number,      // -t n | seconds to run
        reverse?:Boolean,   // -R | reverses flow
        omit?:Number,      // -O n | omits first n seconds
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

export interface Server{
    remote?:String, // NOT IPERF -- option to ssh into another device and run ssh
}

//Private enum
enum Protocol{
    TCP = "TCP",
    UDP = "UDP"
}
enum Units{
    K = "K",
    M = "M"
}
enum Format{
    k = "k", //kbit/s
    m = "m", //mbit/s
    K = "K", //kbyte/s
    M = "M" //mbyte/s
}