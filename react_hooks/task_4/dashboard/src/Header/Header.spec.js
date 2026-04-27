import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from './Header'
// eslint-disable-next-line no-unused-vars
import newContext from '../Context/context'

test('renders the Holberton logo in the header component ', () => {
    render(<Header />)
    expect(screen.getByAltText(/^holberton logo$/i)).toBeInTheDocument()
})

test('renders the h1 element with correct text', () => {
    render(<Header />)
    expect(screen.getByRole('heading', {level: 1, name: /^school dashboard$/i})).toBeInTheDocument()
})

test('Does not render logoutSection with default context', () => {
    const { container } = render(<Header />)
    
    const logoutSection = container.querySelector("#logoutSection")
    
    expect(logoutSection).not.toBeInTheDocument()
})

test('renders logoutSection when provided user context', () => {
    const loggedInUser = {
        email: 'rosa.diaz@nypd.com',
        password: 'badpassword',
        isLoggedIn: true
  }
  
  const mockLogOut = jest.fn()
  
  const { container } = render(
    <newContext.Provider value={{ user: loggedInUser, logOut: mockLogOut }}>
      <Header />
    </newContext.Provider>
  )
  
  const logoutSection = container.querySelector("#logoutSection")
  expect(logoutSection).toBeInTheDocument()
  
  expect(screen.getByText(/rosa.diaz@nypd.com/)).toBeInTheDocument()
})

test('Clicking logout link calls logOut function', async () => {
  const user = userEvent.setup()
  
  const loggedInUser = {
    email: 'rosa.diaz@nypd.com',
    password: 'badpassword',
    isLoggedIn: true
  }
  
  const mockLogOut = jest.fn()
  
  render(
    <newContext.Provider value={{ user: loggedInUser, logOut: mockLogOut }}>
      <Header />
    </newContext.Provider>
  )
  
  const logoutLink = screen.getByText(/logout/)
  
  await user.click(logoutLink)
  
  expect(mockLogOut).toHaveBeenCalledTimes(1)
})