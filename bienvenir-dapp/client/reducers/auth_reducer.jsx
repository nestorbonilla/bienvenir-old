import {
    CELO_LOGIN_SUCCESS,
    CELO_LOGIN_FAIL,
    CELO_LOGOUT_SUCCESS 
} from '../actions/types'

const INITIAL_STATE = {
    authentication: {
        clLogin: 'AUTENTICAR',
        clAddress: '...',
        clBalance: '...',
        clDecimal: '...',
        clPhone: '...',
        clContract1: {},
        clContractName: '',
        clTextInput: ''
    }
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CELO_LOGIN_SUCCESS:
            return { authentication: action.authentication }
        case CELO_LOGIN_FAIL:
            return { authentication: action.authentication }
        case CELO_LOGOUT_SUCCESS:
            return { authentication: action.authentication }
        default:
            return state
    }
}