import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorer les avertissements pour les fonctions dans les notifications
        ignoredActions: ['notifications/fetchNotifications/fulfilled'],
        ignoredPaths: ['notifications.notifications'],
      },
    }),
});

export default store;
