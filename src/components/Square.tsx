import { useGameState } from '../hooks/useGameState';
import { setPossibleMoves, setMove } from '../app/features/game/gameSlice';
import { useAppDispatch } from '../hooks/store';
import { getPieceIdentifier } from './PieceSelected';
import { useAuth } from '../hooks/useAuth';
import { useInGame } from '../hooks/useInGame';
import { useMakeMoveMutation } from '../app/services/socketApi';
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
  const { token } = useAuth();
  const { roomId } = useInGame();
  const [makeMove] = useMakeMoveMutation();

  const squareName = getSquareName(rank, file);

  const isAMoveSquare = possibleMoves.filter((value: string) =>
    value.includes(squareName)
  );

  return (
    <button
      key={`${rank} - ${file}`}
      className={`relative flex justify-center items-center w-10 h-10 xl:w-14 xl:h-14 3xl:w-28 3xl:h-28 ${
        isHand &&
        ((isWhite && color === 'w') ||
          (!isWhite && color === 'b') ||
          isAMoveSquare.length !== 0)
          ? 'cursor-pointer'
          : 'cursor-default'
      } ${
        (rank % 2 === 0 && file % 2 === 0) || (rank % 2 !== 0 && file % 2 !== 0)
          ? 'bg-gray-100'
          : 'bg-green-800'
      }`}
      onClick={() => {
        if (isAMoveSquare.length !== 0) {
          makeMove({ token, roomId, move: isAMoveSquare[0] });
          dispatch(setMove({ move: isAMoveSquare[0] }));
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
          className="absolute w-8 h-8 xl:w-10 xl:h-10 3xl:w-20 3xl:h-20"
          draggable="false"
        />
      )}
      {isAMoveSquare.length !== 0 && (
        <div className="absolute z-20 w-4 h-4 bg-gray-400/70 rounded-full xl:w-8 xl:h-8 3xl:w-14 3xl:h-14" />
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
