<template>
  <v-app id="main" :style="{background: $vuetify.theme.themes[theme].background}">
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
  mounted(){
    document.addEventListener('keyup', (event) => {
      if(event.keyCode == 112){
        this.$router.push('/')
      }
    })
  },
  computed:{
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  }
};
</script>

<style lang="scss">
::-webkit-scrollbar{
  display: none;
}
#main{
  height: 100vh;
  width: 100vw;
}
</style>
