import coursesReducer, { fetchCourses } from '../courses/coursesSlice'
import { logout } from '../auth/authSlice'; 

import mockAxios from 'jest-mock-axios';

afterEach(() => {
    mockAxios.reset();
});

const mockCourses = {
    courses: [
        { "id": 1, "name": "ES6", "credit": 60 },
        { "id": 2, "name": "Webpack", "credit": 20 },
        { "id": 3, "name": "React", "credit": 40 }
    ]
};

test("Returns the correct initial state by default", () => {
    const state = coursesReducer(undefined, { type: 'unknown' });
    expect(state.courses).toStrictEqual([]);
});

test("Fetches courses data correctly", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    const promise = fetchCourses()(dispatch, getState, null);

    mockAxios.mockResponse({
        data: mockCourses
    });

    await promise;

    expect(dispatch).toHaveBeenCalledTimes(2);

    const fulfilledAction = dispatch.mock.calls[1][0];

    expect(fulfilledAction.payload).toHaveLength(3);
    expect(Array.isArray(fulfilledAction.payload)).toBe(true);
    expect(fulfilledAction.payload).toEqual(mockCourses.courses);

});

test("Resets the courses array to empty whenever the logout action is dispatched", () => {
    const stateWithCourses = {
        courses: mockCourses.courses
    }
    const logoutAction = logout();
    const newState = coursesReducer(stateWithCourses, logoutAction);

    expect(newState.courses).toStrictEqual([]);
});
