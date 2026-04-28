import { fireEvent, render, screen } from '@testing-library/react';
import Login from './Login';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../app/rootReducer';

const createTestStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

const notLoggedInState = {
  auth: {
    isLoggedIn: false,
    user: {
      email: "",
      password: "",
    }
  },
  notifications: {
    notifications: [],
    displayDrawer: true
  },
  courses: {
    courses: []
  }
};

test('testing signin form elements', () => {
  const store = createTestStore(notLoggedInState);

  const { container } = render(
    <Provider store={store}>
      <Login />
      </Provider>);

  const inputElements = container.querySelectorAll('input[type="email"], input[type="text"], input[type="password"]');

  const emailLabelElement = screen.getByLabelText(/email/i);
  const passwordLabelElement = screen.getByLabelText(/password/i);
  const buttonElementText = screen.getByRole('button', { name: 'OK' })

  expect(inputElements.length).toBeGreaterThanOrEqual(2);
  expect(emailLabelElement).toBeInTheDocument();
  expect(passwordLabelElement).toBeInTheDocument();
  expect(buttonElementText).toBeInTheDocument();
});


test('isLoggedIn is set to true only with a valid email and password of at least 8 characters', () => {
  const store = createTestStore(notLoggedInState);

  render(
    <Provider store={store}>
      <Login />
    </Provider>);

  
  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByText('OK');

  fireEvent.change(emailInput, { target: { value: 'rupaul@dragrace.com' } });
  fireEvent.change(passwordInput, { target: { value: 'TheLibraryIsOpen' } });
  fireEvent.click(submitButton);
  
  expect(store.getState().auth.isLoggedIn).toBe(true);
});

test('isLoggedIn is set to false when submitting an invalid email and password', () => {
  const store = createTestStore(notLoggedInState);

  render(
    <Provider store={store}>
      <Login />
    </Provider>);

  
  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByText('OK');

  fireEvent.change(emailInput, { target: { value: 'rupaul' } });
  fireEvent.change(passwordInput, { target: { value: 'open' } });
  
  expect(submitButton).toBeDisabled();
  expect(store.getState().auth.isLoggedIn).toBe(false);
});