<template>
    <v-container fill-height>
        <v-layout column>
            <!-- Header -->
            <v-flex >
                <v-layout>
                    <h3 class="display-3 font-weight-medium no-highlight">iPerf</h3>
                    <v-spacer/>
                    <v-flex shrink>
                        <v-btn icon text @click="resetIperf()" color="error"><v-icon>mdi-close</v-icon></v-btn>
                        <v-dialog class v-model="dialog" persistent max-width="50%">
                            <template v-slot:activator="{ on }">
                                <v-btn class="mr-3" text icon color="success" v-on="on"><v-icon>mdi-content-save</v-icon></v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Save</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-text-field label="Name" v-model="iperf.name"/>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn color="warning" text @click="dialog = false">Close</v-btn>
                                    <v-btn color="success" text @click="save()">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-menu offset-y transition="scale-transition">
                            <template v-slot:activator="{ on }">
                                <v-badge slot="" color="accent" overlap>
                                    <span slot="badge">{{presets.length}}</span>
                                    <v-btn color="info" v-on="on" :disabled="presets.length == 0">Presets</v-btn>
                                </v-badge>
                            </template>
                            <v-list>
                                <v-list-item v-for="(preset, i) in presets" :key="i" @click="applySelection(preset)">
                                    <v-list-item-title>{{preset.name}}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-divider/>
            <!-- Content/Configuration -->
            <v-layout fluid class="py-2">
                <!-- Client -->
                <v-flex>
                    <v-card flat color="background">
                        <v-card-text>
                            <v-tabs background-color="transparent" vertical color="info">
                                <v-tab>
                                    <span class="subheader font-weight-regular">Base Settings</span>
                                </v-tab>
                                <v-tab>
                                    <span class="subheader font-weight-regular">Client Settings</span>
                                </v-tab>
                                <v-tab>
                                    <span class="subheader font-weight-regular">Server Settings</span>
                                </v-tab>
                                <v-tab-item>
                                    <v-card flat color="background">
                                        <v-card-text>
                                            <base-settings :iperf.sync="iperf"/>
                                        </v-card-text>
                                    </v-card>
                                </v-tab-item>                                
                                <v-tab-item>
                                    <v-card flat color="background">
                                        <v-card-text>
                                            <client :iperf.sync="iperf"/>
                                        </v-card-text>
                                    </v-card>
                                </v-tab-item>                                
                                <v-tab-item>
                                    <v-card flat color="background">
                                        <v-card-text>
                                            <server :iperf.sync="iperf"/>
                                        </v-card-text>
                                    </v-card>
                                </v-tab-item>
                            </v-tabs>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer/>
                            <v-btn color="accent" @click="onRun()">Run</v-btn>
                            <v-spacer/>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-divider/>
            <!-- Graph -->
            <v-flex class="pa-5" id="graph" v-resize="onResize" fill-height>
                <Data v-if="dataFilled" :results="results" :interval="parseFloat(iperf.interval)" :height="height"/>
                <v-progress-linear v-else-if="progressActive" height="10" :indeterminate="indeterminate"></v-progress-linear>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Iperf } from '@/models/Iperf'
import Client from '@/components/iperf/client.vue'
import Server from '@/components/iperf/server.vue'
import Data from '@/components/iperf/data.vue'
import BaseSettings from '@/components/iperf/BaseSettings.vue'
import { results } from '@/models/iperf.interfaces'

interface Data
{
    client?:results,
    server?:results
}

enum States
{
    initial = 0,
    running = 1,
    hasData = 2
}

export default Vue.extend({
    data: () => 
    ({
        iperf: new Iperf(),
        results: {
            client: undefined,
            server: undefined
        } as Data,
        dialog: false,
        expansionValue: 0,
        state: States.initial,
        height: 0
    }),
    components:
    { 
        Client,
        Server,
        BaseSettings,
        Data
    },
    computed:
    {
        presets():Array<Iperf>
        {
            return this.$store.state.presets.iperf
        },
        progressActive():boolean
        {
            return !(this.state == States.initial)
        },
        indeterminate():boolean
        {
            return (this.state == States.running)
        },
        dataFilled():boolean
        {
            return (this.state == States.hasData)
        },
    },
    watch:
    {
        results:
        {
            deep: true,
            handler()
            {
                if(this.results.client && this.results.server )
                {
                    this.state = States.hasData
                }
            }   
        }
    },
    mounted()
    {
        this.onResize()
    },
    methods:
    {
        applySelection(selection:object):void
        {
            for(var key in selection)
            {
                if(this.iperf.hasOwnProperty(key))
                {
                    this.iperf[key] = selection[key]
                }
            }
        },
        save():void
        {
           this.dialog = false
           this.$store.dispatch('presets/addPreset', this.iperf)
        },
        resetIperf():void
        {
           this.iperf = new Iperf()
        },
        onRun():void
        {
            this.results = this.iperf.run()
            this.state = States.running
        },
        onResize():void
        {
            var graphElement = document.getElementById('graph')

            if(graphElement != null)
            {
                this.height = graphElement.clientHeight
            }
        }
    }
})
</script>