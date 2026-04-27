import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentYear, getFooterCopy } from "../../utils/utils";
import { logout } from "../../features/auth/authSlice";

function Footer() {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <footer className="App-footer text-center text-sm border-t-4 border-[var(--main-color)] mt-10 py-4 text-gray-600">
      <p>
        Copyright {getCurrentYear()} - {getFooterCopy(true)}
      </p>

      {isLoggedIn && user ? (
        <p>
          Welcome {user.email} (
          <a
            href="#logout"
            onClick={handleLogout}
            style={{ color: "blue", cursor: "pointer" }}
          >
            logout
          </a>
          )
        </p>
      ) : (
        <p>
          <a href="#contact">Contact us</a>
        </p>
      )}
    </footer>
  );
}

export default Footer;
