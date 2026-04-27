import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login.jsx';

describe('Login', () => {
  test('renders without crashing', () => {
    render(<Login />);
  });

  test('includes 2 labels, 2 inputs and 1 button', () => {
    const { container } = render(<Login />);
    expect(container.querySelectorAll('label')).toHaveLength(2);
    expect(container.querySelectorAll('input')).toHaveLength(2);
    expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument();
  });

  test('inputs get focused when the related label is clicked', async () => {
    const user = userEvent.setup();
    render(<Login />);

    const emailInput = screen.getByLabelText(/email/i);
    const pwdInput   = screen.getByLabelText(/password/i);
    const emailLabel = screen.getByText(/email/i);
    const pwdLabel   = screen.getByText(/password/i);

    await user.click(emailLabel);
    expect(emailInput).toHaveFocus();

    await user.click(pwdLabel);
    expect(pwdInput).toHaveFocus();
  });
});
