import { render, screen } from '@testing-library/react';
import CourseList from './CourseList';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { logout } from '../../features/auth/authSlice'; 
import rootReducer from '../../app/rootReducer';
import { act } from '@testing-library/react';


// Helper function to create a fresh store with custom initial state
const createTestStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

const mockCoursesResponse = {
  data: {
    courses: [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 }
    ]
  }
};

// Default initial states for auth (not logged in)
const isLoggedInState = {
  auth: {
    isLoggedIn: true,
    user: {
      email: "nickydoll@dragrace.fr",
      password: "pichecometrue",
    }
  },
  notifications: {
    notifications: [],
    displayDrawer: true
  },
  courses: {
    courses: [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 }
    ]
  }
};


test('Display the course list when fetchCourses is called', () => {
  const store = createTestStore(isLoggedInState);

  render(
    <Provider store={store}>
      <CourseList />
    </Provider>
  )

  const rowElements = screen.getAllByRole('row');
  const headerText = screen.getByText(/available courses/i);

  expect(rowElements).toHaveLength(5);
  expect(headerText).toBeInTheDocument();
  expect(store.getState().courses).toEqual(mockCoursesResponse.data);
})

test('Check that the courseList array is reseted when logout is called', () => {
  const store = createTestStore(isLoggedInState);

  render(
    <Provider store={store}>
      <CourseList />
    </Provider>
  )

  const rowElements = screen.getAllByRole('row');
  const headerText = screen.getByText(/available courses/i);

  expect(rowElements).toHaveLength(5);
  expect(headerText).toBeInTheDocument();
  expect(store.getState().courses).toEqual(mockCoursesResponse.data);

  // dispatch logout action
  act(() => {
    store.dispatch(logout())
  });
  expect(store.getState().courses.courses).toEqual([]);
});