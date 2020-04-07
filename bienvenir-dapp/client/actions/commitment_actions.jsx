import { AsyncStorage} from 'react-native'

import {
    CELO_FETCH_COMMITMENT_SUCCESS,
    CELO_FETCH_COMMITMENT_FAIL
} from './types'
import store from '../store';
import '../global'
import { web3, kit } from '../root'
import {   
    requestTxSig,
    waitForSignedTxs,
    requestAccountAddress,
    waitForAccountAuth,
    FeeCurrency
} from '@celo/dappkit'
import { CeloContract } from '@celo/contractkit'
import { toTxResult } from '@celo/contractkit/lib/utils/tx-result'
import { Linking } from 'expo'
import HelloWorldContract from '../contracts/HelloWorld.json'
import Bienvenir from '../contracts/Bienvenir.json'

// How to use AsyncStorage
// AsyncStorage.setItem('cl_token', token)
// AsyncStorage.getItem('cl_token')

export const celoGetCommitments = () => async dispatch => {
    
    //Creating Celo instance
    // const instance = new web3.eth.Contract(
    //     HelloWorldContract.abi,
    //     deployedNetwork && deployedNetwork.address,
    //     { 
    //         from: kit.defaultAccount
    //     }
    // )

    // let name = await instance.methods.getName().call()

    let commitments = [
        {
            id: 1,
            title: 'Apoyo a migrantes en su solicitud de refugio mod',
            description: 'Este es un programa de apoyo a migrantes que desean conocer sus derechos y deberes en el pais receptor y desean apoyo en su proceso regulatorio.',
            steps: [
                {
                    id: 1,
                    content: 'Concluir el curso Iniciando mi proceso migratorio en la plataforma Bienvenir.'
                },
                {
                    id: 2,
                    content: 'Completar prueba diagnostica del curso Iniciando mi proceso migratorio en la plataforma Bienvenir y obtener como minimo 70% de puntaje.'
                }
            ]
        },
        {
            id: 2,
            title: 'Compromiso no. 2 mod',
            description: 'Esta es una prueba',
            steps: []
        }
    ]

    const requestId = 'get_commitments'
    const dappName = 'Bienvenir'
    const callback = Linking.makeUrl('/my/path')
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Bienvenir.networks[networkId];

    //Creating Celo instance
    // const instance = new web3.eth.Contract(
    //     Bienvenir.abi,
    //     deployedNetwork && deployedNetwork.address,
    //     { 
    //         from: kit.defaultAccount
    //     }
    // )

    let bvAddress = store.getState().auth.authentication.address
    let bvContract = store.getState().auth.authentication.clContract1
    
    //let bvContract = instance
    console.log('bv_address', bvAddress)
    //console.log('bv_contract', bvContract)
    //let contractCommitments = await bvContract.methods.getCommitments().call({ from: bvAddress })
    //let contractCommitments = await bvContract.methods.getCommitments().call(bvAddress)
    let contractCommitments = await bvContract.methods.getCommitments().call({from: bvAddress}, function(error, result) {})
    //this.setState({ contractName: name })
    
    console.log('get_commitments_action', contractCommitments)
    dispatch({ type: CELO_FETCH_COMMITMENT_SUCCESS, commitments })
}


export const celoSignCommitment = () => async dispatch => {
    const requestId = 'sign_commitment'
    const dappName = 'Bienvenir'
    const callback = Linking.makeUrl('/my/path')
    let bvAddress = store.getState().auth.authentication.address
    let bvContract = store.getState().auth.authentication.clContract1
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = HelloWorldContract.networks[networkId];

    //Creating Celo instance
    const instance = new web3.eth.Contract(
        Bienvenir.abi,
        deployedNetwork && deployedNetwork.address,
        { 
            from: bvAddress
        }
    )

    console.log('celo_sign_commitment', 'starting')

    const txObject = await bvContract.methods.createSignedCommitment(1)

    console.log('celo_sign_commitment', 'after txtObject')

    requestTxSig(
      kit,
      [
        {
          from: bvAddress,
          to: bvContract.options.address,
          tx: txObject,
          feeCurrency: FeeCurrency.cUSD
        }
      ],
      { requestId, dappName, callback }
    )

    const dappkitResponse = await waitForSignedTxs(requestId);
    const tx = dappkitResponse.rawTxs[0];
    let result = await toTxResult(kit.web3.eth.sendSignedTransaction(tx)).waitReceipt()

    console.log(`Bienvenir Contract signed commitment: `, result)  
  }