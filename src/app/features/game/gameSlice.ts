import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { Team } from '../../services/teamsApi';
import { Game } from '../../services/gameApi';
import { Chess, ChessInstance, PieceType } from 'chess.js';

export interface GameState {
  inGame: boolean;
  roomId: string;
  white: Team | null;
  black: Team | null;
  playerTurn: number;
  board: Array<Array<{ type: PieceType; color: 'w' | 'b' } | null>>;
  result: string;
  isWhite: boolean;
  isHand: boolean;
}

const initialState: GameState = {
  inGame: false,
  roomId: '',
  white: null,
  black: null,
  playerTurn: 0,
  board: [],
  result: '',
  isWhite: false,
  isHand: false
};

let chess: ChessInstance;
const getChess = () => {
  if (!chess) {
    chess = Chess();
  }

  return chess;
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setInGame: (
      state,
      { payload: { game, id } }: PayloadAction<{ game: Game; id: string }>
    ) => {
      state.inGame = true;
      state.roomId = game._id;
      state.white = game.white;
      state.black = game.black;
      const chess = getChess();
      state.board = chess.board();

      state.isWhite =
        game.white.sender._id === id || game.white.recipient._id === id;

      state.isHand =
        ((game.white.sender._id === id || game.white.recipient._id === id) &&
          ((game.white.sender._id === id && game.isWhiteSenderHand) ||
            (game.white.recipient._id === id && !game.isWhiteSenderHand))) ||
        ((game.black.sender._id === id || game.black.recipient._id === id) &&
          ((game.black.sender._id === id && game.isBlackSenderHand) ||
            (game.black.recipient._id === id && !game.isBlackSenderHand)));
    },
    resetGame: (state) => {
      state.inGame = false;
      state.roomId = '';
      state.white = null;
      state.black = null;
      state.playerTurn = 0;
      state.board = [];
      state.isWhite = false;
      state.isHand = false;
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
  board: state.game.board,
  isWhite: state.game.isWhite,
  isHand: state.game.isHand
});
