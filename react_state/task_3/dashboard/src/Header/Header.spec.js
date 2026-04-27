import { render, screen, fireEvent } from '@testing-library/react'
import Header from './Header'
import AppContext from '../Context/context.js'

export const convertHexToRGBA = (hexCode) => {
  let hex = hexCode.replace('#', '')

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return { r, g, b }
}

describe('Header', () => {
  test('should contain an h1 and an img', () => {
    render(<Header />)

    const headingElement = screen.getByRole('heading', {
      name: /school dashboard/i,
    })
    const imgElement = screen.getByAltText('holberton logo')

    expect(headingElement).toBeInTheDocument()
    expect(headingElement).toHaveStyle({
      color: `rgb(${convertHexToRGBA('#e1003c').r}, ${convertHexToRGBA('#e1003c').g}, ${convertHexToRGBA('#e1003c').b})`,
    })
    expect(imgElement).toBeInTheDocument()
  })

  test('does not display logoutSection with default context value', () => {
    render(<Header />)
    expect(screen.queryByText(/logout/i)).not.toBeInTheDocument()
  })

  test('displays logoutSection when user is logged in', () => {
    const contextValue = {
      user: {
        email: 'test@mail.com',
        password: 'password123',
        isLoggedIn: true,
      },
      logOut: jest.fn(),
    }

    render(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    )

    expect(screen.getByText(/welcome test@mail.com/i)).toBeInTheDocument()
    expect(screen.getByText(/\(logout\)/i)).toBeInTheDocument()
  })

  test('calls logOut when clicking on logout link', () => {
    const logOutMock = jest.fn((e) => e.preventDefault())
    const contextValue = {
      user: {
        email: 'test@mail.com',
        password: 'password123',
        isLoggedIn: true,
      },
      logOut: logOutMock,
    }

    render(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    )

    fireEvent.click(screen.getByText(/\(logout\)/i))
    expect(logOutMock).toHaveBeenCalled()
  })
})