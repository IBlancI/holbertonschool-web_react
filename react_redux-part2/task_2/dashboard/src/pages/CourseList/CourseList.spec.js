import { render, screen, fireEvent } from '@testing-library/react';
import CourseList from './CourseList';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { logout } from '../../features/auth/authSlice';
import rootReducer from '../../app/rootReducer';
import { act } from '@testing-library/react';
import mockAxios from 'jest-mock-axios';
import { fetchCourses } from '../../features/courses/coursesSlice';


afterEach(() => {
  mockAxios.reset();
});

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

test('courses should have isSelected property set to false initially', async () => {
  const initialState = {
    auth: {
      isLoggedIn: true,
      user: { email: "", password: "" }
    },
    notifications: { notifications: [] },
    courses: {
      courses: []  // Start empty!
    }
  };

  const store = createTestStore(initialState);

  const mockApiResponse = {
    data: {
      courses: [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
        { id: 3, name: 'React', credit: 40 }
      ]
    }
  };

  // Dispatch to the REAL store and mock the axios response
  const promise = store.dispatch(fetchCourses());
  mockAxios.mockResponse(mockApiResponse);

  await promise;

  // Now check the store state AFTER the reducer processed it
  const courses = store.getState().courses.courses;

  expect(courses).toHaveLength(3);
  courses.forEach(course => {
    expect(course).toHaveProperty('isSelected', false);
  });
});

test('onChangeRow dispatches selectCourse when checkbox is checked', () => {
  const store = createTestStore(isLoggedInState);

  render(
    <Provider store={store}>
      <CourseList />
    </Provider>
  );

  const checkboxes = screen.getAllByRole('checkbox');
  const firstCheckbox = checkboxes[0];
  
  // Click triggers onChangeRow which dispatches selectCourse
  fireEvent.click(firstCheckbox);

  // Verify the action was dispatched by checking the state changed
  expect(store.getState().courses.courses[0].isSelected).toBe(true);
});

test('onChangeRow dispatches unSelectCourse when checkbox is unchecked', () => {
  const stateWithSelectedCourse = {
    auth: { isLoggedIn: true, user: { email: "", password: "" } },
    notifications: { notifications: [] },
    courses: {
      courses: [
        { id: 1, name: 'ES6', credit: 60, isSelected: true },
        { id: 2, name: 'Webpack', credit: 20, isSelected: false },
        { id: 3, name: 'React', credit: 40, isSelected: false }
      ]
    }
  };

  const store = createTestStore(stateWithSelectedCourse);

  render(
    <Provider store={store}>
      <CourseList />
    </Provider>
  );

  const checkboxes = screen.getAllByRole('checkbox');
  const firstCheckbox = checkboxes[0];
  
  // Click triggers onChangeRow which dispatches unSelectCourse
  fireEvent.click(firstCheckbox);

  // Verify the state changed back to false
  expect(store.getState().courses.courses[0].isSelected).toBe(false);
});
