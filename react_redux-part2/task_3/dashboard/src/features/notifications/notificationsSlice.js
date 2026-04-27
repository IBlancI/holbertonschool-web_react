import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Default state for notifications feature
const initialState = {
  notifications: [],
  loading: false,
};

const BASE_URL = 'http://localhost:5173';
const ENDPOINTS = {
  notifications: `${BASE_URL}/notifications.json`,
};

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    const response = await axios.get(ENDPOINTS.notifications);

    // Keep only unread notifications, extract relevant fields
    return response.data
      .filter(item => item.context.isRead === false)
      .map(item => ({
        id: item.id,
        type: item.context.type,
        isRead: item.context.isRead,
        value: item.context.value
      }));
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markNotificationAsRead: (state, action) => {
      const targetId = action.payload;
      // Remove the notification from the list
      state.notifications = state.notifications.filter(
        (notif) => notif.id !== targetId
      );
      console.log(`Notification ${targetId} has been marked as read`);
    },
  },

  extraReducers: (builder) => {
    builder
    .addCase(fetchNotifications.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload;
      state.loading = false;
    })
    .addCase(fetchNotifications.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { markNotificationAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;
