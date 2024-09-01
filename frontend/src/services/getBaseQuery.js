import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const getBaseQuery = (route) => fetchBaseQuery({
  baseUrl: route,
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().auth;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});
export default getBaseQuery;
