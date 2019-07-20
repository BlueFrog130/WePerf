<template>
    <nav class="navbar has-shadow titlebar">
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
                <a @click="close()" class="navbar-item">
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

<style>
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

</style>
