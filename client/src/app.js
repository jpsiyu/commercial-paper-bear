import EventMgr from './lib/event-mgr'
import Network from './lib/network'
import { MacroEvent } from './macro'
import { createStore } from 'redux'
import data from './data'

class App {

    constructor() {
        this.eventMgr = new EventMgr()
        this.network = new Network()
        this.stepInfo = null
        this.store = createStore(data.reducer, data.preloadedState)
    }

    subscribe() {
        this.eventMgr.subscribe(MacroEvent.ReceMessage, this, this.onRece)
    }

    onRece(msg) {
        this.stepInfo = msg.stepInfo
    }

    run(callback) {
        this.subscribe()

        const handler = (response) => {
            const msg = response.data
            this.stepInfo = msg.stepInfo

            this.store.dispatch(data.action(data.ActionType.UpdateStepInfo, msg.stepInfo))

            if (callback) callback()
        }
        this.network.get('/api/step', handler)
    }

    dataAction(type, payload) {
        this.store.dispatch(data.action(type, payload))
    }
}

export default App