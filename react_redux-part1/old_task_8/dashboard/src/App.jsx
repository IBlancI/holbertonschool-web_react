import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Notifications from "./components/Notifications/Notifications";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import CourseList from "./pages/CourseList/CourseList";
import BodySectionWithMarginBottom from "./components/BodySectionWithMarginBottom/BodySectionWithMarginBottom";
import BodySection from "./components/BodySection/BodySection";

import { fetchNotifications } from "./features/notifications/notificationsSlice";
import { fetchCourses } from "./features/courses/coursesSlice";

function App() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCourses());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <>
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
        <p>Holberton School News goes here</p>
      </BodySection>
      <Footer />
    </>
  );
}

export default App;
