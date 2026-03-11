import { Link, Outlet, useLocation } from 'react-router-dom';
import { Card, LanguageSwitcher } from '@/design/ui';

export const AppWorkspaceLayout = ({ title, nav }: { title: string; nav: Array<{ to: string; label: string }> }) => {
  const location = useLocation();
  return (
    <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
      <aside className="rounded-2xl border border-slate-200 bg-white p-3">
        <h3 className="mb-3 font-semibold text-brand-900">{title}</h3>
        <div className="mb-3"><LanguageSwitcher /></div>
        <nav className="space-y-1 text-sm">
          {nav.map((item) => (
            <Link key={item.to} to={item.to} className={`block rounded-lg px-2 py-1.5 ${location.pathname === item.to ? 'bg-brand-600 text-white' : 'hover:bg-brand-50'}`}>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <section>
        <Card className="mb-4 flex items-center justify-between">
          <Link to="/" className="rounded border px-3 py-1.5 text-sm">HostPilot</Link>
          <Link to="/role-entry" className="rounded border px-3 py-1.5 text-sm">Role entry</Link>
        </Card>
        <Outlet />
      </section>
    </div>
  );
};
