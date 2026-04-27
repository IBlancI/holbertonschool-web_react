import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BodySection from './BodySection';

describe('BodySection', () => {
  test('renders a heading with the title prop value', () => {
    render(<BodySection title="test title" />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('test title');
  });

  test('renders the children passed to it', () => {
    render(
      <BodySection title="test title">
        <p>test children node</p>
      </BodySection>
    );

    expect(screen.getByText('test children node')).toBeInTheDocument();
  });
});