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
  teamTurn: 'w' | 'b';
  board: Array<Array<{ type: PieceType; color: 'w' | 'b' } | null>>;
  playersIn: Array<string>;
  result: string;
  isWhite: boolean;
  isHand: boolean;
  pieceSelected: string;
  possibleMoves: Array<string>;
}

const initialState: GameState = {
  inGame: false,
  roomId: '',
  white: null,
  black: null,
  teamTurn: 'w',
  board: [],
  playersIn: [],
  result: '',
  isWhite: false,
  isHand: false,
  pieceSelected: '',
  possibleMoves: []
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
      state = initialState;

      return state;
    },
    addJoinedPlayer: (
      state,
      { payload: { playerIds } }: PayloadAction<{ playerIds: Array<string> }>
    ) => {
      state.playersIn = playerIds;
    },
    setPiecePicked: (
      state,
      { payload: { pickedPiece } }: PayloadAction<{ pickedPiece: string }>
    ) => {
      if (
        (state.isWhite && state.teamTurn === 'w') ||
        (!state.isWhite && state.teamTurn === 'b')
      ) {
        state.pieceSelected = pickedPiece;
      }
    },
    setPossibleMoves: (
      state,
      { payload: { piece } }: PayloadAction<{ piece: string }>
    ) => {
      const chess = getChess();

      state.possibleMoves = chess.moves({ square: piece });
    }
  }
});

export const {
  setInGame,
  resetGame,
  addJoinedPlayer,
  setPiecePicked,
  setPossibleMoves
} = gameSlice.actions;

export default gameSlice.reducer;

export const selectInGame = (state: RootState) => ({
  inGame: state.game.inGame,
  roomId: state.game.roomId
});

export const selectGameState = (state: RootState) => ({
  white: state.game.white,
  black: state.game.black,
  teamTurn: state.game.teamTurn,
  board: state.game.board,
  playersIn: state.game.playersIn,
  isWhite: state.game.isWhite,
  isHand: state.game.isHand,
  pieceSelected: state.game.pieceSelected,
  pieceSelectedAsset: state.game.pieceSelectedAsset,
  possibleMoves: state.game.possibleMoves
});
