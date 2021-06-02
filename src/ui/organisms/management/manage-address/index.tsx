import axios from 'axios'
import React, { ChangeEvent, memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../../../store/actions/auth.action'
import { notifiSuccess } from '../../../../untils/notification'
import './index.css'

type DataAddress = {
  name: string
  address: string
  phone: string
  email?: string
  errors: { [key: string]: string }
}
function ManageAddress() {
  const { user } = useSelector((state: any) => state.authUser)
  const dispatch = useDispatch()
  const [isChange, setIsChange] = useState(false)
  const [dataAddress, setDataAddress] = useState<DataAddress>({
    name: '',
    address: '',
    phone: '',
    email: '',
    errors: {}
  })
  useEffect(() => {
    const { name, address, tel, email } = user
    setDataAddress((state) => ({ ...state, name, address, phone: tel, email }))
  }, [user])
  function onChangeAddress(e: ChangeEvent<HTMLInputElement>): void {
    const { value, name } = e.target
    setDataAddress((state) => ({ ...state, [name]: value }))
  }
  const handleActionAddress = (): void => {
    setIsChange(true)
  }

  function handleValidation(name: string) {
    const isPhoneNumber = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/
    let errors: { [key: string]: string } = {}
    let isFormValid = true
    switch (name) {
      case 'name':
        if (!dataAddress.name) {
          isFormValid = false
          errors['name'] = 'vui lòng nhập tên *'
        } else errors['name'] = ''
        break

      case 'address':
        if (!dataAddress.address) {
          isFormValid = false
          errors['address'] = 'vui lòng nhập địa chỉ *'
        } else errors['address'] = ''
        break

      case 'phone':
        if (!dataAddress.phone) {
          isFormValid = false
          errors['phone'] = 'vui lòng nhập số điện thoại *'
        } else if (!isPhoneNumber.test(dataAddress.phone)) {
          isFormValid = false
          errors['phone'] = 'vui lòng nhập đúng định dạng số điện thoại *'
        } else errors['phone'] = ''
        break
    }
    setDataAddress((state) => ({ ...state, errors: { ...state.errors, ...errors } }))
    return isFormValid
  }

  function handleSubmit(e: any) {
    e.preventDefault()

    let isValidate = true
    Object.keys(dataAddress).forEach((name) => {
      if (name !== 'errors') {
        if (!handleValidation(name)) isValidate = false
      }
    })
    if (isValidate) {
      const userId = user.id
      axios.patch(`http://18.141.237.78/api/user/${userId}`, {
        name: dataAddress.name,
        tel: dataAddress.phone,
        address: dataAddress.address
      })
      dispatch(
        updateUser({
          name: dataAddress.name,
          tel: dataAddress.phone,
          address: dataAddress.address
        })
      )
      notifiSuccess('Success', 'Update infomartion successfully')
    } else console.log(false)
  }
  return (
    <div className='manage-address'>
      {!isChange ? (
        <div className='manage-address_wrap'>
          <span className='manage-address_label'>
            Các địa chỉ bên dưới mặc định sẽ được sử dụng ở trang thanh toán sản phẩm.
          </span>
          <div className='manage-address_payment'>
            <h2 className='manage-address_heading'>Địa Chỉ Giao Hàng</h2>
            {user.address ? (
              <div className='manage-address_current'>
                <span onClick={handleActionAddress} className='manage-address_change'>
                  Chỉnh Sửa
                </span>
                <span>{`${user.name}`}</span>
                <span>{user.phone}</span>
                <span>{user.address}</span>
              </div>
            ) : (
              <div className='manage-address_new'>
                <span onClick={handleActionAddress} className='manage-address_change'>
                  Thêm
                </span>
                <span>Bạn vẫn chưa thêm địa chỉ nào.</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className='manage-address_form-wrap'>
          <form onSubmit={handleSubmit} className='manage-address-form'>
            <div className='manage-address_info-user'>
              <h2 className='manage-address_heading'>Địa Chỉ Giao Hàng</h2>
              <div className='manage-address-group max_width'>
                <label className='manage-address-label' htmlFor='user_name'>
                  Họ tên *
                </label>
                <input
                  // value={dataAddress.name}
                  defaultValue={dataAddress.name}
                  onChange={onChangeAddress}
                  onBlur={(e) => handleValidation(e.target.name)}
                  name='name'
                  className='manage-address-input'
                  id='user_lastName'
                  spellCheck='false'
                  type='text'></input>
                <small className='has-error'>{dataAddress.errors['name']}</small>
              </div>
              <div className='manage-address-group max_width'>
                <label className='manage-address-label' htmlFor='user_address'>
                  Địa chỉ *
                </label>
                <input
                  // value={dataAddress.address}
                  defaultValue={dataAddress.address}
                  onChange={onChangeAddress}
                  onBlur={(e) => handleValidation(e.target.name)}
                  name='address'
                  className='manage-address-input'
                  id='user_address'
                  spellCheck='false'
                  type='text'></input>
                <small className='has-error'>{dataAddress.errors['address']}</small>
              </div>
              <div className='manage-address-wrapper--group'>
                <div className='manage-address-group'>
                  <label className='manage-address-label' htmlFor='user_phone'>
                    Số điện thoại *
                  </label>
                  <input
                    // value={dataAddress.phone}
                    defaultValue={dataAddress.phone}
                    onChange={onChangeAddress}
                    onBlur={(e) => handleValidation(e.target.name)}
                    name='phone'
                    className='manage-address-input'
                    id='user_phone'
                    spellCheck='false'
                    type='text'></input>
                  <small className='has-error'>{dataAddress.errors['phone']}</small>
                </div>
                <div className='manage-address-group'>
                  <label className='manage-address-label' htmlFor='user_email'>
                    Địa chỉ email *
                  </label>
                  <input
                    // value={dataAddress.email}
                    defaultValue={dataAddress.email}
                    name='email'
                    className='manage-address-input'
                    id='user_email'
                    spellCheck='false'
                    disabled
                    type='text'></input>
                </div>
              </div>
            </div>
            <div className='manage-address-group max_width group_btn-save'>
              <button type='submit' className='manage-address-btn'>
                Lưu Địa Chỉ
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
export default memo(ManageAddress)
