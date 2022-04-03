import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { Team } from './teamsApi';
interface Game {
  hostTeam: Team;
  guestTeam: Team;
}

interface CreateGameRequest {
  hostTeamId: string;
  guestTeamId: string;
}

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://hbchess.app/api/games'
    : 'http://localhost:8080/api/games';

export const gameApi = createApi({
  reducerPath: 'gameApi',
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
    getGames: builder.query<Game[], void>({
      query: () => 'get'
    }),
    createGame: builder.mutation<void, CreateGameRequest>({
      query: (createGameBody) => ({
        url: 'create',
        method: 'POST',
        body: createGameBody
      })
    })
  })
});

export const { useGetGamesQuery, useCreateGameMutation } = gameApi;
