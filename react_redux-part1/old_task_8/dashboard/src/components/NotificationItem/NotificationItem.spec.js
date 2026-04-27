import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, jest } from "@jest/globals";
import NotificationItem from "./NotificationItem.jsx";
import { getLatestNotification } from "../../utils/utils.js";

describe("NotificationItem Component", () => {

  test("renders without crashing", () => {
    const mockMarkAsRead = jest.fn();
    render(<NotificationItem id={1} markAsRead={mockMarkAsRead} />);
    const item = screen.getByTestId("notification-item");
    expect(item).toBeInTheDocument();
  });

  test('renders correctly with type="default" and text value', () => {
    const props = {
      id: 2,
      type: "default",
      value: "Default notification",
      markAsRead: jest.fn(),
    };

    render(<NotificationItem {...props} />);
    const li = screen.getByText("Default notification");

    expect(li).toHaveAttribute("data-notification-type", "default");
    expect(li).toHaveStyle({ color: "var(--default-notification-item)" });
  });

  test('renders correctly with type="urgent" and HTML content', () => {
    const props = {
      id: 3,
      type: "urgent",
      html: { __html: getLatestNotification() },
      markAsRead: jest.fn(),
    };

    render(<NotificationItem {...props} />);
    const li = screen.getByTestId("notification-item");

    expect(li).toHaveAttribute("data-notification-type", "urgent");
    expect(li).toHaveStyle({ color: "var(--urgent-notification-item)" });
    expect(li.innerHTML).toContain("Urgent requirement");
  });

  test("calls markAsRead with the correct id when clicked", () => {
    const mockMarkAsRead = jest.fn();
    const props = {
      id: 4,
      type: "default",
      value: "Click me",
      markAsRead: mockMarkAsRead,
    };

    render(<NotificationItem {...props} />);
    const li = screen.getByText("Click me");

    fireEvent.click(li);
    expect(mockMarkAsRead).toHaveBeenCalledWith(4);
  });

});
