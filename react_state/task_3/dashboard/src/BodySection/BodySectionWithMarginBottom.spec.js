import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

describe('BodySectionWithMarginBottom', () => {
  test('renders a div with class bodySectionWithMargin', () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="test title">
        <p>test children</p>
      </BodySectionWithMarginBottom>
    );

    const div = container.querySelector('.bodySectionWithMargin');
    expect(div).toBeInTheDocument();
  });

  test('renders the BodySection component', () => {
    render(
      <BodySectionWithMarginBottom title="test title">
        <p>test children</p>
      </BodySectionWithMarginBottom>
    );

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('test title');
    expect(screen.getByText('test children')).toBeInTheDocument();
  });
});