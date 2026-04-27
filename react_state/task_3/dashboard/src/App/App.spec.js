import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App component', () => {
  test('renders the notifications component', () => {
    render(<App />)
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument()
    expect(screen.queryByText(/here is the list of notifications/i)).toBeNull()
  })

  test('renders the header component', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: /school dashboard/i })
    ).toBeInTheDocument()
  })

  test('renders the login component by default', () => {
    render(<App />)
    expect(
      screen.getByText(/login to access the full dashboard/i)
    ).toBeInTheDocument()
  })

  test('renders the footer component', () => {
    render(<App />)
    expect(screen.getByText(/copyright/i)).toBeInTheDocument()
  })

  test('renders Login when user is not logged in', () => {
    render(<App />)
    expect(
      screen.getByText(/login to access the full dashboard/i)
    ).toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  test('renders CourseList when user logs in', async () => {
    const user = userEvent.setup()
    render(<App />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByDisplayValue(/ok/i)

    await user.type(emailInput, 'test@mail.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)

    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(
      screen.queryByText(/login to access the full dashboard/i)
    ).not.toBeInTheDocument()
  })

  test('calls logOut flow when control and h keys are pressed', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {})
    render(<App />)

    const event = new KeyboardEvent('keydown', {
      ctrlKey: true,
      key: 'h',
      bubbles: true,
    })
    document.dispatchEvent(event)

    expect(alertMock).toHaveBeenCalledWith('Logging you out')
    alertMock.mockRestore()
  })

  test('displays News from the School section with correct content', () => {
    render(<App />)

    expect(screen.getByText(/news from the school/i)).toBeInTheDocument()
    expect(
      screen.getByText(/ipsum lorem ipsum dolor sit amet consectetur/i)
    ).toBeInTheDocument()
  })

  test('displays logout section after login', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText(/email/i), 'test@mail.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByDisplayValue(/ok/i))

    expect(screen.getByText(/welcome test@mail.com/i)).toBeInTheDocument()
    expect(screen.getByText(/\(logout\)/i)).toBeInTheDocument()
  })

  test('logs out when clicking logout link', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText(/email/i), 'test@mail.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByDisplayValue(/ok/i))

    await user.click(screen.getByText(/\(logout\)/i))

    expect(
      screen.getByText(/login to access the full dashboard/i)
    ).toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })
})