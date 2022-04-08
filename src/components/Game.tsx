import { useJoinGameMutation } from '../app/services/socketApi';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useInGame } from '../hooks/useInGame';
import Board from './Board';
import Sidebar from './Sidebar';

const Game = () => {
  const [joinGame] = useJoinGameMutation();
  const { token } = useAuth();
  const { roomId } = useInGame();

  useEffect(() => {
    joinGame({ token, roomId });
  }, []);

  return (
    <div className="flex flex-row justify-around items-center w-full h-full">
      <Board />
      <Sidebar />
    </div>
  );
};

export default Game;
