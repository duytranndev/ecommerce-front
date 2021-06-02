import { SET_ORDER, SET_LIST_ORDER, UPDATE_LIST_ORDER } from '../actions/order.action'

const initialState: any = {
  Order: null,
  listOrder: []
}

export default function orderReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_ORDER:
      return { ...state, Order: action.payload }
    case SET_LIST_ORDER:
      return { ...state, listOrder: action.payload }
    case UPDATE_LIST_ORDER:
      return { ...state, listOrder: [...state.listOrder, { ...action.payload }] }
    default:
      return state
  }
}
