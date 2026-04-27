import React from 'react';
import { useSelector } from 'react-redux';

export default function Footer() {
  const user = useSelector((state) => state.auth.user);
  const year = new Date().getFullYear();

  return (
    <footer className="App-footer border-t-[3px] border-[var(--main-color)] py-2 text-center italic">
      <p>Copyright {year} - Holberton School</p>
      {user.isLoggedIn && (
        <p>
          <a href="#">Contact us</a>
        </p>
      )}
    </footer>
  );
}
