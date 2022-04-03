import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../app/features/auth/authSlice';

export const useAuth = () => {
  const authState = useSelector(selectCurrentUser);

  return useMemo(
    () => ({ user: authState.user, token: authState.token }),
    [authState]
  );
};
