export interface ProductInterface {
  id?: string
  status?: string
  name?: string
  image?: string
  price?: number
  parentID?: string
  inStock?: boolean
  category?: string
  description?: ProductInterface
  amount?: number
  point?: string
  subDescribes?: ProductInterface[]
  quantity?: number
  address?: string
  title?: string
  other?: string
  tag?: string
  subImages?: ProductInterface[]
  insertTime?: string
  updateTime?: string
  species?: string
  isShow?: boolean
  categoryId?: string
  isEvent?: boolean
}
