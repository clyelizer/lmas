import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import gradesReducer from './gradesSlice';
import bulletinsReducer from './bulletinsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    grades: gradesReducer,
    bulletins: bulletinsReducer,
  },
});

export default store;
