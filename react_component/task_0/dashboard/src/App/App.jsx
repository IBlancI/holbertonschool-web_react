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

class App extends React.Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    courses: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        credit: PropTypes.number.isRequired,
      })
    ),
  };

  static defaultProps = {
    isLoggedIn: false,
    courses: defaultCourses,
  };

  render() {
    const { isLoggedIn, courses } = this.props;

    return (
      <>
        <Notifications displayDrawer={false} notifications={defaultNotifications} />

        <div className="App">
          <Header />
          <main className="App-body">
            {isLoggedIn ? <CourseList courses={courses} /> : <Login />}
          </main>
          <Footer />
        </div>
      </>
    );
  }
}

export default App;
