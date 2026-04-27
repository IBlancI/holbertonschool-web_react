import { render } from '@testing-library/react';
import { StyleSheetTestUtils } from 'aphrodite';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

const mockBodySection = jest.fn();
jest.mock("../BodySection/BodySection", () => {
  const MockBodySection = (props) => {
    mockBodySection(props);
    return (
      <div>
        <h2>{props.title}</h2>
        {props.children}
      </div>
    );
  };
  MockBodySection.displayName = 'MockBodySection';
  return MockBodySection;
});

describe('BodySectionWithMarginBottom', () => {
  test('should render BodySection inside a div with class bodySectionWithMargin', () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="Hello!">
        <p>This is child content</p>
        <span>Hey there!</span>
      </BodySectionWithMarginBottom>
    );

    expect(mockBodySection).toHaveBeenCalled();
    const classNames = container.firstChild.className;
    expect(classNames).toMatch(/bodySectionWithMargin_/);
    expect(mockBodySection).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Hello!",
        children: expect.anything(),
      })
    );
    expect(container.firstChild).toHaveTextContent('Hello!');

    const wrapper = container.firstChild;
    expect(wrapper).toHaveTextContent('This is child content');
    expect(wrapper).toHaveTextContent('Hey there!');

    const pEl = container.querySelector('p');
    const spanEl = container.querySelector('span');
    expect(pEl).toBeInTheDocument();
    expect(pEl).toHaveTextContent('This is child content');
    expect(spanEl).toBeInTheDocument();
    expect(spanEl).toHaveTextContent('Hey there!');
  });

  test('should apply margin-bottom to the wrapper div', () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="Test Title">
        <p>Child Content</p>
      </BodySectionWithMarginBottom>
    );

    const wrapper = container.firstChild;
    expect(wrapper).toBeInTheDocument();
    expect(wrapper.className).toMatch(/bodySectionWithMargin_/);
  });
});
