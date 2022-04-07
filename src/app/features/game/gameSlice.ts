import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { Team } from '../../services/teamsApi';
import { Game } from '../../services/gameApi';

export interface GameState {
  inGame: boolean;
  roomId: string;
  white: Team | null;
  black: Team | null;
  playerTurn: number;
  board: Array<Array<string>>;
  moves: Array<string>;
  result: string;
}

const initialState: GameState = {
  inGame: false,
  roomId: '',
  white: null,
  black: null,
  playerTurn: 0,
  board: [
    ['WR', 'WN', 'WB', 'WQ', 'WK', 'WB', 'WN', 'WR'],
    ['WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP'],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP'],
    ['BR', 'BN', 'BB', 'BQ', 'BK', 'BB', 'BN', 'BR']
  ],
  moves: [],
  result: ''
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setInGame: (
      state,
      { payload: { game } }: PayloadAction<{ game: Game }>
    ) => {
      state.inGame = true;
      state.roomId = game._id;
      state.white = game.white;
      state.black = game.black;
    },
    resetGame: (state) => {
      state.inGame = false;
      state.roomId = '';
      state.white = null;
      state.black = null;
      state.playerTurn = 0;
      state.board = [
        ['WR', 'WN', 'WB', 'WQ', 'WK', 'WB', 'WN', 'WR'],
        ['WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP'],
        ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
        ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
        ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
        ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
        ['BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP'],
        ['BR', 'BN', 'BB', 'BQ', 'BK', 'BB', 'BN', 'BR']
      ];
    }
  }
});

export const { setInGame, resetGame } = gameSlice.actions;

export default gameSlice.reducer;

export const selectInGame = (state: RootState) => ({
  inGame: state.game.inGame,
  roomId: state.game.roomId
});

export const selectGameState = (state: RootState) => ({
  white: state.game.white,
  black: state.game.black,
  playerTurn: state.game.playerTurn,
  board: state.game.board
});
