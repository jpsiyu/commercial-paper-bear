const WebSocket = require('ws')
const packJson = require('../package.json')

class LogService {
    constructor(server) {
        this.setup(server)
        this.clients = []
    }

    setup(server) {
        /* websocket */
        const wss = new WebSocket.Server({
            server: server,
            port: packJson.sport,
        })
        wss.on('connection', (ws) => {
            this.clients.push(ws)
        })
    }


    sendLog(msg) {
        this.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN)
                client.send(msg)
        })
    }
}

module.exports = LogService
