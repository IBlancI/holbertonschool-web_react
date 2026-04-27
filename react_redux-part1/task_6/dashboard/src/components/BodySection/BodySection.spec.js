import { render, screen } from '@testing-library/react';
import BodySection from './BodySection';

test('It should render a heading with the title prop value', () => {
  render(
    <BodySection title="Test Title">
      <p>Test child</p>
    </BodySection>
  );

  const titleEl = screen.getByRole('heading', { name: /test title/i });
  expect(titleEl).toBeInTheDocument();
  expect(titleEl.tagName).toBe('H2');
});

test('It should render any children passed to it', () => {
  render(
    <BodySection title="Test Title">
      <p>Child 1</p>
      <p>Child 2</p>
      <p>Child 3</p>
    </BodySection>
  );

  expect(screen.getByText('Child 1')).toBeInTheDocument();
  expect(screen.getByText('Child 2')).toBeInTheDocument();
  expect(screen.getByText('Child 3')).toBeInTheDocument();
});
