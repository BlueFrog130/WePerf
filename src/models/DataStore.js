const Store = require('electron-store')

export default class DataStore extends Store{
    constructor(settings){
        super(settings)
        this.iperfs = this.get('iperfs') || []
    }
    saveIperfs(){
        this.set('iperfs', this.iperfs)
        return this
    }
    getIperfs(){
        this.iperfs = this.get('iperfs') || []
        return this
    }
    addIperf(iperf){
        this.iperfs = [...this.iperfs, iperf]
        return this.saveIperfs()
    }
    deleteIperf(iperf){
        this.iperfs = this.iperfs.filter(i => i !== iperf)
        return this.saveIperfs()
    }
}

