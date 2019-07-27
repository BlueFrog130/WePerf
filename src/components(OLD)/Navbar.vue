<template>
    <nav class="navbar is-info has-shadow titlebar">
        <div class="navbar-menu">
            <div class="navbar-start">
                
            </div>
            <div class="navbar-end">
                <a @click="minimize()" class="navbar-item">
                    <b-icon size="is-small" icon="window-minimize"></b-icon>
                </a>
                <a @click="maximize()" class="navbar-item">
                    <b-icon size="is-small" icon="window-maximize"></b-icon>
                </a>
                <a @click="close()" class="navbar-item" id="navbar-close">
                    <b-icon size="is-small" icon="times"></b-icon>
                </a>
            </div>
        </div>
    </nav>
</template>

<script>
const remote = require('electron').remote;
export default {
    methods:{
        minimize(){
            var window = remote.getCurrentWindow();
            window.minimize();
        },
        maximize(){
            var window = remote.getCurrentWindow();
            if(!window.isMaximized()){
                window.maximize()
            } else{
                window.unmaximize()
            }
        },
        close(){
            var window = remote.getCurrentWindow();
            window.close()
        }
    }
}
</script>

<style lang="scss">
@import "../styles/_variables";
    .titlebar{
        -webkit-user-select: none;
        -webkit-app-region: drag;
    }
    .navbar{
        z-index: 100;
    }
    a{
        -webkit-app-region: no-drag;
    }
    #navbar-close:hover{
        color: $white;
        background-color: $danger;
    }

</style>
