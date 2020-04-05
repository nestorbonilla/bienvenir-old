import { combineReducers } from 'redux'
import auth from './auth_reducer'
import commitment from './commitment_reducer'

export default combineReducers({
    auth,
    commitment
    //celo: () => { return {} }
})