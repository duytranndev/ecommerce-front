import { SET_DISCOUNT } from '../actions/discount.action'

const initialState: any = {
  discountCoded: '',
  discountPercent: 0
}

export default function discountReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_DISCOUNT:
      return { ...state, discountPercent: action.payload.percent, discountCoded: action.payload.code }
    default:
      return state
  }
}
