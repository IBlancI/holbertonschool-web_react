// src/App/App.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';

const defaultNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
];

const defaultCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

function App({ isLoggedIn = false, courses = defaultCourses }) {
  return (
    <>
      {/* Drawer masqué par défaut, seul le titre de notifications est visible */}
      {/* <Notifications notifications={defaultNotifications} /> */}
      <Notifications displayDrawer={false} notifications={defaultNotifications} />

      <div className="App">
        <Header />
        <main className="App-body">
          {isLoggedIn ? (
            <CourseList courses={courses} />
          ) : (
            <Login />
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}

App.propTypes = {
  isLoggedIn: PropTypes.bool,
  courses: PropTypes.array,
};

export default App;
