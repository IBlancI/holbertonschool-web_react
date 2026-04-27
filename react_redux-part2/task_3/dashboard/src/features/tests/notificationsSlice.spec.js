import notificationsSlice, {
  markNotificationAsRead,
  fetchNotifications,
} from '../notifications/notificationsSlice';
import mockAxios from 'jest-mock-axios';

afterEach(() => {
  mockAxios.reset();
});

describe('notificationsSlice', () => {
  const initialState = {
    notifications: [],
    loading: false,
  };

  test('returns the default state when no action is provided', () => {
    expect(notificationsSlice(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  test('removes the targeted notification via markNotificationAsRead', () => {
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
    test('sets loading to true on pending', () => {
      const action = { type: fetchNotifications.pending.type };
      const result = notificationsSlice(initialState, action);
      expect(result).toEqual({
        ...initialState,
        loading: true,
      });
    });

    test('sets loading to false on rejected', () => {
      const action = {
        type: fetchNotifications.rejected.type,
      };
      const result = notificationsSlice(initialState, action);
      expect(result).toEqual({
        ...initialState,
        loading: false,
      });
    });

    test('extracts and stores unread notifications on fulfilled', async () => {
      const notifications = [
        { id: 1, context: { type: "default", isRead: false, value: "New course available" } },
        { id: 2, context: { type: "urgent", isRead: false, value: "New resume available" } },
        { id: 3, context: { type: 'urgent', isRead: false, value: 'Placeholder' } },
      ];

      const dispatchMock = jest.fn();
      const getStateMock = jest.fn();

      const promise = fetchNotifications()(dispatchMock, getStateMock, null);

      mockAxios.mockResponse({
        data: notifications,
      });

      await promise;

      expect(dispatchMock).toHaveBeenCalledTimes(2);

      const fulfilledAction = dispatchMock.mock.calls[1][0];

      expect(fulfilledAction.type).toEqual(fetchNotifications.fulfilled.type);
      expect(fulfilledAction.payload).toEqual([
        { id: 1, type: "default", isRead: false, value: "New course available" },
        { id: 2, type: "urgent", isRead: false, value: "New resume available" },
        { id: 3, type: 'urgent', isRead: false, value: 'Placeholder' },
      ]);
    });
  });
});
