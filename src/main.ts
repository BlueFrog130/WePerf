"use strict";

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

// Declaring vuetify option
declare module 'vue/types/vue'{
  interface VueConstructor{
    $vuetify: any
  }
}
declare module 'vue/types/options'{
  interface ComponentOptions<V extends Vue>{
    vuetify?: any
  }
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
