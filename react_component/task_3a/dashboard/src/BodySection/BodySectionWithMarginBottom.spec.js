import React from 'react';
import { render, screen } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

describe('BodySectionWithMarginBottom', () => {
  test('contains a div with the class bodySectionWithMargin', () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="title">
        <p>child</p>
      </BodySectionWithMarginBottom>
    );
    const wrapper = container.querySelector('.bodySectionWithMargin');
    expect(wrapper).not.toBeNull();
  });

  test('renders the BodySection component', () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="title">
        <p>child</p>
      </BodySectionWithMarginBottom>
    );
    // le BodySection rend un h2 avec le titre
    expect(screen.getByRole('heading', { level: 2, name: 'title' })).toBeInTheDocument();
    // et il doit se trouver à l’intérieur du conteneur .bodySectionWithMargin
    const wrapper = container.querySelector('.bodySectionWithMargin');
    expect(wrapper.querySelector('.bodySection')).not.toBeNull();
  });
});
