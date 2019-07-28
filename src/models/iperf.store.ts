// store used for storing iperf data

import Store from 'electron-store'

const store = new Store({
    name: 'iperf.store',
    defaults: {
        iperfs: []
    }
})

export default {
    namespaced: true,
    state: {
        iperfs: store.get('iperfs')
    },
    mutations: {
        addIperf(state, iperf){
            state.iperfs = [...state.iperfs, iperf]
        },
        removeIperf(state, iperf){
            state.iperfs = state.iperfs.filter((i: any) => i !== iperf)
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
            store.set('iperfs', state.iperfs )
        }
    }
}