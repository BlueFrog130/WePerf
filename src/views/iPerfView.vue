<template>
    <div class="tile is-ancestor is-vertical">
        <div class="tile is-parent title-container">
            <div class="tile is-child" :class="{'dev-mode' : devMode}">
                <div class="">
                    <div class="level">
                        <div class="level-left">
                            <h1 class="title is-1">iPerf</h1>
                        </div>
                        <div class="level-right">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr class="divider"/>
        <div class="tile is-parent">
            <div class="tile is-child has-middle-border" :class="{'dev-mode' : devMode}">
                <h2 class="has-text-centered subtitle is-2">Client</h2>
                <b-field><b-checkbox-button type="is-success" :native-value="true" v-model="iperf.client.remote"><b-icon :icon="booleanIcon(iperf.client.remote)"></b-icon><span>Remote</span></b-checkbox-button></b-field>
                <div class="remote-container" :class="{'remote-container-enabled':iperf.client.remote}">
                    <h2 class="subtitle has-text-danger">Not Implemented</h2>
                </div>
                <b-field grouped>
                    <b-field expanded label="Server IP">
                        <input class="input" v-model="iperf.client.server" placeholder="IP Address of server">
                    </b-field>
                    <b-field label="Protocol">
                        <b-dropdown hoverable v-model="iperf.client.protocol">
                            <b-button slot="trigger" class="button is-info" icon-right="chevron-down" style="width: 5rem"><span style="width: 4rem" class="is-uppercase">{{iperf.client.protocol}}</span></b-button>
                            <b-dropdown-item value="tcp">TCP</b-dropdown-item>
                            <b-dropdown-item value="udp">UDP</b-dropdown-item>
                        </b-dropdown>
                    </b-field>
                    <b-field label="Bandwidth">
                        <b-field>
                            <b-input validation-message=" " min="1" type="number" style="width: 3rem" v-model="iperf.client.bandwidth"/>
                            <b-select v-model="iperf.client.bandwidthUnits">
                                <option value="k">KBit/s</option>
                                <option value="m">MBit/s</option>
                            </b-select>
                        </b-field>
                    </b-field>
                    <b-field>
                        <template slot="label"><b-tooltip :delay="1" type="is-dark" label="Measured in seconds">Time</b-tooltip></template>
                        <b-input validation-message=" " min="1" type="number" style="width: 3rem" v-model="iperf.client.time"/>                        
                    </b-field>
                    <b-field>
                        <template slot="label"><b-tooltip :delay="1" type="is-dark" label="Omits first n seconds">Omit</b-tooltip></template>
                        <b-input validation-message=" " min="1" type="number" style="width: 3rem" v-model="iperf.client.omit"/>                        
                    </b-field>
                    <b-field>
                        <template slot="label"><b-tooltip :delay="1" type="is-dark" label="Time interval between measurements">Interval</b-tooltip></template>
                        <b-input validation-message=" " min="0.0" step="0.1" type="number" style="width: 5rem" v-model="iperf.client.interval"/>                        
                    </b-field>
                </b-field>
                <div class="has-text-centered buttons">
                    <button class="button is-success" @click="jsonTest()">iPerfTest</button>
                </div>
                <div>{{data}}</div>
            </div>
            <div class="tile is-child has-middle-border" :class="{'dev-mode' : devMode, 'is-1':collapseServer, 'is-6':!collapseServer}">
                    <h2 class="has-text-centered subtitle is-2">Server</h2>
                    

                    <a class="server-toggle" @click="collapseServer = !collapseServer"><b-icon size="is-small" icon="bars"/></a>
            </div>

        </div>
        <div class="tile is-parent">
            <div class="tile is-child" :class="{'dev-mode' : devMode}"></div>
        </div>
    </div>
</template>

<script>
import path from 'path'

const {spawn} = require('child_process');
const {remote} = require('electron')

export default {
    data(){
        return{
            devMode: false,
            collapseServer: false,
            iperf:{
                client:{
                    remote: false,
                    server: '',
                    protocol: 'tcp',
                    bandwidth: null,
                    bandwidthUnits: 'k', // m - MBit/s ; k - KBit/s
                    time: null,
                    omit: null,
                    interval: null,
                },
                server:{
                    interval: null,
                }
            },
            data: null
        }
    },
    methods:{
        booleanIcon(value){
            return value ? 'check' : 'times'
        },
        async jsonTest(){
            this.data = {}
            const iperfPath = path.join(remote.app.getAppPath(), '../src/assets/iperf/win/iperf3.exe')

            const client = spawn(iperfPath, ['-c', '192.168.1.196', '-J'])
            client.stdout.on('data', (clientData) => {
                this.data = JSON.parse(clientData)
            })
        },
    }
}
</script>

<style lang="scss">
@import "../styles/_variables";

.title-container{
    padding-top: 3rem;
    max-height: 5rem;
}
.divider{
    margin: 10px 0;
    background-color: $navbar-box-shadow-color;
    width: 99%;
    align-self: center;
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
.dev-mode{
    background: green;
    border: solid black;
}
.tile{
    -webkit-transition: all 1s ease;
    position: relative;
}
.is-child{
    padding: 10px;
}
.has-middle-border:first-child{
    border-right: solid thin $navbar-box-shadow-color
}
.has-middle-border:last-child{
    border-left: solid thin $navbar-box-shadow-color
}
.server-toggle{
    position: absolute;
    top: 0;
    right: 0;
    color: $navbar-box-shadow-color;
    
}
.server-toggle:hover{
    color: darken($navbar-box-shadow-color, 10%)
}

.remote-container{
    -webkit-transition: all 1s ease;
    overflow: hidden;
    max-height: 0px;
    position: relative;
}
.remote-container-enabled{
    max-height: 50px;
}
</style>
