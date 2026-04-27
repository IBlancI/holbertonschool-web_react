import { fireEvent, render, screen } from '@testing-library/react'
import NotificationItem from './NotificationItem'

test('markAsRead prop is called whenever the click event is triggered', () => {
    const mockMarkAsRead = jest.fn()
    render(<NotificationItem 
        markAsRead={mockMarkAsRead}
        type="default"
        value="New course available"
    />)

    const listItem = screen.getByRole('listitem')
    fireEvent.click(listItem)
    expect(mockMarkAsRead).toHaveBeenCalledTimes(1)
})