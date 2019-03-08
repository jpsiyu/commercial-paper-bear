
const createNetwork = (processHandler) => {
    return processHandler('sh', ['start.sh'], { cwd: '../basic-network' })
}

const runMagnetoCorpAdmin = (processHandler) => {
    return processHandler(
        'docker-compose',
        ['up', '-d', 'cliMagnetoCorp'],
        { cwd: '../commercial-paper/organization/magnetocorp/configuration/cli/' }
    )
}

const installContract = (processHandler) => {
    const args = [
        'exec',
        'cliMagnetoCorp',
        'peer',
        'chaincode',
        'install',
        '-n',
        'papercontract',
        '-v',
        '0',
        '-p',
        '/opt/gopath/src/github.com/contract',
        '-l',
        'node',
    ]
    return processHandler('docker', args)
}

const instantiateContract = (processHandler) => {
    const args = [
        'exec',
        'cliMagnetoCorp',
        'peer',
        'chaincode',
        'instantiate',
        '-n',
        'papercontract',
        '-v',
        '0',
        '-l',
        'node',
        '-c',
        '{"Args":["org.papernet.commercialpaper:instantiate"]}',
        '-C',
        'mychannel',
        '-P',
        "AND ('Org1MSP.member')",
    ]
    return processHandler('docker', args)
}

const installDependency = (processHandler) => {
    return processHandler(
        'npm',
        ['install'],
        { cwd: '../commercial-paper/organization/magnetocorp/application' }
    )
}

const addWallet = (processHandler) => {
    return processHandler(
        'node',
        ['addToWallet.js'],
        { cwd: '../commercial-paper/organization/magnetocorp/application' }
    )
}

const issuePaper = (processHandler) => {
    return processHandler(
        'node',
        ['issue.js'],
        { cwd: '../commercial-paper/organization/magnetocorp/application' }
    )
}

const digiBankUp = (processHandler) => {
    return processHandler(
        'docker-compose',
        ['up', '-d', 'cliDigiBank'],
        { cwd: '../commercial-paper/organization/digibank/configuration/cli/' }
    )
}

const installDependency2 = (processHandler) => {
    return processHandler(
        'npm',
        ['install'],
        { cwd: '../commercial-paper/organization/digibank/application' }
    )
}

const addWallet2 = (processHandler) => {
    return processHandler(
        'node',
        ['addToWallet.js'],
        { cwd: '../commercial-paper/organization/digibank/application' }
    )
}

const buyPaper = (processHandler) => {
    return processHandler(
        'node',
        ['buy.js'],
        { cwd: '../commercial-paper/organization/digibank/application' }
    )
}

const redeemPaper = (processHandler) => {
    return processHandler(
        'node',
        ['redeem.js'],
        { cwd: '../commercial-paper/organization/digibank/application' }
    )
}

const shutdownNetwork = (processHandler) => {
    return processHandler('sh', ['stop.sh'], { cwd: '../basic-network' })
}

const clearContainer = (processHandler) => {
    return processHandler('npm', ['run', 'dockercc'])
}

module.exports = {
    createNetwork,
    runMagnetoCorpAdmin,
    installContract,
    instantiateContract,
    installDependency,
    addWallet,
    issuePaper,
    digiBankUp,
    installDependency2,
    addWallet2,
    buyPaper,
    redeemPaper,
    shutdownNetwork,
    clearContainer,
}