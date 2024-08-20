/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { fetchChannels } from '../../http/fetchData.js';

const initialState = {
  channelsList: [],
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, { payload }) => {
      state.channelsList = [...state.channelsList, payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        state.channelsList = payload;
      });
  },
});

export const { actions } = channelsSlice;

export default channelsSlice.reducer;
