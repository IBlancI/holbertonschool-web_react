import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from './Login'

let consoleSpy

beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation()
})

afterEach(() => {
    consoleSpy.mockRestore()
})

test('renders 2 labels, 2 inputs and 1 button element', () => {
    const { container } = render(<Login />)
    
    const labels = container.querySelectorAll('label')
    expect(labels).toHaveLength(2)

    const inputs = container.querySelectorAll('input')
    expect(inputs).toHaveLength(2)

    const button = container.querySelectorAll('button')
    expect(button).toHaveLength(1)

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /ok/i})).toBeInTheDocument()
})

test('inputs elements get focused whenever the related label is clicked', async () => {
    const user = userEvent.setup()
    render(<Login />)
    const emailInput = screen.getByLabelText(/email/i)

    await user.click(emailInput)
    expect(emailInput).toHaveFocus()

    const passwordInput = screen.getByLabelText(/password/i)

    await user.click(passwordInput)
    expect(passwordInput).toHaveFocus()
})

test('Checks that submit button is disabled by default', () => {
    render(<Login />)

    const button = screen.getByRole('button', {name: /ok/i})
    expect(button).toBeDisabled()
})

test('Checks that submit button is enabled after valid input', async () => {
    const user = userEvent.setup()
    render(<Login />)
    
    const email = screen.getByLabelText(/email/i)
    const password =screen.getByLabelText(/password/i)
    const button = screen.getByRole('button', {name: /ok/i})

    expect(button).toBeDisabled()
    
    await user.type(email, 'raymond.holt@nypd.com')
    await user.type(password, 'verybadpassword')
        
    expect(button).toBeEnabled()

})