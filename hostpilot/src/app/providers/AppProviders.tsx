import { AuthProvider } from '@/features/auth/authContext';
import { I18nProvider } from '@/i18n/i18nContext';

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <I18nProvider>
    <AuthProvider>{children}</AuthProvider>
  </I18nProvider>
);
