import Vue from 'vue'
import Vuex from 'vuex'
import Store from 'electron-store'

const eStore = new Store({
  defaults: {
    iperfs: []
  }
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    iperfs: eStore.get('iperfs') || [],
  },
  mutations: {
    addIperf(state, iperf){
      state.iperfs = [...state.iperfs, iperf]
    },
    removeIperf(state, iperf){
      state.iperfs = state.iperfs.filter(i => i !== iperf)
    },
  },
  actions: {
    addIperf({commit, dispatch}, iperf){
      commit('addIperf', iperf)
      dispatch('saveIperfs')
    },
    removeIperf({commit, dispatch}, iperf){
      commit('removeIperf', iperf)
      dispatch('saveIperfs')
    },
    saveIperfs({state}){
      eStore.set('iperfs', state.iperfs )
    }
  }
})

