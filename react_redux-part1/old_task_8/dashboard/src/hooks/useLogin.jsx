import { useState } from "react";

export default function useLogin(onLogin) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enableSubmit, setEnableSubmit] = useState(false);

  // --- Validation ---
  const validateForm = (email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && password.length >= 8;
  };

  // --- Handlers ---
  const handleChangeEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEnableSubmit(validateForm(newEmail, password));
  };

  const handleChangePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setEnableSubmit(validateForm(email, newPassword));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) onLogin(email, password);
  };

  return {
    email,
    password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleSubmit,
  };
}
