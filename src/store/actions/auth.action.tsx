export const SET_USER_INFO = 'SET_USER_INFO'
export const SET_LOGIN = 'SET_LOGIN'
export const SET_LOGOUT = 'SET_LOGOUT'
export const CHANGE_CART = 'CHANGE_CART'
export const UPDATE_USER = 'UPDATE_USER'

export function setUserInfo(payload: any) {
  return {
    type: SET_USER_INFO,
    payload
  }
}

export function setLogin() {
  return {
    type: SET_LOGIN
  }
}

export function setLogout() {
  return {
    type: SET_LOGOUT
  }
}

export function changeCart(payload: any) {
  return {
    type: CHANGE_CART,
    payload
  }
}

export function updateUser(payload: any) {
  return {
    type: UPDATE_USER,
    payload
  }
}
