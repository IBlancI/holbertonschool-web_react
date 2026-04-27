import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import mockAxios from 'jest-mock-axios';
import CourseList from './CourseList';
import coursesReducer, { fetchCourses } from '../../features/courses/coursesSlice';

describe('CourseList', () => {
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

  test('renders correctly with no courses available', () => {
    render(
      <Provider store={store}>
        <CourseList />
      </Provider>
    );
    expect(screen.getByText('No course available yet')).toBeInTheDocument();
  });

  test('shows the full list of courses after fetch', async () => {
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

    await waitFor(() => {
      expect(screen.getByText('ES6')).toBeInTheDocument();
      expect(screen.getByText('Webpack')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
    });
  });

  test('toggles course selection when checkbox is clicked', async () => {
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

    await waitFor(() => {
      expect(screen.getAllByRole('checkbox')).toHaveLength(SAMPLE_COURSES.length);
    });

    const dataRows = screen.getAllByRole('row').filter((row) => {
      return !row.querySelector('th');
    });

    expect(dataRows).toHaveLength(SAMPLE_COURSES.length);

    const cells = within(dataRows[0]).getAllByRole('cell');
    const checkbox = within(cells[0]).getByRole('checkbox');

    expect(checkbox).not.toBeChecked();

    // Select the first course
    fireEvent.click(checkbox);
    await waitFor(() => {
      expect(store.getState().courses.courses[0].isSelected).toBe(true);
      expect(checkbox).toBeChecked();
    });

    // Unselect the first course
    fireEvent.click(checkbox);
    await waitFor(() => {
      expect(store.getState().courses.courses[0].isSelected).toBe(false);
      expect(checkbox).not.toBeChecked();
    });
  });
});
