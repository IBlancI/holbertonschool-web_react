import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import holbertonLogo from '../../assets/holberton-logo.jpg';
import { logout } from '../../features/auth/authSlice';

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <header className="App-header flex items-center p-[10px]">
      <img
        className="App-logo h-[200px] mr-5"
        src={holbertonLogo}
        alt="Holberton logo"
      />
      <h1 className="text-[var(--main-color)] text-4xl font-bold">
        School Dashboard
      </h1>

      {user.isLoggedIn && (
        <div id="logoutSection" data-testid="logoutSection" className="text-sm mt-2 ml-3">
          <span>
            Welcome <strong>{user.email}</strong>{' '}
          </span>
          <a href="#logout" onClick={handleLogout} className="text-blue-500 underline">
            (logout)
          </a>
        </div>
      )}
    </header>
  );
}
