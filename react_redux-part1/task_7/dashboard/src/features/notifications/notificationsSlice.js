import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getLatestNotification } from '../../utils/utils';

const API_BASE_URL = 'http://localhost:5173';
const ENDPOINTS = {
  notifications: `${API_BASE_URL}/notifications.json`,
};

const initialState = {
  notifications: [],
  displayDrawer: true,
};

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    const res = await axios.get(ENDPOINTS.notifications);
    const latestNotif = {
      id: 3,
      type: 'urgent',
      html: { __html: getLatestNotification() },
    };

    const list = res.data.notifications;
    const idx = list.findIndex((n) => n.id === 3);

    const result = [...list];
    if (idx !== -1) {
      result[idx] = latestNotif;
    } else {
      result.push(latestNotif);
    }

    return result;
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markNotificationAsRead(state, action) {
      const id = action.payload;
      state.notifications = state.notifications.filter(
        (n) => n.id !== id
      );
      console.log(`Notification ${id} has been marked as read`);
    },
    showDrawer(state) {
      state.displayDrawer = true;
    },
    hideDrawer(state) {
      state.displayDrawer = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload;
    });
  },
});

export const { markNotificationAsRead, showDrawer, hideDrawer } = notificationsSlice.actions;
export default notificationsSlice.reducer;
