import axios from 'axios'
import React, { ChangeEvent, memo, useState } from 'react'
import { useDispatch } from 'react-redux'

import { AUTH_URL } from '../../share/common/api/api-constants'
import { setLogin } from '../../store/actions/auth.action'
import { notifiError, notifiSuccess } from '../../untils/notification'
import './index.css'

type DataLogin = {
  user: string
  password: string
  errors: { [key: string]: string }
}
const localStorageUserKey = 'userLogged'

function CheckoutLogin() {
  const [wantLogin, setWantLogin] = useState<boolean>(false)
  const [dataLogin, setDataLogin] = useState<DataLogin>({ user: '', password: '', errors: {} })

  const dispatch = useDispatch()

  function onChangeLogin(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const { value, name } = e.target
    setDataLogin((state) => ({ ...state, [name]: value }))
  }
  const needLogin = (): any => {
    setWantLogin(!wantLogin)
  }
  function handleValidation(name: string) {
    let errors: { [key: string]: string } = {}
    let isFormValid = true
    switch (name) {
      case 'user':
        if (!dataLogin.user) {
          isFormValid = false
          errors['user'] = 'username không thể trống *'
        } else errors['user'] = ''
        break

      case 'password':
        if (!dataLogin.password) {
          isFormValid = false
          errors['password'] = 'mật khẩu không thể trống *'
        } else errors['password'] = ''
        break
    }
    setDataLogin((state) => ({ ...state, errors: { ...state.errors, ...errors } }))
    return isFormValid
  }
  async function handleValidationLogin(e: any) {
    try {
      e.preventDefault()
      let isValidate = true
      Object.keys(dataLogin).forEach((name) => {
        if (name !== 'errors') if (!handleValidation(name)) isValidate = false
      })
      if (isValidate) {
        const res = await axios.post(AUTH_URL, {
          username: dataLogin.user,
          password: dataLogin.password
        })
        localStorage.setItem(localStorageUserKey, res.data.data.userId)
        localStorage.setItem('load', '')
        dispatch(setLogin())
        notifiSuccess('Success', 'Đăng nhập thành công')
      }
    } catch (err) {
      notifiError('Error', 'Tên đăng nhập hoặc mật khẩu không đúng')
    }
  }
  return (
    <div className='checkout_top-box'>
      <div className='checkout_top-wrap'>
        <span className='checkout_top-text'>Bạn đã có tài khoản?</span>
        <span onClick={needLogin} className='checkout_top-text--action'>
          Ấn vào đây để đăng nhập
        </span>
      </div>
      {wantLogin ? (
        <div className='checkout_top-cube cube_sale_code'>
          <span className='checkout_top-text'>
            Nếu trước đây bạn đã mua hàng của chúng tôi, vui lòng đăng nhập. Nếu bạn là khách hàng mới, vui lòng tiếp
            tục nhập phần thông tin thanh toán.
          </span>
          <form onSubmit={handleValidationLogin} className='checkout_top-form form_login'>
            <div className='checkout_top-wrapper--group'>
              <div className='checkout_top-group'>
                <label className='checkout_top-label' htmlFor='user_account'>
                  Tên đăng nhập hoặc email *
                </label>
                <input
                  name='user'
                  value={dataLogin.user}
                  onChange={onChangeLogin}
                  onBlur={(e) => handleValidation(e.target.name)}
                  className='checkout_top-input'
                  id='user_account'
                  spellCheck='false'
                  type='text'></input>
                <small className='has-error'>{dataLogin.errors['user']}</small>
              </div>
              <div className='checkout_top-group'>
                <label className='checkout_top-label' htmlFor='user_password'>
                  Mật khẩu *
                </label>
                <input
                  name='password'
                  value={dataLogin.password}
                  onChange={onChangeLogin}
                  onBlur={(e) => handleValidation(e.target.name)}
                  className='checkout_top-input'
                  id='user_password'
                  spellCheck='false'
                  type='password'></input>
                <small className='has-error'>{dataLogin.errors['password']}</small>
              </div>
            </div>
            <button className='checkout_top-btn login' type='submit'>
              ĐĂNG NHẬP
            </button>
            <span className='checkout_top-text--action'>Quên mật khẩu?</span>
          </form>
        </div>
      ) : null}
    </div>
  )
}

export default memo(CheckoutLogin)
