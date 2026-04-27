import React from 'react';
import { render, cleanup } from '@testing-library/react';
import WithLogging from './WithLogging';

afterEach(cleanup);

class MockApp extends React.Component {
  render() {
    return <h1>Hello from Mock App Component</h1>;
  }
}

describe('WithLogging HOC', () => {
  it('renders MockApp component with heading', () => {
    const WrappedComponent = WithLogging(MockApp);
    const { getByText } = render(<WrappedComponent />);
    const heading = getByText(/hello from mock app component/i);
    expect(heading).toBeInTheDocument();
  });

  it('logs to console on mount and unmount', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    const WrappedComponent = WithLogging(MockApp);
    const { unmount } = render(<WrappedComponent />);
    expect(consoleLogSpy).toHaveBeenCalledWith('Component MockApp is mounted');
    unmount();
    expect(consoleLogSpy).toHaveBeenCalledWith('Component MockApp is going to unmount');
    consoleLogSpy.mockRestore();
  });
});
