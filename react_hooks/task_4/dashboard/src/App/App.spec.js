import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import App from './App';
import mockAxios from 'jest-mock-axios';

afterEach(() => {
  mockAxios.reset();
});

const mockCoursesResponse = {
  data: {
    courses: [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 }
    ]
  }
};

test('The App component renders without crashing', () => {
  render(<App />);
});

test('The App component renders Login by default (user not logged in)', async () => {
  render(<App />);

  await waitFor(() => {
    const emailLabelElement = screen.getByLabelText(/email/i);
    const passwordLabelElement = screen.getByLabelText(/password/i);
    const buttonElements = screen.getAllByRole('button', { name: /ok/i });

    expect(emailLabelElement).toBeInTheDocument();
    expect(passwordLabelElement).toBeInTheDocument();
    expect(buttonElements.length).toBeGreaterThanOrEqual(1);
  });
});

test('it should display "News from the School" title and paragraph by default', async () => {
  render(<App />);

  await waitFor(() => {
    const newsTitle = screen.getByRole('heading', { name: /news from the school/i });
    const newsParagraph = screen.getByText(/holberton school news goes here/i);

    expect(newsTitle).toBeInTheDocument();
    expect(newsParagraph).toBeInTheDocument();
  });
});

test('clicking on a notification item removes it from the list and logs the message', async () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  const { container } = render(<App />);

  await waitFor(() => {
    const notificationItems = container.querySelectorAll('[data-notification-type]');
    expect(notificationItems.length).toBeGreaterThan(0);
  });

  const notificationItems = container.querySelectorAll('[data-notification-type]');
  const initialCount = notificationItems.length;

  if (notificationItems.length > 0) {
    fireEvent.click(notificationItems[0]);

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/Notification \d+ has been marked as read/));

    const updatedNotificationItems = container.querySelectorAll('[data-notification-type]');
    expect(updatedNotificationItems.length).toBe(initialCount - 1);
  }

  consoleSpy.mockRestore();
});

test('handleDisplayDrawer sets displayDrawer to true initially and can be toggled', async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
  });

  const closeButton = screen.getByRole('button', { name: /close/i });
  fireEvent.click(closeButton);

  expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();

  const notificationTitle = screen.getByText(/your notifications/i);
  fireEvent.click(notificationTitle);

  expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
});

test('handleHideDrawer sets displayDrawer to false', async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
  });

  const closeButton = screen.getByRole('button', { name: /close/i });
  fireEvent.click(closeButton);

  expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();
  expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
});

test('logIn function updates user state with email, password, and isLoggedIn true', async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /log in to continue/i })).toBeInTheDocument();

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  const submitButton = screen.getByRole('button', { name: /ok/i });
  fireEvent.click(submitButton);

  mockAxios.mockResponse(mockCoursesResponse);

  await waitFor(() => {
    expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /course list/i })).toBeInTheDocument();
    expect(screen.getByText(/test@example\.com/i)).toBeInTheDocument();
  });
});

test('logOut function resets user state to isLoggedIn false with empty email and password', async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /ok/i });

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(submitButton);

  mockAxios.mockResponse(mockCoursesResponse);

  await waitFor(() => {
    expect(screen.getByText(/test@example\.com/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /course list/i })).toBeInTheDocument();
  });

  const logoutLink = screen.getByText(/logout/i);
  fireEvent.click(logoutLink);

  expect(screen.queryByText(/welcome/i)).not.toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: /course list/i })).not.toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /log in to continue/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
});

test('verify courses data is fetched when user state changes to logged in', async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /ok/i });

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:5173/courses.json');
  });

  mockAxios.mockResponse(mockCoursesResponse);

  await waitFor(() => {
    expect(screen.getByText('ES6')).toBeInTheDocument();
    expect(screen.getByText('Webpack')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });
});
