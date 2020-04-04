import {
    CELO_LOGIN_SUCCESS,
    CELO_LOGIN_FAIL
} from '../actions/types'

export default function(state = {}, action) {
    switch (action.type) {
        case CELO_LOGIN_SUCCESS:
            return { authentication: action.authentication }
        case CELO_LOGIN_FAIL:
            return { authentication: null }
        default:
            return state
    }
}