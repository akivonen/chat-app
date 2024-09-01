import { configureStore } from '@reduxjs/toolkit';
import authReducer, { actions as authActions } from './slices/authSlice';
import uiReducer, { actions as uiActions } from './slices/uiSlice';
import api from '../services/index';

const { channelsApi, messagesApi } = api;

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat([channelsApi.middleware, messagesApi.middleware]),
});

export const actions = {
  ...authActions,
  ...uiActions,
};

export default store;
