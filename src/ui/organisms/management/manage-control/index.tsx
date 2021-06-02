import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import axios from 'axios'
import React, { memo, useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { ProductInterface } from '../../../../interface/product.interface'
import { CART_BY_USER_URL, CART_URL } from '../../../../share/common/api/api-constants'
import { setLogout } from '../../../../store/actions/auth.action'
import { deleteAllCart } from '../../../../store/actions/cart.action'
import { AppState } from '../../../../store/types'
import { notifiSuccess } from '../../../../untils/notification'
import './index.css'

type itemControl = {
  text?: string
  active?: boolean
  to: string
  handle?: any
}
function ManageControl({ items }: any): JSX.Element {
  const { user } = useSelector((state: any) => state.authUser)
  let location = useLocation()
  const dispatch = useDispatch()
  const [dashboard, setDashboard] = useState<itemControl[]>([])
  const [CartFull, setCartFull] = useState<ProductInterface[]>([])

  const userID = localStorage.getItem('userLogged')
  const [id, setID] = useState<any>([])
  const { confirm } = Modal
  const listProduct = useSelector<AppState, ProductInterface[]>((state) => state.product.data)

  useEffect(() => {
    axios.get(CART_BY_USER_URL + userID).then((res) => {
      setID(res.data.data[0]?.id)
    })
  }, [])

  useEffect(() => {
    if (items.Carts.length > 0) {
      let temp = listProduct.filter((item) => items.Carts.find(({ id }: any) => item.id === id))
      setCartFull(temp.map((item: any, index: number) => ({ ...item, quantity: items.Carts[index].quantity })))
    } else {
      setCartFull([])
    }
  }, [items])

  const controlPanel = [
    {
      text: 'TRANG TÀI KHOẢN',
      active: false,
      to: '/management'
    },
    {
      text: 'ĐƠN HÀNG',
      active: location.pathname.includes('/management/my-orders') ? true : false,
      to: '/management/my-orders'
    },
    {
      text: 'ĐỊA CHỈ',
      active: false,
      to: '/management/my-address'
    },
    {
      text: 'TÀI KHOẢN',
      active: false,
      to: '/management/my-account'
    },
    {
      text: 'WISHLIST',
      active: false,
      to: '/wishlist'
    },
    {
      text: 'THOÁT',
      active: false,
      to: '#',
      handle: (id: string, cart: ProductInterface[]) => {
        confirm({
          title: 'Đăng Xuất ?',
          icon: <ExclamationCircleOutlined />,
          content: 'Bạn có chắc chắn muốn đăng xuất ?',
          async onOk() {
            if (id) {
              await axios.patch(`${CART_URL}${id}`, {
                Cart: cart
              })
            } else {
              await axios.post(CART_URL, {
                Cart: cart,
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
    }
  ]
  useEffect(() => {
    let temp = controlPanel.map((item: itemControl) =>
      item.to === location.pathname ? { ...item, active: true } : item
    )
    setDashboard(temp)
  }, [location.pathname])
  return (
    <div className='account_control'>
      <div className='account_user'>
        <img
          className='account_user_img'
          src='https://secure.gravatar.com/avatar/0c3232ba03e4582fe4a8a14b91512cbd?s=70&d=mm&r=g'
        />
        <span className='account_user_name'>{user.name ? user.name : user.email}</span>
      </div>
      <ul className='account_list_menu'>
        {dashboard.map((control: itemControl) => (
          <React.Fragment key={control.to}>
            <li className={control.active ? 'account_list_item active' : 'account_list_item'}>
              {control.handle ? (
                <Link onClick={() => control.handle(id, CartFull)} className='account_list_link' to={control.to}>
                  {control.text}
                </Link>
              ) : (
                <Link className='account_list_link' to={control.to}>
                  {control.text}
                </Link>
              )}
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  )
}

const mapStateToProps = (state_: any) => {
  return {
    items: state_._todoProduct
  }
}

export default connect(mapStateToProps)(memo(ManageControl))
