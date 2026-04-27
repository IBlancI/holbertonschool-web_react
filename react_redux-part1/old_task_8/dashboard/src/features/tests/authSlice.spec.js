import authReducer, { login, logout } from '../auth/authSlice';

describe('authSlice', () => {
  const initialState = {
    user: {
      email: '',
      password: '',
    },
    isLoggedIn: false,
  };

  it('should return the correct initial state by default', () => {
    const state = authReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('should update the state correctly when login action is dispatched', () => {
    const loginPayload = {
      email: 'test@example.com',
      password: 'password123',
    };

    const state = authReducer(initialState, login(loginPayload));

    expect(state.user.email).toBe('test@example.com');
    expect(state.user.password).toBe('password123');
    expect(state.isLoggedIn).toBe(true);
  });

  it('should reset the state correctly when logout action is dispatched', () => {
    const loggedInState = {
      user: {
        email: 'test@example.com',
        password: 'password123',
      },
      isLoggedIn: true,
    };

    const state = authReducer(loggedInState, logout());

    expect(state.user.email).toBe('');
    expect(state.user.password).toBe('');
    expect(state.isLoggedIn).toBe(false);
  });

  it('should handle logout from initial state without errors', () => {
    const state = authReducer(initialState, logout());
    expect(state).toEqual(initialState);
  });
});