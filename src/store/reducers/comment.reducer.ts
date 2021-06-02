import { CREATE_COMMENT, GET_COMMENT } from '../actions/comment.action'
import { AppAction, CommentState } from '../types'

const initialState: CommentState = {
  list: []
}

const CommentReducer = (state = initialState, action: AppAction): CommentState => {
  switch (action.type) {
    case GET_COMMENT:
      if (typeof action.payload !== 'undefined') {
        return { ...state, list: action.payload }
      }
      return state
    case CREATE_COMMENT:
      let list = [...state.list]
      list.push(action.payload)
      return { ...state, list: list }
    default:
      return state
  }
}

export default CommentReducer
