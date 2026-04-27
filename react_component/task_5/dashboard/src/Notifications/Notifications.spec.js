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

  test('clicking on a notification item calls console.log with the right message', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});

    render(
      <Notifications
        displayDrawer={true}
        notifications={notificationsList}
      />
    );

    fireEvent.click(screen.getByText(/new course available/i));
    expect(spy).toHaveBeenCalledWith('Notification 1 has been marked as read');
  });

  test('does not re-render if the length of the notifications prop remains the same', () => {
    const shouldComponentUpdateSpy = jest.spyOn(
      Notifications.prototype,
      'shouldComponentUpdate'
    );

    const { rerender } = render(
      <Notifications
        displayDrawer={true}
        notifications={notificationsList}
      />
    );

    const newList = [
      { id: 4, type: 'default', value: 'test 1' },
      { id: 5, type: 'urgent', value: 'test 2' },
      { id: 6, type: 'urgent', value: 'test 3' },
    ];

    rerender(
      <Notifications
        displayDrawer={true}
        notifications={newList}
      />
    );

    expect(shouldComponentUpdateSpy).toHaveBeenCalled();
    expect(shouldComponentUpdateSpy).toHaveReturnedWith(false);
  });

  test('re-renders if the length of the notifications prop changes', () => {
    const shouldComponentUpdateSpy = jest.spyOn(
      Notifications.prototype,
      'shouldComponentUpdate'
    );

    const { rerender } = render(
      <Notifications
        displayDrawer={true}
        notifications={notificationsList}
      />
    );

    const newList = [
      ...notificationsList,
      { id: 4, type: 'default', value: 'test 4' },
    ];

    rerender(
      <Notifications
        displayDrawer={true}
        notifications={newList}
      />
    );

    expect(shouldComponentUpdateSpy).toHaveBeenCalled();
    expect(shouldComponentUpdateSpy).toHaveReturnedWith(true);
  });
});