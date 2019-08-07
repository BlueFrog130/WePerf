<template>
    <v-sheet id="chart-container" :height="height-50" width="100%" light color="white">
        <apex-chart width=100% height=100% type="line" :series="series" :options="options" />
    </v-sheet>
</template>

<script lang="ts">
import Vue from 'vue'
import ApexChart from 'vue-apexcharts'
import { results } from '@/models/iperf.interfaces'

interface Data
{
    client: results,
    server: results
}

interface Series
{
    name:string,
    data:Array<number>
}

export default Vue.extend({
    components:
    {
        ApexChart
    },
    props:
    {
        results: Object as () => Data,
        interval: Number as () => number,
        height: Number as () => any
    },
    data: () => ({
        series: [] as Array<Series>,
        options:{}
    }),
    mounted()
    {
        console.log('mounted')
        this.shred()
    },
    computed:
    {
        
    },
    methods:
    {
        /**
         * Shreds the JSON result from iperf into series and options needed for Apex Charts
         */
        shred():void
        {
            this.series = [
                {
                    name: "Client",
                    data: this.formatSeries(this.results.client)
                },
                {
                    name: "Server",
                    data: this.formatSeries(this.results.server)
                },
            ]

            this.options = {
                toolbar:{
                    show:true
                },
                dataLabels:{
                    enabled:false
                },
                stroke:{
                    curve: 'straight'
                },
                xaxis: {
                    categories: this.xAxis(this.results.client),
                    title:{
                        text:'Seconds'
                    }
                },
                yaxis:{
                    title:{
                        text:'Bytes'
                    },
                    axisTicks:{
                        show: true
                    },
                    axisBorder:{
                        show: true
                    }
                },
                legend:{
                    position:'bottom',
                    horizontalAlign:'right'
                }
            }

        },

        /**
         * Gives array of Sum bytes, will clip off last chunck of data if it does not fit
         * Only looks at the sum of streams, multi-streams not supported
         */
        formatSeries(data:results):Array<number>
        {
            var sums:Array<number> = []

            for(var i = 0, len = data.intervals.length; i < len; i++)
            {
                var interval = data.intervals[i]
                // Ignore tiny intervals -- insigificant loss of data
                if(interval.sum.seconds > 0.05)
                {
                    sums.push(interval.sum.bytes)
                }
            }

            return sums
        },
        xAxis(data:results):Array<number>
        {
            var interval:number = this.interval, intervals:number = data.intervals.filter(i => i.sum.seconds > 0.05).length, axis:Array<number> = []

            for(var i = 1; i <= intervals; i++)
            {
                var num = interval * i
                axis.push(num)
            }
            return axis
        }
    },
})
</script>


<style>
</style>
