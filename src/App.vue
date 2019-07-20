<template>
  <div id="app">
    <nav-bar/>
    <div class="columns is-marginless">
      <div class="column is-1 side-menu">
        <side-menu></side-menu>
      </div>
      <div class="column">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from './components/Menu'
import Navbar from './components/Navbar'
export default {
  components:{
    'side-menu': Menu,
    'nav-bar': Navbar
  }
}
</script>

<style lang="scss">
@import './styles/main';
</style>
