import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";

test('Check the existence of the notifications title Here is the list of notifications', () => {
  render(<Notifications />);
  const notiftitle = screen.getByText(/Here is the list of notifications/i);

  expect(notiftitle).toBeInTheDocument();
})

test('Check the existence of the button element in the notifications', () => {
  render(<Notifications />);
  const button = screen.getByRole('button');

  expect(button).toBeInTheDocument();
})

test('Verify that there are 3 li elements as notifications rendered', () => {
  render(<Notifications />);
  const lielements = screen.getAllByRole('listitem');

  expect(lielements.length).toBe(3);
})

test('Check whether clicking the close button logs Close button has been clicked to the console.', () => {
  const consolelog = jest.spyOn(console, 'log');
  render(<Notifications />);
  const button = screen.getByRole('button', { name: /close/i });

  fireEvent.click(button);

  expect(consolelog).toHaveBeenCalledWith('Close button has been clicked');
})