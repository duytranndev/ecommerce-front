import { Action, applyMiddleware, combineReducers, createStore, Middleware } from 'redux'
import thunk from 'redux-thunk'
import { loadState, saveState } from '../store/localStorage'
import authReducer from './reducers/auth.reducer'
import BrandReducer from './reducers/brand.reducer'
import todoProduct from './reducers/cart.reducer'
import CategoryReducer from './reducers/category.reducer'
import CommentReducer from './reducers/comment.reducer'
import discountReducer from './reducers/discount.reducer'
import orderReducer from './reducers/order.reducer'
import ProductReducer from './reducers/product.reducer'

const rootReducer = combineReducers({
  _todoProduct: todoProduct,
  authUser: authReducer,
  order: orderReducer,
  comment: CommentReducer,
  auth: authReducer,
  discount: discountReducer,
  category: CategoryReducer,
  product: ProductReducer,
  brand: BrandReducer
})

const middleware = [thunk]
const logger: Middleware = () => (next: unknown) => (action: Action): void => {
  if (process.env.NODE_ENV !== 'production') {
  }
  return typeof next === 'function' ? next(action) : undefined
}

const persistedState = loadState()

const store = createStore(rootReducer, persistedState, applyMiddleware(logger, ...middleware))
store.subscribe(() => {
  saveState({ _todoProduct: store.getState()._todoProduct })
})
export default store
