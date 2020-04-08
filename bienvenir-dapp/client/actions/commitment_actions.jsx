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
    
    let bvContract = store.getState().auth.authentication.clContract1  
    doSignAsBeneficiary()  
    let bvCommitments = await bvContract.methods.getCommitments().call()
    let commitments = [];

    bvCommitments.forEach(commitment => {
        let _id = parseInt(commitment[0]);
        let _name = commitment[1];
        let _description = commitment[2];
        let _steps = [];
        commitment[4].forEach(step => {
            let _id = parseInt(step[0]);
            let _stepType = parseInt(step[1]);      //simple, value_required, automatic_transfer
            let _transferValue = parseInt(step[2]); //Zero by default, when stepType is automatic_transfer the value need to be higher than zero
            let _name = step[3];
            _steps.push({
                id: _id,
                stepType: _stepType,
                transferValue: _transferValue,
                name: _name
            });
        });
        let _status = parseInt(commitment[5]);
        commitments.push({
            id: _id,
            name: _name,
            description: _description,
            creationDate: 0,
            steps: _steps,
            status: _status
        });
    });

    dispatch({ type: CELO_FETCH_COMMITMENT_SUCCESS, commitments })
}

const doSignAsBeneficiary = async () => {

    // function addBeneficiary(
    //     address _beneficiary,
    //     string memory _phone
    // )
}

export const celoSignCommitment = (_commitment) => async dispatch => {
    const requestId = 'sign_commitment'
    const dappName = 'Bienvenir'
    const callback = Linking.makeUrl('/my/path')
    let bvAddress = store.getState().auth.authentication.address
    let bvContract = store.getState().auth.authentication.clContract1

    console.log('celo_sign_commitment ', _commitment.id)
    //console.log('celo_sign_commitment', 'starting')

    const txObject = await bvContract.methods.createSignedCommitment(_commitment.id)

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

export const celoGetSignedCommitments = () => async dispatch => {
    
    let bvContract = store.getState().auth.authentication.clContract1
    
    let bvCommitments = await bvContract.methods.getCommitments().call()
    let commitments = [];

    bvCommitments.forEach(commitment => {
        let _id = parseInt(commitment[0]);
        let _name = commitment[1];
        let _description = commitment[2];
        let _steps = [];
        commitment[4].forEach(step => {
            let _id = parseInt(step[0]);
            let _stepType = parseInt(step[1]);      //simple, value_required, automatic_transfer
            let _transferValue = parseInt(step[2]); //Zero by default, when stepType is automatic_transfer the value need to be higher than zero
            let _name = step[3];
            _steps.push({
                id: _id,
                stepType: _stepType,
                transferValue: _transferValue,
                name: _name
            });
        });
        let _status = parseInt(commitment[5]);
        commitments.push({
            id: _id,
            name: _name,
            description: _description,
            creationDate: 0,
            steps: _steps,
            status: _status
        });
    });

    dispatch({ type: CELO_FETCH_COMMITMENT_SUCCESS, commitments })
}