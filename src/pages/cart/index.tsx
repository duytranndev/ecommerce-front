import axios from 'axios'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ProductInterface } from '../../interface/product.interface'
import { VOUCHER_URL } from '../../share/common/api/api-constants'
import { DecreaseQuantity, DeleteCart, IncreaseQuantity } from '../../store/actions/cart.action'
import { setDiscount } from '../../store/actions/discount.action'
import { AppState } from '../../store/types/'
import CheckoutCartItem from '../../ui/organisms/cart'
import { notifiError, notifiSuccess } from '../../untils/notification'
import './checkout.css'

export function Cart({ items, IncreaseQuantity, DecreaseQuantity, DeleteCart }: any): JSX.Element {
  let totalCart = 0
  let numberCart = 0

  const [CartFull, setCartFull] = useState<ProductInterface[]>([])
  const dispatch = useDispatch()
  const { discountPercent, discountCoded } = useSelector((state: any) => state.discount)
  const [discountCode, setDiscountCode] = useState<string>(discountCoded)
  const listProduct = useSelector<AppState, ProductInterface[]>((state) => state.product.data)

  useEffect(() => {
    if (items.Carts.length > 0) {
      let temp = listProduct.filter((item) => items.Carts.find(({ id }: any) => item.id === id))
      setCartFull(temp.map((item: any, index: number) => ({ ...item, quantity: items.Carts[index].quantity })))
    } else {
      setCartFull([])
    }
  }, [items])

  Object.keys(CartFull).forEach((item: any, index: number) => {
    numberCart = numberCart + CartFull[index].quantity!
    totalCart += CartFull[index].quantity! * CartFull[index].price!
  })

  function onChangeDiscount(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const { value } = e.target
    setDiscountCode(value)
  }
  function totalPrice(price: number, tonggia: number) {
    return Number(price * tonggia).toLocaleString('en-US')
  }

  async function onSubmitDiscount(){
    if(!discountCode){
      dispatch(setDiscount({percent:0 , code :''}))
      notifiError("ERROR","Hãy nhập mã giảm giá")
    }else {
      const voucher = (await axios.get(`${VOUCHER_URL}?code=${discountCode}`)).data.data[0]
            if(!voucher){
              dispatch(setDiscount({percent:0 , code :''}))
                notifiError("ERROR","Mã giảm giá không tồn tại")
            }else {
                dispatch(setDiscount({percent: voucher.percent.replace('%',''), code : discountCode}))
                notifiSuccess("SUCCESS","Sử dụng mã giảm giá thành công")
            }
    }
  }
  return (
    <div className='main-cart-content'>
      <div className='checkout-title-wrapper'>
        <div className='checkout-title-inner-wrapper'>
          <div className='checkout-title-border'>
            <div className='checkout-title-content'>
              <a href='' className='current'>
                Shopping Cart
              </a>
              <span className='divider-checkout'>
                <i className='fal fa-angle-right'></i>
              </span>
              <a href=''>Checkout Details</a>
              <span className='divider-checkout'>
                <i className='fal fa-angle-right'></i>
              </span>
              <a href=''>Order Complete</a>
            </div>
          </div>
        </div>
      </div>
      <div className='checkout-container'>
        <div className='checkout-wrap'>
          {CartFull.length > 0 && (
            <div className='checkout-content'>
              <div className='checkout-left-side'>
                <table className='checkout-product'>
                  <thead>
                    <tr>
                      <th className='product-name' colSpan={3}>
                        Sản Phẩm
                      </th>
                      <th className='product-price'>Giá</th>
                      <th className='product-quantity'>Số Lượng</th>
                      <th className='product-subtotal'>Tạm Tính</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CartFull?.map((item: ProductInterface, index: number) => {
                      return (
                        <CheckoutCartItem
                          key={index}
                          DeleteCart={() => DeleteCart(index)}
                          name={item.name}
                          image={item.image}
                          price={Number(item.price).toLocaleString('en-US')}
                          quantity={item.quantity}
                          TotalPrice={totalPrice(item.price!, item.quantity!)}
                          DecreaseQuantity={() => DecreaseQuantity(index)}
                          IncreaseQuantity={() => IncreaseQuantity(index)}
                        />
                      )
                    })}
                    <tr>
                      <td colSpan={6} className='checkout-action'>
                        <div className='continue-shopping'>
                          <Link className='button primary is-outline' to='/'>
                            ← Tiếp tục xem sản phẩm
                          </Link>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='checkout-right-side'>
                <div className='crs-content'>
                  <div className='crs-caculate-shipping'>
                    <table cellSpacing={0}>
                      <thead>
                        <tr>
                          <th className='product-name' colSpan={2} style={{ borderWidth: '3px' }}>
                            Cộng giỏ hàng
                          </th>
                        </tr>
                      </thead>
                    </table>
                    <table cellSpacing={0}>
                      <tbody>
                        <tr className='sub-total'>
                          <th>Tạm tính</th>
                          <td style={{ textAlign: 'right' }}>
                            <span className='amount'>
                              <bdi>
                                {Number(totalCart).toLocaleString('en-US')}
                                <span className='small-font'>đ</span>
                              </bdi>
                            </span>
                          </td>
                        </tr>
                        <tr className='sub-total'>
                          <th>Giảm giá</th>
                          <td style={{ textAlign: 'right' }}>
                            <span className='amount'>
                              <bdi>
                                -{Number(totalCart - totalCart * (1 - discountPercent / 100)).toLocaleString('en-US')}
                                <span className='small-font'>đ</span>
                              </bdi>
                            </span>
                          </td>
                        </tr>
                        <tr className='order-total'>
                          <th>Tổng</th>
                          <td style={{ textAlign: 'right' }}>
                            <span className='amount'>
                              <bdi>
                                {Number(totalCart * (1 - discountPercent / 100)).toLocaleString('en-US')}
                                <span className='small-font'>đ</span>
                              </bdi>
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className='proceed-checkout'>
                      <Link className='button proceed' to='/checkout'>
                        Tiến hành thanh toán
                      </Link>
                    </div>
                  </div>
                  <div className='coupon'>
                    <h3 className='widget-title'>
                      <i className='fas fa-tag'></i>Phiếu ưu đãi
                    </h3>
                    <input
                      type='text'
                      value={discountCode}
                      onChange={onChangeDiscount}
                      name='code'
                      className='input-text'
                      placeholder='Mã ưu đãi'></input>
                    <button onClick={onSubmitDiscount} className='is-form expand btn_submitDiscount' type='button'>
                      ÁP DỤNG
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {CartFull.length === 0 && <p className='emptyCart'>Chưa có sản phẩm trong giỏ hàng.</p>}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    items: state._todoProduct
  }
}

export default connect(mapStateToProps, { IncreaseQuantity, DecreaseQuantity, DeleteCart })(Cart)
