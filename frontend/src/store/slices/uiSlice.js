/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import channelsApi from '../../services/channelsApi';

const initialState = {
  channels: {
    activeChannelId: '1',
    defaultChannelId: '1',
  },
  modals: {
    isOpened: false,
    type: null,
    channelId: null,
  },
};

const setActiveChannel = (state, { payload: { id } }) => {
  state.channels.activeChannelId = id;
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveChannel,
    openModal: (state, { payload: { type, id } }) => {
      state.modals.isOpened = true;
      state.modals.type = type;
      state.modals.channelId = id ?? null;
    },
    closeModal: (state) => {
      state.modals.isOpened = false;
      state.modals.type = null;
      state.modals.channelId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      channelsApi.endpoints.addChannel.matchFulfilled,
      setActiveChannel,
    );
    builder.addMatcher(
      channelsApi.endpoints.deleteChannel.matchFulfilled,
      (state, { payload: { id } }) => {
        if (state.channels.activeChannelId === id) {
          state.channels.activeChannelId = state.channels.defaultChannelId;
        }
      },
    );
  },
});

export const { actions } = uiSlice;

export default uiSlice.reducer;
