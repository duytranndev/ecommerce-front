import axios from 'axios'
import * as moment from 'moment'
import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import formatMoney from '../../../../handle/formatMoney'
import { setCurrentOrder } from '../../../../store/actions/order.action'
import './index.css'

function ManageOrders() {
  const { user } = useSelector((state: any) => state.authUser)
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    const userId = user.id
    setLoading(true)
    axios
      .get(`http://18.141.237.78/api/order?userId=${userId}`)
      .then((res) => setOrders(res.data.data))
      .then(() => setLoading(false))
  }, [user])

  const dispatch = useDispatch()
  const viewOrder = (order: any): void => {
    dispatch(setCurrentOrder(order))
  }

  return (
    <div className='manage-orders'>
      {!loading ? (
        <>
          {orders.length > 0 && (
            <table className='manage-orders_table'>
              <thead>
                <tr className='manage-orders_row'>
                  <th className='manage-orders_th'>
                    <span>ĐƠN HÀNG</span>
                  </th>
                  <th className='manage-orders_th'>
                    <span>NGÀY</span>
                  </th>
                  <th className='manage-orders_th'>
                    <span>TÌNH TRẠNG</span>
                  </th>
                  <th className='manage-orders_th'>
                    <span>TỔNG</span>
                  </th>
                  <th className='manage-orders_th text-center'>
                    <span>CHI TIẾT</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <React.Fragment key={order.id}>
                    <tr className='manage-orders_row tr-in-tbody'>
                      <td className='manage-orders_td'>#{order.code}</td>
                      <td className='manage-orders_td'>{moment.default(order.insertTime).format('DD/MM/YYYY')}</td>
                      <td className='manage-orders_td'>{order.status}</td>
                      <td className='manage-orders_td limit'>
                        {formatMoney(order.total.reality)} cho {order.products.length} mục
                      </td>
                      <td className='manage-orders_td text-center'>
                        <Link
                          onClick={() => viewOrder(order)}
                          className={orders.length >= 5 ? 'btn_view-detail adjust' : 'btn_view-detail'}
                          to={`/management/my-orders/${order.code}`}>
                          XEM
                        </Link>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}
          {orders.length === 0 && <span className='manage-orders_label'>Bạn chưa có đơn hàng nào.</span>}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}
export default memo(ManageOrders)
