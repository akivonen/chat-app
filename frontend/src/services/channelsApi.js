import { createApi } from '@reduxjs/toolkit/query/react';
import getRoute from '../routes';
import getBaseQuery from './getBaseQuery';

const channelsApi = createApi({
  reducerPath: 'channels',
  baseQuery: getBaseQuery(getRoute.channelsPath()),
  tagTypes: ['Channel'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
      providesTags: ['Channel'],
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        method: 'POST',
        body: channel,
      }),
      invalidatesTags: ['Channel'],
    }),
    updateChannel: builder.mutation({
      query: ({ id, ...body }) => ({
        method: 'PATCH',
        url: id,
        body,
      }),
      invalidatesTags: ['Channel'],
    }),
    deleteChannel: builder.mutation({
      query: (id) => ({
        method: 'DELETE',
        url: id,
      }),
      invalidatesTags: ['Channel'],
    }),
  }),
});

export default channelsApi;
