import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, jest } from "@jest/globals";
import Footer from "./Footer.jsx";
import React from "react";

test("renders copyright text", () => {
  const user = { email: "", password: "", isLoggedIn: false };
  render(<Footer user={user} logOut={jest.fn()} />);
  expect(screen.getByText(/Copyright/i)).toBeInTheDocument();
});

test('displays "Contact us" when user is logged out', () => {
  const user = { email: "", password: "", isLoggedIn: false };
  render(<Footer user={user} logOut={jest.fn()} />);
  const contactLink = screen.getByText(/Contact us/i);
  expect(contactLink).toBeInTheDocument();
});

test('displays welcome message and logout link when user is logged in', () => {
  const user = { email: "user@test.com", password: "password123", isLoggedIn: true };
  const logOutSpy = jest.fn();

  render(<Footer user={user} logOut={logOutSpy} />);

  const welcomeMessage = screen.getByText(/Welcome user@test.com/i);
  const logoutLink = screen.getByText(/Logout/i);

  expect(welcomeMessage).toBeInTheDocument();
  expect(logoutLink).toBeInTheDocument();

  fireEvent.click(logoutLink);
  expect(logOutSpy).toHaveBeenCalled();
});
