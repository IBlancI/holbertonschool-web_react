// task_5/dashboard/src/Login/Login.jsx
import React from 'react';
import WithLogging from '../HOC/WithLogging';
import useLogin from '../hooks/useLogin';

function Login({ logIn = () => {}, email = '', password = '' }) {
  const {
    email: emailValue,
    password: passwordValue,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleSubmit,
  } = useLogin(logIn, { email, password });

  return (
    <div className="App-body p-[10px]">
      <div className="border-t-[3px] border-[var(--main-color)] pt-2">
        <p className="text-sm mb-2">Login to access the full dashboard</p>

        <form
          className="App-login inline-flex items-center gap-2 flex-wrap"
          onSubmit={handleSubmit}
        >
          <label htmlFor="email" className="ml-4 mr-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={emailValue}
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
            value={passwordValue}
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
