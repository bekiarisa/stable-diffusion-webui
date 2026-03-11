import { Navigate, Outlet } from 'react-router-dom';
import { UserRole } from '@/core/types/domain';
import { useAuth } from '@/features/auth/authContext';

export const RequireRole = ({ allow }: { allow: UserRole[] }) => {
  const { user } = useAuth();
  const ok = user.roles.some((r) => allow.includes(r));
  return ok ? <Outlet /> : <Navigate to="/" replace />;
};
