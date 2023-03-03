import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    isLoggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
    },
    register: (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },
    updateUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { login, logout, register, updateUser } = userSlice.actions;

export default userSlice.reducer;
