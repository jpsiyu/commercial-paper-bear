const packJson = require('../../package.json')
import data from './data'

class LogSocket {
    constructor() {
        this.socket = this.setup()
    }

    setup() {
        const socket = new WebSocket(`ws:localhost:${packJson.sport}`)
        socket.addEventListener('open', event => {
            socket.send('socket open')
        })
        socket.addEventListener('message', event => {
            window.app.dataAction(data.ActionType.UpdateLog, event.data)
        })
        socket.addEventListener('close', event => {
            console.log('socket close')
        })
        return socket
    }
}

export default LogSocket