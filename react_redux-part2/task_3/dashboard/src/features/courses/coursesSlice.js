import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { logout } from '../auth/authSlice';
import axios from 'axios';

const initialState = {
    courses: [],
};

const API_BASE_URL = "http://localhost:5173";

const ENDPOINTS = { courses: `${API_BASE_URL}/courses.json` };

const fetchCourses = createAsyncThunk(
    'courses/fetchCourses',
    async () => {
        const response = await axios.get(ENDPOINTS.courses);

        const fetchedCourses = response.data.courses;
        return fetchedCourses;
    }
);

const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        selectCourse: (state, { payload }) => {
            const course = state.courses.find(
                course => course.id === payload)
            if (course) {
                course.isSelected = true;
            }
        },
        unSelectCourse: (state, { payload }) => {
            const course = state.courses.find(
                course => course.id === payload)
            if (course) {
                course.isSelected = false;
            }
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchCourses.fulfilled, (state, action) => {
            state.courses = action.payload.map(course => ({...course, isSelected: false}));
        });
        builder.addCase(logout, (state) => {
            state.courses = [];
        });
    }
});

export { fetchCourses };
export const { selectCourse, unSelectCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
