import { useJoinGameMutation } from '../app/services/socketApi';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useInGame } from '../hooks/useInGame';
import Board from './Board';
import { resetGame } from '../app/features/game/gameSlice';
import { useAppDispatch } from '../hooks/store';

const Game = () => {
  const [joinGame] = useJoinGameMutation();
  const { token } = useAuth();
  const { roomId } = useInGame();
  const dispatch = useAppDispatch();

  useEffect(() => {
    joinGame({ token, roomId });
  }, []);

  return (
    <div className="flex flex-row justify-center items-center w-full h-full">
      <div className="flex flex-col justify-center items-center w-3/4 h-full">
        <h1 className="pb-2 mb-7 w-full text-3xl text-center">
          Waiting for players to join!
        </h1>
        <Board />
        {process.env.NODE_ENV === 'development' && (
          <button onClick={() => dispatch(resetGame())}>
            Reset Game State
          </button>
        )}
      </div>
      <div className="w-[20%] h-[90%] bg-gray-800 rounded-lg shadow-2xl"></div>
    </div>
  );
};

export default Game;
