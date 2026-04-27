import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLatestNotification } from '../../utils/utils';

// Async thunk pour charger les notifications
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    // Simuler un appel API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, type: 'default', value: 'New course available' },
          { id: 2, type: 'urgent', value: 'New resume available' },
          { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
        ]);
      }, 500);
    });
  }
);

const initialState = {
  notifications: [],
  displayDrawer: false,
  loading: false,
  error: null,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markNotificationAsRead: (state, action) => {
      const id = action.payload;
      state.notifications = state.notifications.filter((notif) => notif.id !== id);
    },
    setDisplayDrawer: (state, action) => {
      state.displayDrawer = action.payload;
    },
    handleDisplayDrawer: (state) => {
      state.displayDrawer = true;
    },
    handleHideDrawer: (state) => {
      state.displayDrawer = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  markNotificationAsRead,
  setDisplayDrawer,
  handleDisplayDrawer,
  handleHideDrawer,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
