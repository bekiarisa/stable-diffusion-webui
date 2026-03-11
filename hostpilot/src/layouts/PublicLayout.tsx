import { Link, Outlet } from 'react-router-dom';
import { LanguageSwitcher } from '@/design/ui';
import { useI18n } from '@/i18n/i18nContext';

export const PublicLayout = () => {
  const { dict } = useI18n();
  const nav = [
    ['/', dict.nav.home],
    ['/features', dict.nav.features],
    ['/pricing', dict.nav.pricing],
    ['/categories', dict.nav.categories],
    ['/areas', dict.nav.areas],
    ['/access', dict.nav.access],
    ['/role-entry', dict.nav.roleEntry],
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-brand-600">hostpilot.gr · hostpilot.eu · hostpilot.com</p>
            <h1 className="text-2xl font-bold text-brand-900">{dict.brand}</h1>
          </div>
          <nav className="flex flex-wrap gap-2 text-sm">
            {nav.map(([to, label]) => <Link key={to} to={to} className="rounded-lg px-3 py-1.5 hover:bg-brand-50">{label}</Link>)}
          </nav>
          <LanguageSwitcher />
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6"><Outlet /></main>
    </div>
  );
};
