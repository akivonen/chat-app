import { createApi } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';
import getRoute from '../routes';
import getBaseQuery from './getBaseQuery';

const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery: getBaseQuery(getRoute.messagesPath()),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        const socket = io();
        try {
          await cacheDataLoaded;
          const listener = (data) => (updateCachedData((draft) => {
            draft.push(data);
          }));
          socket.on('newMessage', listener);
        } catch {
          await cacheEntryRemoved;
          socket.close();
        }
      },
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        method: 'POST',
        body: message,
      }),
    }),
  }),
});

export default messagesApi;
