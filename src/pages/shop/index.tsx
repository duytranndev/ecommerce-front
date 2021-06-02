import React, { memo } from 'react'
import { ProductInterface } from '../../interface/product.interface'
import DescribeProduct from '../../ui/organisms/shop/describe-product'
import { DetailProduct } from '../../ui/organisms/shop/detail-product'

type ShopProps = {
  product: ProductInterface | undefined
}

export const Shop = memo(
  ({ product }: ShopProps): JSX.Element => {
    return (
      <>
        <DetailProduct dataProduct={product} />
        <DescribeProduct data={product} />
      </>
    )
  },
  (p, n) => {
    return p === n ? true : false
  }
)
