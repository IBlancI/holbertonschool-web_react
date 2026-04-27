import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

test('input elements get focused when the related label is clicked', async () => {
  render(<Login />);
  const user = userEvent.setup();

  const emailInput = screen.getByLabelText(/email/i);
  await user.click(emailInput.labels[0]);
  expect(emailInput).toHaveFocus();

  const passwordInput = screen.getByLabelText(/password/i);
  await user.click(passwordInput.labels[0]);
  expect(passwordInput).toHaveFocus();
});
