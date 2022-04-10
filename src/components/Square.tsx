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
  const { isWhite, isHand, pieceSelected, possibleMoves, highlightedSquare } =
    useGameState();
  const dispatch = useAppDispatch();

  const squareName = getSquareName(rank, file);

  const movesOnSquare = [
    squareName,
    getPieceIdentifier(pieceSelected).toUpperCase() + squareName,
    getPieceIdentifier(pieceSelected).toUpperCase() + 'x' + squareName,
    getFileLetter(file) +
      getPieceIdentifier(pieceSelected).toUpperCase() +
      squareName,
    getFileLetter(file) +
      getPieceIdentifier(pieceSelected).toUpperCase() +
      'x' +
      squareName
  ];

  const isAMoveSquare = possibleMoves.some((v: string) =>
    movesOnSquare.includes(v)
  );

  return (
    <button
      key={`${rank} - ${file}`}
      className={`flex justify-center items-center w-10 h-10 xl:w-14 xl:h-14 3xl:w-28 3xl:h-28 ${
        isHand &&
        ((isWhite && color === 'w') ||
          (!isWhite && color === 'b') ||
          isAMoveSquare)
          ? 'cursor-pointer'
          : 'cursor-default'
      } ${
        (rank % 2 === 0 && file % 2 === 0) || (rank % 2 !== 0 && file % 2 !== 0)
          ? 'bg-gray-100'
          : 'bg-green-800'
      }`}
      onClick={() => {
        if (isAMoveSquare) {
          console.log('SQUARE MOVE');
          return;
        }

        if (
          !(
            isHand &&
            ((isWhite && color === 'w') || (!isWhite && color === 'b'))
          ) ||
          pieceSelected === '' ||
          getPieceIdentifier(pieceSelected) !== pieceType
        ) {
          dispatch(setPossibleMoves({ piece: '', highlightedSquare: '' }));
          return;
        }

        if (possibleMoves.length === 0 || highlightedSquare !== squareName) {
          dispatch(
            setPossibleMoves({
              piece: squareName,
              highlightedSquare: squareName
            })
          );
        } else {
          dispatch(setPossibleMoves({ piece: '', highlightedSquare: '' }));
        }
      }}
    >
      {piece !== '' && (
        <img
          src={piece}
          className="w-8 h-8 xl:w-10 xl:h-10 3xl:w-20 3xl:h-20"
          draggable="false"
        />
      )}
      {isAMoveSquare && (
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
