import { render, screen, fireEvent } from '@testing-library/react';
import NotificationItem from './NotificationItem';

test('it should call markAsRead with the correct id when clicked', () => {
  const mockMarkAsRead = jest.fn();
  const props = {
    id: 42,
    type: 'default',
    value: 'Test notification',
    markAsRead: mockMarkAsRead,
  };

  render(<NotificationItem {...props} />);
  const liElement = screen.getByRole('listitem');

  fireEvent.click(liElement);
  expect(mockMarkAsRead).toHaveBeenCalledTimes(1);
  expect(mockMarkAsRead).toHaveBeenCalledWith(42);
});

describe('NotificationItem - React.memo behavior', () => {
  let markAsRead;

  beforeEach(() => {
    jest.clearAllMocks();
    markAsRead = jest.fn();
  });

  test('should update when props change', () => {
    const { rerender, container } = render(
      <NotificationItem
        id={1}
        type="urgent"
        value="New notification"
        markAsRead={markAsRead}
      />
    );

    const firstContent = container.querySelector('[data-notification-type]').textContent;

    rerender(
      <NotificationItem
        id={1}
        type="urgent"
        value="Updated notification"
        markAsRead={markAsRead}
      />
    );

    const secondContent = container.querySelector('[data-notification-type]').textContent;
    expect(secondContent).not.toBe(firstContent);
    expect(secondContent).toBe('Updated notification');
  });

  test('should not re-render when props do not change', () => {
    const { rerender, container } = render(
      <NotificationItem
        id={1}
        type="urgent"
        value="New notification"
        markAsRead={markAsRead}
      />
    );

    const firstEl = container.querySelector('[data-notification-type]');

    rerender(
      <NotificationItem
        id={1}
        type="urgent"
        value="New notification"
        markAsRead={markAsRead}
      />
    );

    const secondEl = container.querySelector('[data-notification-type]');
    expect(secondEl.textContent).toBe(firstEl.textContent);
  });
});
