<template>
    <v-container>
        <h6 class="headline text-center">Server</h6>
        <v-form ref="server" v-model="serverRules.valid">
            <v-container grid-list-lg>
                <v-layout wrap>
                    <v-flex>None!</v-flex>
                </v-layout>
            </v-container>
        </v-form>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import * as Iperf from '@/models/Iperf'
export default Vue.extend({
    props:{
        iperf:{
            type: Object as () => Iperf.Iperf
        }
    },
    data(){
        return{
            serverRules:{
                valid: false,
            }
        }
    }
})
</script>


<style>

</style>
