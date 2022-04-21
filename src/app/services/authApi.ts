import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export interface LoginResponse {
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? `https://${window.location.hostname}/api/users`
    : `http://${window.location.hostname}:8080/api/users`;

export const authApi = createApi({
  reducerPath: 'authApi',
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
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials
      })
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (credentials) => ({
        url: 'register',
        method: 'POST',
        body: credentials
      })
    }),
    forgotPassword: builder.mutation<{ message: string }, { email: string }>({
      query: (credentials) => ({
        url: 'forgotPassword',
        method: 'POST',
        body: credentials
      })
    }),
    resetPassword: builder.mutation<
      { message: string },
      { emailToken: string; password: string }
    >({
      query: (credentials) => ({
        url: 'resetPassword',
        method: 'PUT',
        body: credentials
      })
    })
  })
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = authApi;
