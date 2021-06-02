export const BASE_URL = 'http://18.141.237.78/api'

export const BASE_URL_2 = 'http://18.141.237.78/api'

//export type LIST_URL = '?parentID=' | '?parentId=' | '?categoryId=' | '/'

export const PRODUCT_URL = BASE_URL + '/product/'
export const PRODUCT_BY_ID = `/product`
export const PRODUCT_BY_PARENT_URL = BASE_URL + '/product?parentID='
export const PRODUCT_BY_CATEGORY_URL = BASE_URL + '/product?categoryId='
export const BRAND_URL = BASE_URL + '/brand'
export const BRAND_BY_PARENT_URL = BASE_URL + '/brand?categoryId=' /* sua o day*/
export const CART_URL = BASE_URL + '/cart/'
export const CATEGORY_URL = BASE_URL + '/category/'
export const NEWS_URL = BASE_URL + '/news?productId='
export const CART_BY_USER_URL = BASE_URL + '/cart?UserID='

export const COMMENT_URL = BASE_URL + '/comment?productId='
export const ORDER_URL = BASE_URL + '/order/'
export const AUTH_URL = BASE_URL + '/auth/'
export const USER_URL = BASE_URL + '/user/'

export const COMMENT_URL_BY_ID = BASE_URL_2 + '/comment?productId='
// export const COMMENT_URL = BASE_URL_2 + '/comment'
export const VOUCHER_URL = BASE_URL + '/voucher'
