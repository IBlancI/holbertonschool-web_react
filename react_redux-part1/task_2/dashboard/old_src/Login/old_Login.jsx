// task_1/dashboard/src/Login/Login.jsx
import React, { useState } from 'react';
import WithLogging from '../HOC/WithLogging';

function Login({ logIn = () => {} }) {
  // états demandés
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  // --- validation identique à la version classe ---
  const isValidEmail = (email) => {
    if (email !== email.trim()) return false;
    if (/\s/.test(email)) return false;

    const pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!pattern.test(email)) return false;

    const parts = email.split('@');
    if (parts.length !== 2) return false;
    const domain = parts[1];

    if (domain.includes('..')) return false;
    if (
      domain.startsWith('.') ||
      domain.endsWith('.') ||
      domain.startsWith('-') ||
      domain.endsWith('-')
    ) {
      return false;
    }

    const labels = domain.split('.');
    if (labels.some((label) => label.length === 0 || label.startsWith('-') || label.endsWith('-'))) {
      return false;
    }

    return true;
  };

  const computeEnableSubmit = (email, password) => {
    const e = email;
    const p = password.trim();
    const hasOuterSpaces = e !== e.trim();

    return (
      !hasOuterSpaces &&
      e.length > 0 &&
      isValidEmail(e) &&
      p.length >= 8
    );
  };

  // handlers demandés
  const handleChangeEmail = (e) => {
    const email = e.target.value;
    setFormData((prev) => {
      const next = { ...prev, email };
      setEnableSubmit(computeEnableSubmit(next.email, next.password));
      return next;
    });
  };

  const handleChangePassword = (e) => {
    const password = e.target.value;
    setFormData((prev) => {
      const next = { ...prev, password };
      setEnableSubmit(computeEnableSubmit(next.email, next.password));
      return next;
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault(); // toujours empêcher le submit par défaut
    logIn(formData.email, formData.password); // appeler la prop avec les valeurs courantes
  };

  // --- JSX : même structure et classes que la version classe ---
  return (
    <div className="App-body p-[10px]">
      <div className="border-t-[3px] border-[var(--main-color)] pt-2">
        <p className="text-sm mb-2">Login to access the full dashboard</p>

        <form
          className="App-login inline-flex items-center gap-2 flex-wrap"
          onSubmit={handleLoginSubmit}
        >
          <label htmlFor="email" className="ml-4 mr-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChangeEmail}
            className="border border-gray-300 px-2 py-1 mr-2 rounded"
          />

          <label htmlFor="password" className="ml-4 mr-2">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChangePassword}
            className="border border-gray-300 px-2 py-1 mr-2 rounded"
          />

          <input
            type="submit"
            value="OK"
            role="button"
            disabled={!enableSubmit}
            className="px-3 py-1 border rounded text-xs disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="OK"
          />
        </form>
      </div>
    </div>
  );
}

export default WithLogging(Login);
