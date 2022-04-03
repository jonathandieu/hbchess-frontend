import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { io, Socket } from 'socket.io-client';

export interface CreateGameRequest {
  username: string;
  teammate: string;
  roomId: string;
  token: string;
}

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://hbchess.app/api/socket.io'
    : 'http://localhost:8080/api/socket.io';

let socket: Socket;
const getSocket = (token: string) => {
  if (!socket) {
    socket = io(
      process.env.NODE === 'production'
        ? 'https://hbchess.app'
        : 'http://localhost:65080',
      {
        transports: ['websocket'],
        query: {
          token: token
        },
        withCredentials: true
      }
    );
  }
  return socket;
};

export const socketApi = createApi({
  reducerPath: 'socketApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getGames: builder.query<Array<[string, [string]]>, string>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(
        token,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;

          const socket = getSocket(token);
          socket.emit('request_games', (games: Array<[string, [string]]>) => {
            updateCachedData((draft) => {
              draft = games;
              return draft;
            });
          });

          await cacheEntryRemoved;

          socket.off('available_games');
        } catch {
          // if cacheEntryRemoved resolved before cacheDataLoaded,
          // cacheDataLoaded throws
        }
      }
    }),
    createGame: builder.mutation<[string, [string]], CreateGameRequest>({
      queryFn: ({ token, ...createGameRequest }: CreateGameRequest) => {
        const socket = getSocket(token);
        return new Promise((resolve) => {
          socket.emit(
            'join_game',
            createGameRequest,
            (game: [string, [string]]) => {
              resolve({ data: game });
            }
          );

          socket.on('room_emit_error', () => {
            console.log('ERROR');
          });

          socket.on('room_joined', () => {
            console.log('ROOM JOINED');
          });
        });
      }
    })
  })
});

export const { useGetGamesQuery, useCreateGameMutation } = socketApi;
