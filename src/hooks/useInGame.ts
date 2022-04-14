import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectInGame } from '../app/features/game/gameSlice';

export const useInGame = () => {
  const inGameState = useSelector(selectInGame);

  return useMemo(
    () => ({ inGame: inGameState.inGame, roomId: inGameState.roomId }),
    [inGameState]
  );
};
