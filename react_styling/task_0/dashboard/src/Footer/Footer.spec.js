import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer.jsx';

describe('Footer', () => {
  test('renders without crashing', () => {
    render(<Footer isIndex />);
  });

  test('renders "Copyright {current year} - Holberton School"', () => {
    render(<Footer isIndex />); // <- important : isIndex = true
    const year = new Date().getFullYear();
    const regex = new RegExp(`Copyright\\s+${year}\\s+-\\s+Holberton School`, 'i');
    expect(screen.getByText(regex)).toBeInTheDocument();
  });
});
