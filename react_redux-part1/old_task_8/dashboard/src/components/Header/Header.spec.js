import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, jest } from "@jest/globals";
import Header from "./Header.jsx";

test("renders logo and header title", () => {
  const user = { email: "", password: "", isLoggedIn: false };
  render(<Header user={user} logOut={jest.fn()} />);

  expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { level: 1, name: /School dashboard/i })
  ).toBeInTheDocument();
});

test("does not render logoutSection when user is not logged in", () => {
  const user = { email: "", password: "", isLoggedIn: false };
  render(<Header user={user} logOut={jest.fn()} />);

  const logoutSection = screen.queryByText(/logout/i);
  expect(logoutSection).not.toBeInTheDocument();
});

test("renders logoutSection when user is logged in", () => {
  const user = {
    email: "user@test.com",
    password: "password123",
    isLoggedIn: true,
  };
  render(<Header user={user} logOut={jest.fn()} />);

  const logoutSection = screen.getByText(/logout/i);
  expect(logoutSection).toBeInTheDocument();
  expect(screen.getByText(/Welcome user@test.com/i)).toBeInTheDocument();
});

test("clicking logout calls logOut function", () => {
  const user = {
    email: "user@test.com",
    password: "password123",
    isLoggedIn: true,
  };
  const logOutSpy = jest.fn();

  render(<Header user={user} logOut={logOutSpy} />);

  const logoutLink = screen.getByText(/logout/i);
  fireEvent.click(logoutLink);

  expect(logOutSpy).toHaveBeenCalled();
});
