import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { User } from './usersApi';

export interface Team {
  _id: string;
  sender: User;
  recipient: User;
  matches: number;
  wins: Array<string>;
  losses: Array<string>;
  ties: Array<string>;
  name: string;
  accepted: boolean;
}

export interface GetTeamsResponse {
  acceptedTeams: Team[];
  pendingTeams: Team[];
}

export interface CreateTeamRequest {
  username: string;
}

export interface AcceptTeamRequest {
  username: string;
}

export interface GetAllTeamsRequest {
  limit: number;
  offset: number;
}

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? `https://${window.location.hostname}/api/teams`
    : `http://${window.location.hostname}:8080/api/teams`;

export const teamsApi = createApi({
  reducerPath: 'teamsApi',
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
  tagTypes: ['Teams'],
  endpoints: (builder) => ({
    getTeams: builder.query<GetTeamsResponse, void>({
      transformResponse: (response: { team: Team[]; teamNot: Team[] }) => ({
        acceptedTeams: response.team,
        pendingTeams: response.teamNot
      }),
      providesTags: ['Teams'],
      query: () => 'get'
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
    }),
    getAllTeams: builder.query<Team[], GetAllTeamsRequest>({
      query: ({ limit, offset }) => `all?limit=${limit}&offset=${offset}`
    })
  })
});

export const {
  useGetTeamsQuery,
  useCreateTeamMutation,
  useAcceptTeamMutation,
  useGetAllTeamsQuery
} = teamsApi;
