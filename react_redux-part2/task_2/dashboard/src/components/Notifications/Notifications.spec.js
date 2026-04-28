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
const initialState = {
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

  test('Verify that drawer visibility is set to hidden by default', () => {
    const store = createTestStore(initialState);

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const drawer = screen.getByText(/Here is the list of notifications/i);
    const className = drawer.parentElement.className;
    
    // Should only have base class (notificationItems), not visible class
    expect(className).toBeTruthy();
    expect(className.split(' ').length).toBe(1);
  });

  test('Verify that drawer visibility is set to visible when opening the drawer', () => {
    const store = createTestStore(initialState);

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
      );

    const drawer = screen.getByText(/Here is the list of notifications/i);
    const initialClassName = drawer.parentElement.className;

    const notificationTitle = screen.getByText('Your notifications');
    fireEvent.click(notificationTitle);

    const newClassName = drawer.parentElement.className;
    
    // After clicking, className should be different (visible class added)
    expect(newClassName).not.toBe(initialClassName);
    expect(newClassName.length).toBeGreaterThan(initialClassName.length);
});

  test('Verify that a notification marked as read is removed from the list', () => {
    const store = createTestStore(initialState);

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
