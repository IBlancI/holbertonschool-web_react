import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders header, login and footer components', () => {
    render(<App />);
    expect(screen.getByText(/School dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Login to access the full dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Copyright/i)).toBeInTheDocument();
  });
});
