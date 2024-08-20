import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import channelsReducer, { actions as channelsActions } from './slices/channelsSlice';
import messagesReducer, { actions as messagesActions } from './slices/messagesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    messages: messagesReducer,
  },
});

export default store;

export const actions = {
  ...channelsActions,
  ...messagesActions,
};
