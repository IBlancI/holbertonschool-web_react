import authReducer, { login, logout } from '../auth/authSlice';

describe('authSlice', () => {
  const defaultState = {
    user: {
      email: '',
      password: '',
    },
    isLoggedIn: false,
  };

  test('should return the initial state by default', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(defaultState);
  });

  test('should update state correctly when login is dispatched', () => {
    const credentials = {
      email: 'test@example.com',
      password: 'password123',
    };

    const result = authReducer(defaultState, login(credentials));

    expect(result.user.email).toBe('test@example.com');
    expect(result.user.password).toBe('password123');
    expect(result.isLoggedIn).toBe(true);
  });

  test('should reset state correctly when logout is dispatched', () => {
    const loggedInState = {
      user: {
        email: 'test@example.com',
        password: 'password123',
      },
      isLoggedIn: true,
    };

    const result = authReducer(loggedInState, logout());

    expect(result.user.email).toBe('');
    expect(result.user.password).toBe('');
    expect(result.isLoggedIn).toBe(false);
  });

  test('should handle logout from initial state without errors', () => {
    const result = authReducer(defaultState, logout());
    expect(result).toEqual(defaultState);
  });
});
