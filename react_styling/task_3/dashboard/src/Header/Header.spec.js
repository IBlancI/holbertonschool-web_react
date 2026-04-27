import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header.jsx';

describe('Header', () => {
  test('renders without crashing', () => {
    render(<Header />);
  });

  test('contains the Holberton logo', () => {
    render(<Header />);
    // alt attendu dans Header.jsx : "holberton logo"
    expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
  });

  test('contains an h1 with the correct text', () => {
    const { container } = render(<Header />);
    const h1 = container.querySelector('h1');
    expect(h1).toBeInTheDocument();
    expect(h1).toHaveTextContent(/school dashboard/i);
  });
});
