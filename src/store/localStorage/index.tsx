export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('Carts')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (error) {
    return undefined
  }
}

export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('Carts', serializedState)
  } catch (error) {
    return undefined
  }
}
