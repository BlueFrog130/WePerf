<template>
    <nav>
        <v-system-bar window app dark color="primary" id="app-bar">
            <span class="font-weight-light title">We</span>
            <span class="font-weight-bold  title">Perf</span>
            <v-btn x-small icon class="no-drag pl-2" id="system-bar-icon" @click="openPage('https://github.com/BlueFrog130/WePerf', $event)"><v-icon>mdi-github-circle</v-icon></v-btn>
            <v-spacer></v-spacer>
            <v-btn icon tile class="no-drag pl-2" @click="minimize($event)" x-small><v-icon>mdi-window-minimize</v-icon></v-btn>
            <v-btn icon tile class="no-drag pl-2" @click="maximize($event)" x-small><v-icon>mdi-window-restore</v-icon></v-btn>
            <v-btn icon tile class="no-drag pl-2" @click="close($event)" x-small><v-icon>mdi-window-close</v-icon></v-btn>
        </v-system-bar>
    </nav>
</template>

<script>
const {remote, shell} = require('electron');
const window = remote.getCurrentWindow();
export default {
    methods:{
        minimize(e){
            window.minimize();
            e.path[2].blur()
        },
        maximize(e){
            if(!window.isMaximized()){
                window.maximize()
            } else{
                window.unmaximize()
            }
            e.path[1].blur()
        },
        close(e){
            window.close()
            e.path[1].blur()
        },
        openPage(url, e){
            shell.openExternal(url, e)
            e.path[1].blur()
        }
    }
}
</script>

<style lang="scss">
#app-bar{
    -webkit-user-select: none; 
    -webkit-app-region: drag;    
}
.no-drag{
    -webkit-app-region: no-drag;
}
.v-system-bar--window .v-icon{
    margin: 0
}
#system-bar-icon{
    margin-left: 5px;
}
</style>
