// src/App/App.spec.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

import { waitFor } from '@testing-library/react';
import mockAxios from 'axios'; // mapped to jest-mock-axios

// beforeAll(() => {
//   jest.spyOn(console, 'log').mockImplementation(() => {});
// });
// afterAll(() => {
//   console.log.mockRestore && console.log.mockRestore();
// });

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

// 🔧 Clean axios + mocks before every test to avoid cross-test leaks
beforeEach(() => {
  if (mockAxios.reset) mockAxios.reset();
  jest.clearAllMocks();
});

afterAll(() => {
  console.log.mockRestore && console.log.mockRestore();
});

/**
 * project reac_props
 * Task 2 checks (sign-in form)
 */
describe('App (Task 2) - sign in form', () => {
  test('renders two input elements (email and password)', () => {
    const { container } = render(<App />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      container.querySelectorAll('input[type="email"], input[type="password"]')
    ).toHaveLength(2);
  });

  test('renders two labels with texts "Email" and "Password"', () => {
    render(<App />);
    expect(screen.getByText(/email/i).tagName).toBe('LABEL');
    expect(screen.getByText(/password/i).tagName).toBe('LABEL');
  });

  test('renders a button with text OK', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument();
  });
});

/**
 * project reac_props
 * Task 4 checks (conditional rendering)
 */
describe('App (Task 4)', () => {
  test('renders Login when not logged in', () => {
    const { container } = render(<App />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(container.querySelector('#CourseList')).toBeNull();
  });

  test('renders CourseList after a successful login (instead of isLoggedIn=true prop)', () => {
    const { container } = render(<App />);

    const emailInput = screen.getByLabelText(/email/i);
    const pwdInput = screen.getByLabelText(/password/i);
    const submit = screen.getByRole('button', { name: /ok/i });

    fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
    fireEvent.change(pwdInput, { target: { value: 'longpass' } });
    fireEvent.click(submit);

    expect(container.querySelector('#CourseList')).not.toBeNull();
    expect(screen.queryByLabelText(/email/i)).toBeNull();
    expect(screen.queryByLabelText(/password/i)).toBeNull();
  });

  test('displays "News from the School" block with its paragraph by default', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { level: 2, name: /News from the School/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Holberton School News goes here/i)
    ).toBeInTheDocument();
  });
});

/**
 * Task 0 checks (notifications drawer state)
 */
describe('App (Task 0) - notifications drawer state', () => {
  // test('clicking "Your notifications" opens the drawer (state -> true)', () => {
  //   render(<App />);

  //   const menuItem = screen.getByTestId('notifications-title');
  //   fireEvent.click(menuItem);

  //   expect(
  //     screen.getByText(/Here is the list of notifications/i)
  //   ).toBeInTheDocument();
  // });

  // test('clicking close button hides the drawer (state -> false)', () => {
  //   render(<App />);

  //   fireEvent.click(screen.getByTestId('notifications-title'));
  //   const closeBtn = screen.getByRole('button', { name: /close/i });
  //   fireEvent.click(closeBtn);

  //   expect(
  //     screen.queryByText(/Here is the list of notifications/i)
  //   ).not.toBeInTheDocument();
  // });
  test('clicking "Your notifications" shows the notifications panel', () => {
    render(<App />);
    const menuItem = screen.getByTestId('notifications-title');
    fireEvent.click(menuItem);
    // Le panneau existe et affiche au moins le placeholder par défaut
    expect(screen.getByText(/Your notifications/i)).toBeInTheDocument();
    expect(screen.getByText(/No new notification for now/i)).toBeInTheDocument();
  });

  test('notifications panel is rendered at mount and remains stable after clicking title', () => {
    render(<App />);
    // Présent au montage
    expect(screen.getByText(/Your notifications/i)).toBeInTheDocument();
    // Cliquer le titre ne casse rien
    fireEvent.click(screen.getByTestId('notifications-title'));
    expect(screen.getByText(/Your notifications/i)).toBeInTheDocument();
  });
});

/**
 * Task 2 checks (Context-based login)
 */
describe('App (Task 2) - Context login behavior', () => {
  test('updates user state and displays CourseList after successful login', () => {
    const { container } = render(<App />);

    const emailInput = screen.getByLabelText(/email/i);
    const pwdInput = screen.getByLabelText(/password/i);
    const submit = screen.getByRole('button', { name: /ok/i });

    expect(submit).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
    fireEvent.change(pwdInput, { target: { value: 'longpass' } });
    expect(submit).toBeEnabled();

    fireEvent.click(submit);

    expect(container.querySelector('#CourseList')).not.toBeNull();
    expect(screen.queryByLabelText(/email/i)).toBeNull();
    expect(screen.queryByLabelText(/password/i)).toBeNull();
  });
});

/* ================================
 * react_state – Task 3 – Header logout integration
 * ================================ */
describe('react_state / Task 3 – Header logout integration', () => {
  test('does NOT render the logoutSection by default', () => {
    render(<App />);
    expect(document.querySelector('#logoutSection')).toBeNull();
  });

  test('after logging in, header shows logoutSection with email', () => {
    const { container } = render(<App />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'longpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    expect(container.querySelector('#CourseList')).not.toBeNull();

    const section = document.querySelector('#logoutSection');
    expect(section).not.toBeNull();
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    expect(screen.getByText('user@test.com')).toBeInTheDocument();
    expect(screen.getByText(/\(logout\)/i)).toBeInTheDocument();
  });

  test('clicking on "(logout)" logs the user out and shows login form again', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'longpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    const logoutLink = screen.getByText(/\(logout\)/i);
    fireEvent.click(logoutLink);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(document.querySelector('#logoutSection')).toBeNull();
  });
});

describe('App – functional component shape', () => {
  test('App is a function component (not a class)', () => {
    // 1) une fonction JS
    expect(typeof App).toBe('function');

    // 2) pas de prototype React de classe (les classes ont isReactComponent)
    //    -> doit être undefined pour un composant fonctionnel
    expect(App.prototype?.isReactComponent).toBeUndefined();
  });
});

// -------------------------
// Task 6 – Side Effects
// -------------------------
// import { waitFor } from '@testing-library/react';
// import mockAxios from 'axios'; // jest-mock-axios via moduleNameMapper

describe('App (Task 6) – Side Effects', () => {
  afterEach(() => {
    mockAxios.reset();
    jest.clearAllMocks();
  });

  test('fetches notifications.json on initial mount and renders one item', async () => {
    render(<App />);

    // premier GET: notifications
    expect(mockAxios.get).toHaveBeenCalledWith('notifications.json');

    // on répond avec des notifs
    const notifs = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
    ];
    mockAxios.mockResponse({ data: notifs });

    // Ouvre le panneau pour rendre la liste visible
    fireEvent.click(screen.getByTestId('notifications-title'));

    // Vérifie qu'un item de la liste est affiché
    expect(await screen.findByText(/New course available/i)).toBeInTheDocument();

    // Facultatif : vérifier que le placeholder n’est plus visible
    expect(screen.queryByText(/No new notification for now/i)).toBeNull();

    // pas de refetch supplémentaire
    expect(
      mockAxios.get.mock.calls.filter((c) => c[0] === 'notifications.json').length
    ).toBe(1);
  });

  test('fetches courses.json only after user logs in', async () => {
    render(<App />);

    // settle l'appel notifications
    expect(mockAxios.get).toHaveBeenCalledWith('notifications.json');
    mockAxios.mockResponse({ data: [] });

    // login
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@test.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'longpass' } });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    // maintenant, on doit appeler courses.json
    await waitFor(() => {
      expect(mockAxios.get).toHaveBeenCalledWith('courses.json');
    });

    // renvoyer des cours
    const courses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 }
    ];
    mockAxios.mockResponse({ data: courses });

    // vérifier que ça s'affiche (selon ton CourseList : "ES6", "Webpack")
    await waitFor(() => {
      expect(screen.getByText(/ES6/i)).toBeInTheDocument();
      expect(screen.getByText(/Webpack/i)).toBeInTheDocument();
    });
  });
});
