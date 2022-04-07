import { useGameState } from '../hooks/useGameState';
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
  const { board } = useGameState();

  return (
    <div className="flex flex-row p-4 space-y-4 w-[90%] text-white bg-gray-800 rounded-lg shadow-2xl md:flex-row md:justify-between md:space-y-0 md:w-2/3">
      <div className="flex flex-col-reverse justify-center items-center w-full">
        {board.map((row: Array<string>, rank: number) => {
          return (
            <div className="flex flex-row" key={rank}>
              {row.map((piece: string, file: number) => {
                const asset: string = getAsset(piece);

                return (
                  <Square
                    key={`${rank} - ${file}`}
                    rank={rank}
                    file={file}
                    piece={asset}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const getAsset = (piece: string) => {
  switch (piece) {
    case 'BB':
      return b_bishop;
    case 'BK':
      return b_king;
    case 'BN':
      return b_knight;
    case 'BP':
      return b_pawn;
    case 'BQ':
      return b_queen;
    case 'BR':
      return b_rook;
    case 'WB':
      return w_bishop;
    case 'WK':
      return w_king;
    case 'WN':
      return w_knight;
    case 'WP':
      return w_pawn;
    case 'WQ':
      return w_queen;
    case 'WR':
      return w_rook;
    default:
      return '';
  }
};

export default Board;
