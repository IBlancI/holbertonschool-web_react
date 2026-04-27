import { useState } from 'react'

function useLogin(onLogin) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [enableSubmit, setEnableSubmit] = useState(false)

  const isValidEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/
    return emailRegex.test(value)
  }

  const validateForm = (currentEmail, currentPassword) => {
    return isValidEmail(currentEmail) && currentPassword.length >= 8
  }

  const handleChangeEmail = (event) => {
    const updatedEmail = event.target.value
    setEmail(updatedEmail)
    setEnableSubmit(validateForm(updatedEmail, password))
  }

  const handleChangePassword = (event) => {
    const updatedPassword = event.target.value
    setPassword(updatedPassword)
    setEnableSubmit(validateForm(email, updatedPassword))
  }

  const handleLoginSubmit = (event) => {
    event.preventDefault()
    onLogin(email, password)
  }

  return {
    email,
    password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleLoginSubmit,
  }
}

export default useLogin