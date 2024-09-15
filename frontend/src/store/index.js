import { configureStore } from '@reduxjs/toolkit';
import api from '../services/index';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import deleteActiveChannelMiddleware from './middlewares/deleteActiveChannelMiddlaware';

const { channelsApi, messagesApi } = api;

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat([channelsApi.middleware, messagesApi.middleware, deleteActiveChannelMiddleware]),
});

export default store;
