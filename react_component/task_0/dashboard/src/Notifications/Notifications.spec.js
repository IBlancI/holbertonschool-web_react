import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";
import { getLatestNotification } from "../utils/utils.js";

describe('Notifications', () => {
  const mockNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
  ];

  test('Check the existence of the notifications title Here is the list of notifications', () => {
    render(<Notifications notifications={mockNotifications} displayDrawer={true} />);
    const notiftitle = screen.getByText(/Here is the list of notifications/i);

    expect(notiftitle).toBeInTheDocument();
  })

  test('Check the existence of the button element in the notifications', () => {
    render(<Notifications notifications={mockNotifications} displayDrawer={true} />);
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  })

  test('Verify that there are 3 li elements as notifications rendered', () => {
    render(<Notifications notifications={mockNotifications} displayDrawer={true} />);
    const lielements = screen.getAllByRole('listitem');

    expect(lielements.length).toBe(3);
  })

  test('Check whether clicking the close button logs Close button has been clicked to the console.', () => {
    const consolelog = jest.spyOn(console, 'log');
    render(<Notifications notifications={mockNotifications} displayDrawer={true} />);
    const button = screen.getByRole('button', { name: /close/i });

    fireEvent.click(button);

    expect(consolelog).toHaveBeenCalledWith('Close button has been clicked');
  })
})

describe('Whenever the prop displayDrawer set to false', () => {
  test('Check that the Notifications component doesn t displays the elements', () => {
    const notifications = [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
      ];
    render(<Notifications notifications={notifications} displayDrawer={false} />);

    expect(screen.queryByText("Here is the list of notifications")).not.toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  })
})

describe('Whenever the the prop displayDrawer set to true', () => {
  test('Check that the Notifications component displays the elements', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
    ];
    render(<Notifications notifications={notifications} displayDrawer={true} />);

    expect(screen.queryByText("Here is the list of notifications")).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(3);
    expect(screen.queryByRole('button')).toBeInTheDocument();
  });

  test('Check that the Notifications component displays the elements', () => {
    const notifications = [];
    render(<Notifications notifications={notifications} displayDrawer={true} />);

    expect(screen.queryByText("No new notification for now")).toBeInTheDocument();
  });
})
