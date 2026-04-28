import { createSelector } from '@reduxjs/toolkit';

const selectNotifications = (state) => state.notifications.notifications;

export const getFilteredNotifications = createSelector(
  [selectNotifications, (state, filter) => filter],
  (notifications, filter) => {
    if (filter === 'all') {
      return notifications.filter((notification) => notification.isRead === false);
    }

    return notifications.filter(
      (notification) =>
        notification.type === filter && notification.isRead === false
    );
  }
);