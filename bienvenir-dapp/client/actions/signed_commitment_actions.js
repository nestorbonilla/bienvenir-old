import { AsyncStorage} from 'react-native'

import {
    CELO_FETCH_SIGNED_COMMITMENT_SUCCESS,
    CELO_FETCH_SIGNED_COMMITMENT_FAIL
} from './types'
import store from '../store';
import '../global'

// How to use AsyncStorage
// AsyncStorage.setItem('cl_token', token)
// AsyncStorage.getItem('cl_token')


export const celoGetSignedCommitments = () => async dispatch => {
    
    let bvContract = store.getState().auth.authentication.clContract1
    
    let bvSignedCommitments = await bvContract.methods.getSignedCommitments().call()
    let signedCommitments = [];

    bvSignedCommitments.forEach(signedCommitment => {
        let _id = parseInt(signedCommitment[0]);
        let _commitmentId = signedCommitment[1];
        let _signatureDate = signedCommitment[2];
        let _nextAccomplishmentId = signedCommitment[3];
        let _accomplishments = [];
        signedCommitment[4].forEach(step => {
            let _id = parseInt(step[0]);
            let _stepType = parseInt(step[1]);      //started, ended
            let _accomplishDate = parseInt(step[2]);
            let _accomplishmentCategory = parseInt(step[3]);
            let _accomplishValue = parseInt(step[3]);
            _accomplishments.push({
                id: _id,
                stepType: _stepType,
                accomplishDate: _accomplishDate,
                accomplishmentCategory: _accomplishmentCategory,
                accomplishValue: _accomplishValue
            });
        });
        signedCommitments.push({
            id: _id,
            commitmentId: _commitmentId,
            signatureDate: _signatureDate,
            nextAccomplishmentId: _nextAccomplishmentId,
            accomplishments: _accomplishments
        });
    });

    dispatch({ type: CELO_FETCH_SIGNED_COMMITMENT_SUCCESS, signedCommitments })
}