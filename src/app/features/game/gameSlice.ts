import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

export interface GameState {
  inGame: boolean;
  roomId: string;
}

const initialState: GameState = {
  inGame: false,
  roomId: ''
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setInGame: (
      state,
      { payload: { roomId } }: PayloadAction<{ roomId: string }>
    ) => {
      state.inGame = true;
      state.roomId = roomId;
    },
    resetGame: (state) => {
      state.inGame = false;
      state.roomId = '';
    }
  }
});

export const { setInGame, resetGame } = gameSlice.actions;

export default gameSlice.reducer;

export const selectInGame = (state: RootState) => ({
  inGame: state.game.inGame,
  roomId: state.game.roomId
});
