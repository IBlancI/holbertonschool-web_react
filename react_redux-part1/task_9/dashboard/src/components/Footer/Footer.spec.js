import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';
import AppContext from '../../utils/context';

describe('Footer component (context consumer)', () => {
  test('renders copyright with current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();

    const p = screen.getByText(/copyright/i);
    expect(p).toBeInTheDocument();
    expect(p).toHaveTextContent(year);
  });

  test('does not display “Contact us” when user is logged out', () => {
    const contextValue = { user: { isLoggedIn: false } };
    render(
      <AppContext.Provider value={contextValue}>
        <Footer />
      </AppContext.Provider>
    );
    expect(screen.queryByText(/contact us/i)).toBeNull();
  });

  test('displays “Contact us” when user is logged in', () => {
    const contextValue = { user: { isLoggedIn: true } };
    render(
      <AppContext.Provider value={contextValue}>
        <Footer />
      </AppContext.Provider>
    );
    expect(screen.getByText(/contact us/i)).toBeInTheDocument();
  });
});
