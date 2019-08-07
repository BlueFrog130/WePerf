export interface results
{
    start:Start,
    end:End,
    intervals:Array<Intervals>
}

export interface Start
{
    accepted_connection?:
    {
        host:string,
        port:number
    }
    connected:Array<Connected>,
    connecting_to:
    {
        host:string,
        port:number
    }
    cookie:string,
    system_info:string,
    tcp_mss_default?:number
    test_start:
    {
        blksize:number,
        blocks:number,
        bytes:number,
        duration:number,
        num_streams:number,
        omit:number,
        protocol:string,
        reverse:number
    }
    timestamp:
    {
        time:string,
        timesecs:number
    }
    version:string
}

export interface End
{
    cpu_utilization_percent:
    {
        host_system:number,
        host_total:number,
        host_user:number,
        remote_system:number,
        remote_total:number,
        remote_user:number
    }
    streams:Array<Stream>,
    sum_recieved:StreamData,
    sum_sent:StreamData
}

export interface Intervals
{
    streams:Array<StreamData>,
    sum:StreamData
}

export interface Connected
{
    local_host:string,
    local_port:number,
    remote_host:string,
    remote_port:number,
    socket?:number
}

export interface Stream
{
    reciever:StreamData
    sender:StreamData
}

export interface StreamData
{
    bits_per_second:number,
    bytes:number,
    end:number,
    seconds:number,
    socket?:number,
    omitted?:boolean,
    start:number
}