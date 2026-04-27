import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";

test('renders 2 label elements, 2 input elements, and 1 button element', () => {
  const { container } = render(<Login />);

  const labels = container.querySelectorAll('label');
  const inputs = container.querySelectorAll('input');
  const buttons = container.querySelectorAll('button');

  expect(labels).toHaveLength(2);
  expect(inputs).toHaveLength(2);
  expect(buttons).toHaveLength(1);
});

test('input elements get focused when the related label is clicked', () => {
  render(<Login />);

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  fireEvent.click(screen.getByText(/email/i));
  expect(emailInput).toHaveFocus();

  fireEvent.click(screen.getByText(/password/i));
  expect(passwordInput).toHaveFocus();
});
