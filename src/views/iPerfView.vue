<template>
    <div class="container">
        <div class="title-container">
            <div class="level">
                <div class="level-left">
                    <h1 class="title is-1">iPerf</h1>
                </div>
                <div class="level-right">
                    <div class="buttons">
                        <button class="button is-success" @click="addTest()">Add</button>
                        <button class="button is-danger" @click="deleteTest()">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        <hr class="divider"/>
        <div class="columns">
            <div class="column">
                <h2 class="has-text-centered subtitle is-2">Client</h2>
                <b-field><b-checkbox-button type="is-success" :native-value="true" v-model="iperf.client.remote"><b-icon :icon="booleanIcon(iperf.client.remote)"></b-icon><span>Remote</span></b-checkbox-button></b-field>
                <div v-if="iperf.client.remote">
                    <h2 class="subtitle has-text-danger">Not Implemented</h2>
                </div>
                <b-field grouped>
                    <b-field label="Server IP">
                        <input class="input" v-model="iperf.client.server">
                    </b-field>
                    <b-field label="Protocol">
                        <b-select v-model="iperf.client.protocol">
                            <option value="tcp">TCP</option>
                            <option value="udp">UDP</option>
                        </b-select>
                    </b-field>
                </b-field>
            </div>
            <div class="column">
                <h2 class="has-text-centered subtitle is-2">Server</h2>

            </div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            iperf:{
                client:{
                    remote: false,
                    server: '',
                    protocol: 'tcp',

                },
                server:{

                }
            }
        }
    },
    computed:{
        
    },
    methods:{
        booleanIcon(value){
            return value ? 'check' : 'times'
        },
        addTest(){
            this.$store.dispatch('addIperf', 'blep')
            console.log(this.$store.state.iperfs)
        },
        deleteTest(){
            this.$store.dispatch('removeIperf', 'blep')
            console.log(this.$store.state.iperfs)
        }
    }
}
</script>

<style>
.title-container{
    padding-top: 3rem;
}
.divider{
    margin: 10px 0
}
.title{
    -webkit-user-select: none;
}
.subtitle{
    -webkit-user-select: none;
}
.remote-button:focus{
    outline: none;
}
</style>
