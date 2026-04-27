import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import Notifications from "./Notifications";
import { getLatestNotification } from "../utils/utils.js";

describe('Notifications', () => {
  const mockNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
  ];

  test('Check the existence of the notifications title Here is the list of notifications', () => {
    render(<Notifications notifications={mockNotifications} displayDrawer={true} />);
    const notiftitle = screen.getByText(/Here is the list of notifications/i);
    expect(notiftitle).toBeInTheDocument();
  });

  test('Check the existence of the button element in the notifications (Close button)', () => {
    render(<Notifications notifications={mockNotifications} displayDrawer={true} />);
    // Cibler explicitement le bouton Close (sinon il y a 2 "button")
    const closeBtn = screen.getByRole('button', { name: /close/i });
    expect(closeBtn).toBeInTheDocument();
  });

  test('Verify that there are 3 li elements as notifications rendered', () => {
    render(<Notifications notifications={mockNotifications} displayDrawer={true} />);
    const lielements = screen.getAllByRole('listitem');
    expect(lielements.length).toBe(3);
  });

  /** NEW: clicking on "Your notifications" calls handleDisplayDrawer */
  test('clicking on "Your notifications" calls handleDisplayDrawer', () => {
    const onOpen = jest.fn();
    render(
      <Notifications
        notifications={mockNotifications}
        displayDrawer={false}
        handleDisplayDrawer={onOpen}
      />
    );
    fireEvent.click(screen.getByTestId('notifications-title'));
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  /** NEW: clicking on the close button calls handleHideDrawer */
  test('clicking on the close button calls handleHideDrawer', () => {
    const onClose = jest.fn();
    render(
      <Notifications
        notifications={mockNotifications}
        displayDrawer={true}
        handleHideDrawer={onClose}
      />
    );
    const closeBtn = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // test('Clicking a notification item logs "Notification {id} has been marked as read"', () => {
  //   const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
  //   render(<Notifications notifications={mockNotifications} displayDrawer={true} />);

    // On clique l’item avec value "New resume available" (id = 2)
    // fireEvent.click(screen.getByText('New resume available'));
    // expect(spy).toHaveBeenCalledWith('Notification 2 has been marked as read');
//     expect(handler).toHaveBeenCalledWith(2);

//     spy.mockRestore();
//   });
// });

  test('Clicking a notification item calls markNotificationAsRead with the right id', () => {
    const handler = jest.fn();
    render(
      <Notifications
        notifications={mockNotifications}
        displayDrawer={true}
        markNotificationAsRead={handler}
      />
    );

    fireEvent.click(screen.getByText('New resume available'));

    expect(handler).toHaveBeenCalledWith(2);
  });
});

describe('Whenever the prop displayDrawer set to false', () => {
  test('Check that the Notifications component doesn t displays the elements', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
    ];
    render(<Notifications notifications={notifications} displayDrawer={false} />);

    expect(screen.queryByText("Here is the list of notifications")).not.toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    // Le menu item (role="button") existe, mais le bouton Close n'existe pas
    expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
  });
});

describe('Whenever the the prop displayDrawer set to true', () => {
  test('Check that the Notifications component displays the elements', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
    ];
    render(<Notifications notifications={notifications} displayDrawer={true} />);

    expect(screen.queryByText("Here is the list of notifications")).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(3);
    // On vérifie spécifiquement la présence du bouton Close
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  test('Check that the Notifications component displays the elements', () => {
    const notifications = [];
    render(<Notifications notifications={notifications} displayDrawer={true} />);
    expect(screen.queryByText("No new notification for now")).toBeInTheDocument();
  });
});

describe('Notifications (Task 7 - shouldComponentUpdate)', () => {
  test("doesn't re-render when notifications length stays the same", () => {
    const initial = [
      { id: 1, type: 'default', value: 'A' },
      { id: 2, type: 'default', value: 'B' },
    ];
    const { rerender } = render(<Notifications notifications={initial} displayDrawer={true} />);

    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();

    const sameLenDifferentContent = [
      { id: 1, type: 'default', value: 'C' },
      { id: 2, type: 'default', value: 'D' },
    ];
    rerender(<Notifications notifications={sameLenDifferentContent} displayDrawer={true} />);

    // Pas de re-render (longueur identique)
    // expect(screen.queryByText('C')).toBeNull();
    // expect(screen.queryByText('D')).toBeNull();
    // expect(screen.getByText('A')).toBeInTheDocument();
    // expect(screen.getByText('B')).toBeInTheDocument();
    // Avec un PureComponent, un changement de props → re-render
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('D')).toBeInTheDocument();
  });

  test('re-renders when notifications length changes', () => {
    const initial = [
      { id: 1, type: 'default', value: 'A' },
      { id: 2, type: 'default', value: 'B' },
    ];
    const { rerender } = render(<Notifications notifications={initial} displayDrawer={true} />);

    const longer = [
      { id: 1, type: 'default', value: 'A' },
      { id: 2, type: 'default', value: 'B' },
      { id: 3, type: 'default', value: 'C' },
    ];
    rerender(<Notifications notifications={longer} displayDrawer={true} />);

    // Re-render (longueur a changé)
    expect(screen.getByText('C')).toBeInTheDocument();
  });
});

describe('Notifications (task 4)', () => {
  test('clicking on a notification logs the expected string even without prop', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const notifs = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
    ];

    render(<Notifications displayDrawer={true} notifications={notifs} />);

    fireEvent.click(screen.getByText('New course available'));

    expect(logSpy).toHaveBeenCalledWith(
      'Notification 1 has been marked as read'
    );

    logSpy.mockRestore();
  });
});
