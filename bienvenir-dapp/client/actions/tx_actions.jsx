import { AsyncStorage} from 'react-native'

import {
    CELO_SIGN_COMMITMENT_SUCESS,
    CELO_SIGN_COMMITMENT_FAIL
} from './types'
import store from '../store';
import '../global'
import { web3, kit } from '../root'
import {   
    requestTxSig,
    waitForSignedTxs,
    FeeCurrency
} from '@celo/dappkit'
import { toTxResult } from '@celo/contractkit/lib/utils/tx-result'
import { Linking } from 'expo'

export const celoSignCommitment = (_id) => async dispatch => {
    const requestId = 'sign_commitment'
    const dappName = 'Bienvenir'
    const callback = Linking.makeUrl('/my/path')
    let bvAddress = store.getState().auth.authentication.address
    let bvContract = store.getState().auth.authentication.clContract1

    const txObject = await bvContract.methods.createSignedCommitment(_id)

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
    let transaction = await toTxResult(kit.web3.eth.sendSignedTransaction(tx)).waitReceipt()

    dispatch({ type: CELO_SIGN_COMMITMENT_SUCESS, transaction })
}