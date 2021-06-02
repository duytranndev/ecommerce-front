import { GET_BRAND } from '../actions/brand.action'
import { AppAction, BrandState } from '../types'

const initialState: BrandState = {
  list: []
}

const BrandReducer = (state = initialState, action: AppAction): BrandState => {
  switch (action.type) {
    case GET_BRAND:
      return { ...state, list: action.payload }
    default:
      return state
  }
}

export default BrandReducer
