import axios from 'axios';
import reducer, {
  fetchNotifications,
  markNotificationAsRead,
  showDrawer,
  hideDrawer,
} from '../notifications/notificationsSlice';
import { getLatestNotification } from '../../utils/utils';

jest.mock('axios');

describe('notificationsSlice', () => {
  const initialState = {
    notifications: [],
    displayDrawer: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the correct initial state by default', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should fetch notifications data correctly', async () => {
    const mockNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', value: 'Old notification' },
    ];

    axios.get.mockResolvedValue({ data: mockNotifications });

    const result = await fetchNotifications()(jest.fn(), jest.fn(), undefined);

    const state = reducer(initialState, {
      type: fetchNotifications.fulfilled.type,
      payload: result.payload,
    });

    expect(state.notifications).toHaveLength(3);
    expect(state.notifications[2].value).toBe(getLatestNotification());
  });

  it('should remove a notification correctly when markNotificationAsRead is dispatched', () => {
    const stateWithNotifications = {
      notifications: [
        { id: 1, type: 'default', value: 'Notification 1' },
        { id: 2, type: 'urgent', value: 'Notification 2' },
      ],
      displayDrawer: true,
    };

    const newState = reducer(stateWithNotifications, markNotificationAsRead(1));

    expect(newState.notifications).toEqual([
      { id: 2, type: 'urgent', value: 'Notification 2' },
    ]);
  });

  it('should toggle displayDrawer correctly with showDrawer and hideDrawer', () => {
    let state = reducer(initialState, hideDrawer());
    expect(state.displayDrawer).toBe(false);

    state = reducer(state, showDrawer());
    expect(state.displayDrawer).toBe(true);
  });
});