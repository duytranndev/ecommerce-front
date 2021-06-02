import axios from 'axios'
import React, { memo, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import ProductLike from '../../components/ProductLike/ProductLike'
import { PRODUCT_URL } from '../../share/common/api/api-constants'
import { AddCart } from '../../store/actions/cart.action'
import { notifiSuccess } from '../../untils/notification'
import './index.css'

const localStorageKey: string = 'Wishlist'
const localStorageListName: string = 'titleList'

function WishList(): JSX.Element {
  const inputRefTitle = useRef<HTMLInputElement>(null)

  const [wishList, setWishList] = useState<string[]>([])
  const [activeInput, setActiveInput] = useState<Boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [productList, setProductList] = useState<any>([])
  // TEST CART WITH REDUX
  const dispatch = useDispatch()

  useEffect(() => {
    let listLocal = localStorage.getItem(localStorageKey)
      ? JSON.parse(localStorage.getItem(localStorageKey) as string)
      : []
    let titleList = localStorage.getItem(localStorageListName)
      ? JSON.parse(localStorage.getItem(localStorageListName) as string)
      : 'My wishlist on Thực Phẩm Plaza.'
    setWishList(listLocal)
    setTitle(titleList)
    // TEST CART WITH REDUX
  }, [])

  useEffect(() => {
    let listLocal = localStorage.getItem(localStorageKey)
      ? JSON.parse(localStorage.getItem(localStorageKey) as string)
      : []
    let titleList = localStorage.getItem(localStorageListName)
      ? JSON.parse(localStorage.getItem(localStorageListName) as string)
      : 'My wishlist on Thực Phẩm Plaza.'
    setWishList(listLocal)
    setTitle(titleList)
  }, [])
  // TEST CART WITH REDUX
  useEffect(() => {
    if (wishList.length > 0) {
      const queries: any = wishList.map((wl) => axios.get(PRODUCT_URL + wl))
      Promise.all(queries).then((res) => setProductList(res.map((s: any) => s.data.data)))
    } else {
      setProductList([])
    }
  }, [wishList])

  const updateTitle = (e: any): void => {
    localStorage.setItem(localStorageListName, JSON.stringify(inputRefTitle.current?.value))
    setTitle(inputRefTitle.current?.value || '')
    setActiveInput(false)
  }
  const holdPreTitle = (e: any): void => {
    setActiveInput(false)
  }
  const removeProduct = (item: any): any => {
    return () => {
      let temp = [...wishList]
      let index = temp.indexOf(item)
      temp.splice(index, 1)
      localStorage.setItem(localStorageKey, JSON.stringify(temp))
      setWishList(temp)
      notifiSuccess('Success', 'Product successfully removed')
    }
  }

  return (
    <div className='wishlist_page'>
      <div className='wish_list'>
        {!activeInput ? (
          <h2 onClick={() => setActiveInput(true)} className='wish_list-heading'>
            {title}
          </h2>
        ) : (
          <>
            <input ref={inputRefTitle} className='wish_list-input' type='text' defaultValue={title} />
            <div className='wish_list-action'>
              <button onClick={updateTitle} className='wish_list-btn'>
                SAVE
              </button>
              <button onClick={holdPreTitle} className='wish_list-btn'>
                CANCEL
              </button>
            </div>
          </>
        )}
        <div className='wish_list-content'>
          <div className='wish_list-content-heading'>
            <span className='wish_list-content-title wish_list-content-title--name'>PRODUCT NAME</span>
            <span className='wish_list-content-title wish_list-content-title--price'>UNIT PRICE</span>
            <span className='wish_list-content-title wish_list-content-title--stock'>STOCK STATUS</span>
          </div>
        </div>
        {productList.length > 0 &&
          productList.map((item: any, index: number) => (
            <ProductLike
              key={index}
              onAddedCart={() => notifiSuccess('Success', 'Product add to cart')}
              onAddToCart={() => dispatch(AddCart(item))}
              onClickRemove={removeProduct(item.id)}
              image={item.image}
              stock={item.inStock}
              name={item.name}
              price={item.price}
              id={item.id}
            />
          ))}
        {wishList.length === 0 && <h1 className='wish_list-no-product'>No products added to the wishlist</h1>}
      </div>
    </div>
  )
}

export default memo(WishList)
