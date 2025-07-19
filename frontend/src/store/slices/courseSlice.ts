import { createSlice } from '@reduxjs/toolkit';

interface CourseState {
  courses: any[];
  offeredCourses: any[];
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  offeredCourses: [],
  loading: false,
  error: null,
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { clearError } = courseSlice.actions;
export default courseSlice.reducer;