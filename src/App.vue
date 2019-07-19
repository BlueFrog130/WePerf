<template>
  <div id="app" class="columns is-marginless">
    <div class="column is-1 side-menu">
      <side-menu></side-menu>
    </div>
    <div class="column">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Menu from './components/Menu'
export default {
  components:{
    'side-menu': Menu
  }
}
</script>


<style lang="scss">
@import './styles/main';
</style>
