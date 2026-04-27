import mockAxios from 'jest-mock-axios';
import notificationsSlice, {
  markNotificationAsRead,
  fetchNotifications,
} from '../notifications/notificationsSlice';

afterEach(() => {
  mockAxios.reset();
});

describe('notificationsSlice', () => {
  const initialState = {
    notifications: [],
  };

  test('should return the initial state', () => {
    expect(notificationsSlice(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  test('should handle markNotificationAsRead', () => {
    const populatedState = {
      ...initialState,
      notifications: [
        { id: 1, message: 'Notification 1' },
        { id: 2, message: 'Notification 2' },
      ],
    };
    const action = markNotificationAsRead(1);
    const expected = {
      ...populatedState,
      notifications: [{ id: 2, message: 'Notification 2' }],
    };
    expect(notificationsSlice(populatedState, action)).toEqual(
      expected
    );
  });

  describe('fetchNotifications async thunk', () => {
    test('should handle fetchNotifications.pending', () => {
      const action = { type: fetchNotifications.pending.type };
      const state = notificationsSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
      });
    });

    test('should handle fetchNotifications.rejected', () => {
      const action = {
        type: fetchNotifications.rejected.type,
      };
      const state = notificationsSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
      });
    });

    test('should handle fetchNotifications.fulfilled when API request is successful', async () => {
      const sampleData = [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
        { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong>' } },
      ];

      const mockDispatch = jest.fn();
      const mockGetState = jest.fn();

      const thunkPromise = fetchNotifications()(mockDispatch, mockGetState, null);

      mockAxios.mockResponse({
        data: { notifications: sampleData }
      });

      await thunkPromise;

      expect(mockDispatch).toHaveBeenCalledTimes(2);

      const fulfilledAction = mockDispatch.mock.calls[1][0];

      expect(fulfilledAction).toEqual(
        expect.objectContaining({
          type: fetchNotifications.fulfilled.type,
          payload: expect.any(Array),
        })
      );

      expect(fulfilledAction.payload).toHaveLength(3);
      expect(fulfilledAction.payload).not.toEqual([]);
    });

    test('should update state.notifications when fetchNotifications succeeds', () => {
      const fakeNotifs = [
        { id: 1, value: 'notification 1' },
        { id: 2, value: 'notification 2' },
        { id: 3, type: 'urgent', html: { __html: 'test' } }
      ];

      const action = {
        type: fetchNotifications.fulfilled.type,
        payload: fakeNotifs
      };

      const updatedState = notificationsSlice(initialState, action);

      expect(updatedState.notifications).toEqual(fakeNotifs);
      expect(updatedState.notifications).toHaveLength(3);
      expect(updatedState.notifications).not.toEqual([]);
    });

    test('should verify payload contains expected notification structure', async () => {
      const stubNotifs = [
        { id: 1, type: 'default', value: 'First' },
        { id: 2, type: 'urgent', value: 'Second' }
      ];

      const mockDispatch = jest.fn();
      const mockGetState = jest.fn();

      const thunkPromise = fetchNotifications()(mockDispatch, mockGetState, null);
      mockAxios.mockResponse({ data: { notifications: stubNotifs } });
      await thunkPromise;

      const fulfilledAction = mockDispatch.mock.calls[1][0];

      expect(fulfilledAction.payload).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: expect.any(Number) })
        ])
      );
      expect(fulfilledAction.payload.length).toBeGreaterThan(0);
    });
  });
});
