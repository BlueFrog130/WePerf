<template>
  <div id="app">
    <nav-bar/>
    <div class="columns is-marginless">
        <div class="column fullheight is-narrow side-menu">
          <side-menu class="fullheight"></side-menu>
        </div>
      <div class="column">
          <router-view class="fullheight"/>
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
    'nav-bar': Navbar,
  },
  methods:{
    
  }
}
</script>

<style lang="scss">
@import './styles/main';
.route-transition-enter-active, .route-transition-leave-active{
    transition: opacity 500ms ease;
}
.route-transition-enter, .route-transition-leave-to{
    opacity: 0;
}
</style>
