import React from "react";
import { useSelector } from "react-redux";
import WithLogging from "../../components/HOC/WithLogging";
import CourseListRow from "./CourseListRow/CourseListRow";

function CourseList() {
  const courses = useSelector((state) => state.courses.courses || []);

  return (
    <div className="mx-auto my-32 w-[80%] md:w-[85%] lg:w-[90%]">
      {courses.length > 0 ? (
        <table id="CourseList" className="w-full border-collapse">
          <thead>
            <CourseListRow textFirstCell="Available courses" isHeader={true} />
            <CourseListRow
              textFirstCell="Course name"
              textSecondCell="Credit"
              isHeader={true}
            />
          </thead>
          <tbody>
            {courses.map((course) => (
              <CourseListRow
                key={course.id}
                textFirstCell={course.name}
                textSecondCell={course.credit}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <table id="CourseList" className="w-full border-collapse">
          <thead>
            <CourseListRow
              isHeader={true}
              textFirstCell="No course available yet"
            />
          </thead>
        </table>
      )}
    </div>
  );
}

export default WithLogging(CourseList);
