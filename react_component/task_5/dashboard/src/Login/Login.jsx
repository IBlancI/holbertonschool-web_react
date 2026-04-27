import React from 'react';
import './Login.css';
import WithLogging from '../HOC/WithLogging';

// export default function Login() {
//   return (
//     <div className="App-body">
//       <p>Login to access the full dashboard</p>
//       <label htmlFor="email">Email:</label>
//       <input id="email" type="email" />
//       <label htmlFor="password">Password:</label>
//       <input id="password" type="password" />
//       <button>OK</button>
//     </div>
//   );
// }
function Login() {
  return (
    <div className="App-body">
      <p>Login to access the full dashboard</p>
      <label htmlFor="email">Email:</label>
      <input id="email" type="email" />
      <label htmlFor="password">Password:</label>
      <input id="password" type="password" />
      <button>OK</button>
    </div>
  );
}

export default WithLogging(Login);
