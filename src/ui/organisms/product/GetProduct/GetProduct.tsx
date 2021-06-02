import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ProductInterface } from '../../../../interface/product.interface'
import { AppState } from '../../../../store/types'
import Product from '../Product/Product'
import './index.css'

type Props = {
  parentId?: string | undefined
}

export default function GetProductByParent({ parentId }: Props) {
  const [product, setProduct] = useState<ProductInterface[]>([])
  const listProduct = useSelector<AppState, ProductInterface[]>((state) => state.product.data)

  useEffect(() => {
    let value = listProduct.filter((item) => item.categoryId === parentId)
    setProduct(value)
  }, [listProduct, parentId])

  return (
    <>
      {product &&
        product?.map((item, index) => {
          if (item.isShow === true) {
            return (
              <div key={item.id} className='animated animatedFadeInUp fadeInUp' style={{ width: '16.6%' }}>
                <Product data={item} />
              </div>
            )
          }
        })}
    </>
  )
}
