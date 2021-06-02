import React, { memo, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import * as moment from 'moment'

import { ORDER_URL, USER_URL } from '../../../../share/common/api/api-constants'
import { setLogin, setUserInfo } from '../../../../store/actions/auth.action'
import ManagaControl from '../manage-control'
import { setCurrentOrder } from '../../../../store/actions/order.action'
import { notifiError } from '../../../../untils/notification'
import formatMoney from '../../../../handle/formatMoney'

import './index.css'

function OrderDetail() {
  const { id } = useParams<{ id?: string }>()
  const order = useSelector((state: any) => state.order.Order)
  const { isLogged } = useSelector((state: any) => state.authUser)
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (!order) {
      setLoading(true)
      axios
        .get(`${ORDER_URL}?code=${id}`)
        .then((res) => dispatch(setCurrentOrder(res.data.data[0])))
        .then(() => setLoading(false))
        .catch((err) => notifiError('Error', err))
    }
  }, [order])

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
          <div className='account'>
            <div className='account_header'>
              <div className='account_header_wrap'>
                <h3 className='account_heading'>MY ACCOUNT</h3>
                <span className='account_label'>ĐỊA CHỈ</span>
              </div>
            </div>
            <div className='account_content'>
              <ManagaControl />
              {!loading ? (
                <>
                  {order ? (
                    <div className='order-detail'>
                      <span className='order-detail_title'>
                        Đơn hàng <span>#{order.code}</span> đã được khởi tạo ngày{' '}
                        <span>{moment.default(order.insertTime).format('DD/MM/YYYY')}</span>.
                      </span>
                      <div className='order-detail_content'>
                        <h2 className='order-detail_heading'>Chi Tiết Đơn Hàng</h2>
                        <table className='order-detail_table'>
                          <thead>
                            <tr className='order-detail_tr tr-in-tbody'>
                              <th className='order-detail_th'>
                                <span>SẢN PHẨM</span>
                              </th>
                              <th className='order-detail_th'>
                                <span>TỔNG</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.products.map((product: any) => (
                              <React.Fragment key={product.id}>
                                <tr className='order-detail_tr tr-in-tbody'>
                                  <td className='order-detail_td'>
                                    {product.name} × {product.quantity}
                                  </td>
                                  <td className='order-detail_td'>{formatMoney(product.price * product.quantity)}</td>
                                </tr>
                              </React.Fragment>
                            ))}
                            <tr className='order-detail_tr tr-in-tbody'>
                              <td className='order-detail_td td-default'>Tổng số phụ</td>
                              <td className='order-detail_td'>
                                {formatMoney(
                                  order.products.reduce((sum: number, value: any) => {
                                    return sum + value.price * value.quantity
                                  }, 0)
                                )}
                              </td>
                            </tr>
                            <tr className='order-detail_tr tr-in-tbody'>
                              <td className='order-detail_td td-default'>Discount</td>
                              <td className='order-detail_td'>-{formatMoney(order.discount)}</td>
                            </tr>
                            <tr className='order-detail_tr tr-in-tbody'>
                              <td className='order-detail_td td-default'>Phương thức thanh toán</td>
                              <td className='order-detail_td'>{order.customer.type}</td>
                            </tr>
                            <tr className='order-detail_tr tr-in-tbody'>
                              <td className='order-detail_td td-default'>Tổng cộng</td>
                              <td className='order-detail_td'>{formatMoney(order.total.reality)}</td>
                            </tr>
                            <tr className='order-detail_tr tr-in-tbody'>
                              <td className='order-detail_td td-default'>Lưu ý</td>
                              <td className='order-detail_td'>{order.customer.description}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className='order-detail_delivery'>
                        <h2 className='order-detail_heading'>Thông Tin Nhận Hàng</h2>
                        <div className='order-detail_delivery-wrap'>
                          <span className='order-detail_delivery-name'>Người Nhận Hàng</span>
                          {order.customer.name}
                        </div>
                        <div className='order-detail_delivery-wrap'>
                          <span className='order-detail_delivery-address'>Địa Chỉ</span>
                          {order.customer.address}
                        </div>
                        <div className='order-detail_delivery-wrap'>
                          <span className='order-detail_delivery-phone'>Số Điện Thoại</span>
                          {order.customer.phone}
                        </div>
                        <div className='order-detail_delivery-wrap'>
                          <span className='order-detail_delivery-email'>Email</span>
                          {order.customer.email}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <span className='order-detail_title'>Đơn hàng không tồn tại</span>
                  )}
                </>
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default memo(OrderDetail)
