import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export interface Team {
  _id: string;
  sender: string;
  senderUsername: string;
  recipient: string;
  recipientUsername: string;
  accepted: boolean;
}

export interface CreateTeamRequest {
  username: string;
}

export interface AcceptTeamRequest {
  username: string;
}

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://hbchess.app/api/teams'
    : 'http://localhost:8080/api/teams';

export const teamsApi = createApi({
  reducerPath: 'teamsApi',
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
  tagTypes: ['Teams'],
  endpoints: (builder) => ({
    getTeams: builder.query<Team[], void>({
      transformResponse: (response: { teams: Team[] }) => response.teams,
      providesTags: ['Teams'],
      query: () => 'getTeams'
    }),
    createTeam: builder.mutation<Team, CreateTeamRequest>({
      invalidatesTags: ['Teams'],
      query: (createTeamBody) => ({
        url: 'create',
        method: 'POST',
        body: createTeamBody
      })
    }),
    acceptTeam: builder.mutation<Team, AcceptTeamRequest>({
      invalidatesTags: ['Teams'],
      query: (acceptTeamBody) => ({
        url: 'accept',
        method: 'PUT',
        body: acceptTeamBody
      })
    })
  })
});

export const {
  useGetTeamsQuery,
  useCreateTeamMutation,
  useAcceptTeamMutation
} = teamsApi;
