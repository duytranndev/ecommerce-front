import axios from 'axios'
import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import NotFound from '../../pages/not-found'
import { USER_URL } from '../../share/common/api/api-constants'
import { setLogin, setUserInfo } from '../../store/actions/auth.action'
import ManageAccount from '../../ui/organisms/management/manage-account'
import ManageAddress from '../../ui/organisms/management/manage-address'
import ManageControl from '../../ui/organisms/management/manage-control'
import ManageOrders from '../../ui/organisms/management/manage-orders'
import { notifiError } from '../../untils/notification'
import './index.css'

function AccountManagement(props: any) {
  const { id } = useParams<{ id?: string }>()
  const history = useHistory()
  const dispatch = useDispatch()
  const { isLogged } = useSelector((state: any) => state.authUser)
  const ComponentView = [
    {
      url: 'my-orders',
      component: <ManageOrders />
    },
    {
      url: 'my-account',
      component: <ManageAccount />
    },
    {
      url: 'my-address',
      component: <ManageAddress />
    }
  ]
  useEffect(() => {
    const userLogged = localStorage.getItem('userLogged')
    if (userLogged) {
      dispatch(setLogin())
      axios
        .get(`${USER_URL}${userLogged}`)
        .then((res) => dispatch(setUserInfo(res.data.data)))
        .catch(() => notifiError('Error', 'Internal server error'))
    } else {
      notifiError('ERROR', 'Bạn chưa đăng nhập')
      history.push('/')
    }
  }, [isLogged])
  
  return (
    <>
      {!isLogged ? (
        <></>
      ) : (
        <div className='account_page'>
          {ComponentView.every((i, index) => {
            return id !== i.url && id !== undefined
          }) ? (
            <NotFound />
          ) : (
            <div className='account'>
              <div className='account_header'>
                <div className='account_header_wrap'>
                  <h3 className='account_heading'>MY ACCOUNT</h3>
                  <span className='account_label'>QUẢN LÝ TÀI KHOẢN</span>
                </div>
              </div>
              <div className='account_content'>
                <ManageControl />
                <div className='detail-manage'>
                  {!id && (
                    <span className='detail-manage_label'>
                      Từ trang quản lý tài khoản bạn có thể xem các đơn hàng, quản lý địa chỉ giao hàng, sửa mật khẩu và
                      thông tin của tài khoản.
                    </span>
                  )}
                  {ComponentView.map((i, index) =>
                    i.url === id ? <React.Fragment key={index}> {i.component} </React.Fragment> : null
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default memo(AccountManagement)
