import { ProductInterface } from '../../../../../interface/product.interface'
export async function fetchData(keyword = '', array: ProductInterface[] = []) {
  return await array.filter((item: any) => inItemName(keyword, item.name) === true)
}

function inItemName(subString: string, item: string) {
  let array = subString.split(' ')
  let i = array.length
  while (i--) {
    if (!removeAccents(item.toUpperCase()).includes(removeAccents(array[i].toUpperCase()))) {
      return false
    }
  }
  return true
}

// Convert Unicode to Normal
function removeAccents(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
}
