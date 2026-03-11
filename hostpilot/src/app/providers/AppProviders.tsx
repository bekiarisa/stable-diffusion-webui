import { AuthProvider } from '@/features/auth/authContext';

export const AppProviders = ({ children }: { children: React.ReactNode }) => <AuthProvider>{children}</AuthProvider>;
