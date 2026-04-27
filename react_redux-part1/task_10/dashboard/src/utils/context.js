// task_2/dashboard/src/Context/context.js
import React from 'react';

// Valeurs par défaut
export const defaultUser = {
  email: '',
  password: '',
  isLoggedIn: false,
};

// Fonction logOut par défaut (no-op)
export const defaultLogOut = () => {};

// Le contexte attendu par le checker (export default ONLY)
const AppContext = React.createContext({
  user: defaultUser,
  logOut: defaultLogOut,
});

export default AppContext;
