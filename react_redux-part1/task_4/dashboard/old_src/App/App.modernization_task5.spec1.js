// cspell:disable
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import AppContext from '../Context/context';

// IMPORTANT: jest.mock factory may only reference variables prefixed with "mock"
let mockNotificationsRenderCalls = [];

// Mock <Notifications/> to observe props and trigger callbacks
jest.mock('../Notifications/Notifications', () => {
  const React = require('react');
  return function MockNotifications(props) {
    mockNotificationsRenderCalls.push(props);
    return (
      <div data-testid="mock-notifications">
        {/* helpers to trigger callbacks in tests */}
        <button
          onClick={() => props.markNotificationAsRead?.(1)}
          aria-label="mock-mark-read-1"
        >
          mark-1
        </button>
        <button onClick={props.handleDisplayDrawer} aria-label="mock-open">open</button>
        <button onClick={props.handleHideDrawer} aria-label="mock-close">close</button>

        {/* little echoes for assertions */}
        <div data-testid="drawer-state">{String(props.displayDrawer)}</div>
        <div data-testid="notif-count">{props.listNotifications?.length ?? 0}</div>
      </div>
    );
  };
});

describe('5. Modernizing the Parent – full checker', () => {
  beforeEach(() => {
    mockNotificationsRenderCalls = [];
    jest.restoreAllMocks();
  });

  // === Functional component shape ===
  test('App is a function component (not a class)', () => {
    expect(typeof App).toBe('function');
    expect(App.prototype?.isReactComponent).toBeUndefined();
  });

  // === Hooks / initial state ===
  test('displayDrawer is initialized to true and passed to <Notifications/>', () => {
    render(<App />);
    expect(screen.getByTestId('drawer-state')).toHaveTextContent('true');
  });

  test('notifications is initialized with notificationsList and passed to <Notifications/>', () => {
    render(<App />);
    expect(screen.getByTestId('notif-count')).toHaveTextContent('3');
    const firstProps = mockNotificationsRenderCalls[0];
    expect(Array.isArray(firstProps.listNotifications)).toBe(true);
    expect(firstProps.listNotifications.length).toBeGreaterThanOrEqual(3);
    expect(firstProps.listNotifications.find(n => n.value === 'New course available')).toBeTruthy();
  });

  test('user is initialized from context when provided (fallback to defaultUser otherwise)', () => {
    const ctxUser = { email: 'ctx@ex.com', password: '', isLoggedIn: false };
    render(
      <AppContext.Provider value={{ user: ctxUser, logOut: () => {} }}>
        <App />
      </AppContext.Provider>
    );
    expect(screen.getByLabelText(/email/i)).toHaveValue('ctx@ex.com');
  });

  // === No handleKeydown anymore ===
// test('Ctrl+H does not trigger alert or forced logout', () => {
//   const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
//   render(<App />);

  // login
  // fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'u@x.com' } });
  // fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'pass' } });
  // fireEvent.click(screen.getByRole('button', { name: /ok/i }));

  // simulate Ctrl+H
  // fireEvent.keyDown(document, { key: 'h', ctrlKey: true });

  // On valide seulement : pas d'alerte et CourseList toujours présent
//   expect(alertSpy).not.toHaveBeenCalled();
//   expect(document.querySelector('#CourseList')).not.toBeNull();

//   alertSpy.mockRestore();
// });

  // === Functional handlers + immutability ===
  test('logIn updates email, password, and sets isLoggedIn=true', () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@test.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'longpass' } });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));
    expect(document.querySelector('#CourseList')).not.toBeNull();
  });

  test('logOut resets user (isLoggedIn=false, clears email & password)', () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@test.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'longpass' } });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    fireEvent.click(screen.getByText(/\(logout\)/i));
    expect(screen.getByLabelText(/email/i)).toHaveValue('');
    expect(screen.getByLabelText(/password/i)).toHaveValue('');
  });

  test('markNotificationAsRead removes item without mutating array', () => {
    render(<App />);
    const firstProps = mockNotificationsRenderCalls[0];
    const prevRef = firstProps.listNotifications;

    fireEvent.click(screen.getByLabelText('mock-mark-read-1'));
    const lastProps = mockNotificationsRenderCalls[mockNotificationsRenderCalls.length - 1];

    expect(lastProps.listNotifications.length).toBe(prevRef.length - 1);
    expect(lastProps.listNotifications).not.toBe(prevRef); // new reference
    expect(lastProps.listNotifications.find(n => n.id === 1)).toBeUndefined();
  });

  // === Memoization of callbacks ===
  test('callbacks keep same reference across renders', () => {
    render(<App />);

    const first = mockNotificationsRenderCalls[0];
    // cause a re-render (login)
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@b.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    const last = mockNotificationsRenderCalls[mockNotificationsRenderCalls.length - 1];
    expect(last.handleDisplayDrawer).toBe(first.handleDisplayDrawer);
    expect(last.handleHideDrawer).toBe(first.handleHideDrawer);
    expect(last.markNotificationAsRead).toBe(first.markNotificationAsRead);
  });

  // === Drawer functionality ===
  test('open/close via callbacks', () => {
    render(<App />);
    expect(screen.getByTestId('drawer-state')).toHaveTextContent('true');
    fireEvent.click(screen.getByLabelText('mock-close'));
    expect(screen.getByTestId('drawer-state')).toHaveTextContent('false');
    fireEvent.click(screen.getByLabelText('mock-open'));
    expect(screen.getByTestId('drawer-state')).toHaveTextContent('true');
  });

  // === No console error/warn ===
  test('no console error/warn during render', () => {
    const e = jest.spyOn(console, 'error').mockImplementation(() => {});
    const w = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(<App />);
    expect(e).not.toHaveBeenCalled();
    expect(w).not.toHaveBeenCalled();
    e.mockRestore();
    w.mockRestore();
  });
});
