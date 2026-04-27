import { render, screen, fireEvent } from '@testing-library/react'
import Notifications from './Notifications'
import { getLatestNotification } from '../utils/utils'

const mockNotificationsList = [
    { id: 1, type: "default", value: "New course available" },
    { id: 2, type: "urgent", value: "New resume available" },
    { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
]

let consoleSpy

beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation()
})

afterEach(() => {
    consoleSpy.mockRestore()
})
test('Renders the notifications title', () => {
    render(<Notifications notifications={mockNotificationsList} displayDrawer={true} />)
    expect(screen.getByText(/^here is the list of notifications$/i)).toBeInTheDocument()
})

test('Renders a button in the notifications', () => {
    render(<Notifications displayDrawer={true} notifications={mockNotificationsList} />)
    expect(screen.getByRole('button', { name: /^close$/i })).toBeInTheDocument()
})

test('Renders exactly 3 li elements', () => {
    render(<Notifications notifications={mockNotificationsList} displayDrawer={true} />)
    expect(screen.getAllByRole('listitem').length).toBe(3)
})

test('Only renders the notification-title when displayDrawer is false', () => {
    render(<Notifications displayDrawer={false} />)
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument()

    expect(screen.queryByText(/^here is the list of notifications$/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /^close$/i })).not.toBeInTheDocument()
})

test('Renders p element, button and notifications item when displayDrawer is true', () => {
    render(<Notifications notifications={mockNotificationsList} displayDrawer={true} />)

    expect(screen.getByText(/^here is the list of notifications$/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^close$/i })).toBeInTheDocument()
    expect(screen.getAllByRole('listitem').length).toBe(3)
})

test('When simulating a click on a notification item, logs to the console the correct string', () => {
    const mockMarkAsRead = jest.fn()

    render(
            <Notifications
                notifications={mockNotificationsList}
                displayDrawer={true}
                markNotificationAsRead={mockMarkAsRead}
            />
    )
    const liItem = screen.getByText(/new course available/i)

    fireEvent.click(liItem)
    expect(mockMarkAsRead).toHaveBeenCalledWith(1)
})

test('Checks that clicking on the menu item calls handleDisplayDrawer', () => {
    const mockHandleDisplayDrawer = jest.fn()

    render(<Notifications displayDrawer={false} handleDisplayDrawer={mockHandleDisplayDrawer} />)
    const yourNotifications = screen.getByText(/your notifications/i)

    fireEvent.click(yourNotifications)
    expect(mockHandleDisplayDrawer).toHaveBeenCalled()
    mockHandleDisplayDrawer.mockRestore()
})

test('Checks that clicking on the close button calls handleHideDrawer', () => {
    const mockHandleHideDrawer = jest.fn()

    render(<Notifications displayDrawer={true} notifications={mockNotificationsList} handleHideDrawer={mockHandleHideDrawer} />)

    const closeButton = screen.getByRole('button', { name: /close/i })

    fireEvent.click(closeButton)
    expect(mockHandleHideDrawer).toHaveBeenCalled()
    mockHandleHideDrawer.mockRestore()
})