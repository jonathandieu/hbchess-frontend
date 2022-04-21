import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { useInGame } from '../hooks/useInGame';
import { useGameState } from '../hooks/useGameState';
import { useAuth } from '../hooks/useAuth';
import { usePickPieceMutation } from '../app/services/socketApi';

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
import { getAsset } from './Board';
import { getPieceIdentifier } from './PieceSelected';
import { useAppDispatch } from '../hooks/store';
import { setPiecePicked, getChess } from '../app/features/game/gameSlice';

export default function Example() {
  const { roomId } = useInGame();
  const { isWhite, board, pieceSelected, result } = useGameState();
  const { token } = useAuth();
  const dispatch = useAppDispatch();

  const chess = getChess();

  function pieceHasValidMoves(piece: string) {
    let hasValidMove = false;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        hasValidMove =
          board[i][j]?.type === piece &&
          ((isWhite && board[i][j]?.color === 'w') ||
            (!isWhite && board[i][j]?.color === 'b')) &&
          chess.moves({ square: String.fromCharCode(97 + j) + `${8 - i}` })
            .length !== 0;
        if (hasValidMove) break;
      }
      if (hasValidMove) break;
    }
    return hasValidMove;
  }

  const options: Array<{ piece: string; asset: string; isValid: boolean }> = [
    {
      piece: 'Pawn',
      asset: isWhite ? w_pawn : b_pawn,
      isValid: pieceHasValidMoves('p')
    },
    {
      piece: 'Knight',
      asset: isWhite ? w_knight : b_knight,
      isValid: pieceHasValidMoves('n')
    },
    {
      piece: 'Bishop',
      asset: isWhite ? w_bishop : b_bishop,
      isValid: pieceHasValidMoves('b')
    },
    {
      piece: 'Rook',
      asset: isWhite ? w_rook : b_rook,
      isValid: pieceHasValidMoves('r')
    },
    {
      piece: 'Queen',
      asset: isWhite ? w_queen : b_queen,
      isValid: pieceHasValidMoves('q')
    },
    {
      piece: 'King',
      asset: isWhite ? w_king : b_king,
      isValid: pieceHasValidMoves('k')
    }
  ];
  const [selectedPiece, setSelectedPiece] = useState('');

  const [pickPiece] = usePickPieceMutation();

  if (result !== '') {
    return (
      <p className="flex flex-1 justify-center items-center text-base font-medium text-sky-100 3xl:text-lg">
        Game has ended.
      </p>
    );
  }

  if (pieceSelected && pieceSelected !== '') {
    const asset = getAsset(
      isWhite ? 'w' : 'b',
      getPieceIdentifier(pieceSelected)
    );
    return (
      <>
        <h1 className="py-8 font-medium text-gray-300 3xl:text-xl">
          You have selected:
        </h1>
        <div className="flex relative py-4 px-5 w-2/3 text-white bg-sky-900/75 rounded-lg focus:outline-none ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300 shadow-md">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center w-full">
              <div className="flex flex-row w-full text-sm">
                <div className="font-medium text-white">
                  <img
                    src={asset}
                    className="w-4 h-4 xl:w-8 xl:h-8 3xl:w-14 3xl:h-14"
                  />
                </div>
                <div className="flex flex-1 justify-center items-center text-base font-medium text-sky-100 3xl:text-lg">
                  {pieceSelected}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="p-4 w-full">
        <div className="mx-auto w-full max-w-md">
          <RadioGroup value={selectedPiece} onChange={setSelectedPiece}>
            <RadioGroup.Label className="sr-only">
              Brain Piece Selector
            </RadioGroup.Label>
            <div className="space-y-2">
              {options.map((option) => (
                <RadioGroup.Option
                  key={option.piece}
                  value={option.piece}
                  disabled={!option.isValid}
                  className={({ active, checked }) =>
                    `${
                      active
                        ? 'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60'
                        : ''
                    }
                  ${
                    checked
                      ? 'bg-sky-900 bg-opacity-75 text-white'
                      : option.isValid
                      ? 'bg-white'
                      : 'bg-slate-500'
                  }
                    relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                  }
                >
                  {({ checked }) => (
                    <>
                      <div className="flex justify-between items-center w-full">
                        <div className="flex items-center w-full">
                          <div className="flex flex-row w-full text-sm">
                            <RadioGroup.Label
                              as="div"
                              className={`font-medium  ${
                                checked || !option.isValid
                                  ? 'text-white'
                                  : 'text-gray-900'
                              }`}
                            >
                              <img
                                src={option.asset}
                                className="w-4 h-4 xl:w-8 xl:h-8 3xl:w-14 3xl:h-14"
                              />
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as="div"
                              className={`flex flex-1 justify-center items-center text-base 3xl:text-lg font-medium ${
                                checked || !option.isValid
                                  ? 'text-sky-100'
                                  : 'text-gray-500'
                              }`}
                            >
                              {option.piece}
                            </RadioGroup.Description>
                          </div>
                        </div>
                        <div
                          className={`shrink-0 text-white ${
                            checked ? 'visible' : 'invisible'
                          }`}
                        >
                          <CheckIcon className="w-6 h-6" />
                        </div>
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>
      <button
        className="flex justify-center items-center py-2.5 px-4 w-44 h-12 text-2xl font-bold text-center text-gray-300 bg-green-600 hover:bg-green-700 rounded transition duration-200"
        onClick={() => {
          pickPiece({
            token,
            roomId,
            piece: selectedPiece
          });

          dispatch(setPiecePicked({ pickedPiece: selectedPiece }));
        }}
      >
        LOCK IN
      </button>
    </>
  );
}

const CheckIcon = (props: { className: string }) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
