import { useGameState } from '../hooks/useGameState';
import { resetGame } from '../app/features/game/gameSlice';
import { useAppDispatch } from '../hooks/store';
import { PieceType } from 'chess.js';

import Square from './Square';

import b_bishop from '../assets/b_bishop.svg';
import b_king from '../assets/b_king.svg';
import b_knight from '../assets/b_knight.svg';
import b_pawn from '../assets/b_pawn.svg';
import b_queen from '../assets/b_queen.svg';
import b_rook from '../assets/b_rook.svg';

import w_bishop from '../assets/w_bishop.svg';
import w_king from '../assets/w_king.svg';
import w_knight from '../assets/w_knight.svg';
import w_pawn from '../assets/w_pawn.svg';
import w_queen from '../assets/w_queen.svg';
import w_rook from '../assets/w_rook.svg';

const Board = () => {
  const { board, isWhite } = useGameState();
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col justify-center items-center p-4 space-y-4 w-[60%] h-[90%] text-white bg-gray-800 rounded-lg shadow-2xl">
      <div
        className={`flex ${
          isWhite ? 'flex-col' : 'flex-col-reverse'
        } justify-center items-center w-full`}
      >
        {board.map(
          (
            row: Array<{ type: PieceType; color: 'w' | 'b' } | null>,
            rank: number
          ) => {
            return (
              <div className="flex flex-row" key={rank}>
                {row.map(
                  (
                    square: { type: PieceType; color: 'w' | 'b' } | null,
                    file: number
                  ) => {
                    const color = square?.color ?? '';
                    const type = square?.type ?? '';
                    const asset: string = getAsset(color, type);

                    return (
                      <Square
                        key={`${rank} - ${file}`}
                        rank={rank}
                        file={file}
                        color={color}
                        piece={asset}
                        pieceType={type}
                      />
                    );
                  }
                )}
              </div>
            );
          }
        )}
      </div>

      {process.env.NODE_ENV === 'development' && (
        <button onClick={() => dispatch(resetGame())}>Reset Game State</button>
      )}
    </div>
  );
};

export const getAsset = (color: string, type: string) => {
  if (color === 'w') {
    switch (type) {
      case 'p':
        return w_pawn;
      case 'n':
        return w_knight;
      case 'b':
        return w_bishop;
      case 'r':
        return w_rook;
      case 'q':
        return w_queen;
      case 'k':
        return w_king;
    }
  } else if (color === 'b') {
    switch (type) {
      case 'p':
        return b_pawn;
      case 'n':
        return b_knight;
      case 'b':
        return b_bishop;
      case 'r':
        return b_rook;
      case 'q':
        return b_queen;
      case 'k':
        return b_king;
    }
  }

  return '';
};

export default Board;
