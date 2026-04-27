import { render } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

describe('BodySectionWithMarginBottom', () => {
  it('contains a div with the class bodySectionWithMargin', () => {
    const { container } = render(<BodySectionWithMarginBottom title="Test" />);
    const div = container.querySelector('.bodySectionWithMargin');
    expect(div).toBeInTheDocument();
  });

  it('renders the BodySection component', () => {
    const { getByText } = render(
      <BodySectionWithMarginBottom title="Test">
        <p>Test content</p>
      </BodySectionWithMarginBottom>
    );
    expect(getByText('Test')).toBeInTheDocument();
    expect(getByText('Test content')).toBeInTheDocument();
  });
});
