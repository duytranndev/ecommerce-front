import { Action } from 'redux'
import { BrandInterface } from '../../interface/brand.interface'
import { CommentInterface } from '../../interface/comment.interface'
import { ProductInterface } from '../../interface/product.interface'
import { UserInterface } from '../../interface/user.interface'
import { MenuInterface } from '../../ui/organisms/home/menu/interface'

export interface AppState {
  product: ProductState
  oneProduct: OneProductState
  cart: CartState
  comment: CommentState
  auth: AuthState
  category: CategoryState
  brand: BrandState
}
export interface ProductState {
  data: ProductInterface[]
}
export interface CommentState {
  list: CommentInterface[]
}
export interface CartState {
  list?: ProductInterface[]
  detail?: ProductInterface
}

export interface CategoryState {
  list: MenuInterface[]
}
export interface BrandState {
  list: BrandInterface[]
}
export interface OneProductState {
  data?: ProductInterface
}
export interface OneProductState {
  data?: ProductInterface
}

export interface AuthState {
  user: UserInterface
  isLogger: boolean
}

export interface AppAction extends Action {
  payload?: any
  elemRef?: React.RefObject<HTMLElement>
}
