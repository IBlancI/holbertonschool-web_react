import { render, screen } from "@testing-library/react";
import Header from "./Header";

test('Header component contains the Holberton logo', () => {
  render(<Header />);
  const image = screen.getByAltText(/holberton logo/i);
  expect(image).toBeInTheDocument();
});

test('Header component contains a h1 heading element with correct text', () => {
  render(<Header />);
  const heading = screen.getByRole('heading', { level: 1 });
  expect(heading).toBeInTheDocument();
  expect(heading).toHaveTextContent(/school dashboard/i);
});
