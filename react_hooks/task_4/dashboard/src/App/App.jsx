import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { StyleSheet, css } from 'aphrodite';
import Notifications from '../Notifications/Notifications';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import BodySection from '../BodySection/BodySection';
import newContext from '../Context/context';

const API_BASE_URL = 'http://localhost:5173';
const ENDPOINTS = {
  courses: `${API_BASE_URL}/courses.json`,
  notifications: `${API_BASE_URL}/notifications.json`,
};

const styles = StyleSheet.create({
  app: {
    position: 'relative'
  }
});

const notificationsList = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
];

export default function App() {
  const [displayDrawer, setDisplayDrawer] = useState(true);
  const [user, setUser] = useState({ ...newContext.user });
  const [notifications, setNotifications] = useState(notificationsList);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(ENDPOINTS.courses);
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    if (!user.isLoggedIn) {
      setCourses([]);
      return;
    }

    fetchCourses();
  }, [user.isLoggedIn]);

  const handleDisplayDrawer = useCallback(() => {
    setDisplayDrawer(true);
  }, []);

  const handleHideDrawer = useCallback(() => {
    setDisplayDrawer(false);
  }, []);

  const logIn = useCallback((email, password) => {
    setUser({
      email,
      password,
      isLoggedIn: true
    });
  }, []);

  const logOut = useCallback(() => {
    setUser({
      email: '',
      password: '',
      isLoggedIn: false,
    });
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    );
    console.log(`Notification ${id} has been marked as read`);
  }, []);

  return (
    <newContext.Provider value={{ user, logOut }}>
      <div className={css(styles.app)}>
        <Notifications
          notifications={notifications}
          handleHideDrawer={handleHideDrawer}
          handleDisplayDrawer={handleDisplayDrawer}
          displayDrawer={displayDrawer}
          markNotificationAsRead={markNotificationAsRead}
        />
        <>
          <Header />
          {!user.isLoggedIn ? (
            <BodySectionWithMarginBottom title='Log in to continue'>
              <Login
                logIn={logIn}
                email={user.email}
                password={user.password}
              />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom title='Course list'>
              <CourseList courses={courses} />
            </BodySectionWithMarginBottom>
          )}
          <BodySection title="News from the School">
            <p>Holberton School news goes here</p>
          </BodySection>
        </>
        <Footer />
      </div>
    </newContext.Provider>
  );
}
