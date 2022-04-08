import { useGameState } from '../hooks/useGameState';

interface SquareProps {
  rank: number;
  file: number;
  color: string;
  piece: string;
}

const Square = ({ rank, file, color, piece }: SquareProps) => {
  const { isWhite, isHand } = useGameState();
  return (
    <div
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
      onClick={() => console.log('Get All Moves')}
    >
      {piece !== '' && (
        <img
          src={piece}
          className="w-8 h-8 xl:w-10 xl:h-10 3xl:w-20 3xl:h-20"
        />
      )}
    </div>
  );
};

export default Square;
