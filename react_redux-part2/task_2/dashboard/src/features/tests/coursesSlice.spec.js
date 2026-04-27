import coursesReducer, { fetchCourses, selectCourse, unSelectCourse } from '../courses/coursesSlice';
import { logout } from '../auth/authSlice';
import mockAxios from 'jest-mock-axios';

describe('coursesSlice', () => {
  const defaultState = {
    courses: [],
  };

  afterEach(() => {
    mockAxios.reset();
  });

  test('returns the default initial state', () => {
    expect(coursesReducer(undefined, { type: 'unknown' })).toEqual(
      defaultState
    );
  });

  describe('fetchCourses async thunk', () => {
    test('handles fetchCourses.pending without state change', () => {
      const action = { type: fetchCourses.pending.type };
      const result = coursesReducer(defaultState, action);
      expect(result).toEqual({
        ...defaultState,
      });
    });

    test('handles fetchCourses.rejected without state change', () => {
      const action = {
        type: fetchCourses.rejected.type,
      };
      const result = coursesReducer(defaultState, action);
      expect(result).toEqual({
        ...defaultState,
      });
    });

    test('dispatches fulfilled action with correct payload', async () => {
      const sampleCourses = [
        { "id": 1, "name": "ES6", "credit": 60 },
        { "id": 2, "name": "Webpack", "credit": 20 },
        { "id": 3, "name": "React", "credit": 40 }
      ];

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunkPromise = fetchCourses()(dispatch, getState, null);

      mockAxios.mockResponse({
        data: { courses: sampleCourses }
      });

      await thunkPromise;

      expect(dispatch).toHaveBeenCalledTimes(2);

      const fulfilledAction = dispatch.mock.calls[1][0];

      expect(fulfilledAction.type).toEqual(fetchCourses.fulfilled.type);
      expect(fulfilledAction.payload).toEqual(sampleCourses);
    });
  });

  describe('logout action', () => {
    test('clears the courses array on logout', () => {
      const populatedState = {
        courses: [
          { id: 1, title: 'Introduction to Programming' },
          { id: 2, title: 'Advanced Mathematics' },
        ],
      };

      const action = { type: logout.type };
      const result = coursesReducer(populatedState, action);

      expect(result).toEqual({
        courses: [],
      });
    });
  });

  describe('selectCourse and unSelectCourse actions', () => {
    test('marks a course as selected via selectCourse', () => {
      const populatedState = {
        courses: [
          { id: 1, name: 'ES6', credit: 60, isSelected: false },
          { id: 2, name: 'Webpack', credit: 20, isSelected: false },
          { id: 3, name: 'React', credit: 40, isSelected: false },
        ],
      };

      const action = selectCourse(2);
      const result = coursesReducer(populatedState, action);

      expect(result.courses).toEqual([
        { id: 1, name: 'ES6', credit: 60, isSelected: false },
        { id: 2, name: 'Webpack', credit: 20, isSelected: true },
        { id: 3, name: 'React', credit: 40, isSelected: false },
      ]);
    });

    test('marks a course as unselected via unSelectCourse', () => {
      const populatedState = {
        courses: [
          { id: 1, name: 'ES6', credit: 60, isSelected: false },
          { id: 2, name: 'Webpack', credit: 20, isSelected: true },
          { id: 3, name: 'React', credit: 40, isSelected: false },
        ],
      };

      const action = unSelectCourse(2);
      const result = coursesReducer(populatedState, action);

      expect(result.courses).toEqual([
        { id: 1, name: 'ES6', credit: 60, isSelected: false },
        { id: 2, name: 'Webpack', credit: 20, isSelected: false },
        { id: 3, name: 'React', credit: 40, isSelected: false },
      ]);
    });

    test('does nothing when selecting a non-existent course id', () => {
      const populatedState = {
        courses: [
          { id: 1, name: 'ES6', credit: 60, isSelected: false },
        ],
      };

      const action = selectCourse(999);
      const result = coursesReducer(populatedState, action);

      expect(result.courses).toEqual([
        { id: 1, name: 'ES6', credit: 60, isSelected: false },
      ]);
    });

    test('appends isSelected to each course on fetchCourses.fulfilled', () => {
      const action = {
        type: fetchCourses.fulfilled.type,
        payload: [
          { id: 1, name: 'ES6', credit: 60 },
          { id: 2, name: 'Webpack', credit: 20 },
        ],
      };

      const result = coursesReducer(defaultState, action);

      expect(result.courses).toEqual([
        { id: 1, name: 'ES6', credit: 60, isSelected: false },
        { id: 2, name: 'Webpack', credit: 20, isSelected: false },
      ]);
    });
  });
});
