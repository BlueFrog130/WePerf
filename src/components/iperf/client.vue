<template>
    <v-container>
        <h6 class="headline text-center">Client</h6>
        <v-form ref="client" v-model="clientRules.valid">
            <v-container grid-list-md fluid>
                <v-layout wrap>
                    <v-flex xs6>
                        <v-text-field required :rules="clientRules.requiredRule" label="Host" color="info" v-model="iperf.client.host"/>
                    </v-flex>
                    <v-flex xs1>
                        <v-select required :rules="clientRules.requiredRule" label="Protocol" color="info" item-color="info" :items="Object.keys(protocols)" v-model="iperf.client.protocol"/>
                    </v-flex>
                    <v-flex xs3>
                        <v-text-field label="Bandwidth" :rules="[v => !!v || 'Required', v => v > 0 || 'Cannot be less than 0']" type="number">
                            <v-text-field slot="append-outer"></v-text-field>
                        </v-text-field>
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
