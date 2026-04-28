import { render, screen } from '@testing-library/react';
import Footer from './Footer';
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

const isLoggedInState = {
  auth: {
    isLoggedIn: true,
    user: {
      email: "nickydoll@dragrace.fr",
      password: "pichecometrue",
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

test('It should render footer with copyright text', () => {
  const store = createTestStore(notLoggedInState)

  render(
    <Provider store={store}>
      <Footer />
    </Provider>)

  const footerParagraph = screen.getByText(/copyright/i);

  expect(footerParagraph).toHaveTextContent(new RegExp(`copyright ${(new Date()).getFullYear()}`, 'i'))
  expect(footerParagraph).toHaveTextContent(/holberton school/i)
});

test('Contact us link is not displayed when user is logged out', () => {
  const store = createTestStore(notLoggedInState)

  render(
    <Provider store={store}>
      <Footer />
    </Provider>)
  const contactLink = screen.queryByText(/contact us/i);
  expect(contactLink).not.toBeInTheDocument();
});

test('Contact us link is displayed when user is logged in', () => {
  const store = createTestStore(isLoggedInState)

  render(
    <Provider store={store}>
      <Footer />
    </Provider>)

  const contactLink = screen.getByText(/contact us/i);
  expect(contactLink).toBeInTheDocument();
});