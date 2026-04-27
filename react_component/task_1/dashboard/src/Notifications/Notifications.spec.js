import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Notifications from './Notifications';
import { getLatestNotification } from '../utils/utils';
import '@testing-library/jest-dom';

jest.mock('../assets/close-button.png', () => 'close-button.png');
jest.mock('./Notifications.css', () => ({}), { virtual: true });

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

describe('Notifications component', () => {
  const notificationsList = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
  ];

  test('always displays "Your notifications"', () => {
    render(<Notifications />);
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });

  test('does not display the drawer when displayDrawer is false', () => {
    render(
      <Notifications
        displayDrawer={false}
        notifications={notificationsList}
      />
    );

    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
    expect(
      screen.queryByText(/here is the list of notifications/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /close/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/new course available/i)
    ).not.toBeInTheDocument();
  });

  test('displays the drawer when displayDrawer is true', () => {
    render(
      <Notifications
        displayDrawer={true}
        notifications={notificationsList}
      />
    );

    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
    expect(
      screen.getByText(/here is the list of notifications/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /close/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/new course available/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/new resume available/i)
    ).toBeInTheDocument();
  });

  test('displays "No new notification for now" when displayDrawer is true and notifications is empty', () => {
    render(<Notifications displayDrawer={true} notifications={[]} />);

    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
    expect(
      screen.getByText(/no new notification for now/i)
    ).toBeInTheDocument();
  });

  test('clicking the Close button logs the expected message', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});

    render(
      <Notifications
        displayDrawer={true}
        notifications={notificationsList}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(spy).toHaveBeenCalledWith('Close button has been clicked');
  });
});