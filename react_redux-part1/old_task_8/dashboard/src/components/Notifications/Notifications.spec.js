import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, jest } from "@jest/globals";
import Notifications from "./Notifications.jsx";

const notificationsList = [
  { id: 1, type: "default", value: "New course available" },
  { id: 2, type: "urgent", value: "New resume available" },
  { id: 3, type: "urgent", html: { __html: "<strong>Urgent requirement</strong> - complete by EOD" } },
];

describe("Notifications Component", () => {
  const mockDisplay = jest.fn();
  const mockHide = jest.fn();
  const mockMark = jest.fn();

  test("renders menu item and notifications drawer correctly", () => {
    render(
      <Notifications
        notifications={notificationsList}
        displayDrawer={true}
        handleDisplayDrawer={mockDisplay}
        handleHideDrawer={mockHide}
        markNotificationAsRead={mockMark}
      />
    );

    expect(screen.getByText(/Your notifications/i)).toBeInTheDocument();
    expect(screen.getByTestId("Notifications")).toBeInTheDocument();

    notificationsList.forEach((notif) => {
      if (notif.value) {
        expect(screen.getByText(notif.value)).toBeInTheDocument();
      }
      if (notif.html) {
        expect(screen.getByText(/Urgent requirement/i)).toBeInTheDocument();
      }
    });
  });

  test("calls handleDisplayDrawer when menu item is clicked", () => {
    render(
      <Notifications
        notifications={[]}
        displayDrawer={false}
        handleDisplayDrawer={mockDisplay}
        handleHideDrawer={mockHide}
        markNotificationAsRead={mockMark}
      />
    );

    fireEvent.click(screen.getByText(/Your notifications/i));
    expect(mockDisplay).toHaveBeenCalled();
  });

  test("calls handleHideDrawer when close button is clicked", () => {
    render(
      <Notifications
        notifications={[]}
        displayDrawer={true}
        handleDisplayDrawer={mockDisplay}
        handleHideDrawer={mockHide}
        markNotificationAsRead={mockMark}
      />
    );

    const closeButton = screen.getByLabelText("Close");
    fireEvent.click(closeButton);
    expect(mockHide).toHaveBeenCalled();
  });

  test("calls markNotificationAsRead with correct id when NotificationItem is clicked", () => {
    render(
      <Notifications
        notifications={notificationsList}
        displayDrawer={true}
        handleDisplayDrawer={mockDisplay}
        handleHideDrawer={mockHide}
        markNotificationAsRead={mockMark}
      />
    );

    const firstNotif = screen.getByText("New course available");
    fireEvent.click(firstNotif);
    expect(mockMark).toHaveBeenCalledWith(1);

    const htmlNotif = screen.getByText(/Urgent requirement/i);
    fireEvent.click(htmlNotif);
    expect(mockMark).toHaveBeenCalledWith(3);
  });

  test("renders 'No new notification for now' when notifications list is empty", () => {
    render(
      <Notifications
        notifications={[]}
        displayDrawer={true}
        handleDisplayDrawer={mockDisplay}
        handleHideDrawer={mockHide}
        markNotificationAsRead={mockMark}
      />
    );

    expect(screen.getByText(/No new notification for now/i)).toBeInTheDocument();
  });
});
