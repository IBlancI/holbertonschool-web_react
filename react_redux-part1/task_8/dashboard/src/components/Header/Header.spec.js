import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Header from './Header';
import authReducer from '../../features/auth/authSlice';

const buildTestStore = (preloaded) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: preloaded,
  });
};

const renderWithStore = (component, preloaded) => {
  const store = buildTestStore(preloaded);
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

test('should contain a heading and an img element', () => {
  const preloaded = {
    auth: {
      user: { email: '', password: '' },
      isLoggedIn: false,
    },
  };

  renderWithStore(<Header />, preloaded);

  const headingElement = screen.getByRole('heading', { name: /school Dashboard/i });
  const imgElement = screen.getByAltText('holberton logo');

  expect(headingElement).toBeInTheDocument();
  expect(imgElement).toBeInTheDocument();
});

test('logoutSection is not rendered with default context value', () => {
  const preloaded = {
    auth: {
      user: { email: '', password: '' },
      isLoggedIn: false,
    },
  };

  renderWithStore(<Header />, preloaded);

  const logoutSection = screen.queryByText(/logout/i);
  expect(logoutSection).not.toBeInTheDocument();
});

test('logoutSection is rendered when user is logged in', () => {
  const preloaded = {
    auth: {
      user: { email: 'test@test.com', password: 'password123' },
      isLoggedIn: true,
    },
  };

  renderWithStore(<Header />, preloaded);

  const logoutSection = screen.getByText(/logout/i);
  expect(logoutSection).toBeInTheDocument();
  expect(screen.getByText(/test@test.com/i)).toBeInTheDocument();
});

test('clicking logout link dispatches the logout action', () => {
  const preloaded = {
    auth: {
      user: { email: 'test@test.com', password: 'password123' },
      isLoggedIn: true,
    },
  };

  const store = buildTestStore(preloaded);
  const dispatchSpy = jest.spyOn(store, 'dispatch');

  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );

  const logoutLink = screen.getByText(/logout/i);
  fireEvent.click(logoutLink);

  expect(dispatchSpy).toHaveBeenCalledWith(
    expect.objectContaining({
      type: 'auth/logout',
    })
  );
});
