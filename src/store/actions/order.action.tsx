export const SET_ORDER = 'SET_ORDER'
export const SET_LIST_ORDER = 'SET_LIST_ORDER'
export const UPDATE_LIST_ORDER = 'UPDATE_LIST_ORDER'

export function setCurrentOrder(payload: any) {
  return {
    type: SET_ORDER,
    payload
  }
}

export function setListOrder(payload: any) {
  return {
    type: SET_LIST_ORDER,
    payload
  }
}

export function updateListOrder(payload: any) {
  return {
    type: UPDATE_LIST_ORDER,
    payload
  }
}
