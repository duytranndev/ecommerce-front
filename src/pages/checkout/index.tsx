import { ExclamationCircleOutlined, RightOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import axios from 'axios'
import React, { ChangeEvent, memo, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useHistory } from 'react-router-dom'
import ShortUniqueId from 'short-unique-id'
import CheckoutLogin from '../../components/CheckoutLogin'
import Discount from '../../components/Discount'
import formatMoney from '../../handle/formatMoney'
import { ORDER_URL, PRODUCT_URL } from '../../share/common/api/api-constants'
import { deleteAllCart, SaveOrder } from '../../store/actions/cart.action'
import { setDiscount } from '../../store/actions/discount.action'
import { updateListOrder } from '../../store/actions/order.action'
import { notifiSuccess } from '../../untils/notification'
import './index.css'

type DataPay = {
  name: string
  address: string
  phone: string
  email: string
  newPass: string
  description: string
  type: 'cod' | 'transfer'
  errors: { [key: string]: string }
}

type totalMoney = {
  temporary: number
  reality: number
}
const { confirm } = Modal
const uid = new ShortUniqueId({ length: 8 })
function Checkout(): JSX.Element {
  const [itemCart, setitemCart] = useState<any>([])
  const [total, setTotal] = useState<totalMoney>({ temporary: 0, reality: 0 })
  const [dataPay, setDataPay] = useState<DataPay>({
    name: '',
    address: '',
    phone: '',
    email: '',
    newPass: '',
    description: '',
    type: 'cod',
    errors: {}
  })
  const history = useHistory()
  const newAccountRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()
  const { discountPercent } = useSelector((state: any) => state.discount)
  const { user, isLogged } = useSelector((state: any) => state.authUser)
  const { listOrder } = useSelector((state: any) => state.order)
  const order = useSelector((state: any) => state._todoProduct.Order)
  const items = useSelector((state: any) => state._todoProduct.Carts)

  useEffect(() => {
    let temp = items
    if (temp.length > 0) {
      const queries: any = temp.map((wl: any) => axios.get(PRODUCT_URL + wl.id))
      Promise.all(queries).then((res) =>
        setitemCart(res.map((s: any, index: number) => ({ ...s.data.data, quantity: temp[index].quantity })))
      )
    }
  }, [items])

  useEffect(() => {
    !items.length && setitemCart([])
  }, [items])

  useEffect(() => {
    let temp = itemCart.reduce((sum: number, value: any) => {
      return sum + value.price * value.quantity
    }, 0)
    setTotal((state) => ({ ...state, temporary: temp, reality: temp * (1 - discountPercent / 100) }))
  }, [itemCart])

  useEffect(() => {
    const { name = '', address = '', tel = '', email = '' } = user
    setDataPay((state) => ({ ...state, name, address, phone: tel, email }))
  }, [user])

  useEffect(() => {
    setTotal((state) => ({ ...state, reality: state.temporary * (1 - discountPercent / 100) }))
  }, [discountPercent, dispatch])

  function onChangePay(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const { value, name } = e.target
    setDataPay((state) => ({ ...state, [name]: value }))
  }

  function handleValidationPay(name: string) {
    const isPhoneNumber = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/
    const isEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i
    const isPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    let errors: { [key: string]: string } = {}
    let isFormValid = true
    switch (name) {
      case 'name':
        if (!dataPay.name) {
          isFormValid = false
          errors['name'] = 'vui lòng nhập tên *'
        } else errors['name'] = ''
        break

      case 'address':
        if (!dataPay.address) {
          isFormValid = false
          errors['address'] = 'vui lòng nhập địa chỉ *'
        } else errors['address'] = ''
        break

      case 'phone':
        if (!dataPay.phone) {
          isFormValid = false
          errors['phone'] = 'vui lòng nhập số điện thoại *'
        } else if (!isPhoneNumber.test(dataPay.phone)) {
          isFormValid = false
          errors['phone'] = 'vui lòng nhập đúng định dạng số điện thoại *'
        } else errors['phone'] = ''
        break

      case 'email':
        if (!dataPay.email) {
          isFormValid = false
          errors['email'] = 'vui lòng nhập địa chỉ email *'
        } else if (!isEmail.test(dataPay.email)) {
          isFormValid = false
          errors['email'] = 'vui lòng nhập đúng định dạng email *'
        } else errors['email'] = ''
        break

      case 'newPass':
        if (newAccountRef.current?.checked) {
          if (!dataPay.newPass) {
            isFormValid = false
            errors['newPass'] = 'vui lòng nhập mật khẩu để tạo mới *'
          } else if (!isPassword.test(dataPay.newPass)) {
            isFormValid = false
            errors['newPass'] =
              'Mật khẩu tối thiểu tám ký tự, có ít nhất một chữ cái hoa, chữ cái thường, số và ký tự đặc biệt *'
          } else errors['newPass'] = ''
        } else errors['newPass'] = ''
        break
    }
    setDataPay((state) => ({ ...state, errors: { ...state.errors, ...errors } }))
    return isFormValid
  }

  function onSubmitPay(e: any) {
    e.preventDefault()
    let isValidate = true
    Object.keys(dataPay).forEach((name) => {
      if (name !== 'errors' && name !== 'description' && name !== 'type') {
        if (!handleValidationPay(name)) isValidate = false
      }
    })
    if (isValidate) {
      confirm({
        title: 'Hoàn tất đặt hàng ?',
        icon: <ExclamationCircleOutlined />,
        content: 'Bạn chắc chắn muốn đặt hàng ?',
        onOk() {
          let newId: string
          do {
            newId = uid()
          } while (listOrder.some((order: any) => order.code === newId))
          if (isLogged) {
            const userId = user.id
            axios
              .post(ORDER_URL, {
                products: itemCart,
                customer: {
                  name: dataPay.name,
                  address: dataPay.address,
                  phone: dataPay.phone,
                  email: dataPay.email,
                  newPass: dataPay.newPass,
                  type: dataPay.type,
                  description: dataPay.description
                },
                total,
                userId,
                discount: total.temporary - total.reality,
                status: 'Đang xử lý',
                code: newId
              })
              .then((res) => dispatch(SaveOrder(res.data.data)))
              .then(() => dispatch(updateListOrder(order)))
            dispatch(setDiscount({ percent: 0, code: '' }))
            dispatch(deleteAllCart([]))
            notifiSuccess('Success', 'Create a successful order')
            history.push('/ordercomplete')
          } else {
            axios
              .post(ORDER_URL, {
                products: itemCart,
                customer: {
                  name: dataPay.name,
                  address: dataPay.address,
                  phone: dataPay.phone,
                  email: dataPay.email,
                  newPass: dataPay.newPass,
                  type: dataPay.type,
                  description: dataPay.description
                },
                total,
                discount: total.temporary - total.reality,
                status: 'Đang xử lý',
                code: newId
              })
              .then((res) => dispatch(SaveOrder(res.data.data)))
              .then(() => dispatch(updateListOrder(order)))
            dispatch(setDiscount({ percent: 0, code: '' }))
            dispatch(deleteAllCart([]))
            notifiSuccess('Success', 'Create a successful order')
            history.push('/ordercomplete')
          }
        }
      })
    }
  }

  return (
    <>
      {items.length <= 0 ? (
        <Redirect to='/cart' />
      ) : (
        <div className='checkout_page'>
          <div className='checkout'>
            <div className='checkout_header'>
              <h3 className='checkout_heading'>
                <Link to='/cart'>SHOPPING CART</Link>
              </h3>
              <RightOutlined className='checkout_icon' />
              <h3 className='checkout_heading checkout_heading-active'>CHECKOUT DETAILS</h3>
              <RightOutlined className='checkout_icon' />
              <h3 className='checkout_heading'>ORDER COMPLETE</h3>
            </div>
            <div className='checkout_top'>
              {!isLogged ? <CheckoutLogin /> : null}
              <Discount />
            </div>
            <div className='checkout_content'>
              <form onSubmit={onSubmitPay} className='checkout_content-form'>
                <div className='checkout_content_info-user'>
                  <h4 className='checkout_content-title'>THÔNG TIN THANH TOÁN</h4>
                  <div className='checkout_top-group'>
                    <label className='checkout_top-label' htmlFor='user_name'>
                      Tên *
                    </label>
                    <input
                      value={dataPay.name}
                      onChange={onChangePay}
                      onBlur={(e) => handleValidationPay(e.target.name)}
                      name='name'
                      className='checkout_top-input'
                      id='user_name'
                      spellCheck='false'
                      type='text'></input>
                    <small className='has-error'>{dataPay.errors['name']}</small>
                  </div>
                  <div className='checkout_top-group group_max_width'>
                    <label className='checkout_top-label' htmlFor='user_address'>
                      Địa chỉ *
                    </label>
                    <input
                      value={dataPay.address}
                      onChange={onChangePay}
                      onBlur={(e) => handleValidationPay(e.target.name)}
                      name='address'
                      className='checkout_top-input'
                      id='user_address'
                      spellCheck='false'
                      type='text'></input>
                    <small className='has-error'>{dataPay.errors['address']}</small>
                  </div>
                  <div className='checkout_top-wrapper--group'>
                    <div className='checkout_top-group'>
                      <label className='checkout_top-label' htmlFor='user_phone'>
                        Số điện thoại *
                      </label>
                      <input
                        value={dataPay.phone}
                        onChange={onChangePay}
                        onBlur={(e) => handleValidationPay(e.target.name)}
                        name='phone'
                        className='checkout_top-input'
                        id='user_phone'
                        spellCheck='false'
                        type='text'></input>
                      <small className='has-error'>{dataPay.errors['phone']}</small>
                    </div>
                    <div className='checkout_top-group'>
                      <label className='checkout_top-label' htmlFor='user_email'>
                        Địa chỉ email *
                      </label>
                      <input
                        value={dataPay.email}
                        onChange={onChangePay}
                        onBlur={(e) => handleValidationPay(e.target.name)}
                        name='email'
                        className='checkout_top-input'
                        id='user_email'
                        spellCheck='false'
                        type='text'></input>
                      <small className='has-error'>{dataPay.errors['email']}</small>
                    </div>
                  </div>
                  {/* <div className='checkout_top-remeber check_create'>
                                            <input
                                                ref={newAccountRef}
                                                className='checkout_top-check'
                                                id='user_check_create'
                                                type='checkbox'></input>
                                            <label className='checkout_top-label-check' htmlFor='user_check_create'>
                                                Tạo tài khoản mới?
                                            </label>
                                            <div className='checkout_top-group group_max_width create_password'>
                                                <label className='checkout_top-label' htmlFor='user_newPass'>
                                                    Tạo mật khẩu của tài khoản *
                                                  </label>
                                                <input
                                                    value={dataPay.newPass}
                                                    onChange={onChangePay}
                                                    onBlur={(e) => handleValidationPay(e.target.name)}
                                                    name='newPass'
                                                    className='checkout_top-input'
                                                    id='user_newPass'
                                                    spellCheck='false'
                                                    type='password'></input>
                                                <small className='has-error'>{dataPay.errors['newPass']}</small>
                                            </div>
                                        </div> */}
                  <h4 className='checkout_content-title'>THÔNG TIN BỔ SUNG</h4>
                  <div className='checkout_top-group group_max_width'>
                    <label className='checkout_top-label' htmlFor='user_note'>
                      Ghi chú đơn hàng
                    </label>
                    <textarea
                      value={dataPay.description}
                      onChange={onChangePay}
                      name='description'
                      className='checkout_top-input checkout_content-note'
                      id='user_note'
                      spellCheck='false'
                      placeholder='Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn.'></textarea>
                  </div>
                </div>
                <div className='checkout_content_info-order'>
                  <h4 className='checkout_content-title'>ĐƠN HÀNG CỦA BẠN</h4>
                  <table className='table_statistical'>
                    <thead>
                      <tr className='tr_in_table'>
                        <th className='table_product-th-name'>SẢN PHẨM</th>
                        <th className='table_total-th'>TẠM TÍNH</th>
                      </tr>
                    </thead>
                    <colgroup className='median_line'></colgroup>
                    <tbody>
                      {itemCart.length > 0 &&
                        itemCart.map((item: any, index: number) => (
                          <React.Fragment key={index}>
                            <tr className='tr_in_table'>
                              <td className='table_product-name'>{`${item.name} x ${item.quantity}`}</td>
                              <td className='table_total price'>{formatMoney(item.price * item.quantity)}</td>
                            </tr>
                            <tr className='median_line in_tbody'></tr>
                          </React.Fragment>
                        ))}
                    </tbody>
                    <tfoot>
                      <tr className='median_line in_tbody'></tr>
                      <tr className='tr_in_table'>
                        <td className='table_product-name'>Tạm tính</td>
                        <td className='table_total'>{formatMoney(total.temporary)}</td>
                      </tr>
                      <tr className='median_line in_tbody'></tr>
                      <tr className='tr_in_table'>
                        <td className='table_product-name'>Giảm giá</td>
                        <td className='table_total'>-{formatMoney(total.temporary - total.reality)}</td>
                      </tr>
                      <tr className='median_line in_tbody'></tr>
                      <tr className='tr_in_table'>
                        <td className='table_product-name'>Tổng</td>
                        <td className='table_total'>{formatMoney(total.reality)}</td>
                      </tr>
                      <tr className='median_line'></tr>
                    </tfoot>
                  </table>
                  <div className='checkout_payments'>
                    <input
                      onChange={onChangePay}
                      type='radio'
                      id='cod'
                      name='type'
                      value='cod'
                      checked={dataPay.type === 'cod'}
                    />
                    <label className='label_select_way' htmlFor='cod'>
                      COD
                    </label>
                    <span className='checkout_payments_describe cod'>
                      TT khi nhận hàng, freeship cho đơn hàng từ 500k (chỉ áp dụng trong nội thành Hà Nội)
                    </span>
                    <div className='median_line in_tbody select_way'></div>
                    <input
                      onChange={onChangePay}
                      type='radio'
                      id='tranfer'
                      name='type'
                      value='transfer'
                      checked={dataPay.type === 'transfer'}
                    />
                    <label className='label_select_way' htmlFor='tranfer'>
                      Chuyển khoản
                    </label>
                    <span className='checkout_payments_describe tranfer'>Thanh toán chuyển khoản qua ngân hàng</span>
                  </div>
                  <button type='submit' className='checkout_top-btn btn_order'>
                    ĐẶT HÀNG
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default memo(Checkout)
