import CourseListRow from './CourseListRow'
import WithLogging from '../HOC/WithLogging'

function CourseList({ courses = [] }) {
  return (
    <div className="courses mx-auto my-32 w-4/5 h-[29vh]">
      <table id="CourseList" className="w-full border-collapse border border-gray-300">
        <thead>
          <CourseListRow textFirstCell="Available courses" isHeader={true} />
          <CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader={true} />
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map(course => (
              <CourseListRow
                key={course.id}
                textFirstCell={course.name}
                textSecondCell={course.credit}
              />
            ))
          ) : (
            <CourseListRow textFirstCell="No course available yet" />
          )}
        </tbody>
      </table>
    </div>
  )
}

const CourseListWithLogging = WithLogging(CourseList)
export default CourseListWithLogging