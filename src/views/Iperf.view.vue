<template>
    <v-container fill-height>
        <v-layout fluid column>
            <!-- Header -->
            <v-flex >
                <v-layout justify-space-between fluid align-center>
                    <h3 class="display-3 font-weight-medium no-highlight">iPerf</h3>
                    <v-menu offset-y transition="scale-transition">
                        <template v-slot:activator="{ on }">
                            <v-btn v-on="on">Presets</v-btn>
                        </template>
                        <v-list>
                            <v-list-item v-for="i in 5" :key="i" @click="() => {}">
                                <v-list-item-title>Yolo</v-list-item-title>
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

export default Vue.extend({
    props:{
        preset:{
            type: Object,
            default(){
                return null
            }
        }
    }
})
</script>

<style lang="scss">

</style>
