<template>
    <nav>
        <v-navigation-drawer expand-on-hover :mini-variant-width="64" :width="175" permanent app color="sidebar">
            <template v-slot:prepend>
                <v-list nav dense color="sidebar">
                    <v-list-item color="accent" v-for="route in routes" :key="route.name" :to="{path: route.path}" link>
                        <v-list-item-action><v-icon>{{route.icon}}</v-icon></v-list-item-action>
                        <v-list-item-content>{{route.title}}</v-list-item-content>
                    </v-list-item>
                </v-list>
            </template>
        </v-navigation-drawer>
    </nav>
</template>

<script>
export default {
    data(){
        return{
            // Manually adding routes for future plans
            routes: [
                {name: 'iperf', path: '/iperf', title: 'iPerf', icon: 'mdi-access-point'},
                {name: 'mininet', path: '/mininet', title: 'Mininet', icon: 'mdi-console-network'}
            ]
        }
    }
}
</script>

<style>

</style>
