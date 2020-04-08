import {
    CELO_SIGN_COMMITMENT_SUCESS,
    CELO_SIGN_COMMITMENT_FAIL,
    CELO_CREATE_ACCOMPLISHMENT_SUCESS,
    CELO_CREATE_ACCOMPLISHMENT_FAIL
} from '../actions/types'

const INITIAL_STATE = {
    commitments: [],
    transaction: {}
}
export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CELO_SIGN_COMMITMENT_SUCESS:
            return { transaction: action.transaction }
        case CELO_SIGN_COMMITMENT_FAIL:
            return { transaction: null }
        case CELO_CREATE_ACCOMPLISHMENT_SUCESS:
            return { transaction: action.transaction }
        case CELO_CREATE_ACCOMPLISHMENT_FAIL:
            return { transaction: null }
        default:
            return state
    }
}