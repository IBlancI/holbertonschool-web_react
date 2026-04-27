import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from './Header'

test('renders the Holberton logo in the header component ', () => {
  render(<Header />)
  expect(screen.getByAltText(/^holberton logo$/i)).toBeInTheDocument()
})

test('renders the h1 element with correct text', () => {
  render(<Header />)
  expect(
    screen.getByRole('heading', { level: 1, name: /^school dashboard$/i })
  ).toBeInTheDocument()
})

test('Does not render logoutSection with default props', () => {
  const { container } = render(<Header />)
  const logoutSection = container.querySelector('#logoutSection')
  expect(logoutSection).not.toBeInTheDocument()
})

test('renders logoutSection when provided logged in user props', () => {
  const loggedInUser = {
    email: 'rosa.diaz@nypd.com',
    password: 'badpassword',
    isLoggedIn: true
  }

  const mockLogOut = jest.fn()

  const { container } = render(
    <Header user={loggedInUser} logOut={mockLogOut} />
  )

  const logoutSection = container.querySelector('#logoutSection')
  expect(logoutSection).toBeInTheDocument()
  expect(screen.getByText(/rosa.diaz@nypd.com/)).toBeInTheDocument()
})

test('Clicking logout link calls logOut function', async () => {
  const userEventSetup = userEvent.setup()

  const loggedInUser = {
    email: 'rosa.diaz@nypd.com',
    password: 'badpassword',
    isLoggedIn: true
  }

  const mockLogOut = jest.fn()

  render(<Header user={loggedInUser} logOut={mockLogOut} />)

  const logoutLink = screen.getByText(/logout/i)
  await userEventSetup.click(logoutLink)

  expect(mockLogOut).toHaveBeenCalledTimes(1)
})