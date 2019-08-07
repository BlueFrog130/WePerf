<template>
    <v-container>
        <p>The client will automatically connect to the server address</p>
        <v-form ref="client" v-model="clientRules.valid">
            <v-container grid-list-lg fluid>
                <v-layout align-center wrap >
                    <v-flex shrink>
                        <v-dialog v-model="remote" persistent max-width="50%">
                            <template v-slot:activator="{ on }">
                                <v-btn v-on="on" color="accent">Remote</v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Remote Client</span>
                                </v-card-title>
                                <v-card-text>
                                    <p>This will remote connect to a virtual machine or another machine on the network and execute iPerf command. <span class="error--text">Must Have iPerf3 installed!</span> Currently only availible with Linux based machines</p>
                                    <v-layout wrap justify-space-around>
                                        <v-flex xs11>
                                            <v-text-field color="info" label="Remote IP" v-model="iperf.client.remote.ip"></v-text-field>
                                        </v-flex>
                                        <v-flex xs5>
                                            <v-text-field color="info" label="User" v-model="iperf.client.remote.user"></v-text-field>
                                        </v-flex>
                                        <v-flex xs5>
                                            <v-text-field color="info" label="Password" v-model="iperf.client.remote.password"></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn color="warning" @click="remote = false">Close</v-btn>
                                    <v-btn color="success" @click="connect()">Connect</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-flex>
                    <v-flex shrink>
                        <v-text-field label="Server IP"
                                      hint="Remote Server IP used if blank"
                                      v-model="iperf.client.host"
                                      color="info"/>

                    </v-flex>
                    <v-flex shrink>
                        <v-select required 
                                  :rules="clientRules.requiredRule" 
                                  label="Protocol" color="info" 
                                  item-color="info" 
                                  :items="Object.keys(protocols)" 
                                  v-model="iperf.client.protocol"/>
                    </v-flex>
                    <v-flex shrink>
                        <v-text-field label="Bandwidth" 
                                      :rules="[v => !!v || 'Required', v => v > 0 || 'Cannot be less than 0']" 
                                      type="number"
                                      color="info"
                                      v-model="iperf.client.bandwidth"
                                      :hint="`${iperf.client.units}bit/s`"/>
                    </v-flex>
                    <v-flex shrink>
                        <v-select required 
                                  :rules="clientRules.requiredRules" 
                                  label="Units" color="info" 
                                  item-color="info" 
                                  :items="Object.keys(require('@/models/Iperf').Units)" 
                                  v-model="iperf.client.units"
                                  :hint="`${iperf.client.units}bit/s`"/>
                    </v-flex>
                    <v-flex shrink>
                        <v-text-field label="Time" 
                                      :rules="[v => !!v || 'Required', v => v > 0 || 'Cannot be less than 0']" 
                                      type="number"
                                      color="info"
                                      v-model="iperf.client.time"
                                      :hint="`Seconds`"/>
                    </v-flex>
                     <v-flex shrink>
                        <v-text-field label="Omit"  
                                      type="number"
                                      color="info"
                                      v-model="iperf.client.omit"
                                      :hint="`Seconds`"/>
                    </v-flex>
                    <v-flex shrink>
                        <v-checkbox label="Reverse"
                                    color="info"
                                    hint="Reverses Flow"
                                    v-model="iperf.client.reverse"/>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-form>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Iperf } from '@/models/Iperf';
export default Vue.extend({
    props:
    {
        iperf:
        {
            type: Object as () => Iperf
        }
    },
    data: () => 
    ({
        protocols: require('@/models/Iperf').Protocol,
        clientRules:{
            valid: false,
            requiredRule: [ r => !!r || 'Required' ]
        },
        remote: false,
    }),
    methods:
    {
        connect():void
        {
            this.remote = false
            this.$emit('remoteClient')
        }
    }
})
</script>
