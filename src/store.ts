// Central store

import Vue from 'vue'
import Vuex from 'vuex'
import iperf from './models/iperf.store'
import presets from './models/presets.store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{ iperf,  presets},
})

