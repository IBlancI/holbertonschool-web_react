import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { Provider } from 'react-redux';
import mockAxios from 'jest-mock-axios';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../app/rootReducer';

afterEach(() => {
  mockAxios.reset();
});

const createTestStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

const notLoggedInState = {
  auth: {
    isLoggedIn: false,
    user: {
      email: '',
      password: '',
    },
  },
  notifications: {
    notifications: [],
    loading: false,
  },
  courses: {
    courses: [],
  },
};

const mockNotificationsResponse = {
  data: {
    notifications: [
      {
        id: 1,
        context: { type: 'default', isRead: false, value: 'New course available' },
      },
      {
        id: 2,
        context: { type: 'urgent', isRead: false, value: 'New resume available' },
      },
      {
        id: 3,
        context: { type: 'urgent', isRead: false, value: 'New project to review' },
      },
    ],
  },
};

const mockCoursesResponse = {
  data: {
    courses: [
      { id: 1, name: 'ES6', credit: 60, isSelected: false },
      { id: 2, name: 'Webpack', credit: 20, isSelected: false },
      { id: 3, name: 'React', credit: 40, isSelected: false },
    ],
  },
};

const isLoggedInState = {
  auth: {
    isLoggedIn: true,
    user: {
      email: 'nickydoll@dragrace.fr',
      password: 'pichecometrue',
    },
  },
  notifications: {
    notifications: [],
    loading: false,
  },
  courses: {
    courses: [],
  },
};

test('The App component renders Login by default (user not logged in)', async () => {
  const store = createTestStore(notLoggedInState);

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => {
    const emailLabelElement = screen.getByLabelText(/email/i);
    const passwordLabelElement = screen.getByLabelText(/password/i);
    const buttonElements = screen.getAllByRole('button', { name: /ok/i });

    expect(emailLabelElement).toBeInTheDocument();
    expect(passwordLabelElement).toBeInTheDocument();
    expect(buttonElements.length).toBeGreaterThanOrEqual(1);
  });
});

test('The App component renders Courses when user is logged in', async () => {
  const store = createTestStore(isLoggedInState);

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  mockAxios.mockResponse(mockNotificationsResponse);
  mockAxios.mockResponse(mockCoursesResponse);

  await waitFor(() => {
    expect(screen.getByText('ES6')).toBeInTheDocument();
    expect(screen.getByText('Webpack')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /course list/i })).toBeInTheDocument();

    expect(store.getState().courses.courses).toEqual(mockCoursesResponse.data.courses);
  });
});

test('The App component renders Notifications when user is not logged in', async () => {
  const store = createTestStore(notLoggedInState);
  const flattenedNotifications = [
    { id: 1, type: 'default', isRead: false, value: 'New course available' },
    { id: 2, type: 'urgent', isRead: false, value: 'New resume available' },
    { id: 3, type: 'urgent', isRead: false, value: 'New project to review' },
  ];

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => {
    const titleElement = screen.getByText(/Here is the list of notifications/i);
    const buttonElement = screen.getByRole('button', { name: /close/i });

    expect(titleElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
    expect(store.getState().notifications.notifications).toEqual(flattenedNotifications);
  });
});