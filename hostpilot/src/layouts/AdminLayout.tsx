import { Link, Outlet, useLocation } from 'react-router-dom';
import { Card, LanguageSwitcher } from '@/design/ui';
import { useI18n } from '@/i18n/i18nContext';

const links = [
  { to: '/admin', key: 'overview' },
  { to: '/admin/users', key: 'users' },
  { to: '/admin/properties', key: 'properties' },
  { to: '/admin/professionals', key: 'professionals' },
  { to: '/admin/listings', key: 'listings' },
  { to: '/admin/requests', key: 'requests' },
  { to: '/admin/reservations', key: 'reservations' },
  { to: '/admin/plans', key: 'plans' },
  { to: '/admin/featured', key: 'featured pins' },
  { to: '/admin/ai', key: 'ai settings' },
  { to: '/admin/toggles', key: 'system toggles' },
  { to: '/admin/reports', key: 'reports' },
];

export const AdminLayout = () => {
  const { dict } = useI18n();
  const location = useLocation();

  return (
    <div className="grid gap-4 xl:grid-cols-[280px_1fr]">
      <aside className="rounded-2xl border border-slate-200 bg-white p-4">
        <h3 className="text-lg font-semibold text-brand-900">{dict.admin.title}</h3>
        <p className="mt-1 text-xs text-slate-600">{dict.admin.subtitle}</p>
        <div className="mt-3"><LanguageSwitcher /></div>
        <nav className="mt-4 space-y-1 text-sm">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className={`block rounded-lg px-2 py-1.5 ${location.pathname === l.to ? 'bg-brand-600 text-white' : 'hover:bg-brand-50'}`}>
              {l.key}
            </Link>
          ))}
        </nav>
      </aside>
      <section>
        <div className="mb-4 grid gap-3 md:grid-cols-3">
          <Card><p className="text-xs text-slate-500">system status</p><p className="font-semibold text-emerald-600">operational</p></Card>
          <Card><p className="text-xs text-slate-500">moderation queue</p><p className="font-semibold">12 open</p></Card>
          <Card><p className="text-xs text-slate-500">payments alerts</p><p className="font-semibold">2 pending checks</p></Card>
        </div>
        <Outlet />
      </section>
    </div>
  );
};
