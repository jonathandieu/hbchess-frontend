import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export interface SearchResponse {
  users: Array<{ id: string; username: string }>;
}

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://hbchess.app/api/users'
    : 'http://localhost:8080/api/users';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `${token}`);
      }
      return headers;
    }
  }),

  endpoints: (builder) => ({
    search: builder.query<Array<{ id: string; username: string }>, string>({
      transformResponse: (response: SearchResponse) => response.users,
      query: (user) => `search/?search=${user}`
    })
  })
});

export const { useSearchQuery } = usersApi;
