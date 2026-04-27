import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';

import Notifications from './components/Notifications/Notifications';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import CourseList from './pages/CourseList/CourseList';

import BodySection from './components/BodySection/BodySection';
import BodySectionWithMarginBottom from './components/BodySectionWithMarginBottom/BodySectionWithMarginBottom';

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <Notifications />
      <div className="App">
        <Header />
        <main className="App-body">
          {!user.isLoggedIn ? (
            <BodySectionWithMarginBottom title="Log in to continue">
              <Login />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom title="Course list">
              <CourseList />
            </BodySectionWithMarginBottom>
          )}
          <BodySection title="News from the School">
            <p>Holberton School News goes here</p>
          </BodySection>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
