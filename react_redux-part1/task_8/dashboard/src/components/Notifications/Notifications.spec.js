import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";
import { getLatestNotification } from "../../utils/utils";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../app/rootReducer';


// Helper function to create a fresh store with custom initial state
const createTestStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

// Default initial states for auth (not logged in)
const displayDrawerState = {
  auth: {
    isLoggedIn: false,
    user: {
      email: "",
      password: "",
    }
  },
  notifications: {
    notifications: [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } }
    ],
    displayDrawer: true
  },
  courses: {
    courses: []
  }
};

const hideDrawerState = {
  auth: {
    isLoggedIn: false,
    user: {
      email: "",
      password: "",
    }
  },
  notifications: {
    notifications: [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } }
    ],
    displayDrawer: false
  },
  courses: {
    courses: []
  }
};

jest.mock("../../utils/utils", () => ({
  getLatestNotification: jest.fn(),
}));

describe("Notifications component", () => {
  beforeEach(() => {
    getLatestNotification.mockReturnValue(
      "<strong>Urgent requirement</strong> - complete by EOD"
    );
  });

  test('Verify that displayDrawer is set to false when closing the drawer', () => {
    const store = createTestStore(displayDrawerState);

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const closeButton = screen.getByRole("button", { name: /close/i });
    const titleElement = screen.getByText(/Here is the list of notifications/i);

    expect(titleElement).toBeInTheDocument();      
    expect(store.getState().notifications.displayDrawer).toBe(true)
    
    fireEvent.click(closeButton);

    expect(store.getState().notifications.displayDrawer).toBe(false)
  });

  test('Verify that displayDrawer is set to true when opening the drawer', () => {
    const store = createTestStore(hideDrawerState);

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
      );

    expect(store.getState().notifications.displayDrawer).toBe(false)

    const notificationTitle = screen.getByText('Your notifications');
    fireEvent.click(notificationTitle);

    const titleElement = screen.getByText(/Here is the list of notifications/i);

    expect(titleElement).toBeInTheDocument();
    expect(store.getState().notifications.displayDrawer).toBe(true)
});

  test('Verify that displayDrawer is set to true when opening the drawer', () => {
    const store = createTestStore(hideDrawerState);

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
      );

    expect(store.getState().notifications.displayDrawer).toBe(false)

    const notificationTitle = screen.getByText('Your notifications');
    fireEvent.click(notificationTitle);

    const titleElement = screen.getByText(/Here is the list of notifications/i);

    expect(titleElement).toBeInTheDocument();
    expect(store.getState().notifications.displayDrawer).toBe(true)
  });

  test('Verify that a notification marked as read is removed from the list', () => {
    const store = createTestStore(displayDrawerState);

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );
    
    const listItems = screen.getAllByRole("listitem");

    fireEvent.click(listItems[0]);

    expect(store.getState().notifications.notifications).toHaveLength(2);
  })
});