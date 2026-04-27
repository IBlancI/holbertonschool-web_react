import React from 'react';
import './Header.css';
import holbertonLogo from '../assets/holberton-logo.jpg'; // ou .jpg

export default function Header() {
  return (
    <header className="App-header">
      <img
        className="App-logo"
        // src="https://www.holbertonschool.com/holberton-logo.png"
        src={holbertonLogo}
        alt="Holberton logo"
      />
      <h1>School dashboard</h1>
    </header>
  );
}
