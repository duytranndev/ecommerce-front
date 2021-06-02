import { CHANGE_CART, SET_LOGIN, SET_LOGOUT, SET_USER_INFO, UPDATE_USER } from '../actions/auth.action'
import { AppAction } from '../types'

const initialState: any = {
  user: {},
  isLogged: false
}

export default function authReducer(state = initialState, action: AppAction) {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        user: { ...action.payload }
      }

    case SET_LOGIN:
      return { ...state, isLogged: true }

    case SET_LOGOUT:
      return { isLogged: false, user: {} }

    case CHANGE_CART:
      return { ...state, user: { ...state.user, cart: action.payload } }

    case UPDATE_USER:
      return { ...state, user: { ...state.user, ...action.payload } }

    default:
      return state
  }
}
