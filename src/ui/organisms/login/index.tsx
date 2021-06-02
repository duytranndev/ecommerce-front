import { notification } from 'antd'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AUTH_URL } from '../../../share/common/api/api-constants'
import { setLogin } from '../../../store/actions/auth.action'
import './index.css'

type login = {
  username: string
  password: string
}

const notifiSuccess = (title: string, content: string) => {
  notification.config({
    duration: 2
  })
  notification['success']({
    message: title,
    description: content
  })
}

export default function Login(props: any) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  const [user, setUser] = useState<login>({
    username: '',
    password: ''
  })

  const handleClick = (event: any) => {
    const { target } = event
    if (wrapperRef.current && !wrapperRef.current?.contains(target)) {
      props.parentCallback()
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target
    setUser((state) => ({ ...state, [name]: value }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    return fetch(AUTH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.message != 'success') {
          setMessage('Lỗi đăng nhập - Tài khoản hoặc mật khẩu không đúng!')
        } else {
          localStorage.setItem('userLogged', data.data.userId)
          localStorage.setItem('load', '')
          notifiSuccess('Success', 'Đăng nhập thành công!')
          dispatch(setLogin())
          setMessage('')
          props.parentCallback()
        }
      })
  }

  useEffect(() => {
    document.addEventListener('click', handleClick, true)
    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [])

  return (
    <div>
      <div className='blurred background'></div>
      <div className='login-dialog-wrapper' style={{ overflow: 'hidden auto' }}>
        <div className='login-dialog-container'>
          <div className='login-dialog-content' style={props.style}>
            <div className='login-form-popup' ref={wrapperRef}>
              <div className='account-container'>
                <div className='row-devided'>
                  <div className='col-left large-6'>
                    <div className='account-login-inner'>
                      <h3 className='uppercase'>Đăng Nhập</h3>
                      <form action='' onSubmit={handleSubmit} className='login-action'>
                        <p className='form-row'>
                          <label htmlFor='username'>
                            Tên tài khoản hoặc địa chỉ email&nbsp;<span className='requiered'>*</span>
                          </label>
                          <input
                            onChange={handleChange}
                            value={user.username}
                            type='text'
                            className=''
                            name='username'
                            id='username'
                            autoComplete='username'
                          />
                        </p>
                        <p className='form-row'>
                          <label htmlFor='password'>
                            Mật khẩu&nbsp;<span className='requiered'>*</span>
                          </label>
                          <input
                            onChange={handleChange}
                            value={user.password}
                            type='password'
                            className=''
                            name='password'
                            id='password'
                            autoComplete='current-password'
                          />
                        </p>
                        <p className='form-row'>
                          <label htmlFor='' className='remember-passwords'>
                            <input type='checkbox' />
                            <span>Ghi nhớ mật khẩu</span>
                          </label>
                          <button className='btn-nguyen' type='submit'>
                            Đăng nhập
                          </button>
                        </p>
                        <small className='has-error'>{message}</small>
                        <p className='lost-passwords'>
                          <a className='a-nguyen' href=''>
                            Quên mật khẩu?
                          </a>
                        </p>
                      </form>
                    </div>
                  </div>
                  <div className='col-right large-6'>
                    <div className='account-register-inner'>
                      <h3 className='uppercase'>Đăng ký</h3>
                      <form action='' className='register-action'>
                        <p className='form-row'>
                          <label htmlFor='reg_email'>
                            Địa chỉ email&nbsp;<span className='requiered'>*</span>
                          </label>
                          <input type='email' className='' name='email' id='reg_email' autoComplete='email' />
                        </p>
                        <p className='form-row'>
                          <label htmlFor='reg_password'>
                            Mật khẩu&nbsp;<span className='requiered'>*</span>
                          </label>
                          <input
                            type='password'
                            className=''
                            name='password'
                            id='reg_password'
                            autoComplete='new-password'
                          />
                        </p>
                        <div className='privacy-policy'>
                          <p>
                            Your personal data will be used to support your experience throughout this website, to
                            manage access to your account, and for other purposes described in our{' '}
                            <a className='a-normal' href=''>
                              chính sách riêng tư
                            </a>
                          </p>
                        </div>
                        <p className='form-row'>
                          <button className='btn-nguyen' type='submit'>
                            Đăng ký
                          </button>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
