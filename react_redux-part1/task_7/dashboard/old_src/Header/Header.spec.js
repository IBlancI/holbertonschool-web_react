import React from 'react';
import { render, screen, fireEvent  } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';
import AppContext, { defaultUser } from '../Context/context';

describe('Header', () => {
  test('renders the title', () => {
    render(<Header />);
    expect(screen.getByRole('heading', { name: /school dashboard/i })).toBeInTheDocument();
  });

  test('renders the Holberton logo with alt text', () => {
    render(<Header />);
    const img = screen.getByAltText(/holberton logo/i);
    expect(img).toBeInTheDocument();
    // optional: ensure it’s inside the correct container
    expect(img.closest('.App-header')).toBeInTheDocument();
  });
});

describe('Header (Task 3) - context / logout section', () => {
  test('does NOT render logoutSection with default context value', () => {
    // default context = user not logged in
    render(
      <AppContext.Provider value={{ user: defaultUser, logOut: () => {} }}>
        <Header />
      </AppContext.Provider>
    );

    expect(screen.queryByText(/welcome/i)).toBeNull();
    expect(screen.queryByText(/logout/i)).toBeNull();
    // expect(screen.queryByTestId?.('logoutSection')).toBeUndefined(); // just in case
    expect(screen.queryByTestId('logoutSection')).toBeNull();
    expect(document.querySelector('#logoutSection')).toBeNull();
  });

  test('renders logoutSection when user.isLoggedIn = true', () => {
    const user = {
      email: 'test@holberton.io',
      password: 'whatever',
      isLoggedIn: true,
    };

    render(
      <AppContext.Provider value={{ user, logOut: () => {} }}>
        <Header />
      </AppContext.Provider>
    );

    const section = document.querySelector('#logoutSection');
    expect(section).not.toBeNull();
    // expect(screen.getByText(/welcome test@holberton.io/i)).toBeInTheDocument();
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    expect(screen.getByText('test@holberton.io')).toBeInTheDocument();
    expect(screen.getByText(/\(logout\)/i)).toBeInTheDocument();
  });

  test('clicking on "logout" calls the logOut function from context', () => {
    const user = {
      email: 'test@holberton.io',
      password: 'whatever',
      isLoggedIn: true,
    };
    const logOut = jest.fn();

    render(
      <AppContext.Provider value={{ user, logOut }}>
        <Header />
      </AppContext.Provider>
    );

    const link = screen.getByText(/\(logout\)/i);
    fireEvent.click(link);

    expect(logOut).toHaveBeenCalledTimes(1);
  });
});
