import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './src/App/App.jsx';

describe('App (Task 2) - sign in form', () => {
  test('renders two input elements (email and password)', () => {
    const { container } = render(<App />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(container.querySelectorAll('input')).toHaveLength(2);
  });

  test('renders two labels with texts "Email" and "Password"', () => {
    render(<App />);
    expect(screen.getByText(/email/i).tagName).toBe('LABEL');
    expect(screen.getByText(/password/i).tagName).toBe('LABEL');
  });

  test('renders a button with text OK', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument();
  });
});
