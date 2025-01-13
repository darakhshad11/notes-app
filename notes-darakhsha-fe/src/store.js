import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import notesReducer from './features/notes/notesSlice';
import adminReducer from './features/admin/adminSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: notesReducer,
    admin: adminReducer,
  },middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Add this if you're storing complex objects
    }),
});