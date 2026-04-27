import { render, screen } from '@testing-library/react'
import Footer from './Footer'
import { getFooterCopy, getCurrentYear } from '../utils/utils'
// eslint-disable-next-line no-unused-vars
import newContext from '../Context/context'


test('renders a p element string Copyright {the current year} - Holberton School, whenever the getFooterCopy() “isIndex” argument is set to true', () => {
    render(<Footer isIndex={true}/>)

    const currentYear = getCurrentYear()
    const footerCopy = getFooterCopy(true)
    expect(screen.getByText(new RegExp(`copyright ${currentYear} - ${footerCopy}`, 'i'))).toBeInTheDocument()
})

test('Does not render the "Contact us" link when user is logged out', () => {
    const loggedOutUser = {
        email: '',
        password: '',
        isLoggedIn: false
    }
    const mockLogOut = jest.fn()
    render(<newContext.Provider value={{ user: loggedOutUser, logOut: mockLogOut}}>
        <Footer />
    </newContext.Provider>)

    expect(screen.queryByText(/contact us/i)).not.toBeInTheDocument()
})

test('Renders the "Contact us" link when user is logged in', () => {
    const loggedInUser = {
        email: 'leslie.knope@pawnee.com',
        password: 'ILoveWaffles',
        isLoggedIn: true
    }
    render(<newContext.Provider value={{ user: loggedInUser}}>
        <Footer />
    </newContext.Provider>)

    expect(screen.getByText(/contact us/i)).toBeInTheDocument()
})