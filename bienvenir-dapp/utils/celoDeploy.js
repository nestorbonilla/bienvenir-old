const Kit = require('@celo/contractkit')

const kit = Kit.newKit('https://alfajores-forno.celo-testnet.org')

const getAccount = require('./getAccount').getAccount

async function awaitWrapper(){
    let account = await getAccount()

    console.log(account.address)
}

awaitWrapper()