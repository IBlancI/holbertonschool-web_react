import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    email: '',
    password: '',
    isLoggedIn: false,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;
      state.user = {
        email,
        password,
        isLoggedIn: true,
      };
    },
    logout: (state) => {
      state.user = {
        email: '',
        password: '',
        isLoggedIn: false,
      };
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
