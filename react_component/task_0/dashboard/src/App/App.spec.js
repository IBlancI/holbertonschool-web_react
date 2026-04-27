// src/App/App.spec.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

/** Task 2 checks (sign-in form) */
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

/** Task 4 checks (conditional rendering) */
describe('App (Task 4)', () => {
  test('renders Login when isLoggedIn is false', () => {
    const { container } = render(<App isLoggedIn={false} />);
    // Login form visible
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    // CourseList not rendered
    expect(container.querySelector('#CourseList')).toBeNull();
  });

  test('renders CourseList when isLoggedIn is true', () => {
    const { container } = render(<App isLoggedIn />);
    // CourseList table present
    expect(container.querySelector('#CourseList')).not.toBeNull();
    // Login form not visible
    expect(screen.queryByLabelText(/email/i)).toBeNull();
    expect(screen.queryByLabelText(/password/i)).toBeNull();
  });
});
