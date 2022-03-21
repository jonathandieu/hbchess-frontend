import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../app/features/auth/authSlice';
import { User } from '../app/features/auth/authSlice';

export const useAuth = () => {
  const user: User | null = useSelector(selectCurrentUser);

  return useMemo(() => ({ user }), [user]);
};
