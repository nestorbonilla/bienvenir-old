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
    
    //let currentState = await store.getState()

    let bvContract = await store.getState().auth.authentication.clContract1
    

    let bvSignedCommitments = await bvContract.methods.getSignedCommitments().call()
    let signedCommitments = []

    let commitments = await store.getState().commitment.commitments
    
    signedCommitments = doDestructureSignedCommitments(commitments, bvSignedCommitments)

    dispatch({ type: CELO_FETCH_SIGNED_COMMITMENT_SUCCESS, signedCommitments })
}

doDestructureSignedCommitments = (commitments, bvSignedCommitments) => {

    let signedCommitments = []

    bvSignedCommitments.forEach(signedCommitment => {
        
        //console.log('signed commitment in loop', signedCommitment)

        let _id = parseInt(signedCommitment[0])
        let _commitmentId = parseInt(signedCommitment[1])
        let _signatureDate = parseInt(signedCommitment[2])
        let _nextAccomplishmentId = parseInt(signedCommitment[3])

        //console.log('commitmentId in loop', _commitmentId)
        //console.log('commitment in loop', commitments[_commitmentId])
        let _commitmentName = commitments[_commitmentId].name
        let _commitmentDescription = commitments[_commitmentId].description
        let _steps = []

        commitments[_commitmentId].steps.forEach(step => {

            let _id = step.id
            let _stepType = step.stepType               //simple, value_required, automatic_transfer
            let _transferValue = step.transferValue    //Zero by default, when stepType is automatic_transfer the value need to be higher than zero
            let _name = step.name
            let _accomplishmentsByCommitment = []

            signedCommitment.accomplishments.forEach(accomplishment => {
                let _id = parseInt(accomplishment[0])
                let _stepId = parseInt(accomplishment[1])
                let _accomplishDate = parseInt(accomplishment[2])
                let _accomplishmentCategory = parseInt(accomplishment[3])     //started, ended
                let _accomplishValue = accomplishment[4]

                //console.log('accomplishment inside signed commitment', _stepId)
                //console.log('step id inside signed commitment', step.id)
                if (_stepId == step.id) {
                    //console.log('_stepId match with step.id', 'yes')
                    _accomplishmentsByCommitment.push({
                        id: _id,
                        stepType: _stepType,
                        accomplishDate: _accomplishDate,
                        accomplishmentCategory: _accomplishmentCategory,
                        accomplishValue: _accomplishValue
                    })
                }
            })

            _steps.push({
                id: _id,
                stepType: _stepType,
                transferValue: _transferValue,
                name: _name,
                accomplishments: _accomplishmentsByCommitment
            })
        })
        
        signedCommitments.push({
            id: _id,
            commitmentId: _commitmentId,
            signatureDate: _signatureDate,
            nextAccomplishmentId: _nextAccomplishmentId,
            name: _commitmentName,
            description: _commitmentDescription,
            steps: _steps
        })
    })
    console.log('final_signed_commitments', signedCommitments)
    return signedCommitments
}