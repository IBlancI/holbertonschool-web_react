import notificationsReducer, {
  fetchNotifications,
  markNotificationAsRead,
  showDrawer,
  hideDrawer,
} from '../notifications/notificationsSlice';

describe('notificationsSlice', () => {
  const initialState = {
    notifications: [],
    displayDrawer: true,
  };

  it('should return the correct initial state by default', () => {
    const state = notificationsReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('should handle fetchNotifications.fulfilled correctly', () => {
    const mockNotifications = [
      { id: 1, type: 'info', value: 'Welcome' },
      { id: 3, type: 'urgent', value: 'Old notification' },
    ];

    const state = notificationsReducer(
      initialState,
      fetchNotifications.fulfilled(mockNotifications, '')
    );

    expect(state.notifications.length).toBe(2);
    expect(state.notifications[0].id).toBe(1);
  });

  it('should remove a notification when markNotificationAsRead is dispatched', () => {
    const mockState = {
      notifications: [
        { id: 1, type: 'info', value: 'Message 1' },
        { id: 2, type: 'urgent', value: 'Message 2' },
      ],
      displayDrawer: true,
    };

    const state = notificationsReducer(mockState, markNotificationAsRead(1));
    expect(state.notifications.length).toBe(1);
    expect(state.notifications[0].id).toBe(2);
  });

  it('should set displayDrawer to true when showDrawer is dispatched', () => {
    const mockState = { ...initialState, displayDrawer: false };
    const state = notificationsReducer(mockState, showDrawer());
    expect(state.displayDrawer).toBe(true);
  });

  it('should set displayDrawer to false when hideDrawer is dispatched', () => {
    const mockState = { ...initialState, displayDrawer: true };
    const state = notificationsReducer(mockState, hideDrawer());
    expect(state.displayDrawer).toBe(false);
  });
});
