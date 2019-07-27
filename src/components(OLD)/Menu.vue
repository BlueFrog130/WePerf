<template>
    <aside class="menu fullheight" :class="{'menu-full':!compact,'menu-small':compact }" style="position: relative">
        
        <ul class="menu-list">
            <li>
                <a @click="compact = !compact" id="bars">
                    <div class="link">
                        <b-icon class="menu-icon" icon="bars" size="is-small"/>
                        <transition name="menu-text">
                            <span v-show="!compact">Hide</span>
                        </transition>        
                    </div>    
                </a>
            </li>
            <li>
                <router-link class="inactive" active-class="is-active" to="/iperf">
                    <div class="link">
                        <b-icon class="menu-icon" icon="wifi" size="is-small"/>
                        <transition name="menu-text">
                            <span v-show="!compact">iPerf</span>
                        </transition>
                    </div>
                </router-link>
            </li>
            <li>
                <router-link class="inactive" exact-active-class="is-active" to="/" exact>
                    <div class="link">
                        <b-icon class="menu-icon" icon="network-wired" size="is-small"/>
                        <transition name="menu-text">
                            <span v-show="!compact">Mininet</span>
                        </transition>
                    </div>
                </router-link>
            </li>
        </ul>
    </aside>
</template>

<script>
export default {
    data(){
        return{
            compact: false
        }
    }
}
</script>

<style lang="scss">
@import "../styles/_variables";
.menu-icon{
    margin-left: calc(-0.375em - 1px);
    margin-right: 0.5em;
}
.link {
    align-items: center;
    -webkit-appearance: none;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    padding-bottom: calc(0.375em - 1px);
    padding-left: 0.75em;
    padding-right: 0.75em;
    padding-top: calc(0.375em - 1px);
    text-align: center;
    white-space: nowrap;
    display: inline-flex;
    font-size: 15px;
    height: 2.25em;
    line-height: 1.5;
    position: relative;
    vertical-align: top;
    -webkit-user-select: none;
}

.menu-full{
    width: 125px;
}
.menu-small{
    width: 50px;
}
.menu{
    transition: all .5s ease;
    overflow: hidden;
}
.menu-text-enter-active, .menu-text-leave-active{
    transition: opacity .75s;
}
.menu-text-enter, .menu-text-leave-to{
    opacity: 0
}
.is-active{
    transition: all .5s ease
}
.inactive{
    transition: all .5s ease
}
#bars{
    transition: all .5s ease;
}
#bars:hover{
    background-color: darken($navbar-box-shadow-color, 10%);
}
</style>
