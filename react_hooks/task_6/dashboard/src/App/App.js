import { useEffect, useReducer, useCallback } from 'react'
import axios from 'axios'
import { StyleSheet, css } from 'aphrodite'
import Notifications from '../Notifications/Notifications'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Login from '../Login/Login'
import CourseList from '../CourseList/CourseList'
import { getLatestNotification } from '../utils/utils'
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom'
import BodySection from '../BodySection/BodySection'
import appReducer, { APP_ACTIONS, initialState } from './appReducer'

const API_BASE_URL = 'http://localhost:5173'
const ENDPOINTS = {
  courses: `${API_BASE_URL}/courses.json`,
  notifications: `${API_BASE_URL}/notifications.json`
}

const styles = StyleSheet.create({
  app: {
    position: 'relative'
  }
})

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(ENDPOINTS.notifications)
        const notifications = Array.isArray(response.data.notifications)
          ? response.data.notifications.map((notification) =>
              notification.id === 3
                ? {
                    ...notification,
                    html: { __html: getLatestNotification() }
                  }
                : notification
            )
          : []

        dispatch({
          type: APP_ACTIONS.SET_NOTIFICATIONS,
          payload: { notifications }
        })
      } catch (error) {
        // no-op
      }
    }

    fetchNotifications()
  }, [])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(ENDPOINTS.courses)
        const courses = Array.isArray(response.data.courses)
          ? response.data.courses
          : []

        dispatch({
          type: APP_ACTIONS.SET_COURSES,
          payload: { courses }
        })
      } catch (error) {
        // no-op
      }
    }

    if (state.user.isLoggedIn) {
      fetchCourses()
    }
  }, [state.user.isLoggedIn])

  const handleDisplayDrawer = useCallback(() => {
    dispatch({
      type: APP_ACTIONS.TOGGLE_DRAWER,
      payload: { displayDrawer: true }
    })
  }, [])

  const handleHideDrawer = useCallback(() => {
    dispatch({
      type: APP_ACTIONS.TOGGLE_DRAWER,
      payload: { displayDrawer: false }
    })
  }, [])

  const logIn = useCallback((email, password) => {
    dispatch({
      type: APP_ACTIONS.LOGIN,
      payload: { email, password }
    })
  }, [])

  const logOut = useCallback(() => {
    dispatch({
      type: APP_ACTIONS.LOGOUT
    })
  }, [])

  const markNotificationAsRead = useCallback((id) => {
    dispatch({
      type: APP_ACTIONS.MARK_NOTIFICATION_READ,
      payload: { id }
    })
    console.log(`Notification ${id} has been marked as read`)
  }, [])

  return (
    <div className={css(styles.app)}>
      <Notifications
        notifications={state.notifications}
        handleHideDrawer={handleHideDrawer}
        handleDisplayDrawer={handleDisplayDrawer}
        displayDrawer={state.displayDrawer}
        markNotificationAsRead={markNotificationAsRead}
      />

      <Header user={state.user} logOut={logOut} />

      {!state.user.isLoggedIn ? (
        <BodySectionWithMarginBottom title="Log in to continue">
          <Login
            logIn={logIn}
            email={state.user.email}
            password={state.user.password}
          />
        </BodySectionWithMarginBottom>
      ) : (
        <BodySectionWithMarginBottom title="Course list">
          <CourseList courses={state.courses} />
        </BodySectionWithMarginBottom>
      )}

      <BodySection title="News from the School">
        <p>Holberton School news goes here</p>
      </BodySection>

      <Footer user={state.user} isIndex={false} />
    </div>
  )
}