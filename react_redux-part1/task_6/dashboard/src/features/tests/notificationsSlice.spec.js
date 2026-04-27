import notificationsReducer, {
  fetchNotifications,
  markNotificationAsRead,
  showDrawer,
  hideDrawer,
} from '../notifications/notificationsSlice';
import mockAxios from 'jest-mock-axios';

afterEach(() => {
  mockAxios.reset();
});

describe('notificationsSlice', () => {
  const defaultState = {
    notifications: [],
    displayDrawer: true,
  };

  test('should return the initial state', () => {
    expect(notificationsReducer(undefined, { type: 'unknown' })).toEqual(defaultState);
  });

  test('should handle markNotificationAsRead', () => {
    const stateWithNotifs = {
      ...defaultState,
      notifications: [
        { id: 1, message: 'Notification 1' },
        { id: 2, message: 'Notification 2' },
      ],
    };
    const action = markNotificationAsRead(1);
    const expected = {
      ...stateWithNotifs,
      notifications: [{ id: 2, message: 'Notification 2' }],
    };
    expect(notificationsReducer(stateWithNotifs, action)).toEqual(expected);
  });

  test('should handle showDrawer', () => {
    const closedState = { ...defaultState, displayDrawer: false };
    const result = notificationsReducer(closedState, showDrawer());
    expect(result.displayDrawer).toBe(true);
  });

  test('should handle hideDrawer', () => {
    const result = notificationsReducer(defaultState, hideDrawer());
    expect(result.displayDrawer).toBe(false);
  });

  describe('fetchNotifications async thunk', () => {
    test('should handle fetchNotifications.fulfilled', async () => {
      const notifications = [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong>' } },
      ];

      const dispatch = jest.fn();
      const getState = jest.fn();

      const promise = fetchNotifications()(dispatch, getState, null);

      mockAxios.mockResponse({
        data: { notifications }
      });

      await promise;

      expect(dispatch).toHaveBeenCalledTimes(2);

      const fulfilledAction = dispatch.mock.calls[1][0];

      expect(fulfilledAction).toEqual(
        expect.objectContaining({
          type: fetchNotifications.fulfilled.type,
          payload: expect.any(Array),
        })
      );

      expect(fulfilledAction.payload).toHaveLength(3);
    });

    test('should update state.notifications on fulfilled', () => {
      const mockNotifs = [
        { id: 1, value: 'notification 1' },
        { id: 2, value: 'notification 2' },
        { id: 3, type: 'urgent', html: { __html: 'test' } }
      ];

      const action = {
        type: fetchNotifications.fulfilled.type,
        payload: mockNotifs
      };

      const result = notificationsReducer(defaultState, action);

      expect(result.notifications).toEqual(mockNotifs);
      expect(result.notifications).toHaveLength(3);
    });
  });
});
