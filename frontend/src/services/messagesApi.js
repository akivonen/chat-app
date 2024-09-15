import { createApi } from '@reduxjs/toolkit/query/react';
import getRoute from '../routes';
import getBaseQuery from './getBaseQuery';
import socket from '../socket';

const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery: getBaseQuery(getRoute.messagesPath()),
  tagTypes: ['Message'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
      providesTags: ['Message'],
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        await cacheDataLoaded;
        const addMessageListener = (data) => (updateCachedData((draft) => {
          draft.push(data);
        }));
        const removeChannelListener = ({ id }) => updateCachedData(
          (draft) => draft.filter((message) => message.channelId !== id),
        );
        socket.on('newMessage', addMessageListener);
        socket.on('removeChannel', removeChannelListener);
        await cacheEntryRemoved;
        socket.off('newMessage', addMessageListener);
        socket.off('removeChannel', removeChannelListener);
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
