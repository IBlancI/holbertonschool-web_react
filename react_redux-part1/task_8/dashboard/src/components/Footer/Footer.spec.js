import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Footer from './Footer';
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

test('It should render footer with copyright text', () => {
  const preloaded = {
    auth: {
      user: { email: '', password: '' },
      isLoggedIn: false,
    },
  };

  renderWithStore(<Footer />, preloaded);

  const footerParagraph = screen.getByText(/copyright/i);
  expect(footerParagraph).toHaveTextContent(new RegExp(`copyright ${(new Date()).getFullYear()}`, 'i'));
  expect(footerParagraph).toHaveTextContent(/holberton school/i);
});

test('Contact us link is not displayed when user is logged out', () => {
  const preloaded = {
    auth: {
      user: { email: '', password: '' },
      isLoggedIn: false,
    },
  };

  renderWithStore(<Footer />, preloaded);

  const contactLink = screen.queryByText(/contact us/i);
  expect(contactLink).not.toBeInTheDocument();
});

test('Contact us link is displayed when user is logged in', () => {
  const preloaded = {
    auth: {
      user: { email: 'test@test.com', password: 'password123' },
      isLoggedIn: true,
    },
  };

  renderWithStore(<Footer />, preloaded);

  const contactLink = screen.getByText(/contact us/i);
  expect(contactLink).toBeInTheDocument();
});
