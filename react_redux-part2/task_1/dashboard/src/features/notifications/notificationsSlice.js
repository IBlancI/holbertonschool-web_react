import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getLatestNotification } from "../../utils/utils";

// Default state with empty notifications and loading flag
const initialState = {
  notifications: [],
  loading: false,
};

const API_BASE_URL = "http://localhost:5173";
const ENDPOINTS = {
  notifications: `${API_BASE_URL}/notifications.json`,
};

// Async thunk to fetch notifications from the API
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async () => {
    const result = await axios.get(ENDPOINTS.notifications);
    const urgentNotif = {
      id: 3,
      type: "urgent",
      html: { __html: getLatestNotification() },
    };

    const existingNotifs = result.data.notifications;
    const targetIndex = existingNotifs.findIndex(
      (notif) => notif.id === 3
    );

    const mergedNotifs = [...existingNotifs];
    if (targetIndex !== -1) {
      mergedNotifs[targetIndex] = urgentNotif;
    } else {
      mergedNotifs.push(urgentNotif);
    }

    return mergedNotifs;
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    markNotificationAsRead: (state, action) => {
      const targetId = action.payload;
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
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { markNotificationAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;
