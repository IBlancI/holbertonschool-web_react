import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";
import { getLatestNotification } from "../../utils/utils";

jest.mock("../../utils/utils", () => ({
  getLatestNotification: jest.fn(),
}));

describe("Notifications component", () => {
  beforeEach(() => {
    getLatestNotification.mockReturnValue(
      "<strong>Urgent requirement</strong> - complete by EOD"
    );
  });

  test("renders the notifications title", () => {
    const props = {
      notifications: [
        { id: 1, type: "default", value: "New course available" },
      ],
      displayDrawer: true,
    };
    render(<Notifications {...props} />);
    expect(screen.getByText(/Here is the list of notifications/i)).toBeInTheDocument();
  });

  test("renders the close button", () => {
    const props = {
      notifications: [
        { id: 1, type: "default", value: "New course available" },
      ],
      displayDrawer: true,
    };
    render(<Notifications {...props} />);
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });

  test("calls handleHideDrawer when close button is clicked", () => {
    const handleHideDrawerMock = jest.fn();
    const props = {
      notifications: [
        { id: 1, type: "default", value: "New course available" },
      ],
      displayDrawer: true,
      handleHideDrawer: handleHideDrawerMock,
    };

    render(<Notifications {...props} />);
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(handleHideDrawerMock).toHaveBeenCalledTimes(1);
  });

  test("it should display 3 notification items as expected through props", () => {
    const props = {
      notifications: [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
        { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
      ],
      displayDrawer: true,
    };

    render(<Notifications {...props} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  test('does not display items when displayDrawer is false', () => {
    const props = {
      notifications: [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
        { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
      ],
      displayDrawer: false,
    };
    render(<Notifications {...props} />);

    expect(screen.queryByText(/here is the list of notifications/i)).toBeNull();
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  test('displays "No new notifications for now" when list is empty', () => {
    const props = {
      notifications: [],
      displayDrawer: true,
    };
    render(<Notifications {...props} />);

    expect(screen.getByText(/no new notifications for now/i)).toBeInTheDocument();
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  test('displays "Your notifications" in all cases', () => {
    const data = [
      { id: 1, type: "default", value: "New course available" },
    ];

    const { rerender } = render(
      <Notifications displayDrawer={false} notifications={[]} />
    );
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();

    rerender(<Notifications displayDrawer={true} notifications={[]} />);
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();

    rerender(<Notifications displayDrawer={true} notifications={data} />);
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });

  test("displays close button, paragraph, and notification items when drawer is open", () => {
    const props = {
      notifications: [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
        { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
      ],
      displayDrawer: true,
    };

    render(<Notifications {...props} />);

    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  test("calls markNotificationAsRead when a notification item is clicked", () => {
    const markMock = jest.fn();
    const props = {
      notifications: [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
        { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
      ],
      displayDrawer: true,
      markNotificationAsRead: markMock,
    };

    render(<Notifications {...props} />);

    const items = screen.getAllByRole("listitem");

    fireEvent.click(items[0]);
    expect(markMock).toHaveBeenCalledWith(1);

    markMock.mockClear();
    fireEvent.click(items[1]);
    expect(markMock).toHaveBeenCalledWith(2);

    markMock.mockClear();
    fireEvent.click(items[2]);
    expect(markMock).toHaveBeenCalledWith(3);
  });

  test('updates when notification length changes', () => {
    const initial = [
      { id: 1, type: 'default', value: 'Notification 1' },
    ];

    const updated = [
      { id: 1, type: 'default', value: 'Notification 1' },
      { id: 2, type: 'urgent', value: 'Notification 2' },
    ];

    const { rerender } = render(<Notifications notifications={initial} displayDrawer={true} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(1);

    rerender(<Notifications notifications={updated} displayDrawer={true} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  test('maintains content when notifications are unchanged', () => {
    const data = [
      { id: 1, type: 'default', value: 'Notification 1' },
      { id: 2, type: 'urgent', value: 'Notification 2' },
    ];

    const { rerender } = render(<Notifications notifications={data} displayDrawer={true} />);
    const first = screen.getAllByRole('listitem');
    expect(first).toHaveLength(2);

    rerender(<Notifications notifications={data} displayDrawer={true} />);
    const second = screen.getAllByRole('listitem');
    expect(second).toHaveLength(2);
    expect(second[0].textContent).toBe(first[0].textContent);
  });

  test('calls handleDisplayDrawer when "Your notifications" is clicked', () => {
    const displayMock = jest.fn();
    const props = {
      notifications: [],
      displayDrawer: false,
      handleDisplayDrawer: displayMock,
    };

    render(<Notifications {...props} />);
    fireEvent.click(screen.getByText('Your notifications'));
    expect(displayMock).toHaveBeenCalledTimes(1);
  });

  test('calls handleHideDrawer when close button is clicked', () => {
    const hideMock = jest.fn();
    const props = {
      notifications: [{ id: 1, type: 'default', value: 'Test' }],
      displayDrawer: true,
      handleHideDrawer: hideMock,
    };

    render(<Notifications {...props} />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(hideMock).toHaveBeenCalledTimes(1);
  });
});
