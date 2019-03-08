const doorman = require('./doorman')
const Message = require('./message')
const { spawn } = require('child_process')

const cfgStep = [
    { id: 1, name: 'Create Network', desc: 'Just start the basic network', fun: doorman.createNetwork },
    { id: 2, name: 'MagnetoCorp Up', desc: 'Run MagnetoCorp administrator container', fun: doorman.runMagnetoCorpAdmin },
    { id: 3, name: 'Install Contract', desc: 'Install papercontract', fun: doorman.installContract },
    { id: 4, name: 'Instantiate Contract', desc: 'Instanciate papercontract', fun: doorman.instantiateContract },
    { id: 5, name: 'Install Dependency', desc: 'Install js project dependency', fun: doorman.installDependency },
    { id: 6, name: 'Add To Wallet', desc: 'Add MagnetoCorp to Wallet', fun: doorman.addWallet },
    { id: 7, name: 'Issue Paper', desc: 'Issue Paper', fun: doorman.issuePaper },
    { id: 8, name: 'DigiBank Up', desc: 'Run DigiBank container', fun: doorman.digiBankUp },
    { id: 9, name: 'Install Dependency', desc: 'Install digibank app dependency', fun: doorman.installDependency2 },
    { id: 10, name: 'Add To Wallet', desc: 'Add DigiBank to Wallet', fun: doorman.addWallet2 },
    { id: 11, name: 'Buy Paper', desc: 'DigiBank buy paper', fun: doorman.buyPaper },
    { id: 12, name: 'Redeem Paper', desc: 'DigiBank redeem paper', fun: doorman.redeemPaper },
    { id: 13, name: 'Shutdown Network', desc: 'Just Shutdown the basic network', fun: doorman.shutdownNetwork },
    { id: 14, name: 'Clear Container', desc: 'Clear MagnetoCorp and DigiBank container', fun: doorman.clearContainer },
]

class StepMgr {
    constructor(logHandler) {
        this.step = 1
        this.done = false
        this.logHandler = logHandler
    }

    getCurrentStepInfo() {
        const msg = new Message()
        msg.stepInfo = this._info()
        msg.code = 0
        return msg
    }

    next() {
        const msg = new Message()
        if (this.done) {
            this.step += 1
            this.done = false
            msg.code = 0
        } else {
            msg.code = 1
        }
        msg.stepInfo = this._info()
        return msg
    }

    _info() {
        const cfg = this.getStepById(this.step)
        if (!cfg) return null
        const stepInfo = {
            id: cfg.id,
            name: cfg.name,
            desc: cfg.desc,
            done: this.done,
        }
        return stepInfo
    }

    getStepById(stepid) {
        let cfg
        for (let i = 0; i < cfgStep.length; i++) {
            if (cfgStep[i].id == stepid) {
                cfg = cfgStep[i]
            }
        }
        return cfg
    }

    async runStep(stepid) {
        const cfg = this.getStepById(stepid)
        if (!cfg)
            return { code: 1 }

        const result = await cfg.fun(this.createProcess.bind(this))
        const msg = new Message()
        msg.code = result.code
        if (msg.code == 0)
            this.done = true
        msg.stepInfo = this._info()
        return msg
    }

    createProcess(cmd, args, options) {
        return new Promise((resolve, reject) => {
            let log = ''
            const child = spawn(cmd, args, options)
            child.stdout.on('data', data => {
                this.logHandler(data.toString())
            })
            child.stderr.on('data', data => {
                this.logHandler(data.toString())
            })
            child.on('close', code => {
                resolve({ log, code })
            })
        })
    }
}

module.exports = StepMgr