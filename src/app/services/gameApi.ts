import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { Team } from './teamsApi';
interface Game {
  _id: string;
  white: Team;
  black: Team;
  moves: string;
  result: string;
}

interface CreateGameRequest {
  whiteId: string;
  blackId: string;
}

interface CreateGameResponse {
  message: string;
  game: Game;
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
      transformResponse: (
        response: Game[] | { message: string; stack: string | null }
      ) => {
        if (Array.isArray(response)) {
          return response;
        } else {
          return [];
        }
      },
      query: () => 'get'
    }),
    createGame: builder.mutation<CreateGameResponse, CreateGameRequest>({
      query: (createGameBody) => ({
        url: 'create',
        method: 'POST',
        body: createGameBody
      })
    })
  })
});

export const { useGetGamesQuery, useCreateGameMutation } = gameApi;
