/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import channelsApi from '../../services/channelsApi';

const initialState = {
  activeChannelId: '1',
  defaultChannelId: '1',
  modalIsOpened: null,
  modalType: null,
  channelId: null,
};

const setActiveChannel = (state, { payload: { id } }) => {
  state.activeChannelId = id;
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveChannel,
    openModal: (state, { payload: { type, id } }) => {
      state.modalIsOpened = true;
      state.modalType = type;
      state.channelId = id ?? null;
    },
    closeModal: (state) => {
      state.modalIsOpened = false;
      state.modalType = null;
      state.channelId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      channelsApi.endpoints.addChannel.matchFulfilled,
      setActiveChannel,
    );
  },
});

export const { actions } = uiSlice;

export default uiSlice.reducer;
