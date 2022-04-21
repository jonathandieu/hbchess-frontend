import { useGameState } from '../hooks/useGameState';
import { useAuth } from '../hooks/useAuth';
import { useSendEmojiMutation } from '../app/services/socketApi';
import { useInGame } from '../hooks/useInGame';
import SelectPiece from './SelectPiece';
import PieceSelected from './PieceSelected';
import { useAppDispatch } from '../hooks/store';
import { setEmoji } from '../app/features/game/gameSlice';

const Sidebar = () => {
  const gameState = useGameState();
  const { token } = useAuth();
  const { roomId } = useInGame();

  const [sendEmoji] = useSendEmojiMutation();

  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col w-[25%] h-[90%] bg-gray-800 rounded-lg shadow-2xl">
      <div className="flex flex-row justify-around items-center py-4 w-full border-b-2">
        <h1 className="text-2xl text-center text-gray-100">White:</h1>
        <ol className="w-min text-xl list-disc text-gray-100">
          <li
            className={`${
              gameState.playersIn.includes(gameState.white.sender._id)
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {gameState.white.sender.username}
          </li>
          <li
            className={`${
              gameState.playersIn.includes(gameState.white.recipient._id)
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {gameState.white.recipient.username}
          </li>
        </ol>
      </div>

      <div className="flex flex-row justify-around items-center py-4 w-full border-b-2">
        <h1 className="text-2xl text-center text-gray-100">Black:</h1>
        <ol className="w-min text-xl list-disc text-gray-100">
          <li
            className={`${
              gameState.playersIn.includes(gameState.black.sender._id)
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {gameState.black.sender.username}
          </li>
          <li
            className={`${
              gameState.playersIn.includes(gameState.black.recipient._id)
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {gameState.black.recipient.username}
          </li>
        </ol>
      </div>

      <div className="flex flex-row justify-around items-center py-4 w-full border-b-2">
        <h1 className="text-2xl text-center text-gray-100">
          {gameState.emoji}
        </h1>
        <div className="flex flex-row">
          <div className="flex flex-col">
            <button
              className="flex justify-center items-center p-1 m-1 w-5 h-5 text-sm font-medium text-center bg-slate-400 hover:bg-slate-50 rounded transition duration-200"
              onClick={() => {
                sendEmoji({
                  token,
                  roomId,
                  emoji: '🧂'
                });

                dispatch(setEmoji({ emoji: '🧂' }));
              }}
            >
              🧂
            </button>
            <button
              className="flex justify-center items-center p-1 m-1 w-5 h-5 text-sm font-medium text-center bg-slate-400 hover:bg-slate-50 rounded transition duration-200"
              onClick={() => {
                sendEmoji({
                  token,
                  roomId,
                  emoji: '🙏'
                });

                dispatch(setEmoji({ emoji: '🙏' }));
              }}
            >
              🙏
            </button>
          </div>
          <div className="flex flex-col">
            <button
              className="flex justify-center items-center p-1 m-1 w-5 h-5 text-sm font-medium text-center bg-slate-400 hover:bg-slate-50 rounded transition duration-200"
              onClick={() => {
                sendEmoji({
                  token,
                  roomId,
                  emoji: '🗿'
                });

                dispatch(setEmoji({ emoji: '🗿' }));
              }}
            >
              🗿
            </button>{' '}
            <button
              className="flex justify-center items-center p-1 m-1 w-5 h-5 text-sm font-medium text-center bg-slate-400 hover:bg-slate-50 rounded transition duration-200"
              onClick={() => {
                sendEmoji({
                  token,
                  roomId,
                  emoji: '😩'
                });

                dispatch(setEmoji({ emoji: '😩' }));
              }}
            >
              😩
            </button>
          </div>
          <div className="flex flex-col">
            <button
              className="flex justify-center items-center p-1 m-1 w-5 h-5 text-sm font-medium text-center bg-slate-400 hover:bg-slate-50 rounded transition duration-200"
              onClick={() => {
                sendEmoji({
                  token,
                  roomId,
                  emoji: '😔'
                });

                dispatch(setEmoji({ emoji: '😔' }));
              }}
            >
              😔
            </button>
            <button
              className="flex justify-center items-center p-1 m-1 w-5 h-5 text-sm font-medium text-center bg-slate-400 hover:bg-slate-50 rounded transition duration-200"
              onClick={() => {
                sendEmoji({
                  token,
                  roomId,
                  emoji: '💩'
                });

                dispatch(setEmoji({ emoji: '💩' }));
              }}
            >
              💩
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 justify-center items-center">
        {gameState.playersIn.length === 4 ? (
          (gameState.isWhite && gameState.teamTurn === 'w') ||
          (!gameState.isWhite && gameState.teamTurn === 'b') ? (
            gameState.isHand ? (
              <PieceSelected />
            ) : (
              <SelectPiece />
            )
          ) : (
            <h1 className="text-2xl font-medium text-gray-100">
              Other Team&apos;s Turn
            </h1>
          )
        ) : (
          <h1 className="text-2xl font-medium text-gray-100">
            Waiting for all players to join.
          </h1>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
