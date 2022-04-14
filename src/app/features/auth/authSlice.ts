import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import type { RootState } from '../../store';

export interface JwtToken {
  id: string;
  username: string;
  email: string;
  exp: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string;
  userExpirationDate: string;
}

const initialState: AuthState = {
  token: '',
  user: null,
  userExpirationDate: ''
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { token } }: PayloadAction<{ token: string }>
    ) => {
      state.token = token;
      const { id, username, email, exp }: JwtToken = jwt_decode(token);

      const date = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).format(exp * 1000);

      state.user = { id, username, email };
      state.userExpirationDate = date.toString();
    },
    resetCredentials: (state) => {
      state.token = '';
      state.userExpirationDate = '';
      state.user = null;
    }
  }
});

export const { setCredentials, resetCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => ({
  user: state.auth.user,
  token: state.auth.token
});
