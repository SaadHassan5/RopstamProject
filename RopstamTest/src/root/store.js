import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userServices';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
