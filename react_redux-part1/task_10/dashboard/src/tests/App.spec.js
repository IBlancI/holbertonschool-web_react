// src/App/App.spec.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

/**
 * project reac_props
 * Task 2 checks (sign-in form)
 * ==> AVANT: render(<App isLoggedIn={false} />)
 * ==> MAINTENANT: render(<App />)
 */
describe('App (Task 2) - sign in form', () => {
  test('renders two input elements (email and password)', () => {
    const { container } = render(<App />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    // 2 inputs attendus
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
 * ==> AVANT: on forçait isLoggedIn via props
 * ==> MAINTENANT: on simule le login pour voir CourseList
 */
describe('App (Task 4)', () => {
  test('renders Login when not logged in', () => {
    const { container } = render(<App />);
    // login form visible
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    // CourseList not rendered
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

    // CourseList présent
    expect(container.querySelector('#CourseList')).not.toBeNull();
    // Login disparu
    expect(screen.queryByLabelText(/email/i)).toBeNull();
    expect(screen.queryByLabelText(/password/i)).toBeNull();
  });
});

/**
 * project react_component
 * Task 1 checks (lifecycle & keyboard)
 * ==> AVANT: on vérifiait l’appel du prop logOut
 * ==> MAINTENANT: App appelle this.state.logOut() → on teste l’EFFET: alerte + retour au formulaire
 */
describe('App (Task 1) - lifecycle & keyboard', () => {
  let alertSpy;

  beforeEach(() => {
    alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    alertSpy.mockRestore();
  });

  test('alerts "Logging you out" when Ctrl+H is pressed', () => {
    render(<App />);

    // on se connecte pour que le logout ait un sens
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'longpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    // simulate Ctrl+H
    fireEvent.keyDown(document, { key: 'h', ctrlKey: true });

    expect(window.alert).toHaveBeenCalledWith('Logging you out');
  });

  test('returns to login form when Ctrl+H is pressed', () => {
    render(<App />);

    // login d’abord
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'longpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    // on est sur CourseList → Ctrl+H
    fireEvent.keyDown(document, { key: 'h', ctrlKey: true });

    // retour au formulaire
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  /**
   * project reac_props
   * Task 4 checks (conditional rendering) — version adaptée
   * On garde le test “News from the School”
   */
  describe('App (Task 4) - conditional rendering (adapted)', () => {
    test('displays "News from the School" block with its paragraph by default', () => {
      render(<App />); // par défaut pas connecté
      expect(
        screen.getByRole('heading', { level: 2, name: /News from the School/i })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Holberton School News goes here/i)
      ).toBeInTheDocument();
    });
  });
});

/**
 * Task 0 checks (notifications drawer state)
 * ==> Ceux-là fonctionnaient, on les garde tels quels
 */
describe('App (Task 0) - notifications drawer state', () => {
  test('clicking "Your notifications" opens the drawer (state -> true)', () => {
    render(<App />);

    const menuItem = screen.getByTestId('notifications-title');
    fireEvent.click(menuItem);

    expect(
      screen.getByText(/Here is the list of notifications/i)
    ).toBeInTheDocument();
  });

  test('clicking close button hides the drawer (state -> false)', () => {
    render(<App />);

    // ouvrir
    fireEvent.click(screen.getByTestId('notifications-title'));

    // fermer
    const closeBtn = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeBtn);

    expect(
      screen.queryByText(/Here is the list of notifications/i)
    ).not.toBeInTheDocument();
  });
});

/**
 * Task 2 checks (Context-based login)
 * ==> c’est déjà ce qu’on a fait plus haut, mais on garde ce bloc
 *     pour rester fidèle à ta structure initiale
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
 *
 * ================================ */
describe('react_state / Task 3 – Header logout integration', () => {
  test('does NOT render the logoutSection by default', () => {
    render(<App />);
    expect(document.querySelector('#logoutSection')).toBeNull();
  });

  test('after logging in, header shows logoutSection with email', () => {
    const { container } = render(<App />);

    // login
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'longpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    // CourseList ok
    expect(container.querySelector('#CourseList')).not.toBeNull();

    // bloc dans le header
    const section = document.querySelector('#logoutSection');
    expect(section).not.toBeNull();
    // expect(screen.getByText(/welcome user@test.com/i)).toBeInTheDocument();
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    expect(screen.getByText('user@test.com')).toBeInTheDocument();
    expect(screen.getByText(/\(logout\)/i)).toBeInTheDocument();
  });

  test('clicking on "(logout)" logs the user out and shows login form again', () => {
    render(<App />);

    // login
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'longpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    // click logout in header
    const logoutLink = screen.getByText(/\(logout\)/i);
    fireEvent.click(logoutLink);

    // check UI reset
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(document.querySelector('#logoutSection')).toBeNull();
  });
});
