import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export interface User {
  _id: string;
  username: string;
}

export interface SearchResponse {
  results: Array<User>;
}

const baseUrl = `http${process.env.NODE_ENV === 'production' ? 's' : ''}://${
  window.location.host
}/api/users`;

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),

  endpoints: (builder) => ({
    search: builder.query<Array<User>, string>({
      transformResponse: (response: SearchResponse) => response.results,
      query: (user) => `search/?search=${user}`
    })
  })
});

export const { useSearchQuery } = usersApi;
