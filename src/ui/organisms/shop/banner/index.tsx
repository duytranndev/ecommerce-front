import React, { useState } from 'react'
import { ButtonAdd } from '../../../../common/buttonAction'
import { ComponentAddToCart } from '../../../../common/buttonAddCart'
import { ImageView } from '../../../../common/image'
import formatMoney from '../../../../handle/formatMoney'
import { ProductInterface } from '../../../../interface/product.interface'
import { ADD_CART_COUNT } from '../../../../store/actions/cart.action'
import '../banner/css/banner-product.css'

type BannerAdddataProps = {
  data?: ProductInterface
}

export default function BannerAddProduct({ data }: BannerAdddataProps) {
  const [count, setCount] = useState<number>(0)

  const handleFormData = (value?: number) => {
    setCount(value as number)
  }
  return (
    <div className='container-fluid banner-add'>
      <div className='container content'>
        <div className='block block-image'>
          <ImageView srcUrl={data?.image} className='img-data' />
        </div>
        <div className='block block-name'>{data?.name}</div>
        <div className='block block-price'>{formatMoney(data?.price as number)}</div>
        <div className='block block-point'>
          <p>Bạn sẽ có {data?.point} khi mua sản phẩm này</p>
        </div>
        <div className='block block-buttons'>
          <ComponentAddToCart onChange={handleFormData}>
            <ButtonAdd data={data} count={count} action={ADD_CART_COUNT} />
          </ComponentAddToCart>
        </div>
      </div>
    </div>
  )
}
