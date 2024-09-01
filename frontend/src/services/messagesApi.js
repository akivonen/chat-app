import { createApi } from '@reduxjs/toolkit/query/react';
import getRoute from '../routes';
import getBaseQuery from './getBaseQuery';

const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery: getBaseQuery(getRoute.messagesPath()),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
      providesTags: ['Messages'],
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Messages'],
    }),
  }),
});

export default messagesApi;
