import axios from 'axios'
import React, { ChangeEvent, memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { VOUCHER_URL } from '../../share/common/api/api-constants'
import { setDiscount } from '../../store/actions/discount.action'
import { notifiSuccess } from '../../untils/notification'
import './index.css'

type DiscountCode = {
  code: string
  errors: string
}
function Discount(): JSX.Element {
  const [hasCode, setHasCode] = useState<boolean>(false)
  const dispatch = useDispatch()
  const { discountPercent, discountCoded } = useSelector((state: any) => state.discount)
  const [discountCode, setDiscountCode] = useState<DiscountCode>({ code: discountCoded, errors: '' })

  function onChangeDiscount(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const { value, name } = e.target
    setDiscountCode((state) => ({ ...state, [name]: value }))
  }
  const hasDiscountCode = (): any => {
    setHasCode(!hasCode)
  }

  function handleValidationDiscount(name: string) {
    let errors: string = ''
    let check = true
    if (!discountCode.code) {
      check = false
      errors = 'vui lòng nhập mã giảm giá *'
    }
    setDiscountCode((state) => ({ ...state, errors: errors }))
    return check
  }

  async function onSutmitDiscount(e: any) {
    let isValidate = true
    Object.keys(discountCode).forEach((name) => {
      if (name !== 'errors') if (!handleValidationDiscount(name)) isValidate = false
    })
    if (isValidate) {
      const voucher = (await axios.get(`${VOUCHER_URL}?code=${discountCode.code}`)).data.data[0]
      if (!voucher) {
        dispatch(setDiscount({ percent: 0, code: '' }))
        setDiscountCode((state) => ({ ...state, errors: 'Mã giảm giá không tồn tại' }))
      } else {
        dispatch(setDiscount({ percent: voucher.percent.replace('%', ''), code: discountCode.code }))
        notifiSuccess('SUCCESS', 'Sử dụng mã giảm giá thành công')
        hasDiscountCode()
      }
    } else {
      dispatch(setDiscount({ percent: 0, code: '' }))
    }
  }

  return (
    <div className='checkout_top-box'>
      {!discountPercent ? (
        <>
          <div className='checkout_top-wrap'>
            <span className='checkout_top-text'>Bạn có mã ưu đãi?</span>
            <span onClick={hasDiscountCode} className='checkout_top-text--action'>
              Ấn vào đây để nhập mã
            </span>
          </div>
          {hasCode ? (
            <div className='checkout_top-cube cube_sale_code'>
              <span className='checkout_top-text'>Nếu bạn có mã giảm giá, vui lòng điền vào phía bên dưới.</span>
              <div className='checkout_top-form form_sale_code'>
                <div className='checkout_top-wrapper--group'>
                  <input
                    value={discountCode.code}
                    onChange={onChangeDiscount}
                    name='code'
                    className='checkout_top-input input_sale_code'
                    placeholder='Mã ưu đãi'
                    spellCheck='false'
                    type='text'></input>
                  <button onClick={onSutmitDiscount} className='checkout_top-btn btn_sale_code' type='button'>
                    ÁP DỤNG
                  </button>
                </div>
                <small className='has-error'>{discountCode.errors}</small>
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <>
          <span className='checkout_top-text'>Đơn hàng của bạn đã được giảm {discountPercent}%.</span>
          <span onClick={hasDiscountCode} className='checkout_top-text--action'>
            Ấn vào đây để thay đổi mã
          </span>
          {hasCode ? (
            <div className='checkout_top-cube cube_sale_code'>
              <div className='checkout_top-form form_sale_code'>
                <div className='checkout_top-wrapper--group'>
                  <input
                    value={discountCode.code}
                    onChange={onChangeDiscount}
                    name='code'
                    className='checkout_top-input input_sale_code'
                    placeholder='Mã ưu đãi'
                    spellCheck='false'
                    type='text'></input>
                  <button onClick={onSutmitDiscount} className='checkout_top-btn btn_sale_code' type='button'>
                    ÁP DỤNG
                  </button>
                </div>
                <small className='has-error'>{discountCode.errors}</small>
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}
export default memo(Discount)
