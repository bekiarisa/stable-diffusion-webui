import { Link, Outlet } from 'react-router-dom';
import { publicNav, roleHome } from '@/core/constants/navigation';
import { useAuth } from '@/features/auth/authContext';

export const PublicLayout = () => {
  const { user, activeRole, switchRole } = useAuth();
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-brand-600">hostpilot.gr · hostpilot.eu · hostpilot.com</p>
            <h1 className="text-2xl font-bold text-brand-900">HostPilot</h1>
          </div>
          <nav className="flex flex-wrap gap-2 text-sm">
            {publicNav.map((item) => (
              <Link key={item.to} className="rounded-lg px-3 py-1.5 hover:bg-brand-50" to={item.to}>{item.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">{user.displayName}</span>
            <select className="rounded border p-1" value={activeRole} onChange={(e) => switchRole(e.target.value as typeof activeRole)}>
              {user.roles.map((role) => <option key={role} value={role}>{role}</option>)}
            </select>
            <Link className="rounded bg-brand-600 px-2 py-1 text-white" to={roleHome[activeRole]}>Dashboard</Link>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6"><Outlet /></main>
    </div>
  );
};
