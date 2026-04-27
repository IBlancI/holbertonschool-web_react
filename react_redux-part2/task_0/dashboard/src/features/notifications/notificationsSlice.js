import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getLatestNotification } from '../../utils/utils';

const initialState = {
  notifications: [],
};

const BASE_URL = 'http://localhost:5173';
const ENDPOINTS = {
  notifications: `${BASE_URL}/notifications.json`,
};

// Fetch all notifications from API and replace id=3 with latest HTML notification
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    const result = await axios.get(ENDPOINTS.notifications);
    const urgentNotif = {
      id: 3,
      type: 'urgent',
      html: { __html: getLatestNotification() },
    };

    const existing = result.data.notifications;
    const targetIdx = existing.findIndex(
      (item) => item.id === 3
    );

    const merged = [...existing];
    if (targetIdx !== -1) {
      merged[targetIdx] = urgentNotif;
    } else {
      merged.push(urgentNotif);
    }

    return merged;
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markNotificationAsRead: (state, action) => {
      const targetId = action.payload;
      state.notifications = state.notifications.filter(
        (item) => item.id !== targetId
      );
      console.log(`Notification ${targetId} has been marked as read`);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload;
    });
  },
});

export const { markNotificationAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;
