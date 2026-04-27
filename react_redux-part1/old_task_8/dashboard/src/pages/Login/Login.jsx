import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import WithLogging from "../../components/HOC/WithLogging";
import useLogin from "../../hooks/useLogin";

function Login() {
  const dispatch = useDispatch();

  const handleLogin = (email, password) => {
    dispatch(login({ email, password }));
  };

  const {
    email,
    password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleSubmit,
  } = useLogin(handleLogin);

  return (
    <div className="App-login flex-1 text-left m-8 border-t-4 border-[var(--main-color)] pt-6">
      <p className="text-lg font-semibold mb-2">
        Login to access the full dashboard
      </p>

      <form
        className="flex flex-wrap items-center gap-4"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email" className="flex items-center gap-2">
          Email
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChangeEmail}
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]"
          />
        </label>

        <label htmlFor="password" className="flex items-center gap-2">
          Password
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChangePassword}
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]"
          />
        </label>

        <input
          type="submit"
          value="OK"
          disabled={!enableSubmit}
          className={`px-4 py-2 border border-gray-300 rounded bg-white hover:bg-gray-50 cursor-pointer transition ${
            !enableSubmit ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />
      </form>
    </div>
  );
}

export default WithLogging(Login);
