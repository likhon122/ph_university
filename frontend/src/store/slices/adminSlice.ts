import { createSlice } from '@reduxjs/toolkit';

interface AdminState {
  admins: any[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  admins: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;