import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { io, Socket } from 'socket.io-client';

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
    joinGame: builder.mutation<
      { message: string },
      { token: string; roomId: string; player_id: string }
    >({
      queryFn: ({
        token,
        roomId,
        player_id
      }: {
        token: string;
        roomId: string;
        player_id: string;
      }) => {
        const socket = getSocket(token);
        return new Promise((resolve) => {
          socket.emit('join_game', { roomId, player_id }, (message: string) =>
            resolve({ data: { message } })
          );
        });
      }
    }),
    playerJoins: builder.query<Array<string>, string>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(
        token,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;
          const socket = getSocket(token);

          socket.on('player_joined', (userIds: Array<string>) => {
            updateCachedData((draft) => {
              draft = userIds;
              return draft;
            });
          });
          await cacheEntryRemoved;

          socket.off('player_joined');
        } catch {
          // if cacheEntryRemoved resolved before cacheDataLoaded,
          // cacheDataLoaded throws
        }
      }
    }),
    pickPiece: builder.mutation<
      { message: string },
      { token: string; roomId: string; piece: string }
    >({
      queryFn: ({
        token,
        roomId,
        piece
      }: {
        token: string;
        roomId: string;
        piece: string;
      }) => {
        const socket = getSocket(token);
        return new Promise((resolve) => {
          socket.emit('pick_piece', { roomId, piece }, (message: string) =>
            resolve({ data: { message } })
          );
        });
      }
    }),
    pickedPiece: builder.query<string, string>({
      queryFn: () => ({ data: '' }),
      async onCacheEntryAdded(
        token,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;
          const socket = getSocket(token);

          socket.on('piecePicked', (pieceMoved: string) => {
            updateCachedData((draft) => {
              draft = pieceMoved;
              return draft;
            });
          });

          await cacheEntryRemoved;

          socket.off('piecePicked');
        } catch {
          // if cacheEntryRemoved resolved before cacheDataLoaded,
          // cacheDataLoaded throws
        }
      }
    }),
    makeMove: builder.mutation<
      { message: string },
      { token: string; roomId: string; move: string }
    >({
      queryFn: ({
        token,
        roomId,
        move
      }: {
        token: string;
        roomId: string;
        move: string;
      }) => {
        const socket = getSocket(token);
        return new Promise((resolve) => {
          socket.emit('send_move', { roomId, move }, (message: string) =>
            resolve({ data: { message } })
          );
        });
      }
    }),
    sentMove: builder.query<string, string>({
      queryFn: () => ({ data: '' }),
      async onCacheEntryAdded(
        token,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;
          const socket = getSocket(token);

          socket.on('sentMove', (pieceMoved: string) => {
            updateCachedData((draft) => {
              draft = pieceMoved;
              return draft;
            });
          });

          await cacheEntryRemoved;

          socket.off('sentMove');
        } catch {
          // if cacheEntryRemoved resolved before cacheDataLoaded,
          // cacheDataLoaded throws
        }
      }
    })
  })
});

export const {
  useJoinGameMutation,
  usePlayerJoinsQuery,
  usePickPieceMutation,
  usePickedPieceQuery,
  useMakeMoveMutation,
  useSentMoveQuery
} = socketApi;
