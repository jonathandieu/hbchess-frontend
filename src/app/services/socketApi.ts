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
    // eslint-disable-next-line prettier/prettier
    joinGame: builder.mutation<{ message: string }, { token: string; roomId: string }>({
      queryFn: ({ token, roomId }: { token: string; roomId: string }) => {
        const socket = getSocket(token);
        return new Promise((resolve) => {
          socket.emit('join_game', roomId, (message: string) =>
            resolve({ data: { message } })
          );
        });
      }
    })
  })
});

export const { useJoinGameMutation } = socketApi;
