import {
    CELO_FETCH_COMMITMENT_SUCCESS,
    CELO_FETCH_COMMITMENT_FAIL
} from '../actions/types'

const INITIAL_STATE = {
    commitments: [],
    transaction: {}
}
export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CELO_FETCH_COMMITMENT_SUCCESS:
            return { commitments: action.commitments }
        case CELO_FETCH_COMMITMENT_FAIL:
            return { commitments: null }
        default:
            return state
    }
}