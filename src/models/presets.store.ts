// Store used for making and saving presets in all routes

/* eslint-disable */
import Store from 'electron-store'

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

    },
    mutations:{

    },
    actions:{
        
    }
}