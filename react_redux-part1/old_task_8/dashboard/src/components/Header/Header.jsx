import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import holbertonLogo from "../../assets/holberton-logo.jpg";

function Header() {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <header className="App-header flex items-center p-6">
      <img src={holbertonLogo} className="h-20 w-20" alt="Holberton logo" />
      <h1 className="text-[var(--main-color)] text-4xl font-bold ml-4">
        School dashboard
      </h1>

      {isLoggedIn && user && (
        <section id="logoutSection" className="ml-auto text-right">
          <p>
            Welcome {user.email} (
            <span
              onClick={handleLogout}
              style={{ cursor: "pointer", color: "blue" }}
            >
              logout
            </span>
            )
          </p>
        </section>
      )}
    </header>
  );
}

export default Header;
