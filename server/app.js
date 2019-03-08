const express = require('express')
const path = require('path')
const packJson = require('../package.json')
const bodyParser = require('body-parser')
const StepMgr = require('./step-mgr')
const LogService = require('./log-service')

const app = express()
app.use(express.static(path.resolve(__dirname, '../dist')))
app.use(express.static(path.resolve(__dirname, '../client/public')))
app.use(bodyParser.json())

app.get('/api/step', (req, res) => {
    const msg = app.stepMgr.getCurrentStepInfo()
    res.send(JSON.stringify(msg))
})

app.put('/api/runstep', async (req, res) => {
    const stepid = req.body.stepid
    const msg = await app.stepMgr.runStep(stepid)
    res.send(JSON.stringify(msg))
})

app.put('/api/nextstep', (req, res) => {
    const msg = app.stepMgr.next()
    res.send(JSON.stringify(msg))
})

app.logService = new LogService(app)
const logHandler = (log) => { app.logService.sendLog(log) }
app.stepMgr = new StepMgr(logHandler)


app.listen(packJson.port, console.log(`server listen on port ${packJson.port}`))
