import React from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'

class Anim extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            in: false,
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ in: true })
        }, 100);
    }

    render() {
        return <CSSTransition
            classNames={{
                enter: 'enter',
                enterActive: 'enter-active',
                exit: 'exit',
                exitActive: 'exit-active',
            }}
            in={this.state.in}
            unmountOnExit
            timeout={1000}>
            {this.props.children}
        </CSSTransition>
    }
}

const ExBox = (props) => {
    const style = { left: props.x, top: props.y }
    return <Anim>
        <div className='box shadow' style={style}>{props.text}</div>
    </Anim>
}

const ExCir = (props) => {
    const style = { left: props.x, top: props.y }
    return <Anim>
        <div className='circle shadow' style={style}>{props.text}</div>
    </Anim>
}

const ExNetwork = (props) => {
    return <div className='boxwrap'>
        <ExCir text='ledger database' x='45%' y='25%' />
        <ExCir text='peer' x='30%' y='10%' />
        <ExCir text='CA' x='10%' y='60%' />
        <ExCir text='orderer' x='60%' y='60%' />
    </div>
}

const ExMagneto = (props) => {
    return <div className='boxwrap'>
        <ExCir text='MagnetoCorp Admin' x='20%' y='20%' />
    </div>
}

const ExContract = (props) => {
    return <div className='boxwrap'>
        <ExBox text='Deploy Contract' x='10%' y='20%' />
    </div>
}

const ExObject = (props) => {
    const style = {
        left: '10%',
        top: '20%',
    }
    return <div className='boxwrap'>
        <div className='obj' style={style}></div>
    </div>
}

const ExMagnetoApp = (props) => {
    return <div className='boxwrap'>
        <ExBox text='Application' x='20%' y='60%' />
    </div>
}

const ExMagnetoWallet = (props) => {
    return <div className='boxwrap'>
        <ExBox text='Key,CA,Wallet' x='35%' y='75%' />
    </div>
}

const ExIssue = (props) => {
    return <div className='boxwrap'>
        <ExBox text='IssuePaper' x='55%' y='80%' />
    </div>
}

const ExDigiBank = (props) => {
    return <div className='boxwrap'>
        <ExCir text='DigiBank Admin' x='20%' y='20%' />
    </div>
}

const ExBankApp = (props) => {
    return <div className='boxwrap'>
        <ExBox text='Application' x='20%' y='60%' />
    </div>
}

const ExBankWallet = (props) => {
    return <div className='boxwrap'>
        <ExBox text='Key,CA,Wallet' x='35%' y='75%' />
    </div>
}

const ExBuy = (props) => {
    return <div className='boxwrap'>
        <ExBox text='Buy Paper' x='45%' y='10%' />
    </div>
}

const ExRedeem = (props) => {
    return <div className='boxwrap'>
        <ExBox text='Redeem Paper' x='55%' y='80%' />
    </div>
}

const ExShutdown = (props) => {
    return <div className='boxwrap'>
        <div className='shutdown'></div>
    </div>
}

const ExClear = (props) => {
    return <div className='boxwrap'>
        <div className='shutdown'></div>
    </div>
}

const exConfig = [
    { id: 1, comp: ExNetwork, place: 'mid' },
    { id: 2, comp: ExMagneto, place: 'left' },
    { id: 3, comp: ExContract, place: 'mid' },
    { id: 4, comp: ExObject, place: 'mid' },
    { id: 5, comp: ExMagnetoApp, place: 'left' },
    { id: 6, comp: ExMagnetoWallet, place: 'left' },
    { id: 7, comp: ExIssue, place: 'mid' },
    { id: 8, comp: ExDigiBank, place: 'right' },
    { id: 9, comp: ExBankApp, place: 'right' },
    { id: 10, comp: ExBankWallet, place: 'right' },
    { id: 11, comp: ExBuy, place: 'right' },
    { id: 12, comp: ExRedeem, place: 'mid' },
    { id: 13, comp: ExShutdown, place: 'mid' },
    { id: 14, comp: ExClear, place: 'lr' },
]


class Explanation extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { leftElem, midElem, rightElem } = this.genElements()
        return <div className='ex'>
            <div className='left'>
                {leftElem}
            </div>
            <div className='mid'>
                {midElem}
            </div>
            <div className='right'>
                {rightElem}
            </div>
        </div>
    }

    genElements() {
        const midElem = []
        const leftElem = []
        const rightElem = []
        exConfig.forEach(cfg => {
            if (this.isDone(cfg.id)) {
                let Comp = cfg.comp
                if (cfg.place == 'mid')
                    midElem.push(<Comp key={cfg.id} />)
                else if (cfg.place == 'left')
                    leftElem.push(<Comp key={cfg.id} />)
                else if (cfg.place == 'lr') {
                    leftElem.push(<Comp key={cfg.id} />)
                    rightElem.push(<Comp key={cfg.id} />)
                }
                else
                    rightElem.push(<Comp key={cfg.id} />)
            }
        })
        return { leftElem, midElem, rightElem }
    }

    isDone(stepid) {
        const stepInfo = this.props.stepInfo
        if (!stepInfo) return false
        if (stepid < stepInfo.id) return true
        else if (stepid == stepInfo.id) return stepInfo.done
        else return false
    }
}

const mapStateToProps = (state) => {
    return { stepInfo: state.stepInfo }
}

export default connect(mapStateToProps)(Explanation)