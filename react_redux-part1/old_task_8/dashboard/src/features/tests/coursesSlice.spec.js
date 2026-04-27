import coursesReducer, { fetchCourses } from '../courses/coursesSlice';
import { logout } from '../auth/authSlice';

describe('coursesSlice', () => {
  const initialState = {
    courses: [],
  };

  it('should return the correct initial state by default', () => {
    const state = coursesReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('should handle fetchCourses.fulfilled correctly', () => {
    const mockCourses = [
      { id: 1, name: 'React Basics' },
      { id: 2, name: 'Redux Fundamentals' },
    ];

    const state = coursesReducer(
      initialState,
      fetchCourses.fulfilled(mockCourses, '')
    );

    expect(state.courses.length).toBe(2);
    expect(state.courses[0].name).toBe('React Basics');
  });

  it('should reset courses to empty when logout is dispatched', () => {
    const mockState = {
      courses: [
        { id: 1, name: 'React Basics' },
        { id: 2, name: 'Redux Fundamentals' },
      ],
    };

    const state = coursesReducer(mockState, logout());
    expect(state).toEqual(initialState);
  });
});
