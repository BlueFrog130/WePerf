import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import buefy from 'buefy'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueShortkey from 'vue-shortkey'

library.add(fab, far, fas)
Vue.component('fa-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(buefy, {
  defaultIconComponent: 'fa-icon',
  defaultIconPack: 'fas'
})

Vue.use(VueShortkey)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
