import {
  useJoinGameMutation,
  usePlayerJoinsQuery
} from '../app/services/socketApi';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useInGame } from '../hooks/useInGame';
import Board from './Board';
import Sidebar from './Sidebar';
import {
  addJoinedPlayer,
  setPiecePicked,
  setMove
} from '../app/features/game/gameSlice';
import { useAppDispatch } from '../hooks/store';
import {
  usePickedPieceQuery,
  useSentMoveQuery
} from '../app/services/socketApi';

const Game = () => {
  const [joinGame] = useJoinGameMutation();
  const { token, user } = useAuth();
  const { roomId } = useInGame();
  const { data: joined = [] } = usePlayerJoinsQuery(token);
  const { data: pickedPiece = '' } = usePickedPieceQuery(token);
  const { data: sentMove = '' } = useSentMoveQuery(token);
  const dispatch = useAppDispatch();

  useEffect(() => {
    joinGame({ token, roomId, player_id: user.id });
  }, []);

  useEffect(() => {
    dispatch(addJoinedPlayer({ playerIds: joined }));
  }, [joined]);

  useEffect(() => {
    console.log(pickedPiece);
    dispatch(setPiecePicked({ pickedPiece }));
  }, [pickedPiece]);

  useEffect(() => {
    console.log(sentMove);
    dispatch(setMove({ move: sentMove }));
  }, [sentMove]);

  return (
    <div className="flex flex-row justify-around items-center w-full h-full">
      <Board />
      <Sidebar />
    </div>
  );
};

export default Game;
