import { useEffect, useReducer, useCallback } from 'react';
import axios from 'axios';
import { StyleSheet, css } from 'aphrodite';
import Notifications from './components/Notifications/Notifications';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import CourseList from './pages/CourseList/CourseList';
import { getLatestNotification } from './utils/utils';
import BodySectionWithMarginBottom from './components/BodySectionWithMarginBottom/BodySectionWithMarginBottom';
import BodySection from './components/BodySection/BodySection';
import { appReducer, initialState, APP_ACTIONS } from './appReducer';

const BASE_URL = 'http://localhost:5173';
const ROUTES = {
  courses: `${BASE_URL}/courses.json`,
  notifications: `${BASE_URL}/notifications.json`,
};

const styles = StyleSheet.create({
  app: {
    position: 'relative'
  }
});

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load notifications when component mounts
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const res = await axios.get(ROUTES.notifications);
        const latestNotif = {
          id: 3,
          type: "urgent",
          html: { __html: getLatestNotification() }
        };

        const currentList = res.data.notifications;
        const targetIdx = currentList.findIndex(
          item => item.id === 3
        );

        const result = [...currentList];
        if (targetIdx !== -1) {
          result[targetIdx] = latestNotif;
        } else {
          result.push(latestNotif);
        }

        dispatch({ type: APP_ACTIONS.SET_NOTIFICATIONS, payload: result });
      } catch (err) {
        console.error('Failed to load notifications:', err);
      }
    };

    loadNotifications();
  }, []);

  // Load courses when user logs in
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const res = await axios.get(ROUTES.courses);
        dispatch({ type: APP_ACTIONS.SET_COURSES, payload: res.data.courses });
      } catch (err) {
        console.error('Failed to load courses:', err);
      }
    };

    if (!state.user.isLoggedIn) {
      dispatch({ type: APP_ACTIONS.SET_COURSES, payload: [] });
      return;
    }

    loadCourses();
  }, [state.user.isLoggedIn]);

  const handleDisplayDrawer = useCallback(() => {
    dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER });
  }, []);

  const handleHideDrawer = useCallback(() => {
    dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER });
  }, []);

  const logIn = (email, password) => {
    dispatch({
      type: APP_ACTIONS.LOGIN,
      payload: { email, password }
    });
  };

  const logOut = () => {
    dispatch({ type: APP_ACTIONS.LOGOUT });
  };

  const markNotificationAsRead = useCallback((id) => {
    dispatch({
      type: APP_ACTIONS.MARK_NOTIFICATION_READ,
      payload: id
    });
    console.log(`Notification ${id} has been marked as read`);
  }, []);

  return (
    <div className={css(styles.app)}>
      <Notifications
        notifications={state.notifications}
        handleHideDrawer={handleHideDrawer}
        handleDisplayDrawer={handleDisplayDrawer}
        displayDrawer={state.displayDrawer}
        markNotificationAsRead={markNotificationAsRead}
      />
      <>
        <Header user={state.user} logOut={logOut} />
        {!state.user.isLoggedIn ? (
          <BodySectionWithMarginBottom title='Log in to continue'>
            <Login
              logIn={logIn}
              email={state.user.email}
              password={state.user.password}
            />
          </BodySectionWithMarginBottom>
        ) : (
          <BodySectionWithMarginBottom title='Course list'>
            <CourseList courses={state.courses} />
          </BodySectionWithMarginBottom>
        )}
        <BodySection title="News from the School">
          <p>Holberton School news goes here</p>
        </BodySection>
      </>
      <Footer user={state.user} />
    </div>
  );
}
