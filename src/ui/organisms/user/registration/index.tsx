import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'

export default function RegistrationForm() {
  const [user, setUser] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const dispatch = useDispatch()

  const handleOnChangeUser = (event: ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value)
  }

  const handleOnChangePass = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  let userLogin = {
    user: user,
    pass: password
  }
  const handleOnSubmit = (event: FormEvent): void => {
    event.preventDefault()
    userTodoRegis(userLogin)
  }
  const userTodoRegis = (user: object) => {
    return fetch('http://ec2-18-140-248-159.ap-southeast-1.compute.amazonaws.com/api/news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ user })
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.message) {
        } else {
          localStorage.setItem('token', data.jwt)
          dispatch({ type: 'SET_LOGIN', payload: user })
        }
      })
  }
  return (
    <div className='login-form' style={{ marginLeft: 200 }}>
      <form onSubmit={handleOnSubmit}>
        <h1>Login</h1>
        <label htmlFor=''>UserName</label>
        <input type='text' name='user' placeholder='User Name' value={user} onChange={handleOnChangeUser} />
        <br />
        <label htmlFor=''>PassWord</label>
        <input type='password' name='pass' placeholder='Pass Word' value={password} onChange={handleOnChangePass} />
        <br />
        <input type='submit' />
      </form>
    </div>
  )
}
