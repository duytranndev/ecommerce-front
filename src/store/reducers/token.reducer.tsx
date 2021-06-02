import { SET_TOKEN } from '../actions/token.action'

const initialState: any = {
    token: {}
}

export default function authReducer(state = initialState, action: any) {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload
            }

        default:
            return state
    }
}
