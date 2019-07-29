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
                    
                </v-flex>
            </v-layout>
            <v-divider/>
            <!-- Graph -->
            <v-flex fill-height>
                
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Iperf } from '@/models/Iperf'
import Client from '@/components/iperf/client.vue'

export default Vue.extend({
    data(){
        return{
            selectedPreset: {} as Iperf,
            iperf: new Iperf()
        }
    },
    components: { 
        Client
    },
    computed: {
        presets():Array<Iperf>{
            return this.$store.state.presets.iperf
        }
    }
})
</script>

<style lang="scss">

</style>
