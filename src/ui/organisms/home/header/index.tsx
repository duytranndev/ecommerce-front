import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Modal, notification } from 'antd'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ProductInterface } from '../../../../interface/product.interface'
import { CART_BY_USER_URL, CART_URL } from '../../../../share/common/api/api-constants'
import { setLogout } from '../../../../store/actions/auth.action'
import { deleteAllCart, DeleteCart, UpdateCart } from '../../../../store/actions/cart.action'
import { AppState } from '../../../../store/types'
import Login from '../../login/index'
import MiniCartItem from './cp-mini_cart_item'
import Search from './cp-search'
import './css/cart-dropdown.css'
import './css/cart-icon-animation.css'
import './css/header1.css'

const notifiSuccess = (title: string, content: string) => {
  notification.config({
    duration: 2
  })
  notification['success']({
    message: title,
    description: content
  })
}

export function Header({ items, DeleteCart }: any): JSX.Element {
  let totalCart = 0
  let numberCart = 0

  const [CartFull, setCartFull] = useState<ProductInterface[]>([])
  const [id, setID] = useState<any>([])
  const [isShow, setShow] = useState(false)
  const dataRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  const { isLogged } = useSelector((state: any) => state.authUser)
  const userID = localStorage.getItem('userLogged')
  const log = localStorage.getItem('load')
  const [cartAPI, setCartAPI] = useState<any>([])
  const { confirm } = Modal
  const listProduct = useSelector<AppState, ProductInterface[]>((state) => state.product.data)

  useEffect(() => {
    axios.get(CART_BY_USER_URL + userID).then((res) => {
      setCartAPI(res.data.data)
      setID(res.data.data)
    })
  }, [isLogged])

  useEffect(() => {
    if (cartAPI[0] && log === '') {
      let a = cartAPI[0]?.Cart.map((item: any) => ({ id: item?.id, quantity: item?.quantity }))
      dispatch(UpdateCart(a))
    }
    localStorage.setItem('load', 'loaded')
  }, [cartAPI])

  useEffect(() => {
    if (items.Carts.length > 0) {
      let temp = listProduct.filter((item) => items.Carts.find(({ id }: any) => item.id === id))
      setCartFull(temp.map((item: any, index: number) => ({ ...item, quantity: items.Carts[index].quantity })))
    } else {
      setCartFull([])
    }
  }, [items])

  Object.keys(CartFull).forEach((item: any, index: number) => {
    numberCart = numberCart + CartFull[item].quantity!
    totalCart += CartFull[item].quantity! * CartFull[item].price!
  })

  const Showdiv = () => {
    setShow(true)
  }

  const handleClick = () => {
    setShow(false)
  }

  const handleLogout = () => {
    confirm({
      title: 'Đăng Xuất ?',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc chắn muốn đăng xuất ?',
      onOk() {
        if (id[0]?.id) {
          axios.patch(CART_URL + id[0]?.id, {
            Cart: CartFull,
            UserID: userID
          })
        } else {
          axios.post(CART_URL, {
            Cart: CartFull,
            UserID: userID
          })
        }
        localStorage.removeItem('userLogged')
        dispatch(setLogout())
        dispatch(deleteAllCart([]))
        notifiSuccess('Success', 'Đăng xuất thành công!')
      }
    })
  }

  const onBlur = (): void => {
    if (dataRef.current != null) {
      setTimeout(() => {
        dataRef.current!.style.display = 'none'
      }, 100)
    }
  }

  const onDisplay = () => {
    if (dataRef.current) {
      setTimeout(() => {
        dataRef.current!.style.display = 'block'
      }, 100)
    }
  }

  // console.log(userLogin)

  return (
    <div className='header'>
      <div className='header-inner'>
        <div id='logo'>
          <Link to='/'>
            <img src='https://thucphamplaza.com/tpplaza_content/uploads/products_img/logo16-1.png' alt=''></img>
          </Link>
        </div>
        <Search />
        <div className='wrap-action'>
          <div id='action'>
            {isLogged ? (
              <div className='login has-dropdown' onMouseOver={onDisplay}>
                <a className='link-login-cart'>
                  <span>TÀI KHOẢN</span>
                </a>
                <div className='login-dropdownnn dropdown-default' ref={dataRef}>
                  <div className='wrap-dropdown-content'>
                    <div className='wrap-dropdown-cart-content'>
                      <div className='item'>
                        <Link to='/management' onClick={onBlur}>
                          Trang tài khoản
                        </Link>
                      </div>
                      <div className='item'>
                        <Link to='/management/my-orders' onClick={onBlur}>
                          Đơn hàng
                        </Link>
                      </div>
                      <div className='item'>
                        <Link to='/management/my-address' onClick={onBlur}>
                          Địa chỉ
                        </Link>
                      </div>
                      <div className='item'>
                        <Link to='/management/my-account' onClick={onBlur}>
                          Tài Khoản
                        </Link>
                      </div>
                      <div className='item'>
                        <Link to='/wishlist' onClick={onBlur}>
                          Wishlist
                        </Link>
                      </div>
                      <div className='item'>
                        <Link to='#' onClick={handleLogout}>
                          Thoát
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className='login' onClick={Showdiv}>
                <a className='link-login-cart'>
                  <span>ĐĂNG NHẬP</span>
                </a>
                {isShow ? <Login parentCallback={handleClick} style={{ opacity: '1' }}></Login> : null}
              </div>
            )}
            <div className='divider'></div>
            <div className='cart has-dropdown'>
              <a className='link-login-cart' href='#'>
                <span>
                  GIỎ HÀNG /
                  <span className='amount'>
                    <bdi>
                      {Number(totalCart).toLocaleString('en-US')}
                      <span className='small-font'>₫</span>
                    </bdi>
                  </span>
                </span>
                <span className='cart-icon image-icon'>
                  <strong>{numberCart}</strong>
                </span>
              </a>
              <div className='dropdownnn dropdown-default'>
                <div className='wrap-dropdown-content'>
                  {CartFull.length > 0 && (
                    <div className='wrap-dropdown-cart-content'>
                      <div className='cart-list-item'>
                        {CartFull.map((item: any, index: any) => (
                          <MiniCartItem
                            key={index}
                            reMove={() => DeleteCart(index)}
                            name={item.name}
                            image={item.image}
                            amount={item.quantity}
                            price={Number(item.price).toLocaleString('en-US')}
                          />
                        ))}
                      </div>
                      <div className='cart-dropdown-price'>
                        <p className='total-price'>
                          <strong>Tổng số phụ: </strong>
                          <span className='amount'>
                            <bdi>
                              {Number(totalCart).toLocaleString('en-US')}
                              <span className=''>₫</span>
                            </bdi>
                          </span>
                        </p>
                      </div>
                      <div className='cart-dropdown-button'>
                        <Link to='/cart' className='button cart-detail'>
                          Xem giỏ hàng
                        </Link>
                        <Link to='/checkout' className='button checkout'>
                          Thanh toán
                        </Link>
                      </div>
                    </div>
                  )}
                  {CartFull.length === 0 && <p className='emptyCart'>Chưa có sản phẩm trong giỏ hàng.</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state_: any) => {
  return {
    items: state_._todoProduct
  }
}

export default connect(mapStateToProps, { DeleteCart })(Header)
