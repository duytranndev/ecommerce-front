import { GET_PRODUCT } from '../actions/product.action'
import { AppAction, ProductState } from '../types'

const initialState: ProductState = {
  data: []
}

const ProductReducer = (state = initialState, action: AppAction): ProductState => {
  switch (action.type) {
    case GET_PRODUCT:
      return { ...state, data: action.payload }
    default:
      return { ...state }
  }
}

export default ProductReducer
