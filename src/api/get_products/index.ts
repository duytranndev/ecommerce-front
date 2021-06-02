import axios from 'axios'

const fetchData = async () => {
  const result = await axios('http://ec2-18-140-248-159.ap-southeast-1.compute.amazonaws.com/api/product')
  return result
}

export async function fetchListProduct() {
  const result = await axios('http://ec2-18-140-248-159.ap-southeast-1.compute.amazonaws.com/api/product')
  return result
}

export async function fetchListMenu() {
  try {
    const requestUrl = 'http://ec2-18-140-248-159.ap-southeast-1.compute.amazonaws.com/api/category'
    const response = await axios(requestUrl)
    return response
  } catch (error) {
    console.log('Failue in Api fetchListMenu: ' + error)
  }
}

export async function getAPIGlobal(baseURL: string | any, ...params: (string | undefined | any)[]) {
  try {
    const requestUrl = `${baseURL}${params}`
    const response = await axios(requestUrl)
    return response
  } catch (error) {
    console.log(`Failue in Api ${baseURL}/${params}`)
  }
}

export default fetchData
