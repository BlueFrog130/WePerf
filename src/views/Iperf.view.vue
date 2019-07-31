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
            <v-layout fill-height fluid>
                <!-- Client -->
                <v-flex class="scroll-flex">
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
                <v-btn @click="data = iperf.run()">Run iPerf!</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Iperf } from '@/models/Iperf'
import Client from '@/components/iperf/client.vue'
import Server from '@/components/iperf/server.vue'

export default Vue.extend({
    data(){
        return{
            iperf: new Iperf(),
            data: {},
            dialog: false,
        }
    },
    components: { 
        Client,
        Server,
    },
    computed: {
        presets():Array<Iperf>{
            return this.$store.state.presets.iperf
        }
    },
    methods:{
        applySelection(selection:object):void{
            for(var key in selection){
                if(this.iperf.hasOwnProperty(key)){
                    this.iperf[key] = selection[key]
                }
            }
        },
        save():void{
           this.dialog = false
           this.$store.dispatch('presets/addPreset', this.iperf)
       },
       resetIperf():void{
           this.iperf = new Iperf()
       }
    }
})
</script>

<style lang="scss">
.scroll-flex{
    overflow-y:auto;
    height:100%;
}
</style>
