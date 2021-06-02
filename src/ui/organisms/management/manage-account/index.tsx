import axios from 'axios'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../../../store/actions/auth.action'
import './index.css'

type Properties = {
  name: string
  userName: string
  email: string
  oldPassword: string
  newPassword: string
  confirmPassword: string
  errors: { [key: string]: string }
}

export default function ManageAccount() {
  const [property, setProperty] = useState<Properties>({
    name: '',
    userName: '',
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    errors: {}
  })

  const dispatch = useDispatch()
  const { user } = useSelector((state: any) => state.authUser)

  useEffect(() => {
    const { name, userName, email, password } = user
    setProperty((state) => ({ ...state, name, userName, email, password }))
  }, [user])

  const handleValidator = (name: string) => {
    const isEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i
    const isPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    let errors: { [key: string]: string } = {}
    let isFormValid = true

    switch (name) {
      case 'name':
        if (!property.name) {
          isFormValid = false
          errors['name'] = 'vui lòng nhập tên *'
        } else errors['name'] = ''
        break

      case 'userName':
        if (!property.userName) {
          isFormValid = false
          errors['userName'] = 'vui lòng nhập tên tài khoản người dùng*'
        } else errors['userName'] = ''
        break

      case 'email':
        if (!property.email) {
          isFormValid = false
          errors['email'] = 'vui lòng nhập địa chỉ email *'
        } else if (!isEmail.test(property.email)) {
          isFormValid = false
          errors['email'] = 'vui lòng nhập đúng định dạng email *'
        } else errors['email'] = ''
        break

      case 'oldPassword':
        if (!property.oldPassword) {
          isFormValid = false
          errors['oldPassword'] = 'vui lòng nhập mật khẩu hiện tại*'
        } else if (!isPassword.test(property.oldPassword)) {
          isFormValid = false
          errors['oldPassword'] =
            'Mật khẩu tối thiểu tám ký tự, có ít nhất một chữ cái hoa, chữ cái thường, số và ký tự đặc biệt *'
        } else errors['oldPassword'] = ''
        break

      case 'newPassword':
        if (!property.oldPassword) {
          isFormValid = false
          errors['newPassword'] = 'vui lòng nhập mật khẩu mới*'
        } else if (!isPassword.test(property.newPassword)) {
          isFormValid = false
          errors['newPassword'] =
            'Mật khẩu tối thiểu tám ký tự, có ít nhất một chữ cái hoa, chữ cái thường, số và ký tự đặc biệt *'
        } else errors['newPassword'] = ''
        break

      case 'confirmPassword':
        if (!property.oldPassword) {
          isFormValid = false
          errors['confirmPassword'] = 'vui lòng xác nhận mật khẩu mới*'
        } else if (!isPassword.test(property.confirmPassword)) {
          isFormValid = false
          errors['confirmPassword'] =
            'Mật khẩu tối thiểu tám ký tự, có ít nhất một chữ cái hoa, chữ cái thường, số và ký tự đặc biệt *'
        } else errors['confirmPassword'] = ''
        break
    }
    setProperty((state) => ({ ...state, errors: { ...state.errors, ...errors } }))
    return isFormValid
  }

  function onChangeProperty(e: ChangeEvent<HTMLInputElement>): void {
    const { value, name } = e.target
    setProperty((state) => ({ ...state, [name]: value }))
  }

  function handleSubmit(e: any) {
    e.preventDefault()
    let isValidate = true
    Object.keys(property).forEach((name) => {
      if (name !== 'errors') {
        if (!handleValidator(name)) isValidate = false
      }
    })
    if (isValidate) {
      const userId = user.id
      axios.patch(`http://18.141.237.78/api/user/${userId}`, {
        name: property.name,
        userName: property.userName,
        email: property.email
        // password: property.confirmPassword
      })
      dispatch(
        updateUser({
          name: property.name,
          userName: property.userName,
          email: property.email
          // password: property.confirmPassword
        })
      )
      // history.push('/ordercomplete')
    }
  }

  return (
    <div className='right-side-column'>
      <div className='account-wrapper'>
        <div className='account-content'>
          <form action='' onSubmit={handleSubmit} className='edit-account-form'>
            <div className='full-name' style={{ display: 'flex' }}>
              <p className='row-first' style={{ width: '49%' }}>
                <label htmlFor='account-first-name'>
                  Tên&nbsp;<span className='required'>*</span>
                </label>
                <input
                  defaultValue={property.name}
                  onChange={onChangeProperty}
                  onBlur={(e) => handleValidator(e.target.name)}
                  type='text'
                  className='input'
                  name='name'
                  autoComplete='given-name'></input>
                <small className='has-error'>{property.errors['name']}</small>
              </p>
            </div>
            <p className='account-name account-form'>
              <label htmlFor='account-display-name'>
                Tên hiển thị&nbsp;<span className='required'>*</span>
              </label>
              <input
                defaultValue={property.userName}
                onChange={onChangeProperty}
                onBlur={(e) => handleValidator(e.target.name)}
                type='text'
                className='input'
                name='userName'></input>
              <small className='has-error'>{property.errors['userName']}</small>
              <span>
                <em>Tên này sẽ hiển thị trong trang Tài khoản và phần Đánh giá sản phẩm</em>
              </span>
            </p>
            <p className='account-email account-form'>
              <label htmlFor='account-email'>
                Địa chỉ email&nbsp;<span className='required'>*</span>
              </label>
              <input
                defaultValue={property.email}
                onChange={onChangeProperty}
                onBlur={(e) => handleValidator(e.target.name)}
                type='email'
                className='input'
                name='email'
                autoComplete='email'></input>
              <small className='has-error'>{property.errors['email']}</small>
            </p>
            <fieldset>
              <legend>Thay đổi mật khẩu</legend>
              <p className='account-form'>
                <label htmlFor='password-current'>Mật khẩu hiện tại (bỏ trống nếu không đổi)</label>
                <span className='password-input'>
                  <input
                    defaultValue={property.oldPassword}
                    onChange={onChangeProperty}
                    onBlur={(e) => handleValidator(e.target.name)}
                    type='password'
                    className='input'
                    name='oldPassword'
                    autoComplete='off'></input>
                  <small className='has-error'>{property.errors['oldPassword']}</small>
                </span>
              </p>
              <p className='account-form'>
                <label htmlFor='password-1'>Mật khẩu mới (bỏ trống nếu không đổi)</label>
                <span className='password-input'>
                  <input
                    defaultValue={property.newPassword}
                    onChange={onChangeProperty}
                    onBlur={(e) => handleValidator(e.target.name)}
                    type='password'
                    className='input'
                    name='newPassword'
                    autoComplete='off'></input>
                  <small className='has-error'>{property.errors['newPassword']}</small>
                </span>
              </p>
              <p className='account-form'>
                <label htmlFor='password-2'>Xác nhận mật khẩu mới</label>
                <span className='password-input'>
                  <input
                    defaultValue={property.confirmPassword}
                    onChange={onChangeProperty}
                    onBlur={(e) => handleValidator(e.target.name)}
                    type='password'
                    className='input'
                    name='confirmPassword'
                    autoComplete='off'></input>
                  <small className='has-error'>{property.errors['newPassword']}</small>
                </span>
              </p>
            </fieldset>
            <p>
              <button
                type='submit'
                className='button'
                name='save-account-detail'
                style={{ backgroundColor: '#446084', color: '#fff', boxShadow: 'inset 0 0 0 100px rgb(0 0 0 / 20%)' }}>
                Lưu thay đổi
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
