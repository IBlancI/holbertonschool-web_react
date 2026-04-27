import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";

describe('Notifications', () => {
  const mockNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
  ];

  test('Check the existence of the notifications title Here is the list of notifications', () => {
    render(<Notifications listNotifications={mockNotifications} />);
    const notiftitle = screen.getByText(/Here is the list of notifications/i);

    expect(notiftitle).toBeInTheDocument();
  })

  test('Check the existence of the button element in the notifications', () => {
    render(<Notifications listNotifications={mockNotifications} />);
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  })

  test('Verify that there are 3 li elements as notifications rendered', () => {
    render(<Notifications listNotifications={mockNotifications} />);
    const lielements = screen.getAllByRole('listitem');

    expect(lielements.length).toBe(3);
  })

  test('Check whether clicking the close button logs Close button has been clicked to the console.', () => {
    const consolelog = jest.spyOn(console, 'log');
    render(<Notifications listNotifications={mockNotifications} />);
    const button = screen.getByRole('button', { name: /close/i });

    fireEvent.click(button);

    expect(consolelog).toHaveBeenCalledWith('Close button has been clicked');
  })
})