import authReducer, { login, logout } from '../auth/authSlice';

test('The authSlice should return the correct initial state by default', () => {
    const state = authReducer(undefined, { type: 'unknown' });
    expect(state.user.email).toBe('');
    expect(state.user.password).toBe('');
    expect(state.isLoggedIn).toBe(false);
})

test('The authSlice updates the state correctly when the login action is dispatched', () => {
    const previousState = { user: { email: '', password: '' }, isLoggedIn: false };
    const action = login({ email: 'michelle.visage@dragrace.com', password: 'sashayaway'});
    const newState = authReducer(previousState, action);
    
    expect(newState.user.email).toBe('michelle.visage@dragrace.com');
    expect(newState.user.password).toBe('sashayaway')
    expect(newState.isLoggedIn).toBe(true);
})

test('The authSlice resets the state correctly when the logout action is dispatched', () => {
    const previousState = { user: { email: 'michelle.visage@dragrace.com', password: 'sashayaway' }, isLoggedIn: true };
    const action = logout()
    const newState = authReducer(previousState, action);

    expect(newState.user.email).toBe('');
    expect(newState.user.password).toBe('');
    expect(newState.isLoggedIn).toBe(false);
})
