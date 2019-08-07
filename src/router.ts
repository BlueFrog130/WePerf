import Vue from 'vue'
import Router from 'vue-router'
import Iperf from './views/Iperf.view.vue'
import Mininet from './views/Mininet.view.vue'
import Styling from './views/Styling.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'styles',
      path: '/',
      component: Styling
    },
    {
      name: 'iperf',
      path: '/iperf',
      component: Iperf
    },
    {
      name: 'mininet',
      path: '/mininet',
      component: Mininet
    },
    {
      path: '*',
      redirect: '/styles'
    },
  ]
})
