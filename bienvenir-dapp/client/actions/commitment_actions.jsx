import { AsyncStorage} from 'react-native'

import {
    CELO_LOGIN_SUCCESS,
    CELO_LOGIN_FAIL
} from './types'

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

// How to use AsyncStorage
// AsyncStorage.setItem('cl_token', token)
// AsyncStorage.getItem('cl_token')

export const celoReadCommitments = () => async dispatch => {
    
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
            title: 'Compromiso no. 1 modificado',
            description: 'Esta es una prueba'
        },
        {
            title: 'Compromiso no. 1 modificado',
            description: 'Esta es una prueba'
        }
    ]

    dispatch({ type: CELO_FETCH_COMMITMENT_SUCCESS, commitments })
}