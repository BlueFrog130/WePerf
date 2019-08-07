// Store used for making and saving presets in all routes

/* eslint-disable */
import Store from 'electron-store'
import { Iperf } from '@/models/Iperf'

const store = new Store({
    name: 'presets.config',
    defaults: {
        iperf: [],
        mininet: [],
    }
})

export default {
    namespaced: true,
    state: {
        iperf:<Array<any>> store.get('iperf'),
        mininet:<Array<any>> store.get('mininet') // TODO: Make Mininet class
    },
    mutations:{
        addPreset(state:any, added:Iperf){
            if(!state.hasOwnProperty(added.constructor.name.toLowerCase())){
                console.warn(`State does not have property: ${added.constructor.name.toLowerCase()}`)
                return
            }
            state[added.constructor.name.toLowerCase()] = [...state[added.constructor.name.toLowerCase()], added]
        },
        overwritePreset(state:any, added:Iperf){
            var i = state[added.constructor.name.toLowerCase()].findIndex(i => i.name === added.name)
            state[added.constructor.name.toLowerCase()] = state[added.constructor.name.toLowerCase()].splice(i, 1, added)
        },
        removePreset(state:any, removed:Iperf){
            if(!state.hasOwnProperty(removed.constructor.name.toLowerCase())){
                console.warn(`State does not have property: ${removed.constructor.name.toLowerCase()}`)
                return
            }
            state[removed.constructor.name.toLowerCase()] = state[removed.constructor.name.toLowerCase()].filter((r: any) => r !== removed)
        }
    },
    actions:{
        addPreset({state, commit, dispatch}, added:Iperf ){
            if(state[added.constructor.name.toLowerCase()].find(i => i.name === added.name)){
                commit('overwritePreset', added)
            }
            else{
                commit('addPreset', added)
            }
            dispatch('savePreset', added.constructor.name.toLowerCase())
        },
        removePreset({commit, dispatch}, removed:Iperf ){
            commit('removePreset', removed)
            dispatch('savePreset', removed.constructor.name.toLowerCase())
        },
        savePreset({state}, TName:string){
            store.set(TName, state.iperf)
        }
    }
}

enum stores{
    iperf = 'iperf',
    mininet = 'mininet'
}