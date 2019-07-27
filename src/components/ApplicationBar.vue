<template>
    <v-app-bar color="primary" dense id="app-bar">
        <v-toolbar-title>WePerf</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon tile><v-icon>mdi-window-minimize</v-icon></v-btn>
        <v-btn icon tile><v-icon>mdi-window-restore</v-icon></v-btn>
        <v-btn icon tile><v-icon>mdi-window-close</v-icon></v-btn>
    </v-app-bar>
</template>

<script>
export default {

}
</script>

<style lang="scss">
#app-bar{
    -webkit-user-select: none;
    -webkit-app-region: drag;    
}
</style>
