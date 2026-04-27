import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import mockAxios from 'jest-mock-axios';
import notificationsSlice, { fetchNotifications } from '../../features/notifications/notificationsSlice';
import Notifications from './Notifications';

describe('Notifications', () => {
  let testStore;

  beforeEach(() => {
    testStore = configureStore({
      reducer: {
        notifications: notificationsSlice,
      },
    });
  });

  afterEach(() => {
    mockAxios.reset();
  });

  test('renders without crashing', async () => {
    const promise = testStore.dispatch(fetchNotifications());

    mockAxios.mockResponse({
      data: {
        notifications: [
          { id: 1, type: 'default', value: 'New course available' },
          { id: 2, type: 'urgent', value: 'New resume available' },
          { id: 3, type: 'urgent', value: 'Placeholder' },
        ],
      },
    });

    await promise;

    render(
      <Provider store={testStore}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
    expect(screen.getByText('New course available')).toBeInTheDocument();
    expect(screen.getByText('New resume available')).toBeInTheDocument();
  });

  test('toggles drawer visibility when clicking the title', async() => {
    const promise = testStore.dispatch(fetchNotifications());

    mockAxios.mockResponse({
      data: {
        notifications: [
          { id: 1, type: 'default', value: 'New course available' },
          { id: 2, type: 'urgent', value: 'New resume available' },
          { id: 3, type: 'urgent', value: 'Placeholder' },
        ],
      },
    });

    await promise;

    render(
      <Provider store={testStore}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText('New course available')).toBeInTheDocument();
    expect(screen.getByText('New resume available')).toBeInTheDocument();

    fireEvent.click(screen.getByText(/your notifications/i));
    expect(screen.queryByRole('listitem', { name: 'New course available' })).not.toBeInTheDocument();
    expect(screen.queryByRole('listitem', { name: 'New resume available' })).not.toBeInTheDocument();

    fireEvent.click(screen.getByText(/your notifications/i));
    expect(screen.getByText('New course available')).toBeInTheDocument();
    expect(screen.getByText('New resume available')).toBeInTheDocument();
  });

  test('close drawer on close button', async () => {
    const promise = testStore.dispatch(fetchNotifications());

    mockAxios.mockResponse({
      data: {
        notifications: [
          { id: 1, type: 'default', value: 'New course available' },
          { id: 2, type: 'urgent', value: 'New resume available' },
          { id: 3, type: 'urgent', value: 'Placeholder' },
        ],
      },
    });

    await promise;

    render(
      <Provider store={testStore}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText('New course available')).toBeInTheDocument();
  });

  test('marks notification as read', async () => {
    const promise = testStore.dispatch(fetchNotifications());

    mockAxios.mockResponse({
      data: {
        notifications: [
          { id: 1, type: 'default', value: 'New course available' },
          { id: 2, type: 'urgent', value: 'New resume available' },
          { id: 3, type: 'urgent', value: 'Placeholder' },
        ],
      },
    });

    await promise;

    render(
      <Provider store={testStore}>
        <Notifications />
      </Provider>
    );

    const firstItem = screen.getByText('New course available');

    fireEvent.click(firstItem);

    await waitFor(() => {
      const remainingItems = screen.getAllByRole('listitem');
      expect(remainingItems).toHaveLength(2);
    });
  });

  test('renders with displayDrawer true', async () => {
    const promise = testStore.dispatch(fetchNotifications());

    mockAxios.mockResponse({
      data: {
        notifications: [
          { id: 1, type: 'default', value: 'New course available' },
          { id: 2, type: 'urgent', value: 'New resume available' },
          { id: 3, type: 'urgent', value: 'Placeholder' },
        ],
      },
    });

    await promise;

    render(
      <Provider store={testStore}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });

  test('does not re-render when drawer visibility is toggled', async () => {
    const promise = testStore.dispatch(fetchNotifications());

    mockAxios.mockResponse({
      data: {
        notifications: [
          { id: 1, type: 'default', value: 'New course available' },
          { id: 2, type: 'urgent', value: 'New resume available' },
          { id: 3, type: 'urgent', value: 'Placeholder' },
        ],
      },
    });

    await promise;

    render(
      <Provider store={testStore}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText('New course available')).toBeInTheDocument();

    fireEvent.click(screen.getByText(/your notifications/i));

    fireEvent.click(screen.getByText(/your notifications/i));
    expect(screen.getByText('New course available')).toBeInTheDocument();
  });
});
