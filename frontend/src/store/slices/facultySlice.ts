import { createSlice } from '@reduxjs/toolkit';

interface FacultyState {
  faculties: any[];
  loading: boolean;
  error: string | null;
}

const initialState: FacultyState = {
  faculties: [],
  loading: false,
  error: null,
};

const facultySlice = createSlice({
  name: 'faculty',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { clearError } = facultySlice.actions;
export default facultySlice.reducer;