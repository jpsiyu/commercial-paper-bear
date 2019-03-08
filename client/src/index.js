import React from 'react'
import ReactDOM from 'react-dom'
import Entry from './entry'
import App from './app'
import { Provider } from 'react-redux'

const render = () => {
    ReactDOM.render(
        <Provider store={window.app.store}><Entry /></Provider>,
        document.getElementById('root')
    )
}

window.app = new App()
window.app.run(render)