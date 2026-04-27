export const APP_ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  TOGGLE_DRAWER: 'TOGGLE_DRAWER',
  MARK_NOTIFICATION_READ: 'MARK_NOTIFICATION_READ',
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
  SET_COURSES: 'SET_COURSES'
}

export const initialState = {
  displayDrawer: true,
  user: {
    email: '',
    password: '',
    isLoggedIn: false
  },
  notifications: [],
  courses: []
}

function getPayload(action) {
  return action?.payload ?? action
}

export default function appReducer(state = initialState, action = {}) {
  const payload = getPayload(action)

  switch (action.type) {
    case APP_ACTIONS.LOGIN:
      return {
        ...state,
        user: {
          email: payload.email ?? '',
          password: payload.password ?? '',
          isLoggedIn: true
        }
      }

    case APP_ACTIONS.LOGOUT:
      return {
        ...state,
        user: {
          email: '',
          password: '',
          isLoggedIn: false
        },
        courses: []
      }

    case APP_ACTIONS.TOGGLE_DRAWER:
      return {
        ...state,
        displayDrawer:
          typeof payload.displayDrawer === 'boolean'
            ? payload.displayDrawer
            : typeof payload.value === 'boolean'
              ? payload.value
              : !state.displayDrawer
      }

    case APP_ACTIONS.MARK_NOTIFICATION_READ: {
      const id = payload.id
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== id
        )
      }
    }

    case APP_ACTIONS.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: Array.isArray(payload.notifications)
          ? [...payload.notifications]
          : Array.isArray(payload)
            ? [...payload]
            : []
      }

    case APP_ACTIONS.SET_COURSES:
      return {
        ...state,
        courses: Array.isArray(payload.courses)
          ? [...payload.courses]
          : Array.isArray(payload)
            ? [...payload]
            : []
      }

    default:
      return state
  }
}
