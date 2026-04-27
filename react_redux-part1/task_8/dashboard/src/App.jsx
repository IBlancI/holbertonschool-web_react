import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import { fetchNotifications } from './features/notifications/notificationsSlice';
import { fetchCourses } from './features/courses/coursesSlice';
import Notifications from './components/Notifications/Notifications';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import Footer from './components/Footer/Footer';
import CourseList from './pages/CourseList/CourseList';
import BodySection from './components/BodySection/BodySection';
import BodySectionWithMarginBottom from './components/BodySectionWithMarginBottom/BodySectionWithMarginBottom';

const styles = StyleSheet.create({
  app: {
    position: 'relative',
  },
});

export default function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Load notifications when component mounts
  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  // Load courses only when user is authenticated
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCourses());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <div className={css(styles.app)}>
      <Notifications />
      <Header />
      {!isLoggedIn ? (
        <BodySectionWithMarginBottom title="Log in to continue">
          <Login />
        </BodySectionWithMarginBottom>
      ) : (
        <BodySectionWithMarginBottom title="Course list">
          <CourseList />
        </BodySectionWithMarginBottom>
      )}
      <BodySection title="News from the School">
        <p>Holberton School news goes here</p>
      </BodySection>
      <Footer />
    </div>
  );
}
