interface SquareProps {
  rank: number;
  file: number;
  piece: string;
}

const Square = ({ rank, file, piece }: SquareProps) => {
  return (
    <div
      key={`${rank} - ${file}`}
      className={`flex justify-center items-center w-28 h-28 ${
        (rank % 2 === 0 && file % 2 === 0) || (rank % 2 !== 0 && file % 2 !== 0)
          ? 'bg-gray-100'
          : 'bg-green-800'
      }`}
    >
      {piece !== '' && <img src={piece} className="w-20 h-20" />}{' '}
    </div>
  );
};

export default Square;
