import {
    CELO_FETCH_SIGNED_COMMITMENT_SUCCESS,
    CELO_FETCH_SIGNED_COMMITMENT_FAIL
} from '../actions/types'

const INITIAL_STATE = {
    signedCommitments: [],
    transaction: {}
}
export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CELO_FETCH_SIGNED_COMMITMENT_SUCCESS:
            return { signedCommitments: action.signedCommitments }
        case CELO_FETCH_SIGNED_COMMITMENT_FAIL:
            return { signedCommitments: null }
        default:
            return state
    }
}