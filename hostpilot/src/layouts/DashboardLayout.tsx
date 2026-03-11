import { Link, Outlet } from 'react-router-dom';
import { Card } from '@/design/ui';

export const DashboardLayout = ({ title }: { title: string }) => (
  <div className="space-y-4">
    <Card className="flex items-center justify-between">
      <h2 className="text-xl font-bold text-brand-900">{title}</h2>
      <Link to="/" className="rounded border px-3 py-1.5 text-sm">Δημόσιο site</Link>
    </Card>
    <Outlet />
  </div>
);
