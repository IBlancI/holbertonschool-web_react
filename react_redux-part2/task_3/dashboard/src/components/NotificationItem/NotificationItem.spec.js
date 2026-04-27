import { render, screen, fireEvent } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem', () => {
  const mockMarkAsRead = jest.fn();

  test('displays a default type notification', () => {
    render(
      <NotificationItem
        type="default"
        value="New course available"
        markAsRead={mockMarkAsRead}
        id={1}
      />
    );
    const item = screen.getByRole('listitem');
    expect(item).toHaveTextContent('New course available');
    expect(item).toHaveAttribute('data-notification-type', 'default');
  });

  test('displays an urgent type notification', () => {
    render(
      <NotificationItem
        type="urgent"
        value="Urgent requirement: System update needed"
        markAsRead={mockMarkAsRead}
        id={2}
      />
    );

    const item = screen.getByRole('listitem');
    expect(item).toHaveAttribute('data-notification-type', 'urgent');
    expect(item).toHaveTextContent('Urgent requirement: System update needed');
  });

  test('renders default notification showing its value text', () => {
    render(
      <NotificationItem
        type="default"
        value="New course available"
        markAsRead={mockMarkAsRead}
        id={1}
      />
    );

    const item = screen.getByRole('listitem');
    expect(item).toHaveAttribute('data-notification-type', 'default');
    expect(item).toHaveTextContent('New course available');
  });

  test('invokes markAsRead callback on click', () => {
    render(
      <NotificationItem
        type="default"
        value="New course available"
        markAsRead={mockMarkAsRead}
        id={1}
      />
    );
    const item = screen.getByRole('listitem');
    fireEvent.click(item);
    expect(mockMarkAsRead).toHaveBeenCalledTimes(1);
  });
});
