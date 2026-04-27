import { useState } from 'react';

export default function useLogin(onLogin) {
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChangeEmail = (e) => {
    const newEmail = e.target.value;
    const { password } = formData;

    setFormData(prev => ({ ...prev, email: newEmail }));
    setEnableSubmit(isValidEmail(newEmail) && password.length >= 8);
  };

  const handleChangePassword = (e) => {
    const newPassword = e.target.value;
    const { email } = formData;

    setFormData(prev => ({ ...prev, password: newPassword }));
    setEnableSubmit(isValidEmail(email) && newPassword.length >= 8);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onLogin(formData.email, formData.password);
  };

  return {
    email: formData.email,
    password: formData.password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleLoginSubmit
  };
}
