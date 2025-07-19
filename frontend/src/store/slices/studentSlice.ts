import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { studentAPI } from '../../services/studentAPI';

interface StudentState {
  students: any[];
  currentStudent: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: StudentState = {
  students: [],
  currentStudent: null,
  loading: false,
  error: null,
};

// Async thunks
export const getAllStudents = createAsyncThunk(
  'student/getAllStudents',
  async (params: any = {}, { rejectWithValue }) => {
    try {
      const response = await studentAPI.getAllStudents(params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get students');
    }
  }
);

export const getStudentById = createAsyncThunk(
  'student/getStudentById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await studentAPI.getStudentById(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get student');
    }
  }
);

export const updateStudent = createAsyncThunk(
  'student/updateStudent',
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await studentAPI.updateStudent(id, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update student');
    }
  }
);

export const deleteStudent = createAsyncThunk(
  'student/deleteStudent',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await studentAPI.deleteStudent(id);
      return { id, ...response.data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete student');
    }
  }
);

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Students
      .addCase(getAllStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload.data;
      })
      .addCase(getAllStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get Student By ID
      .addCase(getStudentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentStudent = action.payload.data;
      })
      .addCase(getStudentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Student
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        const updatedStudent = action.payload.data;
        const index = state.students.findIndex(student => student.id === updatedStudent.id);
        if (index !== -1) {
          state.students[index] = updatedStudent;
        }
        if (state.currentStudent?.id === updatedStudent.id) {
          state.currentStudent = updatedStudent;
        }
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Student
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.filter(student => student.id !== action.payload.id);
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = studentSlice.actions;
export default studentSlice.reducer;