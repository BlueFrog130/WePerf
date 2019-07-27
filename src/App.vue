<template>
  <v-app id="main">
    <application-bar/>
    <navigation-menu/>
    <v-content>
      <v-fade-transition mode="out-in">
        <router-view/>
      </v-fade-transition>
    </v-content>
  </v-app>
</template>

<script>
import ApplicationBar from './components/ApplicationBar'
import NavigationMenu from './components/NavigationMenu'
export default {
  name: 'App',
  components: {
    ApplicationBar,
    NavigationMenu
  },
};
</script>

<style lang="scss">
::-webkit-scrollbar{
  display: none;
}
#main{
  height: 100vh;
  width: 100vw;
  background-color: #E8EAF6;
}
</style>

