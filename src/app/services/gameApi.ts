import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { Team } from './teamsApi';

export interface Game {
  _id: string;
  white: Team;
  black: Team;
  moves: string;
  result: string;
  isWhiteSenderHand: boolean;
  isBlackSenderHand: boolean;
}

interface CreateGameRequest {
  whiteId: string;
  blackId: string;
}

interface CreateGameResponse {
  message: string;
  game: Game;
}

interface SaveGameResponse {
  message: string;
}

interface SaveGameRequest {
  white: string;
  black: string;
  winner: string;
  gameId: string;
  moves: Array<string>;
}

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? `https://${window.location.hostname}/api/games`
    : `http://${window.location.hostname}:8080/api/games`;

export const gameApi = createApi({
  reducerPath: 'gameApi',
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
    }),
    saveGame: builder.mutation<SaveGameResponse, SaveGameRequest>({
      query: (saveGameBody) => ({
        url: 'save',
        method: 'PUT',
        body: saveGameBody
      })
    }),
    getDashboard: builder.query<Game[], void>({
      query: () => 'dashboard'
    })
  })
});

export const {
  useGetGamesQuery,
  useCreateGameMutation,
  useSaveGameMutation,
  useGetDashboardQuery
} = gameApi;
