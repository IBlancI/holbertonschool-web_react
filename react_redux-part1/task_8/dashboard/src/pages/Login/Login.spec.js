import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import authReducer from '../../features/auth/authSlice';

const buildTestStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
  });
};

const renderWithStore = (component) => {
  const store = buildTestStore();
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

test('testing signin form elements', () => {
  const { container } = renderWithStore(<Login />);

  const inputElements = container.querySelectorAll('input[type="email"], input[type="text"], input[type="password"]');

  const emailLabelElement = screen.getByLabelText(/email/i);
  const passwordLabelElement = screen.getByLabelText(/password/i);
  const buttonElementText = screen.getByRole('button', { name: 'OK' });

  expect(inputElements.length).toBeGreaterThanOrEqual(2);
  expect(emailLabelElement).toBeInTheDocument();
  expect(passwordLabelElement).toBeInTheDocument();
  expect(buttonElementText).toBeInTheDocument();
});

test('it should check that the email input is focused when label is clicked', async () => {
  renderWithStore(<Login />);

  const emailInput = screen.getByLabelText('Email');
  const emailLabel = screen.getByText('Email');

  userEvent.click(emailLabel);

  await waitFor(() => {
    expect(emailInput).toHaveFocus();
  });
});

test('it should check that the password input is focused when label is clicked', async () => {
  renderWithStore(<Login />);

  const passwordLabel = screen.getByText('Password');
  const passwordInput = screen.getByLabelText('Password');

  userEvent.click(passwordLabel);

  await waitFor(() => {
    expect(passwordInput).toHaveFocus();
  });
});

test('submit button is disabled by default', () => {
  renderWithStore(<Login />);
  const submitButton = screen.getByText('OK');

  expect(submitButton).toBeDisabled();
});

test('submit button is enabled only with a valid email and password of at least 8 characters', () => {
  renderWithStore(<Login />);

  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByText('OK');

  expect(submitButton).toBeDisabled();

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: '123' } });
  expect(submitButton).toBeDisabled();

  fireEvent.change(emailInput, { target: { value: 'test.com' } });
  fireEvent.change(passwordInput, { target: { value: '12345678' } });
  expect(submitButton).toBeDisabled();

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: '12345678' } });
  expect(submitButton).not.toBeDisabled();
});

test('should dispatch login action on form submission', () => {
  const store = buildTestStore();
  const dispatchSpy = jest.spyOn(store, 'dispatch');

  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  const form = screen.getByRole('form');
  fireEvent.submit(form);

  expect(dispatchSpy).toHaveBeenCalledWith(
    expect.objectContaining({
      type: 'auth/login',
      payload: { email: 'test@test.com', password: 'password123' },
    })
  );
});
