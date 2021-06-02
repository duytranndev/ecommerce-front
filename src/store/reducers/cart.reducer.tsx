import { notification } from 'antd'
import {
  ADD_CART,
  ADD_CART_COUNT,
  DECREASE_QUANTITY,
  DELETE_ALL_CART,
  DELETE_ALL_ORDER,
  DELETE_CART,
  GET_NUMBER_CART,
  GET_PRODUCT,
  INCREASE_QUANTITY,
  SAVE_ORDER,
  SET_CART,
  UPDATE_CART
} from '../actions/cart.action'

const initProduct: any = {
  Carts: [],
  Order: {}
}

const notifiSuccess = (title: string, content: string) => {
  notification.config({
    duration: 2
  })
  notification['success']({
    message: title,
    description: content
  })
}

export default function todoProduct(state = initProduct, action: any) {
  switch (action.type) {
    case GET_PRODUCT:
      return {
        ...state
        // _products: action.payload
      }

    case GET_NUMBER_CART:
      return {
        ...state
      }

    case ADD_CART:
      let total = 0
      if (state.NumberCart === 0) {
        let cart = {
          id: action.payload.id,
          quantity: 1
        }
        state.Carts.push(cart)
        total = total + action.payload.price
      } else {
        let check = false
        state.Carts.map((item: any, key: any) => {
          if (item.id === action.payload.id) {
            state.Carts[key].quantity += 1
            check = true
            total = total + action.payload.price
          }
        })
        if (!check) {
          let _cart = {
            id: action.payload.id,
            quantity: 1
          }
          state.Carts.push(_cart)
          total = total + action.payload.price
        }
      }
      return {
        ...state
      }

    case ADD_CART_COUNT:
      const product = state.Carts.find((pro: { id: any }) => pro.id === action.payload.id)
      if (product) {
        product.quantity += action.amount || 1
      } else {
        state.Carts.push({ id: action.payload.id, quantity: action.amount || 1 })
      }
      return { ...state }

    case INCREASE_QUANTITY:
      state.Carts[action.payload].quantity++
      return {
        ...state
      }

    case DECREASE_QUANTITY:
      let quantity = state.Carts[action.payload].quantity
      if (quantity > 1) {
        state.numberCart--
        state.Carts[action.payload].quantity--
      }

      return {
        ...state
      }

    case DELETE_CART:
      let quantity_ = state.Carts[action.payload].quantity
      let total_ = state.Carts[action.payload].price * quantity_
      notifiSuccess('Success', 'Đã xóa sản phẩm thành công!')
      return {
        ...state,
        Carts: state.Carts.filter((item: any) => {
          return item.id != state.Carts[action.payload].id
        })
      }

    case SAVE_ORDER:
      return {
        ...state,
        Order: action.payload
      }

    case UPDATE_CART:
      const res = action.payload.reduce((acc: any, curr: any) => {
        const isExist = state.Carts.find(({ id }: any) => id === curr.id)
        if (isExist) {
          isExist.quantity = curr.quantity + isExist.quantity
          acc.push(isExist)
        } else {
          acc.push(curr)
        }
        return acc
      }, [])

      state.Carts.map((a: any) => {
        const isExists = res.find((b: any) => a.id == b.id)
        if (!isExists) {
          res.push(a)
        }
      })
      return {
        ...state,
        Carts: res
      }

    case DELETE_ALL_CART:
      return {
        ...state,
        Carts: []
      }
    case DELETE_ALL_ORDER:
      return {
        ...state,
        Order: action.payload
      }
    case SET_CART:
      if (!action.payload.type) localStorage.setItem('cart', JSON.stringify(action.payload.cart))
      return {
        ...state,
        Carts: action.payload
      }

    default:
      return state
  }
}
