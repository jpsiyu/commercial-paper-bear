import React from 'react'
import Step from './step'
import Log from './log'
import Explanation from './explanation'

class Entry extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className='entry'>
            <div className='net shadow'>
                <Explanation />
            </div>
            <div className='op'>
                <Step />
                <Log />
            </div>
        </div>
    }

}

export default Entry