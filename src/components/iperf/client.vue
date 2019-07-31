<template>
    <v-container>
        <h6 class="headline text-center">Client</h6>
        <v-form ref="client" v-model="clientRules.valid">
            <v-container grid-list-lg fluid>
                <v-layout wrap>
                    <v-flex lg4>
                        <v-text-field required 
                                      :rules="clientRules.requiredRule"
                                      label="Host" 
                                      color="info" 
                                      v-model="iperf.client.host"/>
                    </v-flex>
                    <v-flex lg1>
                        <v-select required 
                                  :rules="clientRules.requiredRule" 
                                  label="Protocol" color="info" 
                                  item-color="info" 
                                  :items="Object.keys(protocols)" 
                                  v-model="iperf.client.protocol"/>
                    </v-flex>
                    <v-flex lg2>
                        <v-text-field label="Bandwidth" 
                                      :rules="[v => !!v || 'Required', v => v > 0 || 'Cannot be less than 0']" 
                                      type="number"
                                      color="info"
                                      v-model="iperf.client.bandwidth"
                                      :hint="`${iperf.client.units}bit/s`"/>
                    </v-flex>
                    <v-flex lg1>
                        <v-select required 
                                  :rules="clientRules.requiredRules" 
                                  label="Units" color="info" 
                                  item-color="info" 
                                  :items="Object.keys(require('@/models/Iperf').Units)" 
                                  v-model="iperf.client.units"
                                  :hint="`${iperf.client.units}bit/s`"/>
                    </v-flex>
                    <v-flex lg1>
                        <v-text-field label="Time" 
                                      :rules="[v => !!v || 'Required', v => v > 0 || 'Cannot be less than 0']" 
                                      type="number"
                                      color="info"
                                      v-model="iperf.client.time"
                                      :hint="`Seconds`"/>
                    </v-flex>
                    <v-flex lg2>
                        <v-text-field label="Interval" 
                                      type="number"
                                      color="info"
                                      v-model="iperf.interval"
                                      :hint="`Seconds`"/>
                    </v-flex>
                     <v-flex lg1>
                        <v-text-field label="Omit"  
                                      type="number"
                                      color="info"
                                      v-model="iperf.client.omit"
                                      :hint="`Seconds`"/>
                    </v-flex>
                    <v-flex lg2>
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
    props:{
        iperf:{
            type: Object as () => Iperf
        }
    },
    data(){
        return{
            protocols: require('@/models/Iperf').Protocol,
            clientRules:{
                valid: false,
                requiredRule: [ r => !!r || 'Required' ]
            }
        }
    }
})
</script>
