import { Navigate, RouteProps } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function PrivateRoute({ children }: RouteProps) {
  const auth = useAuth();
  return auth ? children : <Navigate to="/login" />;
}
