import { useGameState } from '../hooks/useGameState';
import { getAsset } from './Board';

const PieceSelected = () => {
  const { pieceSelected, isWhite, result } = useGameState();
  const asset = getAsset(
    isWhite ? 'w' : 'b',
    getPieceIdentifier(pieceSelected)
  );

  if (result !== '') {
    return (
      <p className="flex flex-1 justify-center items-center text-base font-medium text-sky-100 3xl:text-lg">
        Game has ended.
      </p>
    );
  }

  return (
    <>
      <h1 className="py-8 font-medium text-gray-300 3xl:text-xl">
        The Brain Selected:
      </h1>
      <div className="flex relative py-4 px-5 w-2/3 text-white bg-sky-900/75 rounded-lg focus:outline-none ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300 shadow-md">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center w-full">
            <div className="flex flex-row w-full text-sm">
              {pieceSelected && pieceSelected !== '' ? (
                <>
                  <div className="font-medium text-white">
                    <img
                      src={asset}
                      className="w-4 h-4 xl:w-8 xl:h-8 3xl:w-14 3xl:h-14"
                    />
                  </div>
                  <div className="flex flex-1 justify-center items-center text-base font-medium text-sky-100 3xl:text-lg">
                    {pieceSelected}
                  </div>
                </>
              ) : (
                <p className="flex flex-1 justify-center items-center text-base font-medium text-sky-100 3xl:text-lg">
                  Waiting for Brain to select a piece
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getPieceIdentifier = (piece: string) => {
  switch (piece) {
    case 'Pawn':
      return 'p';
    case 'Knight':
      return 'n';
    case 'Bishop':
      return 'b';
    case 'Rook':
      return 'r';
    case 'Queen':
      return 'q';
    case 'King':
      return 'k';
    default:
      return '';
  }
};

export default PieceSelected;
