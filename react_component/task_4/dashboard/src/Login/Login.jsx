import React from 'react';
import './Login.css';
import WithLogging from '../HOC/WithLogging';

function Login() {
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

export default WithLogging(Login);