import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectGameState } from '../app/features/game/gameSlice';

export const useGameState = () => {
  const gameState = useSelector(selectGameState);

  return useMemo(() => gameState, [gameState]);
};
