import Store from 'electron-store'

const store = new Store({
    name: 'presets.config',
    defaults: {
        iperf: [],
    }
})

export class Iperf {
    // TODO: Add all iperf options
    // Properties
    public name?:String;
    public interval?:Number;
    public format?:Format;
    public client:Client;
    public server:Server;

    // Constructors
    constructor(iperf?:perf){
        this.name = iperf && iperf.name
        this.interval = iperf && iperf.interval
        this.format = iperf && iperf.format
        this.client = { protocol: Protocol.TCP, units: Units.K, reverse: false }
        this.server = {}
    }

    // Methods
    public getClientCommand():Array<String> {
        var arr = new Array<String>()
        arr.push('-J')
        if(this.client && this.client.host) {
            arr.push('-c')
            arr.push(this.client.host)
        }
        if(this.format){
            arr.push('-f')
            arr.push(this.format)
        }
        if(this.interval){
            arr.push('-i')
            arr.push(this.interval.toString())
        }
        if(this.client && this.client.protocol == Protocol.UDP){
            arr.push('-u')
        }
        if(this.client && this.client.bandwidth && this.client.units){
            arr.push('-b')
            arr.push(`${this.client.bandwidth}${this.client.units}`)
        }
        if(this.client && this.client.time){
            arr.push('-t')
            arr.push(this.client.time.toString())
        }
        if(this.client.reverse == true){
            arr.push('-R')
        }
        if(this.client.omit){
            arr.push('-O')
            arr.push(this.client.omit.toString())
        }
        if(this.interval){
            arr.push('-i')
            arr.push(this.interval.toString())
        }
        console.log(arr)
        return arr
    }
    public getServerCommand():Array<String> {
        var arr = new Array<String>()
        arr.push('-J')
        arr.push('-s')
        console.log(arr)
        return arr
    }
    
    public run():any{
        const { spawn } = require('child_process')
        var path = require('path')
        var iperf3 = path.normalize(process.cwd()+'/src/assets/iperf/win/iperf3.exe')
        
        var server = spawn(iperf3, this.getServerCommand())
        var client = spawn(iperf3, this.getClientCommand())

        var returnData:any = {client, server}

        server.stdout.on('data', (data:any) => {
            console.log(JSON.parse(data.toString()))
            returnData.server = JSON.parse(data.toString())
        })
        client.stdout.on('data', (data:any) => {
            console.log(JSON.parse(data.toString()))
            returnData.client = JSON.parse(data.toString())
        })

        client.on('close', () => {
            console.log('killing...')
            server.kill('SIGINT')
        })

        return returnData
    }
    
}
export interface perf{
    name?:String,
    interval?:Number,
    format?:Format,
    client:Client,
    server:Server
}
export interface Client{
    remote?:String,    // NOT IPERF -- option to ssh into another device and run ssh
    host?:String,      // -c | host IP
    protocol:Protocol,  // -u | sets udp (default tcp)
    bandwidth?:Number, // -b n[units] | bandwidth in [units]bits/s
    units?:Units,     // K/M | kbit/s or mbit/s
    time?:Number,      // -t n | seconds to run
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

export enum Protocol{
    TCP = "TCP",
    UDP = "UDP"
}
export enum Units{
    K = "K",
    M = "M"
}
export enum Format{
    k = "k", //kbit/s
    m = "m", //mbit/s
    K = "K", //kbyte/s
    M = "M" //mbyte/s
}