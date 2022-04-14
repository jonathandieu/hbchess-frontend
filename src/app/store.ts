import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/authApi';
import { usersApi } from './services/usersApi';
import { teamsApi } from './services/teamsApi';
import { socketApi } from './services/socketApi';
import { gameApi } from './services/gameApi';

import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import authReducer from './features/auth/authSlice';
import gameReducer from './features/game/gameSlice';
import createExpirationTransform from './redux-persist-expire';

const reducers = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [teamsApi.reducerPath]: teamsApi.reducer,
  [socketApi.reducerPath]: socketApi.reducer,
  [gameApi.reducerPath]: gameApi.reducer,
  auth: authReducer,
  game: gameReducer
});

const userExpireTransform = createExpirationTransform({
  expireKey: 'userExpirationDate',
  defaultState: {
    token: '',
    userExpirationDate: '',
    user: null
  }
});

const persistConfig = {
  key: 'root',
  blacklist: [
    teamsApi.reducerPath,
    usersApi.reducerPath,
    socketApi.reducerPath,
    gameApi.reducerPath
  ],
  transforms: [userExpireTransform],
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      authApi.middleware,
      teamsApi.middleware,
      usersApi.middleware,
      socketApi.middleware,
      gameApi.middleware
    )
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
