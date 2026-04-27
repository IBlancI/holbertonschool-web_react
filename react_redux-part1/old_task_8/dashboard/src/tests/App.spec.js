import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from "../App";
import authReducer, { login, logout } from "../features/auth/authSlice";
import notificationsReducer, { fetchNotifications } from "../features/notifications/notificationsSlice";
import coursesReducer, { fetchCourses } from "../features/courses/coursesSlice";
import { act } from "@testing-library/react";

const renderWithStore = (ui, { preloadedState } = {}) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      notifications: notificationsReducer,
      courses: coursesReducer,
    },
    preloadedState,
  });

  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
};

const mockNotifications = [
  { id: 1, type: "default", value: "New course available" },
  { id: 2, type: "urgent", value: "New resume available" },
];

const mockCourses = [
  { id: 1, name: "React", credit: 40 },
  { id: 2, name: "Webpack", credit: 20 },
];

describe("App Component (Redux Integration)", () => {
  test("renders login form when not logged in", () => {
    renderWithStore(<App />, {
      preloadedState: { auth: { isLoggedIn: false, email: "", password: "" } },
    });

    expect(screen.getByText(/log in to continue/i)).toBeInTheDocument();
    expect(screen.queryByText(/course list/i)).not.toBeInTheDocument();
  });

  test("renders CourseList when logged in", () => {
    renderWithStore(<App />, {
      preloadedState: {
        auth: { isLoggedIn: true, email: "user@test.com", password: "123" },
        courses: { courses: mockCourses },
      },
    });

    expect(screen.getByText(/course list/i)).toBeInTheDocument();
    expect(screen.getByText(/react/i)).toBeInTheDocument();
    expect(screen.getByText(/webpack/i)).toBeInTheDocument();
    expect(screen.queryByText(/log in to continue/i)).not.toBeInTheDocument();
  });

  test("fetches notifications on mount and displays them", async () => {
    const { store } = renderWithStore(<App />, {
      preloadedState: { notifications: { notifications: [], displayDrawer: true } },
    });

    store.dispatch(fetchNotifications.fulfilled(mockNotifications));

    await waitFor(() => {
      expect(screen.getByText(/new course available/i)).toBeInTheDocument();
      expect(screen.getByText(/new resume available/i)).toBeInTheDocument();
    });
  });

  test("opens and closes notification drawer", async () => {
    const { store } = renderWithStore(<App />, {
      preloadedState: { notifications: { notifications: mockNotifications, displayDrawer: false } },
    });

    fireEvent.click(screen.getByText(/your notifications/i));
    await waitFor(() => {
      expect(screen.getByTestId("Notifications")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    await waitFor(() => {
      expect(screen.queryByTestId("Notifications")).not.toBeInTheDocument();
    });
  });

  test("markNotificationAsRead removes a notification", async () => {
    const { store } = renderWithStore(<App />, {
      preloadedState: { notifications: { notifications: mockNotifications, displayDrawer: true } },
    });

    const firstNotif = await screen.findByText(/new course available/i);
    fireEvent.click(firstNotif);

    await waitFor(() => {
      expect(screen.queryByText(/new course available/i)).not.toBeInTheDocument();
    });
  });


  test("login and logout flow updates Redux state and UI", async () => {
    const { store } = renderWithStore(<App />, {
      preloadedState: { auth: { user: { email: "", password: "" }, isLoggedIn: false } },
    });

    await act(async () => {
      store.dispatch(login({ email: "user@test.com", password: "123" }));
    });

    await waitFor(() => {
      expect(screen.getByText(/course list/i)).toBeInTheDocument();
      expect(screen.queryByText(/log in to continue/i)).not.toBeInTheDocument();
    });

    await act(async () => {
      store.dispatch(logout());
    });

    await waitFor(() => {
      expect(screen.getByText(/log in to continue/i)).toBeInTheDocument();
      expect(screen.queryByText(/course list/i)).not.toBeInTheDocument();
    });
  });


  test("fetches courses after login", async () => {
    const { store } = renderWithStore(<App />, {
      preloadedState: { auth: { isLoggedIn: true, email: "user@test.com", password: "123" } },
    });

    store.dispatch(fetchCourses.fulfilled(mockCourses));

    await waitFor(() => {
      expect(screen.getByText(/react/i)).toBeInTheDocument();
      expect(screen.getByText(/webpack/i)).toBeInTheDocument();
    });
  });
});
