import { GET_CATEGORY } from '../actions/category.action'
import { AppAction, CategoryState } from '../types'

const initialState: CategoryState = {
  list: []
}

const CategoryReducer = (state = initialState, action: AppAction): CategoryState => {
  switch (action.type) {
    case GET_CATEGORY:
      return { ...state, list: action.payload }
    default:
      return state
  }
}

export default CategoryReducer
