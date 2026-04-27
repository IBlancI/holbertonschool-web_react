// App/appReducer.js

export const APP_ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  TOGGLE_DRAWER: 'TOGGLE_DRAWER',
  MARK_NOTIFICATION_READ: 'MARK_NOTIFICATION_READ',
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
  SET_COURSES: 'SET_COURSES',
};

export const initialState = {
  displayDrawer: true, // required default
  user: {
    email: '',
    password: '',
    isLoggedIn: false,
  },
  notifications: [],
  courses: [],
};

export function appReducer(state = initialState, action = {}) {
  switch (action.type) {
    case APP_ACTIONS.LOGIN: {
      const { email = '', password = '' } = action.payload || {};
      return {
        ...state,
        user: { email, password, isLoggedIn: true },
      };
    }

    case APP_ACTIONS.LOGOUT: {
      return {
        ...state,
        user: { email: '', password: '', isLoggedIn: false },
        courses: [], // keep UI consistent on logout
      };
    }

    case APP_ACTIONS.TOGGLE_DRAWER: {
      // If a boolean payload is provided, use it; otherwise toggle
      const next =
        typeof action.payload === 'boolean'
          ? action.payload
          : !state.displayDrawer;
      return { ...state, displayDrawer: next };
    }

    case APP_ACTIONS.MARK_NOTIFICATION_READ: {
      const id = Number(action.payload);
      return {
        ...state,
        notifications: (state.notifications || []).filter(
          (n) => Number(n?.id) !== id
        ),
      };
    }

    case APP_ACTIONS.SET_NOTIFICATIONS: {
      const list = Array.isArray(action.payload) ? action.payload : [];
      return { ...state, notifications: list };
    }

    case APP_ACTIONS.SET_COURSES: {
      const list = Array.isArray(action.payload) ? action.payload : [];
      return { ...state, courses: list };
    }

    default:
      return state;
  }
}
