import notificationsSlice, {
  fetchNotifications,
  markNotificationAsRead,
} from '../notifications/notificationsSlice';
import mockAxios from 'jest-mock-axios';

afterEach(() => {
  mockAxios.reset();
});

describe('notificationsSlice', () => {
  const defaultState = {
    notifications: [],
    loading: false,
  };

  test('returns the default initial state', () => {
    expect(notificationsSlice(undefined, { type: 'unknown' })).toEqual(
      defaultState
    );
  });

  test('removes a notification via markNotificationAsRead', () => {
    const populatedState = {
      ...defaultState,
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
      const result = notificationsSlice(defaultState, action);
      expect(result).toEqual({
        ...defaultState,
        loading: true,
      });
    });

    test('sets loading to false on rejected', () => {
      const action = {
        type: fetchNotifications.rejected.type,
      };
      const result = notificationsSlice(defaultState, action);
      expect(result).toEqual({
        ...defaultState,
        loading: false,
      });
    });

    test('populates notifications on fulfilled with successful API response', async () => {
      const notifData = [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
        { id: 3, type: 'urgent', value: 'Placeholder' },
      ];

      const dispatch = jest.fn();
      const getState = jest.fn();

      const promise = fetchNotifications()(dispatch, getState, null);

      mockAxios.mockResponse({
        data: { notifications: notifData },
      });

      await promise;

      expect(dispatch).toHaveBeenCalledTimes(2);

      const resolvedAction = dispatch.mock.calls[1][0];

      expect(resolvedAction.type).toEqual(fetchNotifications.fulfilled.type);
      expect(resolvedAction.payload).toEqual([
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
        { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
      ]);
    });
  });
});
