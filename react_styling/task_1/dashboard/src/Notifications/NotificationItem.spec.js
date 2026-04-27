import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotificationItem from './NotificationItem';

describe('NotificationItem component', () => {
  test('default → data-notification-type="default" et couleur bleu', () => {
    render(
      <ul>
        <NotificationItem id={1} type="default" value="Default note" />
      </ul>
    );

    const li = screen.getByRole('listitem');
    expect(li).toHaveAttribute('data-notification-type', 'default');
    expect(li).toHaveStyle({ color: 'blue' });
    expect(li).toHaveTextContent('Default note');
  });

  test('urgent → data-notification-type="urgent" et couleur rouge', () => {
    render(
      <ul>
        <NotificationItem id={2} type="urgent" value="Urgent note" />
      </ul>
    );

    const li = screen.getByRole('listitem');
    expect(li).toHaveAttribute('data-notification-type', 'urgent');
    expect(li).toHaveStyle({ color: 'red' });
    expect(li).toHaveTextContent('Urgent note');
  });

  test('calls markAsRead when clicked', () => {
    const markAsReadMock = jest.fn();

    render(
      <ul>
        <NotificationItem
          id={3}
          type="default"
          value="Click me"
          markAsRead={markAsReadMock}
        />
      </ul>
    );

    fireEvent.click(screen.getByRole('listitem'));
    expect(markAsReadMock).toHaveBeenCalledTimes(1);
    expect(markAsReadMock).toHaveBeenCalledWith(3);
  });
});