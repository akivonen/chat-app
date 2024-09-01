import { createApi } from '@reduxjs/toolkit/query/react';
import getRoute from '../routes';
import getBaseQuery from './getBaseQuery';

const channelsApi = createApi({
  reducerPath: 'channels',
  baseQuery: getBaseQuery(getRoute.channelsPath()),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
    }),
  }),
});

export default channelsApi;
