/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = { activeChannelId: '1' };

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveChannel: (state, { payload: { id } }) => {
      state.activeChannelId = id;
    },
  },
});

export const { actions } = uiSlice;

export default uiSlice.reducer;
