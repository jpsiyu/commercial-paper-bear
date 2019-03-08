import React from 'react'
import packJson from '../../package.json'

class Log extends React.Component {
    constructor(props) {
        super(props)
        this.socket = this.setSocket()
        this.state = {
            logHistory: ''
        }
        this.logRef = React.createRef()
    }

    render() {
        return <div className='log shadow' ref={this.logRef}>
            <p>{this.state.logHistory}</p>
        </div>
    }

    componentDidUpdate() {
        const elem = this.logRef.current
        elem.scrollTop = elem.scrollHeight
    }

    setSocket() {
        const socket = new WebSocket(`ws:localhost:${packJson.sport}`)
        socket.addEventListener('open', event => {
            socket.send('socket open')
        })
        socket.addEventListener('message', event => {
            this.setState({ logHistory: this.state.logHistory + event.data })
        })
        socket.addEventListener('close', event => {
            console.log('socket close')
        })
        return socket
    }
}

export default Log
