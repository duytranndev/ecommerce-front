import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import './index.css'

export function OrderComplete() {
  const order = useSelector((state: any) => state._todoProduct.Order)
  return (
    <React.Fragment>
      {order?.products?.length > 0 ? (
        <div className='main-cart-content'>
          <div className='checkout-title-wrapper'>
            <div className='checkout-title-inner-wrapper'>
              <div className='checkout-title-border'>
                <div className='checkout-title-content'>
                  <a href='' className='not-active'>
                    Shopping Cart
                  </a>
                  <span className='divider-checkout'>
                    <i className='fal fa-angle-right'></i>
                  </span>
                  <a href='' className='not-active'>
                    Checkout Details
                  </a>
                  <span className='divider-checkout'>
                    <i className='fal fa-angle-right'></i>
                  </span>
                  <a href='' className='current not-active'>
                    Order Complete
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className='checkout-container'>
            <div className='checkout-wrap'>
              <div className='checkout-content'>
                <div className='checkout-left-side'>
                  <p style={{ marginBottom: '1.3em' }}>Thanh toán khi nhận hàng</p>
                  <section className='order-detail'>
                    <h2>Chi tiết đơn hàng</h2>
                    <table className='order-table'>
                      <thead>
                        <tr>
                          <th className='product-name'>Sản phẩm</th>
                          <th className='product-total text-right'>Tổng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.products.map((item: any, index: number) => {
                          return (
                            <tr className='order-item'>
                              <td className='product-name'>
                                <a href=''>{item.name}</a>
                                <strong className='product-quantity'>&nbsp;x&nbsp;{item.quantity}</strong>
                              </td>
                              <td className='product-total text-right'>
                                <span className='amount'>
                                  <bdi>
                                    {Number(item.quantity * item.price).toLocaleString('en-US')}
                                    <span className='small-font'>₫</span>
                                  </bdi>
                                </span>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th scope='row'>Tổng số phụ:</th>
                          <td className='product-total text-right'>
                            <span className='amount'>
                              <bdi>
                                {Number(order.total.temporary).toLocaleString('en-US')}
                                <span className='small-font'>₫</span>
                              </bdi>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <th scope='row'>Phương thức thanh toán:</th>
                          <td className='product-total text-right'>
                            {order.customer.type === 'cod' ? 'COD' : 'Chuyển Khoản'}
                          </td>
                        </tr>
                        <tr>
                          <th scope='row'>Giảm giá:</th>
                          <td className='product-total text-right'>
                            <span className='amount'>
                              <bdi>
                                {Number(order.discount).toLocaleString('en-US')}
                                <span className='small-font'>₫</span>
                              </bdi>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <th scope='row'>Tổng cộng:</th>
                          <td className='product-total text-right'>
                            <span className='amount'>
                              <bdi>
                                {Number(order.total.reality).toLocaleString('en-US')}
                                <span className='small-font'>₫</span>
                              </bdi>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <th>Lưu ý:</th>
                          <td className='product-total text-right'>{order.customer.description}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </section>
                </div>
                <div className='checkout-right-side'>
                  <div className='col-inner entry-content'>
                    <p className='order-succesful-receive'>
                      <strong>Cảm ơn bạn, Đơn hàng của bạn đã được nhận.</strong>
                    </p>
                    <ul className='succesful-order-detail'>
                      <li className='order'>
                        Mã đơn hàng: <strong>{order.code}</strong>
                      </li>
                      <li className='date'>
                        Ngày: <strong>{new Date().toLocaleString('en-US')}</strong>
                      </li>
                      <li className='total'>
                        Tổng cộng:
                        <span className='amount'>
                          <bdi>
                            {Number(order.total.reality).toLocaleString('en-US')}
                            <span className='small-font'>₫</span>
                          </bdi>
                        </span>
                      </li>
                      <li className='method'>
                        Phương thức thanh toán:{' '}
                        <strong>{order.customer.type === 'cod' ? 'COD' : 'Chuyển Khoản'}</strong>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Redirect to='/' />
      )}
    </React.Fragment>
  )
}

export default OrderComplete
