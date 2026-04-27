import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import WithLogging from './WithLogging';

class MockApp extends React.Component {
  render() {
    return <h1>Hello from Mock App Component</h1>;
  }
}

describe('WithLogging HOC', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  test('renders a component wrapped by WithLogging', () => {
    const WrappedMockApp = WithLogging(MockApp);
    render(<WrappedMockApp />);
    expect(
      screen.getByRole('heading', { level: 1 })
    ).toHaveTextContent('Hello from Mock App Component');
  });
});