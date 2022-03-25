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
  sender: string;
  recipient: string;
}

export interface SearchUserResponse {
  users: Array<Team>;
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
  endpoints: (builder) => ({
    getTeams: builder.query<Team[], void>({
      transformResponse: (response: { teams: Team[] }) => response.teams,
      query: () => 'getTeams'
    }),
    createTeam: builder.mutation<Team, CreateTeamRequest>({
      query: (userIds) => ({
        url: `createTeam`,
        method: 'POST',
        body: userIds
      })
    })
  })
});

export const { useGetTeamsQuery, useCreateTeamMutation } = teamsApi;
