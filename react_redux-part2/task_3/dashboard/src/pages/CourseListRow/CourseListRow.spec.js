import { render, screen, within, fireEvent } from '@testing-library/react';
import CourseListRow from './CourseListRow';

test('it should display 1 "th" element with colspan=2 when isHeader is true and textSecondCell is null', () => {
  render(
    <table>
      <tbody>
        <CourseListRow isHeader={true} textFirstCell="First" textSecondCell={null} />
      </tbody>
    </table>
  )

  const thElement = screen.getByRole('columnheader');

  expect(thElement).toHaveAttribute('colSpan', '2');
});

test('it should display 2 "th" elements when isHeader is true and textSecondCell is not null', () => {
  render(
    <table>
      <tbody>
        <CourseListRow isHeader={true} textFirstCell="First" textSecondCell="Second" />
      </tbody>
    </table>
  )

  const thElements = screen.getAllByRole('columnheader');

  expect(thElements).toHaveLength(2);
});

test('it should render 2 "td" elements inside a "tr" element when isHeader is false', () => {
  render(
    <table>
      <tbody>
        <CourseListRow isHeader={false} textFirstCell="Data1" textSecondCell="Data2" />
      </tbody>
    </table>
  )

  const trElement = screen.getByRole('row');
  const tdElements = within(trElement).getAllByRole('cell');

  expect(trElement).toBeInTheDocument();
  expect(tdElements).toHaveLength(2);
});

test('it should render a checkbox when isHeader is false', () => {
  render(
    <table>
      <tbody>
        <CourseListRow isHeader={false} textFirstCell="Data1" textSecondCell="Data2" />
      </tbody>
    </table>
  )

  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).toBeInTheDocument();
});

test('checkbox should be checked when isSelected is true', () => {
  render(
    <table>
      <tbody>
        <CourseListRow isHeader={false} isSelected={true} textFirstCell="Data1" textSecondCell="Data2" />
      </tbody>
    </table>
  )
  const checkbox = screen.getByRole('checkbox');

  expect(checkbox).toBeChecked();
});

test('checkbox should be unchecked when isSelected is false', () => {
  render(
    <table>
      <tbody>
        <CourseListRow isHeader={false} isSelected={false} textFirstCell="Data1" textSecondCell="Data2" />
      </tbody>
    </table>
  )
  const checkbox = screen.getByRole('checkbox');

  expect(checkbox).not.toBeChecked();

});

test('onChangeRow is called with correct parameters when checkbox is clicked', () => {
  const mockOnChangeRow = jest.fn();

render(
    <table>
      <tbody>
        <CourseListRow
          id={1}
          isSelected={false}
          onChangeRow={mockOnChangeRow}
          textFirstCell={'data1'}
          textSecondCell={'data2'}
        />
      </tbody>
    </table>
  );


  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);
  
  expect(mockOnChangeRow).toHaveBeenCalledWith(1, true);
});
