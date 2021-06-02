export const INCREASE_QUANTITY = 'INCREASE_QUANTITY'
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY'
export const GET_PRODUCT = 'GET_PRODUCT'
export const GET_NUMBER_CART = 'GET_NUMBER_CART'
export const ADD_CART = 'ADD_CART'
export const UPDATE_CART = 'UPDATE_CART'
export const DELETE_CART = 'DELETE_CART'
export const UPDATE_TOP_CART = 'UPDATE_TOP_CART'
export const DELETE_IN_CART = 'DELETE_IN_CART'
export const ADD_TO_CART = 'ADD_TO_CART'
export const ADD_CART_COUNT = 'ADD_CART_COUNT'
export const SAVE_ORDER = 'SAVE_ORDER'
export const DELETE_ALL_CART = 'DELETE_ALL_CART'
export const DELETE_ALL_ORDER = 'DELETE_ALL_ORDER'
export const SET_CART = 'SET_CART'

/* GET LIST OF PRODUCT */
export function GetProduct(payload: any) {
  return {
    type: 'GET_PRODUCT',
    payload
  }
}

/* GET TOTAL ITEM IN CART */
export function GetNumberCart(payload: any) {
  return {
    type: 'GET_NUMBER_CART',
    payload
  }
}

/* ADD PRODUCT TO CART */
export function AddCart(payload: any) {
  return {
    type: 'ADD_CART',
    payload
  }
}
/* UPDATE PRODUCT IN CART */
export function UpdateCart(payload: any) {
  return {
    type: 'UPDATE_CART',
    payload
  }
}

/* DELETE PRODUCT IN CART */
export function DeleteCart(payload: any) {
  return {
    type: 'DELETE_CART',
    payload
  }
}

export function IncreaseQuantity(payload: any) {
  return {
    type: 'INCREASE_QUANTITY',
    payload
  }
}

export function DecreaseQuantity(payload: any) {
  return {
    type: 'DECREASE_QUANTITY',
    payload
  }
}

export function SaveOrder(payload: any) {
  return {
    type: 'SAVE_ORDER',
    payload
  }
}
export function deleteAllCart(payload: any) {
  return {
    type: DELETE_ALL_CART,
    payload
  }
}
export function deleteAllOrder(payload: any) {
  return {
    type: DELETE_ALL_ORDER,
    payload
  }
}
export function setCart(payload: any) {
  return {
    type: SET_CART,
    payload
  }
}