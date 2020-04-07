import { AsyncStorage} from 'react-native'

import {
    CELO_LOGIN_SUCCESS,
    CELO_LOGIN_FAIL,
    CELO_LOGOUT_SUCCESS,
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

export const celoLogin = () => async dispatch => {
    let address = await AsyncStorage.getItem('clLogin')
    if(address) {
        //Celo Login is done
        dispatch({ type: CELO_LOGIN_SUCCESS, payload: address })
    } else {
        //Lauch Celo call to Login
        doCeloLogin(dispatch)
    }
}

const doCeloLogin = async dispatch => {

    //Login to get Celo data account

    const requestId = 'login'
    const dappName = 'Bienvenir'
    const callback = Linking.makeUrl('/my/path')
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Bienvenir.networks[networkId];
  
    requestAccountAddress({
      requestId,
      dappName,
      callback,
    })
  
    const dappkitResponse = await waitForAccountAuth(requestId)

    kit.defaultAccount = dappkitResponse.address

    const stableToken = await kit.contracts.getStableToken()

    const [cUSDBalanceBig, cUSDDecimals] = await Promise.all([stableToken.balanceOf(kit.defaultAccount), stableToken.decimals()])
    let cUSDBalance = cUSDBalanceBig.toString()
    let cUSDDecimal = cUSDDecimals.toString()
    if (cUSDBalance === '') {
        return dispatch({ type: CELO_LOGIN_FAIL })
    } else {
        await AsyncStorage.setItem('cl_address', '' + dappkitResponse.address)
        await AsyncStorage.setItem('cl_phone', '' + dappkitResponse.phoneNumber)
        await AsyncStorage.setItem('cl_balance', cUSDBalance)
        await AsyncStorage.setItem('cl_decimal', cUSDDecimal)

        //Creating Celo instance
        const instance = new web3.eth.Contract(
            Bienvenir.abi,
            deployedNetwork && deployedNetwork.address,
            { 
                from: kit.defaultAccount
            }
        )

        //store.setState({ address: dappkitResponse.address, phoneNumber: dappkitResponse.phoneNumber })

        let authentication = {
            address: dappkitResponse.address,
            phoneNumber: dappkitResponse.phoneNumber,
            'clLogin': 'SALIR',
            'clAddress': dappkitResponse.address,
            'clPhone': dappkitResponse.phoneNumber,
            'clBalance': cUSDBalance,
            'clDecimal': cUSDDecimal,
            'clContract1': instance,
            'clContractName': '',
            'clTextInput': ''
        }
        
        dispatch({ type: CELO_LOGIN_SUCCESS, authentication })
    }
        
}

export const celoLogout = () => async dispatch => {

    await AsyncStorage.setItem('cl_address', '')
    await AsyncStorage.setItem('cl_phone', '')
    await AsyncStorage.setItem('cl_balance', '')
    await AsyncStorage.setItem('cl_decimal', '')

    let authentication = {
        'clLogin': 'AUTENTICAR',
        'clAddress': '...',
        'clBalance': '...',
        'clDecimal': '...',
        'clPhone': '...',
        'clContract1': {},
        'clContractName': '',
        'clTextInput': ''
    }
    
    dispatch({ type: CELO_LOGOUT_SUCCESS, authentication })
}

export const celoRead = () => async dispatch => {
    
    //Creating Celo instance
    const instance = new web3.eth.Contract(
        Bienvenir.abi,
        deployedNetwork && deployedNetwork.address,
        { 
            from: kit.defaultAccount
        }
    )

    let name = await instance.methods.getName().call()
    dispatch({ type: CELO_LOGIN_SUCCESS, name })
}