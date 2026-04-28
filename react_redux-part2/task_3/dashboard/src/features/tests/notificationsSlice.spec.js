import notificationsReducer, {
  markNotificationAsRead,
  fetchNotifications,
} from '../../features/notifications/notificationsSlice';
import mockAxios from 'jest-mock-axios';

afterEach(() => {
  mockAxios.reset();
});

const mockNotificationsResponse = {
  notifications: [
    {
      id: 1,
      context: { type: 'default', isRead: false, value: 'New course available' },
    },
    {
      id: 2,
      context: { type: 'urgent', isRead: false, value: 'New resume available' },
    },
    {
      id: 3,
      context: { type: 'urgent', isRead: false, value: 'New project to review' },
    },
  ],
};

const initialState = {
  notifications: [],
  loading: false,
};

const markedAsReadNotificationsResponse = [
  { id: 2, type: 'urgent', isRead: false, value: 'New resume available' },
  { id: 3, type: 'urgent', isRead: false, value: 'New project to review' },
];

test('Returns the correct initial state by default', () => {
  const state = notificationsReducer(undefined, { type: 'unknown' });
  expect(state.notifications).toStrictEqual([]);
});

test('fetches notifications data correctly', async () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  const promise = fetchNotifications()(dispatch, getState, null);

  mockAxios.mockResponse({
    data: mockNotificationsResponse,
  });

  await promise;

  expect(dispatch).toHaveBeenCalledTimes(2);

  const fulfilledAction = dispatch.mock.calls[1][0];

  expect(fulfilledAction.payload).toHaveLength(3);
  expect(Array.isArray(fulfilledAction.payload)).toBe(true);
  expect(fulfilledAction.payload.length).toBeGreaterThan(0);

  expect(fulfilledAction.payload[0]).toEqual({
    id: 1,
    type: 'default',
    isRead: false,
    value: 'New course available',
  });
  expect(fulfilledAction.payload[1]).toEqual({
    id: 2,
    type: 'urgent',
    isRead: false,
    value: 'New resume available',
  });
});

test('Handle fetchNotifications.pending correctly', () => {
  const action = { type: fetchNotifications.pending.type };
  const state = notificationsReducer(initialState, action);

  expect(state).toEqual({
    notifications: [],
    loading: true,
  });
});

test('State.notifications is correctly updated when fetchNotifications succeeds', () => {
  const flattenedNotifications = [
    { id: 1, type: 'default', isRead: false, value: 'New course available' },
    { id: 2, type: 'urgent', isRead: false, value: 'New resume available' },
    { id: 3, type: 'urgent', isRead: false, value: 'New project to review' },
  ];

  const action = {
    type: fetchNotifications.fulfilled.type,
    payload: flattenedNotifications,
  };

  const newState = notificationsReducer(initialState, action);

  expect(newState.notifications).toEqual(flattenedNotifications);
  expect(newState.notifications).toHaveLength(3);
  expect(newState.notifications).not.toEqual([]);
});

test('should verify payload contains expected notification structure', async () => {
  const mockNotifications = [
    { id: 1, context: { type: 'default', isRead: false, value: 'Not important' } },
    { id: 2, context: { type: 'urgent', isRead: false, value: 'Very important' } },
  ];

  const dispatch = jest.fn();
  const getState = jest.fn();

  const promise = fetchNotifications()(dispatch, getState, null);
  mockAxios.mockResponse({ data: { notifications: mockNotifications } });
  await promise;

  const fulfilledAction = dispatch.mock.calls[1][0];

  expect(fulfilledAction.payload).toHaveLength(2);
  expect(fulfilledAction.payload.length).toBeGreaterThan(0);
  expect(Array.isArray(fulfilledAction.payload)).toBe(true);

  expect(fulfilledAction.payload[0]).toEqual({
    id: 1,
    type: 'default',
    isRead: false,
    value: 'Not important',
  });
  expect(fulfilledAction.payload[1]).toEqual({
    id: 2,
    type: 'urgent',
    isRead: false,
    value: 'Very important',
  });
});

test('Removes a notification correctly when the markNotificationAsRead action is dispatched', () => {
  const previousState = {
    notifications: [
      { id: 1, type: 'default', isRead: false, value: 'New course available' },
      { id: 2, type: 'urgent', isRead: false, value: 'New resume available' },
      { id: 3, type: 'urgent', isRead: false, value: 'New project to review' },
    ],
    loading: false,
  };

  const action = markNotificationAsRead(1);
  const newState = notificationsReducer(previousState, action);

  expect(newState.notifications).toStrictEqual(markedAsReadNotificationsResponse);
});

test('handle fetchNotifications.fulfilled when the API request is successful, and only render the unread notification items', async () => {
  const mockReadNotificationsResponse = {
    notifications: [
      {
        id: 1,
        context: { type: 'default', isRead: true, value: 'New course available' },
      },
      {
        id: 2,
        context: { type: 'urgent', isRead: false, value: 'New resume available' },
      },
      {
        id: 3,
        context: { type: 'urgent', isRead: false, value: 'New project to review' },
      },
    ],
  };

  const dispatch = jest.fn();
  const getState = jest.fn();

  const promise = fetchNotifications()(dispatch, getState, null);
  mockAxios.mockResponse({ data: mockReadNotificationsResponse });
  await promise;

  const fulfilledAction = dispatch.mock.calls[1][0];

  expect(fulfilledAction.payload).toHaveLength(2);
  expect(fulfilledAction.payload.length).toBeGreaterThan(0);
  expect(Array.isArray(fulfilledAction.payload)).toBe(true);

  expect(fulfilledAction.payload[0]).toEqual({
    id: 2,
    type: 'urgent',
    isRead: false,
    value: 'New resume available',
  });
  expect(fulfilledAction.payload[1]).toEqual({
    id: 3,
    type: 'urgent',
    isRead: false,
    value: 'New project to review',
  });
});