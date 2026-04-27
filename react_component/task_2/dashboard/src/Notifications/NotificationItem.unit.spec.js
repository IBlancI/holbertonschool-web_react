// task_2/dashboard/src/Notifications/NotificationItem.unit.spec.js
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import NotificationItem from './NotificationItem.jsx';
import Notifications from './Notifications.jsx';

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

describe('NotificationItem — unit', () => {
  test('calls markAsRead(id) on click (value path)', () => {
    const onMark = jest.fn();

    render(
      <ul>
        <NotificationItem id={42} type="default" value="Hello" markAsRead={onMark} />
      </ul>
    );

    fireEvent.click(screen.getByRole('listitem'));
    expect(onMark).toHaveBeenCalledTimes(1);
    expect(onMark).toHaveBeenCalledWith(42);
  });

  test('calls markAsRead(id) on click (html path)', () => {
    const onMark = jest.fn();

    render(
      <ul>
        <NotificationItem
          id={99}
          type="urgent"
          html={{ __html: '<strong>Danger</strong>' }}
          markAsRead={onMark}
        />
      </ul>
    );

    fireEvent.click(screen.getByRole('listitem'));
    expect(onMark).toHaveBeenCalledTimes(1);
    expect(onMark).toHaveBeenCalledWith(99);
  });
});

describe('Notifications — integration surface', () => {
  test('passes markAsRead and logs the correct message when an item is clicked', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const sample = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' }, // on cliquera celui-ci
      { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong>' } },
    ];

    render(<Notifications notifications={sample} displayDrawer={true} />);

    fireEvent.click(screen.getByText('New resume available'));
    expect(logSpy).toHaveBeenCalledWith('Notification 2 has been marked as read');

    logSpy.mockRestore();
  });
});

