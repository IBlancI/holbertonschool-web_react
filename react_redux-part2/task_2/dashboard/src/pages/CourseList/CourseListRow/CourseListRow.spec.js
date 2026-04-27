import { render, screen, fireEvent, within } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import mockAxios from 'jest-mock-axios';
import coursesReducer, { fetchCourses } from '../../../features/courses/coursesSlice';
import CourseListRow from './CourseListRow';
import CourseList from '../CourseList';

describe('CourseListRow', () => {
  const SAMPLE_COURSES = [
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 },
  ];

  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        courses: coursesReducer,
      },
    });
  });

  afterEach(() => {
    mockAxios.reset();
  });

  test('displays a single-cell header row with colSpan 2', () => {
    render(
      <CourseListRow isHeader={true} textFirstCell="Available courses" />
    );
    const header = screen.getByRole('columnheader', { name: 'Available courses' });
    expect(header).toHaveAttribute('colSpan', '2');
  });

  test('displays a header row with two separate cells', () => {
    render(
      <CourseListRow
        isHeader={true}
        textFirstCell="Course name"
        textSecondCell="Credit"
      />
    );

    const firstHeader = screen.getByRole('columnheader', { name: 'Course name' });
    const secondHeader = screen.getByRole('columnheader', { name: 'Credit' });
    expect(firstHeader).toBeInTheDocument();
    expect(secondHeader).toBeInTheDocument();
  });

  test('displays a standard data row with two cells', () => {
    render(
      <CourseListRow
        isHeader={false}
        textFirstCell="ES6"
        textSecondCell="60"
      />
    );

    const nameCell = screen.getByRole('cell', { name: 'ES6' });
    const creditCell = screen.getByRole('cell', { name: '60' });
    expect(nameCell).toBeInTheDocument();
    expect(creditCell).toBeInTheDocument();
  });

  test('triggers onChangeRow for each row checkbox click', async () => {
    const fetchPromise = store.dispatch(fetchCourses());

    mockAxios.mockResponse({
      data: {
        courses: SAMPLE_COURSES,
      },
    });

    await fetchPromise;

    render(
      <Provider store={store}>
        <CourseList />
      </Provider>
    );

    const dataRows = screen.getAllByRole('row').filter((row) => {
      return !row.querySelector('th');
    });

    expect(dataRows).toHaveLength(SAMPLE_COURSES.length);

    dataRows.forEach((row, idx) => {
      const courseData = SAMPLE_COURSES[idx];
      const cells = within(row).getAllByRole('cell');
      const checkbox = within(cells[0]).getByRole('checkbox');

      expect(cells[0]).toHaveTextContent(courseData.name);
      expect(cells[1]).toHaveTextContent(courseData.credit.toString());

      expect(checkbox).not.toBeChecked();

      fireEvent.click(checkbox);

      expect(checkbox).toBeChecked();
    });
  });

  test('shows checked checkbox when isSelected prop is true', () => {
    const handleChangeRow = jest.fn();
    render(
      <CourseListRow
        isHeader={false}
        textFirstCell="ES6"
        textSecondCell="60"
        id={1}
        isSelected={true}
        onChangeRow={handleChangeRow}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();

    expect(handleChangeRow).not.toHaveBeenCalled();

    fireEvent.click(checkbox);

    expect(handleChangeRow).toHaveBeenCalledTimes(1);
    expect(handleChangeRow).toHaveBeenCalledWith(1, false);
  });
});
