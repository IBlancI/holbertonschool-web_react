import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Notifications from "./Notifications";
import notificationsReducer from '../../features/notifications/notificationsSlice';
import { getLatestNotification } from "../../utils/utils";

jest.mock("../../utils/utils", () => ({
  getLatestNotification: jest.fn(),
}));

const buildTestStore = (preloaded) => {
  return configureStore({
    reducer: {
      notifications: notificationsReducer,
    },
    preloadedState: preloaded,
  });
};

const renderWithStore = (component, preloaded) => {
  const store = buildTestStore(preloaded);
  return { store, ...render(
    <Provider store={store}>
      {component}
    </Provider>
  )};
};

describe("Notifications component", () => {
  beforeEach(() => {
    getLatestNotification.mockReturnValue(
      "<strong>Urgent requirement</strong> - complete by EOD"
    );
  });

  test("renders the notifications title", () => {
    const preloaded = {
      notifications: {
        notifications: [
          { id: 1, type: "default", value: "New course available" },
        ],
        displayDrawer: true,
      },
    };
    renderWithStore(<Notifications />, preloaded);
    const titleElement = screen.getByText(/Here is the list of notifications/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders the close button", () => {
    const preloaded = {
      notifications: {
        notifications: [
          { id: 1, type: "default", value: "New course available" },
        ],
        displayDrawer: true,
      },
    };
    renderWithStore(<Notifications />, preloaded);
    const buttonElement = screen.getByRole("button", { name: /close/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test("dispatches hideDrawer when close button is clicked", () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const preloaded = {
      notifications: {
        notifications: [
          { id: 1, type: "default", value: "New course available" },
        ],
        displayDrawer: true,
      },
    };

    const store = buildTestStore(preloaded);
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const buttonElement = screen.getByRole("button", { name: /close/i });
    fireEvent.click(buttonElement);

    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy.mock.calls[0][0].type).toBe('notifications/hideDrawer');

    consoleSpy.mockRestore();
  });

  test("it should display 3 notification items as expected", () => {
    const preloaded = {
      notifications: {
        notifications: [
          { id: 1, type: "default", value: "New course available" },
          { id: 2, type: "urgent", value: "New resume available" },
          { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
        ],
        displayDrawer: true,
      },
    };

    renderWithStore(<Notifications />, preloaded);

    const listItemElements = screen.getAllByRole("listitem");
    expect(listItemElements).toHaveLength(3);
  });

  test('it should not display title, button and list items when displayDrawer is false', () => {
    const preloaded = {
      notifications: {
        notifications: [
          { id: 1, type: "default", value: "New course available" },
          { id: 2, type: "urgent", value: "New resume available" },
          { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
        ],
        displayDrawer: false,
      },
    };
    renderWithStore(<Notifications />, preloaded);

    const notificationsTitle = screen.queryByText(
      /here is the list of notifications/i
    );
    const notificationsButton = screen.queryByRole("button");
    const notificationsListItems = screen.queryAllByRole("listitem");

    expect(notificationsTitle).toBeNull();
    expect(notificationsButton).toBeNull();
    expect(notificationsListItems).toHaveLength(0);
  });

  test('it should display "No new notifications for now" when notification list is empty', () => {
    const preloaded = {
      notifications: {
        notifications: [],
        displayDrawer: true,
      },
    };
    renderWithStore(<Notifications />, preloaded);

    const notificationsTitle = screen.getByText(/no new notifications for now/i);
    const notificationsListItems = screen.queryAllByRole("listitem");

    expect(notificationsListItems).toHaveLength(0);
    expect(notificationsTitle).toBeInTheDocument();
  });

  test('it should display "Your notifications" in all cases', () => {
    const preloaded1 = {
      notifications: {
        notifications: [],
        displayDrawer: false,
      },
    };

    const { unmount } = renderWithStore(<Notifications />, preloaded1);
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
    unmount();

    const preloaded2 = {
      notifications: {
        notifications: [],
        displayDrawer: true,
      },
    };
    const { unmount: unmount2 } = renderWithStore(<Notifications />, preloaded2);
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
    unmount2();

    const preloaded3 = {
      notifications: {
        notifications: [
          { id: 1, type: "default", value: "New course available" },
        ],
        displayDrawer: true,
      },
    };
    renderWithStore(<Notifications />, preloaded3);
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });

  test("it should display close button, p element, and notification items when displayDrawer is true", () => {
    const preloaded = {
      notifications: {
        notifications: [
          { id: 1, type: "default", value: "New course available" },
          { id: 2, type: "urgent", value: "New resume available" },
          { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
        ],
        displayDrawer: true,
      },
    };

    renderWithStore(<Notifications />, preloaded);

    const closeButton = screen.getByRole("button", { name: /close/i });
    const pElement = screen.getByText(/here is the list of notifications/i);
    const listItems = screen.getAllByRole("listitem");

    expect(closeButton).toBeInTheDocument();
    expect(pElement).toBeInTheDocument();
    expect(listItems).toHaveLength(3);
  });

  test("it should dispatch markNotificationAsRead when a notification item is clicked", () => {
    const preloaded = {
      notifications: {
        notifications: [
          { id: 1, type: "default", value: "New course available" },
          { id: 2, type: "urgent", value: "New resume available" },
          { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
        ],
        displayDrawer: true,
      },
    };

    const store = buildTestStore(preloaded);
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const listItems = screen.getAllByRole("listitem");

    fireEvent.click(listItems[0]);
    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy.mock.calls[0][0].type).toBe('notifications/markNotificationAsRead');
    expect(dispatchSpy.mock.calls[0][0].payload).toBe(1);

    dispatchSpy.mockClear();

    fireEvent.click(listItems[1]);
    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy.mock.calls[0][0].type).toBe('notifications/markNotificationAsRead');
    expect(dispatchSpy.mock.calls[0][0].payload).toBe(2);

    dispatchSpy.mockClear();

    fireEvent.click(listItems[2]);
    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy.mock.calls[0][0].type).toBe('notifications/markNotificationAsRead');
    expect(dispatchSpy.mock.calls[0][0].payload).toBe(3);
  });

  test('should update when the notifications length changes', () => {
    const preloaded1 = {
      notifications: {
        notifications: [
          { id: 1, type: 'default', value: 'Notification 1' },
        ],
        displayDrawer: true,
      },
    };

    const { unmount } = renderWithStore(<Notifications />, preloaded1);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(1);
    unmount();

    const preloaded2 = {
      notifications: {
        notifications: [
          { id: 1, type: 'default', value: 'Notification 1' },
          { id: 2, type: 'urgent', value: 'Notification 2' },
        ],
        displayDrawer: true,
      },
    };

    renderWithStore(<Notifications />, preloaded2);
    const updatedListItems = screen.getAllByRole('listitem');
    expect(updatedListItems).toHaveLength(2);
  });

  test('should maintain same content when notifications are unchanged', () => {
    const preloaded = {
      notifications: {
        notifications: [
          { id: 1, type: 'default', value: 'Notification 1' },
          { id: 2, type: 'urgent', value: 'Notification 2' },
        ],
        displayDrawer: true,
      },
    };

    renderWithStore(<Notifications />, preloaded);
    const firstListItems = screen.getAllByRole('listitem');
    expect(firstListItems).toHaveLength(2);
    expect(firstListItems[0].textContent).toContain('Notification 1');
  });

  test('should dispatch showDrawer when "Your notifications" is clicked', () => {
    const preloaded = {
      notifications: {
        notifications: [],
        displayDrawer: false,
      },
    };

    const store = buildTestStore(preloaded);
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const notificationTitle = screen.getByText('Your notifications');
    fireEvent.click(notificationTitle);

    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy.mock.calls[0][0].type).toBe('notifications/showDrawer');
  });

  test('should dispatch hideDrawer when close button is clicked', () => {
    const preloaded = {
      notifications: {
        notifications: [{ id: 1, type: 'default', value: 'Test notification' }],
        displayDrawer: true,
      },
    };

    const store = buildTestStore(preloaded);
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy.mock.calls[0][0].type).toBe('notifications/hideDrawer');
  });
});
