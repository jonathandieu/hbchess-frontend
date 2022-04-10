import { useGameState } from '../hooks/useGameState';
import { setPossibleMoves } from '../app/features/game/gameSlice';
import { useAppDispatch } from '../hooks/store';
import { getPieceIdentifier } from './PieceSelected';

interface SquareProps {
  rank: number;
  file: number;
  color: string;
  piece: string;
  pieceType: string;
}

const Square = ({ rank, file, color, piece, pieceType }: SquareProps) => {
  const { isWhite, isHand, pieceSelected, possibleMoves } = useGameState();
  const dispatch = useAppDispatch();

  return (
    <button
      disabled={
        !(
          isHand &&
          ((isWhite && color === 'w') || (!isWhite && color === 'b'))
        ) ||
        pieceSelected === '' ||
        getPieceIdentifier(pieceSelected) !== pieceType
      }
      key={`${rank} - ${file}`}
      className={`flex justify-center items-center w-10 h-10 xl:w-14 xl:h-14 3xl:w-28 3xl:h-28 ${
        isHand && ((isWhite && color === 'w') || (!isWhite && color === 'b'))
          ? 'cursor-pointer'
          : 'cursor-default'
      } ${
        (rank % 2 === 0 && file % 2 === 0) || (rank % 2 !== 0 && file % 2 !== 0)
          ? 'bg-gray-100'
          : 'bg-green-800'
      }`}
      onClick={() =>
        dispatch(setPossibleMoves({ piece: getSquareName(rank, file) }))
      }
    >
      {piece !== '' && (
        <img
          src={piece}
          className="w-8 h-8 xl:w-10 xl:h-10 3xl:w-20 3xl:h-20"
        />
      )}
      {possibleMoves.some((v: string) =>
        [
          getSquareName(rank, file),
          getPieceIdentifier(pieceSelected).toUpperCase() +
            getSquareName(rank, file),
          getPieceIdentifier(pieceSelected).toUpperCase() +
            'x' +
            getSquareName(rank, file),
          getFileLetter(file) +
            getPieceIdentifier(pieceSelected).toUpperCase() +
            getSquareName(rank, file),
          getFileLetter(file) +
            getPieceIdentifier(pieceSelected).toUpperCase() +
            'x' +
            getSquareName(rank, file)
        ].includes(v)
      ) && (
        <div className="z-20 w-4 h-4 bg-gray-400/70 rounded-full xl:w-8 xl:h-8 3xl:w-14 3xl:h-14" />
      )}
    </button>
  );
};

const getSquareName = (rank: number, file: number) => {
  return getFileLetter(file) + `${8 - rank}`;
};

const getFileLetter = (file: number) => {
  return String.fromCharCode(97 + file);
};

export default Square;
