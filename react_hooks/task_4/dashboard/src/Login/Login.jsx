import { useState } from 'react'
import WithLogging from '../HOC/WithLogging'

function Login(props) {
  const [enableSubmit, setEnableSubmit] = useState(false)
  const [formData, setFormData] = useState(
    { email: '', password: '' }
  )

  const isValidEmail = (email) => {
    if (!email || typeof email !== 'string') {
      return false
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
  }

  const isValidPassword = (password) => {
    if (password.length >= 8) {
      return true
    }
    return false
  }

  const validateForm = (email, password) => {
    if (email !== '' && password !== '' && isValidEmail(email) && isValidPassword(password)) {
      return true
    }
    return false
  }

  const handleChangeEmail = (event) => {
    const updatedEmail = event.target.value
    const isValid = validateForm(updatedEmail, formData.password)

    setFormData({ ...formData, email: updatedEmail })
    setEnableSubmit(isValid)
  }

  const handleChangePassword = (event) => {
    const updatedPassword = event.target.value
    const isValid = validateForm(formData.email, updatedPassword)

    setFormData({ ...formData, password: updatedPassword })
    setEnableSubmit(isValid)
  }

  const handleLoginSubmit = (event) => {
    event.preventDefault()
    props.logIn(formData.email, formData.password)
  }
  return (
    <div className="App-body flex flex-col p-5 pl-1 h-[45vh] border-t-4 border-[color:var(--main-color)]">
      <p className="text-xl mb-4">Login to access the full dashboard</p>
      <form onSubmit={handleLoginSubmit} >
        <div className="text-lg flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0">
          <label htmlFor="email" className="sm:pr-2">
            Email:
          </label>
          <input type="email" value={formData.email} onChange={handleChangeEmail} name="user_email" id="email" className="border rounded w-3/5 sm:w-auto px-2 py-1" />
          <label htmlFor="password" className="sm:pl-2 sm:pr-2">
            Password:
          </label>
          <input type="password" value={formData.password} onChange={handleChangePassword} name="user_password" id="password" className="border rounded w-3/5 sm:w-auto px-2 py-1" />
          <button type='submit' disabled={!enableSubmit} className="cursor-pointer border px-1 rounded sm:ml-2 w-fit">OK</button>
        </div>
      </form>
    </div>
  );
}
const LoginWithLogging = WithLogging(Login)
export default LoginWithLogging;