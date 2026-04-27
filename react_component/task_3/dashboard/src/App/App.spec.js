import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
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

/** Task 4 checks from previous project step */
describe('App - conditional rendering', () => {
  test('renders Login when isLoggedIn is false', () => {
    const { container } = render(<App isLoggedIn={false} />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(container.querySelector('#CourseList')).toBeNull();
  });

  test('renders CourseList when isLoggedIn is true', () => {
    const { container } = render(<App isLoggedIn />);
    expect(container.querySelector('#CourseList')).not.toBeNull();
    expect(screen.queryByLabelText(/email/i)).toBeNull();
    expect(screen.queryByLabelText(/password/i)).toBeNull();
  });
});

/** Lifecycle tests */
describe('App - keyboard events', () => {
  let alertMock;

  beforeEach(() => {
    alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    alertMock.mockRestore();
  });

  test('calls logOut when ctrl + h is pressed', () => {
    const logOutMock = jest.fn();
    render(<App logOut={logOutMock} />);

    fireEvent.keyDown(document, { key: 'h', ctrlKey: true });

    expect(logOutMock).toHaveBeenCalledTimes(1);
  });

  test('calls alert with "Logging you out" when ctrl + h is pressed', () => {
    const logOutMock = jest.fn();
    render(<App logOut={logOutMock} />);

    fireEvent.keyDown(document, { key: 'h', ctrlKey: true });

    expect(window.alert).toHaveBeenCalledWith('Logging you out');
  });
});

/** Task 4 new component usage */
describe('App - BodySection usage', () => {
  test('displays News from the School and the news paragraph by default', () => {
    render(<App />);
    expect(screen.getByText(/news from the school/i)).toBeInTheDocument();
    expect(
      screen.getByText(/holberton school news goes here/i)
    ).toBeInTheDocument();
  });
});