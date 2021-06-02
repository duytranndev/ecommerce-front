export const SET_TOKEN = 'SET_TOKEN'

export function setToken(payload: any) {
    return {
        type: SET_TOKEN,
        payload
    }
}
