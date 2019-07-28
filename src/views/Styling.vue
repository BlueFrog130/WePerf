<template>
    <v-container fill-height fluid>
        <v-layout column>
            <v-layout align-center justify-space-between>
                <h1 class="display-3 mb-3">Styles</h1>
                <v-btn @click="$vuetify.theme.dark = !$vuetify.theme.dark" color="primary">Toggle Dark Mode</v-btn>
            </v-layout>
            <v-divider></v-divider>
            <v-layout fill-height>
                <v-layout column fill-height>
                    <v-flex>
                        <h2 class="title text-center">{{mode}}</h2>
                    </v-flex>
                    <v-layout fill-height>
                        <v-container fill-height fluid grid-list-md>
                            <v-layout fill-height wrap>
                                <v-flex xs4 v-for="(color, i) in colors" :key="i">
                                    <v-card ripple height="100%" elevation="5" :color="color"><v-card-text class="headline card-content-container"><span class="card-content">{{color}}</span></v-card-text></v-card>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-layout>
                </v-layout>
            </v-layout>            
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    data(){
        return{
            colors: ['primary','secondary','accent','error','warning','info','success','background','backgroundDarkened']
        }
    },
    computed:{
        mode():String{
            // @ts-ignore
            return (this.$vuetify.theme.dark) ? 'Dark' : 'Light'
        }
    },

})
</script>

<style lang="scss">
    .card-content{
        margin: auto !important;
        text-align: center !important;
    }
    .card-content-container{
        display: flex !important;
        height: 100% !important;
    }
</style>
