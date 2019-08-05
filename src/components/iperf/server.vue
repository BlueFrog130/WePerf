<template>
    <v-container>
        <p>If no remote address is provided, the server will execute localally</p>
        <v-form ref="server" v-model="serverRules.valid">
            <v-container grid-list-lg>
                <v-layout wrap align-center>
                    <v-flex lg2>
                        <v-dialog v-model="remote" persistent max-width="50%">
                            <template v-slot:activator="{ on }">
                                <v-btn v-on="on" color="accent">Remote</v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Remote server</span>
                                </v-card-title>
                                <v-card-text>
                                    <p>This will remote connect to a virtual machine or another machine on the network and execute iPerf command. <span class="error--text">Must Have iPerf3 installed!</span> Currently only availible with Linux based machines</p>
                                    <v-layout wrap justify-space-around>
                                        <v-flex xs11>
                                            <v-text-field color="info" label="Remote IP" v-model="iperf.server.remote.ip"></v-text-field>
                                        </v-flex>
                                        <v-flex xs5>
                                            <v-text-field color="info" label="User" v-model="iperf.server.remote.usere"></v-text-field>
                                        </v-flex>
                                        <v-flex xs5>
                                            <v-text-field color="info" label="Password" v-model="iperf.server.remote.password"></v-text-field>
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
                </v-layout>
            </v-container>
        </v-form>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import * as Iperf from '@/models/Iperf'
export default Vue.extend({
    props:
    {
        iperf:
        {
            type: Object as () => Iperf.Iperf
        }
    },
    data: () => 
    ({
        serverRules:
        {
            valid: false,
        },
        remote: false,
    }),
    methods:
    {
        connect():void
        {
            this.remote = false
            this.$emit('remoteServer')
        }
    }
})
</script>


<style>

</style>
