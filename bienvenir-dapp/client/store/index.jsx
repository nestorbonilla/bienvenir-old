import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers/'

const store = createStore(
    reducers,
    {
        // auth: {
        //     authentication: {
        //         clLogin: 'Autenticar',
        //         clAddress: '...',
        //         clBalance: '...',
        //         clDecimal: '...',
        //         clPhone: '...',
        //         clContract1: {},
        //         clContractName: '',
        //         clTextInput: ''
        //     }
        // }
    },
    compose(
        applyMiddleware(thunk)
    )
)

export default store