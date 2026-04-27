import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, jest } from "@jest/globals";
import Login from "./Login.jsx";

test("renders 2 input elements (email and password)", () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

test("renders a submit input with text OK", () => {
  render(<Login />);
  const submitInput = screen.getByDisplayValue(/ok/i);
  expect(submitInput).toBeInTheDocument();
});

test("submit button is disabled by default", () => {
  render(<Login />);
  const submitInput = screen.getByDisplayValue(/ok/i);
  expect(submitInput).toBeDisabled();
});

test("submit button enables when email and password are valid", () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitInput = screen.getByDisplayValue(/ok/i);

  fireEvent.change(emailInput, { target: { value: "test@test.com" } });
  fireEvent.change(passwordInput, { target: { value: "12345678" } });

  expect(submitInput).toBeEnabled();
});

test("calls logIn with email and password when form is submitted", () => {
  const mockLogIn = jest.fn();

  render(<Login logIn={mockLogIn} />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitInput = screen.getByDisplayValue(/ok/i);

  // Simulate user input
  fireEvent.change(emailInput, { target: { value: "user@test.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });

  // Submit form
  fireEvent.click(submitInput);

  // Check that logIn was called correctly
  expect(mockLogIn).toHaveBeenCalledWith("user@test.com", "password123");
});
