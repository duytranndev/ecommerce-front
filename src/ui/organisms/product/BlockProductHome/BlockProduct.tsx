import React, { memo } from 'react'
import '../../../../components/ProductSmall/ProductSmall.css'
import { MenuInterface } from '../../home/menu/interface'
import GetBrandByParent from '../GetBrand/GetBrand'
import GetProductByParent from '../GetProduct/GetProduct'

type TitleProps = {
  data: MenuInterface
  className?: string
}
const BlockProductHome = memo(
  ({ data, className }: TitleProps) => {
    return (
      <div className={className}>
        <div className='title'>
          <i className='fas fa-shopping-basket'></i>
          <a href=''>
            <h2 className='parent'>{data.name}</h2>
          </a>
          {data.subMenus?.map((item) => {
            if (item.isShow === true) {
              return (
                <a href='' key={item.id}>
                  <h2>{item.name}</h2>
                </a>
              )
            }
          })}
        </div>
        <div className='logo'>
          <GetBrandByParent categoryId={data.id} />
        </div>
        <div className='product'>
          <GetProductByParent key={data.id} parentId={data.id} />
        </div>
      </div>
    )
  },
  (p, n) => p === n
)

export default BlockProductHome
