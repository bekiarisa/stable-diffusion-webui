import { Link, Outlet } from 'react-router-dom';

const adminLinks = [
  ['/admin', 'Overview'],
  ['/admin/toggles', 'System Toggles'],
  ['/admin/pricing', 'Pricing'],
  ['/admin/reports', 'Reports'],
];

export const AdminLayout = () => (
  <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
    <aside className="rounded-2xl border border-slate-200 bg-white p-3">
      <h3 className="mb-3 font-semibold text-brand-900">Admin Control Center</h3>
      <nav className="space-y-1 text-sm">
        {adminLinks.map(([to, label]) => <Link key={to} to={to} className="block rounded px-2 py-1.5 hover:bg-brand-50">{label}</Link>)}
      </nav>
    </aside>
    <section><Outlet /></section>
  </div>
);
