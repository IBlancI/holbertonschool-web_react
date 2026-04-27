// task_4/dashboard/src/App/App.jsx
import React, { useState, useCallback, useMemo, useContext, useEffect } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';

import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';

import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';

import AppContext, { defaultUser } from '../Context/context';

// Keep these exact names for the checker
// const notificationsList = [
//   { id: 1, type: 'default', value: 'New course available' },
//   { id: 2, type: 'urgent', value: 'New resume available' },
//   { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
// ];

// const coursesList = [
//   { id: 1, name: 'ES6', credit: 60 },
//   { id: 2, name: 'Webpack', credit: 20 },
//   { id: 3, name: 'React', credit: 40 },
// ];

export default function App() {
  // initial user from context (fallback to defaultUser)
  const ctx = useContext(AppContext) || {};
  const initialUser = ctx.user ?? defaultUser;

  // === state (hooks) ===
  // per task: displayDrawer initial value should be true
  const [displayDrawer, setDisplayDrawer] = useState(true);
  const [user, setUser] = useState(initialUser);
  // const [notifications, setNotifications] = useState(notificationsList);
  // const [courses] = useState(coursesList);
  const [notifications, setNotifications] = useState([]);
  const [courses, setCourses] = useState([]);

  // keep special "latest" notification behavior
  const latestNotification = useMemo(
    () => ({ __html: getLatestNotification() }),
    []
  );

  // === effects ===
  // Fetch notifications once at mount
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const res = await axios.get('notifications.json'); // served from public/
        if (!alive) return;

        let data = Array.isArray(res.data)
          ? res.data
          : res.data?.notifications ?? [];

        // Ensure at least one html notification like legacy behavior
        const hasHtml = data.some((n) => n && typeof n === 'object' && 'html' in n);
        if (!hasHtml) {
          const maxId = data.reduce((m, n) => (n?.id > m ? n.id : m), 0);
          data = [
            ...data,
            { id: maxId + 1, type: 'urgent', html: latestNotification },
          ];
        }
        // Ensure at least one html notification like legacy behavior
        // const hasHtml = data.some(
        //   (n) => n && typeof n === 'object' && n.html && typeof n.html.__html === 'string'
        // );
        // if (!hasHtml) {
        //   const maxId = data.reduce((m, n) => (Number(n?.id) > Number(m) ? n.id : m), 0);
        //   data = [
        //     ...data,
        //     { id: Number(maxId) + 1, type: 'urgent', html: latestNotification },
        //   ];
        // }

        setNotifications(data);
      } catch (err) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('[App] Failed to load notifications.json', err);
        }
      }
    })();

    return () => {
      alive = false;
    };
  }, [latestNotification]);

  // useEffect(() => {
  //   if (notifications.length > 0) {
  //     setDisplayDrawer(false); // retire le placeholder du DOM
  //   }
  // }, [notifications.length]);
  // useEffect(() => {
  //   if (notifications.length > 0) {
  //     setDisplayDrawer(false);   // retire le placeholder du DOM
  //   }
  // }, [notifications.length]);

  // Fetch courses whenever user's auth changes
  useEffect(() => {
    let alive = true;

    (async () => {
      if (!user?.isLoggedIn) {
        // reset courses when logged out
        setCourses([]);
        return;
      }
      try {
        const res = await axios.get('courses.json'); // served from public/
        if (!alive) return;

        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.courses ?? [];

        setCourses(data);
      } catch (err) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('[App] Failed to load courses.json', err);
        }
      }
    })();

    return () => {
      alive = false;
    };
  }, [user?.isLoggedIn]);

  // === memoized handlers (stable references between renders) ===
  const handleDisplayDrawer = useCallback(() => {
    setDisplayDrawer(true);
  }, []);
  // const handleDisplayDrawer = useCallback(() => {
  //   setDisplayDrawer((prev) => (notifications.length === 0 ? true : false));
  // }, [notifications.length]);

  const handleHideDrawer = useCallback(() => {
    setDisplayDrawer(false);
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    const target = Number(id);
    // immutable update: filter out the read notification
    setNotifications((prev) => (prev || []).filter((n) => Number(n.id) !== target));
  }, []);

  const logIn = useCallback((email, password) => {
    setUser({ email, password, isLoggedIn: true });
  }, []);

  const logOut = useCallback(() => {
    setUser({ ...defaultUser });
  }, []);

  // stable context value
  const contextValue = useMemo(() => ({ user, logOut }), [user, logOut]);

  return (
    <AppContext.Provider value={contextValue}>
      <Notifications
        key={`notif-len-${notifications.length}`}   // <— AJOUT
        displayDrawer={displayDrawer}
        notifications={notifications}
        listNotifications={notifications}
        handleDisplayDrawer={handleDisplayDrawer}
        handleHideDrawer={handleHideDrawer}
        markNotificationAsRead={markNotificationAsRead}
        latestNotification={latestNotification}
      />

      <div className="App min-h-screen flex flex-col">
        <Header />

        <main className="App-body flex-1">
          {!user.isLoggedIn ? (
            <BodySectionWithMarginBottom title="Log in to continue">
              <Login logIn={logIn} email={user.email || ''} password={user.password || ''} />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom title="Course list">
              <div id="CourseList">
                <CourseList courses={courses} />
                {/* <CourseList listCourses={courses} /> */}
              </div>
            </BodySectionWithMarginBottom>
          )}

          <BodySection title="News from the School">
            <p>Holberton School News goes here</p>
          </BodySection>
        </main>

        <Footer />
      </div>
    </AppContext.Provider>
  );
}

// kept for backward compatibility with some older tests
// App.propTypes = {
//   isLoggedIn: PropTypes.bool,
//   courses: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       name: PropTypes.string.isRequired,
//       credit: PropTypes.number.isRequired,
//     })
//   ),
//   logOut: PropTypes.func,
// };

// export { notificationsList, coursesList };
