import { createSlice } from '@reduxjs/toolkit';

interface AcademicState {
  semesters: any[];
  faculties: any[];
  departments: any[];
  loading: boolean;
  error: string | null;
}

const initialState: AcademicState = {
  semesters: [],
  faculties: [],
  departments: [],
  loading: false,
  error: null,
};

const academicSlice = createSlice({
  name: 'academic',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { clearError } = academicSlice.actions;
export default academicSlice.reducer;