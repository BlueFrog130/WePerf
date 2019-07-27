import Vue from 'vue'
import Router from 'vue-router'
import Iperf from './views/Iperf.view'
import Mininet from './views/Mininet.view'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/iperf'
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
      redirect: '/iperf'
    },
  ]
})
