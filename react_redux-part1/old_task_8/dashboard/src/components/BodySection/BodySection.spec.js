import { render } from '@testing-library/react';
import BodySection from './BodySection';

describe('BodySection', () => {
  it('renders a heading with the title prop value', () => {
    const { getByText } = render(<BodySection title="Test Title" />);
    expect(getByText('Test Title')).toBeInTheDocument();
  });

  it('renders the children passed to it', () => {
    const { getByText } = render(
      <BodySection title="Title">
        <p>Child paragraph</p>
      </BodySection>
    );
    expect(getByText('Child paragraph')).toBeInTheDocument();
  });
});
