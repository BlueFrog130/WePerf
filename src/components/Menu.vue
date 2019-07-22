<template>
    <aside class="menu fullheight" :class="{'menu-full':!compact,'menu-small':compact }" style="position: relative">
        <p class="menu-label">Menu</p>
        <ul class="menu-list">
            <li>
                <router-link active-class="is-active" to="/iperf">
                    <div class="link">
                        <b-icon class="menu-icon" icon="wifi" size="is-small"/>
                        <span v-show="!compact">iPerf</span>
                    </div>
                </router-link>
            </li>
            <li>
                <router-link exact-active-class="is-active" to="/" exact>
                    <div class="link">
                        <b-icon class="menu-icon" icon="network-wired" size="is-small"/>
                        <span v-show="!compact">Mininet</span>
                    </div>
                </router-link>
            </li>
        </ul>
        <a class="size-toggle" @click="compact = !compact"><b-icon size="is-small" icon="bars"/></a>
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

<style>
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
    width: 150px;
}
.menu-small{
    width: 50px;
}
</style>
