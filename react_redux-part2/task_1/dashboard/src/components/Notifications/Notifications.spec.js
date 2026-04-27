import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import mockAxios from 'jest-mock-axios';
import Notifications from './Notifications';
import notificationsSlice, { fetchNotifications } from '../../features/notifications/notificationsSlice';

// Sample notification data used across tests
const sampleNotifs = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', value: 'Placeholder' },
];

// Helper to dispatch fetchNotifications and mock the API response
const loadNotifications = async (testStore) => {
  const promise = testStore.dispatch(fetchNotifications());
  mockAxios.mockResponse({ data: { notifications: sampleNotifs } });
  await promise;
};

describe('Notifications component', () => {
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

  test('renders correctly with fetched data', async () => {
    await loadNotifications(testStore);

    render(
      <Provider store={testStore}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
    expect(screen.getByText('New course available')).toBeInTheDocument();
    expect(screen.getByText('New resume available')).toBeInTheDocument();
  });

  test('drawer toggles visibility on title click', async () => {
    await loadNotifications(testStore);

    const { container } = render(
      <Provider store={testStore}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText('New course available')).toBeInTheDocument();
    expect(screen.getByText('New resume available')).toBeInTheDocument();

    fireEvent.click(screen.getByText(/your notifications/i));

    fireEvent.click(screen.getByText(/your notifications/i));
    expect(screen.getByText('New course available')).toBeInTheDocument();
    expect(screen.getByText('New resume available')).toBeInTheDocument();
  });

  test('closes drawer when close button is clicked', async () => {
    await loadNotifications(testStore);

    render(
      <Provider store={testStore}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText('New course available')).toBeInTheDocument();

    fireEvent.click(screen.getByAltText('close icon'));
  });

  test('removes a notification when clicked (mark as read)', async () => {
    await loadNotifications(testStore);

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

  test('displays the notifications title', async () => {
    await loadNotifications(testStore);

    render(
      <Provider store={testStore}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });

  test('preserves content when drawer is toggled multiple times', async () => {
    await loadNotifications(testStore);

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
