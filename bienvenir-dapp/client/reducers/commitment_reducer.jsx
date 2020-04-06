import {
    CELO_FETCH_COMMITMENT_SUCCESS,
    CELO_FETCH_COMMITMENT_FAIL
} from '../actions/types'

const INITIAL_STATE = {
    commitments: [
        {
            id: 1,
            title: 'Apoyo a migrantes en su solicitud de refugio',
            description: 'Este es un programa de apoyo a migrantes que desean conocer sus derechos y deberes en el pais receptor y desean apoyo en su proceso regulatorio.',
            steps: [
                {
                    id: 1,
                    content: 'Concluir el curso Iniciando mi proceso migratorio en la plataforma Bienvenir.'
                },
                {
                    id: 2,
                    content: 'Completar prueba diagnostica del curso Iniciando mi proceso migratorio en la plataforma Bienvenir y obtener como minimo 70% de puntaje.'
                }
            ]
        },
        {
            id: 2,
            title: 'Compromiso no. 2',
            description: 'Esta es una prueba',
            steps: []
        },
        {
            id: 3,
            title: 'Compromiso no. 3',
            description: 'Esta es una prueba',
            steps: []
        }
    ]
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