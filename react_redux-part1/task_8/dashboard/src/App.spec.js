import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import authReducer from './features/auth/authSlice';
import notificationsReducer from './features/notifications/notificationsSlice';
import coursesReducer from './features/courses/coursesSlice';

const buildStore = (preloaded = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
      notifications: notificationsReducer,
      courses: coursesReducer,
    },
    preloadedState: preloaded,
  });
};

describe('App Component', () => {
  test('renders without crashing', () => {
    const store = buildStore({
      auth: { user: { email: '', password: '' }, isLoggedIn: false },
      notifications: { notifications: [], displayDrawer: true },
      courses: { courses: [] },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/Holberton School news goes here/i)).toBeInTheDocument();
  });

  test('renders Login component when not logged in', () => {
    const store = buildStore({
      auth: { user: { email: '', password: '' }, isLoggedIn: false },
      notifications: { notifications: [], displayDrawer: true },
      courses: { courses: [] },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/Log in to continue/i)).toBeInTheDocument();
    expect(screen.getByText(/Login to access the full dashboard/i)).toBeInTheDocument();
  });

  test('renders CourseList component when logged in', () => {
    const store = buildStore({
      auth: { user: { email: 'test@example.com', password: 'password' }, isLoggedIn: true },
      notifications: { notifications: [], displayDrawer: true },
      courses: { courses: [] },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/Course list/i)).toBeInTheDocument();
  });

  test('renders Header component', () => {
    const store = buildStore({
      auth: { user: { email: '', password: '' }, isLoggedIn: false },
      notifications: { notifications: [], displayDrawer: true },
      courses: { courses: [] },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
  });

  test('renders Footer component', () => {
    const store = buildStore({
      auth: { user: { email: '', password: '' }, isLoggedIn: false },
      notifications: { notifications: [], displayDrawer: true },
      courses: { courses: [] },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/Copyright/i)).toBeInTheDocument();
  });

  test('renders Notifications component', () => {
    const store = buildStore({
      auth: { user: { email: '', password: '' }, isLoggedIn: false },
      notifications: { notifications: [], displayDrawer: true },
      courses: { courses: [] },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/Your notifications/i)).toBeInTheDocument();
  });
});
