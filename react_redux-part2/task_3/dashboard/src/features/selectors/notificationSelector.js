import { createSelector } from 'reselect';

// Base selector to access the notifications array from state
const selectAllNotifications = (state) => state.notifications.notifications;

// Memoized selector: returns notifications filtered by type (all/urgent/default)
export const getFilteredNotifications = createSelector(
  [selectAllNotifications, (_, filter) => filter],
  (notifications, filter) => {
    if (filter === 'all') return notifications;
    return notifications.filter(notif => notif.type === filter);
  }
);
