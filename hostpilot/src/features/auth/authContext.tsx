import { createContext, useContext, useMemo, useState } from 'react';
import { AppUser, UserRole } from '@/core/types/domain';
import { mockUsers } from '@/mocks/mockData';

type AuthCtx = {
  user: AppUser;
  activeRole: UserRole;
  switchRole: (role: UserRole) => void;
};

const AuthContext = createContext<AuthCtx | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const user = mockUsers[0];
  const [activeRole, setActiveRole] = useState<UserRole>(user.roles[0]);

  const value = useMemo(() => ({ user, activeRole, switchRole: setActiveRole }), [user, activeRole]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
