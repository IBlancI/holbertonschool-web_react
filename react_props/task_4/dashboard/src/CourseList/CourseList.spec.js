import CourseList from "./CourseList";
import { render, screen } from "@testing-library/react";

describe('CourseList', () => {
  test('Check that it renders 5 different rows when it receive an array of courses objects', () => {
    render(<CourseList courses={[
      { id: 1, name: 'ES6', credit: '60' },
      { id: 2, name: 'Webpack', credit: '20' },
      { id: 3, name: 'React', credit: '40' },
    ]} />);

    const rows = screen.getAllByRole('row');

    expect(rows).toHaveLength(5);
  })
  test('Check that it renders 1 row whenever it receive an empty array', () => {
    render(<CourseList courses={[]} />);

    const rows = screen.getAllByRole('row');

    expect(rows).toHaveLength(1);
  })
})