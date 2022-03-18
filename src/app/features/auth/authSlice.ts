import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import type { RootState } from '../../store';

export interface User {
  id: string;
  username: string;
  email: string;
  exp: number;
}

export interface AuthState {
  user: User | null;
  token: string;
}

const initialState: AuthState = {
  token: '',
  user: null
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
      const { id, username, email, exp }: User = jwt_decode(token);
      state.user = { id, username, email, exp };
    },
    resetCredentials: (state) => {
      state.token = '';
      state.user = null;
    }
  }
});

export const { setCredentials, resetCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
