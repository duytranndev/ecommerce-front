import { HeartFilled, ShoppingCartOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { ImageView } from '../../../../common/image'
import { notifiSuccess } from '../../../../common/notification'
import formatMoney from '../../../../handle/formatMoney'
import { ProductInterface } from '../../../../interface/product.interface'

type ProductProps = {
  data: ProductInterface
}

const localStorageKey: string = 'Wishlist'
let itemLike: string[] = []
export default function Product({ data }: ProductProps) {
  itemLike = localStorage.getItem(localStorageKey) ? JSON.parse(localStorage.getItem(localStorageKey) as string) : []

  const addToWishlist = (item: string, callback: any): any => {
    itemLike.push(item)
    localStorage.setItem(localStorageKey, JSON.stringify(itemLike))
    callback()
  }
  const [isLike, setLike] = useState(false)
  const changeLike = (): any => {
    setLike(true)
  }

  const dispatch = useDispatch()

  let check: boolean = itemLike.some((item) => item === data.id)

  return (
    <div className='product_small'>
      <div className='product_small-img'>
        <Link to={`/products/detail/${data?.id}`} onClick={() => localStorage.removeItem('filter')}>
          <ImageView srcUrl={data.image} />
        </Link>
      </div>
      <div className='product_small-text'>
        <Link to={`/products/detail/${data?.id}`} onClick={() => localStorage.removeItem('filter')}>
          {data.name}
        </Link>
        <span className='product_small-price'>{formatMoney(data.price as number)}</span>
      </div>
      <div className='product_small-like'>
        {check ? (
          <>
            <HeartFilled />
            <Link to='/wishlist' className='product_small-desciption'>
              <span>Browse Wishlist</span>
            </Link>
          </>
        ) : (
          <>
            <HeartFilled onClick={() => addToWishlist(data.id as string, changeLike)} />
            <div className='product_small-desciption'>
              <span>Add to Wishlist</span>
            </div>
          </>
        )}
      </div>
      <div className='product_small-cart'>
        <ShoppingCartOutlined
          className='icon-shop'
          onClick={() => dispatch({ payload: data, type: 'ADD_CART_COUNT', amount: 1 })}
          onMouseUp={() => notifiSuccess('Success', 'Product add to cart success')}
        />
        <div className='product_small-desciption'>
          <span>Add to Cart</span>
        </div>
      </div>
    </div>
  )
}
