<template>
    <v-container fill-height>
        <v-layout column>
            <!-- Header -->
            <v-flex >
                <v-layout justify-space-between align-center>
                    <h3 class="display-3 font-weight-medium no-highlight">iPerf</h3>
                    <v-menu offset-y transition="scale-transition">
                        <template v-slot:activator="{ on }">
                            <v-badge slot="" color="accent" overlap>
                                <span slot="badge">{{presets.length}}</span>
                                <v-btn v-on="on" :disabled="presets.length == 0">Presets</v-btn>
                            </v-badge>
                        </template>
                        <v-list>
                            <v-list-item v-for="(preset, i) in presets" :key="i" @click="selectedPreset = preset">
                                <v-list-item-title>{{preset.name}}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-layout>
            </v-flex>
            <v-divider/>
            <!-- Content/Configuration -->
            <v-layout fill-height fluid>
                <!-- Client -->
                <v-flex>
                    <client :iperf.sync="iperf"/>
                </v-flex>
                <v-divider vertical/>
                <!-- Server -->
                <v-flex>
                    <server :iperf.sync="iperf"/>
                </v-flex>
            </v-layout>
            <v-divider/>
            <!-- Graph -->
            <v-flex fill-height>
                <v-btn @click="run()">Run iPerf!</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Iperf } from '@/models/Iperf'
import Client from '@/components/iperf/client.vue'
import Server from '@/components/iperf/server.vue'
const {spawn} = require('child_process')
const path = require('path')
const iperf3 = path.normalize(process.cwd()+'/src/assets/iperf/win/iperf3.exe')
export default Vue.extend({
    data(){
        return{
            selectedPreset: {} as Iperf,
            iperf: new Iperf()
        }
    },
    components: { 
        Client,
        Server
    },
    computed: {
        presets():Array<Iperf>{
            return this.$store.state.presets.iperf
        }
    },
    methods:{
        run():void{
            var server = spawn(iperf3, this.iperf.getServerCommand())
            var client = spawn(iperf3, this.iperf.getClientCommand()) 

            server.stdout.on('data',(data) => {
                console.log(data.toString())
            })
            client.stdout.on('data',(data) => {
                console.log(data.toString())
            })

            client.on('close', () => {
                console.log('Killing server')
                server.kill('SIGINT')
            })
        }
    }
})
</script>

<style lang="scss">

</style>
