/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { fetchMessages } from '../../http/fetchData.js';

const initialState = {
  messagesList: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      state.messagesList = [...state.messagesList, payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, { payload }) => {
        state.messagesList = payload;
      });
  },
});

export const { actions } = messagesSlice;

export default messagesSlice.reducer;
