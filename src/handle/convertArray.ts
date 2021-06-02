import { MenuInterface } from '../ui/organisms/home/menu/interface'

export function convertMenu(areaArr: MenuInterface[]) {
  return areaArr?.filter((a) => {
    if (!a.parentId) {
      a.subMenus = areaArr.filter((d) => d.parentId === a.id && d.isShow === true)
      if (a.subMenus) {
        a.subMenus.map((subMenus) => {
          const ss = areaArr.filter((p) => p.parentId === subMenus.id) //** */
          if (ss.length > 0) subMenus.subMenus = ss
          return subMenus
        })
      }
      return a
    }
  })
}
export function convertListTitle(areaArr: MenuInterface[]) {
  return areaArr?.filter((a) => {
    if (!a.parentId) {
      a.subMenus = areaArr.filter((d) => d.parentId === a.id)
      if (a.subMenus) {
        a.subMenus?.map((subMenus) => {
          const ss = areaArr.filter((p) => p.parentId === subMenus.id)
          if (ss.length > 0) subMenus.subMenus = ss
          return subMenus
        })
      }
      return a
    }
  })
}
