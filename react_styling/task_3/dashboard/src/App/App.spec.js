import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test('App component', () => {
  render(<App />);
});

test('should call logOut function when ctrl+h is pressed', () => {
  // Create a mock function for logOut prop
  const logOutMock = jest.fn();
  // Spy alert and mock alert popup
  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

  // Render the component with the mock logOut function
  render(<App logOut={logOutMock} />);

  // Simulate the keydown event (Ctrl+h)
  fireEvent.keyDown(document, { key: 'h', ctrlKey: true });

  expect(alertSpy).toHaveBeenCalledWith('Logging you out');
  expect(logOutMock).toHaveBeenCalledTimes(1);

  // Restore alert after test
  alertSpy.mockRestore();
});

test('Check that a title of Course list is displayed above the CourseList component when the isLoggedIn prop is set to true.', () => {
  render(<App isLoggedIn={true} />);

  const heading = screen.getByRole('heading', { level: 2, name: /Course list/i});
   expect(heading).toBeInTheDocument();
});

test('displays "Log in to continue" title when isLoggedIn is false', () => {
  render(<App isLoggedIn={false} />);
  const text = screen.getByText(/Log in to continue/i);
  expect(text).toBeInTheDocument();
});

test('Check that a title "News from the School" and paragraph are displayed by default', () => {
  render(<App />);

  const heading = screen.getByRole('heading', { level: 2, name: /News from the School/i });
  const paragraph = screen.getByText(/Holberton School News goes here/i);

  expect(heading).toBeInTheDocument();
  expect(paragraph).toBeInTheDocument();
});