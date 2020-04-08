import { combineReducers } from 'redux'
import tx from './tx_reducer'
import auth from './auth_reducer'
import commitment from './commitment_reducer'
import signedCommitment from './signed_commitment_reducer'

export default combineReducers({
    tx,
    auth,
    commitment,
    signedCommitment
})