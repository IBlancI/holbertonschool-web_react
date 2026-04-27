import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CourseList from './CourseList';
import coursesReducer from '../../features/courses/coursesSlice';

const buildTestStore = (preloaded) => {
  return configureStore({
    reducer: {
      courses: coursesReducer,
    },
    preloadedState: preloaded,
  });
};

const renderWithStore = (component, preloaded) => {
  const store = buildTestStore(preloaded);
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

test('it should render the CourseList component without crashing', () => {
  const preloaded = {
    courses: {
      courses: [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
        { id: 3, name: 'React', credit: 40 },
      ],
    },
  };
  renderWithStore(<CourseList />, preloaded);
});

test('it should render the CourseList component with 5 rows', () => {
  const preloaded = {
    courses: {
      courses: [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
        { id: 3, name: 'React', credit: 40 },
      ],
    },
  };
  renderWithStore(<CourseList />, preloaded);

  const rowElements = screen.getAllByRole('row');
  expect(rowElements).toHaveLength(5);
});

test('it should render the CourseList component with 1 row when empty', () => {
  const preloaded = {
    courses: {
      courses: [],
    },
  };

  renderWithStore(<CourseList />, preloaded);

  const rowElements = screen.getAllByRole('row');
  expect(rowElements).toHaveLength(1);
});
