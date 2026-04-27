import coursesReducer, { fetchCourses } from '../courses/coursesSlice';
import { logout } from '../auth/authSlice';
import mockAxios from 'jest-mock-axios';

afterEach(() => {
  mockAxios.reset();
});

describe('coursesSlice', () => {
  const defaultState = {
    courses: [],
  };

  test('should return the initial state', () => {
    expect(coursesReducer(undefined, { type: 'unknown' })).toEqual(defaultState);
  });

  test('should handle fetchCourses.fulfilled', () => {
    const mockCourses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ];
    const action = {
      type: fetchCourses.fulfilled.type,
      payload: mockCourses,
    };
    const result = coursesReducer(defaultState, action);
    expect(result.courses).toEqual(mockCourses);
  });

  test('should fetch courses data via async thunk', async () => {
    const mockCourses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 }
    ];

    const dispatch = jest.fn();
    const getState = jest.fn();

    const promise = fetchCourses()(dispatch, getState, null);

    mockAxios.mockResponse({
      data: { courses: mockCourses }
    });

    await promise;

    expect(dispatch).toHaveBeenCalledTimes(2);

    const fulfilledAction = dispatch.mock.calls[1][0];

    expect(fulfilledAction).toEqual(
      expect.objectContaining({
        type: fetchCourses.fulfilled.type,
        payload: mockCourses
      })
    );
    expect(fulfilledAction.payload).toHaveLength(3);
  });

  test('should reset courses on logout', () => {
    const stateWithCourses = {
      courses: [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
      ],
    };

    const action = { type: logout.type };
    const result = coursesReducer(stateWithCourses, action);

    expect(result).toEqual({ courses: [] });
  });
});
