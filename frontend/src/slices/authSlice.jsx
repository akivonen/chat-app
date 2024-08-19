/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('authToken'))
  || { username: null, token: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload: { username, token } }) => {
      localStorage.setItem('authToken', JSON.stringify({ username, token }));
      state.username = username;
      state.token = token;
    },
    removeCredentials: (state) => {
      localStorage.remove('authToken');
      state.username = null;
      state.token = null;
    },
  },
});

export const { setCredentials, removeCredentials } = authSlice.actions;

export default authSlice.reducer;
