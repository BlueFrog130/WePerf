<template>
    <v-container>
        <v-form ref="base" v-model="valid">
            <v-container grid-list-lg fluid>
                <v-layout wrap align-center>
                    <v-flex>
                        <v-text-field required
                                      label="Interval"
                                      color="info"
                                      type="number"
                                      :rules="[v => !!v || 'Required', v => v > 0 || 'Cannot be less than 0']"
                                      v-model="iperf.interval"
                                      :hint="'Seconds'"/>
                    </v-flex>
                    <v-flex>
                        <v-text-field label="Port"
                                      color="info"
                                      type="number"
                                      v-model="iperf.port"
                                      :hint="'Not Required'"/>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-form>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Iperf } from '../../models/Iperf';
export default Vue.extend({
    data: () => 
    ({
        valid: false,
    }),
    props:
    {
        iperf:
        {
            type: Object as () => Iperf
        }
    },
})
</script>


<style>

</style>
