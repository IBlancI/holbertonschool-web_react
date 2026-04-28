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
    displayDrawer: true,
  },
  courses: {
    courses: [],
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
    displayDrawer: true,
  },
  courses: {
    courses: [],
  },
};

const mockNotificationsResponse = {
  data: {
    notifications: [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      {
        id: 3,
        type: 'urgent',
        html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' },
      },
    ],
  },
};

const mockCoursesResponse = {
  data: {
    courses: [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ],
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
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /ok/i }).length).toBeGreaterThanOrEqual(1);
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

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => {
    expect(screen.getByText(/Here is the list of notifications/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    expect(store.getState().notifications.notifications).toEqual(
      mockNotificationsResponse.data.notifications
    );
  });
});

test('The App component should not fetch courses when isLoggedIn is false', async () => {
  const store = createTestStore(notLoggedInState);

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const firstRequest = mockAxios.lastReqGet();
  expect(firstRequest.url).toBe('http://localhost:5173/notifications.json');

  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  const courseRequests = mockAxios.getReqMatching({
    url: 'http://localhost:5173/courses.json',
  });

  expect(courseRequests).toHaveLength(0);
});

test('The App component should fetch courses data only once when isLoggedIn is true', async () => {
  const store = createTestStore(isLoggedInState);

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const firstRequest = mockAxios.lastReqGet();
  expect(firstRequest.url).toBe('http://localhost:5173/courses.json');

  mockAxios.mockResponse(mockCoursesResponse);
  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => {
    expect(store.getState().courses.courses).toEqual(mockCoursesResponse.data.courses);
  });

  const courseRequests = mockAxios.getReqMatching({
    url: 'http://localhost:5173/courses.json',
  });

  expect(courseRequests).toHaveLength(1);
});