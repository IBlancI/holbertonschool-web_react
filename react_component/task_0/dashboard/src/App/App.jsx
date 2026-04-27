import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';
import CourseList from '../CourseList/CourseList';
import './App.css';

// const coursesList = [];

const coursesList = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

class App extends Component {
  render() {
    const { isLoggedIn = false, courses = coursesList } = this.props;

    return (
      <>
        <Notifications />
        <div className="App">
          <Header />
          <main className="App-body">
            {!isLoggedIn ? (
              <Login />
            ) : (
              <CourseList courses={courses} />
            )}
          </main>
          <Footer />
        </div>
      </>
    );
  }
}

App.propTypes = {
  isLoggedIn: PropTypes.bool,
  courses: PropTypes.array,
};

export default App;