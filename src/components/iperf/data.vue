<template>
    <v-sheet id="chart-container" :height="height-50" width="100%" light color="white">
        <v-select label="Chart Units" :items="Object.values(units)" @change="setUnits">

        </v-select>
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

enum Units 
{
    KB = "KiloBytes",
    MB = "MegaBytes",
    Bytes = "Bytes"
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
        options:{},
        currentUnits: Units.Bytes,
        units: Units
    }),
    mounted()
    {
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
        },

        setUnits(unit:Units):void
        {
            var scalar:number;
            var unscalar:number;

            switch(unit)
            {
                case Units.KB:
                    scalar = 0.001
                    break

                case Units.MB:
                    scalar = 0.000001
                    break
                
                default:
                    scalar = 1
                    break
            }
            
            switch(this.currentUnits)
            {
                case Units.KB:
                    unscalar = 1000
                    break

                case Units.MB:
                    unscalar = 1000000
                    break
                
                default:
                    unscalar = 1
                    break
            }

            this.series.forEach((value:Series, i:number) => {
                value.data.forEach((num:number, j:number) => {
                    this.series[i].data[j] = this.series[i].data[j]*unscalar;
                    this.series[i].data[j] = this.series[i].data[j]*scalar;
                })
            })

            this.currentUnits = unit

            this.options = {
                ...this.options,
                ...{
                    yaxis:{
                        title:{
                            text:this.currentUnits
                        }
                    }
                }
            }
        }
    },
})
</script>


<style>
</style>
