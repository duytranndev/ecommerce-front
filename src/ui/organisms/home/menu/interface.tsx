export interface MenuInterface {
  id?: string
  status?: string
  name?: string
  slug?: string
  subMenus?: MenuInterface[]
  tag?: string
  parentId?: string
  isShow?: boolean
  isShowHome?: boolean
  path?: string
}
