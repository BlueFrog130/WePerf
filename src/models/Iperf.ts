import Store from 'electron-store'

const store = new Store(
    {
        name: 'presets.config',
        defaults: {
            iperf: [],
        }
    }
)

export class Iperf
{
    // TODO: Add all iperf options
    // Properties
    public name?:string;
    public interval?:number;
    public format?:Format;
    public client:Client;
    public server:Server;
    public port?:number

    // Constructors
    constructor(iperf?:perf)
    {
        this.name = iperf && iperf.name
        this.interval = iperf && iperf.interval
        this.format = iperf && iperf.format
        this.client = { protocol: Protocol.TCP, units: Units.K, reverse: false, remote: { ip: undefined, user: undefined, password: undefined } }
        this.server = { remote: { ip: undefined, user: undefined, password: undefined } }
        this.port = iperf && iperf.port
    }

    // Methods
    public getClientCommand():Array<string>
    {
        var arr = new Array<string>()
        arr.push('-J')
        if(this.client && this.client.host)
        {
            arr.push('-c')
            arr.push(this.client.host)
        }

        if(this.format)
        {
            arr.push('-f')
            arr.push(this.format)
        }

        if(this.interval)
        {
            arr.push('-i')
            arr.push(this.interval.toString())
        }
        
        if(this.client && this.client.protocol == Protocol.UDP)
        {
            arr.push('-u')
        }

        if(this.client && this.client.bandwidth && this.client.units)
        {
            arr.push('-b')
            arr.push(`${this.client.bandwidth}${this.client.units}`)
        }

        if(this.client && this.client.time)
        {
            arr.push('-t')
            arr.push(this.client.time.toString())
        }

        if(this.client && this.client.reverse == true)
        {
            arr.push('-R')
        }
        
        if(this.client.omit)
        {
            arr.push('-O')
            arr.push(this.client.omit.toString())
        }
        
        if(this.interval)
        {
            arr.push('-i')
            arr.push(this.interval.toString())
        }
        
        if(this.port)
        {
            arr.push('-p')
            arr.push(this.port.toString())
        }
        
        return arr
    }

    public getServerCommand():Array<string> 
    {
        var arr = new Array<string>()
        arr.push('-J')
        arr.push('-s')
        if(this.interval)
        {
            arr.push('-i')
            arr.push(this.interval.toString())
        }
        
        return arr
    }
    
    public run():any
    {
        this.undefinedConverter()
        const { spawn } = require('child_process')
        var path = require('path')
        var iperf3 = path.normalize(process.cwd()+'/src/assets/iperf/win/iperf3.exe')
        var returnData:any = {client, server}

        if(!this.isUndefined(this.client.remote))
        {
            console.warn('not implemented')
        }
        else
        {
            var client = spawn(iperf3, this.getClientCommand())
            client.stdout.on('data', (data:any) => {
                console.log(JSON.parse(data.toString()))
                returnData.client = JSON.parse(data.toString())
            })
            client.on('close', () => {
                console.log('killing...')
                server.kill('SIGINT')
            })
        }

        if(!this.isUndefined(this.server.remote))
        {
            console.warn('not implemented')
        }
        else
        {
            var server = spawn(iperf3, this.getServerCommand())
            server.stdout.on('data', (data:any) => {
                console.log(JSON.parse(data.toString()))
                returnData.server = JSON.parse(data.toString())
            })

        }

        return returnData
    }

    private isUndefined(obj:Remote):boolean
    {
        return Object.values(obj).every(v => v == undefined)
    }

    private undefinedConverter():void
    {
        this.interval = (this.interval == 0) ? undefined : this.interval
        this.name = (this.name == '') ? undefined : this.name
        this.port = (this.port == 0) ? undefined : this.port
        var clientKeys = Object.keys(this.client) as any[]
        for(var i = 0; i < clientKeys.length; i++)
        {
            if(this.client[clientKeys[i]] == 0 || this.client[clientKeys[i]] == '')
            {
                this.client[clientKeys[i]] = undefined
            }
        }
        var serverKeys = Object.keys(this.server) as any[]
        for(i = 0; i < serverKeys.length; i++)
        {
            if(this.server[serverKeys[i]] == 0 || this.server[serverKeys[i]] == '')
            {
                this.server[serverKeys[i]] = undefined
            }
        }
    }
    
}
export interface perf
{
    name?:string,
    interval?:number,
    format?:Format,
    client:Client,
    server:Server,
    port?:number
}

export interface Client
{
    remote:Remote,

    host?:string,      // -c | host IP
    protocol:Protocol,  // -u | sets udp (default tcp)
    bandwidth?:number, // -b n[units] | bandwidth in [units]bits/s
    units?:Units,     // K/M | kbit/s or mbit/s
    time?:number,      // -t n | seconds to run
    reverse?:boolean,   // -R | reverses flow
    omit?:number,      // -O n | omits first n seconds
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

export interface Server
{
    remote:Remote
}

export interface Remote
{
    ip?:string,
    user?:string,
    password?:string,
}

export enum Protocol
{
    TCP = "TCP",
    UDP = "UDP"
}

export enum Units
{
    K = "K",
    M = "M"
}

export enum Format
{
    k = "k", //kbit/s
    m = "m", //mbit/s
    K = "K", //kbyte/s
    M = "M" //mbyte/s
}