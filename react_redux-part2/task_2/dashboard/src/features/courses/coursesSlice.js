import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from '../auth/authSlice';

const initialState = {
  courses: [],
};

const BASE_URL = 'http://localhost:5173';
const ENDPOINTS = {
  courses: `${BASE_URL}/courses.json`,
};

// Async thunk to fetch courses from the API
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async () => {
    const result = await axios.get(ENDPOINTS.courses);
    return result.data.courses;
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    // Mark a course as selected by its id
    selectCourse: (state, { payload }) => {
      const item = state.courses.find((c) => c.id === payload);
      if (item) item.isSelected = true;
    },
    // Mark a course as unselected by its id
    unSelectCourse: (state, { payload }) => {
      const item = state.courses.find((c) => c.id === payload);
      if (item) item.isSelected = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.fulfilled, (state, action) => {
        // Add isSelected: false to each course when fetched
        state.courses = action.payload.map((course) => ({
          ...course,
          isSelected: false,
        }));
      })
      .addCase(logout, (state) => {
        state.courses = initialState.courses;
      });
  },
});

export const { selectCourse, unSelectCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
