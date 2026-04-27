import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CourseListRow from "./CourseListRow/CourseListRow";
import WithLogging from "../../components/HOC/WithLogging";
import { fetchCourses } from "../../features/courses/coursesSlice";

function CourseList() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);
  const loading = useSelector((state) => state.courses.loading);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);
  return (
    // Wrapper externe: occupe toute la largeur et centre le contenu
    <div className="w-full flex justify-center my-8">
      {/* Parent direct de la table: 80% EXACT (w-4/5) */}
      <div className="w-4/5">
        {/* La table remplit complètement son parent */}
        <table id="CourseList" className="w-full border-collapse text-black">
          {courses.length > 0 ? (
            <>
              <thead>
                <CourseListRow isHeader={true} textFirstCell="Available courses" />
                <CourseListRow
                  isHeader={true}
                  textFirstCell="Course name"
                  textSecondCell="Credit"
                />
              </thead>
              <tbody>
                {courses.map((c) => (
                  <CourseListRow
                    key={c.id}
                    textFirstCell={c.name}
                    textSecondCell={c.credit}
                  />
                ))}
              </tbody>
            </>
          ) : (
            <tbody>
              <CourseListRow isHeader={true} textFirstCell="No course available yet" />
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default WithLogging(CourseList);
