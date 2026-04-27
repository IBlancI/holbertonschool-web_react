import React from 'react';
import './Login.css';

export default function Login() {
  return (
    <div className="App-body">
      <p>Login to access the full dashboard</p>
      <div className="login-form">
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" />

        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" />

        <button type="button">OK</button>
      </div>
    </div>
  );
}
