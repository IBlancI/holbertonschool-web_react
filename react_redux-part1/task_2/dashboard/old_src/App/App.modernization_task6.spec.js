// task_4/dashboard/src/App/App.modernization_task6.spec.js
// cspell:disable
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import mockAxios from 'axios'; // mappé vers jest-mock-axios via package.json

// Couper le bruit des logs (HOC WithLogging) pendant ces tests
beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
});
afterAll(() => {
  console.log.mockRestore && console.log.mockRestore();
});

describe('Task 6 – Side Effects (fetch via axios + jest-mock-axios)', () => {
  afterEach(() => {
    mockAxios.reset();
    jest.clearAllMocks();
  });

  test('notifications.json est récupéré au montage puis rendu quand le panneau est ouvert (un seul appel)', async () => {
    render(<App />);

    // 1) fetch sur montage
    expect(mockAxios.get).toHaveBeenCalledWith('notifications.json');

    // 2) répondre avec deux notifs
    const notifs = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
    ];
    mockAxios.mockResponse({ data: notifs });

    // 3) ouvrir le panneau pour rendre la liste visible dans le DOM
    fireEvent.click(screen.getByTestId('notifications-title'));

    // 4) vérifier qu'un item s'affiche
    expect(await screen.findByText(/New course available/i)).toBeInTheDocument();

    // 5) pas de refetch supplémentaire
    const notifCalls = mockAxios.get.mock.calls.filter(c => c[0] === 'notifications.json');
    expect(notifCalls.length).toBe(1);
  });

  test('courses.json est récupéré uniquement après login et les cours s’affichent', async () => {
    render(<App />);

    // solder notifications
    expect(mockAxios.get).toHaveBeenCalledWith('notifications.json');
    mockAxios.mockResponse({ data: [] });

    // login (déclencheur de fetch courses)
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@test.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'longpass' } });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    // appel attendu
    await waitFor(() => {
      expect(mockAxios.get).toHaveBeenCalledWith('courses.json');
    });

    // réponse avec des cours
    const courses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ];
    mockAxios.mockResponse({ data: courses });

    // rendu des cours
    await waitFor(() => {
      expect(screen.getByText(/ES6/i)).toBeInTheDocument();
      expect(screen.getByText(/Webpack/i)).toBeInTheDocument();
      expect(screen.getByText(/React/i)).toBeInTheDocument();
    });
  });

  test('les cours sont vidés au logout (pas de refetch inutile)', async () => {
    render(<App />);

    // solder notifications
    expect(mockAxios.get).toHaveBeenCalledWith('notifications.json');
    mockAxios.mockResponse({ data: [] });

    // login
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@test.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'longpass' } });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    await waitFor(() => {
      expect(mockAxios.get).toHaveBeenCalledWith('courses.json');
    });

    mockAxios.mockResponse({ data: [{ id: 1, name: 'ES6', credit: 60 }] });
    expect(await screen.findByText(/ES6/i)).toBeInTheDocument();

    // logout => CourseList disparaît / cours vidés
    fireEvent.click(screen.getByText(/\(logout\)/i));
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.queryByText(/ES6/i)).toBeNull();

    // pas d’appel courses.json supplémentaire au logout
    const courseCalls = mockAxios.get.mock.calls.filter(c => c[0] === 'courses.json');
    expect(courseCalls.length).toBe(1);
  });
});
