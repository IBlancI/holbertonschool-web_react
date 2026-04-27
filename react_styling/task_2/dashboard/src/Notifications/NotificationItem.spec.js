import NotificationItem from './NotificationItem'
import { render, screen, fireEvent } from '@testing-library/react'

// test('Check whether the li element has the color blue, and the the attribute data-notification-type set to default', () => {
//   render(<NotificationItem type="default" value="Test notification" />);
//   const li = screen.getByText('Test notification');

//   expect(li).toBeInTheDocument();
//   expect(li).toHaveAttribute('data-notification-type', 'default');
//   expect(li).toHaveStyle('color: blue');
// })

// test('Check whether the li element has the color red, and the the attribute data-notification-type set to urgent', () => {
//   render(<NotificationItem type="urgent" value="Test urgent notification" />);
//   const li = screen.getByText('Test urgent notification');

//   expect(li).toBeInTheDocument();
//   expect(li).toHaveAttribute('data-notification-type', 'urgent');
//   expect(li).toHaveStyle('color: red');
// })

test('Check that this prop is called whenever the click event is triggered', () => {
  const markAsReadMock = jest.fn()
  const id = 1
  render(<NotificationItem id={id} type="default" value="Test notification" markAsRead={() => markAsReadMock(id)} />)
  const li = screen.getByText('Test notification')

  fireEvent.click(li)

  expect(markAsReadMock).toHaveBeenCalledWith(id)
})