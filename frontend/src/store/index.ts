import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';
import studentSlice from './slices/studentSlice';
import facultySlice from './slices/facultySlice';
import adminSlice from './slices/adminSlice';
import academicSlice from './slices/academicSlice';
import courseSlice from './slices/courseSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    student: studentSlice,
    faculty: facultySlice,
    admin: adminSlice,
    academic: academicSlice,
    course: courseSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;