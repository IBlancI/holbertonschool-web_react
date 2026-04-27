// src/App/App.jsx
// import React from 'react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';

import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';

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

// class App extends React.Component {
class App extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    courses: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        credit: PropTypes.number.isRequired,
      })
    ),
    logOut: PropTypes.func,
  };

  static defaultProps = {
    isLoggedIn: false,
    courses: defaultCourses,
    logOut: () => {},
  };

  handleKeyDown = (e) => {
    // Safeguard keys access & accept both 'h' and 'H'
    const key = e && typeof e.key === 'string' ? e.key : '';
    if (e?.ctrlKey && (key === 'h' || key === 'H')) {
      window.alert('Logging you out');
      this.props.logOut();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { isLoggedIn, courses } = this.props;

    return (
      // <>
      //   <Notifications displayDrawer={false} notifications={defaultNotifications} />
      //   <div className="App">
      //     <Header />
      //     <main className="App-body">
      //       {isLoggedIn ? <CourseList courses={courses} /> : <Login />}
      //     </main>
      //     <Footer />
      //   </div>
      // </>
            <>
        <Notifications displayDrawer={false} notifications={defaultNotifications} />
        <div className="App">
          <Header />

          <main className="App-body">
            {!isLoggedIn ? (
              <BodySectionWithMarginBottom title="Log in to continue">
                <Login />
              </BodySectionWithMarginBottom>
            ) : (
              <BodySectionWithMarginBottom title="Course list">
                <CourseList courses={courses} />
              </BodySectionWithMarginBottom>
            )}

            {/* Bloc d’actualité demandé */}
            <BodySection title="News from the School">
              <p>Holberton School News goes here</p>
            </BodySection>
          </main>

          <Footer />
        </div>
      </>
    );
  }
}

export default App;
