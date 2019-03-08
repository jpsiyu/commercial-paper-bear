import React from 'react'
import { connect } from 'react-redux'
import data from './data'

class Step extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const info = this.props.stepInfo
        if (!info) return this.renderEnd()

        return <div className='step shadow'>
            <div className='pair'>
                <p>No.</p>
                <p>{info.id}</p>
            </div>
            <div className='pair'>
                <p>Name</p>
                <p>{info.name}</p>
            </div>
            <div className='pair'>
                <p>Desc</p>
                <p>{info.desc}</p>
            </div>
            <div className='full'>
                {
                    info.done
                        ? <button className='btn-next' onClick={this.onBtnNext.bind(this)}>Next</button>
                        : <button className='btn-run' onClick={this.onBtnCreate.bind(this)}>Run</button>
                }
            </div>
        </div>
    }

    renderEnd() {
        return <div className='step-end shadow'>
            <p>Guide End</p>
        </div>
    }

    onBtnNext() {
        const handler = (response) => {
            const msg = response.data
            window.app.dataAction(data.ActionType.UpdateStepInfo, msg.stepInfo)
        }
        window.app.network.put('/api/nextstep', {}, handler)
    }

    onBtnCreate() {
        const handler = (response) => {
            const msg = response.data
            window.app.dataAction(data.ActionType.UpdateStepInfo, msg.stepInfo)
        }
        const args = { stepid: this.props.stepInfo.id }
        window.app.network.put('/api/runstep', args, handler)
    }
}

const mapStateToProps = (state) => {
    return { stepInfo: state.stepInfo }
}
export default connect(mapStateToProps)(Step)
